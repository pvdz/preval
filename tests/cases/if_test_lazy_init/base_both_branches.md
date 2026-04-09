# Preval test case

# base_both_branches.md

> If test lazy init > Base both branches
>
> the cache is lazily initialized

## Input

`````js filename=intro
let cache /*:unknown*/ = undefined;
const func /*:(number, unknown)=>unknown*/ = function($$0, $$1) {
  const $dlr_$$1 /*:number*/ = $$0;
  const $dlr_$$3 /*:unknown*/ = $$1;
  debugger;
  let c_prime /*:unknown*/ /*ternaryConst*/ = undefined;
  if (cache) {
    c_prime = cache;
  } else {
    cache = {};
    c_prime = cache;
  }
  const concatted /*:string*/ /*truthy*/ = `${$dlr_$$1}a`;
  const lookup /*:unknown*/ = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real /*:unknown*/ = $($dlr_$$3);
    cache[concatted] = real;
    return real;
  }
};
const x /*:unknown*/ = func(22, tmpOAL);
const y /*:unknown*/ = func(12, tmpOAL$1);
$(x, y);
`````


## Settled


`````js filename=intro
const cache /*:object*/ /*truthy*/ = {};
const func /*:(unknown, string)=>unknown*/ = function ($$0, $$1) {
  const $dlr_$$3 /*:unknown*/ = $$0;
  const tmpOutlinedParam /*:string*/ = $$1;
  debugger;
  const lookup /*:unknown*/ = cache[tmpOutlinedParam];
  if (lookup) {
    return lookup;
  } else {
    const real /*:unknown*/ = $($dlr_$$3);
    cache[tmpOutlinedParam] = real;
    return real;
  }
};
const x /*:unknown*/ = func(tmpOAL, `22a`);
tmpOAL;
const y /*:unknown*/ = func(tmpOAL$1, `12a`);
tmpOAL$1;
$(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cache = {};
const func = function ($dlr_$$3, tmpOutlinedParam) {
  const lookup = cache[tmpOutlinedParam];
  if (lookup) {
    return lookup;
  } else {
    const real = $($dlr_$$3);
    cache[tmpOutlinedParam] = real;
    return real;
  }
};
const x = func(tmpOAL, `22a`);
tmpOAL;
const y = func(tmpOAL$1, `12a`);
tmpOAL$1;
$(x, y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = a[ d ];
  if (e) {
    return e;
  }
  else {
    const f = $( c );
    a[d] = f;
    return f;
  }
};
const g = b( tmpOAL, "22a" );
tmpOAL;
const h = b( tmpOAL$1, "12a" );
tmpOAL$1;
$( g, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let cache = undefined;
const func = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const $dlr_$$2 = $dlr_$$0;
  const $dlr_$$3 = $dlr_$$1;
  let c_prime = undefined;
  if (cache) {
    c_prime = cache;
  } else {
    cache = {};
    c_prime = cache;
  }
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce($dlr_$$2, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const concatted = `${tmpStringConcatR}a`;
  const lookup = c_prime[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real = $($dlr_$$3);
    cache[concatted] = real;
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
