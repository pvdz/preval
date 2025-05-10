# Preval test case

# implicit_x_right.md

> Normalize > Binary > With > Infinity > Implicit x right
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  Infinity ** x,
  Infinity * x,
  Infinity / x,
  Infinity % x,
  Infinity + x,
  Infinity - x,
  Infinity << x,
  Infinity >> x,
  Infinity >>> x,
  Infinity < x,
  Infinity > x,
  Infinity <= x,
  Infinity >= x,
  Infinity == x,
  Infinity != x,
  Infinity === x,
  Infinity !== x,
  Infinity & x,
  Infinity ^ x,
  Infinity | x,
];
$(arr);
$(Infinity in x);
$(Infinity instanceof x);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 /*:number*/ = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 /*:number*/ = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 /*:number*/ = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 /*:primitive*/ = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 /*:number*/ = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 /*:boolean*/ = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 /*:boolean*/ = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 /*:boolean*/ = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 /*:boolean*/ = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 /*:boolean*/ = $Number_POSITIVE_INFINITY != x;
const tmpArrElement$29 /*:boolean*/ = $Number_POSITIVE_INFINITY === x;
const tmpArrElement$31 /*:boolean*/ = $Number_POSITIVE_INFINITY !== x;
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
const tmpCalleeParam /*:boolean*/ = $Number_POSITIVE_INFINITY in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_POSITIVE_INFINITY instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 = $Number_POSITIVE_INFINITY != x;
const tmpArrElement$29 = $Number_POSITIVE_INFINITY === x;
const tmpArrElement$31 = $Number_POSITIVE_INFINITY !== x;
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
$($Number_POSITIVE_INFINITY in x);
$($Number_POSITIVE_INFINITY instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_POSITIVE_INFINITY ** x;
const b = $Number_POSITIVE_INFINITY * x;
const c = $Number_POSITIVE_INFINITY / x;
const d = $Number_POSITIVE_INFINITY % x;
const e = $Number_POSITIVE_INFINITY + x;
const f = $Number_POSITIVE_INFINITY - x;
const g = 0 << x;
const h = 0 >> x;
const i = 0 >>> x;
const j = $Number_POSITIVE_INFINITY < x;
const k = $Number_POSITIVE_INFINITY > x;
const l = $Number_POSITIVE_INFINITY <= x;
const m = $Number_POSITIVE_INFINITY >= x;
const n = $Number_POSITIVE_INFINITY == x;
const o = $Number_POSITIVE_INFINITY != x;
const p = $Number_POSITIVE_INFINITY === x;
const q = $Number_POSITIVE_INFINITY !== x;
x ** 0;
const r = 0 ^ x;
const s = 0 | x;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = $Number_POSITIVE_INFINITY in x;
$( u );
const v = $Number_POSITIVE_INFINITY instanceof x;
$( v );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
