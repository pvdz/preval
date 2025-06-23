# Preval test case

# unknown_string_left.md

> Normalize > Binary > With > Infinity > Unknown string left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = '' + $('ok');

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
const tmpBinBothRhs /*:unknown*/ = $(`ok`);
const x /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const tmpArrElement /*:number*/ = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 /*:number*/ = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 /*:number*/ = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 /*:number*/ = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 /*:string*/ /*truthy*/ = `${x}Infinity`;
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
const tmpArrElement$35 /*:number*/ /*^0*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ /*|0*/ = x | 0;
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
  false,
  true,
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
const x = $coerce($(`ok`), `plustr`);
const tmpArrElement = x ** $Number_POSITIVE_INFINITY;
const tmpArrElement$1 = x * $Number_POSITIVE_INFINITY;
const tmpArrElement$3 = x / $Number_POSITIVE_INFINITY;
const tmpArrElement$5 = x % $Number_POSITIVE_INFINITY;
const tmpArrElement$7 = `${x}Infinity`;
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
  false,
  true,
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
const a = $( "ok" );
const b = $coerce( a, "plustr" );
const c = b ** $Number_POSITIVE_INFINITY;
const d = b * $Number_POSITIVE_INFINITY;
const e = b / $Number_POSITIVE_INFINITY;
const f = b % $Number_POSITIVE_INFINITY;
const g = `${b}Infinity`;
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
const r = b ^ 0;
const s = b | 0;
const t = [ c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, false, true, 0, r, s ];
$( t );
const u = b in $Number_POSITIVE_INFINITY;
$( u );
const v = b instanceof $Number_POSITIVE_INFINITY;
$( v );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $(`ok`);
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement = x ** Infinity;
const tmpArrElement$1 = x * Infinity;
const tmpArrElement$3 = x / Infinity;
const tmpArrElement$5 = x % Infinity;
const tmpArrElement$7 = x + Infinity;
const tmpArrElement$9 = x - Infinity;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$17 = x < Infinity;
const tmpArrElement$19 = x > Infinity;
const tmpArrElement$21 = x <= Infinity;
const tmpArrElement$23 = x >= Infinity;
const tmpArrElement$25 = x == Infinity;
const tmpArrElement$27 = x != Infinity;
const tmpArrElement$29 = x === Infinity;
const tmpArrElement$31 = x !== Infinity;
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
let tmpCalleeParam = x in Infinity;
$(tmpCalleeParam);
let tmpCalleeParam$1 = x instanceof Infinity;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ok'
 - 2: [NaN, NaN, NaN, NaN, 'okInfinity', NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 0, 0]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'ok' in Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
