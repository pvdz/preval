# Preval test case

# number_valueOf_spread_first.md

> Builtins cases > Ai number > Number valueOf spread first
>
> Test Number.prototype.valueOf called with spread arguments (array with 1 element, should be ignored)

## Input

`````js filename=intro
const num = $(789);
const args = [42];
const result = num.valueOf(...args);
$(result); // Expected: 789
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(789);
const tmpMCF /*:unknown*/ = num.valueOf;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `valueOf`, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(789);
$(num.valueOf(42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 789 );
const b = a.valueOf;
const c = $dotCall( b, a, "valueOf", 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(789);
const args = [42];
const tmpMCF = num.valueOf;
const result = $dotCall(tmpMCF, num, `valueOf`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 789
 - 2: 789
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
