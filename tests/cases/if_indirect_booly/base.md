# Preval test case

# base.md

> If indirect booly > Base
>
> This is from an intermediate result of an obfuscation case where they store computation results as expandos on a function.
> The trick here is that `a === undefined` is really testing whether `a` is booly so `test` should get eliminated.

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd'];
let a/*:primitive*/ = undefined;
let b/*:unknown*/ = undefined;
let c/*:unknown*/ = undefined;
const func/*:(number, string)=>unknown*/ = function($$0, $$1) {
  const arg1/*:number*/ = $$0;
  const arg2/*:string*/ = $$1;
  debugger;
  const test/*:boolean*/ = a === undefined;
  if (test) {
    b = $;
    c = {};
    a = true;
  } else {

  }
  const v1/*:string*/ = arr[0];
  const c_prime/*:unknown*/ = c;
  const concatted/*:string*/ = arg1 + v1;
  const lookup/*:unknown*/ = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real/*:unknown*/ = b(arg2);
    c[concatted] = real;
    return real;
  }
};
const x/*:unknown*/ = func(22, tmpOAL);
const y/*:unknown*/ = func(12, tmpOAL$1);
$(x, y);
`````


## Settled


`````js filename=intro
let c /*:unknown*/ = undefined;
const func /*:(number, unknown)=>unknown*/ = function ($$0, $$1) {
  const $dlr_$$1 /*:number*/ = $$0;
  const $dlr_$$3 /*:unknown*/ = $$1;
  debugger;
  let c_prime /*:unknown*/ /*ternaryConst*/ = undefined;
  if (c) {
    c_prime = c;
  } else {
    c = {};
    c_prime = c;
  }
  const concatted /*:string*/ /*truthy*/ = `${$dlr_$$1}a`;
  const lookup /*:unknown*/ = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real /*:unknown*/ = $($dlr_$$3);
    c[concatted] = real;
    return real;
  }
};
const x /*:unknown*/ = func(22, tmpOAL);
const y /*:unknown*/ = func(12, tmpOAL$1);
$(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let c = undefined;
const func = function ($dlr_$$1, $dlr_$$3) {
  let c_prime = undefined;
  if (c) {
    c_prime = c;
  } else {
    c = {};
    c_prime = c;
  }
  const concatted = `${$dlr_$$1}a`;
  const lookup = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real = $($dlr_$$3);
    c[concatted] = real;
    return real;
  }
};
$(func(22, tmpOAL), func(12, tmpOAL$1));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  let e = undefined;
  if (a) {
    e = a;
  }
  else {
    a = {};
    e = a;
  }
  const f = `${c}a`;
  const g = e[ f ];
  if (g) {
    return g;
  }
  else {
    const h = $( d );
    a[f] = h;
    return h;
  }
};
const i = b( 22, tmpOAL );
const j = b( 12, tmpOAL$1 );
$( i, j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`];
let a = undefined;
let b = undefined;
let c = undefined;
const func = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const arg1 = $dlr_$$0;
  const arg2 = $dlr_$$1;
  const test = a === undefined;
  if (test) {
    b = $;
    c = {};
    a = true;
  } else {
  }
  const v1 = arr[0];
  const c_prime = c;
  const concatted = arg1 + v1;
  const lookup = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real = b(arg2);
    c[concatted] = real;
    return real;
  }
};
const x = func(22, tmpOAL);
const y = func(12, tmpOAL$1);
$(x, y);
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

tmpOAL, tmpOAL$1


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
