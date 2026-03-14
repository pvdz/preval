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
const main_target /*:(number)=>unknown*/ = function ($$0) {
  const tmpOutlinedParam$1 /*:number*/ = $$0;
  debugger;
  $(`patching`);
  const tmpClusterSSA_tmpssa3_tmpExpando$3 /*:object*/ /*truthy*/ = {};
  const cache_key /*:string*/ /*truthy*/ = `${tmpOutlinedParam$1}CMv0D`;
  const found /*:unknown*/ = tmpClusterSSA_tmpssa3_tmpExpando$3[cache_key];
  if (found) {
    return found;
  } else {
    $(`uncached`);
    const the_result /*:unknown*/ = $(`typeof`, `function`);
    tmpClusterSSA_tmpssa3_tmpExpando$3[cache_key] = the_result;
    return the_result;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const a /*:unknown*/ = main_target(24);
  $(`a:`, a);
  const b /*:unknown*/ = main_target(40);
  $(`b:`, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const main_target = function (tmpOutlinedParam$1) {
  $(`patching`);
  const tmpClusterSSA_tmpssa3_tmpExpando$3 = {};
  const cache_key = `${tmpOutlinedParam$1}CMv0D`;
  const found = tmpClusterSSA_tmpssa3_tmpExpando$3[cache_key];
  if (found) {
    return found;
  } else {
    $(`uncached`);
    const the_result = $(`typeof`, `function`);
    tmpClusterSSA_tmpssa3_tmpExpando$3[cache_key] = the_result;
    return the_result;
  }
};
while (true) {
  $(`a:`, main_target(24));
  $(`b:`, main_target(40));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "patching" );
  const c = {};
  const d = `${b}CMv0D`;
  const e = c[ d ];
  if (e) {
    return e;
  }
  else {
    $( "uncached" );
    const f = $( "typeof", "function" );
    c[d] = f;
    return f;
  }
};
while ($LOOP_NO_UNROLLS_LEFT) {
  const g = a( 24 );
  $( "a:", g );
  const h = a( 40 );
  $( "b:", h );
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

Post settled calls: BAD!!
 -  1: 'patching'
 -  2: 'uncached'
 -  3: 'typeof', 'function'
 -  4: 'a:', 'typeof'
 - !5: 'patching'
 - !6: 'uncached'
 - !7: 'typeof', 'function'
 - !8: 'b:', 'typeof'
 - !9: 'patching'
 - !10: 'uncached'
 - !11: 'typeof', 'function'
 -  12: 'a:', 'typeof'
 - !13: 'patching'
 - !14: 'uncached'
 - !15: 'typeof', 'function'
 - !16: 'b:', 'typeof'
 - !17: 'patching'
 - !18: 'uncached'
 - !19: 'typeof', 'function'
 -  20: 'a:', 'typeof'
 - !21: 'patching'
 - !22: 'uncached'
 - !23: 'typeof', 'function'
 - !24: 'b:', 'typeof'
 - !25: 'patching'
 - !26: 'uncached'
 -  eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Denormalized calls: BAD!!
 -  1: 'patching'
 -  2: 'uncached'
 -  3: 'typeof', 'function'
 -  4: 'a:', 'typeof'
 - !5: 'patching'
 - !6: 'uncached'
 - !7: 'typeof', 'function'
 - !8: 'b:', 'typeof'
 - !9: 'patching'
 - !10: 'uncached'
 - !11: 'typeof', 'function'
 -  12: 'a:', 'typeof'
 - !13: 'patching'
 - !14: 'uncached'
 - !15: 'typeof', 'function'
 - !16: 'b:', 'typeof'
 - !17: 'patching'
 - !18: 'uncached'
 - !19: 'typeof', 'function'
 -  20: 'a:', 'typeof'
 - !21: 'patching'
 - !22: 'uncached'
 - !23: 'typeof', 'function'
 - !24: 'b:', 'typeof'
 - !25: 'patching'
 - !26: 'uncached'
 -  eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')
