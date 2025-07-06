# Preval test case

# reduceright_no_match.md

> Array methods > Reduceright > Ai > Reduceright no match
>
> Test: Array.reduceRight with no matches - should return false

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.reduceRight(x => x > 5);  // No elements > 5
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.reduceRight;
const tmpMCP /*:(unknown)=>boolean*/ = function $pcompiled($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:boolean*/ = x > 5;
  return tmpReturnArg;
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.reduceRight;
$(
  $dotCall(tmpMCF, arr, `reduceRight`, function $pcompiled(x) {
    const tmpReturnArg = x > 5;
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.reduceRight;
const d = function $pcompiled($$0 ) {
  const e = $$0;
  debugger;
  const f = e > 5;
  return f;
};
const g = $dotCall( c, b, "reduceRight", d );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x > 5;
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
 - 1: [1, 2, 3]
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
