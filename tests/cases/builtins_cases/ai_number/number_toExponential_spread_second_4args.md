# Preval test case

# number_toExponential_spread_second_4args.md

> Builtins cases > Ai number > Number toExponential spread second 4args
>
> Test Number.prototype.toExponential called with spread arguments as second argument (4 elements, only first used, rest ignored)

## Input

`````js filename=intro
const num = $(7.89);
const arg1 = 4;
const extra = [1, 2, 3, 4];
const result = num.toExponential(arg1, ...extra);
$(result); // Expected: "7.8900e+0"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(7.89);
const tmpMCF /*:unknown*/ = num.toExponential;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toExponential`, 4, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(7.89);
$(num.toExponential(4, 1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7.89 );
const b = a.toExponential;
const c = $dotCall( b, a, "toExponential", 4, 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(7.89);
const arg1 = 4;
const extra = [1, 2, 3, 4];
const tmpMCF = num.toExponential;
const result = $dotCall(tmpMCF, num, `toExponential`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.89
 - 2: '7.8900e+0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
