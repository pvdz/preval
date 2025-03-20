# Preval test case

# else_string_truthy.md

> Ifelse > Simple > Else string truthy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("pass") {
  $(1);
} else {
  $(2);
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
