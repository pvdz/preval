# Preval test case

# loopy.md

> Assigns > Loopy
>
> If a switch with non-last-default case gets transformed to a loop then continue statements inside a switch no longer work as they did before...

Make sure SSA doesn't apply here, or at least makes sure that the assignment in the loop is still reflected in the while condition.

## Input

`````js filename=intro
  let run = true;
  while (run) {
    $(1);
    run = false;
  }
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


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
