# Preval test case

# number_math_fround_precision.md

> Math > Ai > Number math fround precision
>
> Math.fround with values that lose precision in float32

## Input

`````js filename=intro
const a = $(Math.fround(1.337));
const b = $(Math.fround(1.00000011920928955078125));
const c = $(Math.fround(1e-45));
$(a);
$(b);
$(c);
// Should be 1.3370000123977661, 1, 1e-45
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.3370000123977661);
const b /*:unknown*/ = $(1.0000001192092896);
const c /*:unknown*/ = $(1.401298464324817e-45);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1.3370000123977661);
const b = $(1.0000001192092896);
const c = $(1.401298464324817e-45);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.3370000123977661 );
const b = $( 1.0000001192092896 );
const c = $( 1.401298464324817e-45 );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam = 1.3370000123977661;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_fround;
let tmpCalleeParam$1 = 1.0000001192092896;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_fround;
let tmpCalleeParam$3 = 1.401298464324817e-45;
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
 - 1: 1.3370000123977661
 - 2: 1.0000001192092896
 - 3: 1.401298464324817e-45
 - 4: 1.3370000123977661
 - 5: 1.0000001192092896
 - 6: 1.401298464324817e-45
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
