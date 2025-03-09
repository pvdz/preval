# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Infinity > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 + $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:primitive*/ = 1 + tmpBinBothRhs;
const tmpArrElement /*:number*/ = Infinity ** x;
const tmpArrElement$1 /*:number*/ = Infinity * x;
const tmpArrElement$3 /*:number*/ = Infinity / x;
const tmpArrElement$5 /*:number*/ = Infinity % x;
const tmpArrElement$7 /*:primitive*/ = Infinity + x;
const tmpArrElement$9 /*:number*/ = Infinity - x;
const tmpArrElement$17 /*:boolean*/ = Infinity < x;
const tmpArrElement$19 /*:boolean*/ = Infinity > x;
const tmpArrElement$21 /*:boolean*/ = Infinity <= x;
const tmpArrElement$23 /*:boolean*/ = Infinity >= x;
const tmpArrElement$25 /*:boolean*/ = Infinity == x;
const tmpArrElement$27 /*:boolean*/ = Infinity != x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$29 /*:boolean*/ = Infinity === x;
const tmpArrElement$31 /*:boolean*/ = Infinity !== x;
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
const tmpCalleeParam /*:boolean*/ = Infinity in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = Infinity instanceof x;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 + tmpBinBothRhs;
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$29 = Infinity === x;
const tmpArrElement$31 = Infinity !== x;
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
$(Infinity in x);
$(Infinity instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = 1 + $(1);
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

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = Infinity ** x;
const tmpArrElement$1 = Infinity * x;
const tmpArrElement$3 = Infinity / x;
const tmpArrElement$5 = Infinity % x;
const tmpArrElement$7 = Infinity + x;
const tmpArrElement$9 = Infinity - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = Infinity < x;
const tmpArrElement$19 = Infinity > x;
const tmpArrElement$21 = Infinity <= x;
const tmpArrElement$23 = Infinity >= x;
const tmpArrElement$25 = Infinity == x;
const tmpArrElement$27 = Infinity != x;
const tmpArrElement$29 = Infinity === x;
const tmpArrElement$31 = Infinity !== x;
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
const tmpCalleeParam = Infinity in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = Infinity instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 + a;
const c = Infinity ** b;
const d = Infinity * b;
const e = Infinity / b;
const f = Infinity % b;
const g = Infinity + b;
const h = Infinity - b;
const i = Infinity < b;
const j = Infinity > b;
const k = Infinity <= b;
const l = Infinity >= b;
const m = Infinity == b;
const n = Infinity != b;
const o = 0 << b;
const p = 0 >> b;
const q = 0 >>> b;
const r = Infinity === b;
const s = Infinity !== b;
const t = 0 ^ b;
const u = 0 | b;
const v = [ c, d, e, f, g, h, o, p, q, i, j, k, l, m, n, r, s, 0, t, u ];
$( v );
const w = Infinity in b;
$( w );
const x = Infinity instanceof b;
$( x );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [Infinity, Infinity, Infinity, NaN, Infinity, Infinity, 0, 0, 0, false, true, false, true, false, true, false, true, 0, 2, 2]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'Infinity' in 2 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
