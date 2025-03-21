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
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let func /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  let arg1 /*:unknown*/ = $$0;
  const arg2 /*:unknown*/ = $$1;
  debugger;
  func = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
    const newArg1 /*:unknown*/ = $$0;
    debugger;
    const index /*:number*/ = newArg1 - 1;
    arr[index];
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
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let func = function (arg1, arg2) {
  func = function (newArg1, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    const index = newArg1 - 1;
    arr[index];
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
const a = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
let b = function($$0,$$1 ) {
  let c = $$0;
  const d = $$1;
  debugger;
  b = function($$0,$$1 ) {
    const e = f;
    const g = $$0;
    debugger;
    const h = g - 1;
    a[ h ];
    if (c) {
      $( "always arg1:", c );
      return c;
    }
    else {
      c = e;
      $( "always arg1:", e );
      return c;
    }
  };
  const i = b( c, d );
  return i;
};
const j = b;
const k = b( 3, 4 );
const l = b( 1, 2 );
j( 7, 8 );
const m = b( 5, 6 );
$( l, k, m );
`````


## Todos triggered


- (todo) inline computed array property read


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
