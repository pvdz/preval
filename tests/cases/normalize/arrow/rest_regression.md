# Preval test case

# rest_regression.md

> Normalize > Arrow > Rest regression
>
> Would trip and cause the array param rest arg to fail

## Input

`````js filename=intro
const a = (...arg) => x;
$(a);
`````

## Settled


`````js filename=intro
const a /*:(unused)=>unknown*/ = function ($$0) {
  debugger;
  return x;
};
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function ($$0) {
  return x;
});
`````

## Pre Normal


`````js filename=intro
const a = (...$$0) => {
  let arg = $$0;
  debugger;
  return x;
};
$(a);
`````

## Normalized


`````js filename=intro
const a = function (...$$0 /*:array*/) {
  let arg = $$0;
  debugger;
  return x;
};
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  debugger;
  return x;
};
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- drop unused rest param?