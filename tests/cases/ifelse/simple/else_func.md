# Preval test case

# else_func.md

> Ifelse > Simple > Else func
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $(1);
else $(2);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = function () {
  debugger;
  return undefined;
};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
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
