# Preval test case

# math_log10e_basic.md

> Builtins cases > Ai math > Math log10e basic
>
> Test basic Math.LOG10E access and usage

## Input

`````js filename=intro
$(Math.LOG10E);
// Expected: 0.4342944819032518

// Test using Math.LOG10E in calculation
$(Math.LOG10E * 2);
// Expected: 0.8685889638065036

// Test that Math.LOG10E is read-only
Math.LOG10E = 0.5;
$(Math.LOG10E);
// Expected: 0.4342944819032518
`````


## Settled


`````js filename=intro
$($Math_LOG10E);
const tmpCalleeParam$1 /*:number*/ = $Math_LOG10E * 2;
$(tmpCalleeParam$1);
Math.LOG10E = 0.5;
$($Math_LOG10E);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_LOG10E);
$($Math_LOG10E * 2);
Math.LOG10E = 0.5;
$($Math_LOG10E);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_LOG10E );
const a = $Math_LOG10E * 2;
$( a );
Math.LOG10E = 0.5;
$( $Math_LOG10E );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_LOG10E;
$($Math_LOG10E);
const tmpBinLhs = $Math_LOG10E;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.LOG10E = 0.5;
let tmpCalleeParam$3 = $Math_LOG10E;
$($Math_LOG10E);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.4342944819032518
 - 2: 0.8685889638065036
 - eval returned: ("<crash[ Cannot assign to read only property 'LOG10E' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
