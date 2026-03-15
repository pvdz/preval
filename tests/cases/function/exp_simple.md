# Preval test case

# exp_simple.md

> Function > Exp simple
>
> Expandos on constant functions
> The properties on this main_target function could just as well be global variables.

## Input

`````js filename=intro
// This is being unlocked
const data = [`a`, `b`, `c`, `d`, `e`];

// Actual method does not matter
const method = function($$0) {
  const $dlr_$$11 = $$0;
  debugger;
  const tmpMCF = $dlr_$$11.charAt;
  $(typeof tmpMCF);
  return ``;
};

// This is basically what we find in the wild
// Props of this function should become globals
const main_target = function(arg) {
  const i = arg - 180;
  const val = data[i];
  const patched = main_target.DjBalz;
  const needsPatching = patched === undefined;
  if (needsPatching) {
    $('patching');
    main_target.WQNJqp = method;
    const cache = {};
    main_target.TjeLtB = cache;
    main_target.DjBalz = true;
  } else {
  }
  const the_cache = main_target.TjeLtB;
  const cache_key = `${i}CMv0D`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    $('uncached');
    const the_method = main_target.WQNJqp;
    const the_result = $('typeof', typeof the_method);
    const the_cache = main_target.TjeLtB;
    the_cache[cache_key] = the_result;
    return the_result;
  }
};

// Distraction for preval but also what we find in the wild:
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = main_target(204);
  $(`a:`, a);
  const b = main_target(220);
  $(`b:`, b);
}
`````


## Settled


`````js filename=intro
let tmpExpando /*:primitive*/ = undefined;
let tmpExpando$1 /*:unknown*/ = undefined;
let tmpExpando$3 /*:unknown*/ = undefined;
const method /*:(unknown)=>string*/ = function ($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpMCF /*:unknown*/ = $dlr_$$0.charAt;
  const tmpCalleeParam /*:string*/ /*truthy*/ = typeof tmpMCF;
  $(tmpCalleeParam);
  return ``;
};
const main_target /*:(number, boolean)=>unknown*/ = function ($$0, $$1) {
  const tmpOutlinedParam$1 /*:number*/ = $$0;
  const needsPatching /*:boolean*/ = $$1;
  debugger;
  if (needsPatching) {
    $(`patching`);
    tmpExpando$1 = method;
    tmpExpando$3 = {};
    tmpExpando = true;
  } else {
  }
  const the_cache /*:unknown*/ = tmpExpando$3;
  const cache_key /*:string*/ /*truthy*/ = `${tmpOutlinedParam$1}CMv0D`;
  const found /*:unknown*/ = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    $(`uncached`);
    const the_method /*:unknown*/ = tmpExpando$1;
    const tmpCalleeParam$1 /*:string*/ /*truthy*/ = typeof the_method;
    const the_result /*:unknown*/ = $(`typeof`, tmpCalleeParam$1);
    tmpExpando$3[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpFrfrOutline /*:boolean*/ = tmpExpando === undefined;
  const a /*:unknown*/ = main_target(24, tmpFrfrOutline);
  $(`a:`, a);
  const tmpFrfrOutline$1 /*:boolean*/ = tmpExpando === undefined;
  const b /*:unknown*/ = main_target(40, tmpFrfrOutline$1);
  $(`b:`, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpExpando = undefined;
let tmpExpando$1 = undefined;
let tmpExpando$3 = undefined;
const method = function ($dlr_$$0) {
  const tmpMCF = $dlr_$$0.charAt;
  $(typeof tmpMCF);
  return ``;
};
const main_target = function (tmpOutlinedParam$1, needsPatching) {
  if (needsPatching) {
    $(`patching`);
    tmpExpando$1 = method;
    tmpExpando$3 = {};
    tmpExpando = true;
  }
  const the_cache = tmpExpando$3;
  const cache_key = `${tmpOutlinedParam$1}CMv0D`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    $(`uncached`);
    const the_method = tmpExpando$1;
    const the_result = $(`typeof`, typeof the_method);
    tmpExpando$3[cache_key] = the_result;
    return the_result;
  }
};
while (true) {
  $(`a:`, main_target(24, tmpExpando === undefined));
  $(`b:`, main_target(40, tmpExpando === undefined));
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e.charAt;
  const g = typeof f;
  $( g );
  return "";
};
const h = function($$0,$$1 ) {
  const i = $$0;
  const j = $$1;
  debugger;
  if (j) {
    $( "patching" );
    b = d;
    c = {};
    a = true;
  }
  const k = c;
  const l = `${i}CMv0D`;
  const m = k[ l ];
  if (m) {
    return m;
  }
  else {
    $( "uncached" );
    const n = b;
    const o = typeof n;
    const p = $( "typeof", o );
    c[l] = p;
    return p;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const q = a === undefined;
  const r = h( 24, q );
  $( "a:", r );
  const s = a === undefined;
  const t = h( 40, s );
  $( "b:", t );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const data = [`a`, `b`, `c`, `d`, `e`];
const method = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$11 = $dlr_$$0;
  const tmpMCF = $dlr_$$11.charAt;
  let tmpCalleeParam = typeof tmpMCF;
  $(tmpCalleeParam);
  return ``;
};
const main_target = function ($$0) {
  let arg = $$0;
  debugger;
  const i = arg - 180;
  const val = data[i];
  const patched = main_target.DjBalz;
  const needsPatching = patched === undefined;
  if (needsPatching) {
    $(`patching`);
    main_target.WQNJqp = method;
    const cache = {};
    main_target.TjeLtB = cache;
    main_target.DjBalz = true;
  } else {
  }
  const the_cache = main_target.TjeLtB;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce(i, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const cache_key = `${tmpStringConcatR}CMv0D`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    $(`uncached`);
    const the_method = main_target.WQNJqp;
    let tmpCalleeParam$1 = typeof the_method;
    const the_result = $(`typeof`, tmpCalleeParam$1);
    const the_cache$1 = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = main_target(204);
  $(`a:`, a);
  const b = main_target(220);
  $(`b:`, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'patching'
 - 2: 'uncached'
 - 3: 'typeof', 'function'
 - 4: 'a:', 'typeof'
 - 5: 'uncached'
 - 6: 'typeof', 'function'
 - 7: 'b:', 'typeof'
 - 8: 'a:', 'typeof'
 - 9: 'b:', 'typeof'
 - 10: 'a:', 'typeof'
 - 11: 'b:', 'typeof'
 - 12: 'a:', 'typeof'
 - 13: 'b:', 'typeof'
 - 14: 'a:', 'typeof'
 - 15: 'b:', 'typeof'
 - 16: 'a:', 'typeof'
 - 17: 'b:', 'typeof'
 - 18: 'a:', 'typeof'
 - 19: 'b:', 'typeof'
 - 20: 'a:', 'typeof'
 - 21: 'b:', 'typeof'
 - 22: 'a:', 'typeof'
 - 23: 'b:', 'typeof'
 - 24: 'a:', 'typeof'
 - 25: 'b:', 'typeof'
 - 26: 'a:', 'typeof'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
