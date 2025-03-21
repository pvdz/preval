# Preval test case

# odd_early_return3a.md

> Normalize > Switch > Odd early return3a
>
> Sorting out the branching stuff

Regression was not inlining a single used function.

This version is wrapped in another function.

There's an implicit global that should prevent compilation.

## Input

`````js filename=intro
function f() {
  const inlineMe = function () {
    $ <= 3;
  };
  const g = function () {
    if ($) {
      inlineMe();
    }
  };
  if (implicitGlobalOops) {
    g();
  }
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  implicitGlobalOops;
  return undefined;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  implicitGlobalOops;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  implicitGlobalOops;
  return undefined;
};
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

implicitGlobalOops


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
