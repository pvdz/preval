# Preval test case

# base.md

> Try > Noop > Base
>
> Certain statements probably never benefit from running inside a try

## Input

`````js filename=intro
function f() {
  try {
    return 100;
  } catch {}
}
$(f());
`````

## Settled


`````js filename=intro
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  try {
    return 100;
  } catch (e) {}
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return 100;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
