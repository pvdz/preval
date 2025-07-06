# Preval test case

# reduce_sparse_no_init.md

> Array methods > Reduce > Ai > Reduce sparse no init
>
> Test: Array.reduce with sparse array without initial value

## Input

`````js filename=intro
const arr = $([1, , 3]);  // Note the hole at index 1
const result = arr.reduce((acc, val) => acc + val);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, , 3];
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
const arr = $([1, , 3]);
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
const a = [ 1, ,, 3 ];
const b = $( a );
const c = b.reduce;
const d = function $pcompiled($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = e + f;
  return g;
};
const h = $dotCall( c, b, "reduce", d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, , 3];
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
 - 1: [1, , 3]
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
