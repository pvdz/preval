# Preval test case

# base_call_const.md

> Locking > Base call const
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
    const x = f.call(obj, 1, 2, 3);
    f = false;
    $(x);
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
    const tmpClusterSSA_x$1 /*:unknown*/ /*truthy*/ = $dotCall($function_call, f, `call`, obj, 1, 2, 3);
    tmpFuncLock = false;
    $(tmpClusterSSA_x$1);
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
    const tmpClusterSSA_x$1 = $dotCall($function_call, f, `call`, {}, 1, 2, 3);
    tmpFuncLock = false;
    $(tmpClusterSSA_x$1);
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
    const i = $dotCall( $function_call, b, "call", h, 1, 2, 3 );
    a = false;
    $( i );
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
    const x$1 = $dotCall(tmpMCF, f, `call`, obj, 1, 2, 3);
    f = false;
    $(x$1);
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
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
