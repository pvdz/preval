# Preval test case

# assign_simple_simple_simple.md

> Logical > And > Assign simple simple simple
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 && 2);
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
