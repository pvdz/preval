# Preval test case

# math_e_basic.md

> Builtins cases > Ai math > Math e basic
>
> Test basic Math.E access and usage

## Input

`````js filename=intro
$(Math.E);
// Expected: 2.718281828459045

// Test using Math.E in calculation
$(Math.E * 2);
// Expected: 5.43656365691809

// Test that Math.E is read-only
Math.E = 3;
$(Math.E);
// Expected: 2.718281828459045
`````


## Settled


`````js filename=intro
$($Math_E);
const tmpCalleeParam$1 /*:number*/ = $Math_E * 2;
$(tmpCalleeParam$1);
Math.E = 3;
$($Math_E);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_E);
$($Math_E * 2);
Math.E = 3;
$($Math_E);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_E );
const a = $Math_E * 2;
$( a );
Math.E = 3;
$( $Math_E );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_E;
$($Math_E);
const tmpBinLhs = $Math_E;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.E = 3;
let tmpCalleeParam$3 = $Math_E;
$($Math_E);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718281828459045
 - 2: 5.43656365691809
 - eval returned: ("<crash[ Cannot assign to read only property 'E' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
