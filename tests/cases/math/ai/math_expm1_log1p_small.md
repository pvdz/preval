# Preval test case

# math_expm1_log1p_small.md

> Math > Ai > Math expm1 log1p small
>
> Math.expm1 and Math.log1p with small values

## Input

`````js filename=intro
const a = $(Math.expm1(1e-16));
const b = $(Math.log1p(1e-16));
const c = $(Math.expm1(0));
const d = $(Math.log1p(0));
$(a);
$(b);
$(c);
$(d);
// Should be close to 1e-16, 1e-16, 0, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1e-16);
const b /*:unknown*/ = $(1e-16);
const c /*:unknown*/ = $(0);
const d /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1e-16);
const b = $(1e-16);
const c = $(0);
const d = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1e-16 );
const b = $( 1e-16 );
const c = $( 0 );
const d = $( 0 );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_expm1;
let tmpCalleeParam = 1e-16;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_log1p;
let tmpCalleeParam$1 = 1e-16;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_expm1;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_log1p;
let tmpCalleeParam$5 = 0;
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
 - 1: 1e-16
 - 2: 1e-16
 - 3: 0
 - 4: 0
 - 5: 1e-16
 - 6: 1e-16
 - 7: 0
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
