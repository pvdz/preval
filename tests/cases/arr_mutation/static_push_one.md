# Preval test case

# static_push_one.md

> Arr mutation > Static push one
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the number immediately.

## Input

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
