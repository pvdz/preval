# Preval test case

# math_fround_direct_1arg.md

> Builtins cases > Ai math > Math fround direct 1arg
>
> Test Math.fround called directly with one argument (1.337)

## Input

`````js filename=intro
$(Math.fround(1.337));
// Expected: 1.3370000123977661
`````


## Settled


`````js filename=intro
$(1.3370000123977661);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.3370000123977661);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.3370000123977661 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_fround;
let tmpCalleeParam = 1.3370000123977661;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.3370000123977661
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
