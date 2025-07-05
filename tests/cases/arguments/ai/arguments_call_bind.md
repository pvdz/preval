# Preval test case

# arguments_call_bind.md

> Arguments > Ai > Arguments call bind
>
> Test using arguments with Function.call and Function.bind

## Input

`````js filename=intro
function testArgsCallBind() {
  const testFunc = (a, b, c) => $(a, b, c);
  const boundFunc = testFunc.bind(null, 'pre');
  boundFunc.call(null, ...arguments);
}
testArgsCallBind('x', 'y');
`````


## Settled


`````js filename=intro
const testFunc /*:(unknown, unknown, unknown)=>unknown*/ = function ($$0, $$1, $$2) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  const c /*:unknown*/ = $$2;
  debugger;
  const tmpReturnArg /*:unknown*/ = $(a, b, c);
  return tmpReturnArg;
};
const testArgsCallBind /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const boundFunc /*:function*/ /*truthy*/ = $dotCall($function_bind, testFunc, `bind`, null, `pre`);
  $dotCall(boundFunc, null, undefined, ...tmpPrevalAliasArgumentsAny);
  return undefined;
};
testArgsCallBind(`x`, `y`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testFunc = function (a, b, c) {
  const tmpReturnArg = $(a, b, c);
  return tmpReturnArg;
};
const testArgsCallBind = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $dotCall($dotCall($function_bind, testFunc, `bind`, null, `pre`), null, undefined, ...tmpPrevalAliasArgumentsAny);
};
testArgsCallBind(`x`, `y`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  const e = $( b, c, d );
  return e;
};
const f = function() {
  const g = h;
  debugger;
  const i = $dotCall( $function_bind, a, "bind", null, "pre" );
  $dotCall( i, null, undefined, ...g );
  return undefined;
};
f( "x", "y" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsCallBind = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const testFunc = function ($$0, $$1, $$2) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    debugger;
    const tmpReturnArg = $(a, b, c);
    return tmpReturnArg;
  };
  const tmpMCF = testFunc.bind;
  const boundFunc = $dotCall(tmpMCF, testFunc, `bind`, null, `pre`);
  const tmpMCF$1 = boundFunc.call;
  $dotCall(tmpMCF$1, boundFunc, `call`, null, ...tmpPrevalAliasArgumentsAny);
  return undefined;
};
testArgsCallBind(`x`, `y`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_bind
- (todo) access object property that also exists on prototype? $function_call
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it
- (todo) type trackeed tricks can possibly support static $function_bind


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pre', 'x', 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
