# Preval test case

# inc.md

> Array reads > Inc
>
> Inlining array properties

(This actually caused a syntax erorr at one point, oops)

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(++arr[0]);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) free with zero args, we can eliminate this?
- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
