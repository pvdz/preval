# Preval test case

# return.md

> Unroll loop with true > Return
>
>

## Input

`````js filename=intro
function f() {
  return $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return true;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  return true;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return true;
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
