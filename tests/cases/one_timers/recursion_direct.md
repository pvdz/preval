# Preval test case

# recursion_direct.md

> One timers > Recursion direct
>
> Ouroboros! This was triggering a problem in another test. Turns out to be caused by recursion.

## Input

`````js filename=intro
function f() {
  let x = 1;
  f();
  $(x);
}
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  f();
  $(1);
  return undefined;
};
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  f();
  $(1);
};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  a();
  $( 1 );
  return undefined;
};
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
