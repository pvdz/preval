# Preval test case

# math_imul_spread_first_4args.md

> Builtins cases > Ai math > Math imul spread first 4args
>
> Test: Math.imul(...[2, 4, 5, 6]) (spread as first argument, 4 values)

## Input

`````js filename=intro
// Input: Math.imul(...[2, 4, 5, 6])
// Expected: 8 (only the first two arguments are used)
$(Math.imul(...[2, 4, 5, 6]))
// => 8
`````


## Settled


`````js filename=intro
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_imul;
const tmpMCSP = [2, 4, 5, 6];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `imul`, ...tmpMCSP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_imul


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
