# Preval test case

# find_empty_array.md

> Array methods > FindIndex > Ai > Find empty array
>
> Test: Array.findIndex on empty array

## Input

`````js filename=intro
let result = [];
const x = [].findIndex(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
$(result, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([], -1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a, -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [];
const tmpMCF = tmpMCOO.findIndex;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
