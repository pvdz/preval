# Preval test case

# nan_op_implicit_x.md

> Normalize > Binary > With > Undefined > Nan op implicit x
>
> Deal with certain primitive with binary ops

#TODO

## Input

`````js filename=intro
const arr = [
  undefined ** x,
  undefined * x,
  undefined / x,
  undefined % x,
  undefined + x,
  undefined - x,
  undefined << x,
  undefined >> x,
  undefined >>> x,
  undefined < x,
  undefined > x,
  undefined <= x,
  undefined >= x,
  undefined == x,
  undefined != x,
  undefined === x,
  undefined !== x,
  undefined & x,
  undefined ^ x,
  undefined | x,
];
$(arr);

const arr2 = [
  undefined in x,
  undefined instanceof x,
];
$(arr2);
`````

## Pre Normal


`````js filename=intro
const arr = [
  undefined ** x,
  undefined * x,
  undefined / x,
  undefined % x,
  undefined + x,
  undefined - x,
  undefined << x,
  undefined >> x,
  undefined >>> x,
  undefined < x,
  undefined > x,
  undefined <= x,
  undefined >= x,
  undefined == x,
  undefined != x,
  undefined === x,
  undefined !== x,
  undefined & x,
  undefined ^ x,
  undefined | x,
];
$(arr);
const arr2 = [undefined in x, undefined instanceof x];
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
const tmpArrElement$7 = undefined + x;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = undefined < x;
const tmpArrElement$19 = undefined > x;
const tmpArrElement$21 = undefined <= x;
const tmpArrElement$23 = undefined >= x;
const tmpArrElement$25 = undefined == x;
const tmpArrElement$27 = undefined != x;
const tmpArrElement$29 = undefined === x;
const tmpArrElement$31 = undefined !== x;
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
const tmpArrElement$39 = undefined in x;
const tmpArrElement$41 = undefined instanceof x;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Output


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = undefined + x;
x ** 0;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = undefined < x;
const tmpArrElement$19 = undefined > x;
const tmpArrElement$21 = undefined <= x;
const tmpArrElement$23 = undefined >= x;
const tmpArrElement$25 = undefined == x;
const tmpArrElement$27 = undefined != x;
const tmpArrElement$29 = undefined === x;
const tmpArrElement$31 = undefined !== x;
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
const tmpArrElement$39 = undefined in x;
const tmpArrElement$41 = undefined instanceof x;
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
const a = undefined + x;
x ** 0;
const b = 0 << x;
const c = 0 >> x;
const d = 0 >>> x;
const e = undefined < x;
const f = undefined > x;
const g = undefined <= x;
const h = undefined >= x;
const i = undefined == x;
const j = undefined != x;
const k = undefined === x;
const l = undefined !== x;
x ** 0;
const m = 0 ^ x;
const n = 0 | x;
const o = [ NaN, NaN, NaN, NaN, a, NaN, b, c, d, e, f, g, h, i, j, k, l, 0, m, n ];
$( o );
const p = undefined in x;
const q = undefined instanceof x;
const r = [ p, q ];
$( r );
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
