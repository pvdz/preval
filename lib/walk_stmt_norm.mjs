// From Mope
// This version walks only statements (or declarations) and assumes normalized code.
// This means the walker doesn't need to traverse all the expresison nodes because
// the only block in an expression is a function expression and that can only appear
// inside an assignment or var init (as the rest is normalized away).

// Unlike the other walker, this one only supports walking down and up. It ignores mutations.

// As such, this walker is significantly faster which is very useful in some cases :)

export const WALK_ON = 0;
export const WALK_NO_FURTHER = 1;
export const HARD_STOP = 2;

export function walkStmt(f, node, prop) {
  try {
    _walk(f, node, prop);
  } catch (e) {
    if (e === 1 || e === 2) {
      return;
    }
    throw e;
  }
}
function _walk(f, node, prop) {
  let types = [];
  let nodes = [];
  let props = [];
  let indexes = [];

  let blockBodies = Array.isArray(node) ? [node] : [];
  let blockIndexes = Array.isArray(node) ? [0] : [];

  let path = {
    types,
    props,
    indexes,
    nodes,
    blockBodies,
    blockIndexes,
  };

  function ww(f, node, prop, index = -1, blockRoot) {
    //console.log('ww:', node?.type, node instanceof Array, prop, index, blockIndexes, blockRoot);
    if (node === null) {
      return;
    }
    if (typeof node !== 'object') {
      console.log('Node:');
      console.dir(node);
      console.log('path:', path);
      throw new Error(
        'Should only walk nodes or `null` values, but `parent.' + prop + (index >= 0 ? '[' + index + ']' : '') + '` -> ' + node,
      );
    }

    if (node instanceof Array) {
      return node.forEach((node, i) => {
        if (blockRoot) blockIndexes.push(i);
        ww(f, node, prop, i)
        if (blockRoot) blockIndexes.pop();
      });
    }

    let t = node.type;

    props.push(prop);
    types.push(t);
    nodes.push(node);
    indexes.push(index);

    // Revisit current node as long as it changed after the visitor
    const stop = f(node, true, t, path) === true;
    if (stop === HARD_STOP) {
      throw 1;
    }

    if (stop !== WALK_NO_FURTHER) {
      // callback can prevent going deeper by explicitly returning true
      switch (t) {
        case 'BlockStatement':
          blockBodies.push(node.body)
          ww(f, node.body, 'body', -1, true);
          blockBodies.pop();
          break;

        case 'BreakStatement':
          break;

        case 'CatchClause':
          ww(f, node.body, 'body');
          break;

        case 'ClassBody':
          ww(f, node.body, 'body');
          break;

        case 'ClassDeclaration':
        case 'ClassExpression':
          ww(f, node.body, 'body');
          break;

        case 'ContinueStatement':
          break;

        case 'DebuggerStatement':
          break;

        case 'Directive':
          break;

        case 'DoWhileStatement':
          ww(f, node.body, 'body');
          break;

        case 'EmptyStatement':
          break;

        case 'ExportAllDeclaration':
          break;

        case 'ExportDefaultDeclaration':
          break;

        case 'ExportNamedDeclaration':
          break;

        case 'ExportSpecifier':
          break;

        case 'ExpressionStatement': {
          // I think we only care about the function expression case here. Which can only appear in an assignment (in normalized code).
          // If we see it, traverse it like normal.
          if (node.expression.type === 'AssignmentExpression' && node.expression.right.type === 'FunctionExpression') {
            ww(f, node.expression.right, 'right');
          }
          break;
        }

        case 'ForInStatement':
          ww(f, node.body, 'body');
          break;
        case 'ForOfStatement':
          ww(f, node.body, 'body');
          break;

        case 'ForStatement':
          ww(f, node.body, 'body');
          break;

        case 'FunctionExpression':
          ww(f, node.body, 'body');
          break;

        case 'IfStatement':
          ww(f, node.consequent, 'consequent');
          ww(f, node.alternate, 'alternate');
          break;

        case 'ImportDeclaration':
          break;

        case 'ImportDefaultSpecifier':
        case 'ImportNamespaceSpecifier':
          break;

        case 'ImportSpecifier':
          break;

        case 'LabeledStatement':
          ww(f, node.body, 'body');
          break;

        case 'MethodDefinition':
          TODO // how do we normalize these?
          onlyObjects(node, ['key', 'value']);
          ww(f, node.key, 'key');
          ww(f, node.value, 'value');
          break;

        case 'Program':
          onlyObjects(node, ['body']);
          blockBodies.push(node.body);
          ww(f, node.body, 'body', -1, true);
          blockBodies.pop();
          break;

        case 'ReturnStatement':
          break;

        case 'SwitchCase':
          ww(f, node.consequent, 'consequent');
          break;

        case 'SwitchStatement':
          ww(f, node.cases, 'cases');
          break;

        case 'ThrowStatement':
          break;

        case 'TryStatement':
          ww(f, node.block, 'block');
          ww(f, node.handler, 'handler');
          ww(f, node.finalizer, 'finalizer');
          break;

        case 'VariableDeclaration':
          if (node.declarations[0].init.type === 'FunctionExpression') {
            ww(f, node.declarations[0].init, 'init');
          }
          break;

        case 'WhileStatement':
          ww(f, node.body, 'body');
          break;

        case 'WithStatement':
          ww(f, node.body, 'body');
          break;

        case 'ArrayExpression':
        case 'ArrayPattern':
        case 'ArrowFunctionExpression':
        case 'AssignmentExpression':
        case 'AssignmentPattern':
        case 'AwaitExpression':
        case 'BinaryExpression':
        case 'CallExpression':
        case 'ChainExpression':
        case 'ConditionalExpression':
        case 'FunctionDeclaration':
        case 'Identifier':
        case 'Literal':
        case 'LogicalExpression':
        case 'MemberExpression':
        case 'MetaProperty':
        case 'NewExpression':
        case 'ObjectExpression':
        case 'ObjectPattern':
        case 'Param':
        case 'Property':
        case 'RestElement':
        case 'SequenceExpression':
        case 'SpreadElement':
        case 'Super':
        case 'TaggedTemplateExpression':
        case 'TemplateElement':
        case 'TemplateLiteral':
        case 'ThisExpression':
        case 'UnaryExpression':
        case 'UpdateExpression':
        case 'VariableDeclarator':
        case 'YieldExpression':
          throw new Error('should never visit node type ' + node.type);
        default:
          console.log('[lib/walk] error node:', node);
          throw '[lib/walk] Unknown node type, from `' + prop + '`, node = ' + node;
      }

      const after = f(node, false, t, path);
      if (after === HARD_STOP) {
        throw 2;
      }
    }

    types.pop();
    props.pop();
    nodes.pop();
    indexes.pop();
  }

  ww(f, node, prop, undefined, Array.isArray(node));
}

