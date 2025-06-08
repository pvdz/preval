# Preval test case

# ai_promise_finally_opaque_callback.md

> Ai > Ai2 > Ai promise finally opaque callback
>
> Test: promise.finally() with an opaque callback.

## Options

Promises need to be figured out
- skipEval

## Input

`````js filename=intro
// Expected: Opaque callback is attached for finally.
let p = Promise.resolve($('val'));
let onFinally = $('opaque_finally_callback');
p.finally(onFinally);
$('finally_attached');
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(`val`);
const p /*:promise*/ /*truthy*/ = $dotCall($Promise_resolve, Promise, `resolve`, tmpMCP);
const onFinally /*:unknown*/ = $(`opaque_finally_callback`);
$dotCall($promise_finally, p, `finally`, onFinally);
$(`finally_attached`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($promise_finally, $dotCall($Promise_resolve, Promise, `resolve`, $(`val`)), `finally`, $(`opaque_finally_callback`));
$(`finally_attached`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $dotCall( $Promise_resolve, Promise, "resolve", a );
const c = $( "opaque_finally_callback" );
$dotCall( $promise_finally, b, "finally", c );
$( "finally_attached" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Promise_resolve;
const tmpMCP = $(`val`);
let p = $dotCall(tmpMCF, Promise, `resolve`, tmpMCP);
let onFinally = $(`opaque_finally_callback`);
const tmpMCF$1 = p.finally;
$dotCall(tmpMCF$1, p, `finally`, onFinally);
$(`finally_attached`);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_finally
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $promise_finally


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
