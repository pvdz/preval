# Preval test case

# foreach_mutate_length_up.md

> Array methods > Foreach > Ai > Foreach mutate length up
>
> Test: Array.forEach with length increase during iteration

## Input

`````js filename=intro
// Input: let arr = [1,2]; arr.forEach(fn) where fn increases arr.length
// Expected: Only original elements are visited
let arr = [1,2];
let result = [];
arr.forEach(function(x, i, a) { result.push(x); if (i === 1) a.length = 4; });
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
let arr = [1, 2];
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
    a.length = 4;
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
- (todo) do we want to support Literal as expression statement in free loops?
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
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
