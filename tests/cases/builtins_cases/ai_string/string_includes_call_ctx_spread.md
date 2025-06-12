# Preval test case

# string_includes_call_ctx_spread.md

> Builtins cases > Ai string > String includes call ctx spread
>
> Test String.prototype.includes called with .call, object context, and spread as arguments

## Input

`````js filename=intro
const str = $("hello world");
const args = ["world", 0, "extra"];
const result = String.prototype.includes.call(str, ...args);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:boolean*/ = $dotCall($string_includes, str, undefined, `world`, 0);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_includes, $(`hello world`), undefined, `world`, 0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_includes, a, undefined, "world", 0 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`world`, 0, `extra`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.includes;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, ...args);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.includes to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
