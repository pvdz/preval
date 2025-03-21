# Preval test case

# concat.md

> Base > Concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````


## Settled


`````js filename=intro
$(`ab`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ab`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ab" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
