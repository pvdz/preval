# Preval test case

# number_toFixed_call_ctx_1arg.md

> Builtins cases > Ai number > Number toFixed call ctx 1arg
>
> Test Number.prototype.toFixed called with .call and object context, 1 argument (fraction digits)

## Input

`````js filename=intro
const num = $(42.123);
const result = Number.prototype.toFixed.call(num, 2);
$(result); // Expected: "42.12"
`````


## Settled


`````js filename=intro
const num /*:unknown*/ = $(42.123);
const result /*:string*/ = $dotCall($number_toFixed, num, undefined, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_toFixed, $(42.123), undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 42.123 );
const b = $dotCall( $number_toFixed, a, undefined, 2 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const num = $(42.123);
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.toFixed;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, num, 2);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toFixed


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
