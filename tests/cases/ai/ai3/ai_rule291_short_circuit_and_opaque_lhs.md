# Preval test case

# ai_rule291_short_circuit_and_opaque_lhs.md

> Ai > Ai3 > Ai rule291 short circuit and opaque lhs
>
> Test: Short-circuiting behavior of && with an opaque LHS.

## Input

`````js filename=intro
// Expected: The function call on the RHS should be preserved and its execution should depend on the opaque LHS.
function potentiallyCalled() {
  return $('func_called', true);
}
let cond = $('cond', false); // Preval sees this as opaque
let result = $('result', cond && potentiallyCalled());
`````


## Settled


`````js filename=intro
const cond /*:unknown*/ = $(`cond`, false);
if (cond) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`func_called`, true);
  $(`result`, tmpClusterSSA_tmpCalleeParam);
} else {
  $(`result`, cond);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cond = $(`cond`, false);
if (cond) {
  $(`result`, $(`func_called`, true));
} else {
  $(`result`, cond);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond", false );
if (a) {
  const b = $( "func_called", true );
  $( "result", b );
}
else {
  $( "result", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let potentiallyCalled = function () {
  debugger;
  const tmpReturnArg = $(`func_called`, true);
  return tmpReturnArg;
};
let cond = $(`cond`, false);
let tmpCalleeParam = cond;
if (tmpCalleeParam) {
  tmpCalleeParam = potentiallyCalled();
} else {
}
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond', false
 - 2: 'func_called', true
 - 3: 'result', 'func_called'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
