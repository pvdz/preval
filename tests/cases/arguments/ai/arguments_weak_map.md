# Preval test case

# arguments_weak_map.md

> Arguments > Ai > Arguments weak map
>
> Test arguments in WeakMap callback

## Input

`````js filename=intro
function testArgsWeakMap() {
  const weakMap = new WeakMap();
  const obj = {};
  
  weakMap.set(obj, function() {
    const len = arguments.length;
    const first = arguments[0];
    $(len, first);
  });
  
  const callback = weakMap.get(obj);
  callback('weakmap_callback_arg');
}
testArgsWeakMap();
`````


## Settled


`````js filename=intro
const weakMap /*:object*/ /*truthy*/ = new WeakMap();
const tmpMCF /*:unknown*/ = weakMap.set;
const tmpMCP /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  debugger;
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  $(tmpPrevalAliasArgumentsLen, first);
  return undefined;
};
const obj /*:object*/ /*truthy*/ = {};
$dotCall(tmpMCF, weakMap, `set`, obj, tmpMCP);
const tmpMCF$1 /*:unknown*/ = weakMap.get;
const callback /*:unknown*/ = $dotCall(tmpMCF$1, weakMap, `get`, obj);
callback(`weakmap_callback_arg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const weakMap = new WeakMap();
const tmpMCF = weakMap.set;
const tmpMCP = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(arguments.length, tmpPrevalAliasArgumentsAny[0]);
};
const obj = {};
$dotCall(tmpMCF, weakMap, `set`, obj, tmpMCP);
const callback = weakMap.get(obj);
callback(`weakmap_callback_arg`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new WeakMap();
const b = a.set;
const c = function() {
  const d = e;
  const f = e.length;
  debugger;
  const g = d[ 0 ];
  $( f, g );
  return undefined;
};
const h = {};
$dotCall( b, a, "set", h, c );
const i = a.get;
const j = $dotCall( i, a, "get", h );
j( "weakmap_callback_arg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsWeakMap = function () {
  debugger;
  const weakMap = new WeakMap();
  const obj = {};
  const tmpMCF = weakMap.set;
  const tmpMCP = function () {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpPrevalAliasArgumentsLen = arguments.length;
    debugger;
    const len = tmpPrevalAliasArgumentsLen;
    const first = tmpPrevalAliasArgumentsAny[0];
    $(len, first);
    return undefined;
  };
  $dotCall(tmpMCF, weakMap, `set`, obj, tmpMCP);
  const tmpMCF$1 = weakMap.get;
  const callback = $dotCall(tmpMCF$1, weakMap, `get`, obj);
  callback(`weakmap_callback_arg`);
  return undefined;
};
testArgsWeakMap();
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


BAD@! Found 1 implicit global bindings:

WeakMap


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'weakmap_callback_arg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
