# Preval test case

# string_valueOf_call_ctx_spread.md

> Builtins cases > Ai string > String valueOf call ctx spread
>
> Test String.prototype.valueOf called with .call, object context, and spread as arguments (all ignored)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["extra1", "extra2", "extra3"];
const result = String.prototype.valueOf.call(str, ...args);
$(result); // Expected: "hello world"

// Test String.prototype.valueOf called with .call and spread arguments (array with 1 element, should be ignored), using a context value
const ctx2 = $("world");
const args2 = [42];
const result2 = String.prototype.valueOf.call(ctx2, ...args2);
$(result2); // Expected: "world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:string*/ = $dotCall($string_valueOf, str, undefined);
$(result);
const ctx2 /*:unknown*/ = $(`world`);
const result2 /*:string*/ = $dotCall($string_valueOf, ctx2, undefined);
$(result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_valueOf, $(`hello world`), undefined));
$($dotCall($string_valueOf, $(`world`), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_valueOf, a, undefined );
$( b );
const c = $( "world" );
const d = $dotCall( $string_valueOf, c, undefined );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`extra1`, `extra2`, `extra3`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.valueOf;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, ...args);
$(result);
const ctx2 = $(`world`);
const args2 = [42];
const tmpCompObj$1 = $String_prototype;
const tmpMCOO$1 = tmpCompObj$1.valueOf;
const tmpMCF$1 = tmpMCOO$1.call;
const result2 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ctx2, ...args2);
$(result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello world'
 - 3: 'world'
 - 4: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
