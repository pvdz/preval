# Preval test case

# proxy_const.md

> If test only > Proxy const
>
> Where the read occurs after the if

## Input

`````js filename=intro
const aliased = function($$0) {
  $('inner');
};
const arr = ['a', 'b', 'c', 'd', 'e'];
let sealer_alias = undefined;
let sealer_cache = undefined;
const proxy_func = function(str, payload) {
  if (sealer_alias) {

  } else {
    sealer_alias = aliased;
    sealer_cache = {};
  }
  const val = arr[0];
  const the_alias_to_strip = sealer_cache;
  const cache_key = str + val;
  const cached_val = the_alias_to_strip[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    const fresh_val = sealer_alias(payload);
    sealer_cache[cache_key] = fresh_val;
    return fresh_val;
  }
};
const a = proxy_func(22, arr[0]);
const b = proxy_func(12, arr[1]);
$(a,b);
`````


## Settled


`````js filename=intro
let sealer_alias /*:boolean: false | true*/ = false;
let sealer_cache /*:unknown*/ = undefined;
const proxy_func /*:(number)=>unknown*/ = function ($$0) {
  const str$1 /*:number*/ = $$0;
  debugger;
  let the_alias_to_strip /*:unknown*/ /*ternaryConst*/ = undefined;
  if (sealer_alias) {
    the_alias_to_strip = sealer_cache;
  } else {
    sealer_alias = true;
    sealer_cache = {};
    the_alias_to_strip = sealer_cache;
  }
  const cache_key /*:string*/ /*truthy*/ = `${str$1}a`;
  const cached_val /*:unknown*/ = the_alias_to_strip[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    $(`inner`);
    sealer_cache[cache_key] = undefined;
    return undefined;
  }
};
const a /*:unknown*/ = proxy_func(22);
const b /*:unknown*/ = proxy_func(12);
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let sealer_alias = false;
let sealer_cache = undefined;
const proxy_func = function (str$1) {
  let the_alias_to_strip = undefined;
  if (sealer_alias) {
    the_alias_to_strip = sealer_cache;
  } else {
    sealer_alias = true;
    sealer_cache = {};
    the_alias_to_strip = sealer_cache;
  }
  const cache_key = `${str$1}a`;
  const cached_val = the_alias_to_strip[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    $(`inner`);
    sealer_cache[cache_key] = undefined;
  }
};
$(proxy_func(22), proxy_func(12));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
let b = undefined;
const c = function($$0 ) {
  const d = $$0;
  debugger;
  let e = undefined;
  if (a) {
    e = b;
  }
  else {
    a = true;
    b = {};
    e = b;
  }
  const f = `${d}a`;
  const g = e[ f ];
  if (g) {
    return g;
  }
  else {
    $( "inner" );
    b[f] = undefined;
    return undefined;
  }
};
const h = c( 22 );
const i = c( 12 );
$( h, i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const aliased = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  $(`inner`);
  return undefined;
};
const arr = [`a`, `b`, `c`, `d`, `e`];
let sealer_alias = undefined;
let sealer_cache = undefined;
const proxy_func = function ($$0, $$1) {
  let str = $$0;
  let payload = $$1;
  debugger;
  if (sealer_alias) {
  } else {
    sealer_alias = aliased;
    sealer_cache = {};
  }
  const val = arr[0];
  const the_alias_to_strip = sealer_cache;
  const cache_key = str + val;
  const cached_val = the_alias_to_strip[cache_key];
  if (cached_val) {
    return cached_val;
  } else {
    const fresh_val = sealer_alias(payload);
    sealer_cache[cache_key] = fresh_val;
    return fresh_val;
  }
};
const tmpCallCallee = proxy_func;
let tmpCalleeParam = arr[0];
const a = proxy_func(22, tmpCalleeParam);
const tmpCallCallee$1 = proxy_func;
let tmpCalleeParam$1 = arr[1];
const b = proxy_func(12, tmpCalleeParam$1);
$(a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - 2: 'inner'
 - 3: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
