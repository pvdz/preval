// These are special symbols Preval uses in transformations. Stuff like $coerce.
//
// The dollar prefixed symbols should not be renamed, like $coerce and $dotCall
// Things like this/arguments are not global though so they don't get $ prefixed.


export const ARG_THIS_ALIAS_PREFIX = 'tmpPrevalAlias';
export const THIS_ALIAS_BASE_NAME = ARG_THIS_ALIAS_PREFIX + 'This'; // 'tmpThis' 'tmpPrevalAliasThis'
export const ARGUMENTS_ALIAS_PREFIX = ARG_THIS_ALIAS_PREFIX + 'Arguments'; // 'tmpArguments' 'tmpPrevalAliasArguments'
export const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any'; // 'tmpArgumentsAny' 'tmpPrevalAliasArgumentsAny'
export const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // 'tmpArgumentsLen' 'tmpPrevalAliasArgumentsLen'; `arguments.length`, which is easier than just `arguments`

/**
 * Temporary prefix for globals while we try to discover implicit globals
 */
export const IMPLICIT_GLOBAL_PREFIX = '$prevalImplicit$';

/**
 * Abstraction of an object spread (`{...xyz}`) so we can eliminate it from source code.
 * Pretty much an Object.assign but actually still does a spread when called (in tests)
 */
export const BUILTIN_REST_HANDLER_NAME = '$objPatternRest';

/**
 * Syntactic clue that this was an actual method call before, not an arbitrary .call method
 * When reconstructing it, we should be safe to assume the source code was trying to access
 * this method on the context.
 * In our source, the call should always look like this:
 * ```
 * $dotCall(func, context, propertyName, .. rest of args)
 * ```
 * If the original was a computed property then the propertyName should be explicitly
 * undefined, which will indicate that. Otherwise non-computed is assumed.
 */
export const SYMBOL_DOTCALL = '$dotCall';

/**
 * Special function that Preval uses to enforce a certain type. This is usually because
 * something forced the type and leaving this special call means the original code can
 * be simplified. For example a string concat.
 * The call is completely under our control and should look like `$coerce(val, target)`
 * where target is `"number" | "string" | "plustr"`. The "plustr" signifies `+` coercion.
 */
export const SYMBOL_COERCE = '$coerce';

/**
 * Custom abstraction of the for-in loop, implemented as a generator.
 * This allows us to eliminate for-in loops, in favor of (slightly more awkward but generic) while-loops
 */
export const SYMBOL_FORIN = '$forIn';

/**
 * Custom abstraction of the for-of loop, implemented as a generator.
 * This allows us to eliminate for-of loops, in favor of (slightly more awkward but generic) while-loops
 */
export const SYMBOL_FOROF = '$forOf';

/**
 * This is a special symbol exclusively as while-test.
 * Preval should consider any ident that starts with this as `true`
 * but transforms can tell how many times this loop can still be unrolled.
 */
export const SYMBOL_LOOP_UNROLL = '$LOOP_UNROLL_';
/**
 * This is a special symbol exclusively as while-test.
 * Preval should consider this ident as `true` and transforms should
 * consider that this loop can no longer be unrolled any further.
 */
export const SYMBOL_MAX_LOOP_UNROLL = '$LOOP_DONE_UNROLLING_ALWAYS_TRUE';

/**
 * We compile this when we know the previous line ought to trigger a TDZ error.
 * This helps rules automatically clean up the remainder as part of DCE sweeps.
 */
export const SYMBOL_THROW_TDZ_ERROR = '$throwTDZError';

/**
 * Our special Math.random replacement. This one actually isn't exposed in userland (I think).
 * The setup boilerplate does use it to replace Math.random inside eval.
 */
export const SYMBOL_PRNG = '$prng';

export const SYMBOL_FREE = '$free';
export const SYMBOL_FRFR = '$frfr';

export const GLOBAL_PREVAL_SYMBOLS = new Set([
  '$',
  BUILTIN_REST_HANDLER_NAME,
  SYMBOL_DOTCALL,
  SYMBOL_COERCE,
  SYMBOL_FORIN,
  SYMBOL_FOROF,
  SYMBOL_MAX_LOOP_UNROLL,
  SYMBOL_THROW_TDZ_ERROR,
  SYMBOL_PRNG,
  SYMBOL_FREE,
  SYMBOL_FRFR,
])
