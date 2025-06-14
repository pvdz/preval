# Preval test case

# reduce_elided_one_no_init.md

> Array methods > Reduceright > Reduce elided one no init
>
> When the array only has one element and otherwise elided elements, and is called without init, the callback should not be called

## Input

`````js filename=intro
let result = [];
const x = [,,,100,,,].reduceRight((a,b) => $(a,b));
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
$(result, 100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([], 100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a, 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , 100, , ,];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [], 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
