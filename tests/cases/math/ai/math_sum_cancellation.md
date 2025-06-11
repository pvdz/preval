# Preval test case

# math_sum_cancellation.md

> Math > Ai > Math sum cancellation
>
> Catastrophic cancellation in summing alternating large and small numbers

## Input

`````js filename=intro
const a = $(1e16);
const b = $(-1e16);
const c = $(1);
const d = a + b + c;
const e = a + c + b;
$(d);
$(e);
// d should be 1, e should be 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10000000000000000);
const b /*:unknown*/ = $(-10000000000000000);
const c /*:unknown*/ = $(1);
const tmpBinLhs /*:primitive*/ = a + b;
const d /*:primitive*/ = tmpBinLhs + c;
const tmpBinLhs$1 /*:primitive*/ = a + c;
const e /*:primitive*/ = tmpBinLhs$1 + b;
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10000000000000000);
const b = $(-10000000000000000);
const c = $(1);
const d = a + b + c;
const e = a + c + b;
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10000000000000000 );
const b = $( -10000000000000000 );
const c = $( 1 );
const d = a + b;
const e = d + c;
const f = a + c;
const g = f + b;
$( e );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(10000000000000000);
const b = $(-10000000000000000);
const c = $(1);
const tmpBinLhs = a + b;
const d = tmpBinLhs + c;
const tmpBinLhs$1 = a + c;
const e = tmpBinLhs$1 + b;
$(d);
$(e);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10000000000000000
 - 2: -10000000000000000
 - 3: 1
 - 4: 1
 - 5: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
