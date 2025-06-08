# Preval test case

# something_starstar.md

> Normalize > Binary > With > Undefined > Something starstar
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const x = 1 * $(0);

const arr = [
  undefined ** x,
];
$(arr);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(0);
const x /*:number*/ = 1 * tmpBinBothRhs;
const tmpArrElement /*:number*/ = undefined ** x;
const arr /*:array*/ /*truthy*/ = [tmpArrElement];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(0);
const tmpArrElement = undefined ** (1 * tmpBinBothRhs);
$([tmpArrElement]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = 1 * a;
const c = undefined ** b;
const d = [ c ];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = 1;
const tmpBinBothRhs = $(0);
const x = tmpBinBothLhs * tmpBinBothRhs;
const tmpArrElement = undefined ** x;
const arr = [tmpArrElement];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
