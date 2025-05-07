# Preval test case

# spy_right.md

> Normalize > Binary > With > Neg infinity > Spy right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = $spy();
const arr = [
  (-Infinity) ** x,
  -Infinity * x,
  -Infinity / x,
  -Infinity % x,
  -Infinity + x,
  -Infinity - x,
  -Infinity << x,
  -Infinity >> x,
  -Infinity >>> x,
  -Infinity < x,
  -Infinity > x,
  -Infinity <= x,
  -Infinity >= x,
  -Infinity == x,
  -Infinity != x,
  -Infinity === x,
  -Infinity !== x,
  -Infinity & x,
  -Infinity ^ x,
  -Infinity | x,
];
$(arr);
$(-Infinity in x);
$(-Infinity instanceof x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy();
const tmpArrElement /*:number*/ = (-Infinity) ** x;
const tmpArrElement$1 /*:number*/ = -Infinity * x;
const tmpArrElement$3 /*:number*/ = -Infinity / x;
const tmpArrElement$5 /*:number*/ = -Infinity % x;
const tmpArrElement$7 /*:primitive*/ = -Infinity + x;
const tmpArrElement$9 /*:number*/ = -Infinity - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = -Infinity < x;
const tmpArrElement$19 /*:boolean*/ = -Infinity > x;
const tmpArrElement$21 /*:boolean*/ = -Infinity <= x;
const tmpArrElement$23 /*:boolean*/ = -Infinity >= x;
const tmpArrElement$25 /*:boolean*/ = -Infinity == x;
const tmpArrElement$27 /*:boolean*/ = -Infinity != x;
x ** 0;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const tmpArrElement$29 /*:boolean*/ = -Infinity === x;
const tmpArrElement$31 /*:boolean*/ = -Infinity !== x;
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
const tmpCalleeParam /*:boolean*/ = -Infinity in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = -Infinity instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = (-Infinity) ** x;
const tmpArrElement$1 = -Infinity * x;
const tmpArrElement$3 = -Infinity / x;
const tmpArrElement$5 = -Infinity % x;
const tmpArrElement$7 = -Infinity + x;
const tmpArrElement$9 = -Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = -Infinity < x;
const tmpArrElement$19 = -Infinity > x;
const tmpArrElement$21 = -Infinity <= x;
const tmpArrElement$23 = -Infinity >= x;
const tmpArrElement$25 = -Infinity == x;
const tmpArrElement$27 = -Infinity != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$29 = -Infinity === x;
const tmpArrElement$31 = -Infinity !== x;
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
$(-Infinity in x);
$(-Infinity instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = -Infinity ** a;
const c = -Infinity * a;
const d = -Infinity / a;
const e = -Infinity % a;
const f = -Infinity + a;
const g = -Infinity - a;
const h = 0 << a;
const i = 0 >> a;
const j = 0 >>> a;
const k = -Infinity < a;
const l = -Infinity > a;
const m = -Infinity <= a;
const n = -Infinity >= a;
const o = -Infinity == a;
const p = -Infinity != a;
a ** 0;
const q = 0 ^ a;
const r = 0 | a;
const s = -Infinity === a;
const t = -Infinity !== a;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = -Infinity in a;
$( v );
const w = -Infinity instanceof a;
$( w );
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
 - 20: 
  [
    -Infinity,
    -Infinity,
    -Infinity,
    NaN,
    -Infinity,
    -Infinity,
    0,
    0,
    0,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    0,
    12345,
    12345,
  ],

 - 21: false
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
