# Preval test case

# math_pow_direct_0args.md

> Builtins cases > Ai math > Math pow direct 0args
>
> Test Math.pow with 0 arguments

## Input

`````js filename=intro
const result = Math.pow();
$(Number.isNaN(result));
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_pow;
const result = NaN;
const tmpMCF$1 = $Number_isNaN;
let tmpCalleeParam = $Number_isNaN(result);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_isNaN


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
