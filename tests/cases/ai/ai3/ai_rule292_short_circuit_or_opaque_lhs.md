# Preval test case

# ai_rule292_short_circuit_or_opaque_lhs.md

> Ai > Ai3 > Ai rule292 short circuit or opaque lhs
>
> Test: Short-circuiting behavior of || with an opaque LHS.

## Input

`````js filename=intro
// Expected: The function call on the RHS should be preserved and its execution should depend on the opaque LHS.
function potentiallyCalled() {
  return $('func_called', true);
}
let cond = $('cond', true); // Preval sees this as opaque
let result = $('result', cond || potentiallyCalled());
`````


## Settled


`````js filename=intro
const cond /*:unknown*/ = $(`cond`, true);
if (cond) {
  $(`result`, cond);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(`func_called`, true);
  $(`result`, tmpClusterSSA_tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cond = $(`cond`, true);
if (cond) {
  $(`result`, cond);
} else {
  $(`result`, $(`func_called`, true));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond", true );
if (a) {
  $( "result", a );
}
else {
  const b = $( "func_called", true );
  $( "result", b );
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
let cond = $(`cond`, true);
let tmpCalleeParam = cond;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = potentiallyCalled();
}
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond', true
 - 2: 'result', 'cond'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
