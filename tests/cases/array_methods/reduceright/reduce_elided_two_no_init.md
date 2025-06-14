# Preval test case

# reduce_elided_two_no_init.md

> Array methods > Reduceright > Reduce elided two no init
>
> When the array only has two elements and otherwise elided elements, called without init, the callback should be called only for the second element

## Input

`````js filename=intro
let result = [];
const x = [,,,100,,,,200,].reduceRight((a,b) => { $(a,b); return a+b; });
$(result, x);
`````


## Settled


`````js filename=intro
$(200, 100);
const result /*:array*/ /*truthy*/ = [];
$(result, 300);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(200, 100);
$([], 300);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 200, 100 );
const a = [];
$( a, 300 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , 100, , , , 200];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a, b);
  const tmpReturnArg = a + b;
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
 - 1: 200, 100
 - 2: [], 300
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
