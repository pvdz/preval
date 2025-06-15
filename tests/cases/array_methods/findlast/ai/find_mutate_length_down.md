# Preval test case

# find_mutate_length_down.md

> Array methods > Findlast > Ai > Find mutate length down
>
> Test: Array.findLast with length decrease during iteration

## Input

`````js filename=intro
let arr = [1,2,3,4];
let result = [];
const x = arr.findLast(function(x, i, a) { result.push(x); if (i === 1) a.length = 2; });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [4, 3, 2, 1];
$(result, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([4, 3, 2, 1], undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 3, 2, 1 ];
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2, 3, 4];
let result = [];
const tmpMCF = arr.findLast;
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
const x = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support $frfr that has multiple/no/generic returns type;
- (todo) Support this node type in isFree: LabeledStatement
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [4, 3, 2, 1], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
