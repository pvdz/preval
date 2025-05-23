# Preval test case

# arr_init.md

> Array > Arr init
>
>

## Input

`````js filename=intro
const arr = [];
arr[0] = 0;
arr[1] = 1;
arr[2] = 2;
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [0, 1, 2];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([0, 1, 2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 0, 1, 2 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [];
arr[0] = 0;
arr[1] = 1;
arr[2] = 2;
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [0, 1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
