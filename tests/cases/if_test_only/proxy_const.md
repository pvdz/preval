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
const sealer_cache /*:object*/ /*truthy*/ = {};
const proxy_func /*:(string)=>unknown*/ = function ($$0) {
  const tmpOutlinedParam /*:string*/ = $$0;
  debugger;
  const cached_val /*:unknown*/ = sealer_cache[tmpOutlinedParam];
  if (cached_val) {
    return cached_val;
  } else {
    $(`inner`);
    sealer_cache[tmpOutlinedParam] = undefined;
    return undefined;
  }
};
const a /*:unknown*/ = proxy_func(`22a`);
const b /*:unknown*/ = proxy_func(`12a`);
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const sealer_cache = {};
const proxy_func = function (tmpOutlinedParam) {
  const cached_val = sealer_cache[tmpOutlinedParam];
  if (cached_val) {
    return cached_val;
  } else {
    $(`inner`);
    sealer_cache[tmpOutlinedParam] = undefined;
  }
};
$(proxy_func(`22a`), proxy_func(`12a`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = a[ c ];
  if (d) {
    return d;
  }
  else {
    $( "inner" );
    a[c] = undefined;
    return undefined;
  }
};
const e = b( "22a" );
const f = b( "12a" );
$( e, f );
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
