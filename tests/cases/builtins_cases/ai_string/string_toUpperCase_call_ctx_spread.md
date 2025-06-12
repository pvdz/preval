# Preval test case

# string_toUpperCase_call_ctx_spread.md

> Builtins cases > Ai string > String toUpperCase call ctx spread
>
> Test String.prototype.toUpperCase called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const args = ["en-US"];
const result = String.prototype.toUpperCase.call(ctx, ...args);
$(result); // Expected: "WORLD"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_toUpperCase, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toUpperCase, $(`world`), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_toUpperCase, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const args = [`en-US`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toUpperCase;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toUpperCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'WORLD'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
