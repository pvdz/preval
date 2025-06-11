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
const tmpMCP /*:(unknown, unknown)=>number*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  const tmpReturnArg /*:number*/ = $Math_max(a, b);
  return tmpReturnArg;
};
const arr /*:array*/ /*truthy*/ = [1, 5, 2, 8];
const max /*:array*/ /*truthy*/ = $dotCall($array_reduceRight, arr, `reduceRight`, tmpMCP);
$(max);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function (a, b) {
  const tmpReturnArg = $Math_max(a, b);
  return tmpReturnArg;
};
$($dotCall($array_reduceRight, [1, 5, 2, 8], `reduceRight`, tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = $Math_max( b, c );
  return d;
};
const e = [ 1, 5, 2, 8 ];
const f = $dotCall( $array_reduceRight, e, "reduceRight", a );
$( f );
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


- (todo) arr mutation may be able to inline this method: $array_reduceRight
- (todo) support array reads statement type VarStatement
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
