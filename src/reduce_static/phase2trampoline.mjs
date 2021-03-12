import {
  log,
  group,
  groupEnd,
  ASSERT,
  BLUE,
  RED,
  RESET,
  tmat,
  fmat,
  TRIBE,
  PURPLE,
  DIM,
  YELLOW,
  rule,
  example,
  before,
  source,
  after,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { VERBOSE_TRACING } from '../constants.mjs';

// TODO: move to AST
function isSimpleCallee(node) {
  if (!isComplexNode(node)) return true;
  if (node.type !== 'MemberExpression') return false;
  // Simple member expression must have a simple object and, if computed, a simple property and does not nest.
  return !(isComplexNode(node.object) || (node.computed && isComplexNode(node.property)));
}
function isComplexNode(node, incNested = true) {
  ASSERT([1, 2].includes(arguments.length), 'arg count');
  // A node is simple if it is
  // - an identifier
  // - a literal (but not regex)
  // - a unary expression `-` or `+` with a number arg, NaN, or Infinity
  // - a sequence expression ending in a simple node
  // Most of the time these nodes are not reduced any further
  // The sequence expression sounds complex but that's what we normalize into most of the time
  //
  // Note: An empty array/object literal is not "simple" because it has an observable reference
  //       If we were to mark these "simple" then they might be duplicated without further thought,
  //       leading to hard to debug reference related issues.

  if (node.type === 'Literal') {
    if (node.raw !== 'null' && node.value === null) return true; // This will be a regex. They are objects, so they are references, which are observable.
    return false;
  }
  if (node.type === 'Identifier') {
    return false;
  }
  if (incNested && node.type === 'UnaryExpression' && node.operator === '-') {
    // -100 (is a unary expression!)
    if (node.argument.type === 'Literal' && typeof node.argument.value === 'number') return false;
    // A little unlikely but you know
    // -NaN, +NaN, -Infinity, +Infinity
    if (node.argument.type === 'Identifier' && (node.argument.name === 'Infinity' || node.argument.name === 'NaN')) return false;
  }
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return false; // Template without expressions is a string
  if (node.type === 'ThisExpression') return true;
  if (node.type === 'Super') return false;

  return true;
}

export function pruneTrampolineFunctions(fdata) {
  // Functions that just call another function and return the results.
  // It's a common artifact, at least, for the single branch normalization
  group('\n\n\nPruning trampoline functions that only return the call to another function\n');
  const r = _pruneTrampolineFunctions(fdata);
  groupEnd();
  log('yes end');
  return r;
}
function _pruneTrampolineFunctions(fdata) {
  const toOutlineCall = []; // Array<[read, node, mapping]> // funcs with a call as body (but no return)
  const toReplaceWith = []; // Array<[read, node, mapping, calleeIdentIndex, calleeObjectIndex, calleePropIndex]> // funcs that return the call of another func. the last three values are for replacing the callee with an arg
  fdata.globallyUniqueNamingRegistry.forEach((meta, name) => {
    if (meta.isImplicitGlobal) return;
    if (meta.isBuiltin) return;

    if (VERBOSE_TRACING) {
      log(
        '- `' + name + '`, has constValueRef?',
        !!meta.constValueRef,
        meta.constValueRef?.node?.type,
        'reads args?',
        meta.constValueRef?.node?.$p?.readsArgumentsLen,
        meta.constValueRef?.node?.$p?.readsArgumentsAny,
      );
    }

    if (meta.writes.length !== 1) {
      if (VERBOSE_TRACING) log('    - Binding has more than one write. Bailing');
      return;
    }

    const funcNode = meta.constValueRef?.node;
    if (!['FunctionExpression', 'ArrowFunctionExpression'].includes(funcNode?.type)) {
      if (VERBOSE_TRACING) log('  - not a function');
      return;
    }

    if (funcNode.body.body.length === 1) {
      if (VERBOSE_TRACING) log('    - this function is has one statements. Trying to figure out easy inline cases.');

      // Ignore this step if the function has a rest arg. It'll be too difficult to map for now.
      const hasRest = funcNode.params.some((pnode) => pnode.type === 'RestElement');
      if (VERBOSE_TRACING) log('    - hasRest?', hasRest);

      const firstNode = funcNode.body.body[0];
      if (VERBOSE_TRACING) log('    - 1st node;', firstNode.type);
      if (!hasRest && firstNode.type === 'ExpressionStatement' && firstNode.expression.type === 'CallExpression') {
        // We should probably protect against recursive functions? Although if this is one then it's an infinite loop anyways.
        if (VERBOSE_TRACING) log('        - all the function does is call a function and return undefined');

        // Replace all calls to this function with undefined. Add a clone to the inner call before the line of the outer call.
        // Make sure to properly map the params to the new outer call.
        // Some params may be used multiple times. Some args may not be params.
        // This one is slightly trickier than the trampoline that returns the result because the value must be undefined.

        const innerCallNode = firstNode.expression;
        // If the call has a spread then bail for now. There are some sub-cases we can still convert.

        const hasSpread = innerCallNode['arguments'].some((anode) => anode.type === 'SpreadElement');
        if (hasSpread) {
          if (VERBOSE_TRACING) log('        - the inner call contained spread so bailing');
        } else {
          const paramArgMapping = new Map();
          innerCallNode['arguments'].forEach((anode, ai) => {
            // Check whether this argument was a param of this function. If so add it to the mapping.
            if (anode.type !== 'Identifier') return; // Cannot be a param. Ignore.

            funcNode.params.some((pnode, pi) => {
              ASSERT(pnode.type === 'Identifier');
              if (pnode.name === anode.name) {
                // We are replacing one call with another, and this is how we map the previous args;
                // "The ath argument of the new call is the pth arg of the previous call"
                paramArgMapping.set(ai, pi);
                return true;
              }
            });
          });

          // Now find all calls to the funcNode and replace them with the innerCall, applying the mapping
          meta.reads.forEach((read, ri) => {
            const callNode = read.parentNode;
            if (VERBOSE_TRACING) log('          - read [' + ri + ']:', callNode.type);
            if (callNode.type !== 'CallExpression') return;
            if (VERBOSE_TRACING) log('          - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
            if (callNode.callee.type !== 'Identifier') return false;
            if (callNode.callee.name !== name) return false;
            // This is a call to funcNode. Queue to replace it with the call, replacing param-args with original args
            if (VERBOSE_TRACING) log('          - queuing into toOutlineCall to eliminating call to trampoline function');
            toOutlineCall.push([read, innerCallNode, paramArgMapping]);
          });
        }
      } else {
        log('TODO: the statement is returning a call. we can probably still inline it');
      }
    } else if (funcNode.body.body.length === 2) {
      if (VERBOSE_TRACING) log('    - this function is has two statements. Trying to figure out easy inline cases.');

      const funcParams = funcNode.params;

      // Ignore this step if the function has a rest arg. It'll be too difficult to map for now.
      const hasRest = funcParams.some((pnode) => pnode.type === 'RestElement');
      if (VERBOSE_TRACING) log('    - hasRest?', hasRest);

      const varNode = funcNode.body.body[0];
      const returnNode = funcNode.body.body[1];
      if (VERBOSE_TRACING) log('    - 1st node;', varNode.type);
      if (VERBOSE_TRACING) log('    - 2nd node;', returnNode.type);
      if (
        !hasRest &&
        varNode.type === 'VariableDeclaration' &&
        varNode.declarations[0].init.type === 'CallExpression' &&
        returnNode.type === 'ReturnStatement' &&
        returnNode.argument.type === 'Identifier' &&
        returnNode.argument.name === varNode.declarations[0].id.name
      ) {
        // We should probably protect against recursive functions? Although if this is one then it's an infinite loop anyways.
        if (VERBOSE_TRACING) log('        - all the function does is call a function and return its result');

        // Copy-move the call inside this function to all calls to the function
        // Make sure to properly map the params to the call.
        // Some params may be used multiple times. Some args may not be params.

        const innerCallNode = varNode.declarations[0].init;
        const innerCallee = innerCallNode.callee;
        const innerArgs = innerCallNode['arguments'];

        // If the call has a spread then bail for now. There are some sub-cases we can still convert.
        const hasSpread = innerArgs.some((anode) => anode.type === 'SpreadElement');
        if (hasSpread) {
          if (VERBOSE_TRACING) log('        - the inner call contained spread so bailing');
        } else {
          // If the callee is a param, or as a member expression, uses a param, then bail for now.
          // We may still be able to do something explicit in the future but for now just bail.
          let calleeIdentIndex = -1;
          let calleeObjectIndex = -1;
          let calleePropIndex = -1;
          if (innerCallee.type === 'Identifier') {
            const calleeName = innerCallee.name;
            if (VERBOSE_TRACING)
              log(
                '        - Checking if the callee `' +
                  calleeName +
                  '` is a param [' +
                  funcParams.map((n) => '`' + n.name + '`').join(', ') +
                  ']',
              );
            funcParams.some((anode, ai) => {
              if (anode.name === calleeName) {
                calleeIdentIndex = ai;
                if (VERBOSE_TRACING) log('          - yes; replacing the callee ident with argument at index', ai);
                return true;
              }
            });
          } else {
            const calleeNameObj = innerCallee.object.name;
            const calleeNameProp = innerCallee.property.name;
            if (VERBOSE_TRACING)
              log(
                '        - Checking if the callee.object `' +
                  (innerCallee.object.type === 'Identifier' ? calleeNameObj : '<??>') +
                  '` or property `' +
                  (innerCallee.computed && innerCallee.property.type === 'Identifier' ? innerCallee.property.name : '<??>') +
                  '` is a param [' +
                  funcParams.map((n) => '`' + n.name + '`').join(', ') +
                  ']',
              );
            ASSERT(innerCallee.type === 'MemberExpression', 'All other cases are eliminated, yes?', innerCallNode);
            // For now, reject both object and property. Later we may support property in a special case.
            if (innerCallee.object.type === 'Identifier') {
              funcParams.some((anode, ai) => {
                if (anode.name === calleeNameObj) {
                  calleeObjectIndex = ai;
                  if (VERBOSE_TRACING) log('          - yes; replacing the callee object ident with argument at index', ai);
                  return true;
                }
              });
            }
            if (innerCallee.computed && innerCallee.property.type === 'Identifier') {
              funcParams.some((anode, ai) => {
                if (anode.name === calleeNameProp) {
                  calleePropIndex = ai;
                  if (VERBOSE_TRACING) log('          - yes; replacing the callee prop ident with argument at index', ai);
                  return true;
                }
              });
            }
          }
          log('          -', calleeIdentIndex, calleeObjectIndex, calleePropIndex);

          const paramArgMapping = new Map();
          innerCallNode['arguments'].forEach((anode, ai) => {
            // Check whether this argument was a param of this function. If so add it to the mapping.
            if (anode.type !== 'Identifier') return; // Cannot be a param. Ignore.

            funcParams.some((pnode, pi) => {
              ASSERT(pnode.type === 'Identifier');
              if (pnode.name === anode.name) {
                // We are replacing one call with another, and this is how we map the previous args;
                // "The ath argument of the new call is the pth arg of the previous call"
                paramArgMapping.set(ai, pi);
                return true;
              }
            });
          });

          // Now find all calls to the funcNode and replace them with the innerCall, applying the mapping
          meta.reads.forEach((read, ri) => {
            const callNode = read.parentNode;
            if (VERBOSE_TRACING) log('          - read [' + ri + ']:', callNode.type);
            if (callNode.type !== 'CallExpression') return;
            if (VERBOSE_TRACING) log('          - calls:', callNode.callee.name, 'with', callNode['arguments'].length, 'args');
            if (callNode.callee.type !== 'Identifier') return false;
            if (callNode.callee.name !== name) return false;
            // This is a call to funcNode. Queue to replace it with the call, replacing param-args with original args
            if (VERBOSE_TRACING) log('          - queuing into toReplaceWith to eliminating call to trampoline function2');
            toReplaceWith.push([read, innerCallNode, paramArgMapping, calleeIdentIndex, calleeObjectIndex, calleePropIndex]);
          });
        }
      } else {
        log('TODO: the statement is returning a call. we can probably still inline it');
      }
    }
  });
  log('Queued', toReplaceWith.length, 'calls for remapping and', toOutlineCall.length, 'calls for outlining');
  if (toReplaceWith.length || toOutlineCall.length) {
    group('toReplaceWith');
    toReplaceWith.forEach(
      ([
        { node, parentNode, grandNode, grandProp, grandIndex, ...rest },
        replaceNode,
        argMapping,
        calleeIdentIndex,
        calleeObjectIndex,
        calleePropIndex,
      ]) => {
        rule('Calls to a function that only returns the call to another function should be replaced with a direct call');
        example('function f(a){ return a; } function g(a){ const r = f(a); return r; } g(10);', 'f(10);');
        before(parentNode, grandNode);

        const oldCall = grandIndex >= 0 ? grandNode[grandProp][grandIndex] : grandNode[grandProp];
        const oldArgs = oldCall.arguments;
        ASSERT(oldCall?.type === 'CallExpression', 'call?', oldCall);
        ASSERT(replaceNode?.type === 'CallExpression', 'call?', replaceNode);
        const oldCallee = oldCall.callee;
        const replaceCallee = replaceNode.callee;
        ASSERT(isSimpleCallee(oldCallee), 'outer callee should be normalized so a simple node or simple member expression', oldCall);
        ASSERT(isSimpleCallee(replaceCallee), 'inner callee should be normalized so a simple node or simple member expression', oldCall);
        // Take the replaceNode, clone the callee (could be ident or member, irrelevant) and either remap the args or clone it
        // Take special care if the callee was based on a parameter
        const newCallee =
          replaceCallee.type === 'Identifier'
            ? AST.cloneSimple(calleeIdentIndex >= 0 ? oldArgs[calleeIdentIndex] : replaceCallee)
            : AST.memberExpression(
                AST.cloneSimple(calleeObjectIndex >= 0 ? oldArgs[calleeObjectIndex] ?? AST.identifier('undefined') : replaceCallee.object),
                AST.cloneSimple(calleePropIndex >= 0 ? oldArgs[calleePropIndex] ?? AST.identifier('undefined') : replaceCallee.property),
                replaceCallee.computed,
              );
        const newArgs = replaceNode.arguments.map((anode, ai) => {
          // Note: `anode` is the argument from the trampoline call, not the call being replaced
          // If the current index has a mapping, then reuse the argument from the call being replaced. Otherwise clone anode.
          if (argMapping.has(ai)) {
            return AST.cloneSimple(oldCall.arguments[argMapping.get(ai)] || AST.identifier('undefined'));
          } else {
            return AST.cloneSimple(replaceNode.arguments[ai]);
          }
        });
        const newCall = AST.callExpression(newCallee, newArgs);
        // Note: we want to replace the entire call expression, not just the callee
        if (grandIndex >= 0) grandNode[grandProp][grandIndex] = newCall;
        else grandNode[grandProp] = newCall;

        after(newCall, grandNode);
      },
    );
    groupEnd();

    group('toOutlineCall');
    toOutlineCall
      .reverse()
      .forEach(([{ node, parentNode, grandNode, grandProp, grandIndex, blockBody, blockIndex, ...rest }, replaceNode, argMapping]) => {
        // This one in reverse because it moves indexes and invalidates index references
        rule('Calls to a function that only calls another func should be replaced with a direct call and undefined');
        example('function f(a){ return a; } function g(a){ f(a); } $(g(10));', 'f(10); $(undefined);');
        before(parentNode, blockBody[blockIndex]);

        const trampolineCall = parentNode; // This is the one calling the trampoline, the one to replace
        log('old call:');
        source(trampolineCall);
        ASSERT(trampolineCall?.type === 'CallExpression', 'call?', trampolineCall);
        ASSERT(trampolineCall.callee.type === 'Identifier', 'name?', trampolineCall);
        ASSERT(replaceNode?.type === 'CallExpression', 'call?', replaceNode);
        // Take the replaceNode, clone the callee (could be ident or member, irrelevant) and either remap the args or clone it
        const newCallee = AST.cloneSimple(replaceNode.callee);
        const newArgs = replaceNode.arguments.map((anode, ai) => {
          // Note: `anode` is the argument from the trampoline call, not the call being replaced
          // If the current index has a mapping, then reuse the argument from the call being replaced. Otherwise clone anode.
          if (argMapping.has(ai)) {
            return AST.cloneSimple(trampolineCall.arguments[argMapping.get(ai)] || AST.identifier('undefined'));
          } else {
            return AST.cloneSimple(replaceNode.arguments[ai]);
          }
        });
        const newCall = AST.callExpression(newCallee, newArgs);
        // Note: we want to replace the entire call expression, not just the callee
        blockBody.splice(blockIndex, 0, AST.expressionStatement(newCall));

        // Note: we want to replace the entire call expression, not just the callee
        if (grandIndex >= 0) grandNode[grandProp][grandIndex] = AST.identifier('undefined');
        else grandNode[grandProp] = AST.identifier('undefined');

        after(blockBody[blockIndex]);
        after(blockBody[blockIndex + 1]);
      });
    groupEnd();

    return 'phase1';
  }
  return false;
}
