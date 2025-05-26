# Preval test case

# static_push_one_two.md

> Arr mutation > Static push one two
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the numbers immediately.

## Input

`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2];
$(arr);
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
const arr = [];
const tmpMCF = arr.push;
$dotCall(tmpMCF, arr, `push`, 1);
const tmpMCF$1 = arr.push;
$dotCall(tmpMCF$1, arr, `push`, 2);
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type ExpressionStatement


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
