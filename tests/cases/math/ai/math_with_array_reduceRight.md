# Preval test case

# math_with_array_reduceRight.md

> Math > Ai > Math with array reduceRight
>
> Math.max with reduceRight on array

## Input

`````js filename=intro
const arr = [1, 5, 2, 8];
const max = arr.reduceRight((a, b) => Math.max(a, b));
$(max);
// Should be 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 5, 2, 8];
const tmpMCF = arr.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpMCF$1 = $Math_max;
  const tmpReturnArg = $Math_max(a, b);
  return tmpReturnArg;
};
const max = $dotCall(tmpMCF, arr, `reduceRight`, tmpMCP);
$(max);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Math_max
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
