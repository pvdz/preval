# Preval test case

# math_ln10_basic.md

> Builtins cases > Ai math > Math ln10 basic
>
> Test basic Math.LN10 access and usage

## Input

`````js filename=intro
$(Math.LN10);
// Expected: 2.302585092994046

// Test using Math.LN10 in calculation
$(Math.LN10 * 2);
// Expected: 4.605170185988092

// Test that Math.LN10 is read-only
Math.LN10 = 2.5;
$(Math.LN10);
// Expected: 2.302585092994046
`````


## Settled


`````js filename=intro
$($Math_LN10);
const tmpCalleeParam$1 /*:number*/ = $Math_LN10 * 2;
$(tmpCalleeParam$1);
Math.LN10 = 2.5;
$($Math_LN10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_LN10);
$($Math_LN10 * 2);
Math.LN10 = 2.5;
$($Math_LN10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_LN10 );
const a = $Math_LN10 * 2;
$( a );
Math.LN10 = 2.5;
$( $Math_LN10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_LN10;
$($Math_LN10);
const tmpBinLhs = $Math_LN10;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.LN10 = 2.5;
let tmpCalleeParam$3 = $Math_LN10;
$($Math_LN10);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.302585092994046
 - 2: 4.605170185988092
 - eval returned: ("<crash[ Cannot assign to read only property 'LN10' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
