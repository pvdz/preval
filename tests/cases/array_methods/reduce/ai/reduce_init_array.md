# Preval test case

# reduce_init_array.md

> Array methods > Reduce > Ai > Reduce init array
>
> Test: Array.reduce with array initial value

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.reduce((acc, val) => {
    acc.push(val * 2);
    return acc;
}, []);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduce;
const tmpMCP /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpMCF$1 /*:unknown*/ = acc.push;
  const tmpMCP$3 /*:number*/ = val * 2;
  $dotCall(tmpMCF$1, acc, `push`, tmpMCP$3);
  return acc;
};
const tmpMCP$1 /*:array*/ /*truthy*/ = [];
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, tmpMCP$1);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.reduce;
const tmpMCP = function (acc, val) {
  acc.push(val * 2);
  return acc;
};
$($dotCall(tmpMCF, arr, `reduce`, tmpMCP, []));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.reduce;
const d = function($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = e.push;
  const h = f * 2;
  $dotCall( g, e, "push", h );
  return e;
};
const i = [];
const j = $dotCall( c, b, "reduce", d, i );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpMCF$1 = acc.push;
  const tmpMCP$3 = val * 2;
  $dotCall(tmpMCF$1, acc, `push`, tmpMCP$3);
  return acc;
};
const tmpMCP$1 = [];
const result = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, tmpMCP$1);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [2, 4, 6]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
