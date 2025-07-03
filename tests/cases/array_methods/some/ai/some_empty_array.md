# Preval test case

# some_empty_array.md

> Array methods > Some > Ai > Some empty array
>
> Test: Array.some on empty array

## Input

`````js filename=intro
let result = [];
const x = [].some(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
$(result, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([], false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a, false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [];
const tmpMCF = tmpMCOO.some;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `some`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
