# Preval test case

# middle_unused_param_two_args.md

> Param pruning > Middle unused param two args
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(x, z);
}
f(10, 20);
`````


## Settled


`````js filename=intro
$(10, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpReturnArg = $(x, z);
  return tmpReturnArg;
};
f(10, 20);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
