# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Constructor > Nan op implicit x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  String ** x,
  String * x,
  String / x,
  String % x,
  String + x,
  String - x,
  String << x,
  String >> x,
  String >>> x,
  String < x,
  String > x,
  String <= x,
  String >= x,
  String == x,
  String != x,
  String === x,
  String !== x,
  String & x,
  String ^ x,
  String | x,
];
$(arr);

const arr2 = [
  String in x,
  String instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  String ** x,
  String * x,
  String / x,
  String % x,
  String + x,
  String - x,
  String << x,
  String >> x,
  String >>> x,
  String < x,
  String > x,
  String <= x,
  String >= x,
  String == x,
  String != x,
  String === x,
  String !== x,
  String & x,
  String ^ x,
  String | x,
];
$(arr);
const arr2 = [String in x, String instanceof x];
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
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$7 = `function String() { [native code] }${tmpStringConcatL}`;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
const tmpArrElement$25 = String == x;
const tmpArrElement$27 = String != x;
const tmpArrElement$29 = String === x;
const tmpArrElement$31 = String !== x;
x & 0;
const tmpArrElement$33 = 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
const tmpArrElement$39 = String in x;
const tmpArrElement$41 = String instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpStringConcatL = $coerce(x, `plustr`);
const tmpArrElement$7 = `function String() { [native code] }${tmpStringConcatL}`;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = `function String() { [native code] }` < x;
const tmpArrElement$19 = `function String() { [native code] }` > x;
const tmpArrElement$21 = `function String() { [native code] }` <= x;
const tmpArrElement$23 = `function String() { [native code] }` >= x;
const tmpArrElement$25 = String === x;
const tmpArrElement$27 = String !== x;
const tmpArrElement$29 = String === x;
const tmpArrElement$31 = String !== x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
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
const tmpArrElement$39 = String in x;
const tmpArrElement$41 = String instanceof x;
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
const b = `function String() { [native code] }${tmpStringConcatL}`;
x ** 0;
const c = 0 << x;
const d = 0 >> x;
const e = 0 >>> x;
const f = "function String() { [native code] }" < x;
const g = "function String() { [native code] }" > x;
const h = "function String() { [native code] }" <= x;
const i = "function String() { [native code] }" >= x;
const j = String === x;
const k = String !== x;
const l = String === x;
const m = String !== x;
x ** 0;
const n = 0 ^ x;
const o = 0 | x;
const p = [ NaN, NaN, NaN, NaN, b, NaN, c, d, e, f, g, h, i, j, k, l, m, 0, n, o ];
$( p );
const q = String in x;
const r = String instanceof x;
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
