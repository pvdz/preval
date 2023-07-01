import walk from '../lib/walk.mjs';
import {ASSERT, source, tmat, vlog} from './utils.mjs';
import { $p } from './$p.mjs';

export function cloneSimple(node) {
  if (node.type === 'Identifier') {
    return identifier(node.name);
  }

  if (node.type === 'Literal') {
    if (node.raw === 'null') return nul(); // be explicit for null
    if (typeof node.value === 'string') return templateLiteral(node.value);
    if (node.regex) return regex(node.regex.pattern, node.regex.flags, node.raw);
    ASSERT(node.value !== null, 'the null case was checked before?', node);
    return literal(node.value);
  }

  if (node.type === 'MemberExpression') {
    return memberExpression(cloneSimple(node.object), cloneSimple(node.property), node.computed);
  }

  if (node.type === 'UnaryExpression' && (node.operator === '+' || node.operator === '-')) {
    if (node.argument.type === 'Literal' && typeof node.argument.value === 'number') {
      // -5, +0.2e3
      return unaryExpression(node.operator, cloneSimple(node.argument));
    }

    if (node.argument.type === 'Identifier' && ['Infinity', 'NaN', 'undefined'].includes(node.argument.name)) {
      // -Infinity, +undefined
      return unaryExpression(node.operator, cloneSimple(node.argument));
    }
  }

  if (node.type === 'ThisExpression') {
    ASSERT(false, 'I think we shouldnt allow to clone `this` without an explicit optin');
    //return thisExpression();
  }

  if (node.type === 'TemplateLiteral') {
    // It should only clone if the template has no expressions. Otherwise there's an operation going. Caller should assert !isComplex
    ASSERT(node.expressions.length === 0, 'caller should assert not to clone templates with expressions', node);
    ASSERT(typeof node.quasis[0].value.cooked === 'string');
    return templateLiteral(node.quasis[0].value.cooked);
  }

  ASSERT(false, 'add me', node);
}

export function cloneSimpleOrTemplate(node) {
  return node.type === 'TemplateLiteral'
    ? templateLiteral([...node.quasis.map((te) => te.value.cooked)], [...node.expressions.map((n) => cloneSimpleOrTemplate(n))])
    : cloneSimple(node);
}

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

export function awaitExpression(argument) {
  ASSERT(argument, 'await argument must be given');
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'AwaitExpression',
    argument,
    $p: $p(),
  };
}

export function assignmentExpression(left, right, operator = '=') {
  if (typeof left === 'string') left = identifier(left);
  if (typeof right === 'string') right = identifier(right);
  ASSERT(left && right, 'must have left and right operand', left, right);

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
  body.forEach((n) =>
    ASSERT(
      n?.type && (!n.type.includes('Expression') || n.type === 'ExpressionStatement' || n.type === 'FunctionExpression'),
      'body should receive statements and declarations, not expressions',
      n,
    ),
  );

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

export function classExpression(id = null, superClass = null, body) {
  if (typeof id === 'string') id = identifier(id);
  if (typeof superClass === 'string') superClass = identifier(superClass);
  ASSERT(body && body.type === 'ClassBody', 'body is ClassBody?', body);

  return {
    type: 'ClassExpression',
    id,
    superClass,
    body,
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

export function debuggerStatement() {
  return {
    type: 'DebuggerStatement',
    $p: $p(),
  };
}

export function doWhileStatement(body, test) {
  if (typeof test === 'string') test = identifier(test);

  return {
    type: 'DoWhileStatement',
    test,
    body,
    $p: $p(),
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
  if (!exported) exported = locals.map((n) => cloneSimple(n));
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

export function fals() {
  return literal(false);
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

export function functionExpressionNormalized(paramNames, body, { id, generator, async, rest } = {}) {
  // Take the params and the body and generate a new function with proper Preval function
  // header (meaning all params are assigned a var decls at the top, including `this`, and
  // `arguments` aliases, followed by a debugger statement).
  // Then return a new function expression node.

  ASSERT(
    body.every((n) => n.type !== 'DebuggerStatement'),
    'normalized code should not contain the debugger statement. this function should not be called with a body that includes an old function header',
  );
  ASSERT(
    paramNames.every((n) => typeof n === 'string'),
    'these should not be the $$123 kind but regular param names',
  );

  return functionExpression(
    paramNames.map((name, pi) => param('$$' + pi, pi < paramNames.length - 1 ? false : !!rest)),
    [
      // Note: I don't think these functions need/want the this/arguments alias? Sorry, future self.
      ...paramNames.map((name, pi) => variableDeclaration(name, '$$' + pi, 'let')),
      debuggerStatement(),
      ...body,
    ],
    { id, generator, async },
  );
}

export function functionExpression(params, body, { id, generator, async, normalized = true } = {}) {
  if (!Array.isArray(params)) params = [params];
  params.map((n, i) => (typeof n === 'string' ? param(n) : n));
  ASSERT(
    !normalized || params.every((n) => n.type === 'Param'),
    'functions generated this way should be normalized, so should use special Param nodes',
  );
  if (!Array.isArray(body)) body = [body];
  body = blockStatement(body);

  generator = !!generator;
  async = !!async;
  id = id || null;
  if (typeof id === 'string') id = identifier(id);

  return {
    type: 'FunctionExpression',
    generator,
    async,
    expression: false, // for arrows
    id,
    params,
    body,
    $p: {
      ...$p(),
      hoistedVars: [],
    },
  };
}

export function identifier(name, nonComputedProperty = false) {
  ASSERT(typeof name === 'string' && name, 'ident names must be valid nonempty strings', name);
  ASSERT(
    nonComputedProperty || (typeof nonComputedProperty === 'boolean' && !['true', 'false', 'null'].includes(name)),
    'these are literals.',
  );
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
  if (typeof source === 'string') source = templateLiteral(source);

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
  if (typeof source === 'string') source = templateLiteral(source);
  //ASSERT(source.type === 'Literal');
  ASSERT(source.type === 'TemplateLiteral');
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

export function literal(value, yesnull = false) {
  if (typeof value === 'number') {
    ASSERT(isFinite(value), 'do not use this for Infinity, NaN, etc... see AST.primitive', value);
    return {
      type: 'Literal',
      value: value,
      raw: String(value),
      $p: $p(),
    };
  } else if (value === true) {
    return {
      type: 'Literal',
      value: true,
      raw: 'true',
      $p: $p(),
    };
  } else if (value === false) {
    return {
      type: 'Literal',
      value: false,
      raw: 'false',
      $p: $p(),
    };
  } else if (value === null) {
    ASSERT(
      yesnull,
      'when creating a literal with value `null` the yesnull param should be set explicitly. this prevents accidental problems with literals whose value is null but whose raw is not "null"',
    );
    return {
      type: 'Literal',
      value: null,
      raw: 'null',
      $p: $p(),
    };
  } else {
    ASSERT(typeof value !== 'string', 'string literals should be TemplateLiterals');
    ASSERT(!(value instanceof RegExp), 'regex literal should call AST.regex() explicitly');
    ASSERT(false, 'TODO', value);
  }
}

export function isRegexLiteral(node) {
  return node.type === 'Literal' && Boolean(node.regex);
}
export function regex(pattern, flags, raw) {
  ASSERT(typeof raw === 'string', 'the raw value should be a string');
  return {
    type: 'Literal',
    value: null,
    regex: { pattern, flags },
    raw: raw,
    $p: $p(),
  };
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
  if (typeof property === 'string') property = identifier(property, !computed);

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

export function nul() {
  return literal(null, true);
}

export function objectExpression(...properties) {
  if (Array.isArray(properties[0])) properties = properties[0];

  return {
    type: 'ObjectExpression',
    properties,
    $p: $p(),
  };
}

export function one() {
  return literal(1);
}

export function param(name, rest = false) {
  // This is a custom Preval node to represent a param name
  // The goal is to shield it away from general inspection by not being a generic Identifier
  ASSERT(typeof name === 'string' && name, 'ident names must be valid nonempty strings', name, rest);
  ASSERT(/^\$\$\d+$/.test(name), 'param names should have their index affixed to a double dollar and no suffix', name);

  return {
    type: 'Param',
    name,
    index: +name.slice(2),
    rest,
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
    $p: $p(),
  };
}

export function templateElement(raw, tail, cooked) {
  ASSERT(typeof cooked === 'string');
  ASSERT(typeof tail === 'boolean');
  ASSERT(typeof raw === 'string');
  //ASSERT(!/[^\\]`/.test(raw), 'the raw string should explicitly contain a backslash before a backtick (etc). cooked should not.');

  return {
    type: 'TemplateElement',
    tail,
    value: {
      raw, // Will contain backslashes if the string contains backticks
      cooked, // Can contain backticks without backslashes
    },
    $p: $p(),
  };
}

export function templateLiteral(cookedStrings, expressions) {
  if (typeof cookedStrings === 'string') {
    ASSERT(arguments.length === 1, 'can only pass string as first arg when there is no second arg');
    cookedStrings = [cookedStrings];
    expressions = [];
  } else {
    ASSERT(Array.isArray(cookedStrings) && Array.isArray(expressions), 'input must either be only a string or two arrays');
    ASSERT(
      cookedStrings.length === expressions.length + 1,
      'there should be exactly one more string than there are values',
      cookedStrings.length,
      expressions.length,
    );
    ASSERT(
      cookedStrings.every((str) => typeof str === 'string'),
      'the strings array should actually contain strings, not nodes',
    );
    ASSERT(
      expressions.every((enode) => typeof enode === 'object'),
      'do not pass primitives as expressions. expecting actual nodes',
    );
  }

  ASSERT(expressions.length + 1 === cookedStrings.length, 'a template has one more quasi than it has expressions');

  return {
    type: 'TemplateLiteral',
    expressions,
    quasis: cookedStrings.map((str, si) => {
      return templateElement(str.replace(/([\\`$])/g, '\\$1'), si === cookedStrings.length - 1, str);
    }),
    $p: $p(),
  };
}

export function thisExpression() {
  return {
    type: 'ThisExpression',
    $p: $p(),
  };
}

export function throwStatement(argument = null) {
  if (typeof argument !== 'object') {
    ASSERT(false, 'too dangerous not to be explicit about the arg');
  }

  return {
    type: 'ThrowStatement',
    argument,
    $p: $p(),
  };
}

export function tru() {
  return literal(true);
}

export function tryStatement(block, param, handler, finalizer) {
  ASSERT(block && block.type === 'BlockStatement', 'the block should be an actual BlockStatement node', block);
  ASSERT(!handler || handler.type === 'BlockStatement', 'the handler, if present, should be an actual BlockStatement node', handler);
  ASSERT(param ? handler : true, 'if theres a param then there must be a param');
  ASSERT(
    !finalizer || finalizer.type === 'BlockStatement',
    'the finalizer, if present, should be an actual BlockStatement node',
    finalizer,
  );
  ASSERT(
    param === null || typeof param === 'string' || param?.type === 'Identifier',
    'the param (catch var) should be null, a string, or an ident. more exotic cases should be supported first but not likely needed',
    param,
  );
  ASSERT(handler || finalizer, 'must have at least a handler or a finalizer');

  return {
    type: 'TryStatement',
    block,
    handler: handler ? {
      type: 'CatchClause',
      param,
      body: handler,
    } : null,
    finalizer,
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

export function updateExpression(operator, argument, prefix, yesNotTransforming) {
  ASSERT(yesNotTransforming, 'This is not considered normalized. Do not use this func during transforms. Confirm by passing the arg.');
  ASSERT(operator === '--' || operator === '++');
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'UpdateExpression',
    operator,
    argument,
    prefix,
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
    $p: $p(),
  };
}

export function zero() {
  return literal(0);
}

export function isUndefined(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Identifier' && node.name === 'undefined';
}
export function isNull(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.raw === 'null';
}
export function isBoolean(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && typeof node.value === 'boolean';
}
export function isTrue(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.value === true;
}
export function isFalse(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && node.value === false;
}
export function isNumber(node) {
  ASSERT(typeof node === 'object');
  return node.type === 'Literal' && typeof node.value === 'number';
}
export function isStringLiteral(node, allowLiteral = false) {
  // The difference is a template with and without expressions
  // We allow literals during normalization
  return (
    (node.type === 'TemplateLiteral' && node.expressions.length === 0) ||
    (allowLiteral && node.type === 'Literal' && typeof node.value === 'string')
  );
}
export function isStringValue(node, str, allowLiteral = false) {
  return node.type === 'TemplateLiteral'
    ? node.expressions.length === 0 && node.quasis[0].value.cooked === str
    : allowLiteral && node.type === 'Literal'
    ? node.value === str
    : false;
}
export function getStringValue(node, allowLiteral = false) {
  if (allowLiteral) {
    if (node.type === 'TemplateLiteral') {
      return node.quasis[0].value.cooked;
    }
    ASSERT(node.type === 'Literal', 'should be checked before');
    return node.value;
  }
  ASSERT(node.type === 'TemplateLiteral' && node.expressions.length === 0, 'should be checked before. can it be a literal?');
  return node.quasis[0].value.cooked;
}

export function isPrimitive(node) {
  // isValue, isLiteral
  // A primitive is a literal boolean, number, string, or null, or an identifier NaN, Infinity, or undefined.
  // It's different from a literal since, for example, `undefined` is not a Literal node.

  // This func may be called in the before on a "future" node so the $p may not exist yet
  if (node.$p?.isPrimitive) {
    return true;
  }

  if (node.type === 'Literal') {
    return node.raw === 'null' || ['number', 'string', 'boolean'].includes(typeof node.value);
  }

  if (node.type === 'Identifier') {
    return ['undefined', 'NaN', 'Infinity'].includes(node.name);
  }

  if (node.type === 'UnaryExpression' && node.operator === '-' && node.argument.type !== 'UnaryExpression') {
    // Negative literals. Maybe we should only consider numbers here, not -null etc?
    return isPrimitive(node.argument);
  }

  if (node.type === 'TemplateLiteral') return node.expressions.length === 0;

  return false;
}

export function isFalsy(node) {
  // If this function does not return true, it does not automatically mean it's a truthy. Just that we can't determine it to be falsy.
  if (node.type === 'Literal') {
    if (node.raw === 'null') return true;
    if (node.type === 'Literal' && (node.raw === 'null' || node.value === '' || node.value === false || node.value === 0)) return true;
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0].value.cooked === '';
    if (node.type === 'Identifier' && (node.name === 'undefined' || node.name === 'NaN')) return true;
    if (node.regex) return false;
    return false;
  }

  if (node.type === 'TemplateLiteral') return node.expressions.length === 0 && node.quasis[0].value.cooked === '';

  if (node.type === 'Identifier') {
    return node.name === 'undefined' || node.name === 'NaN';
  }

  return false;
}
export function isTruthy(node) {
  // If this function does not return true, it does not automatically mean it's a falsy. Just that we can't determine it to be truthy.
  if (node.type === 'Literal') {
    if (node.raw === 'null') return false;
    if (typeof node.value === 'string') return node.value !== '';
    if (typeof node.value === 'boolean') return node.value === true;
    if (typeof node.value === 'number') return node.value !== 0;
    if (node.regex) return true;
    // All other literals are auto truthy I think? What about 0 big int?
    return true;
  }
  if (node.type === 'TemplateLiteral') return node.quasis.some((te) => te.value.cooked !== '');

  if (node.type === 'Identifier') {
    return node.name === 'Infinity';
  }

  return ['ThisExpression', 'ArrayExpression', 'ObjectExpression', 'FunctionExpression', 'ClassExpression'].includes(node.type);
}

export function getPrimitiveType(node) {
  ASSERT(node && node.$p, 'node exists yea bossman?', node, node.$p);
  ASSERT(isPrimitive(node) || node.$p.isPrimitive, 'should assert a node is a primitive value before calling getPrimitiveType on it', node);

  if (node.$p.isPrimitive) {
    return typeof node.$p.primitiveValue;
  }

  if (node.type === 'Literal') {
    if (node.raw === 'null') return null;
    if (['number', 'string', 'boolean'].includes(typeof node.value)) return typeof node.value;
    ASSERT(false);
  }

  if (node.type === 'TemplateLiteral') {
    ASSERT(node.expressions.length === 0, 'caller should have checked isPrimitive', node);
    return 'string';
  }

  if (node.type === 'Identifier') {
    if (node.name === 'undefined') return 'undefined';
    if (node.name === 'NaN') return 'number';
    if (node.name === 'Infinity') return 'number';
  }

  if (node.type === 'UnaryExpression' && (node.operator === '-' || node.operator === '+') && node.argument.type !== 'UnaryExpression') {
    // Negative literals. Maybe we should only consider numbers here, not -null etc?
    return 'number';
  }

  ASSERT(false, 'probably need to support this node', node);
}

export function getPrimitiveValue(node) {
  ASSERT(node && node.$p, 'node exists yea bossman?', node, node.$p);
  ASSERT(isPrimitive(node) || node.$p.isPrimitive, 'should assert a node is a primitive value before calling getPrimitiveValue on it', node);

  if (node.$p.isPrimitive) {
    return node.$p.primitiveValue;
  }

  if (node.type === 'Literal') {
    if (node.raw === 'null') return null;
    if (['number', 'string', 'boolean'].includes(typeof node.value)) return node.value;
    ASSERT(false);
  }

  if (node.type === 'TemplateLiteral') {
    ASSERT(node.expressions.length === 0, 'caller should have checked isPrimitive', node);
    return node.quasis[0].value.cooked;
  }

  if (node.type === 'Identifier') {
    if (node.name === 'undefined') return undefined;
    if (node.name === 'NaN') return NaN;
    if (node.name === 'Infinity') return Infinity;
  }

  if (node.type === 'UnaryExpression' && node.operator === '-' && node.argument.type !== 'UnaryExpression') {
    // Negative literals. Maybe we should only consider numbers here, not -null etc?
    return -getPrimitiveValue(node.argument);
  }

  ASSERT(false, 'probably need to support this node', node);
}

export function primitive(value) {
  if (typeof value === 'number') {
    // .sign does not support -0 ;(
    if (Object.is(value, -0)) {
      return unaryExpression('-', literal(0));
    }
    if (isNaN(value)) return identifier('NaN');
    if (value === Infinity) return identifier('Infinity');
    if (value === -Infinity) return unaryExpression('-', identifier('Infinity'));
    return literal(value);
  }
  if (typeof value === 'string') {
    return templateLiteral(value);
  }
  if (typeof value === 'boolean') {
    return literal(value);
  }
  if (value === undefined) {
    return identifier('undefined');
  }
  if (value === null) {
    return nul();
  }

  ASSERT(false);
}

export function isNoob(node, v) {
  const r = _isNoob(node, v);
  if (v) vlog('  - Node:', node.type, ', noob?', r);
  return r;
}
function _isNoob(node, v) {
  // Does this node possibly have any side effect (aside from its main effect, like assignment or call)
  if (node.type === 'VariableDeclaration') {
    return !node.declarations[0].init || isNoob(node.declarations[0].init, v);
  }

  if (node.type === 'ExpressionStatement') {
    return isNoob(node.expression, v);
  }

  if (node.type === 'AssignmentExpression') {
    return isNoob(node.left, v) && isNoob(node.right, v);
  }

  if (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
    return true;
  }

  if (node.type === 'ArrayExpression') {
    // This should be normalized, right? So none of the elements should have an observable side effect
    return true;
  }

  if (node.type === 'ObjectExpression') {
    // This should be normalized, right? So none of the properties or computed keys should have an observable side effect
    return true;
  }

  if (node.type === 'EmptyStatement' || node.type === 'DebuggerStatement') {
    return true;
  }

  // TODO: we can probably add more things to this list
  return (
    node.type === 'Identifier' ||
    node.type === 'Literal' ||
    isPrimitive(node) ||
    // Typeof on an identifier does not trigger an observable side effect
    (node.type === 'UnaryExpression' && node.operator === 'typeof' && node.argument.type === 'Identifier')
  );
}

export function isSimpleNodeOrSimpleMember(node) {
  if (!isComplexNode(node)) return true;
  if (node.type !== 'MemberExpression') return false;
  // Simple member expression must have a simple object and, if computed, a simple property and does not nest.
  return !(isComplexNode(node.object) || (node.computed && isComplexNode(node.property)));
}

export function isComplexNode(node, incNested = true, preNormalization = false) {
  ASSERT(typeof node !== 'string', 'dont pass .type');
  ASSERT([1, 2, 3].includes(arguments.length), 'arg count');
  // A node is simple if it is
  // - an identifier
  // - a literal (but not regex, object, array)
  // - a unary expression `-` or `+` with a number literal arg, NaN, or Infinity
  // - a sequence expression ending in a simple node
  // Most of the time these nodes are not reduced any further
  // The sequence expression sounds complex but that's what we normalize into most of the time
  //
  // Note: An empty array/object literal is not "simple" because it has an observable reference
  //       If we were to mark these "simple" then they might be duplicated without further thought,
  //       leading to hard to debug reference related issues.

  if (node.type === 'Literal') {
    if (node.raw !== 'null' && node.value === null) return true; // This will be a regex. They are objects, so they are references, which are observable.
    return false;
  }
  if (node.type === 'Identifier') {
    return false;
  }
  if (incNested && node.type === 'UnaryExpression' && node.operator === '-') {
    // -100 (is a unary expression!)
    if (node.argument.type === 'Literal' && typeof node.argument.value === 'number') return false;
    // A little unlikely but you know
    // -NaN, +NaN, -Infinity, +Infinity
    if (node.argument.type === 'Identifier' && (node.argument.name === 'Infinity' || node.argument.name === 'NaN')) return false;
  }
  if (node.type === 'TemplateLiteral') return node.expressions.length > 0; // After the pre-normalization, all templates must be string concats only, no matter how many expressions it has
  if (node.type === 'ThisExpression') return true;
  if (node.type === 'Super') return false;

  return true;
}

export function isProperIdent(node, allowLiteral = false) {
  if (node.type === 'TemplateLiteral') {
    return node.expressions.length === 0 && _isIdent(node.quasis[0].value.cooked);
  }

  if (allowLiteral) {
    return node.type === 'Literal' && typeof node.value === 'string' && _isIdent(node.value);
  }

  ASSERT(node.type !== 'Literal' || typeof node.value !== 'string', 'fix assertion at caller?');
  return false;
}
function _isIdent(str) {
  // If the key name is a legit key then why not. Let's just test it.
  try {
    // TODO: find a clean way to test any unicode identifier without opening up to eval attacks here
    return !!(/^[\w_$]+$/.test(str) && Function('foo.' + str) && true);
  } catch {
    return false;
  }
}

export function nodeHasNoObservableSideEffectNorStatements(node, noDelete) {
  // This function assumes normalized code (!)

  // Given node represents an expression (including an ExpressionStatement), return true if the
  // node contained an expression with an observable side effect, and false if it doesn't.
  // This function will not visit bodies of functions, merely expressions.
  // It returns false for any statement that is not a variable declaration or expression statement.
  // TODO: potentially we can support walking loops and ifs but there's probably no real point to it

  const r = expressionHasNoObservableSideEffect(node, noDelete);
  if (r !== undefined) return r;

  if (node.type === 'EmptyStatement') {
    return true;
  }

  if (node.type === 'VariableDeclaration') {
    // This one is tricky. The binding itself is observable insofar that it may trigger TDZ errors if moved later.
    // But I think for the intention of this function, the question is whether the init is observable.
    // Probably need to revise this a bit later on.
    return expressionHasNoObservableSideEffect(node.declarations[0].init, noDelete);
  }

  if (node.type === 'ExpressionStatement') {
    // Shouldn't reach here but whatever
    return expressionHasNoObservableSideEffect(node.expression, noDelete);
  }

  // If this is not what you wanted you were maybe looking for nodeHasNoObservableSideEffectIncStatements
  return false; // Do not pass other statements
}
export function nodeHasNoObservableSideEffectIncStatements(node, noDelete) {
  ASSERT(node, 'should receive a node');
  // This function assumes normalized code (!)
  // This function DOES assume to be visiting statements

  // Given node represents an expression (including an ExpressionStatement), return true if the
  // node contained an expression with an observable side effect, and false if it doesn't.
  // This function will not visit bodies of functions, merely expressions.
  // It returns false for any statement that is not a variable declaration or expression statement.
  // TODO: potentially we can support walking loops and ifs but there's probably no real point to it

  const r = expressionHasNoObservableSideEffect(node, noDelete);
  if (r !== undefined) return r;

  if (node.type === 'EmptyStatement') {
    return true;
  }

  if (node.type === 'VariableDeclaration') {
    // This one is tricky. The binding itself is observable insofar that it may trigger TDZ errors if moved later.
    // But I think for the intention of this function, the question is whether the init is observable.
    // Probably need to revise this a bit later on.
    return expressionHasNoObservableSideEffect(node.declarations[0].init, noDelete);
  }

  if (node.type === 'ExpressionStatement') {
    // Shouldn't reach here but whatever
    return expressionHasNoObservableSideEffect(node.expression, noDelete);
  }

  if (node.type === 'IfStatement') {
    // Note: in normalized state the if-test should be a simple node, for which the if-test is not observable.
    // Visit both branches entirely.
    ASSERT(!isComplexNode(node.test));
    return (
      node.consequent.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete)) ||
      node.alternate.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete))
    );
  }

  if (node.type === 'WhileStatement') {
    // Note: in normalized state the while-test should be a simple node.
    // The while-test does not trigger coercion and should not be observable.
    ASSERT(!isComplexNode(node.test));

    // The test read is not observable. Visit the body recursively.
    return node.body.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete));
  }

  if (node.type === 'DebuggerStatement') {
    // I'm inclined to treat this as a special case but for now I'll allow it.
    return true;
  }

  if (node.type === 'EmptyStatement') {
    return true;
  }

  if (node.type === 'LabeledStatement') {
    return node.body.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete));
  }

  if (node.type === 'ImportDeclaration') {
    // I don't think anything this declaration does is observable when it matters. It resolves at load time.
    return true;
  }

  if (node.type === 'ExportNamedDeclaration') {
    // I don't think anything this declaration does is observable when it matters. It resolves at load time.
    // When normalized, it should only be the `export {X as y}` kind, no func/var/expr etc.
    return true;
  }

  if (node.type === 'ForInStatement') {
    return node.body.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete));
  }

  if (node.type === 'ForOfStatement') {
    return node.body.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete));
  }

  if (node.type === 'TryStatement') {
    return (
      node.block.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete)) &&
      (!node.handler || node.handler.body.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete))) &&
      (!node.finalizer || node.finalizer.body.every((cnode) => nodeHasNoObservableSideEffectIncStatements(cnode, noDelete)))
    );
  }

  if (
    node.type === 'ReturnStatement' ||
    node.type === 'ThrowStatement' ||
    node.type === 'BreakStatement' ||
    node.type === 'ContinueStatement'
  ) {
    // Tricky. But the statement itself should not really have a _side_ effect. Like, it can't just change the value of a property before
    // reaching the target ref. So I think we should ignore it, as the argument for return and throw should be simple when normalized.
    return true;
  }

  ASSERT(false, 'TODO: support this node', node);
}
export function expressionHasNoObservableSideEffect(node, noDelete) {
  // This function assumes normalized code (!)

  // Return true when the given expression node has an observable side effect, false when it does not,
  // and undefined when it is not an expression node (or not yet supported node type).

  // A node may have observable _side_ effects if the userland code may observe something beyond the
  // explicit action of the node. For example, property access may trigger getters, addition may
  // trigger coercion (valueOf/toString), that sort of thing. We assume built-ins don't do this beyond
  // the things in the spec (like array length) so primitives are generally safe.

  // In this context, the creation of a binding is an observable side effect because
  // it may change whether or not TDZ errors trigger.

  // Note: This function is paired with ssaCheckMightContainIdentName

  if (!isComplexNode(node)) {
    return true;
  }
  if (node.type === 'Literal') {
    // regex, bigint, ...?
    return true;
  }

  // An assignment with simple rhs can not trigger anything else than the assign
  if (node.type === 'AssignmentExpression') {
    if (node.left.type !== 'Identifier') return false; // May trigger getter
    return expressionHasNoObservableSideEffect(node.right, noDelete);
  }
  // This one assumes normalized code, where the contents of classes, arrays, and objects are all simple nodes
  if (node.type === 'ClassExpression') {
    // Make sure idents are not coerced to key strings
    return !node.body.body.some((n) => n.computed && !isPrimitive(n.key));
  }
  if (
    node.type === 'ArrayExpression' // spread is observable... (we could check for it)
  ) {
    return node.elements.every((n) => n?.type !== 'SpreadElement');
  }
  if (
    node.type === 'ObjectExpression' // spread is observable... (we could check for it)
  ) {
    // Confirm that all keys are either not computed, or primitives. Makes sure idents are not coerced to key strings.
    return !node.properties.some((n) => n?.type === 'SpreadElement' || (n.computed && !isPrimitive(n.key)) || !isPrimitive(n.value));
  }
  if (['FunctionExpression', 'ThisExpression', 'Param'].includes(node.type)) {
    return true;
  }
  if (node.type === 'VariableDeclaration') {
    ASSERT(node.declarations.length === 1, 'in normalized code all binding decls have on decl');
    ASSERT(node.declarations[0].init, 'in normalized code all binding decls have inits', node)
    return expressionHasNoObservableSideEffect(node.declarations[0].init, noDelete);
  }
  if (node.type === 'VariableDeclarator') {
    return expressionHasNoObservableSideEffect(node.init, noDelete);
  }
  if (node.type === 'ExpressionStatement') {
    return expressionHasNoObservableSideEffect(node.expression, noDelete);
  }
  if (node.type === 'TemplateLiteral') {
    // Templates that reach this point must be introduced by Preval and any expressions must not be spying
    return true;
  }
  if (node.type === 'UnaryExpression') {
    if (node.operator === 'typeof') {
      return !isComplexNode(node.argument);
    }
    if (node.operator === 'delete') {
      if (noDelete) {
        // Something that wants to use properties should be aware of this expression
        return false;
      } else {
        // The action can't be trapped except by Proxy, which we assume to void us anyways
        // For all others, only allow primitives because the ops might coerce
        return true;
      }
    }
    return isPrimitive(node.argument);
  }
  if (node.type === 'BinaryExpression') {
    if (['===', '!==', 'in', 'instanceof'].includes(node.operator)) {
      return !isComplexNode(node.left) && isComplexNode(node.right);
    }
    // In all other cases the op may coerce
    return isPrimitive(node.left) && isPrimitive(node.right);
  }
  if (node.type === 'AwaitExpression') {
    // The await triggers a pause
    return false;
  }
  if (node.type === 'YieldExpression') {
    // The yield triggers a pause
    return false;
  }

  // Don't know about this node
  return undefined;
}
export function ssaCheckMightContainIdentName(node, name) {
  // Given node represents an expression (including an ExpressionStatement), return whether the
  // expression has an observable side effect or not.
  // If the node is not an expression but any other kind of statement, return undefined.

  // Returns true on a selection of AST nodes and only if they are not an ident with given name
  // or contain any such node. The node is assumed to be part of a normalized AST.
  // Returns false if any supported node does not contain the name.
  // Returns undefined if it encountered any node type that is missing from this func.

  // Note: This function is paired with expressionHasNoObservableSideEffect
  //       For any node where `expressionHasNoObservableSideEffect` can return `false`, this function
  //       must be able to check such node for the occurrence of given name, recursively.

  if (node.type === 'Identifier') {
    return node.name === name;
  }
  if (!isComplexNode(node)) {
    // Of the non-complex nodes, only ident needs to be checked (not literal, not unary-number)
    return false;
  }
  if (node.type === 'Literal') {
    // regex, bigint, ...?
    return false;
  }

  // An assignment with simple rhs can not trigger anything else than the assign
  if (node.type === 'AssignmentExpression') {
    const left = ssaCheckMightContainIdentName(node.left, name);
    if (left === true || left === undefined) return left;
    return ssaCheckMightContainIdentName(node.right, name);
  }
  // This one assumes normalized code, where the contents of classes, arrays, and objects are all simple nodes
  if (node.type === 'ClassExpression') {
    // Must check computed keys
    const extend = !!node.superClass && ssaCheckMightContainIdentName(node.superClass, name);
    if (extend === true || extend === undefined) return extend;
    return node.body.body.some((n) => n.computed && ssaCheckMightContainIdentName(n.key, name));
  }
  if (
    node.type === 'ArrayExpression' // spread is observable... (we could check for it)
  ) {
    let r = false;
    node.elements.some((n) => {
      if (n) {
        const s = ssaCheckMightContainIdentName(n, name);
        if (s === undefined || s === true) {
          r = s;
          return true;
        }
      }
    });
    return r;
  }
  if (
    node.type === 'ObjectExpression' // spread is observable... (we could check for it)
  ) {
    // Confirm that all keys are either not computed, or primitives. Makes sure idents are not coerced to key strings.
    let r = false;
    node.properties.some((n) => {
      if (n.computed) {
        const s = ssaCheckMightContainIdentName(n.key, name);
        if (s === undefined || s === true) {
          r = s;
          return true;
        }
        if (r !== false) return true;
      }
      return ssaCheckMightContainIdentName(n.value, name);
    });
    return r;
  }
  if (['FunctionExpression', 'ThisExpression', 'Param'].includes(node.type)) {
    return false;
  }
  if (node.type === 'VariableDeclaration') {
    const dec = node.declarations[0];
    const r = ssaCheckMightContainIdentName(dec.id, name);
    if (r === undefined || r === true) return r;
    return ssaCheckMightContainIdentName(dec.init, name);
  }
  if (node.type === 'VariableDeclarator') {
    const r = ssaCheckMightContainIdentName(node.id, name);
    if (r === undefined || r === true) return r;
    return ssaCheckMightContainIdentName(node.init, name);
  }
  if (node.type === 'ExpressionStatement') {
    return ssaCheckMightContainIdentName(node.expression, name);
  }
  if (node.type === 'TemplateLiteral') {
    // Templates that reach this point must be introduced by Preval and only contain simple nodes
    // So we don't need to dig deep here. There's no spreads or other special casing involved here.
    return node.expressions.some((enode) => enode.type === 'Identifier' && enode.name === name);
  }
  if (node.type === 'UnaryExpression') {
    return ssaCheckMightContainIdentName(node.argument, name);
  }
  if (node.type === 'BinaryExpression') {
    const r = ssaCheckMightContainIdentName(node.left, name);
    if (r === undefined || r === true) return r;
    return ssaCheckMightContainIdentName(node.right, name);
  }

  // The rest are complex nodes that we still want to check through for the "first var assign" case

  if (node.type === 'CallExpression' || node.type === 'NewExpression') {
    let r = ssaCheckMightContainIdentName(node.callee, name);
    if (r === undefined || r === true) return r;
    node.arguments.some((n) => {
      const s = ssaCheckMightContainIdentName(n, name);
      if (s === undefined || s === true) {
        r = s;
        return true;
      }
    });
    return r;
  }
  if (node.type === 'MemberExpression') {
    let r = ssaCheckMightContainIdentName(node.object, name);
    if (r === undefined || r === true) return r;
    if (!node.computed) return false;
    return ssaCheckMightContainIdentName(node.property, name);
  }

  if (node.type === 'EmptyStatement') return false;
  if (node.type === 'DebuggerStatement') return false;

  // tagged template (?), return, throw, label (?), if, while, for-x, block (?), try, import, export, member, method, restelement, super,
  ASSERT(false, 'gottacatchemall 1', node);

  // Unsupported node found. "Unknown"
  return undefined;
}
export function ssaReplaceIdentName(node, oldName, newName) {
  // Note: This function is paired with expressionHasNoObservableSideEffect
  //       For any node where `expressionHasNoObservableSideEffect` can return `false`, this function
  //       must be able to check such node for the occurrence of given name, recursively.

  if (node.type === 'Identifier') {
    if (node.name === oldName) {
      node.name = newName;
    }
  }
  if (!isComplexNode(node)) {
    // Of the non-complex nodes, only ident needs to be checked (not literal, not unary-number)
    return;
  }
  if (node.type === 'Literal') {
    // regex, bigint, ...?
    return;
  }

  // An assignment with simple rhs can not trigger anything else than the assign
  if (node.type === 'AssignmentExpression') {
    ssaReplaceIdentName(node.left, oldName, newName);
    ssaReplaceIdentName(node.right, oldName, newName);
    return;
  }
  // This one assumes normalized code, where the contents of classes, arrays, and objects are all simple nodes
  if (node.type === 'ClassExpression') {
    // Must check computed keys
    if (node.superClass) ssaReplaceIdentName(node.superClass, oldName, newName);
    node.body.body.forEach((n) => n.computed && ssaReplaceIdentName(n.key, oldName, newName));
    return;
  }
  if (
    node.type === 'ArrayExpression' // spread is observable... (we could check for it)
  ) {
    node.elements.forEach((n) => n && ssaReplaceIdentName(n, oldName, newName));
    return;
  }
  if (
    node.type === 'ObjectExpression' // spread is observable... (we could check for it)
  ) {
    // Confirm that all keys are either not computed, or primitives. Makes sure idents are not coerced to key strings.
    node.properties.forEach((n) => {
      if (n.computed) ssaReplaceIdentName(n.key, oldName, newName);
      ssaReplaceIdentName(n.value, oldName, newName);
    });
    return;
  }
  if (['FunctionExpression', 'ThisExpression', 'Param'].includes(node.type)) {
    return;
  }
  if (node.type === 'VariableDeclaration') {
    const dec = node.declarations[0];

    ssaReplaceIdentName(dec.id, oldName, newName);
    ssaReplaceIdentName(dec.init, oldName, newName);
    return;
  }
  if (node.type === 'VariableDeclarator') {
    ssaReplaceIdentName(node.id, oldName, newName);
    ssaReplaceIdentName(node.init, oldName, newName);
    return;
  }
  if (node.type === 'ExpressionStatement') {
    return ssaReplaceIdentName(node.expression, oldName, newName);
  }
  if (node.type === 'TemplateLiteral') {
    // Templates that reach this point must be introduced by Preval and only contain simple nodes
    // So we don't need to dig deep here. There's no spreads or other special casing involved here.
    return node.expressions.forEach((enode, i) => {
      if (enode.type === 'Identifier' && enode.name === oldName) {
        node.expressions[i] = identifier(newName);
      }
    });
    return;
  }
  if (node.type === 'UnaryExpression') {
    ssaReplaceIdentName(node.argument, oldName, newName);
    return;
  }
  if (node.type === 'BinaryExpression') {
    ssaReplaceIdentName(node.left, oldName, newName);
    ssaReplaceIdentName(node.right, oldName, newName);
    return;
  }

  // The rest are complex nodes that we still want to check through for the "first var assign" case

  if (node.type === 'CallExpression') {
    ssaReplaceIdentName(node.callee, oldName, newName);
    node.arguments.forEach((n) => ssaReplaceIdentName(n, oldName, newName));
    return;
  }
  if (node.type === 'NewExpression') {
    ssaReplaceIdentName(node.callee, oldName, newName);
    node.arguments.forEach((n) => ssaReplaceIdentName(n, oldName, newName));
    return;
  }
  //if (node.type === 'IfStatement') {
  //  // Assuming this is about the test
  //  ssaReplaceIdentName(node.test, oldName, newName);
  //  return
  //}
  // tagged template (?), return, throw, label (?), if, while, for-x, block (?), try, import, export, member, method, restelement, super,
  ASSERT(false, 'gottacatchemall 2', node);
}
export function ssaFindIdentRefs(node, set = new Set()) {
  const r = _ssaFindIdentRefs(node, set);
  ASSERT(r !== true, 'wat true', node);
  return r;
}
export function _ssaFindIdentRefs(node, set = new Set()) {
  // Works on some nodes. Returns a set of names found nested in the node or false
  // if the node is not supported here.

  // Note: This function is paired with expressionHasNoObservableSideEffect
  //       For any node where `expressionHasNoObservableSideEffect` can return `false`, this function
  //       must be able to check such node for the occurrence of given name, recursively.

  if (node.type === 'Identifier') {
    set.add(node.name);
    return set;
  }
  if (!isComplexNode(node)) {
    // Of the non-complex nodes, only ident needs to be checked (not literal, not unary-number)
    return set;
  }
  if (node.type === 'Literal') {
    // regex, bigint, ...?
    return set;
  }

  // An assignment with simple rhs can not trigger anything else than the assign
  if (node.type === 'AssignmentExpression') {
    return ssaFindIdentRefs(node.left, set) && ssaFindIdentRefs(node.right, set);
  }
  // This one assumes normalized code, where the contents of classes, arrays, and objects are all simple nodes
  if (node.type === 'ClassExpression') {
    // Must check computed keys
    return (
      (!node.superClass || ssaFindIdentRefs(node.superClass, set)) &&
      node.body.body.every((n) => !n.computed || !!ssaFindIdentRefs(n.key, set)) &&
      set
    );
  }
  if (
    node.type === 'ArrayExpression' // spread is observable... (we could check for it)
  ) {
    return node.elements.every((n) => !n || !!ssaFindIdentRefs(n, set)) && set;
  }
  if (
    node.type === 'ObjectExpression' // spread is observable... (we could check for it)
  ) {
    // Confirm that all keys are either not computed, or primitives. Makes sure idents are not coerced to key strings.
    return (
      node.properties.every((n) => {
        if (n.computed) {
          if (!ssaFindIdentRefs(n.key, set)) return false;
        }
        return !!ssaFindIdentRefs(n.value, set);
      }) && set
    );
  }
  if (['FunctionExpression', 'ThisExpression', 'Param'].includes(node.type)) {
    return set;
  }
  if (node.type === 'VariableDeclaration') {
    const dec = node.declarations[0];
    return ssaFindIdentRefs(dec.id, set) && ssaFindIdentRefs(dec.init, set);
  }
  if (node.type === 'VariableDeclarator') {
    return ssaFindIdentRefs(node.id, set) && ssaFindIdentRefs(node.init, set);
  }
  if (node.type === 'ExpressionStatement') {
    return ssaFindIdentRefs(node.expression, set);
  }
  if (node.type === 'TemplateLiteral') {
    // Templates that reach this point must be introduced by Preval and only contain simple nodes
    // So we don't need to dig deep here. There's no spreads or other special casing involved here.
    node.expressions.forEach((enode) => {
      if (enode.type === 'Identifier') set.add(node.name);
    });
    return set;
  }
  if (node.type === 'UnaryExpression') {
    return ssaFindIdentRefs(node.argument, set);
  }
  if (node.type === 'BinaryExpression') {
    return ssaFindIdentRefs(node.left, set) && ssaFindIdentRefs(node.right, set);
  }

  // The rest are complex nodes that we still want to check through for the "first var assign" case

  if (node.type === 'CallExpression') {
    return ssaFindIdentRefs(node.callee, set) && node.arguments.every((n) => !!ssaFindIdentRefs(n, set)) && set;
  }
  if (node.type === 'NewExpression') {
    return ssaFindIdentRefs(node.callee, set) && node.arguments.every((n) => !!ssaFindIdentRefs(n, set)) && set;
  }
  if (node.type === 'MemberExpression') {
    return ssaFindIdentRefs(node.object, set) && (!node.computed || !!ssaFindIdentRefs(node.property, set)) && set;
  }
  if (node.type === 'SpreadElement') {
    return ssaFindIdentRefs(node.argument, set);
  }

  //if (node.type === 'IfStatement') {
  //  // Assuming this is about the test
  //  return ssaFindIdentRefs(node.test, oldName);
  //}
  // tagged template (?), return, throw, label (?), if, while, for-x, block (?), try, import, export, member, method, restelement, super,
  ASSERT(false, 'gottacatchemall 3', node);
}

export function deepCloneForFuncInlining(node, paramArgMapper, fail) {
  // Assumes normalized input. Should output normalized code, even when fail.ed=true
  // Walk the node. Replace all occurrences of the read of an ident with the argument.
  // Bail if a write ident was part of the mapper
  // Mapper should only contain nodes valid for AST.cloneSimple

  switch (node.type) {
    case 'IfStatement': {
      return ifStatement(
        deepCloneForFuncInlining(node.test, paramArgMapper, fail),
        deepCloneForFuncInlining(node.consequent, paramArgMapper, fail),
        deepCloneForFuncInlining(node.alternate, paramArgMapper, fail),
      );
    }
    case 'WhileStatement': {
      return whileStatement(
        deepCloneForFuncInlining(node.test, paramArgMapper, fail),
        deepCloneForFuncInlining(node.body, paramArgMapper, fail),
      );
    }
    case 'ForInStatement': {
      return forInStatement(
        deepCloneForFuncInlining(node.left, paramArgMapper, fail),
        deepCloneForFuncInlining(node.right, paramArgMapper, fail),
        deepCloneForFuncInlining(node.body, paramArgMapper, fail),
      );
    }
    case 'ForOfStatement': {
      return forOfStatement(
        deepCloneForFuncInlining(node.left, paramArgMapper, fail),
        deepCloneForFuncInlining(node.right, paramArgMapper, fail),
        deepCloneForFuncInlining(node.body, paramArgMapper, fail),
      );
    }
    case 'EmptyStatement': {
      return emptyStatement();
    }
    case 'DebuggerStatement': {
      return debuggerStatement();
    }
    case 'ExpressionStatement': {
      return expressionStatement(deepCloneForFuncInlining(node.expression, paramArgMapper, fail));
    }
    case 'BlockStatement': {
      return blockStatement(node.body.map((n) => deepCloneForFuncInlining(n, paramArgMapper, fail)));
    }
    case 'VariableDeclaration': {
      return variableDeclaration(node.declarations[0].id.name, node.declarations[0].init, node.kind);
    }
    case 'BreakStatement': {
      if (node.label) throw TODO;
      return breakStatement();
    }
    case 'ContinueStatement': {
      if (node.label) throw TODO;
      return continueStatement();
    }
    case 'TryStatement': {
      //  type: 'TryStatement',
      //    block,
      //    handler: {
      //    type: 'CatchClause',
      //      param,
      //      body: handler,
      //  },
      //  finalizer,
      //    $p: $p(),
      //  }
      return tryStatement(
        deepCloneForFuncInlining(node.block, paramArgMapper, fail),
        node.handler && node.handler.param && deepCloneForFuncInlining(node.handler.param, paramArgMapper, fail),
        node.handler && deepCloneForFuncInlining(node.handler.body, paramArgMapper, fail),
        node.finalizer && deepCloneForFuncInlining(node.finalizer, paramArgMapper, fail),
      );
    }


    case 'Identifier': {
      // This is the money maker!
      // Note: the nodes should be normalized call arg nodes, meaning they must be simple nodes, so we should be able to simpleClone them
      if (paramArgMapper.has(node.name)) {
        return cloneSimple(paramArgMapper.get(node.name));
      }
      return identifier(node.name);
    }
    case 'Literal': {
      return cloneSimple(node);
    }
    case 'BinaryExpression': {
      return binaryExpression(
        node.operator,
        deepCloneForFuncInlining(node.left, paramArgMapper, fail),
        deepCloneForFuncInlining(node.right, paramArgMapper, fail),
      );
    }
    case 'AssignmentExpression': {
      ASSERT(node.operator === '=');
      if (node.left.type === 'Identifier' && paramArgMapper.has(node.left.name)) {
        // Hack. But rather this than throwing...
        fail.ed = true;
        return assignmentExpression(cloneSimple(node.left), deepCloneForFuncInlining(node.right, paramArgMapper, fail), '=');
      }
      return assignmentExpression(
        deepCloneForFuncInlining(node.left, paramArgMapper, fail),
        deepCloneForFuncInlining(node.right, paramArgMapper, fail),
        '=',
      );
    }
    case 'UnaryExpression': {
      return unaryExpression(node.operator, deepCloneForFuncInlining(node.argument, paramArgMapper, fail));
    }
    case 'ThisExpression': {
      return thisExpression();
    }
    case 'Super': {
      return thisExpression();
    }
    case 'ArrayExpression': {
      return arrayExpression(node.elements.map((n) => n && deepCloneForFuncInlining(n, paramArgMapper, fail)));
    }
    case 'ObjectExpression': {
      return objectExpression(node.properties.map((n) => deepCloneForFuncInlining(n, paramArgMapper, fail)));
    }
    case 'Property': {
      return property(
        node.computed ? deepCloneForFuncInlining(node.key, paramArgMapper, fail) : cloneSimple(node.key),
        deepCloneForFuncInlining(node.value, paramArgMapper, fail),
        false,
        node.computed,
        node.kind,
        node.method,
      );
    }
    case 'SpreadElement': {
      return spreadElement(deepCloneForFuncInlining(node.argument, paramArgMapper, fail));
    }
    case 'CallExpression': {
      return callExpression(
        deepCloneForFuncInlining(node.callee, paramArgMapper, fail),
        node.arguments.map((n) => deepCloneForFuncInlining(n, paramArgMapper, fail)),
      );
    }
    case 'MemberExpression': {
      return memberExpression(
        deepCloneForFuncInlining(node.object, paramArgMapper, fail),
        node.computed ? deepCloneForFuncInlining(node.property, paramArgMapper, fail) : cloneSimple(node.property),
        node.computed,
      );
    }
    case 'NewExpression': {
      return newExpression(
        deepCloneForFuncInlining(node.callee, paramArgMapper, fail),
        node.arguments.map((n) => deepCloneForFuncInlining(n, paramArgMapper, fail)),
      );
    }
    case 'TemplateLiteral': {
      return templateLiteral(
        node.quasis.map((te) => te.value.cooked),
        node.expressions.map((n) => deepCloneForFuncInlining(n, paramArgMapper, fail)),
      );
    }
    case 'TemplateElement': {
      ASSERT(false, 'eh?');
      return templateElement(
        deepCloneForFuncInlining(node.raw, paramArgMapper, fail),
        node.tail,
        deepCloneForFuncInlining(node.cooked, paramArgMapper, fail),
      );
    }
    case 'AwaitExpression': {
      throw new Error('can only inline an await into an async function or syntax erorrs happen');
      return awaitExpression(deepCloneForFuncInlining(node.argument, paramArgMapper, fail));
    }

    case 'ClassExpression': {
      throw TODO;
    }
    case 'Param': {
      throw TODO;
    }
    case 'LabeledStatement': {
      // tricky because labels are unique and if we change this one we must change it for the whole structure
      throw TODO;
    }
    case 'ThrowStatement': {
      return throwStatement(deepCloneForFuncInlining(node.argument, paramArgMapper, fail));
    }
    case 'ReturnStatement': {
      return returnStatement(deepCloneForFuncInlining(node.argument, paramArgMapper, fail));
    }
    case 'FunctionExpression': {
      // We do not want to deep clone function expressions because it leads to difficult binding duplication issues.
      // This function should not be called in cases where we do want to clone functions and if we do want to do
      // this in the future, we need to handle that through a different path.
      fail.ed = true;
      return identifier('undefined');
    }
    default: {
      console.log('node:', node);
      ASSERT(false, 'deep clone missing type', node);
    }
  }
}

export function complexNodeMightSpy(node, fdata) {
  ASSERT(node, 'expecitng node');
  ASSERT(fdata, 'expecting fdata');
  // aka, "a node is user observable when"

  // Assume `node` is in a normalized state.

  // A given node may represent an observable action if, aside from the thing the node explicitly
  // does, it may also trigger function calls as a side effect. In any way. Like getters and setters.
  // This means either the operation is safe, or any bindings used in the operation is a constant
  // known to be of a primitive type, or perhaps known to be a plain array, or plain object without
  // setters/getters.
  // Another way that a node might spy is by its object reference. Object reference equality or
  // property state can be inspected so we have to be careful about that.
  // (We do ignore proxies here for the time being.)

  switch (node.type) {
    case 'CallExpression': {
      // This may return false when the callee is Boolean, or when the callee is a built-in with
      // primitive typed args.

      if (node.callee.type === 'Identifier') {
        if (node.callee.name === 'Boolean') {
          if (node.arguments.length && node.arguments[0].type === 'SpreadElement') {
            // Why would you do this...
            return true;
          }
          // The arg must be normalized and the call is not observable so this can not be a spy
          return false;
        }

        if (node.callee.name === 'Number') {
          if (!node.arguments.length) {
            return false;
          }

          if (node.arguments[0]?.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);
            return !(meta.isConstant && meta?.typing.mustBeType === 'number');
          }

          // :shrug:
          return true;
        }

        if (node.callee.name === 'String') {
          if (!node.arguments.length) {
            return false;
          }

          if (node.arguments[0]?.type === 'Identifier') {
            const meta = fdata.globallyUniqueNamingRegistry.get(node.arguments[0].name);
            return !(meta.isConstant && meta?.typing.mustBeType === 'string');
          }

          // :shrug:
          return true;
        }
      }

      break;
    }
    case 'FunctionExpression': {
      // Creating functions is never observable on its own
      return false;
    }
    case 'ClassExpression': {
      // Creating classes is observable if the superClass is observable, or if any of the method keys
      // are computed and observable.

      if (node.superClass && complexNodeMightSpy(node.superClass, fdata)) return true;
      if (node.body.body.some((pnode) => pnode.computed && simpleNodeMightSpy(pnode.key, fdata))) return true;
      return false;
    }
    case 'ArrayExpression': {
      // Creating an array is not observable unless there's a spread and a spread arg is observable
      return node.elements.some((enode) => enode && enode.type === 'SpreadElement' && complexNodeMightSpy(enode.argument, fdata));
    }
    case 'ObjectExpression': {
      // Creating an object is not observable unless there's a spread and a spread arg that is observable
      return node.properties.some((pnode) => pnode.type === 'SpreadElement' && complexNodeMightSpy(pnode.argument, fdata));
    }
    case 'UnaryExpression': {
      // The `!` and `typeof` operators can not be observed in normalized code.
      // Other ops can not be observed if the arg is of a primitive type.
      switch (node.operator) {
        case 'typeof': {
          ASSERT(!isComplexNode(node.argument));
          return false;
        }
        case '!': {
          ASSERT(!isComplexNode(node.argument));
          return false;
        }
        case 'delete': {
          // TODO: if we know the property already can not exist as an own value on this object, then we know the answer
          // True because the operation may be observed indirectly, by checking the object.
          // TODO: add a switch to allow this behavior because for certain purposes it is still fine.
          return true;
        }
        case '+':
        case '-':
        case '~': {
          if (node.argument.type === 'Identifier') {
            return simpleNodeMightSpy(node.argument, fdata);
          }
          // A literal will be transformed elsewhere. In normalized state it won't be an object/array/etc. So, this is fine?
          return true;
        }
        default: {
          // TODO: stuff when we have enough information to guarantee the operation to unobservable
          // ~+- on a primitive, delete on objects that don't have that property, etc
        }
      }
      break;
    }
    case 'BinaryExpression': {
      // TODO: stuff when we have enough information to guarantee the operation to unobservable
      // Some operators are unobservable. Most require the operands to be unobservable.

      if (['===', '!==', 'in', 'instanceof'].includes(node.operator)) return false;
      return simpleNodeMightSpy(node.left, fdata) || simpleNodeMightSpy(node.right, fdata);
    }
    case 'Literal': {
      return false;
    }
    case 'TemplateLiteral': {
      // If a template reaches this point it must be introduced by Preval which means it cannot have any expressions that spy.
      return false;
    }
    case 'Identifier': {
      return simpleNodeMightSpy(node, fdata);
    }
  }

  return true;
}
function simpleNodeMightSpy(node, fdata) {
  ASSERT(!isComplexNode(node));
  if (node.type !== 'Identifier') {
    return !isPrimitive(node);
  }

  const name = node.name;
  // An identifier might spy if it might be an object that contains a getter, setter, or modified valueOf or toString.
  // In this context, an identifier known to be of a primitive type can not spy.
  // Answer the question whether this ident may call another function when it gets coerced to a certain type.

  const meta = fdata.globallyUniqueNamingRegistry.get(name);
  if (meta.isBuiltin) return name === 'undefined' || name === 'NaN' || name === 'Infinity'; // TODO: perhaps this is `true` in all cases?
  if (!meta.isConstant) return true;
  if (meta.isImplicitGlobal) return true;

  // If this is a primitive then the user cannot observe this action
  return !['undefined', 'null', 'boolean', 'number', 'string'].includes(meta.typing.mustBeType);
}

export function hasObservableSideEffectsBetween(ast, fromNode, toNode, mayMiss = false, dbg) {
  let fail = false;
  let found = false;
  let pass = false;
  //const DEBUG_STR = 'X = Y, V$3 = Y';
  const DEBUG_STR = '';

  //const X = Y;
  //const l$5 = o;
  //const g$3 = Q;
  //const V$3 = Y;

  walk(confirm, ast, 'ast');

  if (!mayMiss && !found) {
    //source(ast, true);
    //console.log(fromNode);
    //console.log(toNode);
    //source(fromNode, true);
    //source(toNode, true);
  }
  ASSERT(mayMiss || found, 'the node should exist in the given ast');
  ASSERT(mayMiss || fail || pass, 'either the search fails or the target node is found');

  return !pass;

  function confirm(node, beforeWalk, nodeType, path) {
    if (!beforeWalk) return found;
    if (node !== toNode) return found;
    found = true;
    if (fail) return;
    if (pass) return;

    let currentPathBodyIndex = path.blockBodies.length - 1;
    let currentPathIndexIndex = path.blockIndexes.length - 1;

    const parentNode = path.nodes[path.nodes.length - 2];
    const parentProp = path.props[path.props.length - 1];
    const parentIndex = path.indexes[path.indexes.length - 1];
    const grandNode = path.nodes[path.nodes.length - 3];
    const grandProp = path.props[path.props.length - 2];
    const grandIndex = path.indexes[path.indexes.length - 2];
    const blockBody = path.blockBodies[currentPathBodyIndex];
    const blockIndex = path.blockIndexes[currentPathIndexIndex];

    if (dbg === DEBUG_STR) console.log(' - Found read node... currentPathBodyIndex=', currentPathBodyIndex, ', currentPathIndexIndex=', currentPathIndexIndex, ', starting at index', blockIndex, 'of that body');
    if (dbg === DEBUG_STR) console.log('from ->', tmat(blockBody[blockIndex], true));
    if (dbg === DEBUG_STR) console.log('to   ->', tmat(fromNode, true));

    vlog(' - Verifying that statements between', fromNode.$p.pid, 'and', toNode.$p.pid, 'have no observable side effects (assigning values etc)');

    let currentBody = blockBody;
    let currentIndex = blockIndex; // This starts at the write
    if (dbg === DEBUG_STR) console.log('   - The read starts at', currentIndex, 'of body path index', currentPathBodyIndex);
    while (!fail && !pass) {
      if (dbg === DEBUG_STR) console.log('   - Going backwards in statements starting before', currentIndex, 'of body', currentPathBodyIndex);
      while (currentIndex > 0) {
        // In the current block, keep walking backwards until either the target or start is found
        // If start is found without seeing the targte, we'll move to the parent block and repeat.
        --currentIndex;
        if (dbg === DEBUG_STR) console.log('   - next check:', currentIndex, '/', currentPathBodyIndex, ':', currentBody[currentIndex].type);
        if (dbg === DEBUG_STR) console.log('->', tmat(currentBody[currentIndex], true));
        if (currentBody[currentIndex] === fromNode) {
          vlog('   - found target. end of search. there are no observable side effects between the nodes.');
          pass = true;
          return true;
        }
        ASSERT(currentBody[currentIndex], 'every element of a body should be present, right?', currentIndex);
        if (!nodeHasNoObservableSideEffectIncStatements(currentBody[currentIndex])) {
          vlog('     - observable. oh well.', currentBody[currentIndex]);
          //source(currentBody[currentIndex], true);
          fail = true;
          return true;
        }
      }

      if (currentPathBodyIndex <= 0 && currentPathIndexIndex <= 0) {
        if (mayMiss) {
          vlog('- bail: Not found?')
          fail = true;
          return;
        }
        // We're at the start of Program without finding target. I think something error happened at this point.
        source(ast, true);
        source(fromNode, true);
        source(toNode, true);
        console.log(fromNode);
        console.log(toNode);
        ASSERT(false, 'The fromNode should always exist in the given ast');
        //throw new Error('fail');
        fail = true;
      }
      if (currentIndex === 0) {
        const nextBody = path.blockBodies[--currentPathBodyIndex];
        const nextIndex = path.blockIndexes[--currentPathIndexIndex];
        if (dbg === DEBUG_STR) console.log('   - went up a level. body:', currentPathBodyIndex, ', index:', currentPathIndexIndex, ', body[i=]:', nextIndex, '/', currentBody.length, '::', nextBody[nextIndex]?.type);
        if (dbg === DEBUG_STR) console.log('->', tmat(currentBody[currentIndex], true));
        if (nextBody[nextIndex]?.type === 'TryStatement') {
          // confirm this was the body and not the handler/finalizer
          if (nextBody[nextIndex].handler?.body.body === currentBody || nextBody[nextIndex].finalizer?.body === currentBody) {
            vlog('   - was from catch/finally, bailing');
            fail = true;
            return true;
          }
        }
        currentBody = nextBody;
        currentIndex = nextIndex;
      }
    }

    return true;
  }
}
