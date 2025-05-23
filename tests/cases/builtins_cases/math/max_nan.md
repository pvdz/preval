# Preval test case

# max_nan.md

> Builtins cases > Math > Max nan
>
>

## Input

`````js filename=intro
const x = Math.max(NaN, 3.300031, 5);
$(x);
`````


## Settled


`````js filename=intro
const x /*:number*/ = $Math_max($Number_NaN, 3.300031, 5);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_max($Number_NaN, 3.300031, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Math_max( $Number_NaN, 3.300031, 5 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_max;
const x = $Math_max($Number_NaN, 3.300031, 5);
$(x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
