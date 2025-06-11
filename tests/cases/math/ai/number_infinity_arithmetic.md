# Preval test case

# number_infinity_arithmetic.md

> Math > Ai > Number infinity arithmetic
>
> Infinity and -Infinity in arithmetic

## Input

`````js filename=intro
const a = $(Infinity);
const b = $(-Infinity);
const c = a + b;
const d = a - b;
const e = a * 0;
const f = b * 0;
$(c);
$(d);
$(e);
$(f);
// Should be NaN, Infinity, NaN, NaN
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $($Number_POSITIVE_INFINITY);
const b /*:unknown*/ = $($Number_NEGATIVE_INFINITY);
const c /*:primitive*/ = a + b;
const d /*:number*/ = a - b;
const e /*:number*/ = a * 0;
const f /*:number*/ = b * 0;
$(c);
$(d);
$(e);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($Number_POSITIVE_INFINITY);
const b = $($Number_NEGATIVE_INFINITY);
const c = a + b;
const d = a - b;
const e = a * 0;
const f = b * 0;
$(c);
$(d);
$(e);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $Number_POSITIVE_INFINITY );
const b = $( $Number_NEGATIVE_INFINITY );
const c = a + b;
const d = a - b;
const e = a * 0;
const f = b * 0;
$( c );
$( d );
$( e );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $($Number_POSITIVE_INFINITY);
const b = $(-Infinity);
const c = a + b;
const d = a - b;
const e = a * 0;
const f = b * 0;
$(c);
$(d);
$(e);
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: Infinity
 - 2: -Infinity
 - 3: NaN
 - 4: Infinity
 - 5: NaN
 - 6: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
