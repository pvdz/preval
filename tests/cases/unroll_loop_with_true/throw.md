# Preval test case

# throw.md

> Unroll loop with true > Throw
>
>

## Input

`````js filename=intro
function f() {
  throw $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
}
$(f);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  throw true;
};
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  throw true;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  throw true;
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  throw true;
};
$(f);
`````


## Todos triggered


None


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
