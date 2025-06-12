# Preval test case

# number_toString_spread_second.md

> Builtins cases > Ai number > Number toString spread second
>
> Test Number.prototype.toString called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const num = $(42);
const arg1 = 16;
const args = ["extra1", "extra2", "extra3"];
const result = num.toString(arg1, ...args);
$(result); // Expected: "2a"

// Test Number.prototype.toString called with spread arguments as second argument (should be ignored)
const num2 = $(42);
const arg2 = 8;
const extra = [1, 2];
const result2 = num2.toString(arg2, ...extra);
$(result2); // Expected: "52"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42);
const tmpMCF /*:unknown*/ = num.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, num, `toString`, 16, `extra1`, `extra2`, `extra3`);
$(result);
const num2 /*:unknown*/ = $(42);
const tmpMCF$1 /*:unknown*/ = num2.toString;
const result2 /*:unknown*/ = $dotCall(tmpMCF$1, num2, `toString`, 8, 1, 2);
$(result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const num = $(42);
$(num.toString(16, `extra1`, `extra2`, `extra3`));
const num2 = $(42);
$(num2.toString(8, 1, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = a.toString;
const c = $dotCall( b, a, "toString", 16, "extra1", "extra2", "extra3" );
$( c );
const d = $( 42 );
const e = d.toString;
const f = $dotCall( e, d, "toString", 8, 1, 2 );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42);
const arg1 = 16;
const args = [`extra1`, `extra2`, `extra3`];
const tmpMCF = num.toString;
const result = $dotCall(tmpMCF, num, `toString`, arg1, ...args);
$(result);
const num2 = $(42);
const arg2 = 8;
const extra = [1, 2];
const tmpMCF$1 = num2.toString;
const result2 = $dotCall(tmpMCF$1, num2, `toString`, arg2, ...extra);
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
 - 4: '52'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
