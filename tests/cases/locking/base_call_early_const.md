# Preval test case

# base_call_early_const.md

> Locking > Base call early const
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f(a, b, c) {
  $('call me once', this, a, b, c);
}
function g() {
  let x = f;
  const obj = {}
  const y = f.call(obj, 1, 2, 3); // This should crash after the first call
  if (f) {
    f = false;
  }
  $(y);
}
$(g());
$(g());
`````

## Settled


`````js filename=intro
let tmpFuncLock /*:boolean*/ = true;
const f /*:(unknown, unknown, unknown)=>undefined*/ = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis /*:object*/ = this;
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
    const obj /*:object*/ = {};
    const tmpClusterSSA_y /*:unknown*/ = f.call(obj, 1, 2, 3);
    tmpFuncLock = false;
    $(tmpClusterSSA_y);
    return undefined;
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
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
    const tmpClusterSSA_y = f.call({}, 1, 2, 3);
    tmpFuncLock = false;
    $(tmpClusterSSA_y);
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
  }
};
g();
$(undefined);
g();
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
};
let g = function () {
  debugger;
  let x = f;
  const obj = {};
  const y = f.call(obj, 1, 2, 3);
  if (f) {
    f = false;
  }
  $(y);
};
$(g());
$(g());
`````

## Normalized


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
  const obj = {};
  const y = f.call(obj, 1, 2, 3);
  if (f) {
    f = false;
  } else {
  }
  $(y);
  return undefined;
};
const tmpCalleeParam = g();
$(tmpCalleeParam);
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
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
    const i = b.call( h, 1, 2, 3 );
    a = false;
    $( i );
    return undefined;
  }
  else {
    throw "Preval: cannot call a locked function (binding overwritten with non-func)";
  }
};
g();
$( undefined );
g();
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'call me once', {}, 1, 2, 3
 - 2: undefined
 - 3: undefined
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
