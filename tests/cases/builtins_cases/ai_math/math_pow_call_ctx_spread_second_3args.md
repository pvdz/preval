# Preval test case

# math_pow_call_ctx_spread_second_3args.md

> Builtins cases > Ai math > Math pow call ctx spread second 3args
>
> Test Math.pow with call context and spread operator on second argument with 3 total arguments

## Input

`````js filename=intro
const base = 2;
const exponents = [3, 4];
const result = Math.pow.call(null, base, ...exponents);
$(result === 8);
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
const base = 2;
const exponents = [3, 4];
const tmpMCOO = $Math_pow;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, null, base, ...exponents);
let tmpCalleeParam = result === 8;
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false
- (todo) free with zero args, we can eliminate this?
- (todo) type trackeed tricks can possibly support static $Math_pow


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
