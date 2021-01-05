import { printer } from '../lib/printer.mjs';
import { ASSERT, DIM, BOLD, RESET, BLUE, PURPLE, YELLOW, dir, group, groupEnd, log, fmat, printNode } from './utils.mjs';
import { $p } from './$p.mjs';
import * as AST from './ast.mjs';
import globals from './globals.mjs';

const VERBOSE_TRACING = true;

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
  - Outline complex spread arguments for object and array litearls
 */

/*
  Ideas for normalization;
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
    - In left side of `for` loop. Move them out to statements before the `for`
  - Assignments in var decl inits (`var a = b = c` -> `b = c; var a = b;`
  - Empty `else` sub-statement should eliminate the else (probably not normalization)
  - Assignment of a simple node to itself
  - Template parts
 */

const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals

function rule(desc) {
  if (desc.slice(-1) === '"') fixme;
  log(PURPLE + 'Rule:' + RESET + ' "' + desc + '"');
}
function before(node) {
  if (VERBOSE_TRACING) log(YELLOW + 'Before:' + RESET, printer(node));
}
function after(node) {
  if (VERBOSE_TRACING) log(YELLOW + 'After:' + RESET, printer(node));
}

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

  let arrowExpressionInfiLoopGuard = 0;

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
        //   - [x] destructuring
        //   - [ ] exported
        //   - [x] could be inside `for` header
        // - [x] param names
        //   - [x] regular
        //   - [x] patterns
        // - [x] assigning
        //   - [x] regular
        //   - [x] compound
        //   - [x] destructuring array
        //   - [x] destructuring object
        // - [ ] imports of any kind
        // - [x] function declarations
        // - [ ] update expressions, pre or postifx, inc or dec
        // - [ ] for-loop lhs
        updates: [], // {parent, prop, index} indirect reference ot the node being assigned
        usages: [], // {parent, prop, index} indirect reference to the node that refers to this binding
      });
    }
  }

  group('\n\n\n##################################\n## phaseNormalize  ::  ' + fname + '\n##################################\n\n\n');

  let passes = 0;
  do {
    changed = false;
    stmt(null, 'ast', -1, ast);
    log('\nCurrent state\n--------------\n' + fmat(printer(ast)) + '\n--------------\n');
    if (changed) {
      somethingChanged = true;
      log('Something changed. Running another normalization pass (' + ++passes + ')\n');
      // Clear usage/update lists because mutations may have affected them
      fdata.globallyUniqueNamingRegistery.forEach((meta) => ((meta.updates = []), (meta.usages = [])));
    }
  } while (changed);

  // Rename the ident in all usages to a (file-) globally unique name
  fdata.globallyUniqueNamingRegistery.forEach((obj, uniqueName) => {
    // As a result, all bindings in this file ought to now have a unique name.
    if (uniqueName !== obj.originalName) {
      ASSERT(!obj.isExport, 'exports should retain their original name and this should not happen');
      obj.usages.forEach((node) => {
        if (node.name !== uniqueName) {
          rule('All bindings are globally unique');
          log('- Updating name `' + node.name + '` to the unique name `' + uniqueName + '`');
          node.name = uniqueName;
        }
      });
    }
  });

  // Note: scope tracking is now broken and requires a reparse (!)

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

  function createFreshVarInCurrentRootScope(name, injectVarBinding) {
    const tmpName = createUniqueGlobalName(name);
    registerGlobalIdent(tmpName, tmpName);
    const lexScope = lexScopeStack[lexScopeStack.length - 1];
    log(
      'Recording `' + tmpName + '` to be declared in',
      [...lexScope.$p.nameMapping.keys()]
        .filter(function (key) {
          return this.has(key) ? false : !!this.add(key);
        }, new Set(globals.keys()))
        .join(','),
    );
    lexScopeStack[lexScopeStack.length - 1].$p.nameMapping.set(tmpName, tmpName);
    if (injectVarBinding) {
      funcStack[funcStack.length - 1].$p.varBindingsToInject.push(AST.variableDeclaration(tmpName, null, 'var'));
    }
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

    const tmpName = createFreshVarInCurrentRootScope(tmpNameBase, true);
    const assign = AST.assignmentExpression(tmpName, node);
    return AST.sequenceExpression(assign, AST.identifier(tmpName));
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
        rule('No nested sequences');
        log('- `(a, (b, c))` --> `(a, b, c)`');
        before(node);
        node.expressions.splice(i, 1, ...node.expressions[i].expressions);
        after(node);
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
          rule('Sequences can not be statements');
          log('- `a, (b, c), d` --> `a; b; c; d;`');
          node.body.splice(i, 1, ...expr.expressions.map((enode) => AST.expressionStatement(enode)));
          changed = true;
          --i; // revisit (recursively)
        }
      } else if (e.type === 'VariableDeclaration') {
        if (e.declarations.length > 1) {
          log('Found a var decl with multiple bindings. Skipping statementifySequences on it until next pass.');
        } else {
          const init = e.declarations[0].init;
          if (!init) {
          } else if (init.type === 'SequenceExpression') {
            // This assumes sub-statements are normalized to be groups already
            rule('Var binding init can not be sequences');
            log('- `var x = (1, 2)` --> `1; var x = 2`');
            const exprs = init.expressions;
            node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
            // Replace the old sequence expression with its last element
            e.declarations[0].init = exprs[exprs.length - 1];
            changed = true;
            --i; // revisit (recursively)
          } else if (init.type === 'MemberExpression' && init.object.type === 'SequenceExpression') {
            // This assumes sub-statements are normalized to be groups already
            rule('Var binding init can not be member expression on sequence');
            log('- `var x = (a, b).x` --> `a; var x = b.x`');
            const seq = init.object;
            const exprs = seq.expressions;
            node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
            // Replace the old sequence expression with its last element
            init.object = exprs[exprs.length - 1];
            changed = true;
            --i; // revisit (recursively)
          }
        }
      } else if (e.type === 'ReturnStatement') {
        if (!e.argument) {
          log('Return statement is not normalized. Request another pass.');
          changed = true;
        } else if (e.argument.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rule('Argument of return statement can not be sequence');
          log('- `return (a,b)` --> `a; return b;`');
          const seq = e.argument;
          const exprs = seq.expressions;
          node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
          // Replace the old sequence expression with its last element
          e.argument = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (e.argument.type === 'MemberExpression' && e.argument.object.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rule('Argument of return statement can not be member expression on sequence');
          log('- `return (a, b).foo` --> `a; return b.foo`');
          const seq = e.argument.object;
          const exprs = seq.expressions;
          node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
          // Replace the old sequence expression with its last element
          e.argument.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        }
      } else if (e.type === 'IfStatement') {
        if (e.test.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rule('Test of if statement can not be sequence');
          log('- `if (a,b) c` --> `a; if (b) c;`');
          const seq = e.test;
          const exprs = seq.expressions;
          node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
          // Replace the old sequence expression with its last element
          e.test = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (e.test.type === 'MemberExpression' && e.test.object.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rule('Argument of return statement can not be member expression on sequence');
          log('- `if ((a,b).foo) c` --> `a; if (b.foo) c;`');
          const seq = e.test.object;
          const exprs = seq.expressions;
          node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
          // Replace the old sequence expression with its last element
          e.test.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        }
      }
      ++i;
    }
  }
  function ensureVarDeclsCreateOneBinding(body) {
    // Body should not be visited at this time, should be a Program or Block .body array
    // - Break up variable declarations that declare multiple bindings
    // - Break up var inits that are assignments

    log('ensureVarDeclsCreateOneBinding');

    let i = 0;
    while (i < body.length) {
      ASSERT(body[i], 'block does not have empty elements?', body);
      const e = body[i];
      if (e.type === 'VariableDeclaration') {
        log('- var decl has', e.declarations.length, 'declarators');
        if (e.declarations.length > 1) {
          rule('One binding per variable declaration');
          log('- `var a, b` --> `var a; var b;`');
          log('- `var a = 1, b = 2` --> `var a = 1; var b = 1;`');
          body.splice(i, 1, ...e.declarations.map((dnode) => AST.variableDeclaration(dnode.id, dnode.init, e.kind)));
          changed = true;
          --i; // revisit (recursively)
        } else {
          const decl = e.declarations[0];
          if (decl.init) {
            const init = decl.init;

            if (init.type === 'AssignmentExpression') {
              // Note: this transform is only safe with simple left or right sides.
              // If the right side is simple use the right side as init.
              // If the left side is simple use the left side as init.
              // If neither is simple then uhh uh uhh todo.

              if (!isComplexNode(init.right)) {
                rule('Init of a var binding must not be assignment, with simple rhs');
                log('- `let x = y().foo = z` --> `y().foo = z; let x = z`');
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');

                body.splice(i, 1, AST.expressionStatement(init), AST.variableDeclaration(decl.id, init.right, e.kind));
                changed = true;
                //--i;
              } else if (!isComplexNode(init.left)) {
                rule('Init of a var binding must not be assignment, with simple lhs');
                log('- `let x = y = z()` --> `y = z(); let x = y`');
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');

                body.splice(i, 1, AST.expressionStatement(init), AST.variableDeclaration(decl.id, init.left, e.kind));
                changed = true;
                //--i;
              } else {
                rule('Init of a var binding must not be assignment, with both sides complex');
                log('- `let x = y().foo = z().foo` --> `let tmp = y(); let tmp2 = z(); y.foo = tmp2; let x = tmp2;`');
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');
                ASSERT(init.left.type === 'MemberExpression', 'what else do you assign to if not simple nor member?', e);

                // We need two new vars because we need to evaluate the lhs before we evaluate the rhs
                // Consider `let a = $(1).x = $(2)`. This should call $ with 1 before 2.
                const tmpNameLhs = createFreshVarInCurrentRootScope('tmpBindInitMemberObject');
                const tmpNameRhs = createFreshVarInCurrentRootScope('tmpBindInitRhs');
                const mem = init.left;

                body.splice(
                  i,
                  1,
                  AST.variableDeclaration(tmpNameLhs, mem.object),
                  AST.variableDeclaration(tmpNameRhs, init.right),
                  AST.expressionStatement(
                    AST.assignmentExpression(AST.memberExpression(tmpNameLhs, mem.property, mem.computed), tmpNameRhs),
                  ),
                  AST.variableDeclaration(decl.id, tmpNameRhs, e.kind),
                );
                changed = true;
                //--i;
              }
            }
          }
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
      if (isComplexNode(anode) && anode.type !== 'SpreadElement') {
        const tmpName = createFreshVarInCurrentRootScope('tmpArg', true);
        assigns.push(AST.assignmentExpression(tmpName, anode));
        newArgs.push(AST.identifier(tmpName));
      } else {
        newArgs.push(anode);
      }
    });
    if (assigns.length) {
      rule('Call args must be simple nodes');
      log('- `f(x())` --> `(tmp=f(), f(tmp)`');
      log('- `f(x(), 100, y(), a, z())` --> `(t1=x(), t2=y(), t3=z(), f(t1, 100, t2, a, t3))`');
      before(node);

      const seq = AST.sequenceExpression(
        ...assigns,
        isNew ? AST.newExpression(node.callee, newArgs) : AST.callExpression(node.callee, newArgs),
      );

      crumbSet(1, seq);
      changed = true;

      after(seq);

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
      if (!anode) return newElements.push(null);

      let valueNode = anode;
      if (anode.type === 'SpreadElement') {
        valueNode = anode.argument;
        crumb(anode, 'argument', valueNode);
      }

      if (isComplexNode(valueNode)) {
        const tmpName = createFreshVarInCurrentRootScope('tmpElement', true);
        assigns.push(AST.assignmentExpression(tmpName, valueNode));
        newElements.push(anode.type === 'SpreadElement' ? AST.spreadElement(tmpName) : AST.identifier(tmpName));
      } else {
        // Use anode because if this was a spread then we'd want to keep it
        newElements.push(anode);
      }

      if (anode.type === 'SpreadElement') {
        uncrumb(anode, 'argument', valueNode);
      }
    });
    if (assigns.length) {
      rule('Elements of array literals must be simple nodes');
      log('- `[f()]` --> `(tmp=f(), [tmp])`');

      const seq = AST.sequenceExpression(...assigns, AST.arrayExpression(newElements));

      crumbSet(1, seq);
      changed = true;

      // Visit the sequence expression node now.
      _expr(seq);

      return true;
    }

    return false;
  }
  function normalizeCalleeChangedSomething(node, isNew) {
    // Technically doing a `new` on any literal will cause a runtime error, but let's not bother with normalizing them to ident
    // Note: for regular calls, the context can be determined by a member expression, so make sure to not change those.
    if (isComplexNode(node.callee) && (isNew || node.callee.type !== 'MemberExpression')) {
      if (isNew) {
        rule('Callee of new must be simple node');
        log('- `new x.y(a,b)` --> `(tmp=x.y, new tmp(a,b))`');
      } else {
        rule('Callee of call must be simple node or member expression');
        log('- `$()(a,b)` --> `(tmp=$(), tmp)(a,b))`');
      }

      const tmpName = createFreshVarInCurrentRootScope('tmpNewObj', true);

      const assign = AST.assignmentExpression(tmpName, node.callee);
      const newNode = isNew ? AST.newExpression(tmpName, node.arguments) : AST.callExpression(tmpName, node.arguments);
      const seq = AST.sequenceExpression(assign, newNode);

      crumbSet(1, seq);
      _expr(seq);
      changed = true;
      return true;
    } else if (!isNew && node.callee.type === 'MemberExpression' && node.callee.object.type === 'SequenceExpression') {
      rule('Callee of a call can not be member expression on sequence');
      log('- `(a, b).c()` -> `(a, b.c())`');
      log('- `(a, b)[c]()` -> `(a, b[c]())`');

      const mem = node.callee;
      const exprs = mem.object.expressions;
      const prop = mem.property;

      const seq = AST.sequenceExpression(
        ...exprs.slice(0, -1),
        AST.memberCall(exprs[exprs.length - 1], prop, node.arguments, mem.computed),
      );
      crumbSet(1, seq);

      changed = true;
      return true;
    } else {
      return false;
    }
  }
  function normalizeReturnThrowArg(node, isExport, stillHoisting, isFunctionBody) {
    // Input should be a statement node with .argument (return, throw)
    // If the arg is complex, it will outline the arg and replace the node a block

    if (isComplexNode(node.argument)) {
      rule('Statement.argument must be simple');
      log('- `throw $()` --> `{ let tmp = $(); throw tmp; }`');
      log('- `return $()` --> `{ let tmp = $(); return tmp; }`');

      // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
      const tmpName = createFreshVarInCurrentRootScope('tmpStmtArg');
      const newNode = AST.blockStatement(AST.variableDeclaration(tmpName, node.argument), node);
      node.argument = AST.identifier(tmpName);
      crumbSet(1, newNode);

      _stmt(newNode, isExport, stillHoisting, isFunctionBody);
      changed = true;
      return true;
    }

    return false;
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

    crumb(parent, prop, index);
    _stmt(node, isExport, stillHoisting, isFunctionBody);
    uncrumb(parent, prop, index);
  }
  function _stmt(node, isExport = false, stillHoisting = false, isFunctionBody) {
    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
      node.$p.varBindingsToInject = [];
      node.$p.funcBindingsToInject = [];
    }

    group(DIM + 'stmt(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);
    __stmt(node, isExport, stillHoisting, isFunctionBody);
    groupEnd();

    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.pop();

      // TODO: dedupe declared names. functions trump vars. last func wins (so order matters).
      // Since we unshift, add var statements first
      if (node.$p.varBindingsToInject.length) {
        // Inject all the decls, without init, at the start of the function. Try to maintain order. It's not very important.
        // TODO: dedupe decls. Make sure multiple var statements for the same name are collapsed and prefer func decls
        (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.varBindingsToInject);
        node.$p.varBindingsToInject.length = 0;
      }
      // Put func decls at the top
      if (node.$p.funcBindingsToInject.length) {
        // TODO: dedupe func decls with the same name. Still legal when nested in another function (not in global). Last one wins. Rest is dead code.
        // Inject all the decls, without init, at the start of the function. Order matters.
        (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.funcBindingsToInject);
        node.$p.funcBindingsToInject.length = 0;
      }
    }
  }
  function __stmt(node, isExport = false, stillHoisting = false, isFunctionBody) {
    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      if (node.$scope) lexScopeStack.push(node);
      else lexScopeStack.push(node.handler);
    }

    switch (node.type) {
      case 'BlockStatement': {
        ensureVarDeclsCreateOneBinding(node.body);
        statementifySequences(node);

        let hoisting = !!isFunctionBody;
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
        if (node.body.type !== 'BlockStatement') {
          rule('Do-while sub-statement must be block');
          log('- `do x; while(y);` --> `do { x; } while(y);`');

          crumb(node, 'body', -1);
          crumbSet(1, AST.blockStatement(node.body));
          uncrumb(node, 'body', -1);
        }

        if (isComplexNode(node.test)) {
          // `do { ... } while (x+y);`
          // -> `var tmp; ... do { tmp = x+y; } while (tmp);`
          // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step

          rule('Do-while test node must be simple');
          log('- `do { ... } while (x+y);` --> `do { ... var tmp = x+y; } while (tmp);`');
          const tmpName = createFreshVarInCurrentRootScope('ifTestTmp', true);

          node.body.body.push(AST.expressionStatement(AST.assignmentExpression(tmpName, node.test)));
          node.test = AST.identifier(tmpName); // We could do `tmpName === true` if that makes a difference. For now, it won't
          changed = true;
        }

        stmt(node, 'body', -1, node.body);
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
        if (node.body.type !== 'BlockStatement') {
          rule('For-loop sub-statement must be block');
          log('- `for (;;) x` --> `for (;;) {x}`');

          node.body = AST.blockStatement(node.body);
          //changed = true; // TODO: I don't think this is necessary?
        }

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
        break;
      }

      case 'ForInStatement': {
        if (node.body.type !== 'BlockStatement') {
          rule('For-in sub-statement must be block');
          log('- `for (x in y) z` --> `for (x in y) {z}`');

          node.body = AST.blockStatement(node.body);
          //changed = true; // TODO: I don't think this is necessary?
        }

        expr(node, 'right', -1, node.right);
        if (node.left.type === 'VariableDeclaration') {
        } else {
          expr(node, 'left', -1, node.left);
        }
        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'ForOfStatement': {
        if (node.body.type !== 'BlockStatement') {
          rule('For-of sub-statement must be block');
          log('- `for (x of y) z` --> `for (x in y) {z}`');

          node.body = AST.blockStatement(node.body);
          //changed = true; // TODO: I don't think this is necessary?
        }

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
        break;
      }

      case 'FunctionDeclaration': {
        log('Name:', node.id ? node.id.name : '<anon>');

        if (node.id) expr(node, 'id', -1, node.id);
        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);
        stmt(node, 'body', -1, node.body, false, false, true);

        // TODO: dont move the functions if they're already hoisted
        rule('All function declarations must be at the top');
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
          crumbSet(2, AST.emptyStatement());
        } else {
          funcStack[funcStack.length - 2].$p.funcBindingsToInject.push(node);
          crumbSet(1, AST.emptyStatement());
        }

        break;
      }

      case 'IfStatement': {
        if (isComplexNode(node.test)) {
          rule('If-test node must be simple');
          log('- `if (x+y) z` --> `{ let tmp = x+y; if (tmp) z; }`');
          // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
          const tmpName = createFreshVarInCurrentRootScope('ifTestTmp');
          const newNode = AST.blockStatement(AST.variableDeclaration(tmpName, node.test), node);
          node.test = AST.identifier(tmpName);
          crumbSet(1, newNode);

          _stmt(newNode, isExport, stillHoisting, isFunctionBody);
          changed = true;
          break;
        }
        if (node.consequent.type !== 'BlockStatement') {
          rule('If sub-statement must be block'); // TODO: this is duplicate
          log('- `if (x) y` --> `if (x) { y }`');

          node.consequent = AST.blockStatement(node.consequent);
        }
        if (node.alternate) {
          if (node.alternate.type !== 'BlockStatement') {
            rule('Else sub-statement must be block'); // TODO: this is duplicate
            log('- `if (x) {} else y` --> `if (x) {} else { y }`');

            node.alternate = AST.blockStatement(node.alternate);
          }
        }

        expr(node, 'test', -1, node.test);
        stmt(node, 'consequent', -1, node.consequent);
        if (node.alternate) {
          stmt(node, 'alternate', -1, node.alternate);
        }
        break;
      }

      case 'ImportDeclaration': {
        break;
      }

      case 'Program': {
        ensureVarDeclsCreateOneBinding(node.body);
        statementifySequences(node);

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

        break;
      }

      case 'ReturnStatement': {
        if (!node.argument) {
          rule('Return argument must exist');
          log('- `return;` --> `return undefined;`');
          node.argument = AST.identifier('undefined');
        }

        if (normalizeReturnThrowArg(node, false, false, isFunctionBody)) {
          break;
        }

        expr(node, 'argument', -1, node.argument);
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
            rule('Switch case must contain exactly one block'); // TODO: this is duplicate
            log('- `switch (x) { case a: b; c; }` --> `switch (x) { case a: { b; c; } }`');
            cnode.consequent = [AST.blockStatement(cnode.consequent)];
            // changed = true; // Don't think I need to set this?
          }
          cnode.consequent.forEach((dnode, i) => stmt(cnode, 'consequent', i, dnode));
        });
        break;
      }

      case 'ThrowStatement': {
        if (normalizeReturnThrowArg(node, false, false, isFunctionBody)) {
          break;
        }

        expr(node, 'argument', -1, node.argument);
        break;
      }

      case 'VariableDeclaration': {
        if (node.declarations.length !== 1) {
          log('Encountered a var decl with multiple decls (', node.declarations.length, '). Waiting for next pass to visit them.');
          changed = true;
          break;
        }

        let changedHere = false;
        const kind = node.kind;
        const dnode = node.declarations[0];
        const names = [];

        // The paramNode can be either an Identifier or a pattern of sorts
        if (dnode.id.type === 'Identifier') {
          const meta = getMetaForBindingName(dnode.id);
          meta.usages.push(dnode.id);
          names.push(dnode.id.name);
        } else if (dnode.id.type === 'ArrayPattern') {
          rule('Binding patterns not allowed'); // TODO: this is duplicate
          log('- `let [x] = y()` --> `let tmp = y(), tmp1 = [...tmp], x = tmp1[0]`');

          const bindingPatternRootName = createFreshVarInCurrentRootScope('bindingPatternArrRoot');
          const nameStack = [bindingPatternRootName];
          const newBindings = [];
          funcArgsWalkArrayPattern(dnode.id, nameStack, newBindings);

          if (newBindings.length) {
            log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
            node.declarations = [
              AST.variableDeclarator(bindingPatternRootName, dnode.init),
              ...newBindings.map(([name, init]) => AST.variableDeclarator(name, init)),
            ];
            changed = true;
            changedHere = true;
          } else if (dnode.init) {
            log('There were no bindings so replacing the var declaration with its init');
            crumbSet(1, AST.expressionStatement(dnode.init));
            changed = true;
            changedHere = true;
          } else {
            ASSERT(false, 'binding patterns are required to have an init');
          }
        } else if (dnode.id.type === 'ObjectPattern') {
          rule('Binding patterns not allowed'); // TODO: this is duplicate
          log('- `var {x} = y()` --> `var tmp = y(), x = obj.x`');

          const bindingPatternRootName = createFreshVarInCurrentRootScope('bindingPatternObjRoot');
          const nameStack = [bindingPatternRootName];
          const newBindings = [];
          funcArgsWalkObjectPattern(dnode.id, nameStack, newBindings);

          if (newBindings.length) {
            log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
            node.declarations = [
              AST.variableDeclarator(bindingPatternRootName, dnode.init),
              ...newBindings.map(([name, init]) => AST.variableDeclarator(name, init)),
            ];
            changed = true;
            changedHere = true;
          } else if (dnode.init) {
            log('There were no bindings so replacing the var declaration with its init');
            crumbSet(1, AST.expressionStatement(dnode.init));
            changed = true;
            changedHere = true;
          }
        } else {
          console.dir(node, { depth: null });
          ASSERT(false, 'wat is dis', [dnode.id.type], node);
        }

        if (kind === 'var') {
          if (stillHoisting) {
            log('This is a var but we are still hoisting so it should be a noop var decl of one binding. Skipping normalization.');
          } else {
            rule('Var bindings must be declared at the top');
            log('- `var x = y;` --> `var x; ...; x = y;`');
            log('- `var` statement declared these names:', names);

            // Note: patterns may still introduce multiple bindings before they get normalized.
            // TODO: if we enforce the pattern normalization to happen before reaching this point then patterns are not a concern...
            funcStack[funcStack.length - 1].$p.varBindingsToInject.push(
              AST.variableDeclaration(
                names.map((name) => AST.identifier(name)),
                null,
                'var',
              ),
            );

            // TODO: drop individual declarators, if not the whole thing
            if (node.declarations.every((enode) => !enode.init)) {
              // If none of the bindings had an init, this is dead code. Drop the decl
              crumbSet(1, AST.emptyStatement());
            } else {
              // Don't hate me. The printer does not validate the AST. It just assumes the structure is valid and prints verbatim.
              node.kind = ''; // This removes the `var` when printing, causing a sequence expression (or simple assignment)
            }

            // We explicitly track whether we are still in a hoisting header, and if so, will skip this normalization step
            // So we should not have to worry about running this optimization over and over again.
            changed = true;
            changedHere = true;
          }
        }

        if (!changedHere && node.declarations.length === 1 && node.declarations[0].init) {
          const decl = node.declarations[0];
          const init = decl.init;
          if (init.type === 'MemberExpression' && isComplexNode(init.object)) {
            if (init.object.type === 'SequenceExpression' && !isComplexNode(init.object.expressions[init.object.expressions.length - 1])) {
              rule('Var init cannot be member expression on sequence with trailing node simple');
              log('- `var a = (f(), x).b` --> `f(); var a = x.b`');
              before(node);

              const mem = init;
              const seq = init.object;
              const prop = init.property;
              const tmpName = createFreshVarInCurrentRootScope('tmpPseudoExprStmt');
              node.declarations.unshift(AST.variableDeclarator(tmpName, AST.sequenceExpression(seq.expressions.slice(0, -1))));
              decl.init = AST.memberExpression(seq.expressions[seq.expressions.length - 1], prop, mem.computed);
              after(node);
              changed = true;
              changedHere = true;
            } else {
              rule('Var init cannot be member expression with complex object');
              log('- `var a = f().b` --> `var tmp = $(), a = tmp.b`');
              before(node);

              const mem = init;
              const obj = init.object;
              const prop = init.property;
              const tmpName = createFreshVarInCurrentRootScope('tmpBindingInit');
              node.declarations.unshift(AST.variableDeclarator(tmpName, obj));
              decl.init = AST.memberExpression(tmpName, prop, mem.computed);
              after(node);
              changed = true;
              changedHere = true;
            }
          }
        }

        if (changedHere) {
          const node = crumbGet(1);
          _stmt(node, isExport, stillHoisting, isFunctionBody);
        } else if (dnode.init) {
          expr2(node, 'declarations', 0, dnode, 'init', -1, dnode.init);
        }

        break;
      }

      case 'WhileStatement': {
        if (node.body.type !== 'BlockStatement') {
          rule('While sub-statement must be block');
          log('- `while (x) y` --> `while (x) { y }`');

          node.body = AST.blockStatement(node.body);
        }

        expr(node, 'test', -1, node.test);
        stmt(node, 'body', -1, node.body);
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
  }
  function expr2(parent2, prop2, index2, parent, prop, index, node) {
    // Skip one property
    crumb(parent2, prop2, index2);
    expr(parent, prop, index, node);
    uncrumb(parent2, prop2, index2);
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
    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
      node.$p.varBindingsToInject = [];
      node.$p.funcBindingsToInject = [];

      if (node.type === 'ArrowFunctionExpression') {
        if (node.expression) {
          rule('Arrow body must be block');
          log('- `() => x` --> `() => { return x }`');

          before(node);
          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;
          after(node);
        }
      }
    }

    group(DIM + 'expr(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);
    __expr(node);
    groupEnd();

    if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      funcStack.pop();

      if (node.expression) {
        log('Arrow is an expression. This should be normalized so waiting for next cycle to process var/func injections');
        // If this is an infinite loop because the normalization fails, then hopefully it'll lead to this point :/
        changed = true;
        if (++arrowExpressionInfiLoopGuard > 50) {
          log('######################');
          log('############');
          log('############     Potential Infinite Loop Warning !!!   See expression arrows');
          log('############');
          log('######################');
        }
      } else {
        // TODO: dedupe declared names. functions trump vars. last func wins (so order matters).
        // Since we unshift, add var statements first
        if (node.$p.varBindingsToInject.length) {
          // Inject all the decls, without init, at the start of the function. Try to maintain order. It's not very important.
          // TODO: dedupe decls. Make sure multiple var statements for the same name are collapsed and prefer func decls
          log('Prepending', node.$p.varBindingsToInject.size, 'var decls');
          (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.varBindingsToInject);
          node.$p.varBindingsToInject.length = 0;
        }
        // Put func decls at the top
        if (node.$p.funcBindingsToInject.length) {
          // TODO: dedupe func decls with the same name. Still legal when nested in another function (not in global). Last one wins. Rest is dead code.
          // Inject all the decls, without init, at the start of the function. Order matters.
          log('Prepending', node.$p.funcBindingsToInject.size, 'func decls');
          (node.type === 'Program' ? node.body : node.body.body).unshift(...node.$p.funcBindingsToInject);
          node.$p.funcBindingsToInject.length = 0;
        }
      }
    }
  }
  function __expr(node) {
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
                if (isComplexNode(elNode.argument)) {
                  rule('Spread args in array must be simple nodes');
                  log('- `[...a()]` --> `(tmp = a(), [...tmp])`');
                  before(elNode);

                  const tmpName = createFreshVarInCurrentRootScope('tmpArrSpreadArg', true);
                  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, elNode.argument), node);
                  elNode.argument = AST.identifier(tmpName);
                  crumbSet(1, newNode);

                  after(newNode);
                  changed = true;

                  _expr(newNode);
                } else {
                  expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
                }
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
        if (node.left.type === 'ObjectPattern') {
          const rhsTmpName = createFreshVarInCurrentRootScope('objAssignPatternRhs');
          const cacheNameStack = [rhsTmpName];
          const newBindings = [];

          funcArgsWalkObjectPattern(node.left, cacheNameStack, newBindings);

          if (newBindings.length) {
            rule('Assignment patterns not allowed');
            before(node);
            log('- `({x} = y())` --> `var tmp; tmp = y(), x = tmp.x`');

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.

            const varBindingsToInject = funcStack[funcStack.length - 1].$p.varBindingsToInject;

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, node.right]);

            const expressions = [];
            newBindings.forEach(([name, expr]) => {
              varBindingsToInject.push(AST.variableDeclaration(name, null, 'var'));
              expressions.push(AST.assignmentExpression(name, expr));
            });
            const newNode = AST.sequenceExpression(expressions);
            crumbSet(1, newNode);
            after(newNode);
            changed = true;
          } else {
            rule('Assignment patterns not allowed');
            log('- `({} = y())` --> `y()`');
            before(node);
            crumbSet(1, node.right);
            after(node.right);
          }
        } else if (node.left.type === 'ArrayPattern') {
          const rhsTmpName = createFreshVarInCurrentRootScope('arrAssignPatternRhs');
          const cacheNameStack = [rhsTmpName];
          const newBindings = [];

          funcArgsWalkArrayPattern(node.left, cacheNameStack, newBindings);

          if (newBindings.length) {
            rule('Assignment patterns not allowed');
            log('- `[x] = y()` --> `var tmp, tmp1; tmp = y(), tmp1 = [...tmp], x = tmp1[0]`');
            before(node);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.

            const varBindingsToInject = funcStack[funcStack.length - 1].$p.varBindingsToInject;

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, node.right]);

            const expressions = [];
            newBindings.forEach(([name, expr]) => {
              varBindingsToInject.push(AST.variableDeclaration(name, null, 'var'));
              expressions.push(AST.assignmentExpression(name, expr));
            });
            const newNode = AST.sequenceExpression(expressions);
            crumbSet(1, newNode);
            after(newNode);

            changed = true;
          } else {
            rule('Assignment patterns not allowed');
            log('- `[] = y()` --> `y()`'); // TODO: Does it have to be spreaded anyways? Do I care?
            before(node);
            crumbSet(1, node.right);
            after(node.right);
          }
        } else {
          ASSERT(
            node.left.type === 'Identifier' || node.left.type === 'MemberExpression',
            'uhhh was there anything else assignable?',
            node,
          );

          let changedNow = false;

          if (node.right.type === 'AssignmentExpression') {
            ASSERT(
              node.right.left.type === 'Identifier' ||
                node.right.left.type === 'MemberExpression' ||
                node.right.left.type === 'ObjectPattern' ||
                node.right.left.type === 'ArrayPattern',
              'see above (except patterns arent visited yet)',
              node.right,
            );
            const nestedAssign = node.right;
            // `a = b = c`
            // `a.foo = b = c`
            // `a = b.foo = c`
            // `a = b = c.foo`
            // `a.foo = b.foo = c`
            // `a = b.foo = c.foo`
            // `a.foo = b.foo = c.foo`
            // There are a few cases to consider. In particular, we need to make sure that we
            // cache b (node.right.left) first if it is a complex node, that we cache it first

            if (nestedAssign.left.type === 'ObjectPattern' || nestedAssign.left.type === 'ArrayPattern') {
              changed = true; // Request another pass
            } else if (nestedAssign.left.type === 'Identifier') {
              rule('Nested assignments with simple middles are not allowed');
              log('- `a = b = c` --> `(b = c, a = b)`');
              log('- `a = b = c()` --> `(b = c(), a = b)`');
              log('- `a.foo = b = c` --> `(b = c, a.foo = b)`');
              log('- `a.foo = b = c()` --> `(b = c(), a.foo = b)`');
              before(node);

              const newNode = AST.sequenceExpression(nestedAssign, AST.assignmentExpression(node.left, nestedAssign.left));
              crumbSet(1, newNode);
              after(newNode);

              changed = true;
              changedNow = true;
            } else if (isComplexNode(nestedAssign.right)) {
              ASSERT(nestedAssign.left.type === 'MemberExpression');
              rule('Nested assignments with complex value to property are not allowed');
              log('- `a = b.foo = c.foo` --> `(tmp = c.foo, b.foo = tmp, a = tmp)`');
              log('- `a = b().foo = c().foo` --> `(tmp = c().foo, b().foo = tmp, a = tmp)`');
              log('- `a.foo = b.foo = c.foo` --> `(tmp = c.foo, b.foo = tmp, a.foo = tmp)`');
              log('- `a.foo = b().foo = c().foo` --> `(tmp = c().foo, b().foo = tmp, a.foo = tmp)`');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedAssignRhs', true);

              // Note: a().x = b().x = c().x will evaluate in order of a() b() c() so we must keep that order too
              // Note: getters in the middle do not change the value assigned to the left-most node (there's a test)
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpName, nestedAssign.right),
                AST.assignmentExpression(nestedAssign.left, tmpName),
                AST.assignmentExpression(node.left, tmpName),
              );

              crumbSet(1, newNode);

              after(newNode);
              changed = true;
              changedNow = true;
            } else {
              rule('Nested assignments with simple value to property are not allowed');
              log('- `a = b.foo = c` --> `(b.foo = c, a = c)`');
              log('- `a = b().foo = c` --> `(b().foo = c, a = c)`');
              log('- `a.foo = b.foo = c` --> `(b.foo = c, a.foo = c)`');
              log('- `a().foo = b().foo = c` --> `(b().foo = c, a().foo = c)`');
              before(node);

              // Note: a().x = b().x = c will evaluate in order of a() b() c so we must keep that order too
              // Note: getters in the middle do not change the value assigned to the left-most node (there's a test)
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(nestedAssign.left, nestedAssign.right),
                AST.assignmentExpression(node.left, nestedAssign.right),
              );

              crumbSet(1, newNode);

              after(newNode);
              changed = true;
              changedNow = true;
            }
          } else if (node.left.type === 'MemberExpression' && node.left.object.type === 'SequenceExpression') {
            // (occurs as a transformation artifact)
            rule('Assignment must not be to a property of a sequence');
            log('- `(a, b).c = d` --> `(a, b.c = d)`');
            before(node);

            const val = node.right;
            const memb = node.left;
            const seq = memb.object;
            const prop = memb.property;
            const exprs = seq.expressions; // Last one will replace the sequence

            const newNode = AST.sequenceExpression(
              ...exprs.slice(0, -1),
              AST.assignmentExpression(AST.memberExpression(exprs[exprs.length - 1], prop, memb.computed), val, node.operator),
            );

            crumbSet(1, newNode);
            after(newNode);
            _expr(newNode);
            changed = true;
            changedNow = true;
          } else if (node.right.type === 'SequenceExpression') {
            rule('Assignment rhs must not be sequence');
            log('- `a = (b, c)` --> `(b, a = c)`');
            before(node);

            const seq = node.right;
            const exprs = seq.expressions.slice(0); // Last one will replace the sequence
            const newNode = AST.sequenceExpression(...exprs.slice(0, -1), AST.assignmentExpression(node.left, exprs.pop(), node.operator));
            crumbSet(1, newNode);
            after(newNode);
            _expr(newNode);
            changed = true;
            changedNow = true;
          } else if (node.right.type === 'MemberExpression' && node.right.object.type === 'SequenceExpression') {
            rule('Assignment rhs must not be a property on a sequence');
            log('- `a = (b, c).d` --> `(b, a = c.d)`');
            before(node);

            const mem = node.right;
            const seq = mem.object;
            const exprs = seq.expressions.slice(0);
            const newNode = AST.sequenceExpression(
              ...exprs.slice(0, -1),
              AST.assignmentExpression(node.left, AST.memberExpression(exprs.pop(), mem.property, mem.computed)),
            );
            crumbSet(1, newNode);
            after(newNode);
            _expr(newNode);
            changed = true;
            changedNow = true;
          }

          if (changedNow) {
            _expr(crumbGet(1));
          } else {
            expr(node, 'left', -1, node.left);
            expr(node, 'right', -1, node.right);
          }
        }

        break;
      }

      case 'ArrowFunctionExpression': {
        ASSERT(!node.expression, 'should be normalized');
        ensureVarDeclsCreateOneBinding(node.body.body);

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
          rule('Test of conditional must be simple node or sequence');
          log('- `a() ? b : c` --> `(tmp = a, tmp) ? b : c`');
          before(node);
          node.test = sequenceNode(node.test, 'tmpTernaryTest');
          after(node);
          changed = true;
        }

        if (node.test.type === 'SequenceExpression' && !isComplexNode(node.test.expressions[node.test.expressions.length - 1])) {
          rule('Last expr of sequence as test of conditional must not be simple');
          log('- `(a, b) ? c : d` --> `(a, (b ? c : d))`');
          before(node);

          const exprs = node.test.expressions;
          node.test = exprs.pop();
          const seq = AST.sequenceExpression(...exprs, node);
          after(node);
          crumbSet(1, seq);
          changed = 1;
        }

        if (isComplexNodeOrAlreadySequenced(node.consequent)) {
          // TBD whether this is worth it at all. The consequence/alternate can not be moved out
          //     easily anyways so is there any advantage to this?
          rule('Consequent of conditional must be simple node or sequence');
          log('- `a ? b() : c` --> `a ? (tmp = b(), tmp) : c`');
          before(node);
          node.consequent = sequenceNode(node.consequent, 'tmpTernaryConsequent');
          after(node);
          changed = true;
        }

        if (isComplexNodeOrAlreadySequenced(node.alternate)) {
          // TBD whether this is worth it at all. The consequence/alternate can not be moved out
          //     easily anyways so is there any advantage to this?
          rule('Alternate of conditional must be simple node or sequence');
          log('- `a ? b : c()` --> `a ? b : (tmp = c(), tmp)`');
          before(node);

          node.alternate = sequenceNode(node.alternate, 'tmpTernaryAlternate');
          after(node);
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
          // If the object is a sequence that ends with a simple node or assignment, then skip this step.
          isComplexNode(node.object)
        ) {
          const isSeq = node.object.type === 'SequenceExpression';
          const last = isSeq && node.object.expressions[node.object.expressions.length - 1];
          if (!isSeq || (isComplexNode(last) && last.type !== 'AssignmentExpression')) {
            rule('Object of member expression must be simple or simple-sequence that may end with assign');
            log('- `a().b` --> `(tmp = a(), tmp).b`');
            log('- `(a, b()).c` --> `(a, (tmp = b(), tmp)).c`');
            log('- `(a, a = y).c` --> noop');
            before(node);

            const seq = sequenceNode(node.object, 'tmpComplexMemberObj');
            const property = node.property;
            const newLeftNode = AST.memberExpression(seq, property, node.computed);

            crumbSet(1, newLeftNode);
            after(newLeftNode);

            _expr(newLeftNode);
            changed = true;
            break;
          }
        }

        if (node.computed && isComplexNode(node.property)) {
          rule('Expression of computed property must be simple');
          log('- `a[b()]` --> `(tmp = b(), a[tmp])`');
          log('- Type of computed property:', node.property.type);
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpComputedProp', true);

          const seq = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.property),
            AST.memberExpression(node.object, tmpName, true),
          );

          crumbSet(1, seq);
          after(seq);

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
            rule('Computed property that is valid ident must be member expression');
            log('- `a["foo"]` --> `a.foo`');
            log('- `a["fo+o"]` --> noop');
            log('- `a[15]` --> noop');
            log('- Name: `' + node.property.value + '`');
            before(node);

            node.computed = false;
            node.property = AST.identifier(node.property.value);
            after(node);
            changed = true;
          }
        }

        // Note: nested member expressions need a little more love here to preserve evaluation
        // order but since we got rid of those, the traversal is simple
        ASSERT(node.object.type !== 'MemberExpression', 'at this point nested member expressions should be normalized away...');
        if (node.computed) {
          expr(node, 'property', -1, node.property);
        }
        expr(node, 'object', -1, node.object);

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
            if (isComplexNode(pnode.argument)) {
              rule('Spread args in obj must be simple nodes');
              log('- `${...a()}` --> `(tmp = a(), {...tmp})`');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpObjSpreadArg', true);
              const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.argument), node);
              pnode.argument = AST.identifier(tmpName);
              crumbSet(1, newNode);

              after(newNode);
              changed = true;

              _expr(newNode);
            } else {
              expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
            }
          } else {
            if (pnode.shorthand) {
              // I think it _is_ this simple?
              rule('Property shorthands not allowed');
              log('- `var obj = {a}` --> `var obj = {a: a}`');
              before(node);
              pnode.shorthand = false;
              after(node);
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
        flattenSequences(node);

        node.expressions.forEach((enode, i) => {
          expr(node, 'expressions', i, enode);
        });

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

    superCallStack.pop();
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

        const restName = propNode.argument.name;

        // -> `let bindingName = restHander(sourceObject, ['excluded', 'props'])`
        // -> `bindingName = restHander(sourceObject, ['excluded', 'props'])`
        newBindings.push([
          restName,
          AST.callExpression(BUILTIN_REST_HANDLER_NAME, [
            AST.identifier(cacheNameStack[cacheNameStack.length - 1]),
            AST.arrayExpression(node.properties.filter((n) => n !== propNode).map((n) => AST.literal(n.key.name))),
          ]),
        ]);

        return;
      }

      ASSERT(propNode.key.type === 'Identifier', 'TODO: non ident keys?', propNode);

      let valueNode = propNode.value;
      if (propNode.value.type === 'AssignmentPattern') {
        log('The object pattern had a default. Preparing to compile that into statement.');

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
        const paramNameBeforeDefault = createFreshVarInCurrentRootScope('objPatternBeforeDefault');

        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameAfterDefault =
          valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('objPatternAfterDefault');
        cacheNameStack.push(paramNameAfterDefault);

        // Store the property in this name. It's a regular property access and the previous step should
        // be cached already. So read it from that cache.
        // `function([x = y]){}`
        // -> `function(tmp) { let tmp2 = [...tmp], tmp3 = tmp2[0], x = tmp3 === undefined ? y : x; }`
        newBindings.push(
          [paramNameBeforeDefault, AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name)],
          [
            paramNameAfterDefault,
            AST.conditionalExpression(
              AST.binaryExpression('===', paramNameBeforeDefault, 'undefined'),
              propNode.value.right,
              paramNameBeforeDefault,
            ),
          ],
        );
      } else {
        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameWithoutDefault =
          valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('objPatternNoDefault');
        cacheNameStack.push(paramNameWithoutDefault);

        // Store the property in this name. It's a regular property access and the previous step should
        // be cached already. So read it from that cache.
        newBindings.push([paramNameWithoutDefault, AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], propNode.key.name)]);
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
    const arrSplatName = node.type === 'Identifier' ? node.name : createFreshVarInCurrentRootScope('arrPatternSplat');
    cacheNameStack.push(arrSplatName);
    // Store this property in a local variable. Because it's an array pattern, we need to invoke the iterator. The easiest
    // way syntactically is to spread it into an array. Especially since we'll want indexed access to it later, anyways.
    // -> `arrPatternSplat = [...arrPatternTmp]`
    newBindings.push([
      arrSplatName,
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
        const paramNameBeforeDefault = createFreshVarInCurrentRootScope('arrPatternBeforeDefault');

        // Store this element in a local variable. If it's a leaf, use the actual
        // element name as the binding, otherwise create a fresh var for it.

        const paramNameAfterDefault = valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('arrPatternStep');
        cacheNameStack.push(paramNameAfterDefault);

        // Store the property in this name
        // `function([x = y]) {}`
        // -> `function(tmp) { let tmp1 = [...tmp], tmp2 = tmp1[0], x = tmp2 === undefined ? y : tmp2; }`
        newBindings.push(
          [
            paramNameBeforeDefault,
            // Previous prop step was stored in a var so access the prop on that var:
            AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], AST.literal(i), true),
          ],
          [
            paramNameAfterDefault,
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

        const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('arrPatternStep');
        cacheNameStack.push(bindingName);

        // Store the property in this name
        newBindings.push([
          bindingName,
          // Previous prop step was stored in a var so access the prop on that var:
          AST.memberExpression(cacheNameStack[cacheNameStack.length - 2], AST.literal(i), true),
        ]);
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
      // Array<name, expr>
      // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
      const newBindings = [];

      // Node to represent the cache of the current property/element step
      const cacheNameStack = [];

      // Now there's basically two states: a param with a default or without a default. The params with a default
      // have an node that is basically "boxed" into an AssignmentPattern. Put the right value on the stack and
      // continue to process the left value. Otherwise, put null on the stack and process the node itself.
      // See https://gist.github.com/pvdz/dc2c0a477cc276d1b9e6e2ddbb417135 for a brute force set of test cases
      // See https://gist.github.com/pvdz/867502f6ed2dd902d061c82e38a81181 for the hack to regenerate them
      if (pnode.type === 'AssignmentPattern') {
        rule('Func params must not have inits/defaults');
        log('- `function f(x = y()) {}` --> `function f(tmp) { x = tmp === undefined ? y() : tmp; }');

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
          // ident param with default
          expr2(funcNode, 'params', i, pnode, 'right', -1, pnode.right);

          const newParamName = createFreshVarInCurrentRootScope('$tdz$__' + pnode.left.name);
          cacheNameStack.push(newParamName);

          log('Replacing param default with a local variable');
          const newIdentNode = AST.identifier(newParamName);
          funcNode.params[i] = newIdentNode;
          const metaNew = getMetaForBindingName(newIdentNode);
          metaNew.usages.push(newIdentNode);

          // Put new nodes at the start of the function body
          ASSERT(!funcNode.expression, 'fixme implement me');
          newBindings.push([
            pnode.left.name, // TODO: is this name already unique at this point?
            // `param === undefined ? init : param`
            AST.conditionalExpression(AST.binaryExpression('===', newParamName, 'undefined'), pnode.right, newParamName),
          ]);
        } else {
          // pattern param with default

          // Param name to hold the object to destructure
          const newParamName = createFreshVarInCurrentRootScope('$tdz$__pattern');
          cacheNameStack.push(newParamName);
          log('Replacing param default with a local variable');
          const newIdentNode = AST.identifier(newParamName);
          funcNode.params[i] = newIdentNode;
          const metaNewParam = getMetaForBindingName(newIdentNode);
          metaNewParam.usages.push(newIdentNode);

          // Create unique var containing the initial param value after resolving default values
          const undefaultName = createFreshVarInCurrentRootScope('$tdz$__pattern_after_default');
          cacheNameStack.push(undefaultName);
          log('Replacing param default with a local variable');
          const undefaultNameNode = AST.identifier(undefaultName);

          // Put new nodes at the start of the function body
          ASSERT(!funcNode.expression, 'fixme implement me (expr arrows should be normalized to have a body)');
          newBindings.push([
            undefaultNameNode,
            // `param === undefined ? init : param`
            AST.conditionalExpression(AST.binaryExpression('===', newParamName, 'undefined'), pnode.right, newParamName),
          ]);

          // Then walk the whole pattern.
          // - At every step of the pattern create code that stores the value of that step in a tmp variable.
          // - Store the tmp var in a stack (pop it when walking out)
          // - A leaf node should be able to access the property from the binding name at the top of the stack

          if (pnode.left.type === 'ObjectPattern') {
            rule('Func params must not be object patterns');
            log('- `function({x}) {}` --> `function(tmp) { var x = tmp.x; }`');

            funcArgsWalkObjectPattern(pnode.left, cacheNameStack, newBindings);
          } else if (pnode.left.type === 'ArrayPattern') {
            rule('Func params must not be array patterns');
            log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');

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
          const newParamName = createFreshVarInCurrentRootScope('tmpParamPattern');
          cacheNameStack.push(newParamName);
          log('- Replacing the pattern param with', '`' + newParamName + '`');
          // Replace the pattern with a variable that receives the whole object
          const newIdentNode = AST.identifier(newParamName);
          funcNode.params[i] = newIdentNode;
          const metaNew = getMetaForBindingName(newIdentNode);
          metaNew.usages.push(newIdentNode);

          // Then walk the whole pattern.
          // - At every step of the pattern create code that stores the value of that step in a tmp variable.
          // - Store the tmp var in a stack (pop it when walking out)
          // - A leaf node should be able to access the property from the binding name at the top of the stack

          if (pnode.type === 'ObjectPattern') {
            rule('Func params must not be array patterns');
            log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');
            funcArgsWalkObjectPattern(pnode, cacheNameStack, newBindings);
          } else if (pnode.type === 'ArrayPattern') {
            rule('Func params must not be array patterns');
            log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');
            funcArgsWalkArrayPattern(pnode, cacheNameStack, newBindings);
          } else {
            ASSERT(false, 'dunno wat dis is', pnode);
          }
        } else {
          ASSERT(false, 'wat else?', pnode);
        }
      }

      if (newBindings.length) {
        log('Params were transformed somehow, injecting new nodes into body');
        funcNode.body.body.unshift(
          AST.variableDeclarationFromDeclaration(newBindings.map(([name, init]) => AST.variableDeclarator(name, init))),
        );
        changed = true;
      }
    });

    groupEnd();

    return { minParamRequired, hasRest, paramBindingNames };
  }
}
