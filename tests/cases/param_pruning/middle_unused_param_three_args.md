# Preval test case

# middle_unused_param_three_args.md

> Param pruning > Middle unused param three args
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(x, z);
}
f(10, 20, 30);
`````

## Settled


`````js filename=intro
$(10, 30);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, 30);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  return $(x, z);
};
f(10, 20, 30);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let y = $$1;
  let z = $$2;
  debugger;
  const tmpReturnArg = $(x, z);
  return tmpReturnArg;
};
f(10, 20, 30);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10, 30 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10, 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
