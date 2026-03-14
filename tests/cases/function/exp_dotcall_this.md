# Preval test case

# exp_dotcall_this.md

> Function > Exp dotcall this
>
> Expandos on constant functions
> The properties on this main_target function could just as well be global variables.
> Complication here is that one of the properties is set to a function and it would be unsafe to transform the props to variables
> unless we can guarantee that this function does not use the `this` keyword; otherwise the function might "leak" and our property
> transform trick could be observed by code, which we don't want.
> In this case, it actually does use `this` so the transform is prevented.

## Input

`````js filename=intro
// This is being unlocked
const data = [`a`, `b`, `c`, `d`, `e`];

// Actual method does not matter
const method = function($$0) {
  const $dlr_$$11 = $$0;
  debugger;
  const tmpMCF = $dlr_$$11.charAt;
  $(typeof tmpMCF, typeof this); // <-- that's a problem; function main_target escapes here
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
    const the_method = main_target.WQNJqp;
    // This is the part that makes it harder because we have to resolve that to the func to verify no `this` usage
    const the_result = $dotCall(the_method, main_target, `WQNJqp`, val);
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
const data /*:array*/ /*truthy*/ = [`a`, `b`, `c`, `d`, `e`];
const method /*:(unknown)=>string*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpMCF /*:unknown*/ = $dlr_$$0.charAt;
  const tmpCalleeParam /*:string*/ /*truthy*/ = typeof tmpMCF;
  const tmpCalleeParam$1 /*:string*/ /*truthy*/ = typeof tmpPrevalAliasThis;
  $(tmpCalleeParam, tmpCalleeParam$1);
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
    main_target.WQNJqp = method;
    const cache /*:object*/ /*truthy*/ = {};
    main_target.TjeLtB = cache;
    main_target.DjBalz = true;
  } else {
  }
  const the_cache /*:unknown*/ = main_target.TjeLtB;
  const cache_key /*:string*/ /*truthy*/ = `${i$1}CMv0D`;
  const found /*:unknown*/ = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_method /*:unknown*/ = main_target.WQNJqp;
    const the_result /*:unknown*/ = $dotCall(the_method, main_target, `WQNJqp`, val);
    const the_cache$1 /*:unknown*/ = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:unknown*/ = main_target(204);
  $(`a:`, a);
  const b /*:unknown*/ = main_target(220);
  $(`b:`, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const data = [`a`, `b`, `c`, `d`, `e`];
const method = function ($dlr_$$0) {
  const tmpPrevalAliasThis = this;
  const tmpMCF = $dlr_$$0.charAt;
  $(typeof tmpMCF, typeof tmpPrevalAliasThis);
  return ``;
};
const main_target = function (arg) {
  const i$1 = arg - 180;
  const val = data[i$1];
  if (main_target.DjBalz === undefined) {
    main_target.WQNJqp = method;
    main_target.TjeLtB = {};
    main_target.DjBalz = true;
  }
  const the_cache = main_target.TjeLtB;
  const cache_key = `${i$1}CMv0D`;
  const found = the_cache[cache_key];
  if (found) {
    return found;
  } else {
    const the_result = main_target.WQNJqp(val);
    const the_cache$1 = main_target.TjeLtB;
    the_cache$1[cache_key] = the_result;
    return the_result;
  }
};
while (true) {
  $(`a:`, main_target(204));
  $(`b:`, main_target(220));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e" ];
const b = function($$0 ) {
  const c = this;
  const d = $$0;
  debugger;
  const e = d.charAt;
  const f = typeof e;
  const g = typeof c;
  $( f, g );
  return "";
};
const h = function($$0 ) {
  const i = $$0;
  debugger;
  const j = i - 180;
  const k = a[ j ];
  const l = h.DjBalz;
  const m = l === undefined;
  if (m) {
    h.WQNJqp = b;
    const n = {};
    h.TjeLtB = n;
    h.DjBalz = true;
  }
  const o = h.TjeLtB;
  const p = `${j}CMv0D`;
  const q = o[ p ];
  if (q) {
    return q;
  }
  else {
    const r = h.WQNJqp;
    const s = $dotCall( r, h, "WQNJqp", k );
    const t = h.TjeLtB;
    t[p] = s;
    return s;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const u = h( 204 );
  $( "a:", u );
  const v = h( 220 );
  $( "b:", v );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const data = [`a`, `b`, `c`, `d`, `e`];
const method = function ($$0) {
  const tmpPrevalAliasThis = this;
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$11 = $dlr_$$0;
  const tmpMCF = $dlr_$$11.charAt;
  let tmpCalleeParam = typeof tmpMCF;
  let tmpCalleeParam$1 = typeof tmpPrevalAliasThis;
  $(tmpCalleeParam, tmpCalleeParam$1);
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
    const the_method = main_target.WQNJqp;
    const the_result = $dotCall(the_method, main_target, `WQNJqp`, val);
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
