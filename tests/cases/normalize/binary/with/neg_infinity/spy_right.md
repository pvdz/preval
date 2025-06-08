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
const tmpArrElement /*:number*/ = $Number_NEGATIVE_INFINITY ** x;
const tmpArrElement$1 /*:number*/ = $Number_NEGATIVE_INFINITY * x;
const tmpArrElement$3 /*:number*/ = $Number_NEGATIVE_INFINITY / x;
const tmpArrElement$5 /*:number*/ = $Number_NEGATIVE_INFINITY % x;
const tmpArrElement$7 /*:primitive*/ = $Number_NEGATIVE_INFINITY + x;
const tmpArrElement$9 /*:number*/ = $Number_NEGATIVE_INFINITY - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = $Number_NEGATIVE_INFINITY < x;
const tmpArrElement$19 /*:boolean*/ = $Number_NEGATIVE_INFINITY > x;
const tmpArrElement$21 /*:boolean*/ = $Number_NEGATIVE_INFINITY <= x;
const tmpArrElement$23 /*:boolean*/ = $Number_NEGATIVE_INFINITY >= x;
const tmpArrElement$25 /*:boolean*/ = $Number_NEGATIVE_INFINITY == x;
const tmpArrElement$27 /*:boolean*/ = $Number_NEGATIVE_INFINITY != x;
x ** 0;
const tmpArrElement$35 /*:number*/ /*^0*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ /*|0*/ = 0 | x;
const tmpArrElement$29 /*:boolean*/ = $Number_NEGATIVE_INFINITY === x;
const tmpArrElement$31 /*:boolean*/ = $Number_NEGATIVE_INFINITY !== x;
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
const tmpCalleeParam /*:boolean*/ = $Number_NEGATIVE_INFINITY in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_NEGATIVE_INFINITY instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy();
const tmpArrElement = $Number_NEGATIVE_INFINITY ** x;
const tmpArrElement$1 = $Number_NEGATIVE_INFINITY * x;
const tmpArrElement$3 = $Number_NEGATIVE_INFINITY / x;
const tmpArrElement$5 = $Number_NEGATIVE_INFINITY % x;
const tmpArrElement$7 = $Number_NEGATIVE_INFINITY + x;
const tmpArrElement$9 = $Number_NEGATIVE_INFINITY - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = $Number_NEGATIVE_INFINITY < x;
const tmpArrElement$19 = $Number_NEGATIVE_INFINITY > x;
const tmpArrElement$21 = $Number_NEGATIVE_INFINITY <= x;
const tmpArrElement$23 = $Number_NEGATIVE_INFINITY >= x;
const tmpArrElement$25 = $Number_NEGATIVE_INFINITY == x;
const tmpArrElement$27 = $Number_NEGATIVE_INFINITY != x;
x ** 0;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
const tmpArrElement$29 = $Number_NEGATIVE_INFINITY === x;
const tmpArrElement$31 = $Number_NEGATIVE_INFINITY !== x;
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
$($Number_NEGATIVE_INFINITY in x);
$($Number_NEGATIVE_INFINITY instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy();
const b = $Number_NEGATIVE_INFINITY ** a;
const c = $Number_NEGATIVE_INFINITY * a;
const d = $Number_NEGATIVE_INFINITY / a;
const e = $Number_NEGATIVE_INFINITY % a;
const f = $Number_NEGATIVE_INFINITY + a;
const g = $Number_NEGATIVE_INFINITY - a;
const h = 0 << a;
const i = 0 >> a;
const j = 0 >>> a;
const k = $Number_NEGATIVE_INFINITY < a;
const l = $Number_NEGATIVE_INFINITY > a;
const m = $Number_NEGATIVE_INFINITY <= a;
const n = $Number_NEGATIVE_INFINITY >= a;
const o = $Number_NEGATIVE_INFINITY == a;
const p = $Number_NEGATIVE_INFINITY != a;
a ** 0;
const q = 0 ^ a;
const r = 0 | a;
const s = $Number_NEGATIVE_INFINITY === a;
const t = $Number_NEGATIVE_INFINITY !== a;
const u = [ b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s, t, 0, q, r ];
$( u );
const v = $Number_NEGATIVE_INFINITY in a;
$( v );
const w = $Number_NEGATIVE_INFINITY instanceof a;
$( w );
`````


## Normalized
(This is what phase1 received the first time)

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
const tmpArrElement$29 = -Infinity === x;
const tmpArrElement$31 = -Infinity !== x;
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
let tmpCalleeParam = -Infinity in x;
$(tmpCalleeParam);
let tmpCalleeParam$1 = -Infinity instanceof x;
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
