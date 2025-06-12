# Preval test case

# number_toString_spread_first_4args.md

> Builtins cases > Ai number > Number toString spread first 4args
>
> Test Number.prototype.toString called with spread arguments (array with 4 elements, only first used)

## Input

`````js filename=intro
const num = $(42);
const args = [2, 1, 2, 3];
const result = num.toString(...args);
$(result); // Expected: "101010"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 2, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42);
$(num.toString(2, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 2, 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42);
const args = [2, 1, 2, 3];
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: '101010'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
