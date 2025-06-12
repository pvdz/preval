# Preval test case

# number_toExponential_direct_2args.md

> Builtins cases > Ai number > Number toExponential direct 2args
>
> Test Number.prototype.toExponential called directly with 2 arguments (extra argument ignored)

## Input

`````js filename=intro
const num = $(42.123);
const result = num.toExponential(3, 99);
$(result); // Expected: "4.212e+1"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toExponential;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toExponential`, 3, 99);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toExponential(3, 99));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toExponential;
const c = $dotCall( b, a, "toExponential", 3, 99 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpMCF = num.toExponential;
const result = $dotCall(tmpMCF, num, `toExponential`, 3, 99);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42.123
 - 2: '4.212e+1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
