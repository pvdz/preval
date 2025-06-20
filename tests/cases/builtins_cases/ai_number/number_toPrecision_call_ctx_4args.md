# Preval test case

# number_toPrecision_call_ctx_4args.md

> Builtins cases > Ai number > Number toPrecision call ctx 4args
>
> Test Number.prototype.toPrecision called with .call and 4 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $(123.456);
const result = Number.prototype.toPrecision.call(ctx, 5, 1, 2, 3);
$(result); // Expected: "123.46"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(123.456);
const result /*:string*/ = $dotCall($number_toPrecision, ctx, undefined, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toPrecision, $(123.456), undefined, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 123.456 );
const b = $dotCall( $number_toPrecision, a, undefined, 5 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(123.456);
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toPrecision;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 5, 1, 2, 3);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toPrecision


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 123.456
 - 2: '123.46'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
