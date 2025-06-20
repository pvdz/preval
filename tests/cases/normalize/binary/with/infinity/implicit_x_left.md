# Preval test case

# implicit_x_left.md

> Normalize > Binary > With > Infinity > Implicit x left
>
> Deal with certain primitive with binary ops

## Options

- globals: x

## Input

`````js filename=intro
const arr = [
  x ** Infinity,
  x * Infinity,
  x / Infinity,
  x % Infinity,
  x + Infinity,
  x - Infinity,
  x << Infinity,
  x >> Infinity,
  x >>> Infinity,
  x < Infinity,
  x > Infinity,
  x <= Infinity,
  x >= Infinity,
  x == Infinity,
  x != Infinity,
  x === Infinity,
  x !== Infinity,
  x & Infinity,
  x ^ Infinity,
  x | Infinity,
];
$(arr);
$(x in Infinity);
$(x instanceof Infinity);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:number*/ = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 /*:number*/ = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 /*:number*/ = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 /*:number*/ = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 /*:primitive*/ = x + $Number_POSITIVE_INFINITY;
const tmpArrElement$9 /*:number*/ = x - $Number_POSITIVE_INFINITY;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < $Number_POSITIVE_INFINITY;
const tmpArrElement$19 /*:boolean*/ = x > $Number_POSITIVE_INFINITY;
const tmpArrElement$21 /*:boolean*/ = x <= $Number_POSITIVE_INFINITY;
const tmpArrElement$23 /*:boolean*/ = x >= $Number_POSITIVE_INFINITY;
const tmpArrElement$25 /*:boolean*/ = x == $Number_POSITIVE_INFINITY;
const tmpArrElement$27 /*:boolean*/ = x != $Number_POSITIVE_INFINITY;
const tmpArrElement$29 /*:boolean*/ = x === $Number_POSITIVE_INFINITY;
const tmpArrElement$31 /*:boolean*/ = x !== $Number_POSITIVE_INFINITY;
x ** 0;
const tmpArrElement$35 /*:number*/ /*^0*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ /*|0*/ = x | 0;
const arr /*:array*/ /*truthy*/ = [
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
const tmpCalleeParam /*:boolean*/ = x in $Number_POSITIVE_INFINITY;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof $Number_POSITIVE_INFINITY;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 = x + $Number_POSITIVE_INFINITY;
const tmpArrElement$9 = x - $Number_POSITIVE_INFINITY;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < $Number_POSITIVE_INFINITY;
const tmpArrElement$19 = x > $Number_POSITIVE_INFINITY;
const tmpArrElement$21 = x <= $Number_POSITIVE_INFINITY;
const tmpArrElement$23 = x >= $Number_POSITIVE_INFINITY;
const tmpArrElement$25 = x == $Number_POSITIVE_INFINITY;
const tmpArrElement$27 = x != $Number_POSITIVE_INFINITY;
const tmpArrElement$29 = x === $Number_POSITIVE_INFINITY;
const tmpArrElement$31 = x !== $Number_POSITIVE_INFINITY;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
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
$(x in $Number_POSITIVE_INFINITY);
$(x instanceof $Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = x ** $Number_POSITIVE_INFINITY;
const b = x * $Number_POSITIVE_INFINITY;
const c = x / $Number_POSITIVE_INFINITY;
const d = x % $Number_POSITIVE_INFINITY;
const e = x + $Number_POSITIVE_INFINITY;
const f = x - $Number_POSITIVE_INFINITY;
const g = x << 0;
const h = x >> 0;
const i = x >>> 0;
const j = x < $Number_POSITIVE_INFINITY;
const k = x > $Number_POSITIVE_INFINITY;
const l = x <= $Number_POSITIVE_INFINITY;
const m = x >= $Number_POSITIVE_INFINITY;
const n = x == $Number_POSITIVE_INFINITY;
const o = x != $Number_POSITIVE_INFINITY;
const p = x === $Number_POSITIVE_INFINITY;
const q = x !== $Number_POSITIVE_INFINITY;
x ** 0;
const r = x ^ 0;
const s = x | 0;
const t = [ a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, 0, r, s ];
$( t );
const u = x in $Number_POSITIVE_INFINITY;
$( u );
const v = x instanceof $Number_POSITIVE_INFINITY;
$( v );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = x ** Infinity;
const tmpArrElement$1 = x * Infinity;
const tmpArrElement$3 = x / Infinity;
const tmpArrElement$5 = x % Infinity;
const tmpArrElement$7 = x + Infinity;
const tmpArrElement$9 = x - Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < Infinity;
const tmpArrElement$19 = x > Infinity;
const tmpArrElement$21 = x <= Infinity;
const tmpArrElement$23 = x >= Infinity;
const tmpArrElement$25 = x == Infinity;
const tmpArrElement$27 = x != Infinity;
const tmpArrElement$29 = x === Infinity;
const tmpArrElement$31 = x !== Infinity;
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
let tmpCalleeParam = x in Infinity;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof Infinity;
$(tmpCalleeParam$1);
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
