# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > True > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

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
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = 1 ** x;
const tmpArrElement$1 /*:number*/ = 1 * x;
const tmpArrElement$3 /*:number*/ = 1 / x;
const tmpArrElement$5 /*:number*/ = 1 % x;
const tmpArrElement$7 /*:number*/ = true + x;
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
  false,
  true,
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
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
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
  false,
  true,
  tmpArrElement$33,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(true in x);
$(true instanceof x);
`````

## Pre Normal


`````js filename=intro
const x = 1 * $(1);
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

## Normalized


`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(1);
const x = tmpBinBothLhs * tmpBinBothRhs;
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
const tmpArrElement$29 = true === x;
const tmpArrElement$31 = true !== x;
const tmpArrElement$33 = 1 & x;
const tmpArrElement$35 = 1 ^ x;
const tmpArrElement$37 = 1 | x;
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
const tmpCalleeParam = true in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 = true instanceof x;
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = 1 ** b;
const d = 1 * b;
const e = 1 / b;
const f = 1 % b;
const g = true + b;
const h = 1 - b;
const i = 1 << b;
const j = 1 >> b;
const k = 1 >>> b;
const l = true < b;
const m = true > b;
const n = true <= b;
const o = true >= b;
const p = true == b;
const q = true != b;
const r = 1 & b;
const s = 1 ^ b;
const t = 1 | b;
const u = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, r, s, t ];
$( u );
const v = true in b;
$( v );
const w = true instanceof b;
$( w );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: [1, 1, 1, 0, 2, 0, 2, 0, 0, false, false, true, true, true, false, false, true, 1, 0, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'true' in 1 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
