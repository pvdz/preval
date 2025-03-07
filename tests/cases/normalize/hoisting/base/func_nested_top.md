# Preval test case

# func_nested_top.md

> Normalize > Hoisting > Base > Func nested top
>
> Function declarations in a block are not hoisted

## Input

`````js filename=intro
function g() {
  $(f());
  function f() {
    return 100;
  }
  $(f());
}
g();
`````

## Settled


`````js filename=intro
$(100);
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return 100;
  };
  $(f());
  $(f());
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
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
  return undefined;
};
g();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
