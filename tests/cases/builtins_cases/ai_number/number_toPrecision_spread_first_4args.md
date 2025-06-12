# Preval test case

# number_toPrecision_spread_first_4args.md

> Builtins cases > Ai number > Number toPrecision spread first 4args
>
> Test Number.prototype.toPrecision called with spread arguments (array with 4 elements, only first used)

## Input

`````js filename=intro
const num = $(7.89);
const args = [3, 1, 2, 3];
const result = num.toPrecision(...args);
$(result); // Expected: "7.89"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(7.89);
const tmpMCF /*:unknown*/ = num.toPrecision;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toPrecision`, 3, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(7.89);
$(num.toPrecision(3, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7.89 );
const b = a.toPrecision;
const c = $dotCall( b, a, "toPrecision", 3, 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(7.89);
const args = [3, 1, 2, 3];
const tmpMCF = num.toPrecision;
const result = $dotCall(tmpMCF, num, `toPrecision`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7.89
 - 2: '7.89'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
