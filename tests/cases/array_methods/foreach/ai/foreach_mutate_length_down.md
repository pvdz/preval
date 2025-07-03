# Preval test case

# foreach_mutate_length_down.md

> Array methods > Foreach > Ai > Foreach mutate length down
>
> Test: Array.forEach with length decrease during iteration

## Input

`````js filename=intro
// Input: let arr = [1,2,3,4]; arr.forEach(fn) where fn shortens arr
// Expected: Only original elements up to new length are visited
let arr = [1,2,3,4];
let result = [];
arr.forEach(function(x, i, a) { result.push(x); if (i === 1) a.length = 2; });
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
let arr = [1, 2, 3, 4];
let result = [];
const tmpMCF = arr.forEach;
const tmpMCP = function ($$0, $$1, $$2) {
  let x = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x);
  const tmpIfTest = i === 1;
  if (tmpIfTest) {
    a.length = 2;
    return undefined;
  } else {
    return undefined;
  }
};
$dotCall(tmpMCF, arr, `forEach`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


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
