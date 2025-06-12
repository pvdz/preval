# Preval test case

# number_toString_call_ctx_spread.md

> Builtins cases > Ai number > Number toString call ctx spread
>
> Test Number.prototype.toString called with .call, object context, and spread as arguments (3 values)

## Input

`````js filename=intro
const num = $(42);
const args = [16, "extra1", "extra2"];
const result = Number.prototype.toString.call(num, ...args);
$(result); // Expected: "2a"

// Test Number.prototype.toString called with .call and spread arguments (array with 1 element), using a context value
const ctx2 = $(100);
const args2 = [8];
const result2 = Number.prototype.toString.call(ctx2, ...args2);
$(result2); // Expected: "144"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42);
const result /*:string*/ = $dotCall($number_toString, num, undefined, 16);
$(result);
const ctx2 /*:unknown*/ = $(100);
const result2 /*:string*/ = $dotCall($number_toString, ctx2, undefined, 8);
$(result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toString, $(42), undefined, 16));
$($dotCall($number_toString, $(100), undefined, 8));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42 );
const b = $dotCall( $number_toString, a, undefined, 16 );
$( b );
const c = $( 100 );
const d = $dotCall( $number_toString, c, undefined, 8 );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42);
const args = [16, `extra1`, `extra2`];
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toString;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, num, ...args);
$(result);
const ctx2 = $(100);
const args2 = [8];
const tmpCompObj$1 = $Number_prototype;
const tmpMCOO$1 = tmpCompObj$1.toString;
const tmpMCF$1 = tmpMCOO$1.call;
const result2 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ctx2, ...args2);
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
 - 3: 100
 - 4: '144'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
