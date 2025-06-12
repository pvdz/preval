# Preval test case

# number_toPrecision_spread_second.md

> Builtins cases > Ai number > Number toPrecision spread second
>
> Test Number.prototype.toPrecision called with spread arguments as second argument (should be ignored)

## Input

`````js filename=intro
const num = $(7.89);
const arg1 = 2;
const extra = [1, 2];
const result = num.toPrecision(arg1, ...extra);
$(result); // Expected: "7.9"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(7.89);
const tmpMCF /*:unknown*/ = num.toPrecision;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toPrecision`, 2, 1, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(7.89);
$(num.toPrecision(2, 1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7.89 );
const b = a.toPrecision;
const c = $dotCall( b, a, "toPrecision", 2, 1, 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(7.89);
const arg1 = 2;
const extra = [1, 2];
const tmpMCF = num.toPrecision;
const result = $dotCall(tmpMCF, num, `toPrecision`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.89
 - 2: '7.9'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
