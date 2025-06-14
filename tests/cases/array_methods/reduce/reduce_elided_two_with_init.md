# Preval test case

# reduce_elided_two_with_init.md

> Array methods > Reduce > Reduce elided two with init
>
> When the array only has two elements and otherwise elided elements, called without init, the callback should be called for all

## Input

`````js filename=intro
let result = [];
const x = [,,,100,,,,200,,].reduce((a,b) => { $(a,b); return a+b; }, 10);
$(result, x);
`````


## Settled


`````js filename=intro
$(10, 100);
$(110, 200);
const result /*:array*/ /*truthy*/ = [];
$(result, 310);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, 100);
$(110, 200);
$([], 310);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10, 100 );
$( 110, 200 );
const a = [];
$( a, 310 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , 100, , , , 200, ,];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a, b);
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP, 10);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 100
 - 2: 110, 200
 - 3: [], 310
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
