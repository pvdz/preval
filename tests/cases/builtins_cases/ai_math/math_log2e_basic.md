# Preval test case

# math_log2e_basic.md

> Builtins cases > Ai math > Math log2e basic
>
> Test basic Math.LOG2E access and usage

## Input

`````js filename=intro
$(Math.LOG2E);
// Expected: 1.4426950408889634

// Test using Math.LOG2E in calculation
$(Math.LOG2E * 2);
// Expected: 2.8853900817779268

// Test that Math.LOG2E is read-only
Math.LOG2E = 1.5;
$(Math.LOG2E);
// Expected: 1.4426950408889634
`````


## Settled


`````js filename=intro
$($Math_LOG2E);
const tmpCalleeParam$1 /*:number*/ = $Math_LOG2E * 2;
$(tmpCalleeParam$1);
Math.LOG2E = 1.5;
$($Math_LOG2E);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Math_LOG2E);
$($Math_LOG2E * 2);
Math.LOG2E = 1.5;
$($Math_LOG2E);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Math_LOG2E );
const a = $Math_LOG2E * 2;
$( a );
Math.LOG2E = 1.5;
$( $Math_LOG2E );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $Math_LOG2E;
$($Math_LOG2E);
const tmpBinLhs = $Math_LOG2E;
let tmpCalleeParam$1 = tmpBinLhs * 2;
$(tmpCalleeParam$1);
Math.LOG2E = 1.5;
let tmpCalleeParam$3 = $Math_LOG2E;
$($Math_LOG2E);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.4426950408889634
 - 2: 2.8853900817779268
 - eval returned: ("<crash[ Cannot assign to read only property 'LOG2E' of object '#<Object>' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
