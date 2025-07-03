# Preval test case

# some_mutate_length_down.md

> Array methods > Some > Ai > Some mutate length down
>
> Test: Array.some with length decrease during iteration

## Input

`````js filename=intro
let arr = [1,2,3,4];
let result = [];
const x = arr.some(function(x, i, a) { result.push(x); if (i === 1) a.length = 2; });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1, 2];
$(result, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2], false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
$( a, false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
let result = [];
const tmpMCF = arr.some;
const tmpMCP = function ($$0, $$1, $$2) {
  let x$1 = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  const tmpIfTest = i === 1;
  if (tmpIfTest) {
    a.length = 2;
    return undefined;
  } else {
    return undefined;
  }
};
const x = $dotCall(tmpMCF, arr, `some`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_some


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
