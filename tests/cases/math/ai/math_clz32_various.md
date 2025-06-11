# Preval test case

# math_clz32_various.md

> Math > Ai > Math clz32 various
>
> Math.clz32 with various values

## Input

`````js filename=intro
const a = $(Math.clz32(1));
const b = $(Math.clz32(0));
const c = $(Math.clz32(0x80000000));
const d = $(Math.clz32(-1));
$(a);
$(b);
$(c);
$(d);
// Should be 31, 32, 0, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(31);
const b /*:unknown*/ = $(32);
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
const a = $(31);
const b = $(32);
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
const a = $( 31 );
const b = $( 32 );
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
const tmpMCF = $Math_clz32;
let tmpCalleeParam = 31;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_clz32;
let tmpCalleeParam$1 = 32;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_clz32;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_clz32;
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
 - 1: 31
 - 2: 32
 - 3: 0
 - 4: 0
 - 5: 31
 - 6: 32
 - 7: 0
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
