# Preval test case

# common_subexpression_elimination.md

> Ai > Ai5 > Common subexpression elimination
>
> Test elimination of repeated pure expressions

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const x = arr.length + arr.length;
const y = arr.length + arr.length;
$(x);
$(y);
// Expected output:
// const arr = $([1, 2, 3]);
// const tmp = arr.length + arr.length;
// const x = tmp;
// const y = tmp;
// $(x);
// $(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpBinBothLhs /*:unknown*/ = arr.length;
const tmpBinBothRhs /*:unknown*/ = arr.length;
const x /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinBothLhs$1 /*:unknown*/ = arr.length;
const tmpBinBothRhs$1 /*:unknown*/ = arr.length;
const y /*:primitive*/ = tmpBinBothLhs$1 + tmpBinBothRhs$1;
$(x);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const x = arr.length + arr.length;
const y = arr.length + arr.length;
$(x);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.length;
const d = b.length;
const e = c + d;
const f = b.length;
const g = b.length;
const h = f + g;
$( e );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpBinBothLhs = arr.length;
const tmpBinBothRhs = arr.length;
const x = tmpBinBothLhs + tmpBinBothRhs;
const tmpBinBothLhs$1 = arr.length;
const tmpBinBothRhs$1 = arr.length;
const y = tmpBinBothLhs$1 + tmpBinBothRhs$1;
$(x);
$(y);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 6
 - 3: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
