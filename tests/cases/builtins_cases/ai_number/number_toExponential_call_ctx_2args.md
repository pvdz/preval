# Preval test case

# number_toExponential_call_ctx_2args.md

> Builtins cases > Ai number > Number toExponential call ctx 2args
>
> Test Number.prototype.toExponential called with .call and 2 arguments (extra argument ignored), using a context value

## Input

`````js filename=intro
const ctx = $(123.456);
const result = Number.prototype.toExponential.call(ctx, 3, 99);
$(result); // Expected: "1.235e+2"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(123.456);
const result /*:string*/ = $dotCall($number_toExponential, ctx, undefined, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toExponential, $(123.456), undefined, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123.456 );
const b = $dotCall( $number_toExponential, a, undefined, 3 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(123.456);
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toExponential;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 3, 99);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toExponential


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 123.456
 - 2: '1.235e+2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
