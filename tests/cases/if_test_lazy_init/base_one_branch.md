# Preval test case

# base_one_branch.md

> If test lazy init > Base one branch
>
> the cache is lazily initialized

## Input

`````js filename=intro
let cache /*:unknown*/ = undefined;
const func /*:(number, unknown)=>unknown*/ = function($$0, $$1) {
  const $dlr_$$1 /*:number*/ = $$0;
  const $dlr_$$3 /*:unknown*/ = $$1;
  debugger;
  if (cache) {
  } else {
    cache = {};
  }
  const concatted /*:string*/ /*truthy*/ = `${$dlr_$$1}a`;
  const lookup /*:unknown*/ = cache[concatted];
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
let cache /*:unknown*/ = undefined;
const func /*:(number, unknown)=>unknown*/ = function ($$0, $$1) {
  const $dlr_$$1 /*:number*/ = $$0;
  const $dlr_$$3 /*:unknown*/ = $$1;
  debugger;
  if (cache) {
  } else {
    cache = {};
  }
  const concatted /*:string*/ /*truthy*/ = `${$dlr_$$1}a`;
  const lookup /*:unknown*/ = cache[concatted];
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
let cache = undefined;
const func = function ($dlr_$$1, $dlr_$$3) {
  if (!cache) {
    cache = {};
  }
  const concatted = `${$dlr_$$1}a`;
  const lookup = cache[concatted];
  if (lookup) {
    return lookup;
  } else {
    const real = $($dlr_$$3);
    cache[concatted] = real;
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
  if (a) {

  }
  else {
    a = {};
  }
  const e = `${c}a`;
  const f = a[ e ];
  if (f) {
    return f;
  }
  else {
    const g = $( d );
    a[e] = g;
    return g;
  }
};
const h = b( 22, tmpOAL );
const i = b( 12, tmpOAL$1 );
$( h, i );
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
  if (cache) {
  } else {
    cache = {};
  }
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce($dlr_$$2, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const concatted = `${tmpStringConcatR}a`;
  const lookup = cache[concatted];
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
