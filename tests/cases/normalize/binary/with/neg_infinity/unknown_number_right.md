# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Neg infinity > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = $Number_NEGATIVE_INFINITY ** x;
const tmpArrElement$1 /*:number*/ = $Number_NEGATIVE_INFINITY * x;
const tmpArrElement$3 /*:number*/ = $Number_NEGATIVE_INFINITY / x;
const tmpArrElement$5 /*:number*/ = $Number_NEGATIVE_INFINITY % x;
const tmpArrElement$7 /*:number*/ = $Number_NEGATIVE_INFINITY + x;
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
const tmpArrElement$29 /*:boolean*/ = $Number_NEGATIVE_INFINITY === x;
const tmpArrElement$31 /*:boolean*/ = $Number_NEGATIVE_INFINITY !== x;
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
const tmpCalleeParam /*:boolean*/ = $Number_NEGATIVE_INFINITY in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_NEGATIVE_INFINITY instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
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
const tmpArrElement$29 = $Number_NEGATIVE_INFINITY === x;
const tmpArrElement$31 = $Number_NEGATIVE_INFINITY !== x;
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
$($Number_NEGATIVE_INFINITY in x);
$($Number_NEGATIVE_INFINITY instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = $Number_NEGATIVE_INFINITY ** b;
const d = $Number_NEGATIVE_INFINITY * b;
const e = $Number_NEGATIVE_INFINITY / b;
const f = $Number_NEGATIVE_INFINITY % b;
const g = $Number_NEGATIVE_INFINITY + b;
const h = $Number_NEGATIVE_INFINITY - b;
const i = 0 << b;
const j = 0 >> b;
const k = 0 >>> b;
const l = $Number_NEGATIVE_INFINITY < b;
const m = $Number_NEGATIVE_INFINITY > b;
const n = $Number_NEGATIVE_INFINITY <= b;
const o = $Number_NEGATIVE_INFINITY >= b;
const p = $Number_NEGATIVE_INFINITY == b;
const q = $Number_NEGATIVE_INFINITY != b;
const r = $Number_NEGATIVE_INFINITY === b;
const s = $Number_NEGATIVE_INFINITY !== b;
const t = 0 ^ b;
const u = 0 | b;
const v = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, 0, t, u ];
$( v );
const w = $Number_NEGATIVE_INFINITY in b;
$( w );
const x = $Number_NEGATIVE_INFINITY instanceof b;
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
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
 - 1: 1
 - 2: [-Infinity, -Infinity, -Infinity, NaN, -Infinity, -Infinity, 0, 0, 0, true, false, true, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '-Infinity' in 1 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
