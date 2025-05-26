# Preval test case

# base.md

> Array > Manipulation > Base
>
> Push a number to an array

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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [];
const tmpMCF = arr.push;
$dotCall(tmpMCF, arr, `push`, 1);
$(arr);
`````


## Todos triggered


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
