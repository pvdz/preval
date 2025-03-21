# Preval test case

# call_number.md

> Normalize > Spread > Call number
>
> Spreading a number is an error

## Input

`````js filename=intro
$(...100);
`````


## Settled


`````js filename=intro
$(...100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...100 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
