# Preval test case

# reduceright_undefined_values.md

> Array methods > Reduceright > Ai > Reduceright undefined values
>
> Test: Array.reduceRight on array with undefined values

## Input

`````js filename=intro
let arr = [undefined,2,undefined];
const x = arr.reduceRight(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [undefined, 2, undefined];
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
 - 1: undefined
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
