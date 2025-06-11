# Preval test case

# number_bitwise_nan.md

> Math > Ai > Number bitwise nan
>
> Bitwise operations with NaN and Infinity

## Input

`````js filename=intro
const a = $(NaN | 0);
const b = $(Infinity & 0);
const c = $(NaN ^ 1);
const d = $(Infinity >> 1);
$(a);
$(b);
$(c);
$(d);
// Should be 0, 0, 1, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const b /*:unknown*/ = $(0);
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
const a = $(0);
const b = $(0);
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
const a = $( 0 );
const b = $( 0 );
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
let tmpCalleeParam = 0;
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = 0;
const b = $(tmpCalleeParam$1);
let tmpCalleeParam$3 = 1;
const c = $(tmpCalleeParam$3);
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
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 0
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
