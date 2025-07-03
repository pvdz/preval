# Preval test case

# reduce_empty_with_init.md

> Array methods > Reduce > Ai > Reduce empty with init
>
> Test: Array.reduce with empty array and initial value

## Input

`````js filename=intro
const arr = $([]);
const result = arr.reduce((acc, val) => acc + val, 10);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduce;
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function ($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, 10);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([]);
const tmpMCF = arr.reduce;
$(
  $dotCall(
    tmpMCF,
    arr,
    `reduce`,
    function (acc, val) {
      const tmpReturnArg = acc + val;
      return tmpReturnArg;
    },
    10,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = b.reduce;
const d = function($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = e + f;
  return g;
};
const h = $dotCall( c, b, "reduce", d, 10 );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduce;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `reduce`, tmpMCP, 10);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
