# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > Infinity > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 /*:number*/ = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 /*:number*/ = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 /*:number*/ = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 /*:number*/ = x + $Number_POSITIVE_INFINITY;
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
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
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
const tmpCalleeParam /*:boolean*/ = x in $Number_POSITIVE_INFINITY;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof $Number_POSITIVE_INFINITY;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
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
const a = $( 1 );
const b = 1 * a;
const c = b ** $Number_POSITIVE_INFINITY;
const d = b * $Number_POSITIVE_INFINITY;
const e = b / $Number_POSITIVE_INFINITY;
const f = b % $Number_POSITIVE_INFINITY;
const g = b + $Number_POSITIVE_INFINITY;
const h = b - $Number_POSITIVE_INFINITY;
const i = b << 0;
const j = b >> 0;
const k = b >>> 0;
const l = b < $Number_POSITIVE_INFINITY;
const m = b > $Number_POSITIVE_INFINITY;
const n = b <= $Number_POSITIVE_INFINITY;
const o = b >= $Number_POSITIVE_INFINITY;
const p = b == $Number_POSITIVE_INFINITY;
const q = b != $Number_POSITIVE_INFINITY;
const r = b === $Number_POSITIVE_INFINITY;
const s = b !== $Number_POSITIVE_INFINITY;
const t = b ^ 0;
const u = b | 0;
const v = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, 0, t, u ];
$( v );
const w = b in $Number_POSITIVE_INFINITY;
$( w );
const x = b instanceof $Number_POSITIVE_INFINITY;
$( x );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, Infinity, 0, 1, Infinity, -Infinity, 1, 1, 1, true, false, true, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '1' in Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
