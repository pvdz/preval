import { ASSERT, DIM, BOLD, RED, RESET, BLUE, PURPLE, YELLOW, dir, group, groupEnd, log, tmat, fmat } from './utils.mjs';
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
  - TODO: are func params made unique multiple times?
  - TODO: assignment expression, compound assignment to property, I think the c check _can_ safely be the first check. Would eliminate some redundant vars. But those should not be a problem atm.
  - TODO: sweep for AST modifications. Some nodes are used multiple times so changing a node inline is going to be a problem. Block might be an exception since we rely heavily on that.
  - TODO: does coercion have observable side effects (that we care to support)?
  - TODO: do we properly simplify array literals with complex spreads?   
  - TODO: can we safely normalize methods as regular properties? Or are there secret bindings to take into account? Especially wrt `super` bindings.
  - TODO: since exports must be unique, we should try to give exported bindings priority when creating unique globals
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

  const lexScopeStack = [];
  const superCallStack = []; // `super()` is validated by the parser so we don't have to worry about scoping rules

  const funcStack = [];

  // Crumb path for walking through the AST. This way you can reach out to parent nodes and manipulate them or whatever. Shoot your own foot.
  const crumbsNodes = [];
  const crumbsProps = [];
  const crumbsIndexes = [];

  let arrowExpressionInfiLoopGuard = 0;

  const ast = fdata.tenkoOutput.ast;

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

  log('After normalization:');
  log(
    '\ngloballyUniqueNamingRegistery (sans builtins):\n',
    fdata.globallyUniqueNamingRegistery.size === globals.size
      ? '<none>'
      : [...fdata.globallyUniqueNamingRegistery.keys()].filter((name) => !globals.has(name)).join(', '),
  );
  log(
    '\ngloballyUniqueLabelRegistery:\n',
    fdata.globallyUniqueLabelRegistery.size === 0 ? '<none>' : [...fdata.globallyUniqueLabelRegistery.keys()].join(', '),
  );
  log();

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
      const target = index >= 0 ? parent[prop][index] : parent[prop];
      ASSERT(target.type === 'LabeledStatement', 'should find the label now');
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

  function findBoundNamesInPattern(node, names = []) {
    ASSERT(node.type === 'VariableDeclaration');
    ASSERT(node.declarations.length === 1, 'var decls define one binding?', node);

    const decl = node.declarations[0];
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

  function isComplexNode(node) {
    ASSERT(isComplexNode.length === arguments.length, 'arg count');
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
      if (node.value === null) return true; // This will be a regex. They are objects, so they are references, which are observable.
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
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return false; // Template without expressions is a string

    return true;
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
          rule('One binding per variable declaration');
          example('var a, b', 'var a; var b;');
          example('var a = 1, b = 2', 'var a = 1; var b = 1;');
          before(e);

          const newNodes = [...e.declarations.map((dnode) => AST.variableDeclaration(dnode.id, dnode.init, e.kind))];
          body.splice(i, 1, ...newNodes);

          after(newNodes);
          changed = true;
          --i; // revisit (recursively)
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
    ASSERT(Array.isArray(body), 'the body is an array of statements/decls', body);

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
        log(' -', i, 'is not a relevant hoisting target;', snode.type, snode.type === 'VariableDeclaration' ? snode.kind : '');
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
          log('Recording label `' + node.label.name + '` as being used here');
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
          log('Recording label `' + node.label.name + '` as being used here');
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
        //log('Name:', node.id ? node.id.name : '<anon>');
        //
        //if (node.id) expr(node, 'id', -1, node.id);
        //
        //node.params.forEach((pnode) => {
        //  if (pnode.type === 'RestElement') {
        //    log('- Rest param, recording usage for `' + pnode.argument.name + '`');
        //    const uniqueName = findUniqueNameForBindingIdent(pnode.argument);
        //    const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
        //    meta.usages.push(pnode.argument);
        //    return;
        //  }
        //
        //  ASSERT(pnode.type === 'Identifier', 'args should be normalized', pnode);
        //
        //  log('- Ident param, recording usage for `' + pnode.name + '`');
        //  const meta = getMetaForBindingName(pnode);
        //  meta.usages.push(pnode);
        //});
        //
        //stmt(node, 'body', -1, node.body, undefined, true);

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
        //// TODO: this needs more thinking, more test cases. Especially around loops/continue
        //if (
        //  !['BlockStatement', 'WhileStatement', 'DoWhileStatement', 'ForStatement', 'ForInStatement', 'ForOfStatement'].includes(
        //    node.body.type,
        //  )
        //) {
        //  // TODO: can we get rid of the labeled continue such that we dont have to make this exception? Guess it won't be easy.
        //  rold('Label sub-statement must be block unless it is a loop');
        //  log('- `x: y` --> `x: { y }`');
        //  before(node);
        //
        //  node.body = AST.blockStatement(node.body);
        //
        //  changed = true;
        //  after(node);
        //}
        //

        // The transformer will immediately walk
        //stmt(node, 'body', -1, node.body);
        break;
      }

      case 'Program': {
        anyBlock(node);
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
        ASSERT(node.declarations.length === 1, 'should be normalized');
        const dnode = node.declarations[0];
        if (dnode.init) expr2(node, 'declarations', 0, dnode, 'init', -1, dnode.init);
        break;
      }

      case 'WhileStatement': {
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
        node.elements.forEach((elNode, i) => {
          if (elNode) {
            if (elNode.type === 'SpreadElement') {
              expr2(node, 'elements', i, elNode, 'argument', -1, elNode.argument);
            } else {
              expr(node, 'elements', i, elNode);
            }
          }
        });
        break;
      }

      case 'AssignmentExpression': {
        // At this point the lhs should be either an identifier or member expression with simple object and
        // the rhs should neither be an assignment nor a sequence expression. With assignment operator `=`.
        // TODO: should it visit the rhs before the lhs? should it special case the lhs here?
        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);

        break;
      }

      case 'ArrowFunctionExpression': {
        ASSERT(!node.expression, 'should be block by now');

        //node.params.forEach((pnode) => {
        //  if (pnode.type === 'RestElement') {
        //    log('- Rest param, recording usage for `' + pnode.argument.name + '`');
        //    const uniqueName = findUniqueNameForBindingIdent(pnode.argument);
        //    const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
        //    meta.usages.push(pnode.argument);
        //    return;
        //  }
        //
        //  ASSERT(pnode.type === 'Identifier', 'args should be normalized', pnode);
        //
        //  log('- Ident param, recording usage for `' + pnode.name + '`');
        //  const meta = getMetaForBindingName(pnode);
        //  meta.usages.push(pnode);
        //});
        //
        //stmt(node, 'body', -1, node.body, undefined, true);

        break;
      }

      case 'BinaryExpression': {
        log('Operator:', node.operator);
        //
        //// Start with right complex because if it is, it must also outline left regardless (`x = n + ++n`)
        //if (isComplexNode(node.right)) {
        //  if (isImmutable(node.left)) {
        //    rold('Binary expression right must be simple');
        //    example('5 === b()', '(tmp = b(), 5 === tmp2)');
        //    before(node);
        //
        //    // The lhs is an immutable value. No need to store it in a temporary variable for safety
        //    const tmpName = createFreshVarInCurrentRootScope('tmpBinaryRight', true);
        //    const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, node.right), node);
        //    node.right = AST.identifier(tmpName);
        //    crumbSet(1, newNode);
        //
        //    after(newNode);
        //    changed = true;
        //
        //    _expr(newNode);
        //  } else {
        //    rold('Binary expression right must be simple');
        //    example('a === b()', '(tmp = a = tmp2 = b(), tmp === tmp2)');
        //    before(node);
        //
        //    const tmpNameLeft = createFreshVarInCurrentRootScope('tmpBinaryLeft', true);
        //    const tmpNameRight = createFreshVarInCurrentRootScope('tmpBinaryRight', true);
        //    const newNode = AST.sequenceExpression(
        //      AST.assignmentExpression(tmpNameLeft, node.left),
        //      AST.assignmentExpression(tmpNameRight, node.right),
        //      AST.binaryExpression(node.operator, tmpNameLeft, tmpNameRight),
        //    );
        //    crumbSet(1, newNode);
        //
        //    after(newNode);
        //    changed = true;
        //
        //    _expr(newNode);
        //  }
        //} else if (isComplexNode(node.left)) {
        //  // Note: we dont need to force-move right because left already precedes it (unlike in the opposite case)
        //  rold('Binary expression left must be simple');
        //  log('- `a.b === c` --> `(tmp = a.b, tmp === c)`');
        //  log('- `a() === c` --> `(tmp = a(), tmp === c)`');
        //  log('- `(a, b).x === c` --> `(tmp = (a, b).x, tmp === c)`');
        //  before(node);
        //
        //  const tmpName = createFreshVarInCurrentRootScope('tmpBinaryLeft', true);
        //  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, node.left), node);
        //  node.left = AST.identifier(tmpName);
        //  crumbSet(1, newNode);
        //
        //  after(newNode);
        //  changed = true;
        //
        //  _expr(newNode);
        //} else {
        expr(node, 'left', -1, node.left);
        expr(node, 'right', -1, node.right);
        //}

        break;
      }

      case 'CallExpression': {
        ASSERT(!node.optional, 'optional call expressions should be transformed away', node);
        // If call is statement
        // If call is var init
        // if call is rhs of assignment of expression statement

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

        node.arguments.some((anode, i) => {
          if (anode.type === 'SpreadElement') {
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        break;
      }

      case 'ChainExpression': {
        ASSERT(false, 'optional chaining should be transformed away');
        break;
      }

      case 'ClassExpression': {
        processClass(node, true, false);
        break;
      }

      case 'ConditionalExpression': {
        expr(node, 'test', -1, node.test);
        expr(node, 'consequent', -1, node.consequent);
        expr(node, 'alternate', -1, node.alternate);
        break;
      }

      case 'FunctionExpression': {
        //log('Name:', node.id ? node.id.name : '<anon>');
        //
        //if (node.id) expr(node, 'id', -1, node.id);
        //
        //node.params.forEach((pnode) => {
        //  if (pnode.type === 'RestElement') {
        //    log('- Rest param, recording usage for `' + pnode.argument.name + '`');
        //    const uniqueName = findUniqueNameForBindingIdent(pnode.argument);
        //    const meta = fdata.globallyUniqueNamingRegistery.get(uniqueName);
        //    meta.usages.push(pnode.argument);
        //    return;
        //  }
        //
        //  ASSERT(pnode.type === 'Identifier', 'args should be normalized', pnode);
        //
        //  log('- Ident param, recording usage for `' + pnode.name + '`');
        //  const meta = getMetaForBindingName(pnode);
        //  meta.usages.push(pnode);
        //});
        ////
        ////const { minParamRequired, hasRest, paramBindingNames } = processFuncArgs(node);
        //
        //stmt(node, 'body', -1, node.body, undefined, true);

        break;
      }

      case 'Identifier': {
        if (node.name !== 'arguments') {
          // TODO
          const meta = getMetaForBindingName(node);
          ASSERT(meta, 'expecting meta for', node);
          log('Recording a usage for ident `' + meta.originalName + '` -> `' + meta.uniqueName + '`');
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
        ASSERT(false, 'should be eliminated');
        //log('Operator:', node.operator);
        //
        //expr(node, 'left', -1, node.left);
        //expr(node, 'right', -1, node.right);
        break;
      }

      case 'MemberExpression': {
        // Note: nested member expressions need a little more love here to preserve evaluation
        // order but since we got rid of those, the traversal is simple
        ASSERT(node.object.type !== 'MemberExpression', 'at this point nested member expressions should be normalized away...');
        ASSERT(!node.optional, 'optional member expressions should be transformed away', node);
        expr(node, 'object', -1, node.object);
        if (node.computed) {
          expr(node, 'property', -1, node.property);
        }

        break;
      }

      case 'NewExpression': {
        node.arguments.forEach((anode, i) => {
          if (anode.type === 'SpreadElement') {
            expr2(node, 'arguments', i, anode, 'argument', -1, anode.argument);
          } else {
            expr(node, 'arguments', i, anode);
          }
        });

        expr(node, 'callee', -1, node.callee);

        break;
      }

      case 'ObjectExpression': {
        node.properties.some((pnode, i) => {
          if (pnode.type === 'SpreadElement') {
            //if (isComplexNode(pnode.argument)) {
            //  rold('Spread args in obj must be simple nodes');
            //  log('- `${...a()}` --> `(tmp = a(), {...tmp})`');
            //  before(node);
            //
            //  const tmpName = createFreshVarInCurrentRootScope('tmpObjSpreadArg', true);
            //  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.argument), node);
            //  pnode.argument = AST.identifier(tmpName);
            //  crumbSet(1, newNode);
            //
            //  after(newNode);
            //  changed = true;
            //
            //  _expr(newNode);
            //  return true;
            //} else {
            expr2(node, 'properties', i, pnode, 'argument', -1, pnode.argument);
            //}
          } else {
            ASSERT(!pnode.shorthand, 'objects should be normalized now and not have shorthand props');

            if (pnode.computed) {
              // Visit the key before the value

              // TODO: if key is valid ident string, replace with identifier

              //if (isComplexNode(pnode.key)) {
              //  rold('Computed key node must be simple');
              //  log('- `obj = {[$()]: y}` --> obj = (tmp = $(), {[tmp]: y})');
              //  before(node);
              //
              //  const tmpName = createFreshVarInCurrentRootScope('tmpComputedKey', true);
              //  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.key), node);
              //  pnode.key = AST.identifier(tmpName);
              //  crumbSet(1, newNode);
              //
              //  after(newNode);
              //  changed = true;
              //
              //  node = newNode;
              //  _expr(newNode);
              //  return true;
              //} else {
              expr2(node, 'properties', i, pnode, 'key', -1, pnode.key);
              //}
            }

            //if (!pnode.method && pnode.kind === 'init' && isComplexNode(pnode.value)) {
            //  rold('Object literal property value node must be simple');
            //  log('- `obj = {x: y()}` --> obj = (tmp = y(), {x: tmp})');
            //  before(node);
            //
            //  const tmpName = createFreshVarInCurrentRootScope('tmpObjPropValue', true);
            //  const newNode = AST.sequenceExpression(AST.assignmentExpression(tmpName, pnode.value), node);
            //  pnode.value = AST.identifier(tmpName);
            //  crumbSet(1, newNode);
            //
            //  after(newNode);
            //  changed = true;
            //
            //  node = newNode;
            //  _expr(newNode);
            //  return true;
            //} else {
            expr2(node, 'properties', i, pnode, 'value', -1, pnode.value);
            //}
          }
        });

        break;
      }

      case 'RegExpLiteral': {
        break;
      }

      case 'SequenceExpression': {
        ASSERT(false, 'sequences should be normalized out');
        break;
      }

      case 'Super': {
        // TODO
        // Two cases:
        // - call
        // - prop
        break;
      }

      case 'TaggedTemplateExpression': {
        ASSERT(false);
        break;
      }

      case 'TemplateLiteral': {
        node.expressions.forEach((enode, i) => {
          ASSERT(!isComplexNode(enode));
          expr(node, 'expressions', i, enode);
        });
        break;
      }

      case 'ThisExpression': {
        break;
      }

      case 'UnaryExpression': {
        expr(node, 'argument', -1, node.argument);

        break;
      }

      case 'UpdateExpression': {
        ASSERT(false, 'should be eliminated');
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

  function anyBlock(block) {
    group('anyBlock');
    const body = block.body;

    ensureVarDeclsCreateOneBinding(body);
    hoisting(body);

    let somethingChanged = false;
    for (let i = 0; i < body.length; ++i) {
      const cnode = body[i];
      if (jumpTable(cnode, body, i, block)) {
        changed = true;
        somethingChanged = true;
        --i;
        continue;
      }

      stmt(block, 'body', i, cnode, false, false);
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
        return anyBlock(node);
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
      case 'LabeledStatement':
        return transformLabeledStatement(node, body, i, parent);
      case 'IfStatement':
        return transformIfStatement(node, body, i);
      case 'ReturnStatement':
        return transformReturnStatement(node, body, i);
      case 'SwitchStatement':
        return transformSwitchStatement(node, body, i);
      case 'ThrowStatement':
        return transformThrowStatement(node, body, i);
      case 'VariableDeclaration':
        return transformVariableDeclaration(node, body, i);
      case 'WhileStatement':
        return transformWhileStatement(node, body, i);
      case 'BreakStatement':
      case 'ContinueStatement':
      case 'ClassExpression':
        // TODO
        log(RED + 'Missed stmt:', node.type, RESET);
        return false;
    }

    log(RED + 'Missed stmt:', node.type, RESET);
    addme;
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
  function normalizeCallArgs(args, newArgs, newNodes) {
    // This is used for `new` and regular function calls
    args.forEach((anode) => {
      if (anode.type === 'SpreadElement') {
        const tmpName = createFreshVarInCurrentRootScope('tmpCalleeParamSpread');
        newNodes.push(AST.variableDeclaration(tmpName, anode.argument, 'const'));
        anode.argument = AST.identifier(tmpName);
        newArgs.push(anode);
      } else {
        const tmpName = createFreshVarInCurrentRootScope('tmpCalleeParam');
        newNodes.push(AST.variableDeclaration(tmpName, anode, 'const'));
        newArgs.push(AST.identifier(tmpName));
      }
    });
  }
  function transformExportDefault(node, body, i) {
    if (node.declaration.type !== 'FunctionDeclaration' && node.declaration.type !== 'ClassDeclaration') {
      // The export value is a generic expression. However, there's no reason we couldn't outline it first
      if (isComplexNode(node.declaration)) {
        rule('The value of a default export must be a simple node');
        example('export default a + b', 'const tmp = a + b; export default tmp;');
        before(node);

        const tmpName = createFreshVarInCurrentRootScope('tmpExportDefault');
        const newNodes = [AST.variableDeclaration(tmpName, node.declaration, 'const'), AST._exportDefaultDeclaration(tmpName)];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
        return true;
      }
    }
    return false;
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
        findBoundNamesInPattern(decl, names);

        // Now move the var decl to global space and replace the export with one that does `export {a,b,c}` instead
        // We shouldn't need to alias anything since the exported bindings ought to remain the same and have to
        // be unique (parser validated). This includes bindings from patterns.
        const newNodes = [
          decl, // This is the `let x = y` part
          AST._exportNamedDeclarationFromNames(names.map((id) => AST.identifier(id))),
        ];
        body.splice(i, 1, ...newNodes);

        after(newNodes);
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
      const meta = getMetaForBindingName(local);
      meta.usages.push(local);
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
        // TODO: usage tracking

        return false;

      case 'Literal': {
        return false;
      }

      case 'FunctionExpression': {
        // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
        // Array<name, expr>
        // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
        const newBindings = [];

        transformFunctionParams(node, body, i, newBindings);

        if (newBindings.length) {
          log('Params were transformed somehow, injecting new nodes into body');
          node.body.body.unshift(...newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'))); // let because params are mutable
          return true;
        }

        anyBlock(node.body);

        return false;
      }

      case 'CallExpression': {
        const callee = node.callee;
        const args = node.arguments;

        if (node.optional) {
          // `x = a?.b()` -> `let x = a; if (x != null) x = x.b(); else x = undefined;`
          // (This is NOT `a?.b()` !! see below)

          // Special case the member call because it changes the context
          if (callee.type === 'MemberExpression') {
            if (callee.computed) {
              rule('Optional computed member call expression should be if-else');
              example('a()[b()]?.(c())', 'tmp = a(), tmp2 = b(), tmp3 = tmp[tmp2], (tmp3 != null ? tmp3.call(tmp, c()) : undefined)');
              before(node, parentNode);

              const tmpNameObj = createFreshVarInCurrentRootScope('tmpOptCallMemObj');
              const tmpNameProp = createFreshVarInCurrentRootScope('tmpOptCallMemProp');
              const tmpNameFunc = createFreshVarInCurrentRootScope('tmpOptCallMemFunc');
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
              return true;
            } else {
              rule('Optional member call expression should be if-else');
              example('a().b?.(c())', 'tmp = a(), (tmp != null ? tmp.b(c()) : undefined)');
              before(node, parentNode);

              const tmpNameObj = createFreshVarInCurrentRootScope('tmpOptCallMemObj');
              const tmpNameFunc = createFreshVarInCurrentRootScope('tmpOptCallMemFunc');
              const newNodes = [
                AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
                AST.variableDeclaration(tmpNameFunc, AST.memberExpression(tmpNameObj, callee.property), 'const'),
              ];
              const finalNode = AST.callExpression(AST.memberExpression(tmpNameFunc, 'call'), [
                AST.identifier(tmpNameObj), // Context
                ...args,
              ]);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes, finalParent);
              after(finalNode, finalParent);
              return true;
            }
          }

          rule('Optional non-prop call expression should be if-else');
          example('a()?.(b())', 'tmp = a(), (tmp != null ? tmp(b()) : undefined)');
          before(node, parentNode);

          const tmpName = createFreshVarInCurrentRootScope('tmpOptCallFunc');
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.conditionalExpression(
            AST.binaryExpression('==', tmpName, 'null'),
            'undefined',
            AST.callExpression(tmpName, [...args]),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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
            const tmpName = createFreshVarInCurrentRootScope('tmpOptMemberCallObj');
            const newNodes = [AST.variableDeclaration(tmpName, callee.object, 'const')];
            normalizeCallArgs(args, newArgs, newNodes);
            const finalNode = AST.conditionalExpression(
              AST.binaryExpression('==', tmpName, 'null'),
              'undefined',
              AST.callExpression(AST.memberExpression(tmpName, callee.property, callee.computed), newArgs),
            );
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
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
            const tmpNameObj = createFreshVarInCurrentRootScope('tmpCallCompObj');
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpCallCompProp');
            const tmpNameVal = createFreshVarInCurrentRootScope('tmpCallCompVal');
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameProp, callee.property, 'const'),
              AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, tmpNameProp, true), 'const'),
            ];
            normalizeCallArgs(args, newArgs, newNodes);
            // Do a `.call` to preserve getter order AND context
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameVal, 'call'), [AST.identifier(tmpNameObj), ...newArgs]);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          if (!callee.computed && hasComplexArg) {
            // At least one param node is complex. Cache them all. And the object too.

            rule('The arguments of a method call must all be simple');
            example('a().b(f())', 'tmp = a(), tmp2 = tmp.b, tmp3 = f(), tmp2.call(tmp, tmp3)');
            before(node, parentNode);

            const newArgs = [];
            const tmpNameObj = createFreshVarInCurrentRootScope('tmpCallObj');
            const tmpNameVal = createFreshVarInCurrentRootScope('tmpCallVal');
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, callee.property), 'const'),
            ];
            normalizeCallArgs(args, newArgs, newNodes);
            // Do a `.call` to preserve getter order AND context
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameVal, 'call'), [AST.identifier(tmpNameObj), ...newArgs]);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          if (callee.computed && isComplexNode(callee.property)) {
            // Do computed first because that requires caching the object anyways, saving us an extra var
            rule('The property of a computed method call must be simple');
            example('a()[b()]()', 'tmp = a(), tmp2 = b(), tmp[tmp2]()');
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpCallCompObj');
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpCallCompProp');
            const newNodes = [
              AST.variableDeclaration(tmpNameObj, callee.object, 'const'),
              AST.variableDeclaration(tmpNameProp, callee.property, 'const'),
            ];
            const finalNode = AST.callExpression(AST.memberExpression(tmpNameObj, tmpNameProp, true), args);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          if (isComplexNode(callee.object)) {
            ASSERT(!callee.computed || !isComplexNode(callee.property), 'If the prop is computed, it must be simple now');
            rule('The object of a method call must be simple');
            example('a().b()', 'tmp = a(), tmp.b()', () => !callee.computed);
            example('a()[b]()', 'tmp = a(), tmp[b]()', () => callee.computed);
            before(node, parentNode);

            const tmpName = createFreshVarInCurrentRootScope('tmpCallObj');
            const newNodes = [AST.variableDeclaration(tmpName, callee.object, 'const')];
            const finalNode = AST.callExpression(AST.memberExpression(tmpName, callee.property, callee.computed), args);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);
            callee.object = AST.identifier(tmpName);

            after(newNodes);
            after(finalNode, finalParent);
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
          const tmpName = createFreshVarInCurrentRootScope('tmpCallCallee');
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          normalizeCallArgs(args, newArgs, newNodes);
          const finalNode = AST.callExpression(tmpName, newArgs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (isComplexNode(callee)) {
          // Calling something that is not an identifier (any other simple node would be a runtime error, but ok)

          rule('The callee of a call must all be simple or simple member expression');
          example('a()(x, y)', 'tmp = a(), tmp(x, y)');
          before(node, parentNode);

          const tmpName = createFreshVarInCurrentRootScope('tmpCallCallee');
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.callExpression(tmpName, args);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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
          const tmpName = createFreshVarInCurrentRootScope('tmpNewCallee');
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          normalizeCallArgs(args, newArgs, newNodes);
          const finalNode = AST.newExpression(tmpName, newArgs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (isComplexNode(callee)) {
          // Calling something that is not an identifier (any other simple node would be a runtime error, but ok)

          rule('The callee of a new must all be simple');
          example('new (a())(x, y)', 'tmp = a(), new tmp(x, y)');
          before(node, parentNode);

          const tmpName = createFreshVarInCurrentRootScope('tmpNewCallee');
          const newNodes = [AST.variableDeclaration(tmpName, callee, 'const')];
          const finalNode = AST.newExpression(tmpName, args);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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

          const tmpNameObj = createFreshVarInCurrentRootScope('tmpOptObj');
          const newNodes = [AST.variableDeclaration(tmpNameObj, node.object, 'const')];
          const finalNode = AST.conditionalExpression(
            AST.binaryExpression('==', tmpNameObj, 'null'),
            'undefined',
            AST.memberExpression(tmpNameObj, node.property, node.computed),
          );
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (node.computed && isComplexNode(node.property)) {
          rule('Computed member expression must have simple property');
          example('a()[b()]', 'tmp = a(), tmp2 = b(), a[b]');
          before(node, parentNode);

          const tmpNameObj = createFreshVarInCurrentRootScope('tmpCompObj');
          const tmpNameProp = createFreshVarInCurrentRootScope('tmpCompProp');
          const newNodes = [
            AST.variableDeclaration(tmpNameObj, node.object, 'const'),
            AST.variableDeclaration(tmpNameProp, node.property, 'const'),
          ];
          const finalNode = AST.memberExpression(tmpNameObj, tmpNameProp, true);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (isComplexNode(node.object)) {
          rule('Member expression object must be simple');
          example('f().x', 'tmp = f(), tmp.x');
          before(node, parentNode);

          const tmpNameObj = createFreshVarInCurrentRootScope('tmpCompObj');
          const newNodes = [AST.variableDeclaration(tmpNameObj, node.object, 'const')];
          const finalNode = AST.memberExpression(tmpNameObj, node.property, node.computed);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
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
            rule('Computed property that is valid ident must be member expression');
            log('- `a["foo"]` --> `a.foo`');
            log('- Name: `' + node.property.value + '`');
            before(node, parentNode);

            node.computed = false;
            node.property = AST.identifier(node.property.value);

            after(node, parentNode);
            return true;
          }
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
        return true;
      }

      case 'AssignmentExpression': {
        const lhs = node.left;
        const rhs = node.right;
        log('-', lhs.type, node.operator, rhs.type);

        if (lhs.type === 'ObjectPattern') {
          const tmpNameRhs = createFreshVarInCurrentRootScope('tmpAssignObjPatternRhs');
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
            return true;
          }

          rule('Assignment obj patterns not allowed, empty');
          example('({} = y())', 'y()');
          before(node, parentNode);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalNode, finalParent);
          return true;
        }

        if (lhs.type === 'ArrayPattern') {
          const rhsTmpName = createFreshVarInCurrentRootScope('arrAssignPatternRhs');
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
            return true;
          }

          rule('Assignment arr patterns not allowed, empty');
          example('[] = y()', 'y()'); // TODO: Does it have to be spreaded anyways? Do I care?
          before(node, parentNode);

          const finalNode = rhs;
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(finalNode, finalParent);
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

          if (mem.computed && isComplexNode(b)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            rule('Assignment to computed property must have simple property node');
            example('a[b()] = c()', '(tmp = a, tmp2 = b(), tmp[tmp2] = c())');
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignComMemLhsObj');
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpAssignComMemLhsProp');
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

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignMemLhsObj');
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
            return true;
          }

          if (node.operator !== '=') {
            // The compound assignment is not assignable so no need to return an assignment or assignable
            // The a and b ought to be simple at this point. It's not relevant whether or not it's computed.

            rule('Compound assignment to property must be regular assignment');
            example('a.b += c()', 'tmp = a.b, tmp.b = tmp + c()', () => !mem.computed);
            example('a[b] += c()', 'tmp = a[b], tmp[b] = tmp + c()', () => mem.computed);
            before(node, parentNode);

            const tmpNameLhs = createFreshVarInCurrentRootScope('tmpCompoundAssignLhs');
            // tmp = a.b, or tmp = a[b]
            const newNodes = [AST.variableDeclaration(tmpNameLhs, AST.memberExpression(a, b, mem.computed), 'const')];
            // tmp.b = tmp + c(), or tmp[b] = tmp + c()
            const finalNode = AST.assignmentExpression(
              AST.memberExpression(a, b, mem.computed),
              AST.binaryExpression(node.operator.slice(0, -1), tmpNameLhs, c),
            );
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          if (mem.computed && isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a and b must be simple at this point but c() could still mutate them so we cache them anyways
            rule('Assignment to computed property must have simple object, property expression, and rhs');
            example('a[b] = c()', 'tmp = a, tmp2 = b, tmp3 = c(), tmp[tmp2] = tmp3');
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignComputedObj');
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpAssignComputedProp');
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpAssignComputedRhs');
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
            return true;
          }

          if (!mem.computed && isComplexNode(c)) {
            // Note: resulting node must remain assignment to member expression (because it may be an assignment target)
            // Note: a must be simple at this point but c() could still mutate it so we cache it anyways
            rule('Assignment to member expression must have simple lhs and rhs');
            example('a.b = c()', '(tmp = a, tmp2 = c(), tmp).b = tmp2');
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignMemLhsObj');
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpAssignMemRhs');
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

          const finalNode = AST.assignmentExpression(lhs, AST.binaryExpression(node.operator.slice(0, -1), lhs, rhs));
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body[i] = finalParent;

          after(body[i]);
          after(finalNode, finalParent);
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

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedCompoundLhs');
              // tmp = b
              const newNodes = [AST.variableDeclaration(tmpName, rhsLhs, 'const')];
              // a = b = tmp * c()
              const finalNode = AST.assignmentExpression(
                a,
                // b = tmp * c()
                AST.assignmentExpression(b, AST.binaryExpression(rhs.operator.slice(0, -1), tmpName, c)),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              return true;
            }

            if (isComplexNode(c)) {
              // In this case, a and b are only set, so we don't need to cache even if c() would mutate
              // With simple a and ident b
              rule('The rhs.rhs of a nested assignment must be simple');
              example('a = b = c()', 'tmp = c(), a = b = tmp');
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedComplexRhs');
              const newNodes = [AST.variableDeclaration(tmpName, c, 'const')];
              const finalNode = AST.assignmentExpression(a, AST.assignmentExpression(b, tmpName));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              return true;
            }

            // This is `a = b = c` with all idents (or, `x = a = b = c` or `let x = a = b = c`)
            rule('Nested assignment with all idents must be split');
            example('a = b = c', 'b = c, a = c');
            before(node, parentNode);

            const newNodes = [AST.expressionStatement(AST.assignmentExpression(b, c))];
            const finalNode = AST.assignmentExpression(a, c);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
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

              const tmpNameObj = createFreshVarInCurrentRootScope('tmpNestedAssignComMemberObj');
              const tmpNameProp = createFreshVarInCurrentRootScope('tmpNestedAssignComMemberProp');
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
              return true;
            }

            if (isComplexNode(b)) {
              // Whether c is computed or not, it is simple (as per above check). Check if b is complex.
              rule('The object of a nested property assignment must be a simple node');
              example('a = b().c = d', 'tmp = b(), a = tmp.c = d()', () => !rhsLhs.computed);
              example('a = b()[c] = d', 'tmp = b(), a = tmp[c] = d()', () => rhsLhs.computed);
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedAssignObj');
              const newNodes = [AST.variableDeclaration(tmpName, b, 'const')];
              const finalNode = AST.assignmentExpression(
                a,
                AST.assignmentExpression(AST.memberExpression(tmpName, c, rhsLhs.computed), d, rhs.operator),
              );
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
              return true;
            }

            // We must be left with `a = b.c = d()` or `a = b[c] = d()`, which must all be simple nodes except d
            // and which may be a compound assignment. We need to check that first to preserve get/set order.

            if (rhs.operator !== '=') {
              rule('Nested compound prop assignment with all simple parts must be split');
              example('a = b.c *= d()', 'tmp = b.c * d(), a = b.c = tmp');
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedPropCompoundComplexRhs');
              const newNodes = [
                AST.variableDeclaration(tmpName, AST.binaryExpression(rhs.operator.slice(0, -1), rhsLhs, d), 'const'),
                AST.expressionStatement(AST.assignmentExpression(rhsLhs, tmpName)),
              ];
              const finalNode = AST.assignmentExpression(a, tmpName);
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
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

              const tmpNameRhs = createFreshVarInCurrentRootScope('tmpNestedAssignPropRhs');
              const newNodes = [
                // tmp = d()
                AST.variableDeclaration(tmpNameRhs, d),
              ];
              const finalNode = AST.assignmentExpression(a, AST.assignmentExpression(rhsLhs, tmpNameRhs));
              // a = b = tmp, a = b.c = tmp, a = b[c] = tmp
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
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

              const tmpName = createFreshVarInCurrentRootScope('tmpNestedPropAssignRhs');
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
            return true;
          }

          if (rhsLhs.type === 'ObjectPattern') {
            rule('Object patterns in nested assign are not allowed');
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpNestedAssignObjPatternRhs');
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
              return true;
            }

            rule('Assignment obj patterns not allowed, empty');
            example('a = {} = y()', 'a = y()');
            before(node, parentNode);

            const finalNode = AST.assignmentExpression(a, rhsRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
            return true;
          }

          if (rhsLhs.type === 'ArrayPattern') {
            rule('Array patterns in nested assign are not allowed');
            const tmpNameRhs = createFreshVarInCurrentRootScope('tmpNestedAssignArrPatternRhs');
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
              return true;
            }

            rule('Assignment arr patterns not allowed, empty');
            example('a = [] = y()', 'a = y()'); // TODO: Does it have to be spreaded anyways? Do I care?
            before(node, parentNode);

            const finalNode = AST.assignmentExpression(a, rhsRhs);
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body[i] = finalParent;

            after(finalNode, finalParent);
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
          return true;
        }

        if (rhs.type === 'MemberExpression') {
          if (rhs.optional) {
            // a = b?.c
            rule('Nested assignment rhs can not be optional chaining');
            example('x = a = b?.c', 'tmp = b; if (tmp) a = tmp.c; else a = undefined;', () => !rhs.computed);
            example('x = a = b?.[c()]', 'tmp = b; if (tmp) a = tmp[c()]; else a = undefined;', () => rhs.computed);
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignOptMem');
            const tmpNameVal = createFreshVarInCurrentRootScope('tmpAssignOptVal');
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
            return true;
          }

          if (rhs.computed && isComplexNode(rhs.property)) {
            rule('Assignment rhs member expression must have simple object and computed property');
            example('a = b()[c()]', 'tmp = b(), tmp2 = c(), a = tmp[tmp2]');
            before(node, parentNode);

            const tmpNameObj = createFreshVarInCurrentRootScope('tmpAssignRhsCompObj');
            const tmpNameProp = createFreshVarInCurrentRootScope('tmpAssignRhsCompProp');
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
            return true;
          }

          if (isComplexNode(rhs.object)) {
            rule('Assignment rhs member expression must have simple object; prop already simple');
            example('a = b().c', 'tmp = b(), a = tmp.c', () => !rhs.computed);
            example('a = b()[c]', 'tmp = b(), a = tmp[c]', () => rhs.computed);
            before(node, parentNode);

            const tmpName = createFreshVarInCurrentRootScope('tmpAssignRhsProp');
            // const tmp = b()
            const newNodes = [AST.variableDeclaration(tmpName, rhs.object, 'const')];
            const finalNode = AST.assignmentExpression(lhs, AST.memberExpression(tmpName, rhs.property, rhs.computed));
            // a = tmp.c
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          // Assignment of simple member expression to ident or simple member expression is atomic
          return false;
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
        if (wrapKind === 'statement') {
          rule('Binary expression as statement must be split');
          example('a + b;', 'a; b;');
          before(node, parentNode);

          const newNodes = [AST.expressionStatement(node.left)];
          const finalNode = node.right;
          const finalParent = AST.expressionStatement(finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (isComplexNode(node.right)) {
          rule('Binary expression must have simple nodes; rhs is complex');
          example('a * f()', 'tmp = a, tmp2 = f(), tmp * tmp2');
          before(node, parentNode);

          const tmpNameLhs = createFreshVarInCurrentRootScope('tmpBinBothLhs');
          const tmpNameRhs = createFreshVarInCurrentRootScope('tmpBinBothRhs');
          const newNodes = [
            AST.variableDeclaration(tmpNameLhs, node.left, 'const'),
            AST.variableDeclaration(tmpNameRhs, node.right, 'const'),
          ];
          const finalNode = AST.binaryExpression(node.operator, tmpNameLhs, tmpNameRhs);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        if (isComplexNode(node.left)) {
          rule('Binary expression must have simple nodes; lhs is complex');
          example('f() * a', 'tmp = f(), tmp * a');
          before(node, parentNode);

          const tmpNameLhs = createFreshVarInCurrentRootScope('tmpBinLhs');
          const newNodes = [AST.variableDeclaration(tmpNameLhs, node.left, 'const')];
          const finalNode = AST.binaryExpression(node.operator, tmpNameLhs, node.right);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        return false;
      }

      case 'UnaryExpression': {
        // Certain operators need special more care
        // - typeof, delete, -, +, ~, void, !

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

              const tmpName = createFreshVarInCurrentRootScope('tmpDeleteOpt');
              const newNodes = [AST.variableDeclaration(tmpName, mem.object, 'const')];
              const finalParent = AST.ifStatement(
                tmpName,
                AST.expressionStatement(AST.unaryExpression('delete', AST.memberExpression(tmpName, mem.property, mem.computed))),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalParent);
              return true;
            }

            if (wrapKind === 'var') {
              rule('Arg of var init delete cannot be optional chaining');
              example('let x = delete a?.b;', 'tmp = a; let x = true; if (a) x = delete a.b;', () => !mem.computed);
              example('let x = delete a?.[b()];', 'tmp = a; let x = true; if (a) x = delete a[b()];', () => mem.computed);
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpDeleteOpt');
              const newNodes = [AST.variableDeclaration(tmpName, mem.object, 'const')];
              const finalParent = AST.ifStatement(
                tmpName,
                AST.variableDeclaration(wrapLhs, 'true', varOrAssignKind === 'const' ? 'let' : varOrAssignKind),
                AST.expressionStatement(
                  AST.unaryExpression(
                    'delete',
                    AST.assignmentExpression(wrapLhs, AST.memberExpression(tmpName, mem.property, mem.computed)),
                  ),
                ),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalParent);
              return true;
            }

            if (wrapKind === 'assign') {
              rule('Arg of assign delete cannot be optional chaining');
              example('x = delete a?.b;', 'tmp = a; if (a) x = delete a.b; else x = true;', () => !mem.computed);
              example('x = delete a?.[b()];', 'tmp = a; if (a) x = delete a[b()]; else x = true;', () => mem.computed);
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpDeleteOpt');
              const newNodes = [AST.variableDeclaration(tmpName, mem.object, 'const')];
              const finalParent = AST.ifStatement(
                tmpName,
                AST.expressionStatement(
                  AST.unaryExpression(
                    'delete',
                    AST.assignmentExpression(wrapLhs, AST.memberExpression(tmpName, mem.property, mem.computed)),
                  ),
                ),
                AST.expressionStatement(AST.assignmentExpression(wrapLhs, 'true', varOrAssignKind === 'const' ? 'let' : varOrAssignKind)),
              );
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              return true;
            }

            ASSERT(false);
          }

          if (arg.type === 'MemberExpression') {
            if (arg.computed) {
              if (isComplexNode(arg.object) || isComplexNode(arg.property)) {
                rule('Argument of delete must be simple computed member expression with simple property');
                example('delete f()[g()]', 'tmp = f(), tmp2 = g(), delete tmp[tmp2]', () => arg.computed);
                before(node, parentNode);

                const tmpNameObj = createFreshVarInCurrentRootScope('tmpDeleteCompObj');
                const tmpNameProp = createFreshVarInCurrentRootScope('tmpDeleteCompProp');
                const newNodes = [
                  AST.variableDeclaration(tmpNameObj, arg.object, 'const'),
                  AST.variableDeclaration(tmpNameProp, arg.property, 'const'),
                ];
                const finalNode = AST.unaryExpression('delete', AST.memberExpression(tmpNameObj, tmpNameProp, true));
                const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
                body.splice(i, 1, ...newNodes, finalParent);

                after(newNodes);
                after(finalNode, finalParent);
                return true;
              }

              // `delete a[b]` is atomic
              return false;
            }

            if (isComplexNode(arg.object)) {
              rule('Argument of delete must be simple member expression');
              example('delete f().x', 'tmp = f(), delete tmp.x');
              before(node, parentNode);

              const tmpName = createFreshVarInCurrentRootScope('tmpDeleteObj');
              const newNodes = [AST.variableDeclaration(tmpName, arg.object, 'const')];
              const finalNode = AST.unaryExpression('delete', AST.memberExpression(tmpName, arg.property));
              const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
              body.splice(i, 1, ...newNodes, finalParent);

              after(newNodes);
              after(finalNode, finalParent);
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
          const finalNode = AST.identifier('true');
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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
          return true;
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
          return true;
        }

        if (isComplexNode(node.argument)) {
          rule('Unary argument cannot be complex');
          example('!f()', 'tmp = f(), !tmp');
          before(node, parentNode);

          const tmpName = createFreshVarInCurrentRootScope('tmpUnaryArg');
          const newNodes = [AST.variableDeclaration(tmpName, node.argument, 'const')];
          const finalNode = AST.unaryExpression(node.operator, tmpName);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
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
              AST.binaryExpression('==', node.left, 'null'),
              AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.right)),
            );
            body[i] = finalParent;

            after(finalParent);
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
              AST.binaryExpression('==', wrapLhs, 'null'),
              AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.right)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
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

          const finalParent = [
            wrapExpressionAs(
              wrapKind,
              varInitAssignKind,
              varInitAssignId,
              wrapLhs,
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              node.left,
            ),
            AST.ifStatement(wrapLhs, AST.emptyStatement(), AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.right))),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
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
            AST.ifStatement(wrapLhs, AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.right))),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
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
              wrapLhs,
              varOrAssignKind === 'const' ? 'let' : varOrAssignKind,
              null,
            ),
          ];
          const finalParent = AST.ifStatement(
            node.test,
            AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.consequent)),
            AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.alternate)),
          );
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalParent);
          return true;
        }

        if (wrapKind === 'assign') {
          rule('Conditional expression assign should be if-else');
          example('x = a() ? x = b() : x = c();', 'if (a()) x = b(); else x = c();');
          before(node, parentNode);

          const finalParent = [
            AST.ifStatement(
              node.test,
              AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.consequent)),
              AST.expressionStatement(AST.assignmentExpression(wrapLhs, node.alternate)),
            ),
          ];
          body.splice(i, 1, ...finalParent);

          after(finalParent);
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

          const finalNode = AST.assignmentExpression(arg, AST.literal(1), node.operator === '++' ? '+=' : '-=');
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, finalParent);

          after(finalParent);
          after(finalNode, finalParent);
          return true;
        }

        // Postfix is harder because we do need to bother saving the value first so we can return it.
        // Well ok, it's kinda simple for identifier

        if (arg.type === 'Identifier') {
          rule('Postfix ident update expression must be compound assignment that returns before-value');
          example('a++', 'tmp = a, a = a + 1, tmp', () => node.operator === '++');
          example('a--', 'tmp = a, a = a - 1, tmp', () => node.operator === '--');
          before(node, parentNode);

          const tmpName = createFreshVarInCurrentRootScope('tmpPostUpdArgIdent');
          const newNodes = [
            AST.variableDeclaration(tmpName, arg.name, 'const'),
            AST.expressionStatement(
              AST.assignmentExpression(arg.name, AST.binaryExpression(node.operator === '++' ? '+' : '-', arg.name, AST.literal(1))),
            ),
          ];
          const finalNode = AST.identifier(tmpName);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        // Member expression is a little trickier. Just unconditionally cache the object/prop (imlazy) and then do the same.

        ASSERT(arg.type === 'MemberExpression', 'can only update idents and props');
        if (arg.computed) {
          rule('Postfix computed prop update expression must be compound assignment that returns before-value');
          example('f()[g()]++', 'tmp = f(), tmp2 = g(), tmp3 = tmp[tmp2], tmp[tmp2] = tmp3 + 1, tmp3', () => node.operator === '++');
          example('f()[g()]--', 'tmp = f(), tmp2 = g(), tmp3 = tmp[tmp2], tmp[tmp2] = tmp3 - 1, tmp3', () => node.operator === '--');
          before(node, parentNode);

          const tmpNameObj = createFreshVarInCurrentRootScope('tmpPostUpdArgComObj');
          const tmpNameProp = createFreshVarInCurrentRootScope('tmpPostUpdArgComProp');
          const tmpNameVal = createFreshVarInCurrentRootScope('tmpPostUpdArgComVal');
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
                AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNameVal, AST.literal(1)),
              ),
            ),
          ];
          const finalNode = AST.identifier(tmpNameVal);
          const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
          body.splice(i, 1, ...newNodes, finalParent);

          after(newNodes);
          after(finalNode, finalParent);
          return true;
        }

        // Slightly less complicated but we still just cache the object all the same.

        rule('Postfix prop update expression must be compound assignment that returns before-value');
        example('f().x++', 'tmp = f(), tmp3 = tmp.x, tmp.x = tmp2 + 1, tmp2', () => node.operator === '++');
        example('f().x--', 'tmp = f(), tmp3 = tmp.x, tmp.x = tmp2 - 1, tmp2', () => node.operator === '--');
        before(node, parentNode);

        const tmpNameObj = createFreshVarInCurrentRootScope('tmpPostUpdArgObj');
        const tmpNameVal = createFreshVarInCurrentRootScope('tmpPostUpdArgVal');

        const newNodes = [
          // tmp = f()
          AST.variableDeclaration(tmpNameObj, arg.object, 'const'),
          // tmp2 = tmp.x
          AST.variableDeclaration(tmpNameVal, AST.memberExpression(tmpNameObj, arg.property), 'const'),
          // tmp.x = tmp2 + 1
          AST.expressionStatement(
            AST.assignmentExpression(
              AST.memberExpression(tmpNameObj, arg.property),
              AST.binaryExpression(node.operator === '++' ? '+' : '-', tmpNameVal, AST.literal(1)),
            ),
          ),
        ];
        const finalNode = AST.identifier(tmpNameVal);
        const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
        body.splice(i, 1, ...newNodes, finalParent);

        after(newNodes);
        after(finalNode, finalParent);
        return true;
      }

      case 'ArrayExpression': {
        if (wrapKind === 'statement') {
          // Consider an array statements that only has simple spreads to be okay
          if (
            node.elements.every((enode) => {
              if (enode.type !== 'SpreadElement') {
                // Don't want to keep non-spreads in an array statement. There's no point.
                return false;
              }
              // `[...x];` will trigger the iterator on x and so is an observable side effect
              return !isComplexNode(enode.argument);
            })
          ) {
            return false;
          }

          rule('Array cannot be a statement');
          example('[a, b()];', 'a; b();');
          before(node, parentNode);

          const finalParent = [];
          node.elements.forEach((enode) => {
            if (!enode) return;

            if (enode.type === 'SpreadElement') {
              const tmpName = createFreshVarInCurrentRootScope('tmpArrElToSpread');
              const newNode = AST.variableDeclaration(tmpName, enode.argument);
              finalParent.push(newNode);
              // Spread it to trigger iterators and to make sure still errors happen
              const spread = AST.expressionStatement(AST.arrayExpression(AST.spreadElement(tmpName)));
              finalParent.push(spread);
            } else {
              const newNode = AST.expressionStatement(enode);
              finalParent.push(newNode);
            }
          });
          body.splice(i, 1, ...finalParent);

          after(finalParent);
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
              const tmpName = createFreshVarInCurrentRootScope('tmpArrSpread');
              newNodes.push(AST.variableDeclaration(tmpName, enode.argument, 'const'));
              newNames.push([tmpName, true]);
            } else {
              const tmpName = createFreshVarInCurrentRootScope('tmpArrElement');
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
          return true;
        }

        return false;
      }

      case 'ObjectExpression': {
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
                const tmpName = createFreshVarInCurrentRootScope('tmpObjSpread');
                newNodes.push(AST.variableDeclaration(tmpName, pnode.argument, 'const'));
                newProps.push(AST.spreadElement(tmpName));
              } else if (pnode.kind !== 'init' || pnode.method) {
                // Copy getters/setters and methods as is. There's no alternative for them. Maybe methods.
                newProps.push(pnode);
              } else if (pnode.computed) {
                // Must also cache the computed property keys
                const tmpNameKey = createFreshVarInCurrentRootScope('tmpObjLitPropKey');
                const tmpNameVal = createFreshVarInCurrentRootScope('tmpObjLitPropVal');
                newNodes.push(AST.variableDeclaration(tmpNameKey, pnode.key, 'const'));
                newNodes.push(AST.variableDeclaration(tmpNameVal, pnode.value, 'const'));
                newProps.push(AST.property(tmpNameKey, tmpNameVal, false, true));
              } else {
                const tmpName = createFreshVarInCurrentRootScope('tmpObjLitVal');
                newNodes.push(AST.variableDeclaration(tmpName, pnode.value, 'const'));
                newProps.push(AST.property(pnode.key, tmpName, false, false));
              }
            }

            const finalNode = AST.objectExpression(...newProps, ...node.properties.slice(last + 1));
            const finalParent = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
            body.splice(i, 1, ...newNodes, finalParent);

            after(newNodes);
            after(finalNode, finalParent);
            return true;
          }

          return false;
        }

        ASSERT(false);
        throw error;
      }

      case 'ArrowFunctionExpression': {
        if (node.expression) {
          rule('Arrow body must be block');
          example('() => x', '() => { return x; }');
          before(node, parentNode);

          node.body = AST.blockStatement(AST.returnStatement(node.body));
          node.expression = false;

          after(node, parentNode);
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

            const tmpName = createFreshVarInCurrentRootScope('tmpTemplateExpr');
            newNodes.push(AST.variableDeclaration(tmpName, enode, 'const'));
            node.expressions[i] = AST.identifier(tmpName);
          }
        });
        if (newNodes.length > 0) {
          body.splice(i, 0, ...newNodes);

          after(newNodes);
          after(node, parentNode); // did not replace node
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
          log('-> r:', node.type, node.property ? node.property.name : node.callee);
          if (node.type === 'MemberExpression') {
            if (node.object.type === 'MemberExpression' || node.object.type === 'CallExpression') {
              r(node.object);
            } else {
              const tmpName = createFreshVarInCurrentRootScope('tmpChainRootProp');
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
              nodes.push(AST.ifStatement(prevObj, AST.blockStatement(nextLevel)));
              nodes = nextLevel;
            }

            if (node.computed) {
              // a?.[b()]?.() -> tmp = a; if (a) { tmp2 = b(); tmp3 = tmp[tmp2]; if (tmp3) tmp3.call(tmp2); }
              const tmpName = createFreshVarInCurrentRootScope('tmpChainRootComputed');
              nodes.push(AST.variableDeclaration(tmpName, node.property, 'const'));
              node.property = AST.identifier(tmpName);
            }

            const tmpName = createFreshVarInCurrentRootScope('tmpChainElementObject');
            log('Storing next property', node.property.name, 'in', tmpName);
            nodes.push(AST.variableDeclaration(tmpName, AST.memberExpression(prevObj, node.property, node.computed), 'const'));
            lastObj = prevObj;
            prevObj = tmpName;
            prevComputed = node.computed;
          } else if (node.type === 'CallExpression') {
            if (node.callee.type === 'MemberExpression' || node.callee.type === 'CallExpression') {
              r(node.callee);
            } else {
              const tmpName = createFreshVarInCurrentRootScope('tmpChainRootCall');
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
              nodes.push(AST.ifStatement(prevObj, AST.blockStatement(nextLevel)));
              nodes = nextLevel;
            }

            const tmpName = createFreshVarInCurrentRootScope('tmpChainElementCall');
            log('Storing next callee', node.callee.name, 'in', tmpName);
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
          let finalParent2 = wrapExpressionAs(wrapKind, varInitAssignKind, varInitAssignId, wrapLhs, varOrAssignKind, finalNode);
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
        return true;
      }

      case 'ThisExpression': {
        // I don't think we need to do anything with this one during this phase?
        return false;
      }

      case 'AwaitExpression':
      case 'ClassExpression':
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

          const newParamName = createFreshVarInCurrentRootScope('$tdz$__' + pnode.left.name);
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
        const newParamName = createFreshVarInCurrentRootScope('$tdz$__pattern');
        cacheNameStack.push(newParamName);
        log('Replacing param default with a local variable');
        const newIdentNode = AST.identifier(newParamName);
        node.params[i] = newIdentNode;

        // Create unique var containing the initial param value after resolving default values
        const undefaultName = createFreshVarInCurrentRootScope('$tdz$__pattern_after_default');
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

      const newParamName = createFreshVarInCurrentRootScope('tmpParamPattern');
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
    // Store new nodes in an array first. This way we can maintain proper execution order after normalization.
    // Array<name, expr>
    // This way we can decide to create var declarator nodes, or assignment expressions for it afterwards
    const newBindings = [];

    transformFunctionParams(node, body, i, newBindings);

    if (newBindings.length) {
      log('Params were transformed somehow, injecting new nodes into body');
      node.body.body.unshift(...newBindings.map(([name, _fresh, init]) => AST.variableDeclaration(name, init, 'let'))); // let because params are mutable
      return true;
    }

    anyBlock(node.body);

    return false;
  }
  function transformLabeledStatement(node, body, i, parent) {
    log('Label: `' + node.label.name + '`');
    //ASSERT(
    //  !fdata.globallyUniqueLabelRegistery.has(node.label.name) || fdata.globallyUniqueLabelRegistery.get(node.label.name) === true,
    //  'labels should be made unique in phase1',
    //  fdata.globallyUniqueLabelRegistery,
    //  node,
    //);

    // This node should be stored in body.body[i]
    const prop = 'body';
    const index = i;

    //log('--->', parent.type, prop, index)

    if (fdata.globallyUniqueLabelRegistery.has(node.label.name))
      log(
        'Label was already registered. Probably artifact of re-traversal. Overwriting registry with fresh object since it ought to be scoped.',
      );
    log('Registering label `' + node.label.name + '`');
    fdata.globallyUniqueLabelRegistery.set(node.label.name, {
      // ident meta data
      name: node.label.name,
      uniqueName: node.label.name,
      labelNode: {
        parent,
        prop,
        index, // Make sure to update below if the index changes
      },
      usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    });

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

        const changed = anyBlock(fakeWrapper);

        if (!changed) {
          after('Label body did not change at all');
          return false;
        }

        after(AST.labeledStatement(node.label, fakeWrapper));

        if (fakeWrapper.body.length === 1 && fakeWrapper.body[0] === node.body) {
          log('Something changed but the node stays put');
          return false; // No need to change anything in this body
        }

        log('Unregistering label `' + node.label.name + '` because something changed. This declaration will be visited again.');
        fdata.globallyUniqueLabelRegistery.delete(node.label.name); // This node will be revisited so remove it for now

        if (fakeWrapper.body[fakeWrapper.body.length - 1] === node.body) {
          // Only outline the elements preceding the last one. We throw away the wrapper.
          log('Last statement is still original node. Outlining new nodes and keeping original labeled statement');
          body.splice(i, 0, ...fakeWrapper.body.slice(0, -1));
          return true;
        }

        log('Labeled statement changed. Replacing the whole deal.');
        // Outline every element but the last and put them in front of the label. Replace the label
        // with a new label that has the last element as a body. It's a different node now.
        body.splice(
          i,
          1,
          ...fakeWrapper.body.slice(0, -1),
          AST.labeledStatement(node.label, fakeWrapper.body[fakeWrapper.body.length - 1]),
        );

        return true;
      }

      rule('The body of a label must be a block or an iteration statement');
      example('foo: if (x) y;', 'foo: { if (x) y; }');
      before(node);

      const newNode = AST.labeledStatement(node.label, AST.blockStatement(node.body));
      body.splice(i, 1, newNode);

      log('Unregistering label `' + node.label.name + '` because we added a block. This declaration will be visited again.');
      fdata.globallyUniqueLabelRegistery.delete(node.label.name); // This node will be revisited so remove it for now

      after(newNode);
      return true;
    }

    log('label has block, noop');
    const anyChange = anyBlock(node.body);
    log('Changes?', anyChange);
    if (anyChange) {
      log('Unregistering label `' + node.label.name + '` because something changed. This declaration will be visited again.');
      fdata.globallyUniqueLabelRegistery.delete(node.label.name); // This node will be revisited so remove it for now
    }

    return anyChange;
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
      rule('Return argument must be simple');
      example('return $()', 'let tmp = $(); return tmp;');
      before(node);

      // TODO: this may need to be moved to phase2/phase4 because this case might (re)appear after every step
      const tmpName = createFreshVarInCurrentRootScope('tmpReturnArg');
      const newNode = AST.variableDeclaration(tmpName, node.argument, 'const');
      body.splice(i, 0, newNode);
      node.argument = AST.identifier(tmpName);

      after(newNode);
      after(node);
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
      ensureVarDeclsCreateOneBinding(cnode.consequent); // case/default bodies are special blocks

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
      rule('Throw argument must be simple');
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
  function transformVariableDeclaration(node, body, i) {
    if (node.declarations.length !== 1) {
      rule('Var binding decls must introduce one binding');
      log('var a = 1, b = 2', 'var a = 1; var b = 2', () => node.kind === 'var');
      log('let a = 1, b = 2', 'let a = 1; var b = 2', () => node.kind === 'let');
      log('const a = 1, b = 2', 'const a = 1; var b = 2', () => node.kind === 'const');
      before(node);

      const newNodes = node.declarations.map((dec) => AST.variableDeclarationFromDeclaration(dec, node.kind));
      body.splice(i, 1, ...newNodes);

      newNodes.forEach((n) => after(n));
      return true;
    }

    const dnode = node.declarations[0];

    log('Id:', dnode.id.type === 'Identifier' ? '`' + dnode.id.name + '`' : '<pattern>');

    if (dnode.id.type === 'ArrayPattern') {
      rule('Binding array patterns not allowed');
      example('let [x] = y()', 'let tmp = y(), tmp1 = [...tmp], x = tmp1[0]');
      before(node);

      const bindingPatternRootName = createFreshVarInCurrentRootScope('bindingPatternArrRoot'); // TODO: rename to tmp prefix
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
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      log('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
      return true;
    }

    if (dnode.id.type === 'ObjectPattern') {
      rule('Binding object patterns not allowed');
      example('var {x} = y()', 'var tmp = y(), x = obj.x');
      before(node);

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

        after(node);
        return true;
      }

      ASSERT(dnode.init, 'binding patterns are required to have an init');

      log('There were no bindings so replacing the var declaration with its init');
      const newNode = AST.expressionStatement(dnode.init);
      body[i] = newNode;

      after(newNode);
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

    const meta = getMetaForBindingName(dnode.id);
    meta.usages.push(dnode.id);

    if (dnode.init) {
      log('Init:', dnode.init.type);

      if (dnode.init.type === 'AssignmentExpression') {
        // Must first outline the assignment because otherwise recursive calls will assume the assignment
        // is an expression statement and then transforms go bad.
        rule('Var inits can not be assignments');
        example('let x = y = z', 'let x, x = y =z');

        body.splice(i, 1, AST.variableDeclaration(dnode.id), AST.expressionStatement(AST.assignmentExpression(dnode.id, dnode.init)));
        return true;
      }

      if (isComplexNode(dnode.init) && transformExpression('var', dnode.init, body, i, node, dnode.id, node.kind)) {
        return true;
      }
    }

    return false;
  }
  function transformWhileStatement(node, body, i) {
    if (isComplexNode(node.test)) {
      rule('While test must be simple node');
      example('while (f()) z()', 'while (true) { if (f()) z(); else break; }');
      before(node);

      const newNode = AST.whileStatement('true', AST.blockStatement(AST.ifStatement(node.test, node.body, AST.breakStatement())));
      body[i] = newNode;

      after(newNode);
      return true;
    }

    if (node.body.type !== 'BlockStatement') {
      rule('While sub-statement must be block');
      example('while (x) y', 'while (x) { y }');
      before(node);

      const newNode = AST.blockStatement(node.body);
      node.body = newNode;

      after(node);
      return true;
    }

    return false;
  }
}
