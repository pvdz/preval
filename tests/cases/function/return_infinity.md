# Preval test case

# return_infinity.md

> Function > Return infinity
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Settled


`````js filename=intro
$(Infinity);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Infinity);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return Infinity;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return Infinity;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( Infinity );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
