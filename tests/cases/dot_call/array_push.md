# Preval test case

# array_push.md

> Dot call > Array push
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 'push', 3);
$(x, arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
$(3, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3, [1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( 3, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, `push`, 3);
$(x, arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3, [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
