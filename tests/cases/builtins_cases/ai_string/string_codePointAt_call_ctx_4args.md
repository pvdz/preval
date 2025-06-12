# Preval test case

# string_codePointAt_call_ctx_4args.md

> Builtins cases > Ai string > String codePointAt call ctx 4args
>
> Test String.prototype.codePointAt called with .call and object context, 4 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.codePointAt.call(str, 6, "extra1", "extra2", "extra3");
$(result); // Expected: 119
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCOO /*:unknown*/ = $String_prototype.codePointAt;
const tmpMCF /*:unknown*/ = tmpMCOO.call;
const result /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `call`, str, 6, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
const tmpMCOO = $String_prototype.codePointAt;
$(tmpMCOO.call(str, 6, `extra1`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $String_prototype.codePointAt;
const c = b.call;
const d = $dotCall( c, b, "call", a, 6, "extra1", "extra2", "extra3" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.codePointAt;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, 6, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 119
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
