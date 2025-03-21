# Preval test case

# false.md

> Typeof > False
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof false)
`````


## Settled


`````js filename=intro
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "boolean" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
