# Preval test case

# var_func_top.md

> Normalize > Hoisting > Base > Var func top
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  var x = 10;
  $(x);
  return x;
}
$(f());
`````

## Settled


`````js filename=intro
$(undefined);
$(10);
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
$(10);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  x = 10;
  $(x);
  return x;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  $(x);
  x = 10;
  $(x);
  return x;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
