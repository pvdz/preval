# Preval test case

# reduceright_this_primitive.md

> Array methods > Reduceright > Ai > Reduceright this primitive
>
> Test: Array.reduceRight with thisArg as primitive (number)

## Input

`````js filename=intro
const x = [1,2,3].reduceRight(function(x) { $(this === 42); }, 42);
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpCalleeParam /*:boolean*/ = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
$dotCall(tmpMCP, undefined, undefined);
$dotCall(tmpMCP, undefined, undefined);
const tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
$(tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $(tmpPrevalAliasThis === 42);
};
$dotCall(tmpMCP, undefined, undefined);
$dotCall(tmpMCP, undefined, undefined);
$($dotCall(tmpMCP, undefined, undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b === 42;
  $( c );
  return undefined;
};
$dotCall( a, undefined, undefined );
$dotCall( a, undefined, undefined );
const d = $dotCall( a, undefined, undefined );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  let tmpCalleeParam = tmpPrevalAliasThis === 42;
  $(tmpCalleeParam);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP, 42);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: false
 - 3: false
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
