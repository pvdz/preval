# Preval test case

# arguments.md

> Normalize > Arguments > Arguments
>
> Arguments is a special global

## Input

`````js filename=intro
function f() {
  arguments;
}
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  null;
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
