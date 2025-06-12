# Preval test case

# number_toString_spread_first.md

> Builtins cases > Ai number > Number toString spread first
>
> Test Number.prototype.toString called directly with spread as first argument (3 values)

## Input

`````js filename=intro
const num = $(42);
const args = [16, "extra1", "extra2"];
const result = num.toString(...args);
$(result); // Expected: "2a"

// Test Number.prototype.toString called with spread arguments (array with 1 element)
const num2 = $(42);
const args2 = [16];
const result2 = num2.toString(...args2);
$(result2); // Expected: "2a"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 16, `extra1`, `extra2`);
$(result);
const num2 /*:unknown*/ = $(42);
const tmpMCF$1 /*:unknown*/ = num2.toString;
const result2 /*:unknown*/ = $dotCall(tmpMCF$1, num2, `toString`, 16);
$(result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42);
$(num.toString(16, `extra1`, `extra2`));
const num2 = $(42);
$(num2.toString(16));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 16, "extra1", "extra2" );
$( c );
const d = $( 42 );
const e = d.toString;
const f = $dotCall( e, d, "toString", 16 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42);
const args = [16, `extra1`, `extra2`];
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, ...args);
$(result);
const num2 = $(42);
const args2 = [16];
const tmpMCF$1 = num2.toString;
const result2 = $dotCall(tmpMCF$1, num2, `toString`, ...args2);
$(result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 42
 - 2: '2a'
 - 3: 42
 - 4: '2a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
