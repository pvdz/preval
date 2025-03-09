# Preval test case

# unused_param_only.md

> Rest > Param > Unused > Unused param only
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  return $('fwep');
}
f();
`````

## Settled


`````js filename=intro
$(`fwep`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`fwep`);
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  return $(`fwep`);
};
f();
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  const tmpReturnArg = $(`fwep`);
  return tmpReturnArg;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( "fwep" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- drop unused rest param?
