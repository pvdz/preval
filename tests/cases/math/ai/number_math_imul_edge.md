# Preval test case

# number_math_imul_edge.md

> Math > Ai > Number math imul edge
>
> Math.imul with edge 32-bit values

## Input

`````js filename=intro
const a = $(Math.imul(0xffffffff, 2));
const b = $(Math.imul(0x7fffffff, 2));
const c = $(Math.imul(-1, -1));
const d = $(Math.imul(0, 123456));
$(a);
$(b);
$(c);
$(d);
// Should be -2, -2, 1, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-2);
const b /*:unknown*/ = $(-2);
const c /*:unknown*/ = $(1);
const d /*:unknown*/ = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(-2);
const b = $(-2);
const c = $(1);
const d = $(0);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -2 );
const b = $( -2 );
const c = $( 1 );
const d = $( 0 );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_imul;
let tmpCalleeParam = -2;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_imul;
let tmpCalleeParam$1 = -2;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_imul;
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_imul;
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
 - 1: -2
 - 2: -2
 - 3: 1
 - 4: 0
 - 5: -2
 - 6: -2
 - 7: 1
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
