# Preval test case

# string_lastIndexOf_call_ctx_4args.md

> Builtins cases > Ai string > String lastIndexOf call ctx 4args
>
> Test String.prototype.lastIndexOf called with .call and object context, 4 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.lastIndexOf.call(str, "o", 6, "extra1", "extra2");
$(result); // Expected: 4
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:number*/ = $dotCall($string_lastIndexOf, str, undefined, `o`, 6);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_lastIndexOf, $(`hello world`), undefined, `o`, 6));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_lastIndexOf, a, undefined, "o", 6 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.lastIndexOf;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, `o`, 6, `extra1`, `extra2`);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.lastIndexOf to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
