# Preval test case

# self_assigning3.md

> Self assign > Noop > Self assigning3

This case should apply the self assigninig transform

## Options

The implicit global is intentional

- globals: b

## Input

`````js filename=intro
// SHOuLD inline because it only references a global and does not closure it.
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const unknownarr = $(arr);
let func/*:(unknown, unknown)=>*/ = function(arg1, arg2) {
  func = function(newArg1, unusedNewArg2) {
    const index/*:number*/ = newArg1 - 1;
    const arrval = unknownarr[index];
    if (!arg1) {
      arg1 = arguments;
    }
    $('inside arg1:', arg1);
    return arg1;
  };
  const r = func(arg1, arg2);
  return r;
};
const a = func(1, 2);
const c = func(5, 6);
$(a, b, c);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const unknownarr /*:unknown*/ = $(arr);
let arg1 /*:unknown*/ = 1;
const func /*:(number, number)=>undefined*/ = function ($$0, $$1) {
  const newArg1 /*:number*/ = $$0;
  const tmpOutlinedParam /*:number*/ = $$1;
  debugger;
  unknownarr[tmpOutlinedParam];
  if (arg1) {
    $(`inside arg1:`, arg1);
    return undefined;
  } else {
    const tmpPrevalAliasArgumentsAny /*:array*/ /*truthy*/ = [newArg1, ,];
    arg1 = tmpPrevalAliasArgumentsAny;
    $(`inside arg1:`, tmpPrevalAliasArgumentsAny);
    return undefined;
  }
};
func(1, 0);
const a /*:unknown*/ = arg1;
func(5, 4);
$(a, b, arg1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const unknownarr = $([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
let arg1 = 1;
const func = function (newArg1, tmpOutlinedParam) {
  unknownarr[tmpOutlinedParam];
  if (arg1) {
    $(`inside arg1:`, arg1);
  } else {
    const tmpPrevalAliasArgumentsAny = [newArg1, ,];
    arg1 = tmpPrevalAliasArgumentsAny;
    $(`inside arg1:`, tmpPrevalAliasArgumentsAny);
  }
};
func(1, 0);
const a = arg1;
func(5, 4);
$(a, b, arg1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000 ];
const c = $( a );
let d = 1;
const e = function($$0,$$1 ) {
  const f = $$0;
  const g = $$1;
  debugger;
  c[ g ];
  if (d) {
    $( "inside arg1:", d );
    return undefined;
  }
  else {
    const h = [ f, , ];
    d = h;
    $( "inside arg1:", h );
    return undefined;
  }
};
e( 1, 0 );
const i = d;
e( 5, 4 );
$( i, b, d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const unknownarr = $(arr);
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
    const arrval = unknownarr[index];
    if (arg1) {
      $(`inside arg1:`, arg1);
      return arg1;
    } else {
      arg1 = tmpPrevalAliasArgumentsAny;
      $(`inside arg1:`, tmpPrevalAliasArgumentsAny);
      return arg1;
    }
  };
  const r = func(arg1, arg2);
  return r;
};
const a = func(1, 2);
const c = func(5, 6);
$(a, b, c);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
 - 2: 'inside arg1:', 1
 - 3: 'inside arg1:', 1
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
