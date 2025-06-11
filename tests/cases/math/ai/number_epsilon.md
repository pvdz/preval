# Preval test case

# number_epsilon.md

> Math > Ai > Number epsilon
>
> Number.EPSILON and floating-point comparison

## Input

`````js filename=intro
const a = $(0.1 + 0.2 - 0.3);
const b = $(Number.EPSILON);
$(Math.abs(a) < b);
// Should be false
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(5.551115123125783e-17);
const b /*:unknown*/ = $($Number_EPSILON);
const tmpBinLhs$1 /*:number*/ = $Math_abs(a);
const tmpCalleeParam$3 /*:boolean*/ = tmpBinLhs$1 < b;
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(5.551115123125783e-17);
const b = $($Number_EPSILON);
$($Math_abs(a) < b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5.551115123125783e-17 );
const b = $( $Number_EPSILON );
const c = $Math_abs( a );
const d = c < b;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = 0.30000000000000004;
let tmpCalleeParam = tmpBinLhs - 0.3;
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = $Number_EPSILON;
const b = $($Number_EPSILON);
const tmpMCF = $Math_abs;
const tmpBinLhs$1 = $Math_abs(a);
let tmpCalleeParam$3 = tmpBinLhs$1 < b;
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5.551115123125783e-17
 - 2: 2.220446049250313e-16
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
