# Preval test case

# _base_global.md

> One timers > Base global
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  $(1);
}
f();
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
