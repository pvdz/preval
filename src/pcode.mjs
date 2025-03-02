// Pseudo runtime Preval can compile a subset of functions into
// Very minimalistic. Very simple in concept.

// each array with a string is an op, it starts with an opcode and has args depending on the opcode
// - $$xxx are args ($$0 $$1 etc)
// - $_xxx are registers which represents local bindings ($_1 $_2 etc)
// - how do we distinguish a string from a register?
//   - first character determines meaning? something that separates a string from other values
// ops:
// - empty string is an expression whose value is not assigned (['', 'call', 'alert'])
//   - maybe not empty string but just a dollar sign or $__ or smth
// - starting with $ is local register assign/update
//   - there's no explicit declaration for registers
//   - we would store them in an object or whatever
//   - the remainder of the op is basically an expression
// - expressions
//   - unary/binary ops, followed by one or two registers/primitives
//   - 'call'
//     - ['call', register, ...args]
//     - always calls a register, similar to a plain function call (in particular, not a method)
//     - limited support for what you can call. we'll want recursion. and built-ins, though each would need to be coded.
//     - compiler will pass in the name of a func that maps to the cache, including for example 'Math.abs'
//     - context sensitive calls, like num.toString(), are TBD. And more risky in general.
//     - args are zero or more registers or primitives
//   - probably needs a few more :)
// - 'if'
//   - ['if', test, consequent alternate]
//   - test is register that is truthy tested (primitives would resolve immediately)
//   - branches are a list of ops
// - 'return'
//   - ['return', arg]
//   - arg is a register or a primitive
// - 'break'
//   - TBD, see no reason not to support this
//   - would probably be ['break', label] with label being a string that may be empty (or mandatory not?)
// - i dont think we want to allow loops
// - we may allow try/catch because why not

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, findBodyOffset, tmat } from './utils.mjs';
import * as AST from './ast.mjs';
import { VERBOSE_TRACING, setVerboseTracing, YELLOW, ORANGE_DIM, PURPLE, RESET, DIM, ORANGE } from './constants.mjs';
import { SYMBOL_COERCE } from './symbols_preval.mjs';
import { symbo } from './symbols_builtins.mjs';

const NONE = 0;
const RETURN = 1;
const BREAK = 2;
const SO = 3; // "stack overflow" (or, max call depth exceeded)
export const SO_MESSAGE = '<max pcode call depth exceeded>';

/** @var {Set<string>} we need the func node because a let binding can have multiple funcs assigned to it. true means its a built-in we support */
export const pcodeSupportedBuiltinFuncs = new Set([
  // global builtins (only include those that return a primitive we can transform into)
  //'clearInterval', // has side-effect. returns an object in nodejs
  //'clearTimeout', // has side-effect. returns an object in nodejs
  'parseInt',
  'parseFloat',
  //'setInterval', // (obviously) has side-effect
  //'setTimeout', // (obviously) has side-effect
  'isNaN',
  //'eval', // dangerous
  'isFinite',
  //'Array', // returns object
  'Boolean',
  //'Date', // returns object
  //'Error', // returns object
  //'JSON', // Cant call this
  //'Math', // Cant call this
  //'Map', // returns object
  'Number',
  //'Object', // returns object
  //'RegExp', // returns object
  //'Set', // returns object
  'String',
  //'Function', // returns object

  // NodeJS / Browser
  'encodeURI',
  'decodeURI',
  'encodeURIComponent',
  'decodeURIComponent',
  'escape',
  'unescape',
  'btoa',
  'atob',

  symbo('boolean', 'toString'),
  symbo('boolean', 'valueOf'),

  symbo('Number', 'isFinite'),
  symbo('Number', 'isInteger'),
  symbo('Number', 'isNaN'),
  symbo('Number', 'isSafeInteger'),
  symbo('Number', 'parseFloat'),
  symbo('Number', 'parseInt'),

  symbo('number', 'toExponential'),
  symbo('number', 'toFixed'),
  //'number.toLocaleString', // The second argument is an options object which we need to consider later
  symbo('number', 'toPrecision'),
  symbo('number', 'toString'), // built-in method
  symbo('number', 'valueOf'),

  symbo('String', 'fromCharCode'), // built-in static function
  symbo('String', 'fromCodePoint'),
  symbo('String', 'raw'),

  symbo('string', 'charAt'), // built-in instance method
  symbo('string', 'charCodeAt'),
  symbo('string', 'concat'),
  symbo('string', 'includes'),
  symbo('string', 'indexOf'),
  symbo('string', 'lastIndexOf'),
  //'string.match', // TODO: regex and callbacks make this oenewkward?
  //'string.replace', // TODO: regex case makes this awkward?
  symbo('string', 'slice'),
  symbo('string', 'split'),
  symbo('string', 'substring'),
  symbo('string', 'substr'),
  symbo('string', 'toString'),
  symbo('string', 'toLowerCase'),
  symbo('string', 'toUpperCase'),
  symbo('string', 'valueOf'),

  // Note: some of the math props are questionable due to rounding errors and lossy serialization of complex floats
  symbo('Math', 'abs'),
  symbo('Math', 'acos'),
  symbo('Math', 'acosh'),
  symbo('Math', 'asin'),
  symbo('Math', 'asinh'),
  symbo('Math', 'atan'),
  symbo('Math', 'atan2'),
  symbo('Math', 'atanh'),
  symbo('Math', 'cbrt'),
  symbo('Math', 'ceil'),
  symbo('Math', 'clz32'),
  symbo('Math', 'cos'),
  symbo('Math', 'cosh'),
  symbo('Math', 'exp'),
  symbo('Math', 'expm1'),
  symbo('Math', 'f16round'),
  symbo('Math', 'floor'), // Static built-in
  symbo('Math', 'fround'),
  symbo('Math', 'hypot'),
  symbo('Math', 'imul'),
  symbo('Math', 'log'),
  symbo('Math', 'log10'),
  symbo('Math', 'log1p'),
  symbo('Math', 'log2'),
  symbo('Math', 'max'),
  symbo('Math', 'min'),
  symbo('Math', 'pow'),
  symbo('Math', 'random'), // we can fake this with a prng, fails if the prngSeed is zero
  symbo('Math', 'round'),
  symbo('Math', 'sign'),
  symbo('Math', 'sin'),
  symbo('Math', 'sinh'),
  symbo('Math', 'sqrt'),
  symbo('Math', 'tan'),
  symbo('Math', 'tanh'),
  symbo('Math', 'trunc'),

  SYMBOL_COERCE, // Preval special func
]);

export function runFreeWithPcode(funcNode, argNodes, fdata, freeFuncName, $prng, usePrng) {
  source(funcNode, true);
  const callsWhenCompiled = pcanCompile(funcNode, fdata, freeFuncName);
  vlog('Can pcode body?', freeFuncName, !!callsWhenCompiled, callsWhenCompiled ? 'Proceeding with compile and run...' : 'Not compiling or running...');
  if (callsWhenCompiled) {
    vgroup('Compiling:');
    const pcode = pcompile(funcNode, fdata);
    vgroupEnd();
    // Temp
    fdata.pcodeOutput = new Map;
    fdata.pcodeOutput.set(+funcNode.$p.pid, { pcode, funcNode, name: freeFuncName, bytecode: pcode });
    fdata.pcodeOutput.set(freeFuncName, { pcode, funcNode, name: freeFuncName, bytecode: pcode });
    vlog('Compiled pcode:', pcode);
    vlog('Getting primitives from args:', argNodes, argNodes);
    const args = argNodes.map(anode => AST.getPrimitiveValue(anode));
    vlog('Now running pcode with args:', args);
    const out = runPcode(freeFuncName, args, fdata.pcodeOutput, fdata, $prng, usePrng);
    vlog('Outcome:', out);
    // Cleanup
    fdata.pcodeOutput = undefined;

    return AST.primitive(out);
  }

  return null;
}

/**
 * Given a FunctionExpression node (maybe more later), determine whether
 * its body can be compiled into pcode. It either returns a set of idents
 * meaning it can compile if and only if those idents can all be compiled.
 * Otherwise it returns false.
 *
 * This requires every statement and every expression to be side effect
 * free, aka a pure function.
 *
 * This check will include known typing information to "prove" this. When
 * it can't guarantee pureness it will return false. Always room for improvement.
 */
export function pcanCompile(funcNode, fdata, funcNameForDebug) {
  // Note: the func will return a set of zero or more idents. If it does then
  // this func is only compilable if all those idents are too: it calls them.

  // - verify statements are of an allowed subset
  //   - no try, while
  // - verify expressions have no side effects
  //   - no closures
  //   - no property read/write (other than built-ins)
  //   - no delete, new
  //   - all operands are primitives
  //   - no calling of functions that haven't been compiled
  //   - no rest/spread
  //   - no await (probably a red flag anyways, why would await be part of a pure function in this context?)
  //   - no yield, maybe we can support that later when we have better coverage of generators

  if (funcNode.params.some(pnode => Boolean(pnode.rest))) {
    vlog('- bail: at least one param is rest');
    return false;
  }

  const calls = new Set; // Track which idents are called. We must verify them separately.
  const locals = new Map;
  if (pcanCompileBody(locals, calls, funcNode.body.body, fdata)) {
    vlog('- pcode can compile body:');
    vlog('  - the func calls:', calls);
    vlog('  - the local regs:', locals);
    return calls;
  }
  vlog('- fail:', calls, locals);
  return false;
}
function pcanCompileBody(locals, calls, body, fdata) {
  for (let i=0; i<body.length; ++i) {
    const stmt = body[i];
    //vlog('-', stmt.type);
    switch (stmt.type) {
      case 'ReturnStatement': {
        if (!pcanCompileExpr(locals, calls, stmt.argument, fdata, stmt)) {
          vlog('- bail: return arg is bad');
          return false;
        }
        break;
      }
      case 'VariableDeclaration': {
        if (!pcanCompileExpr(locals, calls, stmt.declarations[0].init, fdata, stmt)) {
          vlog('- bail: var init is bad');
          return false;
        }
        locals.set(stmt.declarations[0].id.name, 'r' + locals.size);
        break;
      }
      case 'ThrowStatement': {
        // TODO: not sure what use it is to throw. We can probably resolve something like `try { f(); } catch { }` somehow ...
        //       but even if it throws, the odds of it throwing just a string is very low and objects are much trivier
        return false;
        //if (!pcanCompileExpr(locals, calls, stmt.argument, fdata, stmt)) {
        //  vlog('- bail: throw arg is bad');
        //  return false;
        //}
        //break;
      }
      case 'BreakStatement': {
        break;
      }
      case 'LabeledStatement': {
        if (!pcanCompileBody(locals, calls, stmt.body.body, fdata)) {
          vlog('- bail: label body is bad');
          return false;
        }
        break;
      }
      case 'IfStatement': {
        if (!pcanCompileExpr(locals, calls, stmt.test, fdata, stmt)) {
          vlog('- bail: if test is bad');
          return false;
        }
        if (!pcanCompileBody(locals, calls, stmt.consequent.body, fdata)) {
          vlog('- bail: consequent branch is bad');
          return false;
        }
        if (!pcanCompileBody(locals, calls, stmt.alternate.body, fdata)) {
          vlog('- bail: alternate branch is bad');
          return false;
        }
        break;
      }
      case 'DebuggerStatement': {
        break;
      }
      case 'ExpressionStatement': {
        const r = pcanCompileExpr(locals, calls, stmt.expression, fdata, stmt);
        if (!r) {
          vlog('- bail: expr is bad');
          return false;
        }
        break;
      }
      case 'EmptyStatement': {
        // Sure
        break;
      }
      case 'WhileStatement': {
        vlog('- bail: no loops yet');
        return false;
      }
      case 'TryStatement': {
        // We should be able to cover this just fine...
        vlog('- bail: no try/catch yet');
        return false;
      }
      default: {
        ASSERT(false, 'missing stmt`', stmt);
      }
    }
  }

  return true;
}
function pcanCompileExpr(locals, calls, expr, fdata, stmt) {
  if (AST.isPrimitive(expr)) return true;
  switch (expr.type) {
    case 'BinaryExpression': {
      // Binary expressions are alright as long as the args are local or prims
      const is = (
        '+/-*'.includes(expr.operator) ||
        pcanCompileExpr(locals, calls, expr.left, fdata, stmt) ||
        pcanCompileExpr(locals, calls, expr.right, fdata, stmt)
      );
      if (!is) {
        vlog('- bail: bin expr is bad');
      }
      return is;
    }
    case 'UnaryExpression': {
      if (expr.operator === 'delete') return false;
      ASSERT('+-~!typeof'.includes(expr.operator));
      return pcanCompileExpr(locals, calls, expr.argument, fdata, stmt);
    }
    case 'CallExpression': {
      //vlog('huh:', expr.callee.type, expr.callee.object?.type, expr.callee.property?.name, expr.callee.object?.name, expr.callee.property?.name)
      if (
        expr.callee.type === 'Identifier' &&
        expr.arguments.every(anode => anode.type !== 'SpreadElement' && pcanCompileExpr(locals, calls, anode, fdata, stmt))
      ) {
        calls.add(expr.callee.name);
        return true; // This is provided the ident is pcode compilable as well. Which we test later.
      }
      else if (
        expr.callee.type === 'MemberExpression' &&
        !expr.callee.computed
      ) {
        if (AST.isPrimitive(expr.callee.object)) {
          // ie. `string.charCodeAt(0)` (lower cased type, to distinguish from a static)
          const method = symbo(AST.getPrimitiveType(expr.callee.object), expr.callee.property.name);
          if (method === symbo('Math', 'random') && expr.arguments.length > 0) {
            // Ignore math.random if it has args. This way the user could control to keep a Math.random :shrug:
            // We may omit this rule later because obfuscators may stuff trash into the args
            vlog('- bail: Math.random with args are assumed to be excluded by the user');
            return false;
          }
          if (
            pcodeSupportedBuiltinFuncs.has(method) &&
            expr.arguments.every(anode => anode.type !== 'SpreadElement' && pcanCompileExpr(locals, calls, anode, fdata, stmt))
          ) {
            // This is a built-in method on a primitive literal
            calls.add(method);
            return true;
          }
          vlog('- bail: callee is a member expression and not a supported primitive method or with spread:', method);
          return false;
        }

        if (expr.callee.object.type === 'Identifier') {
          const symbol = symbo(expr.callee.object.name, expr.callee.property.name);
          if (
            pcodeSupportedBuiltinFuncs.has(symbol) && // ie. '$Math_pow'
            expr.arguments.every(anode => anode.type !== 'SpreadElement' && pcanCompileExpr(locals, calls, anode, fdata, stmt))
          ) {
            // This is a builtin that is a member expression of a static function that we can support
            calls.add(symbol);
            return true;
          }

          const meta = fdata.globallyUniqueNamingRegistry.get(expr.callee.object.name);
          const method = symbo(meta.typing.mustBeType, expr.callee.property.name); // ie. `$string_charCodeAt` (lower cased type)
          if (
            pcodeSupportedBuiltinFuncs.has(method) && // ie `$string_charAt` (note the lowercase class)
            expr.arguments.every(anode => anode.type !== 'SpreadElement' && pcanCompileExpr(locals, calls, anode, fdata, stmt))
          ) {
            // This is a built-in method on a primitive value
            calls.add(symbo(meta.typing.mustBeType, expr.callee.property.name));
            return true;
          }

          vlog('- bail: callee is an ident and not a supported static method and not a supported typed method, or it has spread:', symbol, method);
          return false;
        }

        // ? this/super/etc?
        vlog('- bail: callee is a member expression and we dont know what it is or dont support it yet:', expr.callee.type);
        return false;
      }
      else {
        vlog('- bail: callee is not an ident or args has a spread:', expr.callee.type);
        return false;
      }
    }
    case 'Identifier': {
      // Only allowed to refer to local variables (the callee for ident calls don't reach here)
      const has = locals.has(expr.name);
      if (!has) {
        vlog('- bail: found non-local ident', expr.name);
      }
      return has;
    }
    case 'Param': {
      return true;
    }
    case 'AssignmentExpression': {
      if (expr.left.type !== 'Identifier') return false; // No support for assigns to properties, yet (TODO)
      return pcanCompileExpr(locals, calls, expr.left, fdata, stmt) && pcanCompileExpr(locals, calls, expr.right, fdata, stmt);
    }
    case 'MemberExpression': {
      // Might be true if we completely know the shape of the
      // object, though, and if we can fully and safely recreate it.
      return false;
    }
    case 'FunctionExpression': {
      // Let's not allow this for now
      return false;
    }
    case 'ArrayExpression': {
      return false; // TODO
    }
    case 'ObjectExpression': {
      return false; // TODO
    }
    case 'ThisExpression': {
      return false;
    }
    case 'Literal': {
      // TODO: support regular expressions..?
      return false; // Note: it's not a primitive
    }
    case 'AwaitExpression': {
      // There's probably a way to support this but it's tricky
      return false;
    }
    case 'YieldExpression': {
      // Since we inline this call, not sure how we would do that with yield ... but maybe?
      return false;
    }
    case 'TemplateLiteral': {
      // Templates are fine because all references should be primitives
      // Let's let them normalize to simple expressions though, and in particular no nested templates
      return expr.expressions.every(enode => {
        if (enode.type === 'TemplateLiteral') return false; // Normalize it first
        if (AST.isPrimitive(enode)) return true;
        ASSERT(enode.type === 'Identifier', 'I think all expressions are idents or prims (or nested templates) in normalized code...?', enode);
        return pcanCompileExpr(locals, calls, enode, fdata, stmt)
      });
    }
    case 'NewExpression': {
      // We can probably support some cases of this in the future. Especially for built-ins, but even userland.
      return false;
    }
    case 'ClassExpression': {
      // Too complex right now
      return false;
    }
  }

  ASSERT(false, 'missing expr type', expr, stmt);
}

/**
 * Given a function AST Node, compile a pseudo bytecode for it that
 * `prun` can execute. The node is assumed to be normalized and represent
 * a "pure" function / code.
 *
 * @param {Node} func
 * @returns {Pcode}
 */
export function pcompile(func, fdata) {
  /** @var {Map<string, string>} */
  const regs = new Map;

  return func.body.body.map((node) => {
    return compileStatement(node, regs, fdata);
  }).filter(x => x !== 'debugger').filter(Boolean);
}
function compileStatement(stmt, regs, fdata) {
  switch (stmt.type) {
    case 'ExpressionStatement': {
      if (stmt.expression.type === 'AssignmentExpression') {
        const r = compileExpression(stmt.expression, regs, fdata, stmt, true);
        vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
        vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
        return r;
      }
      const r = ['r', ...compileExpression(stmt.expression, regs, fdata, stmt, true)];
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return r;
    }
    case 'VariableDeclaration': {
      const init = stmt.declarations[0].init;
      if (init.type === 'Identifier' || AST.isPrimitive(init)) {
        const r = [compileReglit(stmt.declarations[0].id, regs)[0], '=', ...compileExpression(stmt.declarations[0].init, regs, fdata, stmt)];
        vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
        vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
        return r;
      }
      const r = [compileReglit(stmt.declarations[0].id, regs)[0], ...compileExpression(stmt.declarations[0].init, regs, fdata, stmt)];
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return r;
    }
    case 'ReturnStatement': {
      const r = ['return', ...compileExpression(stmt.argument, regs, fdata, stmt)];
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return r;
    }
    case 'ThrowStatement': {
      const r = ['throw', ...compileExpression(stmt.argument, regs, fdata, stmt)];
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return r;
    }
    case 'BreakStatement': {
      const r = ['break', stmt.label?.name ?? ''];
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return r;
    }
    case 'LabeledStatement': {
      vgroup(stmt.label.name + ':');
      const r = ['label', stmt.label?.name, stmt.body.body.map(e => compileStatement(e, regs, fdata)).filter(Boolean)];
      vgroupEnd();
      return r;
    }
    case 'IfStatement': {
      vgroup('source:  ', DIM, 'if', tmat(stmt.test, true).replace(/\n/g, '\\n '), RESET);

      const test = compileExpression(stmt.test, regs, stmt);
      vlog('pcode: ', YELLOW, '["if",', JSON.stringify(test).slice(1, -1), ', ..., ...]', RESET);

      vgroup('consequent:');
      const cons = stmt.consequent.body.map(e => {
        vgroup();
        const r = compileStatement(e, regs, fdata);
        vgroupEnd();
        return r;
      }).filter(Boolean);
      vgroupEnd();

      vgroup('alternate:');
      const alt = stmt.alternate.body.map(e => {
        vgroup();
        const r = compileStatement(e, regs, fdata)
        vgroupEnd();
        return r;
      }).filter(Boolean);
      vgroupEnd();

      vgroupEnd();

      return ['if', ...test, cons, alt];
    }
    case 'DebuggerStatement': {
      return undefined;
      //return ['debugger']; // or just undefined?
    }
    case 'EmptyStatement': {
      return undefined;
    }
    default: {
      ASSERT(false, 'only a subset of statemetns are supported and we should have verified that before trying to compile a func:', stmt.type);
    }
  }
}
function compileExpression(exprNode, regs, fdata, stmt, withAssign=false) {
  switch (exprNode.type) {
    case 'BinaryExpression': {
      const a = compileExpression(exprNode.left, regs, fdata, stmt);
      const b = compileExpression(exprNode.right, regs, fdata, stmt);
      const r = [exprNode.operator, ...a , ...b];
      return r;
    }
    case 'UnaryExpression': {
      ASSERT('+-~!typeof'.includes(exprNode.operator), 'unary operator asserted in pcanCompile', exprNode.operator);
      if (exprNode.operator === '-') return ['neg', ...compileExpression(exprNode.argument, regs, fdata, stmt)];
      if (exprNode.operator === '+') return ['pos', ...compileExpression(exprNode.argument, regs, fdata, stmt)];
      return [exprNode.operator, ...compileExpression(exprNode.argument, regs, fdata, stmt)];
    }
    case 'Param': return ['=', '$$' + exprNode.index, ''];
    case 'AssignmentExpression': {
      ASSERT(withAssign, 'normalized code, assign is a statement right? so withAssign should be true still...?');
      const left = compileExpression(exprNode.left, regs, fdata, stmt)[0];
      const right = compileExpression(exprNode.right, regs, fdata, stmt, true);
      return [left, ...right];
    }
    case 'Identifier': {
      const r = compileReglit(exprNode, regs);
      if (withAssign) return['=', ...r];
      return r;
    }
    case 'CallExpression': {
      if (exprNode.callee.type === 'Identifier') {
        ASSERT(exprNode.callee.name, 'and the ident has a name?', exprNode);
        const opcode = ['call', exprNode.callee.name];
        for (let i=0; i<exprNode.arguments.length; ++i) {
          opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt));
        }
        return opcode;
      }
      if (exprNode.callee.type === 'MemberExpression') {
        // Methods are compiled for built-ins. If we do then the first "param" is the context.
        // Since this is always for built-ins, which we must hand-code, we can implicitly follow that contract.
        if (AST.isPrimitive(exprNode.callee.object)) {
          // ie. `string.charCodeAt` (lower cased type)
          // (First "arg" is context)
          const methodName = symbo(AST.getPrimitiveType(exprNode.callee.object), exprNode.callee.property.name);
          const opcode = ['call', methodName, ...compileExpression(exprNode.callee.object, regs, fdata, stmt)];
          for (let i=0; i<exprNode.arguments.length; ++i) {
            opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt));
          }
          return opcode;
        }
        else if (exprNode.callee.object.type === 'Identifier') {
          // ie. 'Math.pow'
          const staticName = symbo(exprNode.callee.object.name, exprNode.callee.property.name);
          if (pcodeSupportedBuiltinFuncs.has(staticName)) { // ie `$Math_pow`
            const opcode = ['call', staticName];
            for (let i=0; i<exprNode.arguments.length; ++i) {
              opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt));
            }
            return opcode;
          }

          const meta = fdata.globallyUniqueNamingRegistry.get(exprNode.callee.object.name);
          // ie. `string.charCodeAt` (lower cased type)
          const methodName = symbo(meta.typing.mustBeType, exprNode.callee.property.name);
          if (pcodeSupportedBuiltinFuncs.has(methodName)) { // ie `$string_charAt` (note the lowercase class)
            // This is a built-in method on an unknown primitive value
            // (First "arg" is context)
            const opcode = ['call', methodName, ...compileExpression(exprNode.callee.object, regs, fdata, stmt)];
            for (let i=0; i<exprNode.arguments.length; ++i) {
              opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt));
            }
            return opcode;
          }

          ASSERT(false, 'should have checked method before compiling it', exprNode.callee, stmt, stmt.declarations?.[0].id.name, stmt.declarations?.[0].init.type, stmt.declarations?.[0].init.callee.type, stmt.declarations?.[0].init.callee.object.name);
        }
      }
      ASSERT(false, 'should have checked that it only calls an ident or member', exprNode.callee.object, stmt);
      break;
    }
    case 'TemplateLiteral': {
      if (!exprNode.expressions.length) {
        // Encode as normal reglit, string value
        if (withAssign) return ['=', '', exprNode.quasis[0].value.cooked];
        return ['', exprNode.quasis[0].value.cooked];
      }

      // Templates are fine because all references should be primitives
      const arr = ['`']; // the tick represents the template
      // .quasis.length should be .expressions.length+1
      for (let i=0; i<exprNode.expressions.length; ++i) {
        if (AST.isPrimitive(exprNode.expressions[i])) {
          arr.push(
            '', exprNode.quasis[i].value.cooked,
            '', AST.getPrimitiveValue(exprNode.expressions[i])
          )
        } else {
          ASSERT(exprNode.expressions[i].type === 'Identifier', 'I think all expressions are idents or prims in normalized code...?', exprNode.expressions[i]);
          arr.push(
            '', exprNode.quasis[i].value.cooked,
            ...compileExpression(exprNode.expressions[i], regs, fdata, stmt)
          );
        }
      }
      // And the tail quasi
      arr.push('', exprNode.quasis[exprNode.quasis.length-1].value.cooked);
      return arr;
    }
    default: {
      if (AST.isPrimitive(exprNode)) {
        if (withAssign) return ['=', '', AST.getPrimitiveValue(exprNode)];
        return ['', AST.getPrimitiveValue(exprNode)];
      }

      ASSERT(false, 'support me?', exprNode, stmt);
    }
  }
  ASSERT(false, 'add me expr', exprNode, stmt);
}
/**
 * Given an ident or primitive node, return a pair of [registerName, ''] or ['', primitiveValue]
 *
 * @param {IdentifierNode | PrimitiveNode} node
 * @param {Set<string>} regs
 * @returns {[string, Primitive]}
 */
function compileReglit(node, regs) {
  if (AST.isPrimitive(node)) {
    return ['', AST.getPrimitiveValue(node)];
  }
  if (node.type === 'Identifier') {
    const r = regs.get(node.name);
    if (r) return [r, ''];
    const s = 'r' + regs.size;
    regs.set(node.name, s);
    return [s, ''];
  }
  ASSERT(false, 'only supporting primitives and identifiers', node);
}

/**
 * Run a pcode compiled function
 *
 * Given some input values, run a pseudo preval compiled function
 * to figure out what the outcome would be of that function call.
 *
 * The function can only be compiled if it is "pure" (no side effects).
 * This means the args are proven to be primitives or not used in an
 * observable manner, and the functions invoked are also safe and/or
 * built-ins that you can't observe when called.
 *
 * The point is to eliminate calls to funcs that can't be inlined
 * otherwise. If their internals are not observable then all we need
 * is the resulting value and replace the call entirely with it.
 *
 * We can't randomly inline pure functions because it'll bloat the code.
 *
 * @param {string} funcName
 * @param {Node} funcNode
 * @param {Array<Primitive>} args
 * @param {Map<name | pid, name, node, pcode?} pcodeData
 * @returns {Primitive}
 */
export function runPcode(funcName, args, pcodeData, fdata, prng, usePrng, depth = 0) {
  if (depth === 0) vlog('runPcode:', funcName, '(', args, ')');
  ++depth;
  const obj = pcodeData.get(funcName);
  ASSERT(obj, 'gotta have compiled this func right?', funcName);
  if (depth > 10) {
    vlog('Max call depth exceeded');
    return SO_MESSAGE;
  }

  let bytecode = obj.bytecode;
  if (!bytecode) {
    vgroup();
    vgroup();
    vgroup();
    vgroup('Bytecode not found for', funcName,'. Compiling now...');
    bytecode = obj.bytecode = pcompile(obj.funcNode, fdata);
    vgroupEnd();
    vlog('Compilation finished for', funcName,'. Running', funcName, 'now...');
    vgroupEnd();
    vgroupEnd();
    vgroupEnd();
  }
  ASSERT(bytecode);

  const registers = {
    $return: undefined,
  };
  for (let i=0; i<args.length; ++i) {
    registers['$$'+i] = args[i];
  }

  // Note: this may throw when thrown explicitly. or ... if it just happens heh.
  const action = prunStmt(registers, bytecode, pcodeData, fdata, prng, usePrng, depth);
  if (action === RETURN) return registers.$return;
  if (action === SO) return SO_MESSAGE;
  else return undefined; // If a side-effect free function returns undefined ... was it even useful? I mean I guess maybe but.
}

function prunStmt(registers, bytecode, pcodeData, fdata, prng, usePrng, depth) {
  //console.log('huh? prunStmt', Boolean(bytecode))
  for (let i=0; i<bytecode.length; ++i) {
    const op = bytecode[i];
    const opcode = op[0];
    switch (opcode) {
      case 'if': {
        // ['if', 'testReg', 'testLit', consequent[], alternate[]]
        //console.log('oh yeah?', [opcode])
        const test = op[1] ? registers[op[1]] : op[2];
        vgroup('if(', test, ')');
        if (test) {
          const action = prunStmt(registers, op[3], pcodeData, fdata, prng, usePrng, depth);
          if (op[3].length === 0) vlog('(empty block)');
          vgroupEnd();
          if (action !== NONE) return action;
        } else {
          const action = prunStmt(registers, op[4], pcodeData, fdata, prng, usePrng, depth);
          if (op[4].length === 0) vlog('(empty block)');
          vgroupEnd();
          if (action !== NONE) return action;
        }
        break;
      }

      case 'return': {
        // ['return', 'reg', 'lit']
        // ['return', 'neg', 'reg', 'lit']
        if (op[1] === 'neg') {
          registers.$return = op[2] ? -registers[op[2]] : -op[3];
          vlog('return', registers.$return);
          return RETURN;
        }
        else if (op[1] === 'pos') {
          registers.$return = op[2] ? +registers[op[2]] : +op[3];
          vlog('return', registers.$return);
          return RETURN;
        }
        registers.$return = op[1] ? registers[op[1]] : op[2];
        vlog('return', registers.$return);
        return RETURN;
      }

      case 'throw': {
        // ['throw', 'reg', 'lit']
        // There's no try/catch so the outer call to run() should trap it.

        if (op[1] === 'neg') { // Extreme edge case but.
          registers.$throw = op[2] ? -registers[op[2]] : -op[3];
          vlog('throw', registers.$return);
          return RETURN;
        }
        else if (op[1] === 'pos') { // Extremer edge case but.
          registers.$throw = op[2] ? +registers[op[2]] : +op[3];
          vlog('throw', registers.$return);
          return RETURN;
        }
        const v = op[1] ? registers[op[1]] : op[2];
        vlog('throw', v);
        throw v;
      }

      case 'break': {
        // ['return', 'label']
        registers.$break = op[1];
        vlog('break', registers.$break);
        return BREAK;
      }

      case 'label': {
        // ['label', 'name']
        vgroup('label', op[2]);
        const action = prunStmt(registers, op[2], pcodeData, fdata, prng, usePrng, depth);
        vgroupEnd();
        if (action === BREAK) {
          if (registers.$break !== op[1]) return BREAK;
        }
        else if (action !== NONE) return action;
        break;
      }

      default: {
        if (opcode.startsWith('r')) {
          // ['r123', '!', 'r213', '']
          // ['r123', '*', 'r213', '', '', 5]
          // ['r123', 'call', 'parseInt', 'r2']
          // ['r123', 'method', 'Math', 'abs', '', -2]
          registers[opcode] = prunExpr(registers, op, pcodeData, fdata, prng, usePrng, depth);
          vlog(opcode, op[1], typeof registers[opcode] === 'string' ? JSON.stringify(registers[opcode]) : registers[opcode]);
          if (registers[opcode] === SO_MESSAGE) return SO;
          break;
        }

        //if (opcode === '=') {
        //  vlog(opcode, '=', registers[opcode]);
        //
        //}

        console.log('wat stmt?', op)
        TODO // what is this?
        break;
      }
    }
  }
  return NONE;
}

/**
 * @returns {Primitive}
 */
function prunExpr(registers, op, pcodeData, fdata, prng, usePrng, depth) {
  // expressions cant return, break, or throw. calls that throw ... um yeah.

  switch (op[1]) {
    case '=': return prunVal(registers, op[2], op[3]);
    case '==': return prunVal(registers, op[2], op[3]) == prunVal(registers, op[4], op[5]);
    case '===': return prunVal(registers, op[2], op[3]) === prunVal(registers, op[4], op[5]);
    case '!=': return prunVal(registers, op[2], op[3]) != prunVal(registers, op[4], op[5]);
    case '!==': return prunVal(registers, op[2], op[3]) !== prunVal(registers, op[4], op[5]);

    case '<': return prunVal(registers, op[2], op[3]) < prunVal(registers, op[4], op[5]);
    case '<=': return prunVal(registers, op[2], op[3]) <= prunVal(registers, op[4], op[5]);
    case '>': return prunVal(registers, op[2], op[3]) > prunVal(registers, op[4], op[5]);
    case '>=': return prunVal(registers, op[2], op[3]) >= prunVal(registers, op[4], op[5]);

    //case '+': return +prunVal(registers, op[2], op[3]);
    //case '-': return -prunVal(registers, op[2], op[3]);
    case '!': return !prunVal(registers, op[2], op[3]);
    case '~': return ~prunVal(registers, op[2], op[3]);
    case 'typeof': return typeof prunVal(registers, op[2], op[3]);
    // unary minus, not to be confused with subtraction
    case 'neg': return -prunVal(registers, op[2], op[3]);
    // unary plus, not to be confused with addition
    case 'pos': return +prunVal(registers, op[2], op[3]);

    case '/': return prunVal(registers, op[2], op[3]) / prunVal(registers, op[4], op[5]);
    case '*': return prunVal(registers, op[2], op[3]) * prunVal(registers, op[4], op[5]);
    case '+': return prunVal(registers, op[2], op[3]) + prunVal(registers, op[4], op[5]);
    case '-': return prunVal(registers, op[2], op[3]) - prunVal(registers, op[4], op[5]);
    case '%': return prunVal(registers, op[2], op[3]) % prunVal(registers, op[4], op[5]);
    case '^': return prunVal(registers, op[2], op[3]) ^ prunVal(registers, op[4], op[5]);
    case '|': return prunVal(registers, op[2], op[3]) | prunVal(registers, op[4], op[5]);
    case '&': return prunVal(registers, op[2], op[3]) & prunVal(registers, op[4], op[5]);
    case '**': return prunVal(registers, op[2], op[3]) ** prunVal(registers, op[4], op[5]);

    case '<<': return prunVal(registers, op[2], op[3]) << prunVal(registers, op[4], op[5]);
    case '>>': return prunVal(registers, op[2], op[3]) >> prunVal(registers, op[4], op[5]);
    case '>>>': return prunVal(registers, op[2], op[3]) >>> prunVal(registers, op[4], op[5]);

    case 'call': {
      // If it throws I guess it actually throws...
      const arr = [];
      for (let i=3; i<op.length; i+=2) {
        arr.push(prunVal(registers, op[i], op[i+1]))
      }
      if (pcodeSupportedBuiltinFuncs.has(op[2])) {
        switch (op[2]) {
          //case 'clearInterval': throw new Error('Do not call `clearInterval`');
          //case 'clearTimeout': throw new Error('Do not call `clearTimeout`');
          case 'parseInt': return parseInt(...arr);
          case 'parseFloat': return parseFloat(...arr);
          case 'setInterval': throw new Error('Do not call `setInterval`');
          case 'setTimeout': throw new Error('Do not call `setTimeout`');
          case 'isNaN': return isNaN(...arr);
          case 'eval': throw new Error('Do not call `eval`');
          case 'isFinite': return isFinite(...arr);
          //case 'Array':
          case 'Boolean': return Boolean(...arr);
          //case 'Date':
          //case 'Error':
          //case 'JSON':
          //case 'Map':
          case 'Number': return Number(...arr);
          //case 'Object':
          //case 'RegExp':
          //case 'Set':
          case 'String': return String(...arr);
          case 'Function': throw new Error('Do not call `Function`');

          case 'encodeURI': return encodeURI(...arr);
          case 'decodeURI': return decodeURI(...arr);
          case 'encodeURIComponent': return encodeURIComponent(...arr);
          case 'decodeURIComponent': return decodeURIComponent(...arr);
          case 'escape': return escape(...arr);
          case 'unescape': return unescape(...arr);
          case 'btoa': return btoa(...arr);
          case 'atob': return atob(...arr);

          case symbo('boolean', 'toString'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'boolean');
            vlog('(', v, '.toString() )');
            return v.toString();
          }
          case symbo('boolean', 'valueOf'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'boolean');
            vlog('(', v, '.valueOf() )');
            return v.valueOf();
          }

          case symbo('Number', 'isFinite'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('(Number.isFinite(', a, '))');
            return Number.isFinite(a);
          }
          case symbo('Number', 'isInteger'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('(Number.isInteger(', a, '))');
            return Number.isInteger(a);
          }
          case symbo('Number', 'isNaN'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('(Number.isNaN(', a, '))');
            return Number.isNaN(a);
          }
          case symbo('Number', 'isSafeInteger'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('(Number.isSafeInteger(', a, '))');
            return Number.isSafeInteger(a);
          }
          case symbo('Number', 'parseFloat'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('(Number.parseFloat(', a, '))');
            return Number.parseFloat(a);
          }
          case symbo('Number', 'parseInt'): {
            const a = prunVal(registers, op[3], op[4]);
            const b = prunVal(registers, op[4], op[5]);
            vlog('(Number.isFinite(', a, ',', b, '))');
            return Number.parseInt(a, b);
          }

          case symbo('number', 'toExponential'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'number');
            const a = prunVal(registers, op[5], op[6])
            vlog('(', v, '.toString(', a, ') )');
            return v.toString(a);
          }
          case symbo('number', 'toFixed'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'number');
            const a = prunVal(registers, op[5], op[6])
            vlog('(', v, '.toFixed(', a, ') )');
            return v.toFixed(a);
          }
          case symbo('number', 'toLocaleString'): {
            ASSERT(false, 'no not this one');
            break;
          }
          case symbo('number', 'toPrecision'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'number');
            const a = prunVal(registers, op[5], op[6])
            vlog('(', v, '.toPrecision(', a, ') )');
            return v.toPrecision(a);
          }
          case symbo('number', 'toString'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'number');
            const a = prunVal(registers, op[5], op[6])
            vlog('(', v, '.toString(', a, ') )');
            return v.toString(a);
          }
          case symbo('number', 'valueOf'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'number');
            vlog('(', v, '.toPrecision(...) )');
            return v.valueOf();
          }

          case symbo('String', 'fromCharCode'): {
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            vlog('(String.fromCharCode(...) )');
            return String.fromCharCode(...args);
          }
          case symbo('String', 'fromCodePoint'): {
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            vlog('(String.fromCodePoint(...) )');
            return String.fromCodePoint(...args);
          }
          case symbo('String', 'raw'): {
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            vlog('(String.raw(...) )');
            return String.raw(...args);
          }

          case symbo('string', 'charAt'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const c = v.charAt(a);
            vlog('(', v, '.charAt(', a, ') ) =', c);
            return c;
          }
          case symbo('string', 'charCodeAt'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const c = v.charCodeAt(a);
            vlog('(', v, '.charCodeAt(', a, ') ) =', c);
            return c;
          }
          case symbo('string', 'concat'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            const c = v.concat(...args);
            vlog('(', v, '.concat(', ...args, ') ) =', c);
            return c;
          }
          case symbo('string', 'includes'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const c = v.includes(a);
            vlog('(', v, '.includes(', a, ') ) =', c);
            return c;
          }
          case symbo('string', 'indexOf'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const c = v.charAt(a);
            vlog('(', v, '.indexOf(', a, ') ) =', c);
            return c;
          }
          case symbo('string', 'lastIndexOf'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const c = v.lastIndexOf(a);
            vlog('(', v, '.lastIndexOf(', a, ') ) =', c);
            return c;
          }
          case symbo('string', 'match'): { ASSERT(false, 'TODO') }
          case symbo('string', 'replace'): { ASSERT(false, 'TODO') }
          case symbo('string', 'slice'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const b = prunVal(registers, op[7], op[8])
            const c = v.slice(a, b);
            vlog('(', v, '.slice(', a, ',', b, ') ) =', c);
            return c;
          }
          case symbo('string', 'split'): { ASSERT(false, 'TODO') }
          case symbo('string', 'substring'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const b = prunVal(registers, op[7], op[8])
            const c = v.substring(a, b);
            vlog('(', v, '.substring(', a, ',', b, ') ) =', c);
            return c;
          }
          case symbo('string', 'substr'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const a = prunVal(registers, op[5], op[6])
            const b = prunVal(registers, op[7], op[8])
            const c = v.substr(a, b);
            vlog('(', v, '.substr(', a, ',', b, ') ) =', c);
            return c;
          }
          case symbo('string', 'toString'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const c = v.toString();
            vlog('(', v, '.toString() ) =', c);
            return c;
          }
          case symbo('string', 'toLowerCase'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const c = v.toLowerCase();
            vlog('(', v, '.toLowerCase() ) =', c);
            return c;
          }
          case symbo('string', 'toUpperCase'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const c = v.toUpperCase();
            vlog('(', v, '.toUpperCase() ) =', c);
            return c;
          }
          case symbo('string', 'valueOf'): {
            const v = prunVal(registers, op[3], op[4]);
            ASSERT(typeof v === 'string');
            const c = v.valueOf();
            vlog('(', v, '.valueOf() ) =', c);
            return c;
          }

          // Note: some of the math props are questionable due to risk of rounding errors and lossy serialization of complex floats
          case symbo('Math', 'abs'):  {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.abs(a);
            vlog('( Math.abs(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'acos'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.acos(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.acos(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'acosh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.acosh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.acosh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'asin'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.asin(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.asin(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'asinh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.asinh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.asinh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'atan'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.atan(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.atan(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'atan2'): {
            const a = prunVal(registers, op[3], op[4]);
            const b = prunVal(registers, op[5], op[6]);
            const c = Math.atan2(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.atan2(', a, ', ', b, ') ) =', c);
            return c;
          }
          case symbo('Math', 'atanh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.atanh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.atanh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'cbrt'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.cbrt(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.cbrt(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'ceil'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.ceil(a);
            vlog('( Math.ceil(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'clz32'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.clz32(a);
            vlog('( Math.clz32(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'cos'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.cos(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.cos(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'cosh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.cosh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.cosh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'exp'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.exp(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.exp(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'expm1'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.expm1(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.expm1(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'f16round'): {
            const v = prunVal(registers, op[3], op[4]);
            const c = Math.f16round(v);
            vlog('(Math.f16round(', v, ') ) =', c);
            return c;
          }
          case symbo('Math', 'floor'): {
            const v = prunVal(registers, op[3], op[4]);
            const c = Math.floor(v);
            vlog('(Math.floor(', v, ') ) =', c);
            return c;
          }
          case symbo('Math', 'fround'): {
            const v = prunVal(registers, op[3], op[4]);
            const c = Math.fround(v);
            vlog('(Math.fround(', v, ') ) =', c);
            return c;
          }
          case symbo('Math', 'hypot'): {
            const a = prunVal(registers, op[3], op[4]);
            vlog('( Math.hypot(', a, ') )');
            return Math.hypot(a); // TODO: this is dangerous with rounding errors and serialization precision loss
          }
          case symbo('Math', 'imul'): {
            const a = prunVal(registers, op[3], op[4]);
            const b = prunVal(registers, op[3], op[4]);
            const c = Math.imul(a);
            vlog('(Math.imul(', a, ', ', b, ') ) =', c);
            return c;
          }
          case symbo('Math', 'log'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.log(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.log(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'log10'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.log10(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.log10(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'log1p'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.log1p(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.log1p(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'log2'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.log2(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.log2(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'max'): {
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            const c = Math.max(...args);
            vlog('( Math.max(', args.join(', '), ') ) =', c);
            return c;
          }
          case symbo('Math', 'min'): {
            const args = [];
            for (let i=3; i<op.length; i+=2) {
              args.push(prunVal(registers, op[i], op[i+1]))
            }
            const c = Math.min(...args);
            vlog('( Math.min(', args.join(', '), ') ) =', c);
            return c;
          }
          case symbo('Math', 'pow'): {
            const a = prunVal(registers, op[3], op[4]);
            const b = prunVal(registers, op[3], op[4]);
            const c = Math.pow(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('(Math.pow(', a, ', ', b, ') ) =', c);
            return c;
          }
          // we can fake this with a prng, fails if the prngSeed is zero
          case symbo('Math', 'random'): {
            if (!usePrng) throw new Error('Tried to invoke pcode function that contained Math.random but the prngSeed is zero');
            // Ignore if there are args. This way the user could control to keep a Math.random :shrug:
            ASSERT(arr.length === 0, 'can compile should have checked this');
            return prng();
          }
          case symbo('Math', 'round'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.round(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.round(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'sign'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.sign(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.sign(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'sin'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.sin(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.sin(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'sinh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.sinh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.sinh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'sqrt'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.sqrt(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.sqrt(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'tan'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.tan(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.tan(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'tanh'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.tanh(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.tanh(', a, ') ) =', c);
            return c;
          }
          case symbo('Math', 'trunc'): {
            const a = prunVal(registers, op[3], op[4]);
            const c = Math.trunc(a); // TODO: this is dangerous with rounding errors and serialization precision loss
            vlog('( Math.trunc(', a, ') ) =', c);
            return c;
          }

          case SYMBOL_COERCE: {
            // see reduce_static/coerced.mjs
            const v = prunVal(registers, op[3], op[4]);
            const target = prunVal(registers, op[5], op[6]); // number, string, plustr

            if (target === 'number') return Number(v);
            if (target === 'string') return String(v);
            if (target === 'plustr') return '' + v;
            ASSERT(false, '$coerce target should be fixed and controlled by us', [v, target]);
            break;
          }
          default: ASSERT(false, 'Missing impl for builtin which was marked in pcodeSupportedBuiltins?: func', op[2]);
        }
      }
      const obj = pcodeData.get(op[2]);
      ASSERT(obj, 'pcode should not compile func calls when that func cannot compile to pcode', [op[2], op]);
      vgroup(op[2], '(', ...arr, ')');
      const r = runPcode(op[2], arr, pcodeData, depth, fdata, prng, usePrng);
      vgroupEnd();
      return r;
    }

    case '`': {
      // Should be followed by one or more reflit pairs which should be combined into a string
      let arr = [];
      for (let i=2; i<op.length; i+=2) {
        arr.push(prunVal(registers, op[i], op[i+1]));
      }
      return arr.flat().join('');
    }

    default: {
      if (op[1].startsWith('$$')) {
        return registers[op[0]];
      }

      console.log('wat expr?', op, [op[1]])
      TODO // what is this?
      break;
    }
  }
}

/**
 * @returns {Primitive}
 */
function prunVal(registers, r1, l1) {
  const v = r1 ? registers[r1] : l1;
  vlog('  -', typeof v === 'string' ? JSON.stringify(v) : v);
  return v;
}

export function serializePcode(pcode, ind, regs) {
  return JSON.stringify(pcode, undefined, 2)
  // As long as the tests don't use comma's in strings, we should be fine (:
  .replace(/([a-z0-9"]),\n.*?([0-9a-z"])/g, '$1, $2')
  .replace(/\[\n.*?([0-9a-z"])/g, '[ $1')
  .replace(/([a-z0-9"])\n.*?]/g, '$1 ]')
}

function serializeBytecode(bc) {
  // stringify will convert undefined literal values to null and we don't want that.
  const j = JSON.stringify(bc, (key, value) => {
    if (value === undefined) return '_____UNDEFINED_____';
    if (typeof value === 'object' && value) return value;
    if (Number.isNaN(value)) return '_____NAN_____';
    if (typeof value !== 'number') return value;
    if (!Number.isFinite(value)) return '_____INFINITY_____';
    return value;
  });
  return j
  .replace(/_____UNDEFINED_____/g, 'undefined')
  .replace(/_____INFINITY_____/g, 'Infinity')
  .replace(/_____NAN_____/g, 'NaN')
}

export function printPcode(pcode, ind=0) {
  let sp = ' '.repeat(ind);
  return pcode.map(arr => {
    if (arr[0] === 'if') {
      return sp + '[ if '+(arr[1] || '-')+' '+(arr[1]?'-':typeof arr[2] === 'string' ? JSON.stringify(arr[2]) : arr[2])+'\n' +
        sp + '  [\n' +
        printPcode(arr[3], ind + 4) + '\n' +
        sp + '  ] [\n' +
        printPcode(arr[4], ind + 4) + '\n' +
        sp + '  ]\n' + sp + ']';
    }
    else if (arr[0] === 'label') {
      return sp + '[ label ' + arr[1] + ' \n' + printPcode(arr[2], ind + 2) + '\n]';
    }
    else if (arr[0] === 'return') {
      return sp + '[ return ' + printReglit(arr[1], arr[2]) + ' ]';
    }
    else {
      const x = [sp + '[ ' + arr[0] + ' ' + arr[1]];
      for (let i=2; i<arr.length; i+=2) {
        x.push(' '+printReglit(arr[i], arr[i+1]));
      }
      return x.join('') + ' ]';
    }
  }).join('\n');
}
export function printReglit(reg, lit) {
  return (reg || '-')+' '+(reg?'-':typeof lit === 'string' ? JSON.stringify(lit) : lit);
}
