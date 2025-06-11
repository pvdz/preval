# Preval test case

# math_fround_precision.md

> Math > Ai > Math fround precision
>
> Math.fround precision loss

## Input

`````js filename=intro
const a = $(Math.fround(0.1 + 0.2));
$(a);
// Should be 0.30000001192092896
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0.30000001192092896);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0.30000001192092896));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.30000001192092896 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
const tmpMCP = 0.30000000000000004;
let tmpCalleeParam = $dotCall(tmpMCF, Math, `fround`, tmpMCP);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.30000001192092896
 - 2: 0.30000001192092896
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
