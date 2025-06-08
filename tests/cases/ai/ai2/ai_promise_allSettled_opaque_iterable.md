# Preval test case

# ai_promise_allSettled_opaque_iterable.md

> Ai > Ai2 > Ai promise allSettled opaque iterable
>
> Test: Promise.allSettled with an opaque iterable.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Promise.allSettled attempts to process the opaque iterable.
let iterable = $('opaque_promise_iterable_settled');
Promise.allSettled(iterable)
  .then(res => $('allSettled_results', res));
`````


## Settled


`````js filename=intro
const iterable /*:unknown*/ = $(`opaque_promise_iterable_settled`);
const tmpMCOO /*:promise*/ /*truthy*/ = $dotCall($Promise_allSettled, Promise, `allSettled`, iterable);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const res /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`allSettled_results`, res);
  return tmpReturnArg;
};
$dotCall($promise_then, tmpMCOO, `then`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($promise_then, $dotCall($Promise_allSettled, Promise, `allSettled`, $(`opaque_promise_iterable_settled`)), `then`, function (res) {
  const tmpReturnArg = $(`allSettled_results`, res);
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_promise_iterable_settled" );
const b = $dotCall( $Promise_allSettled, Promise, "allSettled", a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = $( "allSettled_results", d );
  return e;
};
$dotCall( $promise_then, b, "then", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let iterable = $(`opaque_promise_iterable_settled`);
const tmpMCF = $Promise_allSettled;
const tmpMCOO = $dotCall($Promise_allSettled, Promise, `allSettled`, iterable);
const tmpMCF$1 = tmpMCOO.then;
const tmpMCP = function ($$0) {
  let res = $$0;
  debugger;
  const tmpReturnArg = $(`allSettled_results`, res);
  return tmpReturnArg;
};
$dotCall(tmpMCF$1, tmpMCOO, `then`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_allSettled
- (todo) type trackeed tricks can possibly support static $promise_then


## Globals


BAD@! Found 1 implicit global bindings:

Promise


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
