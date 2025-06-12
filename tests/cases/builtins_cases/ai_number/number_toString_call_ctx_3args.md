# Preval test case

# number_toString_call_ctx_3args.md

> Builtins cases > Ai number > Number toString call ctx 3args
>
> Test Number.prototype.toString called with .call and 3 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $(1234);
const result = Number.prototype.toString.call(ctx, 8, 1, 2);
$(result); // Expected: "2322"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(1234);
const result /*:string*/ = $dotCall($number_toString, ctx, undefined, 8);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toString, $(1234), undefined, 8));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1234 );
const b = $dotCall( $number_toString, a, undefined, 8 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(1234);
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toString;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 8, 1, 2);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1234
 - 2: '2322'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
