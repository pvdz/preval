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

export function identifier(name) {
  ASSERT(typeof name === 'string' && name, 'ident names must be valid nonempty strings', name);
  ASSERT(!['true', 'false', 'null'].includes(name), 'these are literals.');
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
    ASSERT(isFinite(value), 'do not use this for Infinity, NaN, etc...', value);
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

export function throwStatement(argument = null, isString = false, isIdent = false) {
  if (typeof argument === 'string') {
    ASSERT(isString || isIdent, 'too dangerous not to be explicit');
    argument = identifier(argument);
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
  // It's different from a literal since, for example, `undefined` is not a Literal node.

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

export function isFalsy(node) {
  // If this function does not return true, it does not automatically mean it's a truthy. Just that we can't determine it to be falsy.
  if (node.type === 'Literal' && (node.raw === 'null' || node.value === '' || node.value === false || node.value === 0)) return true;
  if (node.type === 'Identifier' && (node.name === 'undefined' || node.name === 'NaN')) return true;

  // TODO: expand on this

  return false;
}
export function isTruthy(node) {
  // If this function does not return true, it does not automatically mean it's a falsy. Just that we can't determine it to be truthy.
  if (node.type === 'Literal') {
    if (typeof node.value === 'string') return node.value !== '';
    if (typeof node.value === 'boolean') return node.value === true;
    if (typeof node.value === 'number') return node.value !== 0;
    // All other literals are auto truthy I think? What about 0 big int?
    return true;
  }

  if (node.type === 'Identifier') {
    return node.name === 'Infinity';
  }

  // TODO: expand on this

  return false;
}

export function isUndefined(node) {
  return node.type === 'Identifier' && node.name === 'undefined';
}
export function isNull(node) {
  return node.type === 'Literal' && node.raw === 'null';
}

export function getPrimitiveValue(node) {
  ASSERT(isPrimitive(node));

  if (node.type === 'Literal') {
    if (node.raw === 'null') return null;
    if (['number', 'string', 'boolean'].includes(typeof node.value)) return node.value;
    ASSERT(false);
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
    if (Math.sign(1 / value) < 0) {
      return unaryExpression('-', literal(-value));
    }
    return literal(value);
  }
  if (typeof value === 'string' || typeof value === 'boolean') {
    return value;
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
    return !node.body.body.some((n) => n?.type === 'SpreadElement' || (n.computed && !isPrimitive(n.key)));
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
    return expressionHasNoObservableSideEffect(node.declarations[0].init, noDelete);
  }
  if (node.type === 'VariableDeclarator') {
    return expressionHasNoObservableSideEffect(node.init, noDelete);
  }
  if (node.type === 'ExpressionStatement') {
    return expressionHasNoObservableSideEffect(node.expression, noDelete);
  }
  if (node.type === 'TemplateLiteral') {
    // Note: A template like `a{b}c` may still trigger a string coercion on b so only allow primitives here
    // Note: A little redundant. In this case it's a static template that should be converted to a string literal. But okay.
    return node.expressions.every((node) => isPrimitive(node));
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
    // Note: A template like `a{b}c` may still trigger a string coercion on b so only allow primitives here
    // In theory expressionHasNoObservableSideEffect would not return false when this returns true for this node...
    let r = false;
    node.expressions.some((node) => {
      const s = ssaCheckMightContainIdentName(node, name);
      if (s === undefined || s === true) {
        r = s;
        return true;
      }
    });
    return r;
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
  // Returns true on a selection of AST nodes and only if they are not an ident with given name
  // or contain any such node. The node is assumed to be part of a normalized AST.

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
    // Note: A template like `a{b}c` may still trigger a string coercion on b so only allow primitives here
    // In theory expressionHasNoObservableSideEffect would not return false when this returns true for this node...
    node.expressions.forEach((node) => ssaReplaceIdentName(node, oldName, newName));
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
    // Note: A template like `a{b}c` may still trigger a string coercion on b so only allow primitives here
    // In theory expressionHasNoObservableSideEffect would not return false when this returns true for this node...
    return node.expressions.every((node) => !!ssaFindIdentRefs(node, set)) && set;
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
