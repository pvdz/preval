# Preval test case

# regression.md

> Normalize > Logical > Regression
>
> This particular case was breaking

## Input

`````js filename=intro
if (false || $(2)) {
  {}
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpIfTest = false;
if (tmpIfTest) {
} else {
  tmpIfTest = $(2);
}
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
