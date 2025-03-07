# Preval test case

# implicit_x_op_nan.md

> Normalize > Binary > With > Undefined > Implicit x op nan
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  x ** undefined,
  x * undefined,
  x / undefined,
  x % undefined,
  x + undefined,
  x - undefined,
  x << undefined,
  x >> undefined,
  x >>> undefined,
  x < undefined,
  x > undefined,
  x <= undefined,
  x >= undefined,
  x == undefined,
  x != undefined,
  x === undefined,
  x !== undefined,
  x & undefined,
  x ^ undefined,
  x | undefined,
];
$(arr);

const arr2 = [
  x in undefined,
  x instanceof undefined,
];
$(arr2);
`````

## Settled


`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 /*:primitive*/ = x + undefined;
x ** 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < undefined;
const tmpArrElement$19 /*:boolean*/ = x > undefined;
const tmpArrElement$21 /*:boolean*/ = x <= undefined;
const tmpArrElement$23 /*:boolean*/ = x >= undefined;
const tmpArrElement$25 /*:boolean*/ = x == undefined;
const tmpArrElement$27 /*:boolean*/ = x != undefined;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === undefined;
const tmpArrElement$31 /*:boolean*/ = x !== undefined;
const arr /*:array*/ = [
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
const tmpArrElement$39 /*:boolean*/ = x in undefined;
const tmpArrElement$41 /*:boolean*/ = x instanceof undefined;
const arr2 /*:array*/ = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const tmpArrElement$7 = x + undefined;
x ** 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < undefined;
const tmpArrElement$19 = x > undefined;
const tmpArrElement$21 = x <= undefined;
const tmpArrElement$23 = x >= undefined;
const tmpArrElement$25 = x == undefined;
const tmpArrElement$27 = x != undefined;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$29 = x === undefined;
const tmpArrElement$31 = x !== undefined;
$([
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
]);
const tmpArrElement$39 = x in undefined;
const tmpArrElement$41 = x instanceof undefined;
$([tmpArrElement$39, tmpArrElement$41]);
`````

## Pre Normal


`````js filename=intro
const arr = [
  x ** undefined,
  x * undefined,
  x / undefined,
  x % undefined,
  x + undefined,
  x - undefined,
  x << undefined,
  x >> undefined,
  x >>> undefined,
  x < undefined,
  x > undefined,
  x <= undefined,
  x >= undefined,
  x == undefined,
  x != undefined,
  x === undefined,
  x !== undefined,
  x & undefined,
  x ^ undefined,
  x | undefined,
];
$(arr);
const arr2 = [x in undefined, x instanceof undefined];
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
const tmpArrElement$7 = x + undefined;
x * 0;
const tmpArrElement$9 = NaN;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < undefined;
const tmpArrElement$19 = x > undefined;
const tmpArrElement$21 = x <= undefined;
const tmpArrElement$23 = x >= undefined;
const tmpArrElement$25 = x == undefined;
const tmpArrElement$27 = x != undefined;
const tmpArrElement$29 = x === undefined;
const tmpArrElement$31 = x !== undefined;
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
const tmpArrElement$39 = x in undefined;
const tmpArrElement$41 = x instanceof undefined;
const arr2 = [tmpArrElement$39, tmpArrElement$41];
$(arr2);
`````

## PST Settled
With rename=true

`````js filename=intro
x ** 0;
x ** 0;
x ** 0;
x ** 0;
const a = x + undefined;
x ** 0;
const b = x << 0;
const c = x >> 0;
const d = x >>> 0;
const e = x < undefined;
const f = x > undefined;
const g = x <= undefined;
const h = x >= undefined;
const i = x == undefined;
const j = x != undefined;
x ** 0;
const k = x ^ 0;
const l = x | 0;
const m = x === undefined;
const n = x !== undefined;
const o = [ NaN, NaN, NaN, NaN, a, NaN, b, c, d, e, f, g, h, i, j, m, n, 0, k, l ];
$( o );
const p = x in undefined;
const q = x instanceof undefined;
const r = [ p, q ];
$( r );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
