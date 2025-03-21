# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > True > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

const arr = [
  x ** true,
  x * true,
  x / true,
  x % true,
  x + true,
  x - true,
  x << true,
  x >> true,
  x >>> true,
  x < true,
  x > true,
  x <= true,
  x >= true,
  x == true,
  x != true,
  x === true,
  x !== true,
  x & true,
  x ^ true,
  x | true,
];
$(arr);
$(x in true);
$(x instanceof true);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = x ** 1;
const tmpArrElement$1 /*:number*/ = x * 1;
const tmpArrElement$3 /*:number*/ = x / 1;
const tmpArrElement$5 /*:number*/ = x % 1;
const tmpArrElement$7 /*:number*/ = x + true;
const tmpArrElement$9 /*:number*/ = x - 1;
const tmpArrElement$11 /*:number*/ = x << 1;
const tmpArrElement$13 /*:number*/ = x >> 1;
const tmpArrElement$15 /*:number*/ = x >>> 1;
const tmpArrElement$17 /*:boolean*/ = x < true;
const tmpArrElement$19 /*:boolean*/ = x > true;
const tmpArrElement$21 /*:boolean*/ = x <= true;
const tmpArrElement$23 /*:boolean*/ = x >= true;
const tmpArrElement$25 /*:boolean*/ = x == true;
const tmpArrElement$27 /*:boolean*/ = x != true;
const tmpArrElement$33 /*:number*/ = x & 1;
const tmpArrElement$35 /*:number*/ = x ^ 1;
const tmpArrElement$37 /*:number*/ = x | 1;
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
const tmpCalleeParam /*:boolean*/ = x in true;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof true;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpArrElement = x ** 1;
const tmpArrElement$1 = x * 1;
const tmpArrElement$3 = x / 1;
const tmpArrElement$5 = x % 1;
const tmpArrElement$7 = x + true;
const tmpArrElement$9 = x - 1;
const tmpArrElement$11 = x << 1;
const tmpArrElement$13 = x >> 1;
const tmpArrElement$15 = x >>> 1;
const tmpArrElement$17 = x < true;
const tmpArrElement$19 = x > true;
const tmpArrElement$21 = x <= true;
const tmpArrElement$23 = x >= true;
const tmpArrElement$25 = x == true;
const tmpArrElement$27 = x != true;
const tmpArrElement$33 = x & 1;
const tmpArrElement$35 = x ^ 1;
const tmpArrElement$37 = x | 1;
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
$(x in true);
$(x instanceof true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = b ** 1;
const d = b * 1;
const e = b / 1;
const f = b % 1;
const g = b + true;
const h = b - 1;
const i = b << 1;
const j = b >> 1;
const k = b >>> 1;
const l = b < true;
const m = b > true;
const n = b <= true;
const o = b >= true;
const p = b == true;
const q = b != true;
const r = b & 1;
const s = b ^ 1;
const t = b | 1;
const u = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, r, s, t ];
$( u );
const v = b in true;
$( v );
const w = b instanceof true;
$( w );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [1, 1, 1, 0, 2, 0, 2, 0, 0, false, false, true, true, true, false, false, true, 1, 0, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '1' in true ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
