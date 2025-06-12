# Preval test case

# math_log_direct_4args.md

> Builtins cases > Ai math > Math log direct 4args
>
> Test: Math.log() with 4 arguments

## Input

`````js filename=intro
// Input: Math.log(100, 2, 3, 4)
// Expected: 4.605170185988092 (only the first argument is used)
$(Math.log(100, 2, 3, 4))
// => 4.605170185988092
`````


## Settled


`````js filename=intro
$(4.605170185988092);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4.605170185988092);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4.605170185988092 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_log;
const tmpArgOverflow = 100;
let tmpCalleeParam = $Math_log(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4.605170185988092
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
