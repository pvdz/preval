// From Tenko
export default function walk(f, node, prop){
  let types = [];
  let nodes = [];
  let props = [];

  let path = {
    types,
    nodes,
    props,
  };

  function ww(f, node, prop) {
    if (node === null) {
      return;
    }
    if (typeof node !== 'object') {
      console.dir(node);
      throw new Error('Should only walk nodes or `null` values, from `' + prop + '`, node = ' + node);
    }

    if (node instanceof Array) {
      return node.forEach(node => ww(f, node, prop));
    }

    let t = node.type;

    props.push(prop);
    types.push(t);
    nodes.push(node);

    if (f(node, true, t, path) !== true) { // callback can prevent going deeper by explicitly returning true
      switch (t) {
        case 'ArrayExpression':
        case 'ArrayPattern':
          onlyObjects(node, ['elements']);
          ww(f, node.elements, 'elements');
          break;

        case 'ArrowFunctionExpression':
          onlyObjects(node, ['params', 'id', 'body']);
          ww(f, node.params, 'params');
          ww(f, node.body, 'body');
          break;

        case 'AssignmentExpression':
        case 'AssignmentPattern':
          onlyObjects(node, ['left', 'right']);
          ww(f, node.right, 'right'); // Visit right before left to make sure rhs is resolved
          ww(f, node.left, 'left');
          break;

        case 'AwaitExpression':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        case 'BinaryExpression':
          onlyObjects(node, ['left', 'right']);
          ww(f, node.left, 'left');
          ww(f, node.right, 'right');
          break;

        case 'BlockStatement':
          onlyObjects(node, ['body']);
          ww(f, node.body, 'body');
          break;

        case 'BreakStatement':
          onlyObjects(node, ['label']);
          ww(f, node.label, 'label');
          break;

        case 'CallExpression':
          onlyObjects(node, ['callee', 'arguments']);
          ww(f, node.callee, 'callee');
          ww(f, node.arguments, 'arguments');
          break;

        case 'CatchClause':
          onlyObjects(node, ['param', 'body']);
          ww(f, node.param, 'param');
          ww(f, node.body, 'body');
          break;

        case 'ClassBody':
          onlyObjects(node, ['body']);
          ww(f, node.body, 'body');
          break;

        case 'ClassDeclaration':
        case 'ClassExpression':
          onlyObjects(node, ['id', 'superClass', 'body']);
          ww(f, node.id ,'id');
          ww(f, node.superClass, 'superClass');
          ww(f, node.body, 'body');
          break;

        case 'ConditionalExpression':
          onlyObjects(node, ['test', 'consequent', 'alternate']);
          ww(f, node.test, 'test');
          ww(f, node.consequent, 'consequent');
          ww(f, node.alternate, 'alternate');
          break;

        case 'ContinueStatement':
          onlyObjects(node, ['label']);
          ww(f, node.label, 'label');
          break;

        case 'DebuggerStatement':
        case 'Directive':
          onlyObjects(node, []);
          break;

        case 'DoWhileStatement':
          onlyObjects(node, ['body', 'test']);
          ww(f, node.body, 'body');
          ww(f, node.test, 'test');
          break;

        case 'EmptyStatement':
          onlyObjects(node, []);
          break;

        case 'ExportAllDeclaration':
          onlyObjects(node, ['source']);
          ww(f, node.source, 'source');
          break;

        case 'ExportDefaultDeclaration':
          onlyObjects(node, ['declaration']);
          ww(f, node.declaration, 'declaration');
          break;

        case 'ExportNamedDeclaration':
          onlyObjects(node, ['specifiers', 'declaration', 'source']);
          ww(f, node.specifiers, 'specifiers');
          ww(f, node.declaration, 'declaration');
          ww(f, node.source, 'source');
          break;

        case 'ExportSpecifier':
          onlyObjects(node, ['local', 'exported']);
          ww(f, node.local, 'local');
          ww(f, node.exported, 'exported');
          break;

        case 'ExpressionStatement':
          onlyObjects(node, ['expression']);
          ww(f, node.expression, 'expression');
          break;

        case 'ForInStatement':
        case 'ForOfStatement':
          onlyObjects(node, ['left', 'right', 'body']);
          ww(f, node.left, 'left');
          ww(f, node.right, 'right');
          ww(f, node.body, 'body');
          break;

        case 'ForStatement':
          onlyObjects(node, ['init', 'test', 'update', 'body']);
          ww(f, node.init, 'init');
          ww(f, node.test, 'test');
          ww(f, node.update, 'update');
          ww(f, node.body, 'body');
          break;

        case 'FunctionDeclaration':
        case 'FunctionExpression':
          onlyObjects(node, ['id', 'params', 'body']);
          ww(f, node.id, 'id');
          ww(f, node.params, 'params');
          ww(f, node.body, 'body');
          break;

        case 'Identifier':
          onlyObjects(node, []);
          break;

        case 'IfStatement':
          onlyObjects(node, ['test', 'consequent', 'alternate']);
          ww(f, node.test, 'test');
          ww(f, node.consequent, 'consequent');
          ww(f, node.alternate, 'alternate');
          break;

        case 'ImportDeclaration':
          onlyObjects(node, ['specifiers', 'source']);
          ww(f, node.specifiers, 'specifiers');
          ww(f, node.source, 'source');
          break;

        case 'ImportDefaultSpecifier':
        case 'ImportNamespaceSpecifier':
          onlyObjects(node, ['local']);
          ww(f, node.local, 'local');
          break;

        case 'ImportSpecifier':
          onlyObjects(node, ['imported', 'local']);
          ww(f, node.imported, 'imported');
          ww(f, node.local, 'local');
          break;

        case 'LabeledStatement':
          onlyObjects(node, ['label', 'block']);
          ww(f, node.label, 'label');
          ww(f, node.block, 'block');
          break;

        case 'Literal':
          onlyObjects(node, node.regex ? ['regex'] : []); // regexes will have an object here
          break;

        case 'LogicalExpression':
          onlyObjects(node, ['left', 'right']);
          ww(f, node.left, 'left');
          ww(f, node.right, 'right');
          break;

        case 'MemberExpression':
          onlyObjects(node, ['object', 'property']);
          ww(f, node.object, 'object');
          ww(f, node.property, 'property');
          break;

        case 'MetaProperty':
          onlyObjects(node, ['meta', 'property']);
          ww(f, node.meta, 'meta');
          ww(f, node.property, 'property');
          break;

        case 'MethodDefinition':
          onlyObjects(node, ['key', 'value']);
          ww(f, node.key, 'key');
          ww(f, node.value, 'value');
          break;

        case 'NewExpression':
          onlyObjects(node, ['arguments', 'callee']);
          ww(f, node.arguments, 'arguments');
          ww(f, node.callee, 'callee');
          break;

        case 'ObjectExpression':
          onlyObjects(node, ['properties']);
          ww(f, node.properties, 'properties');
          break;

        case 'ObjectPattern':
          onlyObjects(node, ['properties']);
          ww(f, node.properties, 'properties');
          break;

        case 'Program':
          onlyObjects(node, ['body']);
          ww(f, node.body, 'body');
          break;

        case 'Property':
          onlyObjects(node, ['key', 'value']);
          ww(f, node.key, 'key');
          ww(f, node.value, 'value');
          break;

        case 'RestElement':
        case 'ReturnStatement':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        case 'SequenceExpression':
          onlyObjects(node, ['expressions']);
          ww(f, node.expressions, 'expressions');
          break;

        case 'SpreadElement':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        case 'Super':
          onlyObjects(node, []);
          break;

        case 'SwitchCase':
          onlyObjects(node, ['test', 'consequent']);
          ww(f, node.test, 'test');
          ww(f, node.consequent, 'consequent');
          break;

        case 'SwitchStatement':
          onlyObjects(node, ['discriminant', 'cases']);
          ww(f, node.discriminant, 'discriminant');
          ww(f, node.cases, 'cases');
          break;

        case 'TaggedTemplateExpression':
          onlyObjects(node, ['tags', 'quasi']);
          ww(f, node.tag, 'tags');
          ww(f, node.quasi, 'quasi');
          break;

        case 'TemplateElement':
          onlyObjects(node, ['value']);
          // walk(f, node.value, 'value'); // not a node
          break;

        case 'TemplateLiteral':
          onlyObjects(node, ['expressions', 'quasis']);
          ww(f, node.expressions, 'expressions');
          ww(f, node.quasis, 'quasis');
          break;

        case 'ThisExpression':
          onlyObjects(node, []);
          break;

        case 'ThrowStatement':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        case 'TryStatement':
          onlyObjects(node, ['block', 'handler', 'finalizer']);
          ww(f, node.block, 'block');
          ww(f, node.handler, 'handler');
          ww(f, node.finalizer, 'finalizer');
          break;

        case 'UnaryExpression':
        case 'UpdateExpression':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        case 'VariableDeclaration':
          onlyObjects(node, ['declarations']);
          ww(f, node.declarations, 'declarations');
          break;

        case 'VariableDeclarator':
          onlyObjects(node, ['id', 'init']);
          ww(f, node.id, 'id');
          ww(f, node.init, 'init');
          break;

        case 'WhileStatement':
          onlyObjects(node, ['test', 'body']);
          ww(f, node.test, 'test');
          ww(f, node.body, 'body');
          break;

        case 'WithStatement':
          onlyObjects(node, ['object', 'body']);
          ww(f, node.object, 'object');
          ww(f, node.body, 'body');
          break;

        case 'YieldExpression':
          onlyObjects(node, ['argument']);
          ww(f, node.argument, 'argument');
          break;

        default:
          throw 'Unknown node type, from `' + prop + '`, node = ' + node;
      }

      f(node, false, t, path);
    }

    types.pop();
    props.pop();
    nodes.pop();
  }

  ww(f, node, prop);
};

function onlyObjects(node, props) {
  // Asserting AST structs
  for (let p in node) {
    if (node.hasOwnProperty(p)) {
      if (node[p] !== null && typeof node[p] === 'object' && !props.includes(p) && p[0] !== '$' && p !== 'loc') {
        console.log('This is the node for the following `onlyObjects` crash:');
        console.log(node);
        console.log('In particular node[p]:');
        console.log(node[p]);
        console.log('Known props:', props)
        throw new Error('onlyObjects: Missing node[prop] with prop = `' + p + '` that is object');
      }
    }
  }
}
