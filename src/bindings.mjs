import {
  IMPLICIT_GLOBAL_PREFIX,
  VERBOSE_TRACING,
  BLUE,
  RESET,
  BUILTIN_ARRAY_PROTOTYPE,
  BUILTIN_BOOLEAN_PROTOTYPE,
  BUILTIN_FUNCTION_PROTOTYPE,
  BUILTIN_NUMBER_PROTOTYPE,
  BUILTIN_OBJECT_PROTOTYPE,
  BUILTIN_REGEXP_PROTOTYPE,
  BUILTIN_STRING_PROTOTYPE,
} from './constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, source } from './utils.mjs';
import globals, {MAX_UNROLL_TRUE_COUNT} from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import * as AST from './ast.mjs';

const NONE = 'NONE';
const MUTATES = 'MUTATES';
const COMPLETES = 'COMPLETES';
const LABELS = 'LABELS';

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
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'BlockStatement':
      throw ASSERT(false, 'blocks dont have expression children');
    case 'BreakStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'param', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ChainExpression':
      throw ASSERT(false, 'chain elements have member and call expressions as children');
    case 'ClassBody':
      throw ASSERT(false, 'class bodies have methods as children', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'test' || parentProp === 'consequent' || parentProp === 'alternate', parentNode.type, '.', parentProp);
      return 'read';
    case 'ContinueStatement':
      ASSERT(parentProp === 'label', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'label';
    case 'DebuggerStatement':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'Directive':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'DoWhileStatement':
      ASSERT(parentProp === 'body' || parentProp === 'test', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'EmptyStatement':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'ExportAllDeclaration':
      ASSERT(parentProp === 'exported', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'none';
    case 'ExportDefaultDeclaration':
      ASSERT(parentProp === 'declaration', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'expression', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'FunctionExpression':
      ASSERT(parentProp === 'id' || parentProp === 'params', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'Identifier':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'IfStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ImportDeclaration':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'ImportDefaultSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ImportNamespaceSpecifier':
      ASSERT(parentProp === 'local', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'label' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'label') return 'label';
      return 'read';
    case 'Literal':
      throw ASSERT(false, 'literals do not have ident children');
    case 'LogicalExpression':
      ASSERT(parentProp === 'left' || parentProp === 'right', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      ASSERT(parentProp === 'property', 'is there any other way for this ident to be the object or property? ' + parentNode.type + ', ' + parentProp);
      return 'none';
    case 'MetaProperty':
      ASSERT(parentProp === 'meta' || parentProp === 'property', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentNode.computed) return 'read';
      return 'none';
    case 'MethodDefinition':
      ASSERT(parentProp === 'key', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
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
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement');
    case 'ObjectPattern':
      throw ASSERT(false, 'idents here are always wrapped in a Property or SpreadElement');
    case 'Program':
      throw ASSERT(false, 'this probably means you forgot to wrap an ident in an expression statement...');
    case 'Property':
      ASSERT(parentProp === 'key' || parentProp === 'value', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'key') {
        if (parentNode.computed) return 'read';
        return 'none';
      }
      return 'read';
    case 'RestElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'write';
    case 'ReturnStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'SequenceExpression':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'SpreadElement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'Super':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
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
      ASSERT(parentProp === 'discriminant', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'TaggedTemplateExpression':
      ASSERT(parentProp === 'tag', 'the expressions are wrapped in a TemplateElement', parentNode.type, '.', parentProp);
      return 'read';
    case 'TemplateElement':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'TemplateLiteral':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ThisExpression':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'ThrowStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'TryStatement':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'UnaryExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      // Note: none of the unary operators currently mutate. (++/-- are update expressions)
      return 'read';
    case 'UpdateExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'readwrite';
    case 'VariableDeclaration':
      throw ASSERT(false, 'normalized code does not have this node: ' + parentNode.type);
    case 'VariableDeclarator':
      ASSERT(parentProp === 'id' || parentProp === 'init', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      if (parentProp === 'id') return 'write';
      return 'read';
    case 'WhileStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'WithStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'YieldExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
  }
  throw ASSERT(false, 'Support this new node', parentNode);
}

export function generateUniqueGlobalName(name, fdata, assumeDoubleDollar = false) {
  ASSERT(!assumeDoubleDollar || name.startsWith('$$'), 'if assuming double dollar, we should receive one');
  if (!assumeDoubleDollar && name.startsWith('$$')) {
    if (/^\$\$\d/.test(name)) {
      return generateUniqueGlobalName('$dlr_' + name, fdata);
    }
    ASSERT(!/^\$\$\d+$/.test(name), 'param placeholders should not reach this place');
    // TODO: assert this is the normal_once step and make sure it never happens elsewhere
    return generateUniqueGlobalName('tmp' + name.slice(2), fdata);
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
  ASSERT(!/^\$\$\d+$/.test(name), 'param placeholders should not reach this place', name);
  ASSERT(Object.keys(rest).length === 0, 'invalid args');

  const meta = fdata.globallyUniqueNamingRegistry.get(name);
  if (meta) return meta;

  const newMeta = {
    // ident meta data
    uid: ++fdata.globalNameCounter,
    originalName,
    uniqueName: name,
    isExport, // exports should not have their name changed. we ensure this as the last step of this phase.
    isImplicitGlobal, // There exists explicit declaration of this ident. These can be valid, like `process` or `window`. Currently also `catch` clause bindings.
    isBuiltin, // Make a distinction between known builtins and unknown builtins.
    bfuncNode: undefined, // Function scope where this binding was bound. Undefined for builtins/implicits. Should be set for anything else (which is only var decls after normalization).
    rwOrder: undefined, // Array<read|write>. Sorted in DFS order ASC, once at the start of phase2
    singleScoped: undefined, // bool. Is there any reference inside a different scope from another ref? Set at the start of phase2.
    singleInner: undefined, // bool. Are all references of this binding in the same scope/catch/finally?
    //singleScopeWrites: undefined, // bool. Are all writes to this binding happening in the same scope? Set at the start of phase2. (Always true for constants)
    //singleScopeReads: undefined, // bool. Are all reads of this binding happening in the same scope? Set at the start of phase2.
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
    writes: [], // {parent, prop, index} indirect reference ot the node being assigned. In phase1 (only); If not implicit/builtin then the first write should be the decl. Note that reads and writes can legally appear in source/ast before decl.
    reads: [], // {parent, prop, index} indirect reference to the node that refers to this binding

    // Phase1 collects typing information
    // Note: This should be typing information that holds for any point in the life cycle of the binding
    //       For constants that's easy but for lets this severely restricts what we can track. In most cases just the typeof.
    //       See getCleanTypingObject()
    typing: getCleanTypingObject(),
  };
  ASSERT(name);
  if (/^\$\$\d+$/.test(name)) fixme;
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

export function createUniqueGlobalLabel(name, fdata) {
  const globallyUniqueLabelRegistry = fdata.globallyUniqueLabelRegistry;

  if (globallyUniqueLabelRegistry.has(name)) {
    // Cache the offset otherwise large inputs will literally test every suffix 1 through n which causes perf problems
    const labelNameSuffixOffset = fdata.labelNameSuffixOffset;

    // No point in having a `foo$1$22$1$1$1$1$1$1$1$1$1$1$1$1$1`
    if (name.includes('$')) {
      name = name.replace(/\$\d+$/, '');
    }

    // Create a (module) globally unique name. Then use that name for the local scope.
    let n = labelNameSuffixOffset.get(name) ?? 0;

    while (globallyUniqueLabelRegistry.has(name + '$' + ++n));
    labelNameSuffixOffset.set(name, n + 1);

    return n ? name + '$' + n : name;
  }

  return name;
}
export function registerGlobalLabel(fdata, name, originalName, labelNode) {
  ASSERT(!fdata.globallyUniqueLabelRegistry.has(name), 'this func should be called with the unique label name');

  fdata.globallyUniqueLabelRegistry.set(name, {
    // ident meta data
    uid: ++fdata.globalNameCounter,
    originalName,
    uniqueName: name,
    labelNode, // All referenced labels must exist (syntax error), labels must appear before their usage when traversing
    usages: [], // {parent, prop, index} of the break/continue statement referring to the label
    labelUsageMap: new Map(), // Map<labelName, {node, body, index}>. References to a label
  });
}
export function createFreshLabel(name, fdata) {
  ASSERT(createFreshLabel.length === arguments.length, 'arg count');
  const tmpName = createUniqueGlobalLabel(name, fdata, false);
  const labelNode = AST.identifier(tmpName);
  registerGlobalLabel(fdata, tmpName, tmpName, labelNode);
  return labelNode;
}

export function createReadRef(obj) {
  const {
    name, // The var name, unique in this scope. Owner meta should have the same name.
    kind,
    isPropWrite,
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain,
    blockIds, // Array of blockChain
    blockBodies, // arrays of statements that is block.body or program.body. 1:1 with blockIndexes
    blockIndexes, // Indexes per each element of blockChain and blockBodies
    ifChain,
    funcChain,
    innerLoop,
    innerIf,
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,
    innerFinally,
    ...rest
  } = obj;
  ASSERT(typeof kind === 'string');
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createReadRef in the func too!', rest);
  ASSERT(blockIndex >= 0);
  ASSERT(typeof innerLoop === 'number', 'inner loop?', innerLoop);
  ASSERT(typeof innerIf === 'number', 'inner if?', innerIf);
  ASSERT(typeof innerElse === 'number', 'inner else?', innerElse);
  ASSERT(blockChain);
  ASSERT(blockIds instanceof Array);
  ASSERT(blockBodies instanceof Array && blockBodies.every((a) => Array.isArray(a)));
  ASSERT(blockIndexes instanceof Array);
  ASSERT(blockBodies.length === blockIndexes.length, 'each block body should have an index', blockBodies, blockIndexes);
  ASSERT(ifChain);
  ASSERT(funcChain);
  ASSERT(typeof isPropWrite === 'boolean', 'newer prop isPropWrite, should be set');

  return {
    name,
    action: 'read',
    kind, // "export" | "read"
    isPropWrite, // If kind=read, is this actually a property write on this object?
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
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
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,
    innerFinally,
    reachesWrites: new Set(), // Set<Write>. All writes this read can "reach" (might "observe", syntactically speaking)
  };
}
export function createWriteRef(obj) {
  const {
    name, // The var name, unique in this scope. Owner meta should have the same name.
    kind, // var, assign, for, ..?
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain,
    blockIds, // Array of blockChain
    blockBodies, // arrays of statements that is block.body or program.body. 1:1 with blockIndexes
    blockIndexes, // Indexes per each element of blockChain and blockBodies
    ifChain,
    funcChain,
    innerLoop,
    innerIf,
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,
    innerFinally,
    ...rest
  } = obj;
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createWriteRef in the func too!', rest);
  ASSERT(blockIndex >= 0);
  ASSERT(typeof innerLoop === 'number');
  ASSERT(typeof innerIf === 'number');
  ASSERT(typeof innerElse === 'number');
  ASSERT(blockChain);
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
    isPropWrite: false, // A binding mutation is not a property write
    parentNode,
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody,
    blockIndex,
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
    innerElse,
    innerTry,
    innerTrap,
    innerCatch,
    innerFinally,
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
      vlog('  Will temporarily rename to `' + globalName + '` to avoid collisions.');
    }

    // Register one...
    vlog('Creating implicit global binding for `' + globalName + '` now');
    const uniqueName = generateUniqueGlobalName(globalName, fdata);
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
export function preprocessScopeNode(node, parentNode, fdata, funcNode, lexScopeCounter, oncePass, unrollTrueLimit = 10) {
  ASSERT(arguments.length === preprocessScopeNode.length || arguments.length === preprocessScopeNode.length + 1, 'arg count', arguments.length, preprocessScopeNode.length);
  // This function attempts to find all binding names defined in this scope and create unique name mappings for them
  // (This doesn't update any read/write nodes with their new name! Only prepares their new name to be used and unique.)

  ASSERT(typeof unrollTrueLimit === 'number' && unrollTrueLimit > 0, 'should receive a unrollTrueLimit', unrollTrueLimit);
  if (unrollTrueLimit > MAX_UNROLL_TRUE_COUNT) {
    throw new Error('unrollLoopWithTrue; The unrollTrueLimit (' + unrollTrueLimit + ') is bigger than the hardcoded max MAX_UNROLL_TRUE_COUNT of ' + MAX_UNROLL_TRUE_COUNT);
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

    for (let i=0; i<=unrollTrueLimit; ++i) {
      // $LOOP_UNROLL_1 $LOOP_UNROLL_2 $LOOP_UNROLL_3 etc
      // Special symbols whose number suffix has semantic meaning
      node.$p.nameMapping.set(`$LOOP_UNROLL_${i}`, `$LOOP_UNROLL_${i}`);
    }
    // $LOOP_DONE_UNROLLING_ALWAYS_TRUE_5
    // "signals not to unroll any further, but to treat this as "true" anyways"
    node.$p.nameMapping.set(`$LOOP_DONE_UNROLLING_ALWAYS_TRUE`, `$LOOP_DONE_UNROLLING_ALWAYS_TRUE`);

  } else {
    // non-global scope
    node.$p.nameMapping = new Map([
      ['this', 'this'],
      ['arguments', 'arguments'],
    ]);
  }

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
        vlog('-', name, ':', v);

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
  ASSERT(node.type === 'VariableDeclaration');
  ASSERT(node.declarations.length === 1, 'var decls define one binding?', node);
  const decl = node.declarations[0];
  return findBoundNamesInVarDeclarator(decl, names);
}

export function findBoundNamesInUnnormalizedVarDeclaration(node, names = []) {
  node.declarations.forEach((decr) => findBoundNamesInVarDeclarator(decr, names));
  return names;
}
export function findBoundNamesInVarDeclarator(decl, names = []) {
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

export function getCleanTypingObject() {
  // All values start as undefined to mean "undetermined". Most values use `null` or `false` as meaning "indeterminable".
  // (The `mustBeValue` can therefore not represent the `undefined` or `null` values, there's no way around it)

  return {
    // string. If anything, this should then be the primitive type that this binding must be.
    // TODO: what if there are multiple options? Or even like bool/undefined/null? "falsy/truthy"
    mustBeType: undefined, // undefined|false|enum. 'null', 'array' (lit), 'object' (plain), 'function', 'class', 'set', 'map', 'regex', <typeof primitive>. Undefined means undetermined. When false, the type can not be determined safely.
    mustBeFalsy: undefined, // undefined|bool: only true if value is known to be one of: false, null, undefined, 0, -0, '', NaN. When false, known not to (always) be falsy.
    mustBeTruthy: undefined, // undefined|bool: only true if known to be a value that is not one of the falsy ones :) When false, known not to (always) be truthy.
    mustBeValue: undefined, // undefined|null|<primitive>: must be exactly this value.
    bang: undefined, // undefined|bool. Was this explicitly the result of applying `!x`? When false, known not to always be the case.

    builtinTag: undefined, // string. When builtin, this string represents a unique id for the built-in resource (like `Number.parseInt` or `Array#slice`). There's a lot to implement here, sigh.

    oneBitAnded: undefined, // number. If set, this value is the result of applying the bitwise AND operator and this single bit value to an arbitrary value. In other words, either this bit is set or unset on this value.
    anded: undefined, // number. If set, this value is the result of bitwise AND an arbitrary value with this value
    orredWith: undefined, // number. If set, this meta is the result of a bitwise OR expression with this literal and an unknown value
    xorredWith: undefined, // number. If set, this meta is the result of a bitwise XOR expression with this literal and an unknown value

    worstCaseValueSet: undefined, // undefined | Set<primitives>. If set, this is the bound set of possible (primitive) values for this binding. If undefined, the set can not be bound explicitly or contains non-primitives.
    mustBePrimitive: undefined, // TODO: ehhh... dunno :) only used for builtins I think
    primitiveValue: undefined, // TODO: merge with mustBeValue
  };
}
export function getUnknownTypingObject(toInit) {
  // All values are set to the "cannot be determined" state. For example, this is used for implicit globals.

  return {
    mustBeType: false,
    mustBeFalsy: false,
    mustBeTruthy: false,
    mustBeValue: null,
    bang: false,

    builtinTag: false,

    oneBitAnded: false,
    anded: false,
    orredWith: false,
    xorredWith: false,

    worstCaseValueSet: toInit ? new Set() : false,
    mustBePrimitive: false, // TODO: ehhh... dunno :) only used for builtins I think
    primitiveValue: undefined, // (irrelevant) TODO: merge with mustBeValue
  };
}
export function createTypingObject({
  mustBeType = false,
  mustBeFalsy = false,
  mustBeTruthy = false,
  mustBeValue = null,
  bang = false,

  builtinTag = false,

  oneBitAnded = false,
  anded = false,
  orredWith = false,
  xorredWith = false,

  worstCaseValueSet = false,
  mustBePrimitive = false,
  primitiveValue = false,
  ...rest
}) {
  ASSERT(Object.keys(rest).length === 0, 'add new keys', rest);
  return {
    mustBeType,
    mustBeFalsy,
    mustBeTruthy,
    mustBeValue,
    bang,

    builtinTag,

    oneBitAnded,
    anded,
    orredWith,
    xorredWith,

    worstCaseValueSet,
    mustBePrimitive,
    primitiveValue,
  };
}
export function inferNodeTyping(fdata, valueNode) {
  const r = _inferNodeTyping(fdata, valueNode);
  ASSERT(r && typeof r === 'object', 'inferNodeTyping must return a typing object', r, valueNode);
  return r;
}
function _inferNodeTyping(fdata, valueNode) {
  // Assumes >= phase1 (so normalized code)
  // Given a node `init`, determine the initial typing for this meta.
  // .worstCaseValueSet is overridden if already set and the value is a primitive. If let, future assignments will amend or clear the set.

  ASSERT(valueNode, 'should receive value node', valueNode);
  ASSERT(valueNode.$p, 'nodes should be processed at this point so .$p should exist', valueNode);

  if (AST.isPrimitive(valueNode)) {
    const value = AST.getPrimitiveValue(valueNode);

    return createTypingObject({
      mustBeType: value === null ? 'null' : typeof value,
      mustBeTruthy: !!value,
      mustBeFalsy: !value,
      mustBePrimitive: true,
      worstCaseValueSet: new Set([value]),
      mustBeValue: value,
      primitiveValue: value,
    });
  }

  switch (valueNode.type) {
    case 'Literal': {
      if (valueNode.raw[0] === '/') {
        return createTypingObject({
          mustBeType: 'regex',
          mustBeTruthy: true,
        });
      }
      throw ASSERT(false, 'support me', valueNode);
    }
    case 'TemplateLiteral': {
      ASSERT(
        valueNode.expressions.length,
        'it would be a primitive if there werent any expressions (that case is checked before the switch)',
      );
      return createTypingObject({
        mustBeType: 'string',
        mustBeFalsy: false, // We can't tell for sure it's falsy. But it may be anyways.
        mustBeTruthy: valueNode.quasis.some((te) => te.value.cooked !== ''), // Or if any expression is non-falsy
      });
    }
    case 'Identifier': {
      // Not sure we can say anything about this. We could propagate what we already know about this ident ... (TODO). Unsure about ramifications
      return createTypingObject({});
    }
    case 'ThisExpression': {
      return createTypingObject({
        mustBeType: 'object',
        mustBeTruthy: true,
      });
    }
    case 'UnaryExpression': {
      switch (valueNode.operator) {
        case 'delete':
          return createTypingObject({
            mustBeType: 'boolean',
            worstCaseValueSet: new Set([true, false]),
          });
        case 'void':
          ASSERT(false, 'normalized code should not contain `void`');
          break;
        case '+':
        case '-':
        case '~':
          return createTypingObject({
            mustBeType: 'number',
          });
        case '!': {
          return createTypingObject({
            mustBeType: 'boolean',
            bang: true,

            worstCaseValueSet: new Set([true, false]),
          });
        }
        case 'typeof': {
          return createTypingObject({
            mustBeType: 'string',
            mustBeTruthy: true,
            worstCaseValueSet: new Set(['undefined', 'boolean', 'number', 'string', 'object', 'function', 'bigint', 'symbol', 'unknown']),
          });
        }
        default:
          ASSERT(false, 'normalized code does not have this unary operator: ' + valueNode.operator);
      }
      return;
    }
    case 'AwaitExpression': {
      return inferNodeTyping(fdata, valueNode.argument);
    }
    case 'BinaryExpression': {
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
            worstCaseValueSet: new Set([true, false]),
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
          });
        }
        case '&': {
          // Need a number on at least one side. Ignore negative numbers (unary expression).
          if (AST.isPrimitive(valueNode.left)) {
            const v = AST.getPrimitiveValue(valueNode.left) | 0;
            return createTypingObject({
              mustBeType: 'number',

              oneBitAnded: isOneSetBit(v) ? v : undefined,
              anded: v,

              worstCaseValueSet: isOneSetBit(v) ? new Set([0, v]) : undefined,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            const v = AST.getPrimitiveValue(valueNode.right) | 0;
            return createTypingObject({
              mustBeType: 'number',

              oneBitAnded: isOneSetBit(v) ? v : undefined,
              anded: v,

              worstCaseValueSet: isOneSetBit(v) ? new Set([0, v]) : undefined,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
          });
        }
        case '^': {
          if (AST.isPrimitive(valueNode.left)) {
            return createTypingObject({
              mustBeType: 'number',
              xorredWith: AST.getPrimitiveValue(valueNode.left) | 0,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            return createTypingObject({
              mustBeType: 'number',
              xorredWith: AST.getPrimitiveValue(valueNode.right) | 0,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
          });
        }
        case '|': {
          if (AST.isPrimitive(valueNode.left)) {
            const pv = AST.getPrimitiveValue(valueNode.left) | 0;
            return createTypingObject({
              mustBeType: 'number',
              orredWith: pv,
            });
          }
          if (AST.isPrimitive(valueNode.right)) {
            const pv = AST.getPrimitiveValue(valueNode.right) | 0;
            return createTypingObject({
              mustBeType: 'number',
              orredWith: pv,
            });
          }
          return createTypingObject({
            mustBeType: 'number',
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

          // Note: this also checks node.$p.isPrimitive but not typing.mustBeType
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
              mustBeFalsy: !prl,
              mustBeTruthy: !!prl,
              mustBeValue: prl,

              worstCaseValueSet: new Set([prl]),
              mustBePrimitive: true,
              primitiveValue: prl,
            });
          }

          if (ipl && typeof pl === 'string') {
            vlog('- left is a string so result is a string');
            return createTypingObject({
              mustBeType: 'string',
            });
          }

          if (ipr && typeof pr === 'string') {
            vlog('- right is a string so result is a string');
            return createTypingObject({
              mustBeType: 'string',
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
                });
              }

              if (['undefined', 'null', 'boolean', 'number'].includes(rightMeta.typing.mustBeType)) {
                // Note: we know the LHS value is a primitive and not a string.
                // This will coerce to a number (even if that is NaN)
                vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                return createTypingObject({
                  mustBeType: 'number',
                });
              }

              // The right side is an object. Maybe we can fix this in the future but for now, let it go.
              vlog('- left is primitive, right is object, so we must bail');
              return createTypingObject({});
            }

            // We don't know anything about the right type so we have to pass here.
            vlog('- left is primitive but not a string, right is unknown. We must bail here');
            return createTypingObject({});
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
                });
              }

              if (['undefined', 'null', 'boolean', 'number'].includes(leftMeta.typing.mustBeType)) {
                // Note: we know the RHS value is a primitive and not a string.
                // This will coerce to a number (even if that is NaN)
                vlog('- lhs a primitive, rhs neither string nor object type, so the result is a number');
                return createTypingObject({
                  mustBeType: 'number',
                });
              }

              // The left side is an object. Maybe we can fix this in the future but for now, let it go.
              vlog('- right is primitive, left is object, so we must bail');
              return createTypingObject({});
            }

            // We don't know anything about the left type so we have to pass here.
            vlog('- right is primitive but not a string, left is unknown. We must bail here');
            return createTypingObject({});
          }

          if (left.type === 'Identifier' && right.type === 'Identifier') {
            // Neither left nor right was a primitive node
            // In that case we haven't checked their typing.mustBeTypes yet, so let's try this now.
            const leftMeta = fdata.globallyUniqueNamingRegistry.get(left.name);
            const rightMeta = fdata.globallyUniqueNamingRegistry.get(right.name);
            ASSERT(leftMeta, 'should have meta for left name', left.name, leftMeta);
            ASSERT(rightMeta, 'should have meta for right name', right.name, rightMeta);
            if (leftMeta.typing.mustBeType === 'string' || rightMeta.typing.mustBeType === 'string') {
              vlog('- left and right are string types, result must be a string');
              return createTypingObject({
                mustBeType: 'string',
              });
            }

            if (
              ['undefined', 'null', 'boolean', 'number'].includes(leftMeta.typing.mustBeType) &&
              ['undefined', 'null', 'boolean', 'number'].includes(rightMeta.typing.mustBeType)
            ) {
              vlog('- left and right are neither string nor object types, result must be a number');
              return createTypingObject({
                mustBeType: 'number',
              });
            }

            // Either side is an object type. We don't have enough insight right now.
            vlog('- neither left nor right is a string, at least one is an object, result is unknown');
            return createTypingObject({});
          }

          // Neither node was a primitive and the nodes did not have enough type info to
          // guarantee us the outcome of a `+` so we can't predict anything here. Sadly.
          vlog('- left and right are neither primitive nor ident and we do not have enough type information to predict the result type');
          return createTypingObject({});
        }
        default:
          ASSERT(false, 'you forgot an op', valueNode);
      }
      return;
    }
    case 'FunctionExpression': {
      return createTypingObject({
        mustBeType: 'function',
        mustBeTruthy: true,
      });
    }
    case 'CallExpression': {
      // Certain builtins have a guaranteed outcome... (or an exception is thrown, which we can ignore here)
      if (valueNode.callee.type === 'Identifier') {
        switch (valueNode.callee.name) {
          case 'String': {
            // done
            ASSERT(false, 'should be changed to $coerce during normalization. should not be reintroduced...?', valueNode);
            return createTypingObject({
              mustBeType: 'string',
            });
          }
          case 'Number': {
            ASSERT(false, 'should be changed to $coerce during normalization. should not be reintroduced...?', valueNode);
            return createTypingObject({
              mustBeType: 'number',
            });
          }
          case '$coerce': {
            const kind = AST.getPrimitiveValue(valueNode.arguments[1]);
            return createTypingObject({
              mustBeType:
                kind === 'string' || kind === 'plustr' ? 'string' : kind === 'number' ? 'number' : ASSERT(false, 'add this kind', kind),
            });
          }
          case 'Boolean': {
            // In some cases we may even be able to predict the outcome...
            return createTypingObject({
              mustBeType: 'boolean',
              worstCaseValueSet: new Set([true, false]),
            });
          }
          case 'parseInt':
          case 'parseFloat': {
            // If the arg is a literal we could resolve it immediately
            return createTypingObject({
              mustBeType: 'number',
            });
          }
          case 'isNaN':
          case 'isFinite': {
            // In some rare cases we would be able to resolve this if the arg was a primitive (or otherwise deduced).
            return createTypingObject({
              mustBeType: 'boolean',
              worstCaseValueSet: new Set([true, false]),
            });
          }
          default: {
            // We have no real idea what's going on here yet
            // TODO: we can track the callee and see if the return type reveals a clue...
            return createTypingObject({});
          }
        }
      }
      if (valueNode.callee.type === 'MemberExpression' && !valueNode.callee.computed) {
        switch (valueNode.callee.object.name + '.' + valueNode.callee.property.name) {
          case 'Array.from': {
            return createTypingObject({
              mustBeType: 'array',
              mustBeTruthy: true,
            });
          }
          case 'Array.isArray': {
            return createTypingObject({
              mustBeType: 'boolean',
              worstCaseValueSet: new Set([true, false]),
            });
            break;
          }
          case 'Array.of': {
            // Normalization can replace this with array literals in many-if-not-all cases
            return createTypingObject({
              mustBeType: 'array',
              mustBeTruthy: true,
            });
          }
          case 'Date.now': {
            return createTypingObject({
              mustBeType: 'number',
              mustBeTruthy: true,
            });
          }
          case 'Date.parse':
          case 'Date.UTC': {
            // (Looks like parse/UTC always return a number as well. I hope there's no edge case around that.)
            return createTypingObject({
              mustBeType: 'number',
            });
          }
          case 'JSON.stringify': {
            // This can be undefined (if you pass no args or `undefined`), so we don't know for sure.
            // TODO: Although, if the arg is known to be not `undefined`, then I think the result must be string...
            return createTypingObject({});
          }
          case 'Math.abs':
          case 'Math.acos':
          case 'Math.acosh':
          case 'Math.asin':
          case 'Math.asinh':
          case 'Math.atan':
          case 'Math.atan2':
          case 'Math.atanh':
          case 'Math.cbrt':
          case 'Math.ceil':
          case 'Math.clz32':
          case 'Math.cos':
          case 'Math.cosh':
          case 'Math.exp':
          case 'Math.expm1':
          case 'Math.floor':
          case 'Math.fround':
          case 'Math.hypot':
          case 'Math.imul':
          case 'Math.log':
          case 'Math.log10':
          case 'Math.log1p':
          case 'Math.log2':
          case 'Math.max':
          case 'Math.min':
          case 'Math.pow':
          case 'Math.random': // The odds of this being a round zero are very small... but let's not bet on it :)
          case 'Math.round':
          case 'Math.sign':
          case 'Math.sin':
          case 'Math.sinh':
          case 'Math.sqrt':
          case 'Math.tan':
          case 'Math.tanh':
          case 'Math.trunc': {
            // I think the only thing we can predict about all these funcs is that their result is a number... (might be NaN/Infinity)
            return createTypingObject({
              mustBeType: 'number',
            });
          }
          case 'Number.isFinite':
          case 'Number.isInteger':
          case 'Number.isNaN':
          case 'Number.isSafeInteger': {
            // Some of these should be replaced with the global builtin function, by normalization
            return createTypingObject({
              mustBeType: 'boolean',
              worstCaseValueSet: new Set([true, false]),
            });
          }
          case 'Number.parseFloat':
          case 'Number.parseInt': {
            // These should be replaced with the global value by normalization
            return createTypingObject({
              mustBeType: 'number',
            });
          }
          case 'Object.is': // We may be able to predict certain outcomes
          case 'Object.isFrozen':
          case 'Object.isSealed': {
            return createTypingObject({
              mustBeType: 'boolean',
              worstCaseValueSet: new Set([true, false]),
            });
          }
          case 'String.fromCharCode':
          case 'String.fromCodePoint':
          case 'String.raw': {
            // Looks like these always return a string of sorts... no matter what arg you feed them
            return createTypingObject({
              mustBeType: 'string',
            });
          }
          default: {
            // We have no real idea what's going on here yet
            // TODO: we can track the callee and see if the return type reveals a clue...
            return createTypingObject({});
          }
        }
      }

      // We have no real idea what's going on here yet
      // TODO: we can track the callee and see if the return type reveals a clue...
      return createTypingObject({});
    }
    case 'NewExpression': {
      return createTypingObject({
        mustBeType: 'object',
        mustBeTruthy: true,
      });
    }
    case 'MemberExpression': {
      if (!valueNode.computed) {
        // Resolve some builtins...
        switch (valueNode.object.name + '.' + valueNode.property.name) {
          case 'Math.E':
          case 'Math.LN10':
          case 'Math.LN2':
          case 'Math.LOG10E':
          case 'Math.LOG2E':
          case 'Math.PI':
          case 'Math.SQRT1_2':
          case 'Math.SQRT2': {
            // We can't inline these due to loss of precision
            const v = Math[valueNode.property.name];
            ASSERT(v);
            return createTypingObject({
              mustBeType: 'number',
              mustBeTruthy: true,
              mustBeValue: v,

              worstCaseValueSet: new Set([v]),
              mustBePrimitive: true,
              primitiveValue: v,
            });
          }

          case 'Number.EPSILON': // We keep this as is
          case 'Number.MAX_VALUE': // We keep this as is
          case 'Number.MIN_VALUE': // We keep this as is
          case 'Number.NEGATIVE_INFINITY': // Is -Infinity
          case 'Number.POSITIVE_INFINITY': {
            // Is Infinity
            // Note: the values that could be inlined should be handled by normalization.
            const v = Number[valueNode.property.name];
            ASSERT(v, 'this math value should be known and truthy, right?', valueNode.property.name, v);
            return createTypingObject({
              mustBeType: 'number',
              mustBeTruthy: true,
              mustBeValue: v,

              worstCaseValueSet: new Set([v]),
              mustBePrimitive: true,
              primitiveValue: v,
            });
          }

          case 'Number.NaN': {
            // is global NaN
            // Note: the values that could be inlined should be handled by normalization.
            const v = Math[valueNode.property.name];
            ASSERT(v);
            return createTypingObject({
              mustBeType: 'number',
              mustBeFalsy: true,
              mustBeValue: NaN,

              worstCaseValueSet: new Set([NaN]),
            });
          }

          case BUILTIN_ARRAY_PROTOTYPE + '.push':
          case BUILTIN_ARRAY_PROTOTYPE + '.pop':
          case BUILTIN_ARRAY_PROTOTYPE + '.shift':
          case BUILTIN_ARRAY_PROTOTYPE + '.unshift':
          case BUILTIN_ARRAY_PROTOTYPE + '.filter':
          case BUILTIN_ARRAY_PROTOTYPE + '.flat':
          case BUILTIN_ARRAY_PROTOTYPE + '.concat': {
            return createTypingObject({
              mustBeType: 'function',
              mustBeTruthy: true,

              builtinTag: 'Array#' + valueNode.property.name,
            });
          }

          case BUILTIN_NUMBER_PROTOTYPE + '.toString': {
            return createTypingObject({
              mustBeType: 'function',
              mustBeTruthy: true,

              builtinTag: 'Number#' + valueNode.property.name,
            });
          }

          case BUILTIN_STRING_PROTOTYPE + '.toString': {
            return createTypingObject({
              mustBeType: 'function',
              mustBeTruthy: true,

              builtinTag: 'String#' + valueNode.property.name,
            });
          }

          case BUILTIN_BOOLEAN_PROTOTYPE + '.toString': {
            return createTypingObject({
              mustBeType: 'function',
              mustBeTruthy: true,

              builtinTag: 'Boolean#' + valueNode.property.name,
            });
          }
        }
      }

      // TODO: we can perhaps figure something out by tracking the object
      return createTypingObject({});
    }
    case 'ArrayExpression': {
      return createTypingObject({
        mustBeType: 'array',
        mustBeTruthy: true,
      });
    }
    case 'ObjectExpression': {
      return createTypingObject({
        mustBeType: 'object',
        mustBeTruthy: true,
      });
    }
    case 'TaggedTemplateExpression': {
      // TODO (this is not a string but a call)
      ASSERT(false, 'should be eliminated during normalization');
      return;
    }
    case 'ClassExpression': {
      return createTypingObject({
        mustBeType: 'class',
        mustBeTruthy: true,
      });
    }
    case 'Param': {
      // hmmmm do nothing?
      return createTypingObject({});
    }
    case 'ChainExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'SequenceExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'AssignmentExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'LogicalExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'ConditionalExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'UpdateExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
    }
    case 'ArrowFunctionExpression': {
      ASSERT(false, 'normalized code does not have this node: ' + valueNode.type);
      return;
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
      mustBeValue,
      bang,
      builtinTag,
      oneBitAnded,
      anded,
      orredWith,
      xorredWith,
      worstCaseValueSet,
      mustBePrimitive, // TODO: remove
      primitiveValue, // TODO: remove
      ...unknown
    } = from;
    ASSERT(Object.keys(unknown).length === 0, 'add new .typing properties here as well (from)', unknown);
  }
  {
    const {
      mustBeType,
      mustBeFalsy,
      mustBeTruthy,
      mustBeValue,
      bang,
      builtinTag,
      oneBitAnded,
      anded,
      orredWith,
      xorredWith,
      worstCaseValueSet,
      mustBePrimitive, // TODO: remove
      primitiveValue, // TODO: remove
      ...unknown
    } = into;
    ASSERT(Object.keys(unknown).length === 0, 'add new .typing properties here as well (into)', unknown);
  }

  if (from.mustBeType === undefined || into.mustBeType === false) {
    // Noop. this value was not discovered or already determined to be indeterminable.
  } else if (into.mustBeType === undefined) {
    // Copy the value verbatim
    into.mustBeType = from.mustBeType;
  } else if (into.mustBeType !== from.mustBeType) {
    // The typing differed so we don't have a single type.
    into.mustBeType = false;
  }
  ASSERT(
    [
      undefined,
      false,
      'undefined',
      'null',
      'boolean',
      'number',
      'string',
      'array',
      'object',
      'function',
      'class',
      'set',
      'map',
      'regex',
    ].includes(into.mustBeType),
    'typing.mustBeType is an enum of `undefined`, `false`, or one of a fixed set of strings',
    into.mustBeType,
  );

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

  if (from.mustBeValue === undefined || into.mustBeValue === null) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly some value.
  } else if (into.mustBeValue === undefined) {
    // The output was not set yet so set it to the input
    into.mustBeValue = from.mustBeValue;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now null ("cannot be determined")
    into.mustBeValue = null;
  }
  ASSERT(
    ['undefined', 'boolean', 'number', 'string'].includes(typeof into.mustBeValue) || into.mustBeValue === null,
    'typing.mustBeValue must be a primitive',
    into.mustBeValue,
  );

  if (from.bang === undefined || into.bang === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly falsy.
  } else {
    // Either the input was not known or the output was true. Set to whatever the input was.
    into.bang = from.bang;
  }
  ASSERT([undefined, true, false].includes(into.bang), 'typing.bang is an enum of undefined or bool', into.bang);

  if (from.builtinTag === undefined || into.builtinTag === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly some tag.
  } else if (into.builtinTag === undefined) {
    // The output was not set yet so set it to the input
    into.builtinTag = from.builtinTag;
  } else {
    // The input and output were set. If they are the same nothing happens. If they differ then the output is now false ("cannot be determined")
    into.builtinTag = false;
  }
  ASSERT(
    into.builtinTag === undefined || into.builtinTag === false || typeof into.builtinTag === 'string',
    'typing.builtinTag must be undefined, false, or a string',
    into.builtinTag,
  );

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

  if (from.worstCaseValueSet === undefined || into.worstCaseValueSet === false) {
    // Noop. Either the input was undetermined or the result was already known not to be certainly anded.
  } else if (into.worstCaseValueSet === undefined) {
    // The output was not set yet so set it to the input
    into.worstCaseValueSet = from.worstCaseValueSet;
  } else if (from.worstCaseValueSet === false) {
    // The input could not determine a set of values so neither can the output.
    into.worstCaseValueSet = false;
  } else {
    ASSERT(
      from.worstCaseValueSet instanceof Set && into.worstCaseValueSet instanceof Set,
      'the from and into should both have a value set now...',
      from,
      into,
    );
    // The input and output have a set of values. Merge them
    from.worstCaseValueSet.forEach((v) => into.worstCaseValueSet.add(v));
  }
  ASSERT(
    into.worstCaseValueSet === undefined || into.worstCaseValueSet === false || into.worstCaseValueSet instanceof Set,
    'typing.worstCaseValueSet is a Set of primitives or undefined or false',
    into.worstCaseValueSet,
  );
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
//     - A function with closure access escapes (not passed around directly, and transitively no function calling this function escapes)
//       - Any observable side effect might mutate it
//     - Functions that have access under closure do not escape, recursively (any function calling this function does not escape etiher, etc)
//       - Any observable side effect may end up mutating
//     - The mutation can happen through a direct mutation or an observable side effect
//       - Only observable side effects by local bindings might mutate the binding
//       - The idea is that only local functions can mutate a closure. If the function did not escape then a binding that's not
//         local can't possibly reference a function that does through call or getters/setters so we should be able to ignore it.
export function mayBindingMutateBetweenRefs(meta, ref1, ref2, includeProperties = false) {
  ASSERT(meta, 'should receive a meta...');
  vgroup(
    'mayBindingMutateBetweenRefs(checking if  `' + (typeof meta === 'string' ? meta : meta.uniqueName) + '` , was mutated between',
    ref1.action + ':' + ref1.kind,
    ', and ',
    ref2.action + ':' + ref2.kind,
    ', including props?',
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

  if (meta.isConstant || meta.isBuiltin) {
    // This binding can not be mutated at all.
    vlog('Result: Constants and builtins wont be mutated');
    vgroupEnd();
    return false;
  }
  ASSERT(meta.isImplicitGlobal || meta.bfuncNode, 'either its implicitly global or an explicitly defined binding now', meta);
  const bindingScope = meta.isImplicitGlobal ? 1 : +meta.bfuncNode.$p.scope;
  const onlyLocalUse = meta.rwOrder.every((ref) => +ref.scope === bindingScope);
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
  ASSERT(curr?.action === 'read' || curr?.action === 'write', 'prev should be a ref', curr);
  ASSERT(curr.blockChain.startsWith(prev.blockChain), 'the previous ref should be reachable from the current ref');

  // Start from the block and index of the prev ref.
  // If the prev is not an assignment, skip an index forward
  // As long as the statement containing the curr ref is not found,
  //   If the current statement is an assignment to meta, return true
  //   If the current statement is a for-x with meta as the lhs, return true
  //   Are there any other ways of mutating the binding? Catch can't go here.
  // If the curr ref is a read inside a loop
  //   Scan forward in the loop
  //   If there is a forward write ref that can reach this read, return true
  //   (If there is no forward read then for any iteration of the loop the read should return the same value)
  // Must return false

  let blockPointer = prev.blockBodies.length - 1;
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
    ', lens:',
    blockBodies.map((a) => a.length),
  );

  vlog('start index:', currentIndex, ', target index:', currentMax, ', total statements:', currentBody.length);
  while (true) {
    vgroup('- currentIndex:', currentIndex, ', currentMax:', currentMax, ', block len:', currentBody.length);
    if (currentBody === curr.blockBody && currentIndex === curr.blockIndex) {
      vlog('This is the targeted ref statement. All pass.');
      vgroupEnd();
      break;
    } else if (currentIndex <= currentMax) {
      // The target ref is not a descendant of this statement. Visit exhaustively before moving on to the next statement.
      const next = currentBody[currentIndex];
      vlog('Next statement:', next.type);

      // The only statement to write to a binding is an expression statement writing to the binding (gosh)

      if (nodeMightMutateNameUntrapped([next], metaName, includeProperties, singleScope).state === MUTATES) {
        vlog('Has observable side effects. bailing');
        source(next);
        vgroupEnd();
        vgroupEnd();
        return true;
      }

      vlog('Has no observable side effects. Okay. 3');
      ++currentIndex;
    } else {
      vlog('End of current block.');
      ++blockPointer;
      if (blockPointer >= blockIndexes) {
        vlog('This may be a bug?');
        ASSERT(false, 'not sure whether the pointer should ever exceed the block');
        // This should be the end
        vgroupEnd();
        break;
      }
      vlog('Jumping into next block');
      currentBody = blockBodies[blockPointer];
      currentMax = blockIndexes[blockPointer];
      currentIndex = 0;
      vlog('This block has', currentBody.length, 'statements');
    }
    vgroupEnd();
  }
  vgroupEnd();

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
    } else if (node.type === 'VariableDeclaration') {
      ASSERT(node.declarations[0].id.name !== metaName, 'right?');
      const init = node.declarations[0].init;

      if (exprNodeMightMutateNameUntrapped(init, singleScope, includeProperties)) {
        mutates = true;
        return;
      }
    } else if (node.type === 'IfStatement') {
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
    } else if (['ForInStatement', 'ForOfStatement'].includes(node.type)) {
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
    } else if (node.type === 'WhileStatement') {
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
    } else if (node.type === 'LabeledStatement') {
      const { state: a, labels: labels } = nodeMightMutateNameUntrapped(node.body.body, metaName, includeProperties, singleScope);
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
    } else if (node.type === 'ReturnStatement') {
      state = COMPLETES;
      vlog('Return statement overrides any other state');
      return true;
    } else if (['ContinueStatement', 'BreakStatement'].includes(node.type)) {
      vlog('A continue or break will LABELS if the previous nodes mutates');
      if (mutates) {
        vlog('- previous nodes mutated so adding', node.label?.name || '', 'to the label set');
        // This mutation is observable as soon as the continue or break target is found. Either the explicit label, or the nearest loop.
        labelsAfterWhichConsiderMutates.push(node.label?.name || '');
      }
      state = LABELS;
      return true;
    } else if (node.type === 'ThrowStatement') {
      vlog('A throw overrides any other state');
      state = COMPLETES;
      return true;
    } else if (node.type === 'TryStatement') {
      vlog('Try statement. Just checking whether it writes to the binding at all anywhere');

      // Doing puristic mutation analysis with the try statement is a nightmare of surprisingly high complexity. So we won't.
      // For an example, any completion in the finally block overrides any completion of the other two blocks.
      // So instead we'll do it differently; if the try, catch, or finally block contain any writes anywhere, consider the
      // `try` statement to have mutated the binding. It's the safest approach without falling into a very deep rabbit hole.

      if (
        blockContainsMutate(node.block, metaName, singleScope, includeProperties) ||
        (node.handler && blockContainsMutate(node.handler.body, metaName, singleScope, includeProperties)) ||
        (node.finalizer && blockContainsMutate(node.finalizer, metaName, singleScope, includeProperties))
      ) {
        vlog('- it does. The try mutates');
        mutates = true;
      }
    } else {
      vlog('Ehhh. Considering NONE');
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
  if (singleScope) {
    vlog(
      'A normalized non-assignment expression should not be able to mutate a binding directly so this should not mutate a single scope binding',
    );
    return false;
  }

  // Expr may be operator that coerces the value, triggering toString/valueOf
  if (['Identifier', 'FunctionExpression', 'Literal'].includes(expr.type)) {
    // Can not cause mutation of metaName unless lhs is it, and it wasn't
    vlog('Rhs has no observable side effect');
  } else if (expr.type === 'TemplateLiteral') {
    vlog('Templates can not have observable side effects inside Preval');
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
    if (expr.elements.every((enode) => enode.type !== 'SpreadElement')) {
      vlog('Array literal with spread elements might mutate something as a side effect');
    } else {
      vlog('Array literal without spread elements cannot mutate anything');
    }
  } else if (expr.type === 'ObjectLiteral') {
    if (expr.properties.every((pnode) => pnode.type !== 'SpreadElement')) {
      vlog('Object literal with spread elements might mutate something as a side effect');
    } else {
      vlog('Object literal without spread elements cannot mutate anything');
    }
  } else {
    // TemplateLiteral
    // TODO: ObjectExpression / ArrayExpression: the spread could trigger a mutation
    vlog('The rhs of an assignment may have side effects that is able to cause a mutation');
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
  if (['Identifier', 'FunctionExpression', 'Literal'].includes(expr.type)) {
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
    if (expr.elements.every((enode) => enode.type !== 'SpreadElement')) {
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
