# Preval test case

# math_modulo_negative_zero.md

> Math > Ai > Math modulo negative zero
>
> Modulo with negative zero and positive zero

## Input

`````js filename=intro
const a = $(0 % -0);
const b = $(-0 % 0);
const c = $(1 % -0);
const d = $(-1 % 0);
$(a);
$(b);
$(c);
$(d);
// Should be NaN, NaN, NaN, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $($Number_NaN);
const d /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_NaN);
const b = $($Number_NaN);
const c = $($Number_NaN);
const d = $($Number_NaN);
$(a);
$(b);
$(c);
$(d);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_NaN );
const b = $( $Number_NaN );
const c = $( $Number_NaN );
const d = $( $Number_NaN );
$( a );
$( b );
$( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = NaN;
const a = $($Number_NaN);
let tmpCalleeParam$1 = NaN;
const b = $($Number_NaN);
let tmpCalleeParam$3 = NaN;
const c = $($Number_NaN);
let tmpCalleeParam$5 = NaN;
const d = $($Number_NaN);
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
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - 4: NaN
 - 5: NaN
 - 6: NaN
 - 7: NaN
 - 8: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
