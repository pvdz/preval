// tenko v1.1.1



// <perf>
let IGNORE = {};
// </perf>

// <charcodes>

// </charcodes>

// <utils>
function inspect(...args) {
console.dir(((args.length === 1)? args[0] : args), {depth:null});
}
function THROW(str, ...rest) {
throw new Error(`Parser error! ${str} ${(rest.length? rest : '')}`);
}
// </utils>

// <tokentype>
let __$flag_leaf = 0;
let __$flag_group = 7;
let ALL_GEES;
let KEYWORD_TRIE_OBJLIT = {0:{17:{6:{20:{12:{4:{13:{19:{18:{hit:2072, canon:'arguments'}}}}}}}}, 18:{24:{13:{2:{hit:2074, canon:'async'}}}, hit:2073, canon:'as'}, 22:{0:{8:{19:{hit:2075, canon:'await'}}}}}, 1:{17:{4:{0:{10:{hit:2076, canon:'break'}}}}}, 2:{0:{18:{4:{hit:2077, canon:'case'}}, 19:{2:{7:{hit:2078, canon:'catch'}}}}, 11:{0:{18:{18:{hit:2079, canon:'class'}}}}, 14:{13:{18:{19:{hit:2080, canon:'const'}}, 19:{8:{13:{20:{4:{hit:2081, canon:'continue'}}}}}}}}, 3:{4:{1:{20:{6:{6:{4:{17:{hit:2082, canon:'debugger'}}}}}}, 5:{0:{20:{11:{19:{hit:2083, canon:'default'}}}}}, 11:{4:{19:{4:{hit:2084, canon:'delete'}}}}}, 14:{hit:2085, canon:'do'}}, 4:{11:{18:{4:{hit:2086, canon:'else'}}}, 13:{20:{12:{hit:2087, canon:'enum'}}}, 21:{0:{11:{hit:2088, canon:'eval'}}}, 23:{15:{14:{17:{19:{hit:2089, canon:'export'}}}}, 19:{4:{13:{3:{18:{hit:2090, canon:'extends'}}}}}}}, 5:{0:{11:{18:{4:{hit:2091, canon:'false'}}}}, 8:{13:{0:{11:{11:{24:{hit:2092, canon:'finally'}}}}}}, 14:{17:{hit:2093, canon:'for'}}, 17:{14:{12:{hit:2094, canon:'from'}}}, 20:{13:{2:{19:{8:{14:{13:{hit:2095, canon:'function'}}}}}}}}, 6:{4:{19:{hit:2096, canon:'get'}}}, 8:{5:{hit:2097, canon:'if'}, 12:{15:{11:{4:{12:{4:{13:{19:{18:{hit:2098, canon:'implements'}}}}}}}, 14:{17:{19:{hit:2099, canon:'import'}}}}}, 13:{18:{19:{0:{13:{2:{4:{14:{5:{hit:67637, canon:'instanceof'}}}}}}}}, 19:{4:{17:{5:{0:{2:{4:{hit:2102, canon:'interface'}}}}}}}, hit:67636, canon:'in'}}, 11:{4:{19:{hit:2103, canon:'let'}}}, 13:{4:{22:{hit:2104, canon:'new'}}, 20:{11:{11:{hit:2105, canon:'null'}}}}, 14:{5:{hit:2106, canon:'of'}}, 15:{0:{2:{10:{0:{6:{4:{hit:2107, canon:'package'}}}}}}, 17:{8:{21:{0:{19:{4:{hit:2108, canon:'private'}}}}}, 14:{19:{4:{2:{19:{4:{3:{hit:2109, canon:'protected'}}}}}}}}, 20:{1:{11:{8:{2:{hit:2110, canon:'public'}}}}}}, 17:{4:{19:{20:{17:{13:{hit:2111, canon:'return'}}}}}}, 18:{4:{19:{hit:2112, canon:'set'}}, 19:{0:{19:{8:{2:{hit:2113, canon:'static'}}}}}, 20:{15:{4:{17:{hit:2114, canon:'super'}}}}, 22:{8:{19:{2:{7:{hit:2115, canon:'switch'}}}}}}, 19:{0:{17:{6:{4:{19:{hit:2116, canon:'target'}}}}}, 7:{8:{18:{hit:2117, canon:'this'}}, 17:{14:{22:{hit:2118, canon:'throw'}}}}, 17:{20:{4:{hit:2119, canon:'true'}}, 24:{hit:2120, canon:'try'}}, 24:{15:{4:{14:{5:{hit:2121, canon:'typeof'}}}}}}, 21:{0:{17:{hit:2122, canon:'var'}}, 14:{8:{3:{hit:2123, canon:'void'}}}}, 22:{7:{8:{11:{4:{hit:2124, canon:'while'}}}}, 8:{19:{7:{hit:2125, canon:'with'}}}}, 24:{8:{4:{11:{3:{hit:2126, canon:'yield'}}}}}};
function isWhiteToken(type) {
return (type & 256) === 256;
}
function isNewlineToken(type) {
return (type & 512) === 512;
}
function isCommentToken(type) {
return (type & 1024) === 1024;
}
function isIdentToken(type) {
return (type & 2048) === 2048;
}
function isNumberToken(type) {
return (type & 4096) === 4096;
}
function isBigintToken(type) {
return (type & 8192) === 8192;
}
function isStringToken(type) {
return (type & 131072) === 131072;
}
function isPunctuatorToken(type) {
return (type & 16384) === 16384;
}
function isRegexToken(type) {
return (type & 262144) === 262144;
}
function isTickToken(type) {
return (type & 524288) === 524288;
}
function isBadTickToken(type) {
return (type & 1048576) === 1048576;
}
function isNumberStringToken(type) {
return (type & 135168) !== 0;
}
function isNumberStringRegex(type) {
return (type & 397312) !== 0;
}
function toktypeToString(type) {
switch ((((typeof type) === 'object')? type.type : type)) {
case 0:
return 'UNTYPED';
case 257:
return 'SPACE';
case 258:
return 'TAB';
case 771:
return 'NL_SOLO';
case 772:
return 'NL_CRLF';
case 1285:
return 'COMMENT_SINGLE';
case 1286:
return 'COMMENT_MULTI';
case 1287:
return 'COMMENT_HTML';
case 2048:
return 'IDENT';
case 2072:
return 'ID_arguments';
case 2073:
return 'ID_as';
case 2074:
return 'ID_async';
case 2075:
return 'ID_await';
case 2076:
return 'ID_break';
case 2077:
return 'ID_case';
case 2078:
return 'ID_catch';
case 2079:
return 'ID_class';
case 2080:
return 'ID_const';
case 2081:
return 'ID_continue';
case 2082:
return 'ID_debugger';
case 2083:
return 'ID_default';
case 2084:
return 'ID_delete';
case 2085:
return 'ID_do';
case 2086:
return 'ID_else';
case 2087:
return 'ID_enum';
case 2088:
return 'ID_eval';
case 2089:
return 'ID_export';
case 2090:
return 'ID_extends';
case 2091:
return 'ID_false';
case 2092:
return 'ID_finally';
case 2093:
return 'ID_for';
case 2094:
return 'ID_from';
case 2095:
return 'ID_function';
case 2096:
return 'ID_get';
case 2097:
return 'ID_if';
case 2098:
return 'ID_implements';
case 2099:
return 'ID_import';
case 67636:
return 'ID_in';
case 67637:
return 'ID_instanceof';
case 2102:
return 'ID_interface';
case 2103:
return 'ID_let';
case 2104:
return 'ID_new';
case 2105:
return 'ID_null';
case 2106:
return 'ID_of';
case 2107:
return 'ID_package';
case 2108:
return 'ID_private';
case 2109:
return 'ID_protected';
case 2110:
return 'ID_public';
case 2111:
return 'ID_return';
case 2112:
return 'ID_set';
case 2113:
return 'ID_static';
case 2114:
return 'ID_super';
case 2115:
return 'ID_switch';
case 2116:
return 'ID_target';
case 2117:
return 'ID_this';
case 2118:
return 'ID_throw';
case 2119:
return 'ID_true';
case 2120:
return 'ID_try';
case 2121:
return 'ID_typeof';
case 2122:
return 'ID_var';
case 2123:
return 'ID_void';
case 2124:
return 'ID_while';
case 2125:
return 'ID_with';
case 2126:
return 'ID_yield';
case 4104:
return 'NUMBER_HEX';
case 4105:
return 'NUMBER_DEC';
case 4106:
return 'NUMBER_BIN';
case 4107:
return 'NUMBER_OCT';
case 4108:
return 'NUMBER_OLD';
case 12296:
return 'NUMBER_BIG_HEX';
case 12297:
return 'NUMBER_BIG_DEC';
case 12298:
return 'NUMBER_BIG_BIN';
case 12299:
return 'NUMBER_BIG_OCT';
case 16463:
return 'PUNC_EXCL';
case 82000:
return 'PUNC_EXCL_EQ';
case 82001:
return 'PUNC_EXCL_EQ_EQ';
case 82002:
return 'PUNC_PERCENT';
case 49235:
return 'PUNC_PERCENT_EQ';
case 82004:
return 'PUNC_AND';
case 82005:
return 'PUNC_AND_AND';
case 49238:
return 'PUNC_AND_EQ';
case 16471:
return 'PUNC_PAREN_OPEN';
case 16472:
return 'PUNC_PAREN_CLOSE';
case 82009:
return 'PUNC_STAR';
case 82010:
return 'PUNC_STAR_STAR';
case 49243:
return 'PUNC_STAR_EQ';
case 49244:
return 'PUNC_STAR_STAR_EQ';
case 82013:
return 'PUNC_PLUS';
case 16478:
return 'PUNC_PLUS_PLUS';
case 49247:
return 'PUNC_PLUS_EQ';
case 16480:
return 'PUNC_COMMA';
case 82017:
return 'PUNC_MIN';
case 16482:
return 'PUNC_MIN_MIN';
case 49251:
return 'PUNC_MIN_EQ';
case 16484:
return 'PUNC_MIN_MIN_GT';
case 16485:
return 'PUNC_DOT';
case 16486:
return 'PUNC_DOT_DOT_DOT';
case 82023:
return 'PUNC_DIV';
case 49256:
return 'PUNC_DIV_EQ';
case 16489:
return 'PUNC_COLON';
case 16490:
return 'PUNC_SEMI';
case 82027:
return 'PUNC_LT';
case 82028:
return 'PUNC_LT_LT';
case 82029:
return 'PUNC_LT_EQ';
case 49262:
return 'PUNC_LT_LT_EQ';
case 16495:
return 'PUNC_LT_EXCL_MIN_MIN';
case 49264:
return 'PUNC_EQ';
case 82033:
return 'PUNC_EQ_EQ';
case 82034:
return 'PUNC_EQ_EQ_EQ';
case 16499:
return 'PUNC_EQ_GT';
case 82036:
return 'PUNC_GT';
case 82037:
return 'PUNC_GT_GT';
case 82038:
return 'PUNC_GT_GT_GT';
case 82039:
return 'PUNC_GT_EQ';
case 49272:
return 'PUNC_GT_GT_EQ';
case 49273:
return 'PUNC_GT_GT_GT_EQ';
case 16506:
return 'PUNC_QMARK';
case 82043:
return 'QMARK_DOT';
case 82044:
return 'QMARK_QMARK';
case 16509:
return 'PUNC_BRACKET_OPEN';
case 16510:
return 'PUNC_BRACKET_CLOSE';
case 82047:
return 'PUNC_CARET';
case 49280:
return 'PUNC_CARET_EQ';
case 16513:
return 'PUNC_CURLY_OPEN';
case 82050:
return 'PUNC_OR';
case 82051:
return 'PUNC_OR_OR';
case 49284:
return 'PUNC_OR_EQ';
case 16517:
return 'PUNC_CURLY_CLOSE';
case 16518:
return 'PUNC_TILDE';
case 262157:
return 'REGEXN';
case 262158:
return 'REGEXU';
case 131087:
return 'STRING_SINGLE';
case 131088:
return 'STRING_DOUBLE';
case 524305:
return 'TICK_HEAD';
case 524306:
return 'TICK_BODY';
case 524307:
return 'TICK_TAIL';
case 524308:
return 'TICK_PURE';
case 1572881:
return 'TICK_BAD_HEAD';
case 1572882:
return 'TICK_BAD_BODY';
case 1572883:
return 'TICK_BAD_TAIL';
case 1572884:
return 'TICK_BAD_PURE';
case 2097173:
return 'EOF';
case 2097174:
return 'ASI';
case 2097175:
return 'ERROR';
}
throw new Error(('toktypeToString: UNKNOWN[' + JSON.stringify(type)) + ']');
}
let MAX_START_VALUE = 26;
let __$flag_start = 0;
let tokenStartJumpTable = [26, 26, 26, 26, 26, 26, 26, 26, 26, 1, 4, 1, 1, 5, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 1, 16, 6, 26, 2, 17, 18, 6, 16471, 16472, 19, 12, 16480, 13, 8, 11, 14, 7, 7, 7, 7, 7, 7, 7, 7, 7, 16489, 16490, 21, 10, 22, 25, 26, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 16509, 24, 16510, 20, 2, 15, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 2, 3, 2, 16513, 23, 9, 16518];
let stringScanTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let identScanTable = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1];
let regexAtomEscapeStartJumpTable = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 1, 1, 1, 1, 1, 0, 1, 11, 11, 11, 0, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 6, 11, 11, 0, 11, 11, 11, 0, 11, 11, 11, 0, 0, 0, 0, 11, 1, 11, 11, 5, 0, 11, 0, 11, 11, 11, 11, 9, 11, 11, 0, 11, 6, 11, 0, 0, 0, 2, 0, 0, 3, 11, 11, 0, 0, 0, 1];
let regexClassEscapeStartJumpTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 18, 18, 18, 18, 0, 19, 18, 18, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 0, 0, 0, 0, 0, 18, 0, 0, 7, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 13, 0, 0, 0, 13, 0, 0, 0, 18, 18, 18, 18, 0, 0, 0, 6, 4, 13, 0, 8, 0, 0, 0, 0, 5, 0, 0, 9, 0, 14, 0, 10, 13, 11, 2, 12, 13, 3, 0, 0, 18, 18, 18, 0];
let hexValueJumpTable = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 16, 16, 16, 16, 16, 16, 10, 11, 12, 13, 14, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 10, 11, 12, 13, 14, 15];
let regexAtomJumpTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 3, 4, 2, 2, 0, 0, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 6, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 14, 13, 0];
let stringEscapeStartJumpTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 8, 0, 7, 4, 15, 0, 5, 0, 0, 0, 0, 0, 0];
function getTokenStart(c) {
let s = tokenStartJumpTable[c];
return s;
}
function getStringPart(c) {
if (c > 0x7e) return 3;
let s = stringScanTable[c];
return s;
}
function getIdentPart(c) {
if (c > 0x7e) return 3;
let s = identScanTable[c];
return s;
}
function getHexValue(c) {
if (c > 0x66) return 16;
let v = hexValueJumpTable[c];
return v;
}
function T(type) {
return ('T<' + toktypeToString(type)) + '>';
}
// </tokentype>

// <lexerflags>
let __$flag_lf = 0;
function L(flags) {
let bak = flags;
let s = [];
if (!flags) {
s.push('LF_NO_FLAGS');
}
if (flags & 8192) {
flags ^= 8192;
s.push('LF_STRICT_MODE');
}
if (flags & 4) {
flags ^= 4;
s.push('LF_FOR_REGEX');
}
if (flags & 2048) {
flags ^= 2048;
s.push('LF_IN_TEMPLATE');
}
if (flags & 8) {
flags ^= 8;
s.push('LF_IN_ASYNC');
}
if (flags & 128) {
flags ^= 128;
s.push('LF_IN_GENERATOR');
}
if (flags & 16) {
flags ^= 16;
s.push('LF_IN_CONSTRUCTOR');
}
if (flags & 64) {
flags ^= 64;
s.push('LF_IN_FUNC_ARGS');
}
if (flags & 256) {
flags ^= 256;
s.push('LF_IN_GLOBAL');
}
if (flags & 512) {
flags ^= 512;
s.push('LF_IN_ITERATION');
}
if (flags & 1024) {
flags ^= 1024;
s.push('LF_IN_SWITCH');
}
if (flags & 2) {
flags ^= 2;
s.push('LF_CAN_NEW_DOT_TARGET');
}
if (flags & 32) {
flags ^= 32;
s.push('LF_IN_FOR_LHS');
}
if (flags & 4096) {
flags ^= 4096;
s.push('LF_NO_ASI');
}
if (flags & 16384) {
flags ^= 16384;
s.push('LF_SUPER_CALL');
}
if (flags & 32768) {
flags ^= 32768;
s.push('LF_SUPER_PROP');
}
if (flags & 65536) {
flags ^= 65536;
s.push('LF_NOT_KEYWORD');
}
if (flags) {
throw new Error(((((('UNKNOWN_FLAGS: ' + flags.toString(2)) + ' (was: ') + bak.toString(2)) + '), so far: [') + s.join('|')) + ']');
}
return 'L:' + s.join('|');
}
// </lexerflags>

// <enum_lexer>
const GOAL_MODULE = true;
const GOAL_SCRIPT = false;
const COLLECT_TOKENS_NONE = 0;
const COLLECT_TOKENS_SOLID = 1;
const COLLECT_TOKENS_ALL = 2;
const COLLECT_TOKENS_TYPES = 3;
const WEB_COMPAT_OFF = false;
const WEB_COMPAT_ON = true;
// </enum_lexer>

// <enum_parser>
const VERSION_EXPONENTIATION = 7;
const VERSION_WHATEVER = Infinity;
let BINDING_TYPE_NONE = 0;
let BINDING_TYPE_ARG = 1;
let BINDING_TYPE_VAR = 2;
let BINDING_TYPE_FUNC_VAR = 3;
let BINDING_TYPE_FUNC_STMT = 4;
let BINDING_TYPE_FUNC_LEX = 5;
let BINDING_TYPE_LET = 6;
let BINDING_TYPE_CONST = 7;
let BINDING_TYPE_CLASS = 8;
let BINDING_TYPE_CATCH_IDENT = 9;
let BINDING_TYPE_CATCH_OTHER = 10;
let HAS_NO_BINDINGS = null;
let SCOPE_LAYER_GLOBAL = 0;
let SCOPE_LAYER_FOR_HEADER = 1;
let SCOPE_LAYER_BLOCK = 2;
let SCOPE_LAYER_FUNC_PARAMS = 3;
let SCOPE_LAYER_CATCH_HEAD = 5;
let SCOPE_LAYER_CATCH_BODY = 6;
let SCOPE_LAYER_FINALLY = 7;
let SCOPE_LAYER_SWITCH = 8;
let SCOPE_LAYER_FUNC_ROOT = 9;
let SCOPE_LAYER_FUNC_BODY = 10;
let SCOPE_LAYER_ARROW_PARAMS = 11;
let SCOPE_LAYER_FAKE_BLOCK = 12;
function DEVONLY() {
let dev = false;
return dev;
}
function copyPiggies(output, input) {
return output | (input & 1984);
}
function P(f, arr) {
if (f & 256) {
arr.push('PIGGY_BACK_WAS_CONSTRUCTOR');
f ^= 256;
}
if (f & 512) {
arr.push('PIGGY_BACK_WAS_PROTO');
f ^= 512;
}
if (f & 64) {
arr.push('PIGGY_BACK_SAW_AWAIT');
f ^= 64;
}
if (f & 128) {
arr.push('PIGGY_BACK_SAW_YIELD');
f ^= 128;
}
if (f & 1024) {
arr.push('PIGGY_BACK_WAS_ARROW');
f ^= 1024;
}
return f;
}
// </enum_parser>

// <lexer>
const TABLE_NONBIN_UNI_PROPS = ',General_Category,gc,Script,sc,Script_Extensions,scx,';
const TABLE_BIN_UNI_PROPS = ',ASCII,ASCII_Hex_Digit,AHex,Alphabetic,Alpha,Any,Assigned,Bidi_Control,Bidi_C,Bidi_Mirrored,Bidi_M,Case_Ignorable,CI,Cased,Changes_When_Casefolded,CWCF,Changes_When_Casemapped,CWCM,Changes_When_Lowercased,CWL,Changes_When_NFKC_Casefolded,CWKCF,Changes_When_Titlecased,CWT,Changes_When_Uppercased,CWU,Dash,Default_Ignorable_Code_Point,DI,Deprecated,Dep,Diacritic,Dia,Emoji,Emoji_Component,Emoji_Modifier,Emoji_Modifier_Base,Emoji_Presentation,Extended_Pictographic,Extender,Ext,Grapheme_Base,Gr_Base,Grapheme_Extend,Gr_Ext,Hex_Digit,Hex,IDS_Binary_Operator,IDSB,IDS_Trinary_Operator,IDST,ID_Continue,IDC,ID_Start,IDS,Ideographic,Ideo,Join_Control,Join_C,Logical_Order_Exception,LOE,Lowercase,Lower,Math,Noncharacter_Code_Point,NChar,Pattern_Syntax,Pat_Syn,Pattern_White_Space,Pat_WS,Quotation_Mark,QMark,Radical,Regional_Indicator,RI,Sentence_Terminal,STerm,Soft_Dotted,SD,Terminal_Punctuation,Term,Unified_Ideograph,UIdeo,Uppercase,Upper,Variation_Selector,VS,White_Space,space,XID_Continue,XIDC,XID_Start,XIDS,';
const TABLE_GEN_CAT_VALUES = ',Cased_Letter,LC,Close_Punctuation,Pe,Connector_Punctuation,Pc,Control,Cc,cntrl,Currency_Symbol,Sc,Dash_Punctuation,Pd,Decimal_Number,Nd,digit,Enclosing_Mark,Me,Final_Punctuation,Pf,Format,Cf,Initial_Punctuation,Pi,Letter,L,Letter_Number,Nl,Line_Separator,Zl,Lowercase_Letter,Ll,Mark,M,Combining_Mark,Math_Symbol,Sm,Modifier_Letter,Lm,Modifier_Symbol,Sk,Nonspacing_Mark,Mn,Number,N,Open_Punctuation,Ps,Other,C,Other_Letter,Lo,Other_Number,No,Other_Punctuation,Po,Other_Symbol,So,Paragraph_Separator,Zp,Private_Use,Co,Punctuation,P,punct,Separator,Z,Space_Separator,Zs,Spacing_Mark,Mc,Surrogate,Cs,Symbol,S,Titlecase_Letter,Lt,Unassigned,Cn,Uppercase_Letter,Lu,';
const TABLE_SCRIPT_VALUES = ',Adlam,Adlm,Ahom,Anatolian_Hieroglyphs,Hluw,Arabic,Arab,Armenian,Armn,Avestan,Avst,Balinese,Bali,Bamum,Bamu,Bassa_Vah,Bass,Batak,Batk,Bengali,Beng,Bhaiksuki,Bhks,Bopomofo,Bopo,Brahmi,Brah,Braille,Brai,Buginese,Bugi,Buhid,Buhd,Canadian_Aboriginal,Cans,Carian,Cari,Caucasian_Albanian,Aghb,Chakma,Cakm,Cham,Cherokee,Cher,Common,Zyyy,Coptic,Copt,Qaac,Cuneiform,Xsux,Cypriot,Cprt,Cyrillic,Cyrl,Deseret,Dsrt,Devanagari,Deva,Dogra,Dogr,Duployan,Dupl,Egyptian_Hieroglyphs,Egyp,Elbasan,Elba,Elymaic,Elym,Ethiopic,Ethi,Georgian,Geor,Glagolitic,Glag,Gothic,Goth,Grantha,Gran,Greek,Grek,Gujarati,Gujr,Gunjala_Gondi,Gong,Gurmukhi,Guru,Han,Hani,Hangul,Hang,Hanifi_Rohingya,Rohg,Hanunoo,Hano,Hatran,Hatr,Hebrew,Hebr,Hiragana,Hira,Imperial_Aramaic,Armi,Inherited,Zinh,Qaai,Inscriptional_Pahlavi,Phli,Inscriptional_Parthian,Prti,Javanese,Java,Kaithi,Kthi,Kannada,Knda,Katakana,Kana,Kayah_Li,Kali,Kharoshthi,Khar,Khmer,Khmr,Khojki,Khoj,Khudawadi,Sind,Lao,Laoo,Latin,Latn,Lepcha,Lepc,Limbu,Limb,Linear_A,Lina,Linear_B,Linb,Lisu,Lycian,Lyci,Lydian,Lydi,Mahajani,Mahj,Makasar,Maka,Malayalam,Mlym,Mandaic,Mand,Manichaean,Mani,Marchen,Marc,Medefaidrin,Medf,Masaram_Gondi,Gonm,Meetei_Mayek,Mtei,Mende_Kikakui,Mend,Meroitic_Cursive,Merc,Meroitic_Hieroglyphs,Mero,Miao,Plrd,Modi,Mongolian,Mong,Mro,Mroo,Multani,Mult,Myanmar,Mymr,Nabataean,Nbat,Nandinagari,Nand,New_Tai_Lue,Talu,Newa,Nko,Nkoo,Nushu,Nshu,Nyiakeng_Puachue_Hmong,Hmnp,Ogham,Ogam,Ol_Chiki,Olck,Old_Hungarian,Hung,Old_Italic,Ital,Old_North_Arabian,Narb,Old_Permic,Perm,Old_Persian,Xpeo,Old_Sogdian,Sogo,Old_South_Arabian,Sarb,Old_Turkic,Orkh,Oriya,Orya,Osage,Osge,Osmanya,Osma,Pahawh_Hmong,Hmng,Palmyrene,Palm,Pau_Cin_Hau,Pauc,Phags_Pa,Phag,Phoenician,Phnx,Psalter_Pahlavi,Phlp,Rejang,Rjng,Runic,Runr,Samaritan,Samr,Saurashtra,Saur,Sharada,Shrd,Shavian,Shaw,Siddham,Sidd,SignWriting,Sgnw,Sinhala,Sinh,Sogdian,Sogd,Sora_Sompeng,Sora,Soyombo,Soyo,Sundanese,Sund,Syloti_Nagri,Sylo,Syriac,Syrc,Tagalog,Tglg,Tagbanwa,Tagb,Tai_Le,Tale,Tai_Tham,Lana,Tai_Viet,Tavt,Takri,Takr,Tamil,Taml,Tangut,Tang,Telugu,Telu,Thaana,Thaa,Thai,Tibetan,Tibt,Tifinagh,Tfng,Tirhuta,Tirh,Ugaritic,Ugar,Vai,Vaii,Wancho,Wcho,Warang_Citi,Wara,Yi,Yiii,Zanabazar_Square,Zanb,';
let ID_START_REGEX = undefined;
function getIdStartRegexSuperSlow() {
if (ID_START_REGEX) return ID_START_REGEX;
return ID_START_REGEX = createUnicodeRegex('^\\p{ID_Start}$');
}
let ID_CONTINUE_REGEX = undefined;
function getIdRestRegexSuperSlow() {
if (ID_CONTINUE_REGEX) return ID_CONTINUE_REGEX;
return ID_CONTINUE_REGEX = createUnicodeRegex('^\\p{ID_Continue}$');
}
function createUnicodeRegex(pattern) {
try {
return new RegExp(pattern, 'u');
} catch (e) {
console.warn(('Tenko: Current nodejs version does not suppport unicode regexes or regex property escapes; Input contains unicode that requires it so Tenko is unable to properly parse input (' + e.message) + ')');
return /|/;
}
}
function Lexer(input, options) {
const {targetEsVersion = Infinity, parsingGoal = true, collectTokens = 0, returnTokens = 3, webCompat = true, gracefulErrors = false, tokenStorageExternal, babelTokenCompat = false, errorCodeFrame = true, truncCodeFrame = false, $log = console.log, $warn = console.warn, $error = console.error} = options;
const tokenStorage = (tokenStorageExternal || (((collectTokens !== 0)? [] : undefined)));
const supportRegexPropertyEscapes = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
const supportRegexLookbehinds = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
const supportRegexDotallFlag = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
const supportRegexNamedGroups = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
const supportBigInt = ((targetEsVersion === 11) || (targetEsVersion === Infinity));
const supportNullishCoalescing = ((targetEsVersion === 11) || (targetEsVersion === Infinity));
const supportOptionalChaining = ((targetEsVersion === 11) || (targetEsVersion === Infinity));
let pointer = 0;
let len = input.length;
let consumedNewlinesBeforeSolid = false;
let nlwas = false;
let finished = false;
let lastOffset = pointer;
let startForError = 0;
let lastType = 0;
let lastStart = 0;
let lastStop = 0;
let lastLine = 0;
let lastColumn = 0;
let lastCanonizedInput = '';
let lastCanonizedInputLen = 0;
let lastPotentialRegexError = '';
let lastReportableLexerError = '';
let currentLine = 1;
let currentColOffset = 0;
let prevTokenEndColumn = 0;
let prevTokenEndLine = 0;
let prevTokenEndPointer = 0;
let prevTokenSolid = true;
let stale = false;
let cache = input.charCodeAt(0);
let anyTokenCount = 0;
let solidTokenCount = 0;
function peek() {
return cache;
}
function _readCache() {
return cache;
}
function peekd(delta) {
return input.charCodeAt(pointer + delta);
}
function peeky(ord) {
return cache === ord;
}
function slice(from, to) {
return input.slice(from, to);
}
function skipPeek() {
return cache = input.charCodeAt(++pointer);
}
function skip() {
let p = ++pointer;
if (pointer >= len) {
cache = 0;
return;
}
cache = input.charCodeAt(p);
}
function skipFastWithoutUpdatingCache() {
++pointer;
}
function eof() {
return pointer >= len;
}
function eofd(d) {
return pointer >= (len - d);
}
function neof() {
return pointer < len;
}
function neofd(d) {
return pointer <= (len - d);
}
function nextToken(lexerFlags) {
if (prevTokenSolid) {
prevTokenEndColumn = pointer - currentColOffset;
prevTokenEndLine = currentLine;
prevTokenEndPointer = pointer;
prevTokenSolid = false;
}
lastPotentialRegexError = '';
lastReportableLexerError = '';
do {
++anyTokenCount;
let startCol = pointer - currentColOffset;
let startRow = currentLine;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
nlwas = consumedNewlinesBeforeSolid;
if (pointer >= len) {
createToken(2097173, pointer, pointer, startCol, startRow);
finished = true;
return returnSolidToken(2097173, pointer, pointer, startCol, startRow);
}
let start = startForError = pointer;
let consumedTokenType = jumpTableLexer(lexerFlags);
if (!isWhiteToken(consumedTokenType)) {
createToken(consumedTokenType, start, pointer, startCol, startRow);
return returnSolidToken(consumedTokenType, start, pointer, startCol, startRow);
}
if (isCommentToken(consumedTokenType)) {
if (returnTokens === 2) {
createToken(consumedTokenType, start, pointer, startCol, startRow);
return returnCommentToken(consumedTokenType, start, pointer, startCol, startRow);
}
}
if (((collectTokens === 2) || (collectTokens === 3))) {
createToken(consumedTokenType, start, pointer, startCol, startRow);
tokenStorage.push(((collectTokens === 3)? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, false)));
}
if (returnTokens === 1) {
return createToken(consumedTokenType, start, pointer, startCol, startRow);
}
if (consumedTokenType === 1285) {
if (((collectTokens !== 2) && (collectTokens !== 3))) skipNewlinesWithoutTokens();
}
if (nlwas === true) {
if (((collectTokens !== 2) && (collectTokens !== 3))) skipSpacesWithoutTokens();
}
} while (true);
}
function returnCommentToken(consumedTokenType, start, pointer, startCol, startRow) {
if (((collectTokens === 2) || (collectTokens === 3))) {
tokenStorage.push(((collectTokens === 3)? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, false)));
}
}
function returnSolidToken(consumedTokenType, start, pointer, startCol, startRow) {
++solidTokenCount;
if (collectTokens !== 0) {
tokenStorage.push(((collectTokens === 3)? consumedTokenType : createBaseToken(consumedTokenType, start, pointer, startCol, startRow, consumedNewlinesBeforeSolid)));
}
consumedNewlinesBeforeSolid = false;
prevTokenSolid = true;
}
function skipSpacesWithoutTokens() {
while (pointer < len) {
let c = cache;
if (((c !== 0x20) && (c !== 0x09))) return;
skip();
}
}
function skipNewlinesWithoutTokens() {
while (pointer < len) {
let c = cache;
if (c === 0x0A) {
skip();
incrementLine();
} else if (c === 0x0D) {
skip();
parseCR();
} else {
return;
}
}
}
function jumpTableLexer(lexerFlags) {
let c = cache;
skip();
if (c > 0x7e) {
return parseOtherUnicode(c);
}
let s = getTokenStart(c);
if (s > MAX_START_VALUE) {
return s;
}
switch (s) {
case 1:
return parseSpace();
case 2:
return parseIdentifierRest(String.fromCharCode(c), 1);
case 3:
if ((lexerFlags & 65536) === 65536) return parseIdentifierRest(String.fromCharCode(c), 1);
return parsePotentialKeywordTrieMap(c);
case 4:
return parseNewlineSolo();
case 5:
return parseCR();
case 6:
return parseAnyString(c, lexerFlags);
case 7:
return parseDecimal();
case 8:
return parseLeadingDot();
case 9:
if ((lexerFlags & 2048) === 2048) return parseTemplateString(lexerFlags, false);
return 16517;
case 10:
return parseEqual();
case 11:
return parseFwdSlash(lexerFlags);
case 12:
return parseSameOrCompound(0x2b);
case 13:
return parseDash();
case 14:
return parseLeadingZero(lexerFlags);
case 15:
return parseTemplateString(lexerFlags, true);
case 16:
return parseExcl();
case 17:
return parseCompoundAssignment(0x25);
case 18:
return parseSameOrCompound(0x26);
case 19:
return parseStar();
case 20:
return parseCompoundAssignment(0x5e);
case 21:
return parseLt();
case 22:
return parseGtPunctuator();
case 23:
return parseSameOrCompound(0x7c);
case 24:
return parseBackslash();
case 25:
return parseQmark();
}
THROW('Unknown input', pointer - 1, pointer);
}
function incrementLine() {
consumedNewlinesBeforeSolid = true;
++currentLine;
currentColOffset = pointer;
}
function addAsi() {
if (collectTokens !== 0) {
tokenStorage.push(((collectTokens === 3)? 2097174 : createBaseToken(2097174, pointer, pointer, pointer - currentColOffset, currentLine, false)), tokenStorage.pop());
}
++anyTokenCount;
++solidTokenCount;
prevTokenSolid = true;
}
function createToken(type, start, stop, column, line) {
lastType = type;
lastStart = start;
lastStop = stop;
lastLine = line;
lastColumn = column;
}
function createBaseToken(type, start, stop, column, line, nl) {
if (babelTokenCompat) {
return {type, start, stop, loc:{start:{line:line, column:column}, end:{line:currentLine, column:currentColOffset}}, column, line};
}
return {type, start, stop, column, line, nl};
}
function parseLeadingDot() {
if (pointer >= len) return 16485;
let c = cache;
if (c === 0x2e) {
return parseTripleDot();
}
if (isAsciiNumber(c)) {
return parseNumberFromDot(c);
}
return 16485;
}
function parseTripleDot() {
if (peekd(1) === 0x2e) {
skip();
skip();
return 16486;
}
return 16486;
}
function parseNumberFromDot(c) {
skip();
if (pointer < len) {
let d = skipDigits();
parseExponentMaybe(d);
}
verifyCharAfterNumber();
return 4105;
}
function parseSpace() {
return 257;
}
function parseCR() {
if ((pointer < len && (cache === 0x0A))) {
skip();
incrementLine();
return 772;
}
incrementLine();
return 771;
}
function parseAnyString(marker, lexerFlags) {
let pointerOffset = pointer;
let badEscape = false;
let hadNewline = false;
while (pointer < len) {
let c = cache;
let s = getStringPart(c);
if (s <= MAX_START_VALUE) {
switch (s) {
case 0:
skip();
break;
case 1:
skip();
if (c === marker) {
if (badEscape) {
if (!lastReportableLexerError) lastReportableLexerError = 'String had an illegal escape';
return 2097175;
}
if (hadNewline) {
if (!lastReportableLexerError) lastReportableLexerError = 'Encountered newline in string which is not allowed';
return 2097175;
}
lastCanonizedInput += slice(pointerOffset, pointer - 1);
lastCanonizedInputLen += (pointer - 1) - pointerOffset;
return ((marker === 0x22)? 131088 : 131087);
}
break;
case 2:
lastCanonizedInput += slice(pointerOffset, pointer);
lastCanonizedInputLen += pointer - pointerOffset;
badEscape = ((parseStringOrTemplateEscape(lexerFlags, false) === true) || badEscape);
pointerOffset = pointer;
break;
case 3:
skip();
if (((c <= 0x2029) && (c >= 0x2028))) {
incrementLine();
}
break;
case 4:
skip();
hadNewline = true;
break;
;
}
}
}
if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed string at EOF';
return 2097175;
}
function parseStringOrTemplateEscape(lexerFlags, forTemplate) {
skip();
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = 'Backslash at end of input';
return true;
}
let c = cache;
skip();
let s = ((c > 0x7e)? 6 : stringEscapeStartJumpTable[c]);
switch (s) {
case 0:
lastCanonizedInput += String.fromCharCode(c);
++lastCanonizedInputLen;
return false;
case 1:
lastCanonizedInput += '\n';
++lastCanonizedInputLen;
return false;
case 2:
lastCanonizedInput += '\'';
++lastCanonizedInputLen;
return false;
case 3:
lastCanonizedInput += '"';
++lastCanonizedInputLen;
return false;
case 4:
{
if (pointer >= len) return true;
let r = parseUnicodeEscapeForNonRegex();
if (r === 0x110000) return true;
lastCanonizedInput += ((r > 0xffff)? String.fromCodePoint(r) : String.fromCharCode(r));
lastCanonizedInputLen += ((r > 0xffff)? 2 : 1);
return false;
}
case 5:
return parseStringEscapeHex();
case 6:
if (((c === 0x2028) || (c === 0x2029))) {
incrementLine();
return false;
}
lastCanonizedInput += String.fromCharCode(c);
++lastCanonizedInputLen;
return false;
case 7:
lastCanonizedInput += '\t';
++lastCanonizedInputLen;
return false;
case 8:
lastCanonizedInput += '\r';
++lastCanonizedInputLen;
return false;
case 9:
if ((pointer < len && (cache === 0x0A))) skip();
incrementLine();
return false;
case 10:
incrementLine();
return false;
case 11:

case 12:
return parseStringEscapeOctalOrDigit(c, forTemplate, lexerFlags);
case 13:
lastCanonizedInput += '\b';
++lastCanonizedInputLen;
return false;
case 14:
lastCanonizedInput += '\f';
++lastCanonizedInputLen;
return false;
case 15:
lastCanonizedInput += '\v';
++lastCanonizedInputLen;
return false;
;
}
}
function skipZeroes() {
let c = cache;
while (c === 0x30) {
skip();
if (pointer >= len) return 0;
c = cache;
}
return c;
}
function parseStringEscapeHex() {
if (eofd(1)) {
if (pointer >= len) return false;
if (!lastReportableLexerError) lastReportableLexerError = 'Not enough of input left to create valid hex escape';
return true;
}
let a = cache;
let b = peekd(1);
let va = getHexValue(a);
let vb = getHexValue(b);
if ((va | vb) >= 16) {
lastCanonizedInput += 'x';
++lastCanonizedInputLen;
if (!lastReportableLexerError) lastReportableLexerError = 'At least one of the two hex characters were not hex character (0-9a-f)';
return true;
}
skip();
skip();
lastCanonizedInput += String.fromCharCode((va << 4) | vb);
++lastCanonizedInputLen;
return false;
}
function parseStringEscapeOctalOrDigit(a, forTemplate, lexerFlags) {
if (((a === 0x38) || (a === 0x39))) {
if (!lastReportableLexerError) lastReportableLexerError = 'The grammar does not allow to escape the 8 or the 9 character';
return true;
}
if (pointer >= len) return false;
let b = cache;
if (((((webCompat === false) || forTemplate)) || ((lexerFlags & 8192) === 8192))) {
if (((a === 0x30) && (((b < 0x30) || (b > 0x39))))) {
lastCanonizedInput += '\0';
++lastCanonizedInputLen;
return false;
}
if (forTemplate) {
if (!lastReportableLexerError) lastReportableLexerError = 'Illegal legacy octal escape in template, where octal escapes are never allowed';
} else if ((lexerFlags & 8192) === 8192) {
if (!lastReportableLexerError) lastReportableLexerError = 'Illegal legacy octal escape in strict mode';
} else {
if (!lastReportableLexerError) lastReportableLexerError = 'Octal escapes are only allowed in sloppy mode with web compat enabled';
}
return true;
}
if (((a === 0x30) && (((b < 0x30) || (b > 0x37))))) {
lastCanonizedInput += '\0';
++lastCanonizedInputLen;
return false;
}
if (((b < 0x30) || (b > 0x37))) {
lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a), 8));
++lastCanonizedInputLen;
return false;
}
skip();
if (pointer >= len) return false;
if (a > 0x33) {
lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b), 8));
++lastCanonizedInputLen;
return false;
}
let c = cache;
if (((c < 0x30) || (c > 0x37))) {
lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b), 8));
++lastCanonizedInputLen;
return false;
}
skip();
lastCanonizedInput += String.fromCharCode(parseInt(String.fromCharCode(a, b, c), 8));
++lastCanonizedInputLen;
return false;
}
function parseDash() {
if (((((((((parsingGoal === false) && (webCompat === true))) && (!eofd(1)))) && (cache === 0x2d))) && (peekd(1) === 0x3e))) {
if (consumedNewlinesBeforeSolid === true) {
return parseCommentHtmlClose();
} else {

}
}
return parseSameOrCompound(0x2d);
}
function parseSameOrCompound(c) {
if (pointer < len) {
let d = cache;
if (d === c) {
skip();
switch (c) {
case 0x2b:
return 16478;
case 0x2d:
return 16482;
case 0x26:
return 82005;
case 0x7c:
return 82051;
;
}
}
if (d === 0x3d) {
skip();
switch (c) {
case 0x2b:
return 49247;
case 0x2d:
return 49251;
case 0x26:
return 49238;
case 0x7c:
return 49284;
;
}
}
}
switch (c) {
case 0x2b:
return 82013;
case 0x2d:
return 82017;
case 0x26:
return 82004;
case 0x7c:
return 82050;
;
}
}
function parseTemplateString(lexerFlags, fromTick) {
lastOffset = pointer;
let badEscapes = false;
while (pointer < len) {
let c = cache;
while (c === 0x24) {
skip();
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed template string';
lastCanonizedInput += slice(lastOffset, pointer);
lastCanonizedInputLen += pointer - lastOffset;
return 2097175;
}
c = cache;
if (c === 0x7b) {
lastCanonizedInput += slice(lastOffset, pointer - 1);
lastCanonizedInputLen += (pointer - 1) - lastOffset;
skip();
return (badEscapes? ((fromTick? 1572881 : 1572882)) : ((fromTick? 524305 : 524306)));
}
}
if (c === 0x60) {
lastCanonizedInput += slice(lastOffset, pointer);
lastCanonizedInputLen += pointer - lastOffset;
skip();
return (badEscapes? ((fromTick? 1572884 : 1572883)) : ((fromTick? 524308 : 524307)));
}
if (c === 0x0D) {
skip();
if ((pointer < len && (cache === 0x0A))) {
skip();
}
incrementLine();
} else if (isLfPsLs(c)) {
skip();
incrementLine();
} else if (c === 0x5c) {
lastCanonizedInput += slice(lastOffset, pointer);
lastCanonizedInputLen += pointer - lastOffset;
badEscapes = ((parseStringOrTemplateEscape(lexerFlags, true) === true) || badEscapes);
lastOffset = pointer;
} else {
skip();
}
}
lastCanonizedInput += slice(lastOffset, pointer);
lastCanonizedInputLen += pointer - lastOffset;
if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed template literal';
return 2097175;
}
function verifyCharAfterNumber() {
if (pointer >= len) return;
let c = cache;
if (((isIdentStart(c, 0) !== (-1)) || (((c >= 0x30) && (c <= 0x39))))) {
return THROW(('Found `' + String.fromCharCode(c)) + '`. It is not legal for an ident or number token to start after a number token without some form of separation', pointer, pointer);
}
}
function parseLeadingZero(lexerFlags) {
let r = _parseLeadingZero(lexerFlags);
if (r !== 2097175) verifyCharAfterNumber();
return r;
}
function _parseLeadingZero(lexerFlags) {
if (pointer >= len) return 4105;
let c = cache;
if (isAsciiNumber(c)) {
skip();
if (pointer < len) skipDigits();
if ((lexerFlags & 8192) === 8192) {
if (!lastReportableLexerError) lastReportableLexerError = '"Illegal" octal escape in strict mode';
return 2097175;
}
if (pointer < len) {
let e = cache;
if (((e === 0x45) || (e === 0x65))) {
if (!lastReportableLexerError) lastReportableLexerError = 'An exponent is not allowed after a legacy octal number and an ident after number must be separated by some whitespace so this is an error';
return 2097175;
}
if (e === 0x6E) {
if (!supportBigInt) {
return THROW('BigInt suffix is not supported on legacy octals; use the `0o` prefix notation for that', startForError, pointer + 1);
}
}
}
return 4108;
}
if (c === 0x2e) {
parseFromFractionDot();
return 4105;
}
if (((c === 0x78) || (c === 0x58))) {
skip();
return parseHex();
}
if (((c === 0x6F) || (c === 0x4F))) {
skip();
return parseOctal();
}
if (((c === 0x62) || (c === 0x42))) {
skip();
return parseBinary();
}
if (((c === 0x65) || (c === 0x45))) {
parseExponentMaybe(c);
return 4105;
}
if (c === 0x6E) {
if (!supportBigInt) {
return THROW(('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion) + ')', startForError, pointer + 1);
}
skip();
return 12297;
}
return 4105;
}
function parseDecimal() {
if (pointer >= len) {
return 4105;
}
let c = skipDigits();
if (pointer >= len) {
return 4105;
}
if (c === 0x2e) {
parseFromFractionDot();
verifyCharAfterNumber();
return 4105;
}
if (c === 0x6E) {
if (!supportBigInt) {
return THROW(('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion) + ')', startForError, pointer);
}
skip();
verifyCharAfterNumber();
return 12297;
}
parseExponentMaybe(c);
verifyCharAfterNumber();
return 4105;
}
function skipDigits() {
let c = cache;
while (isAsciiNumber(c)) {
skip();
if (pointer >= len) return 0;
c = cache;
}
return c;
}
function parseExponentMaybe(c) {
if (((c !== 0x65) && (c !== 0x45))) return;
if (eofd(1)) return;
let d = peekd(1);
if (((d === 0x2d) || (d === 0x2b))) {
if (eofd(2)) return;
let e = peekd(2);
if (!isAsciiNumber(e)) return;
skipFastWithoutUpdatingCache();
skipFastWithoutUpdatingCache();
skip();
if (pointer >= len) return;
skipDigits();
return;
}
if (!isAsciiNumber(d)) return;
skipFastWithoutUpdatingCache();
skip();
if (pointer >= len) return;
skipDigits();
}
function parseFromFractionDot() {
skip();
if (pointer >= len) return;
let c = skipDigits();
parseExponentMaybe(c);
}
function parseHex() {
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = '`0x` is illegal without a digit';
return 2097175;
}
let c = cache;
let cv = getHexValue(c);
if (cv === 16) {
if (!lastReportableLexerError) lastReportableLexerError = '`0x` is illegal without a digit';
return 2097175;
}
skip();
do {
if (pointer >= len) return 4104;
c = cache;
cv = getHexValue(c);
if (cv === 16) {
break;
}
skip();
} while (true);
if (c === 0x6E) {
if (!supportBigInt) {
return THROW(('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion) + ')', startForError, pointer + 1);
}
skip();
return 12296;
}
return 4104;
}
function parseOctal() {
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = '`0o` is illegal without a digit';
return 2097175;
}
let c = cache;
if (!isOctal(c)) {
if (!lastReportableLexerError) lastReportableLexerError = '`0o` is illegal without a digit';
return 2097175;
}
skip();
do {
if (pointer >= len) return 4107;
c = cache;
if (!isOctal(c)) break;
skip();
} while (true);
if (c === 0x6E) {
if (!supportBigInt) {
return THROW(('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion) + ')', startForError, pointer + 1);
}
skip();
return 12299;
}
return 4107;
}
function parseBinary() {
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = '`0b` is illegal without a digit';
return 2097175;
}
let c = cache;
if (!isBinary(c)) {
if (!lastReportableLexerError) lastReportableLexerError = '`0b` is illegal without a digit';
return 2097175;
}
skip();
do {
if (pointer >= len) return 4106;
c = cache;
if (!isBinary(c)) break;
skip();
} while (true);
if (c === 0x6E) {
if (!supportBigInt) {
return THROW(('The BigInt syntax is supported in ES11+ / ES2020 (currently parsing ES' + targetEsVersion) + ')', startForError, pointer + 1);
}
skip();
return 12297;
}
return 4106;
}
function isBinary(ord) {
return ((ord === 0x30) || (ord === 0x31));
}
function parseExcl() {
if (pointer >= len) return 16463;
if ((cache === 0x3d)) {
skip();
if ((pointer < len && (cache === 0x3d))) {
skip();
return 82001;
}
return 82000;
}
return 16463;
}
function parseStar() {
if (pointer < len) {
let c = cache;
if (c === 0x2a) {
skip();
if ((pointer < len && (cache === 0x3d))) {
skip();
return 49244;
}
return 82010;
} else if (c === 0x3d) {
skip();
return 49243;
}
}
return 82009;
}
function parseIdentRestNotKeywordObjTrie(d, n, start) {
pointer = n - 1;
cache = d;
return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
}
function parsePotentialKeywordTrieMap(c) {
let trieObjlit = KEYWORD_TRIE_OBJLIT[c - 0x61];
let start = pointer - 1;
let n = start + 1;
do {
if (n >= len) return eofAfterPotentialKeywordTrieMap(trieObjlit, n, start);
let d = input.charCodeAt(n++);
if (((d < 0x61) || (d > 0x7a))) {
return endOfPotentialKeywordTrieMap(trieObjlit, d, n, start);
}
trieObjlit = trieObjlit[d - 0x61];
if (trieObjlit === undefined) return parseIdentRestNotKeywordObjTrie(d, n, start);
} while (true);
}
function endOfPotentialKeywordTrieMap(trieObjlit, d, n, start) {
let hit = trieObjlit.hit;
if (d > 0x7e) {
pointer = n - 1;
cache = d;
let wide = isIdentRestChr(d, n - 1);
if (wide === (-1)) {
lastCanonizedInputLen = (n - 1) - start;
if (hit === undefined) {
lastCanonizedInput = slice(start, n - 1);
return 2048;
}
let canon = trieObjlit.canon;
lastCanonizedInput = canon;
return hit;
}
return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
}
let s = getTokenStart(d);
if (((((s === 2) || (s === 7))) || (s === 14))) {
pointer = n - 1;
cache = d;
return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
}
if (s === 24) {
pointer = n - 1;
cache = d;
return parseIdentifierRest(slice(start, n - 1), (n - 1) - start);
}
if (hit !== undefined) {
pointer = n - 1;
cache = d;
lastCanonizedInputLen = (n - 1) - start;
let canon = trieObjlit.canon;
lastCanonizedInput = canon;
return hit;
}
lastCanonizedInput = slice(start, n - 1);
lastCanonizedInputLen = (n - 1) - start;
pointer = n - 1;
cache = d;
return 2048;
}
function eofAfterPotentialKeywordTrieMap(trieObjlit, n, start) {
pointer = n - 1;
skip();
lastCanonizedInputLen = n - start;
let hit = trieObjlit.hit;
if (hit !== undefined) {
let canon = trieObjlit.canon;
lastCanonizedInput = canon;
return hit;
}
lastCanonizedInput = slice(start, n);
return 2048;
}
function parseIdentifierRest(prevStr, prevLen) {
let start = pointer;
while (pointer < len) {
let c = cache;
let s = getIdentPart(c);
switch (s) {
case 0:
skip();
break;
case 1:
lastCanonizedInput = prevStr + slice(start, pointer);
lastCanonizedInputLen = prevLen + (pointer - start);
return 2048;
case 2:
let x = prevStr + slice(start, pointer);
let xlen = prevLen + (pointer - start);
skip();
return parseIdentFromUnicodeEscape(false, x, xlen);
case 3:
let wide = isIdentRestChrUnicode(c, pointer);
if (wide === (-1)) {
lastCanonizedInput = prevStr + slice(start, pointer);
lastCanonizedInputLen = prevLen + (pointer - start);
return 2048;
}
if (wide === (-3)) {
skipFastWithoutUpdatingCache();
}
skip();
break;
;
}
}
lastCanonizedInput = prevStr + slice(start, pointer);
lastCanonizedInputLen = prevLen + (pointer - start);
return 2048;
}
function parseIdentFromUnicodeEscape(fromStart, prevStr, prevLen) {
if (pointer >= len) {
lastCanonizedInput = prevStr;
lastCanonizedInputLen = prevLen;
if (!lastReportableLexerError) lastReportableLexerError = 'Encountered a backslash at end of input';
return 2097175;
}
if (!(cache === 0x75)) {
return THROW('Only unicode escapes are supported in identifier escapes', startForError, pointer + 1);
}
skip();
if (pointer >= len) {
if (!lastReportableLexerError) lastReportableLexerError = 'Reached end of input before closing the current ident escape';
return 2097175;
}
let r = parseUnicodeEscapeForNonRegex();
if (r === 0x110000) {
parseIdentifierRest(prevStr, prevLen);
lastCanonizedInput = prevStr;
lastCanonizedInputLen = prevLen;
if (!lastReportableLexerError) lastReportableLexerError = 'Only _unicode_ escapes are supported in identifiers';
return 2097175;
}
if (r > 0xffff) {
prevStr += String.fromCodePoint(r);
prevLen += 2;
} else {
prevStr += String.fromCharCode(r);
++prevLen;
}
if (((fromStart === true) && (isIdentStart(r, -1) !== (-1)))) {
return parseIdentifierRest(prevStr, prevLen);
}
if (((fromStart === false) && (isIdentRestChr(r, -1) !== (-1)))) {
return parseIdentifierRest(prevStr, prevLen);
}
lastCanonizedInput = prevStr;
lastCanonizedInputLen = prevLen;
if (!lastReportableLexerError) lastReportableLexerError = 'Identifier escape did not yield a valid identifier character';
return 2097175;
}
function toStringExpensive(c) {
return String.fromCodePoint(c);
}
function isIdentStart(c, offsetOfC) {
if (c > 0x7e) {
return veryExpensiveUnicodeCheck(c, offsetOfC, getIdStartRegexSuperSlow());
}
let s = getTokenStart(c);
if (((s === 2) || (s === 3))) return -2;
return -1;
}
function isIdentRestChr(c, offsetOfC) {
if (c > 0x7e) {
return isIdentRestChrUnicode(c, offsetOfC);
}
let s = getTokenStart(c);
if (((s === 2) || (s === 3))) return -2;
if (s === 7) return -2;
if (s === 14) return -2;
return -1;
}
function isIdentRestChrUnicode(c, offsetOfC) {
if (((c === 0x200C) || (c === 0x200D))) return -2;
return veryExpensiveUnicodeCheck(c, offsetOfC, getIdRestRegexSuperSlow());
}
function veryExpensiveUnicodeCheck(c, offset, regexScanner) {
if (offset !== (-1)) {
c = input.codePointAt(offset);
}
let s = String.fromCodePoint(c);
if (regexScanner.test(s)) {
return ((s.length === 1)? (-2) : (-3));
}
return -1;
}
function isAsciiLetter(c) {
let d = c | 32;
return ((d >= 0x61) && (d <= 0x7a));
}
function isAsciiNumber(c) {
return ((c >= 0x30) && (c <= 0x39));
}
function parseCompoundAssignment(c) {
if ((pointer < len && (cache === 0x3d))) {
skip();
if (c === 0x5e) return 49280;
return 49235;
}
if (c === 0x5e) return 82047;
return 82002;
}
function parseFwdSlash(lexerFlags) {
if (pointer >= len) return 82023;
let c = cache;
if (c === 0x2f) {
skip();
return parseCommentSingle();
}
if (c === 0x2a) {
return parseCommentMulti();
}
if ((lexerFlags & 4) === 4) {
return parseRegex(c);
}
if (c === 0x3d) {
skip();
return 49256;
}
return 82023;
}
function parseCommentSingle() {
while (pointer < len) {
let c = cache;
if (((c === 0x0D) || isLfPsLs(c))) {
return 1285;
}
skip();
}
return 1285;
}
function parseCommentMulti() {
skip();
let c = 0;
while (pointer < len) {
c = cache;
skip();
while (c === 0x2a) {
if (pointer >= len) break;
c = cache;
skip();
if (c === 0x2f) {
return 1286;
}
}
if (c === 0x0D) {
if ((pointer < len && (cache === 0x0A))) skip();
incrementLine();
} else if (isLfPsLs(c)) {
incrementLine();
}
}
if (!lastReportableLexerError) lastReportableLexerError = 'Unclosed multi line comment, early eof';
return 2097175;
}
function parseCommentHtmlOpen() {
parseCommentSingle();
return 1287;
}
function parseCommentHtmlClose() {
parseCommentSingle();
return 1287;
}
function parseEqual() {
if (pointer < len) {
let c = cache;
if (c === 0x3d) {
skip();
if ((pointer < len && (cache === 0x3d))) {
skip();
return 82034;
}
return 82033;
} else if (c === 0x3e) {
skip();
return 16499;
}
}
return 49264;
}
function parseLt() {
if (((((((((((parsingGoal === false) && (webCompat === true))) && (!eofd(3)))) && (cache === 0x21))) && (peekd(1) === 0x2d))) && (peekd(2) === 0x2d))) {
return parseCommentHtmlOpen();
}
return parseLtPunctuator();
}
function parseLtPunctuator() {
if (pointer < len) {
let c = cache;
if (c === 0x3d) {
skip();
return 82029;
}
if (c === 0x3c) {
skip();
if ((pointer < len && (cache === 0x3d))) {
skip();
return 49262;
}
return 82028;
}
}
return 82027;
}
function parseGtPunctuator() {
if (pointer < len) {
let c = cache;
if (c === 0x3d) {
skip();
return 82039;
}
if (c === 0x3e) {
skip();
if (pointer < len) {
c = cache;
if (c === 0x3d) {
skip();
return 49272;
}
if (c === 0x3e) {
skip();
if ((pointer < len && (cache === 0x3d))) {
skip();
return 49273;
}
return 82038;
}
}
return 82037;
}
}
return 82036;
}
function parseNewlineSolo() {
incrementLine();
return 771;
}
function parseBackslash() {
return parseIdentFromUnicodeEscape(true, '', 0);
}
function parseQmark() {
if (pointer >= len) return 16506;
if ((cache === 0x3f)) {
skip();
if (supportNullishCoalescing) {
return 82044;
}
return THROW('The nullish coalescing operator (`??`) is only supported since ES2020, currently targeting a lower version', pointer - 2, pointer);
}
if ((cache === 0x2e)) {
if (neofd(1)) {
let c = peekd(1);
if (((c >= 0x30) && (c <= 0x39))) {
return 16506;
}
}
skip();
if (supportOptionalChaining) {
return 82043;
}
return THROW('The optional chaining operator (`?.`) is only supported since ES2020, currently targeting a lower version', pointer, pointer + 2);
}
return 16506;
}
function regexSyntaxError(desc, ...rest) {
if (lastReportableLexerError) {
return 4;
}
updateRegexPotentialError(desc + ((rest.length? (': [' + rest.join(', ')) + ']' : '')));
lastReportableLexerError = 'Regex: ' + lastPotentialRegexError;
return 4;
}
function updateRegexPotentialError(msg) {
if (!lastPotentialRegexError.includes(msg)) {
if (lastPotentialRegexError) lastPotentialRegexError += '; ';
lastPotentialRegexError += msg;
}
}
function updateRegexUflagIsIllegal(state, reason) {
return updateRegexUflagState(state, 2, reason);
}
function updateRegexUflagIsMandatory(state, reason) {
return updateRegexUflagState(state, 1, reason);
}
function updateRegexUflagState(currentState, newState, error) {
if (lastReportableLexerError) return 4;
if (currentState === (((newState === 1)? 2 : 1))) {
return regexSyntaxError(error);
}
if (currentState === 0) {
updateRegexPotentialError(error);
currentState = newState;
} else {

}
return currentState;
}
let nCapturingParens = 0;
let largestBackReference = 0;
let declaredGroupNames = ',';
let reffedGroupNames = ',';
let kCharClassEscaped = false;
let foundInvalidGroupName = false;
function parseRegex(c) {
nCapturingParens = 0;
largestBackReference = 0;
lastPotentialRegexError = '';
declaredGroupNames = ',';
reffedGroupNames = ',';
kCharClassEscaped = false;
foundInvalidGroupName = false;
let ustatusBody = parseRegexBody(c);
if (ustatusBody === 4) {
return 2097175;
}
let ustatusFlags = parseRegexFlags();
if (nCapturingParens < largestBackReference) {
let errmsg = 'Largest back reference index exceeded the number of capturing groups (only valid without u-flag in webcompat mode)';
if (webCompat === false) {
regexSyntaxError(errmsg);
return 2097175;
}
ustatusBody = updateRegexUflagIsIllegal(ustatusBody, errmsg);
}
if (ustatusFlags === 4) {
return 2097175;
}
if (kCharClassEscaped) {
if (declaredGroupNames !== ',') {
regexSyntaxError('Found `\\k` in a char class but the regex also had a group name so this is illegal');
return 2097175;
}
if (((webCompat === false) || (ustatusFlags === 1))) {
regexSyntaxError('Found `\\k` in a char class but this is only allowed in webcompat mode and without u-flag');
return 2097175;
}
}
if (((reffedGroupNames !== ',') && (((webCompat === false) || (declaredGroupNames !== ','))))) {
let bad = false;
reffedGroupNames.split(',').filter(Boolean).forEach(name => {
if (!declaredGroupNames.includes((',' + name) + ',')) {
regexSyntaxError(('Found a `\\k` that referenced `' + name) + '` but no capturing group had this name');
bad = true;
}
});
if (bad) {
return 2097175;
}
}
if (ustatusBody === 1) {
if (ustatusFlags === 1) return 262158;
regexSyntaxError('Regex contained syntax that is only valid with the u-flag but the u-flag was not present');
return 2097175;
}
if (ustatusBody === 2) {
if (ustatusFlags !== 1) return 262157;
regexSyntaxError('Regex contained syntax that is invalid with the u-flag but the u-flag was present');
return 2097175;
}
if (ustatusFlags === 1) return 262158;
return 262157;
}
function parseRegexBody(c) {
return _parseRegexBody(c, 0, 0);
}
function cannotBeQuantifier(c, uflagStatus, webcompatException, msg) {
let badStart = ((((((c === 0x2a) || (c === 0x2b))) || (c === 0x3f))) || (c === 0x7b));
if (badStart) {
msg += (' (by a `' + String.fromCharCode(c)) + '`)';
if ((webcompatException && (webCompat === true))) {
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, msg);
} else {
uflagStatus = regexSyntaxError(msg);
}
}
return uflagStatus;
}
function _parseRegexBody(c, groupLevel, uflagStatus) {
let afterAtom = false;
uflagStatus = cannotBeQuantifier(c, uflagStatus, c === 0x7b, 'Started with a quantifier but that is not allowed');
let groupNames = {};
do {
let s = ((c > 0x7e)? 11 : regexAtomJumpTable[c]);
switch (s) {
case 0:
skip();
afterAtom = true;
break;
case 1:
skip();
afterAtom = true;
break;
case 2:
skip();
if (afterAtom) {
afterAtom = false;
if (pointer < len) {
if ((cache === 0x3f)) {
skip();
}
}
} else {
uflagStatus = regexSyntaxError(('Encountered unescaped quantifier (ord=' + c) + ') without a value to quantify');
}
break;
case 3:
let wasFixableAssertion = false;
let wasUnfixableAssertion = false;
skip();
afterAtom = false;
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF');
}
c = cache;
if (c === 0x3f) {
skip();
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF');
}
c = cache;
if (((((((c === 0x3a) || (c === 0x3d))) || (c === 0x21))) || (c === 0x3c))) {
if (c === 0x3c) {
skip();
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF');
}
c = cache;
if (((c === 0x3d) || (c === 0x21))) {
if (!supportRegexLookbehinds) {
return THROW('Lookbehinds in regular expressions are not supported in the currently targeted language version', startForError, pointer + 1);
}
skip();
wasUnfixableAssertion = true;
} else if (!supportRegexNamedGroups) {
skip();
return regexSyntaxError(('The lookbehind group `(?<` must be `(?<=` or `(?<!` because named groups are not supported in the currently targeted ES version, next char after `<` is `' + String.fromCharCode(c)) + '`');
} else {
uflagStatus = parseRegexGroupName(c, uflagStatus, true);
++nCapturingParens;
}
} else if (((c === 0x3d) || (c === 0x21))) {
skip();
wasFixableAssertion = true;
}
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF');
}
c = cache;
} else {
return regexSyntaxError(('Illegal character after pseudo group marker `(?` [ord=' + c) + ']');
}
} else {
++nCapturingParens;
}
let subbad = _parseRegexBody(c, groupLevel + 1, 0);
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF');
}
c = cache;
if ((wasFixableAssertion || wasUnfixableAssertion)) {
uflagStatus = cannotBeQuantifier(c, uflagStatus, !wasUnfixableAssertion, 'Regex A-ssertion "atoms" can not be quantified (so things like `^`, `$`, and `(?=` can not have `*`, `+`, `?`, or `{` following it)');
}
afterAtom = true;
if (subbad === 4) {
uflagStatus = 4;
} else if (subbad === 2) {
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
} else if (subbad === 1) {
uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
}
break;
case 4:
skip();
if (groupLevel > 0) return uflagStatus;
return regexSyntaxError('Found unescaped closing paren `)` without a group being open');
case 5:
let charClassEscapeStatus = parseRegexCharClass();
if (charClassEscapeStatus === 4) {
uflagStatus = 4;
} else if (charClassEscapeStatus === 2) {
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
} else if (charClassEscapeStatus === 1) {
uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
}
afterAtom = true;
break;
case 6:
{
skip();
let reason = 'Encountered unescaped closing square bracket `]` while not parsing a character class, which is only valid without u-flag';
if (webCompat === false) {
return regexSyntaxError(reason);
}
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, reason);
afterAtom = true;
break;
}
case 7:
{
skip();
afterAtom = true;
if (pointer >= len) {
return regexSyntaxError('Early EOF');
}
let d = cache;
if (((d === 0x62) || (d === 0x42))) {
skip();
afterAtom = false;
} else {
let escapeStatus = parseEscapeForRegexAtom(d);
if (escapeStatus === 4) {
uflagStatus = 4;
} else if (escapeStatus === 2) {
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, lastPotentialRegexError);
} else if (escapeStatus === 1) {
uflagStatus = updateRegexUflagIsMandatory(uflagStatus, lastPotentialRegexError);
} else if (escapeStatus === 8) {
afterAtom = false;
}
}
}
break;
case 8:
if (groupLevel !== 0) {
return regexSyntaxError('Unclosed group');
}
skip();
return uflagStatus;
case 9:
skip();
afterAtom = false;
break;
case 10:
skip();
if (pointer < len) {
c = cache;
uflagStatus = cannotBeQuantifier(c, uflagStatus, c === 0x7b, 'Regex `A-ssertion` "atoms" can not be quantified but this `$` was quantified anyways');
}
afterAtom = false;
break;
case 11:
if (((c === 0x2028) || (c === 0x2029))) {
return regexSyntaxError('Encountered early EOF');
}
skip();
afterAtom = true;
break;
case 12:
{
skip();
if (pointer >= len) {
return regexSyntaxError('Early EOF at the start of a regex quantifier');
}
let c = cache;
let validBrace = (isAsciiNumber(c)? parseRegexCurlyQuantifier(c) : 3);
if (validBrace === 1) {
if (afterAtom) {
afterAtom = false;
if ((pointer < len && (cache === 0x3f))) {
skip();
}
break;
}
return regexSyntaxError('A valid bracket quantifier requires an unqualified atom, but that was not the case');
}
if (validBrace === 2) {
return regexSyntaxError('Parsed a braced quantifier that contained an illegal range (left>right)');
}
if (pointer >= len) return regexSyntaxError('Encountered EOF while parsing curly quantifier');
if (webCompat === false) {
if ((cache === 0x2c)) {
return regexSyntaxError('The first digit of a regex curly quantifier is mandatory');
}
if ((cache === 0x7d)) {
return regexSyntaxError('A regex curly quantifier had no content');
}
return regexSyntaxError('Found an unescaped `{` that was not the start of a valid quantifier');
}
afterAtom = true;
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, 'Found an unescaped `{` that was not the start of a valid quantifier');
break;
}
case 13:
{
skip();
let reason = 'Encountered unescaped closing curly `}` while not parsing a quantifier';
if (webCompat === false) {
return regexSyntaxError(reason);
}
uflagStatus = updateRegexUflagIsIllegal(uflagStatus, reason);
afterAtom = true;
break;
}
case 14:
skip();
afterAtom = false;
break;
case 15:
return regexSyntaxError('Encountered early EOF');
;
}
if (pointer >= len) break;
c = cache;
} while (true);
return regexSyntaxError('Found EOF before regex was closed');
}
function parseRegexGroupName(c, uflagStatus, forCapturing) {
let r = _parseRegexGroupName(c, uflagStatus, forCapturing);
if (!foundInvalidGroupName) return r;
if (forCapturing === true) {
return regexSyntaxError('An invalid name for a capturing group can never lead to a valid regex');
}
kCharClassEscaped = true;
return r;
}
function _parseRegexGroupName(c, uflagStatus, forCapturing) {
if (c === 0x3e) {
foundInvalidGroupName = true;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
if (webCompat === true) {
reffedGroupNames += '<>,';
return updateRegexUflagIsIllegal(uflagStatus, 'Group name is not optional without webcompat, found empty `<>`');
}
return regexSyntaxError('Group name is not optional, found empty `<>`');
}
let pointerStart = pointer;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
let first = true;
let lastPointer = 0;
while (((((c !== 0x3e) && (uflagStatus !== 4))) && (lastPointer !== pointer))) {
lastPointer = pointer;
if (c === 0x5c) {
uflagStatus = _parseRegexGroupNameEscape(first, uflagStatus, forCapturing);
} else {
uflagStatus = _parseRegexGroupNameChar(first, c, uflagStatus, forCapturing);
}
if (pointer >= len) {
foundInvalidGroupName = true;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
return regexSyntaxError('Missing closing angle bracket of name of capturing group');
}
c = cache;
first = false;
}
if (uflagStatus === 4) {
foundInvalidGroupName = true;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
return 4;
}
if (lastPointer === pointer) {
foundInvalidGroupName = true;
lastCanonizedInput = '';
lastCanonizedInputLen = 0;
return 2;
}
lastCanonizedInputLen = lastCanonizedInput.length;
skip();
if (lastCanonizedInputLen > 0) {
let next = lastCanonizedInput + ',';
if (forCapturing === true) {
if (declaredGroupNames.includes(',' + next)) {
THROW(('This group name (`' + lastCanonizedInput) + '`) was already used before', pointerStart, pointer - 1);
}
declaredGroupNames += next;
} else {
reffedGroupNames += next;
}
}
return uflagStatus;
}
function _parseRegexGroupNameChar(start, c, uflagStatus, forCapturing) {
let wide = (start? isIdentStart(c, pointer) : isIdentRestChr(c, pointer));
if (wide === (-2)) {
skip();
lastCanonizedInput += String.fromCharCode(c);
return uflagStatus;
}
if (wide === (-1)) {
foundInvalidGroupName = true;
if (((webCompat === false) || (forCapturing === true))) {
return regexSyntaxError(('Tried to parse the name for a capturing group but it contained at least one invalid ident char (`' + String.fromCharCode(c)) + '`)');
}
return updateRegexUflagIsIllegal(uflagStatus, ('Tried to parse the name for a capturing group but it contained at least one invalid ident char (`' + String.fromCharCode(c)) + '`)');
}
skipFastWithoutUpdatingCache();
skip();
lastCanonizedInput += String.fromCodePoint(c);
if (forCapturing === true) {
return updateRegexUflagIsMandatory(uflagStatus, 'The start of the name of a capturing group had a surrogate pair and is therefor only valid with u-flag');
}
if (webCompat === false) {
return updateRegexUflagIsMandatory(uflagStatus, 'The start of a `\\k` group name had a surrogate pair and is therefor only valid with u-flag');
}
return uflagStatus;
}
function _parseRegexGroupNameEscape(start, uflagStatus, forCapturing) {
skip();
if (pointer >= len) {
foundInvalidGroupName = true;
return regexSyntaxError('Found EOF at start of a group name identifier');
}
if (!(cache === 0x75)) {
foundInvalidGroupName = true;
return regexSyntaxError('Found invalid escape character at the start of a group name identifier');
}
skip();
if (pointer >= len) {
return updateRegexUflagIsIllegal(0, 'Unexpected EOF while parsing unicode escape');
}
let c = cache;
if (c === 0x7b) {
c = parseUnicodeRubyEscape();
uflagStatus = updateRegexUflagIsMandatory(0, 'Found a unicode ruby escape which is only valid with u-flag');
} else {
c = parseUnicodeQuadEscape(c, false);
if (((c > 0xffff) && (forCapturing === true))) {
uflagStatus = updateRegexUflagIsMandatory(uflagStatus, 'The name of a capturing group contained a double unicode quad escape which is valid as a surrogate pair which requires u-flag and which cannot be made valid without u-flag');
}
}
if (pointer >= len) {
foundInvalidGroupName = true;
return regexSyntaxError('Early EOF while parsing a group name');
}
if (c === 0x110000) {
foundInvalidGroupName = true;
if (((webCompat === false) || (forCapturing === true))) {
return regexSyntaxError('Regex contained a group name with invalid unicode escape');
}
return updateRegexUflagIsIllegal(uflagStatus, 'The name of a `\\k` escape contained a broken unicode ruby escape and this can not lead to a valid regex with u-flag');
}
let firstCharStr = toStringExpensive(c);
lastCanonizedInput += firstCharStr;
let wide = (start? isIdentStart(c, -1) : isIdentRestChr(c, -1));
if (wide === (-2)) {
return uflagStatus;
}
if (wide === (-3)) {
if (forCapturing === true) {
return updateRegexUflagIsMandatory(uflagStatus, 'Found a codepoint in a capturing group name that requires the u-flag to be considered valid');
}
if (webCompat === false) {
return updateRegexUflagIsMandatory(uflagStatus, 'Found a codepoint in a `\\k` escape group name that requires the u-flag to be considered valid');
}
return uflagStatus;
}
if (forCapturing === true) {
foundInvalidGroupName = true;
return regexSyntaxError('Encountered invalid unicode escape inside the group name of a capturing group, this cannot be valid');
}
if (webCompat === false) {
foundInvalidGroupName = true;
return regexSyntaxError('Encountered invalid unicode escape inside the group name of a `\\k` escape, this can not become valid without web compat mode');
}
return updateRegexUflagIsIllegal(uflagStatus, 'Encountered invalid unicode escape inside the group name of a `\\k` escape, this is invalid with u-flag');
}
function parseEscapeForRegexAtom(c) {
let s = ((c > 0x7e)? 4 : regexAtomEscapeStartJumpTable[c]);
switch (s) {
case 0:
skip();
return 0;
case 2:
skip();
return parseUnicodeEscapeForRegexAtom();
case 3:
skip();
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF while parsing hex escape');
}
let a = cache;
let va = getHexValue(a);
if (va === 16) {
let reason = 'First char of hex escape not a valid digit';
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, reason);
}
return regexSyntaxError(reason);
}
skip();
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF while parsing hex escape');
}
let b = cache;
let vb = getHexValue(b);
if (vb === 16) {
let reason = 'Second char of hex escape not a valid digit';
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, reason);
}
return regexSyntaxError(reason);
}
skip();
return 0;
case 1:
skip();
return updateRegexUflagIsIllegal(0, 'Atoms can only escape certain non-special chars without u-flag');
case 4:
let wide = isIdentRestChr(c, pointer);
if (wide === (-3)) {
c = input.codePointAt(pointer);
skipFastWithoutUpdatingCache();
skip();
if (webCompat === false) {
return regexSyntaxError(((('Cannot use a surrogate pair as atom escape (' + c) + ', `') + String.fromCodePoint(c)) + '`)');
}
return updateRegexUflagIsIllegal(0, 'Atom escape can only escape certain syntax chars with u-flag');
}
if (wide === (-2)) {
skip();
if (webCompat === false) {
return regexSyntaxError(((('Cannot escape this regular identifier character [ord=' + c) + '][') + String.fromCharCode(c)) + ']');
}
return updateRegexUflagIsIllegal(0, 'Atom escape can only escape certain syntax chars with u-flag');
}
;
skip();
if (((c === 0x2028) || (c === 0x2029))) {
return regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');
}
if (webCompat === false) {
return regexSyntaxError(((('Cannot escape this non-identifier character [ord=' + c) + '][') + String.fromCharCode(c)) + ']');
}
return updateRegexUflagIsIllegal(0, 'Atom escape can only escape certain syntax chars with u-flag');
case 5:
skip();
if (pointer >= len) {
return regexSyntaxError('Encountered early EOF while parsing char escape');
}
let d = cache;
if (isAsciiLetter(d)) {
skip();
return 0;
}
let reason = ('Illegal char escape char (ord=' + d) + ')';
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, reason);
}
return regexSyntaxError(reason);
case 6:
const FROM_ATOM = false;
return parseRegexPropertyEscape(c, FROM_ATOM);
case 7:
skip();
if (pointer >= len) return 0;
if (isAsciiNumber(cache)) {
let reason = 'Back references can not have more two or more consecutive numbers';
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, reason);
} else {
return regexSyntaxError(reason);
}
}
return 0;
case 8:
return parseRegexDecimalEscape(c);
case 9:
{
let uflagStatus = 0;
skip();
if (pointer >= len) return regexSyntaxError('Early EOF while parsing `\\k` escape in regex character class');
c = cache;
if (c !== 0x3c) {
kCharClassEscaped = true;
let reason = 'Named back reference \\k; missing group name';
if (webCompat === false) {
return regexSyntaxError(reason, c);
}
return updateRegexUflagIsIllegal(0, reason);
}
skip();
if (pointer >= len) return regexSyntaxError('Early EOF while parsing `\\k` escape in regex character class');
c = cache;
uflagStatus = parseRegexGroupName(c, uflagStatus, false);
return uflagStatus;
}
case 10:
skip();
return regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');
case 11:
skip();
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, 'Atom escape can only escape certain letters without u-flag');
}
return regexSyntaxError(('Cannot escape this letter [' + String.fromCharCode(c)) + ']');
;
}
}
function parseRegexDecimalEscape(c) {
skip();
if (pointer >= len) return regexSyntaxError('Early EOF while parsing decimal escape in regex');
let d = cache;
if (((d >= 0x30) && (d <= 0x39))) {
skip();
let e = cache;
if (((e >= 0x30) && (e <= 0x39))) {
let reason = 'Parsed too many digits';
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, reason);
} else {
return regexSyntaxError(reason);
}
} else {
largestBackReference = Math.max(largestBackReference, ((c - 0x30) * 10) + (d - 0x30));
}
} else {
largestBackReference = Math.max(largestBackReference, c - 0x30);
}
return 0;
}
function parseRegexCharClass() {
skip();
let prev = 0;
let surrogate = 0;
let isSurrogate = false;
let isSurrogateHead = false;
let wasSurrogate = true;
let wasSurrogateHead = false;
let urangeOpen = false;
let urangeLeft = -1;
let nrangeOpen = false;
let nrangeLeft = -1;
let flagState = 0;
if (pointer >= len) return regexSyntaxError('Encountered early EOF while parsing char class (1)');
let c = cache;
if (c === 0x5e) {
skip();
if (pointer >= len) return regexSyntaxError('Encountered early EOF while parsing char class (2)');
c = cache;
}
while (c !== 0x5d) {
let wasEscape = false;
let wasDoubleQuad = false;
let wasBadUniEscape = false;
let wasPropEscape = false;
let wasPropOnly = false;
let wasBadPropEscape = false;
let wasRubyWebEscape = false;
let escapeCharUP = 0;
if (c === 0x5c) {
skip();
wasEscape = true;
if (pointer >= len) {
regexSyntaxError('Early EOF after backslash in char class');
return 0x110000;
}
c = cache;
escapeCharUP = c;
let escapePointer = pointer;
c = parseRegexCharClassEscape(c);
if (escapeCharUP === 0x75) {
if (c === 0x110000) {
if (pointer >= len) return 0x110000;
if (webCompat === false) return 0x110000;
wasBadUniEscape = true;
flagState = updateRegexUflagIsIllegal(flagState, 'A broken `\\u` escape can never be valid with u-flag');
wasPropOnly = (pointer - escapePointer) === 1;
} else if ((c & 67108864) > 0) {
c ^= 67108864;
wasRubyWebEscape = webCompat === true;
} else if (c > 0xffff) {
wasDoubleQuad = true;
}
} else if (((escapeCharUP === 0x70) || (escapeCharUP === 0x50))) {
if (webCompat === true) {
if (((((c === 0x110000) || (c === 34668544))) || ((c & 16777216) === 16777216))) {
wasBadPropEscape = true;
} else {
wasPropEscape = true;
wasPropOnly = (pointer - escapePointer) === 1;
}
}
}
if (c === 0x110000) {
if (!wasBadUniEscape) {
flagState = regexSyntaxError(lastPotentialRegexError);
}
} else if (c === 34668544) {
flagState = regexSyntaxError(lastPotentialRegexError);
c = 33554432;
} else if (c === 33554432) {

} else if (c === 0x110001) {
if (webCompat === true) {
flagState = updateRegexUflagIsIllegal(0, 'Char class can not contain `\\B`');
} else {
flagState = regexSyntaxError('Char class can not contain `\\B`');
}
c = 0x42;
} else if (c === 0x110002) {
flagState = updateRegexUflagIsIllegal(flagState, lastPotentialRegexError);
c = 0x5c;
} else {
if (c & 16777216) {
c = c ^ 16777216;
flagState = updateRegexUflagIsIllegal(flagState, lastPotentialRegexError);
}
if (c & 8388608) {
c = c ^ 8388608;
flagState = updateRegexUflagIsMandatory(flagState, lastPotentialRegexError);
}
}
} else if (((((((c === 0x0D) || (c === 0x0A))) || (c === 0x2028))) || (c === 0x2029))) {
return regexSyntaxError('Encountered newline');
} else {
skip();
}
if (wasBadUniEscape) {

} else if (wasEscape) {
isSurrogate = c > 0xffff;
if (isSurrogate) surrogate = c;
isSurrogateHead = false;
} else if ((wasSurrogateHead && isSurrogateTail(c))) {
isSurrogate = true;
isSurrogateHead = false;
surrogate = getSurrogate(prev, c);
} else {
isSurrogate = false;
isSurrogateHead = isSurrogateLead(c);
}
if (urangeOpen) {
let urangeRight = (isSurrogate? surrogate : ((wasSurrogateHead? prev : c)));
if (((urangeLeft === 33554432) || (urangeRight === 33554432))) {
flagState = updateRegexUflagIsIllegal(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` not allowed in ranges with u');
} else if (((!isSurrogateHead) || wasSurrogateHead)) {
urangeOpen = false;
if (urangeLeft > urangeRight) {
flagState = updateRegexUflagIsIllegal(flagState, ((((((('Encountered incorrect range (left>right, ' + urangeLeft) + ' > ') + urangeRight) + ', 0x') + urangeLeft.toString(16)) + ' > 0x') + urangeRight.toString(16)) + ') which is illegal with u-flag');
}
urangeLeft = -1;
} else {

}
} else if (((((c === 0x2d) && (!wasEscape))) && (urangeLeft !== (-1)))) {
urangeOpen = true;
} else {
urangeLeft = (isSurrogate? surrogate : c);
}
let cTmp = (((wasRubyWebEscape || wasPropEscape))? escapeCharUP : c);
let cTail = c;
let stillDataLeft = true;
let rubyHackLhs = (((wasRubyWebEscape || wasBadUniEscape)) || wasPropEscape);
let rubyHackRhsPeek = (wasBadUniEscape || ((wasBadPropEscape && (!wasPropOnly))));
let rubyHackRhsCurly = (wasRubyWebEscape || ((wasPropEscape && (!wasPropOnly))));
while (stillDataLeft) {
if (wasDoubleQuad) {
wasDoubleQuad = false;
cTail = codePointToSurrogateTail(cTmp);
cTmp = codePointToSurrogateHead(cTmp);
} else if (rubyHackLhs) {
rubyHackLhs = false;
cTmp = escapeCharUP;
if (wasPropOnly) stillDataLeft = false;
} else if (rubyHackRhsCurly) {
rubyHackRhsCurly = false;
cTmp = 0x7d;
stillDataLeft = false;
} else if (rubyHackRhsPeek) {
cTmp = peekd(-1);
rubyHackRhsPeek = false;
stillDataLeft = false;
} else {
stillDataLeft = false;
cTmp = cTail;
}
if (nrangeOpen) {
const nrangeRight = cTmp;
if (((nrangeLeft === 33554432) || (nrangeRight === 33554432))) {
if (webCompat === false) {
flagState = updateRegexUflagIsMandatory(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` not allowed in ranges');
}
} else {
if (nrangeLeft > nrangeRight) {
flagState = updateRegexUflagIsMandatory(flagState, ((((((('Encountered incorrect range (left>right, ' + nrangeLeft) + ' > ') + nrangeRight) + ', 0x') + nrangeLeft.toString(16)) + ' > 0x') + nrangeRight.toString(16)) + ') when parsing as if without u-flag');
}
}
nrangeLeft = -1;
nrangeOpen = false;
} else if (((((cTmp === 0x2d) && (!wasEscape))) && (nrangeLeft !== (-1)))) {
nrangeOpen = true;
} else {
nrangeLeft = cTmp;
}
}
wasSurrogate = isSurrogate;
wasSurrogateHead = isSurrogateHead;
prev = c;
if (pointer >= len) {
return regexSyntaxError('Unexpected early EOF while parsing character class');
}
c = cache;
}
skip();
if ((urangeOpen && wasSurrogateHead)) {
if (((urangeLeft === 33554432) || (prev === 33554432))) {
return updateRegexUflagIsIllegal(flagState, 'Character class escapes `\\d \\D \\s \\S \\w \\W \\p \\P` are only ok as a range with webcompat, without uflag');
}
if (urangeLeft > prev) {
return updateRegexUflagIsIllegal(flagState, ((((((('Encountered incorrect range end (left>right, ' + urangeLeft) + ' > ') + prev) + ', 0x') + urangeLeft.toString(16)) + ' > 0x') + prev.toString(16)) + ') which is illegal with u-flag');
}
return flagState;
}
return flagState;
}
function surrogateToCodepoint(head, tail) {
return (((head & 0x3ff) << 10) | (tail & 0x3ff)) + 0x10000;
}
function codePointToSurrogateTail(codepoint) {
return ((codepoint - 0x10000) & 0b1111111111) + 0xDC00;
}
function codePointToSurrogateHead(codepoint) {
return ((codepoint - 0x10000) >> 10) + 0xD800;
}
function parseRegexCharClassEscape(c) {
let s = ((c >= 0x7f)? 1 : regexClassEscapeStartJumpTable[c]);
switch (s) {
case 0:
skip();
;
if (webCompat === true) {
updateRegexUflagIsIllegal(0, ('Cannot escape `' + String.fromCharCode(c)) + '` in a regex char class with the u-flag');
return c | 16777216;
}
if (isIdentRestChr(c, pointer) === (-1)) {
updateRegexUflagIsIllegal(0, ('Cannot escape `' + String.fromCharCode(c)) + '` in a regex char class with the u-flag');
return c | 16777216;
}
;
regexSyntaxError(('Cannot escape `' + String.fromCharCode(c)) + '` in a regex char class');
return 0x110000;
case 1:
{
updateRegexUflagIsIllegal(0, ('Cannot escape `' + String.fromCharCode(c)) + '` in a char class with the u-flag');
if (webCompat === true) {
skip();
return c | 16777216;
}
let wide = isIdentRestChr(c, -1);
if (wide === (-2)) {
regexSyntaxError(('Cannot escape `' + String.fromCodePoint(c)) + '` in a char class');
return 0x110000;
}
if (((c === 0x2028) || (c === 0x2029))) {
skip();
regexSyntaxError('Regular expressions do not support line continuations (escaped x2028 x2029)');
return 0x110000;
}
skip();
return c | 16777216;
}
case 2:
skip();
return parseUnicodeEscapeForRegexCharClass();
case 3:
skip();
if (eofd(1)) {
regexSyntaxError('Found EOF before completely parsing a hex escape (in a char class of a regex)');
return 0x110000;
}
let a = cache;
let va = getHexValue(a);
if (va === 16) {
if (webCompat === true) {
updateRegexUflagIsIllegal(0, 'First character of hex escape was invalid');
return 16777336;
}
regexSyntaxError('First character of hex escape was invalid');
return 0x110000;
}
skip();
let b = cache;
let vb = getHexValue(b);
if (vb === 16) {
if (webCompat === true) {
updateRegexUflagIsIllegal(0, 'Second character of hex escape was invalid');
return 16777336;
}
regexSyntaxError('Second character of hex escape was invalid');
return 0x110000;
}
skip();
return (va << 4) | vb;
case 4:
{
skip();
if (pointer >= len) {
regexSyntaxError('Early EOF while parsing `\\c` in a character class');
return 0x110000;
}
let d = cache;
if (isAsciiLetter(d)) {
skip();
return d % 32;
}
let reason = 'The `\\c` escape is only legal in a char class without u-flag and in webcompat mode';
if (webCompat === true) {
updateRegexUflagIsIllegal(0, reason);
return 0x110002;
}
regexSyntaxError(reason);
return 0x110000;
}
case 5:
skip();
if (webCompat === true) {
kCharClassEscaped = true;
updateRegexUflagIsIllegal(0, 'Can only have `\\k` in a char class without u-flag and in webcompat mode');
return 16777323;
}
regexSyntaxError('A character class is not allowed to have `\\k` back-reference');
return 0x110000;
case 6:
skip();
return 8;
case 7:
{
skip();
return 0x110001;
}
case 8:
skip();
return 0x000C;
case 9:
skip();
return 0x000A;
case 10:
skip();
return 0x000D;
case 11:
skip();
return 0x0009;
case 12:
skip();
return 0x000B;
case 13:
skip();
return 33554432;
case 14:
const FROM_CHARCLASS = true;
let regexPropState = parseRegexPropertyEscape(c, FROM_CHARCLASS);
if (regexPropState === 4) {
return 34668544;
}
if (regexPropState === 2) {
return 50331648;
}
if (regexPropState === 1) {
return 41943040;
}
;
;
return 33554432;
case 15:
{
skip();
if ((pointer < len && isAsciiNumber(cache))) {
let reason = 'An escaped zero cannot be followed by another number because that would be an octal escape';
if (webCompat === true) {
updateRegexUflagIsIllegal(0, reason);
return parseOctalFromSecondDigit(c) | 16777216;
}
regexSyntaxError(reason);
return 0x110000;
}
return 0;
}
case 16:
{
skip();
let reason = 'A character class is not allowed to have numeric back-reference';
if (webCompat === true) {
updateRegexUflagIsIllegal(0, reason);
return parseOctalFromSecondDigit(c) | 16777216;
}
regexSyntaxError(reason);
return 0x110000;
}
case 17:
skip();
return parseDecimalEscape(c);
case 18:
skip();
return c;
case 19:
{
skip();
if (webCompat === true) {
return 0x2d;
}
updateRegexUflagIsMandatory(0, 'Escaping a dash in a char class is not allowed');
return 8388653;
}
case 20:
skip();
regexSyntaxError('Regular expressions do not support line continuations (escaped newline)');
return 0x110000;
;
}
}
function parseRegexPropertyEscape(c, fromCharClass) {
if (!supportRegexPropertyEscapes) {
let uflagState = updateRegexUflagIsIllegal(0, 'Property escapes are not supported by the currently targeted language version');
if (webCompat === true) return uflagState;
return updateRegexUflagIsMandatory(uflagState, 'Cannot escape `\\p` without u-flag');
}
skip();
if (pointer >= len) return regexSyntaxError('Early EOF after a regex `\\p`');
if (cache !== 0x7b) {
if (webCompat === true) return updateRegexUflagIsIllegal(0, 'Property escape `\\p` must start with a curly bracket');
return regexSyntaxError('Property escape `\\p` must start with a curly bracket');
}
c = skipPeek();
let pointerOffset = pointer;
let name = '';
let sawCommas = 0;
let hasEq = false;
let value = '';
do {
if (((((((c >= 0x61) && (c <= 0x7a))) || (((c >= 0x41) && (c <= 0x5a))))) || (c === 0x5f))) {

} else if (c === 0x7d) {
break;
} else if (c === 0x3d) {
if (pointerOffset === pointer) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, 'Property escape `\\p` had no value after the `=` which is illegal');
}
return regexSyntaxError('Property escape `\\p` had no value after the `=` which is illegal');
}
if (hasEq) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, 'Property escape `\\p` contained double equal sign, which is not valid');
}
return regexSyntaxError('Property escape `\\p` contained double equal sign, which is not valid');
}
hasEq = true;
name = slice(pointerOffset, pointer);
pointerOffset = pointer + 1;
} else {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, ('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1)) + '`');
}
return regexSyntaxError(('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1)) + '`');
}
c = skipPeek();
if (pointer >= len) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, 'Encountered early EOF while parsing `\\p` property escape');
}
return regexSyntaxError('Encountered early EOF while parsing `\\p` property escape');
}
} while (true);
if (pointerOffset === pointer) {
if (webCompat === true) {
if (hasEq) {
return updateRegexUflagIsIllegal(0, 'Property escape `\\p` had no value after the `=` which is illegal');
}
return updateRegexUflagIsIllegal(0, ('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1)) + '`');
}
if (hasEq) {
return regexSyntaxError('Property escape `\\p` had no value after the `=` which is illegal');
}
return regexSyntaxError(('Property escape `\\p` contained illegal character `' + slice(pointer, pointer + 1)) + '`');
}
if (hasEq) value = slice(pointerOffset, pointer); else name = slice(pointerOffset, pointer);
let nc = (',' + name) + ',';
if (hasEq) {
if (!TABLE_NONBIN_UNI_PROPS.includes(nc)) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, ('The `\\p` escaped binary property name `' + name) + '` is not valid (does not appear in "table-nonbinary-unicode-properties")');
}
return regexSyntaxError(('The `\\p` escaped binary property name `' + name) + '` is not valid (does not appear in "table-nonbinary-unicode-properties")');
}
let vc = (',' + value) + ',';
if (((!TABLE_GEN_CAT_VALUES.includes(vc)) && (!TABLE_SCRIPT_VALUES.includes(vc)))) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, ('The escaped property value `' + value) + '` is not valid (does not appear in "table-unicode-general-category-values" nor "table-unicode-script-values")');
}
return regexSyntaxError(('The escaped property value `' + value) + '` is not valid (does not appear in "table-unicode-general-category-values" nor "table-unicode-script-values")');
}
skip();
if (webCompat === true) {
return 0;
}
return updateRegexUflagIsMandatory(0, 'The `\\p` property escape is only legal with a u-flag, or as a webcompat edge case');
}
if (((!TABLE_BIN_UNI_PROPS.includes(nc)) && (!TABLE_GEN_CAT_VALUES.includes(nc)))) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, ('The escaped lone property name `' + name) + '` is not valid (does not appear in "table-binary-unicode-properties" nor "table-unicode-general-category-values")');
}
return regexSyntaxError(('The escaped lone property name `' + name) + '` is not valid (does not appear in "table-binary-unicode-properties" nor "table-unicode-general-category-values") with u-flag, and `\\p` is not valid without u-flag and without webcompat');
}
skip();
if (webCompat === true) {
return 0;
}
return updateRegexUflagIsMandatory(0, 'The `\\p` property escape is only legal with a u-flag, or as a webcompat edge case');
}
function parseRegexFlags() {
let g = 0;
let i = 0;
let m = 0;
let u = 0;
let y = 0;
let s = 0;
while (pointer < len) {
let c = cache;
switch (c) {
case 0x67:
++g;
break;
case 0x69:
++i;
break;
case 0x6D:
++m;
break;
case 0x75:
++u;
break;
case 0x79:
++y;
break;
case 0x73:
if (!supportRegexDotallFlag) {
return THROW('The dotall flag `s` is not supported in the currently targeted language version', pointer, pointer);
}
++s;
break;
default:
if ((isAsciiLetter(c) || (c === 0x5c))) {
return regexSyntaxError(((('Unknown regex flag [ord=' + c) + ', `') + String.fromCharCode(c)) + '`)]');
}
if ((((((g | i) | m) | u) | y) | s) > 1) {
return regexSyntaxError('Encountered at least one regex flag twice');
}
return ((u > 0)? 1 : 2);
}
skip();
}
if ((((((g | i) | m) | u) | y) | s) > 1) {
return regexSyntaxError('Encountered at least one regex flag twice');
}
return ((u > 0)? 1 : 2);
}
function parseRegexCurlyQuantifier(c) {
let min = 0;
while (isAsciiNumber(c)) {
min = (min * 10) + (c - 0x30);
skip();
if (pointer >= len) return 3;
c = cache;
}
if (c !== 0x2c) {
if (c !== 0x7d) return 3;
skip();
return 1;
}
skip();
if (pointer >= len) return 3;
c = cache;
if (!isAsciiNumber(c)) {
if (c !== 0x7d) return 3;
skip();
return 1;
}
let max = 0;
do {
max = (max * 10) + (c - 0x30);
skip();
if (pointer >= len) return 3;
c = cache;
} while (isAsciiNumber(c));
if (c !== 0x7d) return 3;
skip();
if (min <= max) return 1;
return 2;
}
function isSurrogateLead(c) {
return ((c >= 0xD800) && (c <= 0xDBFF));
}
function isSurrogateTail(c) {
return ((c >= 0xDC00) && (c <= 0xDFFF));
}
function getSurrogate(c1, c2) {
return (((c1 - 0xD800) * 0x400) + (c2 - 0xDC00)) + 0x10000;
}
function parseDecimalEscape(c) {
let reason = 'Cannot escape \\8 or \\9 in a regex char class with u-flag';
if (webCompat === true) {
updateRegexUflagIsIllegal(0, reason);
return c | 16777216;
}
regexSyntaxError(reason);
return 0x110000;
}
function parseOctalFromSecondDigit(firstChar) {
if (pointer >= len) return firstChar - 0x30;
let secondChar = cache;
if (isLowerOctal(firstChar)) {
if (isOctal(secondChar)) {
skip();
if (pointer >= len) return ((firstChar - 0x30) * 8) + (secondChar - 0x30);
let thirdChar = cache;
if (isOctal(thirdChar)) {
skip();
return ((((firstChar - 0x30) * 8) * 8) + ((secondChar - 0x30) * 8)) + (thirdChar - 0x30);
}
return ((firstChar - 0x30) * 8) + (secondChar - 0x30);
}
return firstChar - 0x30;
}
if (isOctal(secondChar)) {
skip();
if (pointer >= len) return ((firstChar - 0x30) * 8) + (secondChar - 0x30);
let thirdChar = cache;
if (isLowerOctal(thirdChar)) {
skip();
return ((((firstChar - 0x30) * 8) * 8) + ((secondChar - 0x30) * 8)) + (thirdChar - 0x30);
}
return ((firstChar - 0x30) * 8) + (secondChar - 0x30);
}
return firstChar - 0x30;
}
function isOctal(c) {
return ((c >= 0x30) && (c <= 0x37));
}
function isLowerOctal(c) {
return ((c >= 0x30) && (c <= 0x33));
}
function isUpperOctal(c) {
return ((c >= 0x34) && (c <= 0x37));
}
function parseUnicodeEscapeForNonRegex() {
let c = cache;
if (c !== 0x7b) {
return parseUnicodeQuadEscape(c, true);
}
return parseUnicodeRubyEscape();
}
function parseUnicodeEscapeForRegexAtom() {
if (pointer >= len) {
return regexSyntaxError('Early EOF while trying to parse unicode escape');
}
let c = cache;
let wasRuby = false;
if (c === 0x7b) {
c = parseUnicodeRubyEscape();
wasRuby = true;
} else {
c = parseUnicodeQuadEscape(c, false);
}
if (pointer >= len) {
return regexSyntaxError('EOF while trying to parse regex atom unicode escape');
}
if (c === 0x110000) {
if (webCompat === true) {
return updateRegexUflagIsIllegal(0, 'Error while trying to parse regex atom unicode escape');
}
return regexSyntaxError('Error while trying to parse regex atom unicode escape');
}
if ((wasRuby && (webCompat === false))) {
return updateRegexUflagIsMandatory(0, 'A regex atom that is an unicode ruby escape is only legal with u-flag');
}
if ((((wasRuby && (webCompat === true))) && (!c.toString(16).match(/[a-z]/i)))) {
if ((pointer < len && (cache === 0x3f))) {
skip();
}
return 8;
}
return 0;
}
function parseUnicodeEscapeForRegexCharClass() {
if (pointer >= len) {
regexSyntaxError('Early EOF while parsing a unicode escape in a regex char class');
return 0x110000;
}
let c = cache;
let wasQuad = true;
if (c === 0x7b) {
c = parseUnicodeRubyEscape();
wasQuad = false;
} else {
c = parseUnicodeQuadEscape(c, false);
}
if (pointer >= len) {
regexSyntaxError('Early EOF while parsing a unicode escape in a regex char class');
return 0x110000;
}
if (c === 0x110000) {
return 0x110000;
}
let rubyWebException = false;
if (!wasQuad) {
if (webCompat === false) {
updateRegexUflagIsMandatory(0, 'Found a unicode ruby escape which is only valid with u-flag');
rubyWebException = true;
}
c |= 67108864;
}
if (rubyWebException) return c | 8388608;
return c;
}
function parseUnicodeQuadEscape(a, noDouble) {
if (eofd(3)) {
updateRegexUflagIsIllegal(0, 'Unexpected EOF while parsing unicode quad escape');
return 0x110000;
}
let b = peekd(1);
let c = peekd(2);
let d = peekd(3);
let va = getHexValue(a);
let vb = getHexValue(b);
let vc = getHexValue(c);
let vd = getHexValue(d);
if ((((va | vb) | vc) | vd) > 15) {
updateRegexPotentialError('Attempted to parse a unicode quad escape but at least one digit was not a hex');
return 0x110000;
}
skip();
skip();
skip();
skip();
let firstPart = (((va << 12) | (vb << 8)) | (vc << 4)) | vd;
if ((((((((((noDouble || (firstPart < 0xD800))) || (firstPart > 0xDBFF))) || eofd(5))) || (cache !== 0x5c))) || (peekd(1) !== 0x75))) {
return firstPart;
}
let e = peekd(2);
let f = peekd(3);
let g = peekd(4);
let h = peekd(5);
let ve = getHexValue(e);
let vf = getHexValue(f);
let vg = getHexValue(g);
let vh = getHexValue(h);
if ((((ve | vf) | vg) | vh) > 15) {
return firstPart;
}
let secondPart = (((ve << 12) | (vf << 8)) | (vg << 4)) | vh;
if (((secondPart < 0xDC00) || (secondPart > 0xDFFF))) {
return firstPart;
}
skip();
skip();
skip();
skip();
skip();
skip();
let codepoint = surrogateToCodepoint(firstPart, secondPart);
updateRegexPotentialError('A double unicode quad escape that represents a surrogate pair in char class or group name is only valid with u-flag');
return codepoint;
}
function parseUnicodeRubyEscape() {
skip();
let c = parseUnicodeRubyEscapeBody();
if (((((c === 0x110000) || pointer >= len)) || (!(cache === 0x7d)))) {
return 0x110000;
}
skip();
return c;
}
function parseUnicodeRubyEscapeBody() {
if (pointer >= len) return 0x110000;
let a = cache;
let v = getHexValue(a);
if (v === 16) return 0x110000;
skip();
return parseUnicodeRubyEscapeBody2(v);
}
function parseUnicodeRubyEscapeBody2(v) {
if (v === 0) {
if (pointer >= len) return 0x110000;
let c = skipZeroes();
v = getHexValue(c);
if (v === 16) {
return 0;
}
skip();
}
return parseUnicodeRubyEscapeBody3(v);
}
function parseUnicodeRubyEscapeBody3(v) {
if (pointer >= len) return 0x110000;
let b = cache;
let vb = getHexValue(b);
if (vb === 16) return v;
skip();
return parseUnicodeRubyEscapeBody4((v << 4) + vb);
}
function parseUnicodeRubyEscapeBody4(v) {
if (pointer >= len) return 0x110000;
let c = cache;
let vc = getHexValue(c);
if (vc === 16) return v;
skip();
return parseUnicodeRubyEscapeBody5((v << 4) + vc);
}
function parseUnicodeRubyEscapeBody5(v) {
if (pointer >= len) return 0x110000;
let d = cache;
let vd = getHexValue(d);
if (vd === 16) return v;
skip();
return parseUnicodeRubyEscapeBody6((v << 4) + vd);
}
function parseUnicodeRubyEscapeBody6(v) {
if (pointer >= len) return 0x110000;
let e = cache;
let ve = getHexValue(e);
if (ve === 16) return v;
skip();
return parseUnicodeRubyEscapeBody7((v << 4) + ve);
}
function parseUnicodeRubyEscapeBody7(v) {
if (pointer >= len) return 0x110000;
let f = cache;
let vf = getHexValue(f);
if (vf === 16) return v;
skip();
let r = (v << 4) + vf;
if (r >= 0x110000) return 0x110000;
return r;
}
function parseOtherUnicode(c) {
switch (c) {
case 0xA0:
return parseSpace();
case 0xFEFF:
return parseSpace();
case 0x2028:
return parseNewlineSolo();
case 0x2029:
return parseNewlineSolo();
default:
let t = parseIdentUnicodeOrError(c);
if (t !== 2097175) return t;
return parseWhitespaceUnicodeOrError(c);
}
}
function parseIdentUnicodeOrError(c) {
let cu = input.codePointAt(pointer - 1);
let wide = isIdentStart(cu, pointer - 1);
if (wide !== (-1)) {
if (wide === (-3)) skip();
return parseIdentifierRest(String.fromCodePoint(cu), ((wide === (-3))? 2 : 1));
}
if (!lastReportableLexerError) lastReportableLexerError = ((('Unexpected unicode character: ' + c) + ' (') + String.fromCharCode(c)) + ')';
return 2097175;
}
function parseWhitespaceUnicodeOrError(c) {
return ([0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x202F, 0x205F, 0x3000].includes(c)? 257 : 2097175);
}
function THROW(str, tokenStart, tokenStop) {
$error('Throwing this error:', str);
_THROW('Lexer error! ' + str, tokenStart, tokenStop);
}
function _THROW(str, tokenStart, tokenStop, msg = '', withCodeFrame = errorCodeFrame, fullCodeFrameLocal = truncCodeFrame) {
let ectxt = (withCodeFrame? getErrorContext(tokenStart, tokenStop, msg, fullCodeFrameLocal) : '');
let context = (('\n`````\n' + (((ectxt[ectxt.length - 1] !== '\n')? '\n' : ''))) + ectxt) + '`````\n';
$log('Error at:' + context);
if (gracefulErrors === false) throw new Error(((str + '\n') + ((withCodeFrame? '\n' : ''))) + ectxt); else $error(str);
}
function getErrorContext(tokenStart, tokenStop, msg, truncCodeFrame = false) {
let inputOffset = 0;
if ((truncCodeFrame && (tokenStart > 100))) inputOffset = tokenStart - 100;
let inputLen = input.length - inputOffset;
if ((truncCodeFrame && ((tokenStop + 100) < input.length))) inputLen = (tokenStop + 100) - inputOffset;
let isPointerIncluded = true;
if ((inputOffset + inputLen) < pointer) {
let len = pointer - inputOffset;
if (len < 1024) {
inputLen = len;
} else {
isPointerIncluded = false;
}
}
let usedInput = input.slice(inputOffset, inputOffset + inputLen);
let tokenOffset = tokenStart - inputOffset;
let nl1 = usedInput.lastIndexOf('\n', tokenOffset);
let nl2 = usedInput.indexOf('\n', nl1 + 1);
if (nl2 < 0) nl2 = usedInput.length;
let arrowCount = ((tokenStop - tokenStart) || 1);
let indentCount = tokenOffset - (nl1 + 1);
let pointerLine = currentLine;
let errorLine = currentLine;
let errorColumn = ((((inputOffset > 0) && (nl1 < 0)))? (-1) : ((tokenStart - inputOffset) - (((nl1 >= 0)? nl1 + 1 : 0))));
if (isPointerIncluded) {
let relativePointer = pointer - inputOffset;
let searchPointer = relativePointer;
while (searchPointer > 0) {
searchPointer = usedInput.lastIndexOf('\n', searchPointer - 1);
--pointerLine;
if (searchPointer > nl1) --errorLine;
}
if (searchPointer !== 0) pointerLine += 1;
}
let maxPointerlineLen = ('' + currentLine).length;
let gutterWidth = maxPointerlineLen + 4;
let pre = usedInput.slice(0, nl2).split('\n');
let post = usedInput.slice(nl2 + 1, inputLen).split('\n');
while (((pre.length > 1) && (pre[0].length === 0))) {
pre.shift();
++pointerLine;
}
while (((post.length > 0) && (post[post.length - 1].length === 0))) {
post.pop();
}
let lc = pointerLine;
let pre2 = pre.map(s => (((' ' + ('' + (lc++)).padStart(maxPointerlineLen, ' ')) + ' ║ ') + s.trimRight())).join('\n');
let post2 = post.map(s => (((' ' + ('' + (lc++)).padStart(maxPointerlineLen, ' ')) + ' ║ ') + s.trimRight())).join('\n');
if (('' + lc).length > maxPointerlineLen) {
maxPointerlineLen = ('' + lc).length;
gutterWidth = maxPointerlineLen + 4;
lc = pointerLine;
pre2 = pre.map(s => (((' ' + ('' + (lc++)).padStart(maxPointerlineLen, ' ')) + ' ║ ') + s.trimRight())).join('\n');
post2 = post.map(s => (((' ' + ('' + (lc++)).padStart(maxPointerlineLen, ' ')) + ' ║ ') + s.trimRight())).join('\n');
}
let col = ((pointerLine === 1)? inputOffset : ((inputOffset - input.lastIndexOf('\n', inputOffset)) - 1));
let top = ((((((('start@' + pointerLine) + ':') + (((col < 0)? '?' : col))) + ', error@') + errorLine) + ':') + (((errorColumn < 0)? '?' : errorColumn))) + '\n';
let bar = '═'.repeat(top.length - gutterWidth) + '\n';
let header = ('╔' + '═'.repeat(maxPointerlineLen)) + '═╦';
let footer = ('╚' + '═'.repeat(maxPointerlineLen)) + '═╩';
let returnValue = ((((((((((((((((top + header) + bar) + pre2) + '\n') + ' '.repeat(Math.max(0, maxPointerlineLen + 1))) + ' ║ ') + ' '.repeat(Math.max(0, indentCount))) + '^'.repeat(Math.max(0, arrowCount))) + '------- error') + ((msg? ': ' + msg : ''))) + (((tokenOffset >= usedInput.length)? ' at EOF' : ''))) + ((post2? '\n' : ''))) + post2) + '\n') + footer) + bar) + '';
return returnValue.split('\n').map(s => (s.trimRight())).join('\n');
}
return {tokens:tokenStorage, nextToken:nextToken, asi:addAsi, throw:_THROW, lexError:function() {
THROW(lastReportableLexerError, startForError, pointer);
}, getTokenCountAny:function() {
return anyTokenCount;
}, getTokenCountSolid:function() {
return solidTokenCount;
}, prevEndColumn:function() {
return prevTokenEndColumn;
}, prevEndLine:function() {
return prevTokenEndLine;
}, prevEndPointer:function() {
return prevTokenEndPointer;
}, currColumn:function() {
return pointer - currentColOffset;
}, currLine:function() {
return currentLine;
}, currPointer:function() {
return pointer;
}, getNlwas:function() {
return nlwas;
}, getCanoN:function() {
return lastCanonizedInput;
}, getType:function() {
return lastType;
}, getStart:function() {
return lastStart;
}, getStop:function() {
return lastStop;
}, getLine:function() {
return lastLine;
}, getColumn:function() {
return lastColumn;
}, sliceInput:slice};
}
function isLfPsLs(c) {
return ((c === 0x0A) || isPsLs(c));
}
function isPsLs(c) {
return ((c === 0x2028) || (c === 0x2029));
}
function START(type) {
switch (type) {
case 1:
return 'START_SPACE';
case 2:
return 'START_ID';
case 3:
return 'START_KEY';
case 4:
return 'START_NL_SOLO';
case 5:
return 'START_CR';
case 6:
return 'START_STRING';
case 7:
return 'START_DECIMAL';
case 8:
return 'START_DOT';
case 9:
return 'START_CURLY_CLOSE';
case 10:
return 'START_EQ';
case 11:
return 'START_DIV';
case 12:
return 'START_PLUS';
case 13:
return 'START_MIN';
case 14:
return 'START_ZERO';
case 15:
return 'START_TEMPLATE';
case 16:
return 'START_EXCL';
case 17:
return 'START_PERCENT';
case 18:
return 'START_AND';
case 19:
return 'START_STAR';
case 20:
return 'START_CARET';
case 21:
return 'START_LT';
case 22:
return 'START_GT';
case 23:
return 'START_OR';
case 24:
return 'START_BSLASH';
case 26:
return 'START_ERROR';
}
return ('S<' + T(type)) + '>';
}
// </lexer>

// <parser>
let ASSERT_ASI_REGEX_NEXT = false;
function sansFlag(flags, flag) {
return (flags | flag) ^ flag;
}
function hasAllFlags(flags1, flags2) {
return (flags1 & flags2) === flags2;
}
function hasAnyFlag(flags1, flags2) {
return (flags1 & flags2) !== 0;
}
function hasNoFlag(flags, flag) {
return (flags & flag) === 0;
}
function Parser(code, options = {}) {
let {goalMode:options_goalMode = false, collectTokens:options_collectTokens = 0, webCompat:options_webCompat = true, strictMode:options_strictMode = false, astRoot:options_astRoot = null, tokenStorage:options_tokenStorage, getLexer = null, allowGlobalReturn = false, targetEsVersion = Infinity, exposeScopes:options_exposeScopes = false, astUids = false, ranges:options_ranges = false, templateNewlineNormalization = true, errorCodeFrame = true, truncCodeFrame = true, $log = console.log, $warn = console.warn, $error = console.error, sourceField = '', babelCompat = false, babelTokenCompat = false, acornCompat = false, AST_directiveNodes = false} = options;
let goalMode = false;
if ((typeof options_goalMode) === 'string') {
if (options_goalMode === 'module') goalMode = true; else if (options_goalMode === 'script') goalMode = false; else throw new Error(('Unknown goal symbol value: `' + options_goalMode) + '`');
} else {
goalMode = options_goalMode;
}
let collectTokens = 0;
if ((typeof options_collectTokens) === 'string') {
if (options_collectTokens === 'all') collectTokens = 2; else if (options_collectTokens === 'solid') collectTokens = 1; else if (options_collectTokens === 'none') collectTokens = 0; else if (options_collectTokens === 'types') collectTokens = 3; else throw new Error(('Unknown collectTokens value: `' + options_collectTokens) + '`');
} else {
collectTokens = options_collectTokens;
}
let NODE_NAME_PROPERTY = (babelCompat? 'ObjectProperty' : 'Property');
let NODE_NAME_METHOD_OBJECT = (babelCompat? 'ObjectMethod' : 'Property');
let NODE_NAME_METHOD_CLASS = (babelCompat? 'ClassMethod' : 'MethodDefinition');
let tok = Lexer(code, {targetEsVersion, parsingGoal:goalMode, collectTokens, returnTokens:(babelCompat? 2 : 3), webCompat:options_webCompat, gracefulErrors:false, tokenStorageExternal:options_tokenStorage, babelTokenCompat, errorCodeFrame, truncCodeFrame, $log, $warn, $error});
let tok_throw = tok.throw;
let tok_lexError = tok.lexError;
let tok_asi = tok.asi;
let tok_prevEndColumn = tok.prevEndColumn;
let tok_prevEndLine = tok.prevEndLine;
let tok_prevEndPointer = tok.prevEndPointer;
let tok_currColumn = tok.currColumn;
let tok_currLine = tok.currLine;
let tok_currPointer = tok.currPointer;
let tok_nextToken = tok.nextToken;
let tok_getNlwas = tok.getNlwas;
let tok_getCanoN = tok.getCanoN;
let tok_getType = tok.getType;
let tok_getStart = tok.getStart;
let tok_getStop = tok.getStop;
let tok_getLine = tok.getLine;
let tok_getColumn = tok.getColumn;
let tok_sliceInput = tok.sliceInput;
let assertExpectedFail = '';
let $tp_assertExpected_start = tok_getStart();
let $tp_assertExpected_stop = tok_getStop();
let allowExponentiation = ((targetEsVersion >= 7) || (targetEsVersion === Infinity));
let allowTrailingFunctionComma = ((targetEsVersion >= 8) || (targetEsVersion === Infinity));
let allowAsyncFunctions = ((targetEsVersion >= 8) || (targetEsVersion === Infinity));
let allowAsyncGenerators = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
let allowBadEscapesInTaggedTemplates = ((targetEsVersion >= 9) || (targetEsVersion === Infinity));
let allowOptionalCatchBinding = ((targetEsVersion >= 10) || (targetEsVersion === Infinity));
let allowDynamicImport = ((targetEsVersion >= 11) || (targetEsVersion === Infinity));
let allowExportStarAs = ((targetEsVersion >= 11) || (targetEsVersion === Infinity));
if (getLexer) getLexer(tok);
function THROW_RANGE(desc, tokenStart, tokenStop, ...args) {
if (arguments.length < 3) throw new Error('Expecting 3 args for THROW_RANGE, received ' + arguments.length);
if (tokenStart > tokenStop) throw new Error(((('range should be >=0, was [' + tokenStart) + ', ') + tokenStop) + ']');
$log('\n');
$log('Error in parser:', desc, 'remaining throw args;', args);
let fullErrmsg = ('Parser error! ' + desc) + (((tok_getType() === 2097173)? ' (at EOF)' : ''));
tok_throw(fullErrmsg, tokenStart, tokenStop, '');
}
let uid_counter = 0;
let _tree = {type:'Program', loc:undefined, body:[]};
if (babelCompat) {
_tree = {type:'Program', loc:undefined, body:[], sourceType:((goalMode === false)? 'script' : 'module'), interpreter:null};
}
if (acornCompat) {
_tree = {type:'Program', loc:undefined, body:[], sourceType:((goalMode === false)? 'script' : 'module')};
}
let _path = [_tree];
let _pnames;
if (options_astRoot) {
options_astRoot.root = _tree;
options_astRoot.path = _path;
}
function AST_getClosedLoc($tp_first_start, $tp_first_line, $tp_first_column) {
return AST_getCloseLoc($tp_first_start, $tp_first_line, $tp_first_column, tok_prevEndPointer(), tok_prevEndLine(), tok_prevEndColumn());
}
function AST_getCloseLoc(startIndex, startLine, startColumn, endIndex, endLine, endColumn) {
if (options_ranges) {
return {start:{line:startLine | 0, column:startColumn | 0}, end:{line:endLine | 0, column:endColumn | 0}, range:{start:startIndex | 0, end:endIndex | 0}, source:sourceField};
}
return {start:{line:startLine, column:startColumn}, end:{line:endLine, column:endColumn}, source:sourceField};
}
function AST_open(prop, newNode) {
AST_setNode(prop, newNode);
_path[_path.length] = newNode;
}
function AST_close($tp_open_start, $tp_open_line, $tp_open_column) {
AST_set('loc', AST_getCloseLoc($tp_open_start, $tp_open_line, $tp_open_column, tok_prevEndPointer(), tok_prevEndLine(), tok_prevEndColumn()));
_path.pop();
}
function AST_closeTemplateElement(isTemplateDouble, $tp_tick_start, $tp_tick_line, $tp_tick_column) {
let colEnd = tok_prevEndColumn() - 1;
let pointerEnd = tok_prevEndPointer();
if (isTemplateDouble) {
--colEnd;
--pointerEnd;
}
AST_set('loc', AST_getCloseLoc($tp_tick_start, $tp_tick_line, $tp_tick_column, pointerEnd, tok_prevEndLine(), colEnd));
_path.pop();
}
function AST_set(prop, value) {
_path[_path.length - 1][prop] = value;
}
function AST_setNode(astProp, node) {
if (astUids) node.$uid = uid_counter++;
let parentNode = _path[_path.length - 1];
let p = parentNode[astProp];
if (Array.isArray(p)) {
p[p.length] = node;
} else {
parentNode[astProp] = node;
}
}
function AST_setNodeDangerously(astProp, node) {
if ((astUids && node)) node.$uid = uid_counter++;
let parentNode = _path[_path.length - 1];
let p = parentNode[astProp];
if (Array.isArray(p)) {
p[p.length] = node;
} else {
parentNode[astProp] = node;
}
}
function AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon) {
let identNode = AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
AST_setNode(astProp, identNode);
}
function AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon) {
let col = $tp_ident_column;
let line = $tp_ident_line;
let len = $tp_ident_stop - $tp_ident_start;
let colEnd = col + len;
let identNode = {type:'Identifier', loc:AST_getCloseLoc($tp_ident_start, line, col, $tp_ident_stop, line, colEnd), name:$tp_ident_canon};
if (babelCompat) identNode.loc.identifierName = $tp_ident_canon;
return identNode;
}
function AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon) {
_AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, false);
}
function _AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, fromDirective) {
if (isStringToken($tp_lit_type)) {
AST_setStringLiteral(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon, fromDirective);
} else if (isNumberToken($tp_lit_type)) {
if (isBigintToken($tp_lit_type)) {
AST_setBigInt(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
} else {
AST_setNumberLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
}
} else {
AST_setRegexLiteral(astProp, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column);
}
}
function AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
if (babelCompat) return AST_babelGetStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective);
let node = {type:'Literal', loc:AST_getCloseLoc($tp_string_start, $tp_string_line, $tp_string_column, tok_prevEndPointer(), tok_prevEndLine(), tok_prevEndColumn()), value:$tp_string_canon, raw:tok_sliceInput($tp_string_start, $tp_string_stop)};
return node;
}
function AST_setStringLiteral(astProp, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
let stringNode = AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective);
AST_setNode(astProp, stringNode);
}
function AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
if (isBigintToken($tp_number_type)) return AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
if (babelCompat) return AST_babelGetNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
let str = tok_sliceInput($tp_number_start, $tp_number_stop);
let value = (($tp_number_type === 4105)? parseFloat(str) : ((($tp_number_type === 4104)? parseInt(str.slice(2), 16) : ((($tp_number_type === 4106)? parseInt(str.slice(2), 2) : ((($tp_number_type === 4107)? parseInt(str.slice(2), 8) : ((((str.includes('8') || str.includes('9')))? parseFloat(str.slice(1)) : parseInt(str.slice(1), 8))))))))));
return {type:'Literal', loc:AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)), value:value, raw:str};
}
function AST_setNumberLiteral(astProp, $tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
let numberNode = AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
AST_setNode(astProp, numberNode);
}
function AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
if (acornCompat) return AST_acornGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
if (babelCompat) return AST_babelGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
return {type:'BigIntLiteral', loc:AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)), value:null, bigint:tok_sliceInput($tp_number_start, $tp_number_stop - 1)};
}
function AST_setBigInt(astProp, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
let bigintNode = AST_getBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column);
AST_setNode(astProp, bigintNode);
}
function AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
if (acornCompat) return AST_acornGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);
if (babelCompat) return AST_babelGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);
let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
let pos = str.lastIndexOf('/');
let body = str.slice(1, pos);
let tail = str.slice(pos + 1);
return {type:'Literal', loc:AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column, $tp_regex_stop, $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)), value:null, regex:{pattern:body, flags:tail}, raw:str};
}
function AST_setRegexLiteral(astProp, $tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
let regexNode = AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column);
AST_setNode(astProp, regexNode);
}
function AST_add(prop, value) {
let arr = _path[_path.length - 1][prop];
arr[arr.length] = value;
}
function AST_popNode(prop) {
let parent = _path[_path.length - 1];
let p = parent[prop];
if (Array.isArray(p)) {
return p.pop();
} else {
return p;
}
}
function AST_wrapClosedCustom(prop, newNode, newProp) {
let child = AST_popNode(prop);
AST_open(prop, newNode);
AST_set(newProp, child);
}
function AST_wrapClosedIntoArrayCustom(prop, newNode, newProp) {
let child = AST_popNode(prop);
AST_open(prop, newNode);
AST_set(newProp, [child]);
}
function AST_destruct(prop) {
let parent = _path[_path.length - 1];
let node = parent[prop];
if (Array.isArray(node)) {
let last = node.length - 1;
AST__destruct(node[last], node, last);
return;
}
AST__destruct(node, parent, prop);
}
function AST__destruct(node, parent, astProp) {
switch (node.type) {
case 'ArrayExpression':
node.type = 'ArrayPattern';
let elements = node.elements;
let e = elements.length;
for (let i = 0;i < e;++i) {
let element = elements[i];
if (element) AST__destruct(element, elements, i);
}
return;
case 'ObjectExpression':
node.type = 'ObjectPattern';
let properties = node.properties;
let n = properties.length;
for (let i = 0;i < n;++i) {
if (properties[i].type === NODE_NAME_PROPERTY) {

} else {

}
AST__destruct(properties[i], properties, i);
}
return;
case 'AssignmentExpression':
AST__destruct(node.left, node, 'left');
AST_destructReplaceAssignment(parent, astProp);
return;
case NODE_NAME_PROPERTY:
AST__destruct(node.value, node, 'value');
return;
case 'SpreadElement':
node.type = 'RestElement';
AST__destruct(node.argument, node, 'argument');
return;
}
}
function AST_destructReplaceAssignment(parentNode, prop) {
let oldNode = parentNode[prop];
if (oldNode.operator !== '=') {
return THROW_RANGE('The destructuring assignment should be a regular assignment', tok_getStart(), tok_getStop());
}
let newNode = {type:'AssignmentPattern', loc:oldNode.loc, left:oldNode.left, right:oldNode.right};
parentNode[prop] = newNode;
}
function AST_convertArrayToPattern($tp_eq_type, astProp) {
if ($tp_eq_type === 49264) {
let node = _path[_path.length - 1][astProp];
if (Array.isArray(node)) {
node = node[node.length - 1];
}
if (((node.type === 'ArrayExpression') || (node.type === 'ObjectExpression'))) {
AST_destruct(astProp);
}
}
}
function AST_throwIfIllegalUpdateArg(astProp) {
let head = _path[_path.length - 1];
let prev = (head && head[astProp]);
if (((!prev) || (((prev instanceof Array)? (((!prev.length) || (((prev[prev.length - 1].type !== 'Identifier') && (prev[prev.length - 1].type !== 'MemberExpression'))))) : (((prev.type !== 'Identifier') && (prev.type !== 'MemberExpression'))))))) {
return THROW_RANGE('Can only increment or decrement an identifier or member expression', tok_getStart(), tok_getStop());
}
}
function AST_patchAsyncCall($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, astProp) {
let node = _path[_path.length - 1];
let args = node[astProp];
if (args instanceof Array) args = args[0];
if (args.type === 'SequenceExpression') args = args.expressions; else args = [args];
if (node[astProp] instanceof Array) node[astProp] = []; else node[astProp] = undefined;
AST_setNode(astProp, {type:'CallExpression', loc:AST_getClosedLoc($tp_async_start, $tp_async_line, $tp_async_column), callee:AST_getIdentNode($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon), arguments:args});
}
function AST_babelDirectives() {
let node = _path[_path.length - 1];
let dirs = [];
AST_set('directives', dirs);
while ((node.body.length && (node.body[0].directive !== undefined))) {
let dir = node.body.shift();
dirs[dirs.length] = {type:'Directive', loc:dir.loc, value:dir.expression};
dir.expression.type = 'DirectiveLiteral';
}
}
function AST_babelParenthesizesClosed($tp_parenOpen_start, astProp) {
let parent = _path[_path.length - 1];
let child = parent[astProp];
if (Array.isArray(child)) {
child = child[child.length - 1];
}
if (child.extra) {
child.extra.parenthesized = true;
child.extra.parenStart = $tp_parenOpen_start;
} else {
child.extra = {parenthesized:true, parenStart:$tp_parenOpen_start};
}
}
function AST_babelAddComment($tp_comment_start, $tp_comment_stop, $tp_comment_line, $tp_comment_column, $tp_comment_type) {
if (!_path[_path.length - 1].innerComments) _path[_path.length - 1].innerComments = [];
let str = tok_sliceInput($tp_comment_start, $tp_comment_stop);
let typeName = 'CommentLine';
let value = '';
if ($tp_comment_type === 1285) {
value = tok_sliceInput($tp_comment_start + 2, $tp_comment_stop);
} else if ($tp_comment_type === 1286) {
typeName = 'CommentBlock';
value = tok_sliceInput($tp_comment_start + 2, $tp_comment_stop - 2);
} else {
value = ((str.slice(0, 3) === '-->')? tok_sliceInput($tp_comment_start + 3, $tp_comment_stop) : tok_sliceInput($tp_comment_start + 4, $tp_comment_stop));
}
let commentNode = {type:typeName, loc:AST_getCloseLoc($tp_comment_start, $tp_comment_line, $tp_comment_column, tok_currPointer(), tok_currLine(), tok_currColumn()), value:value};
AST_setNode('innerComments', commentNode);
return commentNode;
}
function AST_babelGetStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, fromDirective) {
let str = tok_sliceInput($tp_string_start, $tp_string_stop);
let value = (fromDirective? str.slice(1, -1) : $tp_string_canon);
return {type:'StringLiteral', loc:AST_getCloseLoc($tp_string_start, $tp_string_line, $tp_string_column, tok_prevEndPointer(), tok_prevEndLine(), tok_prevEndColumn()), value:value, extra:{rawValue:value, raw:str}};
}
function AST_babelGetNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
let str = tok_sliceInput($tp_number_start, $tp_number_stop);
let value = (($tp_number_type === 4105)? parseFloat(str) : ((($tp_number_type === 4104)? parseInt(str.slice(2), 16) : ((($tp_number_type === 4106)? parseInt(str.slice(2), 2) : ((($tp_number_type === 4107)? parseInt(str.slice(2), 8) : ((((str.includes('8') || str.includes('9')))? parseFloat(str.slice(1)) : parseInt(str.slice(1), 8))))))))));
return {type:'NumericLiteral', loc:AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)), value:value, extra:{rawValue:value, raw:str}};
}
function AST_babelGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
let str = tok_sliceInput($tp_number_start, $tp_number_stop - 1);
return {type:'BigIntLiteral', loc:AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)), value:str, extra:{rawValue:str, raw:str + 'n'}};
}
function AST_babelGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
let pos = str.lastIndexOf('/');
let body = str.slice(1, pos);
let tail = str.slice(pos + 1);
return {type:'RegExpLiteral', loc:AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column, $tp_regex_stop, $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)), pattern:body, flags:tail, extra:{rawValue:undefined, raw:str}, value:undefined};
}
function AST_acornGetBigIntNode($tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column) {
let strn = tok_sliceInput($tp_number_start, $tp_number_stop);
let str = strn.slice(0, -1);
return {type:'Literal', loc:AST_getCloseLoc($tp_number_start, $tp_number_line, $tp_number_column, $tp_number_stop, $tp_number_line, $tp_number_column + ($tp_number_stop - $tp_number_start)), raw:strn, bigint:str, value:BigInt(str)};
}
function AST_acornGetRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column) {
let str = tok_sliceInput($tp_regex_start, $tp_regex_stop);
let pos = str.lastIndexOf('/');
let body = str.slice(1, pos);
let tail = str.slice(pos + 1);
return {type:'Literal', loc:AST_getCloseLoc($tp_regex_start, $tp_regex_line, $tp_regex_column, $tp_regex_stop, $tp_regex_line, $tp_regex_column + ($tp_regex_stop - $tp_regex_start)), value:new RegExp(body, tail), regex:{pattern:body, flags:tail}, raw:str};
}
function initLexer(lexerFlags) {
skipToStatementStart(lexerFlags);
}
function skipRex(lexerFlags) {
_skip(lexerFlags | 4);
}
function skipDiv(lexerFlags) {
_skip(lexerFlags);
}
function skipAny(lexerFlags) {
_skip(lexerFlags);
}
function _skip(lexerFlags) {
tok_nextToken(lexerFlags);
if (tok_getType() === 2097175) {
return tok_lexError();
}
if (!babelCompat) return;
let $tp_maybeComment_type = tok_getType();
let $tp_maybeComment_line = tok_getLine();
let $tp_maybeComment_column = tok_getColumn();
let $tp_maybeComment_start = tok_getStart();
let $tp_maybeComment_stop = tok_getStop();
while (isCommentToken($tp_maybeComment_type)) {
tok_nextToken(lexerFlags);
if (tok_getType() === 2097175) {
return tok_lexError();
}
AST_babelAddComment($tp_maybeComment_start, $tp_maybeComment_stop, $tp_maybeComment_line, $tp_maybeComment_column, $tp_maybeComment_type);
$tp_maybeComment_type = tok_getType();
$tp_maybeComment_line = tok_getLine();
$tp_maybeComment_column = tok_getColumn();
$tp_maybeComment_start = tok_getStart();
$tp_maybeComment_stop = tok_getStop();
}
}
function skipToParenOpenOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 16471) {
return THROW_RANGE(('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToCurlyOpenOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 16513) {
return THROW_RANGE(('Expected to parse an opening curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToFromOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 2094) {
return THROW_RANGE(('Next token should be the ident `from` but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToStringOrDie(lexerFlags) {
skipAny(lexerFlags);
if (!isStringToken(tok_getType())) {
return THROW_RANGE(('Next token should be a string but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToIdentOrDie(lexerFlags) {
skipAny(lexerFlags);
if (!isIdentToken(tok_getType())) {
return THROW_RANGE(('Next token should be an ident but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToArrowOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 16499) {
return THROW_RANGE(('Next token should be `=>` but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToAsCommaCurlyClose(lexerFlags) {
skipAny(lexerFlags);
}
function skipToAsCommaFrom(lexerFlags) {
skipAny(lexerFlags);
}
function skipToColonOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 16489) {
return THROW_RANGE(('Next token should be `:` but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToTargetOrDie(lexerFlags) {
skipAny(lexerFlags);
if (tok_getType() !== 2116) {
return THROW_RANGE(('Next token should be `target` but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
}
function skipToStatementStart(lexerFlags) {
skipRex(lexerFlags);
}
function skipToExpressionStart(lexerFlags) {
skipRex(lexerFlags);
}
function skipToExpressionStartGrouped(lexerFlags) {
skipRex(lexerFlags);
}
function skipToExpressionStartSemi(lexerFlags) {
skipRex(lexerFlags);
}
function skipToExpressionStartSquareCloseComma(lexerFlags) {
skipRex(lexerFlags);
}
function skipToAfterNew(lexerFlags) {
skipRex(lexerFlags);
}
function skipToSwitchBody(lexerFlags) {
skipAny(lexerFlags);
}
function skipToBindingStart(lexerFlags) {
skipAny(lexerFlags);
}
function skipToBindingStartGrouped(lexerFlags) {
skipAny(lexerFlags);
}
function skipToColonParenOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentParenOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentStarParenOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentStarCurlyOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentCurlyOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentCurlyClose(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentStarCurlyOpenParenOpenString(lexerFlags) {
skipAny(lexerFlags);
}
function skipToAwaitParenOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipToIdentStringNumberSquareOpen(lexerFlags) {
skipAny(lexerFlags);
}
function skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression) {
switch (tok_getType()) {
case 2084:

case 2121:

case 2123:
if (leftHandSideExpression === true) {
return THROW_RANGE('A unary expression is not allowed here', tok_getStart(), tok_getStop());
}
skipToExpressionStart(lexerFlags);
return;
case 2104:
skipToAfterNew(lexerFlags);
return;
case 2075:
if (((goalMode === true) || ((lexerFlags & 8) !== 0))) {
if (leftHandSideExpression === true) {
return THROW_RANGE('An `await` expression is not allowed here', tok_getStart(), tok_getStop());
}
skipToExpressionStart(lexerFlags);
return;
}
skipDiv(lexerFlags);
return 0;
case 2126:
if ((lexerFlags & 8320) !== 0) {
if (leftHandSideExpression === true) {
return THROW_RANGE('A `yield` expression is not allowed here', tok_getStart(), tok_getStop());
}
skipRex(lexerFlags);
return;
}
skipDiv(lexerFlags);
return;
}
skipDiv(lexerFlags);
}
function parseTopLevels(lexerFlags) {
let scoop = SCOPE_createGlobal('_parseTopLevels');
if (options_exposeScopes) AST_set('$scope', scoop);
let exportedNames = new Set();
let exportedBindings = new Set();
let len;
let bak;
parseBodyPartsWithDirectives(lexerFlags, scoop, exportedNames, exportedBindings, 1, 0, 0, 0, 0, 0, '', true, 'body');
if (goalMode === true) {
let globalNames = scoop.names;
exportedBindings.forEach(name => {
if (((name !== 'default') && (((globalNames === HAS_NO_BINDINGS) || (!globalNames.has(name)))))) {
return THROW_RANGE(('Exporting a name that was not bound in global: `' + name) + '`', tok_getStart(), tok_getStop());
}
});
}
}
function SCOPE_createGlobal(desc) {
let scoop = {type:SCOPE_LAYER_GLOBAL, names:HAS_NO_BINDINGS, dupeParamErrorStart:0, dupeParamErrorStop:0, parent:null};
if (astUids) scoop.$uid = uid_counter++;
return scoop;
}
function SCOPE_addLayer(scoop, scopeType, desc) {
let scoopNew = {type:scopeType, names:HAS_NO_BINDINGS, dupeParamErrorStart:0, dupeParamErrorStop:0, parent:scoop};
if (astUids) scoop.$uid = uid_counter++;
return scoopNew;
}
function SCOPE_addFuncDeclName(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState) {
if (bindingType === BINDING_TYPE_FUNC_VAR) {
SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType);
} else {
SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState);
}
}
function SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType) {
if (((bindingType === BINDING_TYPE_VAR) || (bindingType === BINDING_TYPE_FUNC_VAR))) {
SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType);
} else {
SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, 1);
}
}
function SCOPE_addVarBinding(lexerFlags, scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType) {
let currScoop = scoop;
do {
if (currScoop.names === HAS_NO_BINDINGS) {
currScoop.names = new Map();
} else if (currScoop.names.has($tp_bindingIdent_canon)) {
let bindingType = currScoop.names.get($tp_bindingIdent_canon);
verifyDuplicateVarBinding(lexerFlags, bindingType, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon);
}
currScoop.names.set($tp_bindingIdent_canon, bindingType);
currScoop = currScoop.parent;
} while ((currScoop && (currScoop.type !== SCOPE_LAYER_FUNC_ROOT)));
}
function verifyDuplicateVarBinding(lexerFlags, value, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon) {
switch (value) {
case BINDING_TYPE_NONE:

case BINDING_TYPE_ARG:

case BINDING_TYPE_VAR:

case BINDING_TYPE_FUNC_VAR:

case BINDING_TYPE_FUNC_STMT:
return;
case BINDING_TYPE_FUNC_LEX:

case BINDING_TYPE_LET:

case BINDING_TYPE_CONST:

case BINDING_TYPE_CLASS:
return THROW_RANGE('Found a var binding that is duplicate of a lexical binding on the same or lower statement level', $tp_bindingIdent_start, $tp_bindingIdent_stop);
case BINDING_TYPE_CATCH_OTHER:
return THROW_RANGE(('Can not create a binding for `' + $tp_bindingIdent_canon) + '` because was already bound as a catch clause pattern binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
case BINDING_TYPE_CATCH_IDENT:
if (options_webCompat === false) {
return THROW_RANGE(('Can not create a binding for `' + $tp_bindingIdent_canon) + '` because was already bound as a catch clause binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
}
return;
}
}
function SCOPE_addLexBinding(scoop, $tp_bindingIdent_start, $tp_bindingIdent_stop, $tp_bindingIdent_canon, bindingType, fdState) {
if (scoop === null) {
return;
}
let value = ((((scoop.names === HAS_NO_BINDINGS) || (!scoop.names.has($tp_bindingIdent_canon))))? BINDING_TYPE_NONE : scoop.names.get($tp_bindingIdent_canon));
if (value !== BINDING_TYPE_NONE) {
if (bindingType === BINDING_TYPE_ARG) {
scoop.dupeParamErrorStart = $tp_bindingIdent_start + 1;
scoop.dupeParamErrorStop = $tp_bindingIdent_stop;
} else if (((((options_webCompat !== true) || (value !== BINDING_TYPE_FUNC_LEX))) || (fdState !== 3))) {
return THROW_RANGE(('Attempted to create a lexical binding for `' + $tp_bindingIdent_canon) + '` but another binding already existed on the same level', $tp_bindingIdent_start, $tp_bindingIdent_stop);
} else {

}
}
if (((((scoop.type === SCOPE_LAYER_FUNC_BODY) && (scoop.parent.names !== HAS_NO_BINDINGS))) && scoop.parent.names.has($tp_bindingIdent_canon))) {
return THROW_RANGE(('Cannot create lexical binding for `' + $tp_bindingIdent_canon) + '` because it shadows a function parameter', $tp_bindingIdent_start, $tp_bindingIdent_stop);
}
if (((((scoop.type === SCOPE_LAYER_ARROW_PARAMS) && (value !== BINDING_TYPE_NONE))) && (bindingType === BINDING_TYPE_ARG))) {
scoop.dupeParamErrorStart = $tp_bindingIdent_start + 1;
scoop.dupeParamErrorStop = $tp_bindingIdent_stop;
}
if (scoop.type === SCOPE_LAYER_CATCH_BODY) {
let parentValue = ((((scoop.parent.names === HAS_NO_BINDINGS) || (!scoop.parent.names.has($tp_bindingIdent_canon))))? BINDING_TYPE_NONE : scoop.parent.names.get($tp_bindingIdent_canon));
if (((parentValue === BINDING_TYPE_CATCH_IDENT) || (parentValue === BINDING_TYPE_CATCH_OTHER))) {
return THROW_RANGE(('Can not create a lexical binding for `' + $tp_bindingIdent_canon) + '` because it shadows a catch clause binding', $tp_bindingIdent_start, $tp_bindingIdent_stop);
}
}
if (scoop.names === HAS_NO_BINDINGS) scoop.names = new Map();
scoop.names.set($tp_bindingIdent_canon, bindingType);
}
function parseDirectivePrologues(lexerFlags, astProp) {
let hadUseStrict = false;
let isStrict = (lexerFlags & 8192) === 8192;
let hadOctal = false;
while (isStringToken(tok_getType())) {
let $tp_string_type = tok_getType();
let $tp_string_line = tok_getLine();
let $tp_string_column = tok_getColumn();
let $tp_string_start = tok_getStart();
let $tp_string_stop = tok_getStop();
let $tp_string_canon = tok_getCanoN();
skipDiv(lexerFlags);
_AST_setLiteral(astProp, $tp_string_type, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, true);
let $tp_next_start = tok_getStart();
if (tok_getType() !== 16490) {
parseExpressionAfterLiteral(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, astProp);
if (tok_getType() !== 16490) {
parseExpressionFromOp(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, 16, astProp);
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_string_start, $tp_string_line, $tp_string_column, 16, astProp);
}
}
}
if (tok_getStart() === $tp_next_start) {
let dir = tok_sliceInput($tp_string_start + 1, $tp_string_stop - 1);
if (((!isStrict) && /(^|[^\\])(\\\\)*\\(?:0\d|[1-9])/.test(dir))) {
hadOctal = true;
}
if (dir === 'use strict') {
hadUseStrict = true;
lexerFlags = lexerFlags | 8192;
if (!isStrict) {
if (tok_getType() === 4108) {
return THROW_RANGE('Illegal legacy octal literal in strict mode', tok_getStart(), tok_getStop());
}
if (((!hadOctal) && /(^|[^\\])(\\\\)*\\(?:0\d|[1-9])/.test(tok_sliceInput(tok_getStart(), tok_getStop())))) {
return THROW_RANGE('Octal in directive with strict mode directive or in strict mode is always illegal', tok_getStart(), tok_getStop());
}
}
isStrict = true;
}
if ((AST_directiveNodes && (!babelCompat))) {
AST_setNodeDangerously(astProp, {type:'Directive', loc:AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column), directive:dir});
parseSemiOrAsi(lexerFlags);
} else {
parseSemiOrAsi(lexerFlags);
AST_setNodeDangerously(astProp, {type:'ExpressionStatement', loc:AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column), expression:AST_popNode(astProp), directive:dir});
}
} else {
parseSemiOrAsi(lexerFlags);
AST_setNodeDangerously(astProp, {type:'ExpressionStatement', loc:AST_getClosedLoc($tp_string_start, $tp_string_line, $tp_string_column), expression:AST_popNode(astProp)});
break;
}
}
if ((hadOctal && isStrict)) {
return THROW_RANGE('Octal in directive with strict mode directive or in strict mode is always illegal', tok_getStart(), tok_getStop());
}
return hadUseStrict;
}
function parseBodyPartsWithDirectives(lexerFlags, scoop, exportedNames, exportedBindings, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isGlobalToplevel, astProp) {
let wasStrict = (lexerFlags & 8192) === 8192;
let isStrict = wasStrict;
let hasUseStrict = parseDirectivePrologues(lexerFlags, 'body');
if (hasUseStrict) {
isStrict = true;
if (((paramsSimple === 2) || (paramsSimple === 3))) {
return THROW_RANGE('Can only declare use strict if func params are "simple"', tok_getStart(), tok_getStop());
}
if (((((!wasStrict) && ($tp_functionNameToVerify_start !== 0))) && isStrictOnlyKeyword($tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon))) {
return THROW_RANGE(('Can not use reserved keyword `' + $tp_functionNameToVerify_canon) + '` in strict mode as id for function that has a use strict directive', $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop);
}
lexerFlags |= 8192;
}
if (((dupeParamErrorStart !== 0) && (((paramsSimple === 3) || isStrict)))) {
return THROW_RANGE('Function had duplicate params', dupeParamErrorStart - 1, dupeParamErrorStop);
}
while (((tok_getType() !== 2097173) && (tok_getType() !== 16517))) {
parseBodyPart(lexerFlags, scoop, null, exportedNames, exportedBindings, isGlobalToplevel, false, 4, null, astProp);
}
if (babelCompat) AST_babelDirectives();
}
function wrapLabelSet(labelSet, desc) {
let set = {parentLabels:labelSet, statementLabels:new Set(), iterationLabels:null};
return set;
}
function parseStatementHeader(lexerFlags, headProp) {
let $tp_openParan_start = tok_getStart();
skipToExpressionStart(lexerFlags);
parseExpressions(((lexerFlags | 4096) | 1792) ^ 1792, headProp);
if (tok_getType() !== 16472) {
return THROW_RANGE(('Missing closing paren of statement header, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', $tp_openParan_start, tok_getStop());
}
skipToStatementStart(lexerFlags);
}
function parseSemiOrAsi(lexerFlags) {
if (tok_getType() === 16490) {
skipToStatementStart(lexerFlags);
return;
}
if (((((tok_getType() === 16517) || (tok_getNlwas() === true))) || (tok_getType() === 2097173))) {
tok_asi();
} else {
$log('parse error at curent token');
return THROW_RANGE('Unable to ASI', tok_getStart(), tok_getStop());
}
}
function parseNestedBodyPart(lexerFlags, scoop, labelSet, isLabelled, fdState, nestedLabels, astProp) {
parseBodyPart(lexerFlags, scoop, labelSet, undefined, undefined, false, isLabelled, fdState, nestedLabels, astProp);
}
function parseBodyPart(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
if (isIdentToken(tok_getType())) {
parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp);
return;
}
if (isPunctuatorToken(tok_getType())) {
parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp);
return;
}
if (isNumberToken(tok_getType())) {
parseFromNumberStatement(lexerFlags, astProp);
return;
}
if (isStringToken(tok_getType())) {
parseFromStringStatement(lexerFlags, astProp);
return;
}
if (isTickToken(tok_getType())) {
parseTickStatement(lexerFlags, astProp);
return;
}
if (isRegexToken(tok_getType())) {
parseFromRegexStatement(lexerFlags, astProp);
return;
}
THROW_RANGE('Unexpected EOF', tok_getStart(), tok_getStop());
}
function parseFunctionDeclaration(lexerFlags, scoop, isFuncDecl, isRealFuncExpr, $tp_async_type, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, $tp_funcHead_start, $tp_funcHead_stop, optionalIdent, isLabelled, fdState, astProp) {
skipToIdentStarParenOpen(lexerFlags);
let $tp_star_type = 0;
if (tok_getType() === 82009) {
$tp_star_type = 82009;
$tp_funcHead_stop = tok_getStop();
skipToIdentParenOpen(lexerFlags);
if ((($tp_async_type === 2074) && (!allowAsyncGenerators))) {
return THROW_RANGE('Async generators are not supported by the currently targeted language version, they were introduced in ES9/ES2018', $tp_funcHead_start, $tp_funcHead_stop);
}
}
if (isLabelled === true) {
if (fdState === 1) {
return THROW_RANGE('A "labelled function declaration" is not allowed in this situation', $tp_funcHead_start, $tp_funcHead_stop);
}
if ($tp_async_type === 2074) {
return THROW_RANGE('A "labelled function declaration" can not be async', $tp_funcHead_start, $tp_funcHead_stop);
}
if ($tp_star_type === 82009) {
return THROW_RANGE('A "labelled function declaration" can not be a generator', $tp_funcHead_start, $tp_funcHead_stop);
}
if (((options_webCompat === false) || ((lexerFlags & 8192) === 8192))) {
return THROW_RANGE('A "labelled function declaration" is only allowed in sloppy web compat mode', $tp_funcHead_start, $tp_funcHead_stop);
}
} else if (fdState === 2) {
if ($tp_async_type === 2074) {
return THROW_RANGE('An async function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', $tp_funcHead_start, $tp_funcHead_stop);
}
if ($tp_star_type === 82009) {
return THROW_RANGE('A generator function declaration in web compat mode is still not allowed as `if-else` child, only plain func decls are allowed there', $tp_funcHead_start, $tp_funcHead_stop);
}
if (((options_webCompat === false) || ((lexerFlags & 8192) === 8192))) {
return THROW_RANGE('A function declaration can only be the child of an `if`/`else` in sloppy web compat mode', $tp_funcHead_start, $tp_funcHead_stop);
}
scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FAKE_BLOCK, 'special "fake-block" function statement for label');
} else if (((isFuncDecl === true) && (fdState === 1))) {
return THROW_RANGE('Cannot parse a function declaration here, only expecting statements here', $tp_funcHead_start, $tp_funcHead_stop);
}
return parseFunctionAfterKeyword(lexerFlags, scoop, isFuncDecl, isRealFuncExpr, optionalIdent, false, false, $tp_async_type, $tp_star_type, 0, 0, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, fdState, astProp);
}
function parseFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp) {
if (tok_getType() === 82009) {
return parseGeneratorFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp);
}
parseFunctionAfterKeyword(lexerFlags, null, false, true, false, false, false, 0, 0, 0, 0, $tp_function_start, $tp_function_line, $tp_function_column, 1, astProp);
}
function parseGeneratorFunctionExpression(lexerFlags, $tp_function_start, $tp_function_line, $tp_function_column, astProp) {
skipToIdentParenOpen(lexerFlags);
parseFunctionAfterKeyword(lexerFlags, null, false, true, false, false, false, 0, 82009, 0, 0, $tp_function_start, $tp_function_line, $tp_function_column, 1, astProp);
}
function parseAsyncFunctionDecl(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp) {
let $tp_function_stop = tok_getStop();
let canonName = parseFunctionDeclaration(lexerFlags, scoop, ((fromStmtOrExpr === 1)? false : true), ((fromStmtOrExpr === 1)? true : false), 2074, $tp_async_start, $tp_async_line, $tp_async_column, $tp_async_start, $tp_function_stop, ((((isExport === true) || (fromStmtOrExpr === 1)))? true : false), isLabelled, fdState, astProp);
if (isExport === true) {
addBindingToExports(exportedBindings, canonName);
}
return 16;
}
function parseFunctionAfterKeyword(lexerFlags, outerScoop, isFuncDecl, isRealFuncExpr, optionalIdent, isClassConstructor, isMethod, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_astRange_start, $tp_astRange_line, $tp_astRange_column, fdState, astProp) {
if ((babelCompat && (isMethod !== false))) {
AST_set('generator', $tp_star_type === 82009);
AST_set('async', $tp_async_type === 2074);
} else if (acornCompat) {
if (allowAsyncFunctions) {
AST_open(astProp, {type:((isFuncDecl === true)? 'FunctionDeclaration' : 'FunctionExpression'), loc:undefined, generator:$tp_star_type === 82009, async:$tp_async_type === 2074, expression:false, id:undefined, params:[], body:undefined});
} else {
AST_open(astProp, {type:((isFuncDecl === true)? 'FunctionDeclaration' : 'FunctionExpression'), loc:undefined, generator:$tp_star_type === 82009, expression:false, id:undefined, params:[], body:undefined});
}
} else {
AST_open(astProp, {type:((isFuncDecl === true)? 'FunctionDeclaration' : 'FunctionExpression'), loc:undefined, generator:$tp_star_type === 82009, async:$tp_async_type === 2074, id:undefined, params:[], body:undefined});
}
let innerScoop = SCOPE_createGlobal('parseFunctionAfterKeyword_main_func_scope');
let $tp_functionNameToVerify_type = 0;
let $tp_functionNameToVerify_line = 0;
let $tp_functionNameToVerify_column = 0;
let $tp_functionNameToVerify_start = 0;
let $tp_functionNameToVerify_stop = 0;
let $tp_functionNameToVerify_canon = '';
let canonName = '';
if (isIdentToken(tok_getType())) {
$tp_functionNameToVerify_type = tok_getType();
$tp_functionNameToVerify_line = tok_getLine();
$tp_functionNameToVerify_column = tok_getColumn();
$tp_functionNameToVerify_start = tok_getStart();
$tp_functionNameToVerify_stop = tok_getStop();
$tp_functionNameToVerify_canon = tok_getCanoN();
let bindingFlags = ((lexerFlags | 136) ^ 136) | getFuncIdentAsyncGenState(isRealFuncExpr, lexerFlags, $tp_star_type, $tp_async_type);
let nameBindingType = ((((((isFuncDecl === true) && (fdState === 4))) && ((((lexerFlags & 256) === 0) || (goalMode === false)))))? BINDING_TYPE_FUNC_VAR : BINDING_TYPE_FUNC_LEX);
canonName = $tp_functionNameToVerify_canon;
fatalBindingIdentCheck($tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, nameBindingType, bindingFlags);
if (isFuncDecl === true) {
SCOPE_addFuncDeclName(lexerFlags, outerScoop, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, canonName, nameBindingType, fdState);
} else {
SCOPE_actuallyAddBinding(lexerFlags, innerScoop, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, canonName, BINDING_TYPE_FUNC_VAR);
}
innerScoop = SCOPE_addLayer(innerScoop, SCOPE_LAYER_FUNC_ROOT, 'parseFunctionAfterKeyword_hide_func_name');
skipToParenOpenOrDie(lexerFlags);
AST_setIdent('id', $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_line, $tp_functionNameToVerify_column, $tp_functionNameToVerify_canon);
} else if (((isFuncDecl === true) && (optionalIdent === false))) {
return THROW_RANGE('Function decl missing required ident', tok_getStart(), tok_getStop());
} else {
AST_set('id', null);
innerScoop = SCOPE_addLayer(innerScoop, SCOPE_LAYER_FUNC_ROOT, 'function_has_no_id_but_whatever');
}
lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, $tp_star_type, $tp_async_type, false);
if (isClassConstructor === true) {
lexerFlags |= 16;
} else {
lexerFlags = (lexerFlags | 16400) ^ 16400;
}
if (isMethod === true) lexerFlags |= 32768; else lexerFlags = (lexerFlags | 32768) ^ 32768;
parseFunctionFromParams(lexerFlags, innerScoop, (($tp_async_type === 0)? 6 : 5), ((isFuncDecl === true)? 2 : 1), $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isMethod, $tp_get_type, $tp_set_type);
if (((!babelCompat) || (isMethod === false))) {
AST_close($tp_astRange_start, $tp_astRange_line, $tp_astRange_column);
}
return canonName;
}
function getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type) {
if ((enclosingScopeFlags & 8192) === 8192) return 128;
if (isRealFuncExpr === true) return (($tp_star_type === 82009)? 128 : 0);
return (((enclosingScopeFlags & 128) !== 0)? 128 : 0);
}
function getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, $tp_async_type) {
if (goalMode === true) return 8;
if (isRealFuncExpr === true) return (($tp_async_type === 2074)? 8 : 0);
return (((enclosingScopeFlags & 8) !== 0)? 8 : 0);
}
function getFuncIdentAsyncGenState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type, $tp_async_type) {
return getFuncIdentGeneratorState(isRealFuncExpr, enclosingScopeFlags, $tp_star_type) | getFuncIdentAsyncState(isRealFuncExpr, enclosingScopeFlags, $tp_async_type);
}
function resetLexerFlagsForFuncAndArrow(lexerFlags, $tp_star_type, $tp_async_type, funcType) {
lexerFlags = lexerFlags & 59392;
if ($tp_async_type === 2074) {
lexerFlags |= 8;
}
if ($tp_star_type === 82009) {
lexerFlags |= 128;
}
if (funcType === false) lexerFlags = lexerFlags | 2;
return lexerFlags;
}
function parseFunctionFromParams(lexerFlags, scoop, bindingFrom, expressionState, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isMethod, $tp_get_type, $tp_set_type) {
let paramScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FUNC_PARAMS, 'parseFunctionFromParams(arg)');
let paramsSimple = parseFuncArguments(lexerFlags | 4096, paramScoop, bindingFrom, $tp_get_type, $tp_set_type);
let dupeParamErrorStart = paramScoop.dupeParamErrorStart;
let dupeParamErrorStop = paramScoop.dupeParamErrorStop;
if (((isMethod === true) && (dupeParamErrorStart !== 0))) {
return THROW_RANGE('Method had duplicate params', dupeParamErrorStart - 1, dupeParamErrorStop);
}
let finalFuncScope = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseFunctionFromParams(body)');
if (options_exposeScopes) AST_set('$scope', finalFuncScope);
parseFunctionBody(lexerFlags, finalFuncScope, expressionState, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, false);
}
function parseFuncArguments(lexerFlags, scoop, bindingFrom, $tp_get_type, $tp_set_type) {
lexerFlags = lexerFlags | 64;
if (tok_getType() !== 16471) {
return THROW_RANGE('Must have func arguments next but did not find `(`', tok_getStart(), tok_getStop());
}
skipToBindingStartGrouped(lexerFlags);
if (tok_getType() === 16472) {
if ($tp_set_type === 2112) {
return THROW_RANGE('Setters must have exactly one parameter', tok_getStart(), tok_getStop());
}
skipToCurlyOpenOrDie(lexerFlags);
return 1;
}
if ($tp_get_type === 2096) {
return THROW_RANGE('Getters can not have any parameters', tok_getStart(), tok_getStop());
}
let paramsSimple = parseBindings(lexerFlags, scoop, BINDING_TYPE_ARG, bindingFrom, false, $tp_set_type, undefined, undefined, 'params');
AST_destruct('params');
if (tok_getType() !== 16472) {
return THROW_RANGE(('Missing function param definition closing parenthesis, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToCurlyOpenOrDie(lexerFlags);
return paramsSimple;
}
function parseFunctionBody(lexerFlags, scoop, blockType, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, isArrow) {
let lexerFlagsNoTemplate = (lexerFlags | 7936) ^ 7936;
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
skipToStatementStart(lexerFlagsNoTemplate);
AST_open('body', {type:'BlockStatement', loc:undefined, body:[]});
if (options_exposeScopes) AST_set('$scope', scoop);
parseBodyPartsWithDirectives(lexerFlagsNoTemplate, scoop, undefined, undefined, paramsSimple, dupeParamErrorStart, dupeParamErrorStop, $tp_functionNameToVerify_type, $tp_functionNameToVerify_start, $tp_functionNameToVerify_stop, $tp_functionNameToVerify_canon, false, 'body');
if (tok_getType() !== 16517) {
return THROW_RANGE(('Missing function body closing curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
if (isArrow) {
skipRex(lexerFlags);
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
ASSERT_ASI_REGEX_NEXT = true;
}
} else if (blockType === 1) {
skipDiv(lexerFlags);
} else {
skipToStatementStart(lexerFlags);
}
AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column);
if (tok_getType() === 49264) {
return THROW_RANGE('Object destructuring is not allowed at the start of statement or arrow body, must wrap the object in parenthesis for that to work', tok_getStart(), tok_getStop());
}
}
function parseIdentStatement(lexerFlags, scoop, labelSet, exportedNames, exportedBindings, isGlobalToplevel, isLabelled, fdState, nestedLabels, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
switch ($tp_ident_type) {
case 2074:
skipDiv(lexerFlags);
if (tok_getType() === 16489) {
return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, 2074, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
}
parseAsyncStatement(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, false, undefined, isLabelled, fdState, astProp);
return;
case 2076:
parseBreakStatement(lexerFlags, labelSet, astProp);
return;
case 2079:
parseClassDeclaration(lexerFlags, scoop, false, isLabelled, fdState, astProp);
return;
case 2080:
parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp);
return;
case 2081:
parseContinueStatement(lexerFlags, labelSet, astProp);
return;
case 2082:
parseDebuggerStatement(lexerFlags, astProp);
return;
case 2085:
parseDoStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2089:
parseExportStatement(lexerFlags, scoop, exportedNames, exportedBindings, isGlobalToplevel, astProp);
return;
case 2093:
parseForStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2095:
;
parseFunctionDeclaration(lexerFlags, scoop, true, false, 0, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_start, $tp_ident_stop, false, isLabelled, fdState, astProp);
return;
case 2097:
parseIfStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2099:
parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, astProp);
return;
case 2103:
if (((((isLabelled === true) || (fdState === 1))) || (fdState === 2))) {
parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
} else {
parseLetDeclaration(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, scoop, labelSet, fdState, nestedLabels, astProp);
}
return;
case 2111:
parseReturnStatement(lexerFlags, astProp);
return;
case 2115:
parseSwitchStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2118:
parseThrowStatement(lexerFlags, astProp);
return;
case 2120:
parseTryStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2122:
parseVarStatement(lexerFlags, scoop, astProp);
return;
case 2124:
parseWhileStatement(lexerFlags, scoop, labelSet, astProp);
return;
case 2125:
parseWithStatement(lexerFlags, scoop, labelSet, astProp);
return;
}
parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp);
}
function parseFromNumberStatement(lexerFlags, astProp) {
let $tp_number_type = tok_getType();
let $tp_number_line = tok_getLine();
let $tp_number_column = tok_getColumn();
let $tp_number_start = tok_getStart();
let $tp_number_stop = tok_getStop();
skipDiv(lexerFlags);
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:AST_getNumberNode($tp_number_type, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column)});
parseExpressionAfterLiteral(lexerFlags, $tp_number_start, $tp_number_stop, $tp_number_line, $tp_number_column, 'expression');
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_number_start, $tp_number_line, $tp_number_column, 16, 'expression');
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_number_start, $tp_number_line, $tp_number_column);
}
function parseFromStringStatement(lexerFlags, astProp) {
let $tp_string_line = tok_getLine();
let $tp_string_column = tok_getColumn();
let $tp_string_start = tok_getStart();
let $tp_string_stop = tok_getStop();
let $tp_string_canon = tok_getCanoN();
skipDiv(lexerFlags);
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:AST_getStringNode($tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, $tp_string_canon, false)});
parseExpressionAfterLiteral(lexerFlags, $tp_string_start, $tp_string_stop, $tp_string_line, $tp_string_column, 'expression');
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_string_start, $tp_string_line, $tp_string_column, 16, 'expression');
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_string_start, $tp_string_line, $tp_string_column);
}
function parseFromRegexStatement(lexerFlags, astProp) {
let $tp_regex_line = tok_getLine();
let $tp_regex_column = tok_getColumn();
let $tp_regex_start = tok_getStart();
let $tp_regex_stop = tok_getStop();
skipDiv(lexerFlags);
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:AST_getRegexNode($tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column)});
parseExpressionAfterLiteral(lexerFlags, $tp_regex_start, $tp_regex_stop, $tp_regex_line, $tp_regex_column, 'expression');
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_regex_start, $tp_regex_line, $tp_regex_column, 16, 'expression');
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_regex_start, $tp_regex_line, $tp_regex_column);
}
function parseTickStatement(lexerFlags, astProp) {
let $tp_tick_line = tok_getLine();
let $tp_tick_column = tok_getColumn();
let $tp_tick_start = tok_getStart();
let $tp_tick_stop = tok_getStop();
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, 'expression');
parseExpressionAfterLiteral(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, 'expression');
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_tick_start, $tp_tick_line, $tp_tick_column, 16, 'expression');
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column);
}
function parseAsyncStatement(lexerFlags, scoop, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isExport, exportedBindings, isLabelled, fdState, astProp) {
_parseAsync(lexerFlags, scoop, 2, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, 4, isExport, true, exportedBindings, isLabelled, fdState, false, astProp);
}
function parseAsyncExpression(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, leftHandSideExpression, astProp) {
return _parseAsync(lexerFlags, null, 1, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, undefined, false, 1, leftHandSideExpression, astProp);
}
function _parseAsync(lexerFlags, scoop, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, isExport, allowAssignment, exportedBindings, isLabelled, fdState, leftHandSideExpression, astProp) {
if (!allowAsyncFunctions) {
if (((tok_getType() === 2095) && (!tok_getNlwas()))) {
return THROW_RANGE('Async functions are not supported in the currently targeted version, they are >= ES8 / ES2017', $tp_async_start, tok_getStop());
}
return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
}
let newlineAfterAsync = tok_getNlwas() === true;
let $tp_afterAsync_type = tok_getType();
if (isIdentToken($tp_afterAsync_type)) {
let $tp_ident_stop = tok_getStop();
if (newlineAfterAsync) {
return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
}
if ($tp_afterAsync_type === 2095) {
if (leftHandSideExpression === true) {
return THROW_RANGE('An async function expression is not allowed here', $tp_async_start, $tp_ident_stop);
}
return parseAsyncFunctionDecl(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, fromStmtOrExpr, scoop, isExport, exportedBindings, isLabelled, fdState, astProp);
}
if ((($tp_afterAsync_type === 67636) || ($tp_afterAsync_type === 67637))) {
return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
}
if (isNewArg === 3) {
return THROW_RANGE('Cannot apply `new` to an (async) arrow', $tp_async_start, $tp_ident_stop);
}
if (leftHandSideExpression === true) {
return THROW_RANGE('An async function expression is not allowed here', $tp_async_start, $tp_ident_stop);
}
parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, $tp_async_start, $tp_async_line, $tp_async_column, astProp);
return 16;
}
if ($tp_afterAsync_type === 16471) {
if (isNewArg === 3) {
AST_setIdent('callee', $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon);
return 32;
}
if (fromStmtOrExpr === 2) {
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
astProp = 'expression';
}
let r = parseGroupToplevels(lexerFlags, fromStmtOrExpr, allowAssignment, 2074, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, (newlineAfterAsync? true : false), leftHandSideExpression, astProp);
if (fromStmtOrExpr === 2) {
AST_close($tp_async_start, $tp_async_line, $tp_async_column);
}
return r;
}
return parseExpressionAfterAsyncAsVarName(lexerFlags, fromStmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp);
}
function isAssignable(state) {
return (state & 32) === 32;
}
function notAssignable(state) {
return (state & 16) === 16;
}
function setAssignable(state) {
return ((state | 32) | 16) ^ 16;
}
function setNotAssignable(state) {
return ((state | 32) | 16) ^ 32;
}
function mergeAssignable(override, state) {
return override | (((state | 16) | 32) ^ 48);
}
function parseAwait(lexerFlags, $tp_await_type, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_canon, isNewArg, allowAssignment, astProp) {
if ((lexerFlags & 8) !== 0) {
return parseAwaitKeyword(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, isNewArg, astProp);
}
if (goalMode === false) {
return parseAwaitVar(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_type, $tp_await_canon, isNewArg, allowAssignment, astProp);
}
return THROW_RANGE('Cannot use `await` as var when goal=module but found `await` outside an async function', tok_getStart(), tok_getStart() + 1);
}
function parseAwaitKeyword(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, isNewArg, astProp) {
if (isNewArg === 3) {
return THROW_RANGE('Cannot `await` as the arg of `new`', $tp_await_start, $tp_await_stop);
}
if ((lexerFlags & 64) === 64) {
return THROW_RANGE('Await is illegal as default arg value', $tp_await_start, $tp_await_stop);
}
AST_open(astProp, {type:'AwaitExpression', loc:undefined, argument:undefined});
parseValue(lexerFlags, false, 4, false, 'argument');
if (tok_getType() === 82010) {
return THROW_RANGE('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)', tok_getStart(), tok_getStop());
}
AST_close($tp_await_start, $tp_await_line, $tp_await_column);
return 80;
}
function parseAwaitVar(lexerFlags, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_type, $tp_await_canon, isNewArg, allowAssignment, astProp) {
let assignable = parseIdentOrParenlessArrow(lexerFlags, $tp_await_type, $tp_await_start, $tp_await_stop, $tp_await_line, $tp_await_column, $tp_await_canon, 32, allowAssignment, astProp);
assignable = parseValueTail(lexerFlags, $tp_await_start, $tp_await_line, $tp_await_column, assignable, isNewArg, false, astProp);
return assignable | 64;
}
function parseBlockStatement(lexerFlags, scoop, labelSet, astProp) {
let lexerFlagsNoTemplate = (lexerFlags | 6144) ^ 6144;
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
skipToStatementStart(lexerFlagsNoTemplate);
if (babelCompat) {
AST_open(astProp, {type:'BlockStatement', loc:undefined, directives:[], body:[]});
} else {
AST_open(astProp, {type:'BlockStatement', loc:undefined, body:[]});
}
if (options_exposeScopes) AST_set('$scope', scoop);
while (tok_getType() !== 16517) {
parseNestedBodyPart(lexerFlagsNoTemplate, scoop, labelSet, false, 3, null, 'body');
}
skipToStatementStart(lexerFlags);
AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column);
if (tok_getType() === 49264) {
return THROW_RANGE('A statement can not start with object destructuring assignment (because block)', tok_getStart(), tok_getStop());
}
}
function parseBreakStatement(lexerFlags, labelSet, astProp) {
let $tp_break_line = tok_getLine();
let $tp_break_column = tok_getColumn();
let $tp_break_start = tok_getStart();
let $tp_break_stop = tok_getStop();
skipToStatementStart(lexerFlags);
let $tp_afterBreak_type = tok_getType();
if ((isIdentToken($tp_afterBreak_type) && (tok_getNlwas() === false))) {
let $tp_label_line = tok_getLine();
let $tp_label_column = tok_getColumn();
let $tp_label_start = tok_getStart();
let $tp_label_stop = tok_getStop();
let $tp_label_canon = tok_getCanoN();
findLabelForBreak(labelSet, $tp_label_start, $tp_label_stop, $tp_label_canon);
skipToStatementStart(lexerFlags);
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_setNode(astProp, {type:'BreakStatement', loc:AST_getClosedLoc($tp_break_start, $tp_break_line, $tp_break_column), label:AST_getIdentNode($tp_label_start, $tp_label_stop, $tp_label_line, $tp_label_column, $tp_label_canon)});
} else if ((lexerFlags & 1536) === 0) {
return THROW_RANGE('Can only `break` without label inside a `switch` or loop', $tp_break_start, $tp_break_stop);
} else {
if (((tok_getNlwas() === true) && isRegexToken($tp_afterBreak_type))) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_setNode(astProp, {type:'BreakStatement', loc:AST_getClosedLoc($tp_break_start, $tp_break_line, $tp_break_column), label:null});
}
}
function findLabelForBreak(inputLabelSet, $tp_label_start, $tp_label_stop, $tp_labelName_canon) {
if (inputLabelSet === null) {
return THROW_RANGE(`The label (\`${tok_sliceInput($tp_label_start, $tp_label_stop)}\`) for this \`break\` was not defined in the current label set, which is illegal`, $tp_label_start, $tp_label_stop);
}
let labelSet = inputLabelSet;
let id = $tp_labelName_canon;
do {
if (labelSet.statementLabels.has(id)) {
return;
}
} while (labelSet = labelSet.parentLabels);
THROW_RANGE(('The label (`' + $tp_labelName_canon) + '`) for this `break` was not defined in the current label set, which is illegal', $tp_label_start, $tp_label_stop);
}
function validateLabelForContinue(labelSet, $tp_label_canon, $tp_label_start, $tp_label_stop) {
if (labelSet === null) {
return THROW_RANGE(('This `continue` had a label (`' + $tp_label_canon) + '`) that was not defined in the current label set as the direct parent of a loop, which would be required', $tp_label_start, $tp_label_stop);
}
let set = labelSet;
do {
if ((set.iterationLabels && set.iterationLabels.has($tp_label_canon))) {
return;
}
} while (set = set.parentLabels);
return THROW_RANGE(('This `continue` had a label (`' + $tp_label_canon) + '`) that was not defined in the current label set as the direct parent of a loop, which would be required', $tp_label_start, $tp_label_stop);
}
function parseConstStatement(lexerFlags, scoop, isLabelled, fdState, astProp) {
let $tp_const_line = tok_getLine();
let $tp_const_column = tok_getColumn();
let $tp_const_start = tok_getStart();
let $tp_const_stop = tok_getStop();
skipToBindingStart(lexerFlags);
if (((((isLabelled === true) || (fdState === 1))) || (fdState === 2))) {
return THROW_RANGE('Cannot parse a labelled const declaration, only expecting statements here', $tp_const_start, $tp_const_stop);
}
parseAnyVarDeclaration(lexerFlags, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, 1, undefined, undefined, astProp);
}
function parseContinueStatement(lexerFlags, labelSet, astProp) {
let $tp_continue_line = tok_getLine();
let $tp_continue_column = tok_getColumn();
let $tp_continue_start = tok_getStart();
if ((lexerFlags & 512) === 0) {
return THROW_RANGE('Can only `continue` inside a loop', $tp_continue_start, $tp_continue_start + 1);
}
skipToStatementStart(lexerFlags);
if ((isIdentToken(tok_getType()) && (tok_getNlwas() === false))) {
let $tp_label_line = tok_getLine();
let $tp_label_column = tok_getColumn();
let $tp_label_start = tok_getStart();
let $tp_label_stop = tok_getStop();
let $tp_label_canon = tok_getCanoN();
validateLabelForContinue(labelSet, $tp_label_canon, $tp_label_start, $tp_label_stop);
skipToStatementStart(lexerFlags);
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_setNode(astProp, {type:'ContinueStatement', loc:AST_getClosedLoc($tp_continue_start, $tp_continue_line, $tp_continue_column), label:AST_getIdentNode($tp_label_start, $tp_label_stop, $tp_label_line, $tp_label_column, $tp_label_canon)});
} else {
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_setNode(astProp, {type:'ContinueStatement', loc:AST_getClosedLoc($tp_continue_start, $tp_continue_line, $tp_continue_column), label:null});
}
}
function parseDebuggerStatement(lexerFlags, astProp) {
let $tp_debugger_line = tok_getLine();
let $tp_debugger_column = tok_getColumn();
let $tp_debugger_start = tok_getStart();
let $tp_debugger_stop = tok_getStop();
skipToStatementStart(lexerFlags);
if (isRegexToken(tok_getType())) {
if (tok_getNlwas() === false) {
return THROW_RANGE('Missing semi-colon after debugger keyword', $tp_debugger_stop, $tp_debugger_stop);
}
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_setNode(astProp, {type:'DebuggerStatement', loc:AST_getClosedLoc($tp_debugger_start, $tp_debugger_line, $tp_debugger_column)});
}
function parseDoStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_do_line = tok_getLine();
let $tp_do_column = tok_getColumn();
let $tp_do_start = tok_getStart();
skipToStatementStart(lexerFlags);
AST_open(astProp, {type:'DoWhileStatement', loc:undefined, body:undefined, test:undefined});
parseNestedBodyPart(lexerFlags | 512, scoop, labelSet, false, 1, null, 'body');
if (tok_getType() !== 2124) {
return THROW_RANGE(('A `do` must be followed by a `while`, but found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToParenOpenOrDie(lexerFlags);
parseStatementHeader(lexerFlags, 'test');
if (tok_getType() !== 16490) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
AST_close($tp_do_start, $tp_do_line, $tp_do_column);
}
function parseExportDefaultAsync(lexerFlags, scoop, exportedBindings) {
let $tp_async_line = tok_getLine();
let $tp_async_column = tok_getColumn();
let $tp_async_start = tok_getStart();
let $tp_async_stop = tok_getStop();
let $tp_async_canon = tok_getCanoN();
skipRex(lexerFlags);
if (tok_getType() === 2095) {
return parseAsyncStatement(lexerFlags, scoop, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, true, exportedBindings, false, 4, 'declaration');
}
parseAsyncExpression(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, 4, true, true, false, 'declaration');
parseSemiOrAsi(lexerFlags);
}
function parseExportDefault(lexerFlags, scoop, $tp_export_start, $tp_export_line, $tp_export_column, $tp_default_start, $tp_default_stop, exportedNames, exportedBindings, astProp) {
AST_open(astProp, {type:'ExportDefaultDeclaration', loc:undefined, declaration:undefined});
skipToExpressionStart(lexerFlags);
SCOPE_addLexBinding(scoop, $tp_default_start, $tp_default_stop, '*default*', BINDING_TYPE_LET, 4);
addNameToExports(exportedNames, $tp_default_start, $tp_default_stop, 'default');
addBindingToExports(exportedBindings, '*default*');
if (tok_getType() === 2079) {
let $tp_exportedName_canon = parseClassDeclaration(lexerFlags, scoop, true, false, 3, 'declaration');
addBindingToExports(exportedBindings, $tp_exportedName_canon);
} else if (tok_getType() === 2095) {
let $tp_function_line = tok_getLine();
let $tp_function_column = tok_getColumn();
let $tp_function_start = tok_getStart();
let $tp_function_stop = tok_getStop();
let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, true, false, 0, $tp_function_start, $tp_function_line, $tp_function_column, $tp_export_start, $tp_function_stop, true, false, 4, 'declaration');
addBindingToExports(exportedBindings, $tp_exportedName_canon);
} else if (tok_getType() === 2074) {
parseExportDefaultAsync(lexerFlags, scoop, exportedBindings);
} else {
parseExpression(lexerFlags, 'declaration');
parseSemiOrAsi(lexerFlags);
}
AST_close($tp_export_start, $tp_export_line, $tp_export_column);
}
function parseExportStar(lexerFlags, $tp_export_start, $tp_export_line, $tp_export_column, exportedNames, astProp) {
let $tp_star_line = tok_getLine();
let $tp_star_column = tok_getColumn();
let $tp_star_start = tok_getStart();
skipAny(lexerFlags);
if (tok_getType() === 2073) {
if (!allowExportStarAs) {
return THROW_RANGE('The `export * as x from src`, syntax was introduced in ES2020 but currently targeted version is lower', $tp_export_start, tok_getStop());
}
skipToIdentOrDie(lexerFlags);
let $tp_exportedName_line = tok_getLine();
let $tp_exportedName_column = tok_getColumn();
let $tp_exportedName_start = tok_getStart();
let $tp_exportedName_stop = tok_getStop();
let $tp_exportedName_canon = tok_getCanoN();
addNameToExports(exportedNames, $tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_canon);
skipAny(lexerFlags);
let specifiers = [{type:'ExportNamespaceSpecifier', loc:AST_getClosedLoc($tp_star_start, $tp_star_line, $tp_star_column), exported:AST_getIdentNode($tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_line, $tp_exportedName_column, $tp_exportedName_canon)}];
if (tok_getType() !== 2094) {
return THROW_RANGE(('Expected to find `as` or `from`, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToStringOrDie(lexerFlags);
let $tp_source_line = tok_getLine();
let $tp_source_column = tok_getColumn();
let $tp_source_start = tok_getStart();
let $tp_source_stop = tok_getStop();
let $tp_source_canon = tok_getCanoN();
skipToStatementStart(lexerFlags);
let source = AST_getStringNode($tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);
parseSemiOrAsi(lexerFlags);
if (babelCompat) {
AST_setNode(astProp, {type:'ExportNamedDeclaration', loc:AST_getClosedLoc($tp_export_start, $tp_export_line, $tp_export_column), specifiers, source});
} else {
AST_setNode(astProp, {type:'ExportNamedDeclaration', loc:AST_getClosedLoc($tp_export_start, $tp_export_line, $tp_export_column), specifiers, declaration:null, source});
}
return;
}
if (tok_getType() !== 2094) {
return THROW_RANGE(('Expected to find `as` or `from`, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToStringOrDie(lexerFlags);
let $tp_source_line = tok_getLine();
let $tp_source_column = tok_getColumn();
let $tp_source_start = tok_getStart();
let $tp_source_stop = tok_getStop();
let $tp_source_canon = tok_getCanoN();
skipToStatementStart(lexerFlags);
let source = AST_getStringNode($tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);
parseSemiOrAsi(lexerFlags);
AST_setNode(astProp, {type:'ExportAllDeclaration', loc:AST_getClosedLoc($tp_export_start, $tp_export_line, $tp_export_column), source});
}
function parseExportNamed(lexerFlags, scoop, $tp_export_start, $tp_export_stop, $tp_export_line, $tp_export_column, exportedNames, exportedBindings, astProp) {
AST_open(astProp, {type:'ExportNamedDeclaration', loc:undefined, specifiers:[], declaration:undefined, source:undefined});
let needsSemi = true;
let $tp_exportValueStart_line = tok_getLine();
let $tp_exportValueStart_column = tok_getColumn();
let $tp_exportValueStart_start = tok_getStart();
let $tp_exportValueStart_stop = tok_getStop();
if (tok_getType() === 16513) {
AST_set('declaration', null);
let tmpExportedNames = new Set();
let tmpExportedBindings = new Set();
parseExportObject(lexerFlags, tmpExportedNames, tmpExportedBindings);
if (tok_getType() === 2094) {
skipToStringOrDie(lexerFlags);
let $tp_from_line = tok_getLine();
let $tp_from_column = tok_getColumn();
let $tp_from_start = tok_getStart();
let $tp_from_stop = tok_getStop();
let $tp_from_canon = tok_getCanoN();
skipToStatementStart(lexerFlags);
AST_setStringLiteral('source', $tp_from_start, $tp_from_stop, $tp_from_line, $tp_from_column, $tp_from_canon, false);
} else {
AST_set('source', null);
tmpExportedNames.forEach(name => (addNameToExports(exportedNames, $tp_export_start, $tp_export_stop, name)));
tmpExportedBindings.forEach(name => (addBindingToExports(exportedBindings, name)));
}
} else if (tok_getType() === 2122) {
let $tp_var_line = tok_getLine();
let $tp_var_column = tok_getColumn();
let $tp_var_start = tok_getStart();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, 3, exportedNames, exportedBindings, 'declaration');
AST_set('source', null);
needsSemi = false;
} else if (tok_getType() === 2103) {
let $tp_let_line = tok_getLine();
let $tp_let_column = tok_getColumn();
let $tp_let_start = tok_getStart();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, 3, exportedNames, exportedBindings, 'declaration');
AST_set('source', null);
needsSemi = false;
} else if (tok_getType() === 2080) {
let $tp_const_line = tok_getLine();
let $tp_const_column = tok_getColumn();
let $tp_const_start = tok_getStart();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, 3, exportedNames, exportedBindings, 'declaration');
AST_set('source', null);
needsSemi = false;
} else if (tok_getType() === 2079) {
let $tp_exportedName_canon = parseClassDeclaration(lexerFlags, scoop, false, false, 3, 'declaration');
addNameToExports(exportedNames, $tp_exportValueStart_start, $tp_exportValueStart_stop, $tp_exportedName_canon);
addBindingToExports(exportedBindings, $tp_exportedName_canon);
needsSemi = false;
AST_set('source', null);
} else if (tok_getType() === 2095) {
let $tp_function_stop = tok_getStop();
let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, true, false, 0, $tp_exportValueStart_start, $tp_exportValueStart_line, $tp_exportValueStart_column, $tp_export_start, $tp_function_stop, false, false, 3, 'declaration');
addNameToExports(exportedNames, $tp_exportValueStart_start, $tp_exportValueStart_stop, $tp_exportedName_canon);
addBindingToExports(exportedBindings, $tp_exportedName_canon);
AST_set('source', null);
needsSemi = false;
} else if (tok_getType() === 2074) {
let $tp_async_line = tok_getLine();
let $tp_async_column = tok_getColumn();
let $tp_async_start = tok_getStart();
let $tp_async_stop = tok_getStop();
skipDiv(lexerFlags);
if (tok_getType() !== 2095) {
return THROW_RANGE('Can only export async functions (not arrows), did not find a function', $tp_export_start, tok_getStop());
}
if (tok_getNlwas() === true) {
return THROW_RANGE('Async can not be followed by a newline as it results in `export async;`, which is not valid (and probably not what you wanted)', $tp_export_start, $tp_async_stop);
}
let $tp_function_start = tok_getStart();
let $tp_function_stop = tok_getStop();
let $tp_exportedName_canon = parseFunctionDeclaration(lexerFlags, scoop, true, false, 2074, $tp_async_start, $tp_async_line, $tp_async_column, $tp_export_start, $tp_function_stop, false, false, 3, 'declaration');
addNameToExports(exportedNames, $tp_function_start, $tp_function_stop, $tp_exportedName_canon);
addBindingToExports(exportedBindings, $tp_exportedName_canon);
AST_set('source', null);
needsSemi = false;
} else {
return THROW_RANGE(('Unknown export type `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` (note: you can only export individual vars through `export {foo};`)', tok_getStart(), tok_getStop());
}
if (needsSemi) {
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
tok_asi();
} else {
parseSemiOrAsi(lexerFlags);
}
}
AST_close($tp_export_start, $tp_export_line, $tp_export_column);
}
function parseExportStatement(lexerFlags, scoop, exportedNames, exportedBindings, isGlobalToplevel, astProp) {
let $tp_export_line = tok_getLine();
let $tp_export_column = tok_getColumn();
let $tp_export_start = tok_getStart();
let $tp_export_stop = tok_getStop();
if (goalMode !== true) {
return THROW_RANGE('The `export` keyword can only be used with the module goal', $tp_export_start, $tp_export_stop);
}
if (isGlobalToplevel === false) {
return THROW_RANGE('The `export` keyword is only supported at the top level', $tp_export_start, $tp_export_stop);
}
skipToIdentStarCurlyOpen(lexerFlags);
if (tok_getType() === 2083) {
let $tp_default_start = tok_getStart();
let $tp_default_stop = tok_getStop();
return parseExportDefault(lexerFlags, scoop, $tp_export_start, $tp_export_line, $tp_export_column, $tp_default_start, $tp_default_stop, exportedNames, exportedBindings, astProp);
}
if (tok_getType() === 82009) {
return parseExportStar(lexerFlags, $tp_export_start, $tp_export_line, $tp_export_column, exportedNames, astProp);
}
return parseExportNamed(lexerFlags, scoop, $tp_export_start, $tp_export_stop, $tp_export_line, $tp_export_column, exportedNames, exportedBindings, astProp);
}
function addNameToExports(exportedNames, $tp_exportedName_start, $tp_exportedName_stop, exportedName) {
if (((exportedNames !== undefined) && (exportedName !== ''))) {
if (exportedNames.has(exportedName)) {
return THROW_RANGE(('Tried to export the name `' + exportedName) + '` twice', $tp_exportedName_start, $tp_exportedName_stop);
}
exportedNames.add(exportedName);
}
}
function addBindingToExports(exportedBindings, exportedTokenCanonName) {
if (((exportedBindings !== undefined) && (exportedTokenCanonName !== ''))) {
exportedBindings.add(exportedTokenCanonName);
}
}
function parseExportObject(lexerFlags, tmpExportedNames, tmpExportedBindings) {
skipToIdentCurlyClose(lexerFlags);
while (isIdentToken(tok_getType())) {
parseExportSpecifier(lexerFlags, tmpExportedNames, tmpExportedBindings);
if (tok_getType() !== 16480) break;
skipAny(lexerFlags);
}
if (tok_getType() !== 16517) {
if (tok_getType() === 16486) {
return THROW_RANGE('Export object cannot have spread', tok_getStart(), tok_getStop());
}
if (tok_getType() === 16489) {
return THROW_RANGE('Export object uses `as` to alias (`{a as y}`), not colon (`{a: y}`)', tok_getStart(), tok_getStop());
}
return THROW_RANGE('Export object can only have "shorthand" `{x}` or "as" `{x as y}', tok_getStart(), tok_getStop());
}
skipToStatementStart(lexerFlags);
}
function parseExportSpecifier(lexerFlags, tmpExportedNames, tmpExportedBindings) {
let $tp_name_line = tok_getLine();
let $tp_name_column = tok_getColumn();
let $tp_name_start = tok_getStart();
let $tp_name_stop = tok_getStop();
let $tp_name_canon = tok_getCanoN();
let $tp_exportedName_line = tok_getLine();
let $tp_exportedName_column = tok_getColumn();
let $tp_exportedName_start = tok_getStart();
let $tp_exportedName_stop = tok_getStop();
let $tp_exportedName_canon = tok_getCanoN();
skipAny(lexerFlags);
if (tok_getType() === 2073) {
skipToIdentOrDie(lexerFlags);
$tp_exportedName_line = tok_getLine();
$tp_exportedName_column = tok_getColumn();
$tp_exportedName_start = tok_getStart();
$tp_exportedName_stop = tok_getStop();
$tp_exportedName_canon = tok_getCanoN();
skipAny(lexerFlags);
}
addNameToExports(tmpExportedNames, $tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_canon);
addBindingToExports(tmpExportedBindings, $tp_name_canon);
AST_setNode('specifiers', {type:'ExportSpecifier', loc:AST_getClosedLoc($tp_name_start, $tp_name_line, $tp_name_column), local:AST_getIdentNode($tp_name_start, $tp_name_stop, $tp_name_line, $tp_name_column, $tp_name_canon), exported:AST_getIdentNode($tp_exportedName_start, $tp_exportedName_stop, $tp_exportedName_line, $tp_exportedName_column, $tp_exportedName_canon)});
}
function parseForStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_for_line = tok_getLine();
let $tp_for_column = tok_getColumn();
let $tp_for_start = tok_getStart();
let $tp_for_stop = tok_getStop();
skipToAwaitParenOpen(lexerFlags);
let awaitable = tok_getType() === 2075;
if (awaitable) {
let $tp_await_stop = tok_getStop();
if (!allowAsyncGenerators) {
return THROW_RANGE('`for await` is not supported by the current targeted language version, they were introduced in ES9/ES2018', $tp_for_start, $tp_await_stop);
}
if ((lexerFlags & 8) === 0) {
return THROW_RANGE('Can only use `for-await` inside an async function', $tp_for_start, $tp_await_stop);
}
skipToParenOpenOrDie(lexerFlags);
} else if (tok_getType() !== 16471) {
return THROW_RANGE(('Missing opening paren of the `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', $tp_for_start, $tp_for_stop);
}
skipToExpressionStartSemi(lexerFlags);
let hasOwnScope = false;
if (((((tok_getType() === 2103) || (tok_getType() === 2080))) || (tok_getType() === 2122))) {
scoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FOR_HEADER, 'parseForStatement(header)');
hasOwnScope = true;
}
parseForHeader(((lexerFlags | 4096) | 1792) ^ 1792, $tp_for_start, scoop, awaitable, astProp);
if (tok_getType() !== 16472) {
return THROW_RANGE(('Missing closing paren of the `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToStatementStart(lexerFlags);
parseNestedBodyPart(lexerFlags | 512, scoop, labelSet, false, 1, null, 'body');
if ((hasOwnScope && options_exposeScopes)) AST_set('$scope', scoop);
AST_close($tp_for_start, $tp_for_line, $tp_for_column);
}
function parseForHeaderVar(lexerFlags, scoop, astProp) {
let $tp_var_line = tok_getLine();
let $tp_var_column = tok_getColumn();
let $tp_var_start = tok_getStart();
let $tp_var_stop = tok_getStop();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags | 32, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, 2, undefined, undefined, astProp);
return 32;
}
function parseForHeaderLet(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp) {
let $tp_letIdent_type = tok_getType();
let $tp_letIdent_line = tok_getLine();
let $tp_letIdent_column = tok_getColumn();
let $tp_letIdent_start = tok_getStart();
let $tp_letIdent_stop = tok_getStop();
let $tp_letIdent_canon = tok_getCanoN();
skipDiv(lexerFlags);
let $tp_letArg_type = tok_getType();
let $tp_letArg_stop = tok_getStop();
if (isIdentToken($tp_letArg_type)) {
if ($tp_letArg_type === 67636) {
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Let binding missing binding names as `let` cannot be a var name in strict mode', $tp_letIdent_start, $tp_letArg_stop);
}
AST_setIdent(astProp, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon);
return 32;
}
if ($tp_letArg_type === 2106) {
return THROW_RANGE('A `for (let of ...)` is always illegal', $tp_for_start, $tp_letArg_stop);
}
parseAnyVarDeclaration(lexerFlags | 32, $tp_letIdent_start, $tp_letIdent_line, $tp_letIdent_column, scoop, BINDING_TYPE_LET, 2, undefined, undefined, astProp);
return 32;
}
if ((($tp_letArg_type === 16509) || ($tp_letArg_type === 16513))) {
parseAnyVarDeclaration(lexerFlags | 32, $tp_letIdent_start, $tp_letIdent_line, $tp_letIdent_column, scoop, BINDING_TYPE_LET, 2, undefined, undefined, astProp);
return 32;
}
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Let binding missing binding names in strict mode', $tp_letIdent_start, $tp_letIdent_stop);
}
if ($tp_letArg_type === 16490) {
AST_setIdent(astProp, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon);
return 16;
}
let assignable = parseValueAfterIdent(lexerFlags, $tp_letIdent_type, $tp_letIdent_start, $tp_letIdent_stop, $tp_letIdent_line, $tp_letIdent_column, $tp_letIdent_canon, BINDING_TYPE_NONE, true, astProp);
assignable = parseExpressionFromOp(lexerFlags | 32, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, assignable, astProp);
if (tok_getType() === 2106) {
return THROW_RANGE('Cannot use `let` as a var name on the left side in a `for-of` header', $tp_for_start, tok_getStop());
}
return assignable;
}
function parseForHeaderConst(lexerFlags, scoop, astProp) {
let $tp_const_line = tok_getLine();
let $tp_const_column = tok_getColumn();
let $tp_const_start = tok_getStart();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags | 32, $tp_const_start, $tp_const_line, $tp_const_column, scoop, BINDING_TYPE_CONST, 2, undefined, undefined, astProp);
return 32;
}
function parseForHeaderCurly(lexerFlags, astProp) {
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
let $tp_curly_stop = tok_getStop();
let destructible = parseObjectOuter(lexerFlags | 32, null, BINDING_TYPE_NONE, false, undefined, undefined, astProp);
let $tp_curlyClose_type = tok_getType();
let $tp_curlyClose_stop = tok_getStart();
if ((destructible & 4) === 4) {
if ((((($tp_curlyClose_type !== 49264) && ($tp_curlyClose_type !== 2106))) && ($tp_curlyClose_type !== 67636))) {
return THROW_RANGE('Cannot use lhs as regular for-loop because it must destruct', $tp_curly_start, $tp_curlyClose_stop);
}
destructible = (destructible | 4) ^ 4;
}
return parsePatternTailInForHeader(lexerFlags, $tp_curly_start, $tp_curly_stop, $tp_curly_line, $tp_curly_column, 16517, destructible, astProp);
}
function parseForHeaderBracket(lexerFlags, astProp) {
let $tp_square_line = tok_getLine();
let $tp_square_column = tok_getColumn();
let $tp_square_start = tok_getStart();
let $tp_square_stop = tok_getStop();
let destructible = parseArrayOuter(lexerFlags | 32, null, BINDING_TYPE_NONE, false, undefined, undefined, astProp);
let $tp_bracketClose_type = tok_getType();
let $tp_bracketClose_stop = tok_getStart();
if ((destructible & 4) === 4) {
if ((((($tp_bracketClose_type !== 49264) && ($tp_bracketClose_type !== 2106))) && ($tp_bracketClose_type !== 67636))) {
return THROW_RANGE('Cannot use lhs as regular for-loop because it must destruct', $tp_square_start, $tp_bracketClose_stop);
}
destructible = (destructible | 4) ^ 4;
}
let assignable = parsePatternTailInForHeader(lexerFlags, $tp_square_start, $tp_square_stop, $tp_square_line, $tp_square_column, 16510, destructible, astProp);
return assignable;
}
function parseForHeaderOther(lexerFlags, astProp) {
return parseValue(lexerFlags | 32, true, 4, false, astProp);
}
function parseForHeader(lexerFlags, $tp_for_start, scoop, awaitable, astProp) {
let $tp_startOfForHeader_line = tok_getLine();
let $tp_startOfForHeader_column = tok_getColumn();
let $tp_startOfForHeader_start = tok_getStart();
let $tp_startOfForHeader_stop = tok_getStop();
let assignable = parseForHeaderLhs(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp);
return parseForHeaderRest(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, awaitable, assignable, astProp);
}
function parseForHeaderLhs(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp) {
switch (tok_getType()) {
case 2122:
return parseForHeaderVar(lexerFlags, scoop, astProp);
case 2103:
return parseForHeaderLet(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, scoop, astProp);
case 2080:
return parseForHeaderConst(lexerFlags, scoop, astProp);
case 16490:
AST_setNodeDangerously(astProp, null);
return 16;
case 16513:
return parseForHeaderCurly(lexerFlags, astProp);
case 16509:
return parseForHeaderBracket(lexerFlags, astProp);
}
let assignable = parseForHeaderOther(lexerFlags, astProp);
return parseExpressionFromOp(lexerFlags | 32, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, assignable, astProp);
}
function parseForHeaderRest(lexerFlags, $tp_for_start, $tp_startOfForHeader_start, $tp_startOfForHeader_stop, $tp_startOfForHeader_line, $tp_startOfForHeader_column, awaitable, assignable, astProp) {
if (tok_getType() === 2106) {
return parseForFromOf(lexerFlags, $tp_for_start, awaitable, assignable, astProp);
}
if (awaitable) {
return THROW_RANGE('`for await` only accepts the `for-of` type', $tp_for_start, tok_getStop());
}
if (tok_getType() === 67636) {
return parseForFromIn(lexerFlags, $tp_for_start, assignable, astProp);
}
AST_wrapClosedCustom(astProp, {type:'ForStatement', loc:undefined, init:undefined, test:undefined, update:undefined, body:undefined}, 'init');
return parseForFromSemi(lexerFlags, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column);
}
function parseForFromOf(lexerFlags, $tp_for_start, awaitable, assignable, astProp) {
if (notAssignable(assignable)) {
return THROW_RANGE('Left part of for-of must be assignable', $tp_for_start, tok_getStop());
}
AST_wrapClosedCustom(astProp, {type:'ForOfStatement', loc:undefined, left:undefined, right:undefined, await:awaitable, body:undefined}, 'left');
skipToExpressionStart(lexerFlags);
parseExpression(lexerFlags, 'right');
}
function parseForFromIn(lexerFlags, $tp_for_start, assignable, astProp) {
if (notAssignable(assignable)) {
return THROW_RANGE('Left part of for-in must be assignable', $tp_for_start, tok_getStop());
}
AST_wrapClosedCustom(astProp, {type:'ForInStatement', loc:undefined, left:undefined, right:undefined, body:undefined}, 'left');
skipToExpressionStart(lexerFlags);
parseExpressions(lexerFlags, 'right');
}
function parseForFromSemi(lexerFlags, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column) {
let hadComma = tok_getType() === 16480;
let potentialCommaStart = tok_getStart();
if (hadComma) {
_parseExpressions(lexerFlags | 32, $tp_startOfForHeader_start, $tp_startOfForHeader_line, $tp_startOfForHeader_column, 16, 'init');
}
if (tok_getType() !== 16490) {
if ((hadComma && (((tok_getType() === 2106) || (tok_getType() === 67636))))) {
return THROW_RANGE('Comma not allowed in left side of `for-in`/`for-of` header', potentialCommaStart, potentialCommaStart + 1);
}
return THROW_RANGE(('Missing first semi in `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
return _parseForFromSemi(lexerFlags);
}
function _parseForFromSemi(lexerFlags) {
skipToExpressionStartSemi(lexerFlags);
if (tok_getType() === 16490) {
AST_set('test', null);
} else {
parseExpressions(lexerFlags, 'test');
if (tok_getType() !== 16490) {
return THROW_RANGE(('Missing second semi in `for` header, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
}
skipToExpressionStartGrouped(lexerFlags);
if (tok_getType() === 16472) {
AST_set('update', null);
} else {
parseExpressions(lexerFlags, 'update');
}
}
function parsePatternTailInForHeader(lexerFlags, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, closingPuncType, destructible, astProp) {
let assignable = (((destructible & 1) !== 0)? 16 : 32);
let $tp_patternTailStart_type = tok_getType();
if ((($tp_patternTailStart_type !== 49264) && isAnyAssignmentOp())) {
return THROW_RANGE('Cannot compound assign to an object or array pattern', tok_getStart(), tok_getStop());
}
assignable = parseValueTail(lexerFlags | 32, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, assignable, 4, false, astProp);
let $tp_afteLhs_type = tok_getType();
if ((($tp_afteLhs_type === 2106) || ($tp_afteLhs_type === 67636))) {
if (notAssignable(assignable)) {
return THROW_RANGE('The for-header lhs binding pattern is not destructible', tok_getStart(), tok_getStop());
}
AST_destruct(astProp);
return assignable;
}
if ($tp_afteLhs_type === 16490) {
return assignable;
}
if ($tp_afteLhs_type === 49264) {
let $tp_eq_start = tok_getStart();
let $tp_eq_stop = tok_getStop();
parseExpressionFromOp(lexerFlags | 32, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, assignable, astProp);
if (tok_getType() === 16490) {
return 16;
}
if (((tok_getType() === 67636) || (tok_getType() === 2106))) {
return THROW_RANGE('The left side of a `for-of` and `for-in` can not be an assignment, even if it is a BindingPattern', $tp_eq_start, $tp_eq_stop);
}
return THROW_RANGE('Unknown input followed the left side of a for loop header after assignment', tok_getStart(), tok_getStop());
}
parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_patternStart_start, $tp_patternStart_stop, $tp_patternStart_line, $tp_patternStart_column, assignable, destructible, closingPuncType, astProp);
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, 16, astProp);
}
if (tok_getType() === 16490) {
return assignable;
}
return THROW_RANGE('Unknown input followed the left side of a for loop header', tok_getStart(), tok_getStop());
}
function parseIfStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_if_line = tok_getLine();
let $tp_if_column = tok_getColumn();
let $tp_if_start = tok_getStart();
skipToParenOpenOrDie(lexerFlags);
AST_open(astProp, {type:'IfStatement', loc:undefined, test:undefined, consequent:undefined, alternate:undefined});
parseStatementHeader(lexerFlags, 'test');
parseNestedBodyPart(lexerFlags, scoop, labelSet, false, 2, null, 'consequent');
if (tok_getType() === 2086) {
skipToStatementStart(lexerFlags);
parseNestedBodyPart(lexerFlags, scoop, labelSet, false, 2, null, 'alternate');
} else {
AST_set('alternate', null);
}
AST_close($tp_if_start, $tp_if_line, $tp_if_column);
}
function parseImportDeclaration(lexerFlags, scoop, isGlobalToplevel, astProp) {
let $tp_import_line = tok_getLine();
let $tp_import_column = tok_getColumn();
let $tp_import_start = tok_getStart();
let $tp_import_stop = tok_getStop();
skipToIdentStarCurlyOpenParenOpenString(lexerFlags);
if (tok_getType() === 16471) {
return parseDynamicImportStatement(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp);
}
if (goalMode !== true) {
return THROW_RANGE('The `import` keyword can only be used with the module goal', $tp_import_start, $tp_import_stop);
}
if (isGlobalToplevel === false) {
return THROW_RANGE('The `import` keyword is only supported at the top level', $tp_import_start, $tp_import_stop);
}
AST_open(astProp, {type:'ImportDeclaration', loc:undefined, specifiers:[], source:undefined});
if (isIdentToken(tok_getType())) {
parseImportDefault(lexerFlags, scoop);
if (tok_getType() === 16480) {
skipToIdentStarCurlyOpen(lexerFlags);
if (tok_getType() === 82009) {
parseImportNamespace(lexerFlags, scoop);
} else if (tok_getType() === 16513) {
parseImportObject(lexerFlags, scoop);
} else {
return THROW_RANGE('A default import can only be followed by a star or object specifier', tok_getStart(), tok_getStop());
}
} else if (tok_getType() === 2094) {
skipToStringOrDie(lexerFlags);
} else {
return THROW_RANGE('The default `import` should be followed by another specifier or `from`', $tp_import_start, tok_getStop());
}
} else if (tok_getType() === 82009) {
parseImportNamespace(lexerFlags, scoop);
} else if (tok_getType() === 16513) {
parseImportObject(lexerFlags, scoop);
} else {
if (!isStringToken(tok_getType())) {
return THROW_RANGE(('Expected a valid token after the `import` keyword, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
}
let $tp_source_line = tok_getLine();
let $tp_source_column = tok_getColumn();
let $tp_source_start = tok_getStart();
let $tp_source_stop = tok_getStop();
let $tp_source_canon = tok_getCanoN();
skipToStatementStart(lexerFlags);
AST_setStringLiteral('source', $tp_source_start, $tp_source_stop, $tp_source_line, $tp_source_column, $tp_source_canon, false);
parseSemiOrAsi(lexerFlags);
AST_close($tp_import_start, $tp_import_line, $tp_import_column);
}
function parseImportDefault(lexerFlags, scoop) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_CONST, lexerFlags);
SCOPE_addLexBinding(scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_LET, 3);
skipToAsCommaFrom(lexerFlags);
AST_setNode('specifiers', {type:'ImportDefaultSpecifier', loc:AST_getClosedLoc($tp_ident_start, $tp_ident_line, $tp_ident_column), local:AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)});
}
function parseImportObject(lexerFlags, scoop) {
skipToIdentCurlyClose(lexerFlags);
while (isIdentToken(tok_getType())) {
parseImportSpecifier(lexerFlags, scoop);
if (tok_getType() !== 16480) break;
skipAny(lexerFlags);
}
if (tok_getType() !== 16517) {
if (tok_getType() === 16486) {
return THROW_RANGE('Import object cannot have spread', tok_getStart(), tok_getStop());
}
if (tok_getType() === 16489) {
return THROW_RANGE('Import object uses `as` to alias (`{a as y}`), not colon (`{a: y}`)', tok_getStart(), tok_getStop());
}
return THROW_RANGE(('Missing import definition closing curly, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToFromOrDie(lexerFlags);
skipToStringOrDie(lexerFlags);
}
function parseImportSpecifier(lexerFlags, scoop) {
let $tp_name_line = tok_getLine();
let $tp_name_column = tok_getColumn();
let $tp_name_start = tok_getStart();
let $tp_name_stop = tok_getStop();
let $tp_name_canon = tok_getCanoN();
let $tp_local_type = tok_getType();
let $tp_local_line = tok_getLine();
let $tp_local_column = tok_getColumn();
let $tp_local_start = tok_getStart();
let $tp_local_stop = tok_getStop();
let $tp_local_canon = tok_getCanoN();
skipToAsCommaCurlyClose(lexerFlags);
if (tok_getType() === 2073) {
skipToIdentOrDie(lexerFlags);
$tp_local_type = tok_getType();
$tp_local_line = tok_getLine();
$tp_local_column = tok_getColumn();
$tp_local_start = tok_getStart();
$tp_local_stop = tok_getStop();
$tp_local_canon = tok_getCanoN();
skipAny(lexerFlags);
}
fatalBindingIdentCheck($tp_local_type, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_CONST, lexerFlags);
SCOPE_addLexBinding(scoop, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_LET, 1);
AST_setNode('specifiers', {type:'ImportSpecifier', loc:AST_getClosedLoc($tp_name_start, $tp_name_line, $tp_name_column), imported:AST_getIdentNode($tp_name_start, $tp_name_stop, $tp_name_line, $tp_name_column, $tp_name_canon), local:AST_getIdentNode($tp_local_start, $tp_local_stop, $tp_local_line, $tp_local_column, $tp_local_canon)});
}
function parseImportNamespace(lexerFlags, scoop) {
let $tp_star_line = tok_getLine();
let $tp_star_column = tok_getColumn();
let $tp_star_start = tok_getStart();
skipAny(lexerFlags);
if (tok_getType() !== 2073) {
return THROW_RANGE(('Next token should be `as` but was `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
skipToIdentOrDie(lexerFlags);
let $tp_local_type = tok_getType();
let $tp_local_line = tok_getLine();
let $tp_local_column = tok_getColumn();
let $tp_local_start = tok_getStart();
let $tp_local_stop = tok_getStop();
let $tp_local_canon = tok_getCanoN();
skipToFromOrDie(lexerFlags);
fatalBindingIdentCheck($tp_local_type, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_CONST, lexerFlags);
SCOPE_addLexBinding(scoop, $tp_local_start, $tp_local_stop, $tp_local_canon, BINDING_TYPE_LET, 1);
AST_setNode('specifiers', {type:'ImportNamespaceSpecifier', loc:AST_getClosedLoc($tp_star_start, $tp_star_line, $tp_star_column), local:AST_getIdentNode($tp_local_start, $tp_local_stop, $tp_local_line, $tp_local_column, $tp_local_canon)});
skipToStringOrDie(lexerFlags);
}
function parseLetDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, labelSet, fdState, nestedLabels, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipDiv(lexerFlags);
if (isIdentToken(tok_getType())) {
let $tp_binding_type = tok_getType();
let $tp_binding_start = tok_getStart();
let $tp_binding_stop = tok_getStop();
let $tp_binding_canon = tok_getCanoN();
let identBindingErrorMsg = ((tok_getNlwas() === true)? nonFatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, BINDING_TYPE_LET, lexerFlags) : '');
if (identBindingErrorMsg !== '') {
if ([2075, 2126, 2072, 2088, 2098, 2102, 2103, 2107, 2108, 2109, 2110, 2113].includes(tok_getType())) {
return THROW_RANGE((('Attempted to create a `let` binding on special reserved keyword `' + tok_sliceInput($tp_binding_start, $tp_binding_stop)) + '` but: ') + identBindingErrorMsg, $tp_binding_start, $tp_binding_stop);
}
return THROW_RANGE(('`let` must be a declaration in strict mode but the next ident is a reserved keyword (`' + tok_sliceInput($tp_binding_start, $tp_binding_stop)) + '`)', $tp_binding_start, $tp_binding_stop);
}
parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, 1, undefined, undefined, astProp);
} else if (((tok_getType() === 16509) || (tok_getType() === 16513))) {
parseAnyVarDeclaration(lexerFlags, $tp_let_start, $tp_let_line, $tp_let_column, scoop, BINDING_TYPE_LET, 1, undefined, undefined, astProp);
} else if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Let declaration missing binding names and `let` cannot be a regular var or label name in strict mode', $tp_ident_start, $tp_ident_stop);
} else {
_parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
}
}
function parseLetExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipDiv(lexerFlags);
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('`let` declaration not allowed here and `let` cannot be a regular var or label name in strict mode', $tp_ident_start, $tp_ident_stop);
}
if (tok_getType() === 16509) {
return THROW_RANGE('It is never valid for an expression statement to begin with `let[`, and a `let` declaration would not be valid here', $tp_ident_start, tok_getStop());
}
_parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
}
function _parseLetAsPlainVarNameExpressionStatement(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp) {
if (tok_getType() === 16489) {
return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
}
let $tp_next_type = tok_getType();
if ((($tp_next_type === 67636) || ($tp_next_type === 67636))) {
return THROW_RANGE('Cannot use `let` as a regular var name as the lhs of `in` or `instanceof` in a toplevel expression statement', tok_getStart(), tok_getStop());
}
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
let assignable = parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 32, true, 'expression');
assignable = parseValueTail(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignable, 4, false, 'expression');
parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, assignable, 'expression');
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, 16, 'expression');
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column);
}
function parseReturnStatement(lexerFlags, astProp) {
let $tp_return_line = tok_getLine();
let $tp_return_column = tok_getColumn();
let $tp_return_start = tok_getStart();
if (((!allowGlobalReturn) && ((lexerFlags & 256) === 256))) {
return THROW_RANGE('Not configured to parse `return` statement in global, bailing', $tp_return_start, $tp_return_start + 1);
}
skipToStatementStart(lexerFlags);
AST_open(astProp, {type:'ReturnStatement', loc:undefined, argument:undefined});
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
tok_asi();
AST_set('argument', null);
} else {
if (((((((tok_getNlwas() === false) && (tok_getType() !== 2097173))) && (tok_getType() !== 16490))) && (tok_getType() !== 16517))) {
parseExpressions(lexerFlags, 'argument');
} else {
AST_set('argument', null);
}
parseSemiOrAsi(lexerFlags);
}
AST_close($tp_return_start, $tp_return_line, $tp_return_column);
}
function parseSwitchStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_switch_line = tok_getLine();
let $tp_switch_column = tok_getColumn();
let $tp_switch_start = tok_getStart();
skipToParenOpenOrDie(lexerFlags);
AST_open(astProp, {type:'SwitchStatement', loc:undefined, discriminant:undefined, cases:[]});
let lexerFlagsForSwitch = (lexerFlags | 6400) ^ 6400;
parseStatementHeader(lexerFlagsForSwitch, 'discriminant');
if (tok_getType() !== 16513) {
return THROW_RANGE(('Missing opening curly of `switch` body, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToSwitchBody(lexerFlagsForSwitch);
let casesScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_SWITCH, 'parseSwitchStatement');
if (options_exposeScopes) AST_set('$scope', casesScoop);
parseSwitchCases(lexerFlagsForSwitch | 1024, casesScoop, labelSet, 'cases');
if (tok_getType() !== 16517) {
return THROW_RANGE(('Missing the closing curly of the switch body, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToStatementStart(lexerFlags);
AST_close($tp_switch_start, $tp_switch_line, $tp_switch_column);
}
function parseSwitchCases(lexerFlags, scoop, labelSet, astProp) {
let hadDefault = false;
while (true) {
let $tp_caseDefault_line = tok_getLine();
let $tp_caseDefault_column = tok_getColumn();
let $tp_caseDefault_start = tok_getStart();
if (tok_getType() === 2077) {
skipToExpressionStart(lexerFlags);
AST_open(astProp, {type:'SwitchCase', loc:undefined, test:undefined, consequent:[]});
parseExpressions(lexerFlags, 'test');
if (tok_getType() !== 16489) {
return THROW_RANGE('Missing colon after case expr', tok_getStart(), tok_getStop());
}
} else if (tok_getType() === 2083) {
if (hadDefault) {
return THROW_RANGE('Found second `default` in same switch', tok_getStart(), tok_getStop());
}
hadDefault = true;
skipToColonOrDie(lexerFlags);
AST_open(astProp, {type:'SwitchCase', loc:undefined, test:null, consequent:[]});
} else {
break;
}
skipToStatementStart(lexerFlags);
while (((((tok_getType() !== 16517) && (tok_getType() !== 2077))) && (tok_getType() !== 2083))) {
parseNestedBodyPart(lexerFlags, scoop, labelSet, false, 3, null, 'consequent');
}
AST_close($tp_caseDefault_start, $tp_caseDefault_line, $tp_caseDefault_column);
}
}
function parseThrowStatement(lexerFlags, astProp) {
let $tp_throw_line = tok_getLine();
let $tp_throw_column = tok_getColumn();
let $tp_throw_start = tok_getStart();
skipToExpressionStart(lexerFlags);
AST_open(astProp, {type:'ThrowStatement', loc:undefined, argument:undefined});
if (tok_getNlwas() === true) {
return THROW_RANGE('Found a newline between `throw` and its argument but that is not allowed', $tp_throw_start, tok_getStart());
}
let tmpLexerFlags = (lexerFlags | 1824) ^ 1824;
parseExpressions(tmpLexerFlags, 'argument');
parseSemiOrAsi(lexerFlags);
AST_close($tp_throw_start, $tp_throw_line, $tp_throw_column);
}
function parseTryStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_try_line = tok_getLine();
let $tp_try_column = tok_getColumn();
let $tp_try_start = tok_getStart();
let $tp_try_stop = tok_getStop();
skipToCurlyOpenOrDie(lexerFlags);
AST_open(astProp, {type:'TryStatement', loc:undefined, block:undefined, handler:undefined, finalizer:undefined});
parseBlockStatement(lexerFlags, scoop, labelSet, 'block');
let hasEither = false;
if (tok_getType() === 2078) {
hasEither = true;
let $tp_catch_line = tok_getLine();
let $tp_catch_column = tok_getColumn();
let $tp_catch_start = tok_getStart();
skipAny(lexerFlags);
AST_open('handler', {type:'CatchClause', loc:undefined, param:undefined, body:undefined});
let catchHeadScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_CATCH_HEAD, 'parseTryStatement(catch-var)');
let catchBodyScoop = SCOPE_addLayer(catchHeadScoop, SCOPE_LAYER_CATCH_BODY, 'parseTryStatement(catch-body)');
if (options_exposeScopes) AST_set('$scope', catchBodyScoop);
if (tok_getType() === 16513) {
if (!allowOptionalCatchBinding) {
return THROW_RANGE('Missing the `catch` clause. Optional catch clause is only supported since ES10  ES2019', tok_getStart(), tok_getStop());
}
AST_set('param', null);
} else if (tok_getType() === 16471) {
skipToBindingStart(lexerFlags);
if (tok_getType() === 16472) {
return THROW_RANGE('The catch clause must have a binding', tok_getStart(), tok_getStop());
}
let $tp_binding_line = tok_getLine();
let $tp_binding_column = tok_getColumn();
let $tp_binding_start = tok_getStart();
parseBinding(lexerFlags | 4096, $tp_binding_start, $tp_binding_line, $tp_binding_column, catchHeadScoop, BINDING_TYPE_CATCH_OTHER, 4, false, undefined, undefined, 'param');
if (tok_getType() === 16480) {
return THROW_RANGE('Catch clause requires exactly one parameter, not more (and no trailing comma)', tok_getStart(), tok_getStop());
}
if (tok_getType() !== 16472) {
return THROW_RANGE(('Missing right paren for the catch clause, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToCurlyOpenOrDie(lexerFlags);
} else {
return THROW_RANGE(('Missing start of catch clause (`(`) or start of catch body (`{`), found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
parseBlockStatement(lexerFlags, catchBodyScoop, labelSet, 'body');
AST_close($tp_catch_start, $tp_catch_line, $tp_catch_column);
} else {
AST_set('handler', null);
}
if (tok_getType() === 2092) {
hasEither = true;
skipToCurlyOpenOrDie(lexerFlags);
let finallyScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_FINALLY, 'parseTryStatement(finally)');
parseBlockStatement(lexerFlags, finallyScoop, labelSet, 'finalizer');
} else {
AST_set('finalizer', null);
}
AST_close($tp_try_start, $tp_try_line, $tp_try_column);
if (!hasEither) {
return THROW_RANGE('Try must have catch or finally', $tp_try_start, $tp_try_stop);
}
}
function parseVarStatement(lexerFlags, scoop, astProp) {
let $tp_var_line = tok_getLine();
let $tp_var_column = tok_getColumn();
let $tp_var_start = tok_getStart();
skipToBindingStart(lexerFlags);
parseAnyVarDeclaration(lexerFlags, $tp_var_start, $tp_var_line, $tp_var_column, scoop, BINDING_TYPE_VAR, 1, undefined, undefined, astProp);
}
function parseWhileStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_while_line = tok_getLine();
let $tp_while_column = tok_getColumn();
let $tp_while_start = tok_getStart();
skipToParenOpenOrDie(lexerFlags);
AST_open(astProp, {type:'WhileStatement', loc:undefined, test:undefined, body:undefined});
parseStatementHeader(lexerFlags, 'test');
parseNestedBodyPart(lexerFlags | 512, scoop, labelSet, false, 1, null, 'body');
AST_close($tp_while_start, $tp_while_line, $tp_while_column);
}
function parseIdentLabelOrExpressionStatement(lexerFlags, scoop, labelSet, fdState, nestedLabels, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, false);
if (tok_getType() === 16489) {
return parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp);
}
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
parseExpressionsAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 'expression');
parseSemiOrAsi(lexerFlags);
AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column);
}
function parseLabeledStatementInstead(lexerFlags, scoop, labelSet, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, fdState, nestedLabels, astProp) {
if ((($tp_ident_type !== 2088) && ($tp_ident_type !== 2072))) {
fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_NONE, lexerFlags);
}
let set = labelSet;
while (set) {
if (set.statementLabels.has($tp_ident_canon)) {
return THROW_RANGE('Saw the same label twice which is not allowed', $tp_ident_start, $tp_ident_stop);
}
set = set.parentLabels;
}
labelSet = wrapLabelSet(labelSet, 'labelled statement');
labelSet.statementLabels.add($tp_ident_canon);
skipToStatementStart(lexerFlags);
if (fdState === 2) {
fdState = 1;
}
if (nestedLabels === null) {
nestedLabels = new Set();
}
nestedLabels.add($tp_ident_canon);
if ((isIdentToken(tok_getType()) && (((((tok_getType() === 2093) || (tok_getType() === 2124))) || (tok_getType() === 2085))))) {
labelSet.iterationLabels = nestedLabels;
}
AST_open(astProp, {type:'LabeledStatement', loc:undefined, label:AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon), body:undefined});
parseNestedBodyPart(lexerFlags, scoop, labelSet, true, fdState, nestedLabels, 'body');
AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column);
}
function parsePunctuatorStatement(lexerFlags, scoop, labelSet, astProp) {
if (tok_getType() === 16513) {
let blockScoop = SCOPE_addLayer(scoop, SCOPE_LAYER_BLOCK, 'parsePunctuatorStatement.block');
parseBlockStatement(lexerFlags, blockScoop, labelSet, astProp);
return;
}
if (tok_getType() === 16490) {
parseEmptyStatement(lexerFlags, astProp);
return;
}
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
parseExpressions(lexerFlags, 'expression');
parseSemiOrAsi(lexerFlags);
AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column);
}
function parseEmptyStatement(lexerFlags, astProp) {
let $tp_semi_line = tok_getLine();
let $tp_semi_column = tok_getColumn();
let $tp_semi_start = tok_getStart();
skipToStatementStart(lexerFlags);
AST_setNode(astProp, {type:'EmptyStatement', loc:AST_getClosedLoc($tp_semi_start, $tp_semi_line, $tp_semi_column)});
}
function parseWithStatement(lexerFlags, scoop, labelSet, astProp) {
let $tp_with_line = tok_getLine();
let $tp_with_column = tok_getColumn();
let $tp_with_start = tok_getStart();
let $tp_with_stop = tok_getStop();
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('The `with` statement is not allowed in strict mode', $tp_with_start, $tp_with_stop);
}
skipToParenOpenOrDie(lexerFlags);
AST_open(astProp, {type:'WithStatement', loc:undefined, object:undefined, body:undefined});
parseStatementHeader(lexerFlags, 'object');
parseNestedBodyPart(lexerFlags, scoop, labelSet, false, 1, null, 'body');
AST_close($tp_with_start, $tp_with_line, $tp_with_column);
}
function parseAnyVarDeclaration(lexerFlags, $tp_binding_start, $tp_binding_line, $tp_binding_column, scoop, bindingType, bindingOrigin, exportedNames, exportedBindings, astProp) {
if (((((!isIdentToken(tok_getType())) && (tok_getType() !== 16509))) && (tok_getType() !== 16513))) {
return THROW_RANGE('Expected identifier, or array/object destructuring', tok_getStart(), tok_getStop());
}
let keyword = ((bindingType === BINDING_TYPE_VAR)? 'var' : (((bindingType === BINDING_TYPE_LET)? 'let' : 'const')));
AST_open(astProp, {type:'VariableDeclaration', loc:undefined, kind:keyword, declarations:[]});
parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, true, 0, exportedNames, exportedBindings, 'declarations');
if (((bindingOrigin === 1) || (bindingOrigin === 3))) {
parseSemiOrAsi(lexerFlags);
}
AST_close($tp_binding_start, $tp_binding_line, $tp_binding_column);
}
function parseBindings(lexerFlags, scoop, bindingType, bindingOrigin, defaultOptions, $tp_set_type, exportedNames, exportedBindings, astProp) {
let many = 0;
let inited = false;
let startWasObjectOrArray = ((tok_getType() === 16509) || (tok_getType() === 16513));
let paramsSimple = 1;
do {
++many;
let $tp_bindingStart_type = tok_getType();
let $tp_bindingStart_line = tok_getLine();
let $tp_bindingStart_column = tok_getColumn();
let $tp_bindingStart_start = tok_getStart();
let wasRest = $tp_bindingStart_type === 16486;
let paramSimple = parseBinding(lexerFlags, $tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, scoop, bindingType, bindingOrigin, defaultOptions, exportedNames, exportedBindings, astProp);
if ((wasRest && ($tp_set_type === 2112))) {
return THROW_RANGE('A setter can not have a rest arg (unless inside a pattern)', $tp_bindingStart_start, tok_getStart());
}
if (paramSimple === 4) {
inited = true;
paramsSimple = 3;
} else if (paramSimple === 3) {
paramsSimple = 3;
} else if (paramSimple === 2) {
if (paramsSimple === 1) {
paramsSimple = 2;
}
}
if (wasRest) {
break;
}
if (tok_getType() !== 16480) break;
skipToBindingStartGrouped(lexerFlags);
if (tok_getType() === 16472) {
if (bindingType === BINDING_TYPE_ARG) {
if (allowTrailingFunctionComma) {
return paramsSimple;
}
return THROW_RANGE('Targeted language version does not support trailing function arg comma', tok_getStart(), tok_getStop());
}
}
} while (true);
if (((many !== 1) && ($tp_set_type === 2112))) {
return THROW_RANGE('Setters require exactly one parameter', tok_getStart(), tok_getStop());
}
if (((bindingOrigin === 2) && (((tok_getType() === 67636) || (tok_getType() === 2106))))) {
if (many !== 1) {
return THROW_RANGE('For-in and for-of can only have one binding, found ' + many, tok_getStart(), tok_getStop());
}
if ((inited && ((((((((startWasObjectOrArray || (options_webCompat === false))) || (bindingType !== BINDING_TYPE_VAR))) || (tok_getType() === 2106))) || ((lexerFlags & 8192) === 8192))))) {
return THROW_RANGE('For-in and for-of binding can not have an init', tok_getStart(), tok_getStop());
}
}
return paramsSimple;
}
function parseBinding(lexerFlags, $tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column, scoop, bindingType, bindingOrigin, defaultsOption, exportedNames, exportedBindings, astProp) {
let mustHaveInit = false;
let paramSimple = 0;
if (isIdentToken(tok_getType())) {
let $tp_binding_type = tok_getType();
let $tp_binding_start = tok_getStart();
let $tp_binding_stop = tok_getStop();
let $tp_binding_canon = tok_getCanoN();
fatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType, lexerFlags);
if (bindingType === BINDING_TYPE_CATCH_OTHER) {
bindingType = BINDING_TYPE_CATCH_IDENT;
}
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType);
addNameToExports(exportedNames, $tp_binding_start, $tp_binding_stop, $tp_binding_canon);
addBindingToExports(exportedBindings, $tp_binding_canon);
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipRex(lexerFlags);
AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
if ((((lexerFlags & 8192) === 0) && (nonFatalBindingIdentCheck($tp_binding_type, $tp_binding_start, $tp_binding_stop, $tp_binding_canon, bindingType, lexerFlags | 8192) !== ''))) {
paramSimple = 2;
} else {
paramSimple = 1;
}
} else if (tok_getType() === 16513) {
let destructible = parseObjectOuter(lexerFlags, scoop, bindingType, false, exportedNames, exportedBindings, astProp);
verifyDestructibleForBinding(destructible, bindingType);
AST_destruct(astProp);
paramSimple = 3;
if (((((bindingOrigin !== 4) && (((bindingOrigin !== 2) || (((tok_getType() !== 67636) && (tok_getType() !== 2106))))))) && (((((bindingType === BINDING_TYPE_CONST) || (bindingType === BINDING_TYPE_LET))) || (bindingType === BINDING_TYPE_VAR))))) {
mustHaveInit = true;
}
} else if (tok_getType() === 16509) {
let destructible = parseArrayOuter(lexerFlags, scoop, bindingType, false, exportedNames, exportedBindings, astProp);
verifyDestructibleForBinding(destructible, bindingType);
AST_destruct(astProp);
paramSimple = 3;
if (((((bindingOrigin !== 4) && (((bindingOrigin !== 2) || (((tok_getType() !== 67636) && (tok_getType() !== 2106))))))) && (((((bindingType === BINDING_TYPE_CONST) || (bindingType === BINDING_TYPE_LET))) || (bindingType === BINDING_TYPE_VAR))))) {
mustHaveInit = true;
}
} else if (tok_getType() === 16486) {
if (bindingType !== BINDING_TYPE_ARG) {
return THROW_RANGE('Rest is not allowed as toplevel for var/let/const declaration binding', tok_getStart(), tok_getStop());
}
let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, 16472, bindingType, 0, exportedNames, exportedBindings, astProp);
verifyDestructibleForBinding(subDestruct, bindingType);
paramSimple = 3;
} else if (tok_getType() !== 16472) {
return THROW_RANGE('Expected to parse a(nother) binding but none was found', tok_getStart(), tok_getStop());
}
if (tok_getType() === 49264) {
if (bindingOrigin === 4) {
return THROW_RANGE('Catch clause can not have init / default', tok_getStart(), tok_getStop());
}
skipToExpressionStart(lexerFlags);
paramSimple = 4;
if (defaultsOption === false) {
AST_wrapClosedCustom(astProp, {type:'AssignmentPattern', loc:undefined, left:undefined, right:undefined}, 'left');
parseExpression(lexerFlags, 'right');
AST_close($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column);
} else {
AST_wrapClosedCustom('declarations', {type:'VariableDeclarator', loc:undefined, id:undefined, init:undefined}, 'id');
parseExpression(lexerFlags, 'init');
AST_close($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column);
}
} else if (mustHaveInit) {
return THROW_RANGE('Declaration destructuring must have init', tok_getStart(), tok_getStop());
} else if (((bindingType === BINDING_TYPE_CONST) && (((bindingOrigin !== 2) || (((tok_getType() === 16490) || (tok_getType() === 16480))))))) {
return THROW_RANGE('Constants must be initialized', tok_getStart(), tok_getStop());
} else if (defaultsOption === true) {
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
if (bindingOrigin === 2) {
return THROW_RANGE('Illegal regex after binding declaration in `for` header', tok_getStart(), tok_getStop());
}
ASSERT_ASI_REGEX_NEXT = true;
}
AST_setNodeDangerously('declarations', {type:'VariableDeclarator', loc:AST_getClosedLoc($tp_bindingStart_start, $tp_bindingStart_line, $tp_bindingStart_column), id:AST_popNode('declarations'), init:null});
} else {

}
return paramSimple;
}
function fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags) {
let str = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
if (str !== '') THROW_RANGE(`Cannot use this name (\`${tok_sliceInput($tp_ident_start, $tp_ident_stop)}\`) as a variable name because: ${str}`, $tp_ident_start, $tp_ident_stop);
}
function nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags) {
if (($tp_ident_stop - $tp_ident_start) === $tp_ident_canon.length) {
if ($tp_ident_type === 2048) return '';
return nonFatalBindingIdentCheckByEnum(lexerFlags, $tp_ident_type, $tp_ident_canon, bindingType);
}
return nonFatalBindingIdentCheckByString(lexerFlags, $tp_ident_canon, bindingType);
}
function nonFatalBindingIdentCheckByEnum(lexerFlags, $tp_ident_type, $tp_ident_canon, bindingType) {
switch ($tp_ident_type) {
case 2076:

case 2077:

case 2078:

case 2079:

case 2080:

case 2081:

case 2082:

case 2083:

case 2084:

case 2085:

case 2086:

case 2089:

case 2090:

case 2092:

case 2093:

case 2095:

case 2097:

case 2099:

case 67636:

case 67637:

case 2104:

case 2111:

case 2114:

case 2115:

case 2117:

case 2118:

case 2120:

case 2121:

case 2122:

case 2123:

case 2124:

case 2125:

case 2105:

case 2119:

case 2091:

case 2087:
return 'Cannot never use this reserved word as a variable name';
case 2103:
if (bindingType === BINDING_TYPE_CLASS) return 'Can not use `let` as a class name';
if (((bindingType === BINDING_TYPE_LET) || (bindingType === BINDING_TYPE_CONST))) return 'Can not use `let` when binding through `let` or `const`';
if ((lexerFlags & 8192) === 8192) return 'Can not use `let` as variable name in strict mode';
return '';
case 2113:
if ((lexerFlags & 8192) === 8192) return '`static` is a reserved word in strict mode';
return '';
case 2088:

case 2072:
if ((lexerFlags & 8192) === 8192) return ('Cannot create a binding named `' + $tp_ident_canon) + '` in strict mode';
return '';
case 2098:

case 2107:

case 2109:

case 2102:

case 2108:

case 2110:
if ((lexerFlags & 8192) === 8192) return 'Cannot use this reserved word as a variable name in strict mode';
return '';
case 2075:
if (allowAsyncFunctions) {
if (goalMode === true) return 'Await is illegal as var name with module goal';
if ((lexerFlags & 8) !== 0) return 'Await not allowed here';
}
return '';
case 2126:
if ((lexerFlags & 8192) === 8192) return 'Cannot use this reserved word as a variable name in strict mode';
if ((lexerFlags & 128) !== 0) return 'Cannot use this reserved word as a variable name inside a generator';
return '';
}
return '';
}
function nonFatalBindingIdentCheckByString(lexerFlags, $tp_ident_canon, bindingType) {
switch ($tp_ident_canon) {
case 'break':

case 'case':

case 'catch':

case 'class':

case 'const':

case 'continue':

case 'debugger':

case 'default':

case 'delete':

case 'do':

case 'else':

case 'export':

case 'extends':

case 'finally':

case 'for':

case 'function':

case 'if':

case 'import':

case 'in':

case 'instanceof':

case 'new':

case 'return':

case 'super':

case 'switch':

case 'this':

case 'throw':

case 'try':

case 'typeof':

case 'var':

case 'void':

case 'while':

case 'with':

case 'null':

case 'true':

case 'false':

case 'enum':
return ('Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon) + '`';
case 'let':
if (bindingType === BINDING_TYPE_CLASS) return 'Can not use `let` as a class name';
if (((bindingType === BINDING_TYPE_LET) || (bindingType === BINDING_TYPE_CONST))) return 'Can not use `let` when binding through `let` or `const`';
if ((lexerFlags & 8192) === 8192) return 'Can not use `let` as variable name in strict mode';
return '';
case 'static':
if ((lexerFlags & 8192) === 8192) return ('Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon) + '`';
return '';
case 'eval':

case 'arguments':
if ((lexerFlags & 8192) === 8192) return ('Cannot create a binding named `' + $tp_ident_canon) + '` in strict mode';
return '';
case 'implements':

case 'package':

case 'protected':

case 'interface':

case 'private':

case 'public':
if ((lexerFlags & 8192) === 8192) return ('Keywords may not have escapes in their name and this resolves to `' + $tp_ident_canon) + '`';
return '';
case 'await':
if (allowAsyncFunctions) {
if (goalMode === true) return 'Await is illegal as var name with module goal';
if ((lexerFlags & 8) !== 0) return 'Await not allowed here';
}
return '';
case 'yield':
if ((lexerFlags & 8192) === 8192) return 'Cannot use this reserved word as a variable name in strict mode';
if ((lexerFlags & 128) !== 0) return 'Cannot use this reserved word as a variable name inside a generator';
return '';
}
return '';
}
function parseExpression(lexerFlags, astProp) {
let $tp_start_line = tok_getLine();
let $tp_start_column = tok_getColumn();
let $tp_start_start = tok_getStart();
let $tp_start_stop = tok_getStop();
let assignable = parseValue(lexerFlags, true, 4, false, astProp);
return parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, assignable, astProp);
}
function parseExpressionAfterLiteral(lexerFlags, $tp_literal_start, $tp_literal_stop, $tp_literal_line, $tp_literal_column, astProp) {
let assignable = parseValueTail(lexerFlags, $tp_literal_start, $tp_literal_line, $tp_literal_column, 16, 4, false, astProp);
parseExpressionFromOp(lexerFlags, $tp_literal_start, $tp_literal_stop, $tp_literal_line, $tp_literal_column, assignable, astProp);
}
function parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, astProp) {
let assignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, true, astProp);
assignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, assignable, astProp);
return assignable;
}
function parseExpressionAfterAsyncAsVarName(lexerFlags, stmtOrExpr, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, isNewArg, allowAssignment, astProp) {
if (stmtOrExpr === 2) {
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
astProp = 'expression';
}
let assignable = 16;
if (tok_getType() === 16499) {
assignable = parseArrowParenlessFromPunc(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, 2074, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, allowAssignment, 1, 0, astProp);
} else {
assignable = parseIdentOrParenlessArrow(lexerFlags, 2074, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, 32, allowAssignment, astProp);
assignable = parseValueTail(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, assignable, isNewArg, false, astProp);
if (stmtOrExpr === 2) {
assignable = parseExpressionFromOp(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, assignable, astProp);
}
}
if (stmtOrExpr === 2) {
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, 16, astProp);
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_async_start, $tp_async_line, $tp_async_column);
}
return assignable;
}
function parseParenlessArrowAfterAsync(lexerFlags, fromStmtOrExpr, allowAssignment, $tp_async_start, $tp_async_line, $tp_async_column, astProp) {
if (fromStmtOrExpr === 2) {
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
astProp = 'expression';
}
if (tok_getType() === 2075) {
return THROW_RANGE('Cannot use `await` as an arg name with async arrows', tok_getStart(), tok_getStop());
}
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
let isSimple = 1;
if (isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)) {
isSimple = 2;
}
skipToArrowOrDie(lexerFlags);
parseArrowParenlessFromPunc(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, isSimple, 2074, astProp);
if (fromStmtOrExpr === 2) {
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, 16, astProp);
}
parseSemiOrAsi(lexerFlags);
AST_close($tp_async_start, $tp_async_line, $tp_async_column);
}
}
function isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon) {
if ($tp_ident_canon.length === ($tp_ident_stop - $tp_ident_start)) {
return isStrictOnlyKeywordByEnum($tp_ident_type);
}
return isStrictOnlyKeywordByString($tp_ident_canon);
}
function isStrictOnlyKeywordByEnum($tp_ident_type) {
switch ($tp_ident_type) {
case 2088:

case 2072:

case 2098:

case 2102:

case 2103:

case 2107:

case 2108:

case 2109:

case 2110:

case 2113:

case 2126:
return true;
}
return false;
}
function isStrictOnlyKeywordByString($tp_ident_canon) {
switch ($tp_ident_canon) {
case 'eval':

case 'arguments':

case 'implements':

case 'interface':

case 'let':

case 'package':

case 'private':

case 'protected':

case 'public':

case 'static':

case 'yield':
return true;
}
return false;
}
function parseExpressionFromOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_stop, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp) {
if (isAnyAssignmentOp()) {
if (notAssignable(assignable)) {
return THROW_RANGE(('Cannot assign to lhs (starting with `' + tok_sliceInput($tp_firstExpr_start, $tp_firstExpr_stop)) + '`) because it is not a valid assignment target', tok_getStart(), tok_getStop());
}
return parseExpressionFromAssignmentOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp);
}
return parseExpressionFromBinaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp);
}
function parseExpressionFromAssignmentOp(lexerFlags, $tp_firstAssignment_start, $tp_firstAssignment_line, $tp_firstAssignment_column, lhsAssignable, astProp) {
let $tp_eq_type = tok_getType();
AST_convertArrayToPattern($tp_eq_type, astProp);
AST_wrapClosedCustom(astProp, {type:'AssignmentExpression', loc:undefined, left:undefined, operator:tok_sliceInput(tok_getStart(), tok_getStop()), right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
let rhsAssignable = parseExpression(lexerFlags, 'right');
AST_close($tp_firstAssignment_start, $tp_firstAssignment_line, $tp_firstAssignment_column);
return setNotAssignable(mergeAssignable(rhsAssignable, lhsAssignable));
}
function parseExpressionFromBinaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, assignable, astProp) {
if ((assignable & 1024) === 1024) return assignable;
let $tp_next_type = tok_getType();
let repeat = false;
do {
repeat = false;
if ($tp_next_type === 16506) {
let nowAssignable = parseExpressionFromTernaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, astProp);
assignable = setNotAssignable(nowAssignable | assignable);
repeat = true;
} else if (isNonAssignBinOp($tp_next_type, lexerFlags)) {
let nowAssignable = parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, 0, astProp);
assignable = setNotAssignable(nowAssignable | assignable);
repeat = true;
}
$tp_next_type = tok_getType();
} while (repeat);
if (isAnyAssignmentOp()) {
return THROW_RANGE('Can not have an assignment after a non-assignment operator', tok_getStart(), tok_getStop());
}
return assignable;
}
function preventNullishWithLogic($tp_op_type, $tp_op_start, $tp_op_stop, coalSeen) {
if ((($tp_op_type === 82005) || ($tp_op_type === 82051))) {
if (coalSeen === 1) {
return THROW_RANGE('Cannot use `??` and `&&`/`||` in the same expression without some grouping', $tp_op_start, $tp_op_stop);
}
return 2;
}
if ($tp_op_type === 82044) {
if (coalSeen === 2) {
return THROW_RANGE('Cannot use `??` and `&&`/`||` in the same expression without some grouping', $tp_op_start, $tp_op_stop);
}
return 1;
}
return coalSeen;
}
function parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, coalSeen, astProp) {
let $tp_op_type = tok_getType();
let $tp_op_start = tok_getStart();
let $tp_op_stop = tok_getStop();
coalSeen = preventNullishWithLogic($tp_op_type, $tp_op_start, $tp_op_stop, coalSeen);
let AST_nodeName = (((((($tp_op_type === 82005) || ($tp_op_type === 82051))) || ($tp_op_type === 82044)))? 'LogicalExpression' : 'BinaryExpression');
AST_wrapClosedCustom(astProp, {type:AST_nodeName, loc:undefined, left:undefined, operator:tok_sliceInput($tp_op_start, $tp_op_stop), right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
let $tp_rightExprStart_line = tok_getLine();
let $tp_rightExprStart_column = tok_getColumn();
let $tp_rightExprStart_start = tok_getStart();
let assignable = parseValue(lexerFlags, false, 4, false, 'right');
let otherStrength = getStrength($tp_op_type, $tp_op_start, $tp_op_stop);
while (continueParsingBinOp(lexerFlags, otherStrength)) {
assignable |= parseExpressionFromBinaryOpOnlyStronger(lexerFlags, $tp_rightExprStart_start, $tp_rightExprStart_line, $tp_rightExprStart_column, coalSeen, 'right');
}
preventNullishWithLogic(tok_getType(), tok_getStart(), tok_getStop(), coalSeen);
AST_close($tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column);
return setNotAssignable(assignable);
}
function parseExpressionFromTernaryOp(lexerFlags, $tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column, astProp) {
AST_wrapClosedCustom(astProp, {type:'ConditionalExpression', loc:undefined, test:undefined, consequent:undefined, alternate:undefined}, 'test');
skipToExpressionStart(lexerFlags);
let midAssignable = parseExpression(((lexerFlags | 32) ^ 32) | 4096, 'consequent');
if (tok_getType() !== 16489) {
if (tok_getType() === 16480) {
return THROW_RANGE('Can not use comma inside ternary expressions', tok_getStart(), tok_getStop());
}
return THROW_RANGE('Unexpected character inside ternary', tok_getStart(), tok_getStop());
}
skipToExpressionStart(lexerFlags);
let rhsAssignable = parseExpression(lexerFlags, 'alternate');
AST_close($tp_firstExpr_start, $tp_firstExpr_line, $tp_firstExpr_column);
return setNotAssignable(midAssignable | rhsAssignable);
}
function parseExpressionsAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp) {
let assignableForPiggies = parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, BINDING_TYPE_NONE, astProp);
if (tok_getType() === 16480) {
assignableForPiggies = _parseExpressions(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignableForPiggies, astProp);
}
return assignableForPiggies;
}
function parseExpressions(lexerFlags, astProp) {
let $tp_startOfFirstExpr_line = tok_getLine();
let $tp_startOfFirstExpr_column = tok_getColumn();
let $tp_startOfFirstExpr_start = tok_getStart();
let assignableForPiggies = parseExpression(lexerFlags, astProp);
if (tok_getType() === 16480) {
assignableForPiggies = _parseExpressions(lexerFlags, $tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_column, assignableForPiggies, astProp);
}
return assignableForPiggies;
}
function _parseExpressions(lexerFlags, $tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_colun, assignableForPiggies, astProp) {
AST_wrapClosedIntoArrayCustom(astProp, {type:'SequenceExpression', loc:undefined, expressions:undefined}, 'expressions');
assignableForPiggies = __parseExpressions(lexerFlags, assignableForPiggies, 'expressions');
AST_close($tp_startOfFirstExpr_start, $tp_startOfFirstExpr_line, $tp_startOfFirstExpr_colun);
return assignableForPiggies;
}
function __parseExpressions(lexerFlags, assignableForPiggies, astProp) {
do {
skipToExpressionStart(lexerFlags);
let nowAssignable = parseExpression(lexerFlags, astProp);
assignableForPiggies |= nowAssignable;
} while (tok_getType() === 16480);
return setNotAssignable(assignableForPiggies);
}
function isAnyAssignmentOp() {
if (!((tok_getType() & 32768) === 32768)) return false;
if (tok_getType() !== 49244) return true;
if (!allowExponentiation) {
return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
}
return true;
}
function isNonAssignBinOp(type, lexerFlags) {
if (!((type & 65536) === 65536)) return false;
if (type === 82010) {
if (!allowExponentiation) {
return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
}
return true;
}
if (type === 67636) {
return (lexerFlags & 32) === 0;
}
return true;
}
function getStrength(type, $tp_tokenStart, $tp_tokenStop) {
switch (type) {
case 82010:
return 16;
case 82009:
return 15;
case 82023:
return 15;
case 82002:
return 15;
case 82013:
return 14;
case 82017:
return 14;
case 82028:
return 13;
case 82037:
return 13;
case 82038:
return 13;
case 82027:
return 12;
case 82029:
return 12;
case 82036:
return 12;
case 82039:
return 12;
case 67636:
return 12;
case 67637:
return 12;
case 82033:
return 11;
case 82000:
return 11;
case 82034:
return 11;
case 82001:
return 11;
case 82004:
return 10;
case 82047:
return 9;
case 82050:
return 8;
case 82044:
return 7;
case 82005:
return 6;
case 82051:
return 5;
}
THROW_RANGE('Unknown operator', $tp_tokenStart, $tp_tokenStop);
}
function continueParsingBinOp(lexerFlags, otherStrength) {
switch (tok_getType()) {
case 82033:
return 11 > otherStrength;
case 82000:
return 11 > otherStrength;
case 82034:
return 11 > otherStrength;
case 82001:
return 11 > otherStrength;
case 82005:
return 6 > otherStrength;
case 82051:
return 5 > otherStrength;
case 82013:
return 14 > otherStrength;
case 82017:
return 14 > otherStrength;
case 82027:
return 12 > otherStrength;
case 82036:
return 12 > otherStrength;
case 82029:
return 12 > otherStrength;
case 82039:
return 12 > otherStrength;
case 82009:
return 15 > otherStrength;
case 82023:
return 15 > otherStrength;
case 82002:
return 15 > otherStrength;
case 82028:
return 13 > otherStrength;
case 82037:
return 13 > otherStrength;
case 82038:
return 13 > otherStrength;
case 67636:
if ((lexerFlags & 32) === 32) {
return false;
}
return 12 > otherStrength;
case 67637:
return 12 > otherStrength;
case 82004:
return 10 > otherStrength;
case 82047:
return 9 > otherStrength;
case 82050:
return 8 > otherStrength;
case 82044:
return 7 > otherStrength;
case 82010:
if (!allowExponentiation) {
return THROW_RANGE('`**` was introduced in ES7', tok_getStart(), tok_getStop());
}
return true;
}
return false;
}
function parseValue(lexerFlags, allowAssignment, isNewArg, leftHandSideExpression, astProp) {
let $tp_start_line = tok_getLine();
let $tp_start_column = tok_getColumn();
let $tp_start_start = tok_getStart();
let assignable = parseValueHeadBody(lexerFlags, false, isNewArg, allowAssignment, leftHandSideExpression, astProp);
return parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, assignable, isNewArg, leftHandSideExpression, astProp);
}
function parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, allowAssignment, astProp) {
let assignable = parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, 4, allowAssignment, false, astProp);
return parseValueTail(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, assignable, 4, false, astProp);
}
function parseValueHeadBody(lexerFlags, maybe, isNewArg, allowAssignment, leftHandSideExpression, astProp) {
let start_for_assert;
if (isIdentToken(tok_getType())) {
return parseValueHeadBodyIdent(lexerFlags, isNewArg, BINDING_TYPE_NONE, allowAssignment, leftHandSideExpression, astProp);
}
if (isNumberStringRegex(tok_getType())) {
let $tp_lit_type = tok_getType();
let $tp_lit_line = tok_getLine();
let $tp_lit_column = tok_getColumn();
let $tp_lit_start = tok_getStart();
let $tp_lit_stop = tok_getStop();
let $tp_lit_canon = tok_getCanoN();
skipDiv(lexerFlags);
AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);
return 16;
}
if (isTemplateStart(tok_getType())) {
let $tp_tick_line = tok_getLine();
let $tp_tick_column = tok_getColumn();
let $tp_tick_start = tok_getStart();
let $tp_tick_stop = tok_getStop();
parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, astProp);
return 16;
}
if (isPunctuatorToken(tok_getType())) {
if (tok_getType() === 16513) {
let skipInit = ((((((allowAssignment === true) && (leftHandSideExpression === false))) && (isNewArg === 4)))? true : false);
let wasDestruct = parseObjectOuter(lexerFlags, null, BINDING_TYPE_NONE, skipInit, undefined, undefined, astProp);
return _parseValueHeadBodyAfterObjArr(wasDestruct);
}
if (tok_getType() === 16509) {
let skipInit = ((((((allowAssignment === true) && (leftHandSideExpression === false))) && (isNewArg === 4)))? true : false);
let wasDestruct = parseArrayOuter(lexerFlags, null, BINDING_TYPE_NONE, skipInit, undefined, undefined, astProp);
return _parseValueHeadBodyAfterObjArr(wasDestruct);
}
if (tok_getType() === 16471) {
return parseGroupToplevels(lexerFlags, 2, allowAssignment, 0, 0, 0, 0, 0, '', false, leftHandSideExpression, astProp);
}
if (tok_getType() === 16478) {
return parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, '++', astProp);
}
if (tok_getType() === 16482) {
return parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, '--', astProp);
}
if (tok_getType() === 82013) {
return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '+', astProp);
}
if (tok_getType() === 82017) {
return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '-', astProp);
}
if (tok_getType() === 16463) {
return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '!', astProp);
}
if (tok_getType() === 16518) {
return parseUnary(lexerFlags, isNewArg, leftHandSideExpression, '~', astProp);
}
}
if (maybe === false) {
if (tok_getType() === 16486) {
return THROW_RANGE('Unexpected spread/rest dots', tok_getStart(), tok_getStart() + 1);
}
if (tok_getType() === 16485) {
return THROW_RANGE('Unexpected dot', tok_getStart(), tok_getStop());
}
return THROW_RANGE('Expected to parse a value', tok_getStart(), tok_getStop());
}
return 16;
}
function _parseValueHeadBodyAfterObjArr(wasDestruct) {
if ((wasDestruct & 4) === 4) {
return THROW_RANGE('Found a struct that must be destructured but was not', tok_getStart(), tok_getStop());
}
let assignable = copyPiggies(0, wasDestruct);
if ((wasDestruct & 1) === 0) {
return setAssignable(assignable);
}
return setNotAssignable(assignable);
}
function parseValueHeadBodyIdent(lexerFlags, isNewArg, bindingType, allowAssignment, leftHandSideExpression, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, leftHandSideExpression);
return parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp);
}
function parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, isNewArg, allowAssignment, leftHandSideExpression, astProp) {
switch ($tp_ident_type) {
case 2072:
{
if (tok_getType() === 16499) {
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Can not use `arguments` as arg name in strict mode', $tp_ident_start, $tp_ident_stop);
}
return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, true, 3, 0, astProp);
}
AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
return verifyEvalArgumentsVar(lexerFlags);
}
case 2074:
return parseAsyncExpression(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, isNewArg, false, allowAssignment, leftHandSideExpression, astProp);
case 2075:
return parseAwait(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, isNewArg, allowAssignment, astProp);
case 2079:
return parseClassExpression(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
case 2084:
;
return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'delete', isNewArg, astProp);
case 2088:
{
if (tok_getType() === 16499) {
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Can not use `eval` as arg name in strict mode', $tp_ident_start, $tp_ident_stop);
}
return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, true, 3, 0, astProp);
}
AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
return verifyEvalArgumentsVar(lexerFlags);
}
case 2091:
return parseFalseKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
case 2095:
parseFunctionExpression(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
return 16;
case 2099:
if (tok_getType() === 16471) {
return parseDynamicImport(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, astProp);
}
return THROW_RANGE('Import keyword only allowed on toplevel or in a dynamic import', $tp_ident_start, $tp_ident_stop);
case 2103:
;
if (((bindingType === BINDING_TYPE_LET) || (bindingType === BINDING_TYPE_CONST))) {
return THROW_RANGE('Can not use `let` when binding through `let` or `const`', $tp_ident_start, $tp_ident_stop);
}
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Can not use `let` as variable name in strict mode', $tp_ident_start, $tp_ident_stop);
}
return parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 32, allowAssignment, astProp);
case 2104:
let newAssignable = parseNewKeyword(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp);
return setNotAssignable(newAssignable);
case 2105:
return parseNullKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
case 2114:
return parseSuperKeyword(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, astProp);
case 2119:
return parseTrueKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
case 2117:
return parseThisKeyword($tp_ident_start, $tp_ident_line, $tp_ident_column, astProp);
case 2121:
;
return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'typeof', isNewArg, astProp);
case 2123:
;
return _parseUnary(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 'void', isNewArg, astProp);
case 2126:
return parseYield(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, astProp);
}
fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
return parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 32, allowAssignment, astProp);
}
function verifyEvalArgumentsVar(lexerFlags) {
if ((lexerFlags & 8192) === 0) return 32;
if (isAnyAssignmentOp()) {
return THROW_RANGE('Cannot assign to `eval` and `arguments` in strict mode', tok_getStart(), tok_getStop());
}
if (((tok_getType() === 16478) || (tok_getType() === 16482))) {
return THROW_RANGE('Cannot assign to `eval` and `arguments` in strict mode', tok_getStart(), tok_getStop());
}
return 16;
}
function parseTrueKeyword($tp_true_start, $tp_true_line, $tp_true_column, astProp) {
if (babelCompat) {
AST_setNode(astProp, {type:'BooleanLiteral', loc:AST_getClosedLoc($tp_true_start, $tp_true_line, $tp_true_column), value:true});
} else {
AST_setNode(astProp, {type:'Literal', loc:AST_getClosedLoc($tp_true_start, $tp_true_line, $tp_true_column), value:true, raw:'true'});
}
return 16;
}
function parseFalseKeyword($tp_false_start, $tp_false_line, $tp_false_column, astProp) {
if (babelCompat) {
AST_setNode(astProp, {type:'BooleanLiteral', loc:AST_getClosedLoc($tp_false_start, $tp_false_line, $tp_false_column), value:false});
} else {
AST_setNode(astProp, {type:'Literal', loc:AST_getClosedLoc($tp_false_start, $tp_false_line, $tp_false_column), value:false, raw:'false'});
}
return 16;
}
function parseNullKeyword($tp_null_start, $tp_null_line, $tp_null_column, astProp) {
if (babelCompat) {
AST_setNode(astProp, {type:'NullLiteral', loc:AST_getClosedLoc($tp_null_start, $tp_null_line, $tp_null_column)});
} else {
AST_setNode(astProp, {type:'Literal', loc:AST_getClosedLoc($tp_null_start, $tp_null_line, $tp_null_column), value:null, raw:'null'});
}
return 16;
}
function parseSuperKeyword(lexerFlags, $tp_super_start, $tp_super_stop, $tp_super_line, $tp_super_column, astProp) {
AST_setNode(astProp, {type:'Super', loc:AST_getClosedLoc($tp_super_start, $tp_super_line, $tp_super_column)});
if (tok_getType() === 16471) {
if ((lexerFlags & 16384) === 0) {
return THROW_RANGE('Can only use `super()` in constructors of classes that extend another class', $tp_super_start, tok_getStop());
}
return 16;
}
if (((tok_getType() === 16509) || (tok_getType() === 16485))) {
if ((lexerFlags & 32768) === 0) {
if (tok_getType() === 16509) {
return THROW_RANGE('Can only use `super[foo]` in class or object methods or in arrows nested in those methods/arrows', $tp_super_start, tok_getStop());
} else {
return THROW_RANGE('Can only use `super.foo` in class or object methods or in arrows nested in those methods/arrows', $tp_super_start, tok_getStop());
}
}
return 16;
}
return THROW_RANGE('The `super` keyword can only be used as call or member expression', $tp_super_start, $tp_super_stop);
}
function parseNewKeyword(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp) {
if (tok_getType() === 16485) return parseNewDotTarget(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp);
return parseNewExpression(lexerFlags, $tp_new_start, $tp_new_line, $tp_new_column, astProp);
}
function parseNewDotTarget(lexerFlags, $tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon, astProp) {
if ((lexerFlags & 2) === 0) {
return THROW_RANGE('Must be inside/nested a regular function to use `new.target`', $tp_new_start, tok_getStop());
}
skipToTargetOrDie(lexerFlags);
let $tp_property_line = tok_getLine();
let $tp_property_column = tok_getColumn();
let $tp_property_start = tok_getStart();
let $tp_property_stop = tok_getStop();
let $tp_property_canon = tok_getCanoN();
skipDiv(lexerFlags);
AST_setNode(astProp, {type:'MetaProperty', loc:AST_getClosedLoc($tp_new_start, $tp_new_line, $tp_new_column), meta:AST_getIdentNode($tp_new_start, $tp_new_stop, $tp_new_line, $tp_new_column, $tp_new_canon), property:AST_getIdentNode($tp_property_start, $tp_property_stop, $tp_property_line, $tp_property_column, $tp_property_canon)});
return 16;
}
function parseNewExpression(lexerFlags, $tp_new_start, $tp_new_line, $tp_new_column, astProp) {
AST_open(astProp, {type:'NewExpression', loc:undefined, arguments:[], callee:undefined});
if ((isIdentToken(tok_getType()) && (tok_getType() === 2099))) {
return THROW_RANGE('Cannot use dynamic import as an argument to `new`, the spec simply does not allow it', $tp_new_start, tok_getStop());
}
let assignableForPiggies = parseValue(lexerFlags, false, 3, false, 'callee');
AST_close($tp_new_start, $tp_new_line, $tp_new_column);
return setNotAssignable(assignableForPiggies);
}
function parseThisKeyword($tp_this_start, $tp_this_line, $tp_this_column, astProp) {
AST_setNode(astProp, {type:'ThisExpression', loc:AST_getClosedLoc($tp_this_start, $tp_this_line, $tp_this_column)});
return 16;
}
function parseUnary(lexerFlags, isNewArg, leftHandSideExpression, opName, astProp) {
let $tp_unary_line = tok_getLine();
let $tp_unary_column = tok_getColumn();
let $tp_unary_start = tok_getStart();
let $tp_unary_stop = tok_getStop();
if (leftHandSideExpression === true) {
return THROW_RANGE(('The unary expression `' + opName) + '` is not allowed here', $tp_unary_start, $tp_unary_stop);
}
skipToExpressionStart(lexerFlags);
return _parseUnary(lexerFlags, $tp_unary_start, $tp_unary_stop, $tp_unary_line, $tp_unary_column, opName, isNewArg, astProp);
}
function _parseUnary(lexerFlags, $tp_unary_start, $tp_unary_stop, $tp_unary_line, $tp_unary_column, opName, isNewArg, astProp) {
if (isNewArg === 3) {
return THROW_RANGE(('Cannot `' + opName) + '` inside `new`', $tp_unary_start, $tp_unary_stop);
}
AST_open(astProp, {type:'UnaryExpression', loc:undefined, operator:opName, prefix:true, argument:undefined});
let assignable = parseValue(lexerFlags, false, 4, false, 'argument');
if ((lexerFlags & 8192) === 8192) {
if (((opName === 'delete') && (_path[_path.length - 1].argument.type === 'Identifier'))) {
return THROW_RANGE('Cannot delete an identifier without tail, in strict mode', $tp_unary_start, $tp_unary_stop);
}
}
AST_close($tp_unary_start, $tp_unary_line, $tp_unary_column);
if (tok_getType() === 82010) {
return THROW_RANGE('The lhs of ** can not be this kind of unary expression (syntactically not allowed, you have to wrap something)', tok_getStart(), tok_getStop());
}
return setNotAssignable(assignable);
}
function parseUpdatePrefix(lexerFlags, isNewArg, leftHandSideExpression, opName, astProp) {
let $tp_punc_line = tok_getLine();
let $tp_punc_column = tok_getColumn();
let $tp_punc_start = tok_getStart();
let $tp_punc_stop = tok_getStop();
if (leftHandSideExpression === true) {
return THROW_RANGE(('An update expression `' + opName) + '` is not allowed here', $tp_punc_start, $tp_punc_stop);
}
if (isNewArg === 3) {
return THROW_RANGE(('Cannot `new` on a `' + opName) + '` expr', $tp_punc_start, $tp_punc_stop);
}
skipToExpressionStart(lexerFlags);
AST_open(astProp, {type:'UpdateExpression', loc:undefined, argument:undefined, operator:opName, prefix:true});
let assignable = parseValue(lexerFlags, false, 4, false, 'argument');
AST_throwIfIllegalUpdateArg('argument');
AST_close($tp_punc_start, $tp_punc_line, $tp_punc_column);
if (notAssignable(assignable)) {
return THROW_RANGE('Cannot inc/dec a non-assignable value as prefix', $tp_punc_start, $tp_punc_stop);
}
return setNotAssignable(assignable);
}
function parseYield(lexerFlags, $tp_yieldIdent_type, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, $tp_yieldIdent_canon, allowAssignment, astProp) {
if ((lexerFlags & 128) !== 0) {
return parseYieldKeyword(lexerFlags, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, allowAssignment, astProp);
}
return parseYieldVarname(lexerFlags, $tp_yieldIdent_type, $tp_yieldIdent_start, $tp_yieldIdent_stop, $tp_yieldIdent_line, $tp_yieldIdent_column, $tp_yieldIdent_canon, allowAssignment, astProp);
}
function parseYieldKeyword(lexerFlags, $tp_yield_start, $tp_yield_stop, $tp_yield_line, $tp_yield_column, allowAssignment, astProp) {
if ((lexerFlags & 64) === 64) {
return THROW_RANGE('The `yield` keyword in arg default must be a var name but that is not allowed inside a generator', $tp_yield_start, $tp_yield_stop);
}
if (allowAssignment === false) {
return THROW_RANGE('Did not expect to parse an AssignmentExpression but found `yield`', $tp_yield_start, $tp_yield_stop);
}
AST_open(astProp, {type:'YieldExpression', loc:undefined, delegate:undefined, argument:undefined});
if (((tok_getNlwas() === true) && isRegexToken(tok_getType()))) {
AST_set('delegate', false);
AST_set('argument', null);
} else if (tok_getType() === 82009) {
AST_set('delegate', true);
parseYieldStarArgument(lexerFlags, $tp_yield_start, 'argument');
} else if (tok_getType() === 82010) {
return THROW_RANGE('Cannot use `yield` to the left of the `**` operator', $tp_yield_start, $tp_yield_stop);
} else {
AST_set('delegate', false);
parseYieldArgument(lexerFlags, 'argument');
}
AST_close($tp_yield_start, $tp_yield_line, $tp_yield_column);
if (tok_getType() === 16506) {
return THROW_RANGE('Can not have a `yield` expression on the left side of a ternary', $tp_yield_start, $tp_yield_stop);
}
return 144;
}
function parseYieldStarArgument(lexerFlags, $tp_yield_start, astProp) {
if (tok_getNlwas() === true) {
return THROW_RANGE('A newline after `yield` is illegal for `yield *`', $tp_yield_start, tok_getStart());
}
skipToExpressionStart(lexerFlags);
let $tp_valueStart_line = tok_getLine();
let $tp_valueStart_column = tok_getColumn();
let $tp_valueStart_start = tok_getStart();
let $tp_valueStart_stop = tok_getStop();
let assignable = parseValue(lexerFlags, true, 4, false, astProp);
parseExpressionFromOp(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, astProp);
}
function parseYieldVarname(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, astProp) {
if ((lexerFlags & 8192) === 8192) {
return THROW_RANGE('Cannot use `yield` outside of generator functions when in strict mode', $tp_ident_start, $tp_ident_stop);
}
let assignableFlags = parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, 32, allowAssignment, astProp);
return copyPiggies(32, assignableFlags);
}
function parseYieldArgument(lexerFlags, astProp) {
let $tp_yieldArgStart_line = tok_getLine();
let $tp_yieldArgStart_column = tok_getColumn();
let $tp_yieldArgStart_start = tok_getStart();
let $tp_yieldArgStart_stop = tok_getStop();
if (tok_getNlwas() === true) {
AST_set(astProp, null);
return;
}
let assignable = parseValueHeadBody(lexerFlags, true, 4, true, false, astProp);
if (tok_getStart() === $tp_yieldArgStart_start) {
AST_set(astProp, null);
return;
}
assignable = parseValueTail(lexerFlags, $tp_yieldArgStart_start, $tp_yieldArgStart_line, $tp_yieldArgStart_column, assignable, 4, false, astProp);
parseExpressionFromOp(lexerFlags, $tp_yieldArgStart_start, $tp_yieldArgStart_stop, $tp_yieldArgStart_line, $tp_yieldArgStart_column, assignable, astProp);
}
function parseIdentOrParenlessArrow(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, assignable, allowAssignment, astProp) {
if (tok_getType() === 16499) {
return parseArrowParenlessFromPunc(lexerFlags, $tp_ident_start, $tp_ident_line, $tp_ident_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, 1, 0, astProp);
} else {
AST_setIdent(astProp, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
return assignable;
}
}
function parseArrowParenlessFromPunc(lexerFlags, $tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, allowAssignment, wasSimple, $tp_async_type, astProp) {
let $tp_arrow_start = tok_getStart();
let $tp_arrow_stop = tok_getStop();
if ((((lexerFlags & 128) === 128) && ($tp_ident_type === 2126))) {
return THROW_RANGE('Arrows cannot be generators and parenless `yield` param in a generator would be parsing a yield expression and fail at the arrow', $tp_arrow_start, $tp_arrow_stop);
}
fatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, lexerFlags);
if (isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)) {
wasSimple = 3;
}
if (tok_getNlwas() === true) {
return THROW_RANGE('The arrow is a restricted production and there can not be a newline before `=>` token', $tp_arrow_start, $tp_arrow_stop);
}
if (babelCompat) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)], id:null, generator:false, async:$tp_async_type === 2074, body:undefined});
} else if ((acornCompat && (!allowAsyncFunctions))) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)], id:null, generator:false, expression:undefined, body:undefined});
} else {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)], id:null, generator:false, async:$tp_async_type === 2074, expression:undefined, body:undefined});
}
let arrowScoop = SCOPE_createGlobal('parseArrowParenlessFromPunc');
let paramScoop = SCOPE_addLayer(arrowScoop, SCOPE_LAYER_ARROW_PARAMS, 'parseArrowParenlessFromPunc(arg)');
SCOPE_addLexBinding(paramScoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, 1);
parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, wasSimple);
AST_close($tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column);
return 1040;
}
function parseTickExpression(lexerFlags, $tp_tick_start, $tp_tick_stop, $tp_tick_line, $tp_tick_column, astProp) {
AST_open(astProp, {type:'TemplateLiteral', loc:undefined, expressions:[], quasis:[]});
let awaitYieldFlagsFromAssignable = 8;
if (tok_getType() === 524308) {
parseQuasiPart(lexerFlags, true, false);
AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column);
return awaitYieldFlagsFromAssignable;
}
if (tok_getType() === 524305) {
parseQuasiPart(lexerFlags, false, false);
let tmpLexerFlags = (((lexerFlags | 2048) | 4096) | 1824) ^ 1824;
let wasTail = true;
do {
awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
wasTail = ((((tok_getType() === 524307) || (tok_getType() === 1572883)))? true : false);
parseQuasiPart(lexerFlags, wasTail, false);
} while (wasTail === false);
AST_close($tp_tick_start, $tp_tick_line, $tp_tick_column);
return awaitYieldFlagsFromAssignable;
}
return THROW_RANGE('Template contained bad escape, which is only valid in _tagged_ templates (and only since ES9/ES2018)', $tp_tick_start, $tp_tick_stop);
}
function parseQuasiPart(lexerFlags, wasTail, allowBadEscapes) {
let $tp_tick_type = tok_getType();
let $tp_tick_line = tok_getLine();
let $tp_tick_column = tok_getColumn();
let $tp_tick_start = tok_getStart();
let $tp_tick_stop = tok_getStop();
let $tp_tick_canon = tok_getCanoN();
let hasDoubleStart = false;
let noCooked = false;
if (isBadTickToken(tok_getType())) {
if (!allowBadEscapes) {
return THROW_RANGE('Template contained an illegal escape, these are only allowed in _tagged_ templates in >=ES2018', $tp_tick_start, $tp_tick_stop);
}
noCooked = true;
}
if (((((((tok_getType() === 524308) || (tok_getType() === 524307))) || (tok_getType() === 1572884))) || (tok_getType() === 1572883))) {
skipDiv(lexerFlags);
} else if (((((((tok_getType() === 524305) || (tok_getType() === 524306))) || (tok_getType() === 1572881))) || (tok_getType() === 1572882))) {
skipToExpressionStart(lexerFlags);
hasDoubleStart = true;
} else {
return THROW_RANGE('The first token after the template expression should be a continuation of the template', $tp_tick_start, $tp_tick_stop);
}
let closeWrapperLen = (((((((($tp_tick_type === 524305) || ($tp_tick_type === 524306))) || ($tp_tick_type === 1572881))) || ($tp_tick_type === 1572882)))? 2 : 1);
let quasiValue = tok_sliceInput($tp_tick_start + 1, $tp_tick_stop - closeWrapperLen);
if ((((acornCompat || babelCompat)) || templateNewlineNormalization)) {
quasiValue = quasiValue.replace(/\r\n?/g, '\n');
}
let cookedValue = (noCooked? null : $tp_tick_canon);
AST_open('quasis', {type:'TemplateElement', loc:undefined, tail:wasTail === true, value:{raw:quasiValue, cooked:cookedValue}});
AST_closeTemplateElement(hasDoubleStart, $tp_tick_start, $tp_tick_line, $tp_tick_column + 1);
}
function parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, leftHandSideExpression, astProp) {
if ((assignable & 1024) === 1024) return assignable;
switch (tok_getType()) {
case 16485:
return _parseValueTailDotProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
case 16509:
return _parseValueTailDynamicProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
case 16471:
return _parseValueTailCall(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
case 82043:
if (isNewArg === 3) {
return THROW_RANGE('Cannot use `?.` in the arg of `new`', tok_getStart(), tok_getStop());
}
return parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, astProp);
case 524308:

case 524305:

case 1572884:

case 1572881:
return _parseValueTailTemplate(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp);
case 16478:
if (isNewArg === 3) return _parseValueTailNewArg(assignable);
return parseValueTailUpdateExpression(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, leftHandSideExpression, '++', astProp);
case 16482:
if (isNewArg === 3) return _parseValueTailNewArg(assignable);
return parseValueTailUpdateExpression(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, leftHandSideExpression, '--', astProp);
}
if (isNewArg === 3) return _parseValueTailNewArg(assignable);
return assignable;
}
function parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, astProp) {
do {
let $tp_next_type = tok_getType();
switch ($tp_next_type) {
case 82043:
skipAny(lexerFlags);
let $tp_q_type = tok_getType();
if (isIdentToken($tp_q_type)) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
if (!isIdentToken($tp_ident_type)) THROW_RANGE('Expected ident after dot', $tp_ident_start, $tp_ident_stop);
skipDiv(lexerFlags);
AST_setNode(astProp, {type:'OptionalMemberExpression', loc:AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column), optional:true, computed:false, object:AST_popNode(astProp), property:AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)});
} else if ($tp_q_type === 16509) {
skipAny(lexerFlags);
AST_wrapClosedCustom(astProp, {type:'OptionalMemberExpression', loc:undefined, optional:true, computed:true, object:undefined, property:undefined}, 'object');
parseExpression(lexerFlags, 'property');
if (tok_getType() !== 16510) {
return THROW_RANGE(('Expected the closing `]` char of a dynamic property, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
} else if ($tp_q_type === 16471) {
AST_wrapClosedCustom(astProp, {type:'OptionalCallExpression', loc:undefined, optional:true, callee:undefined, arguments:[]}, 'callee');
let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
assignable = mergeAssignable(nowAssignable, assignable);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
} else if (isTemplateStart($tp_q_type)) {
return THROW_RANGE('An value containing the optional chaining operator cannot be followed by a template', tok_getStart(), tok_getStop());
} else if ($tp_q_type === 82043) {
return THROW_RANGE('Cannot cannot `?.?.`, must have something in between', tok_getStart(), tok_getStop());
}
break;
case 16485:
skipAny(lexerFlags);
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
if (!isIdentToken($tp_ident_type)) THROW_RANGE('Expected ident after dot', $tp_ident_start, $tp_ident_stop);
skipDiv(lexerFlags);
AST_setNode(astProp, {type:'OptionalMemberExpression', loc:AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column), optional:false, computed:false, object:AST_popNode(astProp), property:AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon)});
break;
case 16471:
AST_wrapClosedCustom(astProp, {type:'OptionalCallExpression', loc:undefined, optional:false, callee:undefined, arguments:undefined}, 'callee');
let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
assignable = mergeAssignable(nowAssignable, assignable);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
break;
case 16509:
skipAny(lexerFlags);
AST_wrapClosedCustom(astProp, {type:'OptionalMemberExpression', loc:undefined, optional:false, computed:true, object:undefined, property:undefined}, 'object');
parseExpression(lexerFlags, 'property');
if (tok_getType() !== 16510) {
return THROW_RANGE(('Expected the closing `]` char of a dynamic property, found`' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
assignable = parseOptionalValueTailOuter(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, 'property');
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
break;
default:
if (isTemplateStart($tp_next_type)) {
return THROW_RANGE('An value containing the optional chaining operator cannot be followed by a template', tok_getStart(), tok_getStop());
}
return setNotAssignable(assignable);
}
} while (true);
}
function _parseValueTailDotProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
skipToIdentOrDie(lexerFlags | 65536);
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipDiv(lexerFlags);
AST_setNode(astProp, {type:'MemberExpression', loc:AST_getClosedLoc($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column), object:AST_popNode(astProp), property:AST_getIdentNode($tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon), computed:false});
return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setAssignable(assignable), isNewArg, false, astProp);
}
function _parseValueTailDynamicProperty(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
AST_wrapClosedCustom(astProp, {type:'MemberExpression', loc:undefined, object:undefined, property:undefined, computed:true}, 'object');
skipToExpressionStart(lexerFlags);
let nowAssignable = parseExpressions(((lexerFlags | 4096) | 1824) ^ 1824, 'property');
assignable = mergeAssignable(nowAssignable, assignable);
assignable = (assignable | 1024) ^ 1024;
if (tok_getType() !== 16510) {
return THROW_RANGE(('Expected the closing bracket `]` for a dynamic property, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setAssignable(assignable), isNewArg, false, astProp);
}
function _parseValueTailCall(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
if (isNewArg === 3) {
let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
if (tok_getType() === 16499) {
return THROW_RANGE('The `new` keyword can not be applied to an arrow', tok_getStart(), tok_getStop());
}
assignable = mergeAssignable(nowAssignable, assignable);
assignable = setNotAssignable(assignable);
return assignable;
}
AST_wrapClosedCustom(astProp, {type:'CallExpression', loc:undefined, callee:undefined, arguments:[]}, 'callee');
let nowAssignable = parseCallArgs(lexerFlags, 'arguments');
assignable = mergeAssignable(nowAssignable, assignable);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setNotAssignable(assignable), isNewArg, false, astProp);
}
function _parseValueTailTemplate(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, assignable, isNewArg, astProp) {
AST_wrapClosedCustom(astProp, {type:'TaggedTemplateExpression', loc:undefined, tag:undefined, quasi:undefined}, 'tag');
let $tp_Quasi_line = tok_getLine();
let $tp_Quasi_column = tok_getColumn();
let $tp_Quasi_start = tok_getStart();
AST_open('quasi', {type:'TemplateLiteral', loc:undefined, expressions:[], quasis:[]});
_parseValueTailTemplateRest(lexerFlags);
AST_close($tp_Quasi_start, $tp_Quasi_line, $tp_Quasi_column);
AST_close($tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column);
return parseValueTail(lexerFlags, $tp_valueFirst_start, $tp_valueFirst_line, $tp_valueFirst_column, setNotAssignable(assignable), isNewArg, false, astProp);
}
function _parseValueTailTemplateRest(lexerFlags) {
let awaitYieldFlagsFromAssignable = 8;
if (((tok_getType() === 524308) || (tok_getType() === 1572884))) {
parseQuasiPart(lexerFlags, true, allowBadEscapesInTaggedTemplates);
return;
}
parseQuasiPart(lexerFlags, false, allowBadEscapesInTaggedTemplates);
let tmpLexerFlags = (((lexerFlags | 2048) | 4096) | 1824) ^ 1824;
let wasTail = true;
do {
awaitYieldFlagsFromAssignable |= parseExpressions(tmpLexerFlags, 'expressions');
wasTail = ((((tok_getType() === 524307) || (tok_getType() === 1572883)))? true : false);
parseQuasiPart(lexerFlags, wasTail, allowBadEscapesInTaggedTemplates);
} while (wasTail === false);
}
function _parseValueTailNewArg(assignable) {
return setNotAssignable(assignable);
}
function parseValueTailUpdateExpression(lexerFlags, $tp_argStart_start, $tp_argStart_line, $tp_argStart_column, assignable, leftHandSideExpression, opName, astProp) {
let $tp_op_start = tok_getStart();
let $tp_op_stop = tok_getStop();
if (leftHandSideExpression === true) {
return THROW_RANGE(('A `' + opName) + '` update expression is not allowed here', $tp_op_start, $tp_op_stop);
}
if (tok_getNlwas() === true) {
if ((lexerFlags & 4096) === 4096) {
return THROW_RANGE(('The postfix `' + opName) + '` is a restricted production so ASI must apply but that is not valid in this context', $tp_op_start, $tp_op_stop);
}
return assignable;
}
if (notAssignable(assignable)) {
return THROW_RANGE(('Cannot postfix `' + opName) + '` a non-assignable value', $tp_op_start, $tp_op_stop);
}
AST_throwIfIllegalUpdateArg(astProp);
skipDiv(lexerFlags);
AST_setNodeDangerously(astProp, {type:'UpdateExpression', loc:AST_getClosedLoc($tp_argStart_start, $tp_argStart_line, $tp_argStart_column), argument:AST_popNode(astProp), operator:opName, prefix:false});
return 16;
}
function parseCallArgs(lexerFlags, astProp) {
skipToExpressionStartGrouped(lexerFlags);
lexerFlags = ((lexerFlags | 4096) | 32) ^ 32;
let assignable = 8;
if (tok_getType() === 16472) {
skipDiv(lexerFlags);
} else {
do {
if (tok_getType() === 16486) {
let $tp_spread_line = tok_getLine();
let $tp_spread_column = tok_getColumn();
let $tp_spread_start = tok_getStart();
skipToExpressionStart(lexerFlags);
AST_open(astProp, {type:'SpreadElement', loc:undefined, argument:undefined});
let nowAssignable = parseExpression(lexerFlags, 'argument');
assignable = mergeAssignable(nowAssignable, assignable);
AST_close($tp_spread_start, $tp_spread_line, $tp_spread_column);
} else {
let nowAssignable = parseExpression(lexerFlags, astProp);
assignable = mergeAssignable(nowAssignable, assignable);
}
if (tok_getType() !== 16480) break;
let $tp_comma_start = tok_getStart();
let $tp_comma_stop = tok_getStop();
skipToExpressionStartGrouped(lexerFlags);
if (tok_getType() === 16472) {
if (allowTrailingFunctionComma) break;
return THROW_RANGE('Targeted language version does not support trailing call arg comma', $tp_comma_start, $tp_comma_stop);
}
} while (true);
if (tok_getType() !== 16472) {
return THROW_RANGE(('Expecting closing paren `)` for the call, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
}
return (assignable | 1024) ^ 1024;
}
function parseDynamicImportStatement(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp) {
AST_open(astProp, {type:'ExpressionStatement', loc:undefined, expression:undefined});
parseDynamicImport(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, 'expression');
let assignable = parseValueTail(lexerFlags, $tp_import_start, $tp_import_line, $tp_import_column, 16, 4, false, 'expression');
parseExpressionFromOp(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, assignable, 'expression');
parseSemiOrAsi(lexerFlags);
AST_close($tp_import_start, $tp_import_line, $tp_import_column);
}
function parseDynamicImport(lexerFlags, $tp_import_start, $tp_import_stop, $tp_import_line, $tp_import_column, astProp) {
if (!allowDynamicImport) {
return THROW_RANGE('Dynamic import syntax not supported. Requires version ES2020+ / ES11+.', $tp_import_start, $tp_import_stop);
}
if (acornCompat) {
AST_open(astProp, {type:'ImportExpression', loc:undefined, source:undefined});
} else {
AST_open(astProp, {type:'CallExpression', loc:undefined, callee:undefined, arguments:[]});
AST_setNode('callee', {type:'Import', loc:AST_getClosedLoc($tp_import_start, $tp_import_line, $tp_import_column)});
}
skipToExpressionStart(lexerFlags);
let assignable = parseExpression(lexerFlags, (acornCompat? 'source' : 'arguments'));
if (tok_getType() !== 16472) {
if (tok_getType() === 16480) {
return THROW_RANGE('Dynamic `import` only expected exactly one argument and does not allow for a trailing comma', $tp_import_start, tok_getStop());
}
if (tok_getType() === 67636) {
return THROW_RANGE('The dynamic import syntax explicitly forbids the `in` operator', tok_getStart(), tok_getStop());
}
return THROW_RANGE('The dynamic `import` argument was followed by unknown content', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
AST_close($tp_import_start, $tp_import_line, $tp_import_column);
return assignable;
}
function parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, paramsSimple) {
skipToExpressionStart(lexerFlags);
if (allowAssignment === false) {
return THROW_RANGE('Was parsing a value that could not be AssignmentExpression but found an arrow', tok_getStart(), tok_getStop());
}
if (options_exposeScopes) AST_set('$scope', paramScoop);
if (paramScoop.dupeParamErrorStart !== 0) {
return THROW_RANGE('Arrow had duplicate params', paramScoop.dupeParamErrorStart - 1, paramScoop.dupeParamErrorStop);
}
let insideForLhs = (lexerFlags & 32) === 32;
let arrowInheritedFlags = lexerFlags & 18;
lexerFlags = resetLexerFlagsForFuncAndArrow(lexerFlags, 0, $tp_async_type, true);
lexerFlags |= arrowInheritedFlags;
if (tok_getType() === 16513) {
if (!babelCompat) AST_set('expression', false);
let arrowScoop = SCOPE_addLayer(paramScoop, SCOPE_LAYER_FUNC_BODY, 'parseArrowFromPunc');
parseFunctionBody(lexerFlags, arrowScoop, 1, paramsSimple, 0, 0, 0, 0, 0, '', true);
if ((isRegexToken(tok_getType()) && (!tok_getNlwas()))) {
THROW_RANGE('Found a regex or division after an arrow, that is illegal', tok_getStart(), tok_getStop());
}
} else {
if (insideForLhs) lexerFlags |= 32;
if (!babelCompat) AST_set('expression', true);
parseExpression(lexerFlags, 'body');
}
{
let $tp_error_type = tok_getType();
let $tp_error_start = tok_getStart();
let $tp_error_stop = tok_getStop();
let $tp_error_nl = tok_getNlwas();
if ((insideForLhs && ($tp_error_type === 67636))) {
return THROW_RANGE('Arrows cannot be lhs to for-in', $tp_error_start, $tp_error_stop);
}
if ($tp_error_type === 16485) {
return THROW_RANGE('Block body arrows can not be immediately accessed without a group', $tp_error_start, $tp_error_stop);
}
if ($tp_error_nl) {
if ($tp_error_type === 82023) {
return THROW_RANGE('An arrow function can not be part of an operator to the right', $tp_error_start, $tp_error_stop);
}
return 1040;
}
if ($tp_error_type === 16471) {
return THROW_RANGE('Block body arrows can not be immediately invoked without a group', $tp_error_start, $tp_error_stop);
}
if ($tp_error_type === 16509) {
return THROW_RANGE('Block body arrows can not be immediately accessed without a group', $tp_error_start, $tp_error_stop);
}
if (isTemplateStart($tp_error_type)) {
return THROW_RANGE('Block body arrows can not be immediately tagged without a group', $tp_error_start, $tp_error_stop);
}
if ((isAnyAssignmentOp() || (($tp_error_type & 65536) === 65536))) {
return THROW_RANGE('An arrow function can not be part of an operator to the right', $tp_error_start, $tp_error_stop);
}
if ((($tp_error_type === 16478) || ($tp_error_type === 16482))) {
return THROW_RANGE('An arrow function can not have a postfix update operator', $tp_error_start, $tp_error_stop);
}
}
return 1040;
}
function parseGroupToplevels(lexerFlagsBeforeParen, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, $tp_async_type, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, newlineAfterAsync, leftHandSideExpression, astProp) {
let $tp_paren_line = tok_getLine();
let $tp_paren_column = tok_getColumn();
let $tp_paren_start = tok_getStart();
skipToExpressionStartGrouped(lexerFlagsBeforeParen);
let $tp_firstTokenAfterParen_line = tok_getLine();
let $tp_firstTokenAfterParen_column = tok_getColumn();
let $tp_firstTokenAfterParen_start = tok_getStart();
let lexerFlags = ((lexerFlagsBeforeParen | 4096) | 1824) ^ 1824;
let arrowScoop = SCOPE_createGlobal('_parseGroupToplevels');
let paramScoop = SCOPE_addLayer(arrowScoop, SCOPE_LAYER_ARROW_PARAMS, '_parseGroupToplevels(arg)');
if (tok_getType() === 16472) {
if ($tp_async_type === 2074) {
skipDiv(lexerFlags);
return parseAfterAsyncGroup(lexerFlagsBeforeParen, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, 1, false, newlineAfterAsync, true, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, 8, astProp);
}
skipToArrowOrDie(lexerFlags);
let $tp_arrow_start = tok_getStart();
let $tp_arrow_stop = tok_getStop();
if (leftHandSideExpression === true) {
return THROW_RANGE('Arrow not allowed in this position', $tp_paren_start, $tp_arrow_stop);
}
lexerFlags = lexerFlagsBeforeParen;
if (tok_getNlwas() === true) {
return THROW_RANGE('The arrow token `=>` is a restricted production and cannot have a newline preceding it', $tp_arrow_start, $tp_arrow_stop);
}
if (babelCompat) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, async:false, body:undefined});
} else if ((acornCompat && (!allowAsyncFunctions))) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, expression:undefined, body:undefined});
} else {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, async:false, expression:undefined, body:undefined});
}
let assignable = parseArrowFromPunc(lexerFlags, paramScoop, 0, allowAssignmentForGroupToBeArrow, 1);
AST_close($tp_paren_start, $tp_paren_line, $tp_paren_column);
return assignable;
}
let foundSingleIdentWrap = false;
let rootAstProp = astProp;
let destructible = 0;
let assignable = 8;
let toplevelComma = false;
let wasSimple = 1;
let mustBeArrow = false;
while (tok_getType() !== 16472) {
if (isIdentToken(tok_getType())) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, false);
let wasAssignment = tok_getType() === 49264;
let wasCommaOrEnd = ((tok_getType() === 16480) || (tok_getType() === 16472));
let exprAssignable = parseExpressionAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, BINDING_TYPE_ARG, astProp);
assignable = mergeAssignable(exprAssignable, assignable);
SCOPE_addLexBinding(paramScoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, BINDING_TYPE_ARG, 1);
if (wasAssignment) {
wasSimple = 3;
} else if (wasCommaOrEnd) {
if (((!toplevelComma) && (tok_getType() === 16472))) {
foundSingleIdentWrap = true;
}
if (notAssignable(assignable)) {
destructible |= 1;
} else if (isStrictOnlyKeyword($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon)) {
wasSimple = 3;
} else {

}
} else {
destructible |= 1;
}
} else if (tok_getType() === 16513) {
let $tp_startOfPattern_line = tok_getLine();
let $tp_startOfPattern_column = tok_getColumn();
let $tp_startOfPattern_start = tok_getStart();
let $tp_startOfPattern_stop = tok_getStop();
destructible |= parseObjectOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, true, undefined, undefined, astProp);
if (((tok_getType() !== 16480) && (tok_getType() !== 16472))) {
destructible |= 1;
}
assignable = parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp);
wasSimple = 3;
} else if (tok_getType() === 16509) {
let $tp_startOfPattern_line = tok_getLine();
let $tp_startOfPattern_column = tok_getColumn();
let $tp_startOfPattern_start = tok_getStart();
let $tp_startOfPattern_stop = tok_getStop();
destructible |= parseArrayOuter(lexerFlags, paramScoop, BINDING_TYPE_ARG, true, undefined, undefined, astProp);
if (((tok_getType() !== 16480) && (tok_getType() !== 16472))) {
destructible |= 1;
}
assignable = parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp);
wasSimple = 3;
} else if (tok_getType() === 16486) {
wasSimple = 3;
let subDestruct = parseArrowableSpreadOrRest(lexerFlags, paramScoop, 16472, BINDING_TYPE_ARG, $tp_async_type, undefined, undefined, astProp);
destructible |= subDestruct;
if ($tp_async_type === 2074) {
if (tok_getType() !== 16472) {
destructible |= 1;
} else {

}
} else {
if ((((subDestruct & 1) === 1) || (tok_getType() === 16480))) {
return THROW_RANGE('The ... argument must be destructible in an arrow header, found something that was not destructible', tok_getStart(), tok_getStop());
}
mustBeArrow = true;
break;
}
} else {
destructible |= 1;
let exprAssignable = parseExpression(lexerFlags, astProp);
assignable = mergeAssignable(exprAssignable, assignable);
if (tok_getType() === 16480) {
if (!toplevelComma) {
toplevelComma = true;
AST_wrapClosedIntoArrayCustom(rootAstProp, {type:'SequenceExpression', loc:undefined, expressions:undefined}, 'expressions');
astProp = 'expressions';
}
assignable = __parseExpressions(lexerFlags, assignable, astProp);
}
if (toplevelComma) {
if (babelCompat) AST_set('extra', {parenthesized:true, parenStart:$tp_paren_start});
AST_close($tp_firstTokenAfterParen_start, $tp_firstTokenAfterParen_line, $tp_firstTokenAfterParen_column);
assignable = setNotAssignable(assignable);
}
if (tok_getType() !== 16472) {
return THROW_RANGE(('Expected the closing paren `)` for the group, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
if ($tp_async_type === 2074) {
if (tok_getType() === 16499) {
return THROW_RANGE('The header of this async arrow contained something that is not valid a param', tok_getStart(), tok_getStop());
}
return parseAfterAsyncGroup(lexerFlagsBeforeParen, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, false, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, rootAstProp);
}
if ((babelCompat && (!toplevelComma))) {
AST_babelParenthesizesClosed($tp_paren_start, astProp);
}
return (assignable | 1024) ^ 1024;
}
if (tok_getType() !== 16480) break;
skipToExpressionStartGrouped(lexerFlags);
if (tok_getType() === 16472) {
if ($tp_async_type === 0) {
if (allowTrailingFunctionComma) {
mustBeArrow = true;
break;
}
return THROW_RANGE('Encountered trailing comma in the toplevel of a group, this could be valid in arrows but not with the currently targeted language version', tok_getStart(), tok_getStop());
}
}
if (!toplevelComma) {
toplevelComma = true;
AST_wrapClosedIntoArrayCustom(rootAstProp, {type:'SequenceExpression', loc:undefined, expressions:undefined}, 'expressions');
astProp = 'expressions';
}
}
if (toplevelComma) {
assignable = setNotAssignable(assignable);
if (babelCompat) AST_set('extra', {parenthesized:true, parenStart:$tp_paren_start});
AST_close($tp_firstTokenAfterParen_start, $tp_firstTokenAfterParen_line, $tp_firstTokenAfterParen_column);
}
destructible = copyPiggies(destructible, assignable);
if (tok_getType() !== 16472) {
return THROW_RANGE(('Missing closing paren `)` for group, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
lexerFlags = lexerFlagsBeforeParen;
verifyDestructible(destructible);
let isArrow = tok_getType() === 16499;
if (isArrow) {
destructible |= 1024;
let $tp_arrow_start = tok_getStart();
let $tp_arrow_stop = tok_getStop();
if (leftHandSideExpression === true) {
let $tp_errorOffset_start = (($tp_async_type === 2074)? $tp_async_start : $tp_paren_start);
return THROW_RANGE('Arrow not allowed in this position', $tp_errorOffset_start, $tp_arrow_stop);
}
if (tok_getNlwas() === true) {
return THROW_RANGE('Arrow is restricted production; cannot have newline before the arrow token', $tp_arrow_start, $tp_arrow_stop);
}
if ((destructible & 1) === 1) {
if ($tp_async_type === 2074) {
return THROW_RANGE('The left hand side of the async arrow is not destructible so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
}
return THROW_RANGE('The left hand side of the arrow is not destructible so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
}
if ((destructible & 2) === 2) {
return THROW_RANGE('The left hand side of the arrow can only be destructed through assignment so arrow is illegal', $tp_arrow_start, $tp_arrow_stop);
}
if ((destructible & 64) !== 0) {
if ($tp_async_type === 2074) {
return THROW_RANGE('The parameter header of an async arrow cannot contain `await` as varname nor as a keyword', $tp_async_start, $tp_async_stop);
}
if ((lexerFlags & 8) !== 0) {
return THROW_RANGE('The parameter header of an arrow inside an async function cannot contain `await` as varname nor as a keyword', tok_getStart(), tok_getStop());
}
}
if ((destructible & 128) === 128) {
return THROW_RANGE('The arguments of an arrow cannot contain a yield expression in their defaults', $tp_arrow_start, $tp_arrow_stop);
}
} else if ((((destructible & 4) === 4) || mustBeArrow)) {
return THROW_RANGE('Group contained a value that must destruct but this was not an arrow so it is invalid', $tp_paren_start, tok_getStop());
}
if ($tp_async_type === 2074) {
destructible = copyPiggies(destructible, assignable);
return parseAfterAsyncGroup(lexerFlags, paramScoop, asyncStmtOrExpr, allowAssignmentForGroupToBeArrow, wasSimple, toplevelComma, newlineAfterAsync, false, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, rootAstProp);
}
if (isArrow) {
parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, 0, $tp_paren_start, $tp_paren_line, $tp_paren_column, allowAssignmentForGroupToBeArrow, rootAstProp);
assignable = copyPiggies(assignable, destructible);
return 1040 | (assignable & 64);
}
if ((babelCompat && (!toplevelComma))) {
AST_babelParenthesizesClosed($tp_paren_start, astProp);
}
return (assignable | 1024) ^ 1024;
}
function parseAfterPatternInGroup(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, destructible, astProp) {
if (((tok_getType() !== 16480) && (tok_getType() !== 16472))) {
if ((destructible & 4) === 4) {
return THROW_RANGE('Pattern can not have a tail but did not find a comma or closing paren of the arrow header', tok_getStart(), tok_getStop());
}
let exprAssignable = parseValueTail(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_line, $tp_startOfPattern_column, 16, 4, false, astProp);
assignable = mergeAssignable(exprAssignable, assignable);
if (((tok_getType() !== 16480) && (tok_getType() !== 16472))) {
assignable = parseExpressionFromOp(lexerFlags, $tp_startOfPattern_start, $tp_startOfPattern_stop, $tp_startOfPattern_line, $tp_startOfPattern_column, assignable, astProp);
}
} else {
assignable = setNotAssignable(assignable);
}
return assignable;
}
function parseAfterAsyncGroup(lexerFlags, paramScoop, fromStmtOrExpr, allowAssignment, wasSimple, toplevelComma, newlineAfterAsync, zeroArgs, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, assignable, astProp) {
if (tok_getType() === 16499) {
let $tp_arrow_start = tok_getStart();
let $tp_arrow_stop = tok_getStop();
if (tok_getNlwas() === true) {
return THROW_RANGE('The arrow is a restricted production an there can not be a newline before `=>` token', $tp_arrow_start, $tp_arrow_stop);
}
if (newlineAfterAsync === true) {
return THROW_RANGE('A newline after async is always a syntax error if the rhs turns to be an arrow function', $tp_arrow_start, $tp_arrow_stop);
}
if (zeroArgs) {
parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp);
} else {
parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, 2074, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp);
}
} else {
if (zeroArgs) {
AST_setNode(astProp, {type:'CallExpression', loc:AST_getClosedLoc($tp_async_start, $tp_async_line, $tp_async_column), callee:AST_getIdentNode($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon), arguments:[]});
} else {
AST_patchAsyncCall($tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, $tp_async_canon, astProp);
}
let assignable = parseValueTail(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, 16, 4, false, astProp);
if (fromStmtOrExpr === 2) {
assignable = parseExpressionFromOp(lexerFlags, $tp_async_start, $tp_async_stop, $tp_async_line, $tp_async_column, assignable, astProp);
if (tok_getType() === 16480) {
assignable = _parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, assignable, astProp);
}
parseSemiOrAsi(lexerFlags);
}
return assignable;
}
if (fromStmtOrExpr === 2) {
if (tok_getType() === 16480) {
_parseExpressions(lexerFlags, $tp_async_start, $tp_async_line, $tp_async_column, 16, astProp);
}
parseSemiOrAsi(lexerFlags);
}
return 1040 | (assignable & 64);
}
function parseArrowAfterAsyncNoArgGroup(lexerFlags, paramScoop, $tp_async_start, $tp_async_line, $tp_async_column, allowAssignment, astProp) {
if (babelCompat) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, async:true, body:undefined});
} else if ((acornCompat && (!allowAsyncFunctions))) {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, expression:undefined, body:undefined});
} else {
AST_open(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:[], id:null, generator:false, async:true, expression:undefined, body:undefined});
}
let assignable = parseArrowFromPunc(lexerFlags, paramScoop, 2074, allowAssignment, 1);
AST_close($tp_async_start, $tp_async_line, $tp_async_column);
return assignable;
}
function parseArrowAfterGroup(lexerFlags, paramScoop, wasSimple, toplevelComma, $tp_async_type, $tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column, allowAssignment, astProp) {
if (babelCompat) {
AST_wrapClosedIntoArrayCustom(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:undefined, id:null, generator:false, async:$tp_async_type === 2074, body:undefined}, 'params');
} else if ((acornCompat && (!allowAsyncFunctions))) {
AST_wrapClosedIntoArrayCustom(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:undefined, id:null, generator:false, expression:undefined, body:undefined}, 'params');
} else {
AST_wrapClosedIntoArrayCustom(astProp, {type:'ArrowFunctionExpression', loc:undefined, params:undefined, id:null, generator:false, async:$tp_async_type === 2074, expression:undefined, body:undefined}, 'params');
}
let top = _path[_path.length - 1];
if (toplevelComma) {
let params = top.params[top.params.length - 1];
top.params = params.expressions;
}
let params = top.params;
for (let i = 0;i < params.length;++i) {
AST__destruct(params[i], params, i);
}
parseArrowFromPunc(lexerFlags, paramScoop, $tp_async_type, allowAssignment, wasSimple);
AST_close($tp_arrowStart_start, $tp_arrowStart_line, $tp_arrowStart_column);
}
function parseArrayOuter(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
let destructible = parseArrayLiteralPattern(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp);
return destructible;
}
function parseArrayLiteralPattern(lexerFlagsBeforeParen, scoop, bindingType, skipInit, exportedNames, exportedBindings, _astProp) {
let lexerFlags = (lexerFlagsBeforeParen | 32) ^ 32;
let $tp_arrayOpen_line = tok_getLine();
let $tp_arrayOpen_column = tok_getColumn();
let $tp_arrayOpen_start = tok_getStart();
skipToExpressionStartSquareCloseComma(lexerFlags);
AST_open(_astProp, {type:'ArrayExpression', loc:undefined, elements:[]});
let astProp = 'elements';
let destructible = 0;
while (tok_getType() === 16480) {
skipToExpressionStartSquareCloseComma(lexerFlags);
AST_add(astProp, null);
}
let spreadStage = 0;
let assignableYieldAwaitState = 8;
while (tok_getType() !== 16510) {
let $tp_elementStart_line = tok_getLine();
let $tp_elementStart_column = tok_getColumn();
let $tp_elementStart_start = tok_getStart();
let $tp_elementStart_stop = tok_getStop();
if (isIdentToken(tok_getType())) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, false);
let nextIsAssignment = tok_getType() === 49264;
let nextIsCommaOrEnd = ((tok_getType() === 16480) || (tok_getType() === 16510));
let leftAssignable = parseValueHeadBodyAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, 4, true, false, astProp);
assignableYieldAwaitState |= leftAssignable;
if (nextIsAssignment) {
if (notAssignable(leftAssignable)) {
return THROW_RANGE(('Cannot assign or destruct to keyword `' + tok_sliceInput($tp_ident_start, $tp_ident_stop)) + '`', $tp_ident_start, $tp_ident_stop);
}
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
addBindingToExports(exportedBindings, $tp_ident_canon);
AST_wrapClosedCustom(astProp, {type:'AssignmentExpression', loc:undefined, left:undefined, operator:'=', right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
let rightAssignable = parseExpression(lexerFlags, 'right');
AST_close($tp_ident_start, $tp_ident_line, $tp_ident_column);
assignableYieldAwaitState |= rightAssignable;
} else if (nextIsCommaOrEnd) {
if (notAssignable(leftAssignable)) {
destructible |= 1;
} else {
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
addBindingToExports(exportedBindings, $tp_ident_canon);
}
} else {
if (bindingType === BINDING_TYPE_ARG) {
destructible |= 2;
} else if (bindingType !== BINDING_TYPE_NONE) {
destructible |= 1;
}
let nowDestruct = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, leftAssignable, 1, 16510, astProp);
destructible |= nowDestruct;
}
} else if (tok_getType() === 16513) {
let $tp_objOpen_line = tok_getLine();
let $tp_objOpen_column = tok_getColumn();
let $tp_objOpen_start = tok_getStart();
let $tp_objOpen_stop = tok_getStop();
let objDestructible = parseObjectAndAssign(lexerFlags, scoop, bindingType, true, exportedNames, exportedBindings, astProp);
destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_objOpen_start, $tp_objOpen_stop, $tp_objOpen_line, $tp_objOpen_column, (((objDestructible & 1) === 1)? 16 : 32), objDestructible, 16510, astProp);
} else if (tok_getType() === 16509) {
let $tp_arrOpen_line = tok_getLine();
let $tp_arrOpen_column = tok_getColumn();
let $tp_arrOpen_start = tok_getStart();
let $tp_arrOpen_stop = tok_getStop();
let arrDestructible = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, true, exportedNames, exportedBindings, astProp);
destructible |= parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_arrOpen_start, $tp_arrOpen_stop, $tp_arrOpen_line, $tp_arrOpen_column, (((arrDestructible & 1) === 1)? 16 : 32), arrDestructible, 16510, astProp);
} else if (tok_getType() === 16486) {
let subDestruct = parseArrowableSpreadOrRest(lexerFlags, scoop, 16510, bindingType, 0, exportedNames, exportedBindings, astProp);
destructible |= subDestruct;
if (spreadStage === 0) spreadStage = 1;
} else {
let $tp_exprStart_line = tok_getLine();
let $tp_exprStart_column = tok_getColumn();
let $tp_exprStart_start = tok_getStart();
let $tp_exprStart_stop = tok_getStop();
let wasParen = tok_getType() === 16471;
let assignable = parseValue(lexerFlags, true, 4, false, astProp);
if (tok_getType() === 49264) {
if (isAssignable(assignable)) {
AST_wrapClosedCustom(astProp, {type:'AssignmentExpression', loc:undefined, left:undefined, operator:'=', right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
destructible |= parseExpression(lexerFlags, 'right');
AST_close($tp_elementStart_start, $tp_elementStart_line, $tp_elementStart_column);
} else {
return THROW_RANGE(('Cannot assign to lhs (starting with `' + tok_sliceInput($tp_elementStart_start, $tp_elementStart_stop)) + '`)', $tp_elementStart_start, $tp_elementStart_stop);
}
}
if (((tok_getType() !== 16480) && (tok_getType() !== 16510))) {
assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
assignable = setNotAssignable(assignable);
destructible |= 1;
} else if ((((wasParen && isAssignable(assignable))) && (((bindingType === BINDING_TYPE_NONE) || (bindingType === BINDING_TYPE_ARG))))) {
destructible |= 2;
} else if ((wasParen || notAssignable(assignable))) {
destructible |= 1;
} else {

}
}
if (tok_getType() !== 16480) break;
skipToExpressionStartSquareCloseComma(lexerFlags);
while (tok_getType() === 16480) {
skipToExpressionStartSquareCloseComma(lexerFlags);
AST_add(astProp, null);
}
if (spreadStage === 1) {
spreadStage = 2;
destructible |= 1;
}
}
lexerFlags = lexerFlagsBeforeParen;
if (tok_getType() !== 16510) {
return THROW_RANGE(('Expected the closing bracket `]` for the array, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
AST_close($tp_arrayOpen_start, $tp_arrayOpen_line, $tp_arrayOpen_column);
if (skipInit === true) {
destructible = parsePatternAssignMaybe(lexerFlags, $tp_arrayOpen_start, $tp_arrayOpen_line, $tp_arrayOpen_column, destructible, _astProp);
}
return (copyPiggies(destructible, assignableYieldAwaitState) | 1024) ^ 1024;
}
function parseObjectOuter(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
return parseObjectAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp);
}
function parseObjectAndAssign(lexerFlags, scoop, bindingType, skipInit, exportedNames, exportedBindings, astProp) {
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
AST_open(astProp, {type:'ObjectExpression', loc:undefined, properties:[]});
let destructible = parseObjectSansAssign(lexerFlags | 4096, scoop, bindingType, exportedNames, exportedBindings, 'properties');
AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column);
if (skipInit === true) {
destructible = parsePatternAssignMaybe(lexerFlags, $tp_curly_start, $tp_curly_line, $tp_curly_column, destructible, astProp);
}
return destructible;
}
function parseObjectSansAssign(outerLexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
let lexerFlags = (outerLexerFlags | 2080) ^ 2080;
skipAny(lexerFlags);
let destructible = 0;
let hasThunderProto = false;
do {
if (tok_getType() === 16480) {
return THROW_RANGE('Objects cant have comma without something preceding it', tok_getStart(), tok_getStop());
}
let currentDestruct = parseObjectPart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
if ((currentDestruct & 512) !== 0) {
currentDestruct ^= 512;
if (hasThunderProto) {
destructible |= 4;
}
hasThunderProto = true;
}
destructible |= currentDestruct;
if (tok_getType() !== 16480) break;
skipAny(lexerFlags);
} while (tok_getType() !== 16517);
lexerFlags = outerLexerFlags;
if (tok_getType() !== 16517) {
return THROW_RANGE(('Expected the closing curly `}` for an object, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipDiv(lexerFlags);
return destructible;
}
function parseObjectPart(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
let $tp_startOfKey_type = tok_getType();
let $tp_startOfKey_line = tok_getLine();
let $tp_startOfKey_column = tok_getColumn();
let $tp_startOfKey_start = tok_getStart();
if (isIdentToken($tp_startOfKey_type)) {
return parseObjectPartFromIdent(lexerFlags, $tp_startOfKey_type, scoop, bindingType, exportedNames, exportedBindings, astProp);
}
if ($tp_startOfKey_type === 16517) {
return 0;
}
if (isNumberStringToken($tp_startOfKey_type)) {
return parseObjectPartFromLiteral(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp);
}
if ($tp_startOfKey_type === 16509) {
return parseObjectPartFromComputed(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp);
}
if ($tp_startOfKey_type === 16486) {
return parseObjectRestSpread(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp);
}
if ($tp_startOfKey_type === 82009) {
skipAny(lexerFlags);
return parseObjectMethodFromKey(lexerFlags, $tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column, 'init', true, 0, 82009, 0, 0, astProp);
}
return THROW_RANGE(('Unexpected token, wanted to parse a start of a property in an object literal/pattern, got `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
function parseObjectMethodFromKey(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp) {
let $tp_keyStart_type = tok_getType();
let $tp_keyStart_line = tok_getLine();
let $tp_keyStart_column = tok_getColumn();
let $tp_keyStart_start = tok_getStart();
let $tp_keyStart_stop = tok_getStop();
let $tp_keyStart_canon = tok_getCanoN();
if (isIdentToken($tp_keyStart_type)) {
skipAny(lexerFlags);
AST_setIdent(astProp, $tp_keyStart_start, $tp_keyStart_stop, $tp_keyStart_line, $tp_keyStart_column, $tp_keyStart_canon);
if (tok_getType() !== 16471) {
return THROW_RANGE(('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, false, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp);
}
if (isNumberStringToken($tp_keyStart_type)) {
skipAny(lexerFlags);
AST_setLiteral(astProp, $tp_keyStart_type, $tp_keyStart_start, $tp_keyStart_stop, $tp_keyStart_line, $tp_keyStart_column, $tp_keyStart_canon);
if (tok_getType() !== 16471) {
return THROW_RANGE(('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, false, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp);
}
if ($tp_keyStart_type === 16509) {
skipRex(lexerFlags);
parseExpression(lexerFlags, astProp);
if (tok_getType() !== 16510) {
return THROW_RANGE(('Missing closing square bracket for computed property name, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipAny(lexerFlags);
if (tok_getType() !== 16471) {
return THROW_RANGE(('Expected to parse an opening paren, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '`', tok_getStart(), tok_getStop());
}
return parseObjectMethod(lexerFlags, $tp_startOfProp_start, $tp_startOfProp_line, $tp_startOfProp_column, kind, true, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp);
}
THROW_RANGE(('Expected to parse an object method key, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
function parseObjectPartFromIdent(lexerFlags, $tp_propLeadingIdent_type, scoop, bindingType, exportedNames, exportedBindings, astProp) {
let $tp_propLeadingIdent_line = tok_getLine();
let $tp_propLeadingIdent_column = tok_getColumn();
let $tp_propLeadingIdent_start = tok_getStart();
let $tp_propLeadingIdent_stop = tok_getStop();
let $tp_propLeadingIdent_canon = tok_getCanoN();
skipAny(lexerFlags);
let $tp_afterIdent_type = tok_getType();
if ($tp_afterIdent_type === 16489) {
AST_setIdent(astProp, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon);
let destructible = 0;
if (((options_webCompat === true) && ($tp_propLeadingIdent_canon === '__proto__'))) {
destructible = 512;
}
return destructible | parseObjectPropertyFromColon(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, scoop, exportedNames, exportedBindings, bindingType, false, astProp);
}
if ($tp_afterIdent_type === 16471) {
AST_setIdent(astProp, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon);
return parseObjectMethod(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', false, true, 0, 0, 0, 0, astProp);
}
if ((($tp_afterIdent_type === 16480) || ($tp_afterIdent_type === 16517))) {
return parseObjectShorthand(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp);
}
if ($tp_afterIdent_type === 49264) {
return parseObjectShorthandWithInit(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp);
}
if ($tp_propLeadingIdent_type === 2074) {
if (!allowAsyncFunctions) {
return THROW_RANGE('Async functions are not supported in the currently targeted language version', $tp_propLeadingIdent_start, tok_getStop());
}
if (tok_getNlwas() === true) {
return THROW_RANGE('Async methods are a restricted production and cannot have a newline following it', $tp_propLeadingIdent_start, tok_getStart());
}
if (tok_getType() === 82009) {
if (!allowAsyncGenerators) {
return THROW_RANGE('Async generator methods are not supported in the currently targeted language version', $tp_propLeadingIdent_start, tok_getStop());
}
skipAny(lexerFlags);
return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', true, 2074, 82009, 0, 0, astProp);
}
return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'init', true, 2074, 0, 0, 0, astProp);
}
if ($tp_propLeadingIdent_type === 2096) {
return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'get', false, 0, 0, 2096, 0, astProp);
}
if ($tp_propLeadingIdent_type === 2112) {
return parseObjectMethodFromKey(lexerFlags, $tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, 'set', false, 0, 0, 0, 2112, astProp);
}
if ($tp_propLeadingIdent_type === 2113) {
return THROW_RANGE('Object members can not be "static"', $tp_propLeadingIdent_start, tok_getStop());
}
return THROW_RANGE(((('Unexpected token `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` after start of property `') + $tp_propLeadingIdent_canon) + '` while trying to parse an object property/method', $tp_propLeadingIdent_start, tok_getStop());
}
function parseObjectPropertyFromColon(lexerFlags, $tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column, scoop, exportedNames, exportedBindings, bindingType, isComputed, astProp) {
skipRex(lexerFlags);
if (babelCompat) {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:undefined, method:false, computed:isComputed, value:undefined, shorthand:false}, 'key');
} else {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:undefined, kind:'init', method:false, computed:isComputed, value:undefined, shorthand:false}, 'key');
}
let destructible = _parseObjectPropertyFromColon(lexerFlags, scoop, exportedNames, exportedBindings, bindingType);
AST_close($tp_startOfKey_start, $tp_startOfKey_line, $tp_startOfKey_column);
return destructible;
}
function _parseObjectPropertyFromColon(lexerFlags, scoop, exportedNames, exportedBindings, bindingType) {
if (isIdentToken(tok_getType())) {
return parseObjectPropertyValueFromIdent(lexerFlags, scoop, exportedNames, exportedBindings, bindingType);
}
let $tp_start_line = tok_getLine();
let $tp_start_column = tok_getColumn();
let $tp_start_start = tok_getStart();
let $tp_start_stop = tok_getStop();
if (tok_getType() === 16513) {
let destructible = parseObjectOuter(lexerFlags, scoop, bindingType, true, exportedNames, exportedBindings, 'value');
let objAssignable = ((destructible & 1)? 16 : 32);
if (((tok_getType() === 16480) || (tok_getType() === 16517))) {
return destructible;
}
if (4 & destructible) {
return THROW_RANGE(('Object pattern contained parts cause it not to be valid as a regular object literal so the next token `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` is illegal', tok_getStart(), tok_getStop());
}
let exprAssignable = parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, objAssignable, 4, false, 'value');
let wasAssignment = tok_getType() === 49264;
exprAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, exprAssignable, 'value');
if ((wasAssignment || isAssignable(exprAssignable))) {
return copyPiggies(2, exprAssignable);
}
return copyPiggies(1, exprAssignable);
}
if (tok_getType() === 16509) {
let destructible = parseArrayOuter(lexerFlags, scoop, bindingType, true, exportedNames, exportedBindings, 'value');
let objAssignable = ((destructible & 1)? 16 : 32);
if (((tok_getType() === 16480) || (tok_getType() === 16517))) {
return destructible;
}
if (4 & destructible) {
return THROW_RANGE(('Object pattern contained parts cause it not to be valid as a regular object literal so the next token `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` is illegal', tok_getStart(), tok_getStop());
}
let exprAssignable = parseValueTail(lexerFlags, $tp_start_start, $tp_start_line, $tp_start_column, objAssignable, 4, false, 'value');
let wasAssignment = tok_getType() === 49264;
exprAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, exprAssignable, 'value');
if ((wasAssignment || isAssignable(exprAssignable))) {
return copyPiggies(2, exprAssignable);
}
return copyPiggies(1, exprAssignable);
}
let valueAssignable = parseValue(lexerFlags, true, 4, false, 'value');
let wasAssignment = tok_getType() === 49264;
valueAssignable = parseExpressionFromOp(lexerFlags, $tp_start_start, $tp_start_stop, $tp_start_line, $tp_start_column, valueAssignable, 'value');
if ((wasAssignment || isAssignable(valueAssignable))) {
return copyPiggies(2, valueAssignable);
}
return copyPiggies(1, valueAssignable);
}
function parseObjectPropertyValueFromIdent(lexerFlags, scoop, exportedNames, exportedBindings, bindingType) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, false);
let $tp_afterExpr_type = tok_getType();
if ((($tp_afterExpr_type === 16480) || ($tp_afterExpr_type === 16517))) {
let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
if (assignableOrErrorMsg.length !== 0) {
let valueAssignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, true, 'value');
return copyPiggies(1, valueAssignable);
}
AST_setIdent('value', $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
addBindingToExports(exportedBindings, $tp_ident_canon);
return 0;
}
if ($tp_afterExpr_type === 49264) {
let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
if (assignableOrErrorMsg.length !== 0) {
return THROW_RANGE('The lhs was not assignable so this is an error', $tp_ident_start, tok_getStop());
}
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
addBindingToExports(exportedBindings, $tp_ident_canon);
AST_setIdent('value', $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon);
let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, 32, 'value');
return copyPiggies(0, rhsAssignable);
}
let valueAssignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, true, 'value');
if (notAssignable(valueAssignable)) {
let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, valueAssignable, 'value');
return copyPiggies(1, rhsAssignable);
}
let wasAssign = tok_getType() === 49264;
let rhsAssignable = parseExpressionFromOp(lexerFlags, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, valueAssignable, 'value');
if ((wasAssign || isAssignable(rhsAssignable))) {
return copyPiggies(2, rhsAssignable);
}
return copyPiggies(1, rhsAssignable);
}
function parseObjectShorthand(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp) {
let report = nonFatalBindingIdentCheck($tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType, lexerFlags);
if (((((report.length > 0) && ($tp_propLeadingIdent_type !== 2088))) && ($tp_propLeadingIdent_type !== 2072))) {
return THROW_RANGE(report, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop);
}
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType);
addNameToExports(exportedNames, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon);
addBindingToExports(exportedBindings, $tp_propLeadingIdent_canon);
if (babelCompat) {
AST_open(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), method:false, computed:false, value:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), shorthand:true, extra:{shorthand:true}});
} else {
AST_open(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), kind:'init', method:false, computed:false, value:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), shorthand:true});
}
AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column);
if ($tp_propLeadingIdent_type === 2075) {
return 64;
}
return ((report.length > 0)? 1 : 0);
}
function parseObjectShorthandWithInit(lexerFlags, $tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon, bindingType, scoop, exportedNames, exportedBindings, astProp) {
fatalBindingIdentCheck($tp_propLeadingIdent_type, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType, lexerFlags);
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon, bindingType);
addNameToExports(exportedNames, $tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_canon);
addBindingToExports(exportedBindings, $tp_propLeadingIdent_canon);
if (babelCompat) {
AST_open(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), method:false, computed:false, value:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), shorthand:true, extra:{shorthand:true}});
} else {
AST_open(astProp, {type:NODE_NAME_PROPERTY, loc:undefined, key:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), kind:'init', method:false, computed:false, value:AST_getIdentNode($tp_propLeadingIdent_start, $tp_propLeadingIdent_stop, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column, $tp_propLeadingIdent_canon), shorthand:true});
}
AST_wrapClosedCustom('value', {type:'AssignmentExpression', loc:undefined, left:undefined, operator:'=', right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
let nowAssignable = parseExpression(lexerFlags, 'right');
AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column);
AST_close($tp_propLeadingIdent_start, $tp_propLeadingIdent_line, $tp_propLeadingIdent_column);
if ($tp_propLeadingIdent_type === 2075) {
return copyPiggies(68, nowAssignable);
}
return copyPiggies(4, nowAssignable);
}
function parseObjectPartFromLiteral(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp) {
let $tp_lit_type = tok_getType();
let $tp_lit_line = tok_getLine();
let $tp_lit_column = tok_getColumn();
let $tp_lit_start = tok_getStart();
let $tp_lit_stop = tok_getStop();
let $tp_lit_canon = tok_getCanoN();
skipToColonParenOpen(lexerFlags);
AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);
if (tok_getType() === 16489) {
let destructible_forPiggies = 0;
if (((options_webCompat === true) && ($tp_lit_canon === '__proto__'))) {
destructible_forPiggies |= 512;
}
return destructible_forPiggies | parseObjectPropertyFromColon(lexerFlags, $tp_lit_start, $tp_lit_line, $tp_lit_column, scoop, exportedNames, exportedBindings, bindingType, false, astProp);
}
if (tok_getType() !== 16471) {
return THROW_RANGE('Object literal keys that are strings or numbers must be a method or have a colon', tok_getStart(), tok_getStop());
}
return parseObjectMethod(lexerFlags, $tp_lit_start, $tp_lit_line, $tp_lit_column, 'init', false, true, 0, 0, 0, 0, astProp);
}
function parseObjectPartFromComputed(lexerFlags, scoop, exportedNames, exportedBindings, bindingType, astProp) {
let $tp_keyStart_line = tok_getLine();
let $tp_keyStart_column = tok_getColumn();
let $tp_keyStart_start = tok_getStart();
skipToExpressionStart(lexerFlags);
let assignable_forPiggies = parseExpression(lexerFlags, astProp);
if (tok_getType() !== 16510) {
if (tok_getType() === 16480) {
return THROW_RANGE('The expression of a computed property key can not be a comma expression', tok_getStart(), tok_getStop());
}
return THROW_RANGE(('Missing closing square bracket for computed property name, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToColonParenOpen(lexerFlags);
let $tp_afterKey_type = tok_getType();
if ($tp_afterKey_type === 16489) {
let assignable = parseObjectPropertyFromColon(lexerFlags, $tp_keyStart_start, $tp_keyStart_line, $tp_keyStart_column, scoop, exportedNames, exportedBindings, bindingType, true, astProp);
return copyPiggies(assignable, assignable_forPiggies);
}
if ($tp_afterKey_type === 16471) {
let assignable = parseObjectMethod(lexerFlags, $tp_keyStart_start, $tp_keyStart_line, $tp_keyStart_column, 'init', true, true, 0, 0, 0, 0, astProp);
return copyPiggies(assignable, assignable_forPiggies);
}
THROW_RANGE(('Object literal; computed property must be followed by a colon (property) paren (method), found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + `' instead'`, tok_getStart(), tok_getStop());
}
function parseObjectRestSpread(lexerFlags, scoop, bindingType, exportedNames, exportedBindings, astProp) {
if (((targetEsVersion < 9) && (targetEsVersion !== Infinity))) {
return THROW_RANGE('Object spread/rest requires the requested version to be ES9+', tok_getStart(), tok_getStop());
}
return parseArrowableSpreadOrRest(lexerFlags, scoop, 16517, bindingType, 0, exportedNames, exportedBindings, astProp);
}
function parseObjectMethod(lexerFlags, $tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, kind, isComputed, isRealMethod, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, astProp) {
if (babelCompat) {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_METHOD_OBJECT, loc:undefined, key:undefined, method:isRealMethod, generator:undefined, async:undefined, id:undefined, params:[], kind:((kind === 'init')? 'method' : kind), computed:isComputed, body:undefined}, 'key');
} else {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_METHOD_OBJECT, loc:undefined, key:undefined, kind:kind, method:isRealMethod, computed:isComputed, value:undefined, shorthand:false}, 'key');
}
if (acornCompat) {
let $tp_paren_line = tok_getLine();
let $tp_paren_column = tok_getColumn();
let $tp_paren_start = tok_getStart();
parseFunctionAfterKeyword(lexerFlags, null, false, false, true, false, true, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, $tp_paren_start, $tp_paren_line, $tp_paren_column, 1, 'value');
} else {
parseFunctionAfterKeyword(lexerFlags, null, false, false, true, false, true, $tp_async_type, $tp_star_type, $tf_getToken_type, $tf_setToken_type, $tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column, 1, 'value');
}
AST_close($tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column);
return 1;
}
function parsePatternAssignMaybe(lexerFlags, $tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column, destructible, astProp) {
verifyDestructible(destructible);
if (!isAnyAssignmentOp()) {
return destructible;
}
if (tok_getType() !== 49264) {
return THROW_RANGE('Cannot compound-assign to an array literal', tok_getStart(), tok_getStop());
}
if ((destructible & 1) === 1) {
return THROW_RANGE('Tried to destructure something that is not destructible', tok_getStart(), tok_getStop());
}
destructible = (destructible | 4) ^ 4;
AST_destruct(astProp);
AST_wrapClosedCustom(astProp, {type:'AssignmentExpression', loc:undefined, left:undefined, operator:'=', right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
destructible |= parseExpression(lexerFlags, 'right');
AST_close($tp_patternStart_start, $tp_patternStart_line, $tp_patternStart_column);
return destructible;
}
function parseClassDeclaration(lexerFlags, scoop, optionalIdent, isLabelled, fdState, astProp) {
let originalOuterLexerFlags = lexerFlags;
let $tp_class_line = tok_getLine();
let $tp_class_column = tok_getColumn();
let $tp_class_start = tok_getStart();
let $tp_class_stop = tok_getStop();
if (((((isLabelled === true) || (fdState === 1))) || (fdState === 2))) {
return THROW_RANGE('Cannot parse a class declaration here, only expecting statements here', $tp_class_start, $tp_class_stop);
}
lexerFlags = ((lexerFlags | 8192) | 6176) ^ 6176;
skipToIdentCurlyOpen(lexerFlags);
AST_open(astProp, {type:'ClassDeclaration', loc:undefined, id:undefined, superClass:undefined, body:undefined});
let $tp_name_canon = parseClassId(lexerFlags, optionalIdent, scoop);
_parseClass(lexerFlags, originalOuterLexerFlags, 2);
AST_close($tp_class_start, $tp_class_line, $tp_class_column);
return $tp_name_canon;
}
function parseClassExpression(lexerFlags, $tp_class_start, $tp_class_line, $tp_class_column, astProp) {
let originalOuterLexerFlags = lexerFlags;
lexerFlags = ((lexerFlags | 8192) | 6176) ^ 6176;
AST_open(astProp, {type:'ClassExpression', loc:undefined, id:undefined, superClass:undefined, body:undefined});
parseClassId(lexerFlags, true, null);
let assignable = _parseClass(lexerFlags, originalOuterLexerFlags, 1);
AST_close($tp_class_start, $tp_class_line, $tp_class_column);
return setNotAssignable(assignable);
}
function parseClassId(lexerFlags, optionalIdent, scoop) {
let $tp_bindingName_canon = '';
if ((isIdentToken(tok_getType()) && (tok_getType() !== 2090))) {
let $tp_className_type = tok_getType();
let $tp_className_start = tok_getStart();
let $tp_className_stop = tok_getStop();
let $tp_className_canon = tok_getCanoN();
fatalBindingIdentCheck($tp_className_type, $tp_className_start, $tp_className_stop, $tp_className_canon, BINDING_TYPE_CLASS, lexerFlags);
$tp_bindingName_canon = $tp_className_canon;
SCOPE_addLexBinding(scoop, $tp_className_start, $tp_className_stop, $tp_bindingName_canon, BINDING_TYPE_CLASS, 1);
let $tp_id_line = tok_getLine();
let $tp_id_column = tok_getColumn();
let $tp_id_start = tok_getStart();
let $tp_id_stop = tok_getStop();
let $tp_id_canon = tok_getCanoN();
skipToIdentCurlyOpen(lexerFlags);
AST_setIdent('id', $tp_id_start, $tp_id_stop, $tp_id_line, $tp_id_column, $tp_id_canon);
} else if (optionalIdent === false) {
return THROW_RANGE('Class decl missing required ident, `extends` is not a valid variable name', tok_getStart(), tok_getStop());
} else {
AST_set('id', null);
}
return $tp_bindingName_canon;
}
function _parseClass(outerLexerFlags, originalOuterLexerFlags, isExpression) {
let assignable = 8;
let innerLexerFlags = (outerLexerFlags | 16) ^ 16;
if ((isIdentToken(tok_getType()) && (tok_getType() === 2090))) {
skipToExpressionStart(outerLexerFlags);
assignable = parseValue(outerLexerFlags, false, 4, true, 'superClass');
innerLexerFlags |= 16384;
} else {
AST_set('superClass', null);
innerLexerFlags = (innerLexerFlags | 16384) ^ 16384;
}
if (tok_getType() !== 16513) {
return THROW_RANGE(('Expected the opening curly `{` of a class body, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
innerLexerFlags |= 32768;
assignable |= parseClassBody(innerLexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, 'body');
return assignable;
}
function parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, astProp) {
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
AST_open(astProp, {type:'ClassBody', loc:undefined, body:[]});
let assignable = _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, 'body');
AST_close($tp_curly_start, $tp_curly_line, $tp_curly_column);
return assignable;
}
function _parseClassBody(lexerFlags, outerLexerFlags, originalOuterLexerFlags, isExpression, astProp) {
let destructibleForPiggies = 1;
skipAny(lexerFlags);
while (tok_getType() === 16490) {
skipAny(lexerFlags);
}
let hasConstructor = false;
while (tok_getType() !== 16517) {
let $tp_memberStart_start = tok_getStart();
let $tp_memberStart_stop = tok_getStop();
let destructNow = parseClassMethod(lexerFlags, outerLexerFlags, astProp);
if ((destructNow & 256) !== 0) {
if (hasConstructor) {
return THROW_RANGE('Classes may only have one constructor', $tp_memberStart_start, $tp_memberStart_stop);
}
hasConstructor = true;
destructNow = (destructNow | 256) ^ 256;
}
destructibleForPiggies |= destructNow;
while (tok_getType() === 16490) {
skipAny(lexerFlags);
}
}
if (isExpression === 1) {
skipDiv(originalOuterLexerFlags);
} else {
skipToStatementStart(originalOuterLexerFlags);
}
return destructibleForPiggies;
}
function parseClassMethod(lexerFlags, outerLexerFlags, astProp) {
let $tp_methodStart_line = tok_getLine();
let $tp_methodStart_column = tok_getColumn();
let $tp_methodStart_start = tok_getStart();
let isStatic = false;
if (tok_getType() === 2113) {
isStatic = true;
let $tp_static_line = tok_getLine();
let $tp_static_column = tok_getColumn();
let $tp_static_start = tok_getStart();
let $tp_static_stop = tok_getStop();
let $tp_static_canon = tok_getCanoN();
skipAny(lexerFlags);
if (tok_getType() === 16471) {
return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, false, 0, 0, 0, 0, $tp_static_start, $tp_static_stop, $tp_static_line, $tp_static_column, $tp_static_canon, astProp);
}
}
let $tp_afterStaticMaybe_type = tok_getType();
if (isIdentToken($tp_afterStaticMaybe_type)) {
return parseClassMethodFromIdent(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, astProp);
}
if (isNumberStringToken($tp_afterStaticMaybe_type)) {
return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 0, 0, 0, astProp);
}
if ($tp_afterStaticMaybe_type === 16509) {
return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 0, 0, 0, astProp);
}
if ($tp_afterStaticMaybe_type === 82009) {
skipToIdentStringNumberSquareOpen(lexerFlags);
if (isIdentToken(tok_getType())) {
return parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 82009, 0, 0, astProp);
}
if (isNumberStringToken(tok_getType())) {
return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 82009, 0, 0, astProp);
}
if (tok_getType() === 16509) {
return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 82009, 0, 0, astProp);
}
return THROW_RANGE('Invalid objlit key character after generator star', $tp_methodStart_line, tok_getStop());
}
return THROW_RANGE('Unexpected token, wanted to parse a start of a property in an class literal/pattern', $tp_methodStart_line, tok_getStop());
}
function parseClassMethodFromIdent(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, astProp) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipAny(lexerFlags);
if (tok_getType() === 16471) {
return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, 0, 0, 0, 0, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, astProp);
}
let $tp_async_type = 0;
let $tp_star_type = 0;
let $tp_get_type = 0;
let $tp_set_type = 0;
switch ($tp_ident_type) {
case 2096:
$tp_get_type = 2096;
break;
case 2112:
$tp_set_type = 2112;
break;
case 2074:
if (!allowAsyncFunctions) {
return THROW_RANGE('Async methods are not supported in the currently targeted language version', $tp_methodStart_start, tok_getStop());
}
if (tok_getNlwas() === true) {
return THROW_RANGE('Async methods are a restricted production and cannot have a newline following it', $tp_methodStart_line, tok_getStart());
}
$tp_async_type = 2074;
if (tok_getType() === 82009) {
if (!allowAsyncGenerators) {
return THROW_RANGE('Async generator methods are not supported in the currently targeted language version', $tp_methodStart_start, tok_getStop());
}
$tp_star_type = 82009;
skipToIdentStringNumberSquareOpen(lexerFlags);
}
break;
default:
return THROW_RANGE('Either the current modifier is unknown or the input that followed was unexpected', tok_getStart(), tok_getStop());
}
if (tok_getType() === 16509) {
return parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
}
if (isNumberStringToken(tok_getType())) {
return parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
}
if (isIdentToken(tok_getType())) {
return parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
}
return THROW_RANGE('Expected to parse the modified key of a class method but could not parse one', tok_getStart(), tok_getStop());
}
function parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
let $tp_key_line = tok_getLine();
let $tp_key_column = tok_getColumn();
let $tp_key_start = tok_getStart();
let $tp_key_stop = tok_getStop();
let $tp_key_canon = tok_getCanoN();
skipToParenOpenOrDie(lexerFlags);
return _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon, astProp);
}
function _parseClassMethodIdentKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon, astProp) {
AST_setIdent(astProp, $tp_key_start, $tp_key_stop, $tp_key_line, $tp_key_column, $tp_key_canon);
if ((isStatic && ($tp_key_canon === 'prototype'))) {
return THROW_RANGE('Static class methods can not be called `prototype`', $tp_methodStart_line, tok_getStop());
}
let kind = 'method';
let isClassConstructor = false;
if (((!isStatic) && ($tp_key_canon === 'constructor'))) {
isClassConstructor = true;
kind = 'constructor';
if ($tp_async_type === 2074) {
return THROW_RANGE('Class constructors can not be async', $tp_methodStart_line, tok_getStop());
}
if ($tp_star_type === 82009) {
return THROW_RANGE('Class constructors can not be generators', $tp_methodStart_line, tok_getStop());
}
if ($tp_get_type === 2096) {
return THROW_RANGE('Class constructors can not be getters', $tp_methodStart_line, tok_getStop());
}
if ($tp_set_type === 2112) {
return THROW_RANGE('Class constructors can not be setters', $tp_methodStart_line, tok_getStop());
}
} else if ($tp_get_type === 2096) {
kind = 'get';
} else if ($tp_set_type === 2112) {
kind = 'set';
} else {

}
return parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, false, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
}
function parseClassMethodLiteralKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
let $tp_lit_type = tok_getType();
let $tp_lit_line = tok_getLine();
let $tp_lit_column = tok_getColumn();
let $tp_lit_start = tok_getStart();
let $tp_lit_stop = tok_getStop();
let $tp_lit_canon = tok_getCanoN();
if ((isStatic && ($tp_lit_canon === 'prototype'))) {
return THROW_RANGE('Static class methods can not be called `prototype`', $tp_methodStart_line, tok_getStop());
}
let kind = 'method';
let isClassConstructor = false;
if (((!isStatic) && ($tp_lit_canon === 'constructor'))) {
isClassConstructor = true;
kind = 'constructor';
if ($tp_async_type === 2074) {
return THROW_RANGE('Class constructors can not be async', $tp_methodStart_line, tok_getStop());
}
if ($tp_star_type === 82009) {
return THROW_RANGE('Class constructors can not be generators', $tp_methodStart_line, tok_getStop());
}
if ($tp_get_type === 2096) {
return THROW_RANGE('Class constructors can not be getters', $tp_methodStart_line, tok_getStop());
}
if ($tp_set_type === 2112) {
return THROW_RANGE('Class constructors can not be setters', $tp_methodStart_line, tok_getStop());
}
} else if ($tp_get_type === 2096) {
kind = 'get';
} else if ($tp_set_type === 2112) {
kind = 'set';
} else {

}
skipToParenOpenOrDie(lexerFlags);
AST_setLiteral(astProp, $tp_lit_type, $tp_lit_start, $tp_lit_stop, $tp_lit_line, $tp_lit_column, $tp_lit_canon);
return parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, false, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
}
function parseClassMethodComputedKey(lexerFlags, outerLexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
skipToExpressionStart(lexerFlags);
let assignable_forPiggies = parseExpression(outerLexerFlags, astProp);
if (tok_getType() !== 16510) {
return THROW_RANGE(('Missing right square bracket for computed member, found `' + tok_sliceInput(tok_getStart(), tok_getStop())) + '` instead', tok_getStart(), tok_getStop());
}
skipToParenOpenOrDie(lexerFlags);
let kind = 'method';
if ($tp_get_type === 2096) {
kind = 'get';
} else if ($tp_set_type === 2112) {
kind = 'set';
} else {

}
parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, false, true, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp);
return assignable_forPiggies;
}
function parseClassMethodAfterKey(lexerFlags, $tp_methodStart_line, $tp_methodStart_column, $tp_methodStart_start, kind, isClassConstructor, isComputedKey, isStatic, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, astProp) {
let $tp_paren_line = tok_getLine();
let $tp_paren_column = tok_getColumn();
let $tp_paren_start = tok_getStart();
if (babelCompat) {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_METHOD_CLASS, loc:undefined, key:undefined, static:isStatic, computed:isComputedKey, async:undefined, generator:undefined, id:undefined, params:[], kind:kind}, 'key');
} else {
AST_wrapClosedCustom(astProp, {type:NODE_NAME_METHOD_CLASS, loc:undefined, key:undefined, static:isStatic, computed:isComputedKey, kind:kind, value:undefined}, 'key');
}
parseFunctionAfterKeyword(lexerFlags, null, false, false, true, isClassConstructor, true, $tp_async_type, $tp_star_type, $tp_get_type, $tp_set_type, (acornCompat? $tp_paren_start : $tp_methodStart_start), (acornCompat? $tp_paren_line : $tp_methodStart_line), (acornCompat? $tp_paren_column : $tp_methodStart_column), 1, 'value');
AST_close($tp_methodStart_start, $tp_methodStart_line, $tp_methodStart_column);
if (isClassConstructor === true) {
return 256;
}
return 1;
}
function verifyDestructible(destructible) {
if ((((destructible & 1) === 1) && ((destructible & 4) === 4))) {
return THROW_RANGE('Found a part that cant destruct and a part that must destruct so it is not destructible', tok_getStart(), tok_getStop());
}
}
function verifyDestructibleForBinding(destructible, bindingType) {
if ((destructible & 1) !== 0) {
return THROW_RANGE('The binding pattern is not destructible', tok_getStart(), tok_getStop());
}
if (((bindingType !== BINDING_TYPE_NONE) && ((destructible & 2) !== 0))) {
return THROW_RANGE('This binding can not be used in function parameters because it is not destructible', tok_getStart(), tok_getStop());
}
}
function parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, destructible, closingPuncType, astProp) {
if (((tok_getType() === 16480) || (tok_getType() === closingPuncType))) {
if (notAssignable(assignable)) destructible |= 1;
} else if ((destructible & 4) === 4) {
return THROW_RANGE('Found something that had to be a Pattern but had to parse more, which is an error', $tp_valueStart_start, tok_getStart());
} else {
assignable = parseValueTail(lexerFlags, $tp_valueStart_start, $tp_valueStart_line, $tp_valueStart_column, assignable, 4, false, astProp);
if (isAssignable(assignable)) {
destructible = (destructible | 7) ^ 7;
} else {
destructible |= 1;
}
let firstOpNotAssign = tok_getType() !== 49264;
if (((tok_getType() !== 16480) && (tok_getType() !== closingPuncType))) {
assignable |= parseExpressionFromOp(lexerFlags, $tp_valueStart_start, $tp_valueStart_stop, $tp_valueStart_line, $tp_valueStart_column, assignable, astProp);
if (firstOpNotAssign) {
destructible |= 1;
} else {

}
} else if (firstOpNotAssign) {
if (notAssignable(assignable)) {
destructible |= 1;
} else {
destructible |= 2;
}
}
}
return copyPiggies(destructible, assignable);
}
function parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, exportedNames, exportedBindings, astProp) {
let $tp_spread_line = tok_getLine();
let $tp_spread_column = tok_getColumn();
let $tp_spread_start = tok_getStart();
skipToExpressionStart(lexerFlags);
if (tok_getType() === 16486) {
return THROW_RANGE('Can not rest twice', $tp_spread_start, tok_getStop());
}
AST_open(astProp, {type:'SpreadElement', loc:undefined, argument:undefined});
let destructible = _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, $tp_spread_start, exportedNames, exportedBindings, 'argument');
AST_close($tp_spread_start, $tp_spread_line, $tp_spread_column);
if (((tok_getType() !== closingPuncType) && (tok_getType() !== 16480))) {
return THROW_RANGE('Encountered invalid input after spread/rest argument', tok_getStart(), tok_getStop());
}
return destructible;
}
function _parseArrowableSpreadOrRest(lexerFlags, scoop, closingPuncType, bindingType, $tp_async_type, $tt_spreadToken_start, exportedNames, exportedBindings, astProp) {
let $tp_argStart_line = tok_getLine();
let $tp_argStart_column = tok_getColumn();
let $tp_argStart_start = tok_getStart();
let $tp_argStart_stop = tok_getStop();
let destructible = 0;
let assignable = 32;
if (isIdentToken(tok_getType())) {
let $tp_ident_type = tok_getType();
let $tp_ident_line = tok_getLine();
let $tp_ident_column = tok_getColumn();
let $tp_ident_start = tok_getStart();
let $tp_ident_stop = tok_getStop();
let $tp_ident_canon = tok_getCanoN();
skipIdentSafeSlowAndExpensive(lexerFlags, false);
let assignBefore = tok_getType() === 49264;
let willBeSimple = ((((tok_getType() === closingPuncType) || (tok_getType() === 16480))) || assignBefore);
if (willBeSimple) {
let assignableOrErrorMsg = nonFatalBindingIdentCheck($tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType, lexerFlags);
if (assignableOrErrorMsg.length !== 0) {
destructible |= 1;
}
} else {
destructible |= 2;
}
assignable = parseValueAfterIdent(lexerFlags, $tp_ident_type, $tp_ident_start, $tp_ident_stop, $tp_ident_line, $tp_ident_column, $tp_ident_canon, bindingType, true, astProp);
if (((tok_getType() !== 16480) && (tok_getType() !== closingPuncType))) {
if (tok_getType() === 49264) {
if (notAssignable(assignable)) {
return THROW_RANGE('Tried to assign to a value that was not assignable in arr/obj lit/patt', tok_getStart(), tok_getStop());
}
}
destructible |= 1;
assignable = parseExpressionFromOp(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, astProp);
}
if (notAssignable(assignable)) {
destructible |= 1;
} else if (willBeSimple) {
SCOPE_actuallyAddBinding(lexerFlags, scoop, $tp_ident_start, $tp_ident_stop, $tp_ident_canon, bindingType);
addNameToExports(exportedNames, $tp_ident_start, $tp_ident_stop, $tp_ident_canon);
addBindingToExports(exportedBindings, $tp_ident_canon);
} else {
destructible |= 2;
}
} else if (tok_getType() === 16509) {
let nowDestruct = parseArrayLiteralPattern(lexerFlags, scoop, bindingType, false, exportedNames, exportedBindings, astProp);
if (((((tok_getType() !== 49264) && (tok_getType() !== closingPuncType))) && (tok_getType() !== 16480))) {
destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, nowDestruct, closingPuncType, astProp);
} else {
if (((closingPuncType === 16517) && (tok_getType() !== 49264))) {
destructible |= nowDestruct | 1;
} else {
destructible |= nowDestruct;
}
}
assignable = (((destructible & 1) === 1)? 16 : 32);
if (((closingPuncType === 16517) && notAssignable(assignable))) {
destructible |= 1;
}
} else if (tok_getType() === 16513) {
let $tp_curly_line = tok_getLine();
let $tp_curly_column = tok_getColumn();
let $tp_curly_start = tok_getStart();
let $tp_curly_stop = tok_getStop();
let nowDestruct = parseObjectAndAssign(lexerFlags, scoop, bindingType, false, exportedNames, exportedBindings, astProp);
if (((((tok_getType() !== 49264) && (tok_getType() !== closingPuncType))) && (tok_getType() !== 16480))) {
destructible = parseOptionalDestructibleRestOfExpression(lexerFlags, $tp_curly_start, $tp_curly_stop, $tp_curly_line, $tp_curly_column, assignable, nowDestruct, closingPuncType, astProp);
} else {
destructible |= nowDestruct;
if (((closingPuncType === 16517) && (tok_getType() !== 49264))) {
destructible |= 1;
}
}
assignable = (((destructible & 1) === 1)? 16 : 32);
if (((closingPuncType === 16517) && notAssignable(assignable))) {
destructible |= 1;
}
} else if (tok_getType() === closingPuncType) {
return THROW_RANGE('The rest/spread operator is missing an argument', $tt_spreadToken_start, tok_getStop());
} else {
destructible |= 2;
let $tp_exprStart_line = tok_getLine();
let $tp_exprStart_column = tok_getColumn();
let $tp_exprStart_start = tok_getStart();
let $tp_exprStart_stop = tok_getStop();
let nowAssignable = parseValue(lexerFlags, true, 4, false, astProp);
if (notAssignable(nowAssignable)) {
destructible = 1;
}
assignable = mergeAssignable(nowAssignable, assignable);
if (((((tok_getType() === 49264) && (tok_getType() !== closingPuncType))) && (tok_getType() !== 16480))) {
if (notAssignable(assignable)) {
return THROW_RANGE('This `...` arg is invalid; rest only accepts idents, arrays, and objects and as spread the assignment is illegal because the lhs is not assignable', $tt_spreadToken_start, tok_getStop());
}
assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
destructible |= 1;
} else {
if (tok_getType() === 16480) {
destructible |= 1;
} else if (tok_getType() !== closingPuncType) {
assignable = parseExpressionFromOp(lexerFlags, $tp_exprStart_start, $tp_exprStart_stop, $tp_exprStart_line, $tp_exprStart_column, assignable, astProp);
} else {

}
if (isAssignable(assignable)) {
destructible |= 2;
} else {
destructible |= 1;
}
}
if (((closingPuncType === 16517) && (!isAssignable(assignable)))) destructible |= 1;
return copyPiggies(destructible, assignable);
}
if (tok_getType() !== closingPuncType) {
if (bindingType === BINDING_TYPE_ARG) {
if ($tp_async_type === 2074) {
destructible |= 1;
} else {
destructible |= 2;
}
}
if (tok_getType() === 49264) {
verifyDestructible(destructible | 4);
destructible = 1;
AST_destruct(astProp);
AST_wrapClosedCustom(astProp, {type:'AssignmentExpression', loc:undefined, left:undefined, operator:'=', right:undefined}, 'left');
skipToExpressionStart(lexerFlags);
let nowAssignable = parseExpression(lexerFlags, 'right');
assignable = mergeAssignable(nowAssignable, assignable);
AST_close($tp_argStart_start, $tp_argStart_line, $tp_argStart_column);
} else {
assignable = parseValueTail(lexerFlags, $tp_argStart_start, $tp_argStart_line, $tp_argStart_column, assignable, 4, false, astProp);
assignable = parseExpressionFromOp(lexerFlags, $tp_argStart_start, $tp_argStart_stop, $tp_argStart_line, $tp_argStart_column, assignable, astProp);
}
destructible |= 1;
}
return copyPiggies(destructible, assignable);
}
let initialLexerFlags = ((260 | ((((options_strictMode || (goalMode === true)))? 8192 : 0))) | 4) ^ 4;
initLexer(initialLexerFlags);
parseTopLevels(initialLexerFlags);
if (tok_getType() !== 2097173) {
return THROW_RANGE('Unexpected further input', tok_getStart(), tok_getStop());
}
_tree.loc = AST_getCloseLoc(0, 1, 0, tok_prevEndPointer(), tok_getLine(), tok_getColumn());
return {ast:_tree, tokens:tok.tokens, tokenCountSolid:tok.getTokenCountSolid(), tokenCountAny:tok.getTokenCountAny()};
}
function isTemplateStart(type) {
return ((((((type === 524308) || (type === 524305))) || (type === 1572884))) || (type === 1572881));
}
function D(d) {
if (d === 0) {
return 'D=MIGHT_DESTRUCT';
}
let arr = [];
if (d & 1) {
arr.push('CANT_DESTRUCT');
d ^= 1;
}
if (d & 4) {
arr.push('MUST_DESTRUCT');
d ^= 4;
}
if (d & 2) {
arr.push('DESTRUCT_ASSIGN_ONLY');
d ^= 2;
}
if (d & 8) {
arr.push('(ASSIGNABLE_UNDETERMINED)');
d ^= 8;
}
if (d & 16) {
arr.push('(NOT_ASSIGNABLE)');
d ^= 16;
}
if (d & 32) {
arr.push('(IS_ASSIGNABLE)');
d ^= 32;
}
d = P(d, arr);
if (d !== 0) {
console.log('Gathered flags so far:', arr.join(', '));
}
return 'D=' + arr.join(', ');
}
function A(a) {
if (a === 0) {
return 'A=ASSIGNABLE_UNDETERMINED';
}
let arr = [];
if (a & 8) {
arr.push('ASSIGNABLE_UNDETERMINED');
a ^= 8;
}
if (a & 16) {
arr.push('NOT_ASSIGNABLE');
a ^= 16;
}
if (a & 32) {
arr.push('IS_ASSIGNABLE');
a ^= 32;
}
if (a & 1) {
arr.push('(CANT_DESTRUCT)');
a ^= 1;
}
if (a & 4) {
arr.push('(MUST_DESTRUCT)');
a ^= 4;
}
if (a & 2) {
arr.push('(DESTRUCT_ASSIGN_ONLY)');
a ^= 2;
}
a = P(a, arr);
if (a !== 0) {
console.log('Gathered flags so far:', arr.join(', '));
}
return 'A=' + arr.join(', ');
}
function B(b) {
if (b === BINDING_TYPE_NONE) return 'B=BINDING_TYPE_NONE';
if (b === BINDING_TYPE_ARG) return 'B=BINDING_TYPE_ARG';
if (b === BINDING_TYPE_VAR) return 'B=BINDING_TYPE_VAR';
if (b === BINDING_TYPE_LET) return 'B=BINDING_TYPE_LET';
if (b === BINDING_TYPE_CONST) return 'B=BINDING_TYPE_CONST';
if (b === BINDING_TYPE_CLASS) return 'B=BINDING_TYPE_CLASS';
if (b === BINDING_TYPE_CATCH_IDENT) return 'B=BINDING_TYPE_CATCH_IDENT';
if (b === BINDING_TYPE_CATCH_OTHER) return 'B=BINDING_TYPE_CATCH_OTHER';
if (b === BINDING_TYPE_FUNC_VAR) return 'B=BINDING_TYPE_FUNC_VAR';
if (b === BINDING_TYPE_FUNC_LEX) return 'B=BINDING_TYPE_FUNC_LEX';
if (b === BINDING_TYPE_FUNC_STMT) return 'B=BINDING_TYPE_FUNC_STMT';
}
function S(s) {
if (s === SCOPE_LAYER_GLOBAL) return 'SCOPE_LAYER_GLOBAL';
if (s === SCOPE_LAYER_FOR_HEADER) return 'SCOPE_LAYER_FOR_HEADER';
if (s === SCOPE_LAYER_BLOCK) return 'SCOPE_LAYER_BLOCK';
if (s === SCOPE_LAYER_FUNC_PARAMS) return 'SCOPE_LAYER_FUNC_PARAMS';
if (s === SCOPE_LAYER_CATCH_HEAD) return 'SCOPE_LAYER_CATCH_HEAD';
if (s === SCOPE_LAYER_CATCH_BODY) return 'SCOPE_LAYER_CATCH_BODY';
if (s === SCOPE_LAYER_FINALLY) return 'SCOPE_LAYER_FINALLY';
if (s === SCOPE_LAYER_SWITCH) return 'SCOPE_LAYER_SWITCH';
if (s === SCOPE_LAYER_FUNC_ROOT) return 'SCOPE_LAYER_FUNC_ROOT';
if (s === SCOPE_LAYER_FUNC_BODY) return 'SCOPE_LAYER_FUNC_BODY';
if (s === SCOPE_LAYER_ARROW_PARAMS) return 'SCOPE_LAYER_ARROW_PARAMS';
if (s === SCOPE_LAYER_FAKE_BLOCK) return 'SCOPE_LAYER_FAKE_BLOCK';
}
function F(fdState) {
if (fdState === 1) return 'F=FDS_ILLEGAL'; else if (fdState === 2) return 'F=FDS_IFELSE'; else if (fdState === 3) return 'F=FDS_LEX'; else if (fdState === 4) return 'F=FDS_VAR'; else ;
}
// </parser>


let Tenko = Parser;


export default Tenko; // Does dual export make sense? Default and as member. To each their own, eh
export {

  Tenko,
  Lexer,

  COLLECT_TOKENS_NONE,
  COLLECT_TOKENS_SOLID,
  COLLECT_TOKENS_ALL,
  COLLECT_TOKENS_TYPES,

  GOAL_MODULE,
  GOAL_SCRIPT,

  BINDING_TYPE_NONE,
  BINDING_TYPE_ARG,
  BINDING_TYPE_VAR,
  BINDING_TYPE_LET,
  BINDING_TYPE_CONST,
  BINDING_TYPE_CLASS,
  BINDING_TYPE_FUNC_VAR,
  BINDING_TYPE_FUNC_LEX,
  BINDING_TYPE_FUNC_STMT,
  BINDING_TYPE_CATCH_IDENT,
  BINDING_TYPE_CATCH_OTHER,
  HAS_NO_BINDINGS,
  SCOPE_LAYER_GLOBAL,
  SCOPE_LAYER_FOR_HEADER,
  SCOPE_LAYER_BLOCK,
  SCOPE_LAYER_FUNC_PARAMS,
  SCOPE_LAYER_CATCH_HEAD,
  SCOPE_LAYER_CATCH_BODY,
  SCOPE_LAYER_FINALLY,
  SCOPE_LAYER_SWITCH,
  SCOPE_LAYER_FUNC_ROOT,
  SCOPE_LAYER_FUNC_BODY,
  SCOPE_LAYER_ARROW_PARAMS,
  SCOPE_LAYER_FAKE_BLOCK,

  WEB_COMPAT_OFF,
  WEB_COMPAT_ON,

  VERSION_EXPONENTIATION,
  VERSION_WHATEVER,

  isWhiteToken,
  isNewlineToken,
  isCommentToken,
  isIdentToken,
  isNumberToken,
  isBigintToken,
  isStringToken,
  isPunctuatorToken,
  isRegexToken,
  isTickToken,
  isBadTickToken,
  isNumberStringToken,
  isNumberStringRegex,

  toktypeToString,

};
