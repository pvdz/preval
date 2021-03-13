import { ASSERT } from './utils.mjs';
import { $p } from './$p.mjs';

export function cloneSimple(node) {
  if (node.type === 'Identifier') {
    return identifier(node.name);
  }

  if (node.type === 'Literal') {
    if (node.raw === 'null') return nul(); // be explicit for null
    return literal(node.value);
  }

  if (node.type === 'MemberExpression') {
    return memberExpression(cloneSimple(node.object), cloneSimple(node.property), node.computed);
  }

  if (
    node.type === 'UnaryExpression' &&
    (node.operator === '+' || node.operator === '-') &&
    node.argument.type === 'Literal' &&
    typeof node.argument.value === 'number'
  ) {
    // -5, +0.2e3
    return unaryExpression(node.operator, cloneSimple(node.argument));
  }

  if (node.type === 'ThisExpression') {
    ASSERT(false, 'I think we shouldnt allow to clone `this` without an explicit optin');
    //return thisExpression();
  }

  ASSERT(false, 'add me', node);
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

export function functionExpression(params, body, { id, generator, async } = {}) {
  if (!Array.isArray(params)) params = [params];
  params.map((n, i) => (typeof n === 'string' ? identifier(n) : n));
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

export function identifier(name) {
  ASSERT(typeof name === 'string' && name, 'ident names must be valid nonempty strings', name);
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

export function literal(value, yesnull = false) {
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

export function templateElement(raw, tail, cooked = raw) {
  ASSERT(typeof raw === 'string');
  ASSERT(typeof cooked === 'string');
  ASSERT(typeof tail === 'boolean');

  return {
    type: 'TemplateElement',
    tail,
    value: { raw, cooked },
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
  if (typeof argument === 'string') argument = identifier(argument);

  return {
    type: 'ThrowStatement',
    argument,
    $p: $p(),
  };
}

export function tru() {
  return literal(true);
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
    $p: $p(),
  };
}

export function zero() {
  return literal(0);
}

export function isPrimitive(node) {
  // A primitive is a literal boolean, number, string, or null, or an identifier NaN, Infinity, or undefined.
  // It's different from a literal since, for example, `undefined` is not a Litearl node.

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

  return false;
}

export function isNoob(node, v) {
  const r = _isNoob(node, v);
  if (v) console.log('  - Node:', node.type, ', noob?', r);
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

export function isComplexNode(node, incNested = true) {
  ASSERT(typeof node !== 'string', 'dont pass .type');
  ASSERT([1, 2].includes(arguments.length), 'arg count');
  // A node is simple if it is
  // - an identifier
  // - a literal (but not regex)
  // - a unary expression `-` or `+` with a number arg, NaN, or Infinity
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
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return false; // Template without expressions is a string
  if (node.type === 'ThisExpression') return true;
  if (node.type === 'Super') return false;

  return true;
}

export function isProperIdent(node) {
  if (node.type === 'Literal' && typeof node.value === 'string') {
    const str = node.value;
    // If the key name is a legit key then why not. Let's just test it.
    try {
      // TODO: find a clean way to test any unicode identifier without opening up to eval attacks here
      return !!(/^[\w_$]+$/.test(str) && Function('foo.' + str) && true);
    } catch {
      return false;
    }
  }
}
