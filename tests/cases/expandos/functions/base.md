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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f.foo = 10;
let tmpCalleeParam = f.foo;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
