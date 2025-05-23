# Preval test case

# stmt_spread_complex.md

> Normalize > Array > Stmt spread complex
>
> Array statements should be eliminated

## Input

`````js filename=intro
[...[$(1), 2], $(3), ...$([4, 5])];
`````


## Settled


`````js filename=intro
$(1);
$(3);
const tmpCalleeParam /*:array*/ = [4, 5];
const tmpArrElToSpread /*:unknown*/ = $(tmpCalleeParam);
[...tmpArrElToSpread];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
const tmpArrElToSpread = $([4, 5]);
[...tmpArrElToSpread];
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = [ 4, 5 ];
const b = $( a );
[ ...b ];
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
$(3);
let tmpCalleeParam = [4, 5];
const tmpArrElToSpread = $(tmpCalleeParam);
[...tmpArrElToSpread];
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [4, 5]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
