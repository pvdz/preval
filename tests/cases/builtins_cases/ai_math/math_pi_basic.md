# Preval test case

# math_pi_basic.md

> Builtins cases > Ai math > Math pi basic
>
> Test basic Math.PI access and usage

## Input

`````js filename=intro
$(Math.PI);
// Expected: 3.141592653589793

// Test using Math.PI in calculation
$(Math.PI * 2);
// Expected: 6.283185307179586

// Test that Math.PI is read-only
Math.PI = 4;
$(Math.PI);
// Expected: 3.141592653589793
`````


## Settled


`````js filename=intro
$($Math_PI);
const tmpCalleeParam$1 /*:number*/ = $Math_PI * 2;
$(tmpCalleeParam$1);
Math.PI = 4;
$($Math_PI);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_PI);
$($Math_PI * 2);
Math.PI = 4;
$($Math_PI);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_PI );
const a = $Math_PI * 2;
$( a );
Math.PI = 4;
$( $Math_PI );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_PI;
$($Math_PI);
const tmpBinLhs = $Math_PI;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.PI = 4;
let tmpCalleeParam$3 = $Math_PI;
$($Math_PI);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3.141592653589793
 - 2: 6.283185307179586
 - eval returned: ("<crash[ Cannot assign to read only property 'PI' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
