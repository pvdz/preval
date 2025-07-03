# Preval test case

# find_falsy_returns.md

> Array methods > Findlastindex > Ai > Find falsy returns
>
> Test: Array.findLastIndex with falsy return values - should work with any truthy value

## Input

`````js filename=intro
const arr = $([0, '', false, null, undefined, 1]);
const result = arr.findLastIndex(x => x);  // Should return true because of the 1
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [0, ``, false, null, undefined, 1];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findLastIndex;
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  return x;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findLastIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([0, ``, false, null, undefined, 1]);
const tmpMCF = arr.findLastIndex;
$(
  $dotCall(tmpMCF, arr, `findLastIndex`, function (x) {
    return x;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, "", false, null, undefined, 1 ];
const b = $( a );
const c = b.findLastIndex;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  return e;
};
const f = $dotCall( c, b, "findLastIndex", d );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [0, ``, false, null, undefined, 1];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findLastIndex;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  return x;
};
const result = $dotCall(tmpMCF, arr, `findLastIndex`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, '', false, null, undefined, 1]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
