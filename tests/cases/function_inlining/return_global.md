# Preval test case

# return_global.md

> Function inlining > Return global
>
> We should be able to inline certain functions

## Input

`````js filename=intro
let y = $(10);
function f() {
  return y;
}
$(f());
`````

## Settled


`````js filename=intro
const y /*:unknown*/ = $(10);
$(y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return y;
};
let y = $(10);
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return y;
};
let y = $(10);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
