# Preval test case

# number_toExponential_spread_first.md

> Builtins cases > Ai number > Number toExponential spread first
>
> Test Number.prototype.toExponential called with spread arguments (array with 1 element)

## Input

`````js filename=intro
const num = $(7.89);
const args = [2];
const result = num.toExponential(...args);
$(result); // Expected: "7.89e+0"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(7.89);
const tmpMCF /*:unknown*/ = num.toExponential;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toExponential`, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(7.89);
$(num.toExponential(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7.89 );
const b = a.toExponential;
const c = $dotCall( b, a, "toExponential", 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(7.89);
const args = [2];
const tmpMCF = num.toExponential;
const result = $dotCall(tmpMCF, num, `toExponential`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.89
 - 2: '7.89e+0'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
