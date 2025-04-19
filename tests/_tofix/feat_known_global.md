# Preval test case

# feat_known_global.md

> Tofix > feat known global
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

## Options

- loopProtectLimit=1000

## Input

`````js filename=intro
$(typeof String($spy('String')));
$(typeof Number($spy('Number')));
$(typeof Boolean($spy('Boolean')));
$(typeof parseInt($spy('parseInt')));
$(typeof parseFloat($spy('parseFloat')));
$(typeof isNaN($spy('isNaN')));
$(typeof isFinite($spy('isFinite')));
$(typeof Array.from($spy('Array.from')));
$(typeof Array.isArray($spy('Array.isArray')));
$(typeof Array.of($spy('Array.of')));
$(typeof Date.now($spy('Date.now')));
$(typeof Date.UTC($spy('Date.UTC')));
$(typeof Date.parse($spy('Date.parse')));
$(typeof JSON.stringify($spy('JSON.stringify')));
$(typeof Math.abs($spy('Math.abs')));
$(typeof Math.acos($spy('Math.acos')));
$(typeof Math.acosh($spy('Math.acosh')));
$(typeof Math.asin($spy('Math.asin')));
$(typeof Math.asinh($spy('Math.asinh')));
$(typeof Math.atan($spy('Math.atan')));
$(typeof Math.atan2($spy('Math.atan2')));
$(typeof Math.atanh($spy('Math.atanh')));
$(typeof Math.cbrt($spy('Math.cbrt')));
$(typeof Math.ceil($spy('Math.ceil')));
$(typeof Math.clz32($spy('Math.clz32')));
$(typeof Math.cos($spy('Math.cos')));
$(typeof Math.cosh($spy('Math.cosh')));
$(typeof Math.exp($spy('Math.exp')));
$(typeof Math.expm1($spy('Math.expm1')));
$(typeof Math.floor($spy('Math.floor')));
$(typeof Math.fround($spy('Math.fround')));
$(typeof Math.hypot($spy('Math.hypot')));
$(typeof Math.imul($spy('Math.imul')));
$(typeof Math.log($spy('Math.log')));
$(typeof Math.log10($spy('Math.log10')));
$(typeof Math.log1p($spy('Math.log1p')));
$(typeof Math.log2($spy('Math.log2')));
$(typeof Math.max($spy('Math.max')));
$(typeof Math.min($spy('Math.min')));
$(typeof Math.pow($spy('Math.pow')));
$(typeof Math.random($spy('Math.random')));
$(typeof Math.round($spy('Math.round')));
$(typeof Math.sign($spy('Math.sign')));
$(typeof Math.sin($spy('Math.sin')));
$(typeof Number.isFinite($spy('Number.isFinite')));
$(typeof Number.isInteger($spy('Number.isInteger')));
$(typeof Number.isNaN($spy('Number.isNaN')));
$(typeof Number.isSafeInteger($spy('Number.isSafeInteger')));
$(typeof Number.parseFloat($spy('Number.parseFloat')));
$(typeof Number.parseInt($spy('Number.parseInt')));
$(typeof Object.is($spy('Object.is')));
$(typeof Object.isFrozen($spy('Object.isFrozen')));
$(typeof Object.isSealed($spy('Object.isSealed')));
$(typeof String.fromCharCode($spy('String.fromCharCode')));
$(typeof String.fromCodePoint($spy('String.fromCodePoint')));
$(typeof String.raw($spy('String.raw')));

$(typeof Math.E, 'Math.E');
$(typeof Math.LN10, 'Math.LN10');
$(typeof Math.LN2, 'Math.LN2');
$(typeof Math.LOG10E, 'Math.LOG10E');
$(typeof Math.LOG2E, 'Math.LOG2E');
$(typeof Math.PI, 'Math.PI');
$(typeof Math.SQRT1_2, 'Math.SQRT1_2');
$(typeof Math.SQRT2, 'Math.SQRT2');
$(typeof Number.EPSILON, 'Number.EPSILON');
$(typeof Number.MAX_VALUE, 'Number.MAX_VALUE');
$(typeof Number.MIN_VALUE, 'Number.MIN_VALUE');
$(typeof Number.NEGATIVE_INFINITY, 'Number.NEGATIVE_INFINITY');
$(typeof Number.POSITIVE_INFINITY, 'Number.POSITIVE_INFINITY');
$(typeof Number.NaN, 'Number.NaN');
`````


## Settled


`````js filename=intro
const tmpStringFirstArg /*:unknown*/ = $spy(`String`);
$coerce(tmpStringFirstArg, `string`);
$(`string`);
const tmpNumberFirstArg /*:unknown*/ = $spy(`Number`);
$coerce(tmpNumberFirstArg, `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
const tmpCalleeParam$9 /*:unknown*/ = $spy(`parseInt`);
$coerce(tmpCalleeParam$9, `string`);
$(`number`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$13, `string`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`isNaN`);
$coerce(tmpCalleeParam$17, `number`);
$(`boolean`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`isFinite`);
$coerce(tmpCalleeParam$21, `number`);
$(`boolean`);
const tmpMCP /*:unknown*/ = $spy(`Array.from`);
$Array_from(tmpMCP);
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
const tmpMCP$7 /*:unknown*/ = $spy(`Date.UTC`);
$coerce(tmpMCP$7, `number`);
$(`number`);
const tmpMCP$9 /*:unknown*/ = $spy(`Date.parse`);
$coerce(tmpMCP$9, `string`);
$(`number`);
const tmpMCP$11 /*:unknown*/ = $spy(`JSON.stringify`);
const tmpUnaryArg$25 /*:primitive*/ = $dotCall($JSON_stringify, JSON, `stringify`, tmpMCP$11);
const tmpCalleeParam$35 /*:string*/ = typeof tmpUnaryArg$25;
$(tmpCalleeParam$35);
const tmpMCP$13 /*:unknown*/ = $spy(`Math.abs`);
$coerce(tmpMCP$13, `number`);
$(`number`);
const tmpMCP$15 /*:unknown*/ = $spy(`Math.acos`);
$coerce(tmpMCP$15, `number`);
$(`number`);
const tmpMCP$17 /*:unknown*/ = $spy(`Math.acosh`);
$coerce(tmpMCP$17, `number`);
$(`number`);
const tmpMCP$19 /*:unknown*/ = $spy(`Math.asin`);
$coerce(tmpMCP$19, `number`);
$(`number`);
const tmpMCP$21 /*:unknown*/ = $spy(`Math.asinh`);
$coerce(tmpMCP$21, `number`);
$(`number`);
const tmpMCP$23 /*:unknown*/ = $spy(`Math.atan`);
$coerce(tmpMCP$23, `number`);
$(`number`);
const tmpMCP$25 /*:unknown*/ = $spy(`Math.atan2`);
$coerce(tmpMCP$25, `number`);
$(`number`);
const tmpMCP$27 /*:unknown*/ = $spy(`Math.atanh`);
$coerce(tmpMCP$27, `number`);
$(`number`);
const tmpMCP$29 /*:unknown*/ = $spy(`Math.cbrt`);
$coerce(tmpMCP$29, `number`);
$(`number`);
const tmpMCP$31 /*:unknown*/ = $spy(`Math.ceil`);
$coerce(tmpMCP$31, `number`);
$(`number`);
const tmpMCP$33 /*:unknown*/ = $spy(`Math.clz32`);
$coerce(tmpMCP$33, `number`);
$(`number`);
const tmpMCP$35 /*:unknown*/ = $spy(`Math.cos`);
$coerce(tmpMCP$35, `number`);
$(`number`);
const tmpMCP$37 /*:unknown*/ = $spy(`Math.cosh`);
$coerce(tmpMCP$37, `number`);
$(`number`);
const tmpMCP$39 /*:unknown*/ = $spy(`Math.exp`);
$coerce(tmpMCP$39, `number`);
$(`number`);
const tmpMCP$41 /*:unknown*/ = $spy(`Math.expm1`);
$coerce(tmpMCP$41, `number`);
$(`number`);
const tmpMCP$43 /*:unknown*/ = $spy(`Math.floor`);
$coerce(tmpMCP$43, `number`);
$(`number`);
const tmpMCP$45 /*:unknown*/ = $spy(`Math.fround`);
$coerce(tmpMCP$45, `number`);
$(`number`);
const tmpMCP$47 /*:unknown*/ = $spy(`Math.hypot`);
$coerce(tmpMCP$47, `number`);
$(`number`);
const tmpMCP$49 /*:unknown*/ = $spy(`Math.imul`);
$coerce(tmpMCP$49, `number`);
$(`number`);
const tmpMCP$51 /*:unknown*/ = $spy(`Math.log`);
$coerce(tmpMCP$51, `number`);
$(`number`);
const tmpMCP$53 /*:unknown*/ = $spy(`Math.log10`);
$coerce(tmpMCP$53, `number`);
$(`number`);
const tmpMCP$55 /*:unknown*/ = $spy(`Math.log1p`);
$coerce(tmpMCP$55, `number`);
$(`number`);
const tmpMCP$57 /*:unknown*/ = $spy(`Math.log2`);
$coerce(tmpMCP$57, `number`);
$(`number`);
const tmpMCP$59 /*:unknown*/ = $spy(`Math.max`);
$coerce(tmpMCP$59, `number`);
$(`number`);
const tmpMCP$61 /*:unknown*/ = $spy(`Math.min`);
$coerce(tmpMCP$61, `number`);
$(`number`);
const tmpMCP$63 /*:unknown*/ = $spy(`Math.pow`);
$coerce(tmpMCP$63, `number`);
$(`number`);
$spy(`Math.random`);
$(`number`);
const tmpMCP$67 /*:unknown*/ = $spy(`Math.round`);
$coerce(tmpMCP$67, `number`);
$(`number`);
const tmpMCP$69 /*:unknown*/ = $spy(`Math.sign`);
$coerce(tmpMCP$69, `number`);
$(`number`);
const tmpMCP$71 /*:unknown*/ = $spy(`Math.sin`);
$coerce(tmpMCP$71, `number`);
$(`number`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
const tmpMCP$81 /*:unknown*/ = $spy(`Number.parseFloat`);
$coerce(tmpMCP$81, `string`);
$(`number`);
const tmpMCP$83 /*:unknown*/ = $spy(`Number.parseInt`);
$coerce(tmpMCP$83, `string`);
$(`number`);
$spy(`Object.is`);
$(`boolean`);
$spy(`Object.isFrozen`);
$(`boolean`);
$spy(`Object.isSealed`);
$(`boolean`);
const tmpMCP$91 /*:unknown*/ = $spy(`String.fromCharCode`);
$coerce(tmpMCP$91, `number`);
$(`string`);
const tmpMCP$93 /*:unknown*/ = $spy(`String.fromCodePoint`);
$String_fromCodePoint(tmpMCP$93);
$(`string`);
const tmpMCP$95 /*:unknown*/ = $spy(`String.raw`);
$String_raw(tmpMCP$95);
$(`string`);
$(`number`, `Math.E`);
$(`number`, `Math.LN10`);
$(`number`, `Math.LN2`);
$(`number`, `Math.LOG10E`);
$(`number`, `Math.LOG2E`);
$(`number`, `Math.PI`);
$(`number`, `Math.SQRT1_2`);
$(`number`, `Math.SQRT2`);
$(`number`, `Number.EPSILON`);
$(`number`, `Number.MAX_VALUE`);
$(`number`, `Number.MIN_VALUE`);
$(`number`, `Number.NEGATIVE_INFINITY`);
$(`number`, `Number.POSITIVE_INFINITY`);
$(`number`, `Number.NaN`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`String`), `string`);
$(`string`);
$coerce($spy(`Number`), `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
$coerce($spy(`parseInt`), `string`);
$(`number`);
$coerce($spy(`parseFloat`), `string`);
$(`number`);
$coerce($spy(`isNaN`), `number`);
$(`boolean`);
$coerce($spy(`isFinite`), `number`);
$(`boolean`);
$Array_from($spy(`Array.from`));
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
$coerce($spy(`Date.UTC`), `number`);
$(`number`);
$coerce($spy(`Date.parse`), `string`);
$(`number`);
const tmpUnaryArg$25 = $dotCall($JSON_stringify, JSON, `stringify`, $spy(`JSON.stringify`));
$(typeof tmpUnaryArg$25);
$coerce($spy(`Math.abs`), `number`);
$(`number`);
$coerce($spy(`Math.acos`), `number`);
$(`number`);
$coerce($spy(`Math.acosh`), `number`);
$(`number`);
$coerce($spy(`Math.asin`), `number`);
$(`number`);
$coerce($spy(`Math.asinh`), `number`);
$(`number`);
$coerce($spy(`Math.atan`), `number`);
$(`number`);
$coerce($spy(`Math.atan2`), `number`);
$(`number`);
$coerce($spy(`Math.atanh`), `number`);
$(`number`);
$coerce($spy(`Math.cbrt`), `number`);
$(`number`);
$coerce($spy(`Math.ceil`), `number`);
$(`number`);
$coerce($spy(`Math.clz32`), `number`);
$(`number`);
$coerce($spy(`Math.cos`), `number`);
$(`number`);
$coerce($spy(`Math.cosh`), `number`);
$(`number`);
$coerce($spy(`Math.exp`), `number`);
$(`number`);
$coerce($spy(`Math.expm1`), `number`);
$(`number`);
$coerce($spy(`Math.floor`), `number`);
$(`number`);
$coerce($spy(`Math.fround`), `number`);
$(`number`);
$coerce($spy(`Math.hypot`), `number`);
$(`number`);
$coerce($spy(`Math.imul`), `number`);
$(`number`);
$coerce($spy(`Math.log`), `number`);
$(`number`);
$coerce($spy(`Math.log10`), `number`);
$(`number`);
$coerce($spy(`Math.log1p`), `number`);
$(`number`);
$coerce($spy(`Math.log2`), `number`);
$(`number`);
$coerce($spy(`Math.max`), `number`);
$(`number`);
$coerce($spy(`Math.min`), `number`);
$(`number`);
$coerce($spy(`Math.pow`), `number`);
$(`number`);
$spy(`Math.random`);
$(`number`);
$coerce($spy(`Math.round`), `number`);
$(`number`);
$coerce($spy(`Math.sign`), `number`);
$(`number`);
$coerce($spy(`Math.sin`), `number`);
$(`number`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
$coerce($spy(`Number.parseFloat`), `string`);
$(`number`);
$coerce($spy(`Number.parseInt`), `string`);
$(`number`);
$spy(`Object.is`);
$(`boolean`);
$spy(`Object.isFrozen`);
$(`boolean`);
$spy(`Object.isSealed`);
$(`boolean`);
$coerce($spy(`String.fromCharCode`), `number`);
$(`string`);
$String_fromCodePoint($spy(`String.fromCodePoint`));
$(`string`);
$String_raw($spy(`String.raw`));
$(`string`);
$(`number`, `Math.E`);
$(`number`, `Math.LN10`);
$(`number`, `Math.LN2`);
$(`number`, `Math.LOG10E`);
$(`number`, `Math.LOG2E`);
$(`number`, `Math.PI`);
$(`number`, `Math.SQRT1_2`);
$(`number`, `Math.SQRT2`);
$(`number`, `Number.EPSILON`);
$(`number`, `Number.MAX_VALUE`);
$(`number`, `Number.MIN_VALUE`);
$(`number`, `Number.NEGATIVE_INFINITY`);
$(`number`, `Number.POSITIVE_INFINITY`);
$(`number`, `Number.NaN`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "String" );
$coerce( a, "string" );
$( "string" );
const b = $spy( "Number" );
$coerce( b, "number" );
$( "number" );
$spy( "Boolean" );
$( "boolean" );
const c = $spy( "parseInt" );
$coerce( c, "string" );
$( "number" );
const d = $spy( "parseFloat" );
$coerce( d, "string" );
$( "number" );
const e = $spy( "isNaN" );
$coerce( e, "number" );
$( "boolean" );
const f = $spy( "isFinite" );
$coerce( f, "number" );
$( "boolean" );
const g = $spy( "Array.from" );
$Array_from( g );
$( "object" );
$spy( "Array.isArray" );
$( "boolean" );
$spy( "Array.of" );
$( "object" );
$spy( "Date.now" );
$( "number" );
const h = $spy( "Date.UTC" );
$coerce( h, "number" );
$( "number" );
const i = $spy( "Date.parse" );
$coerce( i, "string" );
$( "number" );
const j = $spy( "JSON.stringify" );
const k = $dotCall( $JSON_stringify, JSON, "stringify", j );
const l = typeof k;
$( l );
const m = $spy( "Math.abs" );
$coerce( m, "number" );
$( "number" );
const n = $spy( "Math.acos" );
$coerce( n, "number" );
$( "number" );
const o = $spy( "Math.acosh" );
$coerce( o, "number" );
$( "number" );
const p = $spy( "Math.asin" );
$coerce( p, "number" );
$( "number" );
const q = $spy( "Math.asinh" );
$coerce( q, "number" );
$( "number" );
const r = $spy( "Math.atan" );
$coerce( r, "number" );
$( "number" );
const s = $spy( "Math.atan2" );
$coerce( s, "number" );
$( "number" );
const t = $spy( "Math.atanh" );
$coerce( t, "number" );
$( "number" );
const u = $spy( "Math.cbrt" );
$coerce( u, "number" );
$( "number" );
const v = $spy( "Math.ceil" );
$coerce( v, "number" );
$( "number" );
const w = $spy( "Math.clz32" );
$coerce( w, "number" );
$( "number" );
const x = $spy( "Math.cos" );
$coerce( x, "number" );
$( "number" );
const y = $spy( "Math.cosh" );
$coerce( y, "number" );
$( "number" );
const z = $spy( "Math.exp" );
$coerce( z, "number" );
$( "number" );
const ba = $spy( "Math.expm1" );
$coerce( ba, "number" );
$( "number" );
const bb = $spy( "Math.floor" );
$coerce( bb, "number" );
$( "number" );
const bc = $spy( "Math.fround" );
$coerce( bc, "number" );
$( "number" );
const bd = $spy( "Math.hypot" );
$coerce( bd, "number" );
$( "number" );
const be = $spy( "Math.imul" );
$coerce( be, "number" );
$( "number" );
const bf = $spy( "Math.log" );
$coerce( bf, "number" );
$( "number" );
const bg = $spy( "Math.log10" );
$coerce( bg, "number" );
$( "number" );
const bh = $spy( "Math.log1p" );
$coerce( bh, "number" );
$( "number" );
const bi = $spy( "Math.log2" );
$coerce( bi, "number" );
$( "number" );
const bj = $spy( "Math.max" );
$coerce( bj, "number" );
$( "number" );
const bk = $spy( "Math.min" );
$coerce( bk, "number" );
$( "number" );
const bl = $spy( "Math.pow" );
$coerce( bl, "number" );
$( "number" );
$spy( "Math.random" );
$( "number" );
const bm = $spy( "Math.round" );
$coerce( bm, "number" );
$( "number" );
const bn = $spy( "Math.sign" );
$coerce( bn, "number" );
$( "number" );
const bo = $spy( "Math.sin" );
$coerce( bo, "number" );
$( "number" );
$spy( "Number.isFinite" );
$( "boolean" );
$spy( "Number.isInteger" );
$( "boolean" );
$spy( "Number.isNaN" );
$( "boolean" );
$spy( "Number.isSafeInteger" );
$( "boolean" );
const bp = $spy( "Number.parseFloat" );
$coerce( bp, "string" );
$( "number" );
const bq = $spy( "Number.parseInt" );
$coerce( bq, "string" );
$( "number" );
$spy( "Object.is" );
$( "boolean" );
$spy( "Object.isFrozen" );
$( "boolean" );
$spy( "Object.isSealed" );
$( "boolean" );
const br = $spy( "String.fromCharCode" );
$coerce( br, "number" );
$( "string" );
const bs = $spy( "String.fromCodePoint" );
$String_fromCodePoint( bs );
$( "string" );
const bt = $spy( "String.raw" );
$String_raw( bt );
$( "string" );
$( "number", "Math.E" );
$( "number", "Math.LN10" );
$( "number", "Math.LN2" );
$( "number", "Math.LOG10E" );
$( "number", "Math.LOG2E" );
$( "number", "Math.PI" );
$( "number", "Math.SQRT1_2" );
$( "number", "Math.SQRT2" );
$( "number", "Number.EPSILON" );
$( "number", "Number.MAX_VALUE" );
$( "number", "Number.MIN_VALUE" );
$( "number", "Number.NEGATIVE_INFINITY" );
$( "number", "Number.POSITIVE_INFINITY" );
$( "number", "Number.NaN" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Date_now
- (todo) type trackeed tricks can possibly support static $Date_UTC
- (todo) type trackeed tricks can possibly support static $Date_parse
- (todo) type trackeed tricks can possibly support static $JSON_stringify
- (todo) type trackeed tricks can possibly support static $Math_abs
- (todo) type trackeed tricks can possibly support static $Math_acos
- (todo) type trackeed tricks can possibly support static $Math_acosh
- (todo) type trackeed tricks can possibly support static $Math_asin
- (todo) type trackeed tricks can possibly support static $Math_asinh
- (todo) type trackeed tricks can possibly support static $Math_atan
- (todo) type trackeed tricks can possibly support static $Math_atan2
- (todo) type trackeed tricks can possibly support static $Math_atanh
- (todo) type trackeed tricks can possibly support static $Math_cbrt
- (todo) type trackeed tricks can possibly support static $Math_ceil
- (todo) type trackeed tricks can possibly support static $Math_clz32
- (todo) type trackeed tricks can possibly support static $Math_cos
- (todo) type trackeed tricks can possibly support static $Math_cosh
- (todo) type trackeed tricks can possibly support static $Math_exp
- (todo) type trackeed tricks can possibly support static $Math_expm1
- (todo) type trackeed tricks can possibly support static $Math_floor
- (todo) type trackeed tricks can possibly support static $Math_fround
- (todo) type trackeed tricks can possibly support static $Math_hypot
- (todo) type trackeed tricks can possibly support static $Math_imul
- (todo) type trackeed tricks can possibly support static $Math_log
- (todo) type trackeed tricks can possibly support static $Math_log10
- (todo) type trackeed tricks can possibly support static $Math_log1p
- (todo) type trackeed tricks can possibly support static $Math_log2
- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $Math_min
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $Math_random
- (todo) type trackeed tricks can possibly support static $Math_round
- (todo) type trackeed tricks can possibly support static $Math_sign
- (todo) type trackeed tricks can possibly support static $Math_sin
- (todo) type trackeed tricks can possibly support static $Object_is
- (todo) type trackeed tricks can possibly support static $Object_isFrozen
- (todo) type trackeed tricks can possibly support static $Object_isSealed
- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $Array_isArray
- (todo) type trackeed tricks can possibly support static $Array_of
- (todo) type trackeed tricks can possibly support static $Number_isFinite
- (todo) type trackeed tricks can possibly support static $Number_isInteger
- (todo) type trackeed tricks can possibly support static $Number_isNaN
- (todo) type trackeed tricks can possibly support static $Number_isSafeInteger
- (todo) type trackeed tricks can possibly support static $Number_parseFloat
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) type trackeed tricks can possibly support static $String_raw


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['String', 'String']
 - 2: '$spy[1].toString()', 'String'
 - 3: 'string'
 - 4: 'Creating spy', 2, 1, ['Number', 'Number']
 - 5: '$spy[2].valueOf()', 'Number'
 - 6: 'number'
 - 7: 'Creating spy', 3, 1, ['Boolean', 'Boolean']
 - 8: 'boolean'
 - 9: 'Creating spy', 4, 1, ['parseInt', 'parseInt']
 - 10: '$spy[4].toString()', 'parseInt'
 - 11: 'number'
 - 12: 'Creating spy', 5, 1, ['parseFloat', 'parseFloat']
 - 13: '$spy[5].toString()', 'parseFloat'
 - 14: 'number'
 - 15: 'Creating spy', 6, 1, ['isNaN', 'isNaN']
 - 16: '$spy[6].valueOf()', 'isNaN'
 - 17: 'boolean'
 - 18: 'Creating spy', 7, 1, ['isFinite', 'isFinite']
 - 19: '$spy[7].valueOf()', 'isFinite'
 - 20: 'boolean'
 - 21: 'Creating spy', 8, 1, ['Array.from', 'Array.from']
 - 22: 'object'
 - 23: 'Creating spy', 9, 1, ['Array.isArray', 'Array.isArray']
 - 24: 'boolean'
 - 25: 'Creating spy', 10, 1, ['Array.of', 'Array.of']
 - 26: 'object'
 - 27: 'Creating spy', 11, 1, ['Date.now', 'Date.now']
 - 28: 'number'
 - 29: 'Creating spy', 12, 1, ['Date.UTC', 'Date.UTC']
 - 30: '$spy[12].valueOf()', 'Date.UTC'
 - 31: 'number'
 - 32: 'Creating spy', 13, 1, ['Date.parse', 'Date.parse']
 - 33: '$spy[13].toString()', 'Date.parse'
 - 34: 'number'
 - 35: 'Creating spy', 14, 1, ['JSON.stringify', 'JSON.stringify']
 - 36: 'string'
 - 37: 'Creating spy', 15, 1, ['Math.abs', 'Math.abs']
 - 38: '$spy[15].valueOf()', 'Math.abs'
 - 39: 'number'
 - 40: 'Creating spy', 16, 1, ['Math.acos', 'Math.acos']
 - 41: '$spy[16].valueOf()', 'Math.acos'
 - 42: 'number'
 - 43: 'Creating spy', 17, 1, ['Math.acosh', 'Math.acosh']
 - 44: '$spy[17].valueOf()', 'Math.acosh'
 - 45: 'number'
 - 46: 'Creating spy', 18, 1, ['Math.asin', 'Math.asin']
 - 47: '$spy[18].valueOf()', 'Math.asin'
 - 48: 'number'
 - 49: 'Creating spy', 19, 1, ['Math.asinh', 'Math.asinh']
 - 50: '$spy[19].valueOf()', 'Math.asinh'
 - 51: 'number'
 - 52: 'Creating spy', 20, 1, ['Math.atan', 'Math.atan']
 - 53: '$spy[20].valueOf()', 'Math.atan'
 - 54: 'number'
 - 55: 'Creating spy', 21, 1, ['Math.atan2', 'Math.atan2']
 - 56: '$spy[21].valueOf()', 'Math.atan2'
 - 57: 'number'
 - 58: 'Creating spy', 22, 1, ['Math.atanh', 'Math.atanh']
 - 59: '$spy[22].valueOf()', 'Math.atanh'
 - 60: 'number'
 - 61: 'Creating spy', 23, 1, ['Math.cbrt', 'Math.cbrt']
 - 62: '$spy[23].valueOf()', 'Math.cbrt'
 - 63: 'number'
 - 64: 'Creating spy', 24, 1, ['Math.ceil', 'Math.ceil']
 - 65: '$spy[24].valueOf()', 'Math.ceil'
 - 66: 'number'
 - 67: 'Creating spy', 25, 1, ['Math.clz32', 'Math.clz32']
 - 68: '$spy[25].valueOf()', 'Math.clz32'
 - 69: 'number'
 - 70: 'Creating spy', 26, 1, ['Math.cos', 'Math.cos']
 - 71: '$spy[26].valueOf()', 'Math.cos'
 - 72: 'number'
 - 73: 'Creating spy', 27, 1, ['Math.cosh', 'Math.cosh']
 - 74: '$spy[27].valueOf()', 'Math.cosh'
 - 75: 'number'
 - 76: 'Creating spy', 28, 1, ['Math.exp', 'Math.exp']
 - 77: '$spy[28].valueOf()', 'Math.exp'
 - 78: 'number'
 - 79: 'Creating spy', 29, 1, ['Math.expm1', 'Math.expm1']
 - 80: '$spy[29].valueOf()', 'Math.expm1'
 - 81: 'number'
 - 82: 'Creating spy', 30, 1, ['Math.floor', 'Math.floor']
 - 83: '$spy[30].valueOf()', 'Math.floor'
 - 84: 'number'
 - 85: 'Creating spy', 31, 1, ['Math.fround', 'Math.fround']
 - 86: '$spy[31].valueOf()', 'Math.fround'
 - 87: 'number'
 - 88: 'Creating spy', 32, 1, ['Math.hypot', 'Math.hypot']
 - 89: '$spy[32].valueOf()', 'Math.hypot'
 - 90: 'number'
 - 91: 'Creating spy', 33, 1, ['Math.imul', 'Math.imul']
 - 92: '$spy[33].valueOf()', 'Math.imul'
 - 93: 'number'
 - 94: 'Creating spy', 34, 1, ['Math.log', 'Math.log']
 - 95: '$spy[34].valueOf()', 'Math.log'
 - 96: 'number'
 - 97: 'Creating spy', 35, 1, ['Math.log10', 'Math.log10']
 - 98: '$spy[35].valueOf()', 'Math.log10'
 - 99: 'number'
 - 100: 'Creating spy', 36, 1, ['Math.log1p', 'Math.log1p']
 - 101: '$spy[36].valueOf()', 'Math.log1p'
 - 102: 'number'
 - 103: 'Creating spy', 37, 1, ['Math.log2', 'Math.log2']
 - 104: '$spy[37].valueOf()', 'Math.log2'
 - 105: 'number'
 - 106: 'Creating spy', 38, 1, ['Math.max', 'Math.max']
 - 107: '$spy[38].valueOf()', 'Math.max'
 - 108: 'number'
 - 109: 'Creating spy', 39, 1, ['Math.min', 'Math.min']
 - 110: '$spy[39].valueOf()', 'Math.min'
 - 111: 'number'
 - 112: 'Creating spy', 40, 1, ['Math.pow', 'Math.pow']
 - 113: '$spy[40].valueOf()', 'Math.pow'
 - 114: 'number'
 - 115: 'Creating spy', 41, 1, ['Math.random', 'Math.random']
 - 116: 'number'
 - 117: 'Creating spy', 42, 1, ['Math.round', 'Math.round']
 - 118: '$spy[42].valueOf()', 'Math.round'
 - 119: 'number'
 - 120: 'Creating spy', 43, 1, ['Math.sign', 'Math.sign']
 - 121: '$spy[43].valueOf()', 'Math.sign'
 - 122: 'number'
 - 123: 'Creating spy', 44, 1, ['Math.sin', 'Math.sin']
 - 124: '$spy[44].valueOf()', 'Math.sin'
 - 125: 'number'
 - 126: 'Creating spy', 45, 1, ['Number.isFinite', 'Number.isFinite']
 - 127: 'boolean'
 - 128: 'Creating spy', 46, 1, ['Number.isInteger', 'Number.isInteger']
 - 129: 'boolean'
 - 130: 'Creating spy', 47, 1, ['Number.isNaN', 'Number.isNaN']
 - 131: 'boolean'
 - 132: 'Creating spy', 48, 1, ['Number.isSafeInteger', 'Number.isSafeInteger']
 - 133: 'boolean'
 - 134: 'Creating spy', 49, 1, ['Number.parseFloat', 'Number.parseFloat']
 - 135: '$spy[49].toString()', 'Number.parseFloat'
 - 136: 'number'
 - 137: 'Creating spy', 50, 1, ['Number.parseInt', 'Number.parseInt']
 - 138: '$spy[50].toString()', 'Number.parseInt'
 - 139: 'number'
 - 140: 'Creating spy', 51, 1, ['Object.is', 'Object.is']
 - 141: 'boolean'
 - 142: 'Creating spy', 52, 1, ['Object.isFrozen', 'Object.isFrozen']
 - 143: 'boolean'
 - 144: 'Creating spy', 53, 1, ['Object.isSealed', 'Object.isSealed']
 - 145: 'boolean'
 - 146: 'Creating spy', 54, 1, ['String.fromCharCode', 'String.fromCharCode']
 - 147: '$spy[54].valueOf()', 'String.fromCharCode'
 - 148: 'string'
 - 149: 'Creating spy', 55, 1, ['String.fromCodePoint', 'String.fromCodePoint']
 - 150: '$spy[55].valueOf()', 'String.fromCodePoint'
 - eval returned: ('<crash[ Invalid code point NaN ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
