# Preval test case

# write_to_length.md

> Array > Write to length
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.length = 1;
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1];
$(arr);
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
