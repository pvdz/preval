import walk from '../../lib/walk.mjs';

import { VERBOSE_TRACING, ASSUME_BUILTINS, DCE_ERROR_MSG, ERR_MSG_ILLEGAL_ARRAY_SPREAD, ERR_MSG_ILLEGAL_CALLEE, FRESH, OLD, RED, BLUE, RESET, } from '../constants.mjs';
import { BUILTIN_FUNCS_NO_CTX_COERCE_FIRST_TO_NUMBER, BUILTIN_FUNCS_NO_CTX_COERCE_FIRST_TO_STRING, BUILTIN_FUNCS_NO_CTXT_NON_COERCE, BUILTIN_SYMBOLS, FUNCTION, GLOBAL_NAMESPACES_FOR_STATIC_METHODS, protoToInstName, symbo, } from '../symbols_builtins.mjs';
import { BUILTIN_REST_HANDLER_NAME, SYMBOL_COERCE, SYMBOL_FORIN, SYMBOL_FOROF, SYMBOL_FRFR, SYMBOL_THROW_TDZ_ERROR, } from '../symbols_preval.mjs';
import { ASSERT, assertNoDupeNodes, log, group, groupEnd, vlog, vgroup, vgroupEnd, tmat, fmat, rule, example, before, source, after, riskyRule, useRiskyRules, todo } from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL, SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL } from '../symbols_preval.mjs';
import { createFreshVar, } from '../bindings.mjs';
import globals, { BUILTIN_GLOBAL_FUNC_NAMES } from '../globals.mjs';
import { cloneFunctionNode, createNormalizedFunctionFromString } from '../utils/serialize_func.mjs';
import { addLabelReference, createFreshLabelStatement, removeLabelReference } from '../labels.mjs';
import { cloneSortOfSimple, isNumberValueNode, varStatement } from '../ast.mjs';

// pattern: tests/cases/ssa/back2back_bad.md (the call should be moved into the branches, replacing the var assigns)

/*
  Normalization steps that happen:
  - Parameter defaults are rewritten to ES5 equivalent code
  - All binding names are unique in a file
    - No shadowing on any level or even between scopes. Lexical scoping becomes irrelevant.
  - Hoists var statements and function declarations to the top of their scope
    - Currently adds complexity because a variable can have two values. But the final system must be able to cope with this so I'm ok with this for now.
    - Duplicate names are eliminated, preferring functions over vars
    - Duplicate functions are reduced to one function
    - Vars and funcs are ordered (within each group)
  - All sub-statements are forced to be blocks
    - We'll let the final formatting undo this step.
    - It makes transforms easier by being able to assume that any statement/decl already lives in a block and needs no extra wrapper
  - Flatten nested blocks
    - Other transforming phases still need to do this because when a single statement is replaced with multiple statements and the parent block is still being iterated, we can't mutate the child-count of the block in-place so a block wrapper is added anyways. This is fine. :fire:
    - Since we normalize binding names to be unique, we don't need to worry about block scoping issues that would otherwise arise here.
  - Eliminate "use strict"
    - We assume module goal. worst case this prevents a parse-time error and even that is a mighty edge case so who cares.
    - Note: this happens naturally by eliminating expression statements that are literals. If an AST uses Directive nodes, this will need extra work.
    - Note: if we ever get more directives than "use strict", we'll need to make sure they work (they might currently break)
  - Member expressions only access idents, literals, or groups that end with an ident or literal
    - This transforms into a group. Other normalization should make sure that this will normalize to separate lines where possible
  - Sequence expressions (groups) nested directly in another sequence expression are flattened
  - Sequence expressions that are expression statements are rewritten to a set of expression statements
  - Sequence expression appearing in certain constructs are rewritten to statements when possible
    - (`return (a,b)` -> `a; return b;`)
    - Sequence expressions in a return statement or variable declaration, or inside a member expression, are normalized
    - Work in progress to catch more cases as I find them
  - One binding declared per decl
    - Will make certain things easier to reason about. Can always assume `node.declarations[0]`.
    - We convert VariableDeclaration nodes to custom VarStatements that enforce this.
  - All call args are only identifiers or literals. Everything is first assigned to a tmp var.
    - `f($())` -> `(tmp=$(), f(tmp))` etc. For all call args.
  - Complex callee and arguments for `new` expressions (similar to regular calls)
  - Array elements are normalized if they are not simple
  - Object property shorthands into regular properties
    - Simplifies some edge case code checks
  - Computed property access for complex keys is normalized to ident keys
  - Computed property access with literals that are valid idents become regular property access
  - Normalize conditional / ternary expression parts
    - Becomes `if-else` when possible
  - All patterns are transformed to body code
    - Parameter, binding, and assignment patterns
    - Further minification may in some cases prevent runtime errors to happen for nullable values... (like `function f([]){} f()`)
    - Including spread and defaults for all object/array patterns on any level
  - arrows with expression body are converted to arrows with block body that explicitly return their previous expression body
  - Assignments (any complex nodes, even &&|| for now) inside statement tests (if, while) to be moved outside
  - Nested assignments into sequence (`a = b = c` -> `(b = c, a = b)`)
  - Return statements without argument get an explicit `undefined` (this way all return statements have non-null nodes)
  - Var binding inits that are assignments are outlined
  - Outline complex `throw` or `return` arguments
  - Outline complex spread arguments for object and array literals
  - Tagged templates are decomposed into the runtime equivalent of a regular func call
  - Templates that have no expressions are converted to regular strings
  - All expressions inside templates are outlined to be simple nodes only.
  - Binary expressions are normalized to always have simple left and right nodes
  - Update expressions (++x) are transformed to regular binary expression assignments
  - Normalize spread args in call/new expressions
  - Normalize optional chaining / call away
  - Normalize nullish coalescing away
  - Regular for-loops are transformed to while loops
  - If-else with empty blocks are eliminated
  - Logical expressions with `??` are transformed away entirely, end up as ternaries
  - Logical expressions with `&&` or `||` are decompiled to `if-else` statements where possible
  - Decompose compound assignments (x+=y -> x=x+y)
  - For headers with var decl are normalized to not contain the var decl
  - While headers are normalized
  - Switches are transformed to if-else with labeled break
  - Label names are made unique globally (relative to the module)
  - Unreferenced labels are dropped
  - Each import statement has exactly one specifier
  - Default imports become named imports (because default exports simply export 'default')
  - Class declarations become class expressions
  - Assignment of an ident to itself is eliminated
  - Statements that only have an identifier will be eliminated unless that identifier is an implicit global
  - DCE
  - If the test of an `if` statement is a negative number, or a number with a `+` prefix, then still fold it.
  - Remove `+` unary from number literals
  - Remove double `-` unary from number literals
  - Inlines various cases of unary `+`, `-`, and `!`
  - Vars and function decls are replaced by lets and let assignments after applying hoisting rules
    - Duplicate declarations are dropped (last func wins, func wins over var)
    - Often func decls become constants, but since that's not a guarantee we leave that up to the next phase
  - Eliminate labels when possible
  - Enforce a max of one if-else per function
    - Currently loops are exempted from this, although in due time they will get a similar treatment
  - Try to move functions to global top if they do not reference anything else but their inner bindings
    - This simplifies functions in some cases by having less content which may make them a more likely candidate for optimizations
  - Normalize branching inside loops into an abstract function
 */

// high level stuff that's not supported: async, iterators, classes <methods, super, inheritance>, prototype, most built-in behavior/funcs.

const BUILTIN_GLOBAL_NAMES = new Set([
  'Array',
  'Date',
  'JSON',
  'Math',
  'Number',
  'String',
  'Boolean',
  'RegExp',
  'Symbol',
  'Object',
  'Function',
]);


export function phaseNormalize(fdata, fname, firstTime, prng, options) {
  {
    const {prngSeed, allowEval, ...rest} = options;
    const keys = Object.keys(rest);
    ASSERT(keys.length === 0, 'normalize should not receive these options or this should be updated', keys);
  }

  const { allowEval = true, prngSeed = 1 } = options;

  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const ast = fdata.tenkoOutput.ast;
  const funcStack = []; // [1] is always global (.ast)
  const thisStack = []; // Only for function expressions (no arrows or global, decls are eliminated)
  const ifelseStack = [ast]; // TODO: misnomer but I think we can delete this entirely...
  const labelStack = [];
  const loopStack = [null]; // Note: null indicates function boundary. Contains while or null nodes.
  let inGlobal = true; // While walking, are we currently in global space or inside a function

  group('\n\n\n##################################\n## phaseNormalize  ::  ' + fname + '\n##################################\n\n\n');
  assertNoDupeNodes(ast, 'body');

  if (VERBOSE_TRACING && firstTime) vlog('\nCurrent state (start of normalize)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');

  let passes = 0;
  do {
    changed = false;
    transformProgram(ast);
    //stmt(null, 'ast', -1, ast, false, false);
    if (VERBOSE_TRACING && firstTime && passes === 0) vlog('\nCurrent state (post normalize)\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
    if (changed) {
      somethingChanged = true;
      log('Something changed. Running another normalization pass (' + ++passes + ')\n');
    }

    assertNoDupeNodes(ast, 'ast');
  } while (changed);

  if (VERBOSE_TRACING) {
    vlog('After normalization:');
    vlog(
      '\ngloballyUniqueNamingRegistry (name[r/w] but may be desynced, omits builtins)(1):\n' +
      (
        (fdata.globallyUniqueNamingRegistry.size - globals.size) > 50
          ? '<too many (' + (fdata.globallyUniqueNamingRegistry.size - globals.size) + ')>'
          : fdata.globallyUniqueNamingRegistry.size === globals.size
            ? '<none>'
            : Array.from(fdata.globallyUniqueNamingRegistry.keys()).filter((name) => !globals.has(name)).map(name => `${name}[${fdata.globallyUniqueNamingRegistry.get(name).reads.length}/${fdata.globallyUniqueNamingRegistry.get(name).writes.length}]`).join(', ')
      ),
    );
    vlog(
      '\ngloballyUniqueLabelRegistry:\n',
      fdata.globallyUniqueLabelRegistry.size > 50
        ? '<too many>'
        : fdata.globallyUniqueLabelRegistry.size === 0
          ? '<none>'
          : [...fdata.globallyUniqueLabelRegistry.keys()].join(', '),
    );
    vlog();
  }

  log('End of phaseNormalize');
  groupEnd();

  return somethingChanged;

  function funcArgsWalkObjectPattern(node, cacheNameStack, newBindings, kind, top = false) {
    // kind = param, var, assign
    group('- walkObjectPattern', kind);

    node.properties.forEach((propNode, i) => {
      log('- prop', i, ';', propNode.type);

      if (propNode.type === 'RestElement') {
        log('  - rest prop');
        // Yes, it's Element.
        // This is a "leaf" node. Rest properties cannot be patterns and cannot have a default
        // `function f({a, ...b}){ return b; }`
        // -> `function f(obj) { const tmp = obj.a; const {b: tmp3, ...b} = obj; }`
        // -> `function f(obj) { const tmp = obj.a; const b = objPatternRest(tmp, ['a']); return b; }
        // Object spread will actually be quite hard to emulate... Let's use something like `$objPatternRest` as DSL for it.

        ASSERT(propNode.argument.type === 'Identifier', 'TODO: non ident rest keys?', propNode, ', prop index:', i, ', parent:', node);

        const restName = propNode.argument.name;

        // -> `let bindingName = restHander(sourceObject, ['excluded', 'props'])`
        // -> `bindingName = restHander(sourceObject, ['excluded', 'props'])`
        newBindings.push([
          restName,
          OLD,
          AST.callExpression(BUILTIN_REST_HANDLER_NAME, [
            AST.identifier(cacheNameStack[cacheNameStack.length - 1]),
            AST.arrayExpression(node.properties.filter((n) => n !== propNode).map((n) => AST.templateLiteral(n.key.name))),
            top ? AST.templateLiteral(restName) : AST.identifier('undefined'),
          ]),
        ]);

        return;
      }

      if (propNode.computed) {
        // - `let { [a + b]: c } = x;`    // this means `var c = x[a+b]`
        // Pre-normalization should ensure that num/string keys also become computed
        // - `let { "a b": c} = x;`
        // - `let { 200: c} = x;`
        const keyVarName = createFreshVar('tmpCK', fdata);
        newBindings.push([
          keyVarName,
          FRESH,
          propNode.key
        ]);
        propNode.key = AST.identifier(keyVarName);
      } else {
        // Pre-normalization should ensure that num/string keys also become computed so the only non-computed things left are idents
        ASSERT(propNode.key.type === 'Identifier', 'TODO: non ident keys?', propNode, ', prop index:', i, ', parent:', node);
      }

      let valueNode = propNode.value;
      if (propNode.value.type === 'AssignmentPattern') {
        // `function({x = y})`
        // -> We'll first transform the `x` part. Afterwards we'll know what the binding name
        //    of that step will be. Then we'll add a check to see if that's `undefined` and
        //    in that case assign the node.right to it. That's essentially what happens here.
        valueNode = valueNode.left;

        // Observable side effect order of defaults vs property reads...
        // `function e({a = f(), b = g()} = {get a(){ return h(); }})`
        // -> `e()`, calls `h()` then `g()`
        // -> `e({})`, calls `f()` then `g()`
        // So the `=undefined` check must go before reading the properties
        // However, we won't know what name the value will be stored in at this
        // point. So remember the node we will inject here and update the name
        // after processing the node. Should not be a problem... Fingers crossed.

        // The param value before applying the default value checks
        const paramNameBeforeDefault = createFreshVar('tmpOPBD', fdata);
        log('  - Regular prop `' + propNode.key.name + '` with default');
        log('  - Stored into `' + paramNameBeforeDefault + '`');

        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameAfterDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('tmpOPAD', fdata);
        cacheNameStack.push(paramNameAfterDefault);

        // Store the property in this name. It's a regular property access and the previous step should
        // be cached already. So read it from that cache.
        // `function([x = y]){}`
        // -> `function(tmp) { let tmp2 = [...tmp], tmp3 = tmp2[0], x = tmp3 === undefined ? y : x; }`
        newBindings.push(
          [paramNameBeforeDefault, FRESH, AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name)],
          [
            paramNameAfterDefault,
            valueNode.type === 'Identifier' ? OLD : FRESH,
            AST.conditionalExpression(
              AST.binaryExpression('===', paramNameBeforeDefault, 'undefined'),
              propNode.value.right,
              paramNameBeforeDefault,
            ),
          ],
        );
      } else {
        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameWithoutDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('tmpOPND', fdata);
        cacheNameStack.push(paramNameWithoutDefault);
        log('  - Regular prop `' + propNode.key.name + '` without default');
        log('  - Stored into `' + paramNameWithoutDefault + '`');

        // Store the property in this name. It's a regular property access and the previous step should
        // be cached already. So read it from that cache.
        newBindings.push([
          paramNameWithoutDefault,
          valueNode.type === 'Identifier' ? OLD : FRESH,
          AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name, propNode.computed),
        ]);
      }

      if (valueNode.type === 'ArrayPattern') {
        funcArgsWalkArrayPattern(valueNode, cacheNameStack, newBindings, kind);
      } else if (valueNode.type === 'ObjectPattern') {
        // Every step that is not a leaf should be verified to be non-nullable
        funcArgsWalkObjectPattern(valueNode, cacheNameStack, newBindings, kind);
      } else {
        ASSERT(valueNode.type === 'Identifier', 'welke nog meer?', valueNode);
      }

      cacheNameStack.pop();
    });

    if (!node.properties.length) {
      // No properties so we need to explicitly make sure it throws if the value is null/undefined
      const paramNameBeforeDefault = createFreshVar('tmpObjPatternCrashTest', fdata); // Unused. Should eliminate easily.
      const lastThing = cacheNameStack[cacheNameStack.length - 1];
      newBindings.push([
        paramNameBeforeDefault,
        FRESH,
        AST.logicalExpression(
          '&&',
          AST.logicalExpression(
            '||',
            AST.binaryExpression('===', lastThing, 'undefined'),
            AST.binaryExpression('===', lastThing, AST.nul()),
          ),
          AST.memberExpression(lastThing, 'cannotDestructureThis'),
        ),
      ]);
    }

    groupEnd();
  }

  function funcArgsWalkArrayPattern(node, cacheNameStack, newBindings, kind) {
    // kind = param, var, assign
    group('- walkArrayPattern', kind);

    const arrSplatName = node.type === 'Identifier' ? node.name : createFreshVar('tmpArrPatternSplat', fdata);
    cacheNameStack.push(arrSplatName);
    // Store this property in a local variable. Because it's an array pattern, we need to invoke the iterator. The easiest
    // way syntactically is to spread it into an array. Especially since we'll want indexed access to it later, anyways.
    // -> `arrPatternSplat = [...arrPatternTmp]`
    newBindings.push([
      arrSplatName,
      node.type === 'Identifier' ? OLD : FRESH,
      AST.arrayExpression(
        // Previous prop step was stored in a var so access the prop on that var.
        // Invoke the iterator by spreading it into an array. Also means we can safely try direct access
        AST.spreadElement(cacheNameStack[cacheNameStack.length - 2]),
      ),
    ]);

    node.elements.forEach((elemNode, i) => {
      log('elemNode:', elemNode?.type);

      if (!elemNode) return; // Ignore elided elements (they will be `null` in the AST)

      if (elemNode.type === 'RestElement') {
        // This is a "leaf" node. Rest elements cannot be patterns and cannot have a default
        // `function f([a, ...b]){ return b; }`
        // -> `function f(arr) { const tmp = arr.a; const b = arr.slice(1); }`

        ASSERT(elemNode.argument.type === 'Identifier', 'TODO: non ident rest keys?', elemNode);

        const restName = elemNode.argument.name;

        newBindings.push([
          restName,
          OLD,
          AST.memberCall(cacheNameStack[cacheNameStack.length - 1], 'slice', [
            AST.literal(i), // If rest is first arg, then arr.slice(0)
          ]),
        ]);

        return;
      }

      let valueNode = elemNode;
      if (elemNode.type === 'AssignmentPattern') {
        // `function([x=y])`
        // -> We'll first transform the `x` part. Afterwards we'll know what the binding name
        //    of that step will be. Then we'll add a check to see if that's `undefined` and
        //    in that case assign the node.right to it. That's essentially what happens here.
        valueNode = valueNode.left;

        log('The array pattern had a default. Preparing to compile that statement in that mutates');
        // Observable side effect order of defaults vs property reads...
        // `function e({a = f(), b = g()} = {get a(){ return h(); }})`
        // -> `e()`, calls `h()` then `g()`
        // -> `e({})`, calls `f()` then `g()`
        // So the `=undefined` check must go before reading the properties
        // However, we won't know what name the value will be stored in at this
        // point. So remember the node we will inject here and update the name
        // after processing the node. Should not be a problem... Fingers crossed.

        // The param value before applying the default value checks
        const paramNameBeforeDefault = createFreshVar('tmpAPBD', fdata);

        // Store this element in a local variable. If it's a leaf, use the actual
        // element name as the binding, otherwise create a fresh var for it.

        const paramNameAfterDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('tmpArrPatternStep', fdata);
        cacheNameStack.push(paramNameAfterDefault);

        // Store the property in this name
        // `function([x = y]) {}`
        // -> `function(tmp) { let tmp1 = [...tmp], tmp2 = tmp1[0], x = tmp2 === undefined ? y : tmp2; }`
        newBindings.push(
          [
            paramNameBeforeDefault,
            FRESH,
            // Previous prop step was stored in a var so access the prop on that var:
            AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], AST.literal(i), true),
          ],
          [
            paramNameAfterDefault,
            valueNode.type === 'Identifier' ? OLD : FRESH,
            AST.conditionalExpression(
              AST.binaryExpression('===', paramNameBeforeDefault, 'undefined'),
              elemNode.right,
              paramNameBeforeDefault,
            ),
          ],
        );
      } else {
        // Store this element in a local variable. If it's a leaf, use the actual
        // element name as the binding, otherwise create a fresh var for it.

        const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('tmpArrPatternStep', fdata);
        cacheNameStack.push(bindingName);

        // Store the property in this name
        newBindings.push([
          bindingName,
          valueNode.type === 'Identifier' ? OLD : FRESH,
          // Previous prop step was stored in a var so access the prop on that var:
          AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], AST.literal(i), true),
        ]);
      }

      if (valueNode.type === 'ObjectPattern') {
        funcArgsWalkObjectPattern(valueNode, cacheNameStack, newBindings, kind);
      } else if (valueNode.type === 'ArrayPattern') {
        funcArgsWalkArrayPattern(valueNode, cacheNameStack, newBindings, kind);
      } else {
        ASSERT(valueNode.type === 'Identifier', 'ook dat nog', valueNode);
      }

      cacheNameStack.pop();
    });

    cacheNameStack.pop();

    groupEnd();
  }

  function anyBlock(block, funcNode = null, labelStatementParentNode = null) {
    // program, body of a function, actual block statement, switch case body, try/catch body (finallys are eliminated)
    vgroup('anyBlock');
    const body = block.body;

    let somethingChanged = false;
    for (let i = 0; i < body.length; ++i) {
      const cnode = body[i];
      if (jumpTable(cnode, body, i, block, funcNode, labelStatementParentNode)) {
        changed = true;
        somethingChanged = true;
        --i;
      }
    }

    vgroupEnd();
    vlog('/anyBlock', somethingChanged);
    return somethingChanged;
  }

  function jumpTable(node, body, i, parentBlock, funcNode, labelStatementParentNode) {
    vgroup(i, 'jumpTable', node.type);
    ASSERT(node.type, 'nodes have types oye?', node);
    const r = _jumpTable(node, body, i, parentBlock, funcNode, labelStatementParentNode);
    vgroupEnd();
    return r;
  }

  function _jumpTable(node, body, i, parentBlock, funcNode, labelStatementParentNode) {
    switch (node.type) {
      case 'BlockStatement':
        return transformBlock(node, body, i, parentBlock, true);
      case 'BreakStatement':
        return transformBreakStatement(node, body, i, parentBlock, labelStatementParentNode);
      case 'DebuggerStatement':
        return false;
      case 'EmptyStatement': {
        rule('Drop empty statements inside a block');
        example('{;}', '{}');
        body.splice(i, 1);
        return true;
      }
      case 'ExportNamedDeclaration':
        return transformExportNamedDeclaration(node, body, i, parentBlock);
      case 'ExpressionStatement':
        return transformExpression('statement', node.expression, body, i, node);
      case 'IfStatement':
        return transformIfStatement(node, body, i, parentBlock);
      case 'ImportDeclaration':
        return transformImportDeclaration(node, body, i, parentBlock);
      case 'LabeledStatement':
        return transformLabeledStatement(node, body, i, parentBlock);
      case 'MethodDefinition':
        return transformMethodDefinition(node, body, i, parentBlock);
      case 'ReturnStatement':
        return transformReturnStatement(node, body, i, parentBlock);
      case 'ThrowStatement':
        return transformThrowStatement(node, body, i, parentBlock);
      case 'TryStatement':
        return transformTryStatement(node, body, i, parentBlock);
      case 'VarStatement':
        return transformVarStatement(node, body, i, parentBlock, funcNode);
      case 'VariableDeclaration':
        return transformVariableDeclaration(node, body, i, parentBlock, funcNode);
      case 'WhileStatement':
        return transformWhileStatement(node, body, i, parentBlock);

      case 'Program':
        return ASSERT(false); // This should not be visited since it is the first thing to be called and the node should not occur again.

      case 'ExportAllDeclaration':
        TODO;
        return false;

      // These should not appear. Either because they're not allowed (with), or because they're internal nodes
      case 'CatchClause':
      case 'ClassBody':
      case 'Directive':
      case 'ExportSpecifier':
      case 'ImportDefaultSpecifier':
      case 'ImportNamespaceSpecifier':
      case 'ImportSpecifier':
      case 'VariableDeclarator':
      case 'WithStatement':
        throw ASSERT(false, 'these should not be visited', node, node.type);
      // These should already be normalized away
      case 'ClassDeclaration':
      case 'ContinueStatement':
      case 'DoWhileStatement':
      case 'ExportDefaultDeclaration':
      case 'ForInStatement':
      case 'ForOfStatement':
      case 'ForStatement':
      case 'FunctionDeclaration':
      case 'SwitchStatement':
      case 'SwitchCase':
        throw ASSERT(false, 'this node type should have been eliminated in the norm_once step', node.type);
    }

    log(RED + 'Missed stmt:', node.type, RESET);
    addme;
    return false;
  }

  function dce(body, i, desc) {
    vlog('dce("' + desc + '");');
    // This should be called after an abnormal flow control (return, break, (continue), or throw) or an if or block that
    // is guaranteed to complete abnormally, recursively. Either way, any code that follows it can not be executable.
    // We do have to be careful about the remainder because it might introduce new binding names that we wouldn't want
    // to eliminate just yet, for the sake of analysis. Example: `if (y) x = 1; return; let x`.
    // Additionally, if this was a block or `if`, it should end with an explicit completion. Any trailing bindings
    // should be moved in front of it, which runs the risk of unnecessarily potentially breaking TDZ semantics.

    ASSERT(
      [
        'ReturnStatement',
        'ThrowStatement',
        'BreakStatement',
        //'ContinueStatement', (eliminated)
        // For `if` it means both branches stop early
        'IfStatement',
        // If this is a block then it's nested and guaranteed to stop early
        'BlockStatement',
      ].includes(body[i].type),
      'dce after abrupt completion or an if or block that does so',
      body[i],
    );

    const nominated = body.slice(i);
    let sawReturnUndefinedLast = false;
    const varDeclsToKeep = nominated.filter((node) => {
      vlog('- Nominated:', node.type);
      if (node.type === 'ReturnStatement' && node.argument && node.argument.type === 'Identifier' && node.argument.name === 'undefined') {
        sawReturnUndefinedLast = true;
        return false;
      }
      else {
        sawReturnUndefinedLast = false;
        return node.type === 'VarStatement' || node.type === 'VariableDeclaration'; // It's possible in the first step to still see them both
      }
    });
    if (i + 1 + varDeclsToKeep.length + (varDeclsToKeep.length && sawReturnUndefinedLast ? 1 : 0) === body.length) {
      // The trailing body contained only var decls and if so, maybe, a return statement after them. No need to do anything.
      // If the return did not return undefined, or was not last, or was present without any var decls being
      // introduced, then we would still need to change something here.
      return false;
    }

    rule('Dead code elimination (DCE) for code after abnormal flow abort; ' + desc);
    example('return; f();', 'return;');
    before(body.slice(i), body);

    // Note: .length is a getter so this assignment drops all trailing elements from the body
    body.length = i + 1;

    if (varDeclsToKeep.length > 0) {
      vlog(
        'Restoring',
        varDeclsToKeep.length,
        'nodes because they define a binding. We will need another way to eliminate them. Or replace them with an empty var decl...',
      );

      const toSplice = varDeclsToKeep.map((node) => {
        if (node.type === 'VarStatement') {
          // Note: we're keeping the kind because even if we could force it to be a constant, that would
          //       throw off certain assertions about how many writes a constant may have. whatever.
          return AST.varStatement(node.kind, node.id.name, AST.literal(0));
        }
        else if (node.type === 'VariableDeclaration') {
          // Note: we're keeping the kind because even if we could force it to be a constant, that would
          //       throw off certain assertions about how many writes a constant may have. whatever.
          return AST.varStatement(node.kind, node.declarations[0].id.name, AST.literal(0));
        }
        else {
          if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') {
            throw ASSERT(false, 'these should be eliminated while hoisting');
          }
          throw ASSERT(false, 'what are we keeping?');
        }
      });

      if (!inGlobal) {
        // If we keep at least one var decl, then compile a return statement as well for the sake of normalization
        // If a return existed before it will be replaced. We need to change _something_ so that should be fine.
        // If there were no variables then all branches should complete explicitly and we would not need this `return`.
        // Of course, we do not add a return keyword in global.
        toSplice.push(AST.returnStatement('undefined'));
      }

      body.splice(i + 1, 0, ...toSplice);
    }

    after(body.slice(i));
    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }

  function transformBlock(node, body, i, parentBlock, isNested, labelStatementParentNode) {
    // Note: isNested=false means this is a sub-statement (if () {}), otherwise it's a block inside a block/func/program node
    ASSERT(isNested ? body && i >= 0 : !body && i < 0, 'body and index are only given for nested blocks');

    if (node.body.length === 0) {
      if (isNested) {
        rule('Empty nested blocks should be eliminated');
        example('{ f(); { } g(); }', '{ f(); g(); }');
        before(node, parentBlock);

        const newNode = AST.emptyStatement();
        body.splice(i, 1, newNode);

        after(newNode, parentBlock);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      } else {
        // Parent statement (if/while/for-x) should eliminate this if possible
        return false;
      }
    }

    //ASSERT(!node.$p.hasFuncDecl);
    if (parentBlock.type === 'BlockStatement' && !node.$p.hasFuncDecl) {
      rule('Nested blocks should be smooshed');
      example('{ a(); { b(); } c(); }', '{ a(); b(); c(); }');
      before(parentBlock);

      body.splice(i, 1, ...node.body);

      after(parentBlock);
      return true;
    }

    if (parentBlock.type === 'Program') {
      rule('Top level blocks should be eliminated');
      example('a(); { b(); } c();', 'a(); b(); c();');
      before(node, parentBlock);

      body.splice(i, 1, ...node.body);

      after(parentBlock);
      return true;
    }

    if (anyBlock(node, undefined, labelStatementParentNode)) {
      return true;
    }

    vlog(
      BLUE + 'block;returnBreakThrow?' + RESET,
      node.$p.returnBreakThrow ? 'yes; ' + node.$p.returnBreakThrow : 'no',
    );
    parentBlock.$p.returnBreakThrow = node.$p.returnBreakThrow;
    if (isNested) {
      if (node.$p.returnBreakThrow && body.length > i + 1) {
        if (dce(body, i, 'after block')) {
          return true;
        }
      }
    }

    return false;
  }

  function transformBreakStatement(node, body, i, parentBlock, labelStatementParentNode) {
    vlog(BLUE + 'Marking parent (' + parentBlock.type + ') as breaking early' + RESET);
    parentBlock.$p.returnBreakThrow = 'break';
    if (node.label) {
      if (
        labelStatementParentNode?.type === 'LabeledStatement' &&
        labelStatementParentNode.label.name === node.label.name &&
        labelStatementParentNode.body.body[labelStatementParentNode.body.body.length - 1] === node // is last
      ) {
        rule('A labeled statement with a labeled break targeting its label in its body tail position can drop the break');
        example('A: { f(); break A; }', 'A: { f(); }');
        before(node);

        // Note: We can NOT eliminate the label based on this because there might be other breaks to this label nested in the body
        //       Instead, we can safely eliminate the break statement, and if that's the only reference to the label then another
        //       rule will clean up the (now unused) label.

        removeLabelReference(fdata, node.label);
        body[i] = AST.emptyStatement();

        after(node);
        return true;
      }

      // Find the parent label (syntactically required to exist)
      let index = labelStack.length - 1;
      while (index >= 0) {
        if (labelStack[index].label.name === node.label.name) {
          break;
        }
        index -= 1;
        ASSERT(index >= 0, 'must find the label');
      }

      const labelStmt = labelStack[index];
      // Now verify that the last statmenet of the loop body is a while
      // Then verify that this while is the nearest loop for this break
      // In that case we can go ahead with the next rule

      ASSERT(labelStmt && labelStmt.body,'break without label? hrm did we duplicate a break statement again? this messes up label tracking', parentBlock, labelStatementParentNode)

      if (
        labelStmt.body.body.length &&
        labelStmt.body.body[labelStmt.body.body.length - 1].type === 'WhileStatement' &&
        labelStmt.body.body[labelStmt.body.body.length - 1] === loopStack[loopStack.length - 1]
      ) {
        rule('A labeled break inside a loop when the loop is the last element of the child of that label block, does not need the label');
        example('A: { while (true) break A; }', 'A: { while (true) break; }');
        before(node, labelStatementParentNode);

        removeLabelReference(fdata, node.label);
        node.label = null;

        after(node, labelStatementParentNode);
        return true;
      }

      addLabelReference(fdata, node.label, body, i);
    } else {
      // An unlabeled break is the only way for a while(true) to continue to the next statement
      // If there is none then the next statement is guaranteed dead and we can DCE it.
      loopStack[loopStack.length - 1].$p.hasUnlabeledBreak = true;
    }

    if (body.length > i + 1) {
      if (dce(body, i, 'after break')) {
        return true;
      }
    }
    return false;
  }

  function normalizeCallArgs(args, newArgs, newNodes) {
    // This is used for `new` and regular function calls
    args.forEach((anode) => {
      if (anode.type === 'SpreadElement') {
        const tmpName = createFreshVar('tmpCalleeParamSpread', fdata);
        newNodes.push(AST.varStatement('let', tmpName, anode.argument));
        anode.argument = AST.identifier(tmpName);
        newArgs.push(anode);
      }
      else if (AST.isPrimitive(anode) && !AST.isComplexNode(anode)) {
        // Don't create a separate var for this. There's no side effect to trigger on them regardless.
        newArgs.push(anode);
      }
      else {
        const tmpName = createFreshVar('tmpCalleeParam', fdata);
        newNodes.push(AST.varStatement('let', tmpName, anode));
        newArgs.push(AST.identifier(tmpName));
      }
    });
  }

  function transformExportNamedDeclaration(node, body, i, parentNode) {
    ASSERT(!node.declaration, 'decl style should have been eliminated in the initial norm_once step');

    if (node.source?.type === 'Literal') {
      ASSERT(typeof node.source.value === 'string', 'right?', node.source);

      rule('Export source strings should be templates internally, even if that is technically invalid');
      example('export {x} from "foo"', 'export {x} from `foo`');
      before(node.source, node);

      node.source = AST.templateLiteral(node.source.value);

      after(node.source, node);
      return true;
    }

    const specs = node.specifiers;
    ASSERT(specs, 'one or the other', node);

    specs.forEach((spec) => {
      const local = spec.local;
      ASSERT(local && local.type === 'Identifier', 'specifier locals are idents right?', node);
      vlog('Marking `' + local.name + '` as being used by this export');
    });

    return false;
  }

  function wrapExpressionAs(kind, varInitAssignKind, varInitAssignId, lhs, varOrAssignKind, expr) {
    // TODO: Figure out whether I want to change the wrapping and double wrapper stuff, or that it might be fine this way
    //       It is the reason for

    ASSERT(
      !expr || (typeof expr === 'object' && expr.type && !expr.type.toLowerCase().includes('statement') && !expr.type.includes('declar')),
      'probably did not mean to pass a statement-node...',
      expr,
    );
    ASSERT(kind !== 'assign' || varOrAssignKind === '=', 'should this not already be normalized?');
    ASSERT(
      (varInitAssignKind === undefined && varInitAssignId === undefined) || kind === 'assign',
      'the varinit stuff is only used for an assignment thats the init of a var decl',
      kind,
      varInitAssignKind,
      varInitAssignId,
    );
    if (kind === 'statement') {
      // Elided element. Ignore.
      if (expr) return AST.expressionStatement(expr);
      return AST.emptyStatement();
    }
    if (kind === 'assign') {
      // If the element was elided, replace it with `undefined`
      if (varInitAssignId) {
        // This was an assignment as the init of a var decl. So the assignment was not a statement and we must replace
        // the whole var decl with a new one, not just the assignment.
        return AST.varStatement(
          varInitAssignKind,
          varInitAssignId,
          AST.assignmentExpression(lhs, expr || AST.undef(), varOrAssignKind),
        );
      }
      return AST.expressionStatement(AST.assignmentExpression(lhs, expr || AST.undef(), varOrAssignKind));
    }
    if (kind === 'var') return AST.varStatement(varOrAssignKind, lhs, expr || AST.undef());
    ASSERT(false);
  }

  function transformExpression(
    wrapKind /* statement, var, assign, export, default */,
    node, // this is not body[i] (!)
    body,
    i,
    parentNodeOrWhatever, // For var/assign, this is the entire node. For statement, this is the ExpressionStatement
    wrapLhs = false,
    varOrAssignKind = false, // If parent is var then this is var kind, if parent is assign, this is assign operator. else empty
    varInitAssignKind, // if body[i] is a var decl and this assignment is its init, then this is the kind of the var
    varInitAssignId, // if body[i] is a var decl and this assignment is its init, then this is the id of the var (verbatim)
  ) {
    // This one is a big one. There are a handful of atomic expression statements;
    // - call
    // - new
    // - assignment
    // - member expression (because getters)
    // - tagged template
    // - await <noop>
    // - yield <noop>
    // - anything else that has observable side effects that I can't think off right now
    // Anything else can be dropped.
    // All statements will make sure their expression bits are simple nodes, and abstract complex nodes to temporary / fresh
    // variables. This becomes either a variable declaration or an expression statement.
    // This means all expressions should normalize to an atomic state by recursively transforming the decl init and expression statement

    vlog('transformExpression:', node.type);
    ASSERT(parentNodeOrWhatever, 'parent node?');

    switch (node.type) {
      case 'ArrayExpression': {
        let inlinedAnySpreads = false;
        for (let j = 0; j < node.elements.length; ++j) {
          const n = node.elements[j];
          if (n && n.type === 'SpreadElement') {
            if (AST.isStringLiteral(n.argument, true)) {
              // We can splat the string into individual elements (this could be an intermediate step while inlining constants)
              // TODO: do we want to limit the length of the string here? Or doesn't matter?
              rule('Array spread on string should be individual elements');
              example('[..."xyz"];', '["x", "y", "z"];');
              before(n, node);

              node.elements.splice(j, 1, ...[...AST.getStringValue(n.argument, true)].map((s) => AST.templateLiteral(s)));

              after(node);
              inlinedAnySpreads = true;
              --j; // Relevant if the string is empty
            } else if (AST.isPrimitive(n.argument)) {
              if (node.elements.length !== 1 || body[i + 1]?.type !== 'ThrowStatement') {
                rule('Array spread on non-string literal must result in an error');
                example('[...500];', '[...500]; throw error;');
                example('[...true];', '[...true]; throw error;');
                before(n, node);

                ASSERT(
                  node.elements.slice(0, j).every((n) => !AST.isComplexNode(n.type === 'SpreadElement' ? n.argument : n)),
                  'prior array elements should already be normalized',
                );
                node.elements.length = 0;
                node.elements.push(n);
                body.splice(i + 1, 0, AST.throwStatement(AST.templateLiteral(ERR_MSG_ILLEGAL_ARRAY_SPREAD)));

                after(node);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            } else if (n.argument.type === 'ArrayExpression') {
              rule('Array spread on another array should be unlined');
              example('[...[1, 2 ,3]]', '[1, 2, 3]');
              before(node);

              node.elements.splice(j, 1, ...n.argument.elements);

              after(node);
              inlinedAnySpreads = true;
              --j;
            }
          }
        }
        if (inlinedAnySpreads) {
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (wrapKind === 'statement') {
          // Consider an array statements that only has simple spreads to be okay
          // For normalization purposes, we want one array with spread per statement
          // Put everything else before/after it as expression statements.

          let printedHead = false;
          function printHead() {
            if (printedHead) return;

            printedHead = true;
          }

          if (node.elements.length === 1) {
            // May already be the base case (an array with a spread)
            if (!node.elements[0]) {
              rule('Array statements when the array has a single elided element can be dropped');
              example('[,,];', ';');
              before(body[i]);

              body.splice(i, 1); // Drop the original array. It only contains an elided element.

              after(AST.emptyStatement());
              return true;
            } else if (node.elements[0]?.type === 'SpreadElement') {
              // This is normalized state. Keep.
            } else {
              rule('Array statements with a single value should be a statement without the array');
              example('[a];', 'a;');
              before(body[i]);

              body[i].expression = node.elements[0]; // Replace the array with its only element. Other rules will clean it up.

              after(body[i]);
              return true;
            }
          } else {
            rule('Array statements should be picked apart, eliminating primitives, one spread per array, and one statement per other element');
            example('[a, , b, ...x, 1, ...y];', 'a; b; [...x]; [...y];');
            before(body[i]);

            body.splice(i, 1); // Remove the original array statement. We will drop it regardless.

            let moved = 0;
            let dropped = 0;

            let bucket = [];
            const buckets = [bucket];
            for (const e of node.elements) {
              if (!e || AST.isPrimitive(e)) {
                // Drop it
                dropped += 1;
              } else if (e.type === 'SpreadElement') {
                // Add it to the sets then add a new array
                buckets.push(e);
                bucket = [];
                buckets.push(bucket);
              } else {
                // Create statement for this. Dunno what it is exactly but not a primitive so it's potentially relevant to keep.
                bucket.push(e);
              }
            }

            // Buckets should contain a zipped up set of nodes to statementify and then spread elements.
            // We removed the original statement, by walking the buckets backwards we should be able to inject them at index=i
            for (let n=buckets.length-1; n>=0; --n) {
              if (n % 2 === 0) {
                // List of elements to turn into statements
                const bucket = buckets[n];
                body.splice(i, 0, ...bucket.map(e => AST.expressionStatement(e)));
                moved += bucket.length;
              } else {
                // Spread element to stick to array
                const spread = buckets[n];
                body.splice(i, 0, AST.expressionStatement(AST.arrayExpression(spread)));
                moved += 1;
              }
            }

            vlog('Dropped', dropped, ' and moved', moved, 'elements');

            // We removed the original array statement, regardless because the base case is in the other code path
            if (!moved) after(AST.emptyStatement());
            else after(body.slice(i, i+moved));

            // Restart
            return true;
          }

          if (
            node.elements.length === 1 &&
            node.elements[0] &&
            node.elements[0].type === 'SpreadElement' &&
            !AST.isComplexNode(node.elements[0].argument)
          ) {
            vlog('This is an array with only a spread with simple arg. Base case that we keep as is.');
            return false;
          }

          if (node.elements.length === 0) {
            rule('Array literal statement with no elements can be dropped');
            example('[];', ';');
            before(body[i]);

            body[i] = AST.emptyStatement();

            after(body[i]);
            return true;
          }

          rule('Array statements are only allowed if they have exactly one spread with a simple arg');
          example('[a, b()];', 'a; b();');
          example('[...a(), ...b];', 'const tmp = a(); [...tmp]; [...b];');
          before(node, parentNodeOrWhatever);

          vlog('Replacing the spreads...');
          const newNodes = [];
          node.elements.forEach((enode) => {
            if (!enode) return;

            if (enode.type === 'SpreadElement') {
              // Replace with fresh array with one spread. Make sure the arg is simple.

              if (AST.isComplexNode(enode.argument)) {
                const tmpName = createFreshVar('tmpArrElToSpread', fdata);
                const newNode = AST.varStatement('const', tmpName, enode.argument);
                newNodes.push(newNode);
                const spread = AST.expressionStatement(AST.arrayExpression(AST.spreadElement(tmpName)));
                newNodes.push(spread);
              } else {
                const spread = AST.expressionStatement(AST.arrayExpression(enode));
                newNodes.push(spread);
              }
              return;
            }

            // Otherwise this was a regular element. Just move it to a statement.
            const newNode = AST.expressionStatement(enode);
            newNodes.push(newNode);
          });
          vlog('done replacing the spreads');
          body.splice(i, 1, ...newNodes);
          vlog('and done with the body');

          after(newNodes, parentNodeOrWhatever);
          after(newNodes);
          after(parentNodeOrWhatever);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Since closures may affect binding values, we must simplify all nodes up to the last complex node
        let last = -1;
        node.elements.forEach((enode, n) => {
          if (enode) {
            if (enode.type === 'SpreadElement' ? AST.isComplexNode(enode.argument) : AST.isComplexNode(enode)) {
              last = n;
            }

            if (
              enode.type === 'Identifier' &&
              (enode.name === SYMBOL_MAX_LOOP_UNROLL || enode.name.startsWith(SYMBOL_LOOP_UNROLL))
            ) {
              rule('Any usage of the unroll constants as array literal should become `true`');
              example('x = + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = + true');
              before(body[i]);

              node.elements[n] = AST.tru();

              after(body[i]);
              return true;
            }
          }
        });
        if (last >= 0) {
          rule('Elements of array literals must be simple');
          example('[a, b(), c]', 'tmp = a, tmp2 = b(), [tmp, tmp2, c]');
          before(node, parentNodeOrWhatever);

          const newNodes = [];
          const newNames = [];
          for (let i = 0; i <= last; ++i) {
            const enode = node.elements[i];
            if (!enode) {
              // do not remove elided elements
              newNames.push([null, false]);
            } else if (enode.type === 'SpreadElement') {
              const tmpName = createFreshVar('tmpArrSpread', fdata);
              newNodes.push(AST.varStatement('const', tmpName, enode.argument));
              newNames.push([tmpName, true]);
            } else {
              const tmpName = createFreshVar('tmpArrElement', fdata);
              newNodes.push(AST.varStatement('const', tmpName, enode));
              newNames.push([tmpName, false]);
            }
          }
          const finalNode = AST.arrayExpression([
            ...newNames.map(([name, spread]) => (name === null ? null : spread ? AST.spreadElement(name) : AST.identifier(name))),
            ...node.elements.slice(last + 1),
          ]);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'ArrowFunctionExpression': {
        if (wrapKind === 'statement') {
          rule('Statement that is an arrow should be dropped');
          example('()=>{};', ';');
          before(node, parentNodeOrWhatever);

          body.splice(i, 1);

          after(AST.emptyStatement(), parentNodeOrWhatever);
          return true;
        }

        if (node.expression) {
          rule('Arrow body must be block');
          example('() => x', '() => { return x; }');
          before(node, parentNodeOrWhatever);

          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;

          after(node, parentNodeOrWhatever);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        funcStack.push(node);
        ifelseStack.push(node);
        anyBlock(node.body, node);
        ifelseStack.pop();
        funcStack.pop();

        ASSERT(node.params.every(p => p.type === 'Param'), 'are all params Params?', node);

        rule('Arrows should be function expressions after this/arguments are transformed');
        example('const x = () => {};', 'const x = function(){}');
        before(node, parentNodeOrWhatever);

        // May not be normalized. That's probably going to cause me some problems later eh.
        const finalNode = AST.functionExpression(node.params, node.body, { async: node.async, normalized: false });
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'AssignmentExpression': {
        const lhs = node.left;
        const rhs = node.right;
        vlog('-', lhs.type, node.operator, rhs.type);

        if (lhs.type === 'ObjectPattern') {
          const tmpNameRhs = createFreshVar('tmpAssignObjPatternRhs', fdata);
          const cacheNameStack = [tmpNameRhs];
          const newBindings = [];

          funcArgsWalkObjectPattern(lhs, cacheNameStack, newBindings, 'assign', true);

          if (newBindings.length) {
            rule('Assignment obj patterns not allowed');
            example('({x} = y())', 'tmp = y(), x = tmp.x, tmp');
            before(node, parentNodeOrWhatever);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([tmpNameRhs, FRESH, rhs]);

            const newNodes = newBindings.map(([name, fresh, expr]) => {
              if (fresh) return AST.varStatement('const', name, expr);
              return AST.expressionStatement(AST.assignmentExpression(name, expr));
            });
            const finalNode = AST.identifier(tmpNameRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          rule('Assignment obj patterns not allowed, empty');
          example('({} = y())', 'y()');
          before(node, parentNodeOrWhatever);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (lhs.type === 'ArrayPattern') {
          const rhsTmpName = createFreshVar('tmpArrAssignPatternRhs', fdata);
          const cacheNameStack = [rhsTmpName];
          const newBindings = [];

          funcArgsWalkArrayPattern(lhs, cacheNameStack, newBindings, 'assign');

          if (newBindings.length) {
            rule('Assignment arr patterns not allowed, non-empty');
            example('[x] = y()', '(tmp = y(), tmp1 = [...tmp], x = tmp1[0], tmp)');
            before(node, parentNodeOrWhatever);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.
            // Final step in sequence must still be origina rhs (`a = [x] = y` will assign `y` to `a`, not `x`)

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, FRESH, rhs]);

            const newNodes = newBindings.map(([name, fresh, expr]) => {
              if (fresh) return AST.varStatement('const', name, expr);
              else return AST.expressionStatement(AST.assignmentExpression(name, expr));
            });
            const finalNode = AST.identifier(rhsTmpName);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          rule('Assignment arr patterns not allowed, empty');
          example('[] = y()', 'y()'); // TODO: Does it have to be spreaded anyways? Do I care?
          before(node, parentNodeOrWhatever);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        ASSERT(lhs.type === 'Identifier' || lhs.type === 'MemberExpression', 'uhhh was there anything else assignable?', node);

        if (lhs.type === 'MemberExpression') {
          // x = a.b = c
          // x = a[b] = c
          const mem = lhs;
          const a = mem.object;
          const b = mem.property;
          const c = rhs;

          ASSERT(!lhs.optional, 'optional chaining member expression cannot be lhs of assignment, right?');

          // Must start with object/property because we don't want to duplicate complex nodes while eliminating compound assignments
          // The reason is that compound assignments read before they write so the getters also become an observable side effect

          if (mem.computed && AST.isProperIdent(mem.property, true)) {
            const str = AST.getStringValue(mem.property, true);
            rule('Computed property that is valid ident must be member expression; assign rhs');
            example('a["foo"]', 'a.foo');
            before(mem, parentNodeOrWhatever);

            vlog('- Name: `' + str + '`');

            mem.computed = false;
            mem.property = AST.identifier(str);

            after(mem, parentNodeOrWhatever);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (mem.computed && AST.isComplexNode(b)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rule('Assignment to computed property must have simple property node');
            example('a[b()] = c()', '(tmp = a, tmp2 = b(), tmp[tmp2] = c())');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignComMemLhsObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignComMemLhsProp', fdata);
            const newNodes = [
              AST.varStatement('const', tmpNameObj, a), // tmp = a()
              AST.varStatement('const', tmpNameProp, b), // tmp2 = b()
            ];
            const finalNode = AST.assignmentExpression(
              AST.memberExpression(tmpNameObj, tmpNameProp, true), // tmp[tmp2]
              c,
              node.operator, // tmp[tmp2] = c(), or tmp[tmp2] += c()
            );
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (AST.isComplexNode(a)) {
            // Note: resulting node must remain assignment to member expression (because it's an assignment target)
            rule('Assignment to member expression must have simple lhs');
            example('a().b = c()', '(tmp = a(), tmp2.b = c())', () => !node.computed && node.operator === '=');
            example('a()[b()] = c()', '(tmp = a(), tmp2[b()] = c())', () => node.computed && node.operator === '=');
            example('a().b += c()', '(tmp = a(), tmp2.b += c())', () => !node.computed && node.operator !== '=');
            example('a()[b()] += c()', '(tmp = a(), tmp2[b()] += c())', () => node.computed && node.operator !== '=');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignMemLhsObj', fdata);
            const newNodes = [
              AST.varStatement('const', tmpNameObj, a), // tmp = a()
            ];
            const finalNode = AST.assignmentExpression(
              AST.memberExpression(tmpNameObj, b, mem.computed), // tmp.b or tmp[b()]
              c,
              node.operator, // tmp.b = tmp2, or tmp.b += tmp2
            );
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.operator !== '=') {
            // The compound assignment is not assignable so no need to return an assignment or assignable
            // The a and b ought to be simple at this point. It's not relevant whether or not it's computed.

            rule('Compound assignment to property must be regular assignment');
            example('a.b += c()', 'tmp = a.b, tmp.b = tmp + c()', () => !mem.computed);
            example('a[b] += c()', 'tmp = a[b], tmp[b] = tmp + c()', () => mem.computed);
            before(node, parentNodeOrWhatever);

            const tmpNameLhs = createFreshVar('tmpCompoundAssignLhs', fdata);
            // tmp = a.b, or tmp = a[b]
            const newNodes = [
              AST.varStatement('const', tmpNameLhs, AST.memberExpression(AST.cloneSimple(a), AST.cloneSimple(b), mem.computed)),
            ];
            // tmp.b = tmp + c(), or tmp[b] = tmp + c()
            const finalNode = AST.assignmentExpression(
              AST.memberExpression(AST.cloneSimple(a), AST.cloneSimple(b), mem.computed),
              AST.binaryExpression(node.operator.slice(0, -1), tmpNameLhs, c),
            );
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (mem.computed && AST.isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a and b must be simple at this point but c() could still mutate them so we cache them anyways
            rule('Assignment to computed property must have simple object, property expression, and rhs');
            example('a[b] = c()', 'tmp = a, tmp2 = b, tmp3 = c(), tmp[tmp2] = tmp3');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignComputedObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignComputedProp', fdata);
            const tmpNameRhs = createFreshVar('tmpAssignComputedRhs', fdata);
            ASSERT(node.operator === '=');
            const newNodes = [
              AST.varStatement('const', tmpNameObj, a), // tmp = a()
              AST.varStatement('const', tmpNameProp, b), // tmp2 = b()
              AST.varStatement('const', tmpNameRhs, c), // tmp3 = c()
            ];
            // tmp[tmp2] = tmp3
            const finalNode = AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), tmpNameRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (!mem.computed && AST.isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a must be simple at this point but c() could still mutate it so we cache it anyways
            rule('Assignment to member expression must have simple lhs and rhs');
            example('a.b = c()', '(tmp = a, tmp2 = c(), tmp).b = tmp2');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignMemLhsObj', fdata);
            const tmpNameRhs = createFreshVar('tmpAssignMemRhs', fdata);
            ASSERT(node.operator === '=');
            const newNodes = [
              AST.varStatement('const', tmpNameObj, a), // tmp = a()
              AST.varStatement('const', tmpNameRhs, c), // tmp2 = c()
            ];
            const finalNode = AST.assignmentExpression(AST.memberExpression(tmpNameObj, b), tmpNameRhs);
            // tmp.b = tmp2
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // If assigning to a property and the previous statement was a var decl defining the object literal: merge it
          // Ok tbf this will do much better as a ref tracked plugin so this is just picking a low hanging fruit case
          if (
            i &&
            body[i-1].type === 'VarStatement' &&
            body[i-1].init.type === 'ObjectExpression' &&
            a.type === 'Identifier' &&
            body[i-1].id.name === a.name && // Assigning to property of objlit defined in prev statement
            // Check to confirm the property is not already defined as a getter/setter...
            body[i-1].init.properties.every(pnode => {
              if (!pnode.computed && !lhs.computed) {
                // Same ident key. Ok if not the same key or if same key and objlit had it as init (not get/set)
                // Note: kind is get/set/init
                return pnode.key.name !== b.name || pnode.kind === 'init';
              }
              if (pnode.computed && lhs.computed) {
                // Both are computed.
                // If either is not a primitive then we dont know the actual key and return false
                // If both are primitive but not the same we return true
                // If both are primitive and the same, we return whether the objlit defined it as init (not get/set)

                if (!AST.isPrimitive(pnode.key) || !AST.isPrimitive(b)) return false; // Don't know
                if (AST.getPrimitiveValue(pnode.key) !== AST.getPrimitiveValue(b)) return true; // not same key so not a blocker
                return pnode.kind === 'init'; // Same key, ok if not a getter/setter
              }
              ASSERT(pnode.computed !== lhs.computed, 'was asserted above');
              // In normalized code, if we know the key and it is a valid ident then we would eliminate the computed flag
              // Otherwise, we apparently don't know the key so we must err on the side of caution: consider it blocking

              // Exception: if the key is a primitive then we can recover by getting the primitive value and comparing it
              if (pnode.computed) {
                return AST.isPrimitive(pnode.key) && String(AST.getPrimitiveValue(pnode.key)) !== b.name;
              }

              // else lhs.computed
              return AST.isPrimitive(b) && String(AST.getPrimitiveValue(b)) !== pnode.key.name;
            })
          ) {
            rule('Assigning a property to an object literal defined on the previous line should be inlined');
            example('const obj = {}; obj.x = 5;', 'const obj = {x: 5}');
            before(body[i-1]);
            before(body[i]);

            body[i-1].init.properties.push(AST.property(b, rhs, false, a.computed));
            body[i] = AST.emptyStatement();

            before(body[i-1]);
            before(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // lhs must now be `a.b` or `a[b]`; a simple member expression
        }

        if (node.operator !== '=') {
          // At this point the lhs is either an identifier or a simple member expression
          // We should be safe to transform compound assignments away such that they don't complicate later transforms
          // We couldn't do this before because it might have duplicated complex node. But it's fine for idents and simple props
          rule('Compound assignments with simple lhs should be regular assignments');
          example('a *= c()', 'a = a * c()', () => lhs.type === 'Identifier');
          example('a.b *= c()', 'a.b = a.b * c()', () => lhs.type !== 'Identifier' && !lhs.computed);
          example('a[b] *= c()', 'a[b] = a[b] * c()', () => lhs.type !== 'Identifier' && lhs.computed);
          before(node, parentNodeOrWhatever);

          const finalNode = AST.assignmentExpression(
            AST.cloneSimple(lhs),
            AST.binaryExpression(node.operator.slice(0, -1), AST.cloneSimple(lhs), rhs),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(body[i]);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (rhs.type === 'AssignmentExpression') {
          // To preserve observable side effect order we have to process a few cases here in a specific way
          // We have to do it here because a recursive parse would not have a statement parent, which I want, so... ugh
          // Note: if a, b, or c is complex then it must be evaluated in a b c order. And only once each.
          // 1 - `a = b = c` --> `b = c, a = c` (end state)
          // 2 - `a = b = c()` --> `tmp = c(), a = b = tmp` --> 1 (I think, but we could also do to `b = c(), a = b` ...)
          // 3 - `a = b.x = c` --> `b.x = c, a = c` (end state)
          // 4 - `a = b.x = c()` --> `tmp = c(), a = b.x = tmp` --> 3
          // 5 - `a = b().x = c` --> `tmp = b(), a = tmp.x = c` --> 4
          // 6 - `a = b().x = c()` --> `tmp = b(), a = tmp.x = c()` --> 4
          // or
          // if the rhs.lhs.object or rhs.rhs is complex, store it in tmp.
          // if the rhs.lhs is a member expression, the property is not read (so that can't serve as the rhs)
          // in other words, if we make sure to stash the rhs.lhs.object in a tmp var, and then the rhs.rhs,
          // then we should always be able to use the rhs.rhs (which must be simple at that point) for the
          // `b = c, a = c` base case safely, regardless whether b is a member expression or ident.
          // TODO: do we want to special case `a = (b, c).d = e` --> `(b, a = c.d = e)`? It's no problem now, just adds an unnecessary var

          const a = lhs; // Always simple, either an identifier, or a simple member expression.
          const rhsLhs = rhs.left;
          const rhsRhs = rhs.right;

          if (rhsLhs.type === 'Identifier') {
            // a = b = c
            // lhs = rhsLhs = rhsRhs
            const b = rhsLhs;
            // a is simple node, b is identifier, so only c is questionable
            const c = rhsRhs;

            if (rhs.operator !== '=') {
              // This is a = b *= c() with simple a and ident b
              rule('Nested compound assignment must not be compound');
              example('a = b *= c()', 'tmp = b, a = b = tmp * c()');
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpNestedCompoundLhs', fdata);
              // tmp = b
              const newNodes = [AST.varStatement('const', tmpName, b)];
              // a = b = tmp * c()
              const finalNode = AST.assignmentExpression(
                a,
                // b = tmp * c()
                AST.assignmentExpression(AST.cloneSimple(b), AST.binaryExpression(rhs.operator.slice(0, -1), tmpName, c)),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (AST.isComplexNode(c)) {
              // In this case, a and b are only set, so we don't need to cache even if c() would mutate
              // With simple a and ident b
              rule('The rhs.rhs of a nested assignment must be simple');
              example('a = b = c()', 'tmp = c(), a = b = tmp');
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpNestedComplexRhs', fdata);
              const newNodes = [AST.varStatement('const', tmpName, c)];
              const finalNode = AST.assignmentExpression(a, AST.assignmentExpression(b, tmpName));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // This is `a = b = c` with all idents (or, `x = a = b = c` or `let x = a = b = c`)
            rule('Nested assignment with all idents must be split');
            example('a = b = c', 'b = c, a = c');
            before(node, parentNodeOrWhatever);

            const newNodes = [AST.expressionStatement(AST.assignmentExpression(b, AST.cloneSimple(c)))];
            const finalNode = AST.assignmentExpression(a, AST.cloneSimple(c));
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhsLhs.type === 'MemberExpression') {
            // a = b.c = d
            // a = b.c += d
            // `$(1)[$(2)] += $(3)` is evaluated in 1, 1[2].get, 3, 1[2].set order
            const b = rhsLhs.object;
            const c = rhsLhs.property;
            const d = rhsRhs;

            ASSERT(!rhsLhs.optional, 'optional chaining cannot be lhs of nested assignment, right?');

            if (rhsLhs.computed && AST.isComplexNode(c)) {
              // In this case we also need to cache b first, since the execution of c may change it after the fact
              // (so we must store the value before evaluating c) but we don't have to care if calling b or c changes the
              // value of d since that would always be evaluated last.
              rule('The computed property of a nested assignment must be a simple node');
              example('a = b[c()] = d()', 'tmp = b, tmp2 = c(), a = tmp[tmp2] = d', () => rhs.operator === '=');
              example('a = b[c()] *= d()', 'tmp = b, tmp2 = c(), a = tmp[tmp2] = d', () => rhs.operator !== '=');
              before(node, parentNodeOrWhatever);

              const tmpNameObj = createFreshVar('tmpNestedAssignComMemberObj', fdata);
              const tmpNameProp = createFreshVar('tmpNestedAssignComMemberProp', fdata);
              const newNodes = [AST.varStatement('const', tmpNameObj, b), AST.varStatement('const', tmpNameProp, c)];
              // a = tmp[tmp2] = d
              const finalNode = AST.assignmentExpression(
                a,
                // tmp[tmp2] = d
                AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), d, rhs.operator),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (AST.isComplexNode(b)) {
              // Whether c is computed or not, it is simple (as per above check). Check if b is complex.
              rule('The object of a nested property assignment must be a simple node');
              example('a = b().c = d', 'tmp = b(), a = tmp.c = d()', () => !rhsLhs.computed);
              example('a = b()[c] = d', 'tmp = b(), a = tmp[c] = d()', () => rhsLhs.computed);
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpNestedAssignObj', fdata);
              const newNodes = [AST.varStatement('const', tmpName, b)];
              const finalNode = AST.assignmentExpression(
                a,
                AST.assignmentExpression(AST.memberExpression(tmpName, c, rhsLhs.computed), d, rhs.operator),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // We must be left with `a = b.c = d()` or `a = b[c] = d()`, which must all be simple nodes except d
            // and which may be a compound assignment. We need to check that first to preserve get/set order.

            if (rhs.operator !== '=') {
              rule('Nested compound prop assignment with all simple parts must be split');
              example('a = b.c *= d()', 'tmp = b.c * d(), a = b.c = tmp');
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpNestedPropCompoundComplexRhs', fdata);
              const newNodes = [
                AST.varStatement('const', tmpName, AST.binaryExpression(rhs.operator.slice(0, -1), AST.cloneSimple(rhsLhs), d)),
                AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(rhsLhs), tmpName)),
              ];
              const finalNode = AST.assignmentExpression(a, tmpName);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (AST.isComplexNode(d)) {
              // a and b.c are simple but d is not and the assignment is regular. Since this means neither a nor b.c
              // are read, we don't need to cache them and we can outline d() by itself without worrying about
              // awkward getter setter side effects. Getters dont trigger, setters retain order.

              // It's not relevant whether lhs is computed. Either way there is no other side effect to read/write
              rule('The rhs of a nested assignment to a computed property must be simple');
              example('a = b.c = d()', 'tmp = d(), a = b.c = tmp', () => !rhsLhs.computed);
              example('a = b[c] = d()', 'tmp = d(), a = b[c] = tmp', () => rhsLhs.computed);
              before(node, parentNodeOrWhatever);

              const tmpNameRhs = createFreshVar('tmpNestedAssignPropRhs', fdata);
              const newNodes = [
                // tmp = d()
                AST.varStatement('const', tmpNameRhs, d),
              ];
              const finalNode = AST.assignmentExpression(a, AST.assignmentExpression(rhsLhs, tmpNameRhs));
              // a = b = tmp, a = b.c = tmp, a = b[c] = tmp
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            ASSERT(
              !AST.isComplexNode(lhs) &&
              node.operator === '=' &&
              !AST.isComplexNode(b) &&
              (!rhsLhs.computed || !AST.isComplexNode(c)) &&
              rhs.operator === '=' &&
              !AST.isComplexNode(d),
              'the nested assignment ought to be atomic now, apart from being nested',
            );

            {
              // We must cache d because the b.c setter may otherwise change it. Redundant steps ought to be cleaned up trivially.
              rule('Nested assignment to property where all nodes are simple must be split up');
              example('a = b.c = d', 'tmp = d, b.c = tmp, a = tmp');
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpNestedPropAssignRhs', fdata);
              const newNodes = [
                AST.varStatement('const', tmpName, d),
                AST.expressionStatement(AST.assignmentExpression(rhsLhs, tmpName)),
              ];
              const finalNode = AST.assignmentExpression(a, tmpName);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
            }
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhsLhs.type === 'ObjectPattern') {
            rule('Object patterns in nested assign are not allowed');
            const tmpNameRhs = createFreshVar('tmpNestedAssignObjPatternRhs', fdata);
            const cacheNameStack = [tmpNameRhs];
            const newBindings = [];

            funcArgsWalkObjectPattern(rhsLhs, cacheNameStack, newBindings, 'assign', true);

            if (newBindings.length) {
              rule('Nested assignment obj patterns not allowed');
              example('a = ({x} = y())', 'tmp = y(), x = tmp.x, a = tmp');
              before(node, parentNodeOrWhatever);

              // Replace this assignment node with a sequence
              // Contents of the sequence is the stuff in newBindings. Map them into assignments.

              // First assign the current rhs to a tmp variable.
              newBindings.unshift([tmpNameRhs, FRESH, rhsRhs]);

              const newNodes = newBindings.map(([name, fresh, expr], i) => {
                if (fresh) return AST.varStatement('const', name, expr);
                return AST.expressionStatement(AST.assignmentExpression(name, expr));
              });
              const finalNode = AST.assignmentExpression(a, tmpNameRhs);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            rule('Assignment obj patterns not allowed, empty');
            example('a = {} = y()', 'a = y()');
            before(node, parentNodeOrWhatever);

            const finalNode = AST.assignmentExpression(a, rhsRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhsLhs.type === 'ArrayPattern') {
            rule('Array patterns in nested assign are not allowed');
            const tmpNameRhs = createFreshVar('tmpNestedAssignArrPatternRhs', fdata);
            const cacheNameStack = [tmpNameRhs];
            const newBindings = [];

            funcArgsWalkArrayPattern(rhsLhs, cacheNameStack, newBindings, 'assign');

            if (newBindings.length) {
              rule('Nested assignment arr patterns not allowed, non-empty');
              example('a = [x] = y()', '(tmp = y(), tmp1 = [...tmp], x = tmp1[0], a = tmp)');
              before(node, parentNodeOrWhatever);

              // Replace this assignment node with a sequence
              // Contents of the sequence is the stuff in newBindings. Map them into assignments.
              // Final step in sequence must still be origina rhs (`a = [x] = y` will assign `y` to `a`, not `x`)

              // First assign the current rhs to a tmp variable.
              newBindings.unshift([tmpNameRhs, FRESH, rhsRhs]);
              const newNodes = newBindings.map(([name, fresh, expr]) => {
                if (fresh) return AST.varStatement('const', name, expr);
                return AST.expressionStatement(AST.assignmentExpression(name, expr));
              });
              const finalNode = AST.assignmentExpression(a, tmpNameRhs);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            rule('Assignment arr patterns not allowed, empty');
            example('a = [] = y()', 'a = y()'); // TODO: Does it have to be spreaded anyways? Do I care?
            before(node, parentNodeOrWhatever);

            const finalNode = AST.assignmentExpression(a, rhsRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          ASSERT(false, 'wait wat dis?', node);
        }

        if (rhs.type === 'SequenceExpression') {
          rule('Assignment rhs must not be sequence');
          example('a = (b, c)', '(b, a = c)');
          before(node, parentNodeOrWhatever);

          const seq = rhs;
          const exprs = seq.expressions.slice(0); // Last one will replace the sequence
          const newNodes = [...exprs.slice(0, -1).map((e) => AST.expressionStatement(e))];
          const finalNode = AST.assignmentExpression(lhs, exprs.pop(), node.operator);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (rhs.type === 'MemberExpression') {
          if (rhs.optional) {
            // a = b?.c
            rule('Nested assignment rhs can not be optional chaining');
            example('x = a = b?.c', 'tmp = b; if (tmp) a = tmp.c; else a = undefined;', () => !rhs.computed);
            example('x = a = b?.[c()]', 'tmp = b; if (tmp) a = tmp[c()]; else a = undefined;', () => rhs.computed);
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignOptMem', fdata);
            const tmpNameVal = createFreshVar('tmpAssignOptVal', fdata);
            const newNodes = [
              AST.varStatement('const', tmpNameObj, rhs.object),
              AST.varStatement('let', tmpNameVal, AST.undef()),
              AST.ifStatement(
                tmpNameObj,
                AST.expressionStatement(AST.assignmentExpression(tmpNameVal, AST.memberExpression(tmpNameObj, rhs.property, rhs.computed))),
              ),
            ];
            const finalNode = AST.assignmentExpression(lhs, tmpNameVal);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhs.computed && AST.isComplexNode(rhs.property)) {
            rule('Assignment rhs member expression must have simple object and computed property');
            example('a = b()[c()]', 'tmp = b(), tmp2 = c(), a = tmp[tmp2]');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpAssignRhsCompObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignRhsCompProp', fdata);
            const newNodes = [
              // const tmp = b()
              AST.varStatement('const', tmpNameObj, rhs.object),
              // const tmp2 = c()
              AST.varStatement('const', tmpNameProp, rhs.property),
            ];
            const finalNode = AST.assignmentExpression(lhs, AST.memberExpression(tmpNameObj, tmpNameProp, true));
            // a = tmp[tmp2]
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (AST.isComplexNode(rhs.object)) {
            rule('Assignment rhs member expression must have simple object; prop already simple');
            example('a = b().c', 'tmp = b(), a = tmp.c', () => !rhs.computed);
            example('a = b()[c]', 'tmp = b(), a = tmp[c]', () => rhs.computed);
            before(node, parentNodeOrWhatever);

            const tmpName = createFreshVar('tmpAssignRhsProp', fdata);
            // const tmp = b()
            const newNodes = [AST.varStatement('const', tmpName, rhs.object)];
            const finalNode = AST.assignmentExpression(lhs, AST.memberExpression(tmpName, rhs.property, rhs.computed));
            // a = tmp.c
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhs.computed && AST.isProperIdent(rhs.property, true)) {
            const str = AST.getStringValue(rhs.property, true);

            rule('Computed property that is valid ident must be member expression; assign rhs');
            example('a["foo"]', 'a.foo');
            before(rhs, parentNodeOrWhatever);

            vlog('- Name: `' + str + '`');

            rhs.computed = false;
            rhs.property = AST.identifier(str);

            after(rhs, parentNodeOrWhatever);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // Assignment of simple member expression to ident or simple member expression is atomic
          return false;
        }

        if (lhs.type === 'Identifier' && rhs.type === 'Identifier' && lhs.name === rhs.name) {
          // TODO: what about TDZ errors and implicit globals? We can support the implicit global case but TDZ will be hard.
          rule('Self-assignments should be removed');
          example('a = a', 'a');
          before(node);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (rhs.type === 'FunctionExpression' && rhs.id && rhs.id.name !== '$free') {
          // Note: this happens here (assignment) and in a var decl!
          // The id of a function expression is kind of special.
          // - It only exists inside the function
          // - It is read-only, writes fail hard (only in strict mode, which we force).
          // - It can be shadowed inside the function like by a var or a param

          // Since we give each name a unique name, we can declare the binding anywhere.
          // So we can create an outer constant and assign it the function, then alias it.
          // But we have to make sure that the name is unique (!) and prevent collisions

          const funcNode = rhs;

          rule('Function expressions should not have an id; assignment');
          example('x = function f(){};', 'const f = function(); x = f;');
          before(funcNode, node);

          // Note: body should be normalized now but parent may not be
          body.splice(i, 0, AST.varStatement('const', funcNode.id.name, funcNode));
          node.right = AST.identifier(funcNode.id.name);
          funcNode.id = null;

          after(funcNode, parentNodeOrWhatever);
          return true;
        }

        if (
          lhs.type === 'Identifier' &&
          (lhs.name === SYMBOL_MAX_LOOP_UNROLL || lhs.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants that is not a while-test should become `true`');
          example('x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = true');
          before(body[i]);

          body[i] = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, AST.tru());

          after(body[i]);
          return true;
        }

        // No more special cases for the assignment form. Process the rhs as a generic expression.
        // Kind situations:
        // - statement: the assignment was a statement. This recursive call is fine.
        // - assign: the assignment was the rhs of another assignment. This recursive call could break
        // - var: the assignment was the init of a var decl. This recursive call could break.
        ASSERT(
          varInitAssignKind === undefined && varInitAssignId === undefined,
          'this recursion should not happen more than once, otherwise this breaks',
        );
        return transformExpression(
          'assign',
          rhs,
          body,
          i,
          node,
          lhs,
          '=',
          wrapKind === 'var' ? varOrAssignKind : undefined,
          wrapKind === 'var' ? wrapLhs : undefined,
        );
      }

      case 'AwaitExpression': {
        // Ensure argument is a noop in itself
        // `await x()` -> `(tmp = x(), await tmp)`

        if (AST.isComplexNode(node.argument)) {
          rule('Await argument cannot be complex');
          example('await f()', '(tmp = f(), await tmp)');
          before(node, parentNodeOrWhatever);

          const tmpName = createFreshVar('tmpAwaitArg', fdata);
          const newNodes = [AST.varStatement('const', tmpName, node.argument)];
          const finalNode = AST.awaitExpression(tmpName);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (
          node.argument.type === 'Identifier' &&
          (node.argument.name === SYMBOL_MAX_LOOP_UNROLL || node.argument.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants as arg of await should become `true`');
          example('x = + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = + true');
          before(body[i]);

          node.argument = AST.tru();

          after(body[i]);
          return true;
        }

        return false;
      }

      case 'BinaryExpression': {
        // ** * / % + - << >> >>> < > <= >= in instanceof == != === !== & ^ |
        // Must be careful not to eliminate coercion! (triggers valueOf / toString)
        vlog('Operator:', node.operator);

        if (wrapKind === 'statement') {
          if (['===', '!=='].includes(node.operator)) {
            rule('Binary expression without coercion as statement must be split');
            example('a + b;', 'a; b;');
            before(node, parentNodeOrWhatever);

            const newNodes = [AST.expressionStatement(node.left)];
            const finalNode = node.right;
            const finalParent = AST.expressionStatement(finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.operator === 'instanceof' && (node.left.type !== 'Identifier' || node.left.name !== 'undefined')) {
            // Does not trigger spies in the lhs
            rule('Binary expression statement with `instanceof` does not trigger spies in the lhs');
            example('x instanceof y;', 'undefined instanceof y;');
            before(body[i]);

            node.left = AST.identifier('undefined');

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          const pl = AST.isPrimitive(node.left);

          if (pl) {
            const v = AST.getPrimitiveValue(node.left);
            if ((typeof v === 'string' && v !== '') || (typeof v === 'number' && !Object.is(v, 0))) {
              rule('Binary expression as statement should have number/string literal left operand reduced to zero or empty string');
              example('x + "very long string"', 'x + ""', () => typeof v === 'string');
              example('x + 5000', 'x + 0', () => typeof v === 'number');
              before(node, body[i]);

              node.left = AST.primitive(typeof v === 'number' ? 0 : '');

              after(node, body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          const pr = AST.isPrimitive(node.right);

          if (node.operator !== 'instanceof' && node.operator !== 'in') {
            if (pl && pr) {
              rule('Drop a binary expression that is a statement when both operands are primitives');
              example('1 === "x";', ';');
              before(node);

              body[i] = AST.emptyStatement();

              after(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (pr) {
              const v = AST.getPrimitiveValue(node.right);
              if ((typeof v === 'string' && v !== '') || (typeof v === 'number' && !Object.is(v, 0))) {
                rule('Binary expression as statement should have number/string literal right operand reduced to zero or empty string');
                example('x + "very long string"', 'x + ""', () => typeof v === 'string');
                example('x + 5000', 'x + 0', () => typeof v === 'number');
                before(node, body[i]);

                node.right = AST.primitive(typeof v === 'number' ? 0 : '');

                after(node, body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }

            if (!pl && !pr) {
              // Ideally we want to split these cases up to try and eliminate references we know we can eliminate
              // Unfortunately we can't do this for all because coercion, like with `+`, `==`, and `<=`.
              if (['**', '*', '/', '-', '<<', '>>', '>>>', '&', '^', '|'].includes(node.operator)) {
                rule('A numeric binary expression that is a statement should have only one non-literal operand');
                example('a * b;', 'a * 0; b * 0;');
                before(node, body[i]);

                body.splice(
                  i,
                  1,
                  AST.expressionStatement(AST.binaryExpression(node.operator, node.left, AST.literal(0))),
                  AST.expressionStatement(AST.binaryExpression(node.operator, node.right, AST.literal(0))),
                );

                after(body.slice(i, i + 2));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }

            if (pl) {
              rule('A binary expression that is a statement must have the primitive to the right');
              example('0 + x;', 'x + 0;');
              before(body[i]);

              const t = node.left;
              node.left = node.right;
              node.right = t;

              after(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          // TODO: if we know the lhs or rhs is of a certain kind then we can replace the expression with
          //       two individual expressions that force the coercion with that sort of literal while
          //       eliminating the dependency to each other.
        }

        if (AST.isComplexNode(node.right)) {
          rule('Binary expression must have simple nodes; rhs is complex');
          example('a * f()', 'tmp = a, tmp2 = f(), tmp * tmp2');
          before(node, parentNodeOrWhatever);

          const tmpNameLhs = createFreshVar('tmpBinBothLhs', fdata);
          const tmpNameRhs = createFreshVar('tmpBinBothRhs', fdata);
          const newNodes = [
            AST.varStatement('const', tmpNameLhs, node.left),
            AST.varStatement('const', tmpNameRhs, node.right),
          ];
          const finalNode = AST.binaryExpression(node.operator, tmpNameLhs, tmpNameRhs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (AST.isComplexNode(node.left)) {
          rule('Binary expression must have simple nodes; lhs is complex');
          example('f() * a', 'tmp = f(), tmp * a');
          before(node, parentNodeOrWhatever);

          const tmpNameLhs = createFreshVar('tmpBinLhs', fdata);
          const newNodes = [AST.varStatement('const', tmpNameLhs, node.left)];
          const finalNode = AST.binaryExpression(node.operator, tmpNameLhs, node.right);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Resolve some static cases.
        // In general, we can safely and statically resolve these kinds of values;
        // - number literals
        // - string literals
        // - booleans
        // - null
        // - undefined
        // - Infinity
        // - NaN
        // Certain ** * / % + - << >> >>> < > <= >= in instanceof == != === !== & ^ |
        // We could cross product all the things here but that's gonna lead to 7 * 22 * 7 = 1078 cases. So we're not gonna do that.

        // Luckily we don't need to. Check whether the left and right are static values. Then switch apply the operator. Boom.

        const lp = AST.isPrimitive(node.left);
        const rp = AST.isPrimitive(node.right);

        if (lp && rp) {
          rule('Binary operation on two builtin primitives or values should be statically resolved');
          example('1 + null', '1');
          before(node, parentNodeOrWhatever);

          const lhs = AST.getPrimitiveValue(node.left);
          const rhs = AST.getPrimitiveValue(node.right);

          try {
            let result = undefined;
            switch (node.operator) {
              case '**':
                result = lhs ** rhs;
                break;
              case '*':
                result = lhs * rhs;
                break;
              case '/':
                result = lhs / rhs;
                break;
              case '%':
                result = lhs % rhs;
                break;
              case '+':
                result = lhs + rhs;
                break;
              case '-':
                result = lhs - rhs;
                break;
              case '<<':
                result = lhs << rhs;
                break;
              case '>>':
                result = lhs >> rhs;
                break;
              case '>>>':
                result = lhs >>> rhs;
                break;
              case '<':
                result = lhs < rhs;
                break;
              case '>':
                result = lhs > rhs;
                break;
              case '<=':
                result = lhs <= rhs;
                break;
              case '>=':
                result = lhs >= rhs;
                break;
              case '==':
                result = lhs == rhs;
                break;
              case '!=':
                result = lhs != rhs;
                break;
              case '===':
                result = lhs === rhs;
                break;
              case '!==':
                result = lhs !== rhs;
                break;
              case '&':
                result = lhs & rhs;
                break;
              case '|':
                result = lhs | rhs;
                break;
              case '^':
                result = lhs ^ rhs;
                break;
              case 'in':
                result = lhs in rhs;
                break;
              case 'instanceof':
                result = lhs instanceof rhs;
                break;
              default:
                return ASSERT(false, 'new op?', node);
            }

            vlog('lhs:', [lhs], ', rhs:', [rhs], ', op:', [node.operator], '->', [result]);

            const finalNode =
              typeof result === 'string'
                ? // There are no special string cases to consider
                AST.templateLiteral(result)
                : typeof result === 'boolean' || result === null
                  ? // There are no special string/boolean cases to consider
                    // I don't think any of these operators can have any operands that result in a `null`, but whatever.
                  AST.literal(result, true)
                  : // Numbers may result in NaN or Infinity, which are idents. NaN is not a finite so check that one first.
                  (ASSERT(typeof result === 'number'),
                    isNaN(result) ? AST.identifier('NaN') : !isFinite(result) ? AST.identifier('Infinity') : AST.literal(result, true));
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          } catch {
            vlog('Operation resulted in an error so not inlining it');
          }
        }

        if (lp || rp) {
          if (['&', '|', '^', '<<', '>>', '>>>'].includes(node.operator)) {
            // The bitwise operands are all coerced to 32bit ints regardless
            if (lp) {
              const pv = AST.getPrimitiveValue(node.left);
              const pvn = 0 | pv;

              if (node.operator === '&' && pvn === 0 && wrapKind !== 'statement') {
                rule('Any value anded with lhs zero results zero');
                example('f(0 & a);', '0 & a; f(0);');
                before(node, body[i]);

                const finalNode = AST.literal(0);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, AST.expressionStatement(node), finalParent);

                after(node, body[i]);
                after(node, body[i + 1]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (pv !== pvn) {
                // This means the primitive will coerce to a simpler value (int) with the bitwise operator
                // The coercion happens regardless of the other operand so we should apply that immediately.
                // Note: it would coerce `undefined` first to a number `NaN` then to a 32bit int `0`.
                rule(
                  'An operand to bitwise operators (`&`, `|`, `^`) will unconditionally coerce a primitive operand that is not a 32bit int',
                );
                example('x | "200.50"', 'x | 200');
                before(node, body[i]);

                node.left = AST.primitive(pvn);

                after(node, body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }
            if (rp) {
              const pv = AST.getPrimitiveValue(node.right);
              const pvn = 0 | pv;

              if (node.operator === '&' && pvn === 0 && wrapKind !== 'statement') {
                rule('Any value anded with rhs zero results zero');
                example('f(a & 0);', 'a & 0; f(0);');
                before(node, body[i]);

                const finalNode = AST.literal(0);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, AST.expressionStatement(node), finalParent);

                after(node, body[i]);
                after(node, body[i + 1]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (pv !== pvn) {
                // This means the primitive will coerce to a simpler value (int) with the bitwise operator
                // The coercion happens regardless of the other operand so we should apply that immediately.
                // Note: it would coerce `undefined` first to a number `NaN` then to a 32bit int `0`.
                rule(
                  'An operand to bitwise operators (`&`, `|`, `^`) will unconditionally coerce a primitive operand that is not a 32bit int',
                );
                example('"200.50" | x', '200 | x');
                before(node, body[i]);

                node.right = AST.primitive(pvn);

                after(node, body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }
          } else if (['**', '*', '/', '-', '%'].includes(node.operator)) {
            // The math ops coerce to number, but may still end up as NaN or Infinity, but not as false, undefined, or null
            // Additionally, if an operand is NaN then so is the result. We'd need more information to cover Infinity cases.
            if (lp) {
              const pv = AST.getPrimitiveValue(node.left);
              // Note: it seems that if x is a string, then isNaN(x) === isNaN(Number(x)), so the string case should be covered too
              if (isNaN(pv)) {
                // NaN ** 0 = 1, NaN ** 1 = NaN, so skip that one.
                if (node.operator !== '**') {
                  rule('A NaN operand left to binary math operators (`*`, `/`, etc) will cause the result to be NaN');
                  example('f(x * NaN);', 'x * 1; f(NaN);');
                  before(node, body[i]);

                  const finalNode = AST.identifier('NaN');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, AST.expressionStatement(AST.binaryExpression('*', node.right, AST.literal(0))), finalParent);

                  after(finalParent, body[i]);
                  return true;
                }
              }
              else if ([true, false, null].includes(pv) || typeof pv === 'string') {
                const pvn = Number(pv);
                ASSERT(!isNaN(pvn), 'we tried to check that before...', lp, pv, pvn);
                if (pv !== pvn) {
                  // This means the primitive will coerce to a simpler value (int) with the bitwise operator
                  // The coercion happens regardless of the other operand so we should apply that immediately.
                  rule(
                    'An operand to binary math operators (`*`, `/`, etc) will unconditionally coerce any primitive operand that is not a number',
                  );
                  example('x * "200.50"', 'x * 200.5');
                  before(node, body[i]);

                  node.left = AST.primitive(pvn);

                  after(node, body[i]);
                  return true;
                }
              }
            }
            if (rp) {
              const pv = AST.getPrimitiveValue(node.right);
              // Note: it seems that if x is a string, then isNaN(x) === isNaN(Number(x)), so the string case should be covered too
              if (isNaN(pv)) {
                rule('A NaN operand left to binary math operators (`*`, `/`, etc) will cause the result to be NaN');
                example('f(x * NaN);', 'x * 1; f(NaN);');
                before(node, body[i]);

                const finalNode = AST.identifier('NaN');
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, AST.expressionStatement(AST.binaryExpression('*', node.left, AST.literal(0))), finalParent);

                after(finalParent, body[i]);
                return true;
              }
              else if ([true, false, null].includes(pv) || typeof pv === 'string') {
                const pvn = Number(pv);
                ASSERT(!isNaN(pvn), 'we tried to check that before...', lp, pv, pvn);
                if (pv !== pvn) {
                  // This means the primitive will coerce to a simpler value (int) with the bitwise operator
                  // The coercion happens regardless of the other operand so we should apply that immediately.
                  rule(
                    'An operand to binary math operators (`*`, `/`, etc) will unconditionally coerce any primitive operand that is not a number',
                  );
                  example('x * "200.50"', 'x * 200.5');
                  before(node, body[i]);

                  node.right = AST.primitive(pvn);

                  after(node, body[i]);
                  return true;
                }
              }
            }
          } else if (['==', '!=', '===', '!==', '<', '<=', '>', '>='].includes(node.operator)) {
            if (lp) {
              const pv = AST.getPrimitiveValue(node.left);
              if (Object.is(pv, NaN)) {
                if (node.operator === '!=' || node.operator === '!==') {
                  rule('A NaN operand left to comparison operators (`!=`, `!==`) will cause the result to be true');
                  example('f(NaN != x);', 'x * 1; f(true);');
                  example('f(NaN !== x);', 'x; f(true);');
                } else {
                  rule('A NaN operand left to comparison operators (`==`, `<=`, etc) will cause the result to be false');
                  example('f(NaN == x);', 'x * 1; f(false);');
                  // Note! === and !== are the only two that don't coerce, but must still leave the other side for TDZ reasons
                  example('f(NaN === x);', 'x; f(false);');
                }
                before(node, body[i]);

                const finalNode = node.operator === '!=' || node.operator === '!==' ? AST.tru() : AST.fals();
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(
                  i,
                  1,
                  node.operator === '===' || node.operator === '!=='
                    ? AST.expressionStatement(node.right)
                    : AST.expressionStatement(AST.binaryExpression('*', node.right, AST.literal(0))),
                  finalParent,
                );

                after(finalParent, body[i]);
                return true;
              }
            }
            if (rp) {
              const pv = AST.getPrimitiveValue(node.right);
              if (Object.is(pv, NaN)) {
                if (node.operator === '!=' || node.operator === '!==') {
                  rule('A NaN operand right to comparison operators (`!=`, `!==`) will cause the result to be true');
                  example('f(NaN != x);', 'x * 1; f(true);');
                  example('f(NaN !== x);', 'x; f(true);');
                } else {
                  rule('A NaN operand right to comparison operators (`==`, `<=`, etc) will cause the result to be false');
                  example('f(x == NaN);', 'x * 1; f(false);');
                  // Note! === and !== are the only two that don't coerce, but must still leave the other side for TDZ reasons
                  example('f(x === NaN);', 'x; f(false);');
                }
                before(node, body[i]);

                const finalNode = node.operator === '!=' || node.operator === '!==' ? AST.tru() : AST.fals();
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(
                  i,
                  1,
                  node.operator === '===' || node.operator === '!=='
                    ? AST.expressionStatement(node.left)
                    : AST.expressionStatement(AST.binaryExpression('*', node.left, AST.literal(0))),
                  finalParent,
                );

                after(finalParent, body[i]);
                return true;
              }
            }
          } else if (node.operator === '+') {
            if (lp) {
              const pv = AST.getPrimitiveValue(node.left);
              if (pv === '') {
                rule('Concat to empty string left should become $coerce');
                example('const x = a + "";', 'const x = $coerce(a, "plustr");');
                before(node, body[i]);

                const finalNode = AST.callExpression(SYMBOL_COERCE, [node.right, AST.primitive('plustr')]);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
              if (typeof pv === 'string') {
                rule('Concat with string literal left must be with empty string');
                example('f("hello" + world);', 'const tmp = world + ""; f(`hello ${tmp}`);');
                before(node, body[i]);

                const tmpName = createFreshVar('tmpStringConcatL', fdata);
                const varNode = AST.varStatement('const', tmpName, AST.binaryExpression('+', node.right, AST.primitive('')));
                const finalNode = AST.templateLiteral([pv, ''], [AST.identifier(tmpName)]);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, varNode, finalParent);

                after(varNode);
                after(finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            } else if (rp) {
              const pv = AST.getPrimitiveValue(node.right);
              if (pv === '') {
                rule('Concat to empty string right should become $coerce');
                example('const x = a + "";', 'const x = $coerce(a);');
                before(node, body[i]);

                const finalNode = AST.callExpression(SYMBOL_COERCE, [node.left, AST.primitive('plustr')]);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
              if (typeof pv === 'string') {
                rule('Concat with string literal right must be with empty string');
                example('f(hello + "world");', 'const tmp = hello + ""; f(`${tmp} world`);');
                before(node, body[i]);

                const tmpName = createFreshVar('tmpStringConcatR', fdata);
                const varNode = AST.varStatement('const', tmpName, AST.binaryExpression('+', node.left, AST.primitive('')));
                const finalNode = AST.templateLiteral(['', pv], [AST.identifier(tmpName)]);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, varNode, finalParent);

                after(varNode);
                after(finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }
          }
        }

        if (['+', '&', '|', '^', '<<', '>>', '>>>', '**', '*', '/', '-', '%', '<', '<=', '>', '>='].includes(node.operator)) {
          // Support serializing some globals. Mostly for jsf*ck cases.
          const isBuiltinConstructor =
            node.left.type === 'Identifier' && BUILTIN_GLOBAL_FUNC_NAMES.has(node.left.name)
              ? node.left
              : node.right.type === 'Identifier' && BUILTIN_GLOBAL_FUNC_NAMES.has(node.right.name)
                ? node.right
                : null;
          if (isBuiltinConstructor) {
            const constructorName = isBuiltinConstructor.name;
            const builtinLeftOrRight = node.left === isBuiltinConstructor ? 'left' : 'right';
            rule('Adding a builtin constructor to a primitive can be resolved');
            example('f(0 + Array);', 'f("0function Array() { [native code] }");', () => constructorName === 'Array');
            example('f(0 + Object);', 'f("0function Object() { [native code] }");', () => constructorName === 'Object');
            example('f(0 + Boolean);', 'f("0function Boolean() { [native code] }");', () => constructorName === 'Boolean');
            example('f(0 + Number);', 'f("0function Number() { [native code] }");', () => constructorName === 'Number');
            example('f(0 + String);', 'f("0function String() { [native code] }");', () => constructorName === 'String');
            example('f(0 + RegExp);', 'f("0function RegExp() { [native code] }");', () => constructorName === 'RegExp');
            before(node, body[i]);

            node[builtinLeftOrRight] = AST.primitive('function ' + constructorName + '() { [native code] }');

            before(node, body[i]);
            return true;
          }

          const lsym = BUILTIN_SYMBOLS.get(node.left.name);
          const rsym = BUILTIN_SYMBOLS.get(node.right.name);
          if (lsym?.typings.mustBeType === 'function' || rsym?.typings.mustBeType === 'function') {
            riskyRule('Binary expr with known built-in function can serialize function');
            example('true + $array_flat', 'true + "function flat() { [native code] }"');
            before(node, body[i]);

            if (lsym) {
              node.left = AST.primitive('function ' + lsym.prop + '() { [native code] }');
            }
            if (rsym) {
              node.right = AST.primitive('function ' + rsym.prop + '() { [native code] }');
            }

            after(body[i]);
            return true;
          }
        }

        // Coercion of undefined to number is always nan
        if (node.left.name === 'undefined' || node.right.name === 'undefined') {
          // Note: notable exception is **
          if (['&', '|', '^', '<<', '>>', '>>>', '*', '/', '-', '%'].includes(node.operator)) {
            rule('Using `undefined` in any numeric binary op will result in NaN');
            example('undefined * 10;', 'NaN;');
            before(node, body[i]);

            const finalNode = AST.identifier('NaN');
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;
            if (node.left.name !== 'undefined') {
              body.splice(i, 0, AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [node.left, AST.primitive("number")])));
            }
            if (node.right.name !== 'undefined') {
              body.splice(i, 0, AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [node.right, AST.primitive("number")])));
            }

            after(node, body[i]);
            return true;
          }
          if (['<', '<=', '>', '>='].includes(node.operator)) {
            rule('Using `undefined` in any relative bin op will result in false');
            example('undefined < "who";', 'false;');
            before(node, body[i]);

            const finalNode = AST.fals();
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;
            if (node.left.name !== 'undefined') {
              body.splice(i, 0, AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [node.left, AST.primitive("number")])));
            }
            if (node.right.name !== 'undefined') {
              body.splice(i, 0, AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [node.right, AST.primitive("number")])));
            }

            after(node, body[i]);
            return true;
          }
        }

        // The null/false case is slightly different because that numeric coercion results in zero
        if (AST.isNull(node.left) || AST.isNull(node.right) || AST.isFalse(node.left) || AST.isFalse(node.right)) {
          if (['&', '|', '^', '<<', '>>', '>>>', '**', '*', '/', '-', '%'].includes(node.operator)) {
            rule('Using `null` or `false` in any numeric binary op will coerce it to +0');
            example('null * 10;', '0 * 10;');
            example('false * 10;', '0 * 10;');
            before(node, body[i]);

            if (AST.isNull(node.left) || AST.isFalse(node.left)) {
              node.left = AST.zero();
            }
            if (AST.isNull(node.right) || AST.isFalse(node.right)) {
              node.right = AST.zero();
            }

            before(node, body[i]);
            return true;
          }
          if (['<', '<=', '>', '>='].includes(node.operator)) {
            // In a round-about way, null and false always end up being coerced to a number with relational ops. Even when the
            // other side is a string (because the alt condition requires both sides being a string).
            // Coercion to number results in zero. So we should be able to replace them with zero.
            rule('Using `false` or `null` in any relative bin op will coerce it to zero');
            example('null < "who";', '0 < "who";');
            example('false < "who";', '0 < "who";');
            before(node, body[i]);

            if (AST.isNull(node.left) || AST.isFalse(node.left)) {
              node.left = AST.zero();
            }
            if (AST.isNull(node.right) || AST.isFalse(node.right)) {
              node.right = AST.zero();
            }

            before(node, body[i]);
            return true;
          }
        }

        if (
          node.left.type === 'Identifier' &&
          (node.left.name === SYMBOL_MAX_LOOP_UNROLL || node.left.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants as lhs of binary expression should become `true`');
          example('x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE + 1;', 'x = true + 1');
          before(body[i]);

          node.left = AST.tru();

          after(body[i]);
          return true;
        }
        if (
          node.right.type === 'Identifier' &&
          (node.right.name === SYMBOL_MAX_LOOP_UNROLL || node.right.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants as rhs of binary expression should become `true`');
          example('x = 1 + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = 1 + true');
          before(body[i]);

          node.right = AST.tru();

          after(body[i]);
          return true;
        }

        // Note: the statement is a base case so ignore that.
        // When left and right are the same ident then certain comparisons are safely predictable.
        if (wrapKind !== 'statement' && node.left.type === 'Identifier' && node.right.type === 'Identifier' && node.left.name === node.right.name) {
          // Left and right are the same value. There are some bools that want a word.
          if (['==', '==='].includes(node.operator)) {
            // The eq comparisons do not touch the value (== won't either when not coercing)
            // tests/cases/binary/eq_strong/diff_objs_diff_ids.md
            rule('Comparing the same identifier for being equal will always return true');
            example('a === a', '(a, true)');
            before(body[i]);

            const finalNode = AST.sequenceExpression(node.left, AST.tru());
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          if (['<=', '>='].includes(node.operator)) {
            // Note: these coerce so we must leave a bit more.
            // tests/cases/binary/gt_eq/same_objs.md
            rule('Comparing the same identifier for being gte/lte will always return true but it may coerce');
            example('a <= a', '(a <= a, true)');
            before(body[i]);

            const finalNode = AST.sequenceExpression(node, AST.tru());
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          if (['!=', '!=='].includes(node.operator)) {
            // The eq comparisons do not touch the value (!= won't either when not coercing)
            // tests/cases/binary/neq_strong/same_objs.md
            rule('Comparing the same identifier for being equal will always return false');
            example('a !== a', '(a, false)');
            before(body[i]);

            const finalNode = AST.sequenceExpression(node.left, AST.fals());
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          if (['<', '>'].includes(node.operator)) {
            // Note: these coerce so we must leave a bit more.
            // tests/cases/binary/gt/diff_objs_diff_ids.md
            rule('Comparing the same identifier for being gt/lt will always return false but it may coerce');
            example('a < a', '(a<a, false)');
            before(body[i]);

            const finalNode = AST.sequenceExpression(node, AST.fals());
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          // These are unsafe because if anything is not a number the result is always NaN. We can't do the remaining ones.
          //if (['^', '-'].includes(node.operator)) {
          //  rule('The bitwise operator ^ or math operator `-` on the same identifier always returns zero');
          //  example('a === a', '(a, true)');
          //  before(body[i]);
          //
          //
          //  const finalNode = AST.sequenceExpression(AST.identifier(node.left.name), AST.tru());
          //  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          //  body.splice(i, 1, AST.expressionStatement(finalParent));
          //
          //  after(body[i]);
          //  zoietsdusqmark
          //}
          //if (['&', '|'].includes(node.operator)) {
          //  rule('The bitwise operator & and | on the same identifier always returns itself');
          //  example('a === a', '(a, true)');
          //  before(body[i]);
          //
          //
          //  const finalNode = AST.sequenceExpression(AST.identifier(node.left.name), AST.tru());
          //  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          //  body.splice(i, 1, AST.expressionStatement(finalParent));
          //
          //  after(body[i]);
          //  zoietsdusqmark
          //}
          // You could convert x*x to x**2 but i'm not sure that's helpful at all
          // You could convert x/x to 1 but then what do you do with zeroes?
        }

        return false;
      }

      case 'CallExpression': {
        let callee = node.callee; // after dotcall, this will be the first arg of dotcall (this way we can rename it transparently)
        const nodeArgs = node.arguments;
        const firstSpread = nodeArgs.length > 0 && nodeArgs[0].type === 'SpreadElement';

        // Convert computed prop that we know can be a valid regular prop, into a regular prop
        if (callee.type === 'MemberExpression' && callee.computed && AST.isProperIdent(callee.property, true)) {
          const str = AST.getStringValue(callee.property, true);

          rule('Computed property that is a proper ident must be regular property; callee');
          example('a["x"]()', 'a.x()');
          before(callee, node);

          callee.property = AST.identifier(str);
          callee.computed = false;

          after(callee, node);
          return true;
        }

        if (node.optional) {
          // `x = a?.b()` -> `let x = a; if (x != null) x = x.b(); else x = undefined;`
          // (This is NOT `a?.b()` !! see below)

          // Special case the member call because it changes the context
          if (callee.type === 'MemberExpression') {
            if (callee.computed) {
              // We always need to compile to .call because we need to read the member expression before the call, which
              // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
              rule('Optional computed member call expression should be if-else');
              example('a()[b()]?.(c())', 'tmp = a(), tmp2 = b(), tmp3 = tmp[tmp2], (tmp3 != null ? tmp3.call(tmp, c()) : undefined)');
              before(node, parentNodeOrWhatever);

              const tmpNameObj = createFreshVar('tmpOptCallMemObj', fdata);
              const tmpNameProp = createFreshVar('tmpOptCallMemProp', fdata);
              const tmpNameFunc = createFreshVar('tmpOptCallMemFunc', fdata);
              const newNodes = [
                AST.varStatement('const', tmpNameObj, callee.object),
                AST.varStatement('const', tmpNameProp, callee.property),
                AST.varStatement('const', tmpNameFunc, AST.memberExpression(tmpNameObj, tmpNameProp, true)),
              ];
              // Call the special builtin to signify that this call was previously in fact a method call. We need this because
              // when we find a random `.call()` we can't distinguish the built-in Function#call from a user method named `call`
              const finalNode = AST.callExpression(SYMBOL_DOTCALL, [
                AST.identifier(tmpNameFunc),
                AST.identifier(tmpNameObj), // Context
                AST.identifier('undefined'), // computed property means we use `undefined` here
                ...nodeArgs,
              ]);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            } else {
              rule('Optional member call expression should be if-else');
              example('a().b?.(c())', 'tmp = a(), (tmp != null ? tmp.b(c()) : undefined)');
              before(node, parentNodeOrWhatever);

              const tmpNameObj = createFreshVar('tmpOptCallMemObj', fdata);
              const tmpNameFunc = createFreshVar('tmpOptCallMemFunc', fdata);
              const newNodes = [
                AST.varStatement('const', tmpNameObj, callee.object),
                AST.varStatement('const', tmpNameFunc, AST.memberExpression(tmpNameObj, callee.property)),
              ];
              // We always need to compile to .call because we need to read the member expression before the call, which
              // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
              // Call the special builtin to signify that this call was previously in fact a method call. We need this because
              // when we find a random `.call()` we can't distinguish the built-in Function#call from a user method named `call`
              const finalNode = AST.callExpression(SYMBOL_DOTCALL, [
                AST.identifier(tmpNameFunc),
                AST.identifier(tmpNameObj), // Context
                AST.primitive(callee.property.name), // Property, non-computed
                ...nodeArgs,
              ]);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes, finalParent);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          rule('Optional non-prop call expression should be if-else');
          example('a()?.(b())', 'tmp = a(), (tmp != null ? tmp(b()) : undefined)');
          before(node, parentNodeOrWhatever);

          const tmpName = createFreshVar('tmpOptCallFunc', fdata);
          const newNodes = [AST.varStatement('const', tmpName, callee)];
          const finalNode = AST.conditionalExpression(
            AST.binaryExpression('==', tmpName, AST.nul()),
            'undefined',
            AST.callExpression(tmpName, [...nodeArgs]),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        function simplifyStaticPrimitive(node, parentNode, parentProp, parentIndex) {
          if (node.type === 'UnaryExpression') {
            const arg = node.argument;
            if (AST.isPrimitive(arg)) {
              if (arg.type === 'UnaryExpression') {
                return simplifyStaticPrimitive(node, parentNode, parentProp);
              }
              if (arg.type === 'Identifier') {
                if (arg.name === 'undefined' && (node.operator === '-' || node.operator === '+')) {
                  rule('+undefined and -undefined are just NaN');
                  example('+undefined', symbo('Number', 'NaN'), () => node.operator === '+');
                  example('-undefined', symbo('Number', 'NaN'), () => node.operator !== '+');
                  before(node);

                  if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'NaN'));
                  else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'NaN'));

                  after(arg, parentNode);
                  return true;
                }

                if (arg.name === 'NaN' || arg === symbo('Number', 'NaN')) {
                  rule('+NaN and -NaN are just NaN');
                  example('+NaN', symbo('Number', 'NaN'), () => node.operator === '+');
                  example('-NaN', symbo('Number', 'NaN'), () => node.operator !== '+');
                  before(node);

                  if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'NaN'));
                  else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'NaN'));

                  after(arg, parentNode);
                  return true;
                }
              }
            }
          }
          if (node.type === 'Identifier') {
            if (node.name === 'NaN') {
              rule('NaN should be a symbol');
              example('NaN', symbo('Number', 'NaN'), () => node.operator === '+');
              before(parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'NaN'));
              else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'NaN'));

              after(parentNode, parentNode);
              return true;
            }
            if (node.name === 'Infinity') {
              rule('Infinity should be a symbol');
              example('Infinity', symbo('Number', 'POSITIVE_INFINITY'), () => node.operator === '+');
              before(parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'POSITIVE_INFINITY'));
              else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'POSITIVE_INFINITY'));

              after(parentNode, parentNode);
              return true;
            }
            if (node.name === 'parseInt') {
              rule('parseInt should be a symbol');
              example('parseInt', symbo('Number', 'parseInt'), () => node.operator === '+');
              before(parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'parseInt'));
              else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'parseInt'));

              after(parentNode, parentNode);
              return true;
            }
            if (node.name === 'parseFloat') {
              rule('parseFloat should be a symbol');
              example('parseFloat', symbo('Number', 'parseFloat'), () => node.operator === '+');
              before(parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'parseFloat'));
              else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'parseFloat'));

              after(parentNode, parentNode);
              return true;
            }
            if (node.name === 'isInteger') {
              rule('isInteger should be a symbol');
              example('isInteger', symbo('Number', 'isInteger'), () => node.operator === '+');
              before(parentNode);

              if (parentIndex < 0) parentNode[parentProp] = AST.identifier(symbo('Number', 'isInteger'));
              else parentNode[parentProp][parentIndex] = AST.identifier(symbo('Number', 'isInteger'));

              after(parentNode, parentNode);
              return true;
            }
          }
        }

        let hasComplexArg = false;
        if (
          nodeArgs.some((anode, i) => {
            if (anode.type === 'SpreadElement') {
              if (AST.isComplexNode(anode.argument)) {
                hasComplexArg = true;
              }
              else if (simplifyStaticPrimitive(anode.argument, anode, 'argument', -i)) {
                return true;
              }
            }
            else if (AST.isComplexNode(anode)) {
              hasComplexArg = true;
            }
            else if (simplifyStaticPrimitive(anode, node, 'arguments', i)) {
              return true;
            }
          })
        ) {
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // There are two atomic kinds of callee; ident and member expression. Anything else normalizes to ident.
        if (callee.type === 'MemberExpression') {
          // The method call is evaluated in this order:
          //    <object>, <prop>, String(prop), <object.prop>, <arg0>, <arg1>, ..., <call()>
          // Note: `a.b(c.d)` evaluates `a.b` before `c.d` (!)
          //       Because we need to outline complex args, and need to preserve context, we must transform
          //       to `.call` form (`tmp = a, tmp2 = a.b, tmp3 = c.d, tmp2.call(tmp, tmp3)`) and so we ought
          //       to try to be conservative here as it won't make things better. Hopefully we can easily
          //       clean those cases up later but that might not be easy as the "call" property is not
          //       guaranteed to be the builtin `call` function... ;(

          const objectMustBeMethodable = (
            // Yes, you _can_ call methods on `0` and `false`
            (AST.isPrimitive(callee.object) && AST.getPrimitiveValue(callee.object) != null) ||
            (callee.object.type === 'Literal' && callee.object.regex) || // Regex is never falsy
            callee.object.type === 'FunctionExpression' ||
            callee.object.type === 'ThisExpression' ||
            callee.object.type === 'ArrayExpression' ||
            callee.object.type === 'ObjectExpression' ||
            callee.object.type === 'ClassExpression' ||
            callee.object.type === 'NewExpression' // `new` is guaranteed to return an object
          );

          // Eliminate ?. one way or the other
          if (callee.optional) {
            if (objectMustBeMethodable) {
              // `a?.b()`, this is NOT `a.b?.()`!
              rule('Optional chaining on object value that cannot be null/undef is not optional');
              example('/foo/?.test()', '/foo/.test()');
              before(node);

              callee.optional = false;

              before(node);
              return true;
            }

            if (callee.optional) {
              // `a?.b()`, this is NOT `a.b?.()`!
              rule('Call on optional chaining property must be if-else');
              example('a()?.b()', 'tmp = a(); tmp == null ? undefined : tmp.b();', () => !callee.computed);
              example('a()?.[b()]()', 'tmp = a(); tmp == null ? undefined : tmp[b()]();', () => callee.computed);
              before(node, parentNodeOrWhatever);

              const newArgs = [];
              const tmpName = createFreshVar('tmpOptMemberCallObj', fdata);
              const newNodes = [AST.varStatement('const', tmpName, callee.object)];
              normalizeCallArgs(nodeArgs, newArgs, newNodes);
              const finalNode = AST.conditionalExpression(
                AST.binaryExpression('==', tmpName, AST.nul()),
                'undefined',
                AST.callExpression(AST.memberExpression(tmpName, callee.property, callee.computed), newArgs),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          // If the key is computed and not simple, let's make it simple first. It is evaluated before anything else.
          // In that case we must also alias the object to preserve TDZ order.
          if (callee.computed && AST.isComplexNode(callee.property)) {
            rule('The property of a computed method call must be simple');
            example('a[b()]()', 'tmp = b(), a[tmp2]()');
            example('a()[b()]()', 'tmp = b(), a()[tmp2]()');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpMCCO', fdata);
            const tmpNameProp = createFreshVar('tmpMCCP', fdata);
            const newNodes = [
              AST.varStatement('const', tmpNameObj, callee.object),
              AST.varStatement('const', tmpNameProp, callee.property),
            ];
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), nodeArgs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // If the object is not simple, let's make it simple. If the property was a complex computed key then
          // the object will have been made simple above already. Only do the object now.
          if (AST.isComplexNode(callee.object)) {
            // Do computed first because that requires caching the object anyways, saving us an extra var
            rule('The object of a computed method call must be simple');
            example('a()[b()]()', 'tmp = a(), tmp[b()]()');
            example('a().b()', 'tmp = a(), tmp.b()');
            before(node, parentNodeOrWhatever);

            const tmpNameObj = createFreshVar('tmpMCOO', fdata);
            const newNode = AST.varStatement('const', tmpNameObj, callee.object);
            callee.object = AST.identifier(tmpNameObj);
            body.splice(i, 0, newNode);

            after(newNode);
            after(body[i+1]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          let callAtIndex = i;

          vlog('Now start to convert method call to dotcall');
          // TODO: are we in trouble with super usage here?

          rule('The prop read for a method call should be cached');
          example('x.y(a, b)', 'const tmp = x[y]; x[y](a, b)');
          example('x[y](a, b)', 'const tmp = x[y]; x.y(a, b)');
          before(body[callAtIndex]);

          const tmpNameFunc = createFreshVar('tmpMCF', fdata);
          const newNodes = [
            AST.varStatement('const', tmpNameFunc, callee),
          ];
          body.splice(callAtIndex, 0, ...newNodes);
          node.callee = AST.identifier(tmpNameFunc); // Have to otherwise dupe nodes will be detected.
          callAtIndex += newNodes.length;

          after(body.slice(i, i+newNodes.length+1));
          assertNoDupeNodes(AST.blockStatement(body), 'body');

          //vlog('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast)) + '\n--------------\n');

          // Convert the complex args up to the ast complex arg (potentially all).
          let last = -1;
          nodeArgs.forEach((anode, i) => {
            if (anode.type === 'SpreadElement') {
              if (AST.isComplexNode(anode.argument)) {
                last = i;
              }
            }
            else if (AST.isComplexNode(anode)) {
              last = i;
            }
          });

          for (let n=0; n<=last; ++n) {
            if (nodeArgs[n].type === 'SpreadElement') {
              if (AST.isComplexNode(nodeArgs[n].argument)) {
                rule('Method call spread arg must be simple');
                example('a.b(...f())', 'const tmp = f(); a.b(...tmp);');
                before(body[callAtIndex]);

                const tmpName = createFreshVar('tmpMCSP', fdata);
                const newNode = AST.varStatement('const', tmpName, nodeArgs[n].argument);
                body.splice(callAtIndex, 0, newNode);
                nodeArgs[n].argument = AST.identifier(tmpName);

                after(body[callAtIndex]);
                after(body[callAtIndex+1]);
                callAtIndex += 1;
              }
            }
            else if (AST.isComplexNode(nodeArgs[n])) {
              rule('Method call args must be simple');
              example('a.b(f())', 'const tmp = f(); a.b(tmp);');
              before(body[callAtIndex]);

              const tmpName = createFreshVar('tmpMCP', fdata);
              const newNode = AST.varStatement('const', tmpName, nodeArgs[n]);
              body.splice(callAtIndex, 0, newNode);
              nodeArgs[n] = AST.identifier(tmpName);

              after(body[callAtIndex]);
              after(body[callAtIndex+1]);
              callAtIndex += 1;
            }
          }

          assertNoDupeNodes(AST.blockStatement(body), 'body');

          rule('Method calls should be $dotcalls');
          example('a.b(c, d)', '$dotCall(tmp, a, "b", c, d);');
          example('a[b](c, d)', '$dotCall(tmp, a, undefined, c, d);');
          before(body[callAtIndex]);

          const finalNode2 = AST.callExpression(
            SYMBOL_DOTCALL,
            [
              AST.identifier(tmpNameFunc),
              AST.cloneSimple(callee.object),
              callee.computed ? AST.undef() : AST.primitive(callee.property.name),
              ...nodeArgs
            ]
          );
          const finalParent2 = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode2);
          body.splice(callAtIndex, 1, finalParent2);

          after(body[callAtIndex]);

          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // So the callee is not a member expression.
        // First check whether any of the args are complex. In that case we must cache the callee regardless.
        // Otherwise, check if the callee is simple. If not cache just the callee.

        let funcName = callee.name;
        const isDotcall = funcName === SYMBOL_DOTCALL;
        let contextNode = undefined;
        let args = nodeArgs.slice(0);

        if (isDotcall) {
          callee = args[0];
          funcName = callee.name;
          contextNode = args[1];
          args = args.slice(3);
        }

        const replaceCallee = newCallee => isDotcall ? nodeArgs[0] = newCallee : (node.callee = newCallee);
        const replaceArgs = newArgs => {
          if (isDotcall) {
            vlog('Replacing args from the third');
            node.arguments.length = 3;
            node.arguments.push(...newArgs);
          } else {
            vlog('Replacing args from the first because func is not dotcall', [funcName]);
            node.arguments = newArgs;
          }
        };

        if (callee.type !== 'Identifier' || AST.isPrimitive(callee)) {
          if (AST.isPrimitive(callee) ) {
            rule('Calling a value that is certainly uncallable must result in an error');
            example('404("not found")', 'throw new Error()');
            before(body[i]);

            body[i] = AST.throwStatement(AST.primitive(`Attempting to call a value that cannot be called: \`${tmat(body[i], true).replace(/\n/g, '\\n')}\``))

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          } else {
            // Calling something that is not an identifier or primitive; just abstract it.

            rule('The callee of a call must be an ident');
            example('a()(x, y)', 'tmp = a(), tmp(x, y)');
            before(node, parentNodeOrWhatever);

            const tmpName = createFreshVar('tmpCallComplexCallee', fdata);
            const newNode = AST.varStatement('const', tmpName, callee);
            body.splice(i, 0, newNode);
            replaceCallee(AST.identifier(tmpName));

            after(body.slice(i, i+1+1));
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        }

        if (contextNode && contextNode.type !== 'Identifier' && !AST.isPrimitive(contextNode)) {
          vlog('Context is a', contextNode.type);
          rule('The context of a dotcall must be a simple node');
          example(`${SYMBOL_DOTCALL}(f, g(), undefined)`, `const tmp = g(), ${SYMBOL_DOTCALL}(f, tmp, undefined)`);
          before(node, parentNodeOrWhatever);

          const tmpName = createFreshVar('tmpCallComplexCallee', fdata);
          const newNode = AST.varStatement('const', tmpName, contextNode);
          body.splice(i, 0,
            // Technically we have to put the callee before this alias (dotcall(a, b, c) evaluates a b c in order)
            // Hopefully not too noisy. It's only to preserve tdz semantics.
            AST.expressionStatement(AST.cloneSimple(nodeArgs[0])),
            newNode
          );
          nodeArgs[1] = AST.identifier(tmpName); // This must be a dotcall s reference nodeArgs directly

          after(body.slice(i, i+3));
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (funcName === SYMBOL_THROW_TDZ_ERROR) {
          // Special case that we inject for a variable that was detected to throw an error if it were ever referenced
          rule('A statement that is calling $throwTDZError should become an explicit throw of the arg');
          example('$throwTDZError("something bad")', 'throw "something bad"');
          before(node);

          body[i] = AST.throwStatement(args[0]);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (ASSUME_BUILTINS) {
          // First eliminate excessive args, or first args that are spreads
          switch (funcName) {
            case 'isNaN':
            case symbo('Number', 'isNaN'):
            case 'isFinite':
            case symbo('Number', 'isFinite'):
            case symbo('Number', 'isInteger'):
            case symbo('Number', 'isSafeInteger'):
            case 'Boolean':
            case 'parseFloat':
            case symbo('Number', 'parseFloat'):
            case 'Number':
            case 'String': {
              if (firstSpread) {
                rule('Builtins that accept one arg but receive a spread can be improved');
                example('isNaN(...a(), b(), c());', 'const tmp = [...a()][0]; b(); c(); isNaN(tmp);');
                before(node, body);

                // It's not pretty but if we want to maintain proper order, the first arg has to be cached.
                const tmpName = createFreshVar('tmpArgOverflow', fdata);
                replaceArgs([AST.identifier(tmpName)]);

                body.splice(
                  i,
                  0,
                  // const x = [...firstargnode][0]'
                  AST.varStatement(
                    'const',
                    tmpName,
                    AST.memberExpression(AST.arrayExpression(args[0]), AST.literal(0), true),
                  ),
                  // If any excessive args was a spread, we can create an array expression for it... `f(a, ...b)` -> `[...b];`
                  ...args.slice(1).map((e) => (AST.expressionStatement(e.type === 'SpreadElement' ? AST.arrayExpression(e) : e))),
                  // Context after args but before result (it's evaluated last)
                  ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                );

                after(body.slice(i, i+Math.max(1, 1 + Math.max(args.length - 1, 0) + (contextNode?1:0) + 1)));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (args.length === 0 || AST.isPrimitive(args[0])) {
                rule('If certain builtin global funcs received a primitive value or none at all it can be resolved');
                rule('isNaN("50foo");', ';');
                rule('isFinite();', ';');
                rule('isFinite(400, a, b);', 'a; b;');
                before(node, parentNodeOrWhatever);

                // Note: for some funcs there's a difference between calling it with undefined or nothing (String() vs String(undefined))
                const pv = args.length === 0 ? undefined : AST.getPrimitiveValue(args[0]);
                let v;
                switch (funcName) {
                  case symbo('Number', 'isNaN'):
                  case 'isNaN':
                    v = args.length === 0 ? isNaN() : isNaN(pv);
                    break;
                  case symbo('Number', 'isFinite'):
                  case 'isFinite':
                    v = args.length === 0 ? isFinite() : isFinite(pv);
                    break;
                  case symbo('Number', 'isInteger'):
                    v = args.length === 0 ? Number.isInteger() : Number.isInteger(pv);
                    break;
                  case symbo('Number', 'isSafeInteger'):
                    v = args.length === 0 ? Number.isSafeInteger() : Number.isSafeInteger(pv);
                    break;
                  case 'Boolean':
                    v = args.length === 0 ? Boolean() : Boolean(pv);
                    break;
                  case symbo('Number', 'parseFloat'):
                  case 'parseFloat':
                    v = args.length === 0 ? parseFloat() : parseFloat(pv);
                    break;
                  case 'Number':
                    v = args.length === 0 ? 0 : Number(pv);
                    break;
                  case 'String':
                    v = args.length === 0 ? '' : String(pv);
                    break;
                  default:
                    ASSERT(false);
                }

                const finalNode = AST.primitive(v);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1,
                  // Put excessive args before the statement with the original call (isNaN(x, y, z) -> y; z; true)
                  ...args.slice(1).map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                  // Context after args but before result (it's evaluated last)
                  ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  finalParent
                );

                after(body.slice(i, i+Math.max(1, 1 + Math.max(args.length - 1, 0) + (contextNode?1:0))));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              // Move excessive args out, after normalization
              if (args.length > 1 && args.every(anode => !AST.isComplexNode(anode))) {
                rule('Eliminate excessive args when we know they are excessive');
                rule('isNaN(a, b, c);', 'a; b; c; isNaN(a, b, c);');
                before(node, parentNodeOrWhatever);

                body.splice(i, 0,
                  ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                );
                node.arguments.length = isDotcall ? 4 : 1;

                after(body.slice(i, i+args.length));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              break;
            }
            case symbo('Number', 'parseInt'):
            case 'parseInt': {
              if (
                args.length === 0 ||
                (args.length === 1 && AST.isPrimitive(args[0])) ||
                (args.length >= 2 && AST.isPrimitive(args[0]) && AST.isPrimitive(args[1]))
              ) {
                rule('A statement that is `parseInt()` (without args or with primitive args) can be eliminated');
                example('Number.parseInt();', ';');
                example('Number.parseInt(100);', ';');
                example('Number.parseInt(100, 10);', ';');
                example('Number.parseInt(100, 20, a, b);', 'a; b;');
                before(node, parentNodeOrWhatever);

                const finalNode = AST.primitive(
                  args.length === 0
                    ? parseInt()
                    : args.length === 1
                      ? parseInt(AST.getPrimitiveValue(args[0]))
                      : parseInt(AST.getPrimitiveValue(args[0]), AST.getPrimitiveValue(args[1])),
                );
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1,
                  // If any excessive args was a spread, we can create an array expression for it... `f(a, ...b)` -> `[...b];`
                  ...args.slice(2).map((e) => (e.type === 'SpreadElement' ? AST.arrayExpression(e) : AST.expressionStatement(e))),
                  // Context after args but before result (it's evaluated last)
                  ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  finalParent
                );

                after(body.slice(i, i+Math.max(1, 1 + Math.max(args.length - 2, 0) + (contextNode?1:0))));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (args.length > 2 && !firstSpread && args[1].type !== 'SpreadElement' && args[2].type !== 'SpreadElement') {
                rule('parseInt accepts two args should not receive more');
                example('parseInt(a(), b(), c());', 'const tmp = a(); const tmp2 = b(); c(); parseInt(tmp, tmp2);');
                before(node, body);

                // It's not pretty but if we want to maintain proper order, the first args have to be cached.
                const tmpName1 = createFreshVar('tmpArgOverflowOne', fdata);
                const tmpName2 = createFreshVar('tmpArgOverflowTwo', fdata);
                replaceArgs([AST.identifier(tmpName1), AST.identifier(tmpName2)]);

                body.splice(
                  i,
                  0,
                  // Note: the first args should not be a spread at this point
                  AST.varStatement('const', tmpName1, args[0]),
                  AST.varStatement('const', tmpName2, args[1]),
                  // If any excessive args was a spread, we can create an array expression for it... `f(a, ...b)` -> `[...b];`
                  ...args.slice(2).map((e) => (e.type === 'SpreadElement' ? AST.arrayExpression(e) : AST.expressionStatement(e))),
                  // Context after args but before result (it's evaluated last)
                  ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                );

                after(body.slice(i, i+Math.max(1, 1 + Math.max(args.length - 2, 0) + (contextNode?1:0) + 2)));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              // Move excessive args out, after normalization
              if (args.length > 2 && args.every(anode => !AST.isComplexNode(anode))) {
                rule('Eliminate excessive args when we know they are excessive');
                rule('parseInt(a, b, c);', 'a; b; c; parseInt(a, b, c);');
                before(node, parentNodeOrWhatever);

                body.splice(i, 0,
                  ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                );
                node.arguments.length = isDotcall ? 4 : 1;

                after(body.slice(i, i+args.length));
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              break;
            }
            case 'atob': {
              if (args.length === 1 && AST.isPrimitive(args[0])) {
                const value = AST.getPrimitiveValue(args[0]);
                try {
                  const result = atob(value);

                  rule('A call to `atob` with a primitive can be inlined');
                  example('atob("eHl6");', 'xyz');
                  before(body[i]);

                  const finalNode = AST.primitive(result);
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    finalParent,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body[i]);
                  return true;
                } catch {
                  vlog('- bailing on atob; it crashes');
                }
              }
              break;
            }
            case 'btoa': {
              if (args.length === 1 && AST.isPrimitive(args[0])) {
                const value = AST.getPrimitiveValue(args[0]);
                try {
                  const result = btoa(value);

                  rule('A call to `btoa` with a primitive can be inlined');
                  example('btoa("xyz");', 'eHl6');
                  before(body[i]);

                  const finalNode = AST.primitive(result);
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    finalParent,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body[i]);
                  return true;
                } catch {
                  vlog('- bailing on btoa; it crashes');
                }
              }
              break;
            }
          }

          if (wrapKind === 'statement') {
            // Keep in mind, static methods like Date.now eventually are converted to global idents like $Date_now and end up here

            // Functions that do not coerce at all
            if (BUILTIN_FUNCS_NO_CTXT_NON_COERCE.has(funcName)) {
              // Move all args to individual statements. Drop the call.
              rule('A statement that is calling a built-in function without side effects should be replaced by its args as statements');
              example('Number.isFinite(300);', '300;');
              example('Number.isFinite(a, b, c);', 'a; b; c;');

              eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, 0);

              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // Functions that coerce the first arg to number but not the rest
            if (BUILTIN_FUNCS_NO_CTX_COERCE_FIRST_TO_NUMBER.has(funcName) && args[0]?.type !== 'SpreadElement') {
              // Note: the `+` operator is effectively the specificaton's `ToNumber` coercion operation in syntactic form.
              // Move all args to individual statements. Coerce the first to number. Drop the call.
              rule('A statement that is calling a built-in function that coerce the first arg to number should be eliminated');
              example('Number.isNaN(300);', '300;');
              example('Number.isNaN(a, b);', `const tmp = a; b; ${SYMBOL_COERCE}(tmp, "number")`);

              eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, 1, 'number');
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // Functions that coerce the first arg to string but not the rest
            if (BUILTIN_FUNCS_NO_CTX_COERCE_FIRST_TO_STRING.has(funcName) && args[0]?.type !== 'SpreadElement' && args[1]?.type !== 'SpreadElement') {
              rule('A statement that is calling a built-in function that coerce the first arg to string should be eliminated');
              example('String(300);', `${SYMBOL_COERCE}(300, "string");`);
              example('String(a, b, c);', `const tmp = a; b; c; ${SYMBOL_COERCE}(tmp, "string");`);

              eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, 1, 'string');
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            switch (funcName) {
              case 'Function': {
                // TODO. Are args coerced? I think the call itself is not observable otherwise.
                break;
              }

              case symbo('boolean', 'valueOf'): {
                if (isDotcall && AST.isBoolean(node.arguments[1])) {
                  // This should be safe to eliminate. A statement that calls .valueOf() on a boolean literal.
                  // - `false.valueOf()`
                  // Note that we can't do primitive checks etc. It doesn't coerce but it must also support `new Boolean()` as context.
                  rule('A boolean literal with .valueOf() as statement can be eliminated');
                  example('false.valueOf(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Note: we know the context is a boolean literal so no need to inject that here.
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }

              case symbo('Buffer', 'from'): {
                if (args.map(anode => AST.isPrimitive(anode))) {
                  riskyRule('A statement that is Buffer.from with only primitives can be eliminated');
                  example('Buffer.from( "aGVsbG8sIHdvcmxk=", "base64" );', ';');
                  before(node, body);

                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(AST.emptyStatement(), body);
                  return true;
                }
                break;
              }

              case symbo('Date', 'UTC'): {
                // Coerce the first seven args to number
                if (args.every((anode, ai) => anode.type !== 'SpreadElement' || ai >= 7)) {
                  rule('A statement that is Date.UTC can be eliminated');
                  example('Date.UTC(a, b, c);', '+a; +b; +c;');
                  before(body[i]);

                  const tmpName1 = args.length > 0 && createFreshVar('tmpEA1', fdata); // builtin-excessive-arg
                  const tmpName2 = args.length > 1 && createFreshVar('tmpEA2', fdata); // builtin-excessive-arg
                  const tmpName3 = args.length > 2 && createFreshVar('tmpEA3', fdata); // builtin-excessive-arg
                  const tmpName4 = args.length > 3 && createFreshVar('tmpEA4', fdata); // builtin-excessive-arg
                  const tmpName5 = args.length > 4 && createFreshVar('tmpEA5', fdata); // builtin-excessive-arg
                  const tmpName6 = args.length > 5 && createFreshVar('tmpEA6', fdata); // builtin-excessive-arg
                  const tmpName7 = args.length > 6 && createFreshVar('tmpEA7', fdata); // builtin-excessive-arg

                  const newArgNodes = args.slice(7).map((anode, ai) =>
                    AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)
                  );
                  const newNodes = [
                    args.length > 0 && AST.varStatement('const', tmpName1, args[0] || AST.undef()),
                    args.length > 1 && AST.varStatement('const', tmpName2, args[1] || AST.undef()),
                    args.length > 2 && AST.varStatement('const', tmpName3, args[2] || AST.undef()),
                    args.length > 3 && AST.varStatement('const', tmpName4, args[3] || AST.undef()),
                    args.length > 4 && AST.varStatement('const', tmpName5, args[4] || AST.undef()),
                    args.length > 5 && AST.varStatement('const', tmpName6, args[5] || AST.undef()),
                    args.length > 6 && AST.varStatement('const', tmpName7, args[6] || AST.undef()),
                    ...newArgNodes,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    // Do coerce last. That's when the function is actually being invoked, after reading the context, property, and args.
                    args.length > 0 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName1), AST.primitive('number')])),
                    args.length > 1 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName2), AST.primitive('number')])),
                    args.length > 2 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName3), AST.primitive('number')])),
                    args.length > 3 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName4), AST.primitive('number')])),
                    args.length > 4 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName5), AST.primitive('number')])),
                    args.length > 5 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName6), AST.primitive('number')])),
                    args.length > 6 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName7), AST.primitive('number')])),
                  ].filter(Boolean);
                  body.splice(i, 1, ...newNodes);

                  after(body.slice(i, i + Math.max(1, newNodes.length - 1)), body);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }

              case symbo('Math', 'atan2'): // Coerce the first two args to number
              case symbo('Math', 'imul'): // Coerce the first two args to number
              case symbo('Math', 'pow'): {
                // Coerce the first two args to number
                if (args.every((anode, ai) => anode.type !== 'SpreadElement' || ai >= 2)) {
                  rule('A Math statement with two args can be eliminated');
                  example('Math.pow(a, b);', '+a; +b;');

                  eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, 2, 'number', 'number');
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }

              case symbo('Math', 'hypot'): // Coerce all args to number
              case symbo('Math', 'max'): // Coerce all args to number
              case symbo('Math', 'min'): // Coerce all args to number
              case symbo('String', 'fromCharCode'): // Coerce all args to number
              //case symbo('String', 'fromCodePoint'): // fromCodePoint can crash on invalid input ... :/
              {
                // Coerce all args to number
                if (args.every((anode, ai) => anode.type !== 'SpreadElement')) {
                  rule('A statement that is a builtin func call that coerces all its args to number can be eliminated');
                  example('Math.pow(a, b, c);', `${SYMBOL_COERCE}(a, "number"); ${SYMBOL_COERCE}(b, "number"); ${SYMBOL_COERCE}(c, "number");`);
                  example(
                    `${SYMBOL_DOTCALL}(${symbo('Math', 'pow')}, ctx, undefined, a, b, c);`,
                    `const t1 = a; const t2 = b; const t3 = c; ctx; ${SYMBOL_COERCE}(t1, "number"); ${SYMBOL_COERCE}(t2, "number"); ${SYMBOL_COERCE}(t3, "number");`
                  );
                  before(body[i]);

                  const tmpNames = args.map((_,i) => createFreshVar('tmpEA' + i, fdata)); // builtin-excessive-arg
                  const newVarNodes = tmpNames.map((tmpName, i) => AST.varStatement('const', tmpName, args[i]));
                  const coerceNodes = args.map((anode, ai) =>
                    AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpNames[ai]), AST.primitive('number')]))
                  );
                  const newNodes = [
                    ...newVarNodes,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    // The context goes between referencing the args and actually coercing them...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    // Do coerce last. That's when the function is actually being invoked, after reading the context, property, and args.
                    ...coerceNodes
                  ].filter(Boolean);
                  body.splice(i, 1, ...newNodes);

                  after(body.slice(i, i + Math.max(1, newNodes.length - 1)), body);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }

              case symbo('number', 'toString'): {
                // Note: This can only be eliminated if we know that the first arg is missing or between 2 and 36, inclusive.
                //       The function will throw for OOB or NaN values.
                if (isDotcall && AST.isNumberValueNode(node.arguments[1]) && (!args[0] || args[0].type !== 'SpreadElement')) {
                  if (!args[0] || (AST.isPrimitive(args[0]) && AST.getPrimitiveValue(args[0]) >= 2 && AST.getPrimitiveValue(args[0]) <= 36)) {
                    // This should be safe to eliminate. A statement that calls .toString() on a number value.
                    // - `100..toString()`
                    // - `100..toString(2)`
                    // Note that this throws if the context is not a number. No coercion happens, just throws.
                    // The first arg is coerced to number
                    rule('A number value with .toString() as statement can be eliminated');
                    example('100.toString(a, b);', `${SYMBOL_COERCE}(a, "number"); b;`);
                    example('NaN.toString(a, b);', `${SYMBOL_COERCE}(a, "number"); b;`);
                    before(body[i]);

                    body.splice(i, 1,
                      ...args.map((anode, ai) => {
                        if (ai === 0) return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                        return AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)
                      }),
                      // Note: we know the context is a number value so no need to inject that here.
                    );

                    after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                    return true;
                  } else {
                    vlog('- bail: could not assert that the first arg is a valid number.toString range');
                  }
                }
                break;
              }
              case symbo('number', 'valueOf'): {
                if (isDotcall && AST.isNumberValueNode(node.arguments[1])) {
                  // This should be safe to eliminate. A statement that calls .valueOf() on a number value.
                  // - `100..valueOf()`
                  // Note that this throws if the context is not a number. No coercion happens, just throws.
                  rule('A number value with .valueOf() as statement can be eliminated');
                  example('100..valueOf(a, b);', 'a; b;');
                  example('NaN.valueOf(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Note: we know the context is a number value so no need to inject that here.
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }
              case symbo('string', 'charCodeAt'): {
                if (isDotcall && AST.isStringLiteral(node.arguments[1], true)) {
                  // This should be safe to eliminate. A statement that calls .toString() on a string value.
                  // - `"xyz".charCodeAt()`
                  rule('A string value with .charCodeAt() as statement can be eliminated');
                  example('"xyz".charCodeAt(a, b);', `${BUILTIN_FUNCS_NO_CTX_COERCE_FIRST_TO_NUMBER}(a, "number"); b;`);
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map((anode, ai) => {
                      if (ai === 0) return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [anode, AST.primitive('number')]));
                      return AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)
                    }),
                    // Context should be a string but if it's a template it might have side effects? or did i fix that already...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }
              case symbo('string', 'toLowerCase'): {
                if (isDotcall && AST.isStringLiteral(node.arguments[1], true)) {
                  // This should be safe to eliminate. A statement that calls .toString() on a string value.
                  // - `"xyz".toLowerCase()`
                  rule('A string value with .toLowerCase() as statement can be eliminated');
                  example('"xyz".toLowerCase(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context should be a string but if it's a template it might have side effects? or did i fix that already...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }
              case symbo('string', 'toUpperCase'): {
                if (isDotcall && AST.isStringLiteral(node.arguments[1], true)) {
                  // This should be safe to eliminate. A statement that calls .toString() on a string value.
                  // - `"xyz".toUpperCase()`
                  rule('A string value with .toUpperCase() as statement can be eliminated');
                  example('"xyz".toUpperCase(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context should be a string but if it's a template it might have side effects? or did i fix that already...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }
              case symbo('string', 'toString'): {
                if (isDotcall && AST.isStringLiteral(node.arguments[1], true)) {
                  // This should be safe to eliminate. A statement that calls .toString() on a string value.
                  // - `"xyz".toString()`
                  // Note that this throws if the context is not a string. No coercion happens, just throws.
                  rule('A string value with .toString() as statement can be eliminated');
                  example('"xyz".toString(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context should be a string but if it's a template it might have side effects? or did i fix that already...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }
              case symbo('string', 'valueOf'): {
                if (isDotcall && AST.isStringLiteral(node.arguments[1], true)) {
                  // This should be safe to eliminate. A statement that calls .valueOf() on a string value.
                  // - `"xyz".valueOf()`
                  // Note that this throws if the context is not a string. No coercion happens, just throws.
                  rule('A string value with .valueOf() as statement can be eliminated');
                  example('"hi".valueOf(a, b);', 'a; b;');
                  before(body[i]);

                  body.splice(i, 1,
                    ...args.map(anode => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context should be a string but if it's a template it might have side effects? or did i fix that already...
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(args.length ? body.slice(i, i+args.length) : AST.emptyStatement());
                  return true;
                }
                break;
              }

              case symbo('number', 'toExponential'): {
                if (args.length === 0) {
                  rule('A call to `number.toExponential()` without args is like calling it with zero');
                  example(
                    `${SYMBOL_DOTCALL}(${symbo('number', 'toExponential')}, 100, "toExponential");`,
                    `${SYMBOL_DOTCALL}(${symbo('number', 'toExponential')}, 100, "toExponential", 0);`
                  );
                  before(body[i]);

                  node.argument.push(AST.primitive(0))

                  after(body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                // Note: consider `Number(...x, y)` when x is an empty array. We can't support spread as first arg unless we know the arg.
                if (args.length > 1 && args[0].type !== 'SpreadElement') {
                  rule('A call to `parseFloat` with some args should call `$coerce` with one');
                  example('f(parseFloat(a, b, c));', 'const tmp = a; b; c; f(parseFloat(tmp));');
                  before(node, parentNodeOrWhatever);

                  const newNodes = [];

                  const tmpArgName = createFreshVar('tmpStringFirstArg', fdata);
                  args.forEach((anode, ai) => {
                    if (ai === 0) {
                      newNodes.push(AST.varStatement('const', tmpArgName, anode));
                    } else {
                      newNodes.push(AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode));
                    }
                  });

                  replaceArgs([
                    args[0].type === 'SpreadElement'
                      ? AST.memberExpression(tmpArgName, AST.literal(0), true) // `tmpName[0]`
                      : AST.identifier(tmpArgName),
                  ]);

                  body.splice(i, 0,
                    ...newNodes,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body.slice(i, newNodes.length + (contextNode ? 1 : 0) + 1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                if (args.length === 1 && AST.isPrimitive(args[0])) {
                  rule('A primitive value to `parseFloat` should be resolved');
                  example('f(parseFloat("50foo"))', 'f(50)');
                  before(node, body[i]);

                  const finalNode = AST.primitive(parseFloat(AST.getPrimitiveValue(args[0])));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalParent, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                break;
              }

              case symbo('number', 'toFixed'): {
                if (args.length === 0) {
                  rule('A call to `number.toFixed()` without args is like calling it with zero');
                  example(
                    `${SYMBOL_DOTCALL}(${symbo('number', 'toFixed')}, 100, "toFixed");`,
                    `${SYMBOL_DOTCALL}(${symbo('number', 'toFixed')}, 100, "toFixed", 0);`
                  );
                  before(body[i]);

                  node.argument.push(AST.primitive(0))

                  after(body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                // Note: consider `Number(...x, y)` when x is an empty array. We can't support spread as first arg unless we know the arg.
                if (args.length > 1 && args[0].type !== 'SpreadElement') {
                  rule('A call to `parseFloat` with some args should call `$coerce` with one');
                  example('f(parseFloat(a, b, c));', 'const tmp = a; b; c; f(parseFloat(tmp));');
                  before(node, parentNodeOrWhatever);

                  const newNodes = [];

                  const tmpArgName = createFreshVar('tmpStringFirstArg', fdata);
                  args.forEach((anode, ai) => {
                    if (ai === 0) {
                      newNodes.push(AST.varStatement('const', tmpArgName, anode));
                    } else {
                      newNodes.push(AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode));
                    }
                  });

                  replaceArgs([
                    args[0].type === 'SpreadElement'
                      ? AST.memberExpression(tmpArgName, AST.literal(0), true) // `tmpName[0]`
                      : AST.identifier(tmpArgName),
                  ]);

                  body.splice(i, 0,
                    ...newNodes,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body.slice(i, newNodes.length + (contextNode ? 1 : 0) + 1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                if (args.length === 1 && AST.isPrimitive(args[0])) {
                  rule('A primitive value to `parseFloat` should be resolved');
                  example('f(parseFloat("50foo"))', 'f(50)');
                  before(node, body[i]);

                  const finalNode = AST.primitive(parseFloat(AST.getPrimitiveValue(args[0])));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalParent, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                break;
              }

              case 'parseInt':
              case symbo('Number', 'parseInt'): {
                // Coerce the first arg to string, the second to number, drop the stmt
                if (args.every((anode, ai) => anode.type !== 'SpreadElement' || ai >= 2)) {
                  rule('A statement that is Number.parseInt can be eliminated');
                  example('Number.parseInt(a, b, c);', '""+a; +b; c;');

                  eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, 2, 'string', 'number');
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }
            }
          }
          else {
            // if not statement

            const firstArgNode = args[0];
            switch (funcName) {
              case symbo('function', 'constructor'):
              case 'Function': {
                // The "easier" eval
                // If we can determine all the args then I think we can construct a new global function and that's just it
                // However, doing so may introduce new implicit globals and naming collisions that need to be resolved.

                // This is dangerous since we renamed many variables, possibly already eliminated some of them, and the
                // eval would want to try and reference them as they were in the original input. So we can certainly
                // try this, but there's a very good chance it will just fail hard.
                // Luckily for us, the obfuscation family of things just do superficial stuffs here.
                // If there is a context node, let another transform simplify it first
                if (allowEval && !contextNode) {
                  if (args.every((anode) => AST.isPrimitive(anode))) {
                    // TODO: we could try to find the original point of this call and replace the arg but I'm sure there are plenty of cases where this is not feasible (like conditionals etc)
                    vlog('This call to `Function` has primitive args so we should be able to resolve it...');
                    riskyRule('Call to `Function` with primitive args can be resolved (although there is no guarantee it will work)');
                    example('const x = Function("return 10;");', 'const x = function(){ return 10; };');
                    before(node, body[i]);

                    const argString =
                      args
                      .slice(0, -1)
                      .map((anode) => String(AST.getPrimitiveValue(anode)))
                      .join(',');
                    const bodyString = (args.length ? AST.getPrimitiveValue(args[args.length - 1]) : '');
                    const funcString =
                      'function anon(' +
                      argString +
                      ') { ' +
                      // Hack for returning this. It wont work in nodejs and in browsers it will return window. So return window.
                      (bodyString === 'return this' || bodyString === 'return this;' ? 'return window' : bodyString) +
                      '}';
                    const finalNode = createNormalizedFunctionFromString(
                      funcString,
                      bodyString,
                      undefined,
                      fdata,
                    );

                    vlog('Cloned func:');
                    source(finalNode);

                    vlog('Replacing call with fresh function');
                    const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                    body[i] = finalParent;

                    after(body[i]);
                    assertNoDupeNodes(AST.blockStatement(body), 'body');
                    return true;
                  }
                }
                break;
              }
              case 'isNaN':
              case symbo('Number', 'isNaN'):
              {
                if (args.length === 1 && args[0] && AST.isPrimitive(args[0])) {
                  rule('Calling `isNaN` on a primitive should resolve');
                  example('isNaN("hello")', 'true'); // tests/cases/normalize/builtins/globals_with_primitives/isnan_500.md
                  before(node, parentNodeOrWhatever);

                  const finalNode = isNaN(AST.getPrimitiveValue(firstArgNode)) ? AST.tru() : AST.fals();
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent
                  );

                  after(finalNode, body.slice(i, args.length));
                  return true;
                }
                break;
              }
              case 'isFinite':
              case symbo('Number', 'isFinite'):
              {
                if (args.length === 1 && args[0] && AST.isPrimitive(args[0])) {
                  rule('Calling `isFinite` on a primitive should resolve');
                  example('isFinite("hello")', 'false'); // tests/cases/normalize/builtins/globals_with_primitives/isfinite_500.md
                  before(node, parentNodeOrWhatever);

                  const finalNode = isFinite(AST.getPrimitiveValue(firstArgNode)) ? AST.tru() : AST.fals();
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  return true;
                }
                break;
              }
              case symbo('boolean', 'constructor'):
              case 'Boolean': {
                if (args.length === 1 && args[0] && AST.isPrimitive(args[0])) {
                  rule('Calling `Boolean` on a primitive should resolve');
                  example('Boolean("hello")', 'true');
                  before(node, parentNodeOrWhatever);

                  const finalNode = Boolean(AST.getPrimitiveValue(firstArgNode)) ? AST.tru() : AST.fals();
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  return true;
                }
                break;
              }
              case 'parseInt':
              case symbo('Number', 'parseInt'):
              {
                if (firstArgNode && AST.isPrimitive(firstArgNode) && args.length <= 2) {
                  if (args.length === 1 || AST.isPrimitive(args[1])) {
                    const pv1 = AST.getPrimitiveValue(firstArgNode);
                    const pv2 = args[1] && AST.getPrimitiveValue(args[1]);

                    const pvn = args[1] ? parseInt(pv1, pv2) : parseInt(pv1);
                    // Confirm that we can serialize it without loss of precision
                    if (pvn === +String(pvn)) {
                      // Ok... Seems this is safe to convert

                      rule('Calling `parseFloat` on a primitive should resolve');
                      example('parseInt("50hello")', '50'); // tests/cases/normalize/builtins/globals_with_primitives/parseint_500.md
                      before(node, parentNodeOrWhatever);

                      const finalNode = AST.primitive(pvn);
                      const finalParent = wrapExpressionAs(
                        wrapKind,
                        varInitAssignKind,
                        varInitAssignId,
                        wrapLhs,
                        varOrAssignKind,
                        finalNode,
                      );
                      // If there was a second arg it must have been a primitive to get here. In that case we can ignore it here.
                      body.splice(i, 1,
                        ...args.slice(2).map((enode) => AST.expressionStatement(enode)),
                        // Context might not be used but if it is referenced we keep for tdz reasons.
                        ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                        finalParent,
                      );

                      after(finalNode, body.slice(i, args.length));
                      return true;
                    }
                  }
                }
                break;
              }
              case 'parseFloat':
              case symbo('Number', 'parseFloat'):
              {
                // This is not "just" calling Number or String... We can probably do this anyways.

                if (args.length === 0) {
                  rule('A call to `parseFloat()` without args is NaN');
                  example('f(parseFloat());', 'f(NaN);');
                  before(node, body[i]);

                  const finalNode = AST.identifier('NaN');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(finalParent, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                // Note: consider `Number(...x, y)` when x is an empty array. We can't support spread as first arg unless we know the arg.
                if (args.length > 1 && args[0].type !== 'SpreadElement') {
                  rule('A call to `parseFloat` with some args should call `$coerce` with one');
                  example('f(parseFloat(a, b, c));', 'const tmp = a; b; c; f(parseFloat(tmp));');
                  before(node, parentNodeOrWhatever);

                  const newNodes = [];

                  const tmpArgName = createFreshVar('tmpStringFirstArg', fdata);
                  args.forEach((anode, ai) => {
                    if (ai === 0) {
                      newNodes.push(AST.varStatement('const', tmpArgName, anode));
                    } else {
                      newNodes.push(AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode));
                    }
                  });

                  replaceArgs([
                    args[0].type === 'SpreadElement'
                      ? AST.memberExpression(tmpArgName, AST.literal(0), true) // `tmpName[0]`
                      : AST.identifier(tmpArgName),
                  ]);

                  body.splice(i, 0,
                    ...newNodes,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body.slice(i, newNodes.length + (contextNode ? 1 : 0) + 1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                if (args.length === 1 && AST.isPrimitive(args[0])) {
                  rule('A primitive value to `parseFloat` should be resolved');
                  example('f(parseFloat("50foo"))', 'f(50)');
                  before(node, body[i]);

                  const finalNode = AST.primitive(parseFloat(AST.getPrimitiveValue(args[0])));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalParent, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                break;
              }
              case symbo('number', 'constructor'):
              case 'Number': {
                // We eliminate Number in favor of $coerce

                if (args.length === 0) {
                  rule('A call to `Number` or `number.constructor()` without args is empty number');
                  example('f(Number());', 'f("");');
                  example(`${SYMBOL_DOTCALL}(${symbo('number', 'constructor')}, 1, "constructor");`, '"";');
                  before(body[i]);

                  const finalNode = AST.primitive('');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  before(body.slice(i, i+(contextNode?1:0)+1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                // We cannot safely transform `Number(...x, y)` because if x is empty then `y` is the one being coerced, else y is ignored.
                if (args[0].type !== 'SpreadElement') {
                  rule('A call to `Number` or `number.constructor` with some args should call `$coerce` with one');
                  example('f(Number(a, b, c));', `const tmp = a; b; c; f(${SYMBOL_COERCE}(tmp, "number"));`);
                  example(`${SYMBOL_DOTCALL}(${symbo('number', 'constructor')}, 1, "constructor", a, b, c);`, `const tmp = a; b; c; ${SYMBOL_COERCE}(tmp, "number");`);
                  before(body[i]);

                  let tmpArgName = createFreshVar('tmpNumberFirstArg', fdata);
                  const newArgs = args.map((anode, ai) => {
                    if (ai === 0) {
                      return AST.varStatement('const', tmpArgName, anode);
                    }
                    return AST.expressionStatement(AST.cloneSimple(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode));
                  });
                  node.callee = AST.identifier(SYMBOL_COERCE);
                  node.arguments = [AST.identifier(tmpArgName), AST.primitive('number')];
                  body.splice(i, 0,
                    ...newArgs,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body.slice(i, i + newArgs.length + (contextNode ? 1 : 0) + 1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                return false;
              }
              case symbo('regex', 'constructor'):
              case 'RegExp': {
                // I'm pretty sure we can safely convert regular expressions to literals when the args are strings
                // The exception would be for illegal regexes, where they would be safer in their constructor form...

                if (args.length === 0) {
                  // This will generate the regex `/(?:)/`

                  rule('Calling `RegExp()` without args returns `/(?:)/`');
                  example('RegExp()', '/(?:)/');
                  example(`${SYMBOL_DOTCALL}(${symbo('regex', 'constructor')}, /x/, "constructor")`, '/(?:)/');
                  before(node, body[i]);

                  const finalNode = AST.regex('(?:)', '', '/(?:)/');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                if (args.length <= 2 && AST.isPrimitive(args[0]) && (!args[1] || AST.isPrimitive(args[1]))) {
                  rule('Calling `RegExp()` with primitives should construct the regex');
                  example('RegExp("foo")', '/foo/', () => !args[1]);
                  example('RegExp("foo". "g")', '/foo/g', () => !!args[1]);
                  example(`${SYMBOL_DOTCALL}(${symbo('regex', 'constructor')}, /x/, "constructor", "foo", "g")`, '/foo/g');
                  before(node, body[i]);

                  const pattern = AST.getPrimitiveValue(args[0]);
                  const flags = args[1] ? AST.getPrimitiveValue(args[1]) : '';
                  const finalNode = AST.regex(pattern, flags, String(RegExp(pattern, flags)));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                break;
              }
              case symbo('string', 'constructor'):
              case 'String': {
                // We eliminate String in favor of $coerce

                if (args.length === 0) {
                  rule('A call to `String` or `String.constructor()` without args is empty string');
                  example('f(String());', 'f("");');
                  example(`${SYMBOL_DOTCALL}(${symbo('string', 'constructor')}, 1, "constructor");`, '"";');
                  before(body[i]);

                  const finalNode = AST.primitive('');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  before(body.slice(i, i+(contextNode?1:0)+1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                // We cannot safely transform `String(...x, y)` because if x is empty then `y` is the one being coerced, else y is ignored.
                if (args[0].type !== 'SpreadElement') {
                  rule('A call to `String` or `string.constructor` with some args should call `$coerce` with one');
                  example('f(String(a, b, c));', `const tmp = a; b; c; f(${SYMBOL_COERCE}(tmp, "string"));`);
                  example(`${SYMBOL_DOTCALL}(${symbo('string', 'constructor')}, 1, "constructor", a, b, c);`, `const tmp = a; b; c; ${SYMBOL_COERCE}(tmp, "string");`);
                  before(body[i]);

                  let tmpArgName = createFreshVar('tmpStringFirstArg', fdata);
                  const newArgs = args.map((anode, ai) => {
                    if (ai === 0) return AST.varStatement('const', tmpArgName, anode);
                    return AST.expressionStatement(AST.cloneSimple(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode));
                  });
                  node.callee = AST.identifier(SYMBOL_COERCE);
                  node.arguments = [AST.identifier(tmpArgName), AST.primitive('string')];
                  body.splice(i, 0,
                    ...newArgs,
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                  );

                  after(body.slice(i, i + newArgs.length + (contextNode ? 1 : 0) + 1));
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }

                return false;
              }
              case symbo('Number', 'isInteger'): {
                if (args.length === 1 && args[0] && AST.isPrimitive(args[0])) {
                  rule('Calling `isInteger` on a primitive should resolve');
                  example('Number.isInteger("hello")', 'false');
                  before(node, parentNodeOrWhatever);

                  const finalNode = Number.isInteger(AST.getPrimitiveValue(firstArgNode)) ? AST.tru() : AST.fals();
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  return true;
                }
                break;
              }
              case symbo('Number', 'isSafeInteger'): {
                if (args.length === 1 && args[0] && AST.isPrimitive(args[0])) {
                  rule('Calling `isSafeInteger` on a primitive should resolve');
                  example('Number.isSafeInteger("hello")', 'false');
                  before(node, parentNodeOrWhatever);

                  const finalNode = Number.isSafeInteger(AST.getPrimitiveValue(firstArgNode)) ? AST.tru() : AST.fals();
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1,
                    ...args.slice(1).map((enode) => AST.expressionStatement(enode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(finalNode, body.slice(i, args.length));
                  return true;
                }
                break;
              }

              case symbo('Math', 'pow'): {
                if (AST.isPrimitive(args[0]) && AST.isPrimitive(args[1])) {
                  // TODO: there are many combinations of arguments we can "safely" inline here.
                  // For now, I think if the result is a finite number or a non-number then we should be fine to inline
                  const arg1 = AST.getPrimitiveValue(args[0]);
                  const arg2 = AST.getPrimitiveValue(args[1]);
                  const result = Math.pow(arg1, arg2);
                  vlog('Arg1:', [arg1], ', arg2:', [arg2], ', result:', [result]);

                  // Note: `Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2`
                  //       > Number.MAX_SAFE_INTEGER+1
                  //         9007199254740992
                  //       > Number.MAX_SAFE_INTEGER+2
                  //         9007199254740992
                  //       > Number.MAX_SAFE_INTEGER+3
                  //         9007199254740994
                  //       > Math.pow(2,53) < (Math.pow(2,53) - 1)
                  //         false
                  // The relevant edge case here is `Math.pow(2,53)-1`
                  // I'm pretty sure you can't get to 9007199254740993 (not representable) with Math.pow so we should be good
                  // on relying on checking the +1 instead for this particular case...
                  // Ultimately I think source code that contains a number that can be represented in source without
                  // any precision loss (meaning, no 1.2342e10 kind of representation) is equal to the Math.pow() version.
                  // Since we can't do `===` (and not even `Object.is` saves us here) we need to serialize the string and
                  // confirm that the value serializes to digits. No dots or e/E.
                  if (
                    Object.is(NaN, result) ||
                    typeof result !== 'number' ||
                    (Number.isInteger(result) /* && result <= (Number.MAX_SAFE_INTEGER+1)*/ && /^\d+$/.test(String(result)))
                  ) {
                    rule('Inline Math.pow with primitive args');
                    example('Math.pow(2, 4)', '16');
                    before(node, parentNodeOrWhatever);

                    const finalNode = AST.primitive(result);
                    const finalParent = wrapExpressionAs(
                      wrapKind,
                      varInitAssignKind,
                      varInitAssignId,
                      wrapLhs,
                      varOrAssignKind,
                      finalNode,
                    );
                    body.splice(i, 1,
                      // Context might not be used but if it is referenced we keep for tdz reasons.
                      ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                      finalParent,
                    );

                    after(finalNode, finalParent);
                    assertNoDupeNodes(AST.blockStatement(body), 'body');
                    return true;
                  }
                  break;
                }
                break;
              }

              case symbo('Math', 'random'): {
                // We can special case Math.random with args to be excluded as a
                // way for users to control math.randoms that should be left alone.
                if (prngSeed && args.length === 0) {
                  // If in global but not in a loop:
                  if (funcStack.length === 1 && loopStack[loopStack.length-1] === null) {
                    if (!prng) {
                      todo('wanted to call prng() to inline math.random but it wasnt set?');
                    } else {
                      rule('Calling `Math.random` in global space can be replaced with a pseudo rng value');
                      example('Math.random()', '0.12345');
                      before(node, body[i]);

                      const finalParent = wrapExpressionAs(
                        wrapKind,
                        varInitAssignKind,
                        varInitAssignId,
                        wrapLhs,
                        varOrAssignKind,
                        AST.primitive(prng()),
                      );
                      body.splice(
                        i,
                        1,
                        // Do not ignore the args. If there are any, make sure to preserve their side effects. If any.
                        // If it was called with a spread, make sure the spread still happens.
                        ...args.map((anode) => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                        // Context might not be used but if it is referenced we keep for tdz reasons.
                        ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                        finalParent,
                      );

                      after(node, body[i]);
                      assertNoDupeNodes(AST.blockStatement(body), 'body');
                      return true;
                    }
                  }
                }
                break;
              }

              case symbo('Math', 'floor'): {
                if (args.length > 0 && AST.isPrimitive(args[0])) {
                  rule('Calling `Math.floor` with a primitive can be resolved');
                  example('Math.floor(5.3842)', '5');
                  before(node, body[i]);

                  const finalParent = wrapExpressionAs(
                    wrapKind,
                    varInitAssignKind,
                    varInitAssignId,
                    wrapLhs,
                    varOrAssignKind,
                    AST.primitive(Math.floor(AST.getPrimitiveValue(args[0]))),
                  );
                  body.splice(
                    i,
                    1,
                    // Do not ignore the args. If there are any, make sure to preserve their side effects. If any.
                    // If it was called with a spread, make sure the spread still happens.
                    ...args.map((anode) => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(node, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }

              case symbo('Math', 'ceil'): {
                if (args.length > 0 && AST.isPrimitive(args[0])) {
                  rule('Calling `Math.ceil` with a primitive can be resolved');
                  example('Math.ceil(5.3842)', '6');
                  before(node, body[i]);

                  const finalParent = wrapExpressionAs(
                    wrapKind,
                    varInitAssignKind,
                    varInitAssignId,
                    wrapLhs,
                    varOrAssignKind,
                    AST.primitive(Math.ceil(AST.getPrimitiveValue(args[0]))),
                  );
                  body.splice(
                    i,
                    1,
                    // Do not ignore the args. If there are any, make sure to preserve their side effects. If any.
                    // If it was called with a spread, make sure the spread still happens.
                    ...args.map((anode) => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(node, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }

              case symbo('Math', 'round'): {
                if (args.length > 0 && AST.isPrimitive(args[0])) {
                  rule('Calling `Math.round` with a primitive can be resolved');
                  example('Math.round(5.3842)', '5');
                  before(node, body[i]);

                  const finalParent = wrapExpressionAs(
                    wrapKind,
                    varInitAssignKind,
                    varInitAssignId,
                    wrapLhs,
                    varOrAssignKind,
                    AST.primitive(Math.round(AST.getPrimitiveValue(args[0]))),
                  );
                  body.splice(
                    i,
                    1,
                    // Do not ignore the args. If there are any, make sure to preserve their side effects. If any.
                    // If it was called with a spread, make sure the spread still happens.
                    ...args.map((anode) => AST.expressionStatement(anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode)),
                    // Context might not be used but if it is referenced we keep for tdz reasons.
                    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
                    finalParent,
                  );

                  after(node, body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                break;
              }
            }
          }
        }

        if (hasComplexArg) {
          if (fdata.globallyUniqueNamingRegistry.get(funcName)?.isBuiltin) {
            // At least one param node is complex. The callee is a known builtin. Cache the args.
            rule('The arguments of a builtin call must all be simple');
            example('parseInt(f())', 'tmp = f(), parseInt(tmp)');
            before(node, parentNodeOrWhatever);

            const newArgs = [];
            const newNodes = [];
            normalizeCallArgs(args, newArgs, newNodes);
            node.arguments = newArgs;
            body.splice(i, 0,
              ...newNodes,
              // Context might not be used but if it is referenced we keep for tdz reasons.
              ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
            );

            after(newNodes);
            after(node);
            assertNoDupeNodes(AST.blockStatement(body), 'body');

            return true;
          }
          else {
            // At least one param node is complex. Cache them all. And the callee too.
            rule('The arguments of a call must all be simple');
            example('a(f())', 'tmp = a(), tmp2 = f(), tmp(tmp2)');
            before(node, parentNodeOrWhatever);

            const newArgs = [];
            const newNodes = [];
            let tmpName;
            if (funcName === SYMBOL_COERCE) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_COERCE;
            }
            else if (funcName === SYMBOL_FRFR) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_FRFR;
            }
            else if (isDotcall) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_DOTCALL;
            }
            else if (funcName === SYMBOL_FORIN) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_DOTCALL;
            }
            else if (funcName === SYMBOL_FOROF) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_DOTCALL;
            }
            else if (funcName === SYMBOL_COERCE) {
              vlog('Skipping callee for', funcName);
              tmpName = SYMBOL_COERCE;
            }
            else if (BUILTIN_SYMBOLS.has(funcName)) {
              vlog('Skipping callee for builtin', funcName);
              tmpName = funcName;
            }
            else {
              tmpName = createFreshVar('tmpCallCallee', fdata);
              newNodes.push(AST.varStatement('const', tmpName, AST.identifier(funcName)));
            }

            // Note: frfr first call must remain a free func ref, not an alias to one.
            normalizeCallArgs(args, newArgs, newNodes);
            if (funcName === SYMBOL_FRFR) newArgs[0] = AST.cloneSimple(args[0]);
            replaceArgs(newArgs);

            body.splice(i, 0,
              ...newNodes,
              // Context might not be used but if it is referenced we keep for tdz reasons.
              ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
            );

            after(body.slice(i, i + newNodes.length + (contextNode ? 1 : 0) + 1));
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        }

        args.forEach((argNode, n) => {
          if (
            argNode?.type === 'Identifier' &&
            (argNode.name === SYMBOL_MAX_LOOP_UNROLL || argNode.name.startsWith(SYMBOL_LOOP_UNROLL))
          ) {
            todo('when does the loop unroll constant escape?');
            rule('A call arg that is the special infinite loop `true` value can just be `true`');
            example('$($LOOP_DONE_UNROLLING_ALWAYS_TRUE)', '$(true);');
            before(body[i]);

            node.arguments[n] = AST.tru();

            after(body[i]);
            return true;
          }
        });

        // Check if the callee or any arg was just assigned to (`const f = g; f()` -> `const f = g; g()`)
        if (body[i-1]?.type === 'VarStatement' || body[i-1]?.type === 'ExpressionStatement') {
          if (
            body[i-1]?.type === 'VarStatement' &&
            body[i-1].init.type === 'Identifier' &&
            body[i-1].id.name === funcName
          ) {
            rule('Aliasing a variable that gets called immediately can skip that alias');
            example('const x = y; x();', 'x = y; y();');
            before(body[i]);

            replaceCallee(AST.identifier(body[i-1].init.name))

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (
            body[i-1]?.type === 'ExpressionStatement' &&
            body[i-1].expression.type === 'AssignmentExpression' &&
            body[i-1].expression.left.type === 'Identifier' &&
            body[i-1].expression.right.type === 'Identifier' &&
            body[i-1].expression.left.name === funcName
          ) {
            rule('Assigning to a variable that gets called immediately can skip that assignment');
            example('x = y; x();', 'x = y; y();');
            before(body[i]);

            replaceCallee(AST.identifier(body[i-1].expression.right.name));

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (
            body[i-1]?.type === 'ExpressionStatement' &&
            body[i-1].expression.type === 'Identifier' &&
            body[i-1].expression.name === funcName
          ) {
            rule('Ident statement where the ident is used immediately in the as callee on the next statement can drop the ident statement');
            example('x; x();', '; x();');
            before(body[i]);

            // Is it going to lead to problems when changing the previous (already visited, not revisited..) statement?
            body[i-1] = AST.emptyStatement();

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // Use all args; if it's dotcall we want the context ref covered as well. First arg is checked twice but that's ok.
          nodeArgs.forEach((anode, n) => {
            if (anode.type == 'Identifier') {
              if (
                body[i-1]?.type === 'VarStatement' &&
                body[i-1].init.type === 'Identifier' &&
                body[i-1].id.name === anode.name
              ) {
                rule('Aliasing a variable used as arg immediately can skip that alias');
                example('const x = y; x();', 'x = y; y();');
                before(body[i]);

                nodeArgs[n] = AST.identifier(body[i-1].init.name);

                after(body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (
                body[i-1]?.type === 'ExpressionStatement' &&
                body[i-1].expression.type === 'AssignmentExpression' &&
                body[i-1].expression.left.type === 'Identifier' &&
                body[i-1].expression.right.type === 'Identifier' &&
                body[i-1].expression.left.name === anode.name
              ) {
                rule('Assigning to a variable used as arg immediately can skip that assignment');
                example('x = y; x();', 'x = y; y();');
                before(body[i]);

                nodeArgs[n] = AST.identifier(body[i-1].expression.right.name);

                after(body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (
                body[i-1]?.type === 'ExpressionStatement' &&
                body[i-1].expression.type === 'Identifier' &&
                body[i-1].expression.name === anode.name
              ) {
                rule('Ident statement where the ident is used immediately as an arg on the next statement can drop the ident statement');
                example('x; f(x);', '; f(x);');
                before(body[i]);

                // Is it going to lead to problems when changing the previous (already visited, not revisited..) statement?
                body[i-1] = AST.emptyStatement();

                after(body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }
          })
        }

        // Pull and duplicate statement-calls into if/else branches
        if (wrapKind === 'statement' && body[i-1]?.type === 'IfStatement' && !node.arguments.some(anode => AST.isComplexNode(anode))) {
          rule('A call as statement after an` `if` should be pulled into the `if`');
          example('if (x) y; else z; f();', 'if (x) { y; f(); } else { z; f(); }');
          before(body[i-1]);
          before(body[i]);

          body[i-1].consequent.body.push(AST.expressionStatement(node));
          body[i-1].alternate.body.push(AST.expressionStatement(cloneSortOfSimple(node)));
          body.splice(i, 1);

          before(body[i-1]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Assert normalized form
        ASSERT(callee.type === 'Identifier', 'callee is ident, rite?', callee);
        ASSERT(!hasComplexArg, 'all args should be simple nodes');

        return false;
      }

      case 'ChainExpression': {
        // TODO: what if the chain starts with null/undefined?
        // This serves as a fence. If there's an optional member/call then it might be nested in multiple
        // layers of member expressions. A call may have multiple member expressions as callee.
        // The parser will weed out illegal cases.
        // When we see a chain expression node, traverse the chain and put everything leading up to the first
        // conditional under the same `if` condition. Then do the same for the next optional up to the
        // previous. Repeat until the end of the chain (a member expression whose object is not a member).
        // We have to treat this in one go rather than step by step

        rule('ChainExpression must become if-else');
        if (wrapKind === 'statement') {
          example('a()?.b.c()', 'const tmp = a(); if (tmp) tmp.b.c()');
          example('a().b.c?.()', 'const tmp = a().b.c; if (tmp) tmp.c()');
          example(
            'a()?.b.c?.()',
            'const tmp = a(); if (tmp) { const tmp2 = tmp.b; const tmp3 = tmp2.c; if (tmp3) tmp3.call(tmp2, f(), g(), h());',
          );
        } else if (wrapKind === 'var') {
          example('let x = a()?.b.c()', 'let x = undefined; const tmp = a(); if (tmp) x = tmp.b.c();');
          example('let x = a().b.c?.()', 'let x = undefined; const tmp = a().b.c; if (tmp) x = tmp.c();');
          example(
            'let x = a()?.b.c?.()',
            'let x = undefined; const tmp = a(); if (tmp) { const tmp2 = tmp.b; const tmp3 = tmp2.c; if (tmp3) tmp3.call(tmp2, f(), g(), h()); }',
          );
        } else if (wrapKind === 'assign') {
          example('x = a()?.b.c()', 'x = undefined; const tmp = a(); if (tmp) x = tmp.b.c();');
          example('x = a().b.c?.()', 'x = undefined; const tmp = a().b.c; if (tmp) x = tmp.c();');
          example(
            'x = a()?.b.c?.()',
            'x = undefined; const tmp = a(); if (tmp) { const tmp2 = tmp.b; const tmp3 = tmp2.c; if (tmp3) tmp3.call(tmp2, f(), g(), h()); }',
          );
        }

        before(node, parentNodeOrWhatever);

        let lastObj;
        let lastComputed;
        let lastProp;
        let prevObj;
        let prevComputed = false;
        let prevProp;
        let newNodes = [];
        let nodes = newNodes;

        // a?.b -> tmp = a; if (tmp) a.b;
        // a?.b.c -> tmp = a; if (tmp) a.b.c;
        // a?.() -> tmp = a; if (tmp) a();
        // a?.b() -> tmp = a; if (tmp) tmp.b();
        // a?.b?.() -> tmp = a; if (tmp) { tmp2 = tmp.b; if (tmp2) tmp3.call(tmp, ...) }
        // a?.b?.c?.() -> tmp = a; if (tmp) { tmp2 = tmp.b; if (tmp2) { tmp3 = tmp2.c; if (tmp3) tmp3.call(tmp2, ...) }}}
        // a?.b.c.d?.() -> tmp = a; if (tmp) { tmp2 = tmp.b.c; tmp3 = tmp2.d; if (tmp3) tmp3.call(tmp2, ...)
        // a?.b.c.d() -> tmp = a; if (tmp) { tmp.b.c.d() }
        // a.b.c.d() -> tmp = a.b.c; tmp2 = tmp.d; if (tmp2) { tmp2.call(tmp, ...)

        function r(node) {
          vlog('-> r:', node.type, node.property ? node.property.name : node.callee.type);
          if (node.type === 'MemberExpression') {
            if (node.object.type === 'MemberExpression' || node.object.type === 'CallExpression') {
              r(node.object);
            } else {
              const tmpName = createFreshVar('tmpChainRootProp', fdata);
              vlog('  - Left most object will be stored in', tmpName);
              lastObj = prevObj;
              lastComputed = prevComputed;
              lastProp = prevProp;
              prevObj = tmpName;
              prevComputed = node.computed;
              prevProp = node.property;
              nodes.push(AST.varStatement('const', tmpName, node.object));
            }

            if (node.optional) {
              // Add a condition based on what we've collected so far (representing the value of the chain
              // up to the current `?.`). New nodes from the remainder of the chain will be added to the
              // body of this new `if` node.
              let nextLevel = [];
              nodes.push(AST.ifStatement(AST.binaryExpression('!=', prevObj, AST.nul()), AST.blockStatement(nextLevel)));
              nodes = nextLevel;
            }

            if (node.computed) {
              // a?.[b()]?.() -> tmp = a; if (a) { tmp2 = b(); tmp3 = tmp[tmp2]; if (tmp3) tmp3.call(tmp2); }
              const tmpName = createFreshVar('tmpChainRootComputed', fdata);
              nodes.push(AST.varStatement('const', tmpName, node.property));
              node.property = AST.identifier(tmpName);
            }

            const tmpName = createFreshVar('tmpChainElementObject', fdata);
            vlog('Storing next property', node.property.name, 'in', tmpName);
            nodes.push(AST.varStatement('const', tmpName, AST.memberExpression(prevObj, node.property, node.computed)));
            lastObj = prevObj;
            lastComputed = prevComputed;
            lastProp = prevProp;
            prevObj = tmpName;
            prevComputed = node.computed;
            prevProp = node.property;
          } else if (node.type === 'CallExpression') {
            if (node.callee.type === 'MemberExpression' || node.callee.type === 'CallExpression') {
              r(node.callee);
            } else {
              // Like the first node (call `a()`) of `a()?.b()?.c()`
              const tmpName = createFreshVar('tmpChainRootCall', fdata);
              vlog('  - Left most callee will be stored in', tmpName);
              lastObj = prevObj;
              lastComputed = prevComputed;
              lastProp = prevProp;
              prevObj = tmpName;
              prevComputed = false;
              prevProp = 'DO_NOT_USE_ME_IS_OPT_CHAIN_BUG_IF_USED_ANYWAYS';
              nodes.push(AST.varStatement('const', tmpName, node.callee));
            }

            if (node.optional) {
              // Add a condition based on what we've collected so far (representing the value of the chain
              // up to the current `?.`). New nodes from the remainder of the chain will be added to the
              // body of this new `if` node.
              let nextLevel = [];
              nodes.push(AST.ifStatement(AST.binaryExpression('!=', prevObj, AST.nul()), AST.blockStatement(nextLevel)));
              nodes = nextLevel;
            }

            const tmpName = createFreshVar('tmpChainElementCall', fdata);
            vlog('Storing next callee', node.callee.name, 'in', tmpName);
            // We always need to compile to .call because we need to read the member expression before the call, which
            // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
            nodes.push(
              AST.varStatement(
                'const',
                tmpName,
                lastObj
                  ? // a?.b(1, 2, 3)  ->  b.call(a, 1, 2, 3)
                    // Call the special builtin to signify that this call was previously in fact a method call. We need this because
                    // when we find a random `.call()` we can't distinguish the built-in Function#call from a user method named `call`
                  AST.callExpression(SYMBOL_DOTCALL, [
                    AST.identifier(prevObj),
                    AST.identifier(lastObj),
                    prevComputed ? AST.identifier('undefined') : AST.primitive(prevProp.name),
                    ...node.arguments]
                  )
                  : // a(1, 2, 3)  ->  b(1, 2, 3)
                  AST.callExpression(prevObj, node.arguments),
              ),
            );
            lastObj = prevObj;
            lastComputed = prevComputed;
            lastProp = prevProp;
            prevObj = tmpName;
            prevComputed = false;
            prevProp = 'DO_NOT_USE_ME_IS_OPT_CHAIN_BUG2_IF_USED_ANYWAYS';
          } else {
            ASSERT(false, 'eh?');
          }
        }

        vlog('Now processing the chain...');
        r(node.expression);
        if (wrapKind === 'statement') {
          // No further action necessary
        } else if (wrapKind === 'var' || wrapKind === 'assign') {
          let finalParentBefore = wrapExpressionAs(
            wrapKind,
            varInitAssignKind,
            varInitAssignId,
            wrapLhs,
            varOrAssignKind,
            AST.identifier('undefined'),
          );
          if (finalParentBefore.type === 'VarStatement' && finalParentBefore.kind === 'const') {
            // This cannot be a const as we conditionally update it.
            finalParentBefore.kind = 'let';
          }
          newNodes.unshift(finalParentBefore);
          const finalNode = AST.identifier(prevObj);
          let finalParent2 = wrapExpressionAs(
            wrapKind,
            varInitAssignKind,
            varInitAssignId,
            AST.cloneSimple(wrapLhs),
            varOrAssignKind,
            finalNode,
          );
          if (finalParent2.type === 'VarStatement') {
            // This is a hack but if the node is a var decl then change it to an assignment
            // We created the decl and made sure it's the first node, initalized to undefined
            // This circumvents a nested assignment that is the init of a var decl
            finalParent2 = AST.expressionStatement(
              AST.assignmentExpression(finalParent2.id, finalParent2.init),
            );
          }
          nodes.push(finalParent2);
        } else {
          ASSERT(false);
        }

        body.splice(i, 1, ...newNodes);

        vlog('Chain processing done. Result:');
        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'ClassExpression': {
        // Simplify extends and computed keys
        // Other rules tbd, if any

        let changes = false;
        node.body.body.forEach((methodNode) => {
          if (methodNode.computed && AST.isProperIdent(methodNode.key, true)) {
            const str = AST.getStringValue(methodNode.key, true);

            rule('Class computed key that is ident must be ident');
            example('class x = {["x"](){}}', 'class {x(){}}');
            before(node, parentNodeOrWhatever);

            methodNode.computed = false;
            methodNode.key = AST.identifier(str);

            after(node, parentNodeOrWhatever);
            changes = true;
            return;
          }

          if (methodNode.key.type === 'literal' && typeof methodNode.key.value === 'string') {
            rule('Class keys that are strings should be templates internally, even if that is technically invalid');
            example('class x {"a"(){}}', 'class x {`a`(){}}');
            before(node, parentNodeOrWhatever);

            methodNode.key = AST.templateLiteral(methodNode.key);

            after(parentNodeOrWhatever);
            return true;
          }
        });
        if (changes) return true;

        let last = -1;
        node.body.body.forEach((pnode, i) => {
          ASSERT(pnode.type === 'MethodDefinition', 'update me if this gets extended');
          if (pnode.computed && AST.isComplexNode(pnode.key)) {
            last = i;
          }
        });
        if (last >= 0) {
          // We have to outline at least one computed key, so we must also outline the extends
          // since it may be a reference that could be changed by a call in the key. There's a test.
          rule('Class keys must be simple nodes');
          example(
            'class x extends f() { [f()]() {} }',
            'tmp = f(); tmp2 = g(); class x extends tmp { [tmp2]() {} }',
            () => node.superClass,
          );
          example('class x { [g()]() {} }', 'tmp = g(); class x { [tmp]() {} }', () => !node.superClass);
          before(node);

          const newNodes = [];
          if (node.superClass) {
            const tmpNameSuper = createFreshVar('tmpClassSuper', fdata);
            newNodes.push(AST.varStatement('const', tmpNameSuper, node.superClass));
            node.superClass = AST.identifier(tmpNameSuper);
          }
          for (let i = 0; i <= last; ++i) {
            const enode = node.body.body[i];
            if (enode.computed) {
              const tmpNameKey = createFreshVar('tmpClassComputedKey', fdata);
              newNodes.push(AST.varStatement('const', tmpNameKey, enode.key));
              enode.key = AST.identifier(tmpNameKey);
            }
          }
          body.splice(i, 0, ...newNodes);

          after([...newNodes, node]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.superClass && AST.isComplexNode(node.superClass)) {
          // Since the class must be in a basic form at this point, the transforms are fairly care free.
          // Must take care that the extends value can be affected by computed member keys.
          rule('The `extends` of a class must be simple');
          example('class x extends f() {}', 'tmp = f(); class x extends tmp {}');
          before(node);

          const tmpNameSuper = createFreshVar('tmpClassSuper', fdata);
          const newNode = AST.varStatement('const', tmpNameSuper, node.superClass);
          node.superClass = AST.identifier(tmpNameSuper);
          body.splice(i, 0, newNode);

          after(newNode);
          after(node);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        vlog('Processing class body..');
        anyBlock(node.body);

        // After processing, if this is a statement, drop what's left of the class
        if (wrapKind === 'statement') {
          rule('Class expressions that are statements should be outlined and dropped');
          example('(class{});', 'undefined;');
          before(node, parentNodeOrWhatever);

          body[i] = AST.expressionStatement(AST.identifier('undefined'));

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'ConditionalExpression': {
        // `a ? b : c;` -> `if (a) b; else c;`
        // `x = a ? b : c` -> `if (a) x = b; else x = c;`
        // `let x = a ? b : c` -> `let x; if (a) x = b; else x = c;`

        if (wrapKind === 'statement') {
          rule('Conditional expression statement should be if-else');
          example('a() ? b() : c();', 'if (a()) b(); else c();');
          before(node, parentNodeOrWhatever);

          const finalParent = AST.ifStatement(node.test, AST.expressionStatement(node.consequent), AST.expressionStatement(node.alternate));
          body[i] = finalParent;

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (wrapKind === 'var') {
          rule('Conditional expression var init should be if-else');
          example('let x = a() ? b() : c();', 'let x; if (a()) x = b(); else x = c();');
          before(node, parentNodeOrWhatever);

          const newNodes = [
            // No init. Prevent a future where we'd make a distinction betwene no init and init to undefined.
            wrapExpressionAs(
              wrapKind,
              varInitAssignKind,
              varInitAssignId,
              AST.cloneSimple(wrapLhs),
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              null,
            ),
          ];
          const finalParent = AST.ifStatement(
            node.test,
            AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.consequent)),
            AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.alternate)),
          );
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (wrapKind === 'assign') {
          rule('Conditional expression assign should be if-else');
          example('x = a() ? x = b() : x = c();', 'if (a()) x = b(); else x = c();');
          before(node, parentNodeOrWhatever);

          const finalParent = [
            AST.ifStatement(
              node.test,
              AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.consequent)),
              AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.alternate)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        ASSERT(false);
        throw error;
      }

      case 'FunctionExpression': {
        return transformFunctionExpression(wrapKind, node, body, i, parentNodeOrWhatever);
      }

      case 'Identifier': {
        vlog('- name: `' + node.name + '`');

        if (node.name === '$free') {
          ASSERT(parentNodeOrWhatever.type === 'FunctionExpression' && parentNodeOrWhatever.id === node, '$free is only allowed as function ids');
          return;
        }

        ASSERT(
          node.name !== SYMBOL_COERCE ||
          (parentNodeOrWhatever.type === 'CallExpression' &&
            parentNodeOrWhatever.callee === node &&
            parentNodeOrWhatever.arguments.length === 2 &&
            AST.isStringLiteral(parentNodeOrWhatever.arguments[1])),
          'we control $coerce so it should always have a fixed form',
          node.parentNode,
        );

        if (wrapKind === 'statement') {
          // The `arguments` reference is special as it implies func params can not be changed. Something to improve later.
          // Note: the registry does know about builtin globals until phase1 so we pull from the globals Map instead
          const meta = node.name !== 'arguments' && fdata.globallyUniqueNamingRegistry.get(node.name);
          ASSERT(node.name === 'arguments' || meta, 'all names should have a meta now', node.name, node);

          if (node.name === 'arguments' && funcStack.length === 1) {
            // `arguments` in global is an implicit binding that ought to throw (we can't proof it doesn't)
            vlog('Skipping `arguments` in global space');
          }
          else if (globals.has(node.name) || meta.isBuiltin || (useRiskyRules() && !meta.isImplicitGlobal)) {
            // We can't "just" do this safely because implicit globals would throw and this eliminates a runtime exception.
            // Restrictions:
            // - Eliminating local bindings that are closures is unsafe because (worst case) we can't prove TDZ. -> enableRiskyRules()
            // - Eliminating implicit globals is unsafe because we can't proof they won't throw -> enableRiskyRules()
            // Note: it's not risky for built-ins (and we could improve on non-closured bindings)

            riskyRule('A statement can not just be an identifier');
            example('x;', ';');
            before(node, parentNodeOrWhatever);

            body[i] = AST.emptyStatement();

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          else {
            vlog(
              'Expression statement that is only an identifier that is an implicit global. Checking if it happens to be used in the next statement',
            );
            let usedNext = false;
            const next = body[i + 1];
            switch (next?.type) {
              case 'ExpressionStatement': {
                if (next.expression.type === 'Identifier') {
                  usedNext = next.expression.name === node.name;
                  break;
                }
                if (next.expression.type === 'UnaryExpression') {
                  usedNext = next.expression.argument.type === 'Identifier' && next.expression.argument.name === node.name;
                  break;
                }
                if (next.expression.type === 'BinaryExpression') {
                  usedNext = next.expression.left.type === 'Identifier' && next.expression.left.name === node.name;
                  break;
                }
                if (next.expression.type === 'CallExpression' || next.expression.type === 'NewExpression') {
                  usedNext = next.expression.callee.type === 'Identifier' && next.expression.callee.name === node.name;
                  break;
                }
                if (next.expression.type === 'AssignmentExpression') {
                  if (next.expression.right.type === 'Identifier') {
                    usedNext = next.expression.right.name === node.name;
                    break;
                  }
                  if (next.expression.right.type === 'UnaryExpression') {
                    usedNext = next.expression.right.argument.type === 'Identifier' && next.expression.right.argument.name === node.name;
                    break;
                  }
                  if (next.expression.right.type === 'BinaryExpression') {
                    usedNext = next.expression.right.left.type === 'Identifier' && next.expression.right.left.name === node.name;
                    break;
                  }
                  if (next.expression.right.type === 'CallExpression' || next.expression.right.type === 'NewExpression') {
                    usedNext = next.expression.right.callee.type === 'Identifier' && next.expression.right.callee.name === node.name;
                    break;
                  }
                }
                break;
              }
              case 'IfStatement':
              case 'WhileStatement': {
                usedNext = next.test.type === 'Identifier' && next.test.name === node.name;
                break;
              }
              case 'VarStatement': {
                if (next.init.type === 'Identifier') {
                  usedNext = next.init.name === node.name;
                  break;
                }
                if (next.init.type === 'UnaryExpression') {
                  usedNext =
                    next.init.argument.type === 'Identifier' && next.init.argument.name === node.name;
                  break;
                }
                if (next.init.type === 'BinaryExpression') {
                  usedNext = next.init.left.type === 'Identifier' && next.init.left.name === node.name;
                  break;
                }
                if (next.init.type === 'CallExpression' || next.init.type === 'NewExpression') {
                  usedNext = next.init.callee.type === 'Identifier' && next.init.callee.name === node.name;
                  break;
                }
              }
            }

            if (usedNext) {
              rule(
                'A statement that is an ident that is an implicit global can be eliminated if the same ident is evaluated first in the next statement as well',
              );
              example('x; x();', 'x();');
              before(node, parentNodeOrWhatever);

              body[i] = AST.emptyStatement();

              after(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // The idea is that we don't want to eliminate an implicit global that might trigger a runtime exception
            vlog('Not eliminating this identifier statement because it is an implicit global');
          }
        }

        if (node.name === 'arguments' && thisStack.length && !node.$p.isForAlias) {
          // This should be the alias definition. Ignore it.
        }

        if (node.name === 'Infinity') {
          rule('The identifier Infinity should become the preval symbol for it');
          example('Infinity', symbo('Number', 'POSITIVE_INFINITY'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'POSITIVE_INFINITY'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.name === 'NaN') {
          rule('The identifier NaN should become the preval symbol for it');
          example('NaN', symbo('Number', 'NaN'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'NaN'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.name === 'parseInt') {
          rule('The identifier parseInt should become the preval symbol for it');
          example('parseInt', symbo('Number', 'parseInt'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'parseInt'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.name === 'parseFloat') {
          rule('The identifier parseFloat should become the preval symbol for it');
          example('parseFloat', symbo('Number', 'parseFloat'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'parseFloat'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.name === 'isNaN') {
          rule('The identifier isNaN should become the preval symbol for it');
          example('isNaN', symbo('Number', 'isNaN'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'NaNisNaN'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.name === 'isFinite') {
          rule('The identifier isFinite should become the preval symbol for it');
          example('isFinite', symbo('Number', 'isFinite'));
          before(node, parentNodeOrWhatever);

          const newNode = AST.identifier(symbo('Number', 'isFinite'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body.splice(i, 1, finalParent);

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (
          parentNodeOrWhatever.type !== 'WhileStatement' &&
          (node.name === SYMBOL_MAX_LOOP_UNROLL || node.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants that is not the while-test should become `true`');
          example('x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = true');
          before(body[i]);

          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, AST.tru());
          body.splice(i, 1, finalParent);

          after(body[i]);
          return true;
        }

        return false;
      }

      case 'Literal': {
        ASSERT(
          typeof node.value !== 'string',
          'these should be eliminated from most cases in the pre-normalization step and the ones left should be handled explicitly. track down the source of this string and convert it.',
          node,
        );

        if (wrapKind === 'statement') {
          // Even if this scoops up "use strict", it shouldn't matter since we're already in strict mode
          // There is an edge case regarding complex parameters, but that's a parse time error anyways.
          rule('A statement can not just be a literal');
          example('5;', ';');
          before(node, parentNodeOrWhatever);

          body[i] = AST.emptyStatement();

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'LogicalExpression': {
        // This will need some special branching per type of `kind`.
        // By the time this point is reached, the expression should only exist in three forms;
        // - init of a binding: create a `let` with lhs as init and if-else change it to the right
        // - stmt: if-else without assignment
        // - assign: conditionally assign the lhs or rhs
        // There are (currently) three operators: && || ??

        if (node.operator === '??') {
          // `a ?? b` is `if (a === null) b`
          // TODO: do we care about the document.all exception? Make it optional?

          if (wrapKind === 'statement') {
            rule('Nullish coalescing statement should be normalized away');
            example('a() ?? b()', 'if (a() == null) b();');
            before(node, parentNodeOrWhatever);

            const finalParent = AST.ifStatement(
              AST.binaryExpression('==', node.left, AST.nul()),
              AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.right)),
            );
            body[i] = finalParent;

            after(finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (wrapKind === 'var') {
            rule('Nullish coalescing var decl should be normalized away');
            example('let x = a() ?? b()', 'let x = a(); if (a == null) a = b();');
          } else if (wrapKind === 'assign') {
            rule('Nullish coalescing assign should be normalized away');
            example('x = a() ?? b()', 'x = a(); if (a == null) a = b();');
          } else {
            ASSERT(false);
          }
          before(node, parentNodeOrWhatever);

          const finalParent = [
            wrapExpressionAs(
              wrapKind,
              varInitAssignKind,
              varInitAssignId,
              wrapLhs,
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              node.left,
            ),
            AST.ifStatement(
              AST.binaryExpression('==', AST.cloneSimple(wrapLhs), AST.nul()),
              AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.right)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.operator === '||') {
          // `a || b` is `if (!a) b`

          if (wrapKind === 'statement') {
            rule('Logical OR statement must be if-else');
            example('a() || b();', 'if (a()); else b();');
            before(node, parentNodeOrWhatever);

            const finalParent = AST.ifStatement(node.left, AST.emptyStatement(), AST.expressionStatement(node.right));
            body[i] = finalParent;

            after(finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (wrapKind === 'var') {
            rule('Logical OR var init must be if-else');
            example('let x = a() || b();', 'let x = a(); if (x); else b();');
          } else if (wrapKind === 'assign') {
            rule('Logical OR assignmment must be if-else');
            example('x = a() || b();', 'x = a(); if (x); else b();');
          } else {
            ASSERT(false);
          }
          before(node, parentNodeOrWhatever);

          const finalParent = [
            wrapExpressionAs(
              wrapKind,
              varInitAssignKind,
              varInitAssignId,
              AST.cloneSimple(wrapLhs),
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              node.left,
            ),
            AST.ifStatement(
              wrapLhs,
              AST.emptyStatement(),
              AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.right)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.operator === '&&') {
          // `a && b` is `if (a) b`

          if (wrapKind === 'statement') {
            rule('Logical OR statement must be if-else');
            example('a() && b();', 'if (a()) b();');
            before(node, parentNodeOrWhatever);

            const finalParent = AST.ifStatement(node.left, AST.expressionStatement(node.right));
            body[i] = finalParent;

            after(finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (wrapKind === 'var') {
            rule('Logical AND var init must be if-else');
            example('let x = a() && b();', 'let x = a(); if (x) x = b();');
          } else if (wrapKind === 'assign') {
            rule('Logical OR assignmment must be if-else');
            example('x = a() || b();', 'x = a(); if (x) x = b();');
          } else {
            ASSERT(false);
          }

          const finalParent = [
            wrapExpressionAs(
              wrapKind,
              varInitAssignKind,
              varInitAssignId,
              wrapLhs,
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              node.left,
            ),
            AST.ifStatement(
              AST.cloneSimple(wrapLhs),
              AST.expressionStatement(AST.assignmentExpression(AST.cloneSimple(wrapLhs), node.right)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        ASSERT(false, 'should have transformed all logicals away', node);
        throw error;
      }

      case 'MemberExpression': {
        // The object must be simple
        // If computed, the property must be simple. Check this first because in that case, the object must be cached too.

        // (!!) Note: this visitor is not walked for the callee of a method call (!!) It might break.

        if (node.optional) {
          // `x = a?.b` -> `let x = a; if (x != null) x = x.b; else x = undefined;`
          // TODO: if the chain starts with null or undefined, the rest of the chain can be dropped

          rule('Optional member expression should be if-else');
          example('a()?.b', 'tmp = a(), (tmp != null ? tmp.b : undefined)', () => !node.computed);
          example('a()?[b()]', 'tmp = a(), (tmp != null ? tmp[b()] : undefined)', () => node.computed);
          before(node, parentNodeOrWhatever);

          const tmpNameObj = createFreshVar('tmpOptObj', fdata);
          const newNodes = [AST.varStatement('const', tmpNameObj, node.object)];
          const finalNode = AST.conditionalExpression(
            AST.binaryExpression('==', tmpNameObj, AST.nul()),
            'undefined',
            AST.memberExpression(tmpNameObj, node.property, node.computed),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.object.type === 'Identifier' && node.object.name === 'arguments' && !node.object.$p.isForAlias) {
          // This should be the alias
        }

        if (ASSUME_BUILTINS) {
          // "foo".length -> 3
          // "foo"["2"] -> "foo"[2]
          // "foo"[2] -> "o"
          // String.name -> "String"

          if (
            node.object.type === 'Identifier' &&
            BUILTIN_GLOBAL_FUNC_NAMES.has(node.object.name)
          ) {
            if (wrapKind === 'statement') {
              rule('A statement that is a property on a built in constructor should be removed');
              example('Array.from;', ';');
              before(node);

              body[i] = AST.emptyStatement();

              before(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
            if ((parentNodeOrWhatever.type !== 'CallExpression' || parentProp !== 'callee') && !node.computed) {
              switch (node.property.name) {
                case 'name': {
                  riskyRule('The name property on a built-in class resolves to a string with the name of that class');
                  example('String.name', '"String"');
                  before(body[i]);

                  const finalNode = AST.templateLiteral(node.object.name); // "String" etc
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body[i] = finalParent;

                  after(body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
              }
            }
          }

          // Prevent `delete "foo".x` trash causing syntax issues when converted to `delete $String_x`
          if (parentNodeOrWhatever?.type !== 'UnaryExpression' && AST.isStringLiteral(node.object, true)) {
            if (node.computed) {
              // "foo"[0]
              if (AST.isNumberLiteral(node.property)) {
                rule('Array access on string should be the actual character being accessed');
                example('"Hello!"[1]', '"e"');
                before(node, parentNodeOrWhatever);

                const v = AST.getStringValue(node.object, true)[node.property.value]; // OOB yields undefined.
                const finalNode = v === undefined ? AST.identifier('undefined') : AST.templateLiteral(v);
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);

                body.splice(i, 1, finalParent);

                after(finalNode, finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (AST.isPrimitive(node.property)) {
                let v = AST.getPrimitiveValue(node.property);
                ASSERT(typeof v !== 'number');
                if (typeof v !== 'string') v = String(v);
                const n = parseInt(v, 10);
                if (String(n) === v) {
                  rule('Computed index property access on a string should be a number');
                  example('f("hello"["3"]);', 'f("hello"[3]);');
                  before(node, parentNodeOrWhatever);

                  node.property = AST.primitive(n);

                  after(node, parentNodeOrWhatever);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
              }
            } else {
              ASSERT(node.property.type === 'Identifier');
              switch (node.property.name) {
                case 'length': {
                  // "foo".length
                  rule('The `length` property on a string is a static expression');
                  example('"foo".length', '3');
                  before(node, parentNodeOrWhatever);

                  const finalNode = AST.primitive(AST.getStringValue(node.object, true).length);
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(finalNode, finalParent);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                case 'constructor': {
                  // Found this in jsf*ck code... So why not.
                  rule('`str.constructor should resolve to `String`');
                  example('"abc".constructor(500)', 'String(500)');
                  before(node, body[i]);

                  const finalNode = AST.identifier('String');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(body[i]);
                  return true;
                }
                case 'toString': {
                  // Found this in jsf*ck code... So why not.
                  rule('`str.toString should resolve to `String.prototype.toString`');
                  example('f("foo".toString)', `f(${symbo('String', 'prototype')}.toString)`);
                  before(node, body[i]);

                  node.object = AST.identifier(symbo('String', 'prototype'));

                  after(body[i]);
                  return true;
                }
                default: {
                  // Note: this cannot be a callee so the transform should be safe.
                  // Prevent `"abc".x` trash causing syntax issues when converted to `delete $String_x`
                  if (parentNodeOrWhatever?.type !== 'UnaryExpression') {
                    if (BUILTIN_SYMBOLS.has(symbo('string', node.property.name))) {
                      rule('Accessing static builtin properties on a string should access the symbol instead');
                      example('"foo".valueOf', `${symbo('string', 'valueOf')}`);
                      before(node, parentNodeOrWhatever);

                      const finalNode = AST.identifier(symbo('string', node.property.name));
                      const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                      body.splice(i, 1, finalParent);

                      after(finalNode, finalParent);
                      assertNoDupeNodes(AST.blockStatement(body), 'body');
                      return true;
                    } else {
                      rule('Accessing unknown properties on a string should access properties on String.prototype instead');
                      example('"x"..y', `${symbo('String', 'prototype')}.y`);
                      before(node, parentNodeOrWhatever);

                      node.object = AST.identifier(symbo('String', 'prototype'));

                      after(node);
                      assertNoDupeNodes(AST.blockStatement(body), 'body');
                      return true;
                    }
                  }
                }
              }
            }
          }

          // Note: this cannot be a callee so the transform should be safe.
          // Prevent `delete 2..x` trash causing syntax issues when converted to `delete $Number_x`
          if (parentNodeOrWhatever?.type !== 'UnaryExpression' && AST.isNumberLiteral(node.object, true)) {
            // If we can resolve the symbol right now just use that, otherwise replace the string value with the prototype symbol.
            if (!node.computed && BUILTIN_SYMBOLS.has(symbo('number', node.property.name))) {
              rule('Accessing symbol properties on a number should access the symbol directly');
              example('200..valueOf', `${symbo('number', 'valueOf')}.valueOf`);
              before(node, parentNodeOrWhatever);

              const finalNode = AST.identifier(symbo('number', node.property.name));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            } else {
              rule('Accessing unknown properties on a number should access properties on Number.prototype instead');
              example('200..x', `${symbo('Number', 'prototype')}.x`);
              example('200[x]', `${symbo('Number', 'prototype')}[x]`);
              before(node, parentNodeOrWhatever);

              node.object = AST.identifier(symbo('Number', 'prototype'));

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          // Note: this cannot be a callee so the transform should be safe.
          // Prevent `delete true.x` trash causing syntax issues when converted to `delete $Boolean_x`
          if (parentNodeOrWhatever?.type !== 'UnaryExpression' && AST.isBoolean(node.object, true)) {
            // If we can resolve the symbol right now just use that, otherwise replace the string value with the prototype symbol.
            if (!node.computed && BUILTIN_SYMBOLS.has(symbo('boolean', node.property.name))) {
              rule('Accessing symbol properties on a boolean should access the symbol directly');
              example('false..valueOf', `${symbo('boolean', 'valueOf')}.valueOf`);
              before(node, parentNodeOrWhatever);

              const finalNode = AST.identifier(symbo('boolean', node.property.name));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            } else {
              rule('Accessing unknown properties on a boolean should access properties on Boolean.prototype instead');
              example('false..x', `${symbo('Boolean', 'prototype')}.x`);
              example('false[x]', `${symbo('Boolean', 'prototype')}[x]`);
              before(node, parentNodeOrWhatever);

              node.object = AST.identifier(symbo('Boolean', 'prototype'));

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          // Properties on primitives
          if (!node.computed && node.object.type === 'Literal') {
            if (node.object.value instanceof RegExp) {
              if (node.property.name === 'constructor') {
                // Found this in jsf*ck code... So why not.
                rule('`regex.constructor should resolve to `RegExp`');
                example('/foo/.constructor("bar")', 'RegExp("bar")');
                before(node, body[i]);

                const finalNode = AST.identifier('RegExp');
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(body[i]);
                return true;
              }
            }
            else if (typeof node.object.value === 'boolean') {
              if (node.property.name === 'constructor') {
                // Found this in jsf*ck code... So why not.
                rule('`bool.constructor should resolve to `Boolean`');
                example('false.constructor("bar")', 'Boolean("bar")');
                before(node, body[i]);

                const finalNode = AST.identifier('Boolean');
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(body[i]);
                return true;
              }
              else if (node.property.name === 'toString') {
                rule(`\`bool.toString should resolve to \`${symbo('boolean', 'toString')}\``);
                example('true.toString("bar")', `${symbo('boolean', 'toString')}("bar")`);
                before(node, body[i]);

                const finalNode = AST.identifier(symbo('boolean', 'toString'));
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(body[i]);
                return true;
              }
            }
            else if (typeof node.object.value === 'number') {
              if (node.property.name === 'constructor') {
                // Found this in jsf*ck code... So why not.
                rule('`num.constructor` should resolve to `Number`');
                example('500..constructor("bar")', 'Number("bar")');
                before(node, body[i]);

                const finalNode = AST.identifier('Number');
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(body[i]);
                return true;
              }
              if (node.property.name === 'toString') {
                // Found this in jsf*ck code... So why not.
                rule('`num.toString` should resolve to `Number.prototype.toString`');
                example('f(600..toString)', `f(${symbo('Number', 'prototype')}.toString)`);
                before(node, body[i]);

                node.object = AST.identifier(symbo('Number', 'prototype'));

                after(body[i]);
                return true;
              }
            }
            // Should not need to cover `null` here. Should not need to cover string here.
          }

          if (
            node.object.type === 'ArrayExpression' &&
            !node.computed &&
            node.property.type === 'Identifier' &&
            node.property.name === 'length'
          ) {
            // This should not happen frequently :p But after some passes it might. More likely once we do value tracking.
            rule('The `length` directly on an array literal should be replaced with the count of elements in that array');
            example('[10, 20, 30].length', '3');
            before(node, parentNodeOrWhatever);

            const finalNode = AST.literal(node.object.elements.length); // Node: elided elements still count so this is ok
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, finalParent);

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (!node.computed && node.object.type === 'Identifier')
          {

            // Drop statements that are static function calls when we know they are not observable otherwise
            if (wrapKind === 'statement' && BUILTIN_SYMBOLS.has(symbo(node.object.name, node.property.name))) {
              rule('A statement that is a built-in constant value or built-in static call should be eliminated');
              example('Number.NEGATIVE_INFINITY;', 'undefined;');
              before(node, body[i]);

              body[i] = AST.emptyStatement();

              after(body[i]);
              return true;
            }

            // We can replace some of the "new" Number properties. The Math ones are unsafe to inline (precision loss).
            if (node.object.name === 'Number') {
              switch (node.property.name) {
                case 'EPSILON': // We keep this as is
                case 'MAX_VALUE': // We keep this as is
                case 'MIN_VALUE': {
                  // We keep this as is
                  // Keep these values as is because we don't want to introduce any precision loss
                  break;
                }
                case 'NEGATIVE_INFINITY': {
                  rule('`Number.NEGATIVE_INFINITY` is `-Infinity`');
                  example('Number.NEGATIVE_INFINITY', '-Infinity');
                  before(node, body[i]);

                  const finalNode = AST.unaryExpression('-', AST.identifier('Infinity'));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(body[i]);
                  return true;
                }
                case 'POSITIVE_INFINITY': {
                  rule('`Number.POSITIVE_INFINITY` is `Infinity`');
                  example('Number.POSITIVE_INFINITY', 'Infinity');
                  before(node, body[i]);

                  const finalNode = AST.identifier('Infinity');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(body[i]);
                  return true;
                }
                case 'NaN': {
                  rule('`Number.NaN` is `NaN`');
                  example('Number.NaN', 'NaN');
                  before(node, body[i]);

                  const finalNode = AST.identifier('NaN');
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(body[i]);
                  return true;
                }
              }
            }

            if (BUILTIN_SYMBOLS.has(symbo(node.object.name, node.property.name))) {
              rule('A builtin member expression can be replaced by its preval symbol');
              example('Number.NEGATIVE_INFINITY;', `${symbo('Number', 'NEGATIVE_INFINITY')}`);
              before(node, body[i]);

              const finalNode = AST.identifier(symbo(node.object.name, node.property.name));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, finalParent);

              after(body[i]);
              return true;
            }

            // When reading a property from a prototype symbol, change it to the concrete symbol
            if (protoToInstName.has(node.object.name)) {
              const instanceName = protoToInstName.get(node.object.name);
              if (
                BUILTIN_SYMBOLS.has(symbo(instanceName, node.property.name))
              ) {
                rule('A builtin member expression directly on prototype can be replaced by its preval symbol');
                example(`${symbo('Function', 'prototype')}.apply`, `${symbo('function', 'apply')}`);
                before(node, body[i]);

                const finalNode = AST.identifier(symbo(instanceName, node.property.name));
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, finalParent);

                after(body[i]);
                return true;
              }
            }
          }

          if (
            node.object.type === 'Identifier' &&
            !node.computed &&
            BUILTIN_SYMBOLS.has(node.object.name) && // $String_prototype, left by another transform
            BUILTIN_SYMBOLS.has(symbo(node.object.name, node.property.name)) // $String_prototype.toString -> $string_toString
          ) {
            rule('Prototype property read of known builtin can be replaced with our own symbol');
            example(`$(${symbo('String', 'prototype')}.toString)`, `$(${symbo('String', 'toString')})`);
            before(body[i]);

            const prevalSymbol = symbo(node.object.name, node.property.name);
            const finalNode = AST.identifier(prevalSymbol);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, finalParent);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (
            node.object.type === 'Identifier' &&
            !node.computed &&
            BUILTIN_SYMBOLS.has(node.object.name) && // $String_prototype, left by another transform
            node.property.name === 'name' // $String_replace.name -> "replace" (is that super generic? where does it stop)
          ) {
            riskyRule('Prototype property read of known builtin can be replaced with our own symbol');
            example(`$(${symbo('String', 'prototype')}.toString)`, `$(${symbo('String', 'toString')})`);
            before(body[i]);

            const prevalSymbol = BUILTIN_SYMBOLS.get(node.object.name).prop;
            const finalNode = AST.templateLiteral(prevalSymbol);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, finalParent);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (
            node.object.type === 'Identifier' &&
            node.object.name === symbo('Array', 'prototype') &&
            !node.computed &&
            node.property.name === 'length'
          ) {
            // A bit exotic and slightly risky but the builtin Array.prototype is itself also an array
            riskyRule('Array.prototype.length is zero');
            example(`$(Array.prototype.length)`, `$(0)`);
            before(body[i]);

            const finalNode = AST.primitive(0);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, finalParent);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (
            node.object.type === 'Identifier' &&
            !node.computed &&
            GLOBAL_NAMESPACES_FOR_STATIC_METHODS.has(node.object.name) &&
            BUILTIN_SYMBOLS.has(symbo(node.object.name, node.property.name))
          ) {
            // Some special cases like Number.parseInt are handled above
            const symbol = symbo(node.object.name, node.property.name);

            riskyRule('Static method can call symbol directly');
            example(`String.raw(x)`, `${symbo('String', 'raw')}(x)`);
            before(body[i]);

            const finalNode = AST.identifier(symbol);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, finalParent);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        }

        if (AST.isNull(node.object) || AST.isUndefined(node.object)) {
          if (node.computed) {
            rule('Computed property on `null` or `undefined` should be replaced with a regular prop');
            example('null[foo]', 'null.eliminatedComputedProp');
            example('undefined[foo]', 'undefined.eliminatedComputedProp');
            before(node, parentNodeOrWhatever);

            body.splice(i, 0, AST.expressionStatement(node.property));
            node.computed = false;
            node.property = AST.identifier('eliminatedComputedProp'); // This does change the error message slightly...

            after(node, parentNodeOrWhatever);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true; // Very unlikely that we don't also want to do the next one but one step at a time.
          }

          if (body[i + 1]?.type === 'ThrowStatement' && AST.isStringValue(body[i + 1].argument, DCE_ERROR_MSG, true)) {
            vlog('Already has throw following it');
          } else {
            ASSERT(AST.getPrimitiveValue(node.object) == null, 'should have null or undefined left now', node);

            // Any property on this object results in a throw... What do we want to do with that? DCE the rest?
            // We can compile an explicit throw after this line so the DCE check cleans up any remains...
            rule('Property on `null` or `undefined` must lead to an exception');
            example('null.foo;', 'null.foo; throw "must crash";', () => node.object.type !== 'Identifier');
            example('undefined.foo;', 'undefined.foo; throw "must crash";', () => node.object.type === 'Identifier');
            before(node, parentNodeOrWhatever);

            const finalNode = AST.throwStatement(AST.templateLiteral(DCE_ERROR_MSG));
            body.splice(i + 1, 0, finalNode);

            after(finalNode, parentNodeOrWhatever);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        }

        if (node.computed && AST.isComplexNode(node.property)) {
          rule('Computed member expression must have simple property');
          example('a()[b()]', 'tmp = a(), tmp2 = b(), a[b]');
          before(node, parentNodeOrWhatever);

          const tmpNameObj = createFreshVar('tmpCompObj', fdata); // tmpMCO (2)
          const tmpNameProp = createFreshVar('tmpCalleeParam', fdata); // tmpMCP (2)
          const newNodes = [
            AST.varStatement('const', tmpNameObj, node.object),
            AST.varStatement('const', tmpNameProp, node.property),
          ];
          const finalNode = AST.memberExpression(tmpNameObj, tmpNameProp, true);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (AST.isComplexNode(node.object)) {
          rule('Member expression object must be simple');
          example('f().x', 'tmp = f(), tmp.x');
          before(node, parentNodeOrWhatever);

          const tmpNameObj = createFreshVar('tmpCompObj', fdata);
          const newNodes = [AST.varStatement('const', tmpNameObj, node.object)];
          const finalNode = AST.memberExpression(tmpNameObj, node.property, node.computed);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.computed && AST.isProperIdent(node.property, true)) {
          const str = AST.getStringValue(node.property, true);

          rule('Computed property that is valid ident must be member expression; prop');
          example('a["foo"]', 'a.foo');
          before(node, parentNodeOrWhatever);

          vlog('- Name: `' + str + '`');

          node.computed = false;
          node.property = AST.identifier(str, true);
          after(node, parentNodeOrWhatever);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.computed && (
          AST.isTrue(node.property) ||
          AST.isFalse(node.property) ||
          AST.isNull(node.property) ||
          AST.isUndefined(node.property))
        ) {
          const v = AST.getPrimitiveValue(node.property);
          const key = String(v);

          rule('Computed property that true/false/null/undefined should be string key');
          example('a[true]', 'a.true');
          before(node, parentNodeOrWhatever);

          vlog('- key is "', key, '"');

          node.computed = false;
          node.property = AST.identifier(key, true);

          after(node, parentNodeOrWhatever);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (
          node.computed &&
          node.property.type === 'Identifier' &&
          (node.property.name === SYMBOL_MAX_LOOP_UNROLL || node.property.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants that is not a while-test should become `true`');
          example('x = $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = true');
          before(body[i]);

          node.property = AST.tru();

          after(body[i]);
          return true;
        }

        if (
          useRiskyRules() &&
          !node.computed &&
          node.object.type === 'Identifier' &&
          node.object.name === 'console' &&
          ['log', 'warn', 'error', 'dir', 'debug', 'time', 'timeEnd', 'group', 'groupEnd'].includes(node.property.name) &&
          (parentNodeOrWhatever.type !== 'CallExpression' || parentNodeOrWhatever.callee !== node) &&
          parentNodeOrWhatever.type !== 'NewExpression' // umm, I guess.
        ) {
          // Some built-in support for the pseudo standard console stuff
          const meta = fdata.globallyUniqueNamingRegistry.get('console');
          ASSERT(!meta.isImplicitGlobal, 'its a builtin yah?', meta);
          ASSERT(meta.isBuiltin, 'local bindings would be renamed', meta);

          // This transform is still risky because in nodejs the `console` object is shared across modules and is mutable
          // As such, it's not uncommon for these methods to be stubbed out or sunk somewhere else.

          riskyRule('Certain console methods that are not called should get aliased');
          example('const log = console.log; log("foo");', 'const log = $console_log; log("foo");');
          before(body[i]);

          const prop = node.property.name;
          const finalNode = AST.identifier(
            prop === 'log' ? '$console_log' :
              prop === 'warn' ? '$console_warn' :
                prop === 'error' ? '$console_error' :
                  prop === 'dir' ? '$console_dir' :
                    prop === 'debug' ? '$console_debug' :
                      prop === 'time' ? '$console_time' :
                        prop === 'timeEnd' ? '$console_timeEnd' :
                          prop === 'group' ? '$console_group' :
                            prop === 'groupEnd' ? '$console_groupEnd' :
                              TODO,
          );

          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(body[i]);
          return true;
        }

        return false;
      }

      case 'NewExpression': {
        // Note: the new expression is almost the same as call expression except it can't change the context so the callee must be simple

        const callee = node.callee;
        const args = node.arguments;
        const hasComplexArg = args.some((anode) =>
          anode.type === 'SpreadElement' ? AST.isComplexNode(anode.argument) : AST.isComplexNode(anode),
        );

        // First check whether any of the args are complex. In that case we must cache the callee regardless.
        // Otherwise, check if the callee is simple. If not cache just the callee.

        if (hasComplexArg) {
          // At least one param node is complex. Cache them all. And the callee too.

          rule('The arguments of a new must all be simple');
          example('new a(f())', 'tmp = a(), tmp2 = f(), new tmp(tmp2)', () => callee.type === 'Identifier');
          example('new (a())(f())', 'tmp = a(), tmp2 = f(), new tmp(tmp2)', () => callee.type !== 'Identifier');
          before(node, parentNodeOrWhatever);

          const newArgs = [];
          const tmpName = createFreshVar('tmpNewCallee', fdata);
          const newNodes = [AST.varStatement('const', tmpName, callee)];
          normalizeCallArgs(args, newArgs, newNodes);
          const finalNode = AST.newExpression(tmpName, newArgs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (AST.isComplexNode(callee)) {
          // Calling something that is not an identifier (any other simple node would be a runtime error, but ok)

          rule('The callee of a new must all be simple');
          example('new (a())(x, y)', 'tmp = a(), new tmp(x, y)');
          before(node, parentNodeOrWhatever);

          const tmpName = createFreshVar('tmpNewCallee', fdata);
          const newNodes = [AST.varStatement('const', tmpName, callee)];
          const finalNode = AST.newExpression(tmpName, args);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.callee.type === 'Identifier' && ASSUME_BUILTINS) {
          switch (node.callee.name) {
            case 'RegExp': {
              if (node.arguments.length > 0) {
                if (AST.isPrimitive(node.arguments[0]) && (node.arguments.length === 1 || AST.isPrimitive(node.arguments[1]))) {
                  rule('new RegExp with primitives can be changed to a literal');
                  example('new RegExp("foo", "g")', '/foo/g');
                  before(node, parentNodeOrWhatever);

                  const pattern = AST.getPrimitiveValue(node.arguments[0]);
                  vlog('pattern:', pattern);
                  const flags = node.arguments.length > 1 ? AST.getPrimitiveValue(node.arguments[1]) : '';
                  vlog('flags:', flags);
                  const r = new RegExp(pattern, flags);
                  const finalNode = AST.regex(pattern, flags, String(r));
                  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                  body.splice(i, 1, finalParent);

                  after(finalNode, parentNodeOrWhatever);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
              }

              break;
            }
          }
        }

        node.arguments.forEach((argNode, n) => {
          if (
            argNode?.type === 'Identifier' &&
            (argNode.name === SYMBOL_MAX_LOOP_UNROLL || argNode.name.startsWith(SYMBOL_LOOP_UNROLL))
          ) {
            rule('A call arg that is the special infinite loop `true` value can just be `true`');
            example('$($LOOP_DONE_UNROLLING_ALWAYS_TRUE)', '$(true);');
            before(body[i]);

            node.arguments[n] = AST.tru();

            after(body[i]);
            return true;
          }
        });

        // Assert normalized form
        ASSERT(!AST.isComplexNode(callee), 'new callee should be simple node now');
        ASSERT(!hasComplexArg, 'all args should be simple nodes');

        return false;
      }

      case 'ObjectExpression': {
        let changes = false;

        // TODO: edge case; primitive values that are spread can be safely unrolled here

        const known = new Set();
        const toOutline = [];
        let hasSpread = 0;
        let spreadComplex = false;
        let hasNonSpread = false;
        for (let pi = node.properties.length - 1; pi >= 0; --pi) {
          const pnode = node.properties[pi];
          ASSERT(pnode, 'props cannot be elided', pi, node.properties);

          if (pnode.type === 'SpreadElement') {
            if (AST.isPrimitive(pnode.argument)) {
              if (AST.isStringLiteral(pnode.argument)) {
                // This actually adds new properties
                rule('A string primitive that is spread into an object adds each char individually as index props');
                example('({..."foo"});', '({0: "f", 1: "o", 2: "o"});');
                before(node, parentNodeOrWhatever);

                node.properties.splice(
                  pi,
                  1,
                  ...[...AST.getPrimitiveValue(pnode.argument)].map((c, ci) =>
                    AST.property(AST.primitive(String(ci)), AST.primitive(c), false, false, 'init', false),
                  ),
                );

                changes = true;
                after(node, parentNodeOrWhatever);
              } else {
                // This is a noop
                rule('A non-string primitive that is spread into an object can be deleted');
                example('({...10});', '({});');
                before(node, parentNodeOrWhatever);

                node.properties.splice(pi, 1);

                changes = true;
                after(node, parentNodeOrWhatever);
              }
            } else {
              ++hasSpread;
              if (AST.isComplexNode(pnode.argument)) spreadComplex = true;
            }
          }
          else {
            hasNonSpread = true;

            if (pnode.computed && AST.isProperIdent(pnode.key, true)) {
              const str = AST.getStringValue(pnode.key, true);

              rule('Object literal computed key that is ident must be ident');
              example('{["x"]: y}', '{x: y}');
              before(node, parentNodeOrWhatever);

              pnode.computed = false;
              pnode.key = AST.identifier(str);

              after(node, parentNodeOrWhatever);
              changes = true;
            } else if (pnode.key.type === 'literal' && typeof pnode.key.value === 'string') {
              rule('Property keys that are strings should be templates internally, even if that is technically invalid');
              example('x = {"a": foo}', 'x = {`a`: foo}');
              before(node, parentNodeOrWhatever);

              pnode.key = AST.templateLiteral(pnode.key);

              after(parentNodeOrWhatever);
              changes = true;
            }

            // This prop deduping becomes more relevant as the normalization process folds up spreads
            if (pnode.kind === 'init') {
              // Ignore getters/setters/static stuff.
              if (pnode.key.type === 'Identifier') {
                if (known.has(pnode.key.name)) {
                  rule('Object literals with duplicate ident keys should not have those dupes');
                  example('const x = {a: 1, a: 2};', 'const x = {a: 2};');
                  before(parentNodeOrWhatever);

                  node.properties.splice(pi, 1);
                  toOutline.unshift(AST.expressionStatement(pnode.value));

                  after(parentNodeOrWhatever);
                  changes = true;
                } else {
                  known.add(pnode.key.name);
                }
              } else if (AST.isPrimitive(pnode.key)) {
                const pv = AST.getPrimitiveValue(pnode.key);
                if (known.has(pv)) {
                  rule('Object literals with duplicate string or number keys should not have those dupes');
                  example('const x = {"hello world": 1, "hello world": 2};', 'const x = {"hello world": 2};');
                  example('const x = {500: 1, 500: 2};', 'const x = {500: 2};');
                  before(parentNodeOrWhatever);

                  node.properties.splice(pi, 1);
                  toOutline.unshift(AST.expressionStatement(pnode.value));

                  after(parentNodeOrWhatever);
                  changes = true;
                } else {
                  known.add(pv);
                }
              }
            }

            if (
              pnode.computed &&
              pnode.key.type === 'Identifier' &&
              (pnode.key.name === SYMBOL_MAX_LOOP_UNROLL || pnode.key.name.startsWith(SYMBOL_LOOP_UNROLL))
            ) {
              rule('Any usage of the unroll constants as obj literal property value should become `true`');
              example('x = + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = + true');
              before(body[i]);

              pnode.key = AST.tru();
              // shorthand?

              after(body[i]);
              return true;
            }

            if (
              pnode.value.type === 'Identifier' &&
              (pnode.value.name === SYMBOL_MAX_LOOP_UNROLL || pnode.value.name.startsWith(SYMBOL_LOOP_UNROLL))
            ) {
              rule('Any usage of the unroll constants as obj literal property value should become `true`');
              example('x = + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = + true');
              before(body[i]);

              pnode.value = AST.tru();
              // shorthand?

              after(body[i]);
              return true;
            }
          }
        }

        body.splice(i, 0, ...toOutline);

        if (changes) return true;

        if (wrapKind === 'statement') {
          if (hasSpread === 1 && !hasNonSpread && !spreadComplex) {
            // This should be an object literal with only one spread property whose argument is simple.
            // This should be a normalized state so keep it.
            vlog('This object as a statement only has a spread property and it is simple. Keeping it.');
            return;
          }

          rule('Object cannot be a statement unless it only has a spread pattern');
          example('({x: a, [y()]: b(), c, ...d()});', 'a; y(); b(); c; const tmp = d(); ({...tmp});', () => hasSpread);
          example('({x: a, [y()]: b(), c});', 'a; y(); b(); c;', () => !hasSpread);
          example('({...d()});', 'const tmp = d(); ({...tmp});', () => hasSpread && !hasNonSpread);
          before(node, parentNodeOrWhatever);

          const finalParent = [];
          node.properties.forEach((pnode) => {
            // A property can be shorthand, computed, method, getter, setter
            // We can ignore the getter/setter/method props because functions have no observable side effects when being declared

            if (pnode.type === 'SpreadElement') {
              if (AST.isComplexNode(pnode.argument)) {
                const tmpName = createFreshVar('tmpObjSpreadArg', fdata);

                finalParent.push(
                  AST.varStatement('const', tmpName, pnode.argument),
                  AST.expressionStatement(AST.objectExpression([AST.spreadElement(tmpName)])),
                );
              } else {
                // Since the arg is already simple, we shouldn't need to create a temporary variable for it
                finalParent.push(AST.expressionStatement(AST.objectExpression([AST.spreadElement(pnode.argument)])));
              }
            } else if (pnode.kind !== 'init' || pnode.method) {
              // Ignore. Declaring a function has no observable side effects.
            } else if (pnode.shorthand) {
              ASSERT(false, 'this case should be eliminated during prepare phase');
            } else if (pnode.computed) {
              finalParent.push(AST.expressionStatement(pnode.key));
              finalParent.push(AST.expressionStatement(pnode.value));
            } else {
              finalParent.push(AST.expressionStatement(pnode.value));
            }
          });
          body.splice(i, 1, ...finalParent);

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (wrapKind === 'var' || wrapKind === 'assign') {
          let last = -1;
          node.properties.forEach((pnode, i) => {
            // A property can be shorthand, computed, method, getter, setter
            // We can ignore the getter/setter/method props because functions have no observable side effects when being declared
            // TODO: can we safely normalize methods as regular properties? Or are there secret bindings to take into account? Especially wrt `super` bindings.
            ASSERT(!pnode.shorthand, 'this already has to be fixed in the prepare phase');

            if (pnode.type === 'SpreadElement') {
              if (AST.isComplexNode(pnode.argument)) last = i;
            }
            else if (pnode.kind !== 'init' || pnode.method) {
              // Declaring a method-function has no observable side effects. Unless it's a computed key.
              if (pnode.computed && AST.isComplexNode(pnode.key)) {
                last = i;
              }
            }
            else if ((pnode.computed && AST.isComplexNode(pnode.key)) || AST.isComplexNode(pnode.value)) {
              last = i;
            }
            //else if (pnode.computed && AST.isNumberLiteral(pnode.key)) {
            //  // Ignore this. We normalize numbers/strings to computed keys.
            //  // (String literals become idents when they would be valid as such)
            //}
          });

          if (last >= 0) {
            rule('Properties of object literals must be simple');
            example('{x: a, y: b(), z: c}', 'tmp = a, tmp2 = b(), {x: tmp, y: tmp2, z: c}');
            before(node, parentNodeOrWhatever);

            vlog('Walking through', node.properties.length, 'props,', 0, ' to ', last);
            const newNodes = [];
            const newProps = [];
            for (let i = 0; i <= last; ++i) {
              const pnode = node.properties[i];
              if (pnode.type === 'SpreadElement') {
                const tmpName = createFreshVar('tmpObjSpread', fdata);
                newNodes.push(AST.varStatement('const', tmpName, pnode.argument));
                newProps.push(AST.spreadElement(tmpName));
              }
              else if (pnode.kind !== 'init' || pnode.method) {
                if (pnode.computed && AST.isComplexNode(pnode.key)) {
                  // Must cache the property key but not the value because methods have a bit of magic
                  const tmpNameKey = createFreshVar('tmpObjLitPropKey', fdata);
                  newNodes.push(AST.varStatement('const', tmpNameKey, pnode.key));
                  newProps.push(AST.property(tmpNameKey, pnode.value, false, true, pnode.kind, pnode.method));
                } else {
                  // Copy getters/setters and methods as is. There's no alternative for them. Maybe methods.
                  newProps.push(pnode);
                }
              }
              else if (pnode.computed) {
                // Must also cache the computed property keys
                const tmpNameKey = createFreshVar('tmpObjLitPropKey', fdata);
                const tmpNameVal = createFreshVar('tmpObjLitPropVal', fdata);
                newNodes.push(AST.varStatement('const', tmpNameKey, pnode.key));
                newNodes.push(AST.varStatement('const', tmpNameVal, pnode.value));
                newProps.push(AST.property(tmpNameKey, tmpNameVal, false, true));
              }
              else {
                const tmpName = createFreshVar('tmpObjLitVal', fdata);
                newNodes.push(AST.varStatement('const', tmpName, pnode.value));
                newProps.push(AST.property(pnode.key, tmpName, false, false));
              }
            }

            const finalNode = AST.objectExpression(...newProps, ...node.properties.slice(last + 1));
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          vlog('- Processing methods');
          node.properties.forEach((pnode, i) => {
            if (pnode.method || pnode.kind === 'get' || pnode.kind === 'set') {
              vlog(i, 'is a method, getter, or setter');
              // We're going to visit it without wrapping it into a block first. And we're probably going to regret that.
              // But right now I don't see a reason why a function expression would want to mess with the parent :shrug:

              // Let's hope an assert triggers if the transform does ever try to reach for the parent... :/
              transformExpression('donotuseparent', pnode.value, 1, 1, 1);
            }
          });

          return false;
        }

        ASSERT(false);
        throw error;
      }

      case 'Param': {
        vlog('- name: `' + node.name + '`, rest?', node.rest);

        if (wrapKind === 'statement') {
          // Drop it
          rule('A statement can not just be a parameter reference');
          example('function f(a) { a; }', 'function f(a) {;}');
          before(node, parentNodeOrWhatever);

          body[i] = AST.emptyStatement();

          after(body[i]);
          return true;
        }

        return false;
      }

      case 'SequenceExpression': {
        rule('Sequence statements must be series of statements');
        example('(a, b, c);', 'a; b; c;');
        before(node, parentNodeOrWhatever);

        const newNodes = node.expressions.slice(0, -1).map((e, i) => AST.expressionStatement(e));
        const finalNode = node.expressions[node.expressions.length - 1];
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body.splice(i, 1, ...newNodes, finalParent);

        after(newNodes);
        after(finalNode, finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'TemplateLiteral': {
        // Note: templates are "special" insofar that they are eliminate in the pre-normalization phase and
        //       any templates that we find here are introduced in phase2. They represent a string concat
        //       that we know cannot spy (when we know both operands must already be primitives of any kind).
        // Note: while the operands may both be non-strings, the fact that they appear inside a template will
        //       imply that they are presumed to have seen like `'' + a + b`, even when a and b are numbers.
        // The point of templates is to allow multiple spy-free string concats to be a single statement.

        // All strings literals are transformed to templates. The printer takes care of normalizing them
        // for places where templates are absolutely not allowed (import source, computed prop key)

        if (wrapKind === 'statement') {
          // A template must always be side-effect free post pre-normalization. So this should be safe to drop.
          rule('Template literals that are statements should be dropped with their exprs coerced to string');
          example('`foo`;', ';');
          example('`fo${x}o`;', '$coerce(x, "string");');
          before(node, parentNodeOrWhatever);

          body.splice(i, 1, ...node.expressions.map(e => {
            return AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [e, AST.primitive("string")]))
          }));

          after(node.expressions.length ? body.slice(i, node.expressions.length) : AST.emptyStatement(), parentNodeOrWhatever);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        const newNode = AST.normalizeTemplateSimple(node);
        if (node !== newNode) {
          rule('A template with primitive expressions must resolve statically');
          example('`a${1}b`', '`a1b`');

          before(node, body[i]);

          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, newNode);
          body[i] = finalParent;

          after(newNode, body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return;
      }

      case 'ThisExpression': {
        if (wrapKind === 'statement') {
          rule('Eliminate a this statement');
          example('this;', ';');
          before(node, parentNodeOrWhatever);

          body[i] = AST.emptyStatement();

          after(AST.emptyStatement());
          return true;
        }

        // Attempt to detect our own transform and ignore it. It should always be in the form of `const tmpPrevalThisAlias = this`.
        // Any other kind of usage of `this` should be replaced with that alias. This makes future func transforms safe.
        if (
          thisStack.length && // Do not be global, or arrow nested in global.
          !node.$p.isForAlias // Ignore the usage in our own alias decl
        ) {
          // This should be the alias
        }

        return false;
      }

      case 'UnaryExpression': {
        // Certain operators need special more care
        // - typeof, delete, -, +, ~, void, !
        vlog('operator:', node.operator);

        if (node.operator === 'delete') {
          // This one is tricky because the result can not be "just an identifier". Unfortunately, it can be pretty
          // much anything else, including a sequence (`delete (a,b)`). So worst case we can target that.
          // Ultimately I think we should consider if the current target is a member expression. If so we keep that
          // and normalize the object/property when necessary. For anything else, ehh, `delete true.x`?
          // We should make sure runtime errors persist.

          const arg = node.argument;

          // The chain expression can be `delete a?.b()` or `delete a.?()` or `a?.().b` so that's why we must check thoroughly
          if (arg.type === 'ChainExpression' && arg.expression.type === 'MemberExpression' && arg.expression.optional) {
            // The arg is a member expression that ends with optional chaining. We're not very interested in
            // the object part so we can abstract that away and make the rest a little easier to deal with.
            // The gist is `delete a?.b()?.c` becomes `tmp = a?.b()`, if (tmp) delete tmp.c`

            const mem = arg.expression;

            if (wrapKind === 'statement') {
              rule('Arg of delete statement cannot be optional chaining');
              example('delete a?.b;', 'tmp = a; if (a) delete a.b;', () => !mem.computed);
              example('delete a?.[b()];', 'tmp = a; if (a) delete a[b()];', () => mem.computed);
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [AST.varStatement('const', tmpName, mem.object)];
              const finalParent = AST.ifStatement(
                AST.binaryExpression('!=', tmpName, AST.nul()),
                AST.expressionStatement(AST.unaryExpression('delete', AST.memberExpression(tmpName, mem.property, mem.computed))),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (wrapKind === 'var') {
              rule('Arg of var init delete cannot be optional chaining');
              example('let x = delete a?.b;', 'tmp = a; let x = true; if (a) x = delete a.b;', () => !mem.computed);
              example('let x = delete a?.[b()];', 'tmp = a; let x = true; if (a) x = delete a[b()];', () => mem.computed);
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [
                AST.varStatement('const', tmpName, mem.object),
                AST.varStatement(varOrAssignKind === 'const' ? 'let' : varOrAssignKind, wrapLhs, AST.tru()),
              ];
              const finalParent = AST.ifStatement(
                AST.binaryExpression('!=', tmpName, AST.nul()),
                AST.expressionStatement(
                  AST.assignmentExpression(
                    AST.cloneSimple(wrapLhs),
                    AST.unaryExpression('delete', AST.memberExpression(tmpName, mem.property, mem.computed)),
                  ),
                ),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (wrapKind === 'assign') {
              rule('Arg of assign delete cannot be optional chaining');
              example('x = delete a?.b;', 'tmp = a; if (a) x = delete a.b; else x = true;', () => !mem.computed);
              example('x = delete a?.[b()];', 'tmp = a; if (a) x = delete a[b()]; else x = true;', () => mem.computed);
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [AST.varStatement('const', tmpName, mem.object)];
              const finalParent = AST.ifStatement(
                AST.binaryExpression('!=', tmpName, AST.nul()),
                AST.expressionStatement(
                  AST.assignmentExpression(
                    wrapLhs,
                    AST.unaryExpression('delete', AST.memberExpression(tmpName, mem.property, mem.computed)),
                  ),
                ),
                AST.expressionStatement(
                  AST.assignmentExpression(AST.cloneSimple(wrapLhs), AST.tru(), varOrAssignKind === 'const' ? 'let' : varOrAssignKind),
                ),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            ASSERT(false);
          }

          if (arg.type === 'MemberExpression') {
            if (arg.computed) {
              if (AST.isProperIdent(arg.property, true)) {
                const str = AST.getStringValue(arg.property, true);

                rule('Computed property that is valid ident must be member expression; delete');
                example('a["foo"]', 'a.foo');
                before(arg, parentNodeOrWhatever);

                vlog('- Name: `' + str + '`');

                arg.computed = false;
                arg.property = AST.identifier(str);

                after(arg, parentNodeOrWhatever);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (AST.isComplexNode(arg.object) || AST.isComplexNode(arg.property)) {
                rule('Argument of delete must be simple computed member expression with simple property');
                example('delete f()[g()]', 'tmp = f(), tmp2 = g(), delete tmp[tmp2]', () => arg.computed);
                before(node, parentNodeOrWhatever);

                const tmpNameObj = createFreshVar('tmpDeleteCompObj', fdata);
                const tmpNameProp = createFreshVar('tmpDeleteCompProp', fdata);
                const newNodes = [
                  AST.varStatement('const', tmpNameObj, arg.object),
                  AST.varStatement('const', tmpNameProp, arg.property),
                ];
                const finalNode = AST.unaryExpression('delete', AST.memberExpression(tmpNameObj, tmpNameProp, true));
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, ...newNodes, finalParent);

                after(newNodes);
                after(finalNode, finalParent);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              // `delete a[b]` is atomic
              return false;
            }

            if (AST.isComplexNode(arg.object)) {
              rule('Argument of delete must be simple member expression');
              example('delete f().x', 'tmp = f(), delete tmp.x');
              before(node, parentNodeOrWhatever);

              const tmpName = createFreshVar('tmpDeleteObj', fdata);
              const newNodes = [AST.varStatement('const', tmpName, arg.object)];
              const finalNode = AST.unaryExpression('delete', AST.memberExpression(tmpName, arg.property));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // `delete a.b` is atomic
            return false;
          }

          // You cannot delete a plain identifier and there's no point in deleting anything else
          // Replace this expression with a temporary variable and a bogus group.
          // Since `delete` returns whether or not the property exists after the operation, the result must be `true`
          rule('Delete argument must be a member expression');
          example('delete f()', 'f(), true');
          before(node, parentNodeOrWhatever);

          const newNodes = [AST.expressionStatement(node.argument)];
          const finalNode = AST.tru();
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.operator === 'void') {
          if (wrapKind === 'statement') {
            rule('Void as a statement should be the arg');
            example('void x;', 'x;');
            before(node, parentNodeOrWhatever);

            body[i] = AST.expressionStatement(node.argument);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          rule('Void must be replaced by a sequence');
          example('void x', 'x, undefined');
          before(node, parentNodeOrWhatever);

          const finalNode = AST.sequenceExpression(node.argument, AST.identifier('undefined'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalParent);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.operator === '+') {
          if (AST.isPrimitive(node.argument)) {
            const pv = AST.getPrimitiveValue(node.argument);
            const pvn = +pv;

            rule('The `+` operator applied to a primitive should be inlined');
            example('+"15"', '15');
            before(node, body[i]);

            const finalNode = AST.primitive(pvn);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (AST.isPrimitive(node.argument) && wrapKind === 'statement') {
            // regex etc
            rule('Unary negative on a primitive as statement should be dropped');
            example('+10;', ';');
            before(node, parentNodeOrWhatever);

            body[i] = AST.emptyStatement();

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'UnaryExpression') {
            if (['+', '-', '~'].includes(node.argument.operator)) {
              // Note: actual arg value is irrelevant since we know the nested operator will coerce to number first
              rule('Plus operator in front of +-~ operator is a noop');
              example('+-x', '-x', () => node.operator === '-');
              example('+~x', '~x', () => node.operator === '~');
              example('+(+x)', '+x', () => node.operator === '+');
              before(node, parentNodeOrWhatever);

              const finalNode = node.argument;
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === 'typeof') {
              rule('Plus on a typeof result always results in NaN');
              example('f(+typeof x)', 'f(NaN)');
              before(node, body[i]);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.operator === '-') {
          if (AST.isPrimitive(node.argument)) {
            const pv = AST.getPrimitiveValue(node.argument);
            const pvn = -pv;

            // The minus sticks around in the AST for negative numbers and other values so
            // we have to confirm that the arg changed before replacing the whole thing.

            if (!Object.is(-pvn, pv)) {
              rule('The `-` operator applied to a primitive should be inlined unless was already a negative number');
              example('-"15"', '-15');
              before(node, body[i]);

              const finalNode = AST.primitive(pvn);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (AST.isPrimitive(node.argument) && wrapKind === 'statement') {
            // regex etc
            rule('Unary minus number as statement should be dropped');
            example('-10;', ';');
            before(node, parentNodeOrWhatever);

            body[i] = AST.emptyStatement();

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'UnaryExpression') {
            // Note: actual arg value is irrelevant since we know the nested operator will coerce to number first

            if (node.argument.operator === '-') {
              // Can't blindly eliminate because coercion. If this can be eliminated another rule will pick it up.
              rule('Double negative operator is same as single positive operator');
              example('--x', '+x');
              before(node, parentNodeOrWhatever);

              const finalNode = AST.unaryExpression('+', node.argument.argument);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === '+') {
              rule('Negative operator on a positive operator means negative operator');
              example('-+x', '-x');
              before(node, parentNodeOrWhatever);

              const finalNode = AST.unaryExpression('-', node.argument.argument);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === 'typeof') {
              rule('Minus on a typeof result always results in NaN');
              example('f(-typeof x)', 'f(NaN)');
              before(node, body[i]);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.operator === '!') {
          if (wrapKind === 'statement') {
            rule('Unary invert statement should reduce to the arg since the invert cannot be observed');
            example('!10;', '10;');
            before(node, parentNodeOrWhatever);

            body[i] = AST.expressionStatement(node.argument);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (AST.isPrimitive(node.argument)) {
            const pv = AST.getPrimitiveValue(node.argument);
            const pvn = !pv;

            rule('The `!` on a primitive value must be replaced');
            example('!500', 'false');
            before(node, body[i]);

            const finalNode = AST.primitive(pvn);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'Unary') {
            // !typeof x
            if (node.argument.operator === 'typeof') {
              // Probably never hits a real world case but at least there's a test
              rule('Inverting the result of `typeof` always results in false');
              example('!typeof x', 'false');
              before(node, parentNodeOrWhatever);

              const finalNode = AST.fals();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }
          }
        }

        if (node.operator === '~') {
          if (AST.isPrimitive(node.argument)) {
            rule('The `~` operator on a primitive must resolve immediately');
            example('~NaN', '-1');
            before(node, body[i]);

            const pv = AST.getPrimitiveValue(node.argument);
            const pvn = ~pv;

            const finalNode = AST.primitive(pvn);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (wrapKind === 'statement') {
            rule('Unary `~` statement should be replaced by `+`');
            example('+10;', '10;');
            before(node, parentNodeOrWhatever);

            body[i] = AST.expressionStatement(AST.unaryExpression('+', node.argument));

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'Unary') {
            // ~typeof x
            if (node.argument.operator === 'typeof') {
              // Probably never hits a real world case but at least there's a test
              rule('Applying `~` to the result of `typeof` always results in `-1`');
              example('~typeof x', '-1');
              before(node, parentNodeOrWhatever);

              const finalNode = AST.primitive(-1);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }
          }
        }

        if (node.operator === 'typeof') {
          if (wrapKind === 'statement') {
            // Typeof is unique insofar that it never triggers implicit global errors. But it can trigger TDZ errors.
            rule('Unary `typeof` statement should not be observable (but can trigger TDZ)');
            example('typeof x;', 'x;');
            before(node, parentNodeOrWhatever);

            body[i] = AST.expressionStatement(node.argument);

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (AST.isPrimitive(node.argument)) {
            const pv = AST.getPrimitiveValue(node.argument);
            const pvn = typeof pv;

            rule('Typeof on primitives should be inlined');
            example('typeof 5', '"number"');
            before(node);

            const finalNode = AST.templateLiteral(pvn);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'Literal' && node.argument.value instanceof RegExp) {
            rule('Typeof regex is the string object');
            example('typeof /foo/', '"object"');
            before(node);

            const finalNode = AST.templateLiteral('object');
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'Identifier' && globals.has(node.argument.name)) {
            rule('Typeof of a builtin global can be statically resolved');
            example('typeof setTimeout', '"function";');
            before(node, parentNodeOrWhatever);

            const v = globals.get(node.argument.name);
            const finalNode = AST.templateLiteral(typeof v === 'string' ? v : v.mustBeType);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (node.argument.type === 'UnaryExpression') {
            // Most unaries return a fixed type so we could fold these safely
            // Unfortunately this won't happen so much in the wild :p But if it does!
            // Note that we need preserve the argument as its own statement in most cases
            // For example, observe: `~{valueOf(){console.log('test')}}` for most operators.

            if ('+-~'.includes(node.argument.operator)) {
              // I mean, this'll probably never happen :)
              rule('Typeof unary +-~ always returns a number');
              example('typeof -x', '-x, "number"', () => node.argument.operator === '-');
              example('typeof +x', '+x, "number"', () => node.argument.operator === '+');
              example('typeof ~x', '~x, "number"', () => node.argument.operator === '~');
              before(node, parentNodeOrWhatever);

              // Preserve the arg in case it has a side effect. Other rules may eliminate it anyways.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.templateLiteral('number');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === 'typeof') {
              // I mean, this'll never happen :)
              rule('Typeof typeof always returns a string');
              example('typeof typeof x', 'typeof x, "string"');
              before(node, parentNodeOrWhatever);

              // Must preserve the argument since the argument might have an effect.
              // We're not going to hash out the details here since `typeof x` is fine even if `x` doesn't actually exist while
              // something like `typeof x.y()` is an observable side effect. So just keep the arg as is and let other rules fix it.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.templateLiteral('string');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === 'delete' || node.argument.operator === '!') {
              // I mean, this'll never happen :)
              rule('Typeof delete or ! always returns a boolean');
              example('typeof !x()', '!x(), "boolean"', () => node.argument.operator === '!');
              example('typeof delete x().y', 'delete x().y, "boolean"', () => node.argument.operator === 'delete');
              before(node, parentNodeOrWhatever);

              // Must preserve the argument since it (obviously) has an effect. The result is just always a bool.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.templateLiteral('boolean');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.operator === 'void') {
              // I mean, this'll never happen :)
              rule('Typeof void always returns a undefined');
              example('typeof void x()', 'x(), "undefined"');
              before(node, parentNodeOrWhatever);

              // Must preserve the argument since it (obviously) has an effect. The result is just always a bool.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.templateLiteral('undefined');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.argument.type === 'SequenceExpression') {
          rule('Unary argument cannot be sequence');
          example('!(a, b)', 'a, !b');
          example('-(1 + 2, 3 + 4)', '(1 + 2, -(3 + 4))');
          before(node, parentNodeOrWhatever);

          const exprs = node.argument.expressions;
          const newNodes = [...exprs.slice(0, -1).map((e) => AST.expressionStatement(e))];
          const finalNode = AST.unaryExpression(node.operator, exprs[exprs.length - 1]);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (AST.isComplexNode(node.argument)) {
          rule('Unary argument cannot be complex');
          example('!f()', 'tmp = f(), !tmp');
          before(node, parentNodeOrWhatever);

          const tmpName = createFreshVar('tmpUnaryArg', fdata);
          const newNodes = [AST.varStatement('const', tmpName, node.argument)];
          const finalNode = AST.unaryExpression(node.operator, tmpName);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (thisStack.length && node.argument.type === 'Identifier' && node.argument.name === 'arguments') {
          // Not sure if this is possible since we alias it aggressively before this phase...
          rule('Unary argument value of `arguments` should be aliased'); // And is a little silly.
          example('!arguments', '!tmpPrevalArgumentsAliasA');
          before(node);

          node.argument = AST.identifier(thisStack[thisStack.length - 1].$p.argsAnyAlias);

          after(node);
          return true;
        }

        if (
          node.argument.type === 'Identifier' &&
          (node.argument.name === SYMBOL_MAX_LOOP_UNROLL || node.argument.name.startsWith(SYMBOL_LOOP_UNROLL))
        ) {
          rule('Any usage of the unroll constants as arg of a unary expression should become `true`');
          example('x = + $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'x = + true');
          before(body[i]);

          node.argument = AST.tru();

          after(body[i]);
          return true;
        }

        if (
          node.argument.type === 'Identifier' &&
          BUILTIN_GLOBAL_FUNC_NAMES.has(node.argument.name) &&
          ['~', '-', '+', '!', 'typeof'].includes(node.operator)
        ) {
          if (node.operator === '!') {
            rule('Builtin functions with ! unary op are converted to true');
            example('!String', '!true');
            before(body[i]);

            node.argument = AST.tru();

            after(body[i]);
            return true;
          }
          else if (node.operator === 'typeof') {
            rule('Builtin functions with typeof unary op are converted to "function"');
            example('~String', '-1');
            before(body[i]);

            node.argument = AST.primitive('function');

            after(body[i]);
            return true;
          }
          else {
            rule('Builtin functions with numeric unary ops are converted to NaN');
            example('~String', '-1');
            before(body[i]);

            node.argument = AST.nan();

            after(body[i]);
            return true;
          }
        }

        // Probably too late to enforce this unary rule now. Stuff depends on wanting to inline Infinity/NaN
        //if (node.operator === '-' && AST.isNumber(node.argument)) {
        //  // Ok, ignore this for negative number literals (but not NaN/Infinity)
        //} else if (!['VarStatement', 'ExpressionStatement', 'AssignmentExpression'].includes(parentNode.type)) {
        //  vlog('Because parent is', parentNode.type);
        //
        //  rule('A unary expression must be a statement, assignment, or var decl unless it is an actual negative number');
        //  example('return -foo;', 'const tmp = -foo; return tmp;');
        //  before(body[i]);
        //
        //  // Force this to be a statement, assignment, or var decl
        //  const tmpName = createFreshVar('tmpUnaryArg', fdata);
        //
        //  const finalNode = AST.identifier(tmpName);
        //  const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        //  body[i] = finalParent;
        //  body.splice(i, 0, AST.varStatement('const', tmpName, node));
        //
        //  after(body[i]);
        //  after(body[i+1]);
        //  return true;
        //}

        return false;
      }

      case 'UpdateExpression': {
        const arg = node.argument;

        ASSERT(arg.type === 'Identifier' || arg.type === 'MemberExpression', 'only two things you can update and its not patterns');
        ASSERT(
          arg.type === 'Identifier' ? !AST.isComplexNode(arg) : true,
          'update expressions are only valid to idents and props; idents are never complex',
        );
        ASSERT(arg.type !== 'MemberExpression' || !arg.optional, 'optional chaining can not be args to update expressions');


        // The update expression will always first coerce the arg to a number, then increment that number, then
        // either return the old or the new number depending on pre or postfix, but always the coerced value.

        // For member: We need to cache member expression objects and, if computed, the computed key value as well.

        if (arg.type === 'Identifier') {
          if (node.prefix) {
            // Note: if the arg ends up being a mustBe number then it should fold right back up
            rule('Prefix ident update expression must be compound assignment that returns after-value');
            example('++a', 'tmp = $coerce(a, "number"), a = tmp + 1, a', () => node.operator === '++');
            example('--a', 'tmp = $coerce(a, "number"), a = tmp - 1, a', () => node.operator === '--');
            before(node, parentNodeOrWhatever);

            const tmpName = createFreshVar('tmpPostUpdArgIdent', fdata);
            const newNodes = [
              AST.varStatement('const', tmpName, AST.callExpression(SYMBOL_COERCE, [AST.identifier(arg.name), AST.primitive('number')])),
              AST.expressionStatement(
                AST.assignmentExpression(arg.name, AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpName, AST.one())),
              ),
            ];
            const finalNode = AST.identifier(arg.name);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          } else {
            // Note: if the arg ends up being a mustBe number then it should fold right back up
            rule('Postfix ident update expression must be compound assignment that returns before-value');
            example('a++', 'tmp = $coerce(a, "number"), a = tmp + 1, tmp', () => node.operator === '++');
            example('a--', 'tmp = $coerce(a, "number"), a = tmp - 1, tmp', () => node.operator === '--');
            before(node, parentNodeOrWhatever);

            const tmpName = createFreshVar('tmpPostUpdArgIdent', fdata);
            const newNodes = [
              AST.varStatement('const', tmpName, AST.callExpression(SYMBOL_COERCE, [AST.identifier(arg.name), AST.primitive('number')])),
              AST.expressionStatement(
                AST.assignmentExpression(arg.name, AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpName, AST.one())),
              ),
            ];
            const finalNode = AST.identifier(tmpName);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        } else if (arg.type === 'MemberExpression') {
          // We must tear down the member expression first. Cache the object and, if computed, the key.
          // Then read the value and coerce it to a number. Then increase the number and store it back.
          // Finally, return the coerced number either before or after increment, depending on node.prefix
          if (arg.computed) {
            rule('Prefix update expression to member expression must be compound assignment');
            example('++f()[g()]', 'const obj = f(); const prop = g(); const tmp = $coerce(obj[prop], "number"); const tmp2 = tmp + 1; obj[prop] = tmp2; tmp2; ', () => node.operator === '++');
            example('--f()[g()]', 'const obj = f(); const prop = g(); const tmp = $coerce(obj[prop], "number"); const tmp2 = tmp - 1; obj[prop] = tmp2; tmp2; ', () => node.operator === '--');
            before(node, parentNodeOrWhatever);

            const tmpObjName = createFreshVar('tmpUpdObj', fdata);
            const tmpPropName = createFreshVar('tmpUpdProp', fdata);
            const tmpPropVal = createFreshVar('tmpUpdVal', fdata);
            const tmpNumName = createFreshVar('tmpUpdNum', fdata);
            const tmpIncName = createFreshVar('tmpUpdInc', fdata);

            const newNodes = [
              AST.varStatement('const', tmpObjName, arg.object),
              AST.varStatement('const', tmpPropName, arg.property),
              AST.varStatement('const', tmpPropVal, AST.memberExpression(tmpObjName, tmpPropName, true)),
              AST.varStatement('const', tmpNumName, AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpPropVal), AST.primitive("number")])),
              AST.varStatement('const', tmpIncName, AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNumName, AST.one())),
              AST.expressionStatement(AST.assignmentExpression(AST.memberExpression(tmpObjName, tmpPropName, true), tmpIncName))
            ];
            const finalNode = node.prefix ? AST.identifier(tmpIncName) : AST.identifier(tmpNumName);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalParent);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          } else {
            rule('Prefix update expression to member expression must be compound assignment');
            example('++f().g', 'const obj = f(); const tmp = $coerce(obj.g, "number"); const tmp2 = tmp + 1; obj.g = tmp2; tmp2; ', () => node.operator === '++');
            example('--f().g', 'const obj = f(); const tmp = $coerce(obj.g, "number"); const tmp2 = tmp - 1; obj.g = tmp2; tmp2; ', () => node.operator === '--');
            before(node, parentNodeOrWhatever);

            const tmpObjName = createFreshVar('tmpUpdObj', fdata);
            const tmpPropVal = createFreshVar('tmpUpdProp', fdata);
            const tmpNumName = createFreshVar('tmpUpdNum', fdata);
            const tmpIncName = createFreshVar('tmpUpdInc', fdata);

            const newNodes = [
              AST.varStatement('const', tmpObjName, arg.object),
              AST.varStatement('const', tmpPropVal, AST.memberExpression(tmpObjName, AST.identifier(arg.property.name))),
              AST.varStatement('const', tmpNumName, AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpPropVal), AST.primitive("number")])),
              AST.varStatement('const', tmpIncName, AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNumName, AST.one())),
              AST.expressionStatement(AST.assignmentExpression(AST.memberExpression(tmpObjName, AST.identifier(arg.property.name)), tmpIncName))
            ];
            const finalNode = node.prefix ? AST.identifier(tmpIncName) : AST.identifier(tmpNumName);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalParent);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        } else {
          // I guess something like "foo"++ could be legal but it would crash. For any such value.
          todo(`what else can be the arg of a unary without crashing? ${arg.type}`);
        }
        return;
      }

      case 'Directive':
      case 'MetaProperty':
      case 'MethodDefinition':
      case 'Property':
      case 'RestElement':
      case 'SpreadElement':
      case 'Super':
      case 'YieldExpression': {
        log(RED + 'Missed expr:', node.type, RESET);
        return false;
      }

      // Eliminated nodes (for assertions)
      case 'TaggedTemplateExpression':
      case 'TemplateElement':
      case 'ArrayPattern':
      case 'AssignmentPattern':
      case 'ObjectPattern':
        ASSERT(false, 'ought to be eliminated before being visited');
        throw error;
    }

    // TODO: probably want to assert false here. It means there was an expression that was not normalized.
    log(RED + 'Missed expr:', node.type, RESET);
    addme;
    return false;
  }

  function transformFunctionExpression(wrapKind, node, body, i, parentNode) {
    // Note: if this transform wants to mutate the parent body then the object handler method should be revisited
    const wasGlobal = inGlobal;
    inGlobal = false;
    loopStack.push(null); // Mark function boundary
    const r = _transformFunctionExpression(wrapKind, node, body, i, parentNode);
    loopStack.pop();
    inGlobal = wasGlobal;
    return r;
  }

  function _transformFunctionExpression(wrapKind, node, body, i, parentNode) {
    // Note: if this transform wants to mutate the parent body then the object handler method should be revisited

    // If this is a statement then drop the whole thing without processing it
    if (wrapKind === 'statement') {
      rule('Function expressions that are statements should be dropped');
      example('(function(){});', 'undefined;');
      before(node, parentNode);

      body[i] = AST.expressionStatement(AST.identifier('undefined'));

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    funcStack.push(node);
    thisStack.push(node);
    ifelseStack.push(node);
    anyBlock(node.body, node);
    ifelseStack.pop();
    thisStack.pop();
    funcStack.pop();

    return postBodyFunctionTransform(node, body, i, parentNode);
  }

  function postBodyFunctionTransform(node, body, i, parentBlock) {
    // Node can be: FunctionExpression, MethoDefinition

    if (!node.body.body.length) {
      rule('Even empty functions must explicitly return undefined');
      example('function f(){}', 'function f(){ return undefined; }');
      before(node);

      node.body.body.push(AST.returnStatement('undefined'));

      after(node);
      return true;
    }

    // Note: technically break should be eliminated. But I think (currently?) they may still linger around.
    // the problem right now is that the DCE is leaving a tail const which is breaking the new normalize return rule

    const last = node.body.body[node.body.body.length - 1];
    if (last.type === 'IfStatement') {
      let changed = false;

      function returnBranch(node) {
        // Confirm that both branches return explicitly and make them if either doesn't
        // If either ends with another `if`, apply the logic to that node instead. For each branch though.
        ASSERT(node.type === 'IfStatement');

        const lastIf = node.consequent.body[node.consequent.body.length - 1];
        if (lastIf?.type === 'IfStatement') {
          returnBranch(lastIf);
        } else if (!['ReturnStatement', 'ThrowStatement', 'BreakStatement'].includes(lastIf?.type)) {
          rule('The `if` branch of the last `if`-statement of a function must return explicitly');
          example('function f(){ if (x) a(); }', 'function f(){ if (x) { a(); return undefined; } }');
          before(node, node);

          node.consequent.body.push(AST.returnStatement('undefined'));

          after(node, node);
          changed = true;
        }

        const lastElse = node.alternate.body[node.alternate.body.length - 1];
        if (lastElse?.type === 'IfStatement') {
          returnBranch(lastElse);
        } else if (!['ReturnStatement', 'ThrowStatement', 'BreakStatement'].includes(lastElse?.type)) {
          rule('The `else` branch of the last `if`-statement of a function must return explicitly');
          example('function f(){ if (x) return 1; else a(); }', 'function f(){ if (x) return 1; else { a(); return undefined; } }');
          before(node, node);

          node.alternate.body.push(AST.returnStatement('undefined'));

          after(node, node);
          changed = true;
        }

        if (changed) {
          return true;
        }
      }

      returnBranch(last);

      if (changed) {
        return true;
      }
    } else if (!['ReturnStatement', 'ThrowStatement'].includes(last.type)) {
      rule('All functions must explicitly return, even if returns undefined');
      example('function f(){ g(); }', 'function f(){ g(); return undefined; }');
      before(node);

      node.body.body.push(AST.returnStatement('undefined'));

      after(node);
      assertNoDupeNodes(node.body, 'body');
      return true;
    }

    return false;
  }

  function transformIfStatement(node, body, i, parentBlock) {
    if (!node.alternate) {
      rule('The else branch must exist');
      example('if (x) y();', 'if (x) y(); else {}');
      before(node);

      node.alternate = AST.blockStatement();

      after(node);
      return true;
    }

    if (node.test.type === 'UnaryExpression') {
      if (node.test.operator === '!') {
        // It's kind of redundant since there are plenty of cases where we'll need to deal with
        // the test in an abstracted form (like `if (!a && !b)` or smth). So maybe I'll drop this one later.
        rule('The test of an if cannot be invert');
        example('if (!x) y; else z;', 'if (x) z; else y;');
        before(node);

        node.test = node.test.argument;
        const tmp = node.consequent;
        node.consequent = node.alternate;
        node.alternate = tmp;

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (node.test.operator === '+' || node.test.operator === '-') {
        if (AST.isStringValue(node.test.argument, '""', true)) {
          // Doesn't matter whether it's +' or -' here. This is false now.
          rule('A +/- if test of the empty string is always false'); // Well, +0/-0 to be precise
          example('if (-"") f();', 'if (false) f();');
          before(node);

          node.test = AST.fals();

          after(node);
          return true;
        }

        if (node.test.argument.type === 'Literal') {
          if (node.test.argument.value === 0 || node.test.argument.raw === 'null') {
            // Doesn't matter whether it's +0 or -0 here. This is false now.
            rule('A +/- if test of zero or null is always false');
            example('if (-0) f();', 'if (false) f();', () => node.test.argument.value === 0);
            example('if (-null) f();', 'if (false) f();', () => node.test.argument.value !== 0);
            before(node);

            node.test = AST.fals();

            after(node);
            return true;
          }

          if (typeof node.test.argument.value === 'number') {
            rule('An if test that is a non-zero +/- number is always true');
            example('if (-1) f();', 'if (true) f();');
            before(node);

            node.test = AST.tru();

            after(node);
            return true;
          }
        }

        if (node.test.argument.type === 'Identifier') {
          const name = node.test.argument.name;
          if (['undefined', 'NaN'].includes(name)) {
            // Doesn't matter whether it's +0 or -0 here. This is false now.
            rule('The if test that is +/- undefined or NaN is always false');
            example('if (-undefined) f();', 'if (false) f();', () => name === 'undefined');
            example('if (-NaN) f();', 'if (false) f();', () => name !== 'undefined');
            before(node);

            node.test = AST.fals();
          }
          else if (['Infinity'].includes(name)) {
            rule('The if test that is +/- Infinity is always true');
            example('if (-Infinity) f();', 'if (true) f();');
            before(node);

            node.test = AST.tru();

            after(node);
            return true;
          }
        }
      }
    }

    if (
      node.test.type === 'Identifier' &&
      (node.test.name === SYMBOL_MAX_LOOP_UNROLL || node.test.name.startsWith(SYMBOL_LOOP_UNROLL))
    ) {
      rule('The if test that is the special infinite loop `true` value can just be `true`');
      example('if ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) f();', 'if (true) f();');
      before(node);

      node.test = AST.tru();

      after(node);
      return true;
    }

    if (node.consequent.type !== 'BlockStatement') {
      rule('If sub-statement must be block');
      example('if (x) y', 'if (x) { y }');
      before(node);

      node.consequent = AST.blockStatement(node.consequent);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.alternate.type !== 'BlockStatement') {
      rule('Else sub-statement must be block');
      example('if (x) {} else y;', 'if (x) {} else { y; }');
      before(node);

      node.alternate = AST.blockStatement(node.alternate);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (AST.isComplexNode(node.test)) {
      rule('If test must be simple node');
      example('if (f());', 'const tmp = f(); if (tmp);');
      before(node);

      const tmpName = createFreshVar('tmpIfTest', fdata);
      const newNode = AST.varStatement('const', tmpName, node.test);
      body.splice(i, 0, newNode);
      node.test = AST.identifier(tmpName);

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    ASSERT(node.consequent.type === 'BlockStatement');
    ifelseStack.push(node);
    transformBlock(node.consequent, undefined, -1, node, false);
    ifelseStack.pop();

    ifelseStack.push(node);
    transformBlock(node.alternate, undefined, -1, node, false);
    ifelseStack.pop();

    // Check nested ifs
    // TODO: this should not just check the first one but skip any statements that don't have observable side effects before the nested if/else
    if (node.consequent.body[0]?.type === 'IfStatement') {
      const inner = node.consequent.body[0];
      if (node.test.type === 'Identifier' && inner.test.type === 'Identifier' && node.test.name === inner.test.name) {
        rule('Nested `if` tests for same ident can be collapsed; consequent');
        example('if (x) { if (x) { f(); } }', 'if (x) { f(); }');
        before(node);

        // We "collapse" the inner `if` by injecting all its consequent statements into the parent `if` and dropping
        // the alternate branch altogether. After all, we know it can never be visited.
        node.consequent.body.splice(0, 1, ...inner.consequent.body);

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    } else if (node.alternate.body[0]?.type === 'IfStatement') {
      const inner = node.alternate.body[0];
      if (node.test.type === 'Identifier' && inner.test.type === 'Identifier' && node.test.name === inner.test.name) {
        rule('Nested `if` tests for same ident can be collapsed; alternate');
        example('if (x) { } else { if (x) { f(); } else { g(); } }', 'if (x) { } else { g(); }');
        before(node);

        // We "collapse" the inner `if` by injecting all its consequent statements into the parent `if` and dropping
        // the alternate branch altogether. After all, we know it can never be visited.
        node.alternate.body.splice(0, 1, ...inner.alternate.body);

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    if (node.consequent.body.length === 0 && node.alternate.body.length === 0) {
      rule('If-else without else and empty if-block should be just the test expression');
      example('if (f()) {}', 'f();');
      before(node);

      const finalNode = node.test;
      const finalParent = AST.expressionStatement(finalNode);
      body[i] = finalParent;

      after(finalParent);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      (node.test.type === 'Literal' && (node.test.value === 0 || node.test.value === false || node.test.raw === 'null')) ||
      AST.isStringValue(node.test, '', true)
    ) {
      rule('Eliminate if-else with falsy test literal');
      example('if (0) f(); else g();', 'g();');
      before(node);

      const finalParent = node.alternate;
      body[i] = finalParent;

      after(finalParent);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.test.type === 'Literal' || AST.isStringLiteral(node.test, true)) {
      // Note: only for templates without expression since we can't (usually) predict the template value that have expressions
      rule('Eliminate if-else with truthy test literal');
      example('if (100) f(); else g();', 'g();');
      before(node);

      const finalParent = node.consequent;
      body[i] = finalParent;

      after(finalParent);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.test.type === 'Identifier') {
      if (['undefined', 'NaN'].includes(node.test.name)) {
        rule('Eliminate if-else with falsy identifier');
        example('if (false) f(); else g();', 'g();');
        before(node);

        const finalParent = node.alternate;
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (['Infinity'].includes(node.test.name)) {
        rule('Eliminate if-else with truthy identifier');
        example('if (Infinity) f(); else g();', 'f();');
        before(node);

        const finalParent = node.consequent;
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    if (
      ['ThisExpression', 'FunctionExpression', 'ClassExpression' /*'ArrayExpression', 'ObjectExpression', 'NewExpression'*/].includes(
        node.test.type,
      )
    ) {
      // Silly conditions. Real world code is unlikely to ever trigger this.
      // Note: Needs special support for observable side effects. Probably not worth coding out here.
      rule('Replace truthy if test identifier with `true`');
      example('if (class{}) f();', 'if (true) f();');
      before(node);

      node.test = AST.tru();

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      node.consequent.body.length === 1 &&
      node.consequent.body[0].type === 'ReturnStatement' &&
      node.alternate.body.length === 1 &&
      node.alternate.body[0].type === 'ReturnStatement'
    ) {
      const ifBodyLast = node.consequent.body[0].argument;
      const elseBodyLast = node.alternate.body[0].argument;

      if (ifBodyLast.type === 'Identifier' && elseBodyLast.type === 'Identifier' && ifBodyLast.name === elseBodyLast.name) {
        vlog('The body of both branches have one element and it is a return statement that returns the same identifier');
        rule('When both branches of an `if` return the same ident, the if is redundant');
        example('if (x) { return undefined; } else { return undefined; }', 'x; return undefined;');
        before(node, parentBlock);

        // Note: keep the test condition around because it may trigger TDZ or unknown global errors

        body.splice(i, 1, AST.expressionStatement(node.test), node.consequent.body[0]);

        after(body[i], parentBlock);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (
        AST.isPrimitive(ifBodyLast) &&
        AST.isPrimitive(elseBodyLast) &&
        // Work around NaN and -0 cases with Object.is
        Object.is(AST.getPrimitiveValue(ifBodyLast), AST.getPrimitiveValue(elseBodyLast))
      ) {
        vlog('The body of both branches have one element and it is a return statement that returns the same literal');
        rule('When both branches of an `if` return the same literal, the if is redundant');
        example('if (x) { return 512; } else { return 512; }', 'x; return 512;');
        before(node, parentBlock);

        // Note: keep the test condition around because it may trigger TDZ or unknown global errors

        body.splice(i, 1, AST.expressionStatement(node.test), node.consequent.body[0]);

        after(body[i], parentBlock);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (ifBodyLast.type === 'UnaryExpression' && elseBodyLast.type === 'UnaryExpression') {
        const ifBodyNeg = ifBodyLast.argument;
        const elseBodyNeg = elseBodyLast.argument;

        if (ifBodyNeg.type === 'Identifier' && elseBodyNeg.type === 'Identifier' && ifBodyNeg.name === elseBodyLast.name) {
          vlog('The body of both branches have one element and it is a return statement that returns the same identifier');
          rule('When both branches of an `if` return the same ident, the if is redundant');
          example('if (x) { return undefined; } else { return undefined; }', 'x; return undefined;');
          before(node, parentBlock);

          // Note: keep the test condition around because it may trigger TDZ or unknown global errors

          body.splice(i, 1, AST.expressionStatement(node.test), node.consequent.body[0]);

          after(body[i], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (
          AST.isPrimitive(ifBodyNeg) &&
          AST.isPrimitive(elseBodyNeg) &&
          // Work around NaN and -0 cases with Object.is
          Object.is(AST.getPrimitiveValue(ifBodyNeg), AST.getPrimitiveValue(elseBodyNeg))
        ) {
          vlog('The body of both branches have one element and it is a return statement that returns the same literal');
          rule('When both branches of an `if` return the same literal, the if is redundant');
          example('if (x) { return 512; } else { return 512; }', 'x; return 512;');
          before(node, parentBlock);

          // Note: keep the test condition around because it may trigger TDZ or unknown global errors

          body.splice(i, 1, AST.expressionStatement(node.test), node.consequent.body[0]);

          after(body[i], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }
      }
    }

    // Check back2back ifs
    // TODO: also skip statements without observable side effects
    if (i > 0 && body[i - 1].type === 'IfStatement') {
      const prev = body[i - 1];
      const currentConsequentBlock = node.consequent.body;
      const currentAlternateBlock = node.alternate.body;
      const prevConsequentBlock = prev.consequent.body;
      const prevAlternateBlock = prev.alternate.body;
      vlog('Back to back ifs, testing on', prev.test.name ?? '<nonident>', 'and', node.test.name ?? '<nonident>');
      if (node.test.type === 'Identifier' && prev.test.type === 'Identifier' && node.test.name === prev.test.name) {
        vlog('Testing on the same ident, this could be merged...');
        if (
          // No children in consequent in either `if`
          !currentConsequentBlock.length &&
          !prevConsequentBlock.length
        ) {
          // There's nothing in the `true` branch that might change the value of the ident (the test itself is not observable)
          // so the second `if` should be moved to the back of the `else` branch instead.
          rule('Back to back if statements testing on the same identifier when neither has an `if` branch should be merged');
          example('if (x) { } else { f(); } if (x) { } else { g(); }', 'if (x) {} else { f(); if (x) { g(); } }');
          before(prev, parentBlock);
          before(node);

          // Since parent visitor won't go back, we'll replace this `if` with the previous `if` so it will be revisited
          body[i - 1] = AST.emptyStatement();
          body[i] = prev;
          prevAlternateBlock.push(node);

          after(body[i], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else if (
          // No children or no alternate body in either `if`
          !prevAlternateBlock.length &&
          !currentAlternateBlock.length
        ) {
          // There's nothing in the `false` branch that might change the value of the ident (the test itself is not observable)
          // so the second `if` should be moved to the back of the `false` branch instead.
          rule('Back to back if statements testing on the same identifier when the first if has no else branch should be merged');
          example('if (x) { f(); } if (x) { g(); }', 'if (x) { f(); if (x) { g(); } }');
          before(prev, parentBlock);
          before(node);

          // Since parent visitor won't go back, we'll replace this `if` with the previous `if` so it will be revisited
          body[i - 1] = AST.emptyStatement();
          body[i] = prev;
          prevConsequentBlock.push(node);

          after(body[i], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else if (
          !prevConsequentBlock.length &&
          currentConsequentBlock.length === 1 &&
          ['ReturnStatement', 'BreakStatement', 'ThrowStatement'].includes(currentConsequentBlock[0].type)
        ) {
          // This leads to more statements by duplicating a return statement...
          // It might allow let bindings to become constants which could be very valuable
          rule('Back to back ifs with the first consequent empty and second consequent only a return should be inlined');
          example(
            'if (x) {} else { x = f(); } if (x) { return x; } else { g(); }',
            'if (x) { return x; } else { x = f(); if (x) { return x; } else { g(); } }',
          );
          before(prev, parentBlock);
          before(node);

          const target = currentConsequentBlock[0];
          switch (target.type) {
            case 'ReturnStatement':
              prevConsequentBlock.push(AST.returnStatement(AST.cloneSimple(target.argument)));
              break;
            case 'BreakStatement': {
              // This is unsafe due to label references. There's a test for this (tests/cases/switch/switch_case_case_default_break.md)
              const newNode = AST.breakStatement(target.label ? AST.cloneSimple(target.label) : null);
              prevConsequentBlock.push(newNode);
              if (target.label) {
                // Must also register that break node as targeting that label
                fdata.globallyUniqueLabelRegistry.get(target.label.name).usages.push(
                  {node: newNode.label, block: prevConsequentBlock, index: prevConsequentBlock.length - 1}
                );
              }
              break;
            }
            case 'ThrowStatement':
              prevConsequentBlock.push(AST.throwStatement(AST.cloneSimple(target.argument)));
              break;
            default:
              ASSERT(false);
          }
          prevAlternateBlock.push(node);
          body.splice(i, 1); // Drop the current node since we moved it into the previous node. It should be revisited when the parent gets revisited.

          after(body[i - 1], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else if (
          !prevAlternateBlock.length &&
          currentAlternateBlock.length === 1 &&
          ['ReturnStatement', 'BreakStatement', 'ThrowStatement'].includes(currentAlternateBlock[0].type)
        ) {
          // This leads to more statements by duplicating a return statement...
          // It might allow let bindings to become constants which could be very valuable
          rule('Back to back ifs with the first alternate empty and second alternate only a return should be inlined');
          example(
            'if (x) { x = f(); } else { } if (x) { g(); } else { return x; }',
            'if (x) { x = f(); if (x) { g(); } else { return x; } } else { return x; }',
          );
          before(prev, parentBlock);
          before(node);

          const target = currentAlternateBlock[0];
          switch (target.type) {
            case 'ReturnStatement':
              prevAlternateBlock.push(AST.returnStatement(AST.cloneSimple(target.argument)));
              break;
            case 'BreakStatement': {
              const newNode = AST.breakStatement(target.label ? AST.cloneSimple(target.label) : null);
              prevAlternateBlock.push(newNode);
              if (target.label) {
                // Must also register that break node as targeting that label
                fdata.globallyUniqueLabelRegistry.get(target.label.name).usages.push(
                  {node: newNode.label, block: prevAlternateBlock, index: prevAlternateBlock.length - 1}
                );
              }
              break;
            }
            case 'ThrowStatement':
              prevAlternateBlock.push(AST.throwStatement(AST.cloneSimple(target.argument)));
              break;
            default:
              ASSERT(false);
          }
          prevConsequentBlock.push(node);
          body.splice(i, 1); // Drop the current node since we moved it into the previous node. It should be revisited when the parent gets revisited.

          after(body[i - 1], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else if (
          !prevAlternateBlock.length &&
          currentAlternateBlock.length === 1 &&
          // TODO: This limitation only exists because the simple clone algo is limited to some expressions
          currentAlternateBlock[0].type === 'ExpressionStatement' &&
          currentAlternateBlock[0].expression.type === 'CallExpression'
        ) {
          // When the first `if` has no else, the second `if` must still go for the else because nothing
          // could have changed. If the second else has one statement, we can choose to inline that into
          // the first else, and then to move the whole if to follow the consequent branch.

          rule('Back to back ifs, first else empty, second else one statement, should be inlined');
          example('if (x) f(); else {} if (x) g(); else h();', 'if (x) { f(); if (x) g() else h(); } else { h(); }');
          before(prev, parentBlock);
          before(node);

          prevConsequentBlock.push(node);
          prevAlternateBlock.push(
            AST.expressionStatement(
              AST.callExpression(
                AST.cloneSimple(currentAlternateBlock[0].expression.callee),
                currentAlternateBlock[0].expression.arguments.map((anode) => AST.cloneSimple(anode)),
              ),
            ),
          );
          body.splice(i, 1); // Drop the second if. It was moved.

          after(body[i - 1], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else if (
          !prevConsequentBlock.length &&
          currentConsequentBlock.length === 1 &&
          // TODO: This limitation only exists because the simple clone algo is limited to some expressions
          currentConsequentBlock[0].type === 'ExpressionStatement' &&
          currentConsequentBlock[0].expression.type === 'CallExpression'
        ) {
          // When the first `if` has no else, the second `if` must still go for the else because nothing
          // could have changed. If the second else has one statement, we can choose to inline that into
          // the first else, and then to move the whole if to follow the consequent branch.

          rule('Back to back ifs, first if empty, second if one statement, should be inlined');
          example('if (x) {} else f(); if (x) g(); else h();', 'if (x) { g(); } else { f(); if (x) g() else h(); }');
          before(prev, parentBlock);
          before(node);

          prevAlternateBlock.push(node);
          prevConsequentBlock.push(
            AST.expressionStatement(
              AST.callExpression(
                AST.cloneSimple(currentConsequentBlock[0].expression.callee),
                currentConsequentBlock[0].expression.arguments.map((anode) => AST.cloneSimple(anode)),
              ),
            ),
          );
          body.splice(i, 1); // Drop the second if. It was moved.

          after(body[i - 1], parentBlock);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }
      }
    }

    if (node.consequent.$p.returnBreakThrow || node.alternate.$p.returnBreakThrow) {
      // Be mindful of hoisting variable decls since closures may break over that.
      // For this reason we cannot apply this trick when there's any functions being created before the If when
      // there are also var decls in the tail, because they may create closures that would be unreachable when hoisted.

      // Search for functions created before the If (in the same block)
      let hasFunctionsBefore = false;
      // Search for var decls after the If, that may become closures in the functions before it
      let hasVarDeclsAfter = false;

      let index = 0; // Note: even in a function, the function header can't init/assign functions so it can just scan them too and skip them
      vlog('Start pre-serach at index', index, 'up to the `if` at', i);
      for (; index < i; ++index) {
        vlog('-', index, '=', body[index].type);
        // Note: these have been visited so var decls are VarStatement now
        if (body[index].type === 'VarStatement' && body[index].init.type === 'FunctionExpression') {
          vlog('- `var` at i=', index);
          hasFunctionsBefore = true;
          break;
        }
        if (body[index].type === 'ExpressionStatement' && body[index].expression.type === 'FunctionExpression') {
          vlog('- `func` at i=', index);
          hasFunctionsBefore = true;
          break;
        }
      }

      // Checking decls after the If is only relevant to know if there are functions at all
      let j = i+1;
      vlog('Start post-serach at index', j, 'through to the end with last one at', body.length-1);
      if (hasFunctionsBefore) {
        for (; j < body.length; ++j) {
          vlog('-', j, '=', body[j].type);
          // Note: these have NOT been visited so var decls might still be VariableDeclaration
          if (body[j].type === 'VariableDeclaration' || body[j].type === 'VarStatement') {
            vlog('- `var` at i=', j);
            hasVarDeclsAfter = true;
            break;
          }
        }
      } else {
        // when len=3 and If index (i) is 1, then j should be 3 (len-1), j - (i+1) == 1
        j = body.length;
      }
      const statementCountToHoist = j - (i + 1); // i=If, we're not hoisting that, so start counting after the If.

      vlog('Binding checks: body.len=', body.length, ', i=', i, ', j=', j, ', hasFunctionsBefore=', hasFunctionsBefore, ', hasVarDeclsAfter=', hasVarDeclsAfter, ', statementCountToHoist:', statementCountToHoist);
      //vlog(body.map(n => [n.type, n.id.name]))

      // This is unsafe to do when there's a closure like
      // - `function f(){ const g = function(){ y }; if (1) { return } else {}; const y = 2; return g; }`
      //                                        ^                               ^^^^^^^^^^^^
      //
      // Hoist if-else tail statements if one of the branches explicitly completes, under certain conditions.
      // Can not hoist var decls (as per above). We'd have to do that in a phase2 step when ref tracking is set up.
      if (node.consequent.$p.returnBreakThrow && statementCountToHoist > 0) {
        // Doesn't matter what kind of abrupt completion it was
        // Inline the remainder of the parent block into the else branch

        rule('If the if-branch returns the remainder of the parent block goes into the else-branch');
        example('if (x) return; else f(); g();', 'if (x) return; else { f(); g(); }');
        before(body[i]);

        const remainder = body.splice(i + 1, statementCountToHoist);
        node.alternate.body.push(...remainder);

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(parentBlock), 'body');
        return true;
      }

      if (node.alternate.$p.returnBreakThrow && statementCountToHoist > 0) {
        // Doesn't matter what kind of abrupt completion it was
        // Inline the remainder of the parent block into the if branch
        rule('If the else-branch returns the remainder of the parent block goes into the if-branch');
        example('if (x) f(); else return; g();', 'if (x) { f(); g(); } else { return; }');
        before(node, parentBlock);

        const remainder = body.splice(i + 1, statementCountToHoist);
        node.consequent.body.push(...remainder);

        after(parentBlock);
        assertNoDupeNodes(AST.blockStatement(parentBlock), 'body');
        return true;
      }
    }


    vlog(
      BLUE + 'if;returnBreakThrow?' + RESET,
      node.alternate && node.consequent.$p.returnBreakThrow && node.alternate.$p.returnBreakThrow
        ? 'yes; ' + node.consequent.$p.returnBreakThrow + ' and ' + node.alternate.$p.returnBreakThrow
        : 'no',
    );
    ASSERT(node.alternate);
    if (node.consequent.$p.returnBreakThrow && node.alternate.$p.returnBreakThrow) {
      // Both branches broke flow early so any statements that follow this statement are effectively dead
      node.$p.returnBreakThrow = node.consequent.$p.returnBreakThrow + '+' + node.alternate.$p.returnBreakThrow;
      parentBlock.$p.returnBreakThrow = node.$p.returnBreakThrow;

      if (body.length > i + 1) {
        if (dce(body, i, 'after if-else')) {
          return true;
        }
      }
    }

    //// TODO: check whether this does anything at all... it was disabled for a long time and it may have been subsumed by another rule
    //if (
    //  i &&
    //  body[i - 1].type === 'IfStatement' &&
    //  node.test.type === 'Identifier' &&
    //  body[i - 1].test.type === 'Identifier' &&
    //  node.test.name === body[i - 1].test.name
    //) {
    //  // This is, if nothing else, a common artifact from our logical operator transform
    //  // Folding them like this might allow certain bindings to be detected as constants, where that was harder before
    //  const prev = body[i - 1];
    //  if (prev.consequent.body.length === 0 && node.consequent.body.length === 0) {
    //    // If prev node has no "true" branch then append this if to its alternate
    //    rule('Back to back `if` with same condition can be merged if the first has no consequent branch');
    //    example('if (x) {} else { x = f(); } if (x) { g(); }', 'if (x) {} else { x = f(); if (x) { g(); } }');
    //    before(body[i - 1]);
    //    before(node);
    //
    //    prev.alternate.body.push(node);
    //    body[i] = AST.emptyStatement();
    //
    //    after(body[i - 1]);
    //    after(body[i]);
    //    assertNoDupeNodes(AST.blockStatement(body), 'body');
    //    return true;
    //  } else if (prev.alternate.body.length === 0 && node.alternate.body.length === 0) {
    //    // If prev node has an empty "false" branch then append this if to its consequent
    //    // The idea is that if an ident was truthy before then only the truthy branch may change that
    //    rule('Back to back `if` with same condition can be merged if the first has no alternate branch');
    //    example('if (x) { f(); } if (x) { g(); }', 'if (x) { x = f(); if (x) { g(); } }');
    //    before(body[i - 1]);
    //    before(node);
    //
    //    prev.consequent.body.push(node);
    //    body[i] = AST.emptyStatement();
    //
    //    after(body[i - 1]);
    //    after(body[i]);
    //    assertNoDupeNodes(AST.blockStatement(body), 'body');
    //    return true;
    //  }
    //}

    return false;
  }

  function transformImportDeclaration(node, body, i, parentBlock) {
    if (node.source.type === 'Literal') {
      ASSERT(typeof node.source.value === 'string', 'right?', node.source);

      rule('Import source strings should be templates internally, even if that is technically invalid');
      example('import x from "foo"', 'import x from `foo`');
      before(node.source, node);

      node.source = AST.templateLiteral(node.source.value);

      after(node.source, node);
      return true;
    }

    if (node.specifiers.length > 1) {
      rule('Imports should have one specifier');
      example('import a, {b} from "c"', 'import a from "c"; import {b} from "c"');
      before(node);

      const newNodes = node.specifiers.map((specifier) => {
        ASSERT(AST.isStringLiteral(node.source, true), 'if this changes then the below should change');
        return AST.importDeclarationFromSpecifier(specifier, AST.getStringValue(node.source, true));
      });
      body.splice(i, 1, ...newNodes);

      after(newNodes);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    const spec = node.specifiers[0];
    ASSERT(spec);

    if (spec.type === 'ImportDefaultSpecifier') {
      // Spec wise, a default export is really just this, so we should just normalize this variation away.
      rule('The defaults import should be a named import');
      example('import x from "y";', 'import {default as x} from "y";');
      before(node);

      const finalParent = AST.importDeclarationNamed('default', spec.local, node.source);
      body[i] = finalParent;

      after(finalParent);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // TODO
    return false;
  }

  function transformLabeledStatement(node, body, i, parentBlock) {
    // Note: in regular JS, labeled loop statements are tricky due to continue statements. However, we've
    //       eliminated `continue` and so this restriction is not relevant to us.
    vlog('Label: `' + node.label.name + '`');

    const labelMeta = fdata.globallyUniqueLabelRegistry.get(node.label.name);
    ASSERT(labelMeta, 'labels registry should be populated in prepare');

    // foo: bar
    // foo: {bar}
    if (node.body.type !== 'BlockStatement') {
      rule('The body of a label must be a block or an iteration statement');
      example('foo: if (x) y;', 'foo: { if (x) y; }');
      before(node);

      const newNode = AST.labeledStatement(node.label, AST.blockStatement(node.body));
      body.splice(i, 1, newNode);

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    vlog('label has block, noop');
    ASSERT(node.body.type === 'BlockStatement');
    ifelseStack.push(node);
    labelStack.push(node);
    const anyChange = transformBlock(node.body, undefined, -1, node, false, node);
    labelStack.pop();
    ifelseStack.pop();
    vlog('Changes?', anyChange);

    if (node.body.type === 'BlockStatement' && node.body.body.length === 0) {
      rule('Labeled statement with empty sub statement should be dropped');
      example('foo: {}', ';');
      before(node);

      body[i] = AST.emptyStatement();

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    vlog('label usage count:', labelMeta.usages.size);
    if (!anyChange && labelMeta.usages.length === 0) {
      vlog('Label was not used in any of its children. Should be safe to eliminate.');
      rule('Unused labels must be dropped; non-loop body');
      example('foo: {}', '{}');
      before(node);

      body[i] = node.body;

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    const funcNode = ifelseStack[ifelseStack.length - 1];
    // Note: arrows are transformed on the way back up so would not be yet at this point (since we'd be inside one now)
    if (funcNode.type === 'FunctionExpression' || funcNode.type === 'ArrowFunctionExpression') {
      // This is a labeled statement that is the direct child of a function
      // If not, the body is a loop and we'll deal with that later.

      if (
        i === body.length - 1 ||
        (i === body.length - 2 && body[i + 1].type === 'ReturnStatement' && AST.isPrimitive(body[i + 1])) ||
        (i === body.length - 2 && body[i + 1].type === 'ThrowStatement' && AST.isPrimitive(body[i + 1]))
      ) {
        // If the label was followed by `return undefined` or `return 50` then store the primitive
        // value of that argument. Otherwise store `undefined`, which is the implicit return value.
        const isRet = body[i + 1]?.type !== 'ThrowStatement';
        const retValue = body[i + 1]?.argument ? AST.getPrimitiveValue(body[i + 1].argument) : undefined;

        rule('Labeled statement as direct child of function with no code following, drop the label.');
        example(
          'function f() { before(); foo: { inside(); if (x) if (y) break foo; } } f();',
          'function f(){ before(); { inside(); if (x) if (y) break foo; } } f();',
          i === body.length - 1
        );
        example(
          'function f() { before(); foo: { inside(); if (x) if (y) break foo; } return true; } f();',
          'function f(){ before(); { inside(); if (x) if (y) return true; } return true; } f();',
          i !== body.length - 1
        );
        example(
          'function f() { before(); foo: { inside(); if (x) if (y) break foo; } throw true; } f();',
          'function f(){ before(); { inside(); if (x) if (y) throw true; } throw true; } f();',
          !isRet
        );
        before(node, body);

        // Because the label is the direct child of a function, and because there is no code following
        // the label block except maybe a return statement with primitive, it means the function
        // implicitly returns, therefor we can drop the label safely and any labeled breaks to it
        // become explicit returns with the same primitive value.

        // Remove the "labeled statement" and re-insert its body, which becomes a nested BlockStatement, which will be normalized later.
        body.splice(i, 1, node.body);

        after(body, parentBlock);
        assertNoDupeNodes(AST.blockStatement(body), 'body');

        // CURRENTLY IN AN INVALID STATE BECAUSE BREAKS ARE STILL TARGETING THAT LABEL. We do them next.

        // Replace all `break foo` cases pointing to this label with a return statement with `undefined`
        // Note that there can't be any `continue` cases here because we transformed them already.
        ASSERT(fdata.globallyUniqueLabelRegistry.has(node.label.name), 'the label should be registered', node);

        const usages = fdata.globallyUniqueLabelRegistry.get(node.label.name).usages;
        vgroup('Replacing', usages.length, 'breaks that have the label with return');
        usages.forEach((obj) => {
          ASSERT(typeof obj === 'object' && obj && obj.node && obj.block && obj.index >= 0, 'usages type should be good', obj);
          const { node, block, index } = obj;

          rule('Labeled statement as direct child of function with no code following, replace breaks targeting that label with return.');
          example(
            'function f() { before(); { inside(); if (x) if (y) return undefined; } } f();',
            'function f(){ before(); { inside(); if (x) if (y) return undefined; } } f();',
          );
          before(block[index]);

          const finalNode = isRet ? AST.returnStatement(AST.primitive(retValue)) : AST.throwStatement(AST.primitive(retValue));
          ASSERT(block[index]?.type === 'BreakStatement' && block[index].label === node, 'should not be stale', obj, block[index], block[index].label, '==', node, block[index].label === node);
          block[index] = finalNode;

          after(block[index], parentBlock);
        });
        vgroupEnd();
        usages.length = 0;

        return true;
      }
    }

    if (node.body.body.length === 1 && node.body.body[0].type === 'LabeledStatement') {
      rule('A nested label where the parent label has no other children can be merged');
      example('A: { B: { if (x) break A; else break B; } }', 'AB: { if (x) break AB; else break AB; }');
      before(body[i]);

      // Fold up and eliminate the outer label, keep the inner label. no need to rename it. that would just be for debugging
      const exLabelName = node.label.name;
      const newLabelName = node.body.body[0].label.name;

      body[i] = node.body.body[0]; // Replace label with its child label

      // Find all unlabeled breaks and make them break to this label. If there aren't any unlabeled breaks then skip the label entirely.
      function _walker(node, before, nodeType, path) {
        ASSERT(node, 'node should be truthy', node);
        ASSERT(nodeType === node.type);
        if (!before) return;

        switch (nodeType) {
          case 'FunctionExpression':
          case 'ArrowFunctionExpression': {
            return true; // Do not traverse
          }

          case 'BreakStatement': {
            if (node.label?.name === exLabelName) {
              // This is a break we need to change
              removeLabelReference(fdata, node.label);
              node.label.name = newLabelName;
              const parentNode = path.nodes[path.nodes.length - 2];
              const parentIndex = path.indexes[path.indexes.length - 1];
              addLabelReference(fdata, node.label, parentNode.body, parentIndex, false);
            }
            break;
          }
        } // switch(key)
      } // /walker
      walk(_walker, node, 'body');

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      i > 0 &&
      // I'm not sure if we couldn't just exclude var statements instead. What else might we not want to include here?
      [
        'ExpressionStatement',
        'IfStatement',
        'WhileStatement',
        'TryStatement',
        'BreakStatement',
        'ReturnStatement',
        'ThrowStatement',
        'LabeledStatement',
      ].includes(body[i - 1].type)
    ) {
      rule('A label should wrap as much as possible so when preceded by an expression or certain statements it should wrap around it');
      example('f(); A: { ... }', '; A: { f(); ... }');
      example('while (true) f(); A: { ... }', '; A: { while (true) f(); ... }');
      before(body[i - 1]);
      before(body[i]);

      node.body.body.unshift(body[i - 1]);
      body[i - 1] = AST.emptyStatement();

      after(body[i - 1]);
      after(body[i]);
      return true;
    }

    return anyChange;
  }

  function transformMethodDefinition(methodNode, body, i, parentBlock) {
    // This will be an anonymous function expression.
    // For now, do the same as with functions

    ASSERT(
      methodNode.value && methodNode.value.type === 'FunctionExpression',
      'this might hold different values in the future but right now it can only be this?',
    );

    const node = methodNode.value; // function expression

    funcStack.push(node);
    ifelseStack.push(node);
    anyBlock(node.body, node);
    ifelseStack.pop();
    funcStack.pop();

    return postBodyFunctionTransform(node, body, i, parentBlock);
  }

  function transformProgram(node) {
    funcStack.push(node);
    anyBlock(node);
    funcStack.pop();
    return false;
  }

  function transformReturnStatement(node, body, i, parentBlock) {
    if (!node.argument) {
      rule('Return argument must exist');
      example('return;', 'return undefined;');
      before(node);

      node.argument = AST.identifier('undefined');

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // Enforce the situation where Unary minus is only allowed on numeric literals, not NaN/Infinity/anything else.
    // Probably too late to want to do this now. Runs into infinite transform loops
    // trying to put Infinity back into the Return argument "because it's a primitive".
    //if (
    //  (node.argument.type === 'Identifier' && node.argument.name !== 'arguments') ||
    //  AST.isNumber(node.argument) ||
    //  (node.argument.type === 'UnaryExpression' && AST.isNumber(node.argument.argument)) ||
    //  AST.isStringLiteral(node.argument) ||
    //  AST.isBoolean(node.argument) ||
    //  AST.isNull(node.argument)
    //) {
    //  // This is a fine return arg
    //} else {
    //  rule('Return argument must be very simple');
    //  example('return -xyz;', 'const tmp = -xyz; return xyz;');
    //  before(body[i]);
    //  console.log(node.argument)
    //
    //  const tmpName = createFreshVar('tmpReturnArg', fdata);
    //  body.splice(i, 0, AST.varStatement('const', tmpName, node.argument));
    //  node.argument = AST.identifier(tmpName);
    //
    //  after(body[i]);
    //  after(body[i+1]);
    //  assertNoDupeNodes(AST.blockStatement(body), 'body');
    //  return true;
    //}

    if (AST.isComplexNode(node.argument) || (node.argument.type === 'Identifier' && node.argument.name === 'arguments')) {
      rule('Return argument must be simple');
      example('return $()', 'let tmp = $(); return tmp;');
      before(node);

      // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
      const tmpName = createFreshVar('tmpReturnArg', fdata);
      const newNode = AST.varStatement('const', tmpName, node.argument);
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.argument.type === 'Literal' && typeof node.argument.value === 'string') {
      rule('Return values that are strings should be templates');
      example('return "foo";', 'return `foo`;');
      before(node.argument, parentBlock);

      node.argument = AST.templateLiteral(node.argument.value);

      after(node.argument, parentBlock);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (thisStack.length && node.argument.type === 'Identifier' && node.argument.name === 'arguments') {
      rule('Return value of `arguments` should be aliased'); // And silly.
      example('while (arguments) {}', 'while (tmpPrevalArgumentsAliasA) {}');
      before(node);

      node.argument = AST.identifier(thisStack[thisStack.length - 1].$p.argsAnyAlias);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // This one can use some love but appeared frequent in the prettier file (common minifier pattern?)
    ASSERT(node.argument, 'all return statements should be normalized to have an arg, yes?');
    if (
      //node.argument.type === 'Identifier' &&
      //!['undefined', 'NaN', 'Infinity'].includes(node.argument.name) &&
      i &&
      body[i - 1].type === 'IfStatement'
    ) {
      const prev = body[i - 1];

      rule('An if-else followed by a return statement should copy the return into both branches');
      example('if (x) { a = 10; } else { f(); } return a;', 'if (x) { a = 10; return a; } else { return a; }');
      before(prev);
      before(node);

      prev.consequent.body.push(AST.returnStatement(AST.cloneSimple(node.argument)));
      ASSERT(prev.alternate, 'should exist', prev);
      prev.alternate.body.push(AST.returnStatement(AST.cloneSimple(node.argument)));
      body[i] = AST.emptyStatement();

      after(prev);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      i &&
      node.argument.type === 'Identifier' &&
      body[i - 1].type === 'VarStatement' &&
      body[i - 1].id.name === node.argument.name &&
      !AST.isComplexNode(body[i - 1].init)
    ) {
      // Constant folding does something like this generically, but this particular trampoline also works with `let`
      rule('Return var trampoline should eliminate the var');
      example('const x = f; return x;', 'return f;');
      before(body[i - 1], parentBlock);
      before(node);

      node.argument = body[i - 1].init;
      body[i - 1] = AST.emptyStatement();

      after(body[i - 1]);
      after(node, parentBlock);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      node.argument.type === 'Identifier' &&
      (node.argument.name === SYMBOL_MAX_LOOP_UNROLL || node.argument.name.startsWith(SYMBOL_LOOP_UNROLL))
    ) {
      rule('Any usage of the unroll constants as return arg should become `true`');
      example('return $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'return true');
      before(body[i]);

      node.argument = AST.tru();

      after(body[i]);
      return true;
    }

    vlog(BLUE + 'Marking parent (' + parentBlock.type + ') as returning early' + RESET);
    parentBlock.$p.returnBreakThrow = 'return';
    if (body.length > i + 1) {
      if (dce(body, i, 'after return')) {
        return true;
      }
    }
    return false;
  }

  function transformThrowStatement(node, body, i, parentBlock) {
    if (AST.isComplexNode(node.argument)) {
      rule('Throw argument must be simple');
      example('throw $()', 'let tmp = $(); throw tmp;');
      before(node);

      const tmpName = createFreshVar('tmpThrowArg', fdata);
      const newNode = AST.varStatement('const', tmpName, node.argument);
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (thisStack.length && node.argument.type === 'Identifier' && node.argument.name === 'arguments') {
      rule('Throw value of `arguments` should be aliased'); // And silly.
      example('throw arguments', 'throw tmpPrevalArgumentsAliasA');
      before(node);

      node.argument = AST.identifier(thisStack[thisStack.length - 1].$p.argsAnyAlias);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    vlog(BLUE + 'Marking parent (' + parentBlock.type + ') as throwing early' + RESET);
    parentBlock.$p.returnBreakThrow = 'throw';

    if (body.length > i + 1) {
      if (dce(body, i, 'after throw')) {
        return true;
      }
    }

    if (
      node.argument.type === 'Identifier' &&
      (node.argument.name === SYMBOL_MAX_LOOP_UNROLL || node.argument.name.startsWith(SYMBOL_LOOP_UNROLL))
    ) {
      rule('Any usage of the unroll constants as throw arg should become `true`');
      example('throw $LOOP_DONE_UNROLLING_ALWAYS_TRUE;', 'throw true');
      before(body[i]);

      node.argument = AST.tru();

      after(body[i]);
      return true;
    }

    return false;
  }

  function transformTryStatement(node, body, i, parentBlock) {
    transformBlock(node.block, undefined, -1, node, false);
    anyBlock(node.block);

    ASSERT(!node.finalizer, 'finally was removed in the normal_once step');

    if (node.block.body.length === 0) {
      // Drop the `try` entirely because the `catch` block can't ever be executed and there is no finally

      rule('A `try` `catch` without statements in its block can be dropped');
      example('try {} catch (e) { f(); } ', ';');
      before(node);

      body[i] = AST.emptyStatement();

      after(AST.emptyStatement());
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    transformBlock(node.handler.body, undefined, -1, node, false);

    if (
      node.block.body.length === 1 &&
      node.block.body[0].type === 'TryStatement' &&
      node.block.body[0].handler.body.body.length === 0
    ) {
      rule('Nested try with empty body can be squashed because the outer catch can never catch anything');
      example('try { try { $(); } catch {} } catch { $() }', 'try { $(); } catch {}');
      before(node);

      body[i] = node.block.body[0];

      after(body[i]);
      return true;
    }

    if (
      node.block.body.length === 1 &&
      node.block.body[0].type === 'TryStatement'
    ) {
      rule('Nested Try nodes means the inner Catch is wrapped by the outer Try'); // (But the outer Try does not trap the Try Block)
      example('try { try { $(1); } catch { $(2); } } catch { $(3) }', 'try { $(1); } catch { try { $(2) } catch { $(3) } }');
      before(node);

      const inner = node.block.body[0];
      node.block = inner.handler.body;
      inner.handler.body = AST.blockStatement(node);
      body[i] = inner;

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // Can we move unthrowable statements to before the try?
    if (
      node.block.body.length > 0 &&
      (
        node.block.body[0].type === 'BreakStatement' || // break cant trigger catch
        (node.block.body[0].type === 'ReturnStatement' && AST.isPrimitive(node.block.body[0].argument)) // return of primitive can't trigger catch
      )
    ) {
      if (node.block.body[0].type === 'BreakStatement') {
        rule('A break statement can not throw so it does not need to be inside a try');
        example('A: { try { break A; } catch {} }', 'A: { break A; try {} catch {} }');
      } else {
        rule('A return statement with primitive argument can not throw so it does not need to be inside a try');
        example('A: { try { return undefined; } catch {} }', 'A: { return undefined; try {} catch {} }');
      }
      before(body[i]);

      body.splice(i, 0, node.block.body.shift());

      after(body[i]);
      after(body[i + 1]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // The boilerplate we leave behind has room for optimization. In particular, the case where
    // the catch is thrown immediately: `try { x } catch (e) { a = true; b = e; } if (a) throw b`
    // Regardless of whether a and b are used any further, the catch handler might as well throw
    // e again. But more importantly, at that point it's a pointless try/catch and we can drop it.
    if (
      node.handler.body.body.length === 2 &&
      node.handler.body.body[0].type === 'ExpressionStatement' &&
      node.handler.body.body[0].expression.type === 'AssignmentExpression' &&
      node.handler.body.body[0].expression.left.type === 'Identifier' &&
      // Preval writes this boilerplate so we can test against it explicitly
      AST.isTrue(node.handler.body.body[0].expression.right) &&
      node.handler.body.body[1].type === 'ExpressionStatement' &&
      node.handler.body.body[1].expression.type === 'AssignmentExpression' &&
      // Likewise, preval writes this boilerplate so we can just check if it assigns the catch var here
      node.handler.body.body[1].expression.left.type === 'Identifier' &&
      node.handler.body.body[1].expression.right.type === 'Identifier' &&
      node.handler.body.body[1].expression.right.name === node.handler.param.name
    ) {
      // This is a validation of `catch (e) { <id1> = true; <id1> = e; }`
      // Validate that the catch is immediately followed by `} if (id1) throw id2`
      if (
        body[i+1]?.type === 'IfStatement' &&
        body[i+1].test.type === 'Identifier' &&
        body[i+1].test.name === node.handler.body.body[0].expression.left.name && // if (id1)
        body[i+1].consequent.body.length > 0 &&
        body[i+1].consequent.body[0].type === 'ThrowStatement' &&
        body[i+1].consequent.body[0].argument.type === 'Identifier' &&
        body[i+1].consequent.body[0].argument.name === node.handler.body.body[1].expression.left.name // return id2
      ) {
        rule('Cleanup catch artifacts when the catch unconditionally just and only throws the catch var');
        example('try { x } catch (e) { a = true; b = e; } if (a) throw b;', 'x; if (a) throw b;');
        before(body[i]);
        before(body[i+1]);

        body[i] = body[i].block;

        after(body[i]);
        after(body[i+1]);

        return true;
      }
    }

    if (node.handler.body.body.length === 1 && node.handler.body.body[0].type === 'BreakStatement') {
      todo('Find me a test case for this try { break }');
      // Breaks cant throw, they are syntactically validated, so we should be able to move them out safely
      // Unfortunately, moving them out will trigger an infinite loop as we try to have try blocks gobble
      // up as many previous statements as is safe to do. So instead we'll rely on DCE to clear the remainder
      // of the try block. And if it's only got this statement, then the try is dead. And we remove it.
      rule('A `try` block with only a `break` can not catch anything');
      example('x: { try { break x; } catch {} }', 'x: { break x; }');
      before(body[i]);

      body[i] = node.handler.body.body[0];

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    return false;
  }

  function transformVarStatement(node, body, i, parentBlock, funcNode) {
    const id = node.id;
    const init = node.init;
    ASSERT(init, 'varstatement nodes must have init');
    vlog('Init:', init.type);

    if (init.type === 'AssignmentExpression') {
      // Must first outline the assignment because otherwise recursive calls will assume the assignment
      // is an expression statement and then transforms go bad.

      if (init.left.type === 'Identifier') {
        if (init.operator !== '=') {
          rule('Var inits can not be compound assignments to ident');
          example('let x = y *= z()', 'let x = y = y * z();');
          before(node, parentBlock);

          node.init = AST.assignmentExpression(
            init.left,
            AST.binaryExpression(
              init.operator.slice(0, -1), // *= becomes *
              AST.cloneSimple(init.left),
              init.right,
            ),
          );

          after(node);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        rule('Var inits can not be assignments; lhs ident');
        example('let x = y = z()', 'y = z; let x = y;');
        before(node, parentBlock);

        const newNodes = [
          AST.expressionStatement(init),
          AST.varStatement(node.kind, AST.cloneSimple(id), AST.cloneSimple(init.left)),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (init.left.type === 'MemberExpression') {
        if (init.left.computed && AST.isComplexNode(init.left.property)) {
          ASSERT(id.type === 'Identifier');
          rule('Var inits can not be assignments; lhs computed complex prop');
          example('let x = a()[b()] = z()', 'tmp = a(), tmp2 = b(), tmp3 = z(), tmp[tmp2] = tmp3; let x = tmp3;');
          before(node, parentBlock);

          const tmpNameObj = createFreshVar('tmpInitAssignLhsComputedObj', fdata);
          const tmpNameProp = createFreshVar('tmpInitAssignLhsComputedProp', fdata);
          const tmpNameRhs = createFreshVar('tmpInitAssignLhsComputedRhs', fdata);
          const newNodes = [
            AST.varStatement('const', tmpNameObj, init.left.object),
            AST.varStatement('const', tmpNameProp, init.left.property),
            AST.varStatement('const', tmpNameRhs, init.right),
            AST.expressionStatement(AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), tmpNameRhs)),
            AST.varStatement(node.kind, AST.cloneSimple(id), AST.identifier(tmpNameRhs)),
          ];
          body.splice(i, 1, ...newNodes);

          after(newNodes);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (AST.isComplexNode(init.left.object)) {
          ASSERT(id.type === 'Identifier');
          rule('Var inits can not be assignments; lhs regular complex prop');
          example('let x = a().b = z()', 'tmp = a(); let x = tmp.b = z();', () => init.operator === '=' && !init.left.computed);
          example(
            'let x = a()[b] = z()',
            'tmp = a(); let x = tmp[b] = z();',
            () => init.operator === '=' && init.left.computed,
          );
          example(
            'let x = a().b *= z()',
            'tmp = a(); let x = tmp.b *= z();',
            () => init.operator !== '=' && !init.left.computed,
          );
          example(
            'let x = a()[b] *= z()',
            'tmp = a(); let x = tmp[b] *= z();',
            () => init.operator !== '=' && init.left.computed,
          );
          before(node, parentBlock);

          const tmpNameObj = createFreshVar('tmpInitAssignLhsComputedObj', fdata);
          const newNodes = [
            AST.varStatement('const', tmpNameObj, init.left.object),
            AST.varStatement(
              node.kind,
              id,
              AST.assignmentExpression(
                AST.memberExpression(tmpNameObj, init.left.property, init.left.computed),
                init.right,
                init.operator,
              ),
            ),
          ];
          body.splice(i, 1, ...newNodes);

          after(newNodes);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // At this point the assignment has an lhs that is a property and the object and property are simple (maybe computed)

        if (init.operator !== '=') {
          ASSERT(id.type === 'Identifier');
          rule('Var inits can not be compound assignments to simple member');
          example('let x = a.b *= z()', 'let x = a.b = a.b * z();');
          before(node);

          node.init = AST.assignmentExpression(
            init.left,
            AST.binaryExpression(
              init.operator.slice(0, -1), // *= becomes *
              AST.cloneSimple(init.left),
              init.right,
            ),
          );

          after(node);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // We should be able to stash the rhs without worrying about side effects by reading the lhs first.

        ASSERT(id.type === 'Identifier');
        rule('Var inits can not be assignments; lhs simple member');
        example('let x = a()[b()] = z()', 'tmp = a(), tmp2 = b(), tmp3 = z(), tmp[tmp2] = tmp3; let x = tmp3;');
        before(node, parentBlock);

        const tmpNameRhs = createFreshVar('tmpInitAssignLhsComputedRhs', fdata);
        const newNodes = [
          AST.varStatement('const', tmpNameRhs, init.right),
          AST.expressionStatement(AST.assignmentExpression(init.left, tmpNameRhs, init.operator)),
          AST.varStatement(node.kind, id, AST.identifier(tmpNameRhs)),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      // TODO: clean this up nicely as well. Shouldn't ultimately be a big deal, just yields better normalized results. Like above.

      rule('Var inits can not be assignments; pattern lhs');
      example('let x = [y] = z()', 'let x, x = [y] = z()');
      before(node, parentBlock);

      const newNodes = [
        AST.varStatement('let', AST.cloneSimple(id), AST.undef()),
        AST.expressionStatement(AST.assignmentExpression(id, init)),
      ];
      body.splice(i, 1, ...newNodes);

      after(newNodes);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (init.type === 'FunctionExpression' && init.id && init.id.name !== '$free') {
      // Note: this happens here (var decl) and in assignment!
      // The id of a function expression is kind of special.
      // - It only exists inside the function
      // - It is read-only, writes fail hard (only in strict mode, which we force).
      // - It can be shadowed inside the function like by a var or a param

      // Since we give each name a unique name, we can declare the binding anywhere.
      // So we can create an outer constant and assign it the function, then alias it.
      // But we have to make sure that the name is unique (!) and prevent collisions

      const funcNode = init;

      rule('Function expressions should not have an id; var');
      example('let x = function f(){};', 'const f = function(); let x = f;');
      before(funcNode, node);

      // Note: body should be normalized now but parent may not be
      body.splice(i, 0, AST.varStatement('const', funcNode.id.name, funcNode));
      node.init = AST.identifier(funcNode.id.name);
      funcNode.id = null;

      after(body[i]);
      after(body[i+1]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (init.type === 'Literal' && typeof init.value === 'string') {
      rule('Var inits that are strings should be templates');
      example('const x = "foo";', 'const x = `foo`;');
      before(node);

      node.init = AST.templateLiteral(init.value);

      after(node);
      return true;
    }

    if (
      AST.isComplexNode(init, false) ||
      init.type === 'TemplateLiteral' ||
      (init.type === 'Identifier' && init.name === 'arguments')
    ) {
      // false: returns true for simple unary as well
      vlog('- init is complex, transforming expression');
      if (transformExpression('var', init, body, i, node, id, node.kind)) {
        assertNoDupeNodes(AST.blockStatement(body), 'body', undefined, node);
        return true;
      }
    }

    if (
      init.type === 'Identifier' &&
      (init.name === SYMBOL_MAX_LOOP_UNROLL || init.name.startsWith(SYMBOL_LOOP_UNROLL))
    ) {
      if (transformExpression('var', init, body, i, node, id, node.kind)) {
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    // Very very specific case. `f = function(){debugger; return 'x';} const y = f();` -> `y = 'x';`
    if (
      // Is this a call and was previous statement an assignment?
      i && body[i - 1].type === 'ExpressionStatement' && body[i - 1].expression.type === 'AssignmentExpression' &&
      init.type === 'CallExpression' && init.callee.type === 'Identifier' &&
      body[i - 1].expression.left.type === 'Identifier' &&
      // Are we calling a function binding that was just updated in the statement prior?
      body[i - 1].expression.left.name === init.callee.name &&
      // Is the assignment a function that is just returning a primitive?
      body[i - 1].expression.right.type === 'FunctionExpression' &&
      !body[i - 1].expression.right.async && !body[i - 1].expression.right.generator && // eh
      body[i - 1].expression.right.body.body.length === 2 && // debugger and return statement
      body[i - 1].expression.right.body.body[1].type === 'ReturnStatement' && // ought to be when normalized, but
      AST.isPrimitive(body[i - 1].expression.right.body.body[1].argument) // bingo...?
    ) {
      rule('When calling a function that was updated in the previous statement and the func returns a primitive, inline it');
      example(`f = function(){return 'x';} const y = f();`, `f = function(){return 'x';} const y = 'x';`);
      before(body[i - 1]);
      before(body[i]);

      // We do not eliminate the previous assignment as that value may still be used again later
      // Just replace the init with the primitive value returned by the function
      body.splice(i, 1,
        ...init.arguments.map(node => AST.expressionStatement(node)), // Retain TDZ errors
        AST.varStatement('const', id.name, AST.primitive(AST.getPrimitiveValue(body[i - 1].expression.right.body.body[1].argument))),
      );

      after(body.slice(i, i + init.arguments.length + 1));
      return true;
    }

    if (body.length > i+3) {
      const stmt1 = body[i];   // const buf = $dotCall($Buffer_from, Buffer, 'from', param, 'base64')
      const stmt2 = body[i+1]; // const tmp = buf.toString;
      const stmt3 = body[i+2]; // const ret = $dotCall(tmp, buf, 'toString', 'utf8')
      if (AST.isBufferConvertPattern(stmt1, stmt2, stmt3, true)) {
        // Note: we've confirmed the pattern. Keep in mind to only replace the final
        // value. The rest should be retained and cleaned up safely by other rules.
        rule('The buffer.from(x).tostring(y) pattern can be inlined');
        example(
          `const a = ${SYMBOL_DOTCALL}(${symbo('Buffer', 'from')}, x, "from", "base64"); const b = a.toString; const c = ${SYMBOL_DOTCALL}(b, a, "toString", "utf8");`,
          `const a = ${SYMBOL_DOTCALL}(${symbo('Buffer', 'from')}, x, "from", "base64"); const b = a.toString; ${SYMBOL_DOTCALL}(b, a, "toString", "utf8"); const c = <resulting string>`,
        );
        before(body.slice(i, i+3));

        // The pattern was confirmed so the init must be a dotcall with primitve args
        const args1 = stmt1.init.arguments.slice(3).map(anode => AST.getPrimitiveValue(anode));
        // Last init as well
        const args3 = stmt3.init.arguments.slice(3).map(anode => AST.getPrimitiveValue(anode));
        // Do the conversion now
        const result = Buffer.from(...args1).toString(...args3);

        // We move the init of c to a statement and replace that init with the resulting value
        body.splice(i+2, 0, AST.expressionStatement(stmt3.init));
        stmt3.init = AST.primitive(result);

        after(body.slice(i, i+4));
        return true;
      }
    }

    return false;
  }

  function transformVariableDeclaration(node, body, i, parentBlock, funcNode) {
    // This handler should only concern itself with converting the VariableDeclaration node to the point where
    // it can be converted to a VarStatement node, after which we should not see the var decl node again.
    // We need to do it here due to destructuring patterns.

    if (node.declarations.length !== 1) {
      rule('Var binding decls must introduce one binding');
      example('var a = 1, b = 2', 'var a = 1; var b = 2', () => node.kind === 'var');
      example('let a = 1, b = 2', 'let a = 1; var b = 2', () => node.kind === 'let');
      example('const a = 1, b = 2', 'const a = 1; var b = 2', () => node.kind === 'const');
      before(node);

      const newNodes = node.declarations.map((dec) => AST.variableDeclarationFromDeclaration(dec, node.kind));
      body.splice(i, 1, ...newNodes);

      after(newNodes);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    const dnode = node.declarations[0];
    const id = dnode.id;

    vlog('Id:', id.type === 'Identifier' ? '`' + id.name + '`' : '<pattern>');

    if (id.type === 'ArrayPattern') {
      rule('Binding array patterns not allowed');
      example('let [x] = y()', 'let tmp = y(), tmp1 = [...tmp], x = tmp1[0]');
      before(node);

      const bindingPatternRootName = createFreshVar('tmpBindingPatternArrRoot', fdata);
      const nameStack = [bindingPatternRootName];
      const newBindings = [];
      funcArgsWalkArrayPattern(id, nameStack, newBindings, 'var');

      if (newBindings.length) {
        vlog('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
        node.declarations = [
          AST.variableDeclarator(bindingPatternRootName, dnode.init, true),
          ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init, true)),
        ];

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      vlog('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (id.type === 'ObjectPattern') {
      rule('Binding object patterns not allowed');
      example('var {x} = y()', 'var tmp = y(), x = obj.x');
      before(node, parentBlock);

      const bindingPatternRootName = createFreshVar('tmpBindingPatternObjRoot', fdata);
      const nameStack = [bindingPatternRootName];
      const newBindings = [];
      funcArgsWalkObjectPattern(id, nameStack, newBindings, 'var', true);

      if (newBindings.length) {
        vlog('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
        node.declarations = [
          AST.variableDeclarator(bindingPatternRootName, dnode.init, true),
          ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init, true)),
        ];

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      vlog('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (id.type !== 'Identifier') {
      console.log('Error node .dir:');
      console.dir(node, { depth: null });
      ASSERT(
        false,
        'The paramNode can be either an Identifier or a pattern of sorts, and we checked the pattern above',
        [id.type],
        node,
      );
    }
    ASSERT(node.kind !== 'var');

    // Convert to VarStatement and revisit.
    body[i] = AST.varStatement(node.kind, node.declarations[0].id, node.declarations[0].init || AST.undef());
    vlog('Replacing VariableDeclaration with VariableStatement'); // , node, body[i]);
    return true;
  }

  function transformWhileStatement(node, body, i, parentBlock) {
    if (AST.isPrimitive(node.test)) {
      const pv = AST.getPrimitiveValue(node.test);
      if (pv !== true) {
        if (pv) {
          rule('The while-test that is a truthy primitive should be an explicit `true`');
          example('while (1) {}', 'while (true) {}');
          before(node);

          node.test = AST.tru();

          after(node);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        } else {
          rule('The while-test that is a falsy primitive should drop the while');
          example('while (0) {}', ';');
          before(node);

          body[i] = AST.emptyStatement();

          after(AST.emptyStatement());
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }
      }
    }

    if (
      [
        'ThisExpression',
        'FunctionExpression',
        'ArrowFunctionExpression',
        'ClassExpression',
        /*'ArrayExpression', 'ObjectExpression', 'NewExpression'*/ // TODO: but if theyre not empty they may spy and should not just drop
      ].includes(node.test.type) ||
      (node.test.type === 'Literal' && node.test.regex)
    ) {
      // Silly conditions. Real world code is unlikely to ever trigger this.
      // Note: Needs special support for observable side effects. Probably not worth coding out here.
      rule('Replace truthy while test identifier with `true`');
      example('while (class{}) f();', 'while (true) f();');
      before(node);

      node.test = AST.tru();

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (
      !AST.isTrue(node.test) &&
      !(node.test.type === 'Identifier' && (node.test.name.startsWith(SYMBOL_LOOP_UNROLL) || node.test.name === SYMBOL_MAX_LOOP_UNROLL))
    ) {
      // We do this because it makes all reads that relate to the loop be inside the block.
      // There are heuristics that want to know whether a binding is used inside a loop and if
      // we don't do this then parts of the loop may not be inside the block. And we already
      // do this transform anyways so it's easier to then just do it for everything, anyways.

      rule('While test must be true');
      example('while (f()) z()', 'while (true) { if (f()) z(); else break; }');
      before(node);

      const newNode = AST.whileStatement(AST.tru(), AST.blockStatement(AST.ifStatement(node.test, node.body, AST.breakStatement())));
      if (node.$p.doesBreak) newNode.$p.doesBreak = true;
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.body.type !== 'BlockStatement') {
      rule('While sub-statement must be block');
      example('while (x) y', 'while (x) { y }');
      before(node);

      const newNode = AST.blockStatement(node.body);
      node.body = newNode;

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.body.body.length === 0) {
      rule('A while with empty body can be eliminated');
      example('while(true) {}', ';');
      before(body[i]);

      body[i] = AST.emptyStatement();

      after(body[i]);
      return true;
    }

    //if (AST.isComplexNode(node.test)) {
    //  const tmpName = createFreshVar('tmpWhileTest', fdata);
    //  const initTestNode = AST.varStatement('let', tmpName, node.test);
    //  const
    //}

    // If a while body doesn't contain a `break` statement then the while can't loop. Note that we eliminated `continue`.
    if (node.body.type === 'BlockStatement' && node.body.body.some(node => node.type === 'BreakStatement')) {
      rule('If a `while` body contains `break` statement in the root then it cannot loop');
      example('while(true) { f(); break; }', '{ f(); }');
      before(node);

      // Find all unlabeled breaks and make them break to this label. If there aren't any unlabeled breaks then skip the label entirely.
      const rootNode = node;
      /** @var {Array<{node, block, index}>} */
      const breaks = [];

      function _walker(node, before, nodeType, path) {
        ASSERT(node, 'node should be truthy', node);
        ASSERT(nodeType === node.type);
        if (!before) return;

        switch (nodeType) {
          case 'WhileStatement': {
            if (node === rootNode) break; // Ignore
            return true; // Do not visit
          }
          case 'ForStatement':
          case 'FunctionExpression':
          case 'ArrowFunctionExpression': {
            return true; // Do not traverse
          }

          case 'BreakStatement': {
            if (node.label) {
              // Ignore
            } else {
              const parentNode = path.nodes[path.nodes.length - 2];
              const parentIndex = path.indexes[path.indexes.length - 1];
              breaks.push({ node, block: parentNode.body, index: parentIndex });
            }
            break;
          }
        } // switch(key)
      } // /walker
      walk(_walker, node, 'body');

      if (breaks.length) {
        vlog('Found unlabeled breaks. Compiling a fresh label');
        const newLabelStatement = createFreshLabelStatement('unlabeledBreak', fdata, node.body);
        breaks.forEach((obj) => {
          ASSERT(typeof obj === 'object' && obj && obj.node && obj.block && obj.index >= 0, 'fail?', obj);
          const { node, block, index } = obj;
          ASSERT(!node.label, 'you _are_ unlabeled, no?', obj);
          node.label = AST.identifier(newLabelStatement.label.name);
          addLabelReference(fdata, node.label, block, index);
        });
        body[i] = newLabelStatement;
      } else {
        vlog('Did not find unlabeled breaks. Just moving the body');
        body[i] = node.body;
      }

      after(body[i]);
      return true;
    }

    ASSERT(node.body.type === 'BlockStatement');
    ifelseStack.push(node);
    loopStack.push(node);
    node.$p.hasUnlabeledBreak = false;
    transformBlock(node.body, undefined, -1, node, false);
    loopStack.pop();
    ifelseStack.pop();

    // Undo some of the stuffs

    const whileBody = node.body.body;

    if (whileBody.length) {
      if (whileBody.length === 1 && whileBody[0].type === 'BreakStatement') {
        const brk = whileBody[0];
        if (brk.label) {
          rule('A while with only a break statement must be removed; labeled break');
          example('x: { while (true) { break x; } }', 'x: { break x; }');
          before(node);

          body[[i]] = brk;

          after(body[[i]]);
          return true;
        }

        rule('A while with only a break statement must be removed; break without label');
        example('while (true) { break; }', ';');
        before(node);

        body[[i]] = AST.emptyStatement();

        after(body[[i]]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (whileBody.length === 1 && whileBody[0].type === 'WhileStatement') {
        // This is `while (true) { while (true) ... }`. This makes unlabeled breaks inside the loop effectively a continue.
        // We can't just eliminate the outer while, but we can do this transform with label.
        // The idea being that labels are slightly easier to reason about (spaghetti code notwithstanding) than loops.

        rule('Directly nested while loops can be collapsed');
        example('while (true) while (true) { f(); break; }', 'while (true) { A: { f(); break A; } }');
        before(body[i]);

        const while2 = whileBody[0];

        // Find all unlabeled breaks and make them break to this label. If there aren't any unlabeled breaks then skip the label entirely.
        const rootNode = while2;
        /** @var {Array<{node, block, index}>} */
        const breaks = [];

        function _walker(node, before, nodeType, path) {
          ASSERT(node, 'node should be truthy', node);
          ASSERT(nodeType === node.type);
          if (!before) return;

          switch (nodeType) {
            case 'WhileStatement': {
              if (node === rootNode) break; // Ignore
              return true; // Do not visit
            }
            case 'ForStatement':
              throw ASSERT(false);
            case 'ForInStatement':
              throw ASSERT(false);
            case 'ForOfStatement':
              throw ASSERT(false);
            case 'FunctionExpression':
            case 'ArrowFunctionExpression': {
              return true; // Do not traverse
            }

            case 'BreakStatement': {
              if (node.label) {
                // Ignore
              } else {
                const parentNode = path.nodes[path.nodes.length - 2];
                const parentIndex = path.indexes[path.indexes.length - 1];
                breaks.push({ node, block: parentNode.body, index: parentIndex });
              }
              break;
            }
          } // switch(key)
        } // /walker
        walk(_walker, rootNode, 'body');

        if (breaks.length) {
          vlog('Found unlabeled breaks. Compiling a fresh label');
          const newLabelStatement = createFreshLabelStatement('nestedLoop', fdata, while2.body);
          breaks.forEach((obj) => {
            ASSERT(typeof obj === 'object' && obj && obj.node && obj.block && obj.index >= 0, 'fail?', obj);
            const { node, block, index } = obj;
            ASSERT(!node.label, 'you _are_ unlabeled, no?', obj);
            node.label = AST.identifier(newLabelStatement.label.name);
            addLabelReference(fdata, node.label, block, index);
          });
          while2.body = newLabelStatement;
        } else {
          vlog('Did not find unlabeled breaks. Just eliminating the outer loop');
        }
        body[i] = while2;

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (
        whileBody.length === 1 &&
        whileBody[0].type === 'LabeledStatement' &&
        whileBody[0].body.body.length === 1 &&
        whileBody[0].body.body[0].type === 'WhileStatement'
      ) {
        // This is `while (true) { A: { while (true) { .. } } }`
        // It's another form of nested loop that we can hopefully collapse
        // We do also need to replace regular breaks and make them target this label to maintain semantics

        rule('A while-label-while directly nested can collapse');
        example('while (true) { A: { while (true) { f(); break A; } } }', 'while (true) A: { f(); break A; }');
        before(body[i]);

        const labelStmt = whileBody[0];
        const while2 = labelStmt.body.body[0];
        labelStmt.body = while2.body;

        // Find all unlabeled breaks and make them break to this label. If there aren't any unlabeled breaks then skip the label entirely.
        const rootNode = while2;
        /** @var {Array<{node, block, index}>} */
        const breaks = [];

        function _walker(node, before, nodeType, path) {
          ASSERT(node, 'node should be truthy', node);
          ASSERT(nodeType === node.type);
          if (!before) return;

          switch (nodeType) {
            case 'WhileStatement': {
              if (node === rootNode) break; // Ignore
              return true; // Do not visit
            }
            case 'ForStatement':
              throw ASSERT(false);
            case 'ForInStatement':
              throw ASSERT(false);
            case 'ForOfStatement':
              throw ASSERT(false);
            case 'FunctionExpression':
            case 'ArrowFunctionExpression': {
              return true; // Do not traverse
            }

            case 'BreakStatement': {
              if (node.label) {
                // Ignore
              } else {
                const parentNode = path.nodes[path.nodes.length - 2];
                const parentIndex = path.indexes[path.indexes.length - 1];
                breaks.push({ node, block: parentNode.body, index: parentIndex });
              }
              break;
            }
          } // switch(key)
        } // /walker
        walk(_walker, rootNode, 'body');

        if (breaks.length) {
          vlog('Found unlabeled breaks. Compiling a fresh label');
          breaks.forEach((obj) => {
            ASSERT(typeof obj === 'object' && obj && obj.node && obj.block && obj.index >= 0, 'fail?', obj);
            const { node, block, index } = obj;
            ASSERT(!node.label, 'you _are_ unlabeled, no?', obj);
            node.label = AST.identifier(labelStmt.label.name);
            addLabelReference(fdata, node.label, block, index);
          });
        } else {
          vlog('Did not find unlabeled breaks. Just eliminating the outer loop');
        }

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (
        whileBody.length === 1 &&
        whileBody[0].type === 'LabeledStatement' &&
        whileBody[0].body.body.length === 1 &&
        whileBody[0].body.body[0].type === 'WhileStatement'
      ) {
        // This is `while (true) { A: { while (true) { .. } } }`
        // It's another form of nested loop that we can hopefully collapse
        // We do also need to replace regular breaks and make them target this label to maintain semantics

        rule('A while-label-while directly nested can collapse');
        example('while (true) { A: { while (true) { f(); break A; } } }', 'while (true) A: { f(); break A; }');
        before(body[i]);

        const labelStmt = whileBody[0];
        const while2 = labelStmt.body.body[0];
        labelStmt.body = while2.body;

        // Find all unlabeled breaks and make them break to this label. If there aren't any unlabeled breaks then skip the label entirely.
        const rootNode = while2;
        /** @var {Array<{node, block, index}>} */
        const breaks = [];

        function _walker(node, before, nodeType, path) {
          ASSERT(node, 'node should be truthy', node);
          ASSERT(nodeType === node.type);
          if (!before) return;

          switch (nodeType) {
            case 'WhileStatement': {
              if (node === rootNode) break; // Ignore
              return true; // Do not visit
            }
            case 'ForStatement':
              throw ASSERT(false);
            case 'ForInStatement':
              throw ASSERT(false);
            case 'ForOfStatement':
              throw ASSERT(false);
            case 'FunctionExpression':
            case 'ArrowFunctionExpression': {
              return true; // Do not traverse
            }

            case 'BreakStatement': {
              if (node.label) {
                // Ignore
              } else {
                const parentNode = path.nodes[path.nodes.length - 2];
                const parentIndex = path.indexes[path.indexes.length - 1];
                breaks.push({ node, block: parentNode.body, index: parentIndex });
              }
              break;
            }
          } // switch(key)
        } // /walker
        walk(_walker, rootNode, 'body');

        if (breaks.length) {
          vlog('Found unlabeled breaks. Compiling a fresh label');
          breaks.forEach((obj) => {
            ASSERT(typeof obj === 'object' && obj && obj.node && obj.block && obj.index >= 0, 'fail?', obj);
            const { node, block, index } = obj;
            ASSERT(!node.label, 'you _are_ unlabeled, no?', obj);
            node.label = AST.identifier(labelStmt.label.name);
            addLabelReference(fdata, node.label, block, index);
          });
        } else {
          vlog('Did not find unlabeled breaks. Just eliminating the outer loop');
        }

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (
        whileBody[0].type === 'ExpressionStatement' &&
        whileBody[0].expression.type === 'Identifier'
      ) {
        rule('An expression statement that is an identifier at the start of a loop can move outside of that loop');
        example('while (true) { tdz; }', 'tdz; while (true) {}');
        before(node);

        body.splice(i, 0, whileBody.shift());

        after(body[i]);
        after(body[i + 1]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (i > 0) {
        // This is a while that is not the first statement in the parent and its child block is not empty
        // Check for sub-statement-rotation cases

        const stmtBeforeWhile = body[i - 1];
        const lastOfWhile = whileBody[whileBody.length - 1];

        const toMatchKind1 =
          stmtBeforeWhile.type === 'VarStatement' ? 'var' :
            stmtBeforeWhile.type !== 'ExpressionStatement' ? 'none' :
              stmtBeforeWhile.expression.type === 'AssignmentExpression' ? 'assign' :
                stmtBeforeWhile.expression.type === 'CallExpression' ? 'call' :
                  'none';

        const toMatchKind2 =
          //lastOfWhile.type === 'VarStatement' ? 'var' : // irrelevant to us (and very unlikely)
          lastOfWhile.type !== 'ExpressionStatement' ? 'none' :
            lastOfWhile.expression.type === 'AssignmentExpression' ? 'assign' :
              lastOfWhile.expression.type === 'CallExpression' ? 'call' :
                'none';

        if ((toMatchKind1 === 'assign' || toMatchKind1 === 'var') && toMatchKind2 === 'assign') {
          // A while preceded by var decl/assign and body ends with assign `let ? = ?; while(true) { ...; ? = ?; }` or `? = ?; while(true) { ...; ? = ?; }`
          const lhsA = toMatchKind1 === 'var' ? stmtBeforeWhile.id : stmtBeforeWhile.expression.left;
          const lhsB = lastOfWhile.expression.left;

          if (lhsA.type === 'Identifier' && lhsB.type === 'Identifier' && lhsA.name === lhsB.name) {
            // This is the form `let x = <?>; while (true) { ...; x = <?>; }` or `x = <?>; while (true) { ...; x = <?>; }`. Now verify the rhs.

            const rhsA = toMatchKind1 === 'var' ? stmtBeforeWhile.init : stmtBeforeWhile.expression.right;
            const rhsB = lastOfWhile.expression.right;

            if (AST.isPrimitive(rhsA) && AST.isPrimitive(rhsB) && AST.getPrimitiveValue(rhsA) === AST.getPrimitiveValue(rhsB)) {
              // `let x = 1; while (true) { ...; x = 1; }`
              // `x = 1; while (true) { ...; x = 1; }`
              //TODO
            }
            else if (AST.isRegexLiteral(rhsA) && AST.isRegexLiteral(rhsB) && AST.isSameRegexLiteral(rhsA, rhsB)) {
              // Note: the example looks silly but another rule will detect the unobservable write and drop it (SSA, actually)
              rule('A loop with a decl/assign before and matching assign of regex in tail position can rotate-merge');
              example('let x = /xyz/g; while (true) { f(x); x = /xyz/g; }', 'let x = /xyz/g; while (true) { x = /xyz/g; f(x); }');
              example('x = /xyz/g; while (true) { f(x); x = /xyz/g; }', '; while (true) { x = /xyz/g; f(x); }');
              before(body[i - 1]);
              before(body[i]);

              if (toMatchKind1 === 'var') {
                body[i - 1].init = AST.identifier('undefined');
              } else {
                // Remove the assignment. The rotate assignment will do the identical thing.
                body[i - 1] = AST.emptyStatement();
              }

              // Rotate; last statement becomes first
              whileBody.unshift(whileBody.pop());

              after(body[i - 1]);
              after(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
            else if (
              rhsA.type === 'CallExpression' &&
              rhsB.type === 'CallExpression' &&
              rhsA.callee.type === 'Identifier' && rhsB.callee.type === 'Identifier' &&
              AST.isSameCallExpression(rhsA, rhsB) // Gets gnarly with argument checks, spread, etc
            ) {
              // Note: in this case we must eliminate the pre-loop call because that's observable
              rule('A loop with a decl/assign before and matching assign of call in tail position can rotate-merge');
              example('let x = f(); while (true) { g(x); x = f(); }', 'let x = undefined; while (true) { x = f(); g(x); }');
              example('x = /xyz/g; while (true) { g(x); x = f(); }', '; while (true) { x = f(); g(x); }');
              before(body[i - 1]);
              before(body[i]);

              // Must eliminate the initial call here
              if (toMatchKind1 === 'var') {
                body[i - 1].init = AST.identifier('undefined');
              } else {
                body[i - 1] = AST.emptyStatement();
              }

              // Rotate; last statement becomes first
              whileBody.unshift(whileBody.pop());

              after(body[i - 1]);
              after(body[i]);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        // Same as above but for statement call expressions (somewhat common artifact left by unrolling)
        if (toMatchKind1 === 'call' && toMatchKind2 === 'call') {
          // This is the form `?(?); while (true) { ...; ?(?); }`. Now verify the rhs.

          const callA = stmtBeforeWhile.expression;
          const callB = lastOfWhile.expression;

          if (
            callA.callee.type === 'Identifier' && callB.callee.type === 'Identifier' &&
            AST.isSameCallExpression(callA, callB) // Gets gnarly with argument checks, spread, etc
          ) {
            // Note: in this case we must eliminate the pre-loop call because that's observable
            rule('A loop with a call before and a matching call in tail position can rotate-merge');
            example('f(); while (true) { g(); f(); }', '; while (true) { f(); g(); }');
            before(body[i - 1]);
            before(body[i]);

            // Must eliminate the initial call here
            body[i - 1] = AST.emptyStatement();

            // Rotate; last statement becomes first
            whileBody.unshift(whileBody.pop());

            after(body[i - 1]);
            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
        }

        if (toMatchKind1 !== 'none' && lastOfWhile.type === 'IfStatement') {
          const ifStmt = lastOfWhile;
          let lastIfOtherBreaks;
          let fromBranch;
          if (AST.blockEndsWith(ifStmt.consequent, 'BreakStatement') && ifStmt.alternate.body.length) {
            lastIfOtherBreaks = ifStmt.alternate.body[ifStmt.alternate.body.length - 1];
            fromBranch = false;
          } else if (AST.blockEndsWith(ifStmt.alternate, 'BreakStatement')) {
            lastIfOtherBreaks = ifStmt.consequent.body[ifStmt.consequent.body.length - 1];
            fromBranch = true;
          }
          if (lastIfOtherBreaks) {
            // This must be either of these:
            // - `?; while (true) { ...; if (x) { ...; break; } else { ...l <?> } }`
            // - `?; while (true) { ...; if (x) { ...; <?> } else { ...; break; } }`
            // It doesn't matter much for us which. We now must verify that the non-breaking branch ends the same as the statement before

            const toMatchKind3 =
              //lastOfWhile.type === 'VarStatement' ? 'var' : // irrelevant to us (and very unlikely)
              lastIfOtherBreaks.type !== 'ExpressionStatement' ? 'none' :
                lastIfOtherBreaks.expression.type === 'AssignmentExpression' ? 'assign' :
                  lastIfOtherBreaks.expression.type === 'CallExpression' ? 'call' :
                    'none';

            if (toMatchKind1 === 'call' && toMatchKind3 === 'call') {
              // This is, with some form of function call $():
              // - `$(); while (true) { if (x) { f(); $(); } else { g(); break; } }`
              // - `$(); while (true) { if (x) { g(); break; } else { f(); $(); } }`
              if (
                AST.isSameCallExpression(stmtBeforeWhile.expression, lastIfOtherBreaks.expression)
              ) {
                // The func calls should be identical. We can rotate this.

                // Nice and succinct desc:
                rule('When a func call before a while is equal to a func call that is the last statement of the tail If inside the While with the other branch breaking, then we can rotate');
                example('f(); while (true) { if (x) { g(); f(); } else { h(); break; } }', '; while (true) { f(); if (x) { g(); ; } else { h(); break; } }');
                before(body[i - 1]);
                before(body[i]);

                body[i - 1] = AST.emptyStatement();

                if (fromBranch) {
                  node.body.body.unshift(ifStmt.consequent.body.pop());
                } else {
                  node.body.body.unshift(ifStmt.alternate.body.pop());
                }

                after(body[i - 1]);
                after(body[i]);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }
            }

            if ((toMatchKind1 === 'var' || toMatchKind1 === 'assign') && toMatchKind3 === 'assign') {
              // A while preceded by var decl/assign and body ends with assign `let ? = ?; while(true) { ...; ? = ?; }` or `? = ?; while(true) { ...; ? = ?; }`
              const lhsA = toMatchKind1 === 'var' ? stmtBeforeWhile.id : stmtBeforeWhile.expression.left;
              const lhsB = lastIfOtherBreaks.expression.left;

              if (lhsA.type === 'Identifier' && lhsB.type === 'Identifier' && lhsA.name === lhsB.name) {
                // This is the form `let x = <?>; while (true) { ...; x = <?>; }` or `x = <?>; while (true) { ...; x = <?>; }`. Now verify the rhs.

                const rhsA = toMatchKind1 === 'var' ? stmtBeforeWhile.init : stmtBeforeWhile.expression.right;
                const rhsB = lastIfOtherBreaks.expression.right;

                if (AST.isPrimitive(rhsA) && AST.isPrimitive(rhsB) && AST.getPrimitiveValue(rhsA) === AST.getPrimitiveValue(rhsB)) {
                  // This is one of these, or with if/else swapped:
                  // `let x = 1; while (true) { if ($) { ...; break; } else { ...; x = 1; } }`
                  // `x = 1; while (true) { if ($) { ...; break; } else { ...; x = 1; } }`
                  //TODO
                }
                else if (AST.isRegexLiteral(rhsA) && AST.isRegexLiteral(rhsB) && AST.isSameRegexLiteral(rhsA, rhsB)) {
                  rule('A loop with a decl/assign before and matching assign of regex in tail position of a tail-If in the While can rotate-merge');
                  example(
                    'let x = /xyz/g; while (true) { if ($) { f(x); break; } else { g(x); x = /xyz/g; } }',
                    '; while (true) { x = /xyz/g; if ($) { f(x); break; } else { g(x); } }',
                  );
                  example(
                    'x = /xyz/g; while (true) { if ($) { f(x); break; } else { g(x); x = /xyz/g; } }',
                    '; while (true) { x = /xyz/g; if ($) { f(x); break; } else { g(x); } }',
                  );
                  before(body[i - 1]);
                  before(body[i]);

                  if (toMatchKind1 === 'var') {
                    body[i - 1].init = AST.identifier('undefined');
                  } else {
                    // Remove the assignment. The rotate assignment will do the identical thing.
                    body[i - 1] = AST.emptyStatement();
                  }

                  // Rotate; last statement of If becomes first of While
                  if (fromBranch) {
                    node.body.body.unshift(ifStmt.consequent.body.pop());
                  } else {
                    node.body.body.unshift(ifStmt.alternate.body.pop());
                  }

                  after(body[i - 1]);
                  after(body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
                else if (
                  rhsA.type === 'CallExpression' &&
                  rhsB.type === 'CallExpression' &&
                  rhsA.callee.type === 'Identifier' && rhsB.callee.type === 'Identifier' &&
                  AST.isSameCallExpression(rhsA, rhsB) // Gets gnarly with argument checks, spread, etc
                ) {
                  // Note: in this case we must eliminate the pre-loop call because that's observable
                  rule('A loop with a decl/assign before and matching assign of call in tail position can rotate-merge');
                  example(
                    'let x = f(); while (true) { if ($) { h(x); break; } else { g(x); x = f(); } }',
                    'let x = undefined; while (true) { x = f(); if ($) { h(x); break; } else { g(x); } }',
                  );
                  example(
                    'x = f(); while (true) { if ($) { h(x); break; } else { g(x); x = f(); } }',
                    '; while (true) { x = f(); if ($) { h(x); break; } else { g(x); } }',
                  );
                  before(body[i - 1]);
                  before(body[i]);

                  // Must eliminate the initial call here
                  if (toMatchKind1 === 'var') {
                    body[i - 1].init = AST.identifier('undefined');
                  } else {
                    body[i - 1] = AST.emptyStatement();
                  }

                  // Rotate; last statement of If becomes first of While
                  if (fromBranch) {
                    node.body.body.unshift(ifStmt.consequent.body.pop());
                  } else {
                    node.body.body.unshift(ifStmt.alternate.body.pop());
                  }

                  after(body[i - 1]);
                  after(body[i]);
                  assertNoDupeNodes(AST.blockStatement(body), 'body');
                  return true;
                }
              }
            }
          }
        }
      }
    }

    if (!node.$p.hasUnlabeledBreak && i < body.length - 1) {
      const next = body[i + 1];
      if (next?.type !== 'ReturnStatement') {
        vlog('This loop has no unlabeled breaks so code flow can not continue to the next statement. The rest of the parent block is unreachable.');
        rule('A while with no unlabeled break means the next sibling statements can not be reached and must be dropped');
        example('while (true) { f(); } g();', 'while (true) { f(); }');
        before(body);

        body.length = i + 1;

        after(body);
        return true;
      } else if (next && (next.argument?.type !== 'Identifier' || next.argument.name !== 'undefined')) {
        // In the end, I prefer a `return undefined` over a `throw <data>` so let's aim for that.
        rule('If the statement after an infinite loop is a return then it must return undefined');
        example('function f(){ while (true) {} return foo; }', 'function f(){ while (true) {} return undefined; }');
        before(next);

        next.argument = AST.identifier('undefined');

        after(next);
        return true;
      }
    }


    // Perf hack: this targets a specific obfuscation pattern. Preval can do this with loop unrolling but it's terribly slow.
    // This only works against a rather specific sort of obfuscation transform. But for that one, it's very efficient :)
    // First we need to verify the pattern; a loop that ends in an If where one branch breaks and the other "pumps" (arr.push(arr.shift))
    // Next we need to verify that the thing being pumped is in fact an array literal, declared immediately before the loop, and
    // that nothing may have mutated it before entering the loop. Next we need to verify all other statements inside the loop:
    // - only consts
    // - only refers to the loop or to variables declared in the loop as well (we may relax this rule to some degree)
    // - all operations are predictable in nature and we can resolve them without using eval
    // The array also needs to conform:
    // - the array reference is only pumped or accessed with a num literal property (inside the loop)
    // - the array literal only contains primitives
    // (This set of restrictions is easily defeated but that's not very relevant)

    // Note: while parent must have at least two statements for this to match
    const last = whileBody.length > 1 && whileBody[whileBody.length - 1];
    const arrRefKind = last?.type === 'IfStatement' && (isPumpBreak(last.consequent, last.alternate) || isPumpBreak(last.alternate, last.consequent));
    if (arrRefKind) {
      const { ref: arrName, kind: pumpKind } = arrRefKind;

      let finished = false;
      // We have a loop that ends with a pump-breaking (on arrName) If. Go time!
      // Confirm whether arrName is an array literal, invariably created and untouched before the loop
      // TODO: search further than one statement and in parent nodes (like across labels etc)

      function safeToSkip(node) {
        vlog('safeToSkip?', node.type, node.init?.type);
        return (
          node.type === 'VarStatement' && (
            ['ArrayExpression', 'FunctionExpression', 'ObjectExpression'].includes(node.init.type) ||
            AST.isPrimitive(node.init)
          )
        );
      }

      function isTargetArray(node) {
        return (
          node?.type === 'VarStatement' &&
          node.id.name === arrName &&
          node.init.type === 'ArrayExpression'
        );
      }

      let changed = false;

      // Try to find target array, skip noop declarations on same level
      let prev = false;
      let index = i;
      while (--index >= 0) {
        const now = body[index];
        if (isTargetArray(now)) {
          prev = now;
          break;
        }
        if (!safeToSkip(now)) {
          break;
        }
      }

      let n = 0;
      vgroup(`Have a loop @${node.$p.pid} that pumps`, arrName, 'with', pumpKind, '..., a prev stmt:', prev?.type, 'declaring', prev?.id?.name, 'with init', prev?.init?.type);

      // Note: `null` means a gap, which returns `undefined`, so that's not blocking us here. Spreads do block us.
      if (prev?.type !== 'VarStatement') {
        vlog('Unable to find array literal, no decl, bailing');
      }
      else if (prev.id.name !== arrName) {
        vlog('Unable to find array literal, decl is not var, bailing');
      }
      else if (prev.id.name !== arrName) {
        vlog('Unable to find array literal, var is not an array, bailing');
      }
      // Note: `null` means a gap, which returns `undefined`, so that's not blocking us here. Spreads do block us.
      else if (!prev.init.elements.every(enode => !enode || AST.isPrimitive(enode))) {
        vlog('Array literal is not only primitives, bailing');
      }
      else {
        const arrNode = prev.init;
        vlog('Pump loop has primitive array @', +arrNode.$p.pid);
        // Okay, prev creates an array and it only contains primitives
        // Now we must verify the other statements in the loop. Each must be easy to reason about and stay "local".
        const localNames = new Map; // Remember names that were declared so we can easily verify that they were created inside the loop
        if (
          whileBody.slice(0, -1).every(stmt => {
            vlog('-', stmt.type, stmt.id?.name, '=', stmt.init?.type);
            if (stmt.type !== 'VarStatement') {
              // Probably can include some other things; TODO
              vlog('bail; Found a non-binding', stmt.type);
              return false;
            }
            vlog('Found local binding:', stmt.id.name);
            localNames.set(stmt.id.name, undefined);
            const expr = stmt.init;
            // The expr can be one of: array property access, binary expression, unary expression, calling parseInt
            if (expr.type === 'MemberExpression') {
              // Is this `arr[123]` ? Ignore anything else for now.
              const b = expr.object.type === 'Identifier' && expr.object.name === arrName && expr.computed && AST.isNumberLiteral(expr.property);
              ;
              if (!b) vlog('bail; Found bad member expression');
              return b;
            }
            if (expr.type === 'BinaryExpression') {
              // I don't think it really matters what the operator is as long as the operands are local values or primitives none of them can spy/fail
              const b = (
                ((expr.left.type === 'Identifier' && localNames.has(expr.left.name)) || AST.isPrimitive(expr.left)) &&
                ((expr.right.type === 'Identifier' && localNames.has(expr.right.name)) || AST.isPrimitive(expr.right))
              );
              if (!b) vlog('bail; Found bad binary expression', expr.left.type, expr.operator, expr.right.type);
              return b;
            }
            if (expr.type === 'UnaryExpression') {
              // In particular, exclude `delete` here. The rest should be fine as long as the arg is local or primitive
              const b = ['typeof', '-', '+', '~', '!'].includes(expr.operator) && (expr.argument.type === 'Identifier' && localNames.has(expr.argument.name)) || AST.isPrimitive(expr.argument);
              if (!b) vlog('bail; Found bad unary expression', expr.operator, expr.argument.type);
              return b;
            }
            if (expr.type === 'CallExpression') {
              // Only allow known functions here to be called and only with local or primitive arguments
              // TODO: expand list of known function names to allow
              const b = (
                expr.callee.type === 'Identifier' &&
                [
                  '$',
                  'parseInt',
                  symbo('Number', 'parseInt'),
                  'parseFloat',
                  symbo('Number', 'parseFloat'),
                  'isNaN',
                  symbo('Number', 'isNaN'),
                  'isFinite',
                  symbo('Number', 'isFinite'),
                  symbo('Number', 'isInteger'),
                  symbo('Number', 'isSafeInteger'),
                ].includes(expr.callee.name) &&
                expr.arguments.every(arg => (arg.type === 'Identifier' && localNames.has(arg.name)) || AST.isPrimitive(arg))
              );
              if (!b) vlog('bail; Found bad call expression');
              return b;
            }

            // TODO: what else can/should we support here?
            vlog('bail; While body had an expression that did not meet this pattern, bailing... type=', expr.type);
            return false;
          }) &&
          // Assert that the final If-test uses a variable that was declared inside the loop as well
          last.test.type === 'Identifier' &&
          localNames.has(last.test.name)
        ) {
          // While body conforms too. This should be the pattern! The crowd goes wiiiiild!
          assertNoDupeNodes(AST.blockStatement(body), 'body');

          // Compile a list of operations that we can apply here and now without using eval
          // Note that the vars stored in `localNames` are defined in order so we don't have
          // to worry about the initial value being read before being declared. Even when looping.

          const steps = whileBody.map(stmt => {
            if (stmt.type === 'VarStatement') {
              const lhs = stmt.id.name;
              const expr = stmt.init;
              if (expr.type === 'MemberExpression') {
                // Is this `arr[123]` ? Ignore anything else for now.
                return { action: 'arr', lhs, index: AST.getPrimitiveValue(expr.property) };
              }
              if (expr.type === 'BinaryExpression') {
                // I don't think it really matters what the operator is as long as the operands are local values or primitives none of them can spy/fail
                return { action: 'bin', lhs, a: expr.left, op: expr.operator, b: expr.right };
              }
              if (expr.type === 'UnaryExpression') {
                return { action: 'una', lhs, arg: expr.argument, op: expr.operator };
              }
              if (expr.type === 'CallExpression') {
                return { action: 'call', lhs, func: expr.callee.name, args: expr.arguments };
              }
              ASSERT(false, 'FIXME', expr);
            }
            else if (stmt.type === 'IfStatement') {
              ASSERT(stmt === last, 'no other ifs, right?');
              if (last.consequent.body.length === 1) {
                return { action: 'ifnotpump', test: last.test.name, kind: pumpKind };
              } else {
                return { action: 'ifpump', test: last.test.name, kind: last.consequent.body[0].init.callee.property.name };
              }
            }
            else {
              ASSERT(false, 'FIXME?', stmt);
            }
          });

          vlog('Run mini interpreter on', steps.length, 'steps and pump the array');

          // TODO: somehow don't do this over and over again... and make the loop counter configurable
          for (n = 0; n < 500; ++n) {
            steps.forEach(step => {
              if (step.action === 'arr') {
                localNames.set(step.lhs, arrNode.elements[step.index] ? AST.getPrimitiveValue(arrNode.elements[step.index]) : undefined);
              }
              else if (step.action === 'bin') {
                const a = AST.isPrimitive(step.a) ? AST.getPrimitiveValue(step.a) : localNames.get(step.a.name);
                const b = AST.isPrimitive(step.b) ? AST.getPrimitiveValue(step.b) : localNames.get(step.b.name);
                if (step.op === '+') {
                  localNames.set(step.lhs, a + b);
                } else if (step.op === '-') {
                  localNames.set(step.lhs, a - b);
                } else if (step.op === '/') {
                  localNames.set(step.lhs, a / b);
                } else if (step.op === '*') {
                  localNames.set(step.lhs, a * b);
                } else if (step.op === '%') {
                  localNames.set(step.lhs, a % b);
                } else if (step.op === '&') {
                  localNames.set(step.lhs, a & b);
                } else if (step.op === '|') {
                  localNames.set(step.lhs, a | b);
                } else if (step.op === '^') {
                  localNames.set(step.lhs, a ^ b);
                } else if (step.op === '===') {
                  localNames.set(step.lhs, a === b);
                } else if (step.op === '!==') {
                  localNames.set(step.lhs, a !== b);
                } else if (step.op === '==') {
                  localNames.set(step.lhs, a == b);
                } else if (step.op === '!=') {
                  localNames.set(step.lhs, a != b);
                } else if (step.op === '<=') {
                  localNames.set(step.lhs, a <= b);
                } else if (step.op === '>=') {
                  localNames.set(step.lhs, a >= b);
                } else if (step.op === '<') {
                  localNames.set(step.lhs, a < b);
                } else if (step.op === '>') {
                  localNames.set(step.lhs, a > b);
                } else {
                  ASSERT(false, 'add me, op=', step.op);
                }
              }
              else if (step.action === 'una') {
                const arg = AST.isPrimitive(step.arg) ? AST.getPrimitiveValue(step.arg) : localNames.get(step.arg.name);
                if (step.op === '+') {
                  localNames.set(step.lhs, +arg);
                } else if (step.op === '-') {
                  localNames.set(step.lhs, -arg);
                } else if (step.op === '~') {
                  localNames.set(step.lhs, ~arg);
                } else if (step.op === '!') {
                  localNames.set(step.lhs, !arg);
                } else if (step.op === 'typeof') {
                  localNames.set(step.lhs, typeof arg);
                } else {
                  ASSERT(false, 'add me, op=', step.op);
                }
              }
              else if (step.action === 'call') {
                if (step.func === 'parseInt' || step.func === symbo('Number', 'parseInt')) {
                  localNames.set(step.lhs, parseInt(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === 'parseFloat' || step.func === symbo('Number', 'parseFloat')) {
                  localNames.set(step.lhs, parseFloat(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === 'isNaN' || step.func === symbo('Number', 'isNaN')) {
                  localNames.set(step.lhs, isNaN(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === 'isFinite' || step.func === symbo('Number', 'isFinite')) {
                  localNames.set(step.lhs, isFinite(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === symbo('Number', 'isNumber')) {
                  localNames.set(step.lhs, Number.isNumber(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === symbo('Number', 'isSafeNumber')) {
                  localNames.set(step.lhs, Number.isSafeNumber(...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else if (step.func === '$') { // My test hack. Or jquery :shrug:
                  localNames.set(step.lhs, vlog('$ loop', n, ':', ...step.args.map(a => (AST.isPrimitive(a) ? AST.getPrimitiveValue(a) : localNames.get(a.name)))));
                }
                else {
                  ASSERT(false, 'add me, op=', step.op);
                }
              }
              else if (step.action === 'ifpump') {
                if (localNames.get(step.test)) {
                  vlog('  ifpump');
                  if (step.kind === 'pop') {
                    arrNode.elements.unshift(arrNode.elements.pop());
                  }
                  else if (step.kind === 'shift') {
                    arrNode.elements.push(arrNode.elements.shift());
                  }
                  else {
                    ASSERT(false, 'wat', step);
                  }
                }
                else {
                  vlog('  ifend');
                  finished = true;
                }
              }
              else if (step.action === 'ifnotpump') {
                if (localNames.get(step.test)) {
                  vlog('  ifnotend');
                  finished = true;
                }
                else {
                  vlog('  ifnotpump');
                  if (step.kind === 'pop') {
                    arrNode.elements.unshift(arrNode.elements.pop());
                  }
                  else if (step.kind === 'shift') {
                    arrNode.elements.push(arrNode.elements.shift());
                  }
                  else {
                    ASSERT(false, 'wat', step);
                  }
                }
              }
              else {
                ASSERT(false, 'you forgot something', step.action);
              }
            });
            if (finished) break;
          }

          changed = true;
        } else {
          vlog(`No. While-body did not conform or if-test (${last.test.type}, "${last.test?.name}") is not an ident that is local (${localNames.has(last.test?.name)})`);
        }
      }
      vlog('end of loop, changed=', changed, ', finished=', finished, 'applied', n, 'iterations');
      vgroupEnd(); // pumping loop

      if (changed) {
        assertNoDupeNodes(AST.blockStatement(body), 'body');
      }

      if (finished) {
        body[i] = AST.emptyStatement();
        return true;
      }
    }

    return false;
  }
}

function isPumpBreak(a, b) {
  // Given two branch Blocks of an If, determine whether they match.
  // Return the supposed array ref and pump kind (shift/pop)

  // This is `if (test) { break; } else { const x = y.pop(); z.unshift(x); }`
  if (
    a.body.length === 1 &&
    a.body[0].type === 'BreakStatement' &&
    isPumpBlock(b)
  ) {
    const kind = b.body[0].init.callee.property.name;
    ASSERT(kind === 'pop' || kind === 'shift', 'plain pump kind should be one or the other...', kind, b.body[0]);
    return {
      ref: b.body[0].init.callee.object.name,
      kind,
    };
  }

  // This is `if (test) { break; } else { try { const x = y.pop(); z.unshift(x); } catch { const x = y.pop(); z.unshift(x); } }`
  if (
    a.body.length === 1 &&
    a.body[0].type === 'BreakStatement' &&
    b.body.length === 1 &&
    b.body[0].type === 'TryStatement' &&
    isPumpBlock(b.body[0].block) && isPumpBlock(b.body[0].handler.body)
  ) {
    const kind = b.body[0].block.body[0].init.callee.property.name;
    ASSERT(kind === 'pop' || kind === 'shift', 'try pump kind should be one or the other...', b.body[0].block.body[0]);
    return {
      ref: b.body[0].block.body[0].init.callee.object.name,
      kind,
    };
  }
}

function isPumpBlock(node) {
  return (
    node.body.length === 2 &&
    node.body[0].type === 'VarStatement' &&
    node.body[1].type === 'ExpressionStatement' &&
    isPump(node.body[0].init, node.body[1].expression, node.body[0].id)
  );
}

function isPump(a, b, c) {
  // Note: we're trying to confirm the pump pattern: `const c = a.shift(); b.push(c);`
  if (!(
    a.type === 'CallExpression' &&
    b.type === 'CallExpression' &&
    //c.type === 'Identifier' && // assumed
    // Confirm whether a and b are a member expression with the same object
    a.callee.type === 'MemberExpression' &&
    b.callee.type === 'MemberExpression' &&
    a.callee.object.type === 'Identifier' &&
    b.callee.object.type === 'Identifier' &&
    a.callee.object.name === b.callee.object.name &&
    !a.callee.computed &&
    !b.callee.computed &&
    // Confirm whether b uses c as an arg and no other args. Args to a are irrelevant.
    b.arguments.length === 1 &&
    b.arguments[0].type === 'Identifier' &&
    b.arguments[0].name === c.name
  )) {
    return false;
  }

  // a and b are call expressions on a non-computed member expression and the object of each refers to the same variable
  // b will push/unshift c, assuming that's the method being called here, which is what we confirm next

  if (a.callee.property.name === 'shift' && b.callee.property.name === 'push') return true;
  if (a.callee.property.name === 'pop' && b.callee.property.name === 'unshift') return true;
  return false;
}


function eliminateStatementCallWithCoerce(fdata, body, i, args, contextNode, count, c1, c2) {
  ASSERT(count <= 2);
  ASSERT(count === 0 || typeof c1 === 'string');
  ASSERT(count <= 1 || typeof c2 === 'string');
  ASSERT(count <= 2, 'more args just need to be copy/paste explicitly supported');

  // Since a spread may be an empty array, we cannot predict whether they will be used at all, so we must ignore them.
  ASSERT(args.every((anode, i) => i >= count || anode.type !== 'SpreadElement'), 'significant args can not be spread');
  ASSERT(body[i]);
  before(body[i]);

  const tmpName1 = count > 0 && createFreshVar('tmpEA1', fdata); // builtin-excessive-arg
  const tmpName2 = count > 1 && createFreshVar('tmpEA2', fdata); // builtin-excessive-arg

  const newArgNodes = args.slice(count).map((anode, ai) =>
    // Make sure `Number.isNaN(...x)` properly becomes `[...x]` and let another rule deal with that mess.
    AST.expressionStatement(
      // Make sure `Date.now(...x)` properly becomes `[...x]` and let another rule deal with that mess.
      anode.type === 'SpreadElement' ? AST.arrayExpression(anode) : anode
    )
  );
  const newNodes = [
    count > 0 && AST.varStatement('const', tmpName1, args[0] || AST.undef()),
    count > 1 && AST.varStatement('const', tmpName2, args[1] || AST.undef()),
    ...newArgNodes,
    // Context might not be used but if it is referenced we keep for tdz reasons.
    ...(contextNode ? [AST.expressionStatement(AST.cloneSimple(contextNode))] : []),
    // Do coerce last. That's when the function is actually being invoked, after reading the context, property, and args.
    count > 0 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName1), AST.primitive(c1)])),
    count > 1 && AST.expressionStatement(AST.callExpression(SYMBOL_COERCE, [AST.identifier(tmpName2), AST.primitive(c2)])),
  ].filter(Boolean);

  body.splice(i, 1, ...newNodes);

  after(body.slice(i, i + Math.max(1, newNodes.length - 1)));
}
