import Prettier from 'prettier';
import { printer } from '../lib/printer.mjs';

const colorLess = typeof process !== 'undefined' && process.argv.includes('-C');

export const RED = colorLess ? '' : '\x1b[31;1m';
export const RED_WHITE = colorLess ? '' : '\x1b[41;1m';
export const GREEN = colorLess ? '' : '\x1b[32m';
export const YELLOW = colorLess ? '' : '\x1b[33;1m';
export const BLUE = colorLess ? '' : '\x1b[34;1m';
export const PURPLE = colorLess ? '' : '\x1b[35;1m';
export const WHITE = colorLess ? '' : '\x1b[37m';
export const RESET = colorLess ? '' : '\x1b[0m';
export const DIM = colorLess ? '' : '\x1b[30;1m';
export const BOLD = colorLess ? '' : '\x1b[;1;1m';
export const TRIBE = colorLess ? '' : '\x1b[36;1m';
export const WHITE_BLACK = colorLess ? '' : '\x1b[30;47m';

export function ASSERT(b, m = '', ...rest) {
  if (!b) {
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);
    groupEnd(true);

    error('Assertion error happened...');
    log('ASSERTION ARGS:');
    let n = m || '<assertion without desc>';
    log(...(rest.length ? rest : ['<assert had no further args>']));

    if (log !== console.log && typeof window !== 'undefined') {
      console.error('Assertion error happened...');
      console.log('ASSERTION ARGS:');
      console.log(...(rest.length ? rest : ['<assert had no further args>']));
    }
    console.trace(n + '; ' + rest.join(', '));
    throw new Error(n);
  }
}
export function ASSERT_LOC(loc) {
  ASSERT(typeof loc === 'object' && loc, 'loc should be an object', loc);
  ASSERT(typeof loc.filename === 'string', 'loc filename must be a string', loc);
  ASSERT(typeof loc.column === 'number' && loc.column >= 0, 'loc filename must be a number >=0', loc);
  ASSERT(typeof loc.line === 'number' && loc.line >= 1, 'loc filename must be a number >0', loc);
}

export function printNode(node) {
  ASSERT(node);
  ASSERT(node.type);
  switch (node.type) {
    case 'Identifier':
      return `<<${node.name}>>`;
    case 'Literal':
      return `<${node.raw}>`;
    case 'MemberExpression':
      return `${printNode(node.object)}.${printNode(node.property)}`;
    case 'CallExpression':
      return `${printNode(node.callee)}(${node.arguments.map(printNode).join(', ')})`;
    case 'FunctionDeclaration':
    case 'FunctionExpression':
      return `function${node.id ? ' ' + printNode(node.id) : ''}(${node.params.map(printNode).join(', ')})`;
    case 'ThisExpression':
      return 'this';
    case 'Super':
      return 'super';
    case 'AssignmentPattern':
      ASSERT(node.left.type === 'Identifier', 'todo, fixme if this is different');
      return printNode(node.left) + '=' + printNode(node.right);
    case 'NewExpression':
      return 'new ' + printNode(node.callee) + '(' + node.arguments.map(printNode).join(', ') + ')';
    default:
      return `<???${node.type}>`;
  }
  // return `${t}${path.nodes[i].name ? '<' + path.nodes[i].name + '>' : ''}${t === 'Literal' ? '<' + path.nodes[i].raw + '>' : ''}${path.props[i+1] && `[${path.props[i+1]}]` || ''}`
}

let VERBOSE = true;

const Console = {
  log: (...args) => console.log(...args),
  error: (...args) => console.error(...args),
  group: (...args) => console.group(...args),
  groupEnd: (...args) => console.groupEnd(...args),
  dir: (...args) => console.dir(...args),
};

export function setStdio(handler, verbose = VERBOSE) {
  VERBOSE = verbose;
  Console.log = (...args) => handler('L', ...args);
  Console.error = (...args) => handler('E', ...args);
  Console.group = (...args) => handler('G', ...args);
  Console.groupEnd = (...args) => handler('F', ...args);
  Console.dir = (...args) => handler('D', ...args);
}

export function clearStdio() {
  VERBOSE = true;
  Console.log = (...args) => console.log(...args);
  Console.error = (...args) => console.log(...args);
  Console.group = (...args) => console.group(...args);
  Console.groupEnd = (...args) => console.groupEnd(...args);
  Console.dir = (...args) => console.dir(...args);
}

let indent = 0;
export function log(...args) {
  if (VERBOSE) return Console.log(...args);
}
export function error(...args) {
  if (VERBOSE) return Console.error(...args);
}
export function group(...args) {
  ++indent;
  if (VERBOSE) return Console.group(...args);
}
export function groupEnd(...args) {
  --indent;
  if (VERBOSE) return Console.groupEnd(...args);
}
export function dir(...args) {
  if (VERBOSE) return Console.dir(...args);
}

// Debugging
export function tmat(ast, shouldPrint = VERBOSE) {
  if (shouldPrint) return printer(ast);
  return '<verbose=false>';
}
export function fmat(code, shouldPrint = VERBOSE) {
  if (!shouldPrint) return '<verbose=false>';
  try {
    return Prettier.format(code, {
      parser: 'babel',
      ...{
        // maybe keep in sync with prettierrc? prolly fairly immutable and irrelevant for tests anyways...
        printWidth: 140,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
    });
  } catch (e) {
    // Prettier error implies invalid transformation. Uups.
    throw new Error('Prettier error. Implies the resulting transform is invalid.\n' + e);
  }
}

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
