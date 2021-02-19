import { ASSERT, DIM, BOLD, RED, RESET, BLUE, PURPLE, YELLOW, dir, group, groupEnd, log, tmat, fmat, isProperIdent } from '../utils.mjs';
import { createFreshVar } from '../bindings.mjs';
import * as AST from '../ast.mjs';
import globals from '../globals.mjs';
import walk from '../../lib/walk.mjs';

const VERBOSE_TRACING = true;

// http://compileroptimizations.com/category/if_optimization.htm
// https://en.wikipedia.org/wiki/Loop-invariant_code_motion

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
  - for-in and for-of lhs expressions are normalized to an identifier
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
 */

// low hanging fruit: async, iterators
// next level: assignment analysis and first pass of ssa

/*
  Ideas for normalization;
  - Figure out how to get around the var-might-be-undefined problem
    - Current implementation makes our system think the var might be `undefined` when we know that's never the case
    - Should the vars we introduce be set at the first time usage instead? hmmm
    - Fixing this generically might also increase input support so there's that
  - treeshaking?
    - Not sure if this should (or can?) happen here but ESM treeshaking should be done asap. Is this too soon for it?
    - we know all the relevant bits so why not
  - all bindings have only one point of decl
    - dedupe multiple var statements for the same name
    - dedupe parameter shadows
    - implement SSA
      - I need to read up on this. IF every binding always ever only got one update, does that make our lives easier?
  - Should func decls be changed to const blabla?
    - Also not sure whether this helps us anything.
  - return early stuff versus if-elsing it out?
    - What's easier to reason about
    - Create new functions for the remainder after an early return? Does that help?
  - Remove unused `return` keywords
  - Return value of a `forEach` arg kinds of things. Return statements are ignored so it's about branching.
  - separate elimination transforms (patterns, switch) from continuous transforms that might need to be applied after other reductions
  - unused init for variabel (let x = 10; x = 20; $(x))
  - arguments (ehh)
  - seems like objects-as-statements aren't properly cleaned up (should leave spreads but remove the rest)
  - eliminate redundant labels (continue without crossing a loop boundary, break that does not need a label, or at the end of flow)
  - dce; if a loop body has abrupt endings that are not continue on all branches then the loop can be removed
  - we should be able to transform star imports to named imports. we know all the things here and the namespace is a constant.
    - check how the context is set when calling a namespace
  - default exports, do we eliminate them anyways, maybe opt-in or out to the defineProperty hack to fix the name?
  - any binary expression between two literals
  - certain binary expressions between constants, or constants and literals
  - bindings that only have writes, no reads, can be eliminated?
  - method names that are literals, probably classes and objects alike
  - if a param has more than one write, copy it as a local let immediately. this way we can assume all params to be constants... (barring magic `arguments` crap, of course)
  - if a var binding is only referenced in one scope then we can, at least, hoist it to that scope.
    - runtime analysis may be able to get us closer to an initialization but that's gonna be much harder.
  - TODO: need to get rid of the nested assignment transform that's leaving empty lets behind as a shortcut
  - TODO: assignment expression, compound assignment to property, I think the c check _can_ safely be the first check. Would eliminate some redundant vars. But those should not be a problem atm.
  - TODO: does coercion have observable side effects (that we care to support)? -> yes. valueOf and toString
  - TODO: do we properly simplify array literals with complex spreads?   
  - TODO: can we safely normalize methods as regular properties? Or are there secret bindings to take into account? Especially wrt `super` bindings.
  - TODO: how does `arguments` work with the implicit unique binding stuff??
  - TODO: I Don't think the break labeling of the switch transform is sufficient for all cases where a break may appear. What about nested in a label? I dunno.
  - TODO: func.name is already botched because I rename all idents to be unique. might help to add an option for it, or maybe support some kind of end-to-end tracking to restore the original name later. same for classes.
  - TODO: fix rounding errors somehow. may mean we dont static compute a value. but then how do we deal with it?
  - TODO: how do we static compute something like `$(1) + 2 + 3` when it splits it like `tmp = $(1) + 2, tmp + 3` ...
  - TODO: why are func decls in funcs not being hoisted? like in tests/cases/dce/fd_after_return.md
  - TODO: force update the title of tests to match the path name
*/

const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals

const FRESH = true;
const OLD = false;

function rold(desc, ...rest) {
  if (desc.slice(-1) === '"') fixme;
  log(PURPLE + 'OldRule:' + RESET + ' "' + desc + '"', ...rest);
}
function rule(desc, ...rest) {
  if (desc.slice(-1) === '"') fixme;
  log(PURPLE + 'Rule:' + RESET + ' "' + desc + '"', ...rest);
}
function example(from, to, condition) {
  if (!condition || condition()) {
    log(PURPLE + '--' + RESET + ' `' + from + '` ' + PURPLE + '-->' + RESET + ' `' + to + '`');
  }
}

function before(node, parent) {
  if (Array.isArray(node)) node.forEach((n) => before(n, parent));
  else if (VERBOSE_TRACING) {
    const parentCode = parent && (typeof node === 'string' ? node : tmat(parent).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    if (parent && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
    log(YELLOW + 'Before:' + RESET, nodeCode);
  }
}

function source(node) {
  if (Array.isArray(node)) node.forEach((n) => source(n));
  else if (VERBOSE_TRACING) log(YELLOW + 'Source:' + RESET, tmat(node));
}

function after(node, parentNode) {
  if (Array.isArray(node)) node.forEach((n) => after(n, parentNode));
  else if (VERBOSE_TRACING) {
    const parentCode = parentNode && (typeof node === 'string' ? node : tmat(parentNode).replace(/\n/g, ' '));
    const nodeCode = typeof node === 'string' ? node : tmat(node).replace(/\n/g, ' ');
    log(YELLOW + 'After :' + RESET, nodeCode);
    if (parentNode && parentCode !== nodeCode) log(DIM + 'Parent:', parentCode, RESET);
  }
}

export function phaseNormalize(fdata, fname) {
  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const ast = fdata.tenkoOutput.ast;

  function assertNoDupeNodes(node = ast, prop = 'ast') {
    // Assert AST contains no duplicate node objects
    const map = new Map();
    walk(
      (node, down, type, path) => {
        if (!node || !node.$p) return;
        if (down) {
          if (map.has(node.$p.pid)) {
            console.dir(node, { depth: null });
            console.log('previous parent:', map.get(node.$p.pid));
            console.log('current  parent:', path.nodes[path.nodes.length - 2]);
            console.log('truncated node:', node);
            ASSERT(
              false,
              'every node should appear once in the ast. if this triggers then there is a transform that is injecting the same node twice',
              node,
            );
          }
          map.set(node.$p.pid, path.nodes[path.nodes.length - 2]);
        }
      },
      node,
      prop,
    );
  }

  function createNewUniqueLabel(name) {
    let n = 0;
    if (fdata.globallyUniqueLabelRegistry.has(name)) {
      while (fdata.globallyUniqueLabelRegistry.has(name + '$' + ++n));
    }
    return n ? name + '$' + n : name;
  }

  group('\n\n\n##################################\n## phaseNormalize  ::  ' + fname + '\n##################################\n\n\n');

  let passes = 0;
  do {
    changed = false;
    // Create a new map for labels every time. Populated as we go. Label references always appear after the definition anyways.
    fdata.globallyUniqueLabelRegistry = new Map();
    // Clear usage/update lists because mutations may have affected them
    fdata.globallyUniqueNamingRegistry.forEach((meta) => ((meta.writes = []), (meta.reads = [])));
    transformProgram(ast);
    //stmt(null, 'ast', -1, ast, false, false);
    log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
    if (changed) {
      somethingChanged = true;
      log('Something changed. Running another normalization pass (' + ++passes + ')\n');
    }

    assertNoDupeNodes();
  } while (changed);

  log('After normalization:');
  log(
    '\ngloballyUniqueNamingRegistry (sans builtins):\n',
    fdata.globallyUniqueNamingRegistry.size > 50
      ? '<too many>'
      : fdata.globallyUniqueNamingRegistry.size === globals.size
      ? '<none>'
      : [...fdata.globallyUniqueNamingRegistry.keys()].filter((name) => !globals.has(name)).join(', '),
  );
  log(
    '\ngloballyUniqueLabelRegistry:\n',
    fdata.globallyUniqueLabelRegistry.size > 50
      ? '<too many>'
      : fdata.globallyUniqueLabelRegistry.size === 0
      ? '<none>'
      : [...fdata.globallyUniqueLabelRegistry.keys()].join(', '),
  );
  log();

  log('End of phaseNormalize');
  groupEnd();

  return somethingChanged;

  function findBoundNamesInVarDeclaration(node, names = []) {
    ASSERT(node.type === 'VariableDeclaration');
    ASSERT(node.declarations.length === 1, 'var decls define one binding?', node);
    const decl = node.declarations[0];
    return findBoundNamesInVarDeclarator(decl, names);
  }
  function findBoundNamesInVarDeclarator(decl, names = []) {
    if (decl.id.type === 'Identifier') {
      names.push(decl.id.name);
      return names;
    }

    ASSERT(decl.id.type === 'ObjectPattern' || decl.id.type === 'ArrayPattern', 'theres no other kind of decl..?');

    function r(node, names) {
      if (node.type === 'ObjectPattern') {
        node.properties.forEach((pnode) => {
          if (pnode.type !== 'RestElement') {
            let value = pnode.value;
            if (pnode.type === 'AssignmentPattern') {
              value = pnode.left.value;
              ASSERT(value.type !== 'RestElement', 'rest not allowed to have init');
            }
            if (value.type === 'Identifier') {
              names.push(value.name);
            } else {
              ASSERT(value.type === 'ArrayPattern' || value.type === 'ObjectPattern');
              r(value, names);
            }
          }
        });
      } else if (node.type === 'ArrayPattern') {
        node.elements.forEach((enode) => {
          if (enode.type !== 'RestElement') {
            if (enode.type === 'AssignmentPattern') {
              enode = enode.left;
              ASSERT(enode.type !== 'RestElement', 'rest not allowed to have init');
            }
            if (enode.type === 'Identifier') {
              names.push(enode.name);
            } else {
              ASSERT(enode.type === 'ArrayPattern' || enode.type === 'ObjectPattern');
              r(enode, names);
            }
          }
        });
      } else {
        ASSERT(false, 'wat', node);
      }
    }
    r(decl.id, names);

    return names;
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
    if (incNested && node.type === 'UnaryExpression' && (node.operator === '-' || node.operator === '+')) {
      // -100 (is a unary expression!)
      if (node.argument.type === 'Literal' && typeof node.argument.value === 'number') return false;
      // A little unlikely but you know
      // -NaN, +NaN, -Infinity, +Infinity
      if (node.argument.type === 'Identifier' && (node.argument.name === 'Infinity' || node.argument.name === 'NaN')) return false;
    }
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return false; // Template without expressions is a string
    if (node.type === 'ThisExpression') return false;
    if (node.type === 'Super') return false;

    return true;
  }

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
        // Object spread will actually be quite hard to emulate... Let's use something like `objPatternRest` as DSL for it.

        ASSERT(propNode.argument.type === 'Identifier', 'TODO: non ident rest keys?', propNode);

        const restName = propNode.argument.name;

        // -> `let bindingName = restHander(sourceObject, ['excluded', 'props'])`
        // -> `bindingName = restHander(sourceObject, ['excluded', 'props'])`
        newBindings.push([
          restName,
          OLD,
          AST.callExpression(BUILTIN_REST_HANDLER_NAME, [
            AST.identifier(cacheNameStack[cacheNameStack.length - 1]),
            AST.arrayExpression(node.properties.filter((n) => n !== propNode).map((n) => AST.literal(n.key.name))),
            top ? AST.literal(restName) : AST.identifier('undefined'),
          ]),
        ]);

        return;
      }

      ASSERT(propNode.key.type === 'Identifier', 'TODO: non ident keys?', propNode);

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
        const paramNameBeforeDefault = createFreshVar('objPatternBeforeDefault', fdata);
        log('  - Regular prop `' + propNode.key.name + '` with default');
        log('  - Stored into `' + paramNameBeforeDefault + '`');

        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameAfterDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('objPatternAfterDefault', fdata);
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
        const paramNameWithoutDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('objPatternNoDefault', fdata);
        cacheNameStack.push(paramNameWithoutDefault);
        log('  - Regular prop `' + propNode.key.name + '` without default');
        log('  - Stored into `' + paramNameWithoutDefault + '`');

        // Store the property in this name. It's a regular property access and the previous step should
        // be cached already. So read it from that cache.
        newBindings.push([
          paramNameWithoutDefault,
          valueNode.type === 'Identifier' ? OLD : FRESH,
          AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name),
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
      const paramNameBeforeDefault = createFreshVar('objPatternCrashTest', fdata); // Unused. Should eliminate easily.
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

    const arrSplatName = node.type === 'Identifier' ? node.name : createFreshVar('arrPatternSplat', fdata);
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
        const paramNameBeforeDefault = createFreshVar('arrPatternBeforeDefault', fdata);

        // Store this element in a local variable. If it's a leaf, use the actual
        // element name as the binding, otherwise create a fresh var for it.

        const paramNameAfterDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('arrPatternStep', fdata);
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

        const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVar('arrPatternStep', fdata);
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

  function anyBlock(block) {
    // program, body of a function, actual block statement, switch case body, try/catch/finally body
    group('anyBlock');
    const body = block.body;

    let somethingChanged = false;
    for (let i = 0; i < body.length; ++i) {
      const cnode = body[i];
      if (jumpTable(cnode, body, i, block)) {
        changed = true;
        somethingChanged = true;
        --i;
      }
    }

    groupEnd();
    log('/anyBlock', somethingChanged);
    return somethingChanged;
  }
  function jumpTable(node, body, i, parent) {
    group('jumpTable', node.type);
    ASSERT(node.type, 'nodes have types oye?', node);
    const r = _jumpTable(node, body, i, parent);
    groupEnd();
    return r;
  }
  function _jumpTable(node, body, i, parent) {
    switch (node.type) {
      case 'BlockStatement':
        return transformBlock(node, body, i, parent);
      case 'BreakStatement':
        return transformBreakStatement(node, body, i, parent);
      case 'ClassDeclaration':
        return transformClassDeclaration(node, body, i, parent);
      case 'ContinueStatement':
        return transformContinueStatement(node, body, i, parent);
      case 'DebuggerStatement':
        return false; // We could eliminate this but hwy
      case 'DoWhileStatement':
        return transformDoWhileStatement(node, body, i);
      case 'EmptyStatement': {
        rule('Drop empty statements inside a block');
        example('{;}', '{}');
        body.splice(i, 1);
        return true;
      }
      case 'ExportDefaultDeclaration':
        return transformExportDefault(node, body, i);
      case 'ExportNamedDeclaration':
        return transformExportNamedDeclaration(node, body, i);
      case 'ExpressionStatement':
        return transformExpression('statement', node.expression, body, i, node.expression);
      case 'ForStatement':
        return transformForStatement(node, body, i);
      case 'ForInStatement':
        return transformForxStatement(node, body, i, true);
      case 'ForOfStatement':
        return transformForxStatement(node, body, i, false);
      case 'FunctionDeclaration':
        return transformFunctionDeclaration(node, body, i);
      case 'IfStatement':
        return transformIfStatement(node, body, i);
      case 'ImportDeclaration':
        return transformImportDeclaration(node, body, i, parent);
      case 'LabeledStatement':
        return transformLabeledStatement(node, body, i, parent);
      case 'MethodDefinition':
        return transformMethodDefinition(node, body, i, parent);
      case 'ReturnStatement':
        return transformReturnStatement(node, body, i, parent);
      case 'SwitchStatement':
        return transformSwitchStatement(node, body, i);
      case 'ThrowStatement':
        return transformThrowStatement(node, body, i, parent);
      case 'TryStatement':
        return transformTryStatement(node, body, i, parent);
      case 'VariableDeclaration':
        return transformVariableDeclaration(node, body, i, parent);
      case 'WhileStatement':
        return transformWhileStatement(node, body, i);

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
      case 'SwitchCase':
      case 'VariableDeclarator':
      case 'WithStatement':
        throw ASSERT(false, 'these should not be visited', node, node.type);
    }

    log(RED + 'Missed stmt:', node.type, RESET);
    addme;
    return false;
  }

  function dce(body, i, desc) {
    // This should be called after an abnormal flow control (return, break, continue, or throw.
    // We have to take care about the remainder because it might introduce new binding names that we wouldn't want to eliminate
    // just yet, for the sake of analysis. Example: `if (y) x = 1; return; let x`

    const nominated = body.slice(i);
    const toKeep = nominated.filter(
      (node) => node.type === 'VariableDeclaration' || node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration',
    );
    if (i + toKeep.length + 1 === body.length) {
      // This DCE call would not eliminate anything
      return false;
    }

    rule('Dead code elimination (DCE) for code after abnormal flow abort; ' + desc);
    example('return; f();', 'return;');
    before(body.slice(i));

    body.length = i + 1;
    if (toKeep.length > 0) {
      log(
        'Restoring',
        toKeep.length,
        'nodes because they define a binding. We will need another way to eliminate them. Or replace them with an empty var decl...',
      );
      body.push(...toKeep);
    }

    after(body.slice(i));
    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }
  function transformBlock(node, body, i, parent) {
    if (node.body.length === 0) {
      rule('Empty nested blocks should be eliminated');
      example('{ f(); { } g(); }', '{ f(); g(); }');
      before(node, parent);

      const newNode = AST.emptyStatement();
      body.splice(i, 1, newNode);

      after(newNode, parent);
      return true;
    }

    if (parent.type === 'BlockStatement') {
      rule('Nested blocks should be smooshed');
      example('{ a(); { b(); } c(); }', '{ a(); b(); c(); }');
      before(node, parent);

      body.splice(i, 1, ...node.body);

      after(parent);
      return true;
    }

    if (parent.type === 'Program') {
      rule('Top level blocks should be eliminated');
      example('a(); { b(); } c();', 'a(); b(); c();');
      before(node, parent);

      body.splice(i, 1, ...node.body);

      after(parent);
      return true;
    }

    if (anyBlock(node)) {
      return true;
    }

    log(
      BLUE + 'block;returnBreakContinueThrow?' + RESET,
      node.$p.returnBreakContinueThrow ? 'yes; ' + node.$p.returnBreakContinueThrow : 'no',
    );
    parent.$p.returnBreakContinueThrow = node.$p.returnBreakContinueThrow;
    if (node.$p.returnBreakContinueThrow && body.length > i + 1) {
      if (dce(body, i, 'after block')) {
        return true;
      }
    }

    return false;
  }
  function transformBreakStatement(node, body, i, parent) {
    if (node.label) {
      ASSERT(fdata.globallyUniqueLabelRegistry.has(node.label.name));
      fdata.globallyUniqueLabelRegistry.get(node.label.name).usages.push(node);
    }

    log(BLUE + 'Marking parent (' + parent.type + ') as breaking early' + RESET);
    parent.$p.returnBreakContinueThrow = 'break';
    if (body.length > i + 1) {
      if (dce(body, i, 'after break')) {
        return true;
      }
    }
    return false;
  }
  function transformClassDeclaration(node, body, i, parent) {
    // Since classes don't hoist we may as well transform them to their expression equivalent...
    // They are not constants so they become let
    rule('Class declaration should be let expression');
    example('class x {}', 'let x = class {}');
    before(node);

    const newNode = AST.variableDeclaration(node.id.name, AST.classExpression(null, node.superClass, node.body), 'let');
    body[i] = newNode;

    after(newNode);
    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }
  function transformContinueStatement(node, body, i, parent) {
    if (node.label) {
      ASSERT(fdata.globallyUniqueLabelRegistry.has(node.label.name));
      fdata.globallyUniqueLabelRegistry.get(node.label.name).usages.push(node);
    }

    log(BLUE + 'Marking parent (' + parent.type + ') as continuing early' + RESET);
    parent.$p.returnBreakContinueThrow = 'continue';
    if (body.length > i + 1) {
      if (dce(body, i, 'after block')) {
        return true;
      }
    }

    return false;
  }
  function transformDoWhileStatement(node, body, i) {
    // We have to convert do-while to regular while because if the body contains a continue it will jump to the end
    // which means it would skip any outlined code, unless we add worse overhead.
    // So instead we had to bite the bullet

    // Would love to merge the while's into one, but how...
    // `do {} while (f());` --> `let tmp = true; while (tmp || f()) { tmp = false; }`
    // `while (f()) {}` --> `if (f()) { do {} while(f()); }`
    // `for (a(); b(); c()) d();` --> `a(); if (b()) { do { d(); c(); } while (b());`

    if (node.body.type !== 'BlockStatement') {
      rule('Do-while sub-statement must be block');
      example('do x; while(y);', 'do { x; } while(y);');
      before(node);

      const newNode = AST.blockStatement(node.body);
      node.body = newNode;

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    rule('Do-while must be regular while');
    example('do { f(); } while(g());', 'let tmp = true; while (tmp || g()) { tmp = false; g(); }');
    before(node);

    const tmpName = createFreshVar('tmpDoWhileFlag', fdata);
    const newNodes = [
      AST.variableDeclaration(tmpName, AST.tru(), 'let'),
      AST.whileStatement(
        AST.logicalExpression('||', tmpName, node.test),
        AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(tmpName, AST.fals())), ...node.body.body),
      ),
    ];
    body.splice(i, 1, ...newNodes);

    after(newNodes);
    // Byebye do-while
    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }
  function normalizeCallArgs(args, newArgs, newNodes) {
    // This is used for `new` and regular function calls
    args.forEach((anode) => {
      if (anode.type === 'SpreadElement') {
        const tmpName = createFreshVar('tmpCalleeParamSpread', fdata);
        newNodes.push(AST.variableDeclaration(tmpName, anode.argument, 'const'));
        anode.argument = AST.identifier(tmpName);
        newArgs.push(anode);
      } else {
        const tmpName = createFreshVar('tmpCalleeParam', fdata);
        newNodes.push(AST.variableDeclaration(tmpName, anode, 'const'));
        newArgs.push(AST.identifier(tmpName));
      }
    });
  }
  function transformExportDefault(node, body, i) {
    // We want to eliminate this but there are some subtle cases to keep in mind
    // Relevant thread: https://github.com/rollup/rollup/issues/2524
    // Detailed explanation: https://stackoverflow.com/questions/39276608/
    // - Named export bindings are live ("as" is not relevant)
    // - Default exports are live if they are named func/class decls, frozen otherwise
    // - tldr;
    //   - make sure not to _just_ "optimize" `export default x` to `export {x}`.
    //   - named func/class decls can be outlined but should retain their name
    //   - anonymous function being exported has func.name === 'default' ... (but at least can't be referenced locally...)
    //     - we could do `Object.defineProperty(func, 'name', {value: 'default', writable: false})` to remedy...? with opt-out. would add another reference which may prevent inlining.

    const type = node.declaration.type;
    if (type === 'FunctionDeclaration' || type === 'ClassDeclaration') {
      if (node.declaration.id) {
        // We can outline the decl safely and change to named export with identical semantics
        if (type === 'FunctionDeclaration') {
          rule('Default named function exports should be a named exports; func');
          example('export default function f(){}', 'function f(){}; export { F as default };');
        } else {
          rule('Default named class should be a named exports; class');
          example('export default class F {}', 'class F {}; export { F as default };');
        }
        before(node);

        const newNodes = [node.declaration, AST._exportNamedDeclarationFromNames(node.declaration.id.name, 'default')];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      // We can do the same for anonymous function but have to be careful that the .name is 'default'
      // Since function names are not writable, we would have to do
      // `Object.defineProperty(func, 'name', {value: 'default', writable: false})` instead. This would
      // cause the function to get another reference which may hold back other reduction rules.
      // Best course of action is probably to opt-in or out of this behavior, or to leave this particular
      // case of the default export as is. Would put the burden of support on us, not users.
      return false;
    }

    // The export is frozen, even if the exported value is an identifier. Reassign it locally to make sure that stays the same.

    rule('Default exports should be a named exports; expr');
    example('export default 10', 'tmp = 10; export {tmp as default};');
    example('export default x', 'tmp = x; export {tmp as default};');
    before(node);

    const tmpName = createFreshVar('tmpExportDefault', fdata);
    const newNodes = [
      AST.variableDeclaration(tmpName, node.declaration, 'const'),
      AST._exportNamedDeclarationFromNames(tmpName, 'default'),
    ];
    body.splice(i, 1, ...newNodes);

    after(newNodes);
    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }
  function transformExportNamedDeclaration(node, body, i) {
    // This nodes represents a bunch of exports
    // - export {x}
    // - export {x as y}
    // - export var x
    // - export let x
    // - export const x
    // - export function f(){}
    // - export class x {}
    // Normalize them to regular statements and then export them in the `export {x}` form.
    // Multiple of those are allowed and in the end we would combine them all in a different transform.
    // TODO: since exports must be unique, we should try to give exported bindings priority when creating unique globals

    const decl = node.declaration;
    if (decl) {
      log('- Decl type:', decl.type);

      if (decl.type === 'VariableDeclaration') {
        rule('Export declarations must be in specifier form');
        example('export let x = 10;', 'let x = 10; export { x };');
        before(node);

        // Collect all names declared in all bindings. Note that some might be patterns so may introduce more than one binding.
        const names = [];
        findBoundNamesInVarDeclaration(decl, names);

        // Now move the var decl to global space and replace the export with one that does `export {a,b,c}` instead
        // We shouldn't need to alias anything since the exported bindings ought to remain the same and have to
        // be unique (parser validated). This includes bindings from patterns.
        const newNodes = [
          decl, // This is the `let x = y` part
          AST._exportNamedDeclarationFromNames(names.map((id) => AST.identifier(id))),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      return false;
    }

    const specs = node.specifiers;
    ASSERT(specs, 'one or the other', node);

    specs.forEach((spec) => {
      const local = spec.local;
      ASSERT(local && local.type === 'Identifier', 'specifier locals are idents right?', node);
      log('Marking `' + local.name + '` as being used by this export');
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
        return AST.variableDeclaration(
          varInitAssignId,
          AST.assignmentExpression(lhs, expr || 'undefined', varOrAssignKind),
          varInitAssignKind,
        );
      }
      return AST.expressionStatement(AST.assignmentExpression(lhs, expr || 'undefined', varOrAssignKind));
    }
    if (kind === 'var') return AST.variableDeclaration(lhs, expr || 'undefined', varOrAssignKind);
    ASSERT(false);
  }
  function transformExpression(
    wrapKind /* statement, var, assign, export, default */,
    node,
    body,
    i,
    parentNode, // For var/assign, this is the entire node. For statement, this is the same as node. For printing with `before`
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
    // - anything else that has observable side effects that I can't think off right now
    // Anything else can be dropped.
    // All statements will make sure their expression bits are simple nodes, and abstract complex nodes to temporary / fresh
    // variables. This becomes either a variable declaration or an expression statement.
    // This means all expressions should normalize to an atomic state by recursively transforming the decl init and expression statement

    log('transformExpression:', node.type);
    ASSERT(parentNode, 'parent node?', parentNode);

    switch (node.type) {
      case 'Identifier':
        log('- name: `' + node.name + '`');
        if (wrapKind === 'statement') {
          // TODO: what about implicit globals or TDZ? This prevents a crash.

          const meta = node.name !== 'arguments' && fdata.globallyUniqueNamingRegistry.get(node.name);
          if (node.name === 'arguments' || !meta.isImplicitGlobal) {
            rule('A statement can not just be an identifier');
            example('x;', ';');
            before(node, parentNode);

            body[i] = AST.emptyStatement();

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          } else {
            log('Not eliminating this identifier statement because it is an implicit global');
          }
        }

        return false;

      case 'Literal': {
        if (wrapKind === 'statement') {
          // Even if this scoops up "use strict", it shouldn't matter since we're already in strict mode
          // There is an edge case regarding complex parameters, but that's a parse time error anyways.
          rule('A statement can not just be a literal');
          example('5;', ';');
          before(node, parentNode);

          body[i] = AST.emptyStatement();

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'FunctionExpression': {
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

        if (hoistingOnce(node)) {
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
        // Array<name, expr>
        // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
        const newBindings = [];

        transformFunctionParams(node, body, i, newBindings);

        if (newBindings.length) {
          log('Params were transformed somehow, injecting new nodes into body');
          node.body.body.unshift(...newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'))); // let because params are mutable
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        anyBlock(node.body);

        return false;
      }

      case 'CallExpression': {
        const callee = node.callee;
        const args = node.arguments;

        if (callee.type === 'MemberExpression' && callee.computed) {
          if (isProperIdent(callee.property)) {
            rule('Computed property that is a proper ident must be regular property; callee');
            example('a["x"]()', 'a.x()');
            before(callee, node);

            callee.property = AST.identifier(callee.property.value);
            callee.computed = false;

            after(callee, node);
            return true;
          }
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
              before(node, parentNode);

              const tmpNameObj = createFreshVar('tmpOptCallMemObj', fdata);
              const tmpNameProp = createFreshVar('tmpOptCallMemProp', fdata);
              const tmpNameFunc = createFreshVar('tmpOptCallMemFunc', fdata);
              const newNodes = [
                AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
                AST.variableDeclaration(tmpNameProp, callee.property, 'const'),
                AST.variableDeclaration(tmpNameFunc, AST.memberExpression(tmpNameObj, tmpNameProp, true), 'const'),
              ];
              const finalNode = AST.callExpression(AST.memberExpression(tmpNameFunc, 'call'), [
                AST.identifier(tmpNameObj), // Context
                ...args,
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
              before(node, parentNode);

              const tmpNameObj = createFreshVar('tmpOptCallMemObj', fdata);
              const tmpNameFunc = createFreshVar('tmpOptCallMemFunc', fdata);
              const newNodes = [
                AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
                AST.variableDeclaration(tmpNameFunc, AST.memberExpression(tmpNameObj, callee.property), 'const'),
              ];
              // We always need to compile to .call because we need to read the member expression before the call, which
              // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
              const finalNode = AST.callExpression(AST.memberExpression(tmpNameFunc, 'call'), [
                AST.identifier(tmpNameObj), // Context
                ...args,
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
          before(node, parentNode);

          const tmpName = createFreshVar('tmpOptCallFunc', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.conditionalExpression(
            AST.binaryExpression('==', tmpName, AST.nul()),
            'undefined',
            AST.callExpression(tmpName, [...args]),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // There are two atomic kinds of callee; ident and member expression. Anything else normalizes to ident.
        const hasComplexArg = args.some((anode) => (anode.type === 'SpreadElement' ? isComplexNode(anode.argument) : isComplexNode(anode)));

        if (callee.type === 'MemberExpression') {
          // Note: `a.b(c.d)` evaluates `a.b` before `c.d` (!)
          //       Because we need to outline complex args, and need to preserve context, we must transform
          //       to `.call` form (`tmp = a, tmp2 = a.b, tmp3 = c.d, tmp2.call(tmp, tmp3)`) and so we ought
          //       to try to be conservative here as it won't make things better. Hopefully we can easily
          //       clean those cases up later but that might not be easy as the "call" property is not
          //       guaranteed to be the builtin `call` function... ;(

          if (callee.optional) {
            // `a?.b()`, this is NOT `a.b?.()`!
            rule('Call on optional chaining property must be if-else');
            example('a()?.b()', 'tmp = a(); if (tmp) tmp.b();', () => !callee.computed);
            example('a()?.[b()]()', 'tmp = a(); if (tmp) tmp[b()]();', () => callee.computed);
            before(node, parentNode);

            const newArgs = [];
            const tmpName = createFreshVar('tmpOptMemberCallObj', fdata);
            const newNodes = [AST.variableDeclaration(tmpName, callee.object, 'const')];
            normalizeCallArgs(args, newArgs, newNodes);
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

          // If any of the params are complex then the object, and if computed the property too, must be cached as well
          // So start with the properties. If they are simple, proceed with the computed property, and otherwise the object

          if (callee.computed && hasComplexArg) {
            // At least one param node is complex. Cache them all. And the object and property too.
            // Must use call here because a.b is evaluated before the args

            rule('The arguments of a computed method call must all be simple');
            example('a()[b()](f())', 'tmp = a(), tmp2 = b(), tmp3 = tmp[tmp2], tmp4 = f(), tmp3.call(tmp2, tmp4)');
            before(node, parentNode);

            const newArgs = [];
            const tmpNameObj = createFreshVar('tmpCallCompObj', fdata);
            const tmpNameProp = createFreshVar('tmpCallCompProp', fdata);
            const tmpNameVal = createFreshVar('tmpCallCompVal', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameProp, callee.property, 'const'),
              AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, tmpNameProp, true), 'const'),
            ];
            normalizeCallArgs(args, newArgs, newNodes);
            // Do a `.call` to preserve getter order AND context
            // We always need to compile to .call because we need to read the member expression before the call, which
            // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameVal, 'call'), [AST.identifier(tmpNameObj), ...newArgs]);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (!callee.computed && hasComplexArg) {
            // At least one param node is complex. Cache them all. And the object too.

            rule('The arguments of a method call must all be simple');
            example('a().b(f())', 'tmp = a(), tmp2 = tmp.b, tmp3 = f(), tmp2.call(tmp, tmp3)');
            before(node, parentNode);

            const newArgs = [];
            const tmpNameObj = createFreshVar('tmpCallObj', fdata);
            const tmpNameVal = createFreshVar('tmpCallVal', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, callee.property), 'const'),
            ];
            normalizeCallArgs(args, newArgs, newNodes);
            // Do a `.call` to preserve getter order AND context
            // We always need to compile to .call because we need to read the member expression before the call, which
            // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameVal, 'call'), [AST.identifier(tmpNameObj), ...newArgs]);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (callee.computed && isComplexNode(callee.property)) {
            // Do computed first because that requires caching the object anyways, saving us an extra var
            rule('The property of a computed method call must be simple');
            example('a()[b()]()', 'tmp = a(), tmp2 = b(), tmp[tmp2]()');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpCallCompObj', fdata);
            const tmpNameProp = createFreshVar('tmpCallCompProp', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameProp, callee.property, 'const'),
            ];
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), args);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (isComplexNode(callee.object)) {
            ASSERT(!callee.computed || !isComplexNode(callee.property), 'If the prop is computed, it must be simple now');
            rule('The object of a method call must be simple');
            example('a().b()', 'tmp = a(), tmp.b()', () => !callee.computed);
            example('a()[b]()', 'tmp = a(), tmp[b]()', () => callee.computed);
            before(node, parentNode);

            const tmpName = createFreshVar('tmpCallObj', fdata);
            const newNodes = [AST.variableDeclaration(tmpName, callee.object, 'const')];
            const finalNode = AST.callExpression(AST.memberExpression(tmpName, callee.property, callee.computed), args);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);
            callee.object = AST.identifier(tmpName);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // Simple member expression is atomic callee. Can't break down further since the object can change the context.
          return false;
        }

        // So the callee is not a member expression.
        // First check whether any of the args are complex. In that case we must cache the callee regardless.
        // Otherwise, check if the callee is simple. If not cache just the callee.

        if (hasComplexArg) {
          // At least one param node is complex. Cache them all. And the callee too.

          rule('The arguments of a call must all be simple');
          example('a(f())', 'tmp = a(), tmp2 = f(), tmp(tmp2)', () => callee.type === 'Identifier');
          example('a()(f())', 'tmp = a(), tmp2 = f(), tmp(tmp2)', () => callee.type !== 'Identifier');
          before(node, parentNode);

          const newArgs = [];
          const tmpName = createFreshVar('tmpCallCallee', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          normalizeCallArgs(args, newArgs, newNodes);
          const finalNode = AST.callExpression(tmpName, newArgs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (isComplexNode(callee)) {
          // Calling something that is not an identifier (any other simple node would be a runtime error, but ok)

          rule('The callee of a call must all be simple or simple member expression');
          example('a()(x, y)', 'tmp = a(), tmp(x, y)');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpCallCallee', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.callExpression(tmpName, args);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Assert normalized form
        ASSERT(
          !isComplexNode(callee) ||
            (callee.type === 'MemberExpression' && !isComplexNode(callee.object) && (!callee.computed || !isComplexNode(callee.property))),
          'callee should be a simple node or simple member expression',
        );
        ASSERT(!hasComplexArg, 'all args should be simple nodes');

        return false;
      }

      case 'NewExpression': {
        // Note: the new expression is almost the same as call expression except it can't change the context so the callee must be simple

        const callee = node.callee;
        const args = node.arguments;
        const hasComplexArg = args.some((anode) => (anode.type === 'SpreadElement' ? isComplexNode(anode.argument) : isComplexNode(anode)));

        // First check whether any of the args are complex. In that case we must cache the callee regardless.
        // Otherwise, check if the callee is simple. If not cache just the callee.

        if (hasComplexArg) {
          // At least one param node is complex. Cache them all. And the callee too.

          rule('The arguments of a new must all be simple');
          example('new a(f())', 'tmp = a(), tmp2 = f(), new tmp(tmp2)', () => callee.type === 'Identifier');
          example('new (a())(f())', 'tmp = a(), tmp2 = f(), new tmp(tmp2)', () => callee.type !== 'Identifier');
          before(node, parentNode);

          const newArgs = [];
          const tmpName = createFreshVar('tmpNewCallee', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          normalizeCallArgs(args, newArgs, newNodes);
          const finalNode = AST.newExpression(tmpName, newArgs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (isComplexNode(callee)) {
          // Calling something that is not an identifier (any other simple node would be a runtime error, but ok)

          rule('The callee of a new must all be simple');
          example('new (a())(x, y)', 'tmp = a(), new tmp(x, y)');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpNewCallee', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.newExpression(tmpName, args);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Assert normalized form
        ASSERT(!isComplexNode(callee), 'new callee should be simple node now');
        ASSERT(!hasComplexArg, 'all args should be simple nodes');

        return false;
      }

      case 'MemberExpression': {
        // The object must be simple
        // If computed, the property must be simple. Check this first because in that case, the object must be cached too.

        if (node.optional) {
          // `x = a?.b` -> `let x = a; if (x != null) x = x.b; else x = undefined;`

          rule('Optional member expression should be if-else');
          example('a()?.b', 'tmp = a(), (tmp != null ? tmp.b : undefined)', () => !node.computed);
          example('a()?[b()]', 'tmp = a(), (tmp != null ? tmp[b()] : undefined)', () => node.computed);
          before(node, parentNode);

          const tmpNameObj = createFreshVar('tmpOptObj', fdata);
          const newNodes = [AST.variableDeclaration(tmpNameObj, node.object, 'const')];
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

        if (node.computed && isComplexNode(node.property)) {
          rule('Computed member expression must have simple property');
          example('a()[b()]', 'tmp = a(), tmp2 = b(), a[b]');
          before(node, parentNode);

          const tmpNameObj = createFreshVar('tmpCompObj', fdata);
          const tmpNameProp = createFreshVar('tmpCompProp', fdata);
          const newNodes = [
            AST.variableDeclaration(tmpNameObj, node.object, 'const'),
            AST.variableDeclaration(tmpNameProp, node.property, 'const'),
          ];
          const finalNode = AST.memberExpression(tmpNameObj, tmpNameProp, true);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (isComplexNode(node.object)) {
          rule('Member expression object must be simple');
          example('f().x', 'tmp = f(), tmp.x');
          before(node, parentNode);

          const tmpNameObj = createFreshVar('tmpCompObj', fdata);
          const newNodes = [AST.variableDeclaration(tmpNameObj, node.object, 'const')];
          const finalNode = AST.memberExpression(tmpNameObj, node.property, node.computed);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.computed && isProperIdent(node.property)) {
          rule('Computed property that is valid ident must be member expression; prop');
          log('- `a["foo"]` --> `a.foo`');
          log('- Name: `' + node.property.value + '`');
          before(node, parentNode);

          node.computed = false;
          node.property = AST.identifier(node.property.value);

          after(node, parentNode);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'SequenceExpression': {
        rule('Sequence statements must be series of statements');
        example('(a, b, c);', 'a; b; c;');
        before(node, parentNode);

        const newNodes = node.expressions.slice(0, -1).map((e, i) => AST.expressionStatement(e));
        const finalNode = node.expressions[node.expressions.length - 1];
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body.splice(i, 1, ...newNodes, finalParent);

        after(newNodes);
        after(finalNode, finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'AssignmentExpression': {
        const lhs = node.left;
        const rhs = node.right;
        log('-', lhs.type, node.operator, rhs.type);

        if (lhs.type === 'ObjectPattern') {
          const tmpNameRhs = createFreshVar('tmpAssignObjPatternRhs', fdata);
          const cacheNameStack = [tmpNameRhs];
          const newBindings = [];

          funcArgsWalkObjectPattern(lhs, cacheNameStack, newBindings, 'assign', true);

          if (newBindings.length) {
            rule('Assignment obj patterns not allowed');
            example('({x} = y())', 'tmp = y(), x = tmp.x, tmp');
            before(node, parentNode);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([tmpNameRhs, FRESH, rhs]);

            const newNodes = newBindings.map(([name, fresh, expr]) => {
              if (fresh) return AST.variableDeclaration(name, expr, 'const');
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
          before(node, parentNode);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (lhs.type === 'ArrayPattern') {
          const rhsTmpName = createFreshVar('arrAssignPatternRhs', fdata);
          const cacheNameStack = [rhsTmpName];
          const newBindings = [];

          funcArgsWalkArrayPattern(lhs, cacheNameStack, newBindings, 'assign');

          if (newBindings.length) {
            rule('Assignment arr patterns not allowed, non-empty');
            example('[x] = y()', '(tmp = y(), tmp1 = [...tmp], x = tmp1[0], tmp)');
            before(node, parentNode);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.
            // Final step in sequence must still be origina rhs (`a = [x] = y` will assign `y` to `a`, not `x`)

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, FRESH, rhs]);

            const newNodes = newBindings.map(([name, fresh, expr]) => {
              if (fresh) return AST.variableDeclaration(name, expr, 'const');
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
          before(node, parentNode);

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

          if (mem.computed && isProperIdent(mem.property)) {
            rule('Computed property that is valid ident must be member expression; assign rhs');
            log('- `a["foo"]` --> `a.foo`');
            log('- Name: `' + mem.property.value + '`');
            before(mem, parentNode);

            mem.computed = false;
            mem.property = AST.identifier(mem.property.value);

            after(mem, parentNode);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (mem.computed && isComplexNode(b)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rule('Assignment to computed property must have simple property node');
            example('a[b()] = c()', '(tmp = a, tmp2 = b(), tmp[tmp2] = c())');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignComMemLhsObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignComMemLhsProp', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, a, 'const'), // tmp = a()
              AST.variableDeclaration(tmpNameProp, b, 'const'), // tmp2 = b()
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

          if (isComplexNode(a)) {
            // Note: resulting node must remain assignment to member expression (because it's an assignment target)
            rule('Assignment to member expression must have simple lhs');
            example('a().b = c()', '(tmp = a(), tmp2.b = c())', () => !node.computed && node.operator === '=');
            example('a()[b()] = c()', '(tmp = a(), tmp2[b()] = c())', () => node.computed && node.operator === '=');
            example('a().b += c()', '(tmp = a(), tmp2.b += c())', () => !node.computed && node.operator !== '=');
            example('a()[b()] += c()', '(tmp = a(), tmp2[b()] += c())', () => node.computed && node.operator !== '=');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignMemLhsObj', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, a, 'const'), // tmp = a()
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
            before(node, parentNode);

            const tmpNameLhs = createFreshVar('tmpCompoundAssignLhs', fdata);
            // tmp = a.b, or tmp = a[b]
            const newNodes = [
              AST.variableDeclaration(tmpNameLhs, AST.memberExpression(AST.cloneSimple(a), AST.cloneSimple(b), mem.computed), 'const'),
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

          if (mem.computed && isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a and b must be simple at this point but c() could still mutate them so we cache them anyways
            rule('Assignment to computed property must have simple object, property expression, and rhs');
            example('a[b] = c()', 'tmp = a, tmp2 = b, tmp3 = c(), tmp[tmp2] = tmp3');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignComputedObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignComputedProp', fdata);
            const tmpNameRhs = createFreshVar('tmpAssignComputedRhs', fdata);
            ASSERT(node.operator === '=');
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, a, 'const'), // tmp = a()
              AST.variableDeclaration(tmpNameProp, b, 'const'), // tmp2 = b()
              AST.variableDeclaration(tmpNameRhs, c, 'const'), // tmp3 = c()
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

          if (!mem.computed && isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a must be simple at this point but c() could still mutate it so we cache it anyways
            rule('Assignment to member expression must have simple lhs and rhs');
            example('a.b = c()', '(tmp = a, tmp2 = c(), tmp).b = tmp2');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignMemLhsObj', fdata);
            const tmpNameRhs = createFreshVar('tmpAssignMemRhs', fdata);
            ASSERT(node.operator === '=');
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, a, 'const'), // tmp = a()
              AST.variableDeclaration(tmpNameRhs, c, 'const'), // tmp2 = c()
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
          before(node, parentNode);

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
              before(node, parentNode);

              const tmpName = createFreshVar('tmpNestedCompoundLhs', fdata);
              // tmp = b
              const newNodes = [AST.variableDeclaration(tmpName, b, 'const')];
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

            if (isComplexNode(c)) {
              // In this case, a and b are only set, so we don't need to cache even if c() would mutate
              // With simple a and ident b
              rule('The rhs.rhs of a nested assignment must be simple');
              example('a = b = c()', 'tmp = c(), a = b = tmp');
              before(node, parentNode);

              const tmpName = createFreshVar('tmpNestedComplexRhs', fdata);
              const newNodes = [AST.variableDeclaration(tmpName, c, 'const')];
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
            before(node, parentNode);

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

            if (rhsLhs.computed && isComplexNode(c)) {
              // In this case we also need to cache b first, since the execution of c may change it after the fact
              // (so we must store the value before evaluating c) but we don't have to care if calling b or c changes the
              // value of d since that would always be evaluated last.
              rule('The computed property of a nested assignment must be a simple node');
              example('a = b[c()] = d()', 'tmp = b, tmp2 = c(), a = tmp[tmp2] = d', () => rhs.operator === '=');
              example('a = b[c()] *= d()', 'tmp = b, tmp2 = c(), a = tmp[tmp2] = d', () => rhs.operator !== '=');
              before(node, parentNode);

              const tmpNameObj = createFreshVar('tmpNestedAssignComMemberObj', fdata);
              const tmpNameProp = createFreshVar('tmpNestedAssignComMemberProp', fdata);
              const newNodes = [AST.variableDeclaration(tmpNameObj, b, 'const'), AST.variableDeclaration(tmpNameProp, c, 'const')];
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

            if (isComplexNode(b)) {
              // Whether c is computed or not, it is simple (as per above check). Check if b is complex.
              rule('The object of a nested property assignment must be a simple node');
              example('a = b().c = d', 'tmp = b(), a = tmp.c = d()', () => !rhsLhs.computed);
              example('a = b()[c] = d', 'tmp = b(), a = tmp[c] = d()', () => rhsLhs.computed);
              before(node, parentNode);

              const tmpName = createFreshVar('tmpNestedAssignObj', fdata);
              const newNodes = [AST.variableDeclaration(tmpName, b, 'const')];
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
              before(node, parentNode);

              const tmpName = createFreshVar('tmpNestedPropCompoundComplexRhs', fdata);
              const newNodes = [
                AST.variableDeclaration(tmpName, AST.binaryExpression(rhs.operator.slice(0, -1), AST.cloneSimple(rhsLhs), d), 'const'),
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

            if (isComplexNode(d)) {
              // a and b.c are simple but d is not and the assignment is regular. Since this means neither a nor b.c
              // are read, we don't need to cache them and we can outline d() by itself without worrying about
              // awkward getter setter side effects. Getters dont trigger, setters retain order.

              // It's not relevant whether lhs is computed. Either way there is no other side effect to read/write
              rule('The rhs of a nested assignment to a computed property must be simple');
              example('a = b.c = d()', 'tmp = d(), a = b.c = tmp', () => !rhsLhs.computed);
              example('a = b[c] = d()', 'tmp = d(), a = b[c] = tmp', () => rhsLhs.computed);
              before(node, parentNode);

              const tmpNameRhs = createFreshVar('tmpNestedAssignPropRhs', fdata);
              const newNodes = [
                // tmp = d()
                AST.variableDeclaration(tmpNameRhs, d, 'const'),
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
              !isComplexNode(lhs) &&
                node.operator === '=' &&
                !isComplexNode(b) &&
                (!rhsLhs.computed || !isComplexNode(c)) &&
                rhs.operator === '=' &&
                !isComplexNode(d),
              'the nested assignment ought to be atomic now, apart from being nested',
            );

            {
              // We must cache d because the b.c setter may otherwise change it. Redundant steps ought to be cleaned up trivially.
              rule('Nested assignment to property where all nodes are simple must be split up');
              example('a = b.c = d', 'tmp = d, b.c = tmp, a = tmp');
              before(node, parentNode);

              const tmpName = createFreshVar('tmpNestedPropAssignRhs', fdata);
              const newNodes = [
                AST.variableDeclaration(tmpName, d, 'const'),
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
              before(node, parentNode);

              // Replace this assignment node with a sequence
              // Contents of the sequence is the stuff in newBindings. Map them into assignments.

              // First assign the current rhs to a tmp variable.
              newBindings.unshift([tmpNameRhs, FRESH, rhsRhs]);

              const newNodes = newBindings.map(([name, fresh, expr], i) => {
                if (fresh) return AST.variableDeclaration(name, expr, 'const');
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
            before(node, parentNode);

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
              before(node, parentNode);

              // Replace this assignment node with a sequence
              // Contents of the sequence is the stuff in newBindings. Map them into assignments.
              // Final step in sequence must still be origina rhs (`a = [x] = y` will assign `y` to `a`, not `x`)

              // First assign the current rhs to a tmp variable.
              newBindings.unshift([tmpNameRhs, FRESH, rhsRhs]);
              const newNodes = newBindings.map(([name, fresh, expr]) => {
                if (fresh) return AST.variableDeclaration(name, expr, 'const');
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
            before(node, parentNode);

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
          before(node, parentNode);

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
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignOptMem', fdata);
            const tmpNameVal = createFreshVar('tmpAssignOptVal', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, rhs.object, 'const'),
              AST.variableDeclaration(tmpNameVal, 'undefined', 'let'),
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

          if (rhs.computed && isComplexNode(rhs.property)) {
            rule('Assignment rhs member expression must have simple object and computed property');
            example('a = b()[c()]', 'tmp = b(), tmp2 = c(), a = tmp[tmp2]');
            before(node, parentNode);

            const tmpNameObj = createFreshVar('tmpAssignRhsCompObj', fdata);
            const tmpNameProp = createFreshVar('tmpAssignRhsCompProp', fdata);
            const newNodes = [
              // const tmp = b()
              AST.variableDeclaration(tmpNameObj, rhs.object, 'const'),
              // const tmp2 = c()
              AST.variableDeclaration(tmpNameProp, rhs.property, 'const'),
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

          if (isComplexNode(rhs.object)) {
            rule('Assignment rhs member expression must have simple object; prop already simple');
            example('a = b().c', 'tmp = b(), a = tmp.c', () => !rhs.computed);
            example('a = b()[c]', 'tmp = b(), a = tmp[c]', () => rhs.computed);
            before(node, parentNode);

            const tmpName = createFreshVar('tmpAssignRhsProp', fdata);
            // const tmp = b()
            const newNodes = [AST.variableDeclaration(tmpName, rhs.object, 'const')];
            const finalNode = AST.assignmentExpression(lhs, AST.memberExpression(tmpName, rhs.property, rhs.computed));
            // a = tmp.c
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (rhs.computed && isProperIdent(rhs.property)) {
            rule('Computed property that is valid ident must be member expression; assign rhs');
            log('- `a["foo"]` --> `a.foo`');
            log('- Name: `' + rhs.property.value + '`');
            before(rhs, parentNode);

            rhs.computed = false;
            rhs.property = AST.identifier(rhs.property.value);

            after(rhs, parentNode);
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

      case 'BinaryExpression': {
        // ** * / % + - << >> >>> < > <= >= in instanceof == != === !== & ^ |
        // Must be careful not to eliminate coercion! (triggers valueOf / toString)
        log('Operator:', node.operator);

        if (wrapKind === 'statement') {
          if (['===', '!=='].includes(node.operator)) {
            rule('Binary expression without coercion as statement must be split');
            example('a + b;', 'a; b;');
            before(node, parentNode);

            const newNodes = [AST.expressionStatement(node.left)];
            const finalNode = node.right;
            const finalParent = AST.expressionStatement(finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // TODO: if we know the lhs or rhs is of a certain kind then we can replace the expression with
          //       two individual expressions that force the coercion with that sort of literal while
          //       eliminating the dependency to each other.
        }

        if (isComplexNode(node.right)) {
          rule('Binary expression must have simple nodes; rhs is complex');
          example('a * f()', 'tmp = a, tmp2 = f(), tmp * tmp2');
          before(node, parentNode);

          const tmpNameLhs = createFreshVar('tmpBinBothLhs', fdata);
          const tmpNameRhs = createFreshVar('tmpBinBothRhs', fdata);
          const newNodes = [
            AST.variableDeclaration(tmpNameLhs, node.left, 'const'),
            AST.variableDeclaration(tmpNameRhs, node.right, 'const'),
          ];
          const finalNode = AST.binaryExpression(node.operator, tmpNameLhs, tmpNameRhs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (isComplexNode(node.left)) {
          rule('Binary expression must have simple nodes; lhs is complex');
          example('f() * a', 'tmp = f(), tmp * a');
          before(node, parentNode);

          const tmpNameLhs = createFreshVar('tmpBinLhs', fdata);
          const newNodes = [AST.variableDeclaration(tmpNameLhs, node.left, 'const')];
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

        if (
          (node.left.type === 'Literal' && node.left.value !== undefined) ||
          (node.left.type === 'Identifier' && ['NaN', 'undefined', 'Infinity'].includes(node.left.name))
        ) {
          if (
            (node.right.type === 'Literal' && node.right.value !== undefined) ||
            (node.right.type === 'Identifier' && ['NaN', 'undefined', 'Infinity'].includes(node.right.name))
          ) {
            rule('Binary operation on two builtin primitives or values should be statically resolved');
            example('1 + null', '1');
            before(node, parentNode);

            const lhs = node.left.type === 'Literal' ? node.left.value : { NaN, undefined, Infinity }[node.left.name];
            const rhs = node.right.type === 'Literal' ? node.right.value : { NaN, undefined, Infinity }[node.right.name];

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

              log('lhs:', [lhs], ', rhs:', [rhs], ', op:', [node.operator], '->', [result]);

              const finalNode =
                typeof result === 'string' || typeof result === 'boolean'
                  ? AST.literal(result)
                  : (ASSERT(typeof result === 'number'),
                    isNaN(result) ? AST.identifier('NaN') : !isFinite(result) ? AST.identifier('Infinity') : AST.literal(result));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            } catch {
              log('Operation resulted in an error so not inlining it');
            }
          }
        }

        return false;
      }

      case 'UnaryExpression': {
        // Certain operators need special more care
        // - typeof, delete, -, +, ~, void, !
        log('operator:', node.operator);

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
              before(node, parentNode);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [AST.variableDeclaration(tmpName, mem.object, 'const')];
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
              before(node, parentNode);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [
                AST.variableDeclaration(tmpName, mem.object, 'const'),
                AST.variableDeclaration(wrapLhs, AST.tru(), varOrAssignKind === 'const' ? 'let' : varOrAssignKind),
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
              before(node, parentNode);

              const tmpName = createFreshVar('tmpDeleteOpt', fdata);
              const newNodes = [AST.variableDeclaration(tmpName, mem.object, 'const')];
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
              if (isProperIdent(arg.property)) {
                rule('Computed property that is valid ident must be member expression; delete');
                log('- `a["foo"]` --> `a.foo`');
                log('- Name: `' + arg.property.value + '`');
                before(arg, parentNode);

                arg.computed = false;
                arg.property = AST.identifier(arg.property.value);

                after(arg, parentNode);
                assertNoDupeNodes(AST.blockStatement(body), 'body');
                return true;
              }

              if (isComplexNode(arg.object) || isComplexNode(arg.property)) {
                rule('Argument of delete must be simple computed member expression with simple property');
                example('delete f()[g()]', 'tmp = f(), tmp2 = g(), delete tmp[tmp2]', () => arg.computed);
                before(node, parentNode);

                const tmpNameObj = createFreshVar('tmpDeleteCompObj', fdata);
                const tmpNameProp = createFreshVar('tmpDeleteCompProp', fdata);
                const newNodes = [
                  AST.variableDeclaration(tmpNameObj, arg.object, 'const'),
                  AST.variableDeclaration(tmpNameProp, arg.property, 'const'),
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

            if (isComplexNode(arg.object)) {
              rule('Argument of delete must be simple member expression');
              example('delete f().x', 'tmp = f(), delete tmp.x');
              before(node, parentNode);

              const tmpName = createFreshVar('tmpDeleteObj', fdata);
              const newNodes = [AST.variableDeclaration(tmpName, arg.object, 'const')];
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
          before(node, parentNode);

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
          rule('Void must be replaced by a sequence');
          example('void x', 'x, undefined');
          before(node, parentNode);

          const finalNode = AST.sequenceExpression(node.argument, AST.identifier('undefined'));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalParent);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.operator === '+') {
          if (node.argument.type === 'Literal') {
            if (typeof node.argument.value === 'number') {
              rule('The `+` unary operator on a number literal is a noop');
              example('+100', '100');
              before(node, parentNode);

              const finalNode = node.argument;
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.raw === 'null') {
              rule('The `+` unary operator on a null literal is a zero');
              example('+null', '0');
              before(node, parentNode);

              const finalNode = AST.zero();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === true) {
              rule('The `+` unary operator on a true literal is a 1');
              example('+true', '1');
              before(node, parentNode);

              const finalNode = AST.one();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === false) {
              rule('The `+` unary operator on a false literal is a 0');
              example('+false', '1');
              before(node, parentNode);

              const finalNode = AST.zero();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === '') {
              rule('The `+` unary operator on an empty string literal is a 0');
              example('+""', '1');
              before(node, parentNode);

              const finalNode = AST.zero();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'Identifier') {
            if (node.argument.name === 'NaN') {
              rule('A NaN with a `+` unary is a NaN');
              example('+NaN', 'NaN');
              before(node, parentNode);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'undefined') {
              rule('An undefined with a `+` unary is a NaN');
              example('+undefined', 'NaN');
              before(node, parentNode);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'Infinity') {
              rule('A `+` on Infinity is regular Infinity');
              example('+Infinity', 'Infinity');
              before(node, parentNode);

              const finalNode = AST.identifier('Infinity');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'UnaryExpression') {
            if (['+', '-', '~'].includes(node.argument.operator)) {
              rule('Plus operator in front of +-~ operator is a noop');
              example('+-x', '-x', () => node.operator === '-');
              example('+~x', '~x', () => node.operator === '~');
              example('+(+x)', '+x', () => node.operator === '+');
              before(node, parentNode);

              const finalNode = node.argument;
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.operator === '-') {
          if (node.argument.type === 'Literal') {
            if (node.argument.raw === 'null') {
              rule('The `-` unary operator on a null literal is a _negative_ zero');
              example('+null', '0');
              before(node, parentNode);

              node.argument = AST.zero();

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === true) {
              rule('The `-` unary operator on a true literal is a -1');
              example('+true', '1');
              before(node, parentNode);

              node.argument = AST.one();

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === false) {
              rule('The `-` unary operator on a false literal is a _negative_ 0');
              example('+false', '1');
              before(node, parentNode);

              node.argument = AST.zero();

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === '') {
              rule('The `+` unary operator on an empty string literal is a _negative_ 0');
              example('+""', '1');
              before(node, parentNode);

              node.argument = AST.zero();

              after(node);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'Identifier') {
            if (node.argument.name === 'NaN') {
              rule('A NaN with a `-` unary is a NaN');
              example('+NaN', 'NaN');
              before(node, parentNode);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'undefined') {
              rule('An undefined with a `-` unary is a NaN');
              example('+undefined', 'NaN');
              before(node, parentNode);

              const finalNode = AST.identifier('NaN');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'UnaryExpression') {
            if (
              node.argument.operator === '-' &&
              node.argument.argument.type === 'Literal' &&
              typeof node.argument.argument.value === 'number'
            ) {
              // "double negative"
              // TODO: we can do the same for ~ in many cases but we'd have to be careful about 32bit boundaries
              rule('The `-` unary operator on a number literal twice is a noop');
              example('--100', '100');
              before(node, parentNode);

              const finalNode = node.argument.argument;
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.operator === '!') {
          if (node.argument.type === 'Literal') {
            if (typeof node.argument.value === 'number') {
              rule('Inverting a number should be replaced by a boolean');

              if (node.argument.value === 0) {
                example('!0', 'true');
                before(node, parentNode);

                const finalNode = AST.tru();
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body[i] = finalParent;
              } else {
                example('!1', 'false');
                before(node, parentNode);

                const finalNode = AST.fals();
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body[i] = finalParent;
              }

              after(body[i]);
              return true;
            }

            if (node.argument.raw === 'null' || node.argument.value === false) {
              if (node.argument.value === false) {
                rule('Inverting a `false` should be replaced by a `true`');
                example('!false', 'true');
              } else {
                rule('Inverting a `null` should be replaced by a `true`');
                example('!null', 'true');
              }
              before(node, parentNode);

              const finalNode = AST.tru();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }

            if (node.argument.value === true) {
              rule('Inverting a `true` should be replaced by a `false`');
              example('!true', 'false');
              before(node, parentNode);

              const finalNode = AST.fals();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }
          }

          if (node.argument.type === 'Identifier') {
            if (node.argument.name === 'NaN' || node.argument.name === 'undefined') {
              if (node.argument.name === 'NaN') {
                rule('Inverting NaN must be replaced by a true');
                example('!NaN', 'true');
              } else {
                rule('Inverting undefined must be replaced by a true');
                example('!undefined', 'true');
              }
              before(node, parentNode);

              const finalNode = AST.tru();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'Infinity') {
              rule('Inverting Infinity must be replaced by a false');
              example('!Infinity', 'false');
              before(node, parentNode);

              const finalNode = AST.fals();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'Unary') {
            // !!x
            if (node.argument.operator === '!' && node.argument.argument.type === 'Literal') {
              // "double negative" on a literal
              // TODO: we can do the same for ~ in many cases but we'd have to be careful about 32bit boundaries

              if (typeof node.argument.argument.value === 'number') {
                rule('The `-` unary operator on a number literal twice is a noop');
                example('--100', '100');
                before(node, parentNode);

                const finalNode = node.argument.argument;
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body[i] = finalParent;

                after(finalNode, finalParent);
                return true;
              }
            }

            // !-x
            if (
              node.argument.operator === '-' &&
              node.argument.argument.type === 'Literal' &&
              typeof node.argument.argument.value === 'number'
            ) {
              // TODO: we can do the same for ~
              rule('The `!` unary on a `-` unary operator on a number literal should be resolved');
              example('!-100', 'false');
              example('!-0', 'true');
              before(node, parentNode);

              const finalNode = AST.identifier(node.argument.argument.value === 0);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }

            // !typeof x
            if (node.argument.operator === 'typeof') {
              // Probably never hits a real world case but at least there's a test
              rule('Inverting the result of `typeof` always results in false');
              example('!typeof x', 'false');
              before(node, parentNode);

              const finalNode = AST.fals();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }

            // !void x
            if (node.argument.operator === 'void') {
              // Probably never hits a real world case but at least there's a test
              rule('Inverting the result of `void` always results in true');
              example('!void x', 'true');
              before(node, parentNode);

              const finalNode = AST.tru();
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              return true;
            }
          }
        }

        if (node.operator === '~') {
          if (node.argument.type === 'Literal') {
            if (typeof node.argument.value === 'number') {
              // Note: this is never a negative number because then the argument would be a unary expression
              rule('The `~` unary operator on a number literal should be resolved');
              example('~100', '-101');
              example(String(node.argument.value), String(~node.argument.value));
              before(node, parentNode);

              const result = ~node.argument.value;
              const finalNode = result < 0 ? AST.unaryExpression('-', AST.literal(-result)) : AST.literal(result);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.raw === 'null') {
              rule('The `~` unary operator on a null literal is -1');
              example('~null', '-1');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === true) {
              rule('The `~` unary operator on a true literal is -2');
              example('~true', '-2');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.literal(2));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === false) {
              rule('The `~` unary operator on a false literal is -1');
              example('+false', '-1');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value === '') {
              rule('The `~` unary operator on an empty string literal is a -1');
              example('~""', '-1');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            // TODO: we can do any literal with runtime semantics...
          }

          if (node.argument.type === 'Identifier') {
            if (node.argument.name === 'NaN') {
              rule('A NaN with a `~` unary is -1');
              example('~NaN', 'NaN');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'undefined') {
              rule('An undefined with a `~` unary is -1');
              example('~undefined', '-1');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'Infinity') {
              rule('A `~` on Infinity is -1');
              example('~Infinity', '-1');
              before(node, parentNode);

              const finalNode = AST.unaryExpression('-', AST.one());
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }
        }

        if (node.operator === 'typeof') {
          if (node.argument.type === 'Literal') {
            if (typeof node.argument.value === 'number') {
              rule('Typeof number is the string number');
              example('typeof 5', '"number"');
              before(node);

              const finalNode = AST.literal('number');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (typeof node.argument.value === 'string') {
              rule('Typeof string is the string string');
              example('typeof "foo"', '"string"');
              before(node);

              const finalNode = AST.literal('string');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (typeof node.argument.value === 'boolean') {
              rule('Typeof bool is the string boolean');
              example('typeof true', '"boolean"');
              example('typeof false', '"boolean"');
              before(node);

              const finalNode = AST.literal('boolean');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.raw === 'null') {
              rule('Typeof null is the string object');
              example('typeof null', '"object"');
              before(node);

              const finalNode = AST.literal('object');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.value instanceof RegExp) {
              rule('Typeof regex is the string object');
              example('typeof /foo/', '"object"');
              before(node);

              const finalNode = AST.literal('object');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
          }

          if (node.argument.type === 'Identifier') {
            if (node.argument.name === 'NaN') {
              rule('Typeof NaN is the string number');
              example('typeof NaN', '"number"');
              before(node, parentNode);

              const finalNode = AST.literal('number');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'undefined') {
              rule('Typeof undefined is the string undefined');
              example('typeof undefined', '"undefined"');
              before(node, parentNode);

              const finalNode = AST.literal('undefined');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }

            if (node.argument.name === 'Infinity') {
              rule('Typeof Infinity is the string number');
              example('typeof Infinity', '"number"');
              before(node, parentNode);

              const finalNode = AST.literal('number');
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body[i] = finalParent;

              after(finalNode, finalParent);
              assertNoDupeNodes(AST.blockStatement(body), 'body');
              return true;
            }
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
              before(node, parentNode);

              // Preserve the arg in case it has a side effect. Other rules may eliminate it anyways.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.literal('number');
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
              before(node, parentNode);

              // Must preserve the argument since the argument might have an effect.
              // We're not going to hash out the details here since `typeof x` is fine even if `x` doesn't actually exist while
              // something like `typeof x.y()` is an observable side effect. So just keep the arg as is and let other rules fix it.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.literal('string');
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
              before(node, parentNode);

              // Must preserve the argument since it (obviously) has an effect. The result is just always a bool.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.literal('boolean');
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
              before(node, parentNode);

              // Must preserve the argument since it (obviously) has an effect. The result is just always a bool.
              const newNodes = [AST.expressionStatement(node.argument)];
              const finalNode = AST.literal('undefined');
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
          before(node, parentNode);

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

        if (isComplexNode(node.argument)) {
          rule('Unary argument cannot be complex');
          example('!f()', 'tmp = f(), !tmp');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpUnaryArg', fdata);
          const newNodes = [AST.variableDeclaration(tmpName, node.argument, 'const')];
          const finalNode = AST.unaryExpression(node.operator, tmpName);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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
            before(node, parentNode);

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
          before(node, parentNode);

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
            before(node, parentNode);

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
          before(node, parentNode);

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
            before(node, parentNode);

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

      case 'ConditionalExpression': {
        // `a ? b : c;` -> `if (a) b; else c;`
        // `x = a ? b : c` -> `if (a) x = b; else x = c;`
        // `let x = a ? b : c` -> `let x; if (a) x = b; else x = c;`

        if (wrapKind === 'statement') {
          rule('Conditional expression statement should be if-else');
          example('a() ? b() : c();', 'if (a()) b(); else c();');
          before(node, parentNode);

          const finalParent = AST.ifStatement(node.test, AST.expressionStatement(node.consequent), AST.expressionStatement(node.alternate));
          body[i] = finalParent;

          after(finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (wrapKind === 'var') {
          rule('Conditional expression var init should be if-else');
          example('let x = a() ? b() : c();', 'let x; if (a()) x = b(); else x = c();');
          before(node, parentNode);

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
          before(node, parentNode);

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

      case 'UpdateExpression': {
        const arg = node.argument;

        ASSERT(arg.type === 'Identifier' || arg.type === 'MemberExpression', 'only two things you can update and its not patterns');
        ASSERT(
          arg.type === 'Identifier' ? !isComplexNode(arg) : true,
          'update expressions are only valid to idents and props; idents are never complex',
        );
        ASSERT(arg.type !== 'MemberExpression' || !arg.optional, 'optional chaining can not be args to update expressions');

        if (node.prefix) {
          // Easiest thing is to convert to compound assignment and let other rules handle all edge cases safely

          rule('Prefix update expression must be compound assignment');
          example('++f()[g()]', 'f()[g()] += 1', () => node.operator === '++');
          example('--f()[g()]', 'f()[g()] -= 1', () => node.operator === '--');
          before(node, parentNode);

          const finalNode = AST.assignmentExpression(arg, AST.one(), node.operator === '++' ? '+=' : '-=');
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, finalParent);

          after(finalParent);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Postfix is harder because we do need to bother saving the value first so we can return it.
        // Well ok, it's kinda simple for identifier

        if (arg.type === 'Identifier') {
          rule('Postfix ident update expression must be compound assignment that returns before-value');
          example('a++', 'tmp = a, a = a + 1, tmp', () => node.operator === '++');
          example('a--', 'tmp = a, a = a - 1, tmp', () => node.operator === '--');
          before(node, parentNode);

          const tmpName = createFreshVar('tmpPostUpdArgIdent', fdata);
          const newNodes = [
            AST.variableDeclaration(tmpName, arg.name, 'const'),
            AST.expressionStatement(
              AST.assignmentExpression(arg.name, AST.binaryExpression(node.operator === '++' ? '+' : '-', arg.name, AST.one())),
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

        // Member expression is a little trickier. Just unconditionally cache the object/prop (imlazy) and then do the same.

        ASSERT(arg.type === 'MemberExpression', 'can only update idents and props');
        if (arg.computed) {
          rule('Postfix computed prop update expression must be compound assignment that returns before-value');
          example('f()[g()]++', 'tmp = f(), tmp2 = g(), tmp3 = tmp[tmp2], tmp[tmp2] = tmp3 + 1, tmp3', () => node.operator === '++');
          example('f()[g()]--', 'tmp = f(), tmp2 = g(), tmp3 = tmp[tmp2], tmp[tmp2] = tmp3 - 1, tmp3', () => node.operator === '--');
          before(node, parentNode);

          const tmpNameObj = createFreshVar('tmpPostUpdArgComObj', fdata);
          const tmpNameProp = createFreshVar('tmpPostUpdArgComProp', fdata);
          const tmpNameVal = createFreshVar('tmpPostUpdArgComVal', fdata);
          const newNodes = [
            // tmp = f()
            AST.variableDeclaration(tmpNameObj, arg.object, 'const'),
            // tmp2 = g()
            AST.variableDeclaration(tmpNameProp, arg.property, 'const'),
            // tmp3 = tmp[tmp2]
            AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, tmpNameProp, true), 'const'),
            // tmp[tmp2] = tmp3 + 1
            AST.expressionStatement(
              AST.assignmentExpression(
                AST.memberExpression(tmpNameObj, tmpNameProp, true),
                AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNameVal, AST.one()),
              ),
            ),
          ];
          const finalNode = AST.identifier(tmpNameVal);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Slightly less complicated but we still just cache the object all the same.

        rule('Postfix prop update expression must be compound assignment that returns before-value');
        example('f().x++', 'tmp = f(), tmp3 = tmp.x, tmp.x = tmp2 + 1, tmp2', () => node.operator === '++');
        example('f().x--', 'tmp = f(), tmp3 = tmp.x, tmp.x = tmp2 - 1, tmp2', () => node.operator === '--');
        before(node, parentNode);

        const tmpNameObj = createFreshVar('tmpPostUpdArgObj', fdata);
        const tmpNameVal = createFreshVar('tmpPostUpdArgVal', fdata);

        const newNodes = [
          // tmp = f()
          AST.variableDeclaration(tmpNameObj, arg.object, 'const'),
          // tmp2 = tmp.x
          AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, AST.cloneSimple(arg.property)), 'const'),
          // tmp.x = tmp2 + 1
          AST.expressionStatement(
            AST.assignmentExpression(
              AST.memberExpression(tmpNameObj, AST.cloneSimple(arg.property)),
              AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNameVal, AST.one()),
            ),
          ),
        ];
        const finalNode = AST.identifier(tmpNameVal);
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body.splice(i, 1, ...newNodes, finalParent);

        after(newNodes);
        after(finalNode, finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'ArrayExpression': {
        let inlinedAnySpreads = false;
        for (let i = 0; i < node.elements.length; ++i) {
          const n = node.elements[i];
          if (n && n.type === 'SpreadElement') {
            if (n.argument.type === 'Literal' && typeof n.argument.value === 'string') {
              // We can splat the string into individual elements (this could be an intermediate step while inlining constants)
              // TODO: do we want to limit the length of the string here? Or doesn't matter?
              rule('Array spread on string should be individual elements');
              example('[..."xyz"];', '["x", "y", "z"];');
              before(n, node);

              node.elements.splice(i, 1, ...[...n.argument.value].map((s) => AST.literal(s)));

              after(node);
              inlinedAnySpreads = true;
              --i; // Relevant if the string is empty
            } else if (n.argument.type === 'ArrayExpression') {
              rule('Array spread on another array should be unlined');
              example('[...[1, 2 ,3]]', '[1, 2, 3]');
              before(n, node);

              node.elements.splice(i, 1, ...n.argument.elements);

              after(node);
              inlinedAnySpreads = true;
              --i;
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
          if (
            node.elements.length === 1 &&
            node.elements[0] &&
            node.elements[0].type === 'SpreadElement' &&
            !isComplexNode(node.elements[0].argument)
          ) {
            log('This is an array with only a spread with simple arg. Base case that we keep as is.');
            return false;
          }

          rule('Array statements are only allowed with one spread');
          example('[a, b()];', 'a; b();');
          example('[...a, ...b];', '[...a]; [...b];');
          before(node, parentNode);

          const newNodes = [];
          node.elements.forEach((enode) => {
            if (!enode) return;

            if (enode.type === 'SpreadElement') {
              // Replace with fresh array with one spread. Make sure the arg is simple.

              if (isComplexNode(enode.argument)) {
                const tmpName = createFreshVar('tmpArrElToSpread', fdata);
                const newNode = AST.variableDeclaration(tmpName, enode.argument, 'const');
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
          body.splice(i, 1, ...newNodes);

          after(newNodes, parentNode);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Since closures may affect binding values, we must simplify all nodes up to the last complex node
        let last = -1;
        node.elements.forEach((enode, i) => {
          if (enode) {
            if (enode.type === 'SpreadElement' ? isComplexNode(enode.argument) : isComplexNode(enode)) {
              last = i;
            }
          }
        });
        if (last >= 0) {
          rule('Elements of array literals must be simple');
          example('[a, b(), c]', 'tmp = a, tmp2 = b(), [tmp, tmp2, c]');
          before(node, parentNode);

          const newNodes = [];
          const newNames = [];
          for (let i = 0; i <= last; ++i) {
            const enode = node.elements[i];
            if (!enode) {
              // do not remove elided elements
              newNames.push([null, false]);
            } else if (enode.type === 'SpreadElement') {
              const tmpName = createFreshVar('tmpArrSpread', fdata);
              newNodes.push(AST.variableDeclaration(tmpName, enode.argument, 'const'));
              newNames.push([tmpName, true]);
            } else {
              const tmpName = createFreshVar('tmpArrElement', fdata);
              newNodes.push(AST.variableDeclaration(tmpName, enode, 'const'));
              newNames.push([tmpName, false]);
            }
          }
          const finalNode = AST.arrayExpression(
            ...newNames.map(([name, spread]) => (name === null ? null : spread ? AST.spreadElement(name) : AST.identifier(name))),
            ...node.elements.slice(last + 1),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'ObjectExpression': {
        let changes = false;
        node.properties.forEach((pnode) => {
          if (pnode.computed && isProperIdent(pnode.key)) {
            rule('Object literal computed key that is ident must be ident');
            example('{["x"]: y}', '{x: y}');
            before(node, parentNode);

            pnode.computed = false;
            pnode.key = AST.identifier(pnode.key.value);

            after(node, parentNode);
            changes = true;
          }
        });
        if (changes) return true;

        if (wrapKind === 'statement') {
          rule('Object cannot be a statement');
          example('({x: a, [y()]: b(), c, ...d()});', 'a; y(); b(); c; d();');
          before(node, parentNode);

          const finalParent = [];
          node.properties.forEach((pnode) => {
            // A property can be shorthand, computed, method, getter, setter
            // We can ignore the getter/setter/method props because functions have no observable side effects when being declared

            if (pnode.type === 'SpreadElement') {
              // TODO: needs iterable check?
              finalParent.push(pnode.argument);
            } else if (pnode.kind !== 'init' || pnode.method) {
              // Ignore. Declaring a function has no observable side effects.
            } else if (pnode.shorthand) {
              // I think this is redundant but it shouldn't matter much
              finalParent.push(pnode.key);
            } else if (pnode.computed) {
              finalParent.push(pnode.key);
              finalParent.push(pnode.value);
            } else {
              finalParent.push(pnode.value);
            }
          });
          body.splice(i, 1, ...finalParent.map((enode) => AST.expressionStatement(enode)));

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
            if (pnode.shorthand) {
              rule('Property shorthand must be regular property');
              example('{x}', '{x : x}');
              before(node, parentNode);

              pnode.shorthand = false; // Inline should be fine, right? Even if this node ends up being duplicated...?
              after(parentNode);
              // I don't think we need to mark this as changed, at least not for the sake of re-walking it.
            }

            if (pnode.type === 'SpreadElement') {
              if (isComplexNode(pnode.argument)) last = i;
            } else if (pnode.kind !== 'init' || pnode.method) {
              // Ignore. Declaring a function has no observable side effects.
            } else if ((pnode.computed && isComplexNode(pnode.key)) || isComplexNode(pnode.value)) {
              last = i;
            }
          });

          if (last >= 0) {
            rule('Properties of object literals must be simple');
            example('{x: a, y: b(), z: c}', 'tmp = a, tmp2 = b(), {x: tmp, y: tmp2, z: c}');
            before(node, parentNode);

            const newNodes = [];
            const newProps = [];
            for (let i = 0; i <= last; ++i) {
              const pnode = node.properties[i];

              if (pnode.type === 'SpreadElement') {
                const tmpName = createFreshVar('tmpObjSpread', fdata);
                newNodes.push(AST.variableDeclaration(tmpName, pnode.argument, 'const'));
                newProps.push(AST.spreadElement(tmpName));
              } else if (pnode.kind !== 'init' || pnode.method) {
                // Copy getters/setters and methods as is. There's no alternative for them. Maybe methods.
                newProps.push(pnode);
              } else if (pnode.computed) {
                // Must also cache the computed property keys
                const tmpNameKey = createFreshVar('tmpObjLitPropKey', fdata);
                const tmpNameVal = createFreshVar('tmpObjLitPropVal', fdata);
                newNodes.push(AST.variableDeclaration(tmpNameKey, pnode.key, 'const'));
                newNodes.push(AST.variableDeclaration(tmpNameVal, pnode.value, 'const'));
                newProps.push(AST.property(tmpNameKey, tmpNameVal, false, true));
              } else {
                const tmpName = createFreshVar('tmpObjLitVal', fdata);
                newNodes.push(AST.variableDeclaration(tmpName, pnode.value, 'const'));
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

          log('- Processing methods');
          node.properties.forEach((pnode, i) => {
            if (pnode.method || pnode.kind === 'get' || pnode.kind === 'set') {
              log(i, 'is a method, getter, or setter');
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

      case 'ArrowFunctionExpression': {
        if (hoistingOnce(node)) {
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.expression) {
          rule('Arrow body must be block');
          example('() => x', '() => { return x; }');
          before(node, parentNode);

          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;

          after(node, parentNode);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
        // Array<name, expr>
        // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
        const newBindings = [];

        transformFunctionParams(node, body, i, newBindings);

        if (newBindings.length) {
          log('Params were transformed somehow, injecting new nodes into body');
          node.body.body.unshift(...newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'))); // let because params are mutable
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        anyBlock(node.body);

        return false;
      }

      case 'TaggedTemplateExpression': {
        rule('Tagged templates should decompose into their runtime values');
        example("f`foo`','f(['foo'])", () => node.expressions.length === 0);
        example("f`a${1}b${2}c${3}d`','f(['a', 'b', 'c', 'd'], 1, 2, 3)`", () => node.expressions.length === 0);
        before(node, parentNode);

        const finalNode = AST.callExpression(node.tag, [
          AST.arrayExpression(node.quasi.quasis.map((templateElement) => AST.literal(templateElement.value.raw))),
          ...node.quasi.expressions,
        ]);
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body[i] = finalParent;

        after(finalParent);
        after(finalNode, finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'TemplateLiteral': {
        if (node.expressions.length === 0) {
          ASSERT(node.quasis.length === 1, 'zero expressions means exactly one "string" part');
          ASSERT(node.quasis[0].value && typeof node.quasis[0].value.raw === 'string', 'expecting this AST struct', node);

          rule('Templates without expressions must be strings');
          example('`foo`', "'foo'");
          before(node, parentNode);

          const finalNode = AST.literal(node.quasis[0].value.raw);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalParent);
          after(finalNode, finalParent);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        const newNodes = [];
        node.expressions.forEach((enode, i) => {
          if (isComplexNode(enode)) {
            if (newNodes.length === 0) {
              rule('Expressions inside a template must be simple nodes');
              example('`a${f()}b`', 'tmp = f(), `a${f()}b`');
              before(node, parentNode);
            }

            const tmpName = createFreshVar('tmpTemplateExpr', fdata);
            newNodes.push(AST.variableDeclaration(tmpName, enode, 'const'));
            node.expressions[i] = AST.identifier(tmpName);
          }
        });
        if (newNodes.length > 0) {
          body.splice(i, 0, ...newNodes);

          after(newNodes);
          after(node, parentNode); // did not replace node
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'ChainExpression': {
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

        before(node, parentNode);

        let lastObj;
        let prevObj;
        let prevComputed = false;
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
          log('-> r:', node.type, node.property ? node.property.name : node.callee.type);
          if (node.type === 'MemberExpression') {
            if (node.object.type === 'MemberExpression' || node.object.type === 'CallExpression') {
              r(node.object);
            } else {
              const tmpName = createFreshVar('tmpChainRootProp', fdata);
              log('  - Left most object will be stored in', tmpName);
              lastObj = prevObj;
              prevObj = tmpName;
              prevComputed = node.computed;
              nodes.push(AST.variableDeclaration(tmpName, node.object, 'const'));
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
              nodes.push(AST.variableDeclaration(tmpName, node.property, 'const'));
              node.property = AST.identifier(tmpName);
            }

            const tmpName = createFreshVar('tmpChainElementObject', fdata);
            log('Storing next property', node.property.name, 'in', tmpName);
            nodes.push(AST.variableDeclaration(tmpName, AST.memberExpression(prevObj, node.property, node.computed), 'const'));
            lastObj = prevObj;
            prevObj = tmpName;
            prevComputed = node.computed;
          } else if (node.type === 'CallExpression') {



            if (node.callee.type === 'MemberExpression' || node.callee.type === 'CallExpression') {
              r(node.callee);
            } else {
              const tmpName = createFreshVar('tmpChainRootCall', fdata);
              log('  - Left most callee will be stored in', tmpName);
              lastObj = prevObj;
              prevObj = tmpName;
              prevComputed = false;
              nodes.push(AST.variableDeclaration(tmpName, node.callee, 'const'));
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
            log('Storing next callee', node.callee.name, 'in', tmpName);
            // We always need to compile to .call because we need to read the member expression before the call, which
            // might trigger a getter, and we don't want to trigger a getter twice. We may choose to go with a custom func later.
            nodes.push(
              AST.variableDeclaration(
                tmpName,
                lastObj
                  ? // a?.b(1, 2, 3)  ->  b.call(a, 1, 2, 3)
                    AST.callExpression(AST.memberExpression(prevObj, 'call'), [AST.identifier(lastObj), ...node.arguments])
                  : // a(1, 2, 3)  ->  b(1, 2, 3)
                    AST.callExpression(prevObj, node.arguments),
                'const',
              ),
            );
            lastObj = prevObj;
            prevObj = tmpName;
            prevComputed = false;
          } else {
            ASSERT(false, 'eh?');
          }
        }

        log('Now processing the chain...');
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
          if (finalParentBefore.type === 'VariableDeclaration' && finalParentBefore.kind === 'const') {
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
          if (finalParent2.type === 'VariableDeclaration') {
            // This is a hack but if the node is a var decl then change it to an assignment
            // We created the decl and made sure it's the first node, initalized to undefined
            // This circumvents a nested assignment that is the init of a var decl
            finalParent2 = AST.expressionStatement(
              AST.assignmentExpression(finalParent2.declarations[0].id, finalParent2.declarations[0].init),
            );
          }
          nodes.push(finalParent2);
        } else {
          ASSERT(false);
        }

        body.splice(i, 1, ...newNodes);

        log('Chain processing done. Result:');
        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      case 'ThisExpression': {
        if (wrapKind === 'statement') {
          rule('Eliminate a this statement');
          example('this;', ';');
          before(node, parentNode);

          body[i] = AST.emptyStatement();

          after(AST.emptyStatement());
          return true;
        }
        return false;
      }

      case 'ClassExpression': {
        // Simplify extends and computed keys
        // Other rules tbd, if any

        let last = -1;
        node.body.body.forEach((pnode, i) => {
          ASSERT(pnode.type === 'MethodDefinition', 'update me if this gets extended');
          if (pnode.computed && isComplexNode(pnode.key)) {
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
            newNodes.push(AST.variableDeclaration(tmpNameSuper, node.superClass, 'const'));
            node.superClass = AST.identifier(tmpNameSuper);
          }
          for (let i = 0; i <= last; ++i) {
            const enode = node.body.body[i];
            if (enode.computed) {
              const tmpNameKey = createFreshVar('tmpClassComputedKey', fdata);
              newNodes.push(AST.variableDeclaration(tmpNameKey, enode.key, 'const'));
              enode.key = AST.identifier(tmpNameKey);
            }
          }
          body.splice(i, 0, ...newNodes);

          after([...newNodes, node]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (node.superClass && isComplexNode(node.superClass)) {
          // Since the class must be in a basic form at this point, the transforms are fairly care free.
          // Must take care that the extends value can be affected by computed member keys.
          rule('The `extends` of a class must be simple');
          example('class x extends f() {}', 'tmp = f(); class x extends tmp {}');
          before(node);

          const tmpNameSuper = createFreshVar('tmpClassSuper', fdata);
          const newNode = AST.variableDeclaration(tmpNameSuper, node.superClass, 'const');
          node.superClass = AST.identifier(tmpNameSuper);
          body.splice(i, 0, newNode);

          after(newNode);
          after(node);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        log('Processing class body..');
        anyBlock(node.body);

        // After processing, if this is a statement, drop what's left of the class
        if (wrapKind === 'statement') {
          rule('Class expressions that are statements should be outlined and dropped');
          example('(class{});', 'undefined;');
          before(node, parentNode);

          body[i] = AST.expressionStatement(AST.identifier('undefined'));

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        return false;
      }

      case 'AwaitExpression':
      case 'Directive':
      case 'MetaProperty':
      case 'MethodDefinition':
      case 'Property':
      case 'RestElement':
      case 'SpreadElement':
      case 'Super':
      case 'TemplateElement':
      case 'YieldExpression': {
        log(RED + 'Missed expr:', node.type, RESET);
        return false;
      }

      // Eliminated nodes (for assertions)
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
  function transformForStatement(node, body, i) {
    rule('Regular `for` loops must be `while`');
    example('for (a(); b(); c()) d();', '{ a(); while (b()) { d(); c(); } }');
    before(node);

    const newNode = AST.blockStatement(
      node.init ? (node.init.type === 'VariableDeclaration' ? node.init : AST.expressionStatement(node.init)) : AST.emptyStatement(),
      AST.whileStatement(
        node.test || AST.tru(),
        AST.blockStatement(node.body, node.update ? AST.expressionStatement(node.update) : AST.emptyStatement()),
      ),
    );
    body[i] = newNode;

    after(newNode);

    assertNoDupeNodes(AST.blockStatement(body), 'body');
    return true;
  }
  function transformForxStatement(node, body, i, forin) {
    // https://pvdz.ee/weblog/439
    // The rhs is evaluated first. Then the lhs. The rhs is scoped to the for-header first, if that starts with a a decl.
    // Pattern bindings complicate the transform because I want to retain the TDZ errors if the original code contains them.

    // TODO: are we happier with for-in/of normalized to `for (a in b)` or `for (let a in b)`? Either is possible.

    // Basically;
    // - if the lhs is not a decl, outline the rhs and inline the lhs if either is complex
    // - if the lhs is a decl with identifier, outline the rhs, then the decl without init, inline the assignment
    // - if the lhs is a binding decl then find all the bindings defined, outline them, move the original decl to assignment pattern inline

    // TODO: loops that are direct children of labels are significant

    if (node.left.type === 'VariableDeclaration') {
      // `for (let x in y)`
      const vardecl = node.left;
      const varid = vardecl.declarations[0].id;

      ASSERT(
        vardecl.declarations.length === 1,
        'language requires this to have exactly one binding. maybe annexb rules allow more, I forgot. in that case revisit here.',
      );
      ASSERT(
        vardecl.declarations[0].init === null,
        'the for header var decl shouldnt have an init (there is an edge case but if you are hitting that one you are just trying to hit it so kudos to you)',
      );

      if (varid.type === 'Identifier') {
        if (forin) {
          rule('Left side of for-in must not be var decl; ident case');
          example('for (let x in y) z()', '{ let tmp = y; let x; for (x in tmp) { z(); } }');
          example('for (let x in x);', '{ let tmp = x; let x; for (x in tmp); }');
        } else {
          rule('Left side of for-of must not be var decl; ident case');
          example('for (let x of y) z()', '{ let tmp = y; let x; for (x of tmp) { z(); } }');
          example('for (let x of x);', '{ let tmp = x; let x; for (x of tmp2); }');
        }
        before(node);

        const tmpNameRhs = createFreshVar(forin ? 'tmpForInDeclRhs' : 'tmpForOfDeclRhs', fdata);
        const lhsName = varid.name;
        const newNode = AST.blockStatement(
          AST.variableDeclaration(tmpNameRhs, node.right, 'const'),
          // Note: putting the bindings inside the wrapper block will allow the rhs to refer to the correct binding, not an outer one (and probably crash)
          // Note: this could be simplified if we were to traverse the whole rhs and assert that none of the bindings in the lhs were referenced ...
          AST.variableDeclaration(varid.name),
          forin ? AST.forInStatement(lhsName, tmpNameRhs, node.body) : AST.forOfStatement(lhsName, tmpNameRhs, node.body),
        );

        body[i] = newNode;

        after(newNode);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      // pattern
      if (forin) {
        rule('Left side of for-in must not be var decl');
        if (varid.type === 'ArrayPattern') {
          example('for (let [x] in y) z()', '{ let tmp = y; let x; let tmp2; for (tmp2 in tmp) { [x] = tmp2; z(); } }');
          example('for (let [x] in x);', '{ let tmp = x; let x; for ([x] in tmp2); }');
        } else {
          example('for (let {x} in y) z()', '{ let tmp = y; let x; let tmp2; for (tmp2 in tmp) { {x} = tmp2; z(); } }');
          example('for (let {x} in x);', '{ let tmp = x; let x; for ({x} in tmp2); }');
        }
      } else {
        rule('Left side of for-of must not be var decl');
        if (varid.type === 'ArrayPattern') {
          example('for (let [x] of y) z()', '{ let tmp = y; let x; let tmp2; for (tmp2 of tmp) { [x] = tmp2; z(); } }');
          example('for (let {x} of x);', '{ let tmp = x; let x; for ({x} of tmp2); }');
        } else {
          example('for (let {x} of y) z()', '{ let tmp = y; let x; let tmp2; for (tmp2 of tmp) { {x} = tmp2; z(); } }');
          example('for (let [x] of x);', '{ let tmp = x; let x; for ([x] of tmp2); }');
        }
      }
      before(node);

      ASSERT(vardecl.declarations.length === 1, 'for header var decls can only have one binding');
      ASSERT(
        vardecl.declarations[0].init === null,
        'the for header var decl shouldnt have an init (there is an edge case but if you are hitting that one you are just trying to hit it so good job)',
      );

      const tmpNameRhs = createFreshVar(forin ? 'tmpForInPatDeclRhs' : 'tmpForOfPatDeclRhs', fdata);
      const tmpNameLhs = createFreshVar(forin ? 'tmpForInPatDeclLhs' : 'tmpForOfPatDeclLhs', fdata);
      const boundNames = findBoundNamesInVarDeclaration(node.left);
      log('- Pattern bound these names:', boundNames);
      const newNode = AST.blockStatement(
        AST.variableDeclaration(tmpNameRhs, node.right, 'const'),
        AST.variableDeclaration(tmpNameLhs),
        // Note: putting the bindings inside the wrapper block will allow the rhs to refer to the correct binding, not an outer one (and probably crash)
        AST.variableDeclarationFromDeclaration(
          boundNames.map((name) => AST.variableDeclarator(name, undefined, vardecl.kind === 'const' ? 'let' : vardecl.kind)),
        ),
        forin
          ? AST.forInStatement(
              tmpNameLhs,
              tmpNameRhs,
              AST.blockStatement(
                AST.expressionStatement(AST.assignmentExpression(varid, tmpNameLhs)), // x = tmp2, or [x] = tmp2, or {x} = tmp2
                node.body,
              ),
            )
          : AST.forOfStatement(
              tmpNameLhs,
              tmpNameRhs,
              AST.blockStatement(
                AST.expressionStatement(AST.assignmentExpression(varid, tmpNameLhs)), // x = tmp2, or [x] = tmp2, or {x} = tmp2
                node.body,
              ),
            ),
      );
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (isComplexNode(node.right)) {
      if (forin) {
        rule('Right side of `for-in` without decl must be simple');
        example('for (x in y());', '{ let tmp = y(); for (x in tmp); }');
      } else {
        rule('Right side of `for-of` without decl must be simple');
        example('for (x of y());', '{ let tmp = y(); for (x of tmp); }');
      }
      before(node);

      const tmpName = createFreshVar(forin ? 'tmpForInRhs' : 'tmpForOfRhs', fdata);
      const newNode = AST.variableDeclaration(tmpName, node.right, 'const');
      body.splice(i, 0, newNode);
      node.right = AST.identifier(tmpName);

      body[i] = newNode;

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // The lhs must be a pattern, an ident, or a member expression. We want it to be an ident.
    ASSERT(
      ['Identifier', 'MemberExpression', 'ArrayPattern', 'ObjectPattern'].includes(node.left.type),
      'are there other kinds of nodes that appear here?',
      node,
    );

    if (node.left.type !== 'Identifier') {
      // Move to inside assignment and let other transforms deal with complexity
      if (forin) {
        rule('Left side of for-in must be simple');
        example(
          'for (x().prop in y) z()',
          '{ let tmp; for (tmp of y) { x().prop = tmp; z(); } }',
          () => node.left.type === 'MemberExpression' && !node.left.computed,
        );
        example(
          'for (x()[prop] in y) z()',
          '{ let tmp; for (tmp of y) { x()[prop] = tmp; z(); } }',
          () => node.left.type === 'MemberExpression' && node.left.computed,
        );
        example('for ([x] in y) z()', '{ let tmp; for (tmp of y) { [x] = tmp; z(); } }', () => node.left.type === 'ArrayPattern');
        example('for ({x} in y) z()', '{ let tmp; for (tmp of y) { {x} = tmp; z(); } }', () => node.left.type === 'ObjectPattern');
      } else {
        rule('Left side of for-of must be simple');
        example(
          'for (x().prop of y) z()',
          '{ let tmp; for (tmp of y) { x().prop = tmp; z(); } }',
          () => node.left.type === 'MemberExpression' && !node.left.computed,
        );
        example(
          'for (x()[prop] of y) z()',
          '{ let tmp; for (tmp of y) { x()[prop] = tmp; z(); } }',
          () => node.left.type === 'MemberExpression' && node.left.computed,
        );
        example('for ([x] of y) z()', '{ let tmp; for (tmp of y) { [x] = tmp; z(); } }', () => node.left.type === 'ArrayPattern');
        example('for ({x} of y) z()', '{ let tmp; for (tmp of y) { {x} = tmp; z(); } }', () => node.left.type === 'ObjectPattern');
      }
      before(node);

      const tmpName = createFreshVar(forin ? 'tmpForInLhsNode' : 'tmpForOfLhsNode', fdata);
      const newNode = AST.blockStatement(
        AST.variableDeclaration(tmpName),
        forin
          ? AST.forInStatement(
              tmpName,
              node.right,
              AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(node.left, tmpName)), node.body),
            )
          : AST.forOfStatement(
              tmpName,
              node.right,
              AST.blockStatement(AST.expressionStatement(AST.assignmentExpression(node.left, tmpName)), node.body),
            ),
      );

      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.body.type !== 'BlockStatement') {
      rule('For-in sub-statement must be block');
      example('for (x in y) z', 'for (x in y) { z }');
      before(node);

      node.body = AST.blockStatement(node.body);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    anyBlock(node.body);

    log(
      BLUE + 'forx;returnBreakContinueThrow?' + RESET,
      node.body.$p.returnBreakContinueThrow ? 'yes; ' + node.body.$p.returnBreakContinueThrow : 'no',
    );
    if (node.body.$p.returnBreakContinueThrow) {
      log(
        'The body of this loop may always return but it may never be executed so we cannot safely DCE the sibling statements that follow it, nor mark the parent as such',
      );
    }

    // TODO: there is a possibility to eliminate this loop if it has an empty body but there are still two
    //       side effects to check for; value of for-lhs after the loop and throwing over invalid for-rhs values.

    return false;
  }
  function transformFunctionParams(node, body, i, newBindings) {
    node.params.forEach((pnode, i) => {
      if (pnode.type === 'RestElement') {
        return false;
      }

      // Node to represent the cache of the current property/element step
      const cacheNameStack = [];

      // Now there's basically two states: a param with a default or without a default. The params with a default
      // have an node that is basically "boxed" into an AssignmentPattern. Put the right value on the stack and
      // continue to process the left value. Otherwise, put null on the stack and process the node itself.
      // See https://gist.github.com/pvdz/dc2c0a477cc276d1b9e6e2ddbb417135 for a brute force set of test cases
      // See https://gist.github.com/pvdz/867502f6ed2dd902d061c82e38a81181 for the hack to regenerate them
      if (pnode.type === 'AssignmentPattern') {
        rule('Func params must not have inits/defaults');
        example('function f(x = y()) {}', 'function f(tmp) { x = tmp === undefined ? y() : tmp; }');
        before({ ...node, body: AST.blockStatement(AST.expressionStatement(AST.literal('<suppressed>'))) });

        // Param defaults. Rewrite to be inside the function
        // function f(a=x){} -> function f(_a){ let a = _a === undefined ? x : a; }
        // function f(a=b, b=1){}
        //   ->
        // function f($a, $b){
        //   let a = $a === undefined ? $b : $a; // b is tdz'd, mimicking the default behavior.
        //   let b = $b === undefined ? 1 : $a;
        // }
        // The let bindings solely exist to catch reference errors thrown by default param handling
        // One small source of trouble is that params are var bindings, not let. The default behavior is special.
        // This transform would break functions that contain another var declaration for the same name.

        ASSERT(
          pnode.left.type === 'Identifier' || pnode.left.type === 'ObjectPattern' || pnode.left.type === 'ArrayPattern',
          'wat node now?',
          pnode.left,
        );
        ASSERT(!node.expression, 'expression arrows ought to be blocks by now');

        if (pnode.left.type === 'Identifier') {
          // ident param with default

          const newParamName = createFreshVar('$tdz$__' + pnode.left.name, fdata);
          cacheNameStack.push(newParamName);

          log('Replacing param default with a local variable');
          const newIdentNode = AST.identifier(newParamName);
          node.params[i] = newIdentNode;

          // Put new nodes at the start of the function body
          newBindings.push([
            pnode.left.name,
            OLD,
            // `param === undefined ? init : param`
            AST.conditionalExpression(AST.binaryExpression('===', newParamName, 'undefined'), pnode.right, newParamName),
          ]);

          return;
        }

        // pattern param with default

        // Param name to hold the object to destructure
        const newParamName = createFreshVar('$tdz$__pattern', fdata);
        cacheNameStack.push(newParamName);
        log('Replacing param default with a local variable');
        const newIdentNode = AST.identifier(newParamName);
        node.params[i] = newIdentNode;

        // Create unique var containing the initial param value after resolving default values
        const undefaultName = createFreshVar('$tdz$__pattern_after_default', fdata);
        cacheNameStack.push(undefaultName);
        log('Replacing param default with a local variable');
        const undefaultNameNode = AST.identifier(undefaultName);

        // Put new nodes at the start of the function body
        newBindings.push([
          undefaultNameNode,
          FRESH,
          // `param === undefined ? init : param`
          AST.conditionalExpression(AST.binaryExpression('===', newParamName, 'undefined'), pnode.right, newParamName),
        ]);

        // Then walk the whole pattern.
        // - At every step of the pattern create code that stores the value of that step in a tmp variable.
        // - Store the tmp var in a stack (pop it when walking out)
        // - A leaf node should be able to access the property from the binding name at the top of the stack

        if (pnode.left.type === 'ObjectPattern') {
          rule('Func params must not be object patterns');
          example('function({x}) {}', 'function(tmp) { var x = tmp.x; }');

          funcArgsWalkObjectPattern(pnode.left, cacheNameStack, newBindings, 'param');
        } else if (pnode.left.type === 'ArrayPattern') {
          rule('Func params must not be array patterns');
          example('function([x]) {}', 'function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }');

          funcArgsWalkArrayPattern(pnode.left, cacheNameStack, newBindings, 'param');
        } else {
          ASSERT(false, 'what else?', pnode.left);
        }
        return;
      }

      // Param has no default

      if (pnode.type === 'Identifier') {
        // This is already simple so nothing to do here
        log('- Ident param;', '`' + pnode.name + '`');
        return;
      }

      ASSERT(pnode.type === 'ObjectPattern' || pnode.type === 'ArrayPattern', 'wat else?', pnode);

      const newParamName = createFreshVar('tmpParamPattern', fdata);
      cacheNameStack.push(newParamName);
      log('- Replacing the pattern param with', '`' + newParamName + '`');
      // Replace the pattern with a variable that receives the whole object
      const newIdentNode = AST.identifier(newParamName);
      node.params[i] = newIdentNode;

      // Then walk the whole pattern.
      // - At every step of the pattern create code that stores the value of that step in a tmp variable.
      // - Store the tmp var in a stack (pop it when walking out)
      // - A leaf node should be able to access the property from the binding name at the top of the stack

      if (pnode.type === 'ObjectPattern') {
        rold('Func params must not be array patterns');
        log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');
        funcArgsWalkObjectPattern(pnode, cacheNameStack, newBindings, 'param');
      } else if (pnode.type === 'ArrayPattern') {
        rold('Func params must not be array patterns');
        log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');
        funcArgsWalkArrayPattern(pnode, cacheNameStack, newBindings, 'param');
      } else {
        ASSERT(false, 'dunno wat dis is', pnode);
      }
    });
  }
  function transformFunctionDeclaration(node, body, i) {
    if (hoistingOnce(node)) {
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
    // Array<name, expr>
    // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
    const newBindings = [];

    transformFunctionParams(node, body, i, newBindings);

    if (newBindings.length) {
      log('Params were transformed somehow, injecting new nodes into body');
      node.body.body.unshift(...newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'))); // let because params are mutable
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    anyBlock(node.body);

    return false;
  }
  function transformIfStatement(node, body, i) {
    if (node.test.type === 'UnaryExpression') {
      if (node.test.operator === '!') {
        // It's kind of redundant since there are plenty of cases where we'll need to deal with
        // the test in an abstracted form (like `if (!a && !b)` or smth). So maybe I'll drop this one later.
        rule('The test of an if cannot be invert');
        example('if (!x) y;', 'if (x) ; else y;', () => !node.alternate);
        example('if (!x) y; else z;', 'if (x) z; else y;', () => node.alternate);
        before(node);

        node.test = node.test.argument;
        const tmp = node.consequent;
        node.consequent = node.alternate || AST.emptyStatement();
        node.alternate = tmp;

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (
        (node.test.operator === '+' || node.test.operator === '-') &&
        node.test.argument.type === 'Literal' &&
        typeof node.test.argument.value === 'number'
      ) {
        rule('The if test of a number should be a boolean'); // Let another rule deal with it
        if (node.test.argument.value === 0) {
          // Doesn't matter whether it's +0 or -0 here. This is false now.
          example('if (-0) f();', 'if (false) f();');
          before(node);

          node.test = AST.fals();
        } else {
          example('if (-1) f();', 'if (true) f();');
          node.test = AST.tru();
        }

        after(node);
        return true;
      }
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

    if (node.alternate && node.alternate.type !== 'BlockStatement') {
      rule('Else sub-statement must be block');
      example('if (x) {} else y;', 'if (x) {} else { y; }');
      before(node);

      node.alternate = AST.blockStatement(node.alternate);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (isComplexNode(node.test)) {
      rule('If test must be simple node');
      example('if (f());', 'const tmp = f(); if (tmp);');
      before(node);

      const tmpName = createFreshVar('tmpIfTest', fdata);
      const newNode = AST.variableDeclaration(tmpName, node.test, 'const');
      body.splice(i, 0, newNode);
      node.test = AST.identifier(tmpName);

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    anyBlock(node.consequent);

    if (node.alternate) {
      anyBlock(node.alternate);

      if (node.alternate.body.length === 0) {
        rule('If-else with empty else-block should have no else');
        example('if (x) y; else {}', 'if (x) y;');
        before(node);

        node.alternate = null;

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    if (!node.alternate && node.consequent.body.length === 0) {
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

    if (node.test.type === 'Literal') {
      if (node.test.value === 0 || node.test.value === '' || node.test.value === false || node.test.raw === 'null') {
        rule('Eliminate if-else with falsy test literal');
        example('if (0) f(); else g();', 'g();', () => node.alternate);
        example('if (0) f();', ';', () => !node.alternate);
        before(node);

        const finalParent = node.alternate || AST.emptyStatement();
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      rule('Eliminate if-else with truthy test literal');
      example('if (100) f(); else g();', 'g();', () => node.alternate);
      example('if (100) f();', 'g();', () => !node.alternate);
      before(node);

      const finalParent = node.consequent;
      body[i] = finalParent;

      after(finalParent);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.test.type === 'Identifier') {
      if (['undefined', 'NaN'].includes(node.name)) {
        rule('Eliminate if-else with falsy identifier');
        example('if (false) f(); else g();', 'g();', () => node.alternate);
        example('if (false) f();', ';', () => node.alternate);
        before(node);

        const finalParent = node.alternate || AST.emptyStatement();
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (['Infinity'].includes(node.name)) {
        rule('Eliminate if-else with truthy identifier');
        example('if (Infinity) f(); else g();', 'f();', () => node.alternate);
        example('if (Infinity) f();', 'f();', () => !node.alternate);
        before(node);

        const finalParent = node.consequent;
        body[i] = finalParent;

        after(finalParent);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    log(
      BLUE + 'if;returnBreakContinueThrow?' + RESET,
      node.alternate && node.consequent.$p.returnBreakContinueThrow && node.alternate.$p.returnBreakContinueThrow
        ? 'yes; ' + node.consequent.$p.returnBreakContinueThrow + ' and ' + node.alternate.$p.returnBreakContinueThrow
        : 'no',
    );
    if (node.alternate && node.consequent.$p.returnBreakContinueThrow && node.alternate.$p.returnBreakContinueThrow) {
      // Both branches broke flow early so any statements that follow this statement are effectively dead
      node.$p.returnBreakContinueThrow = node.consequent.$p.returnBreakContinueThrow + '+' + node.alternate.$p.returnBreakContinueThrow;

      if (body.length > i + 1) {
        if (dce(body, i, 'after if-else')) {
          return true;
        }
      }
    }

    return false;
  }
  function transformImportDeclaration(node, body, i, parent) {
    if (node.specifiers.length > 1) {
      rule('Imports should have one specifier');
      example('import a, {b} from "c"', 'import a from "c"; import {b} from "c"');
      before(node);

      const newNodes = node.specifiers.map((specifier) => {
        ASSERT(node.source.type === 'Literal', 'if this changes then the below should change');
        return AST.importDeclarationFromSpecifier(specifier, node.source.value);
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
  function transformLabeledStatement(node, body, i, parent) {
    log('Label: `' + node.label.name + '`');

    // Note: if the parent changes and triggers a revisit, then the label would already have been registered
    //ASSERT(
    //  !fdata.globallyUniqueLabelRegistry.has(node.label.name),
    //  'js syntax governs that a label is unique in its own hierarchy and phase1 should make existing labels unique',
    //  node,
    //);

    if (fdata.globallyUniqueLabelRegistry.has(node.label.name)) {
      log(
        'Label was already registered. Probably artifact of re-traversal. Overwriting registry with fresh object since it ought to be scoped.',
      );
    }

    log('Registering label `' + node.label.name + '`');
    const labelMeta = {
      // ident meta data
      name: node.label.name,
      uniqueName: node.label.name,
      labelNode: {
        body,
        index: i, // Make sure to update below if the index changes
      },
      usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    };
    fdata.globallyUniqueLabelRegistry.set(node.label.name, labelMeta);

    // foo: bar
    // foo: {bar}
    // foo: while(true) continue foo;
    if (node.body.type !== 'BlockStatement') {
      if (['ForStatement', 'ForInStatement', 'ForOfStatement', 'WhileStatement', 'DoWhileStatement'].includes(node.body.type)) {
        // Do NOT force block wrapping because that may break labeled continues
        // Instead, fake the wrapper and then outline any statements

        const fakeWrapper = AST.blockStatement(node.body);
        // Now visit the block. Upon return, check if the wrapper contains exactly the same node as input.
        // If it's the same then no further changes are required. Otherwise outline any element of the wrapper
        // except the last and put them before the label. Then make the last element the body of the label.
        // And if the new body is not a block nor an iteration statement then wrap it in a block anyways.

        rule('Special label case with loop body');
        before(node);

        log('xxxxxxx1x');
        assertNoDupeNodes(fakeWrapper, 'body');
        log('yyyyyyy2y');

        const changed = anyBlock(fakeWrapper);

        log('xxxxxxxx');
        assertNoDupeNodes(fakeWrapper, 'body');
        log('yyyyyyyy');

        if (!changed) {
          after('Label body did not change at all');

          if (labelMeta.usages.length === 0) {
            log('Label was not used in any of its children. Should be safe to eliminate.');
            rule('Unused labels must be dropped; unchanged loop body');
            example('foo: {}', '{}');
            before(node);

            body[i] = node.body;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          return false;
        }

        log('After labeled statement body;');
        after(AST.labeledStatement(node.label, fakeWrapper));
        log('Now determining whether the label body changed...');

        if (fakeWrapper.body.length === 1 && fakeWrapper.body[0] === node.body) {
          log('Something changed but the node stays put');

          if (labelMeta.usages.length === 0) {
            log('Label was not used in any of its children. Should be safe to eliminate.');
            rule('Unused labels must be dropped; changed loop body');
            example('foo: {}', '{}');
            before(node);

            body[i] = node.body;

            after(body[i]);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }
          return false; // No need to change anything in this body
        }

        log('Unregistering label `' + node.label.name + '` (a) because something changed. This declaration will be visited again.');
        fdata.globallyUniqueLabelRegistry.delete(node.label.name); // This node will be revisited so remove it for now
        log('AAAAAAAA');
        assertNoDupeNodes(fakeWrapper, 'body');
        log('BBBBBBBB');

        if (fakeWrapper.body.length === 0) {
          log('The label.body node was eliminated. We can drop the label too.');
          rule('Label with empty body should be dropped');
          example('foo: {}', ';');
          before(node);

          body[i] = AST.emptyStatement();

          after(body[i]);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (fakeWrapper.body[fakeWrapper.body.length - 1] === node.body) {
          // Only outline the elements preceding the last one. We throw away the wrapper.
          log('Last statement is still original node. Outlining new nodes and keeping original labeled statement');
          body.splice(i, 0, ...fakeWrapper.body.slice(0, -1));

          after(fakeWrapper.body.slice(0, -1));
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        log('Labeled statement changed. Replacing the whole deal.');
        before(node, parent);
        // Outline every element but the last and put them in front of the label. Replace the label
        // with a new label that has the last element as a body. It's a different node now.
        const newNodes = [
          ...fakeWrapper.body.slice(0, -1),
          AST.labeledStatement(node.label, fakeWrapper.body[fakeWrapper.body.length - 1]),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      rule('The body of a label must be a block or an iteration statement');
      example('foo: if (x) y;', 'foo: { if (x) y; }');
      before(node);

      const newNode = AST.labeledStatement(node.label, AST.blockStatement(node.body));
      body.splice(i, 1, newNode);

      log('Unregistering label `' + node.label.name + '` because we added a block. This declaration will be visited again.');
      fdata.globallyUniqueLabelRegistry.delete(node.label.name); // This node will be revisited so remove it for now

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    log('label has block, noop');
    const anyChange = anyBlock(node.body);
    log('Changes?', anyChange);
    if (anyChange) {
      log('Unregistering label `' + node.label.name + '` (b) because something changed. This declaration will be visited again.');
      fdata.globallyUniqueLabelRegistry.delete(node.label.name); // This node will be revisited so remove it for now
    }

    if (node.body.type === 'BlockStatement' && node.body.body.length === 0) {
      rule('Labeled statement with empty sub statement should be dropped');
      example('foo: {}', ';');
      before(node);

      body[i] = AST.emptyStatement();

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (!anyChange && labelMeta.usages.length === 0) {
      log('Label was not used in any of its children. Should be safe to eliminate.');
      rule('Unused labels must be dropped; non-loop body');
      example('foo: {}', '{}');
      before(node);

      body[i] = node.body;

      after(body[i]);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    return anyChange;
  }
  function transformMethodDefinition(methodNode, body, i, parent) {
    // This will be an anonymous function expression.
    // For now, do the same as with functions

    ASSERT(
      methodNode.value && methodNode.value.type === 'FunctionExpression',
      'this might hold different values in the future but right now it can only be this?',
    );

    const node = methodNode.value; // function expression

    // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
    // Array<name, expr>
    // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
    const newBindings = [];

    transformFunctionParams(node, body, i, newBindings);

    if (newBindings.length) {
      log('Params were transformed somehow, injecting new nodes into body');
      // let because params are mutable
      const newNodes = newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'));
      node.body.body.unshift(...newNodes);

      after(newNodes);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    anyBlock(node.body);

    return false;
  }
  function hoistingOnce(hoistingRoot) {
    ASSERT(
      ['Program', 'FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'].includes(hoistingRoot.type),
      'hoisting should only apply to hoisting roots',
      hoistingRoot,
    );

    // There are two things in three contexts that we hoist
    // - functions and variables
    // - exports and non-exports
    // - named exports and default exports

    // The function declaration can appear in a root scope (global / func), a export default, or named export
    // The var decls can appear in scope roots, blocks, or named exports
    // So the table looks like this:
    // - func decl in global
    // - func decl in func
    // - func decl in named export
    // - func decl in default export (must have id, we ignore anon funcs)
    // - var decl in global
    // - var decl in func
    // - var decl in block
    // - var decl in named export
    // - var decl in for-loop (regular), shouldn't matter where the for is
    // - var decl in for-of / for-in loop, shouldn't matter where the for is
    // (There's a base test case for at least each of these)

    // The exports are all rewritten to named exports in the `export {X}` form
    // The default export needs to use the `{f as default}` form
    // The set of var names needs to be reduced by the name of hoisted functions
    // Actions:
    // - All vars are printed as `var x;` at the top, ordered by name
    // - All functions are moved to the top, below the hoisted var names, ordered by name
    // - All exported names are added at the bottom
    // - All var decls with inits are replaced with assignments
    // - All decls in a for-in or for-of header lhs are replaced with the .id

    const rootBody = hoistingRoot.type === 'Program' ? hoistingRoot.body : hoistingRoot.body.body;

    if (hoistingRoot.$p.hoistedVars.length) {
      // Note: the parent can be a scope root (global/func), or export (named/default)
      // hoistedVars -> Array<[node, parentNode, parentProp, parentIndex]>
      group('hoisting');
      rule('Bindings with `var` and function declarations should be pre-hoisted in AST, even if exported');
      example('f(x); var x = 10; f(x);', 'var x; f(x); x = 10; f(x);');
      example('f(x); export var x = 10; f(x);', 'var x; f(x); x = 10; f(x); export {x};');
      example('f(x); export default function f() {}; f(x);', 'function f(){} f(x); f(x); export {f as default};');

      const funcs = [];
      const names = [];
      const exportedNames = new Set();
      let exportDefault = ''; // There's at most one of these.
      hoistingRoot.$p.hoistedVars.forEach(([hoistNode, parentNode, parentProp, parentIndex, exportIndex]) => {
        rule(
          '- Hoisting step. Node is a',
          hoistNode.type,
          ', parent:',
          parentNode.type + '.' + parentProp + (parentIndex >= 0 ? '[' + parentIndex + ']' : ''),
          exportIndex >= 0 ? ', export node at global.body[' + exportIndex + ']' : '',
        );
        group();

        ASSERT(
          (parentIndex >= 0 ? parentNode[parentProp][parentIndex] : parentNode[parentProp]) === hoistNode,
          'indexes should not be stale',
        );
        ASSERT(parentNode.type.includes('Export') === exportIndex >= 0, 'export index is set iif the parent is an export');

        switch (parentNode.type) {
          case 'Program':
          case 'FunctionDeclaration':
          case 'BlockStatement': {
            if (hoistNode.type === 'FunctionDeclaration') {
              funcs.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
              // We will inject this node at the top
              parentNode[parentProp][parentIndex] = AST.emptyStatement();
            } else {
              before(hoistNode);
              const newNodes = [];

              // Decl is not normalized. Can have any number of declarators, can still be pattern
              hoistNode.declarations.forEach((decl) => {
                findBoundNamesInVarDeclarator(decl, names);
                // Now we have the names, remove the var keyword from the declaration
                // If there was no init, ignore this step
                // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
                if (decl.init) {
                  newNodes.push(AST.assignmentExpression(decl.id, decl.init));
                }
              });
              // Must replace one node with one new node to preserve indexes of other var statements that appear later
              ASSERT(parentIndex >= 0, 'var decls in global/func/block must be inside a body array');
              parentNode[parentProp][parentIndex] =
                newNodes.length === 0
                  ? AST.emptyStatement()
                  : AST.expressionStatement(newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes));

              after(newNodes);
            }
            break;
          }

          case 'ForStatement': {
            // Regular loop. If there's an init, replace with assignment. Otherwise drop it entirely.
            before(hoistNode, parentNode);
            const newNodes = [];

            // Decl is not normalized. Can have any number of declarators, can still be pattern
            hoistNode.declarations.forEach((decl) => {
              findBoundNamesInVarDeclarator(decl, names);
              // Now we have the names, remove the var keyword from the declaration
              // If there was no init, ignore this step
              // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
              if (decl.init) {
                newNodes.push(AST.assignmentExpression(decl.id, decl.init));
              }
            });
            // Must replace one node with one new node to preserve indexes of other var statements that appear later
            ASSERT(parentIndex === -1, 'var decls in global/func/block must be inside a body array');
            parentNode[parentProp] =
              newNodes.length === 0 ? AST.identifier('undefined') : newNodes.length === 1 ? newNodes[0] : AST.sequenceExpression(newNodes);

            after(newNodes, parentNode);
            break;
          }

          case 'ForInStatement':
          case 'ForOfStatement':
            // For of/in.
            // Should always be var decl, not func decl
            // Should always introduce one binding
            // Should not have an init (syntax bound)
            // Always replace decl with the .id, even if pattern.
            ASSERT(hoistNode.type === 'VariableDeclaration');
            ASSERT(hoistNode.declarations.length === 1, 'should have exactly one declarator');
            ASSERT(!hoistNode.declarations[0].init, 'should not have init');

            before(hoistNode, parentNode);
            const newNodes = [];

            // Decl is not normalized but somewhat limited due to for-syntax
            findBoundNamesInVarDeclaration(hoistNode, names);
            ASSERT(parentIndex === -1, 'var decls in for-header are not in an array', parentIndex);
            parentNode[parentProp] = hoistNode.declarations[0].id;

            after(newNodes, parentNode);
            break;

          case 'ExportNamedDeclaration': {
            // Must be the `var` or `function` form to reach here.
            // Same as global except we must also eliminate the original export and track the exported names
            if (hoistNode.type === 'FunctionDeclaration') {
              funcs.push([hoistNode, parentNode, parentProp, parentIndex]);
              hoistingRoot.body[exportIndex] = AST.emptyStatement();
              exportedNames.add(hoistNode.id.name);
            } else {
              before(hoistNode);
              const newNodes = [];

              // Decl is not normalized. Can have any number of declarators, can still be pattern
              hoistNode.declarations.forEach((decl) => {
                const boundNames = findBoundNamesInVarDeclarator(decl);
                boundNames.forEach((name) => {
                  names.push(name);
                  exportedNames.add(name);
                });

                // If there was an init prepare an assignment to retain semantics
                // Patterns must have an init (strict syntax) except as lhs of for-in/for-of so it should work out
                if (decl.init) {
                  newNodes.push(AST.assignmentExpression(decl.id, decl.init));
                }
              });
              // Delete the export node. Replace it with the assignments or an empty statement. We'll inject a new one later.
              ASSERT(hoistingRoot.body[exportIndex] === parentNode, 'this is why we pass on exportIndex');
              hoistingRoot.body[exportIndex] =
                newNodes.length === 0
                  ? AST.emptyStatement()
                  : newNodes.length === 1
                  ? AST.expressionStatement(newNodes[0])
                  : AST.expressionStatement(AST.sequenceExpression(newNodes));

              after(newNodes.length === 0 ? AST.emptyStatement() : newNodes);
            }
            break;
          }

          case 'ExportDefaultDeclaration': {
            ASSERT(hoistNode.type === 'FunctionDeclaration');
            funcs.push([hoistNode, parentNode, parentProp, parentIndex]);
            hoistingRoot.body[exportIndex] = AST.emptyStatement();
            exportedNames.add(hoistNode.id.name);
            exportDefault = hoistNode.id.name; // max one of these ever
            break;
          }

          case 'SwitchCase': {
            // Switch case shares scope with all other in the same switch body. For hoisting not special.
            // If there's an init, replace with assignment. Otherwise drop it entirely.
            before(hoistNode, parentNode);
            const newNodes = [];

            if (hoistNode.type === 'FunctionDeclaration') {
              funcs.push([hoistNode, parentNode, parentProp, parentIndex, exportIndex]);
              // We will inject this node at the top
              parentNode[parentProp][parentIndex] = AST.emptyStatement();
            } else {
              // Decl is not normalized. Can have any number of declarators, can still be pattern
              hoistNode.declarations.forEach((decl) => {
                findBoundNamesInVarDeclarator(decl, names);
                // Now we have the names, remove the var keyword from the declaration
                // If there was no init, ignore this step
                // Patterns must have an init (strict syntax) except as lhs of for-in/for-of
                if (decl.init) {
                  newNodes.push(AST.assignmentExpression(decl.id, decl.init));
                }
              });
              // Must replace one node with one new node to preserve indexes of other var statements that appear later
              ASSERT(parentIndex >= 0, 'var decls in switch case must be inside an array');
              parentNode[parentProp][parentIndex] = AST.expressionStatement(
                newNodes.length === 0
                  ? AST.identifier('undefined')
                  : newNodes.length === 1
                  ? newNodes[0]
                  : AST.sequenceExpression(newNodes),
              );
            }

            after(newNodes, parentNode);
            break;
          }

          default:
            console.dir(parentNode, { depth: null });
            ASSERT(false, 'what other node holds var or func decls?', parentNode);
        }

        groupEnd();
      });

      const set = new Set(names);
      // Drop func names from the list of hoisted var names (anon func decl export should not end up in this list)
      funcs.forEach(([hoistNode, rootIndex, rootChild, exportProp]) => set.delete(hoistNode.id.name));

      // This will invalidate all cached indexes moving forward!

      // Sort them and then inject them at the top.
      funcs.sort(([a], [b]) => (a.id.name < b.id.name ? -1 : a.id.name > b.id.name ? 1 : 0));
      rootBody.unshift(...funcs.map(([hoistNode, rootIndex, rootChild, exportProp]) => hoistNode));

      const sorted = [...set].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
      rootBody.unshift(
        ...sorted.map((name) => {
          // Exports are already replaced
          return AST.variableDeclaration(name, undefined, 'var');
        }),
      );

      // Push the named exports at the end of the body (doesn't really matter where they appear; they will be live bindings)
      // Special case the default export. Note that default function exports are live bindings as well, unlike default expressions.
      rootBody.push(
        ...[...exportedNames].map((name) => AST._exportNamedDeclarationFromNames(name, name === exportDefault ? 'default' : name)),
      );

      hoistingRoot.$p.hoistedVars.length = 0; // Clear it. We don't need it anymore.

      rule('End of hoisting');
      groupEnd();
      return true;
    }

    return false;
  }
  function transformProgram(node) {
    hoistingOnce(node);

    anyBlock(node);
    return false;
  }
  function transformReturnStatement(node, body, i, parent) {
    if (!node.argument) {
      rule('Return argument must exist');
      example('return;', 'return undefined;');
      before(node);

      node.argument = AST.identifier('undefined');

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (isComplexNode(node.argument)) {
      rule('Return argument must be simple');
      example('return $()', 'let tmp = $(); return tmp;');
      before(node);

      // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
      const tmpName = createFreshVar('tmpReturnArg', fdata);
      const newNode = AST.variableDeclaration(tmpName, node.argument, 'const');
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    log(BLUE + 'Marking parent (' + parent.type + ') as returning early' + RESET);
    parent.$p.returnBreakContinueThrow = 'return';
    if (body.length > i + 1) {
      if (dce(body, i, 'after return')) {
        return true;
      }
    }
    return false;
  }
  function transformSwitchStatement(node, body, i) {
    if (isComplexNode(node.discriminant)) {
      rule('Switch condition should be simple node');
      example('switch (f()) {}', '{ let tmp = f(); switch (tmp) {} }');
      before(node);

      const tmpName = createFreshVar('tmpSwitchTest', fdata);
      const newNode = AST.variableDeclaration(tmpName, node.discriminant, 'const');
      body.splice(i, 0, newNode);
      node.discriminant = AST.identifier(tmpName);

      after(newNode);
      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // Variables declared on the toplevel of a switch case have to be hoisted to before the switch case, and const
    // converted to let, to ensure that all cases still have access to that binding after the transformations
    const vars = [];
    const lets = [];
    let hasDefaultAt = -1;
    node.cases.forEach((cnode, i) => {
      if (!cnode.test) hasDefaultAt = i;

      // Keep repeating as long as case-top-level var decls are encountered that introduce multiple bindings
      while (
        cnode.consequent.some((snode, i) => {
          if (snode.type === 'VariableDeclaration') {
            if (transformVariableDeclaration(snode, cnode.consequent, i)) {
              return true;
            }

            const names = findBoundNamesInVarDeclaration(snode);
            log('- Pattern binds these names:', names);
            // Declare these names before the switch and "drop" the `var/let/const` keyword to have it be an assignment

            if (snode.kind === 'var') vars.push(...names);
            else lets.push(...names);

            rule('Switch case toplevel declaration should be outlined; [1/2] replacing decls with their inits');
            example('switch (x) { case a: let b = 10, c = 20; }', 'let b, c; switch (x) { case a: b = 10, c = 20; }');
            example('switch (x) { case a: let b; }', 'switch (x) { case a: b = undefined; }');
            example('switch (x) { case a: let [b, c] = [10, 20]; }', 'let b, c; switch (x) { case a: [b, c] = [10, 20]; }');
            before(snode);

            const newNode = AST.expressionStatement(
              AST.sequenceExpression(
                snode.declarations.map((dnode) => AST.assignmentExpression(dnode.id, dnode.init || AST.identifier('undefined'))),
              ),
            );
            cnode.consequent[i] = newNode;

            after(newNode);
          }
        })
      );
    });

    if (vars.length || lets.length) {
      // TODO: if the vars are only used inside the case then we could inline them, perhaps keep the `const` tag. nbd
      rule('Switch case toplevel declaration should be outlined; [2/2] adding var decls before the switch');
      example('switch (x) { case y: let a = 10, b = 20; }', '{ let a; let b; switch (x) { case y: a = 10, b = 10; } }');

      const newNode = AST.blockStatement(
        ...vars.map((name) => AST.variableDeclaration(name, undefined, 'var')),
        ...lets.map((name) => AST.variableDeclaration(name)),
        node,
      );
      body[i] = newNode;

      after(newNode); // omit this one?
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (true) {
      // Alternate switch transform

      // The idea is to pull out all cases tests in order, compare the discriminant against it, and
      // remember the index of the first case that matches. If none match, remember test case count.
      // The next step is taking all the case/default bodies, in order, and wrapping them in `if index <= x`
      // (using zero for the default case). That way a case match will match its own case plus all
      // cases (and/or default) after it until the first case that breaks the control flow, or the
      // last case if none break. The default will properly apply its behavior in the same way.

      rule('Switch transform v2');
      example(
        'switch (x) { case a(): b(); break; default: c(); case d(): e(); }',
        'let i = 1; if (x === a()) i = 0; else if (x === d()) i = 2; label: { if (i <= 0) b(); break label; if (i <= 1) c(); if (i <= 2) e(); }',
      );
      before(node);

      const tmpLabel = createNewUniqueLabel('tmpSwitchBreak');
      const tmpNameValue = createFreshVar('tmpSwitchValue', fdata);
      const tmpNameCase = createFreshVar('tmpSwitchCaseToStart', fdata);
      const defaultIndex = node.cases.findIndex((n) => !n.test);

      function labelEmptyBreaks(snode) {
        if (snode.type === 'BlockStatement') {
          snode.body.forEach(labelEmptyBreaks);
        } else if (snode.type === 'IfStatement') {
          labelEmptyBreaks(snode.consequent);
          if (snode.alternate) labelEmptyBreaks(snode.alternate);
        } else if (snode.type === 'BreakStatement' && snode.label === null) {
          // Change into labeled break. It will break to the start of what was originally a switch statement.
          snode.label = AST.identifier(tmpLabel);
        }
      }

      node.cases.forEach((cnode) => cnode.consequent.forEach(labelEmptyBreaks));

      const newNodes = [
        AST.variableDeclaration(tmpNameValue, node.discriminant, 'const'),
        AST.variableDeclaration(tmpNameCase, AST.literal(defaultIndex >= 0 ? defaultIndex : node.cases.length)),
        node.cases
          .slice(0)
          .reverse()
          .reduce((prev, cnode, i) => {
            if (!cnode.test) return prev;
            return AST.ifStatement(
              AST.binaryExpression('===', cnode.test, tmpNameValue),
              AST.expressionStatement(AST.assignmentExpression(tmpNameCase, AST.literal(node.cases.length - i - 1))),
              prev,
            );
          }, AST.emptyStatement()),
        AST.labeledStatement(
          tmpLabel,
          AST.blockStatement(
            ...node.cases.map((cnode, i) => {
              return AST.ifStatement(AST.binaryExpression('<=', tmpNameCase, AST.literal(i)), AST.blockStatement(cnode.consequent));
            }),
          ),
        ),
      ];

      body.splice(i, 1, ...newNodes);

      after(newNodes);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // This was the old transform. It's more verbose and probably harder to reason about. Maybe. Keeping it so I can test that later.
    /*

    // A switch with a default in the middle has a somewhat more complex transform involving a switch (but no labeled breaks...)
    // That's because essentially a default occurs last and kind of jumps back up. This is a very uncommon case, but it's legal.
    // If the default is the last case then there is no jumping back so we don't need the loop. That's almost always the case.

    if (hasDefaultAt >= 0 && hasDefaultAt < node.cases.length - 1) {
      rule('Switch case with default that is not the last case must be eliminated');
      log('- transforms to do-while that loops at most once');
      example(
        'switch (1) { case a: b; default: c; case d: e }',
        'let x = 1; let def = false; let fall = false; do { if (def) fall = true; else { if (x === a) { b; fall = true } } if (fall) { c; fall = true; } if (fall || x === d) { e; fall = true; } def = true; } while (fall === false);',
      );
      before(node); // omit this one?

      const tmpVal = createFreshVar('tmpSwitchValue', fdata);
      const tmpDef = createFreshVar('tmpSwitchVisitDefault', fdata);
      const tmpFall = createFreshVar('tmpSwitchFallthrough', fdata);

      const newNode = AST.blockStatement(
        AST.variableDeclaration(tmpVal, node.discriminant, 'const'),
        AST.variableDeclaration(tmpDef, 'false'),
        AST.variableDeclaration(tmpFall, 'false'),
        AST.doWhileStatement(
          // TODO: this will be transformed away so we should be more concise in our transform to prevent that step
          AST.blockStatement(
            AST.ifStatement(
              tmpDef,
              // If all cases failed, then set fall=true so the default case gets visited after this branch
              AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
              AST.blockStatement(
                AST.expressionStatement(AST.literal('Cases before the default case')),
                ...node.cases.slice(0, hasDefaultAt).map((cnode, i) => {
                  example('case x: y; break;', 'if (fall || x === value) { { y; break; } fall = true }');
                  before(cnode);

                  const newNode = AST.blockStatement(
                    AST.expressionStatement(AST.literal('case ' + i)),
                    AST.ifStatement(
                      AST.logicalExpression('||', tmpFall, AST.binaryExpression('===', cnode.test, tmpVal)),
                      AST.blockStatement(
                        AST.blockStatement(cnode.consequent),
                        AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
                      ),
                    ),
                  );

                  after(newNode);
                  return newNode;
                }),
              ),
            ),
            // Default case
            AST.ifStatement(
              tmpFall,
              AST.blockStatement(
                AST.expressionStatement(AST.literal('the default case')),
                AST.blockStatement(node.cases[hasDefaultAt].consequent),
                AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
              ),
            ),
            // Cases after the default case (at least one)
            AST.blockStatement(
              AST.blockStatement(
                AST.expressionStatement(AST.literal('cases after the default case')),
                ...node.cases.slice(hasDefaultAt + 1).map((cnode, i) => {
                  example('case x: y; break;', 'if (fall || x === value) { { y; break; } fall = true }');
                  before(cnode);

                  const newNode = AST.blockStatement(
                    AST.expressionStatement(AST.literal('case ' + i)),
                    AST.ifStatement(
                      AST.logicalExpression('||', tmpFall, AST.binaryExpression('===', cnode.test, tmpVal)),
                      AST.blockStatement(
                        AST.blockStatement(cnode.consequent),
                        AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
                      ),
                    ),
                  );

                  after(newNode);
                  return newNode;
                }),
              ),
            ),
            AST.expressionStatement(AST.assignmentExpression(tmpDef, 'true')),
          ),
          // } while()
          AST.binaryExpression('===', tmpFall, 'false'),
        ),
      );

      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    // Note: discriminant is normalized at this point
    rule('Switch cases must normalize to labeled if-else');
    log('- Transform to a set of if-elses with fallthrough mechanics and labeled breaks');
    example(
      'switch (t) { case a(): b(); case c(): d(); break; case e(): f() }',
      'let fall = false; exit: { if (fall || x === a()) { { b(); } fall = true; } if (fall || x === b()) { { d(); break exit; } fall = true } if (fall || x === e()) { { f(); break exit; } fall = true; } }',
    );
    before(node); // omit this one?

    const tmpLabel = createNewUniqueLabel('tmpSwitchBreak');

    const tmpFall = createFreshVar('tmpFallthrough', fdata);
    fdata.globallyUniqueLabelRegistry.set(tmpLabel, true); // Mark as being reserved
    const newNode = AST.labeledStatement(
      tmpLabel,
      AST.blockStatement(
        AST.variableDeclaration(tmpFall, 'false'),
        ...node.cases.map((cnode, i) => {
          cnode.consequent.forEach(labelEmptyBreaks);

          if (cnode.test) {
            return AST.ifStatement(
              AST.logicalExpression('||', tmpFall, AST.binaryExpression('===', node.discriminant, cnode.test)),
              AST.blockStatement(
                AST.expressionStatement(AST.literal('case ' + i + ':')),
                AST.blockStatement(cnode.consequent),
                AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
              ),
            );
          } else {
            // Default case. Must be last case of the switch (otherwise the other transform should be applied)
            // I don't think there's a reason to check anything at this point, right? If the previous case(s)
            // fall through, then they visit the code. And otherwise they break / return. So just add block as-is?
            return AST.blockStatement(AST.expressionStatement(AST.literal('default case:')), ...cnode.consequent);
          }
        }),
      ),
    );

    body[i] = newNode;

    after(newNode);
    assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
   */
  }
  function transformThrowStatement(node, body, i, parent) {
    if (isComplexNode(node.argument)) {
      rule('Throw argument must be simple');
      example('throw $()', 'let tmp = $(); throw tmp;');
      before(node);

      const tmpName = createFreshVar('tmpThrowArg', fdata);
      const newNode = AST.variableDeclaration(tmpName, node.argument, 'const');
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    log(BLUE + 'Marking parent (' + parent.type + ') as throwing early' + RESET);
    parent.$p.returnBreakContinueThrow = 'throw';
    if (body.length > i + 1) {
      if (dce(body, i, 'after throw')) {
        return true;
      }
    }

    return false;
  }
  function transformTryStatement(node, body, i, parent) {
    anyBlock(node.block);
    if (node.handler) {
      // TODO: catch arg as pattern
      anyBlock(node.handler.body);
    }
    if (node.finalizer) {
      anyBlock(node.finalizer);
    }

    return false;
  }
  function transformVariableDeclaration(node, body, i, parent) {
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

    log('Id:', dnode.id.type === 'Identifier' ? '`' + dnode.id.name + '`' : '<pattern>');

    if (dnode.id.type === 'ArrayPattern') {
      rule('Binding array patterns not allowed');
      example('let [x] = y()', 'let tmp = y(), tmp1 = [...tmp], x = tmp1[0]');
      before(node);

      const bindingPatternRootName = createFreshVar('bindingPatternArrRoot', fdata); // TODO: rename to tmp prefix
      const nameStack = [bindingPatternRootName];
      const newBindings = [];
      funcArgsWalkArrayPattern(dnode.id, nameStack, newBindings, 'var');

      if (newBindings.length) {
        log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
        node.declarations = [
          AST.variableDeclarator(bindingPatternRootName, dnode.init),
          ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init)),
        ];

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      log('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (dnode.id.type === 'ObjectPattern') {
      rule('Binding object patterns not allowed');
      example('var {x} = y()', 'var tmp = y(), x = obj.x');
      before(node, parent);

      const bindingPatternRootName = createFreshVar('bindingPatternObjRoot', fdata);
      const nameStack = [bindingPatternRootName];
      const newBindings = [];
      funcArgsWalkObjectPattern(dnode.id, nameStack, newBindings, 'var', true);

      if (newBindings.length) {
        log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
        node.declarations = [
          AST.variableDeclarator(bindingPatternRootName, dnode.init),
          ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init)),
        ];

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      log('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (dnode.id.type !== 'Identifier') {
      console.log('Error node .dir:');
      console.dir(node, { depth: null });
      ASSERT(
        false,
        'The paramNode can be either an Identifier or a pattern of sorts, and we checked the pattern above',
        [dnode.id.type],
        node,
      );
    }

    if (dnode.init) {
      log('Init:', dnode.init.type);

      if (dnode.init.type === 'AssignmentExpression') {
        // Must first outline the assignment because otherwise recursive calls will assume the assignment
        // is an expression statement and then transforms go bad.

        if (dnode.init.left.type === 'Identifier') {
          if (dnode.init.operator !== '=') {
            rule('Var inits can not be compound assignments to ident');
            example('let x = y *= z()', 'let x = y = y * z();');
            before(node, parent);

            dnode.init = AST.assignmentExpression(
              dnode.init.left,
              AST.binaryExpression(
                dnode.init.operator.slice(0, -1), // *= becomes *
                AST.cloneSimple(dnode.init.left),
                dnode.init.right,
              ),
            );

            after(node);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          rule('Var inits can not be assignments; lhs ident');
          example('let x = y = z()', 'y = z; let x = y;');
          before(node, parent);

          const newNodes = [
            AST.expressionStatement(dnode.init),
            AST.variableDeclaration(AST.cloneSimple(dnode.id), AST.cloneSimple(dnode.init.left)),
          ];
          body.splice(i, 1, ...newNodes);

          after(newNodes);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        if (dnode.init.left.type === 'MemberExpression') {
          if (dnode.init.left.computed && isComplexNode(dnode.init.left.property)) {
            ASSERT(dnode.id.type === 'Identifier');
            rule('Var inits can not be assignments; lhs computed complex prop');
            example('let x = a()[b()] = z()', 'tmp = a(), tmp2 = b(), tmp3 = z(), tmp[tmp2] = tmp3; let x = tmp3;');
            before(node, parent);

            const tmpNameObj = createFreshVar('varInitAssignLhsComputedObj', fdata);
            const tmpNameProp = createFreshVar('varInitAssignLhsComputedProp', fdata);
            const tmpNameRhs = createFreshVar('varInitAssignLhsComputedRhs', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, dnode.init.left.object, 'const'),
              AST.variableDeclaration(tmpNameProp, dnode.init.left.property, 'const'),
              AST.variableDeclaration(tmpNameRhs, dnode.init.right, 'const'),
              AST.expressionStatement(AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), tmpNameRhs)),
              AST.variableDeclaration(AST.cloneSimple(dnode.id), tmpNameRhs, node.kind),
            ];
            body.splice(i, 1, ...newNodes);

            after(newNodes);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          if (isComplexNode(dnode.init.left.object)) {
            ASSERT(dnode.id.type === 'Identifier');
            rule('Var inits can not be assignments; lhs regular complex prop');
            example(
              'let x = a().b = z()',
              'tmp = a(); let x = tmp.b = z();',
              () => dnode.init.operator === '=' && !dnode.init.left.computed,
            );
            example(
              'let x = a()[b] = z()',
              'tmp = a(); let x = tmp[b] = z();',
              () => dnode.init.operator === '=' && dnode.init.left.computed,
            );
            example(
              'let x = a().b *= z()',
              'tmp = a(); let x = tmp.b *= z();',
              () => dnode.init.operator !== '=' && !dnode.init.left.computed,
            );
            example(
              'let x = a()[b] *= z()',
              'tmp = a(); let x = tmp[b] *= z();',
              () => dnode.init.operator !== '=' && dnode.init.left.computed,
            );
            before(node, parent);

            const tmpNameObj = createFreshVar('varInitAssignLhsComputedObj', fdata);
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, dnode.init.left.object, 'const'),
              AST.variableDeclaration(
                dnode.id,
                AST.assignmentExpression(
                  AST.memberExpression(tmpNameObj, dnode.init.left.property, dnode.init.left.computed),
                  dnode.init.right,
                  dnode.init.operator,
                ),
                node.kind,
              ),
            ];
            body.splice(i, 1, ...newNodes);

            after(newNodes);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // At this point the assignment has an lhs that is a property and the object and property are simple (maybe computed)

          if (dnode.init.operator !== '=') {
            ASSERT(dnode.id.type === 'Identifier');
            rule('Var inits can not be compound assignments to simple member');
            example('let x = a.b *= z()', 'let x = a.b = a.b * z();');
            before(node);

            dnode.init = AST.assignmentExpression(
              dnode.init.left,
              AST.binaryExpression(
                dnode.init.operator.slice(0, -1), // *= becomes *
                AST.cloneSimple(dnode.init.left),
                dnode.init.right,
              ),
            );

            after(node);
            assertNoDupeNodes(AST.blockStatement(body), 'body');
            return true;
          }

          // We should be able to stash the rhs without worrying about side effects by reading the lhs first.

          ASSERT(dnode.id.type === 'Identifier');
          rule('Var inits can not be assignments; lhs simple member');
          example('let x = a()[b()] = z()', 'tmp = a(), tmp2 = b(), tmp3 = z(), tmp[tmp2] = tmp3; let x = tmp3;');
          before(node, parent);

          const tmpNameRhs = createFreshVar('varInitAssignLhsComputedRhs', fdata);
          const newNodes = [
            AST.variableDeclaration(tmpNameRhs, dnode.init.right, 'const'),
            AST.expressionStatement(AST.assignmentExpression(dnode.init.left, tmpNameRhs, dnode.init.operator)),
            AST.variableDeclaration(dnode.id, tmpNameRhs, node.kind),
          ];
          body.splice(i, 1, ...newNodes);

          after(newNodes);
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }

        // TODO: clean this up nicely as well. Shouldn't ultimately be a big deal, just yields better normalized results. Like above.

        rule('Var inits can not be assignments; pattern lhs');
        example('let x = [y] = z()', 'let x, x = [y] = z()');
        before(node, parent);

        const newNodes = [
          AST.variableDeclaration(AST.cloneSimple(dnode.id)),
          AST.expressionStatement(AST.assignmentExpression(dnode.id, dnode.init)),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (isComplexNode(dnode.init, false)) {
        // false: returns true for simple unary as well
        log('- init is complex, transforming expression');
        if (transformExpression('var', dnode.init, body, i, node, dnode.id, node.kind)) {
          assertNoDupeNodes(AST.blockStatement(body), 'body');
          return true;
        }
      }
    }

    return false;
  }
  function transformWhileStatement(node, body, i) {
    if (node.test.type !== 'Literal' || node.test.value !== true) {
      // We do this because it makes all reads that relate to the loop be inside the block.
      // There are heuristics that want to know whether a binding is used inside a loop and if
      // we don't do this then parts of the loop may not be inside the block. And we already
      // do this transform anyways so it's easier to then just do it for everything, anyways.

      rule('While test must be true');
      example('while (f()) z()', 'while (true) { if (f()) z(); else break; }');
      before(node);

      const newNode = AST.whileStatement(AST.tru(), AST.blockStatement(AST.ifStatement(node.test, node.body, AST.breakStatement())));
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

    anyBlock(node.body);

    if (node.body.body.length === 1 && node.body.body[0].type === 'BreakStatement') {
      const brk = node.body.body[0];
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
      return true;
    }

    if (node.test.type === 'Literal' && node.test.value !== true) {
      if (node.test.value === 0 || node.test.value === '' || node.test.value === false || node.test.raw === 'null') {
        rule('Eliminate while with falsy literal');
        example('while (false) f();', ';');
        before(node);

        body[i] = AST.emptyStatement();

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      rule('Replace truthy while test literal with `true`');
      example('while (100) f();', 'while (true) f();');
      before(node);

      node.test = AST.identifier(true);

      after(node);
      assertNoDupeNodes(AST.blockStatement(body), 'body');
      return true;
    }

    if (node.test.type === 'Identifier') {
      if (['undefined', 'NaN'].includes(node.name)) {
        rule('Eliminate while with falsy identifier');
        example('while (false) f();', ';');
        before(node);

        body[i] = AST.emptyStatement();

        after(body[i]);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }

      if (['Infinity'].includes(node.name)) {
        rule('Replace truthy while test identifier with `true`');
        example('while (Infinity) f();', 'while (true) f();');
        before(node);

        node.test = AST.identifier(true);

        after(node);
        assertNoDupeNodes(AST.blockStatement(body), 'body');
        return true;
      }
    }

    log(
      BLUE + 'while;returnBreakContinueThrow?' + RESET,
      node.body.$p.returnBreakContinueThrow ? 'yes; ' + node.body.$p.returnBreakContinueThrow : 'no',
    );
    if (node.body.$p.returnBreakContinueThrow) {
      log(
        'The body of this loop may always return but it may never be executed so we cannot safely DCE the sibling statements that follow it, nor mark the parent as such',
      );
    }

    return false;
  }
}
