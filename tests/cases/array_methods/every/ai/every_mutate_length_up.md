# Preval test case

# every_mutate_length_up.md

> Array methods > Every > Ai > Every mutate length up
>
> Test: Array.every with length increase during iteration

## Input

`````js filename=intro
let arr = [1,2];
let result = [];
const x = arr.every(function(x, i, a) { result.push(x); if (i === 1) a.length = 4; });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1];
$(result, false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1], false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a, false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2];
let result = [];
const tmpMCF = arr.every;
const tmpMCP = function ($$0, $$1, $$2) {
  let x$1 = $$0;
  let i = $$1;
  let a = $$2;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  const tmpIfTest = i === 1;
  if (tmpIfTest) {
    a.length = 4;
    return undefined;
  } else {
    return undefined;
  }
};
const x = $dotCall(tmpMCF, arr, `every`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1], false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
