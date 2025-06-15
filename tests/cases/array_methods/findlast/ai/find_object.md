# Preval test case

# find_object.md

> Array methods > Findlast > Ai > Find object
>
> Test: Array.findLast with object predicate

## Input

`````js filename=intro
const arr = $([{ id: 1 }, { id: 2 }, { id: 3 }]);
const result = arr.findLast(obj => obj.id === 2);
$(result);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:object*/ /*truthy*/ = { id: 1 };
const tmpArrElement$1 /*:object*/ /*truthy*/ = { id: 2 };
const tmpArrElement$3 /*:object*/ /*truthy*/ = { id: 3 };
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.findLast;
const tmpMCP /*:(unknown)=>boolean*/ = function ($$0) {
  const obj /*:unknown*/ = $$0;
  debugger;
  const tmpBinLhs /*:unknown*/ = obj.id;
  const tmpReturnArg /*:boolean*/ = tmpBinLhs === 2;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { id: 1 };
const tmpArrElement$1 = { id: 2 };
const tmpArrElement$3 = { id: 3 };
const arr = $([tmpArrElement, tmpArrElement$1, tmpArrElement$3]);
const tmpMCF = arr.findLast;
$(
  $dotCall(tmpMCF, arr, `findLast`, function (obj) {
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
const f = e.findLast;
const g = function($$0 ) {
  const h = $$0;
  debugger;
  const i = h.id;
  const j = i === 2;
  return j;
};
const k = $dotCall( f, e, "findLast", g );
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
const tmpMCF = arr.findLast;
const tmpMCP = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpBinLhs = obj.id;
  const tmpReturnArg = tmpBinLhs === 2;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [{ id: '1' }, { id: '2' }, { id: '3' }]
 - 2: { id: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
