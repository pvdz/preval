# Preval test case

# number_toPrecision_direct_3args.md

> Builtins cases > Ai number > Number toPrecision direct 3args
>
> Test Number.prototype.toPrecision called directly with 3 arguments (extra arguments ignored)

## Input

`````js filename=intro
const num = $(42.123);
const result = num.toPrecision(4, 1, 2);
$(result); // Expected: "42.12"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toPrecision;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toPrecision`, 4, 1, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toPrecision(4, 1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toPrecision;
const c = $dotCall( b, a, "toPrecision", 4, 1, 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpMCF = num.toPrecision;
const result = $dotCall(tmpMCF, num, `toPrecision`, 4, 1, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42.123
 - 2: '42.12'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
