# Preval test case

# if_arrow.md

> Ifelse > Simple > If arrow
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $();
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = function () {
  debugger;
  return undefined;
};
if (tmpIfTest) {
  $();
} else {
}
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
