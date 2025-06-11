# Preval test case

# number_math_pow_zero.md

> Math > Ai > Number math pow zero
>
> Math.pow with zero and negative zero

## Input

`````js filename=intro
const a = $(Math.pow(0, 0));
const b = $(Math.pow(-0, 0));
const c = $(Math.pow(0, 2));
const d = $(Math.pow(-0, 3));
$(a);
$(b);
$(c);
$(d);
// Should be 1, 1, 0, -0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(1);
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
const a = $(1);
const b = $(1);
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
const a = $( 1 );
const b = $( 1 );
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
const tmpMCF = $Math_pow;
let tmpCalleeParam = 1;
const a = $(tmpCalleeParam);
const tmpMCF$1 = $Math_pow;
let tmpCalleeParam$1 = 1;
const b = $(tmpCalleeParam$1);
const tmpMCF$3 = $Math_pow;
let tmpCalleeParam$3 = 0;
const c = $(tmpCalleeParam$3);
const tmpMCF$5 = $Math_pow;
let tmpCalleeParam$5 = -0;
const d = $(tmpCalleeParam$5);
$(a);
$(b);
$(c);
$(d);
`````


## Todos triggered


- (todo) precision loss detected 2


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: 0
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
