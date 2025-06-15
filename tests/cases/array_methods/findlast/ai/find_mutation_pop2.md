# Preval test case

# find_mutation_pop2.md

> Array methods > Findlast > Ai > Find mutation pop2
>
> Test: Array.findLast with pop during iteration

## Input

`````js filename=intro
const arr /*:array*/ /*truthy*/ = [ 1, 2, 3 ];
const result /*:array*/ /*truthy*/ = [];
const tmpArrel /*:primitive*/ = 1;
$dotCall($array_push, result, `push`, tmpArrel);
$(result);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [1];
$(result);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const result = [];
const tmpArrel = 1;
$dotCall($array_push, result, `push`, tmpArrel);
$(result);
`````


## Todos triggered


- (todo) find me fast
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
