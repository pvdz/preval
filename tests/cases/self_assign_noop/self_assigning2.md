# Preval test case

# self_assigning2.md

> Self assign noop > Self assigning2

When a value is if-tested that we know can never changes truthy value
then the `if` is dead code. Probably contrived but perhaps an artifact
or if nothing else obfuscation cases.

In this case the self assignment transform SHOULD be applied.

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
const b = alias(3, 4);    // This is ok! alias is not used more and future calls to func are ok
const a = func(1, 2);
const c = func(5, 6);
$(a, b, c);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 /*:unknown*/ = 3;
const func /*:(number, unused)=>undefined*/ = function ($$0, $$1) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
  const newArg1 /*:number*/ = $$0;
  debugger;
  const index /*:number*/ = newArg1 - 1;
  arr[index];
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
const b /*:unknown*/ = arg1;
func(1, 2);
const a /*:unknown*/ = arg1;
func(5, 6);
$(a, b, arg1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
let arg1 = 3;
const func = function (newArg1, $$1) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const index = newArg1 - 1;
  arr[index];
  if (arg1) {
    $(`always arg1:`, arg1);
  } else {
    arg1 = tmpPrevalAliasArgumentsAny;
    $(`always arg1:`, tmpPrevalAliasArgumentsAny);
  }
};
func(3, 4);
const b = arg1;
func(1, 2);
const a = arg1;
func(5, 6);
$(a, b, arg1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
let b = 3;
const c = function($$0,$$1 ) {
  const d = e;
  const f = $$0;
  debugger;
  const g = f - 1;
  a[ g ];
  if (b) {
    $( "always arg1:", b );
    return undefined;
  }
  else {
    b = d;
    $( "always arg1:", d );
    return undefined;
  }
};
c( 3, 4 );
const h = b;
c( 1, 2 );
const i = b;
c( 5, 6 );
$( i, h, b );
`````


## Todos triggered


- (todo) inline computed array property read


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
