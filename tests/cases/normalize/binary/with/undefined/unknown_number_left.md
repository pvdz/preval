# Preval test case

# unknown_number_left.md

> Normalize > Binary > With > Undefined > Unknown number left
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

const arr = [
  x ** undefined,
  x * undefined,
  x / undefined,
  x % undefined,
  x + undefined,
  x - undefined,
  x << undefined,
  x >> undefined,
  x >>> undefined,
  x < undefined,
  x > undefined,
  x <= undefined,
  x >= undefined,
  x == undefined,
  x != undefined,
  x === undefined,
  x !== undefined,
  x & undefined,
  x ^ undefined,
  x | undefined,
];
$(arr);
$(x in undefined);
$(x instanceof undefined);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement$7 /*:number*/ = x + undefined;
const tmpArrElement$11 /*:number*/ = x << 0;
const tmpArrElement$13 /*:number*/ = x >> 0;
const tmpArrElement$15 /*:number*/ = x >>> 0;
const tmpArrElement$35 /*:number*/ = x ^ 0;
const tmpArrElement$37 /*:number*/ = x | 0;
const arr /*:array*/ = [
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
];
$(arr);
const tmpCalleeParam /*:boolean*/ = x in undefined;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = x instanceof undefined;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpArrElement$7 = x + undefined;
const tmpArrElement$11 = x << 0;
const tmpArrElement$13 = x >> 0;
const tmpArrElement$15 = x >>> 0;
const tmpArrElement$35 = x ^ 0;
const tmpArrElement$37 = x | 0;
$([
  NaN,
  NaN,
  NaN,
  NaN,
  tmpArrElement$7,
  NaN,
  tmpArrElement$11,
  tmpArrElement$13,
  tmpArrElement$15,
  false,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
  0,
  tmpArrElement$35,
  tmpArrElement$37,
]);
$(x in undefined);
$(x instanceof undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = b + undefined;
const d = b << 0;
const e = b >> 0;
const f = b >>> 0;
const g = b ^ 0;
const h = b | 0;
const i = [ NaN, NaN, NaN, NaN, c, NaN, d, e, f, false, false, false, false, false, true, false, true, 0, g, h ];
$( i );
const j = b in undefined;
$( j );
const k = b instanceof undefined;
$( k );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, NaN, NaN, 1, 1, 1, false, false, false, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '1' in undefined ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
