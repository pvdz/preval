# Preval test case

# reduceright_single_no_init.md

> Array methods > Reduceright > Ai > Reduceright single no init
>
> Test: Array.reduceRight with single element array without initial value

## Input

`````js filename=intro
const arr = $([1]);
const result = arr.reduceRight((acc, val) => acc + val);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduceRight;
const tmpMCP /*:(unknown, unknown)=>primitive*/ = function $pcompiled($$0, $$1) {
  const acc /*:unknown*/ = $$0;
  const val /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:primitive*/ = acc + val;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1]);
const tmpMCF = arr.reduceRight;
$(
  $dotCall(tmpMCF, arr, `reduceRight`, function $pcompiled(acc, val) {
    const tmpReturnArg = acc + val;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
const b = $( a );
const c = b.reduceRight;
const d = function $pcompiled($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = e + f;
  return g;
};
const h = $dotCall( c, b, "reduceRight", d );
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
