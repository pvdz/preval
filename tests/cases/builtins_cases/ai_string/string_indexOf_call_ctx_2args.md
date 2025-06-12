# Preval test case

# string_indexOf_call_ctx_2args.md

> Builtins cases > Ai string > String indexOf call ctx 2args
>
> Test String.prototype.indexOf called with .call and 2 arguments, using a context value

## Input

`````js filename=intro
const ctx = $("hello world");
const result = String.prototype.indexOf.call(ctx, "o", 5);
$(result); // Expected: 7
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`hello world`);
const result /*:number*/ = $dotCall($string_indexOf, ctx, undefined, `o`, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_indexOf, $(`hello world`), undefined, `o`, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_indexOf, a, undefined, "o", 5 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.indexOf;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, `o`, 5);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.indexOf to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
