# Preval test case

# base.md

> Expandos > Functions > Base
>
> Basic expando stuff

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = 10;
$(f.foo);
`````


## Settled


`````js filename=intro
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
