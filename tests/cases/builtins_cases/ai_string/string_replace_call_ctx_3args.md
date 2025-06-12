# Preval test case

# string_replace_call_ctx_3args.md

> Builtins cases > Ai string > String replace call ctx 3args
>
> Test String.prototype.replace called with .call and 3 arguments (extra argument ignored), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.replace.call(ctx, "o", "a", 99);
$(result); // Expected: "warld"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_replace, ctx, undefined, `o`, `a`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_replace, $(`world`), undefined, `o`, `a`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_replace, a, undefined, "o", "a" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.replace;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `o`, `a`, 99);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'warld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
