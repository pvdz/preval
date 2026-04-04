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

import { ASSERT, log, group, groupEnd, vlog, vgroup, vgroupEnd, rule, example, before, source, after, tmat, todo, vgroupDepth, } from './utils.mjs';
import * as AST from './ast.mjs';
import { VERBOSE_TRACING, setVerboseTracing, YELLOW, ORANGE_DIM, PURPLE, RESET, DIM, ORANGE, PRIMITIVE_TYPE_NAMES_PREVAL, PRIMITIVE_TYPE_NAMES_TYPEOF, } from './constants.mjs';
import { SYMBOL_COERCE, SYMBOL_DOTCALL, SYMBOL_FREE, SYMBOL_FRFR, SYMBOL_PCOMPILED } from './symbols_preval.mjs';
import { BUILTIN_SYMBOLS, symbo } from './symbols_builtins.mjs';

const NONE = 0;
const RETURN = 1;
const BREAK = 2;
const SO = 3; // "stack overflow" (or, max call depth exceeded, or infinite loop)
export const SO_MESSAGE = '<max pcode call depth exceeded>'; // actually, we should not change the code, maybe add this message or something as a marker, but that's it
const MAX_OP_CODE_LIMIT = 1_000_000; // once a single prun executes this many statements, consider it an infinite loop or whatever and bail

/** @var {Set<string>} we need the func node because a let binding can have multiple funcs assigned to it. true means its a built-in we support */
export const pcodeSupportedBuiltinFuncs = new Set([
  // This will fail a lot of tests...
  // '$', // Testing framework console.log. Keep in mind the compiled code will not emit these because the func is supposed to be side effect free. But it's helpful for debugging to allow it.

  // global builtins (only include those that return a primitive we can transform into)
  //'clearInterval', // has side-effect. returns an object in nodejs
  //'clearTimeout', // has side-effect. returns an object in nodejs
  //'setInterval', // (obviously) has side-effect
  //'setTimeout', // (obviously) has side-effect
  //'eval', // dangerous
  //'Array', // returns object
  symbo('boolean', 'constructor'),
  //'Date', // returns object
  //'Error', // returns object
  //'JSON', // Cant call this
  //'Math', // Cant call this
  //'Map', // returns object
  symbo('number', 'constructor'),
  //'Object', // returns object
  //'RegExp', // returns object
  //'Set', // returns object
  symbo('string', 'constructor'),
  //'Function', // returns object

  // NodeJS / Browser
  symbo('Global', 'encodeURI'),
  symbo('Global', 'decodeURI'),
  symbo('Global', 'encodeURIComponent'),
  symbo('Global', 'decodeURIComponent'),
  symbo('Global', 'escape'),
  symbo('Global', 'unescape'),
  symbo('Global', 'escape'),
  symbo('Global', 'unescape'),
  'btoa',
  'atob',

  symbo('boolean', 'constructor'),
  symbo('boolean', 'toString'),
  symbo('boolean', 'valueOf'),

  symbo('Global', 'isFinite'),
  symbo('Number', 'isFinite'),
  symbo('Number', 'isInteger'),
  symbo('Global', 'isNaN'),
  symbo('Number', 'isNaN'),
  symbo('Number', 'isSafeInteger'),
  symbo('Number', 'parseFloat'),
  symbo('Global', 'parseFloat'),
  symbo('Number', 'parseInt'),
  symbo('Global', 'parseInt'),

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
  // symbo('string', 'match'), // TODO: regex and callbacks make this awkward?
  // symbo('string', 'replace'), // TODO: regex case makes this awkward?
  symbo('string', 'slice'),
  // symbo('string', 'split'),
  symbo('string', 'substring'),
  symbo('string', 'substr'),
  symbo('string', 'toString'),
  symbo('string', 'toLowerCase'),
  symbo('string', 'toUpperCase'),
  symbo('string', 'valueOf'),

  // Note: some of the math props are questionable due to rounding errors and lossy serialization of complex floats
  // Note: some of the math props are questionable due to rounding errors and lossy serialization of complex floats
  symbo('Math', 'E'),
  symbo('Math', 'LN10'),
  symbo('Math', 'LN2'),
  symbo('Math', 'LOG10E'),
  symbo('Math', 'LOG2E'),
  symbo('Math', 'PI'),
  symbo('Math', 'SQRT1_2'),
  symbo('Math', 'SQRT2'),
  symbo('Math', 'abs'),
  //symbo('Math', 'acos'),
  //symbo('Math', 'acosh'),
  //symbo('Math', 'asin'),
  //symbo('Math', 'asinh'),
  //symbo('Math', 'atan'),
  //symbo('Math', 'atan2'),
  //symbo('Math', 'atanh'),
  //symbo('Math', 'cbrt'),
  symbo('Math', 'ceil'),
  symbo('Math', 'clz32'),
  //symbo('Math', 'cos'),
  //symbo('Math', 'cosh'),
  //symbo('Math', 'exp'),
  //symbo('Math', 'expm1'),
  symbo('Math', 'f16round'),
  symbo('Math', 'floor'), // Static built-in
  symbo('Math', 'fround'),
  //symbo('Math', 'hypot'),
  symbo('Math', 'imul'),
  //symbo('Math', 'log'),
  //symbo('Math', 'log10'),
  //symbo('Math', 'log1p'),
  //symbo('Math', 'log2'),
  symbo('Math', 'max'),
  symbo('Math', 'min'),
  //symbo('Math', 'pow'),
  symbo('Math', 'random'), // we can fake this with a prng, fails if the prngSeed is zero
  symbo('Math', 'round'),
  symbo('Math', 'sign'),
  //symbo('Math', 'sin'),
  //symbo('Math', 'sinh'),
  //symbo('Math', 'sqrt'),
  //symbo('Math', 'tan'),
  //symbo('Math', 'tanh'),
  symbo('Math', 'trunc'),

  // Legacy HTML-related String.prototype methods
  symbo('string', 'anchor'),
  symbo('string', 'big'),
  symbo('string', 'blink'),
  symbo('string', 'bold'),
  symbo('string', 'fixed'),
  symbo('string', 'fontcolor'),
  symbo('string', 'fontsize'),
  symbo('string', 'italics'),
  symbo('string', 'link'),
  symbo('string', 'small'),
  symbo('string', 'strike'),
  symbo('string', 'sub'),
  symbo('string', 'sup'),

  SYMBOL_COERCE, // Preval special func
  //SYMBOL_DOTCALL, // handled explicitly below
]);

export function runFreeWithPcode(funcNode, argNodes, fdata, freeFuncName, $prng, usePrng, pcodeOutput = new Map) {
  vgroup('runFreeWithPcode; cached funcs:', Array.from(pcodeOutput.keys()).filter(x => typeof x === 'string').join(', ') || '<none>');

  source(funcNode, true);
  const callsWhenCompiled = pcanCompile(funcNode, fdata, freeFuncName);
  vlog('Can pcode body? name=', freeFuncName, ', can=', !!callsWhenCompiled, ', verdict:', callsWhenCompiled ? 'Proceeding with compile and run...' : 'Not compiling or running...');
  if (!callsWhenCompiled) {
    vlog('-- failed to pcanCompile, cannot run', freeFuncName);
    vgroupEnd();
    return null;
  }

  fdata.pcodeOutput = pcodeOutput;
  if (pcodeOutput.has(funcNode.$p.npid)) {
    vlog('Skipping compilation: already found in pcodeOutput cache');
  } else {
    vgroup('Compiling into pcode:');
    const pcode = pcompile(funcNode, fdata);
    vgroupEnd();

    pcodeOutput.set(funcNode.$p.npid, { pcode, funcNode, name: freeFuncName, bytecode: pcode });
    pcodeOutput.set(freeFuncName, { pcode, funcNode, name: freeFuncName, bytecode: pcode });
    vlog('Compiled pcode:', pcode);
  }

  vlog('Getting primitives from args:', argNodes, argNodes);
  const args = argNodes.map(anode => AST.getPrimitiveValue(anode));
  vlog('Now running pcode with args:', args);
  const out = runPcode(freeFuncName, args, fdata.pcodeOutput, fdata, $prng, usePrng, 0);
  vlog('Outcome:', out);

  vgroupEnd();
  return AST.primitive(out);
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
export function pcanCompile(funcNode, fdata, funcName) {
  ASSERT(pcanCompile.length === arguments.length, 'arg count');
  ASSERT(funcNode.type === 'FunctionExpression', 'must be func node', funcNode);
  ASSERT(typeof funcName === 'string', 'func name is string', funcName);

  // TODO: this should work but it doesn't. some tests will break with it.
  // if (funcNode.id?.name === SYMBOL_FREE) {
  //   vlog('- function is $free, accepting it without further checks');
  //   return [];
  // }
  //
  // if (funcNode.id?.name === SYMBOL_PCOMPILED) {
  //   vlog('- function is $pcompiled, accepting it without further checks');
  //   return [];
  // }

  if (pcodeSupportedBuiltinFuncs.has(funcName)) {
    vlog('- function is a supported builtin');
    return [];
  }

  if (BUILTIN_SYMBOLS.has(funcName)) {
    todo(`- bail: built in symbol not yet supported by pcode; ${funcName}`);
    return false;
  }

  vlog('pcanCompile(', funcName, ')');

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

  const calls = new Map; // Track which idents are called and what functions they represent, if we know. We must verify them separately.
  vlog('Starting at', [funcName]);
  const locals = new Map([[funcName, 'r0']]);
  if (pcanCompileBody(locals, calls, funcNode.body.body, fdata)) {
    vlog('- pcode can compile body:');
    vlog('  - the func calls:', calls);
    vlog('  - the local regs:', locals);
    if (!funcNode.id) funcNode.id = AST.identifier(SYMBOL_PCOMPILED);
    return calls;
  }
  if (funcNode.id?.name === SYMBOL_PCOMPILED) todo('function was marked as $pcompiled but the validator rejected it');
  vlog('- fail:', calls, locals);
  return false;
}
function pcanCompileBody(locals, calls, body, fdata) {
  ASSERT(pcanCompileBody.length === arguments.length, 'arg count');
  ASSERT(Array.isArray(body), 'body is body array', body);

  vlog('pcanCompileBody()', body.length);
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
      case 'VarStatement': {
        vlog('- recording', [stmt.id.name], 'as local', 'r' + locals.size);
        locals.set(stmt.id.name, 'r' + locals.size);
        if (!pcanCompileExpr(locals, calls, stmt.init, fdata, stmt, stmt.kind === 'const' ? stmt.id.name : undefined)) {
          vlog('- bail: var init is bad;', stmt.init.type);
          return false;
        }
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
        vgroup('- if:');
        vgroup('- test:');
        if (!pcanCompileExpr(locals, calls, stmt.test, fdata, stmt)) {
          vlog('- bail: if test is bad');
          vgroupEnd();
          vgroupEnd();
          return false;
        }
        vgroupEnd();
        vgroup('- then:');
        if (!pcanCompileBody(locals, calls, stmt.consequent.body, fdata)) {
          vlog('- bail: consequent branch is bad');
          vgroupEnd();
          vgroupEnd();
          return false;
        }
        vgroupEnd();
        vgroup('- else:');
        if (!pcanCompileBody(locals, calls, stmt.alternate.body, fdata)) {
          vlog('- bail: alternate branch is bad');
          vgroupEnd();
          vgroupEnd();
          return false;
        }
        vgroupEnd();
        vgroupEnd();
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
        vgroup();
        vgroup();
        const r = pcanCompileBody(locals, calls, stmt.body.body, fdata);
        vgroupEnd();
        vgroupEnd();
        return r;
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
function pcanCompileExpr(locals, calls, expr, fdata, stmt, constDeclNameMaybe) {
  if (AST.isPrimitive(expr)) return true;
  switch (expr.type) {
    case 'BinaryExpression': {
      vlog('- bin', expr.operator, expr.left.name, expr.right.name);
      // Binary expressions are alright for most ops, as long as the args are local or prims
      const okOp = '+/-**!===&|^%<<=>>>='.includes(expr.operator);
      const okLeft = okOp && pcanCompileExpr(locals, calls, expr.left, fdata, stmt);
      const okRight = okLeft && pcanCompileExpr(locals, calls, expr.right, fdata, stmt);
      const isOk = okOp && okLeft && okRight;
      vlog('isOk?', isOk, '; only first fail is relevant (lazy eval):', okOp, '(op =', [expr.operator], ')', okLeft, okRight);
      if (!isOk) {
        vlog('- bail: bin expr is bad', okOp, okLeft, okRight);
      }
      return isOk;
    }
    case 'UnaryExpression': {
      if (expr.operator === 'delete') return false;
      ASSERT('+-~!typeof'.includes(expr.operator));
      return pcanCompileExpr(locals, calls, expr.argument, fdata, stmt);
    }
    case 'CallExpression': {
      ASSERT(expr.callee.type === 'Identifier', 'anything else should be normalized away, right?', expr);
      let calleeName = expr.callee.name;
      let contextNode = undefined;
      let args = expr.arguments;

      if (calleeName === SYMBOL_DOTCALL) {
        calleeName = args[0].name;
        contextNode = args[1];
        args = args.slice(3);
      }

      if (contextNode && !pcanCompileExpr(locals, calls, contextNode, fdata, stmt)) {
        vlog('- bail: the context node could not be compiled', contextNode);
        return false;
      }

      if (!args.every(anode => anode.type !== 'SpreadElement' && pcanCompileExpr(locals, calls, anode, fdata, stmt))) {
        vlog('- bail: at least one arg was a spread or not compileable');
        return false;
      }

      if (calleeName === symbo('Math', 'random') && args.length > 0) {
        // Ignore math.random if it has args. This way the user could control to keep a Math.random :shrug:
        // We may omit this rule later because obfuscators may stuff trash into the args
        vlog('- bail: Math.random with args are assumed to be excluded by the user');
        return false;
      }

      if (pcodeSupportedBuiltinFuncs.has(calleeName)) {
        // This is a built-in method on a primitive literal
        calls.set(calleeName, calleeName);
        return true;
      }

      // If we know it and call it then ... it's probably ok? maybe?
      if (locals.has(calleeName)) {
        calls.set(calleeName, calleeName);
        return true;
      }

      // ? this/super/etc?
      vlog('- bail: pcode callee is not something we can fully infer or support:', expr.callee.type, calleeName);
      return false;
    }
    case 'Identifier': {
      // Only allowed to refer to local variables (the callee for ident calls don't reach here)
      //vlog('Checking whether', locals, 'has', [expr.name])
      const has = locals.has(expr.name);
      vlog('canexpr ident', [expr.name], has);
      if (has) return true;

      // Note: call expr should check for regular callee, frfr, and dotcall. dont risk funcs being an init or assign rhs.

      // This would only be okay as being called or dotcalled. Pcode doesnt know how to deal with moving around function values (yet).
      // However, we should try to make this work because `const func = num.toString; $dotcall(func, ...` should resolve fine.
      // if (pcodeSupportedBuiltinFuncs.has(expr.name)) {
      //   return true;
      // }
      // // TODO: update this:
      // if (expr.name === 'Math') {
      //   vlog('  - accepting Math, temp, until we move these globals to a symbol as well.');
      //   return true;
      // }
      // const meta = fdata.globallyUniqueNamingRegistry.get(expr.name);
      // risky due to assignments. instead, builtin symbols should propagate and replace idents, or be allow-listed by cancompile call expr
      // if (pcodeSupportedBuiltinFuncs.has(expr.name)) {
      //   vlog('  - accepting allow-listed builtin');
      //   return true;
      // }
      // if (meta?.varDeclRef?.node?.id?.name === '$free') {
      //   vlog(' - a $free function must be ok');
      //   return true;
      // }
      vlog('  - bail: found non-local identy', expr.name);
      return false;
    }
    case 'Param': {
      return true;
    }
    case 'AssignmentExpression': {
      if (expr.left.type !== 'Identifier') {
        todo('- bail: No support for assigns to properties, yet');
        return false;
      }
      return pcanCompileExpr(locals, calls, expr.left, fdata, stmt) && pcanCompileExpr(locals, calls, expr.right, fdata, stmt);
    }
    case 'MemberExpression': {
      // Might be true if we completely know the shape of the
      // object, though, and if we can fully and safely recreate it.
      vlog('- member expression: not sure yet; working on it');

      if (expr.computed) {
        vlog('- bail: computed access');
        return false;
      }

      // So basically it seems this would be necessary to support method calls. But if we can't
      // resolve those methods then we don't know what to call anyways. And if we can resolve
      // those methods, then this property access should be eliminated in favor of that.
      // So either way, we should still ignore property reads at least for the sake of func calls.

      //// If this is assigned to a const then we can maybe map that const to a builtin? Arguably other parts
      //// of preval ought to do this and then revisit whatever triggers this, but ...
      //if (constDeclNameMaybe) {
      //  // If we can prove that the prop read will yield a builtin method then maybe we can do it that way
      //  if (AST.isPrimitive(expr.object)) {
      //    const symbol = symbo(AST.getPrimitiveType(expr.object), expr.property.name);
      //    vlog('- Reading', [symbol], 'on a primitive node');
      //    if (pcodeSupportedBuiltinFuncs.has(symbol)) {
      //      if (constDeclNameMaybe) {
      //        // Mark this id as being this function
      //
      //      }
      //      // This will be fun eh
      //      return true;
      //    }
      //  }
      //  else if (expr.object.type === 'Identifier') {
      //    if (!locals.has(expr.object.name)) {
      //      vlog('- bail: member object is not a local;', expr.object.type, expr.object.name);
      //      return false;
      //    }
      //
      //    const meta = fdata.globallyUniqueNamingRegistry.get(expr.object.name);
      //    if (PRIMITIVE_TYPE_NAMES_TYPEOF.has(meta.typing.mustBeType)) {
      //      const symbol = symbo(meta.typing.mustBeType, expr.property.name);
      //      vlog('- Reading', [symbol], 'on an ident that mustBe a primitive');
      //      if (pcodeSupportedBuiltinFuncs.has(symbol)) {
      //        // This will be fun eh
      //        calls.set(constDeclNameMaybe, symbol);
      //        return true;
      //      }
      //    }
      //  }
      //  else {
      //    todo(`what is this a member of? ${expr.object.type}`);
      //    vlog('Unable to verify member expression object');
      //    return false;
      //  }
      //}

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
        if (enode.type === 'TemplateLiteral') {
          // Normalize it first. If this trips, figure out why there's a nested template literal in normalized code. That's probably a bug.
          vlog('- bail: normalize template first');
          return false;
        }
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
    case 'SuperCall': {
      return false;
    }
    case 'SuperMethodCall': {
      return false;
    }
    case 'SuperProp': {
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
  // This is the result "assembly" code or pcode. We'll pass this around by reference to
  // be able to compile multiple ops if need be (for example for unary minus operator).
  const asm = [];

  func.body.body.forEach(node => compileStatement(node, regs, fdata, asm))

  return asm;
}
function compileStatement(stmt, regs, fdata, asm) {
  vgroup('-', stmt.type, ...stmt.type === 'VarStatement' ? [[stmt.id.name]] : []);
  const r = _compileStatement(stmt, regs, fdata, asm);
  vgroupEnd();
  return r;
}
function _compileStatement(stmt, regs, fdata, asm) {
  switch (stmt.type) {
    case 'ExpressionStatement': {
      if (stmt.expression.type === 'AssignmentExpression') {
        const r = compileExpression(stmt.expression, regs, fdata, stmt, true, asm);
        vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
        vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
        asm.push(r);
        return;
      }
      const r = ['r', ...compileExpression(stmt.expression, regs, fdata, stmt, true, asm)];
      asm.push(r);
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return;
    }
    case 'VarStatement': {
      const init = stmt.init;
      if (init.type === 'Identifier' || AST.isPrimitive(init)) {
        const r = [compileReglit(stmt.id, regs)[0], '=', ...compileExpression(stmt.init, regs, fdata, stmt, false, asm)];
        asm.push(r);
        vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
        vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
        return;
      }
      const r = [compileReglit(stmt.id, regs)[0], ...compileExpression(stmt.init, regs, fdata, stmt, false, asm)];
      asm.push(r);
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return;
    }
    case 'ReturnStatement': {
      const r = ['return', ...compileExpression(stmt.argument, regs, fdata, stmt, false, asm)];
      asm.push(r);
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return;
    }
    case 'ThrowStatement': {
      const r = ['throw', ...compileExpression(stmt.argument, regs, fdata, stmt, false, asm)];
      asm.push(r);
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return;
    }
    case 'BreakStatement': {
      const r = ['break', stmt.label?.name ?? ''];
      asm.push(r);
      vlog('source:  ', DIM, tmat(stmt, true).replace(/\n/g, '\\n '), RESET);
      vlog('pcode:   ', YELLOW, serializeBytecode(r), RESET);
      return;
    }
    case 'LabeledStatement': {
      vgroup(stmt.label.name + ':');
      const a = [];
      const r = ['label', stmt.label?.name, a];
      stmt.body.body.forEach(e => compileStatement(e, regs, fdata, a));
      asm.push(r);
      vgroupEnd();
      return;
    }
    case 'IfStatement': {
      vgroup('source:  ', DIM, 'if', tmat(stmt.test, true).replace(/\n/g, '\\n '), RESET);

      const test = compileExpression(stmt.test, regs, fdata, stmt, false, asm);
      const cons = [];
      const alt = [];
      vlog('pcode: ', YELLOW, '["if",', JSON.stringify(test).slice(1, -1), ', ..., ...]', RESET);

      vgroup('consequent:');
      stmt.consequent.body.forEach(e => {
        vgroup();
        compileStatement(e, regs, fdata, cons);
        vgroupEnd();
      });
      vgroupEnd();

      vgroup('alternate:');
      stmt.alternate.body.forEach(e => {
        vgroup();
        compileStatement(e, regs, fdata, alt)
        vgroupEnd();
      });
      vgroupEnd();

      vgroupEnd();

      asm.push(['if', ...test, cons, alt]);
      return;
    }
    case 'WhileStatement': {
      vgroup('source:  ', DIM, 'while(true)', RESET);
      vgroup();
      const body = [];
      stmt.body.body.forEach(e => {
        vgroup();
        compileStatement(e, regs, fdata, body);
        vgroupEnd();
      })
      vgroupEnd();
      vgroupEnd();
      asm.push(['while', body]);
      return;
    }
    case 'DebuggerStatement': {
      return;
    }
    case 'EmptyStatement': {
      return;
    }
    default: {
      ASSERT(false, 'only a subset of statemetns are supported and we should have verified that before trying to compile a func:', stmt.type);
    }
  }
}
function compileExpression(exprNode, regs, fdata, stmt, withAssign, asm) {
  switch (exprNode.type) {
    case 'BinaryExpression': {
      const a = compileExpression(exprNode.left, regs, fdata, stmt, false, asm);
      const b = compileExpression(exprNode.right, regs, fdata, stmt, false, asm);
      const r = [exprNode.operator, ...a , ...b];
      return r;
    }
    case 'UnaryExpression': {
      ASSERT('+-~!typeof'.includes(exprNode.operator), 'unary operator asserted in pcanCompile', exprNode.operator);
      // We kind of assume that negative literals are the only case where a unary expression may appear
      // as child of another expression. Don't hate me, future self.
      // Any other unary op is first assigned to a variable in normalized code.
      if (exprNode.operator === '-') {
        vlog('- compiling negative unary');
        if (AST.isNumberLiteral(exprNode.argument)) {
          // We basically do the double negation here. -(-n) -> n
          // We compile a special op into a fresh register and then compile the register into this op
          // `f(-1)` -> `[['r1', '=', 'neg', 1], ['r2', '=', 'call', 'f', undefined, 'r1', undefined]]

          const newNode = AST.primitive(-AST.getPrimitiveValue(exprNode));
          const areg = compileReglit(true, regs);
          const anonRegister = areg[0];
          const anonOp = [anonRegister, 'neg', ...compileExpression(newNode, regs, fdata, stmt, false, asm)]
          asm.push(anonOp);

          vlog('source:  ', DIM, tmat(exprNode, true).replace(/\n/g, '\\n '), RESET);
          vlog('pcode:   ', YELLOW, serializeBytecode(anonOp), RESET);

          // Now return the compiled register as value (`[r1, undefined]`)
          return withAssign ? ['=', ...areg] : areg;
        }

        // Not a literal
        // const areg = compileReglit(true, regs);
        // const anonRegister = areg[0];
        // const anonOp = [anonRegister, 'neg', ...compileExpression(exprNode.argument, regs, fdata, stmt, false, asm)]
        // asm.push(anonOp);
        //
        // vlog('source:  ', DIM, tmat(exprNode, true).replace(/\n/g, '\\n '), RESET);
        // vlog('pcode:   ', YELLOW, serializeBytecode(anonOp), RESET);
        //
        // // Now return the compiled register as value (`[r1, undefined]`)
        // return withAssign ? ['=', ...areg] : areg;

        return ['neg', ...compileExpression(exprNode.argument, regs, fdata, stmt, false, asm)];
      }
      if (exprNode.operator === '+') return ['pos', ...compileExpression(exprNode.argument, regs, fdata, stmt, false, asm)];
      return [exprNode.operator, ...compileExpression(exprNode.argument, regs, fdata, stmt, false, asm)];
    }
    case 'Param': return ['=', '$$' + exprNode.index, ''];
    case 'AssignmentExpression': {
      ASSERT(withAssign, 'normalized code, assign is a statement right? so withAssign should be true still...?');
      const left = compileExpression(exprNode.left, regs, fdata, stmt, false, asm)[0];
      const right = compileExpression(exprNode.right, regs, fdata, stmt, true, asm);
      return [left, ...right];
    }
    case 'Identifier': {
      vlog('- compiling identifier', [exprNode.name]);
      const r = compileReglit(exprNode, regs);
      vlog('    - as', r);
      if (withAssign) return['=', ...r];
      return r;
    }
    case 'CallExpression': {
      ASSERT(exprNode.callee.type === 'Identifier', 'should have checked that it only calls an ident', exprNode.callee.object, stmt);
      // $dotcall gets compiled here as a special opcode because we need to make it context sensitive
      // One alternative is to compile regular calls this way as well but leave the context undefined.
      if (exprNode.callee.name === SYMBOL_DOTCALL) {
        vlog('This is a dotcall', exprNode.arguments[0].name, exprNode.arguments[1].type);
        ASSERT(exprNode.arguments[0]?.type === 'Identifier', 'we chcecked this no?');
        const opcode = ['dotcall', exprNode.arguments[0].name];
        const ctx = compileExpression(exprNode.arguments[1], regs, fdata, stmt, false, asm)
        opcode.push(...ctx);
        for (let i=3; i<exprNode.arguments.length; ++i) {
          opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt, false, asm));
        }
        return opcode;
      } else {
        ASSERT(exprNode.callee.name, 'and the ident has a name?', exprNode);
        vlog('This is a regular ident call to', exprNode.callee.name, exprNode.arguments.length, ', we will compile an undefined as "first arg" for context');
        const isFrfr = exprNode.callee.name === SYMBOL_FRFR;
          // for $frfr, call the free func directly. it's always the first arg of the $frfr call
        const calleeName = isFrfr ? exprNode.arguments[0].name : exprNode.callee.name;
        if (isFrfr) vlog('- This is $frfr so the real call is to', calleeName);
        const opcode = [
          'call',
          calleeName,
          // This is the unused context position which is only used for $dotcall. Always undefined here.
          ...compileExpression(AST.undef(), regs, fdata, stmt, false, asm),
        ];

        // When frfr, skip the first arg because that is the function we call, already fixed above
        for (let i=isFrfr?1:0; i<exprNode.arguments.length; ++i) {
          opcode.push(...compileExpression(exprNode.arguments[i], regs, fdata, stmt, false, asm));
        }

        if (isFrfr) {
          vlog('- checking if the frfr arg is compiled...', [calleeName], '=>', fdata.pcodeOutput.get(calleeName));
          // For frfr we need to make sure to compile the frfr
          ASSERT(exprNode.arguments[0].type === 'Identifier', 'we control frfr and first arg must be ident', exprNode.arguments);
          if (!fdata.pcodeOutput.has(calleeName)) {
            vlog('Compiled a frfr..., must also make sure the free func is (pre) compiled:', [calleeName]);
            const meta = fdata.globallyUniqueNamingRegistry.get(calleeName);
            const funcNode = meta.varDeclRef.node;
            vgroup('pCompiling func node now...');
            vgroup();
            const pcode = pcompile(funcNode, fdata);
            fdata.pcodeOutput.set(calleeName, { pcode, funcNode, name: calleeName, bytecode: pcode });
            vgroupEnd();
            vgroupEnd();
          }
        }

        return opcode;
      }
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
            ...compileExpression(exprNode.expressions[i], regs, fdata, stmt, false, asm)
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

      ASSERT(false, 'support me?', exprNode.type, exprNode, stmt.type, stmt);
    }
  }
  ASSERT(false, 'add me expr', exprNode, stmt);
}
/**
 * Given an ident or primitive node, return a pair of [registerName, ''] or ['', primitiveValue]
 * When node is `true` it will compile the value assigned to a fresh anonymous register.
 *
 * @param {IdentifierNode | PrimitiveNode | true} node
 * @param {Set<string>} regs
 * @returns {[string, Primitive]}
 */
function compileReglit(node, regs) {
  if (AST.isPrimitive(node)) {
    return ['', AST.getPrimitiveValue(node)];
  }
  if (node === true) {
    // This is a temporary register with no name.
    // Assign it a fresh index but don't connect it to an identifier
    const s = 'r' + regs.size;
    vlog('Compiling anonymous register', [s]);
    regs.set({}, s); // the object guarantees us a unique entry without risking collisions. not very pretty though.
    return [s, ''];
  }
  if (node.type === 'Identifier') {
    if (pcodeSupportedBuiltinFuncs.has(node.name)) return [node.name, ''];
    if (BUILTIN_SYMBOLS.has(node.name)) ASSERT(false, 'builtin symbol that is not supported by pcode should not reach the compile step', node.name);

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
export function runPcode(funcName, args, pcodeData, fdata, prng, usePrng, depth) {
  ASSERT(runPcode.length === arguments.length, 'arg len');
  ASSERT(pcodeData, 'should receive a pcodeData object');
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
    vgroup('Bytecode not found for', funcName,'. JIT Compiling now...');
    vgroup();
    vgroup();
    bytecode = obj.bytecode = pcompile(obj.funcNode, fdata);
    vgroupEnd();
    // console.dir(bytecode, {depth: null})
    vgroupEnd();
    vgroupEnd();
    vgroupEnd();
    vlog('');
    vlog('runPcode: JIT Compilation finished for', funcName);
    vlog('');
  }
  ASSERT(bytecode);

  vgroup('runPcode: Running', [funcName], 'with these ags:', args);
  vlog('');
  const registers = {
    $ops: 0,
    $return: undefined,
  };
  for (let i=0; i<args.length; ++i) {
    registers['$$'+i] = args[i];
  }
  vgroupEnd();

  // Note: this may throw when thrown explicitly. or ... if it just happens heh.
  const action = prunStmt(registers, bytecode, pcodeData, fdata, prng, usePrng, depth);
  if (action === RETURN) return registers.$return;
  if (action === SO) return SO_MESSAGE;
  else return undefined; // If a side-effect free function returns undefined ... was it even useful? I mean I guess maybe but.
}

function prunStmt(registers, bytecode, pcodeData, fdata, prng, usePrng, depth) {
  for (let i=0; i<bytecode.length; ++i) {
    registers.$ops += 1;
    if (registers.$ops > MAX_OP_CODE_LIMIT) {
      vlog('- bail: tripped op count limit breaker. Preventing infinite loops etc.');
      return SO;
    }
    const op = bytecode[i];
    const opcode = op[0];
    switch (opcode) {
      case 'if': {
        // ['if', 'testReg', 'testLit', consequent[], alternate[]]
        const test = op[1] ? registers[op[1]] : op[2];
        vgroup('IF(', test, ')');
        if (test) {
          if (op[3].length === 0) vlog('(empty block)');
          const action = prunStmt(registers, op[3], pcodeData, fdata, prng, usePrng, depth);
          if (action !== NONE) {
            vgroupEnd();
            return action;
          }
        } else {
          if (op[4].length === 0) vlog('(empty block)');
          const action = prunStmt(registers, op[4], pcodeData, fdata, prng, usePrng, depth);
          if (action !== NONE) {
            vgroupEnd();
            return action;
          }
        }
        vgroupEnd();
        break;
      }

      case 'while': {
        vlog('Running while...', op);
        vgroup();
        vgroup();
        const body = op[1];
        // ['while', body[]]
        let loopBreaker = MAX_OP_CODE_LIMIT; // Whatever. Some artificial ceiling to prevent infinite loops
        while (true) {
          if (--loopBreaker <= 0) {
            vgroupEnd();
            vgroupEnd();
            vgroupEnd();
            vlog('/while (loop breaker)');
            return SO;
          }
          if (body.length === 0) {
            vgroupEnd();
            vgroupEnd();
            vgroupEnd();
            vlog('/while (no body)');
            return SO; // infinite loop
          }
          const action = prunStmt(registers, body, pcodeData, fdata, prng, usePrng, depth);
          if (action === BREAK) {
            // An unlabeled break ends here, turn it into a regular completion
            vlog('- Loop found break, label =', [registers.$break]);
            if (registers.$break) {
              vlog('- The break does not end here, propagating it...');
              vgroupEnd();
              vgroupEnd();
              vgroupEnd();
              vlog('/while (labeled break)');
              return BREAK;
            }
            vlog('- The break has no label so it ends here. Propagating a normal completion...');
            vgroupEnd();
            vgroupEnd();
            vgroupEnd();
            vlog('/while (unlabeled break)');
            break; // do not return, break here will resume with statement after the while
          }
          if (action !== NONE) {
            vgroupEnd();
            vgroupEnd();
            vgroupEnd();
            vlog('/while (abrupt completion)');
            return action;
          }
        }
        // Reached after an unlabeled BREAK
        break;
      }

      case 'return': {
        // ['return', 'reg', 'lit']
        // ['return', 'neg', 'reg', 'lit']
        // ['return', 'pos', 'reg', 'lit']
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
        vlog('return', registers.$return, op[1], registers[op[1]]);
        return RETURN;
      }

      case 'throw': {
        // ['throw', 'reg', 'lit']
        // There's no try/catch so the outer call to run() should trap it.

        if (op[1] === 'neg') { // Extreme edge case but.
          registers.$throw = op[2] ? -registers[op[2]] : -op[3];
          vlog('THROW', registers.$return);
          return RETURN;
        }
        else if (op[1] === 'pos') { // Extremer edge case but.
          registers.$throw = op[2] ? +registers[op[2]] : +op[3];
          vlog('THROW', registers.$return);
          return RETURN;
        }
        const v = op[1] ? registers[op[1]] : op[2];
        vlog('THROW', v);
        throw v;
      }

      case 'break': {
        // ['return', 'label']
        registers.$break = op[1];
        vlog('BREAK', registers.$break ?? '<unlabeled>');
        return BREAK;
      }

      case 'label': {
        // ['label', 'name']
        vgroup('LABEL', op[2]);
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
          vlog('EXPR:', op[1].padEnd(5, ' '), opcode, 'now contains:', typeof registers[opcode] === 'string' ? JSON.stringify(registers[opcode]) : registers[opcode]);
          if (registers[opcode] === SO_MESSAGE) return SO; // stack overflow
          break;
        }

        console.log('wat stmt?', op)
        ASSERT(false, 'missing pcode op while running:', op) // what is this?
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

  vlog('- prunExpr(', op[1], '):                           ', JSON.stringify(op));

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

    case 'dotcall':
    case 'call': {
      let targetFuncName = op[2];

      vlog('- Getting context');
      let context = prunVal(registers, op[3], op[4]);
      vlog('  context: ', context);

      vlog('- op:', op);

      // If it throws I guess it actually throws...
      const arr = [];
      for (let i= 5; i<op.length; i+=2) {
        arr.push(prunVal(registers, op[i], op[i+1]))
      }

      vlog('- args:', arr);
      vlog('Checking if func', [op[2]], 'has pcode...');
      let calleeName = op[2];
      if (calleeName === SYMBOL_FRFR) {
        calleeName = arr[0];
        ASSERT(calleeName, 'frfr is controlled by us');
      }

      if (!pcodeData.has(calleeName)) {
        if (!pcodeSupportedBuiltinFuncs.has(targetFuncName)) {
          ASSERT(false, 'prun should only receive funcs to call that it supports (or free funcs, which should be pcompiled)', targetFuncName);
        }
      }

      switch (targetFuncName) {
        case '$': {
          // This is gonna be confusing :(
          log('- $(): (Note: this is running in pcode, test runner will not receive this. Do not add in test!):', arr);
          return undefined;
        }

        case symbo('boolean', 'toString'): {
          const r = Boolean.prototype.toString.call(context);
          vlog('Boolean.prototype.toString.call(', context, ') =', [r]);
          return r;
        }
        case symbo('boolean', 'valueOf'): {
          const r = Boolean.prototype.valueOf.call(context);
          vlog('Boolean.prototype.valueOf.call(', context, ') =', [r]);
          return r;
        }

        case symbo('Global', 'isFinite'):
        case 'isFinite': {
          // Note: this coerces the first arg, unlike Number.isFinite
          const r = isFinite(...arr);
          vlog('isFinite(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Number', 'isFinite'): {
          const r = Number.isFinite(...arr); // Does NOT coerce first arg
          vlog('Number.isFinite(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Number', 'isInteger'): {
          const r = Number.isInteger(...arr);
          vlog('Number.isInteger(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Global', 'isNaN'):
        case 'isNaN': {
          // Note: this coerces the first arg, unlike Number.isNaN
          const r = isNaN(...arr);
          vlog('isNaN(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Number', 'isNaN'): {
          const r = Number.isNaN(...arr);
          vlog('Number.isNaN(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Number', 'isSafeInteger'): {
          const r = Number.isSafeInteger(...arr);
          vlog('Number.isSafeInteger(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Global', 'parseFloat'): {
          const r = parseFloat(...arr);
          vlog('parseFloat(', arr[0], arr[1], ') =', [r]);
          return r;
        }
        case symbo('Number', 'parseFloat'): {
          const r = Number.parseFloat(...arr);
          vlog('Number.parseFloat(', arr[0], ') =', [r]);
          return r;
        }
        case symbo('Global', 'parseInt'): {
          const r = parseInt(...arr);
          vlog('parseInt(', arr[0], arr[1], ') =', [r]);
          return r;
        }
        case symbo('Number', 'parseInt'): {
          const r = Number.parseInt(...arr);
          vlog('Number.parseInt(', arr[0], arr[1], ') =', [r]);
          return r;
        }

        case symbo('number', 'toExponential'): {
          const r = Number.prototype.toExponential.call(context, ...arr);
          vlog('Number.prototype.toExponential.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('number', 'toFixed'): {
          const r = Number.prototype.toFixed.call(context, ...arr);
          vlog('Number.prototype.toFixed.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('number', 'toLocaleString'): {
          ASSERT(false, 'no not this one'); // I mean we could be we woudl defy the point. Maybe for obfuscation tho?
          break;
        }
        case symbo('number', 'toPrecision'): {
          const r = Number.prototype.toPrecision.call(context, ...arr);
          vlog('Number.prototype.toPrecision.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('number', 'toString'): {
          const r = Number.prototype.toString.call(context, ...arr);
          vlog('Number.prototype.toString.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('number', 'valueOf'): {
          const r = Number.prototype.valueOf.call(context, ...arr);
          vlog('Number.prototype.valueOf.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }

        case symbo('String', 'fromCharCode'): {
          const r = String.fromCharCode(...arr);
          vlog('String.fromCharCode(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('String', 'fromCodePoint'): {
          const r = String.fromCodePoint(...arr);
          vlog('String.fromCodePoint(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('String', 'raw'): {
          const r = String.raw(...arr);
          vlog('String.raw(', ...arr, ') =', [r]);
          return r;
        }

        case symbo('string', 'charAt'): {
          const r = String.prototype.charAt.call(context, ...arr);
          vlog('String.prototype.charAt.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'charCodeAt'): {
          const r = String.prototype.charCodeAt.call(context, ...arr);
          vlog('String.prototype.charCodeAt.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'concat'): {
          const r = String.prototype.concat.call(context, ...arr);
          vlog('String.prototype.concat.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'includes'): {
          const r = String.prototype.includes.call(context, ...arr);
          vlog('String.prototype.includes.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'indexOf'): {
          const r = String.prototype.indexOf.call(context, ...arr);
          vlog('String.prototype.indexOf.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'lastIndexOf'): {
          const r = String.prototype.lastIndexOf.call(context, ...arr);
          vlog('String.prototype.lastIndexOf.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'match'): { return ASSERT(false, 'TODO string match') }
        case symbo('string', 'replace'): { return ASSERT(false, 'TODO string replace') }
        case symbo('string', 'slice'): {
          const r = String.prototype.slice.call(context, ...arr);
          vlog('String.prototype.slice.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'split'): { return ASSERT(false, 'TODO string split') }
        case symbo('string', 'substring'): {
          const r = String.prototype.substring.call(context, ...arr);
          vlog('String.prototype.substring.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'substr'): {
          const r = String.prototype.substr.call(context, ...arr);
          vlog('String.prototype.substr.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'toString'): {
          const r = String.prototype.toString.call(context, ...arr);
          vlog('String.prototype.toString.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'toLowerCase'): {
          const r = String.prototype.toLowerCase.call(context, ...arr);
          vlog('String.prototype.toLowerCase.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'toUpperCase'): {
          const r = String.prototype.toUpperCase.call(context, ...arr);
          vlog('String.prototype.toUpperCase.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'valueOf'): {
          const r = String.prototype.valueOf.call(context, ...arr);
          vlog('String.prototype.valueOf.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }

        // Legacy HTML-related String.prototype methods
        case symbo('string', 'anchor'): {
          const r = String.prototype.anchor.call(context, ...arr);
          vlog('String.prototype.anchor.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'big'): {
          const r = String.prototype.big.call(context, ...arr);
          vlog('String.prototype.big.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'blink'): {
          const r = String.prototype.blink.call(context, ...arr);
          vlog('String.prototype.blink.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'bold'): {
          const r = String.prototype.bold.call(context, ...arr);
          vlog('String.prototype.bold.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'fixed'): {
          const r = String.prototype.fixed.call(context, ...arr);
          vlog('String.prototype.fixed.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'fontcolor'): {
          const r = String.prototype.fontcolor.call(context, ...arr);
          vlog('String.prototype.fontcolor.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'fontsize'): {
          const r = String.prototype.fontsize.call(context, ...arr);
          vlog('String.prototype.fontsize.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'italics'): {
          const r = String.prototype.italics.call(context, ...arr);
          vlog('String.prototype.italics.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'link'): {
          const r = String.prototype.link.call(context, ...arr);
          vlog('String.prototype.link.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'small'): {
          const r = String.prototype.small.call(context, ...arr);
          vlog('String.prototype.small.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'strike'): {
          const r = String.prototype.strike.call(context, ...arr);
          vlog('String.prototype.strike.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'sub'): {
          const r = String.prototype.sub.call(context, ...arr);
          vlog('String.prototype.sub.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }
        case symbo('string', 'sup'): {
          const r = String.prototype.sup.call(context, ...arr);
          vlog('String.prototype.sup.call(', context, ',', arr[0], ') =', [r]);
          return r;
        }

        // Note: some of the math props are questionable due to risk of rounding errors and lossy serialization of complex floats
        case symbo('Math', 'abs'):  {
          const r = Math.abs(...arr);
          vlog('Math.abs(', ...arr, ') =', [r]);
          // This is mostly about negative zero.
          if (!Object.is(parseFloat(String(r)), r)) {
            vlog('Bail BAIL the result is not safe to serialize!', [parseFloat(String(r))], [r]);
            todo('pcode botched a math.abs case, the stack overflow error is a red herring caused by it');
            return SO_MESSAGE; // we dont have other aborts and otherwise i fear it ends up in an infinite attempted-transform-loop
          }
          return r;
        }
        case symbo('Math', 'acos'): {
          const r = Math.acos(...arr);
          vlog('Math.acos(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'acosh'): {
          const r = Math.acosh(...arr);
          vlog('Math.acosh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'asin'): {
          const r = Math.asin(...arr);
          vlog('Math.asin(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'asinh'): {
          const r = Math.asinh(...arr);
          vlog('Math.asinh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'atan'): {
          const r = Math.atan(...arr);
          vlog('Math.atan(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'atan2'): {
          const r = Math.atan2(...arr);
          vlog('Math.atan2(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'atanh'): {
          const r = Math.atanh(...arr);
          vlog('Math.atanh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'cbrt'): {
          const r = Math.cbrt(...arr);
          vlog('Math.cbrt(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'ceil'): {
          const r = Math.ceil(...arr);
          vlog('Math.ceil(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'clz32'): {
          const r = Math.clz32(...arr);
          vlog('Math.clz32(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'cos'): {
          const r = Math.cos(...arr);
          vlog('Math.cos(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'cosh'): {
          const r = Math.cosh(...arr);
          vlog('Math.cosh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'exp'): {
          const r = Math.exp(...arr);
          vlog('Math.exp(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'expm1'): {
          const r = Math.expm1(...arr);
          vlog('Math.expm1(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'f16round'): {
          const r = Math.f16round(...arr);
          vlog('Math.f16round(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'floor'): {
          const r = Math.floor(...arr);
          vlog('Math.floor(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'fround'): {
          const r = Math.fround(...arr);
          vlog('Math.fround(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'hypot'): {
          // TODO: this is dangerous with rounding errors and serialization precision loss
          const r = Math.hypot(...arr);
          vlog('Math.hypot(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'imul'): {
          const r = Math.imul(...arr);
          vlog('Math.imul(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'log'): {
          const r = Math.log(...arr);
          vlog('Math.log(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'log10'): {
          const r = Math.log10(...arr);
          vlog('Math.log10(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'log1p'): {
          const r = Math.log1p(...arr);
          vlog('Math.log1p(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'log2'): {
          const r = Math.log2(...arr);
          vlog('Math.log2(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'max'): {
          const r = Math.max(...arr);
          vlog('Math.max(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'min'): {
          const r = Math.min(...arr);
          vlog('Math.min(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'pow'): {
          const r = Math.pow(...arr);
          vlog('Math.pow(', ...arr, ') =', [r]);
          return r;
        }
        // we can fake this with a prng, fails if the prngSeed is zero
        case symbo('Math', 'random'): {
          if (!usePrng) throw new Error('Tried to invoke pcode function that contained Math.random but the prngSeed is zero');
          // Ignore if there are args. This way the user could control to keep a Math.random :shrug:
          ASSERT(arr.length === 0, 'can compile should have checked this');
          return prng();
        }
        case symbo('Math', 'round'): {
          const r = Math.round(...arr);
          vlog('Math.round(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'sign'): {
          const r = Math.sign(...arr);
          vlog('Math.sign(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'sin'): {
          const r = Math.sin(...arr);
          vlog('Math.sin(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'sinh'): {
          const r = Math.sinh(...arr);
          vlog('Math.sinh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'sqrt'): {
          const r = Math.sqrt(...arr);
          vlog('Math.sqrt(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'tan'): {
          const r = Math.tan(...arr);
          vlog('Math.tan(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'tanh'): {
          const r = Math.tanh(...arr);
          vlog('Math.tanh(', ...arr, ') =', [r]);
          return r;
        }
        case symbo('Math', 'trunc'): {
          const r = Math.trunc(...arr);
          vlog('Math.trunc(', ...arr, ') =', [r]);
          return r;
        }

        //case 'clearInterval': throw new Error('Do not call `clearInterval`');
        //case 'clearTimeout': throw new Error('Do not call `clearTimeout`');

        case 'setInterval': throw new Error('Do not call `setInterval`');
        case 'setTimeout': throw new Error('Do not call `setTimeout`');
        case 'eval': throw new Error('Do not call `eval`');
        //case 'Array':
        case symbo('boolean', 'constructor'): return Boolean(...arr);
        //case 'Date':
        //case 'Error':
        //case 'JSON':
        //case 'Map':
        case symbo('number', 'constructor'): return Number(...arr);
        //case 'Object':
        //case 'RegExp':
        //case 'Set':
        case symbo('string', 'constructor'): return String(...arr);
        case symbo('function', 'constructor'): throw new Error('Do not call `Function`');

        case symbo('Global', 'encodeURI'): return encodeURI(...arr);
        case symbo('Global', 'decodeURI'): return decodeURI(...arr);
        case symbo('Global', 'encodeURIComponent'): return encodeURIComponent(...arr);
        case symbo('Global', 'decodeURIComponent'): return decodeURIComponent(...arr);
        case symbo('Global', 'escape'): return escape(...arr);
        case symbo('Global', 'unescape'): return unescape(...arr);
        case 'btoa': return btoa(...arr);
        case 'atob': return atob(...arr);

        case SYMBOL_COERCE: {
          vlog('Calling special $coerce()');
          // see reduce_static/coerced.mjs
          // Context is 3+4, not used here, but that means args are 5+
          const v = prunVal(registers, op[5], op[6]);
          const target = prunVal(registers, op[7], op[8]); // number, string, plustr

          if (target === 'number') return Number(v);
          if (target === 'string') return String(v);
          if (target === 'plustr') return '' + v;
          ASSERT(false, '$coerce target should be fixed and controlled by us but target type is not number/string/plustr?', [v, target]);
          break;
        }

        //default: ASSERT(false, 'Missing impl for builtin which was marked in pcodeSupportedBuiltins?: func', calleeName);
      }

      vlog('- Not calling a builtin, hope its compiled... runPcode:');
      vgroup(calleeName, '(', ...arr, ')');
      const r = runPcode(calleeName, arr, pcodeData, fdata, prng, usePrng, depth);
      vlog('- Call result:', r);
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

      ASSERT(false, 'corrupted compilation... what is this op?', op); // what is this?
      break;
    }
  }
}

/**
 * @returns {Primitive}
 */
function prunVal(registers, r1, l1) {

  const sym = BUILTIN_SYMBOLS.get(r1);
  if (sym) {
    vlog('  - prunVal(', r1, '(=builtin)) =>', JSON.stringify(sym));

    switch (r1) {
      case symbo('Math', 'E'): {
        const v = Math.E;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'LN10'): {
        const v = Math.LN10;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'LN2'): {
        const v = Math.LN2;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'LOG10E'): {
        const v = Math.LOG10E;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'LOG2E'): {
        const v = Math.LOG2E;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'PI'): {
        const v = Math.PI;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'SQRT1_2'): {
        const v = Math.SQRT1_2;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
      case symbo('Math', 'SQRT2'): {
        const v = Math.SQRT2;
        vlog('  - prunVal(', r1, ') =>', v);
        return v;
      }
    }
  }

  const v = r1 ? registers[r1] : l1;
  vlog('  - prunVal(', r1, ',', l1, ') =>', typeof v === 'string' ? JSON.stringify(v) : v);
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
    else if (arr[1] === 'call') {
      const x = [sp + '[ ' + arr[0] + ' ' + arr[1] + ' ' + arr[2]];
      x.push(' {'+printReglit(arr[3], arr[4]) + '}');
      for (let i=5; i<arr.length; i+=2) {
        x.push(' '+printReglit(arr[i], arr[i+1]));
      }
      return x.join('') + ' ]';
    }
    else if (arr[1] === 'dotcall') {
      const x = [sp + '[ ' + arr[0] + ' ' + arr[1] + ' ' + arr[2]];
      x.push(' {'+printReglit(arr[3], arr[4]) + '}');
      for (let i=5; i<arr.length; i+=2) {
        x.push(' '+printReglit(arr[i], arr[i+1]));
      }
      return x.join('') + ' ]';
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
