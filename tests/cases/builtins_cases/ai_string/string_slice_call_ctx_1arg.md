# Preval test case

# string_slice_call_ctx_1arg.md

> Builtins cases > Ai string > String slice call ctx 1arg
>
> Test String.prototype.slice called with .call and object context, 1 argument

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.slice.call(str, 6);
$(result); // Expected: "world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:string*/ = $dotCall($string_slice, str, undefined, 6);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_slice, $(`hello world`), undefined, 6));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_slice, a, undefined, 6 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.slice;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, 6);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.slice to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
