import { ASSERT, BLUE, group, groupEnd, log, RESET } from './utils.mjs';
import globals from './globals.mjs';
import * as Tenko from '../lib/tenko.prod.mjs'; // This way it works in browsers and nodejs and github pages ... :/

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

export function generateUniqueGlobalName(name, globallyUniqueNamingRegistry) {
  // Create a (module) globally unique name. Then use that name for the local scope.
  let n = 0;
  if (globallyUniqueNamingRegistry.has(name)) {
    // No point in having a `foo$1$22$1$1$1$1$1$1$1$1$1$1$1$1$1`
    if (name.includes('$')) {
      name = name.replace(/\$\d+$/, '');
    }
    while (globallyUniqueNamingRegistry.has(name + '$' + ++n));
  }
  return n ? name + '$' + n : name;
}
export function registerGlobalIdent(fdata, name, originalName, { isExport = false, isImplicitGlobal = false, knownBuiltin = false } = {}) {
  const meta = fdata.globallyUniqueNamingRegistry.get(name);
  if (meta) return meta;

  const newMeta = {
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
    writes: [], // {parent, prop, index} indirect reference ot the node being assigned
    reads: [], // {parent, prop, index} indirect reference to the node that refers to this binding
  };
  ASSERT(name);
  fdata.globallyUniqueNamingRegistry.set(name, newMeta);
  return newMeta;
}
export function createFreshVar(name, fdata) {
  ASSERT(createFreshVar.length === arguments.length, 'arg count');
  const tmpName = generateUniqueGlobalName(name, fdata.globallyUniqueNamingRegistry);
  registerGlobalIdent(fdata, tmpName, tmpName);
  return tmpName;
}

export function createUniqueGlobalLabel(name, globallyUniqueLabelRegistry) {
  // Create a (module) globally unique label name.
  let n = 0;
  if (globallyUniqueLabelRegistry.has(name)) {
    while (globallyUniqueLabelRegistry.has(name + '_' + ++n));
  }
  return n ? name + '_' + n : name;
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
  });
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
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    grandNode, // parent of the parent
    grandProp,
    grandIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    node,
    rwCounter,
    scope,
    blockChain,
    innerLoop,
  };
}
export function createWriteRef(obj) {
  const {
    parentNode, // parent of the node
    parentProp,
    parentIndex,
    blockBody, // nearest ancestor block to the node
    blockIndex,
    node,
    rwCounter,
    scope,
    blockChain,
    innerLoop,
    decl = null,
    assign = null,
    funcDecl = null,
    param = null,
    ...rest
  } = obj;
  ASSERT(JSON.stringify(rest) === '{}', 'add new props to createWriteRef in the func too!', rest);
  ASSERT(blockIndex >= 0);

  return {
    action: 'write',
    parentNode,
    parentProp,
    parentIndex,
    blockBody,
    blockIndex,
    node,
    rwCounter,
    scope,
    blockChain,
    innerLoop,
    decl,
    assign,
    funcDecl,
    param,
  };
}

export function findUniqueNameForBindingIdent(
  node,
  isFuncDeclId = false,
  fdata,
  lexScopeStack,
  ignoreGlobals = false,
  VERBOSE_TRACING = true,
) {
  const globallyUniqueNamingRegistry = fdata.globallyUniqueNamingRegistry;
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Print less for large inputs. Mostly care about this for test cases. So, 10k?
  ASSERT(node && node.type === 'Identifier', 'need ident node for this', node);
  if (VERBOSE_TRACING) log('Finding unique name for `' + node.name + '`. Lex stack size:', lexScopeStack.length);
  let index = lexScopeStack.length;
  if (isFuncDeclId) {
    // The func decl id has to be looked up outside its own inner scope
    if (VERBOSE_TRACING) log('- Starting at parent because func decl id');
    --index;
  }
  while (--index >= 0) {
    if (VERBOSE_TRACING) {
      log(
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
    if (VERBOSE_TRACING) log('Creating implicit global binding for `' + node.name + '` now');
    const uniqueName = generateUniqueGlobalName(node.name, globallyUniqueNamingRegistry);
    const meta = registerGlobalIdent(fdata, uniqueName, node.name, { isImplicitGlobal: true });
    if (VERBOSE_TRACING) {
      log('- Meta:', {
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
  if (VERBOSE_TRACING) log('- Should be bound in scope index', index, 'mapping to `' + uniqueName + '`');
  const meta = globallyUniqueNamingRegistry.get(uniqueName);
  if (VERBOSE_TRACING) {
    log('- Meta:', {
      ...meta,
      reads: meta.reads.length <= 10 ? meta.reads : '<snip>',
      writes: meta.writes.length <= 10 ? meta.writes : '<snip>',
    });
  }
  ASSERT(meta, 'the meta should exist for all declared variables at this point');
  return uniqueName;
}
export function preprocessScopeNode(node, parentNode, fdata, funcNode, lexScopeCounter, VERBOSE_TRACING = true) {
  if (fdata.len > 10 * 1024) VERBOSE_TRACING = false; // Print less for large inputs. Mostly care about this for test cases. So, 10k?
  ASSERT(arguments.length === preprocessScopeNode.length || arguments.length - 1 === preprocessScopeNode.length, 'arg count');
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

  if (VERBOSE_TRACING) group(BLUE + 'Scope tracking' + RESET, 'scope id=', lexScopeCounter);

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
    if (VERBOSE_TRACING) group('Checking scope... (sid=', s.$sid, ')');
    if (VERBOSE_TRACING) log('- type:', s.type, ', bindings?', s.names === Tenko.HAS_NO_BINDINGS ? 'no' : 'yes, ' + s.names.size);
    if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
      if (VERBOSE_TRACING) log('Breaking for function header scopes in Block');
      if (VERBOSE_TRACING) groupEnd();
      break;
    }

    if (s.names === Tenko.HAS_NO_BINDINGS) {
      if (VERBOSE_TRACING) log('- no bindings in this scope, parent:', s.parent && s.parent.type);
    } else if (
      ['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(node.type) &&
      s.type === Tenko.SCOPE_LAYER_FUNC_BODY
    ) {
      if (VERBOSE_TRACING) log('- ignoring scope body in function node');
    } else if (node.type === 'CatchClause' && s.type !== Tenko.SCOPE_LAYER_CATCH_HEAD && s.type !== Tenko.SCOPE_LAYER_CATCH_BODY) {
      if (VERBOSE_TRACING) log('- in catch clause we only care about the two catch scopes');
      if (VERBOSE_TRACING) groupEnd();
      break;
    } else if (node.type === 'BlockStatement' && s.type === Tenko.SCOPE_LAYER_GLOBAL) {
      if (VERBOSE_TRACING) log('- do not process global scope in block');
      if (VERBOSE_TRACING) groupEnd();
      break;
    } else if (
      node.type === 'BlockStatement' &&
      s.type === Tenko.SCOPE_LAYER_FUNC_BODY &&
      !['FunctionExpression', 'FunctionDeclaration', 'ArrowFunctionExpression'].includes(parentNode.type)
    ) {
      if (VERBOSE_TRACING) log('- do not process func scope in a block that is not child of a function');
      if (VERBOSE_TRACING) groupEnd();
      break;
    } else {
      s.names.forEach((v, name) => {
        if (VERBOSE_TRACING) log('-', name, ':', v);

        if (v === Tenko.BINDING_TYPE_VAR && funcNode !== node) {
          // only process `var` bindings in the scope root
          if (VERBOSE_TRACING) log('  - skipping var because not scope root');
          return;
        }

        if (v === Tenko.BINDING_TYPE_FUNC_VAR && s.type === Tenko.SCOPE_LAYER_FUNC_PARAMS) {
          if (VERBOSE_TRACING) log('  - skipping func var in param layer or global layer');
          return;
        }

        const uniqueName = generateUniqueGlobalName(name, fdata.globallyUniqueNamingRegistry);
        if (VERBOSE_TRACING) log('Adding', name, 'to globallyUniqueNamingRegistry -->', uniqueName);
        registerGlobalIdent(fdata, uniqueName, name);
        node.$p.nameMapping.set(name, uniqueName);
      });
    }

    if (VERBOSE_TRACING) groupEnd();

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
    groupEnd();

    // Each node should now be able to search through the lexScopeStack, and if any of them .has() the name, it will
    // be able to .get() the unique name, which can be used in either the root scope or by the compiler in phase2.
    log('Scope', lexScopeCounter, '; ' + node.type + '.$p.nameMapping:');
    log(
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
