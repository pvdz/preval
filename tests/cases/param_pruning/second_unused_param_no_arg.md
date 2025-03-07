# Preval test case

# second_unused_param_no_arg.md

> Param pruning > Second unused param no arg
>
> Unused parameters should be eliminated under certain conditions, but not always.

## Input

`````js filename=intro
function f(x, y) {
  return $(x);
}
f();
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  return $(x);
};
f();
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1) {
  let x = $$0;
  let y = $$1;
  debugger;
  const tmpReturnArg = $(x);
  return tmpReturnArg;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
