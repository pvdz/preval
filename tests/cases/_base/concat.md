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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `ab`;
$(tmpCalleeParam);
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
