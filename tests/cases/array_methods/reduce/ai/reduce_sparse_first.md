# Preval test case

# reduce_sparse_first.md

> Array methods > Reduce > Ai > Reduce sparse first
>
> Test: Array.reduce with sparse array where first element is empty

## Input

`````js filename=intro
const arr = $([, 2, 3]);  // Note the hole at index 0
const result = arr.reduce((acc, val) => acc + val);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduce;
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function $pcompiled($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduce`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([, 2, 3]);
const tmpMCF = arr.reduce;
$(
  $dotCall(tmpMCF, arr, `reduce`, function $pcompiled(acc, val) {
    const tmpReturnArg = acc + val;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ ,, 2, 3 ];
const b = $( a );
const c = b.reduce;
const d = function e($$0,$$1 ) {
  const f = $$0;
  const g = $$1;
  debugger;
  const h = f + g;
  return h;
};
const i = $dotCall( c, b, "reduce", d );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `reduce`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [, 2, 3]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
