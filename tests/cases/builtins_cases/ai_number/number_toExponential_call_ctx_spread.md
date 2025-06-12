# Preval test case

# number_toExponential_call_ctx_spread.md

> Builtins cases > Ai number > Number toExponential call ctx spread
>
> Test Number.prototype.toExponential called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $(0.1234);
const args = [2];
const result = Number.prototype.toExponential.call(ctx, ...args);
$(result); // Expected: "1.23e-1"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(0.1234);
const result /*:string*/ = $dotCall($number_toExponential, ctx, undefined, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toExponential, $(0.1234), undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.1234 );
const b = $dotCall( $number_toExponential, a, undefined, 2 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(0.1234);
const args = [2];
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toExponential;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toExponential


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.1234
 - 2: '1.23e-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
