# Preval test case

# string_includes_call_ctx_2args.md

> Builtins cases > Ai string > String includes call ctx 2args
>
> Test String.prototype.includes called with .call and object context, 2 arguments

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.includes.call(str, "hello", 1);
$(result); // Expected: false
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:boolean*/ = $dotCall($string_includes, str, undefined, `hello`, 1);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_includes, $(`hello world`), undefined, `hello`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_includes, a, undefined, "hello", 1 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.includes;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, `hello`, 1);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.includes to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
