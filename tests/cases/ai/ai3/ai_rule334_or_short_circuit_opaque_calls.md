# Preval test case

# ai_rule334_or_short_circuit_opaque_calls.md

> Ai > Ai3 > Ai rule334 or short circuit opaque calls
>
> Test: Short-circuit OR with two opaque function calls.

## Input

`````js filename=intro
// Expected: let res = $('funcA', () => true)() || $('funcB', () => true)(); $('result', res);
let fA = $('funcA', () => $('eval_fA', true)); // funcA will return true
let fB = $('funcB', () => $('eval_fB', false));
let result = fA() || fB();
$('final_result', result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`eval_fA`, true);
  return tmpReturnArg;
};
const fA /*:unknown*/ = $(`funcA`, tmpCalleeParam);
const tmpCalleeParam$1 /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(`eval_fB`, false);
  return tmpReturnArg$1;
};
const fB /*:unknown*/ = $(`funcB`, tmpCalleeParam$1);
const result /*:unknown*/ = fA();
if (result) {
  $(`final_result`, result);
} else {
  const tmpClusterSSA_result /*:unknown*/ = fB();
  $(`final_result`, tmpClusterSSA_result);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const fA = $(`funcA`, function () {
  const tmpReturnArg = $(`eval_fA`, true);
  return tmpReturnArg;
});
const fB = $(`funcB`, function () {
  const tmpReturnArg$1 = $(`eval_fB`, false);
  return tmpReturnArg$1;
});
const result = fA();
if (result) {
  $(`final_result`, result);
} else {
  $(`final_result`, fB());
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( "eval_fA", true );
  return b;
};
const c = $( "funcA", a );
const d = function() {
  debugger;
  const e = $( "eval_fB", false );
  return e;
};
const f = $( "funcB", d );
const g = c();
if (g) {
  $( "final_result", g );
}
else {
  const h = f();
  $( "final_result", h );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = function () {
  debugger;
  const tmpReturnArg = $(`eval_fA`, true);
  return tmpReturnArg;
};
let fA = $(`funcA`, tmpCalleeParam);
let tmpCalleeParam$1 = function () {
  debugger;
  const tmpReturnArg$1 = $(`eval_fB`, false);
  return tmpReturnArg$1;
};
let fB = $(`funcB`, tmpCalleeParam$1);
let result = fA();
if (result) {
  $(`final_result`, result);
} else {
  result = fB();
  $(`final_result`, result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'funcA', '<function>'
 - 2: 'funcB', '<function>'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
