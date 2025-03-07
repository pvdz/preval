# Preval test case

# function.md

> Exprstmt > Function
>
> Unused functions without side-effects can be eliminated. Okay it's not an expression. You got me.

## Input

`````js filename=intro
function f() {
  $();
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
  $();
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $();
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
