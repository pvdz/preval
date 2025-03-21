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
const tmpArrElement /*:number*/ = x ** -Infinity;
const tmpArrElement$1 /*:number*/ = x * -Infinity;
const tmpArrElement$3 /*:number*/ = x / -Infinity;
const tmpArrElement$5 /*:number*/ = x % -Infinity;
const tmpArrElement$7 /*:primitive*/ = x + -Infinity;
const tmpArrElement$9 /*:number*/ = x - -Infinity;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < -Infinity;
const tmpArrElement$19 /*:boolean*/ = x > -Infinity;
const tmpArrElement$21 /*:boolean*/ = x <= -Infinity;
const tmpArrElement$23 /*:boolean*/ = x >= -Infinity;
const tmpArrElement$25 /*:boolean*/ = x == -Infinity;
const tmpArrElement$27 /*:boolean*/ = x != -Infinity;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === -Infinity;
const tmpArrElement$31 /*:boolean*/ = x !== -Infinity;
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
const tmpCalleeParam /*:boolean*/ = x in -Infinity;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof -Infinity;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

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
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$29 = x === -Infinity;
const tmpArrElement$31 = x !== -Infinity;
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
$(x in -Infinity);
$(x instanceof -Infinity);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a ** -Infinity;
const c = a * -Infinity;
const d = a / -Infinity;
const e = a % -Infinity;
const f = a + -Infinity;
const g = a - -Infinity;
const h = a << 0;
const i = a >> 0;
const j = a >>> 0;
const k = a < -Infinity;
const l = a > -Infinity;
const m = a <= -Infinity;
const n = a >= -Infinity;
const o = a == -Infinity;
const p = a != -Infinity;
a ** 0;
const q = a ^ 0;
const r = a | 0;
const s = a === -Infinity;
const t = a !== -Infinity;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = a in -Infinity;
$( v );
const w = a instanceof -Infinity;
$( w );
`````


## Todos triggered


None


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
