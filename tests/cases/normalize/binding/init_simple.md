# Preval test case

# init_simple.md

> Normalize > Binding > Init simple
>
> Binding declaration with a simple init should not be outlined

## Input

`````js filename=intro
let x = Infinity;
$(x);
`````


## Settled


`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_POSITIVE_INFINITY);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_POSITIVE_INFINITY );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = Infinity;
$($Number_POSITIVE_INFINITY);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
