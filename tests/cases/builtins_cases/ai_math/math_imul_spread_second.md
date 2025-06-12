# Preval test case

# math_imul_spread_second.md

> Builtins cases > Ai math > Math imul spread second
>
> Test: Math.imul(2, ...[4]) (spread as second argument)

## Input

`````js filename=intro
// Input: Math.imul(2, ...[4])
// Expected: 8 (2 * 4)
$(Math.imul(2, ...[4]))
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
const tmpMCSP = [4];
let tmpCalleeParam = $dotCall(tmpMCF, Math, `imul`, 2, ...tmpMCSP);
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
