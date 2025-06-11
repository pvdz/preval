# Preval test case

# math_fma_emulation.md

> Math > Ai > Math fma emulation
>
> Fused multiply-add emulation (a * b + c) for precision

## Input

`````js filename=intro
const a = $(1e16);
const b = $(1.000000000000001);
const c = $(-1e16);
const d = a * b + c;
const e = (a * b + c) - (a * b) - c;
$(d);
$(e);
// d should be 1.4551915228366852, e should be 0
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10000000000000000);
const b /*:unknown*/ = $(1.000000000000001);
const c /*:unknown*/ = $(-10000000000000000);
const tmpBinLhs /*:number*/ = a * b;
const d /*:primitive*/ = tmpBinLhs + c;
const tmpBinLhs$3 /*:number*/ = a * b;
const tmpBinBothLhs /*:primitive*/ = tmpBinLhs$3 + c;
const tmpBinBothRhs /*:number*/ = a * b;
const tmpBinLhs$1 /*:number*/ = tmpBinBothLhs - tmpBinBothRhs;
const e /*:number*/ = tmpBinLhs$1 - c;
$(d);
$(e);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10000000000000000);
const b = $(1.000000000000001);
const c = $(-10000000000000000);
const d = a * b + c;
const tmpBinBothLhs = a * b + c;
const e = tmpBinBothLhs - a * b - c;
$(d);
$(e);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10000000000000000 );
const b = $( 1.000000000000001 );
const c = $( -10000000000000000 );
const d = a * b;
const e = d + c;
const f = a * b;
const g = f + c;
const h = a * b;
const i = g - h;
const j = i - c;
$( e );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(10000000000000000);
const b = $(1.000000000000001);
const c = $(-10000000000000000);
const tmpBinLhs = a * b;
const d = tmpBinLhs + c;
const tmpBinLhs$3 = a * b;
const tmpBinBothLhs = tmpBinLhs$3 + c;
const tmpBinBothRhs = a * b;
const tmpBinLhs$1 = tmpBinBothLhs - tmpBinBothRhs;
const e = tmpBinLhs$1 - c;
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
 - 2: 1.000000000000001
 - 3: -10000000000000000
 - 4: 12
 - 5: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
