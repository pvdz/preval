# Preval test case

# ai_async_function_await_opaque.md

> Ai > Ai2 > Ai async function await opaque
>
> Test: Async function awaiting an opaque value.

## Input

`````js filename=intro
// Expected: Await expression with opaque value is preserved.
async function test() {
  let x = await $('possibly_a_promise');
  $('awaited_value', x);
}
test().catch(e => $('await_error', e));
`````


## Settled


`````js filename=intro
const test /*:()=>promise*/ = async function () {
  debugger;
  const tmpAwaitArg /*:unknown*/ = $(`possibly_a_promise`);
  const x /*:unknown*/ = await tmpAwaitArg;
  $(`awaited_value`, x);
  return undefined;
};
const tmpMCOO /*:promise*/ /*truthy*/ = test();
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const e /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(`await_error`, e);
  return tmpReturnArg;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const test = async function () {
  const tmpAwaitArg = $(`possibly_a_promise`);
  $(`awaited_value`, await tmpAwaitArg);
};
$dotCall($promise_catch, test(), `catch`, function (e) {
  const tmpReturnArg = $(`await_error`, e);
  return tmpReturnArg;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function() {
  debugger;
  const b = $( "possibly_a_promise" );
  const c = (await (b));
  $( "awaited_value", c );
  return undefined;
};
const d = a();
const e = function($$0 ) {
  const f = $$0;
  debugger;
  const g = $( "await_error", f );
  return g;
};
$dotCall( $promise_catch, d, "catch", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = async function () {
  debugger;
  const tmpAwaitArg = $(`possibly_a_promise`);
  let x = await tmpAwaitArg;
  $(`awaited_value`, x);
  return undefined;
};
const tmpMCOO = test();
const tmpMCF = tmpMCOO.catch;
const tmpMCP = function ($$0) {
  let e = $$0;
  debugger;
  const tmpReturnArg = $(`await_error`, e);
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
 - 1: 'possibly_a_promise'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
