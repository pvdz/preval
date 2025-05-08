// Given a loop that is preceded by predictable statements and that contains free statements and expressions that only operate on
// those or local statements, and everything is free and/or predictable, then we can precompile and resolve them.
// This is mostly obfuscation land but it might also be tiny dev overhead.
//
// ```
// let counter = 0;
// const arr = [];
// while (true) {
//   if (counter < 100) {
//     arr.push(counter);
//   } else {
//     break;
//   }
//   counter += 1;
// }
// ```
//
// This whole snippet is predictable (we are assuming clean prototypes) and we can replace the whole thing
// with just the arr decl and an array literal of 100.
// That's what we're aiming for here.

import walk from '../../lib/walk.mjs';
import * as AST from '../ast.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, source, REF_TRACK_TRACING, assertNoDupeNodes, rule, example, before, after, todo, currentState, clearStdio, } from '../utils.mjs';
import { runFreeWithPcode } from '../pcode.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FRFR } from '../symbols_preval.mjs';
import { PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITIVE_TYPE_NAMES_TYPEOF, setVerboseTracing } from '../constants.mjs';
import { BUILTIN_SYMBOLS, symbo } from '../symbols_builtins.mjs';

const FAILURE_SYMBOL = {};
const BREAK_SYMBOL = {};

const SUPPORTED_GLOBAL_FUNCS = [
  SYMBOL_FRFR,
  SYMBOL_COERCE,
  symbo('array', 'pop'),
  symbo('array', 'push'),
  symbo('array', 'shift'),
  symbo('array', 'unshift'),
  'isNaN',
  symbo('Number', 'isNaN'),
  'isFinite',
  symbo('Number', 'isFinite'),
  symbo('Number', 'isInteger'),
  symbo('Number', 'isSafeInteger'),
  symbo('Number', 'parseFloat'),
  symbo('Number', 'parseInt'),
  symbo('string', 'charAt'),
  symbo('string', 'charCodeAt'),
  symbo('String', 'fromCharCode'),
  symbo('String', 'fromCodePoint'),
];

export function freeLoops(fdata, prng, options) {
  const usePrng = !!options.prngSeed;
  group('\n\n\n[freeLoops] Checking for free loops to simulate and resolve\n');
  //currentState(fdata, 'freeLoops'. true, fdata);
  const r = _freeLoops(fdata, prng, usePrng);
  groupEnd();
  return r;
}

export function _freeLoops(fdata, prng, usePrng) {
  //const ast = fdata.tenkoOutput.ast;

  let changed = 0;

  // Find loops.
  // - Check any statement prior to it and remember how many are predictable
  //   - Keep a list of variables and their toplevel type
  // - Scan through the loop
  //   - Verify each statement, recursively
  //   - Each function must be free or only refer to vars collected so far
  //   - New decls are part of this set since if they are inside this loop they should be safe
  //   - I guess we bail as soon as anything escapes or is otherwise unpredictable
  // - If the loop is free then we should be able to resolve it ...


  walk(_walker, fdata.tenkoOutput.ast, 'ast');
  function _walker(node, beforeWalk, nodeType, path) {
    if (beforeWalk) return;

    if (node.type !== 'WhileStatement') return;

    // From this node, walk back up up to the start of the block or until the first statement that is not predictable

    const whileIndex = path.indexes[path.indexes.length - 1];
    const blockBody = path.nodes[path.nodes.length - 2]?.body;

    const callNodeToCalleeSymbol = new Map; // CallExpression node (obj instance) to qualified string name of func or method to be called
    const declaredNameTypes = new Map; // Binding name to mustBeType value

    vgroup('Checking isFree on `while` loop @', blockBody[whileIndex].$p.pid, '...');
    vgroup('Scanning statements before the loop...');
    let fromIndex = whileIndex;
    while (fromIndex > 0) {
      fromIndex = fromIndex - 1;
      vgroup('Statement', fromIndex, '(', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
      const r = isFree(blockBody[fromIndex], fdata, callNodeToCalleeSymbol, declaredNameTypes, false, undefined);
      if (!r || r === FAILURE_SYMBOL) {
        vlog('Statement at index', fromIndex, 'is NOT free, ends the scan of pre-while-statements (', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
        fromIndex += 1; // Compensate.
        vgroupEnd();
        break;
      } else {
        vlog('^ Statement at index', fromIndex, 'is free (', blockBody[fromIndex].type, blockBody[fromIndex].init?.type, ')');
      }
      vgroupEnd();
    }
    vgroupEnd();

    vlog('Now calling isFree() on the `while` node... Including these idents before it:', Array.from(declaredNameTypes.keys()));
    for (let i=0; i<node.body.body.length; ++i) {
      const r = isFree(node.body.body[i], fdata, callNodeToCalleeSymbol, declaredNameTypes, true, undefined)
      if (!r || r === FAILURE_SYMBOL) {
        vlog('-- bail: While loop is not free\n\n');
        vgroupEnd();
        return;
      }
    }
    vgroupEnd();

    // While loop must be free. Let's try to resolve it.
    vlog('\n\nOk! Resolving `while` loop @', blockBody[whileIndex].$p.pid, 'at block index', whileIndex,', starting from statement index', fromIndex,'\n\n');

    // The register contains the `init` for each declared variable. We use those as storage.
    // Then, by the end, any decls we want to keep will have the updated/correct node value.
    // The rest, we just drop so it doesn't matter what state they are in.
    const register = new Map;

    rule('A while loop that is fully predictable can be resolved and eliminated');
    example(
      'let x = 0; const arr = []; while (i < 10) { arr.push(i); ++i; }',
      'let x = 10; const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];'
    );
    for (let i=fromIndex; i<=whileIndex; ++i) before(blockBody[i]);

    vlog('\n\nStart of running freeloop\n\n');

    let failed = false;
    for (let i=fromIndex; i<=whileIndex; ++i) {
      const node = blockBody[i];
      if (runStatement(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng) === FAILURE_SYMBOL) {
        failed = true;
        break;
      }
    }

    vlog('Storing final values of pre-loop variables');
    for (let i=fromIndex; i<whileIndex; ++i) {
      if (blockBody[i].type === 'VarStatement' && blockBody[i].init.type !== 'FunctionExpression') {
        //vlog('Setting', blockBody[i].id.name, 'to', register.get(blockBody[i].id.name));
        blockBody[i].init = register.get(blockBody[i].id.name);
      }
    }

    if (failed) {
      vlog('Failed to resolve free loop, ohnooooes');
    } else {
      vlog('Successfully resolved free loop!');
      if (node.type === 'WhileStatement') blockBody[whileIndex] = AST.emptyStatement();
    }

    for (let i=fromIndex; i<=whileIndex; ++i) after(blockBody[i]);
    changed = changed + 1; // hopefully, or this is an endless loop...

    ASSERT(!failed, 'FIXMEHHHH the free loop crashed probably was not free');
  }

  if (changed) {
    log('Free loops dropped:', changed, '. Restarting from phase1');
    return {what: 'freeLoops', changes: changed, next: 'phase1'};
  }

  log('Free func loops dropped: 0.');
}

// A node is "free" when it is fully predictable by preval.
// For example, primitive operations are fully predictable.
// But also, pushing a primitive into an array literal.
function isFree(node, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, assignedTo = undefined) {
  vgroup('isFree(', node.type, node.value, node.name, assignedTo, ')');
  const r = _isFree(node, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, assignedTo);
  vgroupEnd();
  return r;
}
function _isFree(node, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, assignedTo) {
  ASSERT(node, 'should receive a node at least');
  ASSERT(arguments.length === 5 || arguments.length === 6, 'arg count to isFree');

  if (AST.isPrimitive(node)) {
    if (assignedTo) declaredNameTypes.set(assignedTo, AST.getPrimitiveType(node));
    return true;
  }

  switch (node.type) {
    case 'ArrayExpression': {
      if (assignedTo) declaredNameTypes.set(assignedTo, 'array');
      // We can support some cases of spread but initially it won't
      // We can currently only support arrays containing primitives. Later on we'll assume that certain methods
      // on an array will yield primitives (pop/shift) without further checks.
      return node.elements.every(e => !e || AST.isPrimitive(e));
    }
    case 'AssignmentExpression': {
      ASSERT(!assignedTo, 'assignments should be statements so it shouldnt want to assign the type', assignedTo);
      if (node.left.type === 'Identifier') {
        // TODO: does the type of the lhs need updating/checking? mmmmmm
        const a = isFree(node.left, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
        if (!a || a === FAILURE_SYMBOL) return a;
        return isFree(node.right, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined)
      } else if (node.left.type === 'MemberExpression') {
        if (node.left.computed) {
          // `arr[x] = y`
          const a = isFree(node.left.object, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
          if (!a || a === FAILURE_SYMBOL) return a;
          const b = isFree(node.left.property, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
          if (!b || b === FAILURE_SYMBOL) return b;
          return isFree(node.right, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
        } else {
          // `arr.x = y`
          const t = isFree(node.left.object, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
          if (!t || t === FAILURE_SYMBOL) return t;
          return isFree(node.right, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
        }
      } else {
        todo('what else can we assign to?', node.left);
        return false;
      }
    }
    case 'BinaryExpression': {
      // Must re-evaluate lhs and rhs to get their type
      // We'll pass in `true` for the name so we can get the type. That's a hack more than anything else.
      const lhs = isFree(node.left, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, true);
      if (!lhs || lhs === FAILURE_SYMBOL) return lhs;
      const t1 = declaredNameTypes.get(true); // This is a hack.
      const rhs = isFree(node.right, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, true);
      if (!rhs || rhs === FAILURE_SYMBOL) return rhs;
      const t2 = declaredNameTypes.get(true); // This is a hack.
      declaredNameTypes.delete(true);

      vlog('- bin, lhs=', t1,', rhs=', t2, ', op=', node.operator);

      if (assignedTo) {
        if (['>', '<', '==', '===', '!=', '!==', '<=', '>='].includes(node.operator)) {
          declaredNameTypes.set(assignedTo, 'boolean');
        }
        else if (['%', '-', '/', '*', '^', '|', '&', '<<', '>>', '>>>'].includes(node.operator)) {
          declaredNameTypes.set(assignedTo, 'number');
        }
        else if (['+'].includes(node.operator)) {
          if (t1 === 'string' || t2 === 'string' || !PRIMITIVE_TYPE_NAMES_PREVAL.has(t1) || !PRIMITIVE_TYPE_NAMES_PREVAL.has(t2)) {
            // Any op with a string on either side result in a string
            // Any object type will coerce into a string
            declaredNameTypes.set(assignedTo, 'string');
          }
          else {
            // any non-string primitive with numeric op to another non-string primitive results in a number
            declaredNameTypes.set(assignedTo, 'number');
          }
        }
        else {
          todo('Support this binary expression operator:', node.operator);
          return false;
        }
      }

      return true;
    }
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        const t = isFree(node.body[i], fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined)
        if (!t || t === FAILURE_SYMBOL) {
          return t;
        }
      }
      return true;
    }
    case 'BreakStatement': {
      if (node.label) {
        todo('Support breaking to a label in isFree');
        return false;
      }
      // Technically this is only okay once we're inside the loop...?
      if (insideWhile) return true;
      // Some kind of `break` statement before a while loop. Totally valid but if we could solve it a previous call would have..
      return false;
    }
    case 'CallExpression': {
      // A call is free when it is predictable. That means it's a built-in or something we can track, initially just $frfr
      vlog('-- Calling', node.callee.type === 'Identifier' ? node.callee.name : node.callee.object?.name + '.' + node.callee.property?.name);
      if (node.callee.type !== 'Identifier') return false;

      const calleeName = node.callee.name === SYMBOL_DOTCALL ? node.arguments[0]?.name : node.callee.name;
      const context = (node.callee.name === SYMBOL_DOTCALL ? node.arguments[1] : undefined) || AST.undef();
      const args = node.callee.name === SYMBOL_DOTCALL ? node.arguments.slice(3) : node.arguments;

      // All call args must be resolvable if we are to unroll this loop (even including special args of $frfr $dotcall etc)
      if (node.arguments.some((arg, i) => {
        if (!i) return false;
        const r = isFree(arg, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
        return (!r || r === FAILURE_SYMBOL);
      })) {
        todo('- at least one of the frfr args was not isFree, bailing');
        return false;
      }

      vlog('-- call check for', [calleeName], [assignedTo]);

      if (!SUPPORTED_GLOBAL_FUNCS.includes(calleeName)) {
        if (BUILTIN_SYMBOLS.has(calleeName)) {
          todo(`Support this ident in isFree CallExpression: ${calleeName}`);
        }
        vlog('- bail: not a supported function');
        return false;
      }

      switch (calleeName) {
        case SYMBOL_FRFR: {
          // Special case: $frfr. We control this.
          // The return type should be the return type of the func that is the first arg to this call.
          ASSERT(args[0]?.type === 'Identifier', 'frfr first arg must be a free func ref', args);
          const meta = fdata.globallyUniqueNamingRegistry.get(args[0].name);
          const t = meta.typing.returns; // this is a string
          if (!t || t === 'primitive') {
            // Why is "primitive" not useful here?
            todo('Support $frfr that has multiple/no/generic returns type;', t);
            return FAILURE_SYMBOL;
          }
          vlog('- ok: frfr should be safe');
          if (assignedTo) declaredNameTypes.set(assignedTo, t);
          callNodeToCalleeSymbol.set(node.call, args[0].name);
          return true;
        }
        case SYMBOL_COERCE: {
          callNodeToCalleeSymbol.set(node, '$coerce');
          // Special case: $coerce
          // We control this so we should have a string as second arg and unknown as first arg
          if (assignedTo) declaredNameTypes.set(assignedTo, AST.getPrimitiveValue(args[1]));
          if (AST.isPrimitive(args[0])) {
            // ought to be normalized out but ok
            vlog('- ok: coerce arg0 is a primitive');
            return true;
          }
          if (args[0].type === 'Identifier' && declaredNameTypes.has(args[0].name)) {
            vlog('- ok: coerce arg0 is an ident that refs a primitive');
            const t = declaredNameTypes.get(args[0].name);
            // Technically it is possible for this to be an array or whatever. And even that could be supported.
            return PRIMITIVE_TYPE_NAMES_PREVAL.has(t);
          }
          vlog('- bail: coerce arg0 is bad');
          todo('Support non-primitive in first arg to $coerce', args[0]);
          return false;
        }
        case symbo('array', 'pop'): {
          // We must already know the context as an array, otherwise bail.
          if (context.type !== 'Identifier') {
            vlog('- bail: context is not ident');
            todo('Calling array pop on a non-array?');
            return false;
          }
          if (declaredNameTypes.get(context.name) !== 'array') {
            vlog('- bail: context is not array');
            todo('Calling array pop on a var that was not in scope of the free loop');
            return false;
          }

          // Note: isFree on an array asserts that it only consists primitives, so we should be good here.
          vlog('- ok');
          callNodeToCalleeSymbol.set(node, calleeName);
          if (assignedTo) declaredNameTypes.set(assignedTo, 'primitive');
          return true;
        }
        case symbo('array', 'push'): {
          vlog('- can call array push when all args are known and/or primitives');
          vlog('- pushing', args.map(anode => [anode.name, declaredNameTypes.get(anode.name)]))
          // Must verify that all pushed args are primitives of some sort
          if (!args.every(anode => {
            return (
              AST.isPrimitive(anode) ||
              // The idea is that we may not know the primitive at parse time, but as long as it's derived
              // from a value we do know at parse time, we should know the primitive as well when we get to it.
              (anode.type === 'Identifier' && PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(anode.name)))
            );
          })) {
            vlog('- bail: at least one arg was not a primitive');
            return false;
          }

          if (context.type !== 'Identifier') {
            todo('Calling array push on a non-array?');
            return false;
          }
          if (declaredNameTypes.get(context.name) !== 'array') {
            todo('Calling array push on a var that was not in scope of the free loop');
            return false;
          }

          // Note: isFree on an array asserts that it only consists primitives, so we should be good here.
          vlog('- ok');
          callNodeToCalleeSymbol.set(node, calleeName);
          if (assignedTo) declaredNameTypes.set(assignedTo, 'number');
          return true;
        }
        case symbo('array', 'shift'): {
          // We must already know the context as an array, otherwise bail.
          if (context.type !== 'Identifier') {
            todo('Calling array shift on a non-array?');
            return false;
          }
          if (declaredNameTypes.get(context.name) !== 'array') {
            todo('Calling array shift on a var that was not in scope of the free loop');
            return false;
          }

          // Note: isFree on an array asserts that it only consists primitives, so we should be good here.
          vlog('- ok');
          callNodeToCalleeSymbol.set(node, calleeName);
          if (assignedTo) declaredNameTypes.set(assignedTo, 'primitive');
          return true;
        }
        case symbo('array', 'unshift'): {
          vlog('- can call array unshift when all args are known and/or primitives');
          vlog('- pushing', args.map(anode => [anode.name, declaredNameTypes.get(anode.name)]))
          // Must verify that all pushed args are primitives of some sort
          if (!args.every(anode => {
            return (
              AST.isPrimitive(anode) ||
              // The idea is that we may not know the primitive at parse time, but as long as it's derived
              // from a value we do know at parse time, we should know the primitive as well when we get to it.
              (anode.type === 'Identifier' && PRIMITIVE_TYPE_NAMES_PREVAL.has(declaredNameTypes.get(anode.name)))
            );
          })) {
            vlog('- bail: at least one arg was not a primitive');
            return false;
          }

          if (context.type !== 'Identifier') {
            todo('Calling array unshift on a non-array?');
            return false;
          }
          if (declaredNameTypes.get(context.name) !== 'array') {
            todo('Calling array unshift on a var that was not in scope of the free loop');
            return false;
          }

          // Note: isFree on an array asserts that it only consists primitives, so we should be good here.
          vlog('- ok');
          callNodeToCalleeSymbol.set(node, calleeName);
          if (assignedTo) declaredNameTypes.set(assignedTo, 'number');
          return true;
        }
        case 'isNaN':
        case symbo('Number', 'isNaN'):
        case 'isFinite':
        case symbo('Number', 'isFinite'):
        case symbo('Number', 'isInteger'):
        case symbo('Number', 'isSafeInteger'): {
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'boolean');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('Number', 'parseInt'): {
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'number');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('Number', 'parseFloat'): {
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'number');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('String', 'fromCharCode'): {
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'string');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('String', 'fromCodePoint'): {
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'string');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('string', 'charAt'): {
          const t = declaredNameTypes.get(context?.name);
          if (t !== 'string' && !AST.isStringLiteral(context)) {
            vlog('- bail: context not string;', context?.name, t);
            return false;
          }
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'string');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('string', 'charCodeAt'): {
          const t = declaredNameTypes.get(context?.name);
          if (t !== 'string' && !AST.isStringLiteral(context)) {
            vlog('- bail: context not string;', context?.name, t);
            return false;
          }
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'string');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        case symbo('string', 'codePointAt'): {
          // Can this throw? I guess we'll find out
          const t = declaredNameTypes.get(context?.name);
          if (t !== 'string' && !AST.isStringLiteral(context)) {
            vlog('- bail: context not string;', context?.name, t);
            return false;
          }
          vlog('- ok');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'string');
          callNodeToCalleeSymbol.set(node, calleeName);
          return true;
        }
        default: {
          ASSERT(false, 'should cover all SUPPORTED_GLOBAL_FUNCS', calleeName);
        }
      }

      unreachable;
      break;
    }
    case 'EmptyStatement': {
      // I mean ok. but _probably_ want to have this go through phase1 first?
      return true;
    }
    case 'ExpressionStatement': {
      if (!['CallExpression', 'AssignmentExpression'].includes(node.expression.type)) {
        // Eliminate this artifact or we can't run it here.
        if (!['Identifier'].includes(node.expression.type)) {
          todo(`do we want to support ${node.expression.type} as expression statement in free loops?`);
        }
        return false;
      }
      // What do we do with the typing of let assigns? I guess we're just ignoring that right now? Does it matter?
      return isFree(node.expression, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
    }
    case 'FunctionExpression': {
      // For now, don't include func exprs in this logic.
      return false;
    }
    case 'Identifier': {
      // Note: if assignedTo is set then this ident is getting assigned to another ident.
      //       The root cause to start free loops actually contains this so it's not something
      //       we just want to ignore. But it is something to handle explicitly.

      // The identifier may not be a closure; it may not be accessed in another func scope from where it was declared
      // (This is the only way we can guarantee source-code-order evaluation is safe)
      // Beyond that, the var must be a known built-in or a declared var (known to be safe) in the current set.
      if (declaredNameTypes.has(node.name)) {
        if (assignedTo) declaredNameTypes.set(assignedTo, declaredNameTypes.get(node.name));
        return true;
      }
      if (SUPPORTED_GLOBAL_FUNCS.includes(node.name)) {
        if (declaredNameTypes) {
          // Hmmm..
          vlog('Bail on aliasing a builtin. I think normalization should take a look at that.');
          return false;
        }
        return true;
      }
      if (node.name === '$frfr') {
        ASSERT(false, '$frfr is not a real value; it should not be passed around at all ever', node);
        return true;
      }

      if (BUILTIN_SYMBOLS.has(node.name)) {
        todo(`Support referencing this var in isFree: ${node.name}`);
        return false;
      }

      const meta = fdata.globallyUniqueNamingRegistry.get(node.name);
      if (meta.isBuiltin) {
        todo(`Support referencing this builtin in isFree: ${node.name}`);
        return false;
      }

      vlog('- bail: did not pass any of the other cases where ident would be okay here');
      return false; // Maybe there are more valid cases but I don't know what that looks like right now
    }
    case 'IfStatement': {
      let t
      vgroup('test');
      t = isFree(node.test, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      vgroupEnd();
      if (!t || t === FAILURE_SYMBOL) return t;
      vgroup('consequent');
      t = isFree(node.consequent, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      vgroupEnd();
      if (!t || t === FAILURE_SYMBOL) return t;
      vgroup('alternate');
      t = isFree(node.alternate, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      vgroupEnd();
      if (!t || t === FAILURE_SYMBOL) return t;
      return true;
    }
    case 'Literal': {
      // A regex is not necessarily free because it is an object that is stateful
      // I think we'll support it in the future but for now it's a no
      // Bigint and I dunno what else, also no.
      todo('regex in free loops');
      return false;
    }
    case 'MemberExpression': {
      // Note: this cannot be a call. It can still be a delete but not sure if that's super relevant here...?
      if (AST.isPrimitive(node.object)) {
        vlog('- obj is primitive (', AST.getPrimitiveType(node.object), '). Computed:', node.computed);
        if (node.computed && AST.isNumberLiteral(node.property)) {
          vlog('- ok: prop is number literal');
          if (assignedTo) declaredNameTypes.set(assignedTo, 'primitive'); // either an array with primitives or undefined
          return true;
        }
        // Should we be careful here with what we allow? Arbitrary property lookup seems like a recipe for unsafety.
        // Otoh, numbers are fine. In certain cases, regular properties are fine as well.
        if (node.computed) {
          todo('computed property of a primitive access on an unknown expr;', node.property.name);
          return false;
        }
        todo('regular property of a primitive;', node.property.name);
        return false;
      }
      if (node.object.type === 'Identifier') {
        vlog('- obj is ident', [node.object.name], ', Computed:', node.computed, ', propname:', [node.property.name]);
        if (declaredNameTypes.get(node.object.name) === 'array') {
          vlog('- obj is an array type');
          if (node.computed) {
            if (AST.isNumberLiteral(node.property)) {
              vlog('- ok: numbered prop on array');
              if (assignedTo) declaredNameTypes.set(assignedTo, 'primitive'); // either an array with primitives or undefined
              return true;
            }
            if (node.property.type === 'Identifier') {
              const t = declaredNameTypes.get(node.property.name);
              if (t === 'number') {
                vlog('- ok: computed ident prop that is number on array', [node.property.name]);
                if (assignedTo) declaredNameTypes.set(assignedTo, 'primitive'); // either an array with primitives or undefined
                return true;
              }
              vlog('- bail: ident', [node.property.name], 'is not a number but', t);
              return false;
            }
            todo('computed property access of an array but not index prop');
            return false;
          }

          if (node.property.name === 'length' && declaredNameTypes.get(node.object.name) === 'array') {
            // Doing .length on an array ought to be safe?
            if (assignedTo) declaredNameTypes.set(assignedTo, 'number');
            return true;
          }
        }

        todo('regular property access of an ident feels tricky;', node.property.name);
        return false;
      }

      todo('if not primitive or ident what might an object be in normalized space?');
      return FAILURE_SYMBOL;
    }
    case 'ObjectExpression': {
      todo('objects in isFree check');
      return false;
    }
    case 'TryStatement': {
      // A try statement can be supported but only if the catch var is not used.
      // The catch var is an unknown variable. And although I think it's safe to support
      // cases where that is used, I'm not 100% that it doesn't risk leaking of any kind.
      const t = isFree(node.block, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      if (!t || t === FAILURE_SYMBOL) return t;
      const c = isFree(node.handler.body, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      if (!c || c === FAILURE_SYMBOL) return t;

      if (node.handler.param) {
        // Don't remember if we normalized catch param to always exist. No matter.
        if (node.handler.param?.type !== 'Identifier') {
          todo('Try/catch when param is not an ident, is that even possible in normalized code?');
          return false;
        }
        // Verify usage
        const meta = fdata.globallyUniqueNamingRegistry.get(node.handler.param.name);
        if (meta.writes.length > 1 || meta.reads.length > 0) {
          todo('Catch param is used');
          return false;
        }
      }
      // I don't see why `try {} catch {}` would be an issue here. It may hide issues tho.
      return true;
    }
    case 'UnaryExpression': {
      vlog('- operator:', [node.operator]);
      const is = isFree(node.argument, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      if (!is || is ===FAILURE_SYMBOL) return is;

      if (assignedTo) {
        switch (node.operator) {
          case '!': {
            declaredNameTypes.set(assignedTo, 'boolean');
            break;
          }
          case '+':
          case '-':
          case '~':
          {
            declaredNameTypes.set(assignedTo, 'number');
            break;
          }
          case 'typeof': {
            declaredNameTypes.set(assignedTo, 'string');
            break;
          }
          case 'delete': {
            vlog('- bail: not burning my fingers on `delete` right now');
            todo('support delete in free loop?');
            return false;
          }
          default: {
            // Fixes here need to be applied below as well, in execution
            ASSERT(false, `what operator did i miss?`, [node.operator]);
          }
        }
      }

      return true;
    }
    case 'VarStatement': {
      const id = node.id;
      vlog('- Var decl; Recording free variable (probably):', [id.name]);

      const init = node.init;
      if (init.type === 'FunctionExpression') {
        vlog('  - Ignoring function expression as init. Also not recording var (', id.name,')');
        // Ignore..? But don't record this var as accessible.
        return true;
      }
      // Pass in the var id. If it's good then the id will be updated to the type of the expr.
      const r = isFree(init, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, id.name);
      if (!r || r === FAILURE_SYMBOL) {
        vlog('  - The init was not free');
        return false;
      }
      vlog('  - init', [id.name], 'passes isFree, results in', [declaredNameTypes.get(id.name)]);
      ASSERT(declaredNameTypes.get(id.name), 'the type should be set by the sub call');
      return true;
    }
    case 'WhileStatement': {
      if (insideWhile) {
        // Gotta make sure these loop pid uses a single counter (or shared), otherwise they can explode
        return isFree(node.body, fdata, callNodeToCalleeSymbol, declaredNameTypes, insideWhile, undefined);
      }

      // Do not skip over previous loops in the same block. It leads to trouble. If they can be eliminated, they will be.
      return false;
    }
    default: {
      todo(`Support this node type in isFree: ${node.type}`, node);
      return false;
    }
  }

  unreachable();
}

function runStatement(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng) {
  vgroup('# ', node.type);
  const r = _runStatement(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng)
  vgroupEnd();
  return r;
}
function _runStatement(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'BlockStatement': {
      for (let i=0; i<node.body.length; ++i) {
        switch (runStatement(fdata, node.body[i], register, callNodeToCalleeSymbol, prng, usePrng)) {
          case FAILURE_SYMBOL: return FAILURE_SYMBOL;
          case BREAK_SYMBOL: return BREAK_SYMBOL;
        }
      }
      return true;
    }
    case 'BreakStatement': {
      if (node.label) {
        todo('missing label implementation for break');
        return FAILURE_SYMBOL;
      }
      vlog('- eval: Breaky breaky');
      return BREAK_SYMBOL;
    }
    case 'ExpressionStatement': {
      const v = runExpression(fdata, node.expression, register, callNodeToCalleeSymbol, prng, usePrng);
      if (v === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      break;
    }
    case 'EmptyStatement': {
      // I mean ok. _probably_ want to have this go through phase1 first?
      break;
    }
    case 'IfStatement': {
      const v = runExpression(fdata, node.test, register, callNodeToCalleeSymbol, prng, usePrng);
      vlog('- if(', v, ')');
      switch (v) {
        case FAILURE_SYMBOL: return FAILURE_SYMBOL;
        case BREAK_SYMBOL: return true;
      }
      if (v) return runStatement(fdata, node.consequent, register, callNodeToCalleeSymbol, prng, usePrng);
      else return runStatement(fdata, node.alternate, register, callNodeToCalleeSymbol, prng, usePrng);
    }
    case 'TryStatement': {
      // A try statement can be supported but only if the catch var is not used.
      // The catch var is an unknown variable. And although I think it's safe to support
      // cases where that is used, I'm not 100% that it doesn't risk leaking of any kind.

      try {
        return runStatement(fdata, node.block, register, callNodeToCalleeSymbol, prng, usePrng);
      } catch {
        return runStatement(fdata, node.handler.body, register, callNodeToCalleeSymbol, prng, usePrng);
      }
    }
    case 'VarStatement': {
      // We'll only see let and const and I don't think it matters as we don't need to validate mutability.
      const init = node.init;
      //console.log('var decl for: ' + node.id.name, 'total', Array.from(register.keys()).join(' '))
      if (init.type === 'ArrayExpression') {
        vlog('-- Updating', node.id.name, 'to an array node');
        register.set(
          node.id.name,
          init // Use verbatim. The init.elements will be referenced and mutated, most of the time.
        );
      } else if (init.type === 'ObjectExpression') {
        todo('support var decls with objects?');
        return FAILURE_SYMBOL;
      } else if (init.type === 'FunctionExpression') {
        vlog('-- Ignoring var statement init that is function expression? id=', node.id.name);
        //const value = runExpression(fdata, node.init, register, callNodeToCalleeSymbol, prng, usePrng);
        //if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
        //ASSERT(PRIMITIVE_TYPE_NAMES_TYPEOF.has(value === null ? 'null' : typeof value), 'var decl init runexpr should yield a primitive?', node.init, value);
        //
        //vlog('-- Updating', node.id.name, 'to a primitive node', [value]);
        //register.set(
        //  node.id.name,
        //  AST.primitive(value)
        //);
      } else {
        const value = runExpression(fdata, node.init, register, callNodeToCalleeSymbol, prng, usePrng);
        if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
        ASSERT(PRIMITIVE_TYPE_NAMES_TYPEOF.has(value === null ? 'null' : typeof value), 'var decl init runexpr should yield a primitive?', node.init, value);

        vlog('-- Updating', node.id.name, 'to a primitive node', [value]);
        register.set(
          node.id.name,
          AST.primitive(value)
        );
      }

      break;
    }
    case 'WhileStatement': {
      let limit = 1_000_000;
      while (true) {
        if (--limit <= 0) {
          // Prevent runaway loops and ignore.
          vlog('- At least one loop tripped the million iteration breaker');
          return FAILURE_SYMBOL;
        }

        switch (runStatement(fdata, node.body, register, callNodeToCalleeSymbol, prng, usePrng)) {
          case FAILURE_SYMBOL: return FAILURE_SYMBOL;
          case BREAK_SYMBOL: return true;
        }
      }
      return true;
    }
    default: {
      todo('missing support for statement when running a free loop?', node.type, node);
      return FAILURE_SYMBOL;
    }
  }

  return true;
}

function runExpression(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng) {
  vgroup('$ ', node.type);
  const r = _runExpression(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng);
  vgroupEnd();
  return r;
}

// Note: this returns (primitive) values, not AST nodes
function _runExpression(fdata, node, register, callNodeToCalleeSymbol, prng, usePrng) {
  ASSERT(arguments.length === 6, 'arg count to runExpression');
  // We use the AST node of inits of declared vars as value holders as well
  // Eg. if an array literal gets pushed into, we push an AST node into its elements array

  switch (node.type) {
    case 'AssignmentExpression': {
      const value = runExpression(fdata, node.right, register, callNodeToCalleeSymbol, prng, usePrng);
      if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;

      ASSERT(PRIMITIVE_TYPE_NAMES_TYPEOF.has(value === null ? 'null' : typeof value), 'I guess assignment should expect primitives back?', node.right, value);

      if (node.left.type === 'Identifier') {
        const init = register.get(node.left.name);
        ASSERT(init, 'should know this binding');
        vlog('-- Updating', node.left.name, 'assigning a primitive node', [value]);
        register.set(node.left.name, AST.primitive(value));
        // In normalized code, the parent of this assignment node should be an expression statement, so the return value should be moot
        return value;
      } else if (node.left.type === 'MemberExpression') {
        if (node.left.object.type !== 'Identifier') {
          todo('Trying to assign to a non-ident property? yikes', node);
          return FAILURE_SYMBOL;
        }
        const obj = register.get(node.left.object.name);
        // So this should be an array or object literal node that we defined in code, before the loop.
        if (obj?.type !== 'ArrayExpression') {
          // objlit is not yet supported. go add it.
          todo('Assigning to prop but it wasnt an array', obj);
          return FAILURE_SYMBOL;
        }
        if (node.left.computed) {
          const prop = runExpression(fdata, node.left.property, register, callNodeToCalleeSymbol, prng, usePrng);
          if (typeof prop !== 'number') {
            todo('Assigning non-number to computed property, should investigate this first', [prop]);
            return FAILURE_SYMBOL;
          }
          // 10k is a pretty arbitrary number but we have a test case that needs a few thousand and it's no big deal.
          if (prop > obj.elements.length + 10_0000) {
            todo('assigning to array index that is more than 10k bigger than the array len...', [prop]);
            return FAILURE_SYMBOL;
          }
          // Fill the elided elements (this is for the AST!)
          while (prop > obj.elements.length-1) {
            obj.elements.push(null);
          }
          obj.elements[prop] = AST.primitive(value);
        } else {
          // For arrays, can only support .length here.
          if (node.left.property.name !== 'length') {
            todo('Trying to write to unexpected array property', node.left);
            return FAILURE_SYMBOL;
          }
          obj.elements[node.left.property.name] = AST.primitive(value);
        }
        return value;
      } else {
        ASSERT(false, 'what other things can you assign to than idents and members?', node);
        return FAILURE_SYMBOL;
      }
    }
    case 'BinaryExpression': {
      const lhs = runExpression(fdata, node.left, register, callNodeToCalleeSymbol, prng, usePrng);
      if (lhs === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      const rhs = runExpression(fdata, node.right, register, callNodeToCalleeSymbol, prng, usePrng);
      if (rhs === FAILURE_SYMBOL) return FAILURE_SYMBOL;

      vlog('- eval binexpr:', lhs, node.operator, rhs);

      switch (node.operator) {
        case '>': return lhs > rhs;
        case '>=': return lhs >= rhs;
        case '<': return lhs < rhs;
        case '<=': return lhs <= rhs;
        case '==': return lhs == rhs;
        case '===': return lhs === rhs;
        case '!=': return lhs != rhs;
        case '!==': return lhs !== rhs;
        case '%': return lhs % rhs;
        case '-': return lhs - rhs;
        case '/': return lhs / rhs;
        case '*': return lhs * rhs;
        case '^': return lhs ^ rhs;
        case '|': return lhs | rhs;
        case '&': return lhs & rhs;
        case '<<': return lhs << rhs;
        case '>>': return lhs >> rhs;
        case '>>>': return lhs >>> rhs;
        case '+': return lhs + rhs;
        default: {
          todo('all ops here should have been checked by isFree so one was forgotten to get implemented', node.operator);
          return FAILURE_SYMBOL;
        }
      }
    }
    case 'CallExpression': {
      if (node.callee.type !== 'Identifier') ASSERT(false, 'non-ident calls should not reach this point anymore', node);

      const actualFuncName = node.callee.name;

      if (actualFuncName === '$frfr') {
        // This is guaranteed to return a primitive of sorts.
        // We just have to invoke the pcode.

        ASSERT(node.arguments[0]?.type === 'Identifier', '$frfr is controlled by us and first arg should be the free func ref');
        // The func decl node for this $free func should be stored in the callNodeToCalleeSymbol for this argument node ref (see isFree)
        const freeFuncName = node.arguments[0].name;
        const meta = fdata.globallyUniqueNamingRegistry.get(freeFuncName);
        const freeFuncNode = meta.varDeclRef.node;
        ASSERT(meta.writes.length === 1 && freeFuncNode && freeFuncNode.id?.name === '$free', 'we created the free func and it should be a constant...', freeFuncNode.id?.name, meta.writes.length);

        let fail = false;
        const args = node.arguments.slice(1).map(arg => {
          if (AST.isPrimitive(arg)) return arg;
          if (arg.type !== 'Identifier') {
            todo('frfr args should be primitives or local vars or we should support whatever is missing', arg);
            fail = true;
            return;
          }
          if (!register.has(arg.name)) {
            todo('frfr ident args should be local vars or we should support whatever is missing', arg);
            fail = true;
            return;
          }
          const val = register.get(arg.name);
          if (!AST.isPrimitive(val)) {
            todo('frfr ident args should be a primitive', arg, val);
            fail = true;
            return;
          }
          return val;
        });
        if (fail) return FAILURE_SYMBOL;

        const outNode = runFreeWithPcode(freeFuncNode, args, fdata, freeFuncName, prng, usePrng);
        if (!outNode || !AST.isPrimitive(outNode)) {
          todo('The return value of runFreeWithPcode was not a primitive?');
          break;
          return FAILURE_SYMBOL;
        }
        return AST.getPrimitiveValue(outNode);
      }
      else {
        const funcName = callNodeToCalleeSymbol.get(node);

        let targetFuncName = actualFuncName;
        let targetContextNode = undefined;
        let args = node.arguments;
        if (actualFuncName === SYMBOL_DOTCALL) {
          targetFuncName = args[0].name;
          targetContextNode = args[1];
          args = args.slice(3);
        }

        ASSERT(funcName && callNodeToCalleeSymbol.get(node) === funcName, 'The callNodeToCalleeSymbol should contain all call nodes, isFree should do that (frfr too but that special case is captured in the other branch above)', node);

        // The simple stuff that's not part of builtin symbols
        switch (funcName) {
          case symbo('array', 'push'): {
            // The object must be a local var. Find the init.
            ASSERT(targetContextNode?.name, 'since its a method call it must have an object and since its an array it must be an ident', targetContextNode);
            const init = register.get(targetContextNode.name);
            ASSERT(init, 'calling array.push must mean the object is an array must mean it is a local variable which isFree should guarantee', targetContextNode?.name, node);
            // Go through the list of args, resolve them to their current value if not yet, and push a new node for each
            args.forEach(arg => {
              // Each arg must be simple so either it's a primitive or a variable we can lookup
              // If the variable is a local reference then it must outlive the loop (so it must be defined before the loop)
              // That's because we'll be eliminating the loop afterwards so that reference will disappear.
              // There would be an exception for an object that is created and referenced only once. In that case we can compile a node
              // to instantiate that object rather than the reference. But we'd need to be danged certain about its full state...

              if (AST.isPrimitive(arg)) {
                const argValue = AST.getPrimitiveValue(arg);
                init.elements.push(AST.primitive(argValue));
              } else if (arg.type === 'Identifier') {
                // Resolve it from its init
                const argInit = register.get(arg.name);
                if (AST.isPrimitive(argInit)) {
                  const argValue = AST.getPrimitiveValue(argInit);
                  init.elements.push(AST.primitive(argValue));
                } else {
                  todo('Support pushing a non-primitive into an array');
                  return FAILURE_SYMBOL;
                }
              } else {
                todo('Unexpected arg type in call:', arg);
                return FAILURE_SYMBOL;
              }
            });
            return init.elements.length; // array.push returns the new size of the array
          }
          case symbo('array', 'shift'): {
            // The object must be a local var. Find the init.
            ASSERT(targetContextNode?.name, 'since its a method call it must have an object and since its an array it must be an ident', targetContextNode);
            const init = register.get(targetContextNode.name);
            ASSERT(init, 'calling array.push must mean the object is an array must mean it is a local variable which isFree should guarantee', targetContextNode.name, node);
            const front = init.elements.shift();
            return runExpression(fdata, front, register, callNodeToCalleeSymbol, prng, usePrng);
          }
          case '$coerce': {
            const value = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            const targetType = AST.getPrimitiveValue(args[1]) === 'number' ? 'number' : 'string';
            if (targetType === 'plustr') return value + '';
            if (targetType === 'string') return String(value);
            if (targetType === 'number') return value + 0;
            return ASSERT(false, '$coerce should not have anything else');
          }
          case 'isNaN': {
            const value = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isNaN(value);
          }
          case symbo('Number', 'isNaN'): {
            const value = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return Number.isNaN(value);
          }
          case 'isFinite': {
            const value = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return isFinite(value);
          }
          case symbo('Number', 'isFinite'): {
            const value = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return Number.isFinite(value);
          }
          case symbo('Number', 'parseInt'): {
            const value = args[0] ? runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            const base = args[1] ? runExpression(fdata, args[1], register, callNodeToCalleeSymbol, prng, usePrng) : undefined;
            if (base === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return parseInt(value, base);
          }
          case symbo('Number', 'parseFloat'): {
            const value = args[0] ? runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return parseFloat(value);
          }
          case symbo('Number', 'isInteger'): {
            const value = args[0] ? runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return Number.isInteger(value);
          }
          case symbo('Number', 'isSafeInteger'): {
            const value = args[0] ? runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng) : undefined;
            if (value === FAILURE_SYMBOL) return FAILURE_SYMBOL;
            return Number.isSafeInteger(value);
          }
          case symbo('string', 'charAt'): {
            const value = runExpression(fdata, targetContextNode, register, callNodeToCalleeSymbol, prng, usePrng);
            if (typeof value !== 'string') {
              todo('The value was not a string but isFree should have guaranteed it was', targetContextNode);
              return FAILURE_SYMBOL;
            }
            const arg = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (typeof arg !== 'number') {
              todo('The arg was not a number but isFree should have guaranteed it was', args[0]);
              return FAILURE_SYMBOL;
            }
            const ch = value.charAt(arg);
            return ch;
          }
          case symbo('string', 'charCodeAt'): {
            const value = runExpression(fdata, targetContextNode, register, callNodeToCalleeSymbol, prng, usePrng);
            if (typeof value !== 'string') {
              todo('The value was not a string but isFree should have guaranteed it was', targetContextNode);
              return FAILURE_SYMBOL;
            }
            const arg = runExpression(fdata, args[0], register, callNodeToCalleeSymbol, prng, usePrng);
            if (typeof arg !== 'number') {
              todo('The arg was not a number but isFree should have guaranteed it was', args[0]);
              return FAILURE_SYMBOL;
            }
            const ch = value.charCodeAt(arg);
            return ch;
          }
          case symbo('String', 'fromCharCode'): {
            // You can use any number of args here. Into the thousands. So we must take care here.
            const resolvedArgs = args.map(a => runExpression(fdata, a, register, callNodeToCalleeSymbol, prng, usePrng));
            const str = String.fromCharCode.apply(null, resolvedArgs);
            return str;
          }
        }

        // The symbols
        if (
          funcName.startsWith('string_') ||
          funcName.startsWith('number_') ||
          funcName.startsWith('boolean_') ||
          funcName.startsWith('regex_') ||
          funcName.startsWith('array_')
        ) console.dir('free_loops may not have bailed if it implemented `' + funcName + '`');
        todo('Missing implementation for allowed function call to:', funcName);
        return FAILURE_SYMBOL;
      }

      break;
    }
    case 'FunctionExpression': {
      // The only reason isFree would allow this is when it's in the preamble, to skip it
      // So it should be safe to skip it. This variable is a noop for our current task.
      return true;
    }
    case 'Identifier': {
      // Resolve value, either a built-in or a local value from register

      // undefined, NaN, Infinity
      if (AST.isPrimitive(node)) return AST.getPrimitiveValue(node);

      const currInit = register.get(node.name);
      vlog('- resolving ident:', node.name, ', with init:', currInit?.type, currInit?.value, currInit?.name);
      if (currInit) {
        //return runExpression(fdata, currInit, register, callNodeToCalleeSymbol, prng, usePrng);
        if (AST.isPrimitive(currInit)) {
          return AST.getPrimitiveValue(currInit);
        } else {
          todo('Deal with reading an ident that is not a primitive;', node.name, currInit);
          return FAILURE_SYMBOL;
        }
      } else {
        todo('Support global value for ident', node.name, node);
        return FAILURE_SYMBOL;
      }
    }
    case 'Literal': {
      if (AST.isPrimitive(node)) {
        return AST.getPrimitiveValue(node);
      } else {

        todo('Support non-primitive literal expression resolving', node);
        return FAILURE_SYMBOL;
      }
    }
    case 'MemberExpression': {
      if (node.object.type !== 'Identifier') {
        todo('Support member on non-ident');
        return FAILURE_SYMBOL;
      }

      if (node.computed) {
        const obj = register.get(node.object.name);
        const prop = runExpression(fdata, node.property, register, callNodeToCalleeSymbol, prng, usePrng);
        if (obj?.type !== 'ArrayExpression' || typeof prop !== 'number') {
          todo('Not numbered array access, implement me', obj, prop);
          return FAILURE_SYMBOL;
        }
        const v = obj.elements[prop];
        if (v?.type === 'Identifier') vlog('memberexpression[', prop, '] on array is', [v.name]);
        else if (v?.type === 'TemplateLiteral') vlog('memberexpression[', prop, '] on array is string: `' + v.quasis[0].value.raw.slice(0, 10) + '`' + (v.quasis[0].value.raw.length > 10 ? '...' : ''));
        else vlog('memberexpression[', prop, '] on array is', v?.type, v?.value, v?.name)
        if (!v) return undefined;
        else if (AST.isPrimitive(v)) return AST.getPrimitiveValue(v);
        else {
          todo('Array contents was not missing and not a primitive, fixme');
          return FAILURE_SYMBOL;
        }
      } else if (node.property.name === 'length') {
        // Then the context should be an array of sorts, and we can find it in the decl (or register)
        const obj = register.get(node.object.name);
        ASSERT(obj && obj.elements && obj.type === 'ArrayExpression', 'should get the array', node.object.name, obj, node);
        return obj.elements.length;
      } else {
        todo('Support regular prop on ident');
        return FAILURE_SYMBOL;
      }

    }
    case 'TemplateLiteral': {
      return AST.getPrimitiveValue(node);
    }
    case 'UnaryExpression': {
      const val = runExpression(fdata, node.argument, register, callNodeToCalleeSymbol, prng, usePrng);
      if (val === FAILURE_SYMBOL) return FAILURE_SYMBOL;
      switch (node.operator) {
        case '!': return !val;
        case '+': return +val;
        case '-': return -val;
        case '~': return ~val;
        case 'typeof': return typeof val;
        default: {
          ASSERT(false, `what operator did i miss?`, [node.operator]);
        }
      }
    }
    default: {
      todo('missing support for expression when running a free loop?', node.type, node);
      return FAILURE_SYMBOL;
    }
  }

  ASSERT(false, 'gotta return early');
}
