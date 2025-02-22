import {ASSERT} from "../utils.mjs"

export function printPst(node, config = {rename: false, indent: '', refPids: false}) {
  if (config.rename) {
    config.names = new Map; // Map<Identifier | '#SKIP>
    if (!config.globals) config.globals = new Set;
  }
  //ASSERT(/^ *$/.test(indent), 'no obj', [indent]);
  if (Array.isArray(node)) return node.map(n => printPstNode(n, config.indent || '', config)).join('\n');
  else return printPstNode(node, config.indent || '', config);
}

function printPstNode(node, indent, config) {
  ASSERT(typeof indent === 'string');
  switch (node.type) {
    case 'ArrayLiteral': return printExpression(indent, config, node);
    case 'AssignmentComputedPropStatement': return printStatement(indent, config, node);
    case 'AssignmentRefStatement': return printStatement(indent, config, node);
    case 'AssignmentPropStatement': return printStatement(indent, config, node);
    case 'AwaitExpression': return printExpression(indent, config, node);
    case 'BinaryExpression': return printExpression(indent, config, node);
    case 'BlockStatement': return printStatement(indent, config, node);
    case 'BreakStatement': return printStatement(indent, config, node);
    case 'CallRefExpression': return printExpression(indent, config, node);
    case 'CallSimpleExpression': return printExpression(indent, config, node);
    case 'CallMethodExpression': return printExpression(indent, config, node);
    case 'CallComputedMethodExpression': return printExpression(indent, config, node);
    case 'ClassExpression': return printExpression(indent, config, node);
    case 'ConstStatement': return printStatement(indent, config, node);
    case 'ContinueStatement': return printStatement(indent, config, node);
    case 'DebuggerStatement': return printStatement(indent, config, node);
    case 'ExportNamed': return printStatement(indent, config, node);
    case 'ExpressionStatement': return printStatement(indent, config, node);
    case 'EmptyStatement': return printStatement(indent, config, node);
    case 'FunctionExpression': return printExpression(indent, config, node);
    case 'Getter': return printObjectMethod(indent, config, node);
    case 'Ref': return printExpression(indent, config, node);
    case 'IfStatement': return printStatement(indent, config, node);
    case 'ImportNamed': return printStatement(indent, config, node);
    case 'LabelStatement': return printStatement(indent, config, node);
    case 'LetStatement': return printStatement(indent, config, node);
    case 'MemberComputedExpression': return printExpression(indent, config, node);
    case 'MemberRefExpression': return printExpression(indent, config, node);
    case 'Method': return printObjectMethod(indent, config, node);
    case 'NewExpression': return printExpression(indent, config, node);
    case 'Primitive': return printExpression(indent, config, node);
    case 'Program': return printStatement(indent, config, node);
    case 'Property': return printProperty(indent, config, node);
    case 'RegexLiteral': return printExpression(indent, config, node);
    case 'ReturnStatement': return printStatement(indent, config, node);
    case 'Setter': return printObjectMethod(indent, config, node);
    case 'StringConcat': return printExpression(indent, config, node);
    case 'ThisExpression': return printExpression(indent, config, node);
    case 'ThrowStatement': return printStatement(indent, config, node);
    case 'TryStatement': return printStatement(indent, config, node);
    case 'UnaryExpression': return printExpression(indent, config, node);
    case 'YieldExpression': return printExpression(indent, config, node);
    case 'WhileStatement': return printStatement(indent, config, node);

    default: {
      ASSERT(false, 'Unknown PST node type:', node?.type, node);
    }
  }
}

function printStatement(indent, config, node) {
  ASSERT(typeof indent === 'string', 'must pass indent');
  //ASSERT(/^ *$/.test(indent), 'no obj');
  return indent + _printStatement(indent, config, node);
}
function _printStatement(indent, config, node) {
  switch (node.type) {
    case 'AssignmentComputedPropStatement': {
      return `${printSimple(indent, config, node.left)}[${printSimple(indent, config, node.prop)}] = ${printSimple(indent, config, node.right)};`;
    }
    case 'AssignmentRefStatement': {
      return `${printSimple(indent, config, node.left)} = ${printExpression(indent, config, node.right)};`;
    }
    case 'AssignmentPropStatement': {
      return `${printSimple(indent, config, node.left)}.${node.prop} = ${printExpression(indent, config, node.right)};`;
    }
    case 'BlockStatement': {
      return printBlock(indent, config, node);
    }
    case 'BreakStatement': {
      if (node.label) return `break ${node.label};`;
      return 'break;';
    }
    case 'ContinueStatement': {
      if (node.label) return `continue ${node.label};`;
      return 'continue;';
    }
    case 'ConstStatement': {
      return `const ${printRef(indent, config, node.id)} = ${printExpression(indent, config, node.init)};`;
    }
    case 'DebuggerStatement': {
      return 'debugger;';
    }
    case 'EmptyStatement': {
      return ';';
    }
    case 'ExportNamed': {
      return `export { ${node.pairs.map(pair => `${printRef(indent, config, pair[0])} as ${pair[1]}`).join(',')} }${node.source ? ` } from "${node.source}"` : ''};`;
    }
    case 'ExpressionStatement': {
      return `${printExpression(indent, config, node.expression)};`;
    }
    case 'IfStatement': {
      return `if (${printSimple(indent, config, node.test)}) ${printBlock(indent, config, node.yes)}${node.no && node.no.body.length > 0 ? `\n${indent}else ${printBlock(indent, config, node.no)}` : ''}`;
    }
    case 'ImportNamed': {
      return `import { ${node.pairs.map(pair => `${pair[0]} as ${printRef(indent, config, pair[1])}`).join(', ')}${node.source ? ` } from "${node.source}"` : ''};`;
    }
    case 'LabelStatement': {
      // There exists language exceptions around the label being a
      // direct parent of a loop so we must support that case.
      return `${node.label}: ${_printStatement(indent, config, node.body)}`;
    }
    case 'LetStatement': {
      return `let ${printRef(indent, config, node.id)} = ${printExpression(indent, config, node.init)};`;
    }
    case 'Program': {
      return node.body.body.map(s => printStatement(indent, config, s)).join('\n');
    }
    case 'ReturnStatement': {
      return `return ${printSimple(indent, config, node.arg)};`;
    }
    case 'ThrowStatement': {
      return `throw ${printSimple(indent, config, node.arg)};`;
    }
    case 'TryStatement': {
      const a = `try ${printBlock(indent, config, node.body)}`;
      const b = node.trap ? `\n${indent}catch (${printRef(indent, config, node.id)}) ${printBlock(indent, config, node.trap)}` : '';
      const c = node.final ? `\n${indent}finally ${printBlock(indent, config, node.final)}` : '';
      return `${a}${b}${c}`;
    }
    case 'WhileStatement': {
      // TODO: let/const
      return `while (${printSimple(indent, config, node.test)}) ${printBlock(indent, config, node.body)}`;
    }

    default: {
      ASSERT(false, 'Unknown PST statement node type:', node?.type, node);
    }
  }
}

function printBlock(indent, config, node) {
  return `{\n${node.body.map(s => printStatement(`${indent}  `, config, s)).join('\n')}\n${indent}}`;
}

function printRef(indent, config, node) {
  if (config.globals.has(node.name)) return node.name; // Keep globals
  if (/^\$\d+$/.test(node.name)) return node.name; // Keep param ids

  const suffix = config.refPids && node.$p ? '/*@' + node.$p.pid + '*/' : '';

  if (config.rename) {
    const newName = config.names.get(node.name);
    if (newName) return newName + suffix;

    let size = config.names.size;
    let nextName = size ? '' : 'a';
    while (size > 0) {
      const n = size % 26;
      nextName = 'abcdefghijklmnopqrstuvwxyz'[n] + nextName;
      size = Math.floor(size / 26);
    }
    if (['do', 'in', 'for', 'let', 'if', 'var'].includes(nextName)) {
      // This leads to a keyword and invalid code so inject a placeholder and move to the next index
      // Expand this list to include four letter keywords if necessary... or just all of them.
      config.names.set(nextName, '#SKIP');
      return printRef(indent, config, node);
    }
    config.names.set(node.name, nextName);
    return nextName + suffix;
  }

  return node.name + suffix;
}

function printSimple(indent, config, node) {
  // A simple node has no side effects (other than potentially a reference/TDZ error). Basically idents and primitive.
  switch (node?.type) {
    case 'Ref': return printRef(indent, config, node);
    case 'Primitive': return printPrimitive(indent, config, node);
    case 'UnaryExpression': {
      return `${node.op}${printPrimitive(indent, config, node.arg)}`;
    }
    case 'Param': {
      return node.name;
    }
    default:
      console.log(node);
      ASSERT(false, 'expected node to be simple', node.type, [node]);
  }
}

function printSimpleOrSpread(indent, config, node) {
  if (node.type === 'SpreadElement') {
    return `...${printSimple(indent, config, node.arg)}`;
  } else {
    return printSimple(indent, config, node);
  }
}

function printPropertyOrSpread(indent, config, node) {
  if (node.type === 'SpreadElement') {
    return `... ${printSimple(indent, config, node.arg)}`;
  } else {
    return node.prop;
  }
}

function printPrimitive(indent, config, node) {
  switch (node?.type) {
    case 'Primitive': {
      if (node.value === null) return 'null';
      switch (typeof node.value) {
        case 'number': return String(node.value);
        case 'string': return toAsciiSafeString(`"${node.value.replace(/([\\"])/g, '\\$1')}"`);
        case 'boolean': return String(node.value);
        case 'undefined': return 'undefined';
        default:
          console.log(node);
          TODO
      }
      break;
    }
    case 'UnaryExpression': {
      return `${node.op}${printPrimitive(indent, config, node.arg)}`;
    }
    case 'Ref': {
      return printRef(indent, config, node);
    }

    default:
      ASSERT(false, 'expected node to be an primitive. maybe todo?', node?.type, node);
  }
}

function toAsciiSafeString(str) {
  return str.replace(/[\u0000-\u001f\u0080-\uffff]/g, m => '\\u' + m.charCodeAt(0).toString(16).padStart(4, '0'));
}

function printExpression(indent, config, node) {
  switch (node?.type) {
    case 'ArrayLiteral': {
      if (node.elements.length === 0) return '[]';
      // Must maintain elided elements.
      return `[ ${node.elements.map(e => e === null ? ',' : `${printSimpleOrSpread(indent, config, e)}`).join(', ')} ]`;
    }
    case 'AwaitExpression': {
      return `(await (${printSimple(indent, config, node.arg)}))`;
    }
    case 'BinaryExpression': {
      return `${printSimple(indent, config, node.left)} ${node.op} ${printSimple(indent, config, node.right)}`;
    }
    case 'CallComputedMethodExpression': {
      return `${printSimple(indent, config, node.callee)}[ ${printSimple(indent, config, node.method)} ]${callArgs(indent, config, node)}`
    }
    case 'CallRefExpression': {
      return `${printSimple(indent, config, node.callee)}${callArgs(indent, config, node)}`
    }
    case 'CallMethodExpression': {
      return `${printSimple(indent, config, node.callee)}.${node.method}${callArgs(indent, config, node)}`
    }
    case 'CallSimpleExpression': {
      return `${printSimple(indent, config, node.callee)}.${node.method}${callArgs(indent, config, node)}`
    }
    case 'ClassExpression': {
      return `class ${node.name ? printRef(indent, config, node.name) : ''} ${node.extends ? printSimple(indent, config, node.extends) : ''} {\n${node.body.map(s => printClassElement(indent, config, s))}\n${indent}}`;
    }
    case 'FunctionExpression': {
      return `${node.isAsync ? 'async ' : ''}function${node.name ? ` ${printRef(indent, config, node.name)}` : ''}${node.isGenerator ? ' *' : ''}${node.params.length === 0 ? '()' : `(${node.params.map(p => printSimpleOrSpread(indent, config, p))} )`} ${printBlock(indent, config, node.body)}`;
    }
    case 'MemberComputedExpression': {
      return `${printSimple(indent, config, node.object)}[ ${printSimple(indent, config, node.prop)} ]`;
    }
    case 'MemberRefExpression': {
      return `${printSimple(indent, config, node.object)}.${node.prop}`;
    }
    case 'NewExpression': {
      return `new ${printSimple(indent, config, node.callee)}${callArgs(indent, config, node)}`;
    }
    case 'ObjectLiteral': {
      if (node.props.length === 0) return '{}';
      if (node.props.length === 1) return `{ ${node.props.map(s => printPropertyMethodOrSpread(indent, config, s)).join(',') } }`;
      return `{\n${node.props.map(s => `${indent}  ${printPropertyMethodOrSpread(`${indent}  `, config, s)},`).join('\n')}\n${indent}}`;
    }
    case 'Param': {
      return node.name;
    }
    case 'Primitive': {
      return printPrimitive(indent, config, node);
    }
    case 'Ref': {
      return printRef(indent, config, node);
    }
    case 'RegexLiteral': {
      return `/${node.pattern}/${node.flags}`;
    }
    case 'StringConcat': {
      const left = toAsciiSafeString(node.left.replace(/([\\`])/g, '\\$1'));
      const right = toAsciiSafeString(node.right.replace(/([\\`])/g, '\\$1'));
      return `\`${left}\${${printSimple(indent, config, node.middle)}}${right}\``;
    }
    case 'ThisExpression': {
      return 'this';
    }
    case 'UnaryExpression': {
      if (node.op === 'delete') {
        if (node.arg.type === 'MemberComputedExpression' || node.arg.type === 'MemberRefExpression') {
          return `${node.op} ${printExpression(indent, config, node.arg)}`;
        }
        return `${node.op} ${printSimple(indent, config, node.arg)}`;
      }
      if (node.op === 'yield' || node.op === 'await' || node.op === 'typeof') {
        // `void` should not appear. `new` is not a unary op.
        return `${node.op} ${printSimple(indent, config, node.arg)}`;
      }
      return `${node.op}${printSimple(indent, config, node.arg)}`;
    }
    case 'YieldExpression': {
      return `yield ( ${printSimple(indent, config, node.arg)} )`;
    }

    // Note: assignments are statements
    default:
      ASSERT(false, 'expected node to be an expression. maybe todo?', [node?.type], node);
  }
}

function printPropertyMethodOrSpread(indent, config, node) {
  if (node.type === 'Property') {
    return printProperty(indent, config, node);
  } else if (node.type === 'Method') {
    return printObjectMethod(indent, config, node);
  } else if (node.type === 'Getter') {
    return printGetter(indent, config, node);
  } else if (node.type === 'Setter') {
    return printSetter(indent, config, node);
  } else if (node.type === 'SpreadElement') {
    return `... ${printSimple(indent, config, node.arg)}`;
  } else {
    console.log(node);
    TODO
  }
}

function printGetter(indent, config, node) {
  // Note: getters have no arg (syntactically enforced)
  return `get ${node.key}() ${printBlock(indent, config, node.func.body)}`;
}

function printSetter(indent, config, node) {
  // Note: setters have exactly one arg (syntactically enforced)
  return `set ${node.key}( ${printSimple(indent, config, node.func.params[0])} ) ${printBlock(indent, config, node.func.body)}`;
}

function printProperty(indent, config, node) {
  if (node.isComputed) {
    return `[ ${printSimple(indent, config, node.key)} ]: ${printSimple(indent, config, node.value)}`;
  } else {
    return `${node.key}: ${printSimple(indent, config, node.value)}`;
  }
}

function printObjectMethod(indent, config, node) {
  // For object, not class. See printClassElement
  if (node.isComputed) {
    return `[ ${printSimple(indent, config, node.key)} ]( ${node.func.params.map(s => printSimpleOrSpread(indent, config, s))} ) ${printBlock(indent, config, node.func.body)},`;
  }
  return `${node.key}( ${node.func.params.map(s => printSimpleOrSpread(indent, config, s))} ) ${printBlock(indent, config, node.func.body)}`;
}

function printClassElement(indent, config, node) {
  // For object, not class. See printObjectMethod
  if (node.isComputed) {
    return `${node.isStatic ? 'static ' : ''}[ ${printSimple(indent, config, node.key)} ]( ${node.func.params.map(s => printSimpleOrSpread(indent, config, s))} ) ${printBlock(indent, config, node.func.body)}`;
  }
  return `${node.isStatic ? 'static ' : ''}${node.key}( ${node.func.params.map(s => printSimpleOrSpread(indent, config, s))} ) ${printStatement(indent, config, node.func.body)}`;
}

function callArgs(indent, config, node) {
  if (node.args.length === 0) return '()';
  return `( ${node.args.map(s => printSimpleOrSpread(indent, config, s)).join(', ')} )`;
}
