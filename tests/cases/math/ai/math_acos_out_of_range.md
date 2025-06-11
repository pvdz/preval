# Preval test case

# math_acos_out_of_range.md

> Math > Ai > Math acos out of range
>
> Math.acos out of range returns NaN

## Input

`````js filename=intro
const a = $(Math.acos(2));
$(a);
// Should be NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($Number_NaN));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_acos;
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
