# Preval test case

# string_toLocaleUpperCase_call_ctx_4args.md

> Builtins cases > Ai string > String toLocaleUpperCase call ctx 4args
>
> Test String.prototype.toLocaleUpperCase called with .call and 4 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.toLocaleUpperCase.call(ctx, "en-US", 1, 2, 3);
$(result); // Expected: "WORLD"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_toLocaleUpperCase, ctx, undefined, `en-US`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toLocaleUpperCase, $(`world`), undefined, `en-US`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_toLocaleUpperCase, a, undefined, "en-US" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toLocaleUpperCase;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `en-US`, 1, 2, 3);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toLocaleUpperCase


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
