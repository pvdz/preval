# Preval test case

# ai_promise_reject_opaque_reason.md

> Ai > Ai2 > Ai promise reject opaque reason
>
> Test: Promise.reject with an opaque reason.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Returns a promise rejected with the opaque reason.
let reason = $('opaque_rejection_reason');
Promise.reject(reason).catch(r => $('rejected', r));
`````


## Settled


`````js filename=intro
const reason /*:unknown*/ = $(`opaque_rejection_reason`);
const tmpMCOO /*:promise*/ /*truthy*/ = $Promise_reject(reason);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const r /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`rejected`, r);
  return tmpReturnArg;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($promise_catch, $Promise_reject($(`opaque_rejection_reason`)), `catch`, function (r) {
  const tmpReturnArg = $(`rejected`, r);
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_rejection_reason" );
const b = $Promise_reject( a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = $( "rejected", d );
  return e;
};
$dotCall( $promise_catch, b, "catch", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let reason = $(`opaque_rejection_reason`);
const tmpMCF = $Promise_reject;
const tmpMCOO = $Promise_reject(reason);
const tmpMCF$1 = tmpMCOO.catch;
const tmpMCP = function ($$0) {
  let r = $$0;
  debugger;
  const tmpReturnArg = $(`rejected`, r);
  return tmpReturnArg;
};
$dotCall(tmpMCF$1, tmpMCOO, `catch`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $promise_catch


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
