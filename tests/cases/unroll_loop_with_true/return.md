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
const f /*:()=>unknown*/ = function $pcompiled() {
  debugger;
  return true;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function $pcompiled() {
  return true;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  return true;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  return true;
};
$(f);
`````


## Todos triggered


- (todo) this implies a bug and we should prevent it; p


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
