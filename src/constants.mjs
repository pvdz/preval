export let VERBOSE_TRACING = true;

export function setVerboseTracing(bool) {
  // Note: you may also need to call clearStdio(); or setStdio(stdio, verbose); to have changes take effect (when debugging)
  VERBOSE_TRACING = !!bool;
}

export const ASSUME_BUILTINS = true; // Put any rules that assert the internals of JS (prototype) that exist are not changed under this flag.

export const DCE_ERROR_MSG = '[Preval]: Can not reach here';
export const ERR_MSG_ILLEGAL_ARRAY_SPREAD = '[Preval]: Array spread must crash before this line';
export const ERR_MSG_ILLEGAL_CALLEE = '[Preval]: Call expression with illegal callee must crash before this line ';

export const ARG_THIS_ALIAS_PREFIX = 'tmpPrevalAlias';
export const THIS_ALIAS_BASE_NAME = ARG_THIS_ALIAS_PREFIX + 'This'; // 'tmpThis' 'tmpPrevalAliasThis'
export const ARGUMENTS_ALIAS_PREFIX = ARG_THIS_ALIAS_PREFIX + 'Arguments'; // 'tmpArguments' 'tmpPrevalAliasArguments'
export const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any'; // 'tmpArgumentsAny' 'tmpPrevalAliasArgumentsAny'
export const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // 'tmpArgumentsLen' 'tmpPrevalAliasArgumentsLen'; `arguments.length`, which is easier than just `arguments`
export const IMPLICIT_GLOBAL_PREFIX = '$prevalImplicit$';

export const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals
export const BUILTIN_FUNC_CALL_NAME = '$dotCall'; // syntactic clue that this was an actual method call before, not arbitrary .call method
export const BUILTIN_FOR_IN_CALL_NAME = '$forIn';
export const BUILTIN_FOR_OF_CALL_NAME = '$forOf';

export const BUILTIN_ARRAY_PROTOTYPE = '$ArrayPrototype';
export const BUILTIN_ARRAY_METHOD_LOOKUP = {
  filter: '$Array_filter',
  flat: '$Array_flat',
  concat: '$Array_concat',
  push: '$Array_push',
  pop: '$Array_pop',
  shift: '$Array_shift',
  unshift: '$Array_unshift',
};
export const BUILTIN_ARRAY_METHOD_LOOKUP_REV = Object.keys(BUILTIN_ARRAY_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_ARRAY_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_ARRAY_METHODS_SUPPORTED = Object.keys(BUILTIN_ARRAY_METHOD_LOOKUP);
export const BUILTIN_ARRAY_METHODS_SYMBOLS = Object.values(BUILTIN_ARRAY_METHOD_LOOKUP);
export const BUILTIN_BOOLEAN_METHOD_LOOKUP = {
  toString: '$Boolean_toString',
};
export const BUILTIN_BOOLEAN_PROTOTYPE = '$BooleanPrototype';
export const BUILTIN_BOOLEAN_METHOD_LOOKUP_REV = Object.keys(BUILTIN_BOOLEAN_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_BOOLEAN_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_BOOLEAN_METHODS_SUPPORTED = Object.keys(BUILTIN_BOOLEAN_METHOD_LOOKUP);
export const BUILTIN_BOOLEAN_METHODS_SYMBOLS = Object.values(BUILTIN_BOOLEAN_METHOD_LOOKUP);
export const BUILTIN_FUNCTION_PROTOTYPE = '$FunctionPrototype';
export const BUILTIN_FUNCTION_METHOD_LOOKUP = {
  apply: '$Function_apply',
  call: '$Function_call',
};
export const BUILTIN_FUNCTION_METHOD_LOOKUP_REV = Object.keys(BUILTIN_FUNCTION_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_FUNCTION_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_FUNCTION_METHODS_SUPPORTED = Object.keys(BUILTIN_FUNCTION_METHOD_LOOKUP);
export const BUILTIN_FUNCTION_METHODS_SYMBOLS = Object.values(BUILTIN_FUNCTION_METHOD_LOOKUP);
export const BUILTIN_NUMBER_PROTOTYPE = '$NumberPrototype';
export const BUILTIN_NUMBER_METHOD_LOOKUP = {
  toString: '$Number_toString',
};
export const BUILTIN_NUMBER_METHOD_LOOKUP_REV = Object.keys(BUILTIN_NUMBER_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_NUMBER_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_NUMBER_METHODS_SUPPORTED = Object.keys(BUILTIN_NUMBER_METHOD_LOOKUP);
export const BUILTIN_NUMBER_METHODS_SYMBOLS = Object.values(BUILTIN_NUMBER_METHOD_LOOKUP);
export const BUILTIN_OBJECT_PROTOTYPE = '$ObjectPrototype';
export const BUILTIN_REGEXP_PROTOTYPE = '$RegExpPrototype';
export const BUILTIN_REGEXP_METHOD_LOOKUP = {
  exec: '$RegExp_exec',
  match: '$RegExp_match',
  matchAll: '$RegExp_matchAll',
  replace: '$RegExp_replace',
  replaceAll: '$RegExp_replaceAll',
  search: '$RegExp_search',
  split: '$RegExp_split',
  test: '$RegExp_test',
};
export const BUILTIN_REGEXP_METHOD_LOOKUP_REV = Object.keys(BUILTIN_REGEXP_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_REGEXP_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_REGEXP_METHODS_SUPPORTED = Object.keys(BUILTIN_REGEXP_METHOD_LOOKUP);
export const BUILTIN_REGEXP_METHODS_SYMBOLS = Object.values(BUILTIN_REGEXP_METHOD_LOOKUP);
export const BUILTIN_STRING_PROTOTYPE = '$StringPrototype';
export const BUILTIN_STRING_METHOD_LOOKUP = {
  concat: '$String_concat',
  indexOf: '$String_indexOf',
  lastIndexOf: '$String_lastIndexOf',
  replace: '$String_replace',
  slice: '$String_slice',
  split: '$String_split',
  toString: '$String_toString',
};
export const BUILTIN_STRING_METHOD_LOOKUP_REV = Object.keys(BUILTIN_STRING_METHOD_LOOKUP).reduce((obj, key) => { obj[BUILTIN_STRING_METHOD_LOOKUP[key]] = key; return obj; }, {})
export const BUILTIN_STRING_METHODS_SUPPORTED = Object.keys(BUILTIN_STRING_METHOD_LOOKUP);
export const BUILTIN_STRING_METHODS_SYMBOLS = Object.values(BUILTIN_STRING_METHOD_LOOKUP);

export const KNOWN_IMPLICIT_GLOBALS = [
  BUILTIN_BOOLEAN_PROTOTYPE,
  BUILTIN_BOOLEAN_METHODS_SYMBOLS,
  BUILTIN_FUNCTION_PROTOTYPE,
  BUILTIN_FUNCTION_METHODS_SYMBOLS,
  BUILTIN_NUMBER_PROTOTYPE,
  BUILTIN_NUMBER_METHODS_SYMBOLS,
  BUILTIN_OBJECT_PROTOTYPE,
  BUILTIN_REGEXP_METHODS_SYMBOLS,
  BUILTIN_STRING_PROTOTYPE,
  BUILTIN_STRING_METHODS_SYMBOLS,
].flat(Infinity);
export const BUILTIN_PROTO_TO_LOOKUP = {
  [BUILTIN_BOOLEAN_PROTOTYPE]: BUILTIN_BOOLEAN_METHOD_LOOKUP,
  [BUILTIN_FUNCTION_PROTOTYPE]: BUILTIN_FUNCTION_METHOD_LOOKUP,
  [BUILTIN_NUMBER_PROTOTYPE]: BUILTIN_NUMBER_METHOD_LOOKUP,
  //[BUILTIN_OBJECT_PROTOTYPE]: BUILTIN_OBJECT_METHOD_LOOKUP,
  //[BUILTIN_REGEXP_PROTOTYPE]: BUILTIN_REGEXP_METHOD_LOOKUP,
  [BUILTIN_STRING_PROTOTYPE]: BUILTIN_STRING_METHOD_LOOKUP,
  //[BUILTIN_BOOLEAN_PROTOTYPE]: BUILTIN_BOOLEAN_METHOD_LOOKUP,
  [BUILTIN_ARRAY_PROTOTYPE]: BUILTIN_ARRAY_METHOD_LOOKUP,
  //[BUILTIN_MAP_PROTOTYPE]: BUILTIN_MAP_METHOD_LOOKUP,
  //[BUILTIN_SET_PROTOTYPE]: BUILTIN_SET_METHOD_LOOKUP,
}

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
