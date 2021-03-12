export let VERBOSE_TRACING = true;

export function setVerboseTracing(bool) {
  VERBOSE_TRACING = !!bool;
}

export const ASSUME_BUILTINS = true; // Put any rules that assert the internals of JS (prototype) that exist are not changed under this flag.

export const DCE_ERROR_MSG = '[Preval]: Can not reach here';

export const ALIAS_PREFIX = 'tmpPrevalAlias';
export const THIS_ALIAS_BASE_NAME = ALIAS_PREFIX + 'This';
export const ARGUMENTS_ALIAS_PREFIX = ALIAS_PREFIX + 'Arguments';
export const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any';
export const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // `arguments.length`, which is easier than just `arguments`

export const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals

export const FRESH = true;
export const OLD = false;

export const MARK_NONE = 0;
export const MARK_TEMP = 1;
export const MARK_PERM = 2;
