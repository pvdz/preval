# Preval test case

# ai_promise_catch_opaque_callback.md

> Ai > Ai2 > Ai promise catch opaque callback
>
> Test: promise.catch() with an opaque onRejected callback.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Opaque callback is attached for rejection.
let p = Promise.reject($('initial_rejection'));
let onRejected = $('opaque_catch_callback');
p.catch(onRejected);
$('catch_attached');
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(`initial_rejection`);
const p /*:promise*/ = $dotCall($Promise_reject, Promise, `reject`, tmpMCP);
const onRejected /*:unknown*/ = $(`opaque_catch_callback`);
$dotCall($promise_catch, p, `catch`, onRejected);
$(`catch_attached`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($promise_catch, $dotCall($Promise_reject, Promise, `reject`, $(`initial_rejection`)), `catch`, $(`opaque_catch_callback`));
$(`catch_attached`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_rejection" );
const b = $dotCall( $Promise_reject, Promise, "reject", a );
const c = $( "opaque_catch_callback" );
$dotCall( $promise_catch, b, "catch", c );
$( "catch_attached" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Promise_reject;
const tmpMCP = $(`initial_rejection`);
let p = $dotCall(tmpMCF, Promise, `reject`, tmpMCP);
let onRejected = $(`opaque_catch_callback`);
const tmpMCF$1 = p.catch;
$dotCall(tmpMCF$1, p, `catch`, onRejected);
$(`catch_attached`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $promise_catch


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
