# Preval test case

# number_valueOf_call_ctx_spread.md

> Builtins cases > Ai number > Number valueOf call ctx spread
>
> Test Number.prototype.valueOf called with .call and spread arguments (array with 1 element, should be ignored), using a context value

## Input

`````js filename=intro
const ctx = $(321);
const args = [42];
const result = Number.prototype.valueOf.call(ctx, ...args);
$(result); // Expected: 321
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(321);
const result /*:number*/ = $dotCall($number_valueOf, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($number_valueOf, $(321), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 321 );
const b = $dotCall( $number_valueOf, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(321);
const args = [42];
const tmpCompObj = $Number_prototype;
const tmpMCOO = tmpCompObj.valueOf;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_valueOf


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 321
 - 2: 321
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
