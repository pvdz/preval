# Preval test case

# math_atan2_quadrants.md

> Math > Ai > Math atan2 quadrants
>
> Math.atan2 in all four quadrants and with zero

## Input

`````js filename=intro
const a = $(Math.atan2(1, 1));
const b = $(Math.atan2(1, -1));
const c = $(Math.atan2(-1, -1));
const d = $(Math.atan2(-1, 1));
const e = $(Math.atan2(0, 0));
$(a);
$(b);
$(c);
$(d);
$(e);
// Should be pi/4, 3pi/4, -3pi/4, -pi/4, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0.7853981633974483);
const b /*:unknown*/ = $(2.356194490192345);
const c /*:unknown*/ = $(-2.356194490192345);
const d /*:unknown*/ = $(-0.7853981633974483);
const e /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0.7853981633974483);
const b = $(2.356194490192345);
const c = $(-2.356194490192345);
const d = $(-0.7853981633974483);
const e = $(0);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.7853981633974483 );
const b = $( 2.356194490192345 );
const c = $( -2.356194490192345 );
const d = $( -0.7853981633974483 );
const e = $( 0 );
$( a );
$( b );
$( c );
$( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_atan2;
let tmpCalleeParam = 0.7853981633974483;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_atan2;
let tmpCalleeParam$1 = 2.356194490192345;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_atan2;
let tmpCalleeParam$3 = -2.356194490192345;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_atan2;
let tmpCalleeParam$5 = -0.7853981633974483;
const d = $(tmpCalleeParam$5);
const tmpMCF$7 = $Math_atan2;
let tmpCalleeParam$7 = 0;
const e = $(tmpCalleeParam$7);
$(a);
$(b);
$(c);
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7853981633974483
 - 2: 2.356194490192345
 - 3: -2.356194490192345
 - 4: -0.7853981633974483
 - 5: 0
 - 6: 0.7853981633974483
 - 7: 2.356194490192345
 - 8: -2.356194490192345
 - 9: -0.7853981633974483
 - 10: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
