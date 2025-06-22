# Preval test case

# then_chaining.md

> Promises > Then chaining

Preval should detect test().then as a promise method.
The case is much harder to transform because `Promise.resolve($('opaque_return'))` would not cover the case where $ throws, a promise would trap that.
At the time of writing, the async func is left alone.

## Input

`````js filename=intro
async function test() {
  return $('opaque_return');
}
test().then(v => $('async_return_val', v));
`````


## Settled


`````js filename=intro
let tmpMCOO /*:unknown*/ = undefined;
try {
  const tmpReturnArg /*:unknown*/ = $(`opaque_return`);
  tmpMCOO = $Promise_resolve(tmpReturnArg);
} catch (tmpRejectErr) {
  tmpMCOO = $Promise_reject(tmpRejectErr);
}
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const v /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg$1 /*:unknown*/ = $(`async_return_val`, v);
  return tmpReturnArg$1;
};
$dotCall($promise_then, tmpMCOO, `then`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpMCOO = undefined;
try {
  tmpMCOO = $Promise_resolve($(`opaque_return`));
} catch (tmpRejectErr) {
  tmpMCOO = $Promise_reject(tmpRejectErr);
}
$dotCall($promise_then, tmpMCOO, `then`, function (v) {
  const tmpReturnArg$1 = $(`async_return_val`, v);
  return tmpReturnArg$1;
});
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
try {
  const b = $( "opaque_return" );
  a = $Promise_resolve( b );
}
catch (c) {
  a = $Promise_reject( c );
}
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = $( "async_return_val", e );
  return f;
};
$dotCall( $promise_then, a, "then", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let test = async function () {
  debugger;
  const tmpReturnArg = $(`opaque_return`);
  return tmpReturnArg;
};
const tmpMCOO = test();
const tmpMCF = tmpMCOO.then;
const tmpMCP = function ($$0) {
  let v = $$0;
  debugger;
  const tmpReturnArg$1 = $(`async_return_val`, v);
  return tmpReturnArg$1;
};
$dotCall(tmpMCF, tmpMCOO, `then`, tmpMCP);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $promise_then
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) inline async functions safely (because await)
- (todo) type trackeed tricks can possibly support static $Promise_reject
- (todo) type trackeed tricks can possibly support static $Promise_resolve
- (todo) type trackeed tricks can possibly support static $promise_then


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_return'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
