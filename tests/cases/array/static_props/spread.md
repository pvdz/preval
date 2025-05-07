# Preval test case

# spread.md

> Array > Static props > Spread
>
> Getting the length of an array can be tricky, and sometimes be done

Spreads in an array may affect the size in uncontrollable ways. We should wait until spreads are resolved or consider the array unpredictable.

## Input

`````js filename=intro
const arr = [1, 2, ...$([10, 20]), 3];
$(arr.length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [10, 20];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const arr /*:array*/ = [1, 2, ...tmpArrSpread, 3];
const tmpCalleeParam$1 /*:number*/ = arr.length;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([10, 20]);
$([1, 2, ...tmpArrSpread, 3].length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $( a );
const c = [ 1, 2, ...b, 3 ];
const d = c.length;
$( d );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [10, 20]
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
