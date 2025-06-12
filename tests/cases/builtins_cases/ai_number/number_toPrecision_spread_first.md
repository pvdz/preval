# Preval test case

# number_toPrecision_spread_first.md

> Builtins cases > Ai number > Number toPrecision spread first
>
> Test Number.prototype.toPrecision called with spread arguments (array with 1 element)

## Input

`````js filename=intro
const num = $(7.89);
const args = [2];
const result = num.toPrecision(...args);
$(result); // Expected: "7.9"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(7.89);
const tmpMCF /*:unknown*/ = num.toPrecision;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toPrecision`, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(7.89);
$(num.toPrecision(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7.89 );
const b = a.toPrecision;
const c = $dotCall( b, a, "toPrecision", 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(7.89);
const args = [2];
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
 - 2: '7.9'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
