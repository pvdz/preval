# Preval test case

# math_log_direct_2args.md

> Builtins cases > Ai math > Math log direct 2args
>
> Test: Math.log() with 2 arguments

## Input

`````js filename=intro
// Input: Math.log(10, 2)
// Expected: 2.302585092994046 (only the first argument is used)
$(Math.log(10, 2))
// => 2.302585092994046
`````


## Settled


`````js filename=intro
$(2.302585092994046);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2.302585092994046);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2.302585092994046 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log;
const tmpArgOverflow = 10;
let tmpCalleeParam = $Math_log(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.302585092994046
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
