# Preval test case

# math_tanh_direct_3args.md

> Builtins cases > Ai math > Math tanh direct 3args
>
> Test Math.tanh with 3 arguments

## Input

`````js filename=intro
$(Math.tanh(1, 2, 3));
// Expected: 0.7615941559557649
`````


## Settled


`````js filename=intro
$(0.7615941559557649);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.7615941559557649);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.7615941559557649 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_tanh;
const tmpArgOverflow = 1;
let tmpCalleeParam = $Math_tanh(tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.7615941559557649
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
