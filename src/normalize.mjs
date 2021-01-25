import { ASSERT, DIM, BOLD, RESET, BLUE, PURPLE, YELLOW, dir, group, groupEnd, log, tmat, fmat } from './utils.mjs';
import * as AST from './ast.mjs';
import globals from './globals.mjs';

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
 */

// low hanging fruit: imports/exports
// next level: assignment analysis and first pass of ssa
// next level: figure out how to fix var decls vs use

/*
  Ideas for normalization;
  - Figure out how to get around the var-might-be-undefined problem
    - Current implementation makes our system think the var might be `undefined` when we know that's never the case
    - Should the vars we introduce be set at the first time usage instead? hmmm
    - Fixing this generically might also increase input support so there's that
  - treeshaking?
    - Not sure if this should (or can?) happen here but ESM treeshaking should be done asap. Is this too soon for it?
  - all bindings have only one point of decl
    - dedupe multiple var statements for the same name
    - dedupe var+function decls
    - dedupe parameter shadows
  - we could implement the one-time assignment thing
    - I need to read up on this. IF every binding always ever only got one update, does that make our lives easier?
  - Should arrows become regular funcs?
    - Not sure whether this actually simplifies anything for us.
  - Should func decls be changed to const blabla?
    - Also not sure whether this helps us anything.
  - switch to if-else
    - do switches have special optimization tricks we can use?
    - trickier with overflow cases unless you go for functions. or maybe break+labels...
    - default case _can_ happen anywhere as well, with unusual semantics
    - could break cases up in arrows so we can call them directly...
  - return early stuff versus if-elsing it out?
    - What's easier to reason about
    - Create new functions for the remainder after an early return? Does that help?
  - Remove unused `return` keywords
  - Assignment of a simple node to itself
  - Return value of a `forEach` arg kinds of things. Return statements are ignored so it's about branching.
  - Statements with empty body can be eliminated or at least split
  - labels
    - Continue to if block?
      - Nested continues are less trivial to transform so this may not be an easy fix
    - while (true) { if (Math.random()) break; $() }
      - --> `var unbroken = true; while (unbroken) { if (Math.random()) { unbroken = false; } else { $() } }`
        - Is that worth it? Kind of depends on the future overhead...
      - --> `var unbroken = true; while (unbroken) { if (Math.random()) { unbroken = false; } else { $() } }`
      - --> `while (x()) y()` --> `while (true) { if (x()) break; y(); }`
    - what would be a normalized cross-branch labelled break/continue look like?
  - Can we get rid of labeled continue such that we can normalize all label sub-statements to blocks? Right now we need to exclude loops.
  - fix the compound assignment expression order problem
  - normalize every expression to an assignemnt statement, call statement, or const/let declaration
  - separate elimination transforms (patterns, switch) from continuous transforms that might need to be applied after other reductions
  - revisit switch normalization
  - unused init for variabel (let x = 10; x = 20; $(x))
  - statement that is identifier / literal (?)
  - arguments (ehh)
  - TODO: broken: var decl hoisting wont find stuff nested inside other blocks or sub-statements (loops, switch, try), I think?
  - TODO: loops that are direct children of labels are significant
*/

const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals

const FRESH = true;
const OLD = false;

const HOISTING_FUNC = 'func';
const HOISTING_VAR = 'var';
const HOISTING_AFTER = 'after';

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

function before(node) {
  if (VERBOSE_TRACING) log(YELLOW + 'Before:' + RESET, tmat(node));
}

function source(node) {
  if (VERBOSE_TRACING) log(YELLOW + 'Source:' + RESET, tmat(node));
}

function after(node) {
  if (VERBOSE_TRACING) log(YELLOW + 'After :' + RESET, tmat(node));
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
      while (fdata.globallyUniqueNamingRegistery.has(name + '$' + ++n));
    }
    return n ? name + '$' + n : name;
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

  function createNewUniqueLabel(name) {
    let n = 0;
    if (fdata.globallyUniqueLabelRegistery.has(name)) {
      while (fdata.globallyUniqueLabelRegistery.has(name + '$' + ++n));
    }
    return n ? name + '$' + n : name;
  }

  group('\n\n\n##################################\n## phaseNormalize  ::  ' + fname + '\n##################################\n\n\n');

  let passes = 0;
  do {
    changed = false;
    // Create a new map for labels every time. Populated as we go. Label references always appear after the definition anyways.
    fdata.globallyUniqueLabelRegistery = new Map();
    // Clear usage/update lists because mutations may have affected them
    fdata.globallyUniqueNamingRegistery.forEach((meta) => ((meta.updates = []), (meta.usages = [])));
    stmt(null, 'ast', -1, ast, false, false);
    log('\nCurrent state\n--------------\n' + fmat(tmat(ast)) + '\n--------------\n');
    if (changed) {
      somethingChanged = true;
      log('Something changed. Running another normalization pass (' + ++passes + ')\n');
    }
  } while (changed);

  // Rename the ident in all usages to a (file-) globally unique name
  fdata.globallyUniqueNamingRegistery.forEach((obj, uniqueName) => {
    // As a result, all bindings in this file ought to now have a unique name.
    if (uniqueName !== obj.originalName) {
      ASSERT(!obj.isExport, 'exports should retain their original name and this should not happen');
      obj.usages.forEach((node) => {
        if (node.name !== uniqueName) {
          rold('All bindings are globally unique');
          log('- Updating name `' + node.name + '` to the unique name `' + uniqueName + '`');
          before(node);
          node.name = uniqueName;
          after(node);
        }
      });
    }
  });
  fdata.globallyUniqueLabelRegistery.forEach((meta) => {
    if (meta.usages.length === 0) {
      log('Dropping the label `' + meta.name + '` because it is not referenced');
      const { parent, prop, index } = meta.labelNode;
      if (index >= 0) parent[prop][index] = parent[prop][index].body;
      else parent[prop] = parent[prop].body;
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
    ASSERT(typeof prop === 'string');
    ASSERT(typeof index === 'number');

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
      'Created fresh var for `' +
        name +
        '`' +
        (name !== tmpName ? ' (-> `' + tmpName + '`)' : '') +
        '. Recording `' +
        tmpName +
        '` to be declared in [',
      [...lexScope.$p.nameMapping.keys()]
        .filter(function (key) {
          return this.has(key) ? false : !!this.add(key);
        }, new Set(globals.keys()))
        .join(', '),
      ']',
    );
    lexScopeStack[lexScopeStack.length - 1].$p.nameMapping.set(tmpName, tmpName);
    if (injectVarBinding) {
      funcStack[funcStack.length - 1].$p.varBindingsToInject.push(AST.variableDeclaration(tmpName, null, 'var'));
    }
    return tmpName;
  }

  function findBoundNamesInPattern(node) {
    ASSERT(node.type === 'VariableDeclaration');
    ASSERT(node.declarations.length === 1, 'var decls define one binding?', node);

    const decl = node.declarations[0];
    if (decl.id.type === 'Identifier') return [decl.id.name];

    ASSERT(decl.id.type === 'ObjectPattern' || decl.id.type === 'ArrayPattern', 'theres no other kind of decl..?');

    const names = [];
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

  function isComplexNodeOrAlreadySequenced(node) {
    return isComplexNode(node, true);
  }

  function isComplexNode(node, andNotSimpleSequence = false) {
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
    if (andNotSimpleSequence && isSimpleSequence(node)) return false;
    if (node.type === 'ArrayExpression' && node.elements.length === 0) return false; // Empty array literal is not exciting, probably not worth separating (?)
    if (node.type === 'ObjectExpression' && node.properties.length === 0) return false; // Empty object literal is not exciting, probably not worth separating (?)
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return false; // Template without expressions is a string

    return true;
  }
  function isSimpleMemberExpression(node) {
    // True if `a.b`, `a[b]`, or if a is a sequence that ends with a simple node (but not sequence)
    if (node.type !== 'MemberExpression') return false;
    if (isComplexNode(node, true)) return false;
    if (node.computed) return isComplexNode(node.property);
    return true;
  }
  function isSimpleSequence(node) {
    if (node.type !== 'SequenceExpression') return false;
    return !isComplexNode(node.expressions[node.expressions.length - 1]);
  }
  function isImmutable(node) {
    return (
      node.type === 'Literal' ||
      (node.type === 'Identifier' && ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'].includes(node.name))
    );
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
        rold('No nested sequences');
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

  function statementifyExpressions(node) {
    // Note: make sure the node is not being walked currently or things end bad.

    // This is an expression statement. Convert certain expressions into equivalent statements
    // This includes;
    // - sequence -> individual expression statements
    // - logical -> if-else
    // - conditional -> if-else
    // - variable declaration -> init processing

    let i = 0;
    while (i < node.body.length) {
      ASSERT(node.body[i], 'sequence does not have empty elements?', node);
      const e = node.body[i];
      if (e.type === 'ExpressionStatement') {
        const expr = node.body[i].expression;
        if (expr.type === 'SequenceExpression') {
          // Sequence expressions have only some edge cases to care about. In particular around context.
          // In this case we only replace whole groups nested in other groups, which should not be a concern.
          // Note: a group is always two or more elements. This should not affect or even detect "parenthesised" code.
          // Break sequence expressions that are the child of an ExpressionStatement up into separate statements
          rold('Sequences can not be statements');
          before(expr);
          log('- `a, (b, c), d` --> `a; b; c; d;`');
          node.body.splice(
            i,
            1,
            ...expr.expressions.map((enode) => {
              const newNode = AST.expressionStatement(enode);
              after(newNode);
              return newNode;
            }),
          );
          changed = true;
          --i; // revisit (recursively)
        } else if (expr.type === 'ConditionalExpression') {
          rold('Conditional / ternary expressions should not be statements');
          log('- `a ? b : c` --> `{ if (a) b; else c; }');
          before(expr);

          const newNode = AST.blockStatement(
            AST.ifStatement(expr.test, AST.expressionStatement(expr.consequent), AST.expressionStatement(expr.alternate)),
          );
          node.body[i] = newNode;

          after(newNode);
          changed = true;
          --i; // revisit
        } else if (expr.type === 'AssignmentExpression') {
          if (expr.right.type === 'ConditionalExpression') {
            rold('Conditional / ternary assignment expressions should not be statements');
            log('- `x = a ? b : c` --> `{ if (a) x = b; else x = c; }');
            before(expr);

            const newNode = AST.ifStatement(
              expr.right.test,
              AST.expressionStatement(AST.assignmentExpression(expr.left, expr.right.consequent, expr.operator)),
              AST.expressionStatement(AST.assignmentExpression(expr.left, expr.right.alternate, expr.operator)),
            );
            node.body[i] = newNode;

            after(node.body[i]);
            changed = true;
            --i; // revisit
          } else if (expr.right.type === 'LogicalExpression' && expr.left.type === 'Identifier') {
            const logi = expr.right;
            // Note: while we checked that the lhs of assignment is ident, we have to take a precaution
            //       for the case where the operator is not `=`, or when the logical expression left is
            //       complex. In both cases we cache the lhs first and assign it only if the condition
            //       would. In the future we could improve this (TODO) by being explicit for each case.
            if (expr.right.operator === '||') {
              rold('Logical `||` in stmt assignment should be if-else, complex left');
              log('- `x = a || b` --> `{ let tmp = a; if (tmp) x = tmp; else x = b; }`');
              log('- `x = a() || b` --> `{ let tmp = a(); if (tmp) x = tmp; else x = b; }`');
              log('- `x += a || b` --> `{ let tmp += a; if (tmp) x = tmp; else x = b; }`');
              before(e);

              const tmpName = createFreshVarInCurrentRootScope('tmpAssignLogicStmtOr');
              const newNode = AST.blockStatement(
                AST.variableDeclaration(tmpName, logi.left),
                AST.ifStatement(
                  tmpName,
                  AST.expressionStatement(AST.assignmentExpression(expr.left, tmpName)),
                  AST.expressionStatement(AST.assignmentExpression(expr.left, logi.right)),
                ),
              );
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            } else if (expr.right.operator === '&&') {
              rold('Logical `&&` in stmt assignment should be if-else, complex left');
              log('- `x = a && b` --> `{ let tmp = a; if (tmp) x = b; else x = tmp; }`');
              log('- `x = a() && b` --> `{ let tmp = a(); if (tmp) x = b; else x = tmp; }`');
              log('- `x += a && b` --> `{ let tmp += a; if (tmp) x = b; else x = tmp; }`');
              before(e);

              const tmpName = createFreshVarInCurrentRootScope('tmpAssignLogicStmtOr');
              const newNode = AST.blockStatement(
                AST.variableDeclaration(tmpName, logi.left),
                AST.ifStatement(
                  tmpName,
                  AST.expressionStatement(AST.assignmentExpression(expr.left, logi.right)),
                  AST.expressionStatement(AST.assignmentExpression(expr.left, tmpName)),
                ),
              );
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            }
          } else if (expr.left.type === 'MemberExpression' && expr.left.object.type === 'SequenceExpression') {
            rold('Statement assignment to property on group should be split');
            example('(a(), b()).c = d()', 'a(); b().c = d()');
            before(expr);

            const xps = expr.left.object.expressions;
            const assign = AST.expressionStatement(
              AST.assignmentExpression(
                AST.memberExpression(xps[xps.length - 1], expr.left.property, expr.left.computed),
                expr.right,
                expr.operator,
              ),
            );
            const newNode = AST.blockStatement(
              ...xps.slice(0, -1).map((n) => {
                const x = AST.expressionStatement(n);
                after(x);
                return x;
              }),
              assign,
            );
            node.body[i] = newNode;

            after(assign);
            changed = true;
            _stmt(newNode);
          }
        } else if (expr.type === 'LogicalExpression') {
          const leftIsComplex = isComplexNode(expr.left);
          if (expr.operator === '||') {
            if (leftIsComplex) {
              rold('Logical `||` as statement should be if-else, complex left');
              log('- `a() || b` --> `tmp = a(); if (tmp); else b;`');
              before(e);

              const tmpName = createFreshVarInCurrentRootScope('tmpLogicStmtOr');
              const newNode = AST.blockStatement(
                AST.variableDeclaration(tmpName, expr.left),
                AST.ifStatement(tmpName, AST.emptyStatement(), AST.expressionStatement(expr.right)),
              );
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            } else {
              rold('Logical `||` as statement should be if-else, simple left');
              log('- `a || b` --> `if (a); else b;`');
              before(e);

              const newNode = AST.ifStatement(expr.left, AST.emptyStatement(), AST.expressionStatement(expr.right));
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            }
          } else if (expr.operator === '&&') {
            if (leftIsComplex) {
              rold('Logical `&&` as statement should be if-else, complex left');
              log('- `a() && b` --> `tmp = a(); if (tmp) b;`');
              before(e);

              const tmpName = createFreshVarInCurrentRootScope('tmpLogicStmtAnd');
              const newNode = AST.blockStatement(
                AST.variableDeclaration(tmpName, expr.left),
                AST.ifStatement(tmpName, AST.expressionStatement(expr.right)),
              );
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            } else {
              rold('Logical `&&` as statement should be if-else, simple left');
              log('- `a && b` --> `if (a) b;`');
              before(e);

              const newNode = AST.ifStatement(expr.left, AST.expressionStatement(expr.right));
              node.body[i] = newNode;

              changed = true;
              after(newNode);
            }
          }
        } else if (expr.type === 'MemberExpression' && expr.object.type === 'SequenceExpression') {
          // This is more likely to be an artifact or test than anything else, but still.
          rold('Statement property on group should be split');
          example('(a(), b()).c', 'a(); b().c', () => !expr.computed);
          example('(a(), b())[c()]', 'a(); b()[c()]', () => expr.computed);
          before(expr);

          const xps = expr.object.expressions;
          const newNode = AST.blockStatement(
            ...xps.slice(0, -1).map((n) => AST.expressionStatement(n)),
            AST.expressionStatement(AST.memberExpression(xps[xps.length - 1], expr.property, expr.computed)),
          );
          node.body[i] = newNode;

          after(newNode);
          changed = true;
          _stmt(newNode);
        }
      } else if (e.type === 'VariableDeclaration') {
        if (e.declarations.length > 1) {
          log('Found a var decl with multiple bindings. Skipping statementifySequences on it until next pass.');
        } else {
          const dnode = e.declarations[0];
          const id = dnode.id;
          const init = dnode.init;
          if (!init) {
          } else if (init.type === 'SequenceExpression') {
            // This assumes sub-statements are normalized to be groups already
            rold('Var binding init can not be sequences');
            log('- `var x = (1, 2)` --> `1; var x = 2`');
            const exprs = init.expressions;
            node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
            // Replace the old sequence expression with its last element
            dnode.init = exprs[exprs.length - 1];
            changed = true;
            --i; // revisit (recursively)
          } else if (init.type === 'MemberExpression' && init.object.type === 'SequenceExpression') {
            // This assumes sub-statements are normalized to be groups already
            rold('Var binding init can not be member expression on sequence');
            log('- `var x = (a, b).x` --> `a; var x = b.x`');
            const seq = init.object;
            const exprs = seq.expressions;
            node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
            // Replace the old sequence expression with its last element
            init.object = exprs[exprs.length - 1];
            changed = true;
            --i; // revisit (recursively)
          } else if (init.type === 'ConditionalExpression') {
            rold('Conditional / ternary expressions should not be var init');
            if (e.kind === 'var') log('- `var x = a ? b : c` --> `{ var x; if (a) a = b; else a = c; }');
            if (e.kind === 'let') log('- `let x = a ? b : c` --> `{ let x; if (a) a = b; else a = c; }');
            if (e.kind === 'const') log('- `const x = a ? b : c` --> `{ let x; if (a) a = b; else a = c; }');
            before(e);

            const newNode = AST.ifStatement(
              init.test,
              AST.expressionStatement(AST.assignmentExpression(id.name, init.consequent)),
              AST.expressionStatement(AST.assignmentExpression(id.name, init.alternate)),
            );
            dnode.init = null;
            if (e.kind === 'const') e.kind = 'let';
            node.body.splice(i + 1, 0, newNode);

            after(node.body[i]);
            after(newNode);
            changed = true;
            --i; // revisit
          }
        }
      } else if (e.type === 'ReturnStatement') {
        if (!e.argument) {
          log('Return statement is not normalized. Request another pass.');
          changed = true;
        } else if (e.argument.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rold('Argument of return statement can not be sequence');
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
          rold('Argument of return statement can not be member expression on sequence');
          log('- `return (a, b).foo` --> `a; return b.foo`');
          const seq = e.argument.object;
          const exprs = seq.expressions;
          node.body.splice(i, 0, ...exprs.slice(0, -1).map((enode) => AST.expressionStatement(enode)));
          // Replace the old sequence expression with its last element
          e.argument.object = exprs[exprs.length - 1];
          changed = true;
          --i; // revisit (recursively)
        } else if (e.argument.type === 'ConditionalExpression') {
          rold('Conditional / ternary expressions should not be return argument');
          if (node.kind === 'var') log('- `var x = a ? b : c` --> `{ var x; if (a) a = b; else a = c; }');
          if (node.kind === 'let') log('- `let x = a ? b : c` --> `{ let x; if (a) a = b; else a = c; }');
          if (node.kind === 'const') log('- `const x = a ? b : c` --> `{ let x; if (a) a = b; else a = c; }');
          before(e.argument);

          const newNode = AST.ifStatement(
            e.argument.test,
            AST.returnStatement(e.argument.consequent),
            AST.returnStatement(e.argument.alternate),
          );
          node.body[i] = newNode;

          after(newNode);
          changed = true;
          --i; // revisit
        }
      } else if (e.type === 'IfStatement') {
        if (e.test.type === 'SequenceExpression') {
          // This assumes sub-statements are normalized to be groups already
          rold('Test of if statement can not be sequence');
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
          rold('Argument of return statement can not be member expression on sequence');
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

    group('ensureVarDeclsCreateOneBinding(' + body.length + 'x)');

    let i = 0;
    while (i < body.length) {
      ASSERT(body[i], 'block does not have empty elements?', body);
      const e = body[i];
      if (e.type === 'VariableDeclaration') {
        log('- var decl has', e.declarations.length, 'declarators');
        if (e.declarations.length > 1) {
          rold('One binding per variable declaration');
          log('- `var a, b` --> `var a; var b;`');
          log('- `var a = 1, b = 2` --> `var a = 1; var b = 1;`');
          body.splice(i, 1, ...e.declarations.map((dnode) => AST.variableDeclaration(dnode.id, dnode.init, e.kind)));
          changed = true;
          --i; // revisit (recursively)
        } else {
          const decl = e.declarations[0];
          if (decl.init) {
            const init = decl.init;
            if (init.type === 'ArrayPattern' || init.type === 'ObjectPattern') {
              // Need to revisit after compiling patterns out
              changed = true;
            } else if (init.type === 'AssignmentExpression') {
              // Note: this transform is only safe with simple left or right sides.
              // If the right side is simple use the right side as init.
              // If the left side is simple use the left side as init.
              // If neither is simple then uhh uh uhh todo.
              if (init.left.type === 'ArrayPattern' || init.left.type === 'ObjectPattern') {
                // Need to revisit after compiling patterns out
                changed = true;
              } else if (!isComplexNode(init.right)) {
                rold('Init of a var binding must not be assignment, with simple rhs');
                log('- `let x = y().foo = z` --> `y().foo = z; let x = z`');
                before(decl);
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');

                body.splice(i, 1, AST.expressionStatement(init), AST.variableDeclaration(decl.id, init.right, e.kind));

                after(body[i]);
                after(body[i + 1]);
                changed = true;
                //--i;
              } else if (!isComplexNode(init.left)) {
                rold('Init of a var binding must not be assignment, with simple lhs');
                log('- `let x = y = z()` --> `y = z(); let x = y`');
                before(decl);
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');

                body.splice(i, 1, AST.expressionStatement(init), AST.variableDeclaration(decl.id, init.left, e.kind));

                after(body[i]);
                after(body[i + 1]);
                changed = true;
                //--i;
              } else {
                rold('Init of a var binding must not be assignment, with both sides complex');
                log('- `let x = y().foo = z().foo` --> `let tmp = y(); let tmp2 = z(); y.foo = tmp2; let x = tmp2;`');
                before(decl);
                ASSERT(decl.id.type === 'Identifier', 'no more patterns here');
                ASSERT(init.left.type === 'MemberExpression', 'what else do you assign to if not simple nor member?', e, init);

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

                after(body[i]);
                after(body[i + 1]);
                after(body[i + 2]);
                after(body[i + 3]);
                changed = true;
                //--i;
              }
            } else if (init.type === 'LogicalExpression') {
              if (init.operator === '||') {
                rold('Logical `||` in var init assignment should be if-else');
                log('- `var x = a() || b` --> `{ var x = a(); if (x); else x = b; }`');
                before(decl);

                body.splice(
                  i,
                  1,
                  AST.variableDeclaration(decl.id, init.left, e.kind === 'const' ? 'let' : e.kind),
                  AST.ifStatement(decl.id, AST.emptyStatement(), AST.expressionStatement(AST.assignmentExpression(decl.id, init.right))),
                );

                changed = true;
                after(body[i]);
                after(body[i + 1]);
              } else if (init.operator === '&&') {
                rold('Logical `&&` in var init assignment should be if-else');
                log('- `var x = a() && b` --> `{ var x = a(); if (x) x = b; }`');
                before(e);

                body.splice(
                  i,
                  1,
                  AST.variableDeclaration(decl.id, init.left, e.kind === 'const' ? 'let' : e.kind),
                  AST.ifStatement(decl.id, AST.expressionStatement(AST.assignmentExpression(decl.id, init.right))),
                );

                changed = true;
                after(body[i]);
                after(body[i + 1]);
              }
            }
          }
        }
      }
      ++i;
    }

    groupEnd();
  }

  function hoisting(body) {
    // Body should be the node.body of Program or node.body.body of a function node
    // Make sure body is not being traversed
    // TODO: maybe this should be its own phase as we shouldn't need to do this more than once

    group('Hoisting(' + body.length + 'x)');

    let stage = HOISTING_FUNC;
    let funcs = 0;
    let vars = 0;
    const funcNames = [];
    const varNames = [];
    for (let i = 0; i < body.length; ++i) {
      const snode = body[i];

      if (
        snode.type === 'FunctionDeclaration' ||
        (snode.type === 'ExportNamedDeclaration' &&
          snode.declaration &&
          snode.declaration &&
          snode.declaration.type === 'FunctionDeclaration') ||
        (snode.type === 'ExportDefaultDeclaration' && snode.declaration.type === 'FunctionDeclaration' && snode.declaration.id)
      ) {
        const id = snode.type === 'FunctionDeclaration' ? snode.id : snode.declaration.id;
        funcNames.push(id.name);
        log(' -', i, 'is func decl:', snode.type);

        if (stage === HOISTING_FUNC) {
          log('  - Within func hoisting area so noop');
        } else {
          // we are no longer in the hoisting segment so move it in there
          body[i] = AST.expressionStatement(AST.literal('<hoisted func decl `' + id.name + '`>'));
          body.splice(funcs, 0, snode);
          log('  - Injected at index', funcs);
          ++i;
        }

        ++funcs;
      } else if (
        (snode.type === 'VariableDeclaration' && snode.kind === 'var') ||
        (snode.type === 'ExportNamedDeclaration' &&
          snode.declaration &&
          snode.declaration.type === 'VariableDeclaration' &&
          snode.declaration.kind === 'var')
      ) {
        log(' -', i, 'is a var decl:', snode.type);
        const decl = snode.type === 'VariableDeclaration' ? snode.declarations[0] : snode.declaration.declarations[0];
        const names = findBoundNamesInPattern(snode); // binding patterns may still exist at this point
        log('  - Names:', names);
        varNames.push(...names);

        if (stage === HOISTING_VAR && !decl.init) {
          log('  - Within var hoisting area so noop');
        } else if (stage === HOISTING_FUNC && !decl.init) {
          log('  - Within var hoisting area so noop');
          stage = HOISTING_VAR;
        } else {
          if (decl.init) {
            log('  - Var has an init so needs to be split up');
          }
          if (stage === HOISTING_FUNC) {
            // ok, put us past the function segment
            stage = HOISTING_VAR;
          }

          log('  - Injected from index', funcs + vars);

          // we are no longer in the hoisting segment so drop the var keyword and create the decl there
          body[i] = decl.init
            ? AST.expressionStatement(AST.assignmentExpression(decl.id, decl.init))
            : AST.expressionStatement(AST.literal('<hoisted var `' + names + '` decl without init>'));
          body.splice(funcs + vars, 0, ...names.map((name) => AST.variableDeclaration(name, undefined, 'var')));
          i += names.length;
        }
        ++vars;
      } else {
        log(' -', i, 'is not a relevant hoisting target;', snode.type);
        stage = HOISTING_AFTER;
      }
    }

    body
      .slice(0, funcs)
      .sort((a, b) => {
        const A = a.type === 'FunctionDeclaration' ? a.id.name : a.declaration.id.name;
        const B = b.type === 'FunctionDeclaration' ? b.id.name : b.declaration.id.name;
        return A < B ? -1 : A > B ? 1 : 0;
      })
      .forEach((node, i) => (body[i] = node));

    // Replace all var decls with fresh ones. Deals with ordering, deduping, and func-name-deduping.
    // All these var decls should not have an init at this point.
    const varNameSet = new Set();
    body.splice(
      funcs,
      vars,
      ...varNames
        .filter((name) => {
          if (funcNames.includes(name)) return false;
          if (varNameSet.has(name)) return false;
          varNameSet.add(name);
          return true;
        })
        .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
        .map((name) => AST.variableDeclaration(name, undefined, 'var')),
    );

    // If two functions have the same name then only the last one is not dead code
    const seenNames = new Set();
    const funcNodes = body.slice(0, funcs);
    for (let i = funcNodes.length - 1; i >= 0; --i) {
      const node = funcNodes[i];
      const name =
        node.type === 'FunctionDeclaration'
          ? node.id.name
          : node.declaration.type === 'FunctionDeclaration'
          ? node.declaration.id.name
          : ASSERT(false);

      if (seenNames.has(name)) {
        body[i] = AST.expressionStatement(AST.literal('<eliminated duplicate func decl `' + name + '`>'));
      } else {
        seenNames.add(name);
      }
    }

    groupEnd();
  }

  function normalizeCallArgsChangedSomething(node, isNew) {
    // If this returns true, then the given node was replaced and already walked

    // Scan all the args. If any of them are not simple, store all of them in fresh variables and
    // pass those around. The reason we do them all in that case is to prevent issues where the
    // variable gets updated in a later argument position, like `f(a, ++a) --> tmp=++a,f(a, tmp)` would be wrong.

    // The expression can be changed inline so we can do it right now, before traversing.
    // We first need to scan to check whether it's necessary at all. This should not be a big deal as most calls
    // will have less than a handful of arguments.

    const has = node.arguments.some((anode) => {
      return isComplexNode(anode.type === 'SpreadElement' ? anode.argument : anode);
    });

    if (has) {
      if (isNew) {
        rold('New args must be simple nodes');
        log('- `new F(x())` --> `(tmp=x(), new F(tmp)`');
        log('- `new F(...x())` --> `(tmp=x(), new F(...tmp)`');
        log('- `new F(a, ++a)` --> `(tmp=a, tmp2=++a, new F(tmp, tmp2)`');
        log('- `new F(x(), 100, y(), a, z())` --> `(t1=x(), t2=y(), t3=z(), new F(t1, 100, t2, a, t3))`');
      } else {
        rold('Call args must be simple nodes');
        log('- `f(x())` --> `(tmp=x(), f(tmp)`');
        log('- `f(...x())` --> `(tmp=x(), f(...tmp)`');
        log('- `f(a, ++a)` --> `(tmp=a, tmp2=++a, f(tmp, tmp2)`');
        log('- `f(x(), 100, y(), a, z())` --> `(t1=x(), t2=y(), t3=z(), f(t1, 100, t2, a, t3))`');
      }
      before(node);

      // Note: must assign ALL args to a fresh var because `f(a, ++a) --> tmp=++a,f(a,tmp)` is a bad bug.
      const assigns = [];
      let newArgs = [];
      node.arguments.forEach((anode, i) => {
        const target = anode.type === 'SpreadElement' ? anode.argument : anode;
        if (
          target.type === 'Literal' ||
          (target.type === 'Identifier' && ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'].includes(target.name))
        ) {
          // Don't re-assign literals. They are immutable, there's no point or risk.
          if (anode.type === 'SpreadElement') {
            newArgs.push(anode);
          } else {
            newArgs.push(anode);
          }
        } else {
          const tmpName = createFreshVarInCurrentRootScope('tmpArg', true);

          if (anode.type === 'SpreadElement') {
            assigns.push(AST.assignmentExpression(tmpName, anode.argument));
            newArgs.push(AST.spreadElement(tmpName));
          } else {
            assigns.push(AST.assignmentExpression(tmpName, anode));
            newArgs.push(AST.identifier(tmpName));
          }
        }
      });

      if (assigns.length) {
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
        crumb(anode, 'argument', -1);
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
        uncrumb(anode, 'argument', -1);
      }
    });
    if (assigns.length) {
      rold('Elements of array literals must be simple nodes');
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
        rold('Callee of new must be simple node');
        log('- `new x.y(a,b)` --> `(tmp=x.y, new tmp(a,b))`');
      } else {
        rold('Callee of call must be simple node or member expression');
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
      rold('Callee of a call can not be member expression on sequence');
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

  function stmt(parent, prop, index, node, isExport = '', isFunctionBody = false) {
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
    _stmt(node, isExport, isFunctionBody);
    uncrumb(parent, prop, index);
  }

  function _stmt(node, isExport = '', isFunctionBody = false) {
    if (node.type === 'FunctionDeclaration' || node.type === 'Program') {
      funcStack.push(node);
      node.$p.pure = true; // Output depends on input, nothing else, no observable side effects
      node.$p.returns = []; // all return nodes, and `undefined` if there's an implicit return too
      node.$p.varBindingsToInject = [];
    }

    group(DIM + 'stmt(' + RESET + BLUE + node.type + RESET + DIM + ')' + RESET);
    __stmt(node, isExport, isFunctionBody);
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
    }
  }

  function __stmt(node, isExport = '', isFunctionBody = false) {
    if (node.$scope || (node.type === 'TryStatement' && node.handler)) {
      if (node.$scope) lexScopeStack.push(node);
      else lexScopeStack.push(node.handler);
    }

    switch (node.type) {
      case 'BlockStatement': {
        anyBlock(node);
        break;
      }

      case 'BreakStatement': {
        if (node.label) {
          log('Recording', node.label.name, 'as being used here');
          const parent = crumbsNodes[crumbsNodes.length - 1];
          const prop = crumbsProps[crumbsProps.length - 1];
          const index = crumbsIndexes[crumbsIndexes.length - 1];

          fdata.globallyUniqueLabelRegistery.get(node.label.name).usages.push({ parent, prop, index });
        }
        break;
      }

      case 'ClassDeclaration': {
        processClass(node, false, isExport);
        break;
      }

      case 'ContinueStatement': {
        if (node.label) {
          log('Recording', node.label.name, 'as being used here');
          const parent = crumbsNodes[crumbsNodes.length - 1];
          const prop = crumbsProps[crumbsProps.length - 1];
          const index = crumbsIndexes[crumbsIndexes.length - 1];

          fdata.globallyUniqueLabelRegistery.get(node.label.name).usages.push({ parent, prop, index });
        }
        break;
      }

      case 'DebuggerStatement': {
        break;
      }

      case 'DoWhileStatement': {
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
        ASSERT(false, 'I dont think these can be validly left behind? sub-statements must be blocks so what legal case is left here?');
        break;
      }

      case 'ForStatement': {
        ASSERT(false, 'the `for` statement should be transformed to a `while`');
        break;
      }

      case 'ForOfStatement':
      case 'ForInStatement': {
        if (node.await) {
          // Only of a `for-of`
          // TODO: This needs proper support for iterable stuff for true support. We could start with superficial support.
          TOFIX;
        }

        expr(node, 'right', -1, node.right);
        if (node.left.type === 'Identifier') {
          const meta = getMetaForBindingName(node.left);
          meta.usages.push(node.left);
          meta.updates.push(node.left); // lhs is written to
        }
        // expr(node, 'left', -1, node.left); // I don't think it should?
        stmt(node, 'body', -1, node.body);

        break;
      }

      case 'FunctionDeclaration': {
        log('Name:', node.id ? node.id.name : '<anon>');

        if (node.id) expr(node, 'id', -1, node.id);

        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body, undefined, true);

        break;
      }

      case 'IfStatement': {
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

      case 'LabeledStatement': {
        // TODO: this needs more thinking, more test cases. Especially around loops/continue
        if (
          !['BlockStatement', 'WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement'].includes(
            node.body.type,
          )
        ) {
          // TODO: can we get rid of the labeled continue such that we dont have to make this exception? Guess it won't be easy.
          rold('Label sub-statement must be block unless it is a loop');
          log('- `x: y` --> `x: { y }`');
          before(node);

          node.body = AST.blockStatement(node.body);

          changed = true;
          after(node);
        }

        ASSERT(
          !fdata.globallyUniqueLabelRegistery.has(node.label.name) || fdata.globallyUniqueLabelRegistery.get(node.label.name) === true,
          'labels should be made unique in phase1',
          fdata.globallyUniqueLabelRegistery,
          node,
        );
        const parent = crumbsNodes[crumbsNodes.length - 1];
        const prop = crumbsProps[crumbsProps.length - 1];
        const index = crumbsIndexes[crumbsIndexes.length - 1];
        fdata.globallyUniqueLabelRegistery.set(node.label.name, {
          // ident meta data
          name: node.label.name,
          uniqueName: node.label.name,
          labelNode: {
            parent,
            prop,
            index,
          },
          usages: [], // {parent, prop, index} of the break/continue statement referring to the label
        });

        stmt(node, 'body', -1, node.body);
        break;
      }

      case 'Program': {
        anyBlock(node, true);
        break;
      }

      case 'ReturnStatement': {
        expr(node, 'argument', -1, node.argument);
        break;
      }

      case 'TryStatement': {
        stmt(node, 'block', -1, node.block);
        if (node.handler) {
          crumb(node, 'handler', -1);
          stmt(node.handler, 'body', -1, node.handler.body);
          uncrumb(node, 'handler', -1);
        }
        if (node.finalizer) {
          stmt(node, 'finalizer', -1, node.finalizer);
        }
        break;
      }

      case 'SwitchStatement': {
        ASSERT(false, 'switch should be normalized away');

        break;
      }

      case 'ThrowStatement': {
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
          rold('Binding patterns not allowed'); // TODO: this is duplicate
          log('- `let [x] = y()` --> `let tmp = y(), tmp1 = [...tmp], x = tmp1[0]`');

          const bindingPatternRootName = createFreshVarInCurrentRootScope('bindingPatternArrRoot');
          const nameStack = [bindingPatternRootName];
          const newBindings = [];
          funcArgsWalkArrayPattern(dnode.id, nameStack, newBindings, 'var');

          if (newBindings.length) {
            log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
            node.declarations = [
              AST.variableDeclarator(bindingPatternRootName, dnode.init),
              ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init)),
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
          rold('Binding patterns not allowed'); // TODO: this is duplicate
          log('- `var {x} = y()` --> `var tmp = y(), x = obj.x`');

          const bindingPatternRootName = createFreshVarInCurrentRootScope('bindingPatternObjRoot');
          const nameStack = [bindingPatternRootName];
          const newBindings = [];
          funcArgsWalkObjectPattern(dnode.id, nameStack, newBindings, 'var', true);

          if (newBindings.length) {
            log('Assigning init to `' + bindingPatternRootName + '` and normalizing pattern into', newBindings.length, 'parts');
            node.declarations = [
              AST.variableDeclarator(bindingPatternRootName, dnode.init),
              ...newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init)),
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

        if (!changedHere && node.declarations.length === 1 && node.declarations[0].init) {
          const decl = node.declarations[0];
          const init = decl.init;
          if (init.type === 'MemberExpression' && isComplexNode(init.object)) {
            if (init.object.type === 'SequenceExpression' && !isComplexNode(init.object.expressions[init.object.expressions.length - 1])) {
              rold('Var init cannot be member expression on sequence with trailing node simple');
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
              rold('Var init cannot be member expression with complex object');
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
          _stmt(node, isExport, isFunctionBody);
        } else if (dnode.init) {
          expr2(node, 'declarations', 0, dnode, 'init', -1, dnode.init);
        }

        break;
      }

      case 'WhileStatement': {
        if (isComplexNode(node.test)) {
          rold('While test must be simple node');
          example('while (f()) z()', 'while (true) { if (f()) z(); else break; }');
          before(node);

          const newNode = AST.whileStatement('true', AST.blockStatement(AST.ifStatement(node.test, node.body, AST.breakStatement())));

          crumbSet(1, newNode);

          changed = true;
          after(newNode);

          _stmt(newNode);
          break;
        }

        if (node.body.type !== 'BlockStatement') {
          rold('While sub-statement must be block');
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
                  rold('Spread args in array must be simple nodes');
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

          funcArgsWalkObjectPattern(node.left, cacheNameStack, newBindings, 'assign', true);

          if (newBindings.length) {
            rold('Assignment obj patterns not allowed');
            before(node);
            log('- `({x} = y())` --> `tmp = y(), x = tmp.x, tmp`');

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.

            const varBindingsToInject = funcStack[funcStack.length - 1].$p.varBindingsToInject;

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, FRESH, node.right]);

            const expressions = [];
            newBindings.forEach(([name, fresh, expr]) => {
              if (fresh) varBindingsToInject.push(AST.variableDeclaration(name, null, 'var'));
              expressions.push(AST.assignmentExpression(name, expr));
            });
            expressions.push(AST.identifier(rhsTmpName));
            const newNode = AST.sequenceExpression(expressions);
            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
          } else {
            rold('Assignment obj patterns not allowed, empty');
            log('- `({} = y())` --> `y()`');
            before(node);
            crumbSet(1, node.right);
            after(node.right);
            changed = true;

            _expr(node.right);
          }
          break;
        }

        if (node.left.type === 'ArrayPattern') {
          const rhsTmpName = createFreshVarInCurrentRootScope('arrAssignPatternRhs');
          const cacheNameStack = [rhsTmpName];
          const newBindings = [];

          funcArgsWalkArrayPattern(node.left, cacheNameStack, newBindings, 'assign');

          if (newBindings.length) {
            rold('Assignment arr patterns not allowed, non-empty');
            example('[x] = y()', 'var tmp, tmp1; tmp = y(), tmp1 = [...tmp], x = tmp1[0], tmp');
            before(node);

            // Replace this assignment node with a sequence
            // Contents of the sequence is the stuff in newBindings. Map them into assignments.
            // Final step in sequence must still be origina rhs (`a = [x] = y` will assign `y` to `a`, not `x`)

            const varBindingsToInject = funcStack[funcStack.length - 1].$p.varBindingsToInject;

            // First assign the current rhs to a tmp variable.
            newBindings.unshift([rhsTmpName, FRESH, node.right]);

            const expressions = [];
            newBindings.forEach(([name, fresh, expr]) => {
              if (fresh) varBindingsToInject.push(AST.variableDeclaration(name, null, 'var'));
              expressions.push(AST.assignmentExpression(name, expr));
            });
            expressions.push(AST.identifier(rhsTmpName));
            const newNode = AST.sequenceExpression(expressions);

            crumbSet(1, newNode);
            after(newNode);

            changed = true;
            _expr(newNode);
          } else {
            rold('Assignment arr patterns not allowed, empty');
            log('- `[] = y()` --> `y()`'); // TODO: Does it have to be spreaded anyways? Do I care?
            before(node);

            crumbSet(1, node.right);
            after(node.right);

            changed = true;
            _expr(node.right);
          }

          break;
        }

        ASSERT(node.left.type === 'Identifier' || node.left.type === 'MemberExpression', 'uhhh was there anything else assignable?', node);

        if (node.left.type === 'MemberExpression') {
          // a.b = c
          // a[b] = c
          const lhs = node.left;
          const a = node.left.object;
          const b = node.left.property;
          const c = node.right;

          if (isComplexNode(a)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rold('Assignment to member expression must have simple lhs');
            example('a().b = c()', '(tmp = a(), tmp2.b = c()', () => !node.computed);
            example('a()[b()] = c()', '(tmp = a(), tmp2[b()] = c()', () => node.computed);
            before(node);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignMemLhsObj', true);
            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(tmpNameObj, a), // tmp = a()
              AST.assignmentExpression(
                AST.memberExpression(tmpNameObj, b, lhs.computed), // tmp.b or tmp[b()]
                c,
                node.operator, // tmp.b = tmp2
              ),
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (node.left.computed && isComplexNode(b)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rold('Assignment to computed property must have simple property node');
            example('a[b()] = c()', '(tmp = a, tmp2 = b(), tmp[tmp2] = c())');
            before(node);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignComMemLhsObj', true);
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpAssignComMemLhsProp', true);
            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(tmpNameObj, a), // tmp = a()
              AST.assignmentExpression(tmpNameProp, b), // tmp2 = b()
              AST.assignmentExpression(
                AST.memberExpression(tmpNameObj, tmpNameProp, lhs.computed), // tmp[tmp2]
                c,
                node.operator, // tmp[b] = c()
              ),
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (node.operator !== '=') {
            // The compound assignment is not assignable so no need to return an assignment or assignable
            // The a and b ought to be simple at this point. It's not relevant whether or not it's computed.

            rold('Compound assignment to property must be regular assignment');
            example('a.b += c()', 'tmp = a.b, tmp.b = tmp + c()');
            before(node);

            const tmpNameLhs = createFreshVarInCurrentRootScope('tmpCompoundAssignLhs', true);
            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(tmpNameLhs, AST.memberExpression(a, b, lhs.computed)), // tmp = a.b or tmp = a[b]
              AST.assignmentExpression(
                AST.memberExpression(a, b, lhs.computed),
                AST.binaryExpression(node.operator.slice(0, -1), tmpNameLhs, c),
              ), // tmp.b = tmp2 or tmp[b] = tmp2
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (lhs.computed && (isComplexNode(a, node.operator === '=') || isComplexNode(b) || isComplexNode(c))) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rold('Assignment to computed property must have simple object, property expression, and rhs');
            example('a()[b()] = c()', '(tmp = a(), tmp2 = b(), tmp3 = c(), tmp)[tmp2] = tmp3');
            before(node);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignComputedObj', true);
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpAssignComputedProp', true);
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpAssignComputedRhs', true);
            const newNode = AST.assignmentExpression(
              AST.memberExpression(
                AST.sequenceExpression(
                  AST.assignmentExpression(tmpNameObj, a), // tmp = a()
                  AST.assignmentExpression(tmpNameProp, b), // tmp = b()
                  AST.assignmentExpression(tmpNameRhs, c), // tmp = c()
                  AST.identifier(tmpNameObj),
                ),
                tmpNameProp,
                lhs.computed,
              ),
              tmpNameRhs,
              node.operator, // tmp[tmp2] = tmp3
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (!lhs.computed && (isComplexNode(a, node.operator === '=') || isComplexNode(c))) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rold('Assignment to member expression must have simple lhs and rhs');
            example('a().b = c()', '(tmp = a(), tmp2 = c(), tmp).b = tmp2');
            before(node);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignMemLhsObj', true);
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpAssignMemRhs', true);
            const newNode = AST.assignmentExpression(
              AST.memberExpression(
                AST.sequenceExpression(
                  AST.assignmentExpression(tmpNameObj, a), // tmp = a()
                  AST.assignmentExpression(tmpNameRhs, c), // tmp2 = c()
                  AST.identifier(tmpNameObj), // tmp
                ),
                b, // tmp.b
              ),
              tmpNameRhs,
              node.operator, // tmp.b = tmp2
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }
        }

        if (node.right.type === 'AssignmentExpression') {
          ASSERT(
            node.left.type === 'Identifier',
            'since we can only assign to ident or member and we already checked member with complex rhs, this must be ident now',
          );

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

          const a = node.left;
          const lhs = node.right.left;

          if (lhs.type === 'Identifier') {
            // a = b = c
            const b = lhs;
            const c = node.right.right;

            if (isComplexNode(c)) {
              // In this case, b is only set, so we don't need to cache even if c() would change it
              rold('The rhs.rhs of a nested assignment must be simple');
              example('a = b = c()', 'tmp = c(), a = b = tmp', () => node.right.operator === '=');
              example('a = b += c()', 'tmp = c(), a = b += tmp', () => node.right.operator !== '=');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedComplexRhs', true);
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpName, c),
                AST.assignmentExpression(a, AST.assignmentExpression(b, tmpName, node.right.operator), node.operator),
              );

              crumbSet(1, newNode);
              after(newNode);
              changed = true;

              _expr(newNode);
              break;
            }

            if (node.right.operator !== '=') {
              // This is a = b *= c with all idents
              rold('Nested compound assignment with all idents must be split');
              example('a = b *= c', 'tmp = b * c, b = tmp, c = tmp');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedCompoundComplexRhs', true);
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpName, AST.binaryExpression(node.right.operator.slice(0, -1), b, c)),
                AST.assignmentExpression(b, tmpName),
                AST.assignmentExpression(a, tmpName, node.operator),
              );

              crumbSet(1, newNode);
              after(newNode);
              changed = true;

              _expr(newNode);
              break;
            }

            // This is a = b = c with all idents
            rold('Nested assignment with all idents must be split');
            example('a = b = c', 'b = c, a = c');
            before(node);

            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(b, c, node.right.operator),
              AST.assignmentExpression(a, c, node.operator),
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (lhs.type === 'MemberExpression') {
            // a = b.c = d
            // `$(1)[$(2)] = $(3)` is evaluated in 1, 2, 3 order
            const b = lhs.object;
            const c = lhs.property;
            const d = node.right.right;

            if (isComplexNode(b)) {
              // Even if c is computed, b would be evaluated before c so we don't need to preserve its before-value.
              rold('The object of a nested property assignment must be a simple node');
              example('a = b().c = d', 'tmp = b(), a = tmp.c = d()', () => !lhs.computed);
              example('a = b()[c] = d', 'tmp = b(), a = tmp[c()] = d()', () => lhs.computed);
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedAssignObj', true);
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpName, b),
                AST.assignmentExpression(
                  a,
                  AST.assignmentExpression(AST.memberExpression(tmpName, c, lhs.computed), d, node.right.operator),
                  node.operator,
                ),
              );

              crumbSet(1, newNode);
              after(newNode);
              changed = true;

              _expr(newNode);
              break;
            }

            if (lhs.computed && isComplexNode(c)) {
              // In this case we only need to store b in a var first, since the execution of c may change it after the fact
              // (so we must store the value before evaluating c) but we don't have to care if calling b or c changes the
              // value of d since that would always be evaluated last.
              rold('The property of a nested assignment to a computed property must be a simple node');
              example('a = b[c()] = d()', 'tmp = b, tmp2 = c(), a = tmp[tmp2] = d', () => !b.computed);
              before(node);

              const tmpNameObj = createFreshVarInCurrentRootScope('tmpNestedAssignComMemberObj', true);
              const tmpNameProp = createFreshVarInCurrentRootScope('tmpNestedAssignComMemberProp', true);

              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpNameObj, b),
                AST.assignmentExpression(tmpNameProp, c),
                AST.assignmentExpression(
                  a,
                  AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), d, node.right.operator),
                  node.operator,
                ),
              );

              crumbSet(1, newNode);
              after(newNode);
              changed = true;

              _expr(newNode);
              break;
            }

            // We must be left with `a = b.c = d()` or `a = b[c] = d()`, which must all be simple nodes except d
            // and which may be a compound assignment. We need to check that first to preserve get/set order.

            if (node.right.operator !== '=') {
              rold('Nested compound prop assignment with all idents must be split');
              example('a = b.x *= c', 'tmp = b.x * c, b = tmp, c = tmp');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedPropCompoundComplexRhs', true);
              const newNode = AST.sequenceExpression(
                AST.assignmentExpression(tmpName, AST.binaryExpression(node.right.operator.slice(0, -1), lhs, d)),
                AST.assignmentExpression(lhs, tmpName),
                AST.assignmentExpression(a, tmpName, node.operator),
              );

              crumbSet(1, newNode);
              after(newNode);
              changed = true;

              _expr(newNode);
              break;
            }

            if (isComplexNode(d)) {
              if (lhs.computed) {
                // We must store all values, a, b, and c, because evaluating d() may change the values of a, b, and/or c
                // which would lead to a different semantics without storing their before-value.
                rold('The rhs of a nested assignment to a computed property must be simple');
                example('a = b()[c()] = d()', 'tmp = b(), tmp2 = c(), tmp3 = d(), tmp[tmp2] = tmp3, a = tmp3');
                before(node);

                const tmpNameObj = createFreshVarInCurrentRootScope('tmpNestedAssignCompMemberObj', true);
                const tmpNameProp = createFreshVarInCurrentRootScope('tmpNestedAssignCompMemberProp', true);
                const tmpNameRhs = createFreshVarInCurrentRootScope('tmpNestedAssignCompMemberRhs', true);

                const newNode = AST.sequenceExpression(
                  AST.assignmentExpression(tmpNameObj, b),
                  AST.assignmentExpression(tmpNameProp, c),
                  AST.assignmentExpression(tmpNameRhs, d),
                  AST.assignmentExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), tmpNameRhs, node.right.operator),
                  AST.assignmentExpression(a, tmpNameRhs, node.operator),
                );

                crumbSet(1, newNode);
                after(newNode);
                changed = true;

                _expr(newNode);
              } else {
                // We must store b because evaluating d() may change the value of b (through a closure)
                // which would lead to a different semantics without storing their before-value.
                rold('The rhs of a nested assignment to a regular property must be simple');
                example('a = b.c = d()', 'tmp = b, tmp2 = d(), tmp.c = tmp2, a = tmp2');
                before(node);

                const tmpNameObj = createFreshVarInCurrentRootScope('tmpNestedAssignMemberObj', true);
                const tmpNameRhs = createFreshVarInCurrentRootScope('tmpNestedAssignMemberRhs', true);

                const newNode = AST.sequenceExpression(
                  AST.assignmentExpression(tmpNameObj, b),
                  AST.assignmentExpression(tmpNameRhs, d),
                  AST.assignmentExpression(AST.memberExpression(tmpNameObj, c), tmpNameRhs, node.right.operator),
                  AST.assignmentExpression(a, tmpNameRhs, node.operator),
                );

                crumbSet(1, newNode);
                after(newNode);
                changed = true;

                _expr(newNode);
              }

              break;
            }

            ASSERT(!isComplexNode(b));
            ASSERT(!lhs.computed || !isComplexNode(c));
            ASSERT(!isComplexNode(d));
            rold('Nested assignment to property where all nodes are simple must be split up');
            example('a = b.c = d', 'tmp = d, b.c = tmp, a = tmp'); // TODO: are we happier/better off with one or two uses of `tmp`?
            before(node);

            const tmpName = createFreshVarInCurrentRootScope('tmpNestedPropAssignRhs', true);

            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(tmpName, d),
              AST.assignmentExpression(lhs, tmpName, node.right.operator),
              AST.assignmentExpression(a, tmpName, node.operator),
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          if (lhs.type === 'ArrayPattern') {
            log('Array pattern, needs another pass');

            expr(node, 'left', -1, a); // TODO: do we visit left?
            expr(node, 'right', -1, node.right);

            changed = true;
            break;
          }

          if (lhs.type === 'ObjectPattern') {
            log('Object pattern, needs another pass');

            expr(node, 'left', -1, a); // TODO: do we visit left?
            expr(node, 'right', -1, node.right);

            changed = true;
            break;
          }

          ASSERT(false, 'wait wat?');
        }

        if (node.right.type === 'SequenceExpression') {
          rold('Assignment rhs must not be sequence');
          log('- `a = (b, c)` --> `(b, a = c)`');
          before(node);

          const seq = node.right;
          const exprs = seq.expressions.slice(0); // Last one will replace the sequence
          const newNode = AST.sequenceExpression(...exprs.slice(0, -1), AST.assignmentExpression(node.left, exprs.pop(), node.operator));

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        if (node.right.type === 'MemberExpression' && node.right.object.type === 'SequenceExpression') {
          rold('Assignment rhs must not be property on a sequence ');
          log('- `a = (b, c).x` --> `(b, a = c.x)`');
          before(node);

          const seq = node.right.object;
          const exprs = seq.expressions.slice(0); // Last one will replace the sequence
          const newNode = AST.sequenceExpression(
            ...exprs.slice(0, -1),
            AST.assignmentExpression(
              node.left,
              AST.memberExpression(exprs[exprs.length - 1], node.right.property, node.right.computed),
              node.operator,
            ),
          );

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        if (node.operator !== '=') {
          ASSERT(
            !isComplexNode(node.left) || (node.left.type === 'MemberExpression' && !isComplexNode(node.left.object)),
            'lhs should be ident or simple member expression',
            node.left,
          );

          rold('Compound assignments should be non-compound');
          log('- `a += b()` --> `a = a + b()`');
          log('- `a.b += b()` --> `a.b = a.b + b()`');
          before(node);

          const newNode = AST.assignmentExpression(
            node.left,
            AST.binaryExpression(node.operator.slice(0, -1), node.left, node.right), // += becomes +, >>>= becomes >>>, etc
          );

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        // At this point the lhs should be either an identifier or member expression with simple object and
        // the rhs should neither be an assignment nor a sequence expression. With assignment operator `=`.
        // TODO: should it visit the rhs before the lhs? should it special case the lhs here?
        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);

        break;
      }

      case 'ArrowFunctionExpression': {
        if (node.expression) {
          rold('Arrow body must be block');
          log('- `() => x` --> `() => { return x }`');

          before(node);
          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;
          changed = true;
          after(node);
        }

        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body, undefined, true);

        break;
      }

      case 'BinaryExpression': {
        log('Operator:', node.operator);

        // Start with right complex because if it is, it must also outline left regardless (`x = n + ++n`)
        if (isComplexNode(node.right)) {
          if (isImmutable(node.left)) {
            rold('Binary expression right must be simple');
            example('5 === b()', '(tmp = b(), 5 === tmp2)');
            before(node);

            // The lhs is an immutable value. No need to store it in a temporary variable for safety
            const tmpName = createFreshVarInCurrentRootScope('tmpBinaryRight', true);
            const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, node.right), node);
            node.right = AST.identifier(tmpName);
            crumbSet(1, newNode);

            after(newNode);
            changed = true;

            _expr(newNode);
          } else {
            rold('Binary expression right must be simple');
            example('a === b()', '(tmp = a = tmp2 = b(), tmp === tmp2)');
            before(node);

            const tmpNameLeft = createFreshVarInCurrentRootScope('tmpBinaryLeft', true);
            const tmpNameRight = createFreshVarInCurrentRootScope('tmpBinaryRight', true);
            const newNode = AST.sequenceExpression(
              AST.assignmentExpression(tmpNameLeft, node.left),
              AST.assignmentExpression(tmpNameRight, node.right),
              AST.binaryExpression(node.operator, tmpNameLeft, tmpNameRight),
            );
            crumbSet(1, newNode);

            after(newNode);
            changed = true;

            _expr(newNode);
          }
        } else if (isComplexNode(node.left)) {
          // Note: we dont need to force-move right because left already precedes it (unlike in the opposite case)
          rold('Binary expression left must be simple');
          log('- `a.b === c` --> `(tmp = a.b, tmp === c)`');
          log('- `a() === c` --> `(tmp = a(), tmp === c)`');
          log('- `(a, b).x === c` --> `(tmp = (a, b).x, tmp === c)`');
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpBinaryLeft', true);
          const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, node.left), node);
          node.left = AST.identifier(tmpName);
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        } else {
          expr(node, 'left', -1, node.left);
          expr(node, 'right', -1, node.right);
        }

        break;
      }

      case 'CallExpression': {
        // If call is statement
        // If call is var init
        // if call is rhs of assignment of expression statement

        if (!normalizeCallArgsChangedSomething(node, false)) {
          if (!normalizeCalleeChangedSomething(node, false)) {
            node.arguments.some((anode, i) => {
              if (anode.type === 'SpreadElement') {
                if (isComplexNode(anode.argument)) {
                  rold('Spread call arg must be simple nodes');
                  log('- `f(...a())` --> `(tmp = a(), f(...tmp))`');
                  before(anode);

                  const tmpName = createFreshVarInCurrentRootScope('tmpCallSpreadArg', true);
                  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, anode.argument), node);
                  anode.argument = AST.identifier(tmpName);
                  crumbSet(1, newNode);

                  after(newNode);
                  changed = true;

                  _expr(node);
                  return true;
                } else {
                  expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
                }
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
          rold('Test of conditional must be simple node or sequence');
          log('- `a() ? b : c` --> `(tmp = a, tmp) ? b : c`');
          before(node);
          node.test = sequenceNode(node.test, 'tmpTernaryTest');
          after(node);
          changed = true;
        }

        if (node.test.type === 'SequenceExpression' && !isComplexNode(node.test.expressions[node.test.expressions.length - 1])) {
          rold('Last expr of sequence as test of conditional must not be simple');
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
          rold('Consequent of conditional must be simple node or sequence');
          log('- `a ? b() : c` --> `a ? (tmp = b(), tmp) : c`');
          before(node);
          node.consequent = sequenceNode(node.consequent, 'tmpTernaryConsequent');
          after(node);
          changed = true;
        }

        if (isComplexNodeOrAlreadySequenced(node.alternate)) {
          // TBD whether this is worth it at all. The consequence/alternate can not be moved out
          //     easily anyways so is there any advantage to this?
          rold('Alternate of conditional must be simple node or sequence');
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
        log('Name:', node.id ? node.id.name : '<anon>');

        const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);

        stmt(node, 'body', -1, node.body, undefined, true);

        break;
      }

      case 'Identifier': {
        if (node.name !== 'arguments') {
          // TODO
          const meta = getMetaForBindingName(node);
          ASSERT(meta, 'expecting meta for', node);
          log('Recording a usage for `' + meta.originalName + '` -> `' + meta.uniqueName + '`');
          meta.usages.push(node);
        }
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
        log('Operator:', node.operator);

        if (node.operator === '??') {
          // TODO: do we care about the document.all exception? Make it optional?
          rold('Nullish coalescing should be normalized away');
          log('`a ?? b` --> `(tmp == null ? b : tmp)');
          log('`f() ?? b` --> `(tmp = f(), (tmp == null ? b : tmp))');
          before(node);

          // Make exception if node.left is already an identifier. (For now...) don't blindly duplicate the literal.
          const tmpName = node.left.type === 'Identifier' ? node.left.name : createFreshVarInCurrentRootScope('tmpNullish', true);
          const newNode = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.left),
            AST.conditionalExpression(AST.binaryExpression('==', tmpName, 'null'), node.right, tmpName),
          );

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
        } else {
          expr(node, 'left', -1, node.left);
          expr(node, 'right', -1, node.right);
        }
        break;
      }

      case 'MemberExpression': {
        // In all cases, this node can only be replaced by another member expression. The parent node may be
        // a call expression (`(a,b).c()`) or assignment (`a.b = c`) in which case the member expression must
        // be preserved for the sake of determining the context of the parent expression.

        // Normalize `a.b.c` to `(tmp = a.b, tmp.c)` for any a that is not an ident or primitive. Then visit them.
        // `$(1)[$(2)] = $(3)` is evaluated in 1, 2, 3 order

        if (node.object.type === 'SequenceExpression') {
          // (a, b).c
          // Note: may be `(a,b).c()` or `(a,b).c=d` so it's important to leave the property dangling (sets context)
          const seq = node.object;
          const exprs = seq.expressions;

          if (isComplexNode(exprs[exprs.length - 1])) {
            rold('Last expr the sequence on which a property is accessed must be a simple node');
            example('(a, b()).c', '(a, tmp = b(), tmp).c', () => !node.computed);
            example('(a, b())[c]', '(a, tmp = b(), tmp)[c]', () => node.computed);
            before(node);

            const tmpName = createFreshVarInCurrentRootScope('tmpMemberSeqAssign', true);
            const newNode = AST.memberExpression(
              AST.sequenceExpression(
                ...exprs.slice(0, -1),
                AST.assignmentExpression(tmpName, exprs[exprs.length - 1]),
                AST.identifier(tmpName),
              ),
              node.property,
              node.computed,
            );

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }

          // Else, it's a sequence that ends in a simple node. That's a base case for us.
        } else if (isComplexNode(node.object)) {
          rold('Object of member expression must be simple or simple sequence');
          example('a().b', '(tmp = a(), tmp).b', () => !node.computed);
          example('a()[b()]', '(tmp = a(), tmp)[b()]', () => node.computed);
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpMemberComplexObj', true);
          const newNode = AST.memberExpression(
            AST.sequenceExpression(AST.assignmentExpression(tmpName, node.object), AST.identifier(tmpName)),
            node.property,
            node.computed,
          );

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        if (node.computed && isComplexNode(node.property)) {
          rold('Expression of computed property must be simple');
          example('a[b()]', '(tmp = a, tmp2 = b(), tmp)[tmp]');
          before(node);

          const tmpNameObj = createFreshVarInCurrentRootScope('tmpComputedObj', true);
          const tmpNameProp = createFreshVarInCurrentRootScope('tmpComputedProp', true);
          const newNode = AST.memberExpression(
            AST.sequenceExpression(
              AST.assignmentExpression(tmpNameObj, node.object),
              AST.assignmentExpression(tmpNameProp, node.property),
              AST.identifier(tmpNameObj),
            ),
            tmpNameProp,
            true,
          );

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        if (node.computed && node.property.type === 'Literal' && typeof node.property.value === 'string') {
          // If the key name is a legit key then why not. Let's just test it.
          let simpleIdent;
          try {
            // TODO: find a clean way to test any unicode identifier without opening up to eval attacks here
            simpleIdent = !!(/^[\w_$]+$/.test(node.property.value) && Function('foo.' + node.property.value) && true);
          } catch {
            simpleIdent = false;
          }
          if (simpleIdent) {
            rold('Computed property that is valid ident must be member expression');
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
                if (isComplexNode(anode.argument)) {
                  rold('Spread call arg must be simple nodes');
                  log('- `f(...a())` --> `(tmp = a(), f(...tmp))`');
                  before(anode);

                  const tmpName = createFreshVarInCurrentRootScope('tmpCallSpreadArg', true);
                  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, anode.argument), node);
                  anode.argument = AST.identifier(tmpName);
                  crumbSet(1, newNode);

                  after(newNode);
                  changed = true;

                  _expr(node);
                  return true;
                } else {
                  expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
                }
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
        node.properties.some((pnode, i) => {
          if (pnode.type === 'SpreadElement') {
            if (isComplexNode(pnode.argument)) {
              rold('Spread args in obj must be simple nodes');
              log('- `${...a()}` --> `(tmp = a(), {...tmp})`');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpObjSpreadArg', true);
              const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.argument), node);
              pnode.argument = AST.identifier(tmpName);
              crumbSet(1, newNode);

              after(newNode);
              changed = true;

              _expr(newNode);
              return true;
            } else {
              expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
            }
          } else {
            if (pnode.shorthand) {
              // I think it _is_ this simple?
              rold('Property shorthands not allowed');
              log('- `var obj = {a}` --> `var obj = {a: a}`');
              before(node);
              pnode.shorthand = false;
              after(node);
              changed = true;
            }

            if (pnode.computed) {
              // Visit the key before the value

              // TODO: if key is valid ident string, replace with identifier

              if (isComplexNode(pnode.key)) {
                rold('Computed key node must be simple');
                log('- `obj = {[$()]: y}` --> obj = (tmp = $(), {[tmp]: y})');
                before(node);

                const tmpName = createFreshVarInCurrentRootScope('tmpComputedKey', true);
                const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.key), node);
                pnode.key = AST.identifier(tmpName);
                crumbSet(1, newNode);

                after(newNode);
                changed = true;

                node = newNode;
                _expr(newNode);
                return true;
              } else {
                expr2(node, 'properties', i, pnode, 'key', -1, pnode.key);
              }
            }

            if (!pnode.method && pnode.kind === 'init' && isComplexNode(pnode.value)) {
              rold('Object literal property value node must be simple');
              log('- `obj = {x: y()}` --> obj = (tmp = y(), {x: tmp})');
              before(node);

              const tmpName = createFreshVarInCurrentRootScope('tmpObjPropValue', true);
              const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.value), node);
              pnode.value = AST.identifier(tmpName);
              crumbSet(1, newNode);

              after(newNode);
              changed = true;

              node = newNode;
              _expr(newNode);
              return true;
            } else {
              expr2(node, 'properties', i, pnode, 'value', -1, pnode.value);
            }
          }
        });

        break;
      }

      case 'OptionalMemberExpression': {
        // For now let's normalize this down to es5 code because I'm not sure keeping it as-is will
        // do me any good and it's one (two) more edge cases to consider otherwise.

        if (node.object.type === 'Identifier') {
          rold('Optional member expressions should be normalized away');
          log('`a?.b` --> `(a == undefined ? undefined : a.b)');
          log('`a?.[b]` --> `(a == undefined ? undefined : a[b])');
          before(node);

          // Note: in `a?.b`, if `a` is null OR undefined, then return undefined, otherwise return a.b
          const newNode = AST.conditionalExpression(
            AST.binaryExpression('==', node.object.name, 'null'), // Weak comparison! This compares vs undefined AND null
            'undefined',
            AST.memberExpression(node.object.name, node.property, node.computed),
          );
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        } else {
          rold('Optional member expressions should be normalized away');
          log('`f()?.b` --> `(tmp = f(), (a == undefined ? undefined : a.b))');
          log('`f()?.[b]` --> `(tmp = f(), (a == undefined ? undefined : a[b]))');
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpOptionalChaining', true);

          // Note: in `a?.b`, if `a` is null OR undefined, then return undefined, otherwise return a.b
          const newNode = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.object),
            AST.conditionalExpression(
              AST.binaryExpression('==', tmpName, 'null'), // Weak comparison! This compares vs undefined AND null
              'undefined',
              AST.memberExpression(tmpName, node.property, node.computed),
            ),
          );
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        }

        break;
      }

      case 'OptionalCallExpression': {
        // For now let's normalize this down to es5 code because I'm not sure keeping it as-is will
        // do me any good and it's one (two) more edge cases to consider otherwise.

        if (node.callee.type === 'Identifier') {
          rold('Optional call expressions should be normalized away');
          log('`a?.()` --> `(a == undefined ? undefined : a())');
          before(node);

          // Note: in `a?.b`, if `a` is null OR undefined, then return undefined, otherwise return a.b
          const newNode = AST.conditionalExpression(
            AST.binaryExpression('==', node.callee.name, 'null'), // Weak comparison! This compares vs undefined AND null
            'undefined',
            AST.callExpression(node.callee.name, node.arguments),
          );

          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        } else {
          rold('Optional call expressions should be normalized away');
          log('`f()?.()` --> `(tmp = f(), (a == undefined ? undefined : a()))');
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpOptionalChaining', true);

          // Note: in `a?.b`, if `a` is null OR undefined, then return undefined, otherwise return a.b
          const newNode = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.callee),
            AST.conditionalExpression(
              AST.binaryExpression('==', tmpName, 'null'), // Weak comparison! This compares vs undefined AND null
              'undefined',
              AST.callExpression(tmpName, node.arguments),
            ),
          );

          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        }
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

      case 'TaggedTemplateExpression': {
        rold('Tagged templates should decompose into their runtime values');
        rold("`` f`foo` `` --> `f(['foo'])`");
        rold("`` f`a${1}b${2}c${3}d` `` --> `f(['a', 'b', 'c', 'd'], 1, 2, 3)`");
        before(node);

        const newNode = AST.callExpression(node.tag, [
          AST.arrayExpression(node.quasi.quasis.map((templateElement) => AST.literal(templateElement.value.raw))),
          ...node.quasi.expressions,
        ]);
        crumbSet(1, newNode);

        after(newNode);
        changed = true;

        _expr(newNode);
        break;
      }

      case 'TemplateLiteral': {
        if (node.expressions.length === 0) {
          ASSERT(node.quasis.length === 1, 'zero expressions means exaclty one "string" part');
          ASSERT(node.quasis[0].value && typeof node.quasis[0].value.raw === 'string', 'expecting this AST struct', node);

          rold('Templates without expressions must be strings');
          rold("`` `foo` `` --> `'foo'`");
          before(node);

          const newNode = AST.literal(node.quasis[0].value.raw);
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        const group = [];

        node.expressions.forEach((enode, i) => {
          if (isComplexNode(enode)) {
            rold('Expressions inside a template must be simple nodes');
            example('`a${f()}b`', '(tmp = f(), `a${f()}b`)');

            const tmpName = createFreshVarInCurrentRootScope('tmpTemplateExpr', true);

            group.push(AST.assignmentExpression(tmpName, enode));
            node.expressions[i] = AST.identifier(tmpName);
          } else {
            expr(node, 'expressions', i, enode);
          }
        });

        if (group.length) {
          before(node);

          const newNode = AST.sequenceExpression(...group, node);

          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }

        break;
      }

      case 'ThisExpression': {
        break;
      }

      case 'UnaryExpression': {
        if (node.operator === 'delete') {
          // This one is tricky because the result can not be "just an identifier". Unfortunately, it can be pretty
          // much anything else, including a sequence (`delete (a,b)`). So worst case we can target that.
          // Ultimately I think we should consider if the current target is a member expression. If so we keep that
          // and normalize the object/property when necessary. For anything else, ehh, `delete true.x`?
          // We should make sure runtime errors persist.

          const arg = node.argument;

          if (arg.type === 'MemberExpression') {
            if (arg.computed) {
              if (isComplexNode(arg.object) || isComplexNode(arg.property)) {
                rold('Argument of delete must be simple computed member expression with simple property');
                example('delete f()[g()]', 'tmp = f(), tmp2 = g(), delete tmp[tmp2]', () => arg.computed);
                before(node);

                const tmpNameObj = createFreshVarInCurrentRootScope('tmpDeleteCompObj', true);
                const tmpNameProp = createFreshVarInCurrentRootScope('tmpDeleteCompProp', true);
                const newNode = AST.sequenceExpression(
                  AST.assignmentExpression(tmpNameObj, arg.object),
                  AST.assignmentExpression(tmpNameProp, arg.property),
                  AST.unaryExpression('delete', AST.memberExpression(tmpNameObj, tmpNameProp, true)),
                );

                crumbSet(1, newNode);
                after(newNode);
                changed = true;

                _expr(newNode);
                break;
              }
            } else {
              if (isComplexNode(arg.object)) {
                rold('Argument of delete must be simple member expression');
                example('delete f().x', 'tmp = f(), delete tmp.x', () => !arg.computed);
                before(node);

                const tmpName = createFreshVarInCurrentRootScope('tmpDeleteObj', true);
                const newNode = AST.sequenceExpression(
                  AST.assignmentExpression(tmpName, arg.object),
                  AST.unaryExpression('delete', AST.memberExpression(tmpName, arg.property)),
                );

                crumbSet(1, newNode);
                after(newNode);
                changed = true;

                _expr(newNode);
                break;
              }
            }

            // Regular visit arg then return
            expr(node, 'argument', -1, node.argument);
            break;
          } else {
            // You cannot delete a plain identifier and there's no point in deleting anything else
            // Replace this expression with a temporary variable and a bogus group.
            // Since `delete` returns whether or not the property exists after the operation, the result must be `true`
            rold('Delete argument can not be complex');
            example('delete f()', 'f(), true');
            before(node);

            const newNode = AST.sequenceExpression(node.argument, AST.identifier('true'));

            crumbSet(1, newNode);
            after(newNode);
            changed = true;

            _expr(newNode);
            break;
          }
        }

        if (node.argument.type === 'SequenceExpression') {
          rold('Unary argument cannot be sequence');
          log('- `!(a, b)` --> `(a, !b)`');
          log('- `-(1 + 2, 3 + 4)` --> `(1 + 2, -(3 + 4))`');
          before(node);

          const exprs = node.argument.expressions;
          const newNode = AST.sequenceExpression(...exprs.slice(0, -1), AST.unaryExpression(node.operator, exprs[exprs.length - 1]));

          crumbSet(1, newNode);
          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }
        if (node.operator === 'void') {
          rold('Void must be replaced by a sequence');
          log('- `void x` --> `(x, undefined)`');
          before(node);

          const newNode = AST.sequenceExpression(node.argument, AST.identifier('undefined'));
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }
        if (isComplexNode(node.argument)) {
          rold('Unary argument cannot be complex');
          log('- `!f()` --> `(tmp = f(), !tmp)`');
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpUnaryArg', true);
          const newNode = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.argument),
            AST.unaryExpression(node.operator, tmpName),
          );
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
          break;
        }
        expr(node, 'argument', -1, node.argument);

        break;
      }

      case 'UpdateExpression': {
        if (node.prefix) {
          rold('Update expression prefix should be regular assignment');
          example('++x', 'x = x + 1', () => node.operator === '++');
          example('--x', 'x = x - 1', () => node.operator !== '++');
          before(node);

          const newNode = AST.assignmentExpression(
            node.argument,
            AST.binaryExpression(node.operator === '++' ? '+' : '-', node.argument, AST.literal(1)),
          );
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        } else {
          // We kind of have to create a tmp var since the addition/subtraction may be irreversible (NaN/Infinity cases)
          rold('Update expression postfix should be regular assignment');
          example('x++', 'tmp = x, x = x + 1, tmp', () => node.operator === '++');
          example('x--', 'tmp = x, x = x - 1, tmp', () => node.operator !== '++');
          before(node);

          const tmpName = createFreshVarInCurrentRootScope('tmpPostfixArg', true);
          const newNode = AST.sequenceExpression(
            AST.assignmentExpression(tmpName, node.argument),
            AST.assignmentExpression(
              node.argument,
              AST.binaryExpression(node.operator === '++' ? '+' : '-', node.argument, AST.literal(1)),
            ),
            AST.identifier(tmpName),
          );
          crumbSet(1, newNode);

          after(newNode);
          changed = true;

          _expr(newNode);
        }
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
        const paramNameBeforeDefault = createFreshVarInCurrentRootScope('objPatternBeforeDefault');
        log('  - Regular prop `' + propNode.key.name + '` with default');
        log('  - Stored into `' + paramNameBeforeDefault + '`');

        // If this is a leaf then use the actual name, otherwise use a placeholder
        const paramNameAfterDefault =
          valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('objPatternAfterDefault');
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
        const paramNameWithoutDefault =
          valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('objPatternNoDefault');
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
      const paramNameBeforeDefault = createFreshVarInCurrentRootScope('objPatternCrashTest'); // Unused. Should eliminate easily.
      const lastThing = cacheNameStack[cacheNameStack.length - 1];
      newBindings.push([
        paramNameBeforeDefault,
        FRESH,
        AST.logicalExpression(
          '&&',
          AST.logicalExpression('||', AST.binaryExpression('===', lastThing, 'undefined'), AST.binaryExpression('===', lastThing, 'null')),
          AST.memberExpression(lastThing, 'cannotDestructureThis'),
        ),
      ]);
    }

    groupEnd();
  }

  function funcArgsWalkArrayPattern(node, cacheNameStack, newBindings, kind) {
    // kind = param, var, assign
    group('- walkArrayPattern', kind);

    const arrSplatName = node.type === 'Identifier' ? node.name : createFreshVarInCurrentRootScope('arrPatternSplat');
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

        const bindingName = valueNode.type === 'Identifier' ? valueNode.name : createFreshVarInCurrentRootScope('arrPatternStep');
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

  function processFuncArgs(funcNode) {
    group(DIM + 'function(' + RESET + BLUE + 'parameters' + RESET + DIM + ')' + RESET);

    let minParamRequired = 0; // Ends up as the last non-rest param without default, +1
    let hasRest = false;
    let paramBindingNames = []; // Includes names inside pattern

    // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
    // Array<name, expr>
    // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
    const newBindings = [];

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

      // Node to represent the cache of the current property/element step
      const cacheNameStack = [];

      // Now there's basically two states: a param with a default or without a default. The params with a default
      // have an node that is basically "boxed" into an AssignmentPattern. Put the right value on the stack and
      // continue to process the left value. Otherwise, put null on the stack and process the node itself.
      // See https://gist.github.com/pvdz/dc2c0a477cc276d1b9e6e2ddbb417135 for a brute force set of test cases
      // See https://gist.github.com/pvdz/867502f6ed2dd902d061c82e38a81181 for the hack to regenerate them
      if (pnode.type === 'AssignmentPattern') {
        rold('Func params must not have inits/defaults');
        log('- `function f(x = y()) {}` --> `function f(tmp) { x = tmp === undefined ? y() : tmp; }');
        before({ ...funcNode, body: AST.blockStatement(AST.expressionStatement(AST.literal('<suppressed>'))) });

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
            OLD,
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
            FRESH,
            // `param === undefined ? init : param`
            AST.conditionalExpression(AST.binaryExpression('===', newParamName, 'undefined'), pnode.right, newParamName),
          ]);

          // Then walk the whole pattern.
          // - At every step of the pattern create code that stores the value of that step in a tmp variable.
          // - Store the tmp var in a stack (pop it when walking out)
          // - A leaf node should be able to access the property from the binding name at the top of the stack

          if (pnode.left.type === 'ObjectPattern') {
            rold('Func params must not be object patterns');
            log('- `function({x}) {}` --> `function(tmp) { var x = tmp.x; }`');

            funcArgsWalkObjectPattern(pnode.left, cacheNameStack, newBindings, 'param');
          } else if (pnode.left.type === 'ArrayPattern') {
            rold('Func params must not be array patterns');
            log('- `function([x]) {}` --> `function(tmp) { var tmp1 = [...tmp], x = tmp1[0]; }`');

            funcArgsWalkArrayPattern(pnode.left, cacheNameStack, newBindings, 'param');
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
        } else {
          ASSERT(false, 'wat else?', pnode);
        }
      }
    });

    if (newBindings.length) {
      log('Params were transformed somehow, injecting new nodes into body');
      funcNode.body.body.unshift(
        AST.variableDeclarationFromDeclaration(newBindings.map(([name, _fresh, init]) => AST.variableDeclarator(name, init))),
      );
      changed = true;
    }

    groupEnd();

    return { minParamRequired, hasRest, paramBindingNames };
  }

  function anyBlock(block, forFunction) {
    const body = block.body;

    ensureVarDeclsCreateOneBinding(body);
    hoisting(body);
    statementifyExpressions(block);

    for (let i = 0; i < body.length; ++i) {
      const cnode = body[i];

      if (jumpTable(cnode, body, i)) {
        changed = true;
        --i;
        continue;
      }

      stmt(block, 'body', i, cnode, false, false);
    }
  }
  function jumpTable(node, body, i) {
    switch (node.type) {
      case 'DoWhileStatement':
        return transformDoWhileStatement(node, body, i);
      case 'EmptyStatement': {
        rule('Drop empty statements inside a block');
        example('{;}', '{}');
        body.splice(i, 1);
        return true;
      }
      case 'ExpressionStatement':
        return false; // TODO
      case 'ForStatement':
        return transformForStatement(node, body, i);
      case 'ForInStatement':
        return transformForxStatement(node, body, i, true);
      case 'ForOfStatement':
        return transformForxStatement(node, body, i, false);
      case 'IfStatement':
        return transformIfStatement(node, body, i);
      case 'ReturnStatement':
        return transformReturnStatement(node, body, i);
      case 'SwitchStatement':
        return transformSwitchStatement(node, body, i);
      case 'ThrowStatement':
        return transformThrowStatement(node, body, i);
    }

    return false;
  }

  function transformDoWhileStatement(node, body, i) {
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
      return true;
    }

    if (node.body.body.length === 0) {
      // Note: cannot eliminate a loop because the test expression is expected to be called repeatedly
      rule('Do-while cannot have empty body');
      example('do {} while (x);', 'while(x);');
      before(node);

      const newNode = AST.whileStatement(node.test, AST.blockStatement());
      body[i] = newNode;

      after(newNode);
      return true;
    }

    if (isComplexNode(node.test)) {
      rule('Do-while test node must be simple');
      example('do { f(); } while (x+y);', 'var tmp; do { f(); tmp = x+y; } while (tmp);`');
      before(node);

      const tmpName = createFreshVarInCurrentRootScope('tmpDoWhileTest', true);

      const newNode = AST.expressionStatement(AST.assignmentExpression(tmpName, node.test));
      node.body.body.push(newNode);
      node.test = AST.identifier(tmpName); // We could do `tmpName === true` if that makes a difference. For now, it won't

      after(node);
      return true;
    }

    return false;
  }
  function transformForStatement(node, body, i) {
    rule('Regular `for` loops must be `while`');
    example('for (a(); b(); c()) d();', '{ a(); while (b()) { d(); c(); } }');
    before(node);

    const newNode = AST.blockStatement(
      node.init ? (node.init.type === 'VariableDeclaration' ? node.init : AST.expressionStatement(node.init)) : AST.emptyStatement(),
      AST.whileStatement(
        node.test || 'true',
        AST.blockStatement(node.body, node.update ? AST.expressionStatement(node.update) : AST.emptyStatement()),
      ),
    );
    body[i] = newNode;

    after(newNode);

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

        const tmpNameRhs = createFreshVarInCurrentRootScope(forin ? 'tmpForInDeclRhs' : 'tmpForOfDeclRhs');
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

      const tmpNameRhs = createFreshVarInCurrentRootScope(forin ? 'tmpForInPatDeclRhs' : 'tmpForOfPatDeclRhs');
      const tmpNameLhs = createFreshVarInCurrentRootScope(forin ? 'tmpForInPatDeclLhs' : 'tmpForOfPatDeclLhs');
      const boundNames = findBoundNamesInPattern(node.left);
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

      const tmpName = createFreshVarInCurrentRootScope(forin ? 'tmpForInRhs' : 'tmpForOfRhs');
      const newNode = AST.variableDeclaration(tmpName, node.right, 'const');
      body.splice(i, 0, newNode);
      node.right = AST.identifier(tmpName);

      body[i] = newNode;

      after(newNode);
      after(node);
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

      const tmpName = createFreshVarInCurrentRootScope(forin ? 'tmpForInLhsNode' : 'tmpForOfLhsNode');
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
      return true;
    }

    if (node.body.type !== 'BlockStatement') {
      rule('For-in sub-statement must be block');
      example('for (x in y) z', 'for (x in y) { z }');
      before(node);

      node.body = AST.blockStatement(node.body);

      return true;
    }

    return false;
  }
  function transformIfStatement(node, body, i) {
    if (node.test.type === 'UnaryExpression' && node.test.operator === '!') {
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
      return true;
    }

    if (node.alternate && node.alternate.type !== 'BlockStatement') {
      rule('Else sub-statement must be block');
      example('if (x) {} else y;', 'if (x) {} else { y; }');
      before(node);

      node.alternate = AST.blockStatement(node.alternate);

      after(node);

      return true;
    }

    if (node.alternate?.body.length === 0) {
      rule('Body of else may not be empty');
      example('if (x) { y; } else {}', 'if (x) { y; }');
      before(node);

      node.alternate = null;

      after(node);

      return true;
    }

    if (node.consequent.type !== 'BlockStatement') {
      rule('If sub-statement must be block');
      example('if (x) y', 'if (x) { y }');
      before(node);

      node.consequent = AST.blockStatement(node.consequent);

      after(node);

      return true;
    }

    if (!node.alternate && node.consequent.body.length === 0) {
      rule('Body of if without else may not be empty');
      example('if (x()) {}', 'x();');
      before(node);

      const newNode = AST.expressionStatement(node.test);
      body[i] = newNode;

      after(newNode);

      return true;
    }

    if (isComplexNode(node.test)) {
      rule('If test must be simple node');
      example('if (f());', 'const tmp = f(); if (tmp);');
      before(node);

      const tmpName = createFreshVarInCurrentRootScope('tmpIfTest');
      const newNode = AST.variableDeclaration(tmpName, node.test, 'const');
      body.splice(i, 0, newNode);
      node.test = AST.identifier(tmpName);

      after(newNode);
      after(node);

      return true;
    }

    return false;
  }
  function transformReturnStatement(node, body, i) {
    if (!node.argument) {
      rule('Return argument must exist');
      example('return;', 'return undefined;');
      before(node);

      node.argument = AST.identifier('undefined');

      after(node);

      return true;
    }

    if (isComplexNode(node.argument)) {
      rold('Return argument must be simple');
      example('return $()', 'let tmp = $(); return tmp;');
      before(node);

      // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
      const tmpName = createFreshVarInCurrentRootScope('tmpReturnArg');
      const newNode = AST.variableDeclaration(tmpName, node.argument);
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      return true;
    }

    return false;
  }
  function transformSwitchStatement(node, body, i) {
    if (isComplexNode(node.discriminant)) {
      rule('Switch condition should be simple node');
      example('switch (f()) {}', '{ let tmp = f(); switch (tmp) {} }');
      before(node);

      const tmpName = createFreshVarInCurrentRootScope('tmpSwitchTest');
      const newNode = AST.variableDeclaration(tmpName, node.discriminant, 'const');
      body.splice(i, 0, newNode);
      node.discriminant = AST.identifier(tmpName);

      after(newNode);
      after(node);
      return true;
    }

    // Variables declared on the toplevel of a switch case have to be hoisted to before the switch case, and const
    // converted to let, to ensure that all cases still have access to that binding after the transformations
    const vars = [];
    const lets = [];
    let hasDefaultAt = -1;
    node.cases.forEach((cnode, i) => {
      if (!cnode.test) hasDefaultAt = i;
      cnode.consequent.forEach((snode, i) => {
        if (snode.type === 'VariableDeclaration') {
          const names = findBoundNamesInPattern(snode);
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
      });
    });

    if (vars.length || lets.length) {
      rule('Switch case toplevel declaration should be outlined; [2/2] adding var decls before the switch');
      example('switch (x) { case y: let a = 10, b = 20; }', '{ let a; let b; switch (x) { case y: a = 10, b = 10; } }');

      const newNode = AST.blockStatement(
        ...vars.map((name) => AST.variableDeclaration(name, undefined, 'var')),
        ...lets.map((name) => AST.variableDeclaration(name)),
        node,
      );
      body[i] = newNode;

      after(newNode); // omit this one?
      return true;
    }

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

      const tmpVal = createFreshVarInCurrentRootScope('tmpSwitchValue');
      const tmpDef = createFreshVarInCurrentRootScope('tmpSwitchCheckCases');
      const tmpFall = createFreshVarInCurrentRootScope('tmpSwitchFallthrough');

      const newNode = AST.blockStatement(
        AST.variableDeclaration(tmpVal, node.discriminant),
        AST.variableDeclaration(tmpDef, 'true'),
        AST.variableDeclaration(tmpFall, 'false'),
        AST.doWhileStatement(
          AST.blockStatement(
            AST.ifStatement(
              tmpDef,
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
              // If all cases failed, then set fall=true so the default case gets visited after this branch
              AST.expressionStatement(AST.assignmentExpression(tmpFall, 'true')),
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
            AST.expressionStatement(AST.assignmentExpression(tmpDef, 'false')),
          ),
          // } while()
          AST.binaryExpression('===', tmpFall, 'false'),
        ),
      );

      body[i] = newNode;

      after(newNode);
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

    const tmpFall = createFreshVarInCurrentRootScope('tmpFallthrough');
    fdata.globallyUniqueLabelRegistery.set(tmpLabel, true); // Mark as being reserved
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
    return true;
  }
  function transformThrowStatement(node, body, i) {
    if (isComplexNode(node.argument)) {
      rold('Throw argument must be simple');
      example('throw $()', 'let tmp = $(); throw tmp;');
      before(node);

      const tmpName = createFreshVarInCurrentRootScope('tmpThrowArg');
      const newNode = AST.variableDeclaration(tmpName, node.argument);
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      return true;
    }

    return false;
  }
}
