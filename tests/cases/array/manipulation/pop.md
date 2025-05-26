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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.pop;
let tmpCalleeParam = $dotCall(tmpMCF, arr, `pop`);
$(tmpCalleeParam);
$(arr);
`````


## Todos triggered


- (todo) outline any args for tdz
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_pop


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
