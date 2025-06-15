# Preval test case

# find_object.md

> Array methods > Findlastindex > Ai > Find object
>
> Test: Array.findLastIndex with object predicate

## Input

`````js filename=intro
const arr = $([{ id: 1 }, { id: 2 }, { id: 3 }]);
const result = arr.findLastIndex(obj => obj.id === 2);
$(result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ /*truthy*/ = { id: 1 };
const tmpArrElement$1 /*:object*/ /*truthy*/ = { id: 2 };
const tmpArrElement$3 /*:object*/ /*truthy*/ = { id: 3 };
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findLastIndex;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const obj /*:unknown*/ = $$0;
  debugger;
  const tmpBinLhs /*:unknown*/ = obj.id;
  const tmpReturnArg /*:boolean*/ = tmpBinLhs === 2;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findLastIndex`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { id: 1 };
const tmpArrElement$1 = { id: 2 };
const tmpArrElement$3 = { id: 3 };
const arr = $([tmpArrElement, tmpArrElement$1, tmpArrElement$3]);
const tmpMCF = arr.findLastIndex;
$(
  $dotCall(tmpMCF, arr, `findLastIndex`, function (obj) {
    const tmpReturnArg = obj.id === 2;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { id: 1 };
const b = { id: 2 };
const c = { id: 3 };
const d = [ a, b, c ];
const e = $( d );
const f = e.findLastIndex;
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = h.id;
  const j = i === 2;
  return j;
};
const k = $dotCall( f, e, "findLastIndex", g );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = { id: 1 };
const tmpArrElement$1 = { id: 2 };
const tmpArrElement$3 = { id: 3 };
let tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.findLastIndex;
const tmpMCP = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpBinLhs = obj.id;
  const tmpReturnArg = tmpBinLhs === 2;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findLastIndex`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [{ id: '1' }, { id: '2' }, { id: '3' }]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
