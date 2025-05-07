# Preval test case

# empty.md

> Normalize > Array > Empty
>
> Make sure empty array works

## Input

`````js filename=intro
$([]);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
