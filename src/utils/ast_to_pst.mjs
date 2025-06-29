import * as PST from './pst.mjs';
import { ASSERT, todo } from "../utils.mjs"

export const astToPst = convert;

function convert(node) {
  switch (node.type) {
    case 'ArrayExpression': {
      return PST.arrayLiteral(node.elements.map(e => e === null ? null : convert(e)));
    }
    case 'ArrayPattern': {
      REJECT
      break;
    }
    case 'ArrowFunctionExpression': {
      REJECT
      break;
    }
    case 'AssignmentExpression': {
      // These can only appear as statements and should be caught at the expressionstatement case
      REJECT
      break;
    }
    case 'AssignmentPattern': {
      REJECT
      break;
    }
    case 'AwaitExpression': {
      return PST.awaitExpression(
        convert(node.argument)
      );
    }
    case 'BinaryExpression': {
      return PST.binaryExpression(
        node.operator,
        convert(node.left),
        convert(node.right),
      );
    }
    case 'BlockStatement': {
      // TODO: distinct between kinds of blocks?
      return PST.blockStatement(
        node.body.map(convert)
      );
    }
    case 'BreakStatement': {
      return PST.breakStatement(node.label?.name);
    }
    case 'CallExpression': {
      if (node.callee.type === 'MemberExpression') {
        if (node.callee.computed) {
          return PST.callComputedMethodExpression(
            convert(node.callee.object),
            convert(node.callee.property),
            node.arguments.map(convert),
          );
        }
        return PST.callMethodExpression(
          convert(node.callee.object),
          node.callee.property.name,
          node.arguments.map(convert),
        );
      }
      if (node.callee.type === 'Identifier' && !['NaN', 'Infinity', 'undefined', 'true', 'false'].includes(node.callee.name)) {
        return PST.callRefExpression(
          PST.ref(node.callee.name),
          node.arguments.map(convert),
        );
      }
      if (['Literal', 'UnaryExpression', 'TemplateLiteral', 'Identifier'].includes(node.callee.type)) {
        // These will lead to an error but may be valid intermediate representations
        return PST.callSimpleExpression(
          convert(node.callee),
          node.arguments.map(convert),
        );
      }

      //hoe kan tests/cases/normalize/array/spread_member_call.md toch crashen?

      console.log(node)
      TODO
      break;
    }
    case 'CatchClause': {
      // The try statement should convert this without visiting this node
      REJECT
      break;
    }
    case 'ChainExpression': {
      REJECT
      break;
    }
    case 'ClassBody': {
      TODO
      break;
    }
    case 'ClassDeclaration': {
      REJECT
      break;
    }
    case 'ClassExpression': {
      return PST.classExpression(
        node.id && PST.ref(node.id.name),
        node.superClass && convert(node.superClass),
        node.body.body.map(convert),
      );
    }
    case 'ConditionalExpression': {
      REJECT
      break;
    }
    case 'ContinueStatement': {
      REJECT
      break;
    }
    case 'DebuggerStatement': {
      return PST.debuggerStatement();
    }
    case 'Directive': {
      // meh
      REJECT
      break;
    }
    case 'DoWhileStatement': {
      REJECT
      break;
    }
    case 'EmptyStatement': {
      return PST.emptyStatement();
    }
    case 'ExportAllDeclaration': {
      return PST.exportStar(node.source.value);
    }
    case 'ExportDefaultDeclaration': {
      REJECT
      break;
    }
    case 'ExportNamedDeclaration': {
      return PST.exportNamed(node.specifiers.map(s => [PST.ref(s.local.name), s.exported.name]));
    }
    case 'ExportSpecifier': {
      REJECT
      break;
    }
    case 'ExpressionStatement': {
      if (node.expression.type === 'AssignmentExpression') {
        if (node.expression.left.type === 'MemberExpression') {
          if (node.expression.left.computed) {
            return PST.assignmentComputedPropStatement(convert(node.expression.left.object), convert(node.expression.left.property), convert(node.expression.right));
          }
          return PST.assignmentPropStatement(convert(node.expression.left.object), node.expression.left.property.name, convert(node.expression.right));
        }
        return PST.AssignmentRefStatement(PST.ref(node.expression.left.name), convert(node.expression.right));
      }
      return PST.expressionStatement(convert(node.expression));
    }
    case 'ForInStatement': {
      REJECT
      break;
    }
    case 'ForOfStatement': {
      REJECT
      break;
    }
    case 'ForStatement': {
      REJECT
      break;
    }
    case 'FunctionDeclaration': {
      REJECT
      break;
    }
    case 'FunctionExpression': {
      ASSERT(node.params.every(p => p.type === 'Param'), 'func params are Params, right?', node);
      return PST.functionExpression(
        node.id && PST.ref(node.id.name),
        node.async,
        node.generator,
        node.params.map(p => PST.param(p.name, +p.name.slice(2), Boolean(node.param))),
        convert(node.body),
      );
    }
    case 'Identifier': {
      // Note: anything that reaches here must be a reference. Otherwise the caller should have checked the case explicitly, like Property etc
      return PST.ref(node.name);
    }
    case 'IfStatement': {
      return PST.ifStatement(convert(node.test), convert(node.consequent), node.alternate && convert(node.alternate));
    }
    case 'ImportDeclaration': {
      // Note: in preval we convert the source from a regular string to a templates but in regular AST the source is always a regular string. Support both here.
      return PST.importNamed(node.specifiers.map(s => [s.imported.name, PST.ref(s.local.name)]), node.source?.quasis?.[0]?.value?.cooked ?? node.source.value);
    }
    case 'ImportDefaultSpecifier': {
      REJECT
      break;
    }
    case 'ImportNamespaceSpecifier': {
      REJECT
      break;
    }
    case 'ImportSpecifier': {
      REJECT
      break;
    }
    case 'LabeledStatement': {
      return PST.labelStatement(node.label.name, convert(node.body));
    }
    case 'Literal': {
      if (['number', 'string', 'boolean'].includes(typeof node.value)) return PST.primitive(node.value);
      if (node.raw === 'null') return PST.primitive(null);
      if (node.raw.startsWith('/')) return PST.regexLiteral(node.raw, node.regex.pattern, node.regex.flags);
      console.log(node)
      TODO
      break;
    }
    case 'LogicalExpression': {
      REJECT
      break;
    }
    case 'MemberExpression': {
      if (node.computed) return PST.memberComputedExpression(convert(node.object), convert(node.property));
      return PST.memberRefExpression(convert(node.object), node.property.name);
    }
    case 'MetaProperty': {
      TODO
      break;
    }
    case 'MethodDefinition': {
      // Class method
      return PST.classMethod(node.computed ? convert(node.key) : node.key.name, node.computed, node.static, convert(node.value));
    }
    case 'NewExpression': {
      return PST.newExpression(convert(node.callee), node.arguments.map(convert));
    }
    case 'ObjectExpression': {
      return PST.objectLiteral(
        node.properties.map(convert),
      );
    }
    case 'ObjectPattern': {
      REJECT
      break;
    }
    case 'Param': {
      return PST.param(node.name, node.index, node.rest);
    }
    case 'Program': {
      return PST.program(PST.blockStatement(node.body.map(convert)));
    }
    case 'Property': {
      if (!node.key) TODO
      if (node.kind !== 'init') {
        if (node.kind === 'get') return PST.getter(node.computed ? convert(node.key) : node.key.name, node.computed, convert(node.value));
        if (node.kind === 'set') return PST.setter(node.computed ? convert(node.key) : node.key.name, node.computed, convert(node.value));
        console.log(node)
        TODO
      }
      if (node.method) {
        return PST.method(node.computed ? convert(node.key) : node.key.name, node.computed, convert(node.value));
      }
      if (node.computed) {
        return PST.property(convert(node.key), convert(node.value), true);
      }
      if (!node.value) TODO
      if (node.shorthand) REJECT

      ASSERT(node.key.type === 'Identifier', 'string/num obj props should become computed', node);
      return PST.property(node.key.name, convert(node.value), false);
    }
    case 'RestElement': {
      TODO
      break;
    }
    case 'ReturnStatement': {
      return PST.returnStatement(convert(node.argument));
    }
    case 'SequenceExpression': {
      REJECT
      break;
    }
    case 'SpreadElement': {
      return PST.spreadElement(convert(node.argument));
    }
    case 'SuperCall': {
      return PST.superCall(node.arguments.map(pnode => convert(pnode)));
    }
    case 'SuperMethodCall': {
      if (node.computed) return PST.superComputedMethodCall(convert(node.property), node.arguments.map(pnode => convert(pnode)));
      return PST.SuperMethodCall(node.property.name, node.arguments.map(pnode => convert(pnode)));
    }
    case 'SuperProp': {
      if (node.computed) return PST.superComputedProp(convert(node.property));
      return PST.superProp(node.property.name);
    }
    case 'SwitchCase': {
      REJECT
      break;
    }
    case 'SwitchStatement': {
      REJECT
      break;
    }
    case 'TaggedTemplateExpression': {
      TODO
      break;
    }
    case 'TemplateElement': {
      return PST.primitive(node.quasis[0].value.cooked);
    }
    case 'TemplateLiteral': {
      const arr = [node.quasis[0].value.cooked];
      for (let i=0; i<node.expressions.length; ++i) {
        arr.push(convert(node.expressions[i]));
        arr.push(node.quasis[i+1].value.cooked);
      }
      if (arr.length === 1 && typeof arr[0] === 'string') return PST.primitive(arr[0]);
      return PST.stringConcat(arr);
    }
    case 'ThisExpression': {
      return PST.thisExpression();
    }
    case 'ThrowStatement': {
      return PST.throwStatement(convert(node.argument));
    }
    case 'TryStatement': {
      ASSERT(!node.finalizer);
      ASSERT(node.handler);
      ASSERT(node.handler.param);
      return PST.tryStatement(
        convert(node.block),
        node.handler.param && convert(node.handler.param),
        convert(node.handler?.body),
      );
    }
    case 'UnaryExpression': {
      return PST.unaryExpression(node.operator, convert(node.argument));
    }
    case 'UpdateExpression': {
      REJECT
      break;
    }
    case 'VarStatement': {
      if (node.kind === 'let') return PST.letStatement(PST.ref(node.id.name), convert(node.init));
      if (node.kind === 'const') return PST.constStatement(PST.ref(node.id.name), convert(node.init));
      TODO
      break;
    }
    case 'VariableDeclaration': {
      REJECT
      break;
    }
    case 'VariableDeclarator': {
      REJECT
      break;
    }
    case 'WhileStatement': {
      return PST.whileStatement(convert(node.test), convert(node.body));
    }
    case 'WithStatement': {
      TODO
      break;
    }
    case 'YieldExpression': {
      return PST.yieldExpression(convert(node.argument), node.delegate);
    }
  }
}
