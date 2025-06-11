# Preval test case

# math_array_map_reduce.md

> Math > Ai > Math array map reduce
>
> Array map/reduce with Math functions

## Input

`````js filename=intro
const arr = [0.1, 0.2, 0.3];
const sum = arr.map(Math.sqrt).reduce((a, b) => a + b, 0);
$(sum);
// Should be close to sqrt(0.1) + sqrt(0.2) + sqrt(0.3)
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [0.1, 0.2, 0.3];
const tmpMCOO /*:array*/ /*truthy*/ = $dotCall($array_map, arr, `map`, $Math_sqrt);
const tmpMCP$1 /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = a + b;
  return tmpReturnArg;
};
const sum /*:array*/ /*truthy*/ = $dotCall($array_reduce, tmpMCOO, `reduce`, tmpMCP$1, 0);
$(sum);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCOO = $dotCall($array_map, [0.1, 0.2, 0.3], `map`, $Math_sqrt);
$(
  $dotCall(
    $array_reduce,
    tmpMCOO,
    `reduce`,
    function (a, b) {
      const tmpReturnArg = a + b;
      return tmpReturnArg;
    },
    0,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0.1, 0.2, 0.3 ];
const b = $dotCall( $array_map, a, "map", $Math_sqrt );
const c = function($$0,$$1 ) {
  const d = $$0;
  const e = $$1;
  debugger;
  const f = d + e;
  return f;
};
const g = $dotCall( $array_reduce, b, "reduce", c, 0 );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [0.1, 0.2, 0.3];
const tmpMCF = arr.map;
const tmpMCP = $Math_sqrt;
const tmpMCOO = $dotCall(tmpMCF, arr, `map`, $Math_sqrt);
const tmpMCF$1 = tmpMCOO.reduce;
const tmpMCP$1 = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
const sum = $dotCall(tmpMCF$1, tmpMCOO, `reduce`, tmpMCP$1, 0);
$(sum);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reduce
- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.311163919021962
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
