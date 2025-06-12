# Preval test case

# string_fromCharCode_call_ctx_spread.md

> Builtins cases > Ai string > String fromCharCode call ctx spread
>
> Test String.fromCharCode called with .call and spread arguments (array with 2 elements), using a context value (should be ignored)

## Input

`````js filename=intro
const ctx = {ignore: true};
const args = [88, 89];
const result = String.fromCharCode.call(ctx, ...args);
$(result); // Expected: "XY"
`````


## Settled


`````js filename=intro
$(`XY`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`XY`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "XY" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = { ignore: true };
const args = [88, 89];
const tmpMCOO = $String_fromCharCode;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'XY'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
