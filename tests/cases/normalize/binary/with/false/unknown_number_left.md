# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > False > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 + $(1);

const arr = [
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);
$(x in false);
$(x instanceof false);
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:primitive*/ = 1 + tmpBinBothRhs;
const tmpArrElement /*:number*/ = x ** 0;
const tmpArrElement$1 /*:number*/ = x * 0;
const tmpArrElement$3 /*:number*/ = x / 0;
const tmpArrElement$5 /*:number*/ = x % 0;
const tmpArrElement$7 /*:primitive*/ = x + false;
const tmpArrElement$9 /*:number*/ = x - 0;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$17 /*:boolean*/ = x < false;
const tmpArrElement$19 /*:boolean*/ = x > false;
const tmpArrElement$21 /*:boolean*/ = x <= false;
const tmpArrElement$23 /*:boolean*/ = x >= false;
const tmpArrElement$25 /*:boolean*/ = x == false;
const tmpArrElement$27 /*:boolean*/ = x != false;
const tmpArrElement$29 /*:boolean*/ = x === false;
const tmpArrElement$31 /*:boolean*/ = x !== false;
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
const tmpCalleeParam /*:boolean*/ = x in false;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof false;
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 + tmpBinBothRhs;
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
const tmpArrElement$29 = x === false;
const tmpArrElement$31 = x !== false;
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
$(x in false);
$(x instanceof false);
`````

## Pre Normal


`````js filename=intro
const x = 1 + $(1);
const arr = [
  x ** false,
  x * false,
  x / false,
  x % false,
  x + false,
  x - false,
  x << false,
  x >> false,
  x >>> false,
  x < false,
  x > false,
  x <= false,
  x >= false,
  x == false,
  x != false,
  x === false,
  x !== false,
  x & false,
  x ^ false,
  x | false,
];
$(arr);
$(x in false);
$(x instanceof false);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = x ** 0;
const tmpArrElement$1 = x * 0;
const tmpArrElement$3 = x / 0;
const tmpArrElement$5 = x % 0;
const tmpArrElement$7 = x + false;
const tmpArrElement$9 = x - 0;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < false;
const tmpArrElement$19 = x > false;
const tmpArrElement$21 = x <= false;
const tmpArrElement$23 = x >= false;
const tmpArrElement$25 = x == false;
const tmpArrElement$27 = x != false;
const tmpArrElement$29 = x === false;
const tmpArrElement$31 = x !== false;
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
const tmpCalleeParam = x in false;
$(tmpCalleeParam);
const tmpCalleeParam$1 = x instanceof false;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 + a;
const c = b ** 0;
const d = b * 0;
const e = b / 0;
const f = b % 0;
const g = b + false;
const h = b - 0;
const i = b << 0;
const j = b >> 0;
const k = b >>> 0;
const l = b < false;
const m = b > false;
const n = b <= false;
const o = b >= false;
const p = b == false;
const q = b != false;
const r = b === false;
const s = b !== false;
const t = b ^ 0;
const u = b | 0;
const v = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, 0, t, u ];
$( v );
const w = b in false;
$( w );
const x = b instanceof false;
$( x );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [1, 0, Infinity, NaN, 2, 2, 2, 2, 2, false, true, false, true, false, true, false, true, 0, 2, 2]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '2' in false ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
