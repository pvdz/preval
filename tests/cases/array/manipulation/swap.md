# Preval test case

# swap.md

> Array > Manipulation > Swap
>
> Rotate a number

## Input

`````js filename=intro
const arr = [1, 2];
arr.push(arr.shift());
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [2, 1];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([2, 1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2];
const tmpMCF = arr.push;
const tmpMCF$1 = arr.shift;
const tmpMCP = $dotCall(tmpMCF$1, arr, `shift`);
$dotCall(tmpMCF, arr, `push`, tmpMCP);
$(arr);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_shift
- (todo) arr mutation may be able to inline this method: tmpMCF$1
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
