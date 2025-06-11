# Preval test case

# number_modulo_nan.md

> Math > Ai > Number modulo nan
>
> Modulo with NaN and Infinity

## Input

`````js filename=intro
const a = $(NaN % 2);
const b = $(2 % NaN);
const c = $(Infinity % 2);
const d = $(2 % Infinity);
$(a);
$(b);
$(c);
$(d);
// Should be NaN, NaN, NaN, 2
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_NaN);
const b /*:unknown*/ = $($Number_NaN);
const c /*:unknown*/ = $($Number_NaN);
const d /*:unknown*/ = $(2);
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
const d = $(2);
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
const d = $( 2 );
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
let tmpCalleeParam$5 = 2;
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
 - 1: NaN
 - 2: NaN
 - 3: NaN
 - 4: 2
 - 5: NaN
 - 6: NaN
 - 7: NaN
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
