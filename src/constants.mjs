export let VERBOSE_TRACING = true;

export function setVerboseTracing(bool) {
  VERBOSE_TRACING = !!bool;
}

export const ASSUME_BUILTINS = true; // Put any rules that assert the internals of JS (prototype) that exist are not changed under this flag.

export const DCE_ERROR_MSG = '[Preval]: Can not reach here';
export const ERR_MSG_ILLEGAL_ARRAY_SPREAD = '[Preval]: Array spread must crash before this line';
export const ERR_MSG_ILLEGAL_CALLEE = '[Preval]: Call expression with illegal callee must crash before this line ';

export const ALIAS_PREFIX = 'tmpPrevalAlias';
export const THIS_ALIAS_BASE_NAME = ALIAS_PREFIX + 'This'; // 'tmpThis' 'tmpPrevalAliasThis'
export const ARGUMENTS_ALIAS_PREFIX = ALIAS_PREFIX + 'Arguments'; // 'tmpArguments' 'tmpPrevalAliasArguments'
export const ARGUMENTS_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Any'; // 'tmpArgumentsAny' 'tmpPrevalAliasArgumentsAny'
export const ARGLENGTH_ALIAS_BASE_NAME = ARGUMENTS_ALIAS_PREFIX + 'Len'; // 'tmpArgumentsLen' 'tmpPrevalAliasArgumentsLen'; `arguments.length`, which is easier than just `arguments`
export const IMPLICIT_GLOBAL_PREFIX = '$prevalImplicit$';

export const BUILTIN_REST_HANDLER_NAME = 'objPatternRest'; // should be in globals
export const BUILTIN_FUNC_CALL_NAME = '$dotCall'; // syntactic clue that this was an actual method call before, not arbitrary .call method

export const BUILTIN_ARRAY_PROTOTYPE = '$ArrayPrototype';
export const BUILTIN_FUNCTION_PROTOTYPE = '$FunctionPrototype';
export const BUILTIN_FUNCTION_APPLY = '$FunctionApply';
export const BUILTIN_FUNCTION_CALL = '$FunctionCall';
export const BUILTIN_NUMBER_PROTOTYPE = '$NumberPrototype';
export const BUILTIN_OBJECT_PROTOTYPE = '$ObjectPrototype';
export const BUILTIN_REGEXP_TEST = '$RegExpTest';
export const BUILTIN_STRING_PROTOTYPE = '$StringPrototype';

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
export const BLUE = colorLess ? '' : '\x1b[34;1m';
export const PURPLE = colorLess ? '' : '\x1b[35;1m';
export const WHITE = colorLess ? '' : '\x1b[37m';
export const RESET = colorLess ? '' : '\x1b[0m';
export const DIM = colorLess ? '' : '\x1b[30;1m';
export const BOLD = colorLess ? '' : '\x1b[;1;1m';
export const TRIBE = colorLess ? '' : '\x1b[36;1m';
export const WHITE_BLACK = colorLess ? '' : '\x1b[30;47m';
