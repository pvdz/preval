# Preval test case

# math_hypot_large_small.md

> Math > Ai > Math hypot large small
>
> Math.hypot with large and small values

## Input

`````js filename=intro
const a = $(Math.hypot(1e154, 1e154));
const b = $(Math.hypot(1e-200, 1e-200));
const c = $(Math.hypot(3, 4));
$(a);
$(b);
$(c);
// Should be close to 1.4142135623730951e154, 0, 5
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.4142135623730953e154);
const b /*:unknown*/ = $(1.414213562373095e-200);
const c /*:unknown*/ = $(5);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1.4142135623730953e154);
const b = $(1.414213562373095e-200);
const c = $(5);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.4142135623730953e+154 );
const b = $( 1.414213562373095e-200 );
const c = $( 5 );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_hypot;
let tmpCalleeParam = 1.4142135623730953e154;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_hypot;
let tmpCalleeParam$1 = 1.414213562373095e-200;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_hypot;
let tmpCalleeParam$3 = 5;
const c = $(tmpCalleeParam$3);
$(a);
$(b);
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4142135623730953e154
 - 2: 1.414213562373095e-200
 - 3: 5
 - 4: 1.4142135623730953e154
 - 5: 1.414213562373095e-200
 - 6: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
