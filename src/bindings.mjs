import { VERBOSE_TRACING, BLUE, RESET } from './constants.mjs';
import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd } from './utils.mjs';
import globals from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/
import * as AST from './ast.mjs';

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
      throw ASSERT(false);
    case 'Directive':
      throw ASSERT(false);
    case 'DoWhileStatement':
      ASSERT(parentProp === 'body' || parentProp === 'test', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'EmptyStatement':
      throw ASSERT(false);
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
      throw ASSERT(false);
    case 'IfStatement':
      ASSERT(parentProp === 'test' || parentProp === 'body', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ImportDeclaration':
      throw ASSERT(false);
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
      // Even in assignments to properties it will read the object first
      if (parentProp === 'object' || parentNode.computed) return 'read';
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
      throw ASSERT(false);
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
      throw ASSERT(false);
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
      throw ASSERT(false);
    case 'TemplateLiteral':
      ASSERT(parentProp === 'expressions', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'ThisExpression':
      throw ASSERT(false);
    case 'ThrowStatement':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'read';
    case 'TryStatement':
      throw ASSERT(false);
    case 'UnaryExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      // Note: none of the unary operators currently mutate. (++/-- are update expressions)
      return 'read';
    case 'UpdateExpression':
      ASSERT(parentProp === 'argument', 'unexpected parent prop that has ident', parentNode.type, '.', parentProp);
      return 'readwrite';
    case 'VariableDeclaration':
      throw ASSERT(false);
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
  throw ASSERT(false, 'Support this new node', node);
}

export function generateUniqueGlobalName(name, fdata, assumeDoubleDollar = false) {
  ASSERT(!assumeDoubleDollar || name.startsWith('$$'), 'if assuming double dollar, we should receive one');
  if (!assumeDoubleDollar && name.startsWith('$$')) {
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
  ASSERT(!/^\$\$\d+$/.test(name), 'param placeholders should not reach this place');
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
    typing: {
      // string. If anything, this should then be the primitive type that this binding must be.
      // TODO: what if there are multiple options? Or even like bool/undefined/null? "falsy/truthy"
      mustBeType: '',
      mustBeFalsy: false, // false, null, undefined, 0, ''
      mustBeTruthy: false, // at least none of the falsy ones :)
      // number. If type is a number range, these are its bounds
      rangeStart: -Infinity,
      rangeEnd: Infinity,
      // For bindings where we know the value to be within a certain set of values, this is that set.
      // For example: `const t = typeof x` has a (small) finite set of values regardless of what `x` is
      // We do have to arbitrarily limit the max size of this set (I guess)
      // Set. If `undefined` then none were collected. If `false` then there were too many, whatever that is.
      valueSet: undefined,
    },
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
    innerLoop,
    ...rest
  } = obj;
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createReadRef in the func too!', rest);
  ASSERT(blockIndex >= 0);
  return {
    action: 'read',
    kind: 'read', // Can we make better use of this?
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
    innerLoop,
  };
}
export function createWriteRef(obj) {
  const {
    kind, // var, assign, for, ..?
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain,
    innerLoop,
    ...rest
  } = obj;
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createWriteRef in the func too!', rest);
  ASSERT(blockIndex >= 0);

  return {
    action: 'write',
    kind,
    parentNode,
    parentProp,
    parentIndex,
    blockBody,
    blockIndex,
    pfuncNode, // Function/Program that is the nearest to this ref
    node,
    rwCounter,
    scope,
    blockChain,
    innerLoop,
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
    if (ignoreGlobals) return node.name; // Ignore the globals. Assume they are already handled (function cloning)
    log('- The ident `' + node.name + '` could not be resolved and is an implicit global');
    // Register one...
    vlog('Creating implicit global binding for `' + node.name + '` now');
    const uniqueName = generateUniqueGlobalName(node.name, fdata);
    const meta = registerGlobalIdent(fdata, uniqueName, node.name, { isImplicitGlobal: true });
    if (VERBOSE_TRACING) {
      vlog('- Meta:', {
        ...meta,
        reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
        writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
      });
    }
    lexScopeStack[0].$p.nameMapping.set(node.name, uniqueName);
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
export function preprocessScopeNode(node, parentNode, fdata, funcNode, lexScopeCounter, oncePass) {
  ASSERT(arguments.length === preprocessScopeNode.length, 'arg count');
  // This function attempts to find all binding names defined in this scope and create unique name mappings for them
  // (This doesn't update any read/write nodes with their new name! Only prepares their new name to be used and unique.)

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

export function inferInitialType(meta, init) {
  // Given a node `init`, determine the initial typing for this meta.

  if (init.type === 'Literal') {
    if (init.raw === 'null') {
      meta.typing.mustBeType = 'null';
      meta.typing.mustBeFalsy = true;
      meta.typing.valueSet = new Set([null]);
    } else if (typeof init.value === 'number') {
      meta.typing.mustBeType = 'number';
      meta.typing.mustBeFalsy = init.value === 0;
      meta.typing.mustBeTruthy = init.value !== 0;
      meta.typing.valueSet = new Set([init.value]);
    } else if (typeof init.value === 'string') {
      meta.typing.mustBeType = 'string';
      meta.typing.mustBeFalsy = init.value === '';
      meta.typing.mustBeTruthy = init.value !== '';
      meta.typing.valueSet = new Set([init.value]);
    } else if (typeof init.value === 'boolean') {
      meta.typing.mustBeType = 'boolean';
      meta.typing.mustBeFalsy = !init.value;
      meta.typing.mustBeTruthy = init.value;
      meta.typing.valueSet = new Set([init.value]);
    } else if (init.raw[0] === '/') {
      meta.typing.mustBeType = 'regex';
      meta.typing.mustBeFalsy = false;
      meta.typing.mustBeTruthy = true;
      meta.typing.valueSet = new Set([init.value]);
    } else {
      ASSERT(false, 'support me', init);
    }
  } else if (init.type === 'Literal') {
    switch (init.name) {
      case 'undefined': {
        meta.typing.mustBeType = 'undefined';
        meta.typing.mustBeFalsy = true;
        meta.typing.mustBeTruthy = false;
        meta.typing.valueSet = new Set([undefined]);
        break;
      }
      case 'NaN':
        meta.typing.mustBeType = 'number';
        meta.typing.mustBeFalsy = true;
        meta.typing.mustBeTruthy = false;
        meta.typing.valueSet = new Set([NaN]);
        break;
      case 'Infinity':
        meta.typing.mustBeType = 'number';
        meta.typing.mustBeFalsy = false;
        meta.typing.mustBeTruthy = true;
        meta.typing.valueSet = new Set([Infinity]);
        break;
    }
  } else if (init.type === 'ThisExpression') {
    meta.typing.mustBeType = 'object';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'UnaryExpression') {
    switch (init.operator) {
      case 'delete':
        meta.typing.mustBeType = 'boolean';
        meta.typing.valueSet = new Set([true, false]);
        break;
      case 'void':
        meta.typing.mustBeType = 'undefined';
        meta.typing.mustBeFalsy = true;
        meta.typing.mustBeTruthy = false;
        meta.typing.valueSet = new Set([undefined]);
        break;
      case '+':
        meta.typing.mustBeType = 'number';
        break;
      case '-':
        meta.typing.mustBeType = 'number';
        break;
      case '!':
        meta.typing.mustBeType = 'boolean';
        meta.typing.valueSet = new Set([true, false]);
        break;
      case '~':
        meta.typing.mustBeType = 'number';
        break;
      case 'typeof':
        meta.typing.mustBeType = 'string';
        meta.typing.valueSet = new Set(['undefined', 'boolean', 'number', 'string', 'object', 'function', 'bigint']);
        break;
      default:
        ASSERT(false);
    }
  } else if (init.type === 'BinaryExpression') {
    switch (init.operator) {
      case '===':
      case '==':
      case '!==':
      case '!=':
      case '<':
      case '<=':
      case '>':
      case '>=':
      case 'in':
      case 'instanceof':
        meta.typing.mustBeType = 'boolean';
        meta.typing.valueSet = new Set([true, false]);
        break;
      case '-':
      case '*':
      case '/':
      case '%':
      case '>>':
      case '>>>':
      case '<<':
      case '^':
      case '&':
      case '|':
      case '**':
        meta.typing.mustBeType = 'number';
        meta.typing.valueSet = false;
        break;
      case '+':
        // TODO... If I know one side is a string or object then I'll know the result is a string...?
        break;
      default:
        ASSERT(false, 'you forgot one', init);
    }
  } else if (init.type === 'FunctionExpression') {
    meta.typing.mustBeType = 'function';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'CallExpression') {
    // TODO
  } else if (init.type === 'NewExpression') {
    meta.typing.mustBeType = 'object';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'MemberExpression') {
    // TODO
  } else if (init.type === 'ArrayExpression') {
    meta.typing.mustBeType = 'array';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'ObjectExpression') {
    meta.typing.mustBeType = 'object';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'TaggedTemplateExpression') {
    // TODO (this is not a string but a call)
  } else if (init.type === 'TemplateLiteral') {
    // Note: this must be a template with multiple parts so hard to be more specific
    meta.typing.mustBeType = 'string';
  } else if (init.type === 'ClassExpression') {
    meta.typing.mustBeType = 'class';
    meta.typing.mustBeFalsy = false;
    meta.typing.mustBeTruthy = true;
    meta.typing.valueSet = false;
  } else if (init.type === 'Param') {
    // hmmmm do nothing?
  } else if (init.type === 'ChainExpression') {
    ASSERT(false);
  } else if (init.type === 'SequenceExpression') {
    ASSERT(false);
  } else if (init.type === 'AssignmentExpression') {
    ASSERT(false);
  } else if (init.type === 'LogicalExpression') {
    ASSERT(false);
  } else if (init.type === 'ConditionalExpression') {
    ASSERT(false);
  } else if (init.type === 'UpdateExpression') {
    ASSERT(false);
  } else if (init.type === 'ArrowFunctionExpression') {
    ASSERT(false);
  } else {
    // Do I want to assert false here? At this point there can't be that many legit unchecked nodes left
  }
}
