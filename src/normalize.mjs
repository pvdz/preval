import { printer } from '../lib/printer.mjs';
import { ASSERT, DIM, BOLD, RESET, BLUE, dir, group, groupEnd, log, fmat, printNode } from './utils.mjs';
import { $p } from './$p.mjs';

/*
  Normalization steps that happen:
  - Parameter defaults are rewritten to ES5 equivalent code
  - All binding names are unique in a file
    - No shadowing on any level or even between scopes. Lexical scoping becomes irrelevant.
  - Hoists var statements and function declarations to the top of their scope
    - Currently adds complexity because a variable can have two values. But the final system must be able to cope with this so I'm ok with this for now.
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
    - TODO: same for object property values
  - Object property shorthands into regular properties
    - Simplifies some edge case code checks
  - Computed property access for complex keys is normalized to ident keys
  - Computed property access with literals that are valid idents become regular property access
  - Normalize conditional expression parts
    - Not doing normalize ternary vs if-else right now because there'll always be contexts that require it to be an expression and there will always be contents that require it to be a statement
  - Parameter patterns are transformed to body code
    - Further minification may in some cases prevent runtime errors to happen for nullable values... (like `function f([]){} f()`)
    - Including spread and defaults for all object/array patterns on any level

 */

/*
  Ideas for normalization;
  - arrows with expression body to arrows with block body
  - Figure out how to get around the var-might-be-undefined problem
    - Current implementation makes our system think the var might be `undefined` when we know that's never the case
    - Should the vars we introduce be set at the first time usage instead? hmmm
    - Fixing this generically might also increase input support so there's that
  - objects, just like calls
  - treeshaking?
    - Not sure if this should (or can?) happen here but ESM treeshaking should be done asap. Is this too soon for it?
  - all bindings have only one point of decl
    - dedupe multiple var statements for the same name
    - dedupe var+function decls
    - dedupe parameter shadows
  - we could implement the one-time assignment thing
    - I need to read up on this. IF every binding always ever only got one update, does that make our lives easier?
  - Can we simplify/normalize loops? Should we?
    - If the code only ever needed to worry about for(;;) then that may help
    - This doesn't apply to for-in and for-of
  - Should arrows become regular funcs?
    - Not sure whether this actually simplifies anything for us.
  - Should func decls be changed to const blabla?
    - Also not sure whether this helps us anything.
  - Decompose every line to do "one thing"
    - Member expressions with more than one step, calls inside calls, etc etc. How far can we push this and is it worth anything?
  - ternary to if-else
    - or if-else to ternary? both have contextual limitations
    - could transform ternary to if-else wrapped in an immediately invoked arrow and hope that we can unbox that later...? might be a little excessive.
  - multiple conditions per if-else to one condition
  - switch to if-else
    - probably too detrimental to perf. but perhaps we could detect that a series of if-elses applies to the same thing, in the end.
    - do switches have special optimization tricks we can use?
  - if-else logic with !
    - May make things worse as it might require `if (!false) $` to become `if (false) ; else $` ....
    - Maybe it works if we only apply this to certain cases where `else` already exists
  - if-else logic with >
    - dangerous due to coercion
    - not sure it helps anything at all
  - return early stuff versus if-elsing it out?
    - What's easier to reason about
    - Create new functions for the remainder after an early return? Does that help?
  - Remove unused `return` keywords
  - Decompose sequence expressions in individual expressions, statements, or whatever. When possible.
    - May not be worth it because this is not always possible so we need to code against it, anyways.
  - Decompose compound assignments (x+=y -> x=x+y)
    - Don't think this is observable, even with proxies / getters, right?
    - We can recompose them in the final step if we want to
  - Deconstruct optional chaining
    - Probably easier not to have to worry about this pure sugar?
  - Sequence expression
    - In left side of `for` loop. Move them out
 */

const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals

export function phaseNormalize(fdata, fname) {
  let changed = false; // Was the AST updated? We assume that updates can not be circular and repeat until nothing changes.
  let somethingChanged = false; // Did phase2 change anything at all?

  const lexScopeStack = [];
  const superCallStack = []; // `super()` is validated by the parser so we don't have to worry about scoping rules

  const funcStack = [];

  // Crumb path for walking through the AST. This way you can reach out to parent nodes and manipulate them or whatever. Shoot your own foot.
  const crumbsNodes = [];
  const crumbsProps = [];
  const crumbsIndexes = [];

  const ast = fdata.tenkoOutput.ast;

  function crumbGet(delta) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNodes.length, 'can not go past root');

    const index = crumbsIndexes[crumbsIndexes.length - delta];
    if (index >= 0) return crumbsNodes[crumbsNodes.length - delta][crumbsProps[crumbsProps.length - delta]][index];
    else return crumbsNodes[crumbsNodes.length - delta][crumbsProps[crumbsProps.length - delta]];
  }
  function crumbSet(delta, node) {
    ASSERT(delta > 0, 'must go at least one step back');
    ASSERT(delta < crumbsNodes.length, 'can not go past root');
    ASSERT(node?.type, 'every node must at least have a type');

    const parent = crumbsNodes[crumbsNodes.length - delta];
    const prop = crumbsProps[crumbsProps.length - delta];
    const index = crumbsIndexes[crumbsIndexes.length - delta];

    log('Replacing the call at `' + parent.type + '.' + prop + (index >= 0 ? '[' + index + ']' : '') + '` with', node.type);

    if (index >= 0) return (parent[prop][index] = node);
    else return (parent[prop] = node);
  }
  function createUniqueGlobalName(name) {
    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = 0;
    if (fdata.globallyUniqueNamingRegistery.has(name)) {
      while (fdata.globallyUniqueNamingRegistery.has(name + '_' + ++n));
    }
    return n ? name + '_' + n : name;
  }
  function registerGlobalIdent(name, originalName, { isExport = false, isImplicitGlobal = false, knownBuiltin = false } = {}) {
    if (!fdata.globallyUniqueNamingRegistery.has(name)) {
      fdata.globallyUniqueNamingRegistery.set(name, {
        // ident meta data
        uid: ++fdata.globalNameCounter,
        originalName,
        uniqueName: name,
        isExport, // exports should not have their name changed. we ensure this as the last step of this phase.
        isImplicitGlobal, // There exists explicit declaration of this ident. These can be valid, like `process` or `window`
        knownBuiltin, // Make a distinction between known builtins and unknown builtins.
        // Track all cases where a binding value itself is initialized/mutated (not a property or internal state of its value)
        // Useful recent thread on binding mutations: https://twitter.com/youyuxi/status/1329221913579827200
        // var/let a;
        // var/const/let a = b;
        // const a = b;
        // import a, b as a, * as a, {a, b as a} from 'x';
        // export var/let a
        // export var/const/let a = b
        // function a(){};
        // export function a(){};
        // a = b;
        // a+= b;
        // var/const/let [a, b: a] = b;
        // [a, b: a] = b;
        // var/const/let {a, b: a} = b;
        // ({a, b: a} = b);
        // [b: a] = c;
        // ++a;
        // a++;
        // for (a in b);
        // for ([a] in b);
        // for ({a} in b);
        // In a nutshell there are six concrete areas to look for updates;
        // - [x] binding declarations
        //   - [x] regular
        //   - [ ] destructuring
        //   - [ ] exported
        //   - [x] could be inside `for` header
        // - [ ] param names
        //   - [ ] regular
        //   - [ ] patterns
        // - [ ] assigning
        //   - [ ] regular
        //   - [ ] compound
        //   - [ ] destructuring array
        //   - [ ] destructuring object
        // - [ ] imports of any kind
        // - [ ] function declarations
        // - [ ] update expressions, pre or postifx, inc or dec
        // - [ ] for-loop lhs
        updates: [], // {parent, prop, index} indirect reference ot the node being assigned
        usages: [], // {parent, prop, index} indirect reference to the node that refers to this binding
      });
    }
  }

  group('\n\n\n##################################\n## phaseNormalize  ::  ' + fname + '\n##################################\n\n\n');

  do {
    changed = false;
    stmt(null, 'ast', -1, ast);
    if (changed) somethingChanged = true;
    log('\nCurrent state\n--------------\n' + fmat(printer(ast)) + '\n--------------\n');
  } while (changed);

  // Rename the ident in all usages to a (file-) globally unique name
  fdata.globallyUniqueNamingRegistery.forEach((obj, uniqueName) => {
    // As a result, all bindings in this file ought to now have a unique name.
    if (uniqueName !== obj.originalName) {
      ASSERT(!obj.isExport, 'exports should retain their original name and this should not happen');
      obj.usages.forEach((node) => (node.name = uniqueName));
    }
  });
  // Note: scope tracking is broken now and requires a reparse (!)

  log('End of phaseNormalize');
  groupEnd();

  return somethingChanged;

  function findUniqueNameForBindingIdent(node, startAtPArent = false) {
    ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
    //log('Finding unique name for `' + node.name + '`');
    let index = lexScopeStack.length;
    if (startAtPArent) --index; // For example: func decl id has to be looked up outside its own inner scope
    while (--index >= 0) {
      // log('- lex level', index,':', lexScopeStack[index].$p.nameMapping.has(node.name));
      if (lexScopeStack[index].$p.nameMapping.has(node.name)) {
        break;
      }
    }
    if (index < 0) {
      log('The ident `' + node.name + '` could not be resolved to a unique name. Was it an implicit global?');
      // Register one...
      lexScopeStack[0].$p.nameMapping.set(node.name, node.name);
      index = 0;
    }
    const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
    ASSERT(uniqueName !== undefined, 'should exist');
    return uniqueName;
  }
  function getMetaForBindingName(node, startAtParent) {
    const uniqueName = findUniqueNameForBindingIdent(node, startAtParent);
    return fdata.globallyUniqueNamingRegistery.get(uniqueName);
  }

  function crumb(parent, prop, index) {
    crumbsNodes.push(parent);
    crumbsProps.push(prop);
    crumbsIndexes.push(index);
  }
  function uncrumb(parent, prop, index) {
    const a = crumbsNodes.pop();
    const b = crumbsProps.pop();
    const c = crumbsIndexes.pop();
    ASSERT(b === true || (a === parent, b === prop, c === index), 'ought to pop the same as we pushed. just a sanity check.');
  }

  function createFreshVarInCurrentRootScope(name) {
    const tmpName = createUniqueGlobalName(name);
    registerGlobalIdent(tmpName, name);
    log('Recording', tmpName, 'to be declared in', lexScopeStack[lexScopeStack.length - 1].$p.nameMapping);
    lexScopeStack[lexScopeStack.length - 1].$p.nameMapping.set(tmpName, tmpName);
    return tmpName;
  }
  function isComplexNodeOrAlreadySequenced(node) {
    return isComplexNode(node, true);
  }
  function isComplexNode(node, orSequence = false) {
    // A node is simple if it is
    // - an identifier
    // - a literal
    // - a unary expression `-` or `+` with a number arg, NaN, or Infinity
    // - a sequence expression ending in a simple node
    // Most of the time these nodes are not reduced any further
    // The sequence expression sounds complex but that's what we normalize into most of the time

    if (node.type === 'Literal') {
      return false;
    }
    if (node.type === 'Identifier') {
      return false;
    }
    if (node.type === 'UnaryExpression' && (node.operator === '-' || node.operator === '+')) {
      // -100 (is a unary expression!)
      if (node.argument.type === 'Literal' && typeof node.argument.value === 'number') return false;
      // A little unlikely but you know
      // -NaN, +NaN, -Infinity, +Infinity
      if (node.argument.type === 'Identifier' && (node.argument.name === 'Infinity' || node.argument.name === 'NaN')) return false;
    }
    if (orSequence && node.type === 'SequenceExpression' && !isComplexNode(node.expressions[node.expressions.length - 1])) return false;
    if (node.type === 'ArrayExpression' && node.elements.length === 0) return false; // Empty array literal is not exciting, probably not worth separating (?)
    if (node.type === 'ObjectExpression' && node.properties.length === 0) return false; // Empty object literal is not exciting, probably not worth separating (?)

    return true;
  }
  function sequenceNode(node, tmpNameBase) {
    // Take given node, assign it to a fresh tmp variable, and create a sequence with this assignment and then that variable.
    // `expr`
    // -> `(tmp = expr, tmp)`

    ASSERT(isComplexNode(node), 'this probably should not be called on simple nodes...');

    const tmpName = createFreshVarInCurrentRootScope(tmpNameBase);

    funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: tmpName,
            $p: $p(),
          },
          init: null,
          $p: $p(),
        },
      ],
      $p: $p(),
    });

    const assign = {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'Identifier',
        name: tmpName,
        $p: $p(),
      },
      right: node,
      $p: $p(),
    };
    return {
      type: 'SequenceExpression',
      expressions: [
        assign,
        {
          type: 'Identifier',
          name: tmpName,
          $p: $p(),
        },
      ],
      $p: $p(),
    };
  }
  function flattenSequences(node) {
    // Note: make sure the node is not being walked currently or things end bad.

    // Flatten nested groups
    // `(a, (b, c), d)` -> `(a, b, c, d)`
    // Sequence expressions have only some edge cases to care about. In particular around context.
    // In this case we only replace whole groups nested in other groups, which should not be a concern.
    // Note: a group is always two or more elements. This should not affect or even detect "parenthesised" code.
    let i = 0;
    while (i < node.expressions.length) {
      ASSERT(node.expressions[i], 'sequence does not have empty elements?', node);
      if (node.expressions[i].type === 'SequenceExpression') {
        log('Flattening a sequence');
        node.expressions.splice(i, 1, ...node.expressions[i].expressions);
        changed = true;
      } else {
        ++i;
      }
    }
  }
  function statementifySequences(node) {
    // Note: make sure the node is not being walked currently or things end bad.

    // Break up sequence expressions in certain positions

    // Sequence expressions have only some edge cases to care about. In particular around context.
    // In this case we only replace whole groups nested in other groups, which should not be a concern.
    // Note: a group is always two or more elements. This should not affect or even detect "parenthesised" code.

    let i = 0;
    while (i < node.body.length) {
      ASSERT(node.body[i], 'sequence does not have empty elements?', node);
      const e = node.body[i];
      if (e.type === 'ExpressionStatement') {
        const expr = node.body[i].expression;
        if (expr.type === 'SequenceExpression') {
          // Break sequence expressions that are the child of an ExpressionStatement up into separate statements
          // `a, (b, c), d`
          // -> `a; b; c; d;`
          log('Breaking up a sequence');
          node.body.splice(
            i,
            1,
            ...expr.expressions.map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          changed = true;
          --i; // revisit (recursively)
        }
      } else if (e.type === 'VariableDeclaration') {
        log('Parent of sequene is var decl');
        ASSERT(e.declarations.length === 1, 'var decl binding count should be normalized already');
        const init = e.declarations[0].init;
        if (!init) {
        } else if (init.type === 'SequenceExpression') {
          // `var x = (1, 2)` -> `1; var x = 2`
          // This assumes sub-statements are normalized to be groups already
          log('Outlining a sequence that is the init of a binding decl');
          const exprs = init.expressions;
          node.body.splice(
            i,
            0,
            ...init.expressions.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          e.declarations[0].init = init.expressions[init.expressions.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (init.type === 'MemberExpression' && init.object.type === 'SequenceExpression') {
          // `var x = (a, b).x` -> `a; var x = b.x`
          // This assumes sub-statements are normalized to be groups already
          log('Outlining a sequence that is the object of a member expression of an init of a binding decl');
          const seq = init.object;
          const exprs = seq.expressions;
          node.body.splice(
            i,
            0,
            ...exprs.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          init.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        }
      } else if (e.type === 'ReturnStatement') {
        if (e.argument.type === 'SequenceExpression') {
          // `return (a,b)` -> a; return b;`
          // This assumes sub-statements are normalized to be groups already
          log('Moving the sequence argument of return to individual statements');
          const seq = e.argument;
          const exprs = seq.expressions;
          node.body.splice(
            i,
            0,
            ...exprs.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          e.argument = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (e.argument.type === 'MemberExpression' && e.argument.object.type === 'SequenceExpression') {
          // `return (a, b).foo` -> `a; return b.foo`
          // This assumes sub-statements are normalized to be groups already
          log('Outlining a sequence that is the object of a member expression of an init of a binding decl');
          const seq = e.argument.object;
          const exprs = seq.expressions;
          node.body.splice(
            i,
            0,
            ...exprs.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          e.argument.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        }
      } else if (e.type === 'IfStatement') {
        if (e.test.type === 'SequenceExpression') {
          // `if (a,b) c` -> a; if (b) c;`
          // This assumes sub-statements are normalized to be groups already
          log('Moving the sequence argument of return to individual statements');
          const seq = e.test;
          const exprs = seq.expressions;
          node.body.splice(
            i,
            0,
            ...exprs.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          e.test = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (e.test.type === 'MemberExpression' && e.test.object.type === 'SequenceExpression') {
          // `if ((a,b).x) c` -> a; if (b.x) c;`
          // This assumes sub-statements are normalized to be groups already
          log('Outlining a sequence that is the object of a member expression of an init of a binding decl');
          const seq = e.test.object;
          const exprs = seq.expressions;
          node.body.splice(
            i,
            0,
            ...exprs.slice(0, -1).map((enode) => ({
              type: 'ExpressionStatement',
              expression: enode,
              $p: $p(),
            })),
          );
          // Replace the old sequence expression with its last element
          e.test.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        }
      }
      ++i;
    }
  }
  function oneDeclOneBinding(node) {
    // Break up variable declarations that declare multiple bindings
    // TODO: patterns

    let i = 0;
    while (i < node.body.length) {
      ASSERT(node.body[i], 'block does not have empty elements?', node);
      const e = node.body[i];
      if (e.type === 'VariableDeclaration') {
        if (e.declarations.length > 1) {
          // Break up into individual statements
          // `var a, b` -> `var a; var b;`
          // `var a = 1, b = 2` -> `var a = 1; var b = 1;
          log('Breaking up a var decl');
          node.body.splice(
            i,
            1,
            ...e.declarations.map((dnode) => ({
              type: 'VariableDeclaration',
              kind: e.kind,
              declarations: [dnode],
              $p: $p(),
            })),
          );
          changed = true;
          --i; // revisit (recursively)
        }
      }
      ++i;
    }
  }
  function normalizeCallArgsChangedSomething(node, isNew) {
    // If this returns true, then the given node was replaced and already walked

    // For all args that are not an identifier or literal, store them in a temporary variable first.
    // `f(x(), 100, y(), a, z())` -> `(t1=x(), t2=y(), t3=z(), f(t1, 100, t2, a, t3))`
    // The expression can be changed inline so we can do it right now, before traversing.

    const assigns = [];
    const newArgs = [];
    node.arguments.forEach((anode, i) => {
      if (isComplexNode(anode)) {
        const tmpName = createFreshVarInCurrentRootScope('tmpArg');

        funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: tmpName,
                $p: $p(),
              },
              init: null,
              $p: $p(),
            },
          ],
          $p: $p(),
        });

        assigns.push({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: tmpName,
            $p: $p(),
          },
          right: anode,
          $p: $p(),
        });
        newArgs.push({
          type: 'Identifier',
          name: tmpName,
          $p: $p(),
        });
      } else {
        newArgs.push(anode);
      }
    });
    if (assigns.length) {
      const seq = {
        type: 'SequenceExpression',
        expressions: [...assigns, { type: isNew ? 'NewExpression' : 'CallExpression', callee: node.callee, arguments: newArgs, $p: $p() }],
        $p: $p(),
      };

      crumbSet(1, seq);

      // Visit the sequence expression node now.
      _expr(seq);

      return true;
    }

    return false;
  }
  function normalizeArrayElementsChangedSomething(node) {
    // If this returns true, then the given node was replaced and already walked

    // For all elements that are not an identifier or literal, store them in a temporary variable first.
    // `[x(), 100, y(), a, z()]` -> `(t1=x(), t2=y(), t3=z(), [t1, 100, t2, a, t3])`
    // The expression can be changed inline so we can do it right now, before traversing.

    const assigns = [];
    const newElements = [];
    node.elements.forEach((anode, i) => {
      // Elided elements are `null` here. Skip 'em
      if (!anode) return;

      let valueNode = anode;
      if (anode.type === 'SpreadElement') {
        valueNode = anode.argument;
        crumb(anode, 'argument', valueNode);
      }

      if (isComplexNode(valueNode)) {
        const tmpName = createFreshVarInCurrentRootScope('tmpElement');

        funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: tmpName,
                $p: $p(),
              },
              init: null,
              $p: $p(),
            },
          ],
          $p: $p(),
        });

        assigns.push({
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'Identifier',
            name: tmpName,
            $p: $p(),
          },
          right: valueNode,
          $p: $p(),
        });
        newElements.push(
          anode.type === 'SpreadElement'
            ? {
                type: 'SpreadElement',
                argument: {
                  type: 'Identifier',
                  name: tmpName,
                  $p: $p(),
                },
                $p: $p(),
              }
            : {
                type: 'Identifier',
                name: tmpName,
                $p: $p(),
              },
        );
      } else {
        // Use anode because if this was a spread then we'd want to keep it
        newElements.push(anode);
      }

      if (anode.type === 'SpreadElement') {
        uncrumb(anode, 'argument', valueNode);
      }
    });
    if (assigns.length) {
      log('Replacing the non-simple elements of an array with a tmp var');
      const seq = {
        type: 'SequenceExpression',
        expressions: [...assigns, { type: 'ArrayExpression', elements: newElements, $p: $p() }],
        $p: $p(),
      };

      crumbSet(1, seq);

      // Visit the sequence expression node now.
      _expr(seq);

      //return true;
    }

    return false;
  }
  function normalizeCalleeChangedSomething(node, isNew) {
    // Technically doing a `new` on any literal will cause a runtime error, but let's not bother with normalizing them to ident
    // Note: for regular calls, the context can be determined by a member expression, so make sure to not change those.
    if (isComplexNode(node.callee) && (isNew || node.callee.type !== 'MemberExpression')) {
      // `new x.y(a,b)` -> `(tmp=x.y, new tmp(a,b))`
      // `($())(a,b)` -> `(tmp=$(), tmp)(a,b))`

      const tmpName = createFreshVarInCurrentRootScope('tmpNewObj');

      funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: tmpName,
              $p: $p(),
            },
            init: null,
            $p: $p(),
          },
        ],
        $p: $p(),
      });

      const assign = {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'Identifier',
          name: tmpName,
          $p: $p(),
        },
        right: node.callee,
        $p: $p(),
      };
      const newNode = {
        type: isNew ? 'NewExpression' : 'CallExpression',
        callee: {
          type: 'Identifier',
          name: tmpName,
          $p: $p(),
        },
        arguments: node.arguments,
        $p: $p(),
      };
      const seq = {
        type: 'SequenceExpression',
        expressions: [assign, newNode],
        $p: $p(),
      };
      crumbSet(1, seq);
      _expr(seq);
      changed = true;
      return true;
    } else if (!isNew && node.callee.type === 'MemberExpression' && node.callee.object.type === 'SequenceExpression') {
      // `(a, b).c()` -> `(a, b.c())`
      // `(a, b)[c]()` -> `(a, b[c]())`

      log('Replacing the call expression with a member expression with a sequence, with a sequence ending in that call');

      const mem = node.callee;
      const exprs = mem.object.expressions;
      const prop = mem.property;

      const seq = {
        type: 'SequenceExpression',
        expressions: [
          ...exprs.slice(0, -1),
          {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              computed: mem.computed,
              object: exprs[exprs.length - 1],
              property: prop,
              $p: $p(),
            },
            arguments: node.arguments,
          },
        ],
        $p: $p(),
      };
      crumbSet(1, seq);

      changed = true;
      return true;
    } else {
      return false;
    }
  }

  function stmt(parent, prop, index, node, isExport, stillHoisting, isFunctionBody) {
    ASSERT(
      parent === null ||
        index === 'body' ||
        (Array.isArray(parent[prop]) ? parent[prop][index] === node : parent[prop] === node && index === -1),
      'caller should pass on proper parent[prop][index] data',
      parent,
      prop,
      index,
      node,
      isExport,
    );

    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.push(node);
      node.$p.varBindingsToInject = [];
      node.$p.funcBindingsToInject = [];
    }

    crumb(parent, prop, index);
    _stmt(node, isExport, stillHoisting, isFunctionBody);
    uncrumb(parent, prop, index);

    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.pop(node);

      // TODO: dedupe declared names. functions trump vars. last func wins (so order matters).
      // Since we unshift, add var statements first
      if (node.$p.varBindingsToInject.length) {
        // Inject all the decls, without init, at the start of the function. Try to maintain order. It's not very important.
        // TODO: dedupe decls. Make sure multiple var statements for the same name are collapsed and prefer func decls
        (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.varBindingsToInject);
      }
      // Put func decls at the top
      if (node.$p.funcBindingsToInject.length) {
        // TODO: dedupe func decls with the same name. Still legal when nested in another function (not in global). Last one wins. Rest is dead code.
        // Inject all the decls, without init, at the start of the function. Order matters.
        (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.funcBindingsToInject);
      }
    }
  }
  function _stmt(node, isExport = false, stillHoisting = false, isFunctionBody) {
    group(DIM + 'stmt(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      if (node.$scope) lexScopeStack.push(node);
      else lexScopeStack.push(node.handler);
    }

    switch (node.type) {
      case 'BlockStatement': {
        let hoisting = !!isFunctionBody;
        oneDeclOneBinding(node); // do this before
        node.body.forEach((cnode, i) => {
          if (
            hoisting &&
            (cnode.type !== 'VariableDeclaration' ||
              cnode.kind !== 'var' ||
              cnode.declarations.length !== 1 ||
              cnode.declarations[0].init) &&
            cnode.type !== 'FunctionDeclaration' &&
            (cnode.type !== 'ExportNamedDeclaration' || !cnode.declaration || cnode.declaration.type !== 'FunctionDeclaration')
          ) {
            // We don't consider var statements with inits to be normalized for hoisting
            // We don't consider var statements that declare multiple bindings to be normalized for hoisting
            // Exported functions are still hoisted the same as regular function declarations are hoisted
            hoisting = false;
          }
          stmt(node, 'body', i, cnode, false, hoisting);
        });
        statementifySequences(node);
        break;
      }

      case 'BreakStatement': {
        break;
      }

      case 'ClassDeclaration': {
        processClass(node, false, isExport);
        break;
      }

      case 'ContinueStatement': {
        break;
      }

      case 'DebuggerStatement': {
        break;
      }

      case 'DoWhileStatement': {
        stmt(node, 'body', -1, node.body);
        if (node.body.type !== 'BlockStatement') {
          log('Wrapping do-while sub-statement in a block');
          crumb(node, 'body', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.body],
            $p: $p(),
          });
          uncrumb(node, 'body', -1);
        }
        expr(node, 'test', -1, node.test);
        break;
      }

      case 'ExportAllDeclaration': {
        break;
      }

      case 'ExportDefaultDeclaration': {
        // export default expr
        // export default function(){}
        // export default class(){}

        if (node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') {
          stmt(node, 'declaration', -1, node.declaration, 'default');
        } else {
          expr(node, 'declaration', -1, node.declaration);
        }
        break;
      }

      case 'ExportNamedDeclaration': {
        // These have a declaration and no specifiers:
        // - export function f (){}
        // - export class g {}
        // - export let a
        // - export const b = 1
        // - export var c = 2

        // These have specifiers and no declaration. One specifier per exported symbols.
        // Type of export may affect type of specifier node
        // - var d,e; export {d,e}
        // - export {x}
        // - export {x as y}
        // - export x from 'foo'
        // - export {x} from 'foo'
        // - export * as y from 'foo'     (not same as only *)
        // - export {x as z} from 'foo'

        if (node.source) {
        } else if (node.declaration) {
          stmt(node, 'declaration', -1, node.declaration, true);
        }
        break;
      }

      case 'ExpressionStatement': {
        expr(node, 'expression', -1, node.expression);
        break;
      }

      case 'EmptyStatement': {
        break;
      }

      case 'ForStatement': {
        if (node.init) {
          if (node.init.type === 'VariableDeclaration') {
            stmt(node, 'init', -1, node.init);
          } else {
            expr(node, 'init', -1, node.init);
          }
        }
        if (node.test) {
          expr(node, 'test', -1, node.test);
        }
        if (node.update) {
          expr(node, 'update', -1, node.update);
        }
        stmt(node, 'body', -1, node.body);
        if (node.body.type !== 'BlockStatement') {
          log('Wrapping for-loop sub-statement in a block');
          crumb(node, 'body', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.body],
            $p: $p(),
          });
          uncrumb(node, 'body', -1);
        }
        break;
      }

      case 'ForInStatement': {
        expr(node, 'right', -1, node.right);
        if (node.left.type === 'VariableDeclaration') {
        } else {
          expr(node, 'left', -1, node.left);
        }
        stmt(node, 'body', -1, node.body);
        if (node.body.type !== 'BlockStatement') {
          log('Wrapping for-in sub-statement in a block');
          crumb(node, 'body', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.body],
            $p: $p(),
          });
          uncrumb(node, 'body', -1);
        }
        break;
      }

      case 'ForOfStatement': {
        // TODO: This needs proper support for iterable stuff for true support. We could start with superficial support.
        if (node.await) {
          TOFIX;
        }

        // Get the kind of the type of the rhs. Initially, that means string for strings and kind for arrays.
        expr(node, 'right', -1, node.right);

        if (node.left.type === 'VariableDeclaration') {
        } else {
          expr(node, 'left', -1, node.left);
        }

        stmt(node, 'body', -1, node.body);
        if (node.body.type !== 'BlockStatement') {
          log('Wrapping for-of sub-statement in a block');
          crumb(node, 'body', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.body],
            $p: $p(),
          });
          uncrumb(node, 'body', -1);
        }
        break;
      }

      case 'FunctionDeclaration': {
        log('Name:', node.id ? node.id.name : '<anon>');
        if (node.id) expr(node, 'id', -1, node.id);
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);
        stmt(node, 'body', -1, node.body, false, false, true);

        ASSERT(funcStack[funcStack.length - 1] === node, 'top of funcStack should be the current node');
        const meta = getMetaForBindingName(node.id, true);
        if (meta.isExport) {
          const parent = crumbGet(2);
          ASSERT(
            parent.type === 'ExportNamedDeclaration',
            'phase1 should have made sure that if the meta says isExport that the parent is a ExportNamedDeclaration',
            parent.type,
            node.id?.name,
          );
          log(
            'Replace the exported func decl node with an empty statement and put the parent on a list to be prepended to the function body',
          );
          funcStack[funcStack.length - 2].$p.funcBindingsToInject.push(parent);
          crumbSet(2, { type: 'EmptyStatement', $p: $p() });
        } else {
          log('Replace the func decl node with an empty statement and put the node itself on a list to be prepended to the function body');
          funcStack[funcStack.length - 2].$p.funcBindingsToInject.push(node);
          crumbSet(1, { type: 'EmptyStatement', $p: $p() });
        }

        break;
      }

      case 'IfStatement': {
        expr(node, 'test', -1, node.test);
        stmt(node, 'consequent', -1, node.consequent);
        if (node.consequent.type !== 'BlockStatement') {
          log('Wrapping if-consequent sub-statement in a block');
          crumb(node, 'consequent', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.consequent],
            $p: $p(),
          });
          uncrumb(node, 'consequent', -1);
        }
        if (node.alternate) {
          stmt(node, 'alternate', -1, node.alternate);
          if (node.alternate.type !== 'BlockStatement') {
            log('Wrapping else-alternate sub-statement in a block');
            crumb(node, 'alternate', -1);
            crumbSet(1, {
              type: 'BlockStatement',
              body: [node.alternate],
              $p: $p(),
            });
            uncrumb(node, 'alternate', -1);
          }
        }
        break;
      }

      case 'ImportDeclaration': {
        break;
      }

      case 'Program': {
        oneDeclOneBinding(node); // do this before
        let hoisting = true; // false at first body element that is neither a noop var statement nor a func decl
        node.body.forEach((cnode, i) => {
          if (
            hoisting &&
            (cnode.type !== 'VariableDeclaration' ||
              cnode.kind !== 'var' ||
              cnode.declarations.length !== 1 ||
              cnode.declarations[0].init) &&
            cnode.type !== 'FunctionDeclaration' &&
            (cnode.type !== 'ExportNamedDeclaration' || !cnode.declaration || cnode.declaration.type !== 'FunctionDeclaration')
          ) {
            // We don't consider var statements with inits to be normalized for hoisting
            // We don't consider var statements that declare multiple bindings to be normalized for hoisting
            // Exported functions are still hoisted the same as regular function declarations are hoisted
            hoisting = false;
          }
          stmt(node, 'body', i, cnode, false, hoisting);
        });
        statementifySequences(node);
        break;
      }

      case 'ReturnStatement': {
        if (node.argument) {
          expr(node, 'argument', -1, node.argument);
        }
        break;
      }

      case 'TryStatement': {
        stmt(node, 'block', -1, node.block);
        if (node.handler) {
          stmt(node, 'handler', 'body', node.handler.body);
        }
        if (node.finalizer) {
          stmt(node, 'finalizer', -1, node.finalizer);
        }
        break;
      }

      case 'SwitchStatement': {
        expr(node, 'discriminant', -1, node.discriminant);
        node.cases.forEach((cnode, i) => {
          // The `default` is in this list as well and has no test node
          if (cnode.test) {
            expr2(node, 'cases', i, cnode, 'test', -1, cnode.test);
          }
          // Wrap in block first. This way block-dedenting can still happen if necessary.
          // Switch is unique in that this transform may still cause nested blocks. Other occurrences for normalization do not.
          if (cnode.consequent.length > 1 || (cnode.consequent[0] && cnode.consequent[0].type !== 'BlockStatement')) {
            log('Wrapping case block in an actual block');
            cnode.consequent = [
              {
                type: 'BlockStatement',
                body: cnode.consequent,
                $p: $p(),
              },
            ];
          }
          cnode.consequent.forEach((dnode, i) => stmt(cnode, 'consequent', i, dnode));
        });
        break;
      }

      case 'ThrowStatement': {
        expr(node, 'argument', -1, node.argument);
        break;
      }

      case 'VariableDeclaration': {
        const kind = node.kind;
        const names = [];
        node.declarations.forEach((dnode, i) => {
          if (dnode.init) {
            expr2(node, 'declarations', i, dnode, 'init', -1, dnode.init);
          }

          // The paramNode can be either an Identifier or a pattern of sorts
          if (dnode.id.type === 'Identifier') {
            const meta = getMetaForBindingName(dnode.id);
            meta.usages.push(dnode.id);
            names.push(dnode.id.name);
          } else if (dnode.id.type === 'ArrayPattern') {
            // Complex case. Walk through the destructuring pattern.
            dnode.id.elements.forEach((node) => destructBindingArrayElement(node, kind));
          } else if (dnode.id.type === 'ObjectPattern') {
            // Complex case. Walk through the destructuring pattern.
            dnode.id.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, dnode.id, kind));
          } else {
            ASSERT(false, 'wat is dis', [dnode.id.type], dnode);
          }
        });

        if (kind === 'var') {
          if (stillHoisting) {
            log('This is a var but we are still hoisting so it should be a noop var decl of one binding. Skipping normalization.');
          } else {
            log('`var` statement declared these names:', names);
            log('Moving the decl itself to the top of the function while keeping the init as they are');

            funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: names.map((name) => ({
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name,
                  $p: $p(),
                },
                init: null,
                $p: $p(),
              })),
              $p: $p(),
            });

            // TODO: drop individual declarators, if not the whole thing
            if (node.declarations.every((enode) => !enode.init)) {
              // If none of the bindings had an init, this is dead code. Drop the decl
              crumbSet(1, {
                type: 'EmptyStatement',
                $p: $p(),
              });
            } else {
              // Don't hate me. The printer does not validate the AST. It just assumes the structure is valid and prints verbatim.
              node.kind = ''; // This removes the `var` when printing, causing a sequence expression (or simple assignment)
            }

            // We explicitly track whether we are still in a hoisting header, and if so, will skip this normalization step
            // So we should not have to worry about running this optimization over and over again.
            changed = true;
          }
        }

        break;
      }

      case 'WhileStatement': {
        expr(node, 'test', -1, node.test);
        stmt(node, 'body', -1, node.body);
        if (node.body.type !== 'BlockStatement') {
          log('Wrapping while sub-statement in a block');
          crumb(node, 'body', -1);
          crumbSet(1, {
            type: 'BlockStatement',
            body: [node.body],
            $p: $p(),
          });
          uncrumb(node, 'body', -1);
        }
        break;
      }

      default: {
        log('unknown statement node:', node);
        log('Missing support for stmt ' + node.type);
        throw new Error('Missing support for stmt ' + node.type);
      }
    }

    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      lexScopeStack.pop();
    }

    groupEnd();
  }
  function expr2(parent2, prop2, index2, parent, prop, index, node) {
    // Skip one property
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
    }

    crumb(parent2, prop2, index2);
    expr(parent, prop, index, node);
    uncrumb(parent2, prop2, index2);

    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.pop();
    }
  }
  function expr(parent, prop, index, node) {
    ASSERT(
      !Array.isArray(parent[prop]) || index >= 0,
      'if parent.prop is an array then the index should be >= 0',
      parent,
      prop,
      index,
      node,
    );
    ASSERT(
      Array.isArray(parent[prop]) ? parent[prop][index] === node : parent[prop] === node,
      'parent[prop] (/[index]) should be node',
      parent,
      prop,
      index,
      node,
    );

    crumb(parent, prop, index);
    _expr(node);
    uncrumb(parent, prop, index);
  }
  function _expr(node) {
    group(DIM + 'expr(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);

    if (node.$scope) {
      lexScopeStack.push(node);
    }

    switch (node.type) {
      case 'ArrayExpression': {
        if (!normalizeArrayElementsChangedSomething(node)) {
          for (let i = 0; i < node.elements.length; ++i) {
            const elNode = node.elements[i];
            group('-', elNode ? elNode.type : '<none>');
            if (elNode) {
              if (elNode.type === 'SpreadElement') {
                // Special case spread because its behavior differs per parent case
                expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
              } else {
                expr(node, 'elements', i, elNode);
              }
            }
            groupEnd();
          }
        }
        break;
      }

      case 'AssignmentExpression': {
        expr(node, 'right', -1, node.right);
        expr(node, 'left', -1, node.left);

        if (node.left.type === 'MemberExpression' && node.left.object.type === 'SequenceExpression') {
          // `(a, b).c = d` (occurs as a transformation artifact)
          // -> `(a, b.c = d)`
          const memb = node.left;
          const seq = memb.object;
          const exprs = seq.expressions.slice(0); // Last one will replace the sequence

          const newNode = {
            type: 'SequenceExpression',
            expressions: [
              ...exprs.slice(0, -1),
              {
                type: 'AssignmentExpression',
                operator: node.operator,
                left: exprs.pop(),
                right: node.right,
                $p: $p(),
              },
            ],
            $p: $p(),
          };
          crumbSet(1, newNode);
          _expr(newNode);
          changed = true;
        } else if (node.right.type === 'SequenceExpression') {
          // `a = (b, c)`
          // -> `(b, a = c)`
          const seq = node.right;
          const exprs = seq.expressions.slice(0); // Last one will replace the sequence

          const newNode = {
            type: 'SequenceExpression',
            expressions: [
              ...exprs.slice(0, -1),
              {
                type: 'AssignmentExpression',
                operator: node.operator,
                left: node.left,
                right: exprs.pop(),
                $p: $p(),
              },
            ],
            $p: $p(),
          };
          crumbSet(1, newNode);
          _expr(newNode);
          changed = true;
        } else if (node.right.type === 'MemberExpression' && node.right.object.type === 'SequenceExpression') {
          // `a = (b, c).d`
          // -> `(b, a = c.d)`
          const mem = node.right;
          const seq = mem.object;
          const exprs = seq.expressions.slice(0);
          const newNode = {
            type: 'SequenceExpression',
            expressions: [
              ...exprs.slice(0, -1),
              {
                type: 'AssignmentExpression',
                operator: node.operator,
                left: node.left,
                right: {
                  type: 'MemberExpression',
                  computed: mem.computed,
                  object: exprs.pop(),
                  property: mem.property,
                  $p: $p(),
                },
                $p: $p(),
              },
            ],
            $p: $p(),
          };
          crumbSet(1, newNode);
          _expr(newNode);
          changed = true;
        }

        break;
      }

      case 'ArrowFunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        if (node.expression) {
          expr(node, 'body', -1, node.body);
        } else {
          stmt(node, 'body', -1, node.body, false, false, true);
        }

        break;
      }

      case 'BinaryExpression': {
        log('Operator:', node.operator);

        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);

        //switch (node.operator) {
        //  case '+': {
        //    break;
        //  }
        //  case '-': {
        //    break;
        //  }
        //  case '==':
        //  case '!=':
        //    break;
        //  case '===':
        //  case '!==':
        //    break;
        //  case '<':
        //  case '<=':
        //  case '>':
        //  case '>=':
        //    break;
        //
        //  case 'instanceof': {
        //    break;
        //  }
        //
        //  case 'in': {
        //    break;
        //  }
        //
        //  default:
        //    break;
        //}

        break;
      }

      case 'CallExpression': {
        if (!normalizeCallArgsChangedSomething(node, false)) {
          if (!normalizeCalleeChangedSomething(node, false)) {
            node.arguments.forEach((anode, i) => {
              if (anode.type === 'SpreadElement') {
                expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
              } else {
                expr(node, 'arguments', i, anode);
              }
            });

            // `super` itself is not an actual value
            if (node.callee.type !== 'Super') {
              // Find the callee.
              // If it's an ident, figure out if we can determine that it's a function.
              // If it's a function, determine whether
              // - it is pure; consider to inline it somehow
              // - it has a static return value; replace the call with its value and move the call up in hopes of eliminating it
              // - a pure function with a fixed outcome can be replaced entirely. but how many of those will we find here.

              expr(node, 'callee', -1, node.callee);
            }
          }
        }

        break;
      }

      case 'ClassExpression': {
        processClass(node, true, false);
        break;
      }

      case 'ConditionalExpression': {
        if (isComplexNodeOrAlreadySequenced(node.test)) {
          // `a ? b : c`
          // -> `(tmp = a, tmp) ? b : c`
          // -> `(tmp = a, (tmp ? b : c))`
          // -> `tmp = a; tmp ? b : c;`
          node.test = sequenceNode(node.test, 'tmpTernaryTest');
          changed = true;
        }
        if (node.test.type === 'SequenceExpression' && !isComplexNode(node.test.expressions[node.test.expressions.length - 1])) {
          // `(a, b) ? c : d`
          // -> `(a, (b ? c : d))`
          const exprs = node.test.expressions;
          node.test = exprs.pop();
          const seq = {
            type: 'SequenceExpression',
            expressions: [...exprs, node],
            $p: $p(),
          };
          crumbSet(1, seq);
          changed = 1;
        }
        if (isComplexNodeOrAlreadySequenced(node.consequent)) {
          // `a ? b : c`
          // -> `a ? (tmp = b, tmp) : c`
          node.consequent = sequenceNode(node.consequent, 'tmpTernaryConsequent');
          changed = true;
        }
        if (isComplexNodeOrAlreadySequenced(node.alternate)) {
          // `a ? b : c`
          // -> `a ? b : (tmp = c, tmp)`
          node.alternate = sequenceNode(node.alternate, 'tmpTernaryAlternate');
          changed = true;
        }

        expr(node, 'test', -1, node.test);
        expr(node, 'consequent', -1, node.consequent);
        expr(node, 'alternate', -1, node.alternate);
        break;
      }

      case 'FunctionExpression': {
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body, false, false, true);

        break;
      }

      case 'Identifier': {
        const meta = getMetaForBindingName(node);
        log('Recording a usage for `' + meta.originalName + '` -> `' + meta.uniqueName + '`');
        meta.usages.push(node);
        break;
      }

      case 'Literal': {
        log('Value:', [node.value]);
        //if (typeof node.value === 'string') {
        //} else if (typeof node.value === 'number') {
        //} else if (typeof node.value === 'boolean') {
        //} else if (node.regex !== undefined) {
        //} else if (node.value === null) {
        //} else {
        //}
        break;
      }

      case 'LogicalExpression': {
        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);
        break;
      }

      case 'MemberExpression': {
        // Normalize `a.b.c` to `(tmp = a.b, tmp.c)` for any a that is not an ident or primitive. Then visit them.
        if (
          // If the object is complex, and it is not a sequence that ends with a simple node, then transform it.
          // We rewrite into a sequence that ends with an identifier. So that's fine to keep
          isComplexNode(node.object) &&
          (node.object.type !== 'SequenceExpression' || isComplexNode(node.object.expressions[node.object.expressions.length - 1]))
        ) {
          // expr.prop => (tmp = expr, tmp).prop

          log('Replacing a complex object of a member expression with a sequence that ends with an identifier');

          const seq = sequenceNode(node.object, 'tmpObj');
          const property = node.property;
          const newLeftNode = {
            type: 'MemberExpression',
            computed: node.computed,
            object: seq,
            property: property,
            $p: $p(),
          };

          crumbSet(1, newLeftNode);
          _expr(newLeftNode);
          changed = true;
          break;
        }

        if (node.computed && isComplexNode(node.property)) {
          // `a[b]`
          // -> `(tmp=b, a[tmp])`

          const tmpName = createFreshVarInCurrentRootScope('tmpComputedProp');

          funcStack[funcStack.length - 1].$p.varBindingsToInject.push({
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: tmpName,
                  $p: $p(),
                },
                init: null,
                $p: $p(),
              },
            ],
            $p: $p(),
          });

          const seq = {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: tmpName,
                  $p: $p(),
                },
                right: node.property,
                $p: $p(),
              },
              {
                type: 'MemberExpression',
                computed: true,
                object: node.object,
                property: {
                  type: 'Identifier',
                  name: tmpName,
                  $p: $p(),
                },
                $p: $p(),
              },
            ],
            $p: $p(),
          };

          crumbSet(1, seq);
          _expr(seq);
          changed = true;
          break;
        }
        if (node.computed && node.property.type === 'Literal' && typeof node.property.value === 'string') {
          // If the key name is a legit key then why not. Let's just test it.
          // Note: will need to do this during phase2 and phase4 as well because a value might resolve to a string at a later step.
          let simpleIdent = true;
          try {
            Function('foo["' + node.property.value + '"]');
          } catch {
            simpleIdent = false;
          }
          if (simpleIdent) {
            // `foo["bar"]` -> `foo.bar`
            log('Converting dynamic property access with string literal that is a valid ident, to regular property access');
            node.computed = false;
            node.property = {
              type: 'Identifier',
              name: node.property.value,
              $p: $p(),
            };
            changed = true;
          }
        }

        // Walk the property structure in such a way that it visits the root object first, then back up to the leaf property
        // Any dynamic expressions get visited before the next property access
        // It's kind a messy, useful for the other project, maybe not here, and maybe I'll rewrite it.
        function r(node) {
          if (node.type === 'MemberExpression') {
            // Visit the object first, then on the way up potentially walk the computed prop expresison if it one
            crumb(node, 'object', -1, node.object);
            r(node.object);
            uncrumb(node, 'object', -1);
            if (node.computed) {
              expr(node, 'property', -1, node.property);
            }
          } else if (node.type === 'Super') {
          } else {
            _expr(node); // Root object
          }
        }
        r(node);
        break;
      }

      case 'NewExpression': {
        if (!normalizeCallArgsChangedSomething(node, true)) {
          if (!normalizeCalleeChangedSomething(node, true)) {
            node.arguments.forEach((anode, i) => {
              if (anode.type === 'SpreadElement') {
                expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
              } else {
                expr(node, 'arguments', i, anode);
              }
            });

            expr(node, 'callee', -1, node.callee);
          }
        }

        break;
      }

      case 'ObjectExpression': {
        node.properties.forEach((pnode, i) => {
          if (pnode.type === 'SpreadElement') {
            expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
          } else {
            if (pnode.shorthand) {
              // I think it _is_ this simple?
              pnode.shorthand = false;
            }

            expr2(node, 'properties', i, pnode, 'value', -1, pnode.value);
          }
        });

        break;
      }

      case 'RegExpLiteral': {
        break;
      }

      case 'SequenceExpression': {
        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
        });

        flattenSequences(node);

        break;
      }

      case 'Super': {
        // Two cases:
        // - call
        // - prop
        break;
      }

      case 'TemplateLiteral': {
        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
        });
        break;
      }

      case 'ThisExpression': {
        break;
      }

      case 'UnaryExpression': {
        expr(node, 'argument', -1, node.argument);

        //switch (node.operator) {
        //  case 'delete': {
        //    break;
        //  }
        //
        //  case '+':
        //  case '-':
        //  case '~': {
        //    break;
        //  }
        //
        //  case '!': {
        //    break;
        //  }
        //
        //  case 'typeof': {
        //    break;
        //  }
        //
        //  case 'void': {
        //    break;
        //  }
        //
        //  default: {
        //  }
        //}

        break;
      }

      case 'UpdateExpression': {
        expr(node, 'argument', -1, node.argument);
        break;
      }

      default: {
        throw new Error('Missing support for expr ' + node.type);
      }
    }

    if (node.$scope) {
      lexScopeStack.pop();
    }

    groupEnd();
  }

  function processClass(node, isExpr, isExport) {
    superCallStack.push(node);

    if (node.superClass) expr(node, 'superClass', -1, node.superClass);

    if (node.body.body.length > 0) {
      node.body.body.forEach((cnode, i) => {
        if (!cnode) return; // possible
        ASSERT(cnode.type === 'MethodDefinition', 'expand once class syntax is not just method definitions');
        if (cnode.computed) {
          // I think the computed key of a method should be visited first...?
          crumb(node, 'body', -1);
          expr2(node.body, 'body', i, cnode, 'key', cnode.key);
          uncrumb(node, 'body', -1);
        }

        crumb(node, 'body', -1);
        expr2(node.body, 'body', i, cnode, 'value', -1, cnode.value);
        uncrumb(node, 'body', -1);
      });
    }

    //if (isExpr) {
    //  if (node.id){}
    //} else {
    //  if (node.id) {}
    //}

    superCallStack.pop();
  }

  function freshMemberExpression(objName, propName) {
    log('freshMemberExpression:', objName, propName);
    return {
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'Identifier',
        name: objName,
        $p: $p(),
      },
      property: {
        type: 'Identifier',
        name: propName,
        $p: $p(),
      },
      $p: $p(),
    };
  }
  function freshMemberExpressionArray(objName, index) {
    log('freshMemberExpressionArray:', objName, index);
    return {
      type: 'MemberExpression',
      computed: true,
      object: {
        type: 'Identifier',
        name: objName,
        $p: $p(),
      },
      property: {
        type: 'Literal',
        value: index,
        raw: String(index),
        $p: $p(),
      },
      $p: $p(),
    };
  }
  function funcArgsWalkObjectPattern(node, cacheNameStack, newBindings) {
    group('- walkObjectPattern');

    node.properties.forEach((propNode, i) => {
      log('- prop', i, ';', propNode.type);

      if (propNode.type === 'RestElement') {
        // Yes, it's Element.
        // This is a "leaf" node. Rest properties cannot be patterns and cannot have a default
        // `function f({a, ...b}){ return b; }`
        // -> `function f(obj) { const tmp = obj.a; const {b: tmp3, ...b} = obj; }`
        // -> `function f(obj) { const tmp = obj.a; const b = objPatternRest(tmp, ['a']); return b; }
        // Object spread will actually be quite hard to emulate... Let's use something like `objPatternRest` as DSL for it.

        ASSERT(propNode.argument.type === 'Identifier', 'TODO: non ident rest keys?', propNode);

        const bindingName = propNode.argument.name;

        newBindings.push({
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: bindingName,
                $p: $p(),
              },
              init: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: BUILTIN_REST_HANDLER_NAME, //'objPatternRest',
                  $p: $p(),
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: cacheNameStack[cacheNameStack.length - 1],
                    $p: $p(),
                  },
                  {
                    type: 'ArrayExpression',
                    elements: node.properties
                      .filter((n) => n !== propNode)
                      .map((n) => ({
                        type: 'Literal',
                        value: n.key.name,
                        raw: '"' + n.key.name + '"',
                        $p: $p(),
                      })),
                    $p: $p(),
                  },
                ],
                $p: $p(),
              },
              $p: $p(),
            },
          ],
          $p: $p(),
        });

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
      }

      // If this is a leaf then use the actual name, otherwise use a placeholder
      const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('arrPatternStep');
      cacheNameStack.push(bindingName);

      // Store the property in this name. It's a regular property access and the previous step should
      // be cached already. So read it from that cache.
      newBindings.push({
        type: 'VariableDeclaration',
        kind: 'let',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: bindingName,
              $p: $p(),
            },
            // Previous prop step was stored in a var so access the prop on that var:
            init: freshMemberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name),
            $p: $p(),
          },
        ],
        $p: $p(),
      });

      if (propNode.value.type === 'AssignmentPattern') {
        log('The object pattern had a default. Preparing to compile that statement in that mutates `' + bindingName + '`');
        // Observable side effect order of defaults vs property reads...
        // `function e({a = f(), b = g()} = {get a(){ return h(); }})`
        // -> `e()`, calls `h()` then `g()`
        // -> `e({})`, calls `f()` then `g()`
        // So the `=undefined` check must go before reading the properties
        // However, we won't know what name the value will be stored in at this
        // point. So remember the node we will inject here and update the name
        // after processing the node. Should not be a problem... Fingers crossed.

        // TODO: should this be a ternary on a fresh binding? Like toplevel params would do?
        // `function([x = y])`
        // -> `if (x === undefined) x = y`
        const injectedDefaultNode = {
          type: 'IfStatement',
          test: {
            type: 'BinaryExpression',
            operator: '===',
            left: {
              type: 'Identifier',
              name: bindingName, // To be filled in after the next bit
              $p: $p(),
            },
            right: {
              type: 'Identifier',
              name: 'undefined',
              $p: $p(),
            },
            $p: $p(),
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: bindingName, // To be filled in after the next bit
                $p: $p(),
              },
              right: propNode.value.right,
              $p: $p(),
            },
            $p: $p(),
          },
          $p: $p(),
        };

        // Add now to maintain the execution order
        newBindings.push(injectedDefaultNode);
      }

      if (valueNode.type === 'ArrayPattern') {
        funcArgsWalkArrayPattern(valueNode, cacheNameStack, newBindings);
      } else if (valueNode.type === 'ObjectPattern') {
        // Every step that is not a leaf should be verified to be non-nullable
        funcArgsWalkObjectPattern(valueNode, cacheNameStack, newBindings);
      } else {
        ASSERT(valueNode.type === 'Identifier', 'welke nog meer?', valueNode);
      }

      cacheNameStack.pop();
    });

    groupEnd();
  }
  function funcArgsWalkArrayPattern(node, cacheNameStack, newBindings) {
    group('- walkArrayPattern');

    // If this is a leaf then use the actual name, otherwise use a placeholder
    const bindingName = node.type === 'Identifier' ? node.name : createFreshVarInCurrentRootScope('arrPatternSplat');
    cacheNameStack.push(bindingName);
    // Store this property in a local variable. Because it's an array pattern, we need to invoke the iterator. The easiest
    // way syntactically is to spread it into an array. Especially since we'll want indexed access to it later, anyways.
    newBindings.push({
      type: 'VariableDeclaration',
      kind: 'let',
      declarations: [
        {
          type: 'VariableDeclarator',
          id: {
            type: 'Identifier',
            name: bindingName,
            $p: $p(),
          },
          init: {
            type: 'ArrayExpression',
            elements: [
              {
                // Previous prop step was stored in a var so access the prop on that var.
                // Invoke the iterator by spreading it into an array. Also means we can safely try direct access
                type: 'SpreadElement',
                argument: { type: 'Identifier', name: cacheNameStack[cacheNameStack.length - 2], $p: $p() },
                $p: $p(),
              },
            ],
            $p: $p(),
          },
          $p: $p(),
        },
      ],
      $p: $p(),
    });

    node.elements.forEach((elemNode, i) => {
      log('elemNode:', elemNode);

      if (!elemNode) return; // Ignore elided elements (they will be `null` in the AST)

      if (elemNode.type === 'RestElement') {
        // This is a "leaf" node. Rest elements cannot be patterns and cannot have a default
        // `function f([a, ...b]){ return b; }`
        // -> `function f(arr) { const tmp = arr.a; const b = arr.slice(1); }`

        ASSERT(elemNode.argument.type === 'Identifier', 'TODO: non ident rest keys?', elemNode);

        const bindingName = elemNode.argument.name;

        newBindings.push({
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: bindingName,
                $p: $p(),
              },
              init: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: cacheNameStack[cacheNameStack.length - 1],
                    $p: $p(),
                  },
                  property: {
                    type: 'Identifier',
                    name: 'slice',
                    $p: $p(),
                  },
                  $p: $p(),
                },
                arguments: [
                  {
                    type: 'Literal',
                    value: i, // If rest is first arg, then arr.slice(0)
                    raw: String(i),
                    $p: $p(),
                  },
                ],
                $p: $p(),
              },
              $p: $p(),
            },
          ],
          $p: $p(),
        });

        return;
      }

      let valueNode = elemNode;
      if (elemNode.type === 'AssignmentPattern') {
        // `function([x=y])`
        // -> We'll first transform the `x` part. Afterwards we'll know what the binding name
        //    of that step will be. Then we'll add a check to see if that's `undefined` and
        //    in that case assign the node.right to it. That's essentially what happens here.
        valueNode = valueNode.left;
      }

      // Store this element in a local variable. If it's a leaf, use the actual
      // element name as the binding, otherwise create a fresh var for it.

      const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('arrPatternStep');
      cacheNameStack.push(bindingName);

      // Store the property in this name
      newBindings.push({
        type: 'VariableDeclaration',
        kind: 'let',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: {
              type: 'Identifier',
              name: bindingName,
              $p: $p(),
            },
            // Previous prop step was stored in a var so access the prop on that var:
            init: freshMemberExpressionArray(cacheNameStack[cacheNameStack.length - 2], i),
            $p: $p(),
          },
        ],
        $p: $p(),
      });

      if (elemNode.type === 'AssignmentPattern') {
        log('The array pattern had a default. Preparing to compile that statement in that mutates `' + bindingName + '`');
        // Observable side effect order of defaults vs property reads...
        // `function e({a = f(), b = g()} = {get a(){ return h(); }})`
        // -> `e()`, calls `h()` then `g()`
        // -> `e({})`, calls `f()` then `g()`
        // So the `=undefined` check must go before reading the properties
        // However, we won't know what name the value will be stored in at this
        // point. So remember the node we will inject here and update the name
        // after processing the node. Should not be a problem... Fingers crossed.

        // TODO: should this be a ternary on a fresh binding? Like toplevel params would do?
        // `function([x = y])`
        // -> `if (x === undefined) x = y`
        const injectedDefaultNode = {
          type: 'IfStatement',
          test: {
            type: 'BinaryExpression',
            operator: '===',
            left: {
              type: 'Identifier',
              name: bindingName,
              $p: $p(),
            },
            right: {
              type: 'Identifier',
              name: 'undefined',
              $p: $p(),
            },
            $p: $p(),
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: bindingName,
                $p: $p(),
              },
              right: elemNode.right,
              $p: $p(),
            },
            $p: $p(),
          },
          $p: $p(),
        };

        // Add now to maintain the execution order
        newBindings.push(injectedDefaultNode);
      }

      if (valueNode.type === 'ObjectPattern') {
        funcArgsWalkObjectPattern(valueNode, cacheNameStack, newBindings);
      } else if (valueNode.type === 'ArrayPattern') {
        funcArgsWalkArrayPattern(valueNode, cacheNameStack, newBindings);
      } else {
        ASSERT(valueNode.type === 'Identifier', 'ook dat nog', valueNode);
      }

      cacheNameStack.pop();
    });

    cacheNameStack.pop();

    groupEnd();

    return bindingName;
  }
  function processFuncArgs(funcNode) {
    group(DIM + 'function(' + RESET + BLUE + 'parameters' + RESET + DIM + ')' + RESET);

    let minParamRequired = 0; // Ends up as the last non-rest param without default, +1
    let hasRest = false;
    let paramBindingNames = []; // Includes names inside pattern

    funcNode.params.forEach((pnode, i) => {
      if (pnode.type === 'RestElement') {
        log('- Rest param');
        hasRest = true;
        const uniqueName = findUniqueNameForBindingIdent(pnode.argument);
        const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
        paramBindingNames.push(uniqueName);
        meta.usages.push(pnode.argument);
        return;
      }

      // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
      const newBindings = [];

      // Node to represent the cache of the current property/element step
      const cacheNameStack = [];

      // Now there's basically two states: a param with a default or without a default. The params with a default
      // have an node that is basically "boxed" into an AssignmentPattern. Put the right value on the stack and
      // continue to process the left value. Otherwise, put null on the stack and process the node itself.
      // See https://gist.github.com/pvdz/dc2c0a477cc276d1b9e6e2ddbb417135 for a brute force set of test cases
      // See https://gist.github.com/pvdz/867502f6ed2dd902d061c82e38a81181 for the hack to regenerate them
      if (pnode.type === 'AssignmentPattern') {
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

        expr2(funcNode, 'params', i, pnode, 'right', -1, pnode.right);

        if (pnode.left.type === 'Identifier') {
          // param default ident
          expr2(funcNode, 'params', i, pnode, 'right', -1, pnode.right);

          const newName = createUniqueGlobalName('$tdz$__' + pnode.left.name);
          registerGlobalIdent(newName, newName);
          cacheNameStack.push(newName);

          log('Replacing param default with a local variable');
          const newIdentNode = {
            type: 'Identifier',
            name: newName,
            $p: $p(),
          };
          funcNode.params[i] = newIdentNode;

          // Put new nodes at the start of the function body
          ASSERT(!funcNode.expression, 'fixme implement me');
          // TODO: reverse param order
          newBindings.push({
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: pnode.left,
                init: {
                  // param === undefined ? init : param
                  type: 'ConditionalExpression',
                  test: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: newName,
                      $p: $p(),
                    },
                    operator: '===',
                    right: {
                      type: 'Identifier',
                      name: 'undefined',
                      $p: $p(),
                    },
                    $p: $p(),
                  },
                  consequent: pnode.right,
                  alternate: {
                    type: 'Identifier',
                    name: newName,
                    $p: $p(),
                  },
                  $p: $p(),
                },
                $p: $p(),
              },
            ],
            $p: $p(),
          });

          log('- Ident param;', '`' + pnode.left.name + '`');
          const meta = getMetaForBindingName(pnode.left);
          meta.usages.push(pnode.left);

          const metaNew = getMetaForBindingName(newIdentNode);
          metaNew.usages.push(newIdentNode);
        } else {
          // param default pattern

          // Param name to hold the object to destructure
          const newName = createUniqueGlobalName('$tdz$__pattern');
          registerGlobalIdent(newName, newName);
          cacheNameStack.push(newName);
          log('Replacing param default with a local variable');
          const newIdentNode = {
            type: 'Identifier',
            name: newName,
            $p: $p(),
          };
          funcNode.params[i] = newIdentNode;

          // Create unique var containing the initial param value after resolving default values
          const undefaultName = createUniqueGlobalName('$tdz$__pattern_after_default');
          registerGlobalIdent(undefaultName, undefaultName);
          cacheNameStack.push(undefaultName);
          log('Replacing param default with a local variable');
          const undefaultNameNode = {
            type: 'Identifier',
            name: undefaultName,
            $p: $p(),
          };

          // Put new nodes at the start of the function body
          ASSERT(!funcNode.expression, 'fixme implement me');
          // TODO: reverse param order
          newBindings.push({
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: undefaultNameNode,
                init: {
                  // param === undefined ? init : param
                  type: 'ConditionalExpression',
                  test: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: newName,
                      $p: $p(),
                    },
                    operator: '===',
                    right: {
                      type: 'Identifier',
                      name: 'undefined',
                      $p: $p(),
                    },
                    $p: $p(),
                  },
                  consequent: pnode.right,
                  alternate: {
                    type: 'Identifier',
                    name: newName,
                    $p: $p(),
                  },
                  $p: $p(),
                },
                $p: $p(),
              },
            ],
            $p: $p(),
          });

          const metaNew = getMetaForBindingName(newIdentNode);
          metaNew.usages.push(newIdentNode);

          // Then walk the whole pattern.
          // - At every step of the pattern create code that stores the value of that step in a tmp variable.
          // - Store the tmp var in a stack (pop it when walking out)
          // - A leaf node should be able to access the property from the binding name at the top of the stack

          if (pnode.left.type === 'ObjectPattern') {
            log('- Starting from an object pattern param');
            // `function({x}) {}`
            // -> `function(obj) { var x = obj.x; }
            funcArgsWalkObjectPattern(pnode.left, cacheNameStack, newBindings);
          } else if (pnode.left.type === 'ArrayPattern') {
            // `function([x]) {}`
            // -> `function(obj) { var tmp = [...obj]; var x = tmp[0]; }
            log('- Starting from an array pattern param');
            funcArgsWalkArrayPattern(pnode.left, cacheNameStack, newBindings);
          } else {
            ASSERT(false, 'what else?', pnode.left);
          }
        }
      } else {
        minParamRequired = i + 1;

        if (pnode.type === 'Identifier') {
          log('- Ident param;', '`' + pnode.name + '`');
          const meta = getMetaForBindingName(pnode);
          meta.usages.push(pnode);
        } else if (pnode.type === 'ObjectPattern' || pnode.type === 'ArrayPattern') {
          const tmpName = createFreshVarInCurrentRootScope('tmpParamPattern');
          cacheNameStack.push(tmpName);
          log('- Replacing the pattern param with', '`' + tmpName + '`');
          // Replace the pattern with a variable that receives the whole object
          const newIdentNode = {
            type: 'Identifier',
            name: tmpName,
            $p: $p(),
          };
          funcNode.params[i] = newIdentNode;
          const metaNew = getMetaForBindingName(newIdentNode);
          metaNew.usages.push(newIdentNode);

          // Then walk the whole pattern.
          // - At every step of the pattern create code that stores the value of that step in a tmp variable.
          // - Store the tmp var in a stack (pop it when walking out)
          // - A leaf node should be able to access the property from the binding name at the top of the stack

          if (pnode.type === 'ObjectPattern') {
            log('- Starting from an object pattern param');
            // `function({x}) {}`
            // -> `function(obj) { var x = obj.x; }
            funcArgsWalkObjectPattern(pnode, cacheNameStack, newBindings);
          } else if (pnode.type === 'ArrayPattern') {
            // `function([x]) {}`
            // -> `function(obj) { var tmp = [...obj]; var x = tmp[0]; }
            log('- Starting from an array pattern param');
            funcArgsWalkArrayPattern(pnode, cacheNameStack, newBindings);
          } else {
            ASSERT(false, 'dunno wat dis is', pnode);
          }
        } else {
          ASSERT(false, 'wat else?', pnode);
        }
      }

      if (newBindings.length) {
        funcNode.body.body.unshift(...newBindings);
        changed = true;
      }
    });

    groupEnd();

    return { minParamRequired, hasRest, paramBindingNames };
  }

  function processArrayPatternElement(node, paramBindingNames) {
    let enode = node;
    if (node.type === 'AssignmentPattern') {
      expr(node, 'right', -1, node.right);
      enode = node.left;
    }

    if (enode.type === 'ObjectPattern') {
      enode.properties.forEach((e) => processObjectPatternProp(e, enode, paramBindingNames));
    } else if (enode.type === 'ArrayPattern') {
      enode.elements.forEach((n) => processArrayPatternElement(n, paramBindingNames));
    } else if (enode.type === 'RestElement') {
      const uniqueName = findUniqueNameForBindingIdent(enode.argument);
      paramBindingNames.push(uniqueName);
    } else {
      const uniqueName = findUniqueNameForBindingIdent(enode);
      paramBindingNames.push(uniqueName);
    }
  }
  function processObjectPatternProp(node, objNode, paramBindingNames) {
    if (node.type === 'RestElement') {
      objNode.properties.forEach((pnode, i) => {
        if (pnode.type === 'Property') {
          if (pnode.computed) {
            expr2(objNode, 'properties', i, pnode, 'property', -1, pnode.property);
          }
        }
      });

      const uniqueName = findUniqueNameForBindingIdent(node.argument);
      paramBindingNames.push(uniqueName);
    } else {
      let vnode = node.value;
      let assign = vnode.type === 'AssignmentPattern';
      let lnode = vnode.left;
      crumb(node, 'value', -1);
      if (assign) {
        expr(vnode, 'right', -1, vnode.right);
        crumb(vnode, 'left', -1);
        vnode = lnode;
      }

      if (vnode.type === 'ObjectPattern') {
        vnode.properties.forEach((pnode, i) => {
          crumb(vnode, 'properties', i);
          processObjectPatternProp(pnode, vnode, paramBindingNames);
          uncrumb(vnode, 'properties', i);
        });
      } else if (vnode.type === 'ArrayPattern') {
        vnode.elements.forEach((n) => processArrayPatternElement(n, paramBindingNames));
      } else {
        ASSERT(vnode.type === 'Identifier', 'fixme if different value', vnode);
        const uniqueName = findUniqueNameForBindingIdent(vnode);
        paramBindingNames.push(uniqueName);
      }

      if (assign) {
        uncrumb(lnode, 'left', -1);
      }
      uncrumb(node, 'value', -1);
    }
  }

  function destructBindingObjectProp(pnode, objNode, kind) {
    if (pnode.type === 'Property') {
      if (pnode.computed) {
        expr(pnode, 'property', -1, pnode.property);
        return;
      }
      if (pnode.value.type === 'Identifier') {
      } else if (pnode.value.type === 'ObjectPattern') {
        pnode.value.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, pnode.value, kind));
      } else if (pnode.value.type === 'ArrayPattern') {
        pnode.value.elements.forEach((node) => destructBindingArrayElement(node, kind));
      } else {
        let vnode = pnode.value.left;
        expr(pnode, 'value', -1, pnode.value, 'right', -1, pnode.value.right);
        if (vnode.type === 'Identifier') {
        } else if (vnode.value.type === 'ObjectPattern') {
          pnode.value.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, pnode.value, kind));
        } else if (vnode.value.type === 'ArrayPattern') {
          pnode.value.elements.forEach((node) => destructBindingArrayElement(node, kind));
        } else {
          ASSERT(false, 'fixme for other nodes', vnode);
        }
      }
    } else if (pnode.type === 'RestElement') {
      objNode.properties.forEach((pnode) => {
        if (pnode.type === 'Property') {
          if (pnode.computed) {
            expr(pnode, 'property', -1, pnode.property);
            return null;
          }
        } else {
        }
      });
    } else {
      ASSERT(false, 'fixme', pnode);
    }
  }
  function destructBindingArrayElement(pnode, kind) {
    let enode = pnode;
    if (pnode.type === 'AssignmentPattern') {
      expr(pnode, 'right', -1, pnode.right);
      enode = pnode.left;
    }

    if (enode.type === 'Identifier') {
    } else if (enode.type === 'ObjectPattern') {
      enode.properties.forEach((ppnode) => destructBindingObjectProp(ppnode, enode, kind));
    } else if (enode.type === 'ArrayPattern') {
      enode.elements.forEach((node) => destructBindingArrayElement(node, kind));
    } else if (pnode.type === 'RestElement') {
    } else {
      ASSERT(false, 'fixme if else', enode);
    }
  }
}
