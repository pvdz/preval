# Preval test case

# base.md

> Normalize > Arrow > Base
>
> Simple arrow case

## Input

`````js filename=intro
const f = () => $(1);
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
const f = () => {
  debugger;
  return $(1);
};
f();
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
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
