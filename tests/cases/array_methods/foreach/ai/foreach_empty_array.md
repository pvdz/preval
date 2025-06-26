# Preval test case

# foreach_empty_array.md

> Array methods > Foreach > Ai > Foreach empty array
>
> Test: Array.forEach on empty array

## Input

`````js filename=intro
// Input: [].forEach(fn)
// Expected: fn is never called
let result = [];
[].forEach(function(x) { result.push(x); });
$(result);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [];
const tmpMCF = tmpMCOO.forEach;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x);
  return undefined;
};
$dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
