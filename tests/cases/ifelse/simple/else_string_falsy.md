# Preval test case

# else_string_falsy.md

> Ifelse > Simple > Else string falsy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("") {
  $(1);
} else {
  $(2);
}
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
