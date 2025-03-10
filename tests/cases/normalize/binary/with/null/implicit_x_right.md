# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > Null > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);
$(null in x);
$(null instanceof x);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:primitive*/ = null + x;
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = 0 < x;
const tmpArrElement$19 /*:boolean*/ = 0 > x;
const tmpArrElement$21 /*:boolean*/ = 0 <= x;
const tmpArrElement$23 /*:boolean*/ = 0 >= x;
const tmpArrElement$25 /*:boolean*/ = null == x;
const tmpArrElement$27 /*:boolean*/ = null != x;
const tmpArrElement$29 /*:boolean*/ = null === x;
const tmpArrElement$31 /*:boolean*/ = null !== x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = null in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = null instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = 0 < x;
const tmpArrElement$19 = 0 > x;
const tmpArrElement$21 = 0 <= x;
const tmpArrElement$23 = 0 >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
$([
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
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(null in x);
$(null instanceof x);
`````

## Pre Normal


`````js filename=intro
const arr = [
  null ** x,
  null * x,
  null / x,
  null % x,
  null + x,
  null - x,
  null << x,
  null >> x,
  null >>> x,
  null < x,
  null > x,
  null <= x,
  null >= x,
  null == x,
  null != x,
  null === x,
  null !== x,
  null & x,
  null ^ x,
  null | x,
];
$(arr);
$(null in x);
$(null instanceof x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = null + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = 0 < x;
const tmpArrElement$19 = 0 > x;
const tmpArrElement$21 = 0 <= x;
const tmpArrElement$23 = 0 >= x;
const tmpArrElement$25 = null == x;
const tmpArrElement$27 = null != x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
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
const tmpCalleeParam = null in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = null instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 0 ** x;
const b = 0 * x;
const c = 0 / x;
const d = 0 % x;
const e = null + x;
const f = 0 - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = 0 < x;
const k = 0 > x;
const l = 0 <= x;
const m = 0 >= x;
const n = null == x;
const o = null != x;
const p = null === x;
const q = null !== x;
x ** 0;
const r = 0 ^ x;
const s = 0 | x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = null in x;
$( u );
const v = null instanceof x;
$( v );
`````

## Globals

None (except for the 1 globals expected by the test)

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
