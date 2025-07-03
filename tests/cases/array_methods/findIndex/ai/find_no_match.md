# Preval test case

# find_no_match.md

> Array methods > FindIndex > Ai > Find no match
>
> Test: Array.findIndex returns undefined when no element matches

## Input

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
const result = arr.findIndex(x => x > 10);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findIndex;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x > 10;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3, 4, 5]);
const tmpMCF = arr.findIndex;
$(
  $dotCall(tmpMCF, arr, `findIndex`, function (x) {
    const tmpReturnArg = x > 10;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4, 5 ];
const b = $( a );
const c = b.findIndex;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  const f = e > 10;
  return f;
};
const g = $dotCall( c, b, "findIndex", d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3, 4, 5];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x > 10;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 4, 5]
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
