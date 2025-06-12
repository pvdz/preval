# Preval test case

# math_tanh_call_ctx_3args.md

> Builtins cases > Ai math > Math tanh call ctx 3args
>
> Test Math.tanh with call context and 3 arguments

## Input

`````js filename=intro
$(Math.tanh.call(null, 1, 2, 3));
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
const tmpMCOO = $Math_tanh;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, null, 1, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_tanh


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
