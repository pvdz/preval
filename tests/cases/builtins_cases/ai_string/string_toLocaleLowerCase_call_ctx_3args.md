# Preval test case

# string_toLocaleLowerCase_call_ctx_3args.md

> Builtins cases > Ai string > String toLocaleLowerCase call ctx 3args
>
> Test String.prototype.toLocaleLowerCase called with .call and 3 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $("WORLD");
const result = String.prototype.toLocaleLowerCase.call(ctx, "en-US", 1, 2);
$(result); // Expected: "world"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`WORLD`);
const result /*:string*/ = $dotCall($string_toLocaleLowerCase, ctx, undefined, `en-US`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toLocaleLowerCase, $(`WORLD`), undefined, `en-US`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "WORLD" );
const b = $dotCall( $string_toLocaleLowerCase, a, undefined, "en-US" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`WORLD`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toLocaleLowerCase;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `en-US`, 1, 2);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toLocaleLowerCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'WORLD'
 - 2: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
