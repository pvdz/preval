# Preval test case

# some_falsy_returns.md

> Array methods > Reduceright > Ai > Some falsy returns
>
> Test: Array.reduceRight with falsy return values - should work with any truthy value

## Input

`````js filename=intro
const arr = $([0, '', false, null, undefined, 1]);
const result = arr.reduceRight(x => x);  // Should return true because of the 1
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [0, ``, false, null, undefined, 1];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduceRight;
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  return x;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([0, ``, false, null, undefined, 1]);
const tmpMCF = arr.reduceRight;
$(
  $dotCall(tmpMCF, arr, `reduceRight`, function (x) {
    return x;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, "", false, null, undefined, 1 ];
const b = $( a );
const c = b.reduceRight;
const d = function($$0 ) {
  const e = $$0;
  debugger;
  return e;
};
const f = $dotCall( c, b, "reduceRight", d );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [0, ``, false, null, undefined, 1];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  return x;
};
const result = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, '', false, null, undefined, 1]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
