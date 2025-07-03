# Preval test case

# find_basic.md

> Array methods > Findlast > Ai > Find basic
>
> Test: Array.findLast with basic predicate function

## Input

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
const result = arr.findLast(x => x % 2 === 0);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findLast;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpBinLhs /*:number*/ = x % 2;
  const tmpReturnArg /*:boolean*/ = tmpBinLhs === 0;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
const tmpMCF = arr.findLast;
$(
  $dotCall(tmpMCF, arr, `findLast`, function (x) {
    const tmpReturnArg = x % 2 === 0;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
const b = $( a );
const c = b.findLast;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e % 2;
  const g = f === 0;
  return g;
};
const h = $dotCall( c, b, "findLast", d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3, 4, 5];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findLast;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpBinLhs = x % 2;
  const tmpReturnArg = tmpBinLhs === 0;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4, 5]
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
