# Preval test case

# exp_dotcall.md

> If test lazy init > Exp dotcall
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
const main_target_TjeLtB /*:object*/ /*truthy*/ = {};
const main_target /*:(string)=>unknown*/ = function ($$0) {
  const tmpOutlinedParam$1 /*:string*/ = $$0;
  debugger;
  const found /*:unknown*/ = main_target_TjeLtB[tmpOutlinedParam$1];
  if (found) {
    return found;
  } else {
    $(`function`);
    main_target_TjeLtB[tmpOutlinedParam$1] = ``;
    return ``;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:unknown*/ = main_target(`1abc`);
  $(`a:`, a);
  const b /*:unknown*/ = main_target(`3abc`);
  $(`b:`, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_target_TjeLtB = {};
const main_target = function (tmpOutlinedParam$1) {
  const found = main_target_TjeLtB[tmpOutlinedParam$1];
  if (found) {
    return found;
  } else {
    $(`function`);
    main_target_TjeLtB[tmpOutlinedParam$1] = ``;
    return ``;
  }
};
while (true) {
  $(`a:`, main_target(`1abc`));
  $(`b:`, main_target(`3abc`));
}
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
    $( "function" );
    a[c] = "";
    return "";
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const e = b( "1abc" );
  $( "a:", e );
  const f = b( "3abc" );
  $( "b:", f );
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


- (todo) Support this node type in isFree: TemplateLiteral
- (todo) objects in isFree check
- (todo) support Identifier as var init in let_hoisting noob check


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
