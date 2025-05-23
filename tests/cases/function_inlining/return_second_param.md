# Preval test case

# return_second_param.md

> Function inlining > Return second param
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f(a, b) {
  return b;
}
$(f(10, 20));
`````


## Settled


`````js filename=intro
$(20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(20);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 20 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return b;
};
let tmpCalleeParam = f(10, 20);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
