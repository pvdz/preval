# Preval test case

# math_large_small_mix.md

> Math > Ai > Math large small mix
>
> Mixing very large and very small numbers in Math

## Input

`````js filename=intro
const a = $(Math.pow(1e308, 0.5));
const b = $(Math.pow(1e-308, 2));
$(a);
$(b);
// Should be 1e154, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1e154);
const b /*:unknown*/ = $(0);
$(a);
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1e154);
const b = $(0);
$(a);
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1e+154 );
const b = $( 0 );
$( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
let tmpCalleeParam = 1e154;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_pow;
let tmpCalleeParam$1 = 0;
const b = $(tmpCalleeParam$1);
$(a);
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1e154
 - 2: 0
 - 3: 1e154
 - 4: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
