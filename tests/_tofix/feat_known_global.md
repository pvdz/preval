# Preval test case

# feat_known_global.md

> Tofix > feat known global
>
> A simple check for all the (supported) builtins and whether Preval's type inference properly picks up on their return value.

known globals dont need a side-effect-expression-statement. see isNaN and isFinite here
same for `arguments`?

existing test

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

## Pre Normal


`````js filename=intro
$(typeof String($spy(`String`)));
$(typeof Number($spy(`Number`)));
$(typeof Boolean($spy(`Boolean`)));
$(typeof parseInt($spy(`parseInt`)));
$(typeof parseFloat($spy(`parseFloat`)));
$(typeof isNaN($spy(`isNaN`)));
$(typeof isFinite($spy(`isFinite`)));
$(typeof Array.from($spy(`Array.from`)));
$(typeof Array.isArray($spy(`Array.isArray`)));
$(typeof Array.of($spy(`Array.of`)));
$(typeof Date.now($spy(`Date.now`)));
$(typeof Date.UTC($spy(`Date.UTC`)));
$(typeof Date.parse($spy(`Date.parse`)));
$(typeof JSON.stringify($spy(`JSON.stringify`)));
$(typeof Math.abs($spy(`Math.abs`)));
$(typeof Math.acos($spy(`Math.acos`)));
$(typeof Math.acosh($spy(`Math.acosh`)));
$(typeof Math.asin($spy(`Math.asin`)));
$(typeof Math.asinh($spy(`Math.asinh`)));
$(typeof Math.atan($spy(`Math.atan`)));
$(typeof Math.atan2($spy(`Math.atan2`)));
$(typeof Math.atanh($spy(`Math.atanh`)));
$(typeof Math.cbrt($spy(`Math.cbrt`)));
$(typeof Math.ceil($spy(`Math.ceil`)));
$(typeof Math.clz32($spy(`Math.clz32`)));
$(typeof Math.cos($spy(`Math.cos`)));
$(typeof Math.cosh($spy(`Math.cosh`)));
$(typeof Math.exp($spy(`Math.exp`)));
$(typeof Math.expm1($spy(`Math.expm1`)));
$(typeof Math.floor($spy(`Math.floor`)));
$(typeof Math.fround($spy(`Math.fround`)));
$(typeof Math.hypot($spy(`Math.hypot`)));
$(typeof Math.imul($spy(`Math.imul`)));
$(typeof Math.log($spy(`Math.log`)));
$(typeof Math.log10($spy(`Math.log10`)));
$(typeof Math.log1p($spy(`Math.log1p`)));
$(typeof Math.log2($spy(`Math.log2`)));
$(typeof Math.max($spy(`Math.max`)));
$(typeof Math.min($spy(`Math.min`)));
$(typeof Math.pow($spy(`Math.pow`)));
$(typeof Math.random($spy(`Math.random`)));
$(typeof Math.round($spy(`Math.round`)));
$(typeof Math.sign($spy(`Math.sign`)));
$(typeof Math.sin($spy(`Math.sin`)));
$(typeof Number.isFinite($spy(`Number.isFinite`)));
$(typeof Number.isInteger($spy(`Number.isInteger`)));
$(typeof Number.isNaN($spy(`Number.isNaN`)));
$(typeof Number.isSafeInteger($spy(`Number.isSafeInteger`)));
$(typeof Number.parseFloat($spy(`Number.parseFloat`)));
$(typeof Number.parseInt($spy(`Number.parseInt`)));
$(typeof Object.is($spy(`Object.is`)));
$(typeof Object.isFrozen($spy(`Object.isFrozen`)));
$(typeof Object.isSealed($spy(`Object.isSealed`)));
$(typeof String.fromCharCode($spy(`String.fromCharCode`)));
$(typeof String.fromCodePoint($spy(`String.fromCodePoint`)));
$(typeof String.raw($spy(`String.raw`)));
$(typeof Math.E, `Math.E`);
$(typeof Math.LN10, `Math.LN10`);
$(typeof Math.LN2, `Math.LN2`);
$(typeof Math.LOG10E, `Math.LOG10E`);
$(typeof Math.LOG2E, `Math.LOG2E`);
$(typeof Math.PI, `Math.PI`);
$(typeof Math.SQRT1_2, `Math.SQRT1_2`);
$(typeof Math.SQRT2, `Math.SQRT2`);
$(typeof Number.EPSILON, `Number.EPSILON`);
$(typeof Number.MAX_VALUE, `Number.MAX_VALUE`);
$(typeof Number.MIN_VALUE, `Number.MIN_VALUE`);
$(typeof Number.NEGATIVE_INFINITY, `Number.NEGATIVE_INFINITY`);
$(typeof Number.POSITIVE_INFINITY, `Number.POSITIVE_INFINITY`);
$(typeof Number.NaN, `Number.NaN`);
`````

## Normalized


`````js filename=intro
const tmpStringFirstArg = $spy(`String`);
const tmpUnaryArg = $coerce(tmpStringFirstArg, `string`);
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
const tmpStringFirstArg$1 = $spy(`Number`);
const tmpUnaryArg$1 = $coerce(tmpStringFirstArg$1, `number`);
const tmpCalleeParam$1 = typeof tmpUnaryArg$1;
$(tmpCalleeParam$1);
const tmpCalleeParam$5 = $spy(`Boolean`);
const tmpUnaryArg$3 = Boolean(tmpCalleeParam$5);
const tmpCalleeParam$3 = typeof tmpUnaryArg$3;
$(tmpCalleeParam$3);
const tmpCalleeParam$9 = $spy(`parseInt`);
const tmpUnaryArg$5 = parseInt(tmpCalleeParam$9);
const tmpCalleeParam$7 = typeof tmpUnaryArg$5;
$(tmpCalleeParam$7);
const tmpCalleeParam$13 = $spy(`parseFloat`);
const tmpUnaryArg$7 = parseFloat(tmpCalleeParam$13);
const tmpCalleeParam$11 = typeof tmpUnaryArg$7;
$(tmpCalleeParam$11);
const tmpCalleeParam$17 = $spy(`isNaN`);
const tmpUnaryArg$9 = isNaN(tmpCalleeParam$17);
const tmpCalleeParam$15 = typeof tmpUnaryArg$9;
$(tmpCalleeParam$15);
const tmpCalleeParam$21 = $spy(`isFinite`);
const tmpUnaryArg$11 = isFinite(tmpCalleeParam$21);
const tmpCalleeParam$19 = typeof tmpUnaryArg$11;
$(tmpCalleeParam$19);
const tmpCalleeParam$25 = $spy(`Array.from`);
const tmpUnaryArg$13 = $Array_from(tmpCalleeParam$25);
const tmpCalleeParam$23 = typeof tmpUnaryArg$13;
$(tmpCalleeParam$23);
const tmpCalleeParam$29 = $spy(`Array.isArray`);
const tmpUnaryArg$15 = $Array_isArray(tmpCalleeParam$29);
const tmpCalleeParam$27 = typeof tmpUnaryArg$15;
$(tmpCalleeParam$27);
const tmpCalleeParam$33 = $spy(`Array.of`);
const tmpUnaryArg$17 = $Array_of(tmpCalleeParam$33);
const tmpCalleeParam$31 = typeof tmpUnaryArg$17;
$(tmpCalleeParam$31);
const tmpCalleeParam$37 = $spy(`Date.now`);
const tmpUnaryArg$19 = $Date_now(tmpCalleeParam$37);
const tmpCalleeParam$35 = typeof tmpUnaryArg$19;
$(tmpCalleeParam$35);
const tmpCalleeParam$41 = $spy(`Date.UTC`);
const tmpUnaryArg$21 = $Date_UTC(tmpCalleeParam$41);
const tmpCalleeParam$39 = typeof tmpUnaryArg$21;
$(tmpCalleeParam$39);
const tmpCalleeParam$45 = $spy(`Date.parse`);
const tmpUnaryArg$23 = $Date_parse(tmpCalleeParam$45);
const tmpCalleeParam$43 = typeof tmpUnaryArg$23;
$(tmpCalleeParam$43);
const tmpCalleeParam$49 = $spy(`JSON.stringify`);
const tmpUnaryArg$25 = $JSON_stringify(tmpCalleeParam$49);
const tmpCalleeParam$47 = typeof tmpUnaryArg$25;
$(tmpCalleeParam$47);
const tmpCalleeParam$53 = $spy(`Math.abs`);
const tmpUnaryArg$27 = $Math_abs(tmpCalleeParam$53);
const tmpCalleeParam$51 = typeof tmpUnaryArg$27;
$(tmpCalleeParam$51);
const tmpCalleeParam$57 = $spy(`Math.acos`);
const tmpUnaryArg$29 = $Math_acos(tmpCalleeParam$57);
const tmpCalleeParam$55 = typeof tmpUnaryArg$29;
$(tmpCalleeParam$55);
const tmpCalleeParam$61 = $spy(`Math.acosh`);
const tmpUnaryArg$31 = $Math_acosh(tmpCalleeParam$61);
const tmpCalleeParam$59 = typeof tmpUnaryArg$31;
$(tmpCalleeParam$59);
const tmpCalleeParam$65 = $spy(`Math.asin`);
const tmpUnaryArg$33 = $Math_asin(tmpCalleeParam$65);
const tmpCalleeParam$63 = typeof tmpUnaryArg$33;
$(tmpCalleeParam$63);
const tmpCalleeParam$69 = $spy(`Math.asinh`);
const tmpUnaryArg$35 = $Math_asinh(tmpCalleeParam$69);
const tmpCalleeParam$67 = typeof tmpUnaryArg$35;
$(tmpCalleeParam$67);
const tmpCalleeParam$73 = $spy(`Math.atan`);
const tmpUnaryArg$37 = $Math_atan(tmpCalleeParam$73);
const tmpCalleeParam$71 = typeof tmpUnaryArg$37;
$(tmpCalleeParam$71);
const tmpCalleeParam$77 = $spy(`Math.atan2`);
const tmpUnaryArg$39 = $Math_atan2(tmpCalleeParam$77);
const tmpCalleeParam$75 = typeof tmpUnaryArg$39;
$(tmpCalleeParam$75);
const tmpCalleeParam$81 = $spy(`Math.atanh`);
const tmpUnaryArg$41 = $Math_atanh(tmpCalleeParam$81);
const tmpCalleeParam$79 = typeof tmpUnaryArg$41;
$(tmpCalleeParam$79);
const tmpCalleeParam$85 = $spy(`Math.cbrt`);
const tmpUnaryArg$43 = $Math_cbrt(tmpCalleeParam$85);
const tmpCalleeParam$83 = typeof tmpUnaryArg$43;
$(tmpCalleeParam$83);
const tmpCalleeParam$89 = $spy(`Math.ceil`);
const tmpUnaryArg$45 = $Math_ceil(tmpCalleeParam$89);
const tmpCalleeParam$87 = typeof tmpUnaryArg$45;
$(tmpCalleeParam$87);
const tmpCalleeParam$93 = $spy(`Math.clz32`);
const tmpUnaryArg$47 = $Math_clz32(tmpCalleeParam$93);
const tmpCalleeParam$91 = typeof tmpUnaryArg$47;
$(tmpCalleeParam$91);
const tmpCalleeParam$97 = $spy(`Math.cos`);
const tmpUnaryArg$49 = $Math_cos(tmpCalleeParam$97);
const tmpCalleeParam$95 = typeof tmpUnaryArg$49;
$(tmpCalleeParam$95);
const tmpCalleeParam$101 = $spy(`Math.cosh`);
const tmpUnaryArg$51 = $Math_cosh(tmpCalleeParam$101);
const tmpCalleeParam$99 = typeof tmpUnaryArg$51;
$(tmpCalleeParam$99);
const tmpCalleeParam$105 = $spy(`Math.exp`);
const tmpUnaryArg$53 = $Math_exp(tmpCalleeParam$105);
const tmpCalleeParam$103 = typeof tmpUnaryArg$53;
$(tmpCalleeParam$103);
const tmpCalleeParam$109 = $spy(`Math.expm1`);
const tmpUnaryArg$55 = $Math_expm1(tmpCalleeParam$109);
const tmpCalleeParam$107 = typeof tmpUnaryArg$55;
$(tmpCalleeParam$107);
const tmpCalleeParam$113 = $spy(`Math.floor`);
const tmpUnaryArg$57 = $Math_floor(tmpCalleeParam$113);
const tmpCalleeParam$111 = typeof tmpUnaryArg$57;
$(tmpCalleeParam$111);
const tmpCalleeParam$117 = $spy(`Math.fround`);
const tmpUnaryArg$59 = $Math_fround(tmpCalleeParam$117);
const tmpCalleeParam$115 = typeof tmpUnaryArg$59;
$(tmpCalleeParam$115);
const tmpCalleeParam$121 = $spy(`Math.hypot`);
const tmpUnaryArg$61 = $Math_hypot(tmpCalleeParam$121);
const tmpCalleeParam$119 = typeof tmpUnaryArg$61;
$(tmpCalleeParam$119);
const tmpCalleeParam$125 = $spy(`Math.imul`);
const tmpUnaryArg$63 = $Math_imul(tmpCalleeParam$125);
const tmpCalleeParam$123 = typeof tmpUnaryArg$63;
$(tmpCalleeParam$123);
const tmpCalleeParam$129 = $spy(`Math.log`);
const tmpUnaryArg$65 = $Math_log(tmpCalleeParam$129);
const tmpCalleeParam$127 = typeof tmpUnaryArg$65;
$(tmpCalleeParam$127);
const tmpCalleeParam$133 = $spy(`Math.log10`);
const tmpUnaryArg$67 = $Math_log10(tmpCalleeParam$133);
const tmpCalleeParam$131 = typeof tmpUnaryArg$67;
$(tmpCalleeParam$131);
const tmpCalleeParam$137 = $spy(`Math.log1p`);
const tmpUnaryArg$69 = $Math_log1p(tmpCalleeParam$137);
const tmpCalleeParam$135 = typeof tmpUnaryArg$69;
$(tmpCalleeParam$135);
const tmpCalleeParam$141 = $spy(`Math.log2`);
const tmpUnaryArg$71 = $Math_log2(tmpCalleeParam$141);
const tmpCalleeParam$139 = typeof tmpUnaryArg$71;
$(tmpCalleeParam$139);
const tmpCalleeParam$145 = $spy(`Math.max`);
const tmpUnaryArg$73 = $Math_max(tmpCalleeParam$145);
const tmpCalleeParam$143 = typeof tmpUnaryArg$73;
$(tmpCalleeParam$143);
const tmpCalleeParam$149 = $spy(`Math.min`);
const tmpUnaryArg$75 = $Math_min(tmpCalleeParam$149);
const tmpCalleeParam$147 = typeof tmpUnaryArg$75;
$(tmpCalleeParam$147);
const tmpCalleeParam$153 = $spy(`Math.pow`);
const tmpUnaryArg$77 = $Math_pow(tmpCalleeParam$153);
const tmpCalleeParam$151 = typeof tmpUnaryArg$77;
$(tmpCalleeParam$151);
const tmpCalleeParam$157 = $spy(`Math.random`);
const tmpUnaryArg$79 = $Math_random(tmpCalleeParam$157);
const tmpCalleeParam$155 = typeof tmpUnaryArg$79;
$(tmpCalleeParam$155);
const tmpCalleeParam$161 = $spy(`Math.round`);
const tmpUnaryArg$81 = $Math_round(tmpCalleeParam$161);
const tmpCalleeParam$159 = typeof tmpUnaryArg$81;
$(tmpCalleeParam$159);
const tmpCalleeParam$165 = $spy(`Math.sign`);
const tmpUnaryArg$83 = $Math_sign(tmpCalleeParam$165);
const tmpCalleeParam$163 = typeof tmpUnaryArg$83;
$(tmpCalleeParam$163);
const tmpCalleeParam$169 = $spy(`Math.sin`);
const tmpUnaryArg$85 = $Math_sin(tmpCalleeParam$169);
const tmpCalleeParam$167 = typeof tmpUnaryArg$85;
$(tmpCalleeParam$167);
const tmpCalleeParam$173 = $spy(`Number.isFinite`);
const tmpUnaryArg$87 = $Number_isFinite(tmpCalleeParam$173);
const tmpCalleeParam$171 = typeof tmpUnaryArg$87;
$(tmpCalleeParam$171);
const tmpCalleeParam$177 = $spy(`Number.isInteger`);
const tmpUnaryArg$89 = $Number_isInteger(tmpCalleeParam$177);
const tmpCalleeParam$175 = typeof tmpUnaryArg$89;
$(tmpCalleeParam$175);
const tmpCalleeParam$181 = $spy(`Number.isNaN`);
const tmpUnaryArg$91 = $Number_isNaN(tmpCalleeParam$181);
const tmpCalleeParam$179 = typeof tmpUnaryArg$91;
$(tmpCalleeParam$179);
const tmpCalleeParam$185 = $spy(`Number.isSafeInteger`);
const tmpUnaryArg$93 = $Number_isSafeInteger(tmpCalleeParam$185);
const tmpCalleeParam$183 = typeof tmpUnaryArg$93;
$(tmpCalleeParam$183);
const tmpCalleeParam$189 = $spy(`Number.parseFloat`);
const tmpUnaryArg$95 = $Number_parseFloat(tmpCalleeParam$189);
const tmpCalleeParam$187 = typeof tmpUnaryArg$95;
$(tmpCalleeParam$187);
const tmpCalleeParam$193 = $spy(`Number.parseInt`);
const tmpUnaryArg$97 = $Number_parseInt(tmpCalleeParam$193);
const tmpCalleeParam$191 = typeof tmpUnaryArg$97;
$(tmpCalleeParam$191);
const tmpCalleeParam$197 = $spy(`Object.is`);
const tmpUnaryArg$99 = $Object_is(tmpCalleeParam$197);
const tmpCalleeParam$195 = typeof tmpUnaryArg$99;
$(tmpCalleeParam$195);
const tmpCalleeParam$201 = $spy(`Object.isFrozen`);
const tmpUnaryArg$101 = $Object_isFrozen(tmpCalleeParam$201);
const tmpCalleeParam$199 = typeof tmpUnaryArg$101;
$(tmpCalleeParam$199);
const tmpCalleeParam$205 = $spy(`Object.isSealed`);
const tmpUnaryArg$103 = $Object_isSealed(tmpCalleeParam$205);
const tmpCalleeParam$203 = typeof tmpUnaryArg$103;
$(tmpCalleeParam$203);
const tmpCalleeParam$209 = $spy(`String.fromCharCode`);
const tmpUnaryArg$105 = $String_fromCharCode(tmpCalleeParam$209);
const tmpCalleeParam$207 = typeof tmpUnaryArg$105;
$(tmpCalleeParam$207);
const tmpCalleeParam$213 = $spy(`String.fromCodePoint`);
const tmpUnaryArg$107 = $String_fromCodePoint(tmpCalleeParam$213);
const tmpCalleeParam$211 = typeof tmpUnaryArg$107;
$(tmpCalleeParam$211);
const tmpCalleeParam$217 = $spy(`String.raw`);
const tmpUnaryArg$109 = $String_raw(tmpCalleeParam$217);
const tmpCalleeParam$215 = typeof tmpUnaryArg$109;
$(tmpCalleeParam$215);
const tmpUnaryArg$111 = $Math_E;
const tmpCalleeParam$219 = typeof tmpUnaryArg$111;
$(tmpCalleeParam$219, `Math.E`);
const tmpUnaryArg$113 = $Math_LN10;
const tmpCalleeParam$221 = typeof tmpUnaryArg$113;
$(tmpCalleeParam$221, `Math.LN10`);
const tmpUnaryArg$115 = $Math_LN2;
const tmpCalleeParam$223 = typeof tmpUnaryArg$115;
$(tmpCalleeParam$223, `Math.LN2`);
const tmpUnaryArg$117 = $Math_LOG10E;
const tmpCalleeParam$225 = typeof tmpUnaryArg$117;
$(tmpCalleeParam$225, `Math.LOG10E`);
const tmpUnaryArg$119 = $Math_LOG2E;
const tmpCalleeParam$227 = typeof tmpUnaryArg$119;
$(tmpCalleeParam$227, `Math.LOG2E`);
const tmpUnaryArg$121 = $Math_PI;
const tmpCalleeParam$229 = typeof tmpUnaryArg$121;
$(tmpCalleeParam$229, `Math.PI`);
const tmpUnaryArg$123 = $Math_SQRT1_2;
const tmpCalleeParam$231 = typeof tmpUnaryArg$123;
$(tmpCalleeParam$231, `Math.SQRT1_2`);
const tmpUnaryArg$125 = $Math_SQRT2;
const tmpCalleeParam$233 = typeof tmpUnaryArg$125;
$(tmpCalleeParam$233, `Math.SQRT2`);
const tmpUnaryArg$127 = $Number_EPSILON;
const tmpCalleeParam$235 = typeof tmpUnaryArg$127;
$(tmpCalleeParam$235, `Number.EPSILON`);
const tmpUnaryArg$129 = $Number_MAX_VALUE;
const tmpCalleeParam$237 = typeof tmpUnaryArg$129;
$(tmpCalleeParam$237, `Number.MAX_VALUE`);
const tmpUnaryArg$131 = $Number_MIN_VALUE;
const tmpCalleeParam$239 = typeof tmpUnaryArg$131;
$(tmpCalleeParam$239, `Number.MIN_VALUE`);
const tmpUnaryArg$133 = -Infinity;
const tmpCalleeParam$241 = typeof tmpUnaryArg$133;
$(tmpCalleeParam$241, `Number.NEGATIVE_INFINITY`);
const tmpUnaryArg$135 = Infinity;
const tmpCalleeParam$243 = typeof tmpUnaryArg$135;
$(tmpCalleeParam$243, `Number.POSITIVE_INFINITY`);
const tmpUnaryArg$137 = NaN;
const tmpCalleeParam$245 = typeof tmpUnaryArg$137;
$(tmpCalleeParam$245, `Number.NaN`);
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Array_from
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Array_isArray
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Array_of
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Date_now
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Date_UTC
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Date_parse
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $JSON_stringify
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_abs
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_acos
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_acosh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_asin
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_asinh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atan
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atan2
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_atanh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_cbrt
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_ceil
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_clz32
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_cos
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_cosh
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_exp
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_expm1
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_floor
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_fround
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_hypot
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_imul
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log10
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log1p
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_log2
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_max
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_min
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_pow
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_random
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_round
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_sign
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_sin
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_isFinite
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_isInteger
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_isNaN
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_isSafeInteger
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_parseFloat
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Number_parseInt
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Object_is
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Object_isFrozen
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Object_isSealed
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $String_fromCodePoint
- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $String_raw
