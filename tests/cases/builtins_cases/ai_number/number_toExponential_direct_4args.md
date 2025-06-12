# Preval test case

# number_toExponential_direct_4args.md

> Builtins cases > Ai number > Number toExponential direct 4args
>
> Test Number.prototype.toExponential called directly with 4 arguments (extra arguments ignored)

## Input

`````js filename=intro
const num = $(42.123);
const result = num.toExponential(5, 1, 2, 3);
$(result); // Expected: "4.21230e+1"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toExponential;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toExponential`, 5, 1, 2, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toExponential(5, 1, 2, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toExponential;
const c = $dotCall( b, a, "toExponential", 5, 1, 2, 3 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpMCF = num.toExponential;
const result = $dotCall(tmpMCF, num, `toExponential`, 5, 1, 2, 3);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42.123
 - 2: '4.21230e+1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
