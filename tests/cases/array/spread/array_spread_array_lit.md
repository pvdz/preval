# Preval test case

# array_spread_array_lit.md

> Array > Spread > Array spread array lit
>
> Array containing a spread of an array literal

This should be handled by normalization even.

## Input

`````js filename=intro
$([...[1]])
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1];
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
