# Preval test case

# parsefloat_leading_trailing.md

> Math > Ai > Parsefloat leading trailing
>
> parseFloat with leading/trailing whitespace and junk

## Input

`````js filename=intro
const a = $(parseFloat("   123.45   "));
const b = $(parseFloat("123.45abc"));
const c = $(parseFloat("abc123.45"));
$(a);
$(b);
$(c);
// Should be 123.45, 123.45, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(123.45);
const b /*:unknown*/ = $(123.45);
const c /*:unknown*/ = $($Number_NaN);
$(a);
$(b);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(123.45);
const b = $(123.45);
const c = $($Number_NaN);
$(a);
$(b);
$(c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123.45 );
const b = $( 123.45 );
const c = $( $Number_NaN );
$( a );
$( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 123.45;
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = 123.45;
const b = $(tmpCalleeParam$1);
let tmpCalleeParam$3 = NaN;
const c = $($Number_NaN);
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
 - 1: 123.45
 - 2: 123.45
 - 3: NaN
 - 4: 123.45
 - 5: 123.45
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
