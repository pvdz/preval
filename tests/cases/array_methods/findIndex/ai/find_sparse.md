# Preval test case

# find_sparse.md

> Array methods > FindIndex > Ai > Find sparse
>
> Test: Array.findIndex with sparse array

## Input

`````js filename=intro
const arr = $([1, , 3, , 5]);
const result = arr.findIndex(x => x === 3);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, , 3, , 5];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findIndex;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x === 3;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, , 3, , 5]);
const tmpMCF = arr.findIndex;
$(
  $dotCall(tmpMCF, arr, `findIndex`, function (x) {
    const tmpReturnArg = x === 3;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, ,, 3, ,, 5 ];
const b = $( a );
const c = b.findIndex;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e === 3;
  return f;
};
const g = $dotCall( c, b, "findIndex", d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, , 3, , 5];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === 3;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, , 3, , 5]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
