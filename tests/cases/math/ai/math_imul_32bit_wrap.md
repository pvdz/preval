# Preval test case

# math_imul_32bit_wrap.md

> Math > Ai > Math imul 32bit wrap
>
> Math.imul 32-bit wraparound

## Input

`````js filename=intro
const a = $(Math.imul(0xffffffff, 5));
$(a);
// Should be -5
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-5);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(-5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( -5 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_imul;
let tmpCalleeParam = -5;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -5
 - 2: -5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
