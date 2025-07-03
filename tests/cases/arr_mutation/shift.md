# Preval test case

# shift.md

> Arr mutation > Shift
>
> Serializing an array with elided positions

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.shift;
let tmpCalleeParam = $dotCall(tmpMCF, arr, `shift`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) outline any args for tdz


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
