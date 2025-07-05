# Preval test case

# i_promise_this.md

> Tofix > i promise this
>
> When you await a new Promise with a function that ignores the args, the promise hangs forever.
> But the function can be called explicitly before that point.

The await isn't even very relevant here (it would not solve the eval issue because node would still get stuck waiting for that pending promise).

The result should call callback and then start the infinite promise, calling an empty callback.
We may want to throw for the infinite promise since we can detect it.
Though throwing is not the same as never resolving so maybe add a logger warning instead?

## Options

DO NOT EVAL THIS. the promise will await forever, it's like an endless loop. I'm hesitant to even put up this test case.

- skipEval

## Input

`````js filename=intro
const callback = function(a, b) {
  require_request_get('some url');
};
const endlessLoop = async function() {
  // gets stuck here forever
  await new Promise(callback);
};
endlessLoop();
`````


## Settled


`````js filename=intro
const callback /*:(unused, unused)=>undefined*/ = function ($$0, $$1) {
  debugger;
  require_request_get(`some url`);
  return undefined;
};
const endlessLoop /*:()=>promise*/ = async function () {
  debugger;
  const tmpAwaitArg /*:object*/ /*truthy*/ = new Promise(callback);
  await tmpAwaitArg;
  return undefined;
};
endlessLoop();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const callback = function ($$0, $$1) {
  require_request_get(`some url`);
};
const endlessLoop = async function () {
  const tmpAwaitArg = new Promise(callback);
  await tmpAwaitArg;
};
endlessLoop();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  debugger;
  require_request_get( "some url" );
  return undefined;
};
const b = async function() {
  debugger;
  const c = new Promise( a );
  (await (c));
  return undefined;
};
b();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const callback = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  require_request_get(`some url`);
  return undefined;
};
const endlessLoop = async function () {
  debugger;
  const tmpAwaitArg = new Promise(callback);
  await tmpAwaitArg;
  return undefined;
};
endlessLoop();
`````


## Todos triggered


- (todo) inline async functions safely (because await)


## Globals


BAD@! Found 1 implicit global bindings:

require_request_get


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
