# Preval test case

# base.md

> Array > Manipulation > Shift > Base
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [...$([ `a`, `b`, `c` ])];
const N = ARR.shift();
$(N);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`a`, `b`, `c`];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const ARR /*:array*/ /*truthy*/ = [...tmpArrSpread];
const N /*:unknown*/ /*truthy*/ = $dotCall($array_shift, ARR, `shift`);
$(N);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([`a`, `b`, `c`]);
$($dotCall($array_shift, [...tmpArrSpread], `shift`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = $( a );
const c = [ ...b ];
const d = $dotCall( $array_shift, c, "shift" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [`a`, `b`, `c`];
const tmpArrSpread = $(tmpCalleeParam);
const ARR = [...tmpArrSpread];
const tmpMCF = ARR.shift;
const N = $dotCall(tmpMCF, ARR, `shift`);
$(N);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_shift
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 'b', 'c']
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
