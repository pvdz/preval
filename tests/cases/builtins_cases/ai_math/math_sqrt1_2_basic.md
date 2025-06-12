# Preval test case

# math_sqrt1_2_basic.md

> Builtins cases > Ai math > Math sqrt1 2 basic
>
> Test basic Math.SQRT1_2 access and usage

## Input

`````js filename=intro
$(Math.SQRT1_2);
// Expected: 0.7071067811865476

// Test using Math.SQRT1_2 in calculation
$(Math.SQRT1_2 * 2);
// Expected: 1.4142135623730951

// Test that Math.SQRT1_2 is read-only
Math.SQRT1_2 = 0.5;
$(Math.SQRT1_2);
// Expected: 0.7071067811865476
`````


## Settled


`````js filename=intro
$($Math_SQRT1_2);
const tmpCalleeParam$1 /*:number*/ = $Math_SQRT1_2 * 2;
$(tmpCalleeParam$1);
Math.SQRT1_2 = 0.5;
$($Math_SQRT1_2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_SQRT1_2);
$($Math_SQRT1_2 * 2);
Math.SQRT1_2 = 0.5;
$($Math_SQRT1_2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_SQRT1_2 );
const a = $Math_SQRT1_2 * 2;
$( a );
Math.SQRT1_2 = 0.5;
$( $Math_SQRT1_2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_SQRT1_2;
$($Math_SQRT1_2);
const tmpBinLhs = $Math_SQRT1_2;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.SQRT1_2 = 0.5;
let tmpCalleeParam$3 = $Math_SQRT1_2;
$($Math_SQRT1_2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7071067811865476
 - 2: 1.4142135623730951
 - eval returned: ("<crash[ Cannot assign to read only property 'SQRT1_2' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
