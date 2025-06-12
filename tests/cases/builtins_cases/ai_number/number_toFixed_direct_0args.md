# Preval test case

# number_toFixed_direct_0args.md

> Builtins cases > Ai number > Number toFixed direct 0args
>
> Test Number.prototype.toFixed called directly with 0 arguments; should default to 0 decimal places

## Input

`````js filename=intro
const num = $(42.123);
const result = num.toFixed();
$(result); // Expected: "42"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toFixed;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toFixed`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toFixed());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toFixed;
const c = $dotCall( b, a, "toFixed" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpMCF = num.toFixed;
const result = $dotCall(tmpMCF, num, `toFixed`);
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
