import {ASSERT} from "../utils.mjs"
import {memberRefExpression} from "./pst.mjs"

export function verifyPst(node) {
  if (Array.isArray(node)) node.forEach(n => verifyPstNode(n));
  else verifyPstNode(node);
}

function verifyPstNode(node) {
  switch (node.type) {
    case 'ArrayLiteral': return verifyExpression(node);
    case 'AssignmentComputedPropStatement': return verifyStatement(node);
    case 'AssignmentRefStatement': return verifyStatement(node);
    case 'AssignmentPropStatement': return verifyStatement(node);
    case 'AwaitExpression': return verifyExpression(node);
    case 'BinaryExpression': return verifyExpression(node);
    case 'BlockStatement': return verifyStatement(node);
    case 'BreakStatement': return verifyStatement(node);
    case 'CallRefExpression': return verifyExpression(node);
    case 'CallSimpleExpression': return verifyExpression(node);
    case 'CallMethodExpression': return verifyExpression(node);
    case 'CallComputedMethodExpression': return verifyExpression(node);
    case 'ClassExpression': return verifyExpression(node);
    case 'ConstStatement': return verifyStatement(node);
    case 'DebuggerStatement': return verifyStatement(node);
    case 'ExportNamed': return verifyStatement(node);
    case 'ExpressionStatement': return verifyStatement(node);
    case 'FunctionExpression': return verifyFunction(node);
    case 'Getter': return verifyMethodLike(node);
    case 'IfStatement': return verifyStatement(node);
    case 'ImportNamed': return verifyStatement(node);
    case 'LabelStatement': return verifyStatement(node);
    case 'LetStatement': return verifyStatement(node);
    case 'MemberComputedExpression': return verifyExpression(node);
    case 'MemberRefExpression': return verifyExpression(node);
    case 'Method': return verifyMethodLike(node);
    case 'NewExpression': return verifyExpression(node);
    case 'Primitive': return verifyExpression(node);
    case 'Program': {
      ASSERT(!Array.isArray(node.body), 'program.body should not be an array');
      verifyBlock(node.body);
      break;
    }
    case 'Property': return verifyProperty(node);
    case 'Ref': return verifyExpression(node);
    case 'RegexLiteral': return verifyExpression(node);
    case 'ReturnStatement': return verifyStatement(node);
    case 'Setter': return verifyMethodLike(node);
    case 'StringConcat': return verifyExpression(node);
    case 'ThisExpression': return verifyExpression(node);
    case 'ThrowStatement': return verifyStatement(node);
    case 'TryStatement': return verifyStatement(node);
    case 'UnaryExpression': return verifyExpression(node);
    case 'YieldExpression': return verifyExpression(node);
    case 'WhileStatement': return verifyStatement(node);

    default: {
      ASSERT(false, 'Unknown PST node type:', node?.type, node);
    }
  }
}

function verifyStatement(node) {
  switch (node.type) {
    case 'AssignmentComputedPropStatement': {
      verifySimple(node.left);
      verifySimple(node.prop);
      verifyExpression(node.right);
      break;
    }
    case 'AssignmentRefStatement': {
      verifyRef(node.left);
      verifyExpression(node.right);
      break;
    }
    case 'AssignmentPropStatement': {
      verifySimple(node.left);
      expect(typeof node.prop, 'string', node);
      verifyExpression(node.right);
      break;
    }
    case 'BlockStatement': {
      verifyBlock(node.body);
      break;
    }
    case 'BreakStatement': {
      if (node.label) expect(typeof node.label, 'string', node);
      break;
    }
    case 'ConstStatement': {
      verifyRef(node.id);
      verifyExpression(node.init);
      break;
    }
    case 'DebuggerStatement': {
      return;
    }
    case 'ExportNamed': {
      expect(Array.isArray(node.pairs), true, node);
      node.pairs.forEach(pair => {
        expect(Array.isArray(pair), true, node);
        expect(pair.length, 2, node);
        verifyRef(pair[0]);
        expect(typeof pair[1], 'string', node);
      });
      return;
    }
    case 'ExpressionStatement': {
      verifyExpression(node.expression);
      break;
    }
    case 'IfStatement': {
      verifySimple(node.test);
      verifyBlock(node.yes);
      verifyBlock(node.no);
      break;
    }
    case 'ImportNamed': {
      expect(Array.isArray(node.pairs), true, node);
      node.pairs.forEach(pair => {
        expect(Array.isArray(pair), true, node);
        expect(pair.length, 2, node);
        expect(typeof pair[0], 'string', node);
        verifyRef(pair[1]);
      });
      expect(typeof node.source, 'string', node);
      break;
    }
    case 'LabelStatement': {
      expect(typeof node.label, 'string', node);
      verifyBlock(node.body);
      break;
    }
    case 'LetStatement': {
      verifyRef(node.id);
      verifyExpression(node.init);
      break;
    }
    case 'Program': {
      ASSERT(!Array.isArray(node.body), 'program.body should not be an array');
      expect(node.body?.type, 'BlockStatement', node.body);
      verifyPst(node.body);
      break;
    }
    case 'ReturnStatement': {
      verifySimple(node.arg);
      return;
    }
    case 'ThrowStatement': {
      verifySimple(node.arg);
      return;
    }
    case 'TryStatement': {
      ASSERT(node.trap, 'must have a catch block', node);
      ASSERT(node.id, 'must have an id (catch var)', node);

      verifyBlock(node.body);
      if (node.trap) {
        verifyRef(node.id);
        verifyBlock(node.trap);
      }
      return;
    }
    case 'WhileStatement': {
      verifySimple(node.test);
      verifyBlock(node.body);
      break;
    }

    default: {
      ASSERT(false, 'Unknown PST statement node type:', node?.type, node);
    }
  }
}

function verifyBlock(node) {
  expect(node?.type, 'BlockStatement', node);
  node.body.forEach(verifyStatement);
}

function expect(left, right, node) {
  if (left !== right) {
    ASSERT(false, `expecting \`${left}\` to equal \`${right}\` but nopenopenope`, node);
  }
}

function verifyRef(node) {
  expect(node.type, 'Ref', node);
  expect(typeof node.name, 'string', node);
}

function verifySimple(node) {
  // A simple node has no side effects (other than potentially a reference/TDZ error). Basically idents and primitive.
  switch (node?.type) {
    case 'Ref': return verifyRef(node);
    case 'Primitive': return verifyPrimitive(node);
    case 'UnaryExpression': {
      expect(node.op === '+' || node.op === '-', true, node);
      verifyPrimitive(node.arg);
      return;
    }
    default: ASSERT(false, 'expected node to be a primitive', node);
  }
}

function verifySimpleOrSpread(node) {
  if (node.type === 'SpreadElement') {
    verifySimple(node.arg);
  } else {
    verifySimple(node);
  }
}

function verifyPropertyOrSpread(node) {
  if (node.type === 'SpreadElement') {
    verifySimple(node.arg);
  } else {
    verifyPst(node);
  }
}

function verifyPrimitive(node) {
  switch (node?.type) {
    case 'Primitive': return;
    case 'UnaryExpression': {
      expect(node.op === '+' || node.op === '-', true, node);
      verifyPrimitive(node.arg);
      break;
    }
    case 'Ref': {
      expect(['NaN', 'Infinity'].includes(node.name), true, node);
      break;
    }

    default:
      ASSERT(false, 'expected node to be an primitive. maybe todo?', node?.type, node);
  }
}

function verifyString(node) {
  ASSERT(typeof node === 'string', 'strings be strings');
}

function verifyExpression(node) {
  switch (node?.type) {
    case 'ArrayLiteral': {
      node.elements.forEach(e => {
        if (e === null) return; // elided elements have null in the AST/PST
        verifySimpleOrSpread(e);
      });
      return;
    }
    case 'AwaitExpression': {
      verifySimple(node.arg);
      return;
    }
    case 'BinaryExpression': {
      expect(typeof node.op, 'string', node);
      verifySimple(node.left);
      verifySimple(node.right);
      return;
    }
    case 'CallComputedMethodExpression': {
      verifyRef(node.callee);
      verifySimple(node.method);
      node.args.forEach(arg => verifySimpleOrSpread(arg));
      return;
    }
    case 'CallRefExpression': {
      verifyRef(node.callee);
      node.args.forEach(arg => verifySimpleOrSpread(arg));
      return;
    }
    case 'CallMethodExpression': {
      verifySimple(node.callee); // true.toString() is valid
      expect(typeof node.method, 'string', node);
      node.args.forEach(arg => verifySimpleOrSpread(arg));
      return;
    }
    case 'CallSimpleExpression': {
      verifySimple(node.callee);
      node.args.forEach(arg => verifySimpleOrSpread(arg));
      return;
    }
    case 'ClassExpression': {
      verifyClass(node);
      return;
    }
    case 'FunctionExpression': {
      verifyFunction(node);
      return;
    }
    case 'MemberComputedExpression': {
      verifySimple(node.object);
      verifySimple(node.prop);
      return;
    }
    case 'MemberRefExpression': {
      verifySimple(node.object);
      expect(typeof node.prop, 'string', node);
      return;
    }
    case 'NewExpression': {
      node.args.forEach(arg => {
        if (arg.type === 'SpreadElement') {
          verifySimple(arg.arg);
        } else {
          verifySimple(arg);
        }
      });
      return;
    }
    case 'ObjectLiteral': {
      node.props.forEach(verifyPropertyOrSpread);
      return;
    }
    case 'Primitive': {
      expect(node.value === null || typeof node.name !== 'object', true, node);
      return;
    }
    case 'Ref': {
      expect(typeof node.name, 'string', node);
      return;
    }
    case 'RegexLiteral': {
      expect(typeof node.full, 'string', node);
      expect(typeof node.pattern, 'string', node);
      expect(typeof node.flags, 'string', node);
      return;
    }
    case 'StringConcat': {
      verifyString(node.left);
      verifySimple(node.middle);
      verifyString(node.right);
      return;
    }
    case 'ThisExpression': {
      return;
    }
    case 'UnaryExpression': {
      expect(typeof node.op, 'string', node);
      if (node.arg.type === 'MemberComputedExpression') {
        expect(node.op, 'delete', node);
        verifyExpression(node.arg);
      } else if (node.arg.type === 'MemberRefExpression') {
        expect(node.op, 'delete', node);
        verifyExpression(node.arg);
      } else {
        verifySimple(node.arg);
      }
      return;
    }
    case 'YieldExpression': {
      verifySimple(node.arg);
      return;
    }

    case 'AssignmentIdentExpression':
    case 'AssignmentPropExpression':
    case 'AssignmentComputedPropExpression':
    default:
      ASSERT(false, 'expected node to be an expression. maybe todo?', node?.type, node);
  }
}

function verifyObject(node) {
  expect(node.type, 'ObjectLiteral', node);
  node.props.map(verifyProp);
}

function verifyProp(node) {
  if (node.type === 'Property') {
    verifyProperty(node);
  } else if (node.type === 'Method') {
    verifyMethodLike(node);
  } else {
    console.log(node);
    TODO
  }
}

function verifyProperty(node) {
  expect(typeof node.isComputed, 'boolean', node);
  if (node.isComputed) {
    verifySimple(node.key);
    verifySimple(node.value);
  } else {
    expect(typeof node.key, 'string', node);
    verifySimple(node.value);
  }
}

function verifyMethodLike(node) {
  // object method, getter, or setter
  expect(typeof node.isComputed, 'boolean', node);
  if (node.isComputed) {
    verifySimple(node.key);
    verifyFunction(node.func);
  } else {
    expect(typeof node.key, 'string', node);
    verifyFunction(node.func);
  }
}

function verifyFunction(node) {
  expect(typeof node.isAsync, 'boolean', node);
  expect(typeof node.isGenerator, 'boolean', node);
  if (node.id) verifyRef(node.id);
  node.params.forEach(param => {
    if (param.type === 'Param') {
      expect(param.name, '$$' + param.index, param);
    } else {
      expect(param.type, 'RestParam', param);
      verifySimple(param.arg);
    }
  });
  node.body.body.forEach(node => verifyStatement(node));
}

function verifyClass(node) {
  expect(Array.isArray(node.body), true, node);
  node.body.forEach(verifyClassMethod);
}

function verifyClassMethod(node) {
  expect(typeof node.isComputed, 'boolean', node);
  expect(typeof node.isStatic, 'boolean', node);
  if (node.isComputed) {
    verifySimple(node.key);
    verifyFunction(node.func);
  } else {
    expect(typeof node.key, 'string', node);
    verifyFunction(node.func);
  }
}
