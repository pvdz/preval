import {ASSERT} from "../utils.mjs"

// idents may flow over into numbers and print invalid code...

export function arrayLiteral(elements) {
  return {
    type: 'ArrayLiteral',
    elements, // Array<Element | SpreadElement>
  }
}

export function AssignmentRefStatement(left, right) {
  return {
    type: 'AssignmentRefStatement',
    left, // Identifier
    right, // Expression
  };
}

export function assignmentPropStatement(left, propName, right) {
  return {
    type: 'AssignmentPropStatement',
    left, // Simple
    prop: propName, // string
    right, // Expression
  };
}

export function assignmentComputedPropStatement(left, prop, right) {
  return {
    type: 'AssignmentComputedPropStatement',
    left, // Simple
    prop, // Simple
    right, // Expression
  };
}

export function awaitExpression(arg) {
  return {
    type: 'AwaitExpression',
    arg, // Simple
  };
}

export function binaryExpression(op, left, right) {
  ASSERT(typeof op === 'string', 'op should be a string', op);
  return {
    type: 'BinaryExpression',
    op, // string
    left, // Simple
    right, // Simple
  };
}

export function blockStatement(body) {
  ASSERT(arguments.length === 1, 'send block an arr');
  return {
    type: 'BlockStatement',
    body, // Array<Statement>
  }
}

export function breakStatement(label) {
  return {
    type: 'BreakStatement',
    label, // undefined, string
  };
}

export function callRefExpression(callee, args) {
  ASSERT(callee.type === 'Ref', 'by def', callee);
  ASSERT(!['NaN', 'Infinity', 'undefined', 'true', 'false'].includes(callee.name), 'do not toss known globals here', callee);
  return {
    type: 'CallRefExpression',
    callee, // Identifier
    args, // Array<Arg, SpreadArg>
  };
}

export function callSimpleExpression(callee, args) {
  return {
    type: 'CallSimpleExpression',
    callee, // Simple but not Identifier
    args, // Array<Arg, SpreadArg>
  };
}

export function callMethodExpression(callee, method, args) {
  return {
    type: 'CallMethodExpression',
    callee, // Simple
    method, // string
    args, // Array<Arg, SpreadArg>
  }
}

export function callComputedMethodExpression(callee, method, args) {
  return {
    type: 'CallComputedMethodExpression',
    callee, // Simple
    method, // Simple
    args, // Array<Arg, SpreadArg>
  }
}

export function classExpression(name, extending, body) {
  return {
    type: 'ClassExpression',
    name, // undefined, Identifier
    extending, // undefined, SimpleExpression
    body, // Array<ClassPart> tbd
  };
}

export function classMethod(key, isComputed, isStatic, func) {
  return {
    type: 'ClassMethod',
    key, // computed ? Simple : Ident
    isComputed, // bool
    isStatic, // bool
    func, // FunctionExpression
  };
}

export function constStatement(id, init) {
  return {
    type: 'ConstStatement',
    id, // Ident
    init, // Expression
  };
}

export function debuggerStatement() {
  return {
    type: 'DebuggerStatement',
  };
}
export function emptyStatement() {
  return {
    type: 'EmptyStatement',
  };
}

export function exportNamed(pairs) {
  return {
    type: 'ExportNamed',
    pairs, // Array<[local: Ref, exported: string]>
  };
}

export function expressionStatement(expression) {
  return {
    type: 'ExpressionStatement',
    expression, // Expression
  };
}

export function functionExpression(name, isAsync, isGenerator, params, body) {
  ASSERT(params.every(p => p.type === 'Param'), 'params be params?', params);
  return {
    type: 'FunctionExpression',
    isAsync, // bool
    isGenerator, // bool
    name, // undefined, Ident
    params, // Array<Param, Rest>
    body, // BlockStatement
  };
}

export function getter(key, isComputed, func) {
  // Method with init=get
  ASSERT(isComputed ? typeof key === 'object' : typeof key === 'string', 'prop key is not a ref', key);
  return {
    type: 'Getter',
    key, // computed ? Simple : Ident
    isComputed, // bool
    func, // FunctionExpression
  };
}

export function ifStatement(test, yes, no) {
  return {
    type: 'IfStatement',
    test, // Simple
    yes, // Block
    no, // Block
  };
}

export function importNamed(pairs, source) {
  return {
    type: 'ImportNamed',
    pairs, // Array<[imported: string, local: Ref]>
    source, // string
  };
}

export function labelStatement(labelName, body) {
  return {
    type: 'LabelStatement',
    label: labelName, // string. Unique in whole code.
    body, // Block, While (there exist language restrictions around labels that are direct parents of loops, so we must support it)
  };
}

export function letStatement(id, init) {
  return {
    type: 'LetStatement',
    id, // Ident
    init, // Expression
  };
}

export function memberComputedExpression(object, prop) {
  return {
    type: 'MemberComputedExpression',
    object, // Simple
    prop, // Simple
  };
}

export function memberRefExpression(object, prop) {
  ASSERT(typeof prop === 'string')
  return {
    type: 'MemberRefExpression',
    object, // Simple
    prop, // string
  };
}

export function method(key, isComputed, func) {
  // The counterpart to a Property
  return {
    type: 'Method',
    key, // computed ? Simple : string
    isComputed, // bool
    func, // FunctionExpression
  };
}

export function newExpression(callee, args) {
  return {
    type: 'NewExpression',
    args, // Array<Simple>
    callee, // Simple
  };
}

export function objectLiteral(props) {
  return {
    type: 'ObjectLiteral',
    props,
  };
}

export function program(body) {
  return {
    type: 'Program',
    body,
  };
}

export function param(name, index, rest) {
  ASSERT(name === '$$' + index, 'index should match name', name, index);
  return {
    type: 'Param',
    name, // string
    index, // number
    rest, // boolean
  };
}

export function primitive(value, confirmUndef = false) {
  ASSERT(value !== undefined || confirmUndef, 'must pass second arg if intentional undefined');
  return {
    type: 'Primitive',
    kind: value === null ? 'null' : typeof value,
    value,
  };
}

export function property(key, value, isComputed) {
  // Note: there is a separate Method node for methods
  if (isComputed) {
    return {
      type: 'Property',
      key, // Simple
      value, // Simple
      isComputed: true,
    };
  }

  return {
    type: 'Property',
    key, // string
    value, // Simple
    isComputed: false,
  };
}

export function ref(name) {
  // This is a "Reference" to a binding. In a normal AST this is an Identifier, except
  // idents are used for more places than just var bindings. In a normalized AST I care
  // less about that and want clear usages when bindings are referenced. So that's what
  // a ref is supposed to help with.
  // The Ref node can then also be guaranteed to have some kind of read/write to that var.

  ASSERT(typeof name === 'string', 'should receive name', name);
  // Refers to a binding, a var. The name of each binding is unique in the whole source code.
  return {
    type: 'Ref',
    name,
  };
}

export function regexLiteral(full, pattern, flags) {
  return {
    type: 'RegexLiteral',
    full,
    pattern,
    flags,
  };
}

export function returnStatement(arg) {
  return {
    type: 'ReturnStatement',
    arg, // Simple
  };
}

export function setter(key, isComputed, func) {
  ASSERT(isComputed ? typeof key === 'object' : typeof key === 'string', 'prop key is not a ref', key);
  // Method with init=set
  return {
    type: 'Setter',
    key, // computed ? Simple : string
    isComputed, // bool
    func, // FunctionExpression
  };
}

export function spreadElement(arg) {
  return {
    type: 'SpreadElement',
    arg, // Simple
  };
}

export function superKeyword() {
  return {
    type: 'SuperKeyword',
  };
}

export function stringConcat(...parts) {
  if (Array.isArray(parts[0])) parts = parts[0];

  // This is a template literal but in normalized code we merely use it to concat strings in an unambiguous way.
  // We compile this node as a template as well.
  // Each string concat only has two parts, left and right. Despite a template allowing for any number of expressions.
  // Usually left or right is a string. But since the order matters, we don't know which is which.

  ASSERT(parts.length > 1 || (parts.length === 1 && typeof parts[0] !== 'string'), 'when a stringConcat only contains a single string, it should use a Primitive', parts);

  return {
    type: 'StringConcat',
    parts, // This should either be string literals or idents asserted to be strings. The concat should be side-effect free.
  };
}

export function thisExpression() {
  return {
    type: 'ThisExpression',
  };
}

export function throwStatement(arg) {
  return {
    type: 'ThrowStatement',
    arg, // Simple
  };
}

export function tryStatement(body, id, trap, final) {
  ASSERT(!final, 'finally must be eliminated in favor of catch');
  ASSERT(trap, 'must receive at a trap block because finally is no more', trap);
  ASSERT(id, 'catch clause is not optional in normalized code. id must also be given', id, trap);
  return {
    type: 'TryStatement',
    body, // Block (try block)
    id, // undefined, Ident
    trap, // undefined, Block (catch block)
  };
}

export function unaryExpression(op, arg) {
  return {
    type: 'UnaryExpression',
    op, // string
    arg, // Simple
  };
}

export function whileStatement(test, body) {
  return {
    type: 'WhileStatement',
    test, // Simple
    body, // Block
  };
}

export function yieldExpression(arg) {
  return {
    type: 'YieldExpression',
    arg, // Simple
  };
}
