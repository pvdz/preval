# Preval test case

# number_valueOf_call_ctx_3args.md

> Builtins cases > Ai number > Number valueOf call ctx 3args
>
> Test Number.prototype.valueOf called with .call and 3 arguments (should be ignored), using a context value

## Input

`````js filename=intro
const ctx = $(456);
const result = Number.prototype.valueOf.call(ctx, 1, 2, 3);
$(result); // Expected: 456
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(456);
const result /*:number*/ = $dotCall($number_valueOf, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_valueOf, $(456), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 456 );
const b = $dotCall( $number_valueOf, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(456);
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.valueOf;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 1, 2, 3);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_valueOf


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 456
 - 2: 456
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
