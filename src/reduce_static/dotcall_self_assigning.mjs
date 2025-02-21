// Find $dotCalls that are mutating a let on which the method is being called to try and eliminate the dotcall in favor of a regular method call
//
// let x/*unknown*/ = 'foo'; while (x) { const tmp = x.replace; x = $coerce(x, tmp, a, b); }
// ->
// let x/*string*/ = 'foo'; while (x)  x = x.replace(a, b);
//
// This seems silly but it helps with free-loops for example, because like above we now know x is a string.

import {
  ASSERT,
  log,
  group,
  groupEnd,
  vlog,
  vgroup,
  vgroupEnd,
  rule,
  example,
  before,
  source,
  after,
  findBodyOffset,
  todo,
} from '../utils.mjs';
import * as AST from '../ast.mjs';
import { SYMBOL_DOTCALL } from '../symbols_preval.mjs';
import { BUILTIN_SYMBOLS, sym_prefix, symbo } from '../symbols_builtins.mjs';

export function dotcallSelfAssigning(fdata) {
  group('\n\n\nLooking for $dotCalls that assign to the var on which they are calling a method\n');
  const r = _dotcallSelfAssigning(fdata);
  groupEnd();
  return r;
}
function _dotcallSelfAssigning(fdata) {
  let changes = 0;

  const dotcallMeta = fdata.globallyUniqueNamingRegistry.get(SYMBOL_DOTCALL);
  dotcallMeta.reads.forEach(read => {
    if (read.grandNode.type !== 'AssignmentExpression') return; // Only care about `x = $dotcall()`, not var decls
    if (read.grandNode.left.type !== 'Identifier') return; // Ignore member expression assignments
    const lname = read.grandNode.left.name;
    const meta = fdata.globallyUniqueNamingRegistry.get(lname);

    if (meta.writes.length !== 2) return;
    // I guess we already know one write was an assignment. The other must be a decl of sorts, or something non-var.
    const decl = meta.writes[0];
    const assign = meta.writes[1];
    if (decl.kind !== 'var') return;
    if (assign.kind !== 'assign') return;

    // Now we must check if the init has a predictable type. Let's start with primitive checks. We can expand on that later.
    if (!AST.isPrimitive(decl.parentNode.init)) return false;
    const initType = AST.getPrimitiveType(decl.parentNode.init);

    // Confirm that the var is the context arg of the dotcall
    if (
      read.parentNode.arguments[1].type !== 'Identifier' || // Very unlikely but ok
      read.parentNode.arguments[1].name !== decl.parentNode.id.name
    ) return;

    ASSERT(read.parentNode.arguments[0].type === 'Identifier', 'we control dotcall and the first arg should be an ident which is the func being invoked', read.parentNode);
    if (BUILTIN_SYMBOLS.has(read.parentNode.arguments[0].name)) {
      // It's calling a known builtin function/method. If it returns the same type then we should be able to safely replace it..?
      const obj = BUILTIN_SYMBOLS.get(read.parentNode.arguments[0].name);
      if (
        initType === obj.typings?.returns && // does this builtin return the same type?
        read.parentNode.arguments[0].name.startsWith(sym_prefix(initType, true)) // if string, make sure it's a string method, etc.
      ) {
        rule('Dotcall assigning a method to its context can eliminate the dotcall when returning the same type');
        example(
          `let x = "foo"; x = $dotCall(${symbo('string', 'replace')}, x, "o", "e")`,
          `let x = "foo"; x = x.replace("o", "e")`,
        );
        before(read.blockBody[read.blockIndex]);

        // Replace the callee ($dotcall(a,b,c) -> b.f(a,b,c))
        read.parentNode.callee = AST.memberExpression(read.parentNode.arguments[1], obj.prop);
        // Drop the func and context args
        read.parentNode.arguments.shift();
        read.parentNode.arguments.shift();

        after(read.blockBody[read.blockIndex]);
        changes += 1;
        return;
      } else {
        todo('There might be some cases where we can simplify this dotcall to a known builtin:', read.parentNode.arguments[1].name);
        // The function being called is a builtin. There's no saving this. Bail now.
        return;
      }
    }

    // Now check if we can figure out what the type is of the second arg.
    // For the cases that we target, it's most likely easy to find.

    const methodRef = read.parentNode.arguments[0];
    if (methodRef.type !== 'Identifier') return; // Unlikely because this the function to invoke and it wouldn't be in the arg without an ident but ok
    const methodMeta = fdata.globallyUniqueNamingRegistry.get(methodRef.name);
    // We're unlikely to find our pattern if this is a multi-use var or not regularly declared
    if (methodMeta.writes.length !== 1 || methodMeta.reads.length !== 1 || methodMeta.writes[0].kind !== 'var') return;
    const method = methodMeta.writes[0].parentNode.init;
    if (method.type !== 'MemberExpression') return; // the init should be something like `foo.replace`
    if (method.object.type !== 'Identifier' || method.object.name !== lname) return;
    if (method.computed) return; // Can't deal with this kind of method. It's not the target pattern anyways.

    // This is the method
    const methodName = method.property.name;

    // So we have
    const symbol = symbo(initType, methodName);

    // Okay we're here! Replace the member expression with the symbol.
    if (initType === BUILTIN_SYMBOLS.get(symbol).typings?.returns) {
      rule('When a $dotCall is assinging the result to the callee and we can predict the func, we can improve the func');
      example('let x/*:unknown*/ = "abc"; const func = x.replace; x = $dotCall(func, x, a, b);', `let x/*:string*/ = "abc"; const func = ${symbo('String', 'replace')}; x = $dotCall(func, x, a, b)`);
      before(decl.blockBody[decl.blockIndex]);
      before(methodMeta.writes[0].blockBody[methodMeta.writes[0].blockIndex]);
      before(read.blockBody[read.blockIndex]);

      methodMeta.writes[0].parentNode.init = AST.identifier(symbo('string', 'replace'));
      // This doesn't work because after this transform it will call phase1 which resets typing information (that's the whole point even)
      //methodMeta.typing.mustBeType = 'string';
      //methodMeta.typing.mustBePrimitive = true;

      after(decl.blockBody[decl.blockIndex]);
      after(methodMeta.writes[0].blockBody[methodMeta.writes[0].blockIndex]);
      after(read.blockBody[read.blockIndex]);

      changes += 1;
    }

    const obj = BUILTIN_SYMBOLS.get(symbol);
    if (obj?.typings.mustBeType === initType) { // Reminder: initType is asserted to be a primitive
      // In this case the type matches so it shoudl be fine to inline?
      same_as_above
    }

  });

  if (changes) {
    log('Self assigning dotcalls improved:', changes, '. Restarting from phase1 to fix up read/write registry.');
    return {what: 'dotcallSelfAssigning', changes: changes, next: 'phase1'};
  }

  log('Self assigning dotcalls improved: 0.');
  return false;
}
