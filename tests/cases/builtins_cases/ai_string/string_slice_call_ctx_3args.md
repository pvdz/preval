# Preval test case

# string_slice_call_ctx_3args.md

> Builtins cases > Ai string > String slice call ctx 3args
>
> Test String.prototype.slice called with .call and object context, 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.slice.call(str, 0, 5, "extra");
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:string*/ = $dotCall($string_slice, str, undefined, 0, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_slice, $(`hello world`), undefined, 0, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_slice, a, undefined, 0, 5 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.slice;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, 0, 5, `extra`);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.slice to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
