# Preval test case

# number_shift_edge_cases.md

> Math > Ai > Number shift edge cases
>
> Shift operations with large and negative numbers

## Input

`````js filename=intro
const a = $(1 << 31);
const b = $(-1 >>> 1);
const c = $(1 << 32);
const d = $(1 >> 33);
$(a);
$(b);
$(c);
$(d);
// Should be -2147483648, 2147483647, 1, 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(-2147483648);
const b /*:unknown*/ = $(2147483647);
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
const a = $(-2147483648);
const b = $(2147483647);
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
const a = $( -2147483648 );
const b = $( 2147483647 );
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
let tmpCalleeParam = -2147483648;
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = 2147483647;
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
 - 1: -2147483648
 - 2: 2147483647
 - 3: 1
 - 4: 0
 - 5: -2147483648
 - 6: 2147483647
 - 7: 1
 - 8: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
