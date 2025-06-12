# Preval test case

# math_sqrt2_basic.md

> Builtins cases > Ai math > Math sqrt2 basic
>
> Test basic Math.SQRT2 access and usage

## Input

`````js filename=intro
$(Math.SQRT2);
// Expected: 1.4142135623730951

// Test using Math.SQRT2 in calculation
$(Math.SQRT2 * 2);
// Expected: 2.8284271247461903

// Test that Math.SQRT2 is read-only
Math.SQRT2 = 1.5;
$(Math.SQRT2);
// Expected: 1.4142135623730951
`````


## Settled


`````js filename=intro
$($Math_SQRT2);
const tmpCalleeParam$1 /*:number*/ = $Math_SQRT2 * 2;
$(tmpCalleeParam$1);
Math.SQRT2 = 1.5;
$($Math_SQRT2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_SQRT2);
$($Math_SQRT2 * 2);
Math.SQRT2 = 1.5;
$($Math_SQRT2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_SQRT2 );
const a = $Math_SQRT2 * 2;
$( a );
Math.SQRT2 = 1.5;
$( $Math_SQRT2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_SQRT2;
$($Math_SQRT2);
const tmpBinLhs = $Math_SQRT2;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.SQRT2 = 1.5;
let tmpCalleeParam$3 = $Math_SQRT2;
$($Math_SQRT2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4142135623730951
 - 2: 2.8284271247461903
 - eval returned: ("<crash[ Cannot assign to read only property 'SQRT2' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
