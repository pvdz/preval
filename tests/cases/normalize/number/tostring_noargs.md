# Preval test case

# tostring_noargs.md

> Normalize > Number > Tostring noargs
>
> Reading the toString method from a number. We know what that is.

## Input

`````js filename=intro
const f = (31).toString();
$(f);
`````


## Settled


`````js filename=intro
$(`31`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`31`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "31" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '31'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
