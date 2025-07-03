# Preval test case

# reduceright_init_object.md

> Array methods > Reduceright > Ai > Reduceright init object
>
> Test: Array.reduceRight with object initial value

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.reduceRight((acc, val) => {
    acc.sum += val;
    return acc;
}, { sum: 0 });
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduceRight;
const tmpMCP /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpCompoundAssignLhs /*:unknown*/ = acc.sum;
  const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + val;
  acc.sum = tmpAssignMemRhs;
  return acc;
};
const tmpMCP$1 /*:object*/ /*truthy*/ = { sum: 0 };
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, tmpMCP$1);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.reduceRight;
const tmpMCP = function (acc, val) {
  acc.sum = acc.sum + val;
  return acc;
};
$($dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, { sum: 0 }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.reduceRight;
const d = function($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = e.sum;
  const h = g + f;
  e.sum = h;
  return e;
};
const i = { sum: 0 };
const j = $dotCall( c, b, "reduceRight", d, i );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpCompoundAssignLhs = acc.sum;
  const tmpAssignMemLhsObj = acc;
  const tmpAssignMemRhs = tmpCompoundAssignLhs + val;
  tmpAssignMemLhsObj.sum = tmpAssignMemRhs;
  return acc;
};
const tmpMCP$1 = { sum: 0 };
const result = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, tmpMCP$1);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: { sum: '6' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
