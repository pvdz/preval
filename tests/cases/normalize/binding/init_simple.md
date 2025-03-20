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
$(Infinity);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````


## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````


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
