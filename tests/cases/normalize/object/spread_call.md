# Preval test case

# spread_call.md

> Normalize > Object > Spread call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
function f(){
  return $({x: 1});
}
$({...f()});
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: 1 };
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ = { ...tmpReturnArg };
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpReturnArg = $({ x: 1 });
$({ ...tmpReturnArg });
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $({ x: 1 });
};
$({ ...f() });
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = { x: 1 };
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpObjSpread = f();
const tmpCalleeParam$1 = { ...tmpObjSpread };
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = { ... b };
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
