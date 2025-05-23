# Preval test case

# spy_left.md

> Normalize > Binary > With > Neg infinity > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();

const arr = [
  x ** -Infinity,
  x * -Infinity,
  x / -Infinity,
  x % -Infinity,
  x + -Infinity,
  x - -Infinity,
  x << -Infinity,
  x >> -Infinity,
  x >>> -Infinity,
  x < -Infinity,
  x > -Infinity,
  x <= -Infinity,
  x >= -Infinity,
  x == -Infinity,
  x != -Infinity,
  x === -Infinity,
  x !== -Infinity,
  x & -Infinity,
  x ^ -Infinity,
  x | -Infinity,
];
$(arr);
$(x in -Infinity);
$(x instanceof -Infinity);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = x ** $Number_NEGATIVE_INFINITY;
const tmpArrElement$1 /*:number*/ = x * $Number_NEGATIVE_INFINITY;
const tmpArrElement$3 /*:number*/ = x / $Number_NEGATIVE_INFINITY;
const tmpArrElement$5 /*:number*/ = x % $Number_NEGATIVE_INFINITY;
const tmpArrElement$7 /*:primitive*/ = x + $Number_NEGATIVE_INFINITY;
const tmpArrElement$9 /*:number*/ = x - $Number_NEGATIVE_INFINITY;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < $Number_NEGATIVE_INFINITY;
const tmpArrElement$19 /*:boolean*/ = x > $Number_NEGATIVE_INFINITY;
const tmpArrElement$21 /*:boolean*/ = x <= $Number_NEGATIVE_INFINITY;
const tmpArrElement$23 /*:boolean*/ = x >= $Number_NEGATIVE_INFINITY;
const tmpArrElement$25 /*:boolean*/ = x == $Number_NEGATIVE_INFINITY;
const tmpArrElement$27 /*:boolean*/ = x != $Number_NEGATIVE_INFINITY;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === $Number_NEGATIVE_INFINITY;
const tmpArrElement$31 /*:boolean*/ = x !== $Number_NEGATIVE_INFINITY;
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
const tmpCalleeParam /*:boolean*/ = x in $Number_NEGATIVE_INFINITY;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof $Number_NEGATIVE_INFINITY;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** $Number_NEGATIVE_INFINITY;
const tmpArrElement$1 = x * $Number_NEGATIVE_INFINITY;
const tmpArrElement$3 = x / $Number_NEGATIVE_INFINITY;
const tmpArrElement$5 = x % $Number_NEGATIVE_INFINITY;
const tmpArrElement$7 = x + $Number_NEGATIVE_INFINITY;
const tmpArrElement$9 = x - $Number_NEGATIVE_INFINITY;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < $Number_NEGATIVE_INFINITY;
const tmpArrElement$19 = x > $Number_NEGATIVE_INFINITY;
const tmpArrElement$21 = x <= $Number_NEGATIVE_INFINITY;
const tmpArrElement$23 = x >= $Number_NEGATIVE_INFINITY;
const tmpArrElement$25 = x == $Number_NEGATIVE_INFINITY;
const tmpArrElement$27 = x != $Number_NEGATIVE_INFINITY;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$29 = x === $Number_NEGATIVE_INFINITY;
const tmpArrElement$31 = x !== $Number_NEGATIVE_INFINITY;
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
$(x in $Number_NEGATIVE_INFINITY);
$(x instanceof $Number_NEGATIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a ** $Number_NEGATIVE_INFINITY;
const c = a * $Number_NEGATIVE_INFINITY;
const d = a / $Number_NEGATIVE_INFINITY;
const e = a % $Number_NEGATIVE_INFINITY;
const f = a + $Number_NEGATIVE_INFINITY;
const g = a - $Number_NEGATIVE_INFINITY;
const h = a << 0;
const i = a >> 0;
const j = a >>> 0;
const k = a < $Number_NEGATIVE_INFINITY;
const l = a > $Number_NEGATIVE_INFINITY;
const m = a <= $Number_NEGATIVE_INFINITY;
const n = a >= $Number_NEGATIVE_INFINITY;
const o = a == $Number_NEGATIVE_INFINITY;
const p = a != $Number_NEGATIVE_INFINITY;
a ** 0;
const q = a ^ 0;
const r = a | 0;
const s = a === $Number_NEGATIVE_INFINITY;
const t = a !== $Number_NEGATIVE_INFINITY;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = a in $Number_NEGATIVE_INFINITY;
$( v );
const w = a instanceof $Number_NEGATIVE_INFINITY;
$( w );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** -Infinity;
const tmpArrElement$1 = x * -Infinity;
const tmpArrElement$3 = x / -Infinity;
const tmpArrElement$5 = x % -Infinity;
const tmpArrElement$7 = x + -Infinity;
const tmpArrElement$9 = x - -Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < -Infinity;
const tmpArrElement$19 = x > -Infinity;
const tmpArrElement$21 = x <= -Infinity;
const tmpArrElement$23 = x >= -Infinity;
const tmpArrElement$25 = x == -Infinity;
const tmpArrElement$27 = x != -Infinity;
const tmpArrElement$29 = x === -Infinity;
const tmpArrElement$31 = x !== -Infinity;
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
let tmpCalleeParam = x in -Infinity;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof -Infinity;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: '$spy[1].valueOf()'
 - 8: '$spy[1].valueOf()'
 - 9: '$spy[1].valueOf()'
 - 10: '$spy[1].valueOf()'
 - 11: '$spy[1].valueOf()'
 - 12: '$spy[1].valueOf()'
 - 13: '$spy[1].valueOf()'
 - 14: '$spy[1].valueOf()'
 - 15: '$spy[1].valueOf()'
 - 16: '$spy[1].valueOf()'
 - 17: '$spy[1].valueOf()'
 - 18: '$spy[1].valueOf()'
 - 19: '$spy[1].valueOf()'
 - 20: [0, -Infinity, 0, 12345, -Infinity, Infinity, 12345, 12345, 12345, false, true, false, true, false, true, false, true, 0, 12345, 12345]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in -Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
