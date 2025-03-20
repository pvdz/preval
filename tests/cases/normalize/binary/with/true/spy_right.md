# Preval test case

# spy_right.md

> Normalize > Binary > With > True > Spy right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  true ** x,
  true * x,
  true / x,
  true % x,
  true + x,
  true - x,
  true << x,
  true >> x,
  true >>> x,
  true < x,
  true > x,
  true <= x,
  true >= x,
  true == x,
  true != x,
  true === x,
  true !== x,
  true & x,
  true ^ x,
  true | x,
];
$(arr);
$(true in x);
$(true instanceof x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = 1 ** x;
const tmpArrElement$1 /*:number*/ = 1 * x;
const tmpArrElement$3 /*:number*/ = 1 / x;
const tmpArrElement$5 /*:number*/ = 1 % x;
const tmpArrElement$7 /*:primitive*/ = true + x;
const tmpArrElement$9 /*:number*/ = 1 - x;
const tmpArrElement$11 /*:number*/ = 1 << x;
const tmpArrElement$13 /*:number*/ = 1 >> x;
const tmpArrElement$15 /*:number*/ = 1 >>> x;
const tmpArrElement$17 /*:boolean*/ = true < x;
const tmpArrElement$19 /*:boolean*/ = true > x;
const tmpArrElement$21 /*:boolean*/ = true <= x;
const tmpArrElement$23 /*:boolean*/ = true >= x;
const tmpArrElement$25 /*:boolean*/ = true == x;
const tmpArrElement$27 /*:boolean*/ = true != x;
const tmpArrElement$33 /*:number*/ = 1 & x;
const tmpArrElement$35 /*:number*/ = 1 ^ x;
const tmpArrElement$37 /*:number*/ = 1 | x;
const tmpArrElement$29 /*:boolean*/ = true === x;
const tmpArrElement$31 /*:boolean*/ = true !== x;
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = true in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = true instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = 1 ** x;
const tmpArrElement$1 = 1 * x;
const tmpArrElement$3 = 1 / x;
const tmpArrElement$5 = 1 % x;
const tmpArrElement$7 = true + x;
const tmpArrElement$9 = 1 - x;
const tmpArrElement$11 = 1 << x;
const tmpArrElement$13 = 1 >> x;
const tmpArrElement$15 = 1 >>> x;
const tmpArrElement$17 = true < x;
const tmpArrElement$19 = true > x;
const tmpArrElement$21 = true <= x;
const tmpArrElement$23 = true >= x;
const tmpArrElement$25 = true == x;
const tmpArrElement$27 = true != x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
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
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(true in x);
$(true instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = 1 ** a;
const c = 1 * a;
const d = 1 / a;
const e = 1 % a;
const f = true + a;
const g = 1 - a;
const h = 1 << a;
const i = 1 >> a;
const j = 1 >>> a;
const k = true < a;
const l = true > a;
const m = true <= a;
const n = true >= a;
const o = true == a;
const p = true != a;
const q = 1 & a;
const r = 1 ^ a;
const s = 1 | a;
const t = true === a;
const u = true !== a;
const v = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, t, u, q, r, s ];
$( v );
const w = true in a;
$( w );
const x = true instanceof a;
$( x );
`````


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
 - 20: [1, 12345, 0.00008100445524503848, 1, 12346, -12344, 33554432, 0, 0, true, false, true, false, false, true, false, true, 1, 12344, 12345]
 - 21: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
