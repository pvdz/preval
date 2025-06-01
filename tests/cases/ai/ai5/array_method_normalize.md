# Preval test case

# array_method_normalize.md

> Ai > Ai5 > Array method normalize
>
> Test normalization of array methods to loops

## Input

`````js filename=intro
const arr = [1, 2, 3];
const sum = arr.reduce((a, b) => a + b, 0);
$(sum);

// Expected:
// const arr = [1, 2, 3];
// let sum = 0;
// let i = 0;
// while (i < arr.length) {
//     sum = sum + arr[i];
//     i = i + 1;
// }
// $(sum);
`````


## Settled


`````js filename=intro
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = a + b;
  return tmpReturnArg;
};
const arr /*:array*/ = [1, 2, 3];
const sum /*:array*/ = $dotCall($array_reduce, arr, `reduce`, tmpMCP, 0);
$(sum);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function (a, b) {
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
$($dotCall($array_reduce, [1, 2, 3], `reduce`, tmpMCP, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = b + c;
  return d;
};
const e = [ 1, 2, 3 ];
const f = $dotCall( $array_reduce, e, "reduce", a, 0 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
const sum = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, 0);
$(sum);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_reduce
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
