# Preval test case

# math_abs_sign_zero.md

> Math > Ai > Math abs sign zero
>
> Math.abs and Math.sign with +0 and -0

## Input

`````js filename=intro
const a = $(Math.abs(0));
const b = $(Math.abs(-0));
const c = $(Math.sign(0));
const d = $(Math.sign(-0));
$(a);
$(b);
$(c);
$(d);
// Should be 0, 0, 0, -0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(0);
const c /*:unknown*/ = $(0);
const d /*:unknown*/ = $(-0);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(0);
const b = $(0);
const c = $(0);
const d = $(-0);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( 0 );
const c = $( 0 );
const d = $( -0 );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_abs;
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_abs;
let tmpCalleeParam$1 = 0;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_sign;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_sign;
let tmpCalleeParam$5 = -0;
const d = $(tmpCalleeParam$5);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - 7: 0
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
