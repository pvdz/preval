# Preval test case

# unused_spread_param_multi-call.md

> Rest > Param > Unused > Unused spread param multi-call
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  $(rest);
}
f();
f();
f();
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const rest /*:array*/ = [];
  $(rest);
  return undefined;
};
f();
f();
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $([]);
};
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  $(rest);
};
f();
f();
f();
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  $(rest);
  return undefined;
};
f();
f();
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [];
  $( b );
  return undefined;
};
a();
a();
a();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: []
 - 2: []
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- drop unused rest param?