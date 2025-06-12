# Preval test case

# number_toFixed_spread_second_4args.md

> Builtins cases > Ai number > Number toFixed spread second 4args
>
> Test Number.prototype.toFixed called directly with spread as second argument (4 values)

## Input

`````js filename=intro
const num = $(42.123);
const arg1 = 2;
const args = ["extra1", "extra2", "extra3", "extra4"];
const result = num.toFixed(arg1, ...args);
$(result); // Expected: "42.12"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const tmpMCF /*:unknown*/ = num.toFixed;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toFixed`, 2, `extra1`, `extra2`, `extra3`, `extra4`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42.123);
$(num.toFixed(2, `extra1`, `extra2`, `extra3`, `extra4`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = a.toFixed;
const c = $dotCall( b, a, "toFixed", 2, "extra1", "extra2", "extra3", "extra4" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const arg1 = 2;
const args = [`extra1`, `extra2`, `extra3`, `extra4`];
const tmpMCF = num.toFixed;
const result = $dotCall(tmpMCF, num, `toFixed`, arg1, ...args);
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
