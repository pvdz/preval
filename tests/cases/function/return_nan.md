# Preval test case

# return_nan.md

> Function > Return nan
>
> A function that returns NaN

## Input

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Settled


`````js filename=intro
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return NaN;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
