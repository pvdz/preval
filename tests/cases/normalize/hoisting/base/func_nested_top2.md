# Preval test case

# func_nested_top2.md

> Normalize > Hoisting > Base > Func nested top2
>
> Function declarations in a block are not hoisted

## Input

`````js filename=intro
g();
function g() {
  f();
  function f() {
    return 100;
  }
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
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return 100;
  };
  f();
};
g();
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return 100;
  };
  f();
  return undefined;
};
g();
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
