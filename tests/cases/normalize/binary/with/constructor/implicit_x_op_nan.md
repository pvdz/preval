# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Constructor > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  x ** String,
  x * String,
  x / String,
  x % String,
  x + String,
  x - String,
  x << String,
  x >> String,
  x >>> String,
  x < String,
  x > String,
  x <= String,
  x >= String,
  x == String,
  x != String,
  x === String,
  x !== String,
  x & String,
  x ^ String,
  x | String,
];
$(arr);

const arr2 = [
  x in String,
  x instanceof String,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** String,
  x * String,
  x / String,
  x % String,
  x + String,
  x - String,
  x << String,
  x >> String,
  x >>> String,
  x < String,
  x > String,
  x <= String,
  x >= String,
  x == String,
  x != String,
  x === String,
  x !== String,
  x & String,
  x ^ String,
  x | String,
];
$(arr);
const arr2 = [x in String, x instanceof String];
$(arr2);
`````

## Normalized


`````js filename=intro
x * 0;
const tmpArrElement = NaN;
x * 0;
const tmpArrElement$1 = NaN;
x * 0;
const tmpArrElement$3 = NaN;
x * 0;
const tmpArrElement$5 = NaN;
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x == String;
const tmpArrElement$27 = x != String;
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const arr = [
  tmpArrElement,
  tmpArrElement$1,
  tmpArrElement$3,
  tmpArrElement$5,
  tmpArrElement$7,
  tmpArrElement$9,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatR = $coerce(x, `plustr`);
const tmpArrElement$7 = `${tmpStringConcatR}function String() { [native code] }`;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < `function String() { [native code] }`;
const tmpArrElement$19 = x > `function String() { [native code] }`;
const tmpArrElement$21 = x <= `function String() { [native code] }`;
const tmpArrElement$23 = x >= `function String() { [native code] }`;
const tmpArrElement$25 = x === String;
const tmpArrElement$27 = x !== String;
const tmpArrElement$29 = x === String;
const tmpArrElement$31 = x !== String;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const arr = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  tmpArrElement$17,
  tmpArrElement$19,
  tmpArrElement$21,
  tmpArrElement$23,
  tmpArrElement$25,
  tmpArrElement$27,
  tmpArrElement$29,
  tmpArrElement$31,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpArrElement$39 = x in String;
const tmpArrElement$41 = x instanceof String;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Output

With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = $coerce( x, "plustr" );
const b = `${tmpStringConcatR}function String() { [native code] }`;
x ** 0;
const c = x << 0;
const d = x >> 0;
const e = x >>> 0;
const f = x < "function String() { [native code] }";
const g = x > "function String() { [native code] }";
const h = x <= "function String() { [native code] }";
const i = x >= "function String() { [native code] }";
const j = x === String;
const k = x !== String;
const l = x === String;
const m = x !== String;
x ** 0;
const n = x ^ 0;
const o = x | 0;
const p = [ NaN, NaN, NaN, NaN, b, NaN, c, d, e, f, g, h, i, j, k, l, m, 0, n, o ];
$( p );
const q = x in String;
const r = x instanceof String;
const s = [ q, r ];
$( s );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
