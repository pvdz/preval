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

const colorLess = typeof process !== 'undefined' && process.argv.includes('-C');

export const RED = colorLess ? '' : '\x1b[31;1m';
export const RED_WHITE = colorLess ? '' : '\x1b[41;1m';
export const GREEN = colorLess ? '' : '\x1b[32m';
export const YELLOW = colorLess ? '' : '\x1b[33;1m';
export const BLUE = colorLess ? '' : '\x1b[34;1m';
export const PURPLE = colorLess ? '' : '\x1b[35;1m';
export const WHITE = colorLess ? '' : '\x1b[37m';
export const RESET = colorLess ? '' : '\x1b[0m';
export const DIM = colorLess ? '' : '\x1b[30;1m';
export const BOLD = colorLess ? '' : '\x1b[;1;1m';
export const TRIBE = colorLess ? '' : '\x1b[36;1m';
export const WHITE_BLACK = colorLess ? '' : '\x1b[30;47m';
