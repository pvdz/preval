# Preval test case

# return_implicit.md

> Function inlining > Return implicit
>
> We should be able to inline certain functions

## Input

`````js filename=intro
function f() {
  return foo; // implicit global
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = foo;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(foo);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return foo;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return foo;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = foo;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
