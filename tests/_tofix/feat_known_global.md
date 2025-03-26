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
const tmpStringFirstArg$1 /*:unknown*/ = $spy(`Number`);
$coerce(tmpStringFirstArg$1, `number`);
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
const tmpCalleeParam$25 /*:unknown*/ = $spy(`Array.from`);
$Array_from(tmpCalleeParam$25);
$(`object`);
$spy(`Array.isArray`);
$(`boolean`);
$spy(`Array.of`);
$(`object`);
$spy(`Date.now`);
$(`number`);
const tmpCalleeParam$41 /*:unknown*/ = $spy(`Date.UTC`);
+tmpCalleeParam$41;
$(`number`);
const tmpCalleeParam$45 /*:unknown*/ = $spy(`Date.parse`);
$coerce(tmpCalleeParam$45, `string`);
$(`number`);
const tmpCalleeParam$49 /*:unknown*/ = $spy(`JSON.stringify`);
const tmpUnaryArg$25 /*:primitive*/ = $JSON_stringify(tmpCalleeParam$49);
const tmpCalleeParam$47 /*:string*/ = typeof tmpUnaryArg$25;
$(tmpCalleeParam$47);
const tmpCalleeParam$53 /*:unknown*/ = $spy(`Math.abs`);
$coerce(tmpCalleeParam$53, `number`);
$(`number`);
const tmpCalleeParam$57 /*:unknown*/ = $spy(`Math.acos`);
$coerce(tmpCalleeParam$57, `number`);
$(`number`);
const tmpCalleeParam$61 /*:unknown*/ = $spy(`Math.acosh`);
$coerce(tmpCalleeParam$61, `number`);
$(`number`);
const tmpCalleeParam$65 /*:unknown*/ = $spy(`Math.asin`);
$coerce(tmpCalleeParam$65, `number`);
$(`number`);
const tmpCalleeParam$69 /*:unknown*/ = $spy(`Math.asinh`);
$coerce(tmpCalleeParam$69, `number`);
$(`number`);
const tmpCalleeParam$73 /*:unknown*/ = $spy(`Math.atan`);
$coerce(tmpCalleeParam$73, `number`);
$(`number`);
const tmpCalleeParam$77 /*:unknown*/ = $spy(`Math.atan2`);
+tmpCalleeParam$77;
$(`number`);
const tmpCalleeParam$81 /*:unknown*/ = $spy(`Math.atanh`);
$coerce(tmpCalleeParam$81, `number`);
$(`number`);
const tmpCalleeParam$85 /*:unknown*/ = $spy(`Math.cbrt`);
$coerce(tmpCalleeParam$85, `number`);
$(`number`);
const tmpCalleeParam$89 /*:unknown*/ = $spy(`Math.ceil`);
$coerce(tmpCalleeParam$89, `number`);
$(`number`);
const tmpCalleeParam$93 /*:unknown*/ = $spy(`Math.clz32`);
$coerce(tmpCalleeParam$93, `number`);
$(`number`);
const tmpCalleeParam$97 /*:unknown*/ = $spy(`Math.cos`);
$coerce(tmpCalleeParam$97, `number`);
$(`number`);
const tmpCalleeParam$101 /*:unknown*/ = $spy(`Math.cosh`);
$coerce(tmpCalleeParam$101, `number`);
$(`number`);
const tmpCalleeParam$105 /*:unknown*/ = $spy(`Math.exp`);
$coerce(tmpCalleeParam$105, `number`);
$(`number`);
const tmpCalleeParam$109 /*:unknown*/ = $spy(`Math.expm1`);
$coerce(tmpCalleeParam$109, `number`);
$(`number`);
const tmpCalleeParam$113 /*:unknown*/ = $spy(`Math.floor`);
$coerce(tmpCalleeParam$113, `number`);
$(`number`);
const tmpCalleeParam$117 /*:unknown*/ = $spy(`Math.fround`);
$coerce(tmpCalleeParam$117, `number`);
$(`number`);
const tmpCalleeParam$121 /*:unknown*/ = $spy(`Math.hypot`);
+tmpCalleeParam$121;
$(`number`);
const tmpCalleeParam$125 /*:unknown*/ = $spy(`Math.imul`);
+tmpCalleeParam$125;
$(`number`);
const tmpCalleeParam$129 /*:unknown*/ = $spy(`Math.log`);
$coerce(tmpCalleeParam$129, `number`);
$(`number`);
const tmpCalleeParam$133 /*:unknown*/ = $spy(`Math.log10`);
$coerce(tmpCalleeParam$133, `number`);
$(`number`);
const tmpCalleeParam$137 /*:unknown*/ = $spy(`Math.log1p`);
$coerce(tmpCalleeParam$137, `number`);
$(`number`);
const tmpCalleeParam$141 /*:unknown*/ = $spy(`Math.log2`);
$coerce(tmpCalleeParam$141, `number`);
$(`number`);
const tmpCalleeParam$145 /*:unknown*/ = $spy(`Math.max`);
+tmpCalleeParam$145;
$(`number`);
const tmpCalleeParam$149 /*:unknown*/ = $spy(`Math.min`);
+tmpCalleeParam$149;
$(`number`);
const tmpCalleeParam$153 /*:unknown*/ = $spy(`Math.pow`);
+tmpCalleeParam$153;
$(`number`);
$spy(`Math.random`);
$(`number`);
const tmpCalleeParam$161 /*:unknown*/ = $spy(`Math.round`);
$coerce(tmpCalleeParam$161, `number`);
$(`number`);
const tmpCalleeParam$165 /*:unknown*/ = $spy(`Math.sign`);
$coerce(tmpCalleeParam$165, `number`);
$(`number`);
const tmpCalleeParam$169 /*:unknown*/ = $spy(`Math.sin`);
$coerce(tmpCalleeParam$169, `number`);
$(`number`);
$spy(`Number.isFinite`);
$(`boolean`);
$spy(`Number.isInteger`);
$(`boolean`);
$spy(`Number.isNaN`);
$(`boolean`);
$spy(`Number.isSafeInteger`);
$(`boolean`);
const tmpCalleeParam$189 /*:unknown*/ = $spy(`Number.parseFloat`);
$coerce(tmpCalleeParam$189, `string`);
$(`number`);
const tmpCalleeParam$193 /*:unknown*/ = $spy(`Number.parseInt`);
$coerce(tmpCalleeParam$193, `string`);
$(`number`);
$spy(`Object.is`);
$(`boolean`);
$spy(`Object.isFrozen`);
$(`boolean`);
$spy(`Object.isSealed`);
$(`boolean`);
const tmpCalleeParam$209 /*:unknown*/ = $spy(`String.fromCharCode`);
+tmpCalleeParam$209;
$(`string`);
const tmpCalleeParam$213 /*:unknown*/ = $spy(`String.fromCodePoint`);
$String_fromCodePoint(tmpCalleeParam$213);
$(`string`);
const tmpCalleeParam$217 /*:unknown*/ = $spy(`String.raw`);
$String_raw(tmpCalleeParam$217);
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
const tmpCalleeParam$41 = $spy(`Date.UTC`);
+tmpCalleeParam$41;
$(`number`);
$coerce($spy(`Date.parse`), `string`);
$(`number`);
const tmpUnaryArg$25 = $JSON_stringify($spy(`JSON.stringify`));
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
const tmpCalleeParam$77 = $spy(`Math.atan2`);
+tmpCalleeParam$77;
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
const tmpCalleeParam$121 = $spy(`Math.hypot`);
+tmpCalleeParam$121;
$(`number`);
const tmpCalleeParam$125 = $spy(`Math.imul`);
+tmpCalleeParam$125;
$(`number`);
$coerce($spy(`Math.log`), `number`);
$(`number`);
$coerce($spy(`Math.log10`), `number`);
$(`number`);
$coerce($spy(`Math.log1p`), `number`);
$(`number`);
$coerce($spy(`Math.log2`), `number`);
$(`number`);
const tmpCalleeParam$145 = $spy(`Math.max`);
+tmpCalleeParam$145;
$(`number`);
const tmpCalleeParam$149 = $spy(`Math.min`);
+tmpCalleeParam$149;
$(`number`);
const tmpCalleeParam$153 = $spy(`Math.pow`);
+tmpCalleeParam$153;
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
const tmpCalleeParam$209 = $spy(`String.fromCharCode`);
+tmpCalleeParam$209;
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
+h;
$( "number" );
const i = $spy( "Date.parse" );
$coerce( i, "string" );
$( "number" );
const j = $spy( "JSON.stringify" );
const k = $JSON_stringify( j );
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
+s;
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
+bd;
$( "number" );
const be = $spy( "Math.imul" );
+be;
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
+bj;
$( "number" );
const bk = $spy( "Math.min" );
+bk;
$( "number" );
const bl = $spy( "Math.pow" );
+bl;
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
+br;
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


- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $Array_isArray
- (todo) type trackeed tricks can possibly support static $Array_of
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
- (todo) type trackeed tricks can possibly support static $Number_isFinite
- (todo) type trackeed tricks can possibly support static $Number_isInteger
- (todo) type trackeed tricks can possibly support static $Number_isNaN
- (todo) type trackeed tricks can possibly support static $Number_isSafeInteger
- (todo) type trackeed tricks can possibly support static $Number_parseFloat
- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) type trackeed tricks can possibly support static $Object_is
- (todo) type trackeed tricks can possibly support static $Object_isFrozen
- (todo) type trackeed tricks can possibly support static $Object_isSealed
- (todo) type trackeed tricks can possibly support static $String_fromCodePoint
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
