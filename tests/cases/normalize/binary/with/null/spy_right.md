# Preval test case

# spy_right.md

> Normalize > Binary > With > Null > Spy right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy(50);

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
const x /*:unknown*/ = $spy(50);
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
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$29 /*:boolean*/ = null === x;
const tmpArrElement$31 /*:boolean*/ = null !== x;
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
const x = $spy(50);
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
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$29 = null === x;
const tmpArrElement$31 = null !== x;
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


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 50 );
const b = 0 ** a;
const c = 0 * a;
const d = 0 / a;
const e = 0 % a;
const f = null + a;
const g = 0 - a;
const h = 0 << a;
const i = 0 >> a;
const j = 0 >>> a;
const k = 0 < a;
const l = 0 > a;
const m = 0 <= a;
const n = 0 >= a;
const o = null == a;
const p = null != a;
a ** 0;
const q = 0 ^ a;
const r = 0 | a;
const s = null === a;
const t = null !== a;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = null in a;
$( v );
const w = null instanceof a;
$( w );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [50, 50]
 - 2: '$spy[1].valueOf()', 50
 - 3: '$spy[1].valueOf()', 50
 - 4: '$spy[1].valueOf()', 50
 - 5: '$spy[1].valueOf()', 50
 - 6: '$spy[1].valueOf()', 50
 - 7: '$spy[1].valueOf()', 50
 - 8: '$spy[1].valueOf()', 50
 - 9: '$spy[1].valueOf()', 50
 - 10: '$spy[1].valueOf()', 50
 - 11: '$spy[1].valueOf()', 50
 - 12: '$spy[1].valueOf()', 50
 - 13: '$spy[1].valueOf()', 50
 - 14: '$spy[1].valueOf()', 50
 - 15: '$spy[1].valueOf()', 50
 - 16: '$spy[1].valueOf()', 50
 - 17: '$spy[1].valueOf()', 50
 - 18: [0, 0, 0, 0, 50, -50, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 50, 50]
 - 19: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
