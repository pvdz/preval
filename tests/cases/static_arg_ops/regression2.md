# Preval test case

# regression2.md

> Static arg ops > Regression2
>
> When the first line of a function operates on an arg and the func is only called, outline the operation.

## Input

`````js filename=intro
const f = function(aa) {
  const a = aa;
  return a.slice(0);
};
f(`0`);
const t = f(`1`);
$(t);
`````

## Settled


`````js filename=intro
$(`1`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1`);
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let aa = $$0;
  debugger;
  const a = aa;
  return a.slice(0);
};
f(`0`);
const t = f(`1`);
$(t);
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let aa = $$0;
  debugger;
  const a = aa;
  const tmpReturnArg = a.slice(0);
  return tmpReturnArg;
};
f(`0`);
const t = f(`1`);
$(t);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "1" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
