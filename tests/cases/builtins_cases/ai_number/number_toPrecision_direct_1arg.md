# Preval test case

# number_toPrecision_direct_1arg.md

> Builtins cases > Ai number > Number toPrecision direct 1arg
>
> Test Number.prototype.toPrecision called directly with 1 argument (precision)

## Input

`````js filename=intro
const num = $(42.123);
const result = num.toPrecision(2);
$(result); // Expected: "42"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toPrecision;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toPrecision`, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toPrecision(2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toPrecision;
const c = $dotCall( b, a, "toPrecision", 2 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpMCF = num.toPrecision;
const result = $dotCall(tmpMCF, num, `toPrecision`, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42.123
 - 2: '42'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
