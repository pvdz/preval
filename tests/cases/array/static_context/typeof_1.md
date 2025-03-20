# Preval test case

# typeof_1.md

> Array > Static context > Typeof 1
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(typeof [1]);
`````


## Settled


`````js filename=intro
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
