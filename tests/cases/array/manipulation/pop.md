# Preval test case

# pop.md

> Array > Manipulation > Pop
>
> Push a number to an array

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.pop());
$(arr);
`````


## Settled


`````js filename=intro
$(3);
const arr /*:array*/ = [1, 2];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$([1, 2]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
const a = [ 1, 2 ];
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
 - 1: 3
 - 2: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
