# Preval test case

# find_falsy.md

> Array methods > FindIndex > Ai > Find falsy
>
> Test: Array.findIndex with falsy values

## Input

`````js filename=intro
const arr = $([0, '', false, null, undefined, NaN]);
const result = arr.findIndex(x => x === 0);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [0, ``, false, null, undefined, NaN];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findIndex;
const tmpMCP /*:(unknown)=>boolean*/ = function $pcompiled($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x === 0;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([0, ``, false, null, undefined, NaN]);
const tmpMCF = arr.findIndex;
$(
  $dotCall(tmpMCF, arr, `findIndex`, function $pcompiled(x) {
    const tmpReturnArg = x === 0;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, "", false, null, undefined, NaN ];
const b = $( a );
const c = b.findIndex;
const d = function e($$0 ) {
  const f = $$0;
  debugger;
  const g = f === 0;
  return g;
};
const h = $dotCall( c, b, "findIndex", d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [0, ``, false, null, undefined, NaN];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === 0;
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
 - 1: [0, '', false, null, undefined, NaN]
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
