# Preval test case

# opaque_array_ops.md

> Ai > Ai5 > Opaque array ops
>
> Test preservation of opaque value array operations

## Input

`````js filename=intro
const x = $("test");
const arr = [x, x, x];
const y = arr.map(v => v.toString());
$(y);
    
// Expected:
// const x = $("test");
// const tmp = x.toString();
// const arr = [tmp, tmp, tmp];
// $(arr);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`test`);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const v /*:unknown*/ = $$0;
  debugger;
  const tmpMCF$1 /*:unknown*/ = v.toString;
  const tmpReturnArg /*:unknown*/ = $dotCall(tmpMCF$1, v, `toString`);
  return tmpReturnArg;
};
const arr /*:array*/ /*truthy*/ = [x, x, x];
const y /*:array*/ /*truthy*/ = $dotCall($array_map, arr, `map`, tmpMCP);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`test`);
const tmpMCP = function (v) {
  const tmpReturnArg = v.toString();
  return tmpReturnArg;
};
$($dotCall($array_map, [x, x, x], `map`, tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "test" );
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = c.toString;
  const e = $dotCall( d, c, "toString" );
  return e;
};
const f = [ a, a, a ];
const g = $dotCall( $array_map, f, "map", b );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
const arr = [x, x, x];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let v = $$0;
  debugger;
  const tmpMCF$1 = v.toString;
  const tmpReturnArg = $dotCall(tmpMCF$1, v, `toString`);
  return tmpReturnArg;
};
const y = $dotCall(tmpMCF, arr, `map`, tmpMCP);
$(y);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: ['test', 'test', 'test']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
