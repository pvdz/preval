# Preval test case

# ai_rule346_async_arrow_await_opaque.md

> Ai > Ai3 > Ai rule346 async arrow await opaque
>
> Test: async arrow function assigned to var, called, awaits opaque.

## Input

`````js filename=intro
// Expected: const f = async () => await $('p'); f().then(v => $('res', v));
const myAsyncArrow = async (p_val) => {
  $('arrow_started');
  let awaited_val = await p_val;
  $('arrow_awaited', awaited_val);
  return $('arrow_return', awaited_val);
};

let p = $('promise_like');
myAsyncArrow(p).then(final_val => {
  $('then_called', final_val);
}).catch(e => {
  $('catch_called', e);
});
`````


## Settled


`````js filename=intro
const myAsyncArrow /*:(unknown)=>promise*/ = async function ($$0) {
  const p_val /*:unknown*/ = $$0;
  debugger;
  $(`arrow_started`);
  const awaited_val /*:unknown*/ = await p_val;
  $(`arrow_awaited`, awaited_val);
  const tmpReturnArg /*:unknown*/ = $(`arrow_return`, awaited_val);
  return tmpReturnArg;
};
const p /*:unknown*/ = $(`promise_like`);
const tmpMCOO$1 /*:promise*/ = myAsyncArrow(p);
const tmpMCP /*:(unknown)=>undefined*/ = function ($$0) {
  const final_val /*:unknown*/ = $$0;
  debugger;
  $(`then_called`, final_val);
  return undefined;
};
const tmpMCOO /*:promise*/ = $dotCall($promise_then, tmpMCOO$1, `then`, tmpMCP);
const tmpMCP$1 /*:(unknown)=>undefined*/ = function ($$0) {
  const e /*:unknown*/ = $$0;
  debugger;
  $(`catch_called`, e);
  return undefined;
};
$dotCall($promise_catch, tmpMCOO, `catch`, tmpMCP$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const myAsyncArrow = async function (p_val) {
  $(`arrow_started`);
  const awaited_val = await p_val;
  $(`arrow_awaited`, awaited_val);
  const tmpReturnArg = $(`arrow_return`, awaited_val);
  return tmpReturnArg;
};
$dotCall(
  $promise_catch,
  $dotCall($promise_then, myAsyncArrow($(`promise_like`)), `then`, function (final_val) {
    $(`then_called`, final_val);
  }),
  `catch`,
  function (e) {
    $(`catch_called`, e);
  },
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = async function($$0 ) {
  const b = $$0;
  debugger;
  $( "arrow_started" );
  const c = (await (b));
  $( "arrow_awaited", c );
  const d = $( "arrow_return", c );
  return d;
};
const e = $( "promise_like" );
const f = a( e );
const g = function($$0 ) {
  const h = $$0;
  debugger;
  $( "then_called", h );
  return undefined;
};
const i = $dotCall( $promise_then, f, "then", g );
const j = function($$0 ) {
  const k = $$0;
  debugger;
  $( "catch_called", k );
  return undefined;
};
$dotCall( $promise_catch, i, "catch", j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const myAsyncArrow = async function ($$0) {
  let p_val = $$0;
  debugger;
  $(`arrow_started`);
  let awaited_val = await p_val;
  $(`arrow_awaited`, awaited_val);
  const tmpReturnArg = $(`arrow_return`, awaited_val);
  return tmpReturnArg;
};
let p = $(`promise_like`);
const tmpMCOO$1 = myAsyncArrow(p);
const tmpMCF = tmpMCOO$1.then;
const tmpMCP = function ($$0) {
  let final_val = $$0;
  debugger;
  $(`then_called`, final_val);
  return undefined;
};
const tmpMCOO = $dotCall(tmpMCF, tmpMCOO$1, `then`, tmpMCP);
const tmpMCF$1 = tmpMCOO.catch;
const tmpMCP$1 = function ($$0) {
  let e = $$0;
  debugger;
  $(`catch_called`, e);
  return undefined;
};
$dotCall(tmpMCF$1, tmpMCOO, `catch`, tmpMCP$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_catch
- (todo) access object property that also exists on prototype? $promise_then
- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $promise_catch
- (todo) type trackeed tricks can possibly support static $promise_then


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'promise_like'
 - 2: 'arrow_started'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
