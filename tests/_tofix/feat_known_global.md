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
const tmpCalleeParam$1 /*:unknown*/ = $spy(`String`);
$coerce(tmpCalleeParam$1, `string`);
$(`string`);
const tmpCalleeParam$5 /*:unknown*/ = $spy(`Number`);
$coerce(tmpCalleeParam$5, `number`);
$(`number`);
$spy(`Boolean`);
$(`boolean`);
const tmpCalleeParam$13 /*:unknown*/ = $spy(`parseInt`);
$coerce(tmpCalleeParam$13, `string`);
$(`number`);
const tmpCalleeParam$17 /*:unknown*/ = $spy(`parseFloat`);
$coerce(tmpCalleeParam$17, `string`);
$(`number`);
const tmpCalleeParam$21 /*:unknown*/ = $spy(`isNaN`);
$coerce(tmpCalleeParam$21, `number`);
$(`boolean`);
const tmpCalleeParam$25 /*:unknown*/ = $spy(`isFinite`);
$coerce(tmpCalleeParam$25, `number`);
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
const tmpUnaryArg$25 /*:primitive*/ = $JSON_stringify(tmpMCP$11);
const tmpCalleeParam$39 /*:string*/ /*truthy*/ = typeof tmpUnaryArg$25;
$(tmpCalleeParam$39);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam$1 = $spy(`String`);
const tmpUnaryArg = $coerce(tmpCalleeParam$1, `string`);
let tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
let tmpCalleeParam$5 = $spy(`Number`);
const tmpUnaryArg$1 = $coerce(tmpCalleeParam$5, `number`);
let tmpCalleeParam$3 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$3);
let tmpCalleeParam$9 = $spy(`Boolean`);
const tmpUnaryArg$3 = $boolean_constructor(tmpCalleeParam$9);
let tmpCalleeParam$7 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$7);
let tmpCalleeParam$13 = $spy(`parseInt`);
const tmpUnaryArg$5 = $Number_parseInt(tmpCalleeParam$13);
let tmpCalleeParam$11 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$11);
let tmpCalleeParam$17 = $spy(`parseFloat`);
const tmpUnaryArg$7 = $Number_parseFloat(tmpCalleeParam$17);
let tmpCalleeParam$15 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$15);
let tmpCalleeParam$21 = $spy(`isNaN`);
const tmpUnaryArg$9 = isNaN(tmpCalleeParam$21);
let tmpCalleeParam$19 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$19);
let tmpCalleeParam$25 = $spy(`isFinite`);
const tmpUnaryArg$11 = isFinite(tmpCalleeParam$25);
let tmpCalleeParam$23 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$23);
const tmpMCF = $Array_from;
const tmpMCP = $spy(`Array.from`);
const tmpUnaryArg$13 = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
let tmpCalleeParam$27 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$27);
const tmpMCF$1 = $Array_isArray;
const tmpMCP$1 = $spy(`Array.isArray`);
const tmpUnaryArg$15 = $dotCall(tmpMCF$1, $array_constructor, `isArray`, tmpMCP$1);
let tmpCalleeParam$29 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$29);
const tmpMCF$3 = $Array_of;
const tmpMCP$3 = $spy(`Array.of`);
const tmpUnaryArg$17 = $dotCall(tmpMCF$3, $array_constructor, `of`, tmpMCP$3);
let tmpCalleeParam$31 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$31);
const tmpMCF$5 = $Date_now;
const tmpMCP$5 = $spy(`Date.now`);
const tmpUnaryArg$19 = $dotCall(tmpMCF$5, $date_constructor, `now`, tmpMCP$5);
let tmpCalleeParam$33 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$33);
const tmpMCF$7 = $Date_UTC;
const tmpMCP$7 = $spy(`Date.UTC`);
const tmpUnaryArg$21 = $dotCall(tmpMCF$7, $date_constructor, `UTC`, tmpMCP$7);
let tmpCalleeParam$35 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$35);
const tmpMCF$9 = $Date_parse;
const tmpMCP$9 = $spy(`Date.parse`);
const tmpUnaryArg$23 = $dotCall(tmpMCF$9, $date_constructor, `parse`, tmpMCP$9);
let tmpCalleeParam$37 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$37);
const tmpMCF$11 = $JSON_stringify;
const tmpMCP$11 = $spy(`JSON.stringify`);
const tmpUnaryArg$25 = $dotCall(tmpMCF$11, JSON, `stringify`, tmpMCP$11);
let tmpCalleeParam$39 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$39);
const tmpMCF$13 = $Math_abs;
const tmpMCP$13 = $spy(`Math.abs`);
const tmpUnaryArg$27 = $dotCall(tmpMCF$13, Math, `abs`, tmpMCP$13);
let tmpCalleeParam$41 = typeof tmpUnaryArg$27;
$(tmpCalleeParam$41);
const tmpMCF$15 = $Math_acos;
const tmpMCP$15 = $spy(`Math.acos`);
const tmpUnaryArg$29 = $dotCall(tmpMCF$15, Math, `acos`, tmpMCP$15);
let tmpCalleeParam$43 = typeof tmpUnaryArg$29;
$(tmpCalleeParam$43);
const tmpMCF$17 = $Math_acosh;
const tmpMCP$17 = $spy(`Math.acosh`);
const tmpUnaryArg$31 = $dotCall(tmpMCF$17, Math, `acosh`, tmpMCP$17);
let tmpCalleeParam$45 = typeof tmpUnaryArg$31;
$(tmpCalleeParam$45);
const tmpMCF$19 = $Math_asin;
const tmpMCP$19 = $spy(`Math.asin`);
const tmpUnaryArg$33 = $dotCall(tmpMCF$19, Math, `asin`, tmpMCP$19);
let tmpCalleeParam$47 = typeof tmpUnaryArg$33;
$(tmpCalleeParam$47);
const tmpMCF$21 = $Math_asinh;
const tmpMCP$21 = $spy(`Math.asinh`);
const tmpUnaryArg$35 = $dotCall(tmpMCF$21, Math, `asinh`, tmpMCP$21);
let tmpCalleeParam$49 = typeof tmpUnaryArg$35;
$(tmpCalleeParam$49);
const tmpMCF$23 = $Math_atan;
const tmpMCP$23 = $spy(`Math.atan`);
const tmpUnaryArg$37 = $dotCall(tmpMCF$23, Math, `atan`, tmpMCP$23);
let tmpCalleeParam$51 = typeof tmpUnaryArg$37;
$(tmpCalleeParam$51);
const tmpMCF$25 = $Math_atan2;
const tmpMCP$25 = $spy(`Math.atan2`);
const tmpUnaryArg$39 = $dotCall(tmpMCF$25, Math, `atan2`, tmpMCP$25);
let tmpCalleeParam$53 = typeof tmpUnaryArg$39;
$(tmpCalleeParam$53);
const tmpMCF$27 = $Math_atanh;
const tmpMCP$27 = $spy(`Math.atanh`);
const tmpUnaryArg$41 = $dotCall(tmpMCF$27, Math, `atanh`, tmpMCP$27);
let tmpCalleeParam$55 = typeof tmpUnaryArg$41;
$(tmpCalleeParam$55);
const tmpMCF$29 = $Math_cbrt;
const tmpMCP$29 = $spy(`Math.cbrt`);
const tmpUnaryArg$43 = $dotCall(tmpMCF$29, Math, `cbrt`, tmpMCP$29);
let tmpCalleeParam$57 = typeof tmpUnaryArg$43;
$(tmpCalleeParam$57);
const tmpMCF$31 = $Math_ceil;
const tmpMCP$31 = $spy(`Math.ceil`);
const tmpUnaryArg$45 = $dotCall(tmpMCF$31, Math, `ceil`, tmpMCP$31);
let tmpCalleeParam$59 = typeof tmpUnaryArg$45;
$(tmpCalleeParam$59);
const tmpMCF$33 = $Math_clz32;
const tmpMCP$33 = $spy(`Math.clz32`);
const tmpUnaryArg$47 = $dotCall(tmpMCF$33, Math, `clz32`, tmpMCP$33);
let tmpCalleeParam$61 = typeof tmpUnaryArg$47;
$(tmpCalleeParam$61);
const tmpMCF$35 = $Math_cos;
const tmpMCP$35 = $spy(`Math.cos`);
const tmpUnaryArg$49 = $dotCall(tmpMCF$35, Math, `cos`, tmpMCP$35);
let tmpCalleeParam$63 = typeof tmpUnaryArg$49;
$(tmpCalleeParam$63);
const tmpMCF$37 = $Math_cosh;
const tmpMCP$37 = $spy(`Math.cosh`);
const tmpUnaryArg$51 = $dotCall(tmpMCF$37, Math, `cosh`, tmpMCP$37);
let tmpCalleeParam$65 = typeof tmpUnaryArg$51;
$(tmpCalleeParam$65);
const tmpMCF$39 = $Math_exp;
const tmpMCP$39 = $spy(`Math.exp`);
const tmpUnaryArg$53 = $dotCall(tmpMCF$39, Math, `exp`, tmpMCP$39);
let tmpCalleeParam$67 = typeof tmpUnaryArg$53;
$(tmpCalleeParam$67);
const tmpMCF$41 = $Math_expm1;
const tmpMCP$41 = $spy(`Math.expm1`);
const tmpUnaryArg$55 = $dotCall(tmpMCF$41, Math, `expm1`, tmpMCP$41);
let tmpCalleeParam$69 = typeof tmpUnaryArg$55;
$(tmpCalleeParam$69);
const tmpMCF$43 = $Math_floor;
const tmpMCP$43 = $spy(`Math.floor`);
const tmpUnaryArg$57 = $dotCall(tmpMCF$43, Math, `floor`, tmpMCP$43);
let tmpCalleeParam$71 = typeof tmpUnaryArg$57;
$(tmpCalleeParam$71);
const tmpMCF$45 = $Math_fround;
const tmpMCP$45 = $spy(`Math.fround`);
const tmpUnaryArg$59 = $dotCall(tmpMCF$45, Math, `fround`, tmpMCP$45);
let tmpCalleeParam$73 = typeof tmpUnaryArg$59;
$(tmpCalleeParam$73);
const tmpMCF$47 = $Math_hypot;
const tmpMCP$47 = $spy(`Math.hypot`);
const tmpUnaryArg$61 = $dotCall(tmpMCF$47, Math, `hypot`, tmpMCP$47);
let tmpCalleeParam$75 = typeof tmpUnaryArg$61;
$(tmpCalleeParam$75);
const tmpMCF$49 = $Math_imul;
const tmpMCP$49 = $spy(`Math.imul`);
const tmpUnaryArg$63 = $dotCall(tmpMCF$49, Math, `imul`, tmpMCP$49);
let tmpCalleeParam$77 = typeof tmpUnaryArg$63;
$(tmpCalleeParam$77);
const tmpMCF$51 = $Math_log;
const tmpMCP$51 = $spy(`Math.log`);
const tmpUnaryArg$65 = $dotCall(tmpMCF$51, Math, `log`, tmpMCP$51);
let tmpCalleeParam$79 = typeof tmpUnaryArg$65;
$(tmpCalleeParam$79);
const tmpMCF$53 = $Math_log10;
const tmpMCP$53 = $spy(`Math.log10`);
const tmpUnaryArg$67 = $dotCall(tmpMCF$53, Math, `log10`, tmpMCP$53);
let tmpCalleeParam$81 = typeof tmpUnaryArg$67;
$(tmpCalleeParam$81);
const tmpMCF$55 = $Math_log1p;
const tmpMCP$55 = $spy(`Math.log1p`);
const tmpUnaryArg$69 = $dotCall(tmpMCF$55, Math, `log1p`, tmpMCP$55);
let tmpCalleeParam$83 = typeof tmpUnaryArg$69;
$(tmpCalleeParam$83);
const tmpMCF$57 = $Math_log2;
const tmpMCP$57 = $spy(`Math.log2`);
const tmpUnaryArg$71 = $dotCall(tmpMCF$57, Math, `log2`, tmpMCP$57);
let tmpCalleeParam$85 = typeof tmpUnaryArg$71;
$(tmpCalleeParam$85);
const tmpMCF$59 = $Math_max;
const tmpMCP$59 = $spy(`Math.max`);
const tmpUnaryArg$73 = $dotCall(tmpMCF$59, Math, `max`, tmpMCP$59);
let tmpCalleeParam$87 = typeof tmpUnaryArg$73;
$(tmpCalleeParam$87);
const tmpMCF$61 = $Math_min;
const tmpMCP$61 = $spy(`Math.min`);
const tmpUnaryArg$75 = $dotCall(tmpMCF$61, Math, `min`, tmpMCP$61);
let tmpCalleeParam$89 = typeof tmpUnaryArg$75;
$(tmpCalleeParam$89);
const tmpMCF$63 = $Math_pow;
const tmpMCP$63 = $spy(`Math.pow`);
const tmpUnaryArg$77 = $dotCall(tmpMCF$63, Math, `pow`, tmpMCP$63);
let tmpCalleeParam$91 = typeof tmpUnaryArg$77;
$(tmpCalleeParam$91);
const tmpMCF$65 = $Math_random;
const tmpMCP$65 = $spy(`Math.random`);
const tmpUnaryArg$79 = $dotCall(tmpMCF$65, Math, `random`, tmpMCP$65);
let tmpCalleeParam$93 = typeof tmpUnaryArg$79;
$(tmpCalleeParam$93);
const tmpMCF$67 = $Math_round;
const tmpMCP$67 = $spy(`Math.round`);
const tmpUnaryArg$81 = $dotCall(tmpMCF$67, Math, `round`, tmpMCP$67);
let tmpCalleeParam$95 = typeof tmpUnaryArg$81;
$(tmpCalleeParam$95);
const tmpMCF$69 = $Math_sign;
const tmpMCP$69 = $spy(`Math.sign`);
const tmpUnaryArg$83 = $dotCall(tmpMCF$69, Math, `sign`, tmpMCP$69);
let tmpCalleeParam$97 = typeof tmpUnaryArg$83;
$(tmpCalleeParam$97);
const tmpMCF$71 = $Math_sin;
const tmpMCP$71 = $spy(`Math.sin`);
const tmpUnaryArg$85 = $dotCall(tmpMCF$71, Math, `sin`, tmpMCP$71);
let tmpCalleeParam$99 = typeof tmpUnaryArg$85;
$(tmpCalleeParam$99);
const tmpMCF$73 = $Number_isFinite;
const tmpMCP$73 = $spy(`Number.isFinite`);
const tmpUnaryArg$87 = $dotCall(tmpMCF$73, $number_constructor, `isFinite`, tmpMCP$73);
let tmpCalleeParam$101 = typeof tmpUnaryArg$87;
$(tmpCalleeParam$101);
const tmpMCF$75 = $Number_isInteger;
const tmpMCP$75 = $spy(`Number.isInteger`);
const tmpUnaryArg$89 = $dotCall(tmpMCF$75, $number_constructor, `isInteger`, tmpMCP$75);
let tmpCalleeParam$103 = typeof tmpUnaryArg$89;
$(tmpCalleeParam$103);
const tmpMCF$77 = $Number_isNaN;
const tmpMCP$77 = $spy(`Number.isNaN`);
const tmpUnaryArg$91 = $dotCall(tmpMCF$77, $number_constructor, `isNaN`, tmpMCP$77);
let tmpCalleeParam$105 = typeof tmpUnaryArg$91;
$(tmpCalleeParam$105);
const tmpMCF$79 = $Number_isSafeInteger;
const tmpMCP$79 = $spy(`Number.isSafeInteger`);
const tmpUnaryArg$93 = $dotCall(tmpMCF$79, $number_constructor, `isSafeInteger`, tmpMCP$79);
let tmpCalleeParam$107 = typeof tmpUnaryArg$93;
$(tmpCalleeParam$107);
const tmpMCF$81 = $Number_parseFloat;
const tmpMCP$81 = $spy(`Number.parseFloat`);
const tmpUnaryArg$95 = $dotCall(tmpMCF$81, $number_constructor, `parseFloat`, tmpMCP$81);
let tmpCalleeParam$109 = typeof tmpUnaryArg$95;
$(tmpCalleeParam$109);
const tmpMCF$83 = $Number_parseInt;
const tmpMCP$83 = $spy(`Number.parseInt`);
const tmpUnaryArg$97 = $dotCall(tmpMCF$83, $number_constructor, `parseInt`, tmpMCP$83);
let tmpCalleeParam$111 = typeof tmpUnaryArg$97;
$(tmpCalleeParam$111);
const tmpMCF$85 = $Object_is;
const tmpMCP$85 = $spy(`Object.is`);
const tmpUnaryArg$99 = $dotCall(tmpMCF$85, $object_constructor, `is`, tmpMCP$85);
let tmpCalleeParam$113 = typeof tmpUnaryArg$99;
$(tmpCalleeParam$113);
const tmpMCF$87 = $Object_isFrozen;
const tmpMCP$87 = $spy(`Object.isFrozen`);
const tmpUnaryArg$101 = $dotCall(tmpMCF$87, $object_constructor, `isFrozen`, tmpMCP$87);
let tmpCalleeParam$115 = typeof tmpUnaryArg$101;
$(tmpCalleeParam$115);
const tmpMCF$89 = $Object_isSealed;
const tmpMCP$89 = $spy(`Object.isSealed`);
const tmpUnaryArg$103 = $dotCall(tmpMCF$89, $object_constructor, `isSealed`, tmpMCP$89);
let tmpCalleeParam$117 = typeof tmpUnaryArg$103;
$(tmpCalleeParam$117);
const tmpMCF$91 = $String_fromCharCode;
const tmpMCP$91 = $spy(`String.fromCharCode`);
const tmpUnaryArg$105 = $dotCall(tmpMCF$91, $string_constructor, `fromCharCode`, tmpMCP$91);
let tmpCalleeParam$119 = typeof tmpUnaryArg$105;
$(tmpCalleeParam$119);
const tmpMCF$93 = $String_fromCodePoint;
const tmpMCP$93 = $spy(`String.fromCodePoint`);
const tmpUnaryArg$107 = $dotCall(tmpMCF$93, $string_constructor, `fromCodePoint`, tmpMCP$93);
let tmpCalleeParam$121 = typeof tmpUnaryArg$107;
$(tmpCalleeParam$121);
const tmpMCF$95 = $String_raw;
const tmpMCP$95 = $spy(`String.raw`);
const tmpUnaryArg$109 = $dotCall(tmpMCF$95, $string_constructor, `raw`, tmpMCP$95);
let tmpCalleeParam$123 = typeof tmpUnaryArg$109;
$(tmpCalleeParam$123);
const tmpUnaryArg$111 = $Math_E;
let tmpCalleeParam$125 = typeof tmpUnaryArg$111;
$(tmpCalleeParam$125, `Math.E`);
const tmpUnaryArg$113 = $Math_LN10;
let tmpCalleeParam$127 = typeof tmpUnaryArg$113;
$(tmpCalleeParam$127, `Math.LN10`);
const tmpUnaryArg$115 = $Math_LN2;
let tmpCalleeParam$129 = typeof tmpUnaryArg$115;
$(tmpCalleeParam$129, `Math.LN2`);
const tmpUnaryArg$117 = $Math_LOG10E;
let tmpCalleeParam$131 = typeof tmpUnaryArg$117;
$(tmpCalleeParam$131, `Math.LOG10E`);
const tmpUnaryArg$119 = $Math_LOG2E;
let tmpCalleeParam$133 = typeof tmpUnaryArg$119;
$(tmpCalleeParam$133, `Math.LOG2E`);
const tmpUnaryArg$121 = $Math_PI;
let tmpCalleeParam$135 = typeof tmpUnaryArg$121;
$(tmpCalleeParam$135, `Math.PI`);
const tmpUnaryArg$123 = $Math_SQRT1_2;
let tmpCalleeParam$137 = typeof tmpUnaryArg$123;
$(tmpCalleeParam$137, `Math.SQRT1_2`);
const tmpUnaryArg$125 = $Math_SQRT2;
let tmpCalleeParam$139 = typeof tmpUnaryArg$125;
$(tmpCalleeParam$139, `Math.SQRT2`);
const tmpUnaryArg$127 = $Number_EPSILON;
let tmpCalleeParam$141 = typeof tmpUnaryArg$127;
$(tmpCalleeParam$141, `Number.EPSILON`);
const tmpUnaryArg$129 = $Number_MAX_VALUE;
let tmpCalleeParam$143 = typeof tmpUnaryArg$129;
$(tmpCalleeParam$143, `Number.MAX_VALUE`);
const tmpUnaryArg$131 = $Number_MIN_VALUE;
let tmpCalleeParam$145 = typeof tmpUnaryArg$131;
$(tmpCalleeParam$145, `Number.MIN_VALUE`);
const tmpUnaryArg$133 = $Number_NEGATIVE_INFINITY;
let tmpCalleeParam$147 = typeof tmpUnaryArg$133;
$(tmpCalleeParam$147, `Number.NEGATIVE_INFINITY`);
const tmpUnaryArg$135 = $Number_POSITIVE_INFINITY;
let tmpCalleeParam$149 = typeof tmpUnaryArg$135;
$(tmpCalleeParam$149, `Number.POSITIVE_INFINITY`);
const tmpUnaryArg$137 = $Number_NaN;
let tmpCalleeParam$151 = typeof tmpUnaryArg$137;
$(tmpCalleeParam$151, `Number.NaN`);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $Array_isArray
- (todo) type trackeed tricks can possibly support static $Array_of
- (todo) type trackeed tricks can possibly support static $Date_UTC
- (todo) type trackeed tricks can possibly support static $Date_now
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
- (todo) type trackeed tricks can possibly support static $String_raw
- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
