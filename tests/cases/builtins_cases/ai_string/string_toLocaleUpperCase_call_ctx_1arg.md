# Preval test case

# string_toLocaleUpperCase_call_ctx_1arg.md

> Builtins cases > Ai string > String toLocaleUpperCase call ctx 1arg
>
> Test String.prototype.toLocaleUpperCase called with .call and 1 argument, using a context value

## Input

`````js filename=intro
const ctx = $("hello");
const result = String.prototype.toLocaleUpperCase.call(ctx, "tr");
$(result); // Expected: "HELLO" (locale may affect result)
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`hello`);
const result /*:string*/ = $dotCall($string_toLocaleUpperCase, ctx, undefined, `tr`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toLocaleUpperCase, $(`hello`), undefined, `tr`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = $dotCall( $string_toLocaleUpperCase, a, undefined, "tr" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`hello`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toLocaleUpperCase;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `tr`);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toLocaleUpperCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'HELLO'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
