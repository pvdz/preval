# Preval test case

# truthy_base.md

> Fake do while > Truthy base
>
>

## Input

`````js filename=intro
let test = true;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if (test) {
    $();
    test = false;
  } else {
    break;
  }
}
`````


## Settled


`````js filename=intro
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
