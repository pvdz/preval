# Preval test case

# ai_promise_resolve_opaque_value.md

> Ai > Ai2 > Ai promise resolve opaque value
>
> Test: Promise.resolve with an opaque value.

## Options

Promises need to be figured out
- skipEval

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Returns a promise resolved with the opaque value.
let val = $('opaque_val_for_promise');
Promise.resolve(val).then(v => $('resolved', v));
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(`opaque_val_for_promise`);
const tmpMCOO /*:promise*/ /*truthy*/ = $dotCall($Promise_resolve, Promise, `resolve`, val);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const v /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`resolved`, v);
  return tmpReturnArg;
};
$dotCall($promise_then, tmpMCOO, `then`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($promise_then, $dotCall($Promise_resolve, Promise, `resolve`, $(`opaque_val_for_promise`)), `then`, function (v) {
  const tmpReturnArg = $(`resolved`, v);
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_val_for_promise" );
const b = $dotCall( $Promise_resolve, Promise, "resolve", a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = $( "resolved", d );
  return e;
};
$dotCall( $promise_then, b, "then", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val = $(`opaque_val_for_promise`);
const tmpMCF = $Promise_resolve;
const tmpMCOO = $dotCall($Promise_resolve, Promise, `resolve`, val);
const tmpMCF$1 = tmpMCOO.then;
const tmpMCP = function ($$0) {
  let v = $$0;
  debugger;
  const tmpReturnArg = $(`resolved`, v);
  return tmpReturnArg;
};
$dotCall(tmpMCF$1, tmpMCOO, `then`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $promise_then


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
