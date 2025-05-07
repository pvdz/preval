# Preval test case

# unknown_number_right.md

> Normalize > Binary > With > Nan > Unknown number right
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(1);

const arr = [
  NaN ** x,
  NaN * x,
  NaN / x,
  NaN % x,
  NaN + x,
  NaN - x,
  NaN << x,
  NaN >> x,
  NaN >>> x,
  NaN < x,
  NaN > x,
  NaN <= x,
  NaN >= x,
  NaN == x,
  NaN != x,
  NaN === x,
  NaN !== x,
  NaN & x,
  NaN ^ x,
  NaN | x,
];
$(arr);
$(NaN in x);
$(NaN instanceof x);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(1);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = NaN ** x;
const tmpArrElement$7 /*:number*/ = NaN + x;
const tmpArrElement$11 /*:number*/ = 0 << x;
const tmpArrElement$13 /*:number*/ = 0 >> x;
const tmpArrElement$15 /*:number*/ = 0 >>> x;
const tmpArrElement$35 /*:number*/ = 0 ^ x;
const tmpArrElement$37 /*:number*/ = 0 | x;
const arr /*:array*/ = [
  tmpArrElement,
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
const tmpCalleeParam /*:boolean*/ = NaN in x;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:boolean*/ = NaN instanceof x;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(1);
const x = 1 * tmpBinBothRhs;
const tmpArrElement = NaN ** x;
const tmpArrElement$7 = NaN + x;
const tmpArrElement$11 = 0 << x;
const tmpArrElement$13 = 0 >> x;
const tmpArrElement$15 = 0 >>> x;
const tmpArrElement$35 = 0 ^ x;
const tmpArrElement$37 = 0 | x;
$([
  tmpArrElement,
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
$(NaN in x);
$(NaN instanceof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = 1 * a;
const c = NaN ** b;
const d = NaN + b;
const e = 0 << b;
const f = 0 >> b;
const g = 0 >>> b;
const h = 0 ^ b;
const i = 0 | b;
const j = [ c, NaN, NaN, NaN, d, NaN, e, f, g, false, false, false, false, false, true, false, true, 0, h, i ];
$( j );
const k = NaN in b;
$( k );
const l = NaN instanceof b;
$( l );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [NaN, NaN, NaN, NaN, NaN, NaN, 0, 0, 0, false, false, false, false, false, true, false, true, 0, 1, 1]
 - eval returned: ("<crash[ Cannot use 'in' operator to search for 'NaN' in 1 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
