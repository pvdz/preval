# Preval test case

# math_log10_log2.md

> Math > Ai > Math log10 log2
>
> Math.log10 and Math.log2 with various values

## Input

`````js filename=intro
const a = $(Math.log10(1000));
const b = $(Math.log10(0.01));
const c = $(Math.log2(8));
const d = $(Math.log2(0.5));
$(a);
$(b);
$(c);
$(d);
// Should be 3, -2, 3, -1
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(3);
const b /*:unknown*/ = $(-2);
const c /*:unknown*/ = $(3);
const d /*:unknown*/ = $(-1);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(3);
const b = $(-2);
const c = $(3);
const d = $(-1);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( -2 );
const c = $( 3 );
const d = $( -1 );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log10;
let tmpCalleeParam = 3;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_log10;
let tmpCalleeParam$1 = -2;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_log2;
let tmpCalleeParam$3 = 3;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_log2;
let tmpCalleeParam$5 = -1;
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
 - 1: 3
 - 2: -2
 - 3: 3
 - 4: -1
 - 5: 3
 - 6: -2
 - 7: 3
 - 8: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
