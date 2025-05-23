# Preval test case

# spy_left.md

> Normalize > Binary > With > Null > Spy left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  x ** null,
  x * null,
  x / null,
  x % null,
  x + null,
  x - null,
  x << null,
  x >> null,
  x >>> null,
  x < null,
  x > null,
  x <= null,
  x >= null,
  x == null,
  x != null,
  x === null,
  x !== null,
  x & null,
  x ^ null,
  x | null,
];
$(arr);
$(x in null);
$(x instanceof null);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$7 /*:primitive*/ = x + null;
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < 0;
const tmpArrElement$19 /*:boolean*/ = x > 0;
const tmpArrElement$21 /*:boolean*/ = x <= 0;
const tmpArrElement$23 /*:boolean*/ = x >= 0;
const tmpArrElement$25 /*:boolean*/ = x == null;
const tmpArrElement$27 /*:boolean*/ = x != null;
x ** 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const tmpArrElement$29 /*:boolean*/ = x === null;
const tmpArrElement$31 /*:boolean*/ = x !== null;
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
const tmpCalleeParam /*:boolean*/ = x in null;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof null;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < 0;
const tmpArrElement$19 = x > 0;
const tmpArrElement$21 = x <= 0;
const tmpArrElement$23 = x >= 0;
const tmpArrElement$25 = x == null;
const tmpArrElement$27 = x != null;
x ** 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
const tmpArrElement$29 = x === null;
const tmpArrElement$31 = x !== null;
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
$(x in null);
$(x instanceof null);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = a ** 0;
const c = a * 0;
const d = a / 0;
const e = a % 0;
const f = a + null;
const g = a - 0;
const h = a << 0;
const i = a >> 0;
const j = a >>> 0;
const k = a < 0;
const l = a > 0;
const m = a <= 0;
const n = a >= 0;
const o = a == null;
const p = a != null;
a ** 0;
const q = a ^ 0;
const r = a | 0;
const s = a === null;
const t = a !== null;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = a in null;
$( v );
const w = a instanceof null;
$( w );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy();
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + null;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < 0;
const tmpArrElement$19 = x > 0;
const tmpArrElement$21 = x <= 0;
const tmpArrElement$23 = x >= 0;
const tmpArrElement$25 = x == null;
const tmpArrElement$27 = x != null;
const tmpArrElement$29 = x === null;
const tmpArrElement$31 = x !== null;
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
let tmpCalleeParam = x in null;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof null;
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
 - 18: [1, 0, Infinity, NaN, 12345, 12345, 12345, 12345, 12345, false, true, false, true, false, true, false, true, 0, 12345, 12345]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in null ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
