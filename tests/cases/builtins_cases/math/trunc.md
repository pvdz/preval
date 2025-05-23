# Preval test case

# trunc.md

> Builtins cases > Math > Trunc
>
>

## Input

`````js filename=intro
const x = Math.trunc(4603);
$(x);
`````


## Settled


`````js filename=intro
$(4603);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4603);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4603 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4603
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
