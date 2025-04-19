# Preval test case

# call_arg.md

> Normalize > Pattern > Assignment > Base contexts > Call arg
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 0;
$({ x } = 1);
`````


## Settled


`````js filename=intro
$Number_prototype.x;
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.x;
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.x;
$( 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
