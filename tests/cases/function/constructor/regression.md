# Preval test case

# regression.md

> Function > Constructor > Regression
>
> The Function() inlining would fail because the pid counter would start at 1, leading to duplicate pids.
> The normalization would need to not reset the pid counter when normalization during cloning

## Input

`````js filename=intro
// This test triggered the regression at the time of writing.
const f = Function(`return (function() {}.constructor("return this")( ));`);
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return window;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  return window;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return window;
};
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
