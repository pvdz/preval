export let VERBOSE_TRACING = true;

export function setVerboseTracing(bool) {
  // Note: you may also need to call clearStdio(); or setStdio(stdio, verbose); to have changes take effect (when debugging)
  VERBOSE_TRACING = !!bool;
}

export const ASSUME_BUILTINS = true; // Put any rules that assert the internals of JS (prototype) that exist are not changed under this flag.

export const DCE_ERROR_MSG = '[Preval]: Can not reach here';
export const ERR_MSG_ILLEGAL_ARRAY_SPREAD = '[Preval]: Array spread must crash before this line';
export const ERR_MSG_ILLEGAL_CALLEE = '[Preval]: Call expression with illegal callee must crash before this line ';

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
export const ORANGE_DIM = colorLess ? '' : '\x1b[33;2m';
export const ORANGE = colorLess ? '' : '\x1b[38;5;214m';
export const BLUE = colorLess ? '' : '\x1b[34;1m';
export const PURPLE = colorLess ? '' : '\x1b[35;1m';
export const WHITE = colorLess ? '' : '\x1b[37m';
export const RESET = colorLess ? '' : '\x1b[0m';
export const DIM = colorLess ? '' : '\x1b[30;1m';
export const BOLD = colorLess ? '' : '\x1b[;1;1m';
export const TRIBE = colorLess ? '' : '\x1b[36;1m';
export const WHITE_BLACK = colorLess ? '' : '\x1b[30;47m';

// TODO: bigint? symbol? unknown?
// TODO: plustr (it's narrower than "primitive" but does that really help us?
export const PRIMITVE_TYPE_NAMES_NOT_STRING = new Set(['undefined', 'null', 'boolean', 'number']);
export const PRIMITIVE_TYPE_NAMES_TYPEOF = new Set(['undefined', 'null', 'boolean', 'number', 'string']);
export const PRIMITIVE_TYPE_NAMES_PREVAL = new Set(['undefined', 'null', 'boolean', 'number', 'string', 'primitive']); // plustr?
export const ALL_NON_PRIMITIVE_TYPE_NAMES = new Set(['object', 'array', 'regex', 'function', 'class', 'promise', 'map', 'set']);
export const ALL_PREVAL_TYPE_NAMES = new Set(
  ['unknown', 'bigint', 'symbol'].concat(
    Array.from(PRIMITIVE_TYPE_NAMES_PREVAL),
    Array.from(ALL_NON_PRIMITIVE_TYPE_NAMES)
  )
);
