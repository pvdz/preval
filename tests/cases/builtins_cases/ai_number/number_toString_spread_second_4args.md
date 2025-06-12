# Preval test case

# number_toString_spread_second_4args.md

> Builtins cases > Ai number > Number toString spread second 4args
>
> Test Number.prototype.toString called with spread arguments as second argument (4 elements, only first used, rest ignored)

## Input

`````js filename=intro
const num = $(42);
const arg1 = 36;
const extra = [1, 2, 3, 4];
const result = num.toString(arg1, ...extra);
$(result); // Expected: "16"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 36, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42);
$(num.toString(36, 1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 36, 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42);
const arg1 = 36;
const extra = [1, 2, 3, 4];
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, arg1, ...extra);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: '16'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
