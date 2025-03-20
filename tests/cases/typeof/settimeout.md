# Preval test case

# settimeout.md

> Typeof > Settimeout
>
> Known builtins

## Input

`````js filename=intro
$(typeof setTimeout)
`````


## Settled


`````js filename=intro
$(`function`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`function`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "function" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
