# Preval test case

# call_bool.md

> Normalize > Spread > Call bool
>
> Spreading a boolean results in an error

## Input

`````js filename=intro
$(...true);
`````


## Settled


`````js filename=intro
$(...true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...true );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
