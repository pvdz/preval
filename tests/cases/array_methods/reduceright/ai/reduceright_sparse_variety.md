# Preval test case

# reduceright_sparse_variety.md

> Array methods > Reduceright > Ai > Reduceright sparse variety
>
> Test: Array.reduceRight on varied sparse array

## Input

`````js filename=intro
let arr = [1,,undefined,4];
const x = arr.reduceRight(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(4);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , undefined, 4];
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
