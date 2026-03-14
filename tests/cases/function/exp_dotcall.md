# Preval test case

# exp_dotcall.md

> Function > Exp dotcall
>
> Expandos on constant functions
> The properties on this main_target function could just as well be global variables.
> Complication here is that one of the properties is set to a function and it would be unsafe to transform the props to variables
> unless we can guarantee that this function does not use the `this` keyword; otherwise the function might "leak" and our property
> transform trick could be observed by code, which we don't want.

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
  const isPatched = patched === undefined;
  if (isPatched) {
    main_target.abcxyz = method;
    const cache = {};
    main_target.TjeLtB = cache;
    main_target.DjBalz = true;
  } else {
  }
  const the_cache = main_target.TjeLtB;
  const cache_key = `${i}abc`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_method = main_target.abcxyz;
    // This is the part that makes it harder because we have to resolve that to the func to verify no `this` usage
    const the_result = $dotCall(the_method, main_target, `abcxyz`, val);
    const the_cache = main_target.TjeLtB;
    the_cache[cache_key] = the_result;
    return the_result;
  }
};

// Distraction for preval but also what we find in the wild:
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = main_target(181);
  $(`a:`, a);
  const b = main_target(183);
  $(`b:`, b);
}
`````


## Settled


`````js filename=intro
const data /*:array*/ /*truthy*/ = [`a`, `b`, `c`, `d`, `e`];
const method /*:(unknown)=>string*/ = function ($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpMCF /*:unknown*/ = $dlr_$$0.charAt;
  const tmpCalleeParam /*:string*/ /*truthy*/ = typeof tmpMCF;
  $(tmpCalleeParam);
  return ``;
};
const main_target /*:(unknown)=>unknown*/ = function ($$0) {
  const arg /*:unknown*/ = $$0;
  debugger;
  const i$1 /*:number*/ = arg - 180;
  const val /*:primitive*/ = data[i$1];
  const patched /*:unknown*/ = main_target.DjBalz;
  const isPatched /*:boolean*/ = patched === undefined;
  if (isPatched) {
    main_target.abcxyz = method;
    const cache /*:object*/ /*truthy*/ = {};
    main_target.TjeLtB = cache;
    main_target.DjBalz = true;
  } else {
  }
  const the_cache /*:unknown*/ = main_target.TjeLtB;
  const cache_key /*:string*/ /*truthy*/ = `${i$1}abc`;
  const found /*:unknown*/ = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_method /*:unknown*/ = main_target.abcxyz;
    const the_result /*:unknown*/ = $dotCall(the_method, main_target, `abcxyz`, val);
    const the_cache$1 /*:unknown*/ = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:unknown*/ = main_target(181);
  $(`a:`, a);
  const b /*:unknown*/ = main_target(183);
  $(`b:`, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const data = [`a`, `b`, `c`, `d`, `e`];
const method = function ($dlr_$$0) {
  const tmpMCF = $dlr_$$0.charAt;
  $(typeof tmpMCF);
  return ``;
};
const main_target = function (arg) {
  const i$1 = arg - 180;
  const val = data[i$1];
  if (main_target.DjBalz === undefined) {
    main_target.abcxyz = method;
    main_target.TjeLtB = {};
    main_target.DjBalz = true;
  }
  const the_cache = main_target.TjeLtB;
  const cache_key = `${i$1}abc`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_result = main_target.abcxyz(val);
    const the_cache$1 = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while (true) {
  $(`a:`, main_target(181));
  $(`b:`, main_target(183));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e" ];
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = c.charAt;
  const e = typeof d;
  $( e );
  return "";
};
const f = function($$0 ) {
  const g = $$0;
  debugger;
  const h = g - 180;
  const i = a[ h ];
  const j = f.DjBalz;
  const k = j === undefined;
  if (k) {
    f.abcxyz = b;
    const l = {};
    f.TjeLtB = l;
    f.DjBalz = true;
  }
  const m = f.TjeLtB;
  const n = `${h}abc`;
  const o = m[ n ];
  if (o) {
    return o;
  }
  else {
    const p = f.abcxyz;
    const q = $dotCall( p, f, "abcxyz", i );
    const r = f.TjeLtB;
    r[n] = q;
    return q;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const s = f( 181 );
  $( "a:", s );
  const t = f( 183 );
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
  const isPatched = patched === undefined;
  if (isPatched) {
    main_target.abcxyz = method;
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
  const cache_key = `${tmpStringConcatR}abc`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_method = main_target.abcxyz;
    const the_result = $dotCall(the_method, main_target, `abcxyz`, val);
    const the_cache$1 = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a = main_target(181);
  $(`a:`, a);
  const b = main_target(183);
  $(`b:`, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'function'
 - 2: 'a:', ''
 - 3: 'function'
 - 4: 'b:', ''
 - 5: 'function'
 - 6: 'a:', ''
 - 7: 'function'
 - 8: 'b:', ''
 - 9: 'function'
 - 10: 'a:', ''
 - 11: 'function'
 - 12: 'b:', ''
 - 13: 'function'
 - 14: 'a:', ''
 - 15: 'function'
 - 16: 'b:', ''
 - 17: 'function'
 - 18: 'a:', ''
 - 19: 'function'
 - 20: 'b:', ''
 - 21: 'function'
 - 22: 'a:', ''
 - 23: 'function'
 - 24: 'b:', ''
 - 25: 'function'
 - 26: 'a:', ''
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
