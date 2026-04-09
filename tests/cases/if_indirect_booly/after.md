# Preval test case

# after.md

> If indirect booly > After

This is the cache trampo that is left as an intermediate step

## Input

`````js filename=intro
const cache = {};
const func = function (arg, key) {
  const lookup = cache[key];
  if (lookup) {
    return lookup;
  } else {
    const real = $(arg);
    cache[key] = real;
    return real;
  }
};
const x = func(tmpA, `22a`);
const y = func(tmpB, `12a`);
$(x, y);
`````


## Settled


`````js filename=intro
const cache /*:object*/ /*truthy*/ = {};
const func /*:(unknown, string)=>unknown*/ = function ($$0, $$1) {
  const arg /*:unknown*/ = $$0;
  const key /*:string*/ = $$1;
  debugger;
  const lookup /*:unknown*/ = cache[key];
  if (lookup) {
    return lookup;
  } else {
    const real /*:unknown*/ = $(arg);
    cache[key] = real;
    return real;
  }
};
const x /*:unknown*/ = func(tmpA, `22a`);
const y /*:unknown*/ = func(tmpB, `12a`);
$(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const cache = {};
const func = function (arg, key) {
  const lookup = cache[key];
  if (lookup) {
    return lookup;
  } else {
    const real = $(arg);
    cache[key] = real;
    return real;
  }
};
$(func(tmpA, `22a`), func(tmpB, `12a`));
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
const g = b( tmpA, "22a" );
const h = b( tmpB, "12a" );
$( g, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const cache = {};
const func = function ($$0, $$1) {
  let arg = $$0;
  let key = $$1;
  debugger;
  const lookup = cache[key];
  if (lookup) {
    return lookup;
  } else {
    const real = $(arg);
    cache[key] = real;
    return real;
  }
};
const x = func(tmpA, `22a`);
const y = func(tmpB, `12a`);
$(x, y);
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

tmpA, tmpB


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
