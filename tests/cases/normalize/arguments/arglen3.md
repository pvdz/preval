# Preval test case

# arglen3.md

> Normalize > Arguments > Arglen3
>
> This was causing a problem when arguments was passed on in a call.

## Input

`````js filename=intro
const f = function() {
  $(arguments.length);
}
f();
`````


## Settled


`````js filename=intro
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
