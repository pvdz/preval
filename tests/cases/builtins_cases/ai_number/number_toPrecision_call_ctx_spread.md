# Preval test case

# number_toPrecision_call_ctx_spread.md

> Builtins cases > Ai number > Number toPrecision call ctx spread
>
> Test Number.prototype.toPrecision called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $(0.1234);
const args = [2];
const result = Number.prototype.toPrecision.call(ctx, ...args);
$(result); // Expected: "0.12"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(0.1234);
const result /*:string*/ = $dotCall($number_toPrecision, ctx, undefined, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toPrecision, $(0.1234), undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.1234 );
const b = $dotCall( $number_toPrecision, a, undefined, 2 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(0.1234);
const args = [2];
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toPrecision;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toPrecision


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.1234
 - 2: '0.12'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
