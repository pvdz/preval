# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > False > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  false ** x,
  false * x,
  false / x,
  false % x,
  false + x,
  false - x,
  false << x,
  false >> x,
  false >>> x,
  false < x,
  false > x,
  false <= x,
  false >= x,
  false == x,
  false != x,
  false === x,
  false !== x,
  false & x,
  false ^ x,
  false | x,
];
$(arr);
$(false in x);
$(false instanceof x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = 0 ** x;
const tmpArrElement$1 /*:number*/ = 0 * x;
const tmpArrElement$3 /*:number*/ = 0 / x;
const tmpArrElement$5 /*:number*/ = 0 % x;
const tmpArrElement$7 /*:primitive*/ = false + x;
const tmpArrElement$9 /*:number*/ = 0 - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = 0 < x;
const tmpArrElement$19 /*:boolean*/ = 0 > x;
const tmpArrElement$21 /*:boolean*/ = 0 <= x;
const tmpArrElement$23 /*:boolean*/ = 0 >= x;
const tmpArrElement$25 /*:boolean*/ = false == x;
const tmpArrElement$27 /*:boolean*/ = false != x;
const tmpArrElement$29 /*:boolean*/ = false === x;
const tmpArrElement$31 /*:boolean*/ = false !== x;
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
const tmpCalleeParam /*:boolean*/ = false in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = false instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = 0 ** x;
const tmpArrElement$1 = 0 * x;
const tmpArrElement$3 = 0 / x;
const tmpArrElement$5 = 0 % x;
const tmpArrElement$7 = false + x;
const tmpArrElement$9 = 0 - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = 0 < x;
const tmpArrElement$19 = 0 > x;
const tmpArrElement$21 = 0 <= x;
const tmpArrElement$23 = 0 >= x;
const tmpArrElement$25 = false == x;
const tmpArrElement$27 = false != x;
const tmpArrElement$29 = false === x;
const tmpArrElement$31 = false !== x;
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
$(false in x);
$(false instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0 ** x;
const b = 0 * x;
const c = 0 / x;
const d = 0 % x;
const e = false + x;
const f = 0 - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = 0 < x;
const k = 0 > x;
const l = 0 <= x;
const m = 0 >= x;
const n = false == x;
const o = false != x;
const p = false === x;
const q = false !== x;
x ** 0;
const r = 0 ^ x;
const s = 0 | x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = false in x;
$( u );
const v = false instanceof x;
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
