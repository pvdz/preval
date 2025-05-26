# Preval test case

# self_assigning21.md

> Self assign noop > Self assigning21

It's okay if the function gets aliased but not if it gets called 
after calling another function. This test is to demonstrate that
the self_assign_noop transform breaks when we allow that anyways.

The self assignment transform should NOT be applied for this test!

## Input

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let func/*:(unknown, unknown)=>*/ = function(arg1, arg2) {
  func = function(newArg1, unusedNewArg2) {
    const index/*:number*/ = newArg1 - 1;
    const arrval = arr[index];
    if (!arg1) {
      arg1 = arguments;
    }
    $('always arg1:', arg1);
    return arg1;
  };
  const r = func(arg1, arg2);
  return r;
};
const alias = func;
const b = alias(3, 4);
const a = func(1, 2);
const d = alias(7, 8); // This should block the self_assign_noop transform.
const c = func(5, 6);
$(a, b, c);
`````


## Settled


`````js filename=intro
let func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  let arg1 /*:unknown*/ = $$0;
  const arg2 /*:unknown*/ = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
    const newArg1 /*:unknown*/ = $$0;
    debugger;
    newArg1 ** 0;
    if (arg1) {
      $(`always arg1:`, arg1);
      return arg1;
    } else {
      arg1 = tmpPrevalAliasArgumentsAny;
      $(`always arg1:`, tmpPrevalAliasArgumentsAny);
      return arg1;
    }
  };
  const r /*:unknown*/ = func(arg1, arg2);
  return r;
};
const alias /*:unknown*/ = func;
const b /*:unknown*/ = func(3, 4);
const a /*:unknown*/ = func(1, 2);
alias(7, 8);
const c /*:unknown*/ = func(5, 6);
$(a, b, c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let func = function (arg1, arg2) {
  func = function (newArg1, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    newArg1 ** 0;
    if (arg1) {
      $(`always arg1:`, arg1);
      return arg1;
    } else {
      arg1 = tmpPrevalAliasArgumentsAny;
      $(`always arg1:`, tmpPrevalAliasArgumentsAny);
      return arg1;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
const alias = func;
const b = func(3, 4);
const a = func(1, 2);
alias(7, 8);
$(a, b, func(5, 6));
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function($$0,$$1 ) {
  let b = $$0;
  const c = $$1;
  debugger;
  a = function($$0,$$1 ) {
    const d = e;
    const f = $$0;
    debugger;
    f ** 0;
    if (b) {
      $( "always arg1:", b );
      return b;
    }
    else {
      b = d;
      $( "always arg1:", d );
      return b;
    }
  };
  const g = a( b, c );
  return g;
};
const h = a;
const i = a( 3, 4 );
const j = a( 1, 2 );
h( 7, 8 );
const k = a( 5, 6 );
$( j, i, k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let func = function ($$0, $$1) {
  let arg1 = $$0;
  let arg2 = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    let newArg1 = $$0;
    let unusedNewArg2 = $$1;
    debugger;
    const index = newArg1 - 1;
    const arrval = arr[index];
    if (arg1) {
      $(`always arg1:`, arg1);
      return arg1;
    } else {
      arg1 = tmpPrevalAliasArgumentsAny;
      $(`always arg1:`, tmpPrevalAliasArgumentsAny);
      return arg1;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
const alias = func;
const b = func(3, 4);
const a = func(1, 2);
const d = alias(7, 8);
const c = func(5, 6);
$(a, b, c);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'always arg1:', 3
 - 2: 'always arg1:', 3
 - 3: 'always arg1:', 7
 - 4: 'always arg1:', 7
 - 5: 3, 3, 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
