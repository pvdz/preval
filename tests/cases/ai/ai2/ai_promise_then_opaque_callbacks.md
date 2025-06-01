# Preval test case

# ai_promise_then_opaque_callbacks.md

> Ai > Ai2 > Ai promise then opaque callbacks
>
> Test: promise.then() with opaque onFulfilled and onRejected callbacks.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Opaque callbacks are attached.
let p = Promise.resolve($('initial_promise_value'));
let onFulfilled = $('opaque_onFulfilled');
let onRejected = $('opaque_onRejected');
p.then(onFulfilled, onRejected);
$('then_attached');
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(`initial_promise_value`);
const p /*:promise*/ = $dotCall($Promise_resolve, Promise, `resolve`, tmpMCP);
const onFulfilled /*:unknown*/ = $(`opaque_onFulfilled`);
const onRejected /*:unknown*/ = $(`opaque_onRejected`);
$dotCall($promise_then, p, `then`, onFulfilled, onRejected);
$(`then_attached`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall(
  $promise_then,
  $dotCall($Promise_resolve, Promise, `resolve`, $(`initial_promise_value`)),
  `then`,
  $(`opaque_onFulfilled`),
  $(`opaque_onRejected`),
);
$(`then_attached`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_promise_value" );
const b = $dotCall( $Promise_resolve, Promise, "resolve", a );
const c = $( "opaque_onFulfilled" );
const d = $( "opaque_onRejected" );
$dotCall( $promise_then, b, "then", c, d );
$( "then_attached" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Promise_resolve;
const tmpMCP = $(`initial_promise_value`);
let p = $dotCall(tmpMCF, Promise, `resolve`, tmpMCP);
let onFulfilled = $(`opaque_onFulfilled`);
let onRejected = $(`opaque_onRejected`);
const tmpMCF$1 = p.then;
$dotCall(tmpMCF$1, p, `then`, onFulfilled, onRejected);
$(`then_attached`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_then
- (todo) type trackeed tricks can possibly support static $Promise_resolve
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
