# Preval test case

# shift.md

> Array > Manipulation > Shift
>
> Push a number to an array

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
$(arr);
`````


## Settled


`````js filename=intro
$(1);
const arr /*:array*/ = [2, 3];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$([2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = [ 2, 3 ];
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
