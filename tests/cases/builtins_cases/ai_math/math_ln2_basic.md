# Preval test case

# math_ln2_basic.md

> Builtins cases > Ai math > Math ln2 basic
>
> Test basic Math.LN2 access and usage

## Input

`````js filename=intro
$(Math.LN2);
// Expected: 0.6931471805599453

// Test using Math.LN2 in calculation
$(Math.LN2 * 2);
// Expected: 1.3862943611198906

// Test that Math.LN2 is read-only
Math.LN2 = 0.8;
$(Math.LN2);
// Expected: 0.6931471805599453
`````


## Settled


`````js filename=intro
$($Math_LN2);
const tmpCalleeParam$1 /*:number*/ = $Math_LN2 * 2;
$(tmpCalleeParam$1);
Math.LN2 = 0.8;
$($Math_LN2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_LN2);
$($Math_LN2 * 2);
Math.LN2 = 0.8;
$($Math_LN2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_LN2 );
const a = $Math_LN2 * 2;
$( a );
Math.LN2 = 0.8;
$( $Math_LN2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_LN2;
$($Math_LN2);
const tmpBinLhs = $Math_LN2;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.LN2 = 0.8;
let tmpCalleeParam$3 = $Math_LN2;
$($Math_LN2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.6931471805599453
 - 2: 1.3862943611198906
 - eval returned: ("<crash[ Cannot assign to read only property 'LN2' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
