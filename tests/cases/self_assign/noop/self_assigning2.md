# Preval test case

# self_assigning2.md

> Self assign > Noop > Self assigning2

When a value is if-tested that we know can never changes truthy value
then the `if` is dead code. Probably contrived but perhaps an artifact
or if nothing else obfuscation cases.

In this case the self assignment transform SHOULD be applied.

## Input

`````js filename=intro
// SHOULD inline because the alias is called immediately and not referenced further
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
const b = alias(3, 4);    // This is ok! alias is not used more and future calls to func are ok
const a = func(1, 2);
const c = func(5, 6);
$(a, b, c);
`````


## Settled


`````js filename=intro
let arg1 /*:unknown*/ = 3;
const func /*:(unused, unused)=>undefined*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  debugger;
  if (arg1) {
    $(`always arg1:`, arg1);
    return undefined;
  } else {
    arg1 = tmpPrevalAliasArgumentsAny;
    $(`always arg1:`, tmpPrevalAliasArgumentsAny);
    return undefined;
  }
};
func(3, 4);
const tmpClusterSSA_b /*:unknown*/ = arg1;
func(1, 2);
const a /*:unknown*/ = arg1;
func(5, 6);
$(a, tmpClusterSSA_b, arg1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let arg1 = 3;
const func = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  if (arg1) {
    $(`always arg1:`, arg1);
  } else {
    arg1 = tmpPrevalAliasArgumentsAny;
    $(`always arg1:`, tmpPrevalAliasArgumentsAny);
  }
};
func(3, 4);
const tmpClusterSSA_b = arg1;
func(1, 2);
const a = arg1;
func(5, 6);
$(a, tmpClusterSSA_b, arg1);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 3;
const b = function($$0,$$1 ) {
  const c = d;
  debugger;
  if (a) {
    $( "always arg1:", a );
    return undefined;
  }
  else {
    a = c;
    $( "always arg1:", c );
    return undefined;
  }
};
b( 3, 4 );
const e = a;
b( 1, 2 );
const f = a;
b( 5, 6 );
$( f, e, a );
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
const c = func(5, 6);
$(a, b, c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'always arg1:', 3
 - 2: 'always arg1:', 3
 - 3: 'always arg1:', 3
 - 4: 3, 3, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
