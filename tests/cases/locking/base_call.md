# Preval test case

# base_call.md

> Locking > Base call
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f(a, b, c) {
  $('call me once', this, a, b, c);
}
function g() {
  let x = f;
  if (f) {
    const obj = {}
    f.call(obj, 1, 2, 3);
    f = false;
  }
}
$(g());
$(g());
`````


## Settled


`````js filename=intro
let tmpFuncLock /*:boolean*/ = true;
const f /*:(unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  const c /*:unknown*/ = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
  return undefined;
};
const g /*:()=>undefined*/ = function () {
  debugger;
  if (tmpFuncLock) {
    const obj /*:object*/ /*truthy*/ = {};
    $dotCall($function_call, f, `call`, obj, 1, 2, 3);
    tmpFuncLock = false;
    return undefined;
  } else {
    return undefined;
  }
};
g();
$(undefined);
g();
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpFuncLock = true;
const f = function (a, b, c) {
  $(`call me once`, this, a, b, c);
};
const g = function () {
  if (tmpFuncLock) {
    $dotCall($function_call, f, `call`, {}, 1, 2, 3);
    tmpFuncLock = false;
  }
};
g();
$(undefined);
g();
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = true;
const b = function($$0,$$1,$$2 ) {
  const c = this;
  const d = $$0;
  const e = $$1;
  const f = $$2;
  debugger;
  $( "call me once", c, d, e, f );
  return undefined;
};
const g = function() {
  debugger;
  if (a) {
    const h = {};
    $dotCall( $function_call, b, "call", h, 1, 2, 3 );
    a = false;
    return undefined;
  }
  else {
    return undefined;
  }
};
g();
$( undefined );
g();
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  if (f) {
    const obj = {};
    const tmpMCF = f.call;
    $dotCall(tmpMCF, f, `call`, obj, 1, 2, 3);
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
let tmpCalleeParam = g();
$(tmpCalleeParam);
let tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me once', {}, 1, 2, 3
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
