# Preval test case

# unknown_string_right.md

> Normalize > Binary > With > Infinity > Unknown string right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $(ok);

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
const tmpBinBothRhs /*:unknown*/ = $(ok);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement /*:number*/ = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 /*:number*/ = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 /*:number*/ = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 /*:number*/ = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 /*:string*/ = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 /*:number*/ = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$17 /*:boolean*/ = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 /*:boolean*/ = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 /*:boolean*/ = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 /*:boolean*/ = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 /*:boolean*/ = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 /*:boolean*/ = $Number_POSITIVE_INFINITY != x;
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
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = $Number_POSITIVE_INFINITY in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = $Number_POSITIVE_INFINITY instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce($(ok), `plustr`);
const tmpArrElement = $Number_POSITIVE_INFINITY ** x;
const tmpArrElement$1 = $Number_POSITIVE_INFINITY * x;
const tmpArrElement$3 = $Number_POSITIVE_INFINITY / x;
const tmpArrElement$5 = $Number_POSITIVE_INFINITY % x;
const tmpArrElement$7 = $Number_POSITIVE_INFINITY + x;
const tmpArrElement$9 = $Number_POSITIVE_INFINITY - x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$17 = $Number_POSITIVE_INFINITY < x;
const tmpArrElement$19 = $Number_POSITIVE_INFINITY > x;
const tmpArrElement$21 = $Number_POSITIVE_INFINITY <= x;
const tmpArrElement$23 = $Number_POSITIVE_INFINITY >= x;
const tmpArrElement$25 = $Number_POSITIVE_INFINITY == x;
const tmpArrElement$27 = $Number_POSITIVE_INFINITY != x;
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
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$($Number_POSITIVE_INFINITY in x);
$($Number_POSITIVE_INFINITY instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( ok );
const b = $coerce( a, "plustr" );
const c = $Number_POSITIVE_INFINITY ** b;
const d = $Number_POSITIVE_INFINITY * b;
const e = $Number_POSITIVE_INFINITY / b;
const f = $Number_POSITIVE_INFINITY % b;
const g = $Number_POSITIVE_INFINITY + b;
const h = $Number_POSITIVE_INFINITY - b;
const i = 0 << b;
const j = 0 >> b;
const k = 0 >>> b;
const l = $Number_POSITIVE_INFINITY < b;
const m = $Number_POSITIVE_INFINITY > b;
const n = $Number_POSITIVE_INFINITY <= b;
const o = $Number_POSITIVE_INFINITY >= b;
const p = $Number_POSITIVE_INFINITY == b;
const q = $Number_POSITIVE_INFINITY != b;
const r = 0 ^ b;
const s = 0 | b;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = $Number_POSITIVE_INFINITY in b;
$( u );
const v = $Number_POSITIVE_INFINITY instanceof b;
$( v );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

ok


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
