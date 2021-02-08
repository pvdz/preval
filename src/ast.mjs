import { ASSERT } from './utils.mjs';
import { $p } from './$p.mjs';

export function arrayExpression(...elements) {
  // An array is not a valid element for the AST node so if it is an array it's
  // safe to assume that we want to use the first arg as the elements array verbatim
  if (Array.isArray(elements[0])) elements = elements[0];

  return {
    type: 'ArrayExpression',
    elements,
    $p: $p(),
  };
}

export function assignmentExpression(left, right, operator = '=') {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);

  return {
    type: 'AssignmentExpression',
    operator,
    left,
    right,
    $p: $p(),
  };
}

export function binaryExpression(operator, left, right) {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);

  return {
    type: 'BinaryExpression',
    operator,
    left,
    right,
    $p: $p(),
  };
}

export function blockStatement(...body) {
  // An array is not a valid element for the AST node so if it is an array it's
  // safe to assume that we want to use the first arg as the body array verbatim
  if (Array.isArray(body[0])) body = body[0];

  return {
    type: 'BlockStatement',
    body,
    $p: $p(),
  };
}

export function breakStatement(label = null) {
  if (typeof label === 'string') label = identifier(label);

  return {
    type: 'BreakStatement',
    label,
    $p: $p(),
  };
}

export function callExpression(callee, args, optional = false) {
  if (typeof callee === 'string') callee = identifier(callee);

  return {
    type: 'CallExpression',
    optional,
    callee,
    arguments: args,
    $p: $p(),
  };
}

export function continueStatement(label = null) {
  if (typeof label === 'string') label = identifier(label);

  return {
    type: 'ContinueStatement',
    label,
    $p: $p(),
  };
}

export function conditionalExpression(test, consequent, alternate) {
  if (typeof test === 'string') test = identifier(test);
  if (typeof consequent === 'string') consequent = identifier(consequent);
  if (typeof alternate === 'string') alternate = identifier(alternate);

  return {
    type: 'ConditionalExpression',
    test,
    consequent,
    alternate,
    $p: $p(),
  };
}

export function doWhileStatement(body, test) {
  if (typeof test === 'string') test = identifier(test);

  return {
    type: 'DoWhileStatement',
    test,
    body,
    $p: $p,
  };
}

export function emptyStatement() {
  return {
    type: 'EmptyStatement',
    $p: $p(),
  };
}

export function _exportDefaultDeclaration(node) {
  // (underscored because it makes my auto complete life easier)
  if (typeof node === 'string') node = identifier(node);
  return {
    type: 'ExportDefaultDeclaration',
    declaration: node,
    $p: $p(),
  };
}

export function _exportNamedDeclarationFromNames(locals, exported) {
  if (typeof locals === 'string') locals = identifier(locals);
  if (!Array.isArray(locals)) locals = [locals];
  if (!exported) exported = locals;
  if (typeof exported === 'string') exported = identifier(exported);

  const specifiers = locals.map((local, i) => {
    const exportee = Array.isArray(exported) ? exported[i] : exported;
    ASSERT(exportee?.type === 'Identifier', 'exported names must be identifiers', locals, exported);
    return _exportSpecifier(local, exportee);
  });

  return {
    type: 'ExportNamedDeclaration',
    specifiers,
    declaration: null,
    source: null,
    $p: $p(),
  };
}

export function _exportSpecifier(local, exported) {
  if (typeof local === 'string') local = identifier(local);
  if (typeof exported === 'string') local = identifier(exported);

  return {
    type: 'ExportSpecifier',
    local,
    exported,
    $p: $p(),
  };
}

export function expressionStatement(expression) {
  return {
    type: 'ExpressionStatement',
    expression,
    $p: $p(),
  };
}

export function forInStatement(left, right, body) {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);
  if (typeof body === 'string') body = identifier(body);

  return {
    type: 'ForInStatement',
    left,
    right,
    body,
    $p: $p(),
  };
}

export function forOfStatement(left, right, body, async = false) {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);
  if (typeof body === 'string') body = identifier(body);

  return {
    type: 'ForOfStatement',
    await: async,
    left,
    right,
    body,
    $p: $p(),
  };
}

export function identifier(name) {
  return {
    type: 'Identifier',
    name,
    $p: $p(),
  };
}

export function ifStatement(test, consequent, alternate = null) {
  ASSERT(test, 'test defined');
  ASSERT(consequent, 'consequent defined');
  if (typeof test === 'string') test = identifier(test);

  return {
    type: 'IfStatement',
    test,
    consequent,
    alternate,
    $p: $p(),
  };
}

export function importDeclarationNamed(imported, local = typeof imported === 'string' ? imported : imported.name, source) {
  if (typeof imported === 'string') imported = identifier(imported);
  if (typeof local === 'string') local = identifier(local);
  if (typeof source === 'string') source = literal(source);

  return {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportSpecifier',
        imported,
        local,
        $p: $p(),
      },
    ],
    source,
    $p: $p(),
  };
}

export function importDeclarationFromSpecifier(specifier, source) {
  ASSERT(specifier && specifier.type.includes('Specifier'));
  if (typeof source === 'string') source = literal(source);
  ASSERT(source.type === 'Literal');
  return {
    type: 'ImportDeclaration',
    specifiers: [specifier],
    source,
    $p: $p(),
  };
}

export function labeledStatement(label, body) {
  if (typeof label === 'string') label = identifier(label);

  return {
    type: 'LabeledStatement',
    label,
    body,
    $p: $p(),
  };
}

export function literal(value) {
  if (typeof value === 'number') {
    return {
      type: 'Literal',
      value: value,
      raw: String(value),
      $p: $p(),
    };
  } else if (typeof value === 'string') {
    return {
      type: 'Literal',
      value: value,
      raw: JSON.stringify(value),
      $p: $p(),
    };
  } else {
    ASSERT(false, 'TODO', value);
  }
}

export function logicalExpression(operator, left, right) {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);

  return {
    type: 'LogicalExpression',
    operator,
    left,
    right,
    $p: $p(),
  };
}

export function memberCall(object, property, args, computed = false, optional = false) {
  return callExpression(memberExpression(object, property, computed, optional), args);
}

export function memberExpression(object, property, computed = false, optional = false) {
  if (typeof object === 'string') object = identifier(object);
  if (typeof property === 'string') property = identifier(property);

  return {
    type: 'MemberExpression',
    computed,
    optional,
    object,
    property,
    $p: $p(),
  };
}

export function newExpression(callee, args) {
  if (typeof callee === 'string') callee = identifier(callee);

  return {
    type: 'NewExpression',
    callee,
    arguments: args,
    $p: $p(),
  };
}

export function objectExpression(...properties) {
  if (Array.isArray(properties[0])) properties = properties[0];

  return {
    type: 'ObjectExpression',
    properties,
    $p: $p(),
  };
}

export function property(key, value, shorthand = false, computed = false, kind = 'init', method = false) {
  if (typeof key === 'string') key = identifier(key);
  if (typeof value === 'string') value = identifier(value);

  return {
    type: 'Property',
    key,
    value,
    shorthand,
    computed,
    kind,
    method,
    $p: $p(),
  };
}

export function returnStatement(argument = null) {
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'ReturnStatement',
    argument,
    $p: $p(),
  };
}

export function sequenceExpression(...expressions) {
  // An array is not a valid element for the AST node so if it is an array it's
  // safe to assume that we want to use the first arg as the expressions array verbatim
  if (Array.isArray(expressions[0])) expressions = expressions[0];

  return {
    type: 'SequenceExpression',
    expressions,
    $p: $p(),
  };
}

export function spreadElement(argument) {
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'SpreadElement',
    argument,
    $p: $p(),
  };
}

export function switchCase(test = null, ...consequent) {
  if (typeof test === 'strng') test = identifier(test);
  if (Array.isArray(consequent[0])) consequent = consequent[0];

  return {
    type: 'SwitchCase',
    test,
    consequent,
    $p: $p(),
  };
}

export function switchDefault(...consequent) {
  // The `default` is a SwitchCase with test=null
  if (Array.isArray(consequent[0])) consequent = consequent[0];

  return {
    type: 'SwitchCase',
    test: null,
    consequent,
    $p: $p(),
  };
}

export function switchStatement(discriminant, cases) {
  if (typeof discriminant === 'string') discriminant = identifier(discriminant);

  return {
    type: 'SwitchStatement',
    discriminant,
    cases,
    $p: $p,
  };
}

export function throwStatement(argument = null) {
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'ThrowStatement',
    argument,
    $p: $p(),
  };
}

export function unaryExpression(operator, argument) {
  ASSERT(typeof operator === 'string');
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'UnaryExpression',
    operator,
    argument,
    $p: $p(),
  };
}

export function variableDeclaration(names, inits = null, kind = 'let') {
  if (typeof names === 'string') names = identifier(names);
  if (!Array.isArray(names)) names = [names];
  if (inits) {
    if (typeof inits === 'string') inits = identifier(inits);
    if (!Array.isArray(inits)) inits = [inits];
  }
  ASSERT(!inits || names.length === inits.length, 'if inits are given then an init should be given for each name to be declared');

  return variableDeclarationFromDeclaration(
    names.map((name, i) => variableDeclarator(name, inits ? inits[i] : null)),
    kind,
  );
}

export function variableDeclarator(id, init = null) {
  if (typeof id === 'string') id = identifier(id);
  if (typeof init === 'string') init = identifier(init);
  return {
    type: 'VariableDeclarator',
    id,
    init,
    $p: $p(),
  };
}

export function variableDeclarationFromDeclaration(declarations, kind = 'let') {
  if (!Array.isArray(declarations)) declarations = [declarations];

  return {
    type: 'VariableDeclaration',
    kind,
    declarations,
    $p: $p(),
  };
}

export function whileStatement(test, body) {
  if (typeof test === 'string') test = identifier(test);

  return {
    type: 'WhileStatement',
    test,
    body,
    $p: $p,
  };
}
