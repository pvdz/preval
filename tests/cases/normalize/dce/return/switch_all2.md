# Preval test case

# switch_all2.md

> Normalize > Dce > Return > Switch all2
>
> Any statements that follow a return in the same parent should be eliminated.

This case uncovered a problem where fresh bindings up to the label would end up being params and local consts, causing a crash.

## Input

`````js filename=intro
let f = function () {
  const tmpSwitchValue = 1;
  tmpSwitchBreak: {
    return
  }
  2;
};
$(f());

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
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  tmpSwitchBreak: {
    return;
  }
  2;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = 1;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
