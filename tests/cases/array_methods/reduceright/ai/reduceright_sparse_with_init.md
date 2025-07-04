# Preval test case

# reduceright_sparse_with_init.md

> Array methods > Reduceright > Ai > Reduceright sparse with init
>
> Test: Array.reduceRight with sparse array and initial value

## Input

`````js filename=intro
const arr = $([1, , 3]);  // Note the hole at index 1
const result = arr.reduceRight((acc, val) => acc + val, 0);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, , 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduceRight;
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function $pcompiled($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, 0);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, , 3]);
const tmpMCF = arr.reduceRight;
$(
  $dotCall(
    tmpMCF,
    arr,
    `reduceRight`,
    function $pcompiled(acc, val) {
      const tmpReturnArg = acc + val;
      return tmpReturnArg;
    },
    0,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, ,, 3 ];
const b = $( a );
const c = b.reduceRight;
const d = function e($$0,$$1 ) {
  const f = $$0;
  const g = $$1;
  debugger;
  const h = f + g;
  return h;
};
const i = $dotCall( c, b, "reduceRight", d, 0 );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, , 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP, 0);
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
