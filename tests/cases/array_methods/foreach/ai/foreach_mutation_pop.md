# Preval test case

# foreach_mutation_pop.md

> Array methods > Foreach > Ai > Foreach mutation pop
>
> Test: Array.forEach with pop during iteration

## Input

`````js filename=intro
// Input: let arr = [1,2,3]; arr.forEach(fn) where fn pops from arr
// Expected: Only original elements are visited
let arr = [1,2,3];
let result = [];
arr.forEach(function(x) { result.push(x); arr.pop(); });
$(result);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1, 2];
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3];
let result = [];
const tmpMCF = arr.forEach;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x);
  const tmpMCF$3 = arr.pop;
  $dotCall(tmpMCF$3, arr, `pop`);
  return undefined;
};
$dotCall(tmpMCF, arr, `forEach`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_pop
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach
- (todo) type trackeed tricks can possibly support static $array_pop


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
