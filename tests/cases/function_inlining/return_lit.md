# Preval test case

# return_lit.md

> Function inlining > Return lit
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return 10;
}
$(f());
`````

## Settled


`````js filename=intro
$(10);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return 10;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
