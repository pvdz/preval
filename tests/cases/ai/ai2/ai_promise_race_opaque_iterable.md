# Preval test case

# ai_promise_race_opaque_iterable.md

> Ai > Ai2 > Ai promise race opaque iterable
>
> Test: Promise.race with an opaque iterable.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Promise.race attempts to process the opaque iterable.
let iterable = $('opaque_promise_iterable_race');
Promise.race(iterable)
  .then(res => $('race_winner', res))
  .catch(err => $('race_loser_error', err));
`````


## Settled


`````js filename=intro
const iterable /*:unknown*/ = $(`opaque_promise_iterable_race`);
const tmpMCOO$1 /*:promise*/ /*truthy*/ = $dotCall($Promise_race, Promise, `race`, iterable);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const res /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`race_winner`, res);
  return tmpReturnArg;
};
const tmpMCOO /*:promise*/ /*truthy*/ = $dotCall($promise_then, tmpMCOO$1, `then`, tmpMCP);
const tmpMCP$1 /*:(unknown)=>unknown*/ = function ($$0) {
  const err /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(`race_loser_error`, err);
  return tmpReturnArg$1;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(
  $promise_catch,
  $dotCall($promise_then, $dotCall($Promise_race, Promise, `race`, $(`opaque_promise_iterable_race`)), `then`, function (res) {
    const tmpReturnArg = $(`race_winner`, res);
    return tmpReturnArg;
  }),
  `catch`,
  function (err) {
    const tmpReturnArg$1 = $(`race_loser_error`, err);
    return tmpReturnArg$1;
  },
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_promise_iterable_race" );
const b = $dotCall( $Promise_race, Promise, "race", a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = $( "race_winner", d );
  return e;
};
const f = $dotCall( $promise_then, b, "then", c );
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = $( "race_loser_error", h );
  return i;
};
$dotCall( $promise_catch, f, "catch", g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let iterable = $(`opaque_promise_iterable_race`);
const tmpMCF = $Promise_race;
const tmpMCOO$1 = $dotCall($Promise_race, Promise, `race`, iterable);
const tmpMCF$1 = tmpMCOO$1.then;
const tmpMCP = function ($$0) {
  let res = $$0;
  debugger;
  const tmpReturnArg = $(`race_winner`, res);
  return tmpReturnArg;
};
const tmpMCOO = $dotCall(tmpMCF$1, tmpMCOO$1, `then`, tmpMCP);
const tmpMCF$3 = tmpMCOO.catch;
const tmpMCP$1 = function ($$0) {
  let err = $$0;
  debugger;
  const tmpReturnArg$1 = $(`race_loser_error`, err);
  return tmpReturnArg$1;
};
$dotCall(tmpMCF$3, tmpMCOO, `catch`, tmpMCP$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_race
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
