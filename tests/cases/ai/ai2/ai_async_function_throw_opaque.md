# Preval test case

# ai_async_function_throw_opaque.md

> Ai > Ai2 > Ai async function throw opaque
>
> Test: Async function throwing an opaque value.

## Options

We have to figure out how to deal with promises that throw in our test runner
- skipEval

## Input

`````js filename=intro
// Expected: Async function rejects with the opaque thrown value.
async function test() {
  throw $('opaque_throw_reason');
}
test().catch(e => $('async_throw_reason', e));
`````


## Settled


`````js filename=intro
const test /*:()=>promise*/ = async function () {
  debugger;
  const tmpThrowArg /*:unknown*/ = $(`opaque_throw_reason`);
  throw tmpThrowArg;
};
const tmpMCOO /*:promise*/ /*truthy*/ = test();
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const e /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`async_throw_reason`, e);
  return tmpReturnArg;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = async function () {
  const tmpThrowArg = $(`opaque_throw_reason`);
  throw tmpThrowArg;
};
$dotCall($promise_catch, test(), `catch`, function (e) {
  const tmpReturnArg = $(`async_throw_reason`, e);
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $( "opaque_throw_reason" );
  throw b;
};
const c = a();
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = $( "async_throw_reason", e );
  return f;
};
$dotCall( $promise_catch, c, "catch", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = async function () {
  debugger;
  const tmpThrowArg = $(`opaque_throw_reason`);
  throw tmpThrowArg;
};
const tmpMCOO = test();
const tmpMCF = tmpMCOO.catch;
const tmpMCP = function ($$0) {
  let e = $$0;
  debugger;
  const tmpReturnArg = $(`async_throw_reason`, e);
  return tmpReturnArg;
};
$dotCall(tmpMCF, tmpMCOO, `catch`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) inline async functions safely (because await)
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
