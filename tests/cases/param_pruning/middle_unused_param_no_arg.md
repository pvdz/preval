# Preval test case

# middle_unused_param_no_arg.md

> Param pruning > Middle unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y, z) {
  return $(x, z);
}
f();
`````

## Settled


`````js filename=intro
$(undefined, undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
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
f();
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
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
