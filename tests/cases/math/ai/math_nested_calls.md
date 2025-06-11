# Preval test case

# math_nested_calls.md

> Math > Ai > Math nested calls
>
> Nested Math calls with mixed types

## Input

`````js filename=intro
const a = $(Math.sqrt(Math.abs(Math.sin(-3.14))));
$(a);
// Should be close to Math.sqrt(Math.abs(Math.sin(-3.14)))
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0.03990805578435046);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0.03990805578435046));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.03990805578435046 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_sqrt;
const tmpMCF$1 = $Math_abs;
const tmpMCF$3 = $Math_sin;
const tmpMCP$1 = -0.0015926529164868282;
const tmpMCP = $dotCall(tmpMCF$1, Math, `abs`, tmpMCP$1);
let tmpCalleeParam = $dotCall(tmpMCF, Math, `sqrt`, tmpMCP);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_sqrt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.03990805578435046
 - 2: 0.03990805578435046
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
