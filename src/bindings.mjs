import {
  VERBOSE_TRACING,
  BLUE,
  RESET,
  PRIMITVE_TYPE_NAMES_NOT_STRING,
  PRIMITIVE_TYPE_NAMES_PREVAL,
  ALL_PREVAL_TYPE_NAMES, PRIMITIVE_TYPE_NAMES_TYPEOF,
} from './constants.mjs';
import { IMPLICIT_GLOBAL_PREFIX, SYMBOL_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL, SYMBOL_COERCE, SYMBOL_FRFR, SYMBOL_DOTCALL, } from './symbols_preval.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, source, fmat, tmat, todo } from './utils.mjs';
import globals, {MAX_UNROLL_TRUE_COUNT} from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import * as AST from './ast.mjs';
import { BUILTIN_SYMBOLS, GLOBAL_NAMESPACES_FOR_STATIC_METHODS, symbo } from './symbols_builtins.mjs';

const NONE = 'NONE';
const MUTATES = 'MUTATES';
const COMPLETES = 'COMPLETES';
const LABELS = 'LABELS';

export const GLOBAL_BLOCKCHAIN = '0,1,';

/**
 * @param parentNode
 * @param parentProp
 * @returns {'read' | 'write' | 'readwrite' | 'none' | 'label'}
 */
export function getIdentUsageKind(parentNode, parentProp) {
  // Returns 'read', 'write', 'readwrite', 'none', or 'label'
  // Note: for each parent, answer the question "what does the appearance of an ident in each position of a node mean?"

  // Examples of binding reads. All cases refer to an ident
  // - as expression statement (rare)
  // - object of member expression
  // - rhs of assignment
  // - either side of compound assignment
  // - either side of binary expression
  // - rhs inside for-in/for-of
  // - inside statement header of any kind
  // - callee of call / new
  // - arg of call / new
  // - arg of ++/--
  // - computed property
  // - probably many more?
  // Maybe easier to list write-only cases of bindings
  // - lhs of regular assignment (not compound!)
  // - lhs of for-in/for-of
  // - id of variable declaration
  // - id of func/class
  // - param names
  // - binding names in patterns (not inits)
  // - imported names
  // - catch clause
  // Probably best to make explicit yes/no lists and to warn against unexpected forms

  switch (parentNode.type) {
    case 'ArrayExpression':
      // In all cases it's an element of an array
      ASSERT(parentProp === 'elements');
      return 'read';
    case 'ArrayPattern':
      // In all cases it's a write. If it had a default then it would become an AssignmentPattern.
      // Properties, in the case of destructuring assignment, become member expressions
      ASSERT(parentProp === 'elements');
      return 'write';
    case 'ArrowFunctionExpression':
      // Can only appear as parameter which is always a write
      ASSERT(parentProp === 'params' || parentProp === 'body');
      return 'write';
    case 'AssignmentExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentProp === 'right') return 'read';
      if (parentNode.operator === '=') return 'write';
      return 'readwrite';
    case 'AssignmentPattern':
      // If it appears as a child then it must be left or right
      ASSERT(parentProp === 'left' || parentProp === 'right');
      return parentProp === 'left' ? 'write' : 'read';
    case 'AwaitExpression':
      // Must always be an arg, which is always a read
      ASSERT(parentProp === 'argument');
      return 'read';
    case 'BinaryExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'BlockStatement':
      throw ASSERT(false, 'blocks dont have expression children');
    case 'BreakStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'label';
    case 'CallExpression':
      ASSERT(
        parentProp === 'callee' || parentProp === 'arguments',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'CatchClause':
      ASSERT(parentProp === 'param', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'ChainExpression':
      throw ASSERT(false, 'chain elements have member and call expressions as children');
    case 'ClassBody':
      throw ASSERT(false, 'class bodies have methods as children', parentNode.type, '.', parentProp, parentNode);
    case 'ClassDeclaration':
      ASSERT(
        parentProp === 'id' || parentProp === 'superClass',
        'ident can only be a child of class when it is the id',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'superClass') return 'read';
      return 'write';
    case 'ClassExpression':
      ASSERT(
        parentProp === 'id' || parentProp === 'superClass',
        'ident can only be a child of class when it is the id',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'superClass') return 'read';
      return 'write';
    case 'ConditionalExpression':
      ASSERT(parentProp === 'test' || parentProp === 'consequent' || parentProp === 'alternate', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'ContinueStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'label';
    case 'DebuggerStatement':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'Directive':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'DoWhileStatement':
      ASSERT(parentProp === 'body' || parentProp === 'test', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'EmptyStatement':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'ExportAllDeclaration':
      ASSERT(parentProp === 'exported', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'none';
    case 'ExportDefaultDeclaration':
      ASSERT(parentProp === 'declaration', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'ExportNamedDeclaration':
      throw ASSERT(false, 'I dont think ident can be a direct child here');
    case 'ExportSpecifier':
      ASSERT(
        parentProp === 'local' || parentProp === 'exported',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'local') return 'read';
      return 'none';
    case 'ExpressionStatement':
      ASSERT(parentProp === 'expression', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'ForInStatement':
      ASSERT(
        parentProp === 'left' || parentProp === 'right' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'left') return 'write';
      return 'read';
    case 'ForOfStatement':
      ASSERT(
        parentProp === 'left' || parentProp === 'right' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'left') return 'write';
      return 'read';
    case 'ForStatement':
      ASSERT(
        parentProp === 'init' || parentProp === 'test' || parentProp === 'update' || parentProp === 'body',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'FunctionDeclaration':
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'FunctionExpression':
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'Identifier':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'IfStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'ImportDeclaration':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'ImportDefaultSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'ImportNamespaceSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'ImportSpecifier':
      ASSERT(
        parentProp === 'local' || parentProp === 'imported',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      if (parentProp === 'local') return 'write';
      return 'none';
    case 'LabeledStatement':
      ASSERT(parentProp === 'label' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentProp === 'label') return 'label';
      return 'read';
    case 'Literal':
      throw ASSERT(false, 'literals do not have ident children');
    case 'LogicalExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'MemberExpression':
      ASSERT(
        parentProp === 'object' || parentProp === 'property',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      // While assignment to property doesn't necessarily read the binding, it's also not a mutation of the binding.
      // Therefor for all intentions and purposes we consider this case a read, even if it's a write to the object.
      // If the grandNode is not an assignment then it's a read either way
      if (parentProp === 'object') return 'read';
      if (parentNode.computed) return 'read';
      if (parentProp !== 'property') source(parentNode, true);
      ASSERT(parentProp === 'property', 'is there any other way for this ident to be the object or property? ' + parentNode.type + ', ' + parentProp, parentNode);
      return 'none';
    case 'MetaProperty':
      ASSERT(parentProp === 'meta' || parentProp === 'property', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentNode.computed) return 'read';
      return 'none';
    case 'MethodDefinition':
      ASSERT(parentProp === 'key', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentNode.computed) return 'read';
      return 'none';
    case 'NewExpression':
      ASSERT(
        parentProp === 'callee' || parentProp === 'arguments',
        'unexpected parent prop that has ident',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'ObjectExpression':
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement', parentNode);
    case 'ObjectPattern':
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement', parentNode);
    case 'Program':
      throw ASSERT(false, 'this probably means you forgot to wrap an ident in an expression statement...', parentNode);
    case 'Property':
      ASSERT(parentProp === 'key' || parentProp === 'value', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentProp === 'key') {
        if (parentNode.computed) return 'read';
        return 'none';
      }
      return 'read';
    case 'RestElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'write';
    case 'ReturnStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'SequenceExpression':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'SpreadElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'Super':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'SwitchCase':
      ASSERT(
        parentProp === 'test',
        'if the ident is a child of the consequent then it will be a statement',
        parentNode.type,
        '.',
        parentProp,
      );
      return 'read';
    case 'SwitchStatement':
      ASSERT(parentProp === 'discriminant', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'TaggedTemplateExpression':
      ASSERT(parentProp === 'tag', 'the expressions are wrapped in a TemplateElement', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'TemplateElement':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'TemplateLiteral':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'ThisExpression':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'ThrowStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'TryStatement':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'UnaryExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      // Note: none of the unary operators currently mutate. (++/-- are update expressions)
      return 'read';
    case 'UpdateExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'readwrite';
    case 'VarStatement': {
      ASSERT(parentProp === 'id' || parentProp === 'init', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentProp === 'id') return 'write';
      return 'read';
    }
    case 'VariableDeclaration':
      throw ASSERT(false, 'normalized code does not have this node: ', parentNode.type, parentNode);
    case 'VariableDeclarator':
      // Apparently this is called before normalization, as well, so gotta keep this
      ASSERT(parentProp === 'id' || parentProp === 'init', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      if (parentProp === 'id') return 'write';
      return 'read';
    case 'WhileStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'WithStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
    case 'YieldExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp, parentNode);
      return 'read';
  }
  throw ASSERT(false, 'Support this new node', parentNode, parentNode);
}

export function generateUniqueGlobalName(name, fdata, assumeDoubleDollar = false) {
  ASSERT(!assumeDoubleDollar || name.startsWith('$$'), 'if assuming double dollar, we should receive one');
  if (!assumeDoubleDollar && name.startsWith('$$')) {
    if (/^\$\$\d/.test(name)) {
      return generateUniqueGlobalName('$dlr_' + name, fdata);
    }
    if (/^\$\$\d+$/.test(name)) console.log('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast, true), true) + '\n--------------\n');
    ASSERT(!/^\$\$\d+$/.test(name), 'param placeholders should not reach this place');
    // TODO: assert this is the normal_once step and make sure it never happens elsewhere
    return generateUniqueGlobalName('tmp' + name.slice(2), fdata);
  }
  if (name === '$$') {
    // Prevent accidentally generating $$1 (those are special param names)
    name = '_' + name;
  }
  if (name === '$') {
    // This is a special test symbol. Rename local variables with this name.
    name = '_$';
  }

  const globallyUniqueNamingRegistry = fdata.globallyUniqueNamingRegistry;

  if (globallyUniqueNamingRegistry.has(name)) {
    // Cache the offset otherwise large inputs will literally test every suffix 1 through n which causes perf problems
    const identNameSuffixOffset = fdata.identNameSuffixOffset;

    // No point in having a `foo$1$22$1$1$1$1$1$1$1$1$1$1$1$1$1`
    if (name.includes('$')) {
      name = name.replace(/\$\d+$/, '');
    }

    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = identNameSuffixOffset.get(name) ?? 0;

    while (globallyUniqueNamingRegistry.has(name + '$' + ++n));
    identNameSuffixOffset.set(name, n + 1);

    return n ? name + '$' + n : name;
  }

  return name;
}
export function registerGlobalIdent(
  fdata,
  name,
  originalName,
  { isExport = false, isImplicitGlobal = false, isBuiltin = false, ...rest } = {},
) {

  if (/^\$\$\d+$/.test(name)) console.log('\nCurrent state\n--------------\n' + fmat(tmat(fdata.tenkoOutput.ast, true), true) + '\n--------------\n');
  ASSERT(!/^\$\$\d+$/.test(name), 'param placeholders should not reach this place either', name, originalName);
  ASSERT(Object.keys(rest).length === 0, 'invalid args', rest);

  const meta = fdata.globallyUniqueNamingRegistry.get(name);
  if (meta) return meta;

  const newMeta = {
    // ident meta data
    uid: fdata.globallyUniqueNamingRegistry.size,
    originalName,
    uniqueName: name,
    isExport, // exports should not have their name changed. we ensure this as the last step of this phase.
    isImplicitGlobal, // There exists explicit declaration of this ident. These can be valid, like `process` or `window`. Currently also `catch` clause bindings.
    isExplicitVar: false, // Set from phase1 in the var decl case
    isLet: false, // Set from phase1 in the var decl case when it is actually a let
    isConstant: false, // Set from phase1 in the var decl case when it is actually a const
    //varDeclRef, // {node:init,varDeclNode,varDeclBody,varDeclIndex}. Set from phase1 in the var delc case, regardless of const/let. varDeclBody[varDeclIndex] === varDeclNode
    isCatchVar: false, // Set by phase1 TryStatement:after on catch vars
    isBuiltin, // Make a distinction between known builtins and unknown builtins.
    isTernaryConst: false, // Set in phase1_1 if verified to be true. When true, all reads of this binding always return the same value regardless of branching. When writes=3, the init is not observed. Consider the reads to be the same as a const. It's just not an actual const. (Artifact of ternary `const x = a?b:c` which Preval always modesls as if-else).
    //ternaryWritesIgnoreFirst, Set in phase1_1 if ternary const and first write is not observed
    bfuncNode: undefined, // Function scope where this binding was bound. Undefined for builtins/implicits/Program. Should be set for anything else (which is only var decls after normalization).
    singleScoped: undefined, // bool. Is there any reference inside a different scope from another ref? Set at the end of phase1.
    //singleScopeWrites: undefined, // bool. Are all writes to this binding happening in the same scope? Set at the end of phase1. (Always true for constants)
    //singleScopeReads: undefined, // bool. Are all reads of this binding happening in the same scope? Set at the end of phase1.
    tainted: false, // For single rules, mark an identifier dirty, consider its caches potentially busted, requiring another phase1 first.
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
    rwOrder: [], // Array<read|write>. Sorted in DFS order ASC, once at the start of phase2
    writes: [], // {parent, prop, index} indirect reference ot the node being assigned. In phase1 (only); If not implicit/builtin then the first write should be the decl. Note that reads and writes can legally appear in source/ast before decl.
    reads: [], // {parent, prop, index} indirect reference to the node that refers to this binding

    // Prepare phase
    renamingReads: [], // node. Only in prepare phase. Used after main prepare loop to uniquely name bindings. Note: set to null after renamed the binding.
    renamingWrites: [], // node. Only in prepare phase. Used after main prepare loop to uniquely name bindings. Note: set to null after renamed the binding.
    preNormalizeTdzCheckList: [], // {node, parentNode, parentProp, parentIndex, grandNode, grandProp, grandIndex} Only after main prepare loop, used to prune TDZ bindings
    preNormalizeTdzCheckDecl: null, // node. If this is a let/const binding then this should be the (ident) node that declares it.

    // Phase1 collects typing information
    // Note: This should be typing information that holds for any point in the life cycle of the binding
    //       For constants that's easy but for lets this severely restricts what we can track. In most cases just the typeof.
    //       See getCleanTypingObject()
    typing: getCleanTypingObject(), // Set in phase1 and phase1.1
    // hasRangeCheck: false, // Set in phase1, used in phase1.1 to determine isRangeBound
    // isRangeBound: false, // Set in phase1, used in phase1.1, when true we know the lower and upper limits of this number ref.
    // rangeMin: false, // Set in phase1, used in phase1.1, when isRangeBound is true, this is the lower bound
    // rangeMax: false, // Set in phase1, used in phase1.1, when isRangeBound is true, this is the upper bound
    // rangeStep: false, // Set in phase1, used in phase1.1, when isRangeBound is true, this is the step value

    // Array<undefined | ReturnType<getPrimitiveType>>, available after phase1.1
    // Only set for functions that get called at least once. And only for "ident" calls (that
    // means `f()` not `x.f()` kinds of calls). Consumer still has to verify the function does
    // not escape. If a param index is "undefined" then either a call did not have a primitive
    // there, or two calls had different primitives there. Otherwise, all ident-calls had the
    // same primitive in that index.
    // - `['string']` -> func was called with one string in all cases
    // - `[undefined]` -> either no call had a primitive as first arg, or multiple calls had different types here
    // - `undefined` -> not reliable, ignore (if still undef after phase1.1)
    callerArgs: undefined, // set in phase1.1
  };
  ASSERT(name);
  ASSERT(!/^\$\$\d+$/.test(name), 'Should not be calling this function for special param name idents $$123');

  fdata.globallyUniqueNamingRegistry.set(name, newMeta);
  return newMeta;
}
export function createDoubleDollar(name, fdata) {
  ASSERT(createFreshVar.length === arguments.length, 'arg count');
  // The main difference between createFreshVar is that tmp is not force-prefixed to the double dollar name
  const tmpName = generateUniqueGlobalName(name, fdata, true);
  registerGlobalIdent(fdata, tmpName, tmpName);
  return tmpName;
}
export function createFreshVar(name, fdata) {
  ASSERT(createFreshVar.length === arguments.length, 'arg count');
  const tmpName = generateUniqueGlobalName(name, fdata, false);
  registerGlobalIdent(fdata, tmpName, tmpName);
  return tmpName;
}

export function createReadRef(obj) {
  const {
    name, // The var name, unique in this scope. Owner meta should have the same name.
    kind,
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    parentBlockNode, // node containing the array blockBody
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope, // pid of func scope node (or program)
    blockChain, // Always has trailing comma. You can do scope checks with something like `write.blockChain.startsWith(decl.blockChain + ',')` -> "can write reach decl?"
    blockIds, // Array of blockChain
    blockBodies, // arrays of statements that is block.body or program.body. 1:1 with blockIndexes
    blockIndexes, // Indexes per each element of blockChain and blockBodies
    ifChain, // string of if-node pids separated by trailing comma. always is or starts with `0,`
    funcChain, // string, list comma padded pids of parent functions leading to program (which will add `0,`). All function nodes should have this as: $.p.funcChain
    innerLoop, // number, pid of the top of the loop stack, or 0 if thats program/function
    innerIf, // number. pid of nearest if-node that branches this var. Note: the if-test is not branched by the if-node it is testing for, but its parent.
    innerThen, // number, pid of nearest consequent block that scopes this ref
    innerElse, // number, pid of nearest alternate block that scopes this ref
    innerTry,
    innerTrap,
    innerCatch,

    ...rest
  } = obj;
  ASSERT(typeof kind === 'string');
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createReadRef in the func too!', rest);
  ASSERT(blockIndex >= 0);
  ASSERT(typeof innerLoop === 'number', 'inner loop?', innerLoop);
  ASSERT(typeof innerIf === 'number', 'inner if?', innerIf);
  ASSERT(typeof innerThen === 'number', 'inner then?', innerThen);
  ASSERT(typeof innerElse === 'number', 'inner else?', innerElse);
  ASSERT(blockChain);
  ASSERT(parentBlockNode?.body === blockBody);
  ASSERT(blockIds instanceof Array);
  ASSERT(blockBodies instanceof Array && blockBodies.every((a) => Array.isArray(a)));
  ASSERT(blockIndexes instanceof Array);
  ASSERT(blockBodies.length === blockIndexes.length, 'each block body should have an index', blockBodies, blockIndexes);
  ASSERT(ifChain);
  ASSERT(funcChain);

  return {
    name,
    action: 'read',
    kind, // "export" | "read"
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    parentBlockNode, // node containing the array blockBody
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope, // pid of func scope or program
    blockChain,
    blockIds,
    blockBodies,
    blockIndexes,
    ifChain,
    funcChain,
    innerLoop,
    innerIf,
    innerThen,
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,

    reachesWrites: new Set(), // Set<Write>. All writes this read can "reach" (might "observe", syntactically speaking)
  };
}
export function createWriteRef(obj) {
  const {
    name, // The var name, unique in this scope. Owner meta should have the same name.
    kind, // var, assign, catcher, importee, other (-> class id), ..?
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    parentBlockNode, // node containing the array blockBody
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain, // Always has trailing comma. You can do scope checks with something like `write.blockChain.startsWith(decl.blockChain + ',')` -> "can write reach decl?"
    blockIds, // Array of blockChain
    blockBodies, // arrays of statements that is block.body or program.body. 1:1 with blockIndexes
    blockIndexes, // Indexes per each element of blockChain and blockBodies
    ifChain,
    funcChain,
    innerLoop,
    innerIf,
    innerThen,
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,

    ...rest
  } = obj;
  ASSERT(['var', 'assign', 'catcher', 'assignee', 'importee', 'other'].includes(kind), 'update write kind', kind);
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createWriteRef in the func too!', rest);
  ASSERT(blockIndex >= 0);
  ASSERT(typeof innerLoop === 'number');
  ASSERT(typeof innerIf === 'number');
  ASSERT(typeof innerThen === 'number');
  ASSERT(typeof innerElse === 'number');
  ASSERT(blockChain);
  ASSERT(parentBlockNode?.body === blockBody);
  ASSERT(blockIds instanceof Array);
  ASSERT(blockBodies instanceof Array && blockBodies.every((a) => Array.isArray(a)));
  ASSERT(blockIndexes instanceof Array);
  ASSERT(blockBodies.length === blockIndexes.length, 'each block body should have an index', blockBodies, blockIndexes);
  ASSERT(ifChain);
  ASSERT(funcChain);

  return {
    name,
    action: 'write',
    kind,
    parentNode,
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody,
    blockIndex,
    parentBlockNode, // node containing the array blockBody
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain,
    blockIds,
    blockBodies,
    blockIndexes,
    ifChain,
    funcChain,
    innerLoop,
    innerIf,
    innerThen,
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,

    // Ref tracking:
    reachedByReads: new Set(), // Set<Read>. All reads that can "reach" this write (might "observe", syntactically speaking)
    reachedByWrites: new Set(), // Set<Read>. All writes that can "reach" this write (this write shadows theirs)
    reachesWrites: new Set(), // Set<Write>. The previous writes to this binding this write can reach. Used for redundant let write detection.
  };
}

export function findUniqueNameForBindingIdent(node, isFuncDeclId = false, fdata, lexScopeStack, ignoreGlobals = false) {
  const globallyUniqueNamingRegistry = fdata.globallyUniqueNamingRegistry;
  ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
  vlog('Finding unique name for `' + node.name + '`. Lex stack size:', lexScopeStack.length);
  let index = lexScopeStack.length;
  if (isFuncDeclId) {
    // The func decl id has to be looked up outside its own inner scope
    vlog('- Starting at parent because func decl id');
    --index;
  }
  while (--index >= 0) {
    if (VERBOSE_TRACING) {
      vlog(
        '- Checking lex level',
        index,
        ' (' + lexScopeStack[index].type + '): lex id:',
        lexScopeStack[index].$p.lexScopeId,
        ':',
        lexScopeStack[index].$p.nameMapping.has(node.name),
      );
    }
    if (lexScopeStack[index].$p.nameMapping.has(node.name)) {
      vlog('  - found in', index)
      break;
    }
  }

  if (index < 0) {
    let globalName = node.name;
    if (ignoreGlobals) return globalName; // Ignore the globals. Assume they are already handled (function cloning)
    vlog('- The ident `' + globalName + '` could not be resolved and is an implicit global (potentially builtin)');
    if (
      globalName.startsWith(IMPLICIT_GLOBAL_PREFIX) ||
      (globallyUniqueNamingRegistry.has(globalName) && !globallyUniqueNamingRegistry.get(globalName).isImplicitGlobal)
    ) {
      // Rename all implicit globals first. Then do a second sweep for all implicit globals and rename
      // all explicits with the same name to avoid collisions, after which the implicits can be renamed
      // back to their initial (implicit global) name, since those names must be maintained as we don't
      // control the final/target environment.
      globalName = IMPLICIT_GLOBAL_PREFIX + globalName;
      vlog('  Will temporarily prefix the implicit global tag to avoid collisions, initially;', globalName);
    }

    // Register one...
    vlog('Creating unique name for `' + globalName + '`');
    const uniqueName = generateUniqueGlobalName(globalName, fdata);
    vlog('Resulting uniqueName:', uniqueName, ', this will be the temp name for this reference');
    const meta = registerGlobalIdent(fdata, uniqueName, node.name, { isImplicitGlobal: true });
    if (VERBOSE_TRACING) {
      vlog('- Meta:', {
        ...meta,
        reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
        writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
      });
    }
    lexScopeStack[0].$p.nameMapping.set(globalName, uniqueName);
    return uniqueName;
  }

  const uniqueName = lexScopeStack[index].$p.nameMapping.get(node.name);
  ASSERT(uniqueName !== undefined, 'should exist');
  vlog('- Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
  const meta = globallyUniqueNamingRegistry.get(uniqueName);
  if (VERBOSE_TRACING) {
    vlog('- Meta:', {
      ...meta,
      reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
      writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
    });
  }
  ASSERT(meta, 'the meta should exist for all declared variables at this point');
  return uniqueName;
}
export function preprocessScopeNode(node, parentNode, fdata, funcNode, lexScopeCounter, oncePass, unrollLimit = 10) {
  ASSERT(arguments.length === preprocessScopeNode.length || arguments.length === preprocessScopeNode.length + 1, 'arg count', arguments.length, preprocessScopeNode.length);
  // This function attempts to find all binding names defined in this scope and create unique name mappings for them
  // (This doesn't update any read/write nodes with their new name! Only prepares their new name to be used and unique.)

  ASSERT(typeof unrollLimit === 'number' && unrollLimit >= 0, 'should receive a unrollLimit', unrollLimit);
  if (unrollLimit > MAX_UNROLL_TRUE_COUNT) {
    throw new Error('unrollLoopWithTrue; The unrollLimit (' + unrollLimit + ') is bigger than the hardcoded max MAX_UNROLL_TRUE_COUNT of ' + MAX_UNROLL_TRUE_COUNT);
  }

  ASSERT(node.$scope);
  ASSERT(
    [
      'Program',
      'FunctionExpression',
      'ArrowFunctionExpression',
      'FunctionDeclaration',
      'BlockStatement',
      'SwitchStatement',
      'ForStatement',
      'ForInStatement',
      'ForOfStatement',
      'CatchClause',
    ].includes(node.type),
    'what else has a $scope?',
    node.type,
  );

  if (['Program', 'FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(node.type)) {
    // The idea for hoistedVars is that we need to be able to remove/replace the initial var/func decl node
    // For the export, we need to know the index where it is located so we can remove it.
    // For the other cases that won't be necessary.
    node.$p.hoistedVars /*: Array<[
          node, // the var/func decl
          parentNode, // the node that holds the var decl (global/func/block/for/export node)
          prop, // parentNode[prop] --> node, if index<0
          index, // parentNode[prop][index] --> node, if index>=0
          exportIndex, // if node is an export, global.body[exportIndex] == parentNode
        ]> */ = [];
  }
  if (['BlockStatement', 'SwitchStatement'].includes(node.type)) {
    node.$p.hoistedVars = [];
  }

  node.$p.lexScopeId = lexScopeCounter;
  node.$scope.$sid = lexScopeCounter;

  vgroup(BLUE + 'Scope tracking' + RESET, 'scope id=', lexScopeCounter);

  // Assign unique names to bindings to work around lex scope shadowing `let x = 1; { let x = 'x'; }`
  // This allows us to connect identifier binding references that belong together, indeed together, and distinct a
  // binding from its shadow by the same name. Otherwise in the previous example, we'd never know "which" x is x.

  // lex binding can look up its unique global name through this (nearest) mapping
  if (node.type === 'Program') {
    // global scope
    node.$p.nameMapping = new Map([...globals.keys()].map((k) => [k, k]));

    for (let i=0; i<=unrollLimit; ++i) {
      // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc
      // Special symbols whose number suffix has semantic meaning
      node.$p.nameMapping.set(`${SYMBOL_LOOP_UNROLL}${i}`, `${SYMBOL_LOOP_UNROLL}${i}`);
    }
    // $LOOP_DONE_UNROLLING_ALWAYS_TRUE
    // "signals not to unroll any further, but to treat this as "true" anyways"
    node.$p.nameMapping.set(SYMBOL_MAX_LOOP_UNROLL, SYMBOL_MAX_LOOP_UNROLL);

  } else {
    // non-global scope
    node.$p.nameMapping = new Map([
      ['this', 'this'],
      ['arguments', 'arguments'],
    ]);
  }

  /** @var {{names: Map<string, number>, type: number, parent: Node, $sid: number}} s This is Tenko's special scope object **/
  let s = node.$scope;
  ASSERT(
    ['FunctionExpression', 'FunctionDeclaration'].includes(node.type) ? s.type === Tenko.SCOPE_LAYER_FUNC_BODY : true,
    'scope type is body, which we ignore (perhaps not for arrows?)',
    node.$scope,
  );

  do {
    vgroup('Checking scope... (sid=', s.$sid, ')');
    vlog('- type:', s.type, ', bindings?', s.names === Tenko.HAS_NO_BINDINGS ? 'no' : 'yes, ' + s.names.size);

    if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
      vlog('Breaking for function header scopes in Block');
      vgroupEnd();
      break;
    }

    if (s.names === Tenko.HAS_NO_BINDINGS) {
      vlog('- no bindings in this scope, parent:', s.parent && s.parent.type);
    } else if (
      ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(node.type) &&
      s.type === Tenko.SCOPE_LAYER_FUNC_BODY
    ) {
      vlog('- ignoring scope body in function node');
    } else if (node.type === 'CatchClause' && s.type !== Tenko.SCOPE_LAYER_CATCH_HEAD && s.type !== Tenko.SCOPE_LAYER_CATCH_BODY) {
      vlog('- in catch clause we only care about the two catch scopes');
      vgroupEnd();
      break;
    } else if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_GLOBAL) {
      vlog('- do not process global scope in block');
      vgroupEnd();
      break;
    } else if (
      node.type === 'BlockStatement' &&
      s.type === Tenko.SCOPE_LAYER_FUNC_BODY &&
      !['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(parentNode.type)
    ) {
      vlog('- do not process func scope in a block that is not child of a function');
      vgroupEnd();
      break;
    } else {
      s.names.forEach((v, name) => {
        if (v === Tenko.BINDING_TYPE_VAR && funcNode !== node) {
          // only process `var` bindings in the scope root
          vlog('  - skipping var because not scope root');
          return;
        }

        if (v === Tenko.BINDING_TYPE_FUNC_VAR && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
          vlog('  - skipping func var in param layer or global layer');
          return;
        }

        if (!oncePass && (s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS || s.type === Tenko.SCOPE_LAYER_ARROW_PARAMS)) {
          vlog('  - Skipping params because this is not the first pass?');
          return;
        }

        if (parentNode?.type === 'CatchClause') {
          // Not sure if Tenko bug or ... but this is causing redundant var renaming when defined in catch scopes
          vlog('  - Skipping double catch scope');
          return;
        }

        if (name === '$free') {
          vlog('  - Skipping special $free function ID');
          return;
        }

        const uniqueName = generateUniqueGlobalName(name, fdata);
        vlog('Adding', name, 'to globallyUniqueNamingRegistry -->', uniqueName);
        registerGlobalIdent(fdata, uniqueName, name);
        node.$p.nameMapping.set(name, uniqueName);
      });
    }

    vgroupEnd();

    // Only certain nodes have hidden scopes to process. For any other node do not process the parent.
    if (
      !['FunctionExpression', 'ArrowFunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration', 'CatchClause'].includes(
        node.type,
      )
    ) {
      break;
    }
  } while (s.type !== Tenko.SCOPE_LAYER_GLOBAL && (s = s.parent));

  if (VERBOSE_TRACING) {
    vgroupEnd();

    // Each node should now be able to search through the lexScopeStack, and if any of them .has() the name, it will
    // be able to .get() the unique name, which can be used in either the root scope or by the compiler in phase2.
    vlog('Scope', lexScopeCounter, '; ' + node.type + '.$p.nameMapping:');
    vlog(
      new Map(
        [...node.$p.nameMapping.entries()].filter(([tid]) =>
          node.type === 'Program' ? !globals.has(tid) : !['this', 'arguments'].includes(tid),
        ),
      ),
    );
  }
}

export function findBoundNamesInVarDeclaration(node, names = []) {
  ASSERT(node.type === 'VariableDeclaration', 'should be pre-normalized code so regular var decls', node.type, node);
  node.declarations.forEach(dnode => findBoundNamesInVarDeclaratorOrVarStatement(dnode, names));
}
export function findBoundNamesInVarDeclaratorOrVarStatement(node, names = []) {
  if (node.id.type === 'Identifier') {
    names.push(node.id.name);
    return names;
  }

  ASSERT(node.id.type === 'ObjectPattern' || node.id.type === 'ArrayPattern', 'theres no other kind of decl..?');

  function r(node, names) {
    if (node.type === 'ObjectPattern') {
      node.properties.forEach((pnode) => {
        if (pnode.type !== 'RestElement') {
          let value = pnode.value;
          if (value.type === 'AssignmentPattern') {
            ASSERT(value.left, 'so it has a left right?', value);
            value = value.left;
            ASSERT(value.type !== 'RestElement', 'rest not allowed to have init');
          }
          if (value.type === 'Identifier') {
            names.push(value.name);
          } else {
            ASSERT(value.type === 'ArrayPattern' || value.type === 'ObjectPattern', 'arr/obj pattern or bust', pnode);
            r(value, names);
          }
        }
      });
    } else if (node.type === 'ArrayPattern') {
      node.elements.forEach((enode) => {
        if (enode?.type !== 'RestElement') {
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

  r(node.id, names);

  return names;
}

export function getCleanTypingObject() {
  // All values start as undefined to mean "undetermined". Most values use `null` or `false` as meaning "indeterminable".

  return {
    sname: undefined, // -> symbol, like $string_replace

    mustBeType: undefined, // undefined|false|enum: core pillar of preval. Undefined means undetermined. When false, the type could not be determined safely (into a single type or at all).
    mustBeFalsy: undefined, // undefined|bool: only true if value is known to be one of: false, null, undefined, 0, -0, '', NaN. When false, known not to (always) be falsy.
    mustBeTruthy: undefined, // undefined|bool: only true if known to be a value that is not one of the falsy ones :) When false, known not to (always) be truthy.
    mustBePrimitive: undefined, // When we don't know the actual type but we know it must be a primitive. Used to determine if something might spy curing coercion

    bang: undefined, // undefined|bool. Was this explicitly the result of applying `!x`? When false, known not to always be the case.
    oneBitAnded: undefined, // number. If set, this value is the result of applying the bitwise AND operator and this single bit value to an arbitrary value. In other words, either this bit is set or unset on this value.
    anded: undefined, // number. If set, this value is the result of bitwise AND an arbitrary value with this value
    orredWith: undefined, // number. If set, this meta is the result of a bitwise OR expression with this literal and an unknown value
    xorredWith: undefined, // number. If set, this meta is the result of a bitwise XOR expression with this literal and an unknown value

    returns: undefined, // Set<'undefined' | 'null' | 'boolean' | 'number' | 'string' | 'primitive' | '?'>, // Set for constant functions in phase1.1 or by builtins
  };
}
export function getUnknownTypingObject() {
  // All values are set to the "cannot be determined" state. For example, this is used for implicit globals.

  return {
    sname: false,

    mustBeType: false,
    mustBeFalsy: false,
    mustBeTruthy: false,
    mustBePrimitive: false,

    bang: false,
    oneBitAnded: false,
    anded: false,
    orredWith: false,
    xorredWith: false,

    returns: undefined,
  };
}
export function createTypingObject({
  sname = false,

  mustBeType = false,
  mustBeFalsy = false,
  mustBeTruthy = false,
  mustBePrimitive = false,

  bang = false,
  oneBitAnded = false,
  anded = false,
  orredWith = false,
  xorredWith = false,

  maxlen = false,
  returns = false,
  ...rest
}) {
  ASSERT(Object.keys(rest).length === 0, 'add new keys', rest);
  return {
    sname,

    mustBeType,
    mustBeFalsy,
    mustBeTruthy,
    mustBePrimitive,

    bang,
    oneBitAnded,
    anded,
    orredWith,
    xorredWith,

    maxlen,
    returns,
  };
}
export function inferNodeTyping(fdata, valueNode, allowIdentResolve) {
  ASSERT(arguments.length === inferNodeTyping.length, 'arg count');
  vgroup();
  const r = _inferNodeTyping(fdata, valueNode, allowIdentResolve);
  vgroupEnd();
  ASSERT(r && typeof r === 'object', 'inferNodeTyping must return a typing object', r, valueNode);
  return r;
}
function _inferNodeTyping(fdata, valueNode, allowIdentResolve) {
  ASSERT(arguments.length === _inferNodeTyping.length, 'arg count');
  // Assumes >= phase1 (so normalized code)
  // Given a node `init`, determine the initial typing for this meta.
  // During normalization and phase1, mustBeType is unreliable or unset so then allowIdentResolve=false.

  ASSERT(valueNode, 'should receive value node', valueNode);
  ASSERT(valueNode.$p, 'nodes should be processed at this point so .$p should exist', valueNode);

  if (AST.isPrimitive(valueNode)) {
    const value = AST.getPrimitiveValue(valueNode);

    return createTypingObject({
      mustBeType: value === null ? 'null' : typeof value,
      mustBeTruthy: !!value,
      mustBeFalsy: !value,
      mustBePrimitive: true,
    });
  }

  switch (valueNode.type) {
    case 'Literal': {
      if (valueNode.raw[0] === '/') {
        // Should this still hit?
        vlog('- Node is a regex literal');
        return createTypingObject({
          mustBeType: 'regex',
          mustBeTruthy: true,
          mustBePrimitive: false,
        });
      }
      throw ASSERT(false, 'support this literal kind', valueNode);
    }
    case 'TemplateLiteral': {
      ASSERT(
        valueNode.expressions.length,
        'it would be a primitive if there werent any expressions (that case is checked before the switch)',
      );
      vlog('- Node is a template literal');
      return createTypingObject({
        mustBeType: 'string',
        mustBePrimitive: true,
        mustBeFalsy: false, // We can't tell for sure it's falsy. But it may be anyways.
        mustBeTruthy: valueNode.quasis.some((te) => te.value.cooked !== ''), // Or if any expression is non-falsy
      });
    }
    case 'Identifier': {
      if (valueNode.name === 'arguments' && valueNode.$p.funcDepth > 1) {
        vlog('- Node is `arguments` so the ident is our arguments alias');
        return createTypingObject({
          mustBeType: 'arguments',
          mustBeTruthy: true,
          mustBeFalsy: false,
          mustBePrimitive: false
        });
      }

      if (allowIdentResolve) {
        const meta = fdata.globallyUniqueNamingRegistry.get(valueNode.name);
        vlog('- Node is an identifier; mustbetype=', meta.typing.mustBeType);
        return createTypingObject(meta.typing);
      } else {
        // Not allowed during normalization
        return createTypingObject({});
      }
    }
    case 'ThisExpression': {
      vlog('- Node is a `this`');
      // Note: this may be `undefined`: `f.call(undefined)` works.
      return createTypingObject({
        // mustBeType: 'object',
        // mustBePrimitive: false,
        // mustBeTruthy: true,
      });
    }
    case 'UnaryExpression': {
      vlog('- Node is a unary with operator', valueNode.operator);
      switch (valueNode.operator) {
        case 'delete':
          return createTypingObject({
            mustBeType: 'boolean',
            mustBePrimitive: true,
          });
        case 'void':
          ASSERT(false, 'normalized code should not contain `void`');
          break;
        case '+':
        case '-':
        case '~':
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
          });
        case '!': {
          return createTypingObject({
            mustBeType: 'boolean',
            mustBePrimitive: true,
            bang: true,
          });
        }
        case 'typeof': {
          return createTypingObject({
            mustBeType: 'string',
            mustBePrimitive: true,
            mustBeTruthy: true,
          });
        }
        default:
          ASSERT(false, 'normalized code does not have this unary operator: ' + valueNode.operator);
      }
      return;
    }
    case 'AwaitExpression': {
      vlog('- Node is an await');
      return inferNodeTyping(fdata, valueNode.argument, allowIdentResolve);
    }
    case 'YieldExpression': {
      // mmm the value of a yield is not the argument but the argument for the .next() call, which we won't know here. So we know nothing.
      vlog('- Node is a yield');
      todo('would this not be the same as await? would we not want to infer the arg here?');
      return createTypingObject({});
    }
    case 'BinaryExpression': {
      vlog('- Node is a binary expression with operator:', valueNode.operator);
      switch (valueNode.operator) {
        case '===':
        case '==':
        case '!==':
        case '!=':
        case '<':
        case '<=':
        case '>':
        case '>=':
        case 'in':
        case 'instanceof': {
          return createTypingObject({
            mustBeType: 'boolean',
            mustBePrimitive: true,
          });
        }
        case '-':
        case '*':
        case '/':
        case '%':
        case '>>':
        case '>>>':
        case '<<':
        case '**': {
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
          });
        }
        case '&': {
          // Need a number on at least one side. Ignore negative numbers (unary expression).
          if (AST.isPrimitive(valueNode.left)) {
            const v = AST.getPrimitiveValue(valueNode.left) | 0;
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              ... v === 0 ? {mustBeFalsy: true} : {},

              oneBitAnded: isOneSetBit(v) ? v : undefined,
              anded: v,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            const v = AST.getPrimitiveValue(valueNode.right) | 0;
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              ... v === 0 ? {mustBeFalsy: true} : {},

              oneBitAnded: isOneSetBit(v) ? v : undefined,
              anded: v,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
          });
        }
        case '^': {
          if (AST.isPrimitive(valueNode.left)) {
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              xorredWith: AST.getPrimitiveValue(valueNode.left) | 0,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              xorredWith: AST.getPrimitiveValue(valueNode.right) | 0,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
          });
        }
        case '|': {
          // Special case: when either side is a non-zero number, the result is truthy
          let truthy = false;
          if (AST.isPrimitive(valueNode.left)) {
            const pv = AST.getPrimitiveValue(valueNode.left) | 0;
            truthy = !!pv;
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              ...truthy ? {mustBeTruthy: true} : {},
              orredWith: pv,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            const pv = AST.getPrimitiveValue(valueNode.right) | 0;
            truthy = truthy || !!pv;
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              ...truthy ? {mustBeTruthy: true} : {},
              orredWith: pv,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
          });
        }
        case '+': {
          vlog('- doing a plus');
          // Trickier because it highly depends on the args...
          // Note: despite looks object concat does not need to be string:
          //       `{toString(){ return 1; }} + {toString(){ return 1; }} === 2`
          // IF we know the lhs or rhs is a string, then the result must be a string.
          // Otherwise, both sides are attempted to be coerced to a number, which may or may not
          // succeed. However, it will be a type error if both values do not end up as the same type.
          const left = valueNode.left;
          const right = valueNode.right;
          ASSERT(left);
          ASSERT(right);

          const ipl = AST.isPrimitive(left);
          const ipr = AST.isPrimitive(right);
          const pl = ipl && AST.getPrimitiveValue(left);
          const pr = ipr && AST.getPrimitiveValue(right);

          if (ipl && ipr) {
            // This case should be resolved by normalization
            const prl = pl + pr;
            vlog('- both are primitives, result is a:', prl);

            return createTypingObject({
              mustBeType: typeof prl, // must be string or number
              mustBePrimitive: true,
              mustBeFalsy: !prl,
              mustBeTruthy: !!prl,
            });
          }

          if (ipl && typeof pl === 'string') {
            vlog('- left is a string so result is a string');
            return createTypingObject({
              mustBeType: 'string',
              mustBePrimitive: true,
            });
          }

          if (ipr && typeof pr === 'string') {
            vlog('- right is a string so result is a string');
            return createTypingObject({
              mustBeType: 'string',
              mustBePrimitive: true,
            });
          }

          if (ipl && right.type === 'Identifier') {
            // We don't really know anything because if the unknown side is a string, the result will still
            // be a string, regardless of what the other side turns out to be.
            // We can turn to typing.mustBeType...
            const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
            if (rightMeta.typing.mustBeType) {
              if (rightMeta.typing.mustBeType === 'string') {
                vlog('- left is primitive but not string, right is a string type, so result is a string');
                return createTypingObject({
                  mustBeType: 'string',
                  mustBePrimitive: true,
                });
              }

              if (PRIMITVE_TYPE_NAMES_NOT_STRING.has(rightMeta.typing.mustBeType)) {
                // Note: we know the LHS value is a primitive and not a string.
                // This will coerce to a number (even if that is NaN)
                vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                return createTypingObject({
                  mustBeType: 'number',
                  mustBePrimitive: true,
                });
              }

              // The right side is an object. Maybe we can fix this in the future but for now, let it go.
              vlog('- left is primitive, right is object, so we must bail');
              return createTypingObject({
                mustBeType: 'primitive',
                mustBePrimitive: true,
              });
            }

            // We don't know anything about the right type so we have to pass here.
            vlog('- left is primitive but not a string, right is unknown. We must bail here');
            return createTypingObject({
              mustBeType: 'primitive',
              mustBePrimitive: true,
            });
          }

          if (ipr && left.type === 'Identifier') {
            // We don't really know anything because if the unknown side is a string, the result will still
            // be a string, regardless of what the other side turns out to be.
            // We can turn to typing.mustBeType...
            const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
            if (leftMeta.typing.mustBeType) {
              if (leftMeta.typing.mustBeType === 'string') {
                vlog('- right is primitive but not string, left is string type, result is a string');
                return createTypingObject({
                  mustBeType: 'string',
                  mustBePrimitive: true,
                });
              }

              if (PRIMITVE_TYPE_NAMES_NOT_STRING.has(leftMeta.typing.mustBeType)) {
                // Note: we know the RHS value is a primitive and not a string.
                // This will coerce to a number (even if that is NaN)
                vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                return createTypingObject({
                  mustBeType: 'number',
                  mustBePrimitive: true,
                });
              }

              // The left side is an object. Maybe we can fix this in the future but for now, let it go.
              vlog('- right is primitive, left is object, result is an unknown primitive, either number or string');
              return createTypingObject({
                mustBeType: 'primitive',
                mustBePrimitive: true,
              });
            }

            // We don't know anything about the left type so we have to pass here.
            vlog('- right is primitive but not a string, left is unknown. We must bail here');
            return createTypingObject({
              mustBeType: 'primitive',
              mustBePrimitive: true,
            });
          }

          if (left.type === 'Identifier' && right.type === 'Identifier') {
            // Neither left nor right was a primitive node
            // In that case we haven't checked their typing.mustBeTypes yet, so let's try this now.
            const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
            const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
            ASSERT(leftMeta, 'should have meta for left name', left.name, leftMeta);
            ASSERT(rightMeta, 'should have meta for right name', right.name, rightMeta);
            vlog('- left must be:', leftMeta.typing.mustBeType, ', right must be:', rightMeta.typing.mustBeType);
            if (leftMeta.typing.mustBeType === 'string' || rightMeta.typing.mustBeType === 'string') {
              vlog('- left and right are string types, result must be a string');
              return createTypingObject({
                mustBeType: 'string',
                mustBePrimitive: true,
              });
            }

            if (
              PRIMITVE_TYPE_NAMES_NOT_STRING.has(leftMeta.typing.mustBeType) &&
              PRIMITVE_TYPE_NAMES_NOT_STRING.has(rightMeta.typing.mustBeType)
            ) {
              vlog('- left and right are neither string nor object types, result must be a number');
              return createTypingObject({
                mustBeType: 'number',
                mustBePrimitive: true,
              });
            }

            // Either side is an object type. We don't have enough insight right now.
            vlog('- neither left nor right is a known string or number, result is an unknown primitive');
            return createTypingObject({
              mustBeType: 'primitive',
              mustBePrimitive: true,
            });
          }

          // Neither node was a primitive and the nodes did not have enough type info to
          // guarantee us the outcome of a `+` so we can't predict anything here. Sadly.
          vlog('- left and right are neither primitive nor ident and we do not have enough type information to predict the result type');
          return createTypingObject({
            mustBeType: 'primitive',
            mustBePrimitive: true, // Must be a string or a number, though
          });
        }
        default:
          ASSERT(false, 'you forgot an op', valueNode);
      }
      return;
    }
    case 'FunctionExpression': {
      vlog('- Node is a function');
      return createTypingObject({
        mustBeType: 'function',
        mustBePrimitive: false,
        mustBeTruthy: true,
      });
    }
    case 'CallExpression': {
      const callee = valueNode.callee;

      vlog('- Node is a call with callee:', callee.type);
      if (callee.type !== 'Identifier') {
        todo(`infertyping on a non-ident? is that a crash or bug? ${callee.type}`);
        return createTypingObject({});
      }

      const args = valueNode.arguments;

      // Certain builtins have a guaranteed outcome... (or an exception is thrown, which we can ignore here)
      switch (callee.name) {
        case SYMBOL_COERCE: {
          const kind = AST.getPrimitiveValue(valueNode.arguments[1]);
          return createTypingObject({
            mustBeType:
              kind === 'string' || kind === 'plustr' ? 'string' : kind === 'number' ? 'number' : ASSERT(false, 'add this kind', kind),
            mustBePrimitive: true,
          });
        }
        case SYMBOL_DOTCALL: {
          vlog('infer Dotcalling', args[0]?.name);
          const symb = BUILTIN_SYMBOLS.get(args[0].name);
          if (symb) {
            vlog('- is a known builtin symbol; returning it now');
            return createTypingObject({
              mustBeType: symb.typings.returns,
              mustBePrimitive: PRIMITIVE_TYPE_NAMES_PREVAL.has(symb.typings.returns),
              mustBeTruthy: !PRIMITIVE_TYPE_NAMES_PREVAL.has(symb.typings.returns),
              mustBeFalsy: symb.typings.returns === 'undefined' || symb.typings.returns === 'null',
            });
          }

          // This may miss in phase1 if the typing is not yet known but would be discovered/settled in phase1.1
          const meta = fdata.globallyUniqueNamingRegistry.get(args[0]);
          if (meta?.typing.returns) {
            return createTypingObject({
              mustBeType: meta.typing.returns,
              mustBePrimitive: PRIMITIVE_TYPE_NAMES_PREVAL.has(meta.typing.returns),
              mustBeTruthy: meta.typing.returns === 'undefined' || meta.typing.returns === 'null' ? false : undefined,
              mustBeFalsy: meta.typing.returns === 'undefined' || meta.typing.returns === 'null' || undefined,
            });
          }

          return createTypingObject({});
        }
        case SYMBOL_FRFR: {
          const freeMeta = getMeta(valueNode.arguments[0].name, fdata);
          if (freeMeta.typing.returns && freeMeta.typing.returns !== 'primitive') {
            // It always returns this particular type. That's very helpful.
            const mustbe = freeMeta.typing.returns;
            return createTypingObject({
              mustBeType: mustbe,
              mustBePrimitive: PRIMITIVE_TYPE_NAMES_PREVAL.has(mustbe),
            });
          }
          // Either we don't know the return type at all (which is strange), or we don't know beyond it
          // being a primitive (can happen), or have multiple concrete candidates. Whatever the case, we
          // assert that $free functions always return a primitive of sorts, so of you go.
          return createTypingObject({
            mustBePrimitive: true,
          });
        }
      }

      const calleeMeta = getMeta(valueNode.callee.name, fdata);
      if (calleeMeta.typing.returns) {
        // It always returns this particular type. That's very helpful.
        return createTypingObject({
          mustBeType: calleeMeta.typing.returns,
          mustBePrimitive: PRIMITIVE_TYPE_NAMES_PREVAL.has(calleeMeta.typing.returns),
          mustBeTruthy: !PRIMITIVE_TYPE_NAMES_PREVAL.has(calleeMeta.typing.returns),
          mustBeFalsy: calleeMeta.typing.returns === 'undefined' || calleeMeta.typing.returns === 'null',
        });
      }

      // We have no real idea what's going on here yet
      return createTypingObject({});


      // We have no real idea what's going on here yet
      // TODO: we can track the callee and see if the return type reveals a clue...
      todo('maybe support this call case too', valueNode.callee.type);
      vlog('- Node is calling a unsupported node so no typing is generated for it', valueNode.type);
      return createTypingObject({});
    }
    case 'NewExpression': {
      vlog('- Node is a new expression, callee is', valueNode.callee.name);
      let t = 'object'; // New always returns an object. But we may narrow that down.
      switch (valueNode.callee.name) {
        case symbo('array', 'constructor'): t = 'array'; break;
        case symbo('date', 'constructor'): t = 'date'; break;
        case symbo('map', 'constructor'): t = 'map'; break;
        case symbo('set', 'constructor'): t = 'set'; break;
        case symbo('regex', 'constructor'): t = 'regex'; break;
        case symbo('function', 'constructor'): t = 'function'; break;
        case symbo('buffer', 'constructor'): t = 'buffer'; break;
      }
      return createTypingObject({
        mustBeType: t,
        mustBePrimitive: false,
        mustBeTruthy: true,
      });
    }
    case 'MemberExpression': {
      vlog('- Node is a member expression, computed?', valueNode.computed);
      if (!valueNode.computed) {
        // Resolve some builtins...

        if (
          GLOBAL_NAMESPACES_FOR_STATIC_METHODS.has(valueNode.object.name) && // Don't allow a variable named `number` to pass this lookup
          BUILTIN_SYMBOLS.has(symbo(valueNode.object.name, valueNode.property.name))
        ) {
          // The typing of a builtin is globally available
          return createTypingObject(BUILTIN_SYMBOLS.get(symbo(valueNode.object.name, valueNode.property.name)).typings);
        }

        if (valueNode.object.type === 'Identifier' && valueNode.object.name === 'arguments' && valueNode.$p.funcDepth > 1 && valueNode.property.name === 'length') {
          vlog('- Node is `arguments.length` so the ident is our arguments.length alias');
          return createTypingObject({
            mustBeType: 'number',
            mustBePrimitive: true,
            // We can probably predict the concrete value in many cases, but that'll have to be a phase2 thing.
          });
        }

        if (AST.isPrimitive(valueNode)) {
          // Not very useful because this will get resolved... that's kind of the point here... but ok
          if (AST.getPrimitiveType(valueNode) === 'string' && valueNode.property.name === 'length') {
            const str = AST.getPrimitiveValue(valueNode);
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
              mustBeTruthy: str.length > 0,
            });
          }
        }

        if (valueNode.object.type === 'Identifier' && valueNode.property.name === 'length' && valueNode.object.name !== 'arguments') {
          vlog('Checking if this is .length on a certain type (string,array,func)');
          const meta = fdata.globallyUniqueNamingRegistry.get(valueNode.object.name);
          if (['string', 'array', 'function'].includes(meta.typing?.mustBeType)) {
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
            });
          }
        }

        if (valueNode.object.type === 'Identifier' && valueNode.property.name === 'size') {
          const meta = fdata.globallyUniqueNamingRegistry.get(valueNode.object.name);
          if (meta.typing?.mustBeType === 'map' || meta.typing?.mustBeType === 'set') {
            return createTypingObject({
              mustBeType: 'number',
              mustBePrimitive: true,
            });
          }
        }
      }

      if (valueNode.computed && valueNode.object.type === 'Identifier') {
        // The object needs to be an array literal const
        const ometa = fdata.globallyUniqueNamingRegistry.get(valueNode.object.name);
        const isArray = ometa.isConstant && ometa.writes.length === 1 && ometa.writes[0].parentNode.kind === 'const' && ometa.writes[0].parentNode.init.type === 'ArrayExpression';
        if (isArray) {
          const arrName = valueNode.object.name;
          vlog('- The object part is an "array":', valueNode.object.name);
          // Prop is a number if it is a literal number, or if its a reference that was identified to be a number
          const propIsNumberLit = AST.isNumberLiteral(valueNode.property);

          // If we can assert the size of the array, and we can assert it only contains one type,then we can
          // assert the type of the lookup accurately without having to worry about the `undefined` case.

          // Phase1.1 only:
          if (allowIdentResolve) {
            if (propIsNumberLit) {
              const index = AST.getPrimitiveValue(valueNode.property);
              if (Number.isInteger(index) && index >= 0) {
                const arrNode = ometa.writes[0].parentNode.init;
                let arrType = arrNode.$p.arrFixedType; // mustBeType or undefined or null
                let arrSize = arrNode.$p.arrFixedSize;
                vlog('- memoized arr stats: size', arrSize, ', type:', arrType);
                if (arrType === undefined) {
                  arrNode.elements.every(e => {
                    if (!e) {
                      arrType = null;
                      return false;
                    }
                    if (e.type === 'SpreadElement') {
                      arrType = null;
                      return false;
                    }
                    if (AST.isPrimitive(e)) {
                      if (arrType) return AST.getPrimitiveType(e) === arrType;
                      arrType = AST.getPrimitiveType(e);
                      return true;
                    }
                    if (e.type === 'Identifier') {
                      const m = fdata.globallyUniqueNamingRegistry.get(e.name);
                      const mustBe = m?.typing.mustBeType;
                      if (mustBe) {
                        if (arrType) return mustBe === arrType;
                        arrType = mustBe;
                        return true;
                      }
                    }
                    arrType = null;
                    return false; // Unable to determine type right now
                  });
                }
                vlog('- preliminary arr type:', arrType);
                if (arrType && arrSize === undefined) {
                  // Ok, but must also verify that we can prove that the array size does not change
                  // - array can't escape
                  // - support the pop/push cases, where one element is removed and immediately added
                  arrSize = arrNode.elements.length;
                  ometa.reads.every(arrRead => {
                    // Escape can be pretty much anything that's not a member expression. even coercion when instance toString is replaced etc.
                    // - `[1,2]+x` but `const arr = [1,2]; arr.toString = function(){this[0]=null;}; $(arr+'');` yikes.
                    // MemberExpressions can be statement, assignment (left or right), init, delete arg
                    // - We care about anything where we can't assert the mutation type (that's the point)
                    // - We do worry about delete because elided elements return undefined.

                    if (arrRead.parentNode.type === 'MemberExpression') {
                      if (arrRead.grandNode.type === 'delete') {
                        arrSize = null;
                        arrType = null;
                        return vlog('- bail: deleting prop');
                      }
                      // Can't allow assignment to .length so we must disallow assignment to non-number computed props and of course .length explicitly.
                      if (arrRead.grandNode.type === 'AssignmentExpression' && arrRead.grandProp === 'left') {
                        // There's no real valid reason for assigning to a property on an array that would not
                        // violate assertions. The exception is writing the same type to an index property as
                        // we know the array to be. TODO: validate that case.
                        // - computed props may write to length
                        // - index props may change the array subtype
                        // - you have no real business writing to non-computed array props, except for length
                        arrSize = null;
                        arrType = null;
                        return vlog('- bail: assigned value to prop');
                      }

                      // Other prop reads are fine? Can't be method call because that would be dotcall
                      return true;
                    }

                    if (arrRead.parentNode.type === 'CallExpression') {
                      // This is okay when
                      // - used as context
                      // - certain non-mutating builtins are called like slice and tostring
                      // - certain builtins are called in tandem, like [pop|shift] + [push|unshift]

                      const callNode = arrRead.parentNode;
                      if (
                        callNode.callee.type === 'Identifier' &&
                        callNode.callee.name === SYMBOL_DOTCALL &&
                        callNode.arguments[0]?.type === 'Identifier' &&
                        arrRead.parentProp === 'arguments' &&
                        arrRead.parentIndex === 1 // dotcall context
                      ) {
                        const method = callNode.arguments[0].name;
                        switch (method) {
                          case symbo('array', 'slice'):
                            // Sort does not change the array size/type, only swaps elements.
                          case symbo('array', 'sort'):
                          {
                            return true;
                          }
                          case symbo('array', 'pop'):
                          case symbo('array', 'shift'):
                          {
                            // Okay if the next statement does a push/unshift as statement (that's the pattern although assign/init would also work)
                            const next = arrRead.blockBody[arrRead.blockIndex + 1];
                            // Checking `const tmp = arr.pop(); arr.push(tmp)`, where the popped element is reinjected verbatim
                            if (
                              arrRead.grandNode.type === 'VarStatement' &&
                              next?.type === 'ExpressionStatement' &&
                              next.expression.type === 'CallExpression' &&
                              next.expression.arguments.length === 4 && // dotcall requires 3, plus the push/unshift arg
                              next.expression.callee.type === 'Identifier' &&
                              next.expression.callee.name === SYMBOL_DOTCALL &&
                              next.expression.arguments[0]?.type === 'Identifier' &&
                              (
                                next.expression.arguments[0].name === symbo('array', 'push') ||
                                next.expression.arguments[0].name === symbo('array', 'unshift')
                              ) &&
                              next.expression.arguments[1].type === 'Identifier' &&
                              next.expression.arguments[1].name === arrName &&
                              next.expression.arguments[3].type === 'Identifier' &&
                              next.expression.arguments[3].name === arrRead.grandNode.id.name // the value that was just popped
                            ) {
                              // I think that's it.
                              vlog('- validated pop/shift + push/unshift pattern');
                              // Tag the other call so we can skip that check
                              next.expression.$p.skipArrCheck = true;
                              return true;
                            } else {
                              arrSize = null;
                              arrType = null;
                              return vlog('- bail: found pop/shift but next line was not a push/unshift;',
                                arrRead.grandNode.type,
                                next?.type,
                                next?.expression?.type,
                                next?.expression?.arguments?.length,
                                next?.expression?.arguments?.[0]?.name,
                                next?.expression?.arguments?.[1]?.name,
                                next?.expression?.arguments?.[3]?.name,
                                arrName,
                                arrRead.grandNode.id?.name,
                              );
                            }
                          }
                          case symbo('array', 'unshift'):
                          case symbo('array', 'push'):
                          {
                            if (arrRead.parentNode.$p.skipArrCheck) {
                              vlog('- validated this unshift/push already');
                              return true;
                            } else {
                              arrSize = null;
                              arrType = null;
                              return vlog('- bail: doing unshift/push on an array without pop/shift has multiple uncertainties');
                            }
                          }
                          default: {
                            if (BUILTIN_SYMBOLS.has(method)) {
                              todo(`support builtin ${method} for array escape analysis`);
                            }
                            arrSize = null;
                            arrType = null;
                            return vlog('- bail: arr has unknown dotcall with method', method);
                          }
                        }
                      }
                      // Direct func calls that somehow use an array are all considered to leak it
                      arrSize = null;
                      arrType = null;
                      return vlog('- bail: arr is part of regular func call', callNode.callee.name, callNode.arguments[0]?.name);
                    }

                    // Not sure what other usage is ok here. Binary expressions, unary expressions, new, etc. It's all bad.
                    arrSize = null;
                    arrType = null;
                    return vlog('- bail: unknown other array usage');
                  });
                }
                arrNode.$p.arrFixedSize = arrSize;
                arrNode.$p.arrFixedType = arrType;
                vlog('- final: arrSize:', arrSize, ', arrType:', arrType);
                if (arrType && typeof arrSize === 'number') {
                  // We should be in phase1.1 and can now determine a more concrete type
                  if (index < arrSize) {
                    vlog('- inferred type is', arrType);
                    return createTypingObject({
                      mustBeType: arrType,
                      mustBePrimitive: PRIMITIVE_TYPE_NAMES_PREVAL.has(arrType),
                    });
                  } else {
                    vlog('- inferred type is undefined because index is positive but oob');
                    // We should know what the positive index properties are so this should return undefined...?
                    return createTypingObject({
                      mustBeType: 'undefined',
                      mustBePrimitive: true,
                      mustBeFalsy: true,
                      mustBeTruthy: false,
                    });
                  }
                }
              }
            }
          }


          let propIsNumber = propIsNumberLit;
          if (!propIsNumber && valueNode.property.type === 'Identifier') {
            const pmeta = fdata.globallyUniqueNamingRegistry.get(valueNode.property.name);
            propIsNumber = pmeta.typing.mustBeType === 'number';
          }

          if (propIsNumber) {
            // The typing will be that of the array. If it returns exclusively primitives, we can return "primitive" here.
            // We won't be able to conclusively narrow that down since it'll always be able to return `undefined`
            // (Except when the property is a numeric literal -> typeof that index, or when the array is empty -> always undef)
            const arrNode = ometa.writes[0].parentNode.init;
            if (arrNode.elements.every(enode => !enode || AST.isPrimitive(enode))) {
              return createTypingObject({
                mustBeType: 'primitive',
                mustBePrimitive: true,
              });
            } else {
              // Remember: index based lookups or empty-array cases are only legit in the same loop/try context
              todo('we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope');
              vlog('Array expression contains at least one non-primitive');
            }
          } else {
            vlog('Was unable to assert that the array property was in fact a number');
          }
        }
      }

      // TODO: we can perhaps figure something out by tracking the object
      return createTypingObject({});
    }
    case 'ArrayExpression': {
      vlog('- Node is an array lit');
      return createTypingObject({
        mustBeType: 'array',
        mustBePrimitive: false,
        mustBeTruthy: true,
        mustBeFalsy: false,
      });
    }
    case 'ObjectExpression': {
      vlog('- Node is an obj lit');
      return createTypingObject({
        mustBeType: 'object',
        mustBePrimitive: false,
        mustBeTruthy: true,
      });
    }
    case 'TaggedTemplateExpression': {
      // TODO (this is not a string but a call)
      ASSERT(false, 'should be eliminated during normalization');
      return;
    }
    case 'ClassExpression': {
      vlog('- Node is a class');
      return createTypingObject({
        mustBeType: 'class',
        mustBePrimitive: false,
        mustBeTruthy: true,
      });
    }
    case 'Param': {
      vlog('- Node is a param (generating empty typing on that)');
      // There may be typing data available. Copy it from the param
      return createTypingObject({});
    }
    case 'ChainExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'SequenceExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'SuperCall': {
      return createTypingObject({
        mustBeType: 'object',
        mustBePrimitive: false,
        mustBeTruthy: true,
      });
    }
    case 'SuperMethodCall': {
      return createTypingObject({});
    }
    case 'SuperProp': {
      return createTypingObject({});
    }
    case 'AssignmentExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'LogicalExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'ConditionalExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'UpdateExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'ArrowFunctionExpression': {
      ASSERT(false, 'normalized code does not have this node:', valueNode.type, valueNode);
      return;
    }
    case 'MetaProperty': {
      // This is `new.target` (or is this import.url etc as well?);
      // - new.target: target constructor when invoked with `new`, otherwise `undefined`. In some cases we can assert this value...
      return createTypingObject({});
    }
    default: {
      // Do I want to assert false here? At this point there can't be that many legit unchecked nodes left
      throw ASSERT(false, `what expression did I miss here? ${valueNode.type} ${JSON.stringify(valueNode)}`);
    }
  }

  ASSERT(false, 'unexpected node type which should have been caught in the default but ok: ', valueNode.type);
}
export function mergeTyping(from, into) {
  // First confirm that we properly deal with all the typing props. If we add a new one, it should be added here as well.
  {
    const {
      mustBeType,
      mustBeFalsy,
      mustBeTruthy,
      bang,
      sname,
      oneBitAnded,
      anded,
      orredWith,
      xorredWith,
      mustBePrimitive,
      maxlen,
      returns,
      ...unknown
    } = from;
    ASSERT(Object.keys(unknown).length === 0, 'add new .typing properties here as well (from)', from, unknown);
  }
  {
    const {
      mustBeType,
      mustBeFalsy,
      mustBeTruthy,
      bang,
      sname,
      oneBitAnded,
      anded,
      orredWith,
      xorredWith,
      mustBePrimitive,
      maxlen,
      returns,
      ...unknown
    } = into;
    ASSERT(Object.keys(unknown).length === 0, 'add new .typing properties here as well (into)', unknown);
  }

  ASSERT(
    !into.mustBeType || ALL_PREVAL_TYPE_NAMES.has(into.mustBeType),
    'typing.mustBeType is an enum of `undefined`, `false`, or one of a fixed set of strings',
    into.mustBeType,
  );

  if (from.mustBeType === undefined || into.mustBeType === false) {
    // Noop. this value was not discovered or already determined to be indeterminable.
  }
  else if (into.mustBeType === undefined) {
    // Copy the value verbatim
    into.mustBeType = from.mustBeType;
  }
  else if (into.mustBeType === 'primitive' && PRIMITIVE_TYPE_NAMES_TYPEOF.has(from.mustBeType)) {
    // from was a primitive type but into was the generic "primitive" so we keep that
  }
  else if (into.mustBeType !== from.mustBeType) {
    // The typing differed so we don't have a single type.
    into.mustBeType = false;
  }

  if (from.mustBeFalsy === undefined || into.mustBeFalsy === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly falsy.
  } else {
    // Either the input was not known or the output was true. Set to whatever the input was.
    into.mustBeFalsy = from.mustBeFalsy;
  }
  ASSERT([undefined, true, false].includes(into.mustBeFalsy), 'typing.mustBeFalsy is an enum of undefined or bool', into.mustBeFalsy);

  if (from.mustBeTruthy === undefined || into.mustBeTruthy === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly falsy.
  } else {
    // Either the input was not known or the output was true. Set to whatever the input was.
    into.mustBeTruthy = from.mustBeTruthy;
  }
  ASSERT([undefined, true, false].includes(into.mustBeTruthy), 'typing.mustBeTruthy is an enum of undefined or bool', into.mustBeTruthy);

  if (from.mustBePrimitive === undefined || into.mustBePrimitive === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly a primitive.
  } else {
    into.mustBePrimitive = from.mustBePrimitive;
  }
  ASSERT([undefined, true, false].includes(into.mustBeFalsy), 'typing.mustBeFalsy is an enum of undefined or bool', into.mustBeFalsy);

  if (from.bang === undefined || into.bang === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly falsy.
  } else {
    // Either the input was not known or the output was true. Set to whatever the input was.
    into.bang = from.bang;
  }
  ASSERT([undefined, true, false].includes(into.bang), 'typing.bang is an enum of undefined or bool', into.bang);

  if (from.oneBitAnded === undefined || into.oneBitAnded === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly anded.
  } else if (into.oneBitAnded === undefined) {
    // The output was not set yet so set it to the input
    into.oneBitAnded = from.oneBitAnded;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now false ("cannot be determined")
    into.oneBitAnded = false;
  }
  ASSERT(
    into.oneBitAnded === undefined || into.oneBitAnded === false || typeof into.oneBitAnded === 'number',
    'typing.oneBitAnded must be undefined, false, or a number',
    into.oneBitAnded,
  );

  if (from.anded === undefined || into.anded === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly anded.
  } else if (into.anded === undefined) {
    // The output was not set yet so set it to the input
    into.anded = from.anded;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now false ("cannot be determined")
    into.anded = false;
  }
  ASSERT(
    into.anded === undefined || into.anded === false || typeof into.anded === 'number',
    'typing.anded must be undefined, false, or a number',
    into.anded,
  );

  if (from.orredWith === undefined || into.orredWith === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly anded.
  } else if (into.orredWith === undefined) {
    // The output was not set yet so set it to the input
    into.orredWith = from.orredWith;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now false ("cannot be determined")
    into.orredWith = false;
  }
  ASSERT(
    into.orredWith === undefined || into.orredWith === false || typeof into.orredWith === 'number',
    'typing.orredWith must be undefined, false, or a number',
    into.orredWith,
  );

  if (from.xorredWith === undefined || into.xorredWith === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly anded.
  } else if (into.xorredWith === undefined) {
    // The output was not set yet so set it to the input
    into.xorredWith = from.xorredWith;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now false ("cannot be determined")
    into.xorredWith = false;
  }
  ASSERT(
    into.xorredWith === undefined || into.xorredWith === false || typeof into.xorredWith === 'number',
    'typing.xorredWith must be undefined, false, or a number',
    into.xorredWith,
  );

  // If from is not a primitive (or unknown) then into can not be either. Otherwise it's whatever into was.
  if (!from.mustBePrimitive) into.mustBePrimitive = from.mustBePrimitive;

  if (from.sname !== into.sname) into.sname = false;

  if (from.returns === into.returns) {
    // same, ok
  } else if (into.returns === undefined) {
    into.returns = from.returns;
  } else if (into.returns === 'primitive' && PRIMITIVE_TYPE_NAMES_TYPEOF.has(from.returns)) {
    // from was a primitive type but into was the generic "primitive" so we keep that
  } else {
    into.returns = false;
  }
}

export function resolveNodeAgainstParams(node, callNode, funcNode) {
  // If given node is an identifier, check if it's a parameter of given function node.
  // If it is, resolve the argument at the same index of the parameter being referenced.
  // If rest, attempt to resolve this in a special way.
  // If node is a literal, or the identifier is a builtin or something, just keep it as is.
  // The returned node should be cloned / fresh.
  // If spread/rest problems block the transform then the returned node will be null.

  if (node.type === 'Identifier') {
    ASSERT(callNode.type === 'CallExpression');
    ASSERT(funcNode.type === 'FunctionExpression');

    const name = node.name;
    let paramIndex = -1;
    let isRest = false; // Special care for the rest param
    funcNode.params.some((pnode, pi) => {
      ASSERT(pnode.type === 'Param');
      if (name === pnode.$p.paramVarDeclRef?.name) {
        if (pnode.rest) {
          isRest = true;
        }

        paramIndex = pi;
        return true;
      }
    });

    if (paramIndex < 0) {
      return [AST.cloneSimple(node), false, paramIndex, isRest];
    }

    // Verify whether the call uses a spread before the paramIndex. If so we must bail here.

    const args = callNode['arguments'];
    let blockingSpread = false;
    args.some((anode, ai) => {
      if (isRest && ai === paramIndex) {
        return true; // Spread can cover this
      }
      if (anode.type === 'SpreadElement') {
        blockingSpread = true;
        return true;
      }
      if (ai === paramIndex) {
        return true;
      }
    });

    if (blockingSpread) {
      vlog('Cannot inline this call because the call uses a spread that covers the param used in the assignment to inline');
      return [null, true, paramIndex, isRest];
    }

    if (isRest) {
      // This ident is the rest param. We can hack something together to make this work. Pretty specific case tho.

      return [
        AST.arrayExpression(
          // Note: all args must be simple although some may be spread they must still be simple too
          args.slice(paramIndex).map((anode) => {
            if (anode.type === 'SpreadElement') {
              return AST.spreadElement(AST.cloneSimple(anode.argument));
            }
            return AST.cloneSimple(anode);
          }),
        ),
        false,
        paramIndex,
        true,
      ];
    }

    // The function contained an assignment that uses a param that is not a rest
    // The call did not have a spread before or on the index of the used param

    return [AST.cloneSimple(args[paramIndex] || AST.identifier('undefined')), false, paramIndex, false];
  }

  return [AST.cloneSimple(node), false, -1, false];
}
// We often only care about one thing: might the binding possibly be mutated between two refs?
// These are the situations;
// - The binding is constant:
//   - By definition, it cannot be mutated. Although properties may.
// - The binding is not constant
//   - The binding is only used locally
//     - The only way for the binding to mutate is by an explicit write to that binding.
//     - Observable side effects are irrelevant since those could only mutate the binding through a closure
//   - The binding is used in a closure
//     - A function with closure access escapes (passed around directly, or transitively a function calling this function escapes)
//       - Any observable side effect might mutate it
//     - Functions that have access under closure do not escape, recursively (any function calling this function does not escape either, etc)
//       - Any observable side effect may still end up mutating it
//     - The mutation can happen through a direct mutation or an observable side effect
//       - Only observable side effects by local bindings might mutate the binding
//       - The idea is that only local functions can mutate a closure. If the function did not escape then a binding that's not
//         local can't possibly reference a function that does through call or getters/setters so we should be able to ignore it.
export function mayBindingMutateBetweenRefs(meta, ref1, ref2, includeProperties = false) {
  // Okay this stuff predates ref tracking and we should change it to use that instead.
  // The catch is that it would skip on back-to-back refs that are also closures since in some cases those are still safe to assert.
  // Cross that bridge when we get there?

  //todo('switch me to ref tracking');

  ASSERT(meta, 'should receive a meta...');
  vgroup(
    'mayBindingMutateBetweenRefs(checking if  `' + (typeof meta === 'string' ? meta : meta.uniqueName) + '` , was mutated between',
    ref1.action + ':' + ref1.kind, '(', ref1.parentIndex, '), and ',
    ref2.action + ':' + ref2.kind, '(', ref2.parentIndex, '), including props?',
    includeProperties,
    ')',
  );

  //vlog('ref1:');
  //source(ref1.blockBody[ref1.blockIndex]);
  //vlog('ref2:');
  //source(ref2.blockBody[ref2.blockIndex]);

  if (typeof meta === 'string') {
    vlog('Assuming `' + meta + '` is an implicit global, probably `arguments` or smth. Assuming multi-scope.');
    const r = _mayBindingMutateBetweenRefs(meta, ref1, ref2, includeProperties, false);
    vgroupEnd();
    vlog('Result:', r);
    return r;
  }

  // Even if constant, we have to check it when we also check for property mutation. I don't think that's true for builtins...?
  if ((meta.isConstant && !includeProperties) || meta.isBuiltin) {
    // This binding can not be mutated at all.
    vlog('Result: Constants and builtins wont be mutated');
    vgroupEnd();
    return false;
  }
  ASSERT(meta.isImplicitGlobal || meta.isCatchVar || meta.bfuncNode, 'either its implicitly global or an explicitly defined binding now', meta.uniqueName);
  if (meta.isCatchVar) todo('mayBindingMutateBetweenRefs: set proper scope for catch vars');
  const bindingScope = (meta.isImplicitGlobal || meta.isCatchVar) ? 1 : meta.bfuncNode.$p.npid;
  ASSERT(bindingScope >= 0, 'should have a scope', meta.isImplicitGlobal, meta.isCatchVar, meta.bfuncNode);
  const onlyLocalUse = meta.rwOrder.every((ref) => +ref.scope === bindingScope);
  vlog('Scopes: bindingScope:', bindingScope, ', ref scopes:', meta.rwOrder.map((ref) => ref.scope), '->', onlyLocalUse);
  const metaName = meta.uniqueName;

  const r = _mayBindingMutateBetweenRefs(metaName, ref1, ref2, includeProperties, !includeProperties && !!onlyLocalUse);
  vgroupEnd();
  vlog('Result:', r);
  return r;
}
function _mayBindingMutateBetweenRefs(metaName, prev, curr, includeProperties, singleScope) {
  // Traverse all statements between two given refs, which should be of given meta.
  // Check whether any of them write to the meta. Ignore property mutations. Should not be var. (I think?)
  // Note that prev ref may be a read and may still write to itself (like `x = x + 1`).
  // If the curr ref is not nested in the current statement, then the statement must be visited exhaustively (if/while/etc).

  ASSERT(prev?.action === 'read' || prev?.action === 'write', 'prev should be a ref', prev);
  ASSERT(curr?.action === 'read' || curr?.action === 'write', 'curr should be a ref', curr);
  ASSERT(!singleScope || curr.blockChain.startsWith(prev.blockChain), 'in a single scope, the previous ref should be reachable from the current ref', metaName, prev.node.$p?.npid, prev.action, prev.blockChain, curr.node.$p?.npid, curr.action, curr.blockChain);

  // Start from the block and index of the prev ref.
  // If the prev is not an assignment, skip an index forward
  // As long as the statement containing the curr ref is not found,
  //   If the current statement is an assignment to meta, return true
  //   Are there any other ways of mutating the binding? Catch can't go here. for-x is compiled out.
  // If the curr ref is a read inside a loop
  //   Scan forward in the loop
  //   If there is a forward write ref that can reach this read, return true
  //   (If there is no forward read then for any iteration of the loop the read should return the same value)
  // Must return false

  let blockPointer = prev.blockBodies.length - 1; // index onto the blockBodies/blockIndexes arrays
  let blockBodies = curr.blockBodies;
  let blockIndexes = curr.blockIndexes;

  let currentBody = prev.blockBody;
  let currentIndex = prev.blockIndex + 1; // Start after the statement containing the write
  let currentMax = blockIndexes[blockPointer];
  vgroup(
    'mightBindingWriteBetweenRefs(metaName: `' +
      metaName +
      '`, includeProperties: ' +
      includeProperties +
      ', singleScope: ' +
      singleScope +
      ' )',
  );
  vlog(
    'ids:',
    curr.blockIds,
    ', indexes:',
    blockIndexes,
    ', blockPointer:',
    blockPointer,
    ', block lens:',
    blockBodies.map((a) => a.length),
  );

  // Move forward from block[index] until you find the reference
  vlog('start index:', currentIndex, ', target index:', currentMax, ', total statements:', currentBody.length);
  while (true) {
    vgroup('- currentIndex:', currentIndex, ', currentMax:', currentMax, ', block len:', currentBody.length);
    if (currentBody === curr.blockBody && currentIndex === curr.blockIndex) {
      vlog('This is the targeted ref statement. All pass.');
      vgroupEnd(); // inner loop
      break;
    }

    if (currentIndex < currentMax) {
      // The target ref is not a descendant of this statement. Visit exhaustively before moving on to the next statement.
      const next = currentBody[currentIndex];
      vlog('Next statement:', next.type);

      // The only statement to write to a binding is an expression statement writing to the binding (gosh)

      if (nodeMightMutateNameUntrapped([next], metaName, includeProperties, singleScope).state === MUTATES) {
        vlog('Has observable side effects. bailing');
        vgroupEnd(); // inner loop
        vgroupEnd(); // outer loop
        return true;
      }

      vlog('Has no observable side effects. Okay. 3');
      ++currentIndex;
    } else {
      vlog('Checked all statements of current block, moving to the parent block.');
      ++blockPointer;
      if (blockPointer >= blockIndexes.length) {
        // This means we did not find the reference in this block or its parents.
        // At this point not too worried about this appraoch as I'm replacing it so let's ignore it.
        vgroupEnd(); // inner loop
        break;
      }
      vlog('Jumping into next block');
      currentBody = blockBodies[blockPointer];
      currentMax = currentBody.length;
      currentIndex = 0; // I guess this would be blockIndexes[blockPointer] to move forward...
      vlog('This block has', currentBody.length, 'statements');
    }
    vgroupEnd(); // inner loop
  }
  vgroupEnd(); // outer loop

  return false;
}
function nodeMightMutateNameUntrapped(nodes, metaName, includeProperties, singleScope) {
  // This variant assumes that the nodes are nested in at least one other function.
  // This is a lot trickier since it may be mutated by a myriad of operations now, including something as trivial as
  // a property read/write (`a.x`) or implicit coercion (`a < x` can trigger `.valueOf()` or `.toString()` calls).

  // The approach is to allow expressions where we know they can't mutate this binding.
  // TODO: in the future we can extend this analysis to confirm that no function containing the binding could have
  //       been called, recursively, and that the function does not escape, recursively. But that's a lot more expensive.

  // Apply the same analysis as single scope, plus also disallow many kinds of expressions that may indirectly
  // mutate the binding. Nothing changes for the statement/declaration nodes.

  let mutates = false;
  let state = NONE;

  // After visiting a node, if it is a label in this set, or if it is a loop with '' in the set, return MUTATES
  // This catches the case like `while (true) { if ($) { x = 1; break; } f(x); } f(x);` which mutates x in one branch
  // of an if, but not in the other. This func should still remember that the node could be mutated after reaching
  // and processing the break target.
  let labelsAfterWhichConsiderMutates = [];

  vgroup('nodeMightMutateNameUntrapped(node count: ' + nodes.length + ', target name: `' + metaName + '`)');
  // Ideal stop condition is when state === MUTATES. Bad for analysis, but this function considers that the end goal.
  nodes.some((node) => {
    vlog('-', node.type);
    if (node.type === 'ExpressionStatement') {
      const expr = node.expression;
      vlog('  - expression:', expr.type);
      // The only expression we care about is the actual assignment
      // Once we find a mutation, stop looking. We only want to know about the early completion.
      if (expr.type === 'AssignmentStatement') {
        const lhs = expr.left;

        if (lhs.type === 'Identifier' && lhs.name === metaName) {
          vlog('This actually was a write to the binding...');
          mutates = true;
          return;
        } else if (singleScope) {
          vlog('Not assignment to the binding, nothing else can mutate it because it is single scope, expr does not mutate');
        } else if (lhs.type === 'MemberExpression') {
          vlog('Assigning to a member expression may trigger a setter');
          mutates = true;
          return;
        } else if (lhs.type === 'Identifier') {
          // Assignments to idents can not mutate anything other than that ident
        }

        const rhs = expr.right;
        if (exprNodeMightMutateNameUntrapped(rhs, singleScope, includeProperties)) {
          mutates = true;
          return;
        }
      } else {
        if (exprNodeMightMutateNameUntrapped(expr, singleScope, includeProperties)) {
          mutates = true;
          return;
        }
      }
    }
    else if (node.type === 'VariableDeclaration') {
      ASSERT(node.declarations[0].id.name !== metaName, 'right?');
      const init = node.declarations[0].init;

      if (exprNodeMightMutateNameUntrapped(init, singleScope, includeProperties)) {
        mutates = true;
        return;
      }
    }
    else if (node.type === 'VarStatement') {
      ASSERT(node.id.name !== metaName, 'right?');
      const init = node.init;

      if (exprNodeMightMutateNameUntrapped(init, singleScope, includeProperties)) {
        mutates = true;
        return;
      }
    }
    else if (node.type === 'IfStatement') {
      // This branch is untrapped so;
      // - If at least one branch mutates without completing, the whole `if` mutates. Return immediately.
      // - Else, each branch that continues/breaks has its label set added to this one, state set to LABELS
      // - Else, if both branches return/throw, state to COMPLETES if it was NONE, label set empty
      // - Else, both branches must not mutate, not complete early. Keep state, merge both label sets.

      // The rules are a little different inside a try-catch, but only for throws. Not relevant here.

      const { state: a, labels: labelsA } = nodeMightMutateNameUntrapped(node.consequent.body, metaName, includeProperties, singleScope);
      if (a === MUTATES) {
        // It now doesn't matter what happens in the else branch: the `if` is considered to potentially mutate the binding.
        mutates = true;
        vlog('The consequent branch mutates. So this `if` mutates.');
      } else {
        const { state: b, labels: labelsB } = nodeMightMutateNameUntrapped(node.alternate.body, metaName, includeProperties, singleScope);
        if (a === MUTATES) {
          // Labels don't matter. This `if` is considered to potentially mutate the binding.
          mutates = true;
          vlog('The alternate branch mutates. So this `if` mutates.');
        } else {
          if (a === LABELS || b === LABELS) {
            vlog('At least one branch breaks or continues.');
            if (a === LABELS) {
              vlog('- The consequent, considering mutates after these labels:', labelsA);
              labelsAfterWhichConsiderMutates.push(...labelsA);
            }
            if (b === LABELS) {
              vlog('- The alternate, considering mutates after these labels:', labelsA);
              labelsAfterWhichConsiderMutates.push(...labelsB);
            }
            vlog('Marking the `if` as breaking or continuing because it does not mutate directly');
            state = LABELS;
            return true;
          } else if (a === COMPLETES && b === COMPLETES) {
            vlog('Both branches of the `if` complete so this `if` completes without labels');
            if (state === NONE) {
              vlog('So far state is NONE so it completes now');
              state = COMPLETES;
              return true;
            }
          } else {
            vlog('The `if` ends with NONE...');
          }
        }
      }
    }
    else if (['ForInStatement', 'ForOfStatement'].includes(node.type)) {
      if (node.left.type === 'Identifier' && node.left.name === metaName) {
        mutates = true;
        vlog('The `for` mutates because it has the name to the lhs');
      } else {
        const { state: a, labels: labels } = nodeMightMutateNameUntrapped(node.body.body, metaName, includeProperties, singleScope);
        if (a === MUTATES) {
          mutates = true;
          vlog('The `for` loop mutates');
        } else if (labels.includes('')) {
          mutates = true;
          vlog('The `for` loop mutates and breaks without label so the `for` mutates');
        } else if (a === LABELS) {
          labelsAfterWhichConsiderMutates.push(...labels);
          state = LABELS;
          vlog('The `for` loop mutates and breaks with label. Consider mutates after these labels:', labels);
          return true;
        } else if (a === COMPLETES) {
          vlog('The `for` loop completes. Cosnidering the `for` to complete.');
          if (state === NONE) {
            state = COMPLETES;
          }
          return true;
        } else {
          vlog('The `for` ends with NONE...');
        }
      }
    }
    else if (node.type === 'WhileStatement') {
      const { state: a, labels: labels } = nodeMightMutateNameUntrapped(node.body.body, metaName, includeProperties, singleScope);
      if (a === MUTATES) {
        mutates = true;
        vlog('The `while` loop mutates so the `while` mutates');
      } else if (labels.includes('')) {
        mutates = true;
      } else if (a === LABELS) {
        labelsAfterWhichConsiderMutates.push(...labels);
        state = LABELS;
        vlog('The `while` mutates and breaks/continues so the consideringm mutation after labels:', labels);
        return true;
      } else if (a === COMPLETES) {
        vlog('The `while` loop completes so the `while` completes');
        if (state === NONE) {
          state = COMPLETES;
        }
        return true;
      } else {
        vlog('The `while` ends with NONE...');
      }
    }
    else if (node.type === 'LabeledStatement') {
      const { state: a, labels: labels } = nodeMightMutateNameUntrapped([node.body], metaName, includeProperties, singleScope);
      if (a === MUTATES) {
        mutates = true;
        vlog('The label body mutates so the label mutates');
      } else if (labels.includes(node.label.name)) {
        mutates = true;
        vlog('The label body mutates and breaks or continues to this label so the label mutates');
      } else if (a === LABELS) {
        labelsAfterWhichConsiderMutates.push(...labels);
        state = LABELS;
        vlog('The label body mutates and breaks or continues, considering mutation after labels:', labels);
        return true;
      } else if (a === COMPLETES) {
        vlog('The label body completes so the label completes');
        if (state === NONE) {
          state = COMPLETES;
        }
        return true;
      } else {
        vlog('The label ends with NONE...');
      }
    }
    else if (node.type === 'ReturnStatement') {
      state = COMPLETES;
      vlog('Return statement overrides any other state');
      return true;
    }
    else if (node.type === 'BreakStatement') {
      vlog('A continue or break will LABELS if the previous nodes mutates');
      if (mutates) {
        vlog('- previous nodes mutated so adding', node.label?.name || '', 'to the label set');
        // This mutation is observable as soon as the continue or break target is found. Either the explicit label, or the nearest loop.
        labelsAfterWhichConsiderMutates.push(node.label?.name || '');
      }
      state = LABELS;
      return true;
    }
    else if (node.type === 'ThrowStatement') {
      vlog('A throw overrides any other state');
      state = COMPLETES;
      return true;
    }
    else if (node.type === 'TryStatement') {
      vlog('Try statement. Just checking whether it writes to the binding at all anywhere');

      // Doing puristic mutation analysis with the try statement is a nightmare of surprisingly high complexity. So we won't.
      // So instead we'll do it differently; if the try or catch block contain any writes anywhere, consider the
      // `try` statement to have mutated the binding. It's the safest approach without falling into a very deep rabbit hole.
      // TODO: seems to me like this is old and outdated code and we can use reftracking to replace it but ... somebody's gotta do it :)

      if (
        blockContainsMutate(node.block, metaName, singleScope, includeProperties) ||
        (node.handler && blockContainsMutate(node.handler.body, metaName, singleScope, includeProperties)) ||
        (node.finalizer && blockContainsMutate(node.finalizer, metaName, singleScope, includeProperties))
      ) {
        vlog('- it does. The try mutates');
        mutates = true;
      }
    }
    else if (node.type === 'EmptyStatement') {

    }
    else if (node.type === 'DebuggerStatement') {

    }
    else {
      vlog('Ehhh. Considering NONE;', node.type);
      todo(`nodeMightMutateNameUntrapped; Which statement are we missing here? ${node.type}`);
      mutates = true; // Be conservative; say it might mutate
      return true;
    }
  });
  vgroupEnd();

  vlog('Final state:', state, ', mutates?', mutates, ', labels:', labelsAfterWhichConsiderMutates);
  if (state === NONE) return mutates ? { state: MUTATES, labels: [] } : { state: NONE, labels: labelsAfterWhichConsiderMutates }; // The labels may tell us from where to start considering it mutated
  if (state === LABELS) return { state: LABELS, labels: labelsAfterWhichConsiderMutates }; // Labels are irrelevant because we DCE and have to consider next sibling nodes mutated anyways
  if (state === COMPLETES) return { state: COMPLETES, labels: [] };
  ASSERT(false);
}
function exprNodeMightMutateNameUntrapped(expr, singleScope, includeProperties) {
  vlog('exprNodeMightMutateNameUntrapped', expr.type);
  if (singleScope && !includeProperties // TODO: make sure includedproperties should or should not be checked
  ) {
    vlog(
      'A normalized non-assignment expression should not be able to mutate a binding directly so this should not mutate a single scope binding',
    );
    return false;
  }

  // Expr may be operator that coerces the value, triggering toString/valueOf
  if (AST.isPrimitive(expr)) {
    vlog('Rhs is primitive');
  }
  else if (['Identifier', 'FunctionExpression', 'Literal'].includes(expr.type)) {
    // Can not cause mutation of metaName unless lhs is it, and it wasn't
    vlog('Rhs has no observable side effect');
  }
  else if (expr.type === 'TemplateLiteral') {
    vlog('Templates can not have observable side effects inside Preval');
  }
  else if (expr.type === 'UnaryExpression') {
    if (includeProperties && expr.operator === 'delete') {
      // TODO: zoom in on the argument. Exclude some cases where we can guarantee it's not removing properties from target name
      vlog('Found a `delete` and explicitly requested no `delete`');
      return true;
    } else if (expr.operator === '-' && expr.argument.type === 'Literal') {
      // Ignore: negative numbers.
      vlog('Negative number, ok');
    } else if (!['typeof', 'delete', 'void'].includes(expr.operator)) {
      vlog('Unary expression with operator `' + expr.operator + '` could cause a mutation');
      return true;
    }
  }
  else if (expr.type === 'BinaryExpression') {
    if (!['===', '!==', 'in', 'instanceof'].includes(expr.operator)) {
      vlog('Unary expression with operator `' + expr.operator + '` could cause a mutation');
      return true;
    } else {
      vlog('Binary expression without side effects');
    }
  }
  else if (expr.type === 'ArrayExpression') {
    // Note: elements may be elided (=> null)
    if (expr.elements.some((enode) => enode && enode.type !== 'SpreadElement')) {
      vlog('Array literal with spread elements might mutate something as a side effect');
    } else {
      vlog('Array literal without spread elements cannot mutate anything');
    }
  }
  else if (expr.type === 'ObjectExpression') {
    if (expr.properties.some((pnode) => pnode.type === 'SpreadElement' || pnode.computed)) {
      vlog('Object literal with spread elements or computed props might mutate something as a side effect');
    } else {
      vlog('Object literal without spread elements or computed props cannot mutate anything');
    }
  }
  else {
    // TemplateLiteral
    vlog('The rhs of an assignment may have side effects that is able to cause a mutation;', expr.type);
    return true;
  }
  return false;
}
function blockContainsMutate(blockNode, metaName, asSideEffect, includeProperties) {
  // If this node, recursively, contains any write to the binding, return true. Otherwise return false.
  // This is to determine whether a try (which is the parent of the root call) contains a mutation anywhere.
  // No need to maintain state. If we find a write, return true immediately.
  // Do not visit functions. Visit anything else.

  return blockNode.body.some((cnode) => {
    if (cnode.type === 'ExpressionStatement') {
      const expr = cnode.expression;

      // If we count side effects, most things might mutate a binding. Especially when "unguided".
      // We're better of with an allow list; expressions that are idents or literals are okay. The end.

      if (expr.type === 'AssignmentStatement') {
        // Assignments of simple nodes to idents have no side effects
        const lhs = expr.left;

        if (lhs.type === 'Identifier' && lhs.name === metaName) {
          vlog('This actually was a write to the binding...');
          return true;
        } else if (lhs.type === 'MemberExpression') {
          vlog('Assigning to a member expression may trigger a setter');
          // TODO: an "informed" check may determine that the property access could not possibly mutate target binding...
          return true;
        } else if (lhs.type === 'Identifier') {
          // Assignments to idents can not mutate anything other than that ident
        }

        const rhs = expr.right;

        return exprContainsMutate(rhs, metaName, asSideEffect, includeProperties);
      } else {
        return exprContainsMutate(expr, metaName, asSideEffect, includeProperties);
      }
    }

    if (cnode.type === 'VariableDeclaration') {
      ASSERT(cnode.declarations[0].id.name !== metaName, 'right?');
      const init = cnode.declarations[0].init;

      return exprContainsMutate(init, metaName, asSideEffect, includeProperties);
    }

    if (cnode.type === 'IfStatement') {
      return (
        blockContainsMutate(cnode.consequent, metaName, asSideEffect, includeProperties) ||
        blockContainsMutate(cnode.alternate, metaName, asSideEffect, includeProperties)
      );
    }
    if (['WhileStatement', 'LabeledStatement'].includes(cnode.type)) {
      return blockContainsMutate(cnode.body, metaName, asSideEffect, includeProperties);
    }
    if (['ForInStatement', 'ForOfStatement'].includes(cnode.type)) {
      if (cnode.left.type === 'Identifier' && cnode.left.name === metaName) return true;
      return blockContainsMutate(cnode.body, metaName, asSideEffect, includeProperties);
    }
    if (cnode.type === 'TryStatement') {
      return (
        blockContainsMutate(cnode.block, metaName, asSideEffect, includeProperties) ||
        (cnode.handler && blockContainsMutate(cnode.handler.body, metaName, asSideEffect, includeProperties)) ||
        (cnode.finalizer && blockContainsMutate(cnode.finalizer, metaName, asSideEffect, includeProperties))
      );
    }
    // Anything else should be statements that have no child statements and there's nothing else that mutates the binding.
  });
}
function exprContainsMutate(expr, metaName, asSideEffect, includeProperties) {
  if (!asSideEffect) {
    vlog('A normalized non-assignment expression cannot mutate a binding directly');
    return false;
  }

  // Rhs may be operator that coerces the value, triggering toString/valueOf
  if (AST.isPrimitive(expr)) {
    // Can not cause mutation of metaName unless lhs is it, and it wasn't
    vlog('Rhs is primitive');
  } else if (['Identifier', 'FunctionExpression', 'Literal'].includes(expr.type)) {
    // Can not cause mutation of metaName unless lhs is it, and it wasn't
    vlog('Rhs has no observable side effect');
  } else if (expr.type === 'TemplateLiteral') {
    vlog('Templates can not mutate');
  } else if (expr.type === 'UnaryExpression') {
    if (includeProperties && expr.operator === 'delete') {
      // TODO: zoom in on the argument. Exclude some cases where we can guarantee it's not removing properties from target name
      vlog('Found a `delete` and explicitly requested no `delete`');
      return true;
    } else if (expr.operator === '-' && expr.argument.type === 'Literal') {
      // Ignore: negative numbers.
      vlog('Negative number, ok');
    } else if (!['typeof', 'delete', 'void'].includes(expr.operator)) {
      vlog('Unary expression with operator `' + expr.operator + '` could cause a mutation');
      return true;
    }
  } else if (expr.type === 'BinaryExpression') {
    if (!['===', '!==', 'in', 'instanceof'].includes(expr.operator)) {
      vlog('Unary expression with operator `' + expr.operator + '` could cause a mutation');
      return true;
    } else {
      vlog('Binary expression without side effects');
    }
  } else if (expr.type === 'ArrayExpression') {
    if (expr.elements.every((enode) => enode?.type !== 'SpreadElement')) {
      vlog('Array literal contained a spread element, may trigger side effect');
      return true;
    } else {
      vlog('Array literal did not contain a spread and cannot directly mutate a binding otherwise');
    }
  } else if (expr.type === 'ObjectLiteral') {
    if (expr.properties.every((pnode) => pnode.type !== 'SpreadElement')) {
      vlog('Object literal contained a spread element, may trigger side effect');
      return true;
    } else {
      vlog('Object literal did not contain a spread and cannot directly mutate a binding otherwise');
    }
  } else {
    vlog('The rhs of an assignment is an array, object, ec which may have side effects that is able to cause a mutation');
    return true;
  }
  return false;
}

function isOneSetBit(v) {
  // Bit counting is relatively expensive. ES6 added Math.clz32, which counts the number of leading bits of a 32bit number.
  // So what we can do here, rather than bit fiddle to get the whole count, is to get the number of leading zeroes, and then
  // check whether 2^(31-count) equals our value. If so, it's a single bit. If not, it's not.
  // Alternative, we could create an object/Set with 32 entries and do a straight lookup. Not sure what's faster. Won't matter much here.

  return 1 << (31 - Math.clz32(v)) === v;
}

export function getMeta(name, fdata) {
  ASSERT(typeof name === 'string', 'getMeta expects a string for name');
  ASSERT(fdata, 'you forgot the fdata, again, you dummy');
  const meta = fdata.globallyUniqueNamingRegistry.get(name);
  ASSERT(meta, 'if you call getMeta, you should be expecting it to exist', name); // Prevents us having to assert it everywhere
  return meta;
}

export function hasSingleScopedWrites(meta) {
  if (meta.singleScoped) return true;
  let func;
  return meta.writes.every(write => {
    if (func) return func === write.funcChain
    func = write.funcChain;
    return true;
  });
}