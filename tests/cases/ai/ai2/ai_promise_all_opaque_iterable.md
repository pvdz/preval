# Preval test case

# ai_promise_all_opaque_iterable.md

> Ai > Ai2 > Ai promise all opaque iterable
>
> Test: Promise.all with an opaque iterable.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Promise.all attempts to process the opaque iterable.
let iterable = $('opaque_promise_iterable'); // e.g. [Promise.resolve(1), $('p2')]
Promise.all(iterable)
  .then(res => $('all_resolved', res))
  .catch(err => $('all_rejected', err));
`````


## Settled


`````js filename=intro
const iterable /*:unknown*/ = $(`opaque_promise_iterable`);
const tmpMCOO$1 /*:promise*/ = $dotCall($Promise_all, Promise, `all`, iterable);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const res /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`all_resolved`, res);
  return tmpReturnArg;
};
const tmpMCOO /*:promise*/ = $dotCall($promise_then, tmpMCOO$1, `then`, tmpMCP);
const tmpMCP$1 /*:(unknown)=>unknown*/ = function ($$0) {
  const err /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(`all_rejected`, err);
  return tmpReturnArg$1;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(
  $promise_catch,
  $dotCall($promise_then, $dotCall($Promise_all, Promise, `all`, $(`opaque_promise_iterable`)), `then`, function (res) {
    const tmpReturnArg = $(`all_resolved`, res);
    return tmpReturnArg;
  }),
  `catch`,
  function (err) {
    const tmpReturnArg$1 = $(`all_rejected`, err);
    return tmpReturnArg$1;
  },
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_promise_iterable" );
const b = $dotCall( $Promise_all, Promise, "all", a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = $( "all_resolved", d );
  return e;
};
const f = $dotCall( $promise_then, b, "then", c );
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = $( "all_rejected", h );
  return i;
};
$dotCall( $promise_catch, f, "catch", g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let iterable = $(`opaque_promise_iterable`);
const tmpMCF = $Promise_all;
const tmpMCOO$1 = $dotCall($Promise_all, Promise, `all`, iterable);
const tmpMCF$1 = tmpMCOO$1.then;
const tmpMCP = function ($$0) {
  let res = $$0;
  debugger;
  const tmpReturnArg = $(`all_resolved`, res);
  return tmpReturnArg;
};
const tmpMCOO = $dotCall(tmpMCF$1, tmpMCOO$1, `then`, tmpMCP);
const tmpMCF$3 = tmpMCOO.catch;
const tmpMCP$1 = function ($$0) {
  let err = $$0;
  debugger;
  const tmpReturnArg$1 = $(`all_rejected`, err);
  return tmpReturnArg$1;
};
$dotCall(tmpMCF$3, tmpMCOO, `catch`, tmpMCP$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_all
- (todo) type trackeed tricks can possibly support static $promise_catch
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
