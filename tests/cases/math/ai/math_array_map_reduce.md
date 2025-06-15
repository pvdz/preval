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
$(1.311163919021962);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.311163919021962);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.311163919021962 );
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


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_reduce
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Math_sqrt
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
