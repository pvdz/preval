# Preval test case

# number_valueOf_direct_2args.md

> Builtins cases > Ai number > Number valueOf direct 2args
>
> Test Number.prototype.valueOf called directly with 2 arguments (should be ignored)

## Input

`````js filename=intro
const num = $(123);
const result = num.valueOf(1, 2);
$(result); // Expected: 123
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(123);
const tmpMCF /*:unknown*/ = num.valueOf;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `valueOf`, 1, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(123);
$(num.valueOf(1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123 );
const b = a.valueOf;
const c = $dotCall( b, a, "valueOf", 1, 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(123);
const tmpMCF = num.valueOf;
const result = $dotCall(tmpMCF, num, `valueOf`, 1, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 123
 - 2: 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
