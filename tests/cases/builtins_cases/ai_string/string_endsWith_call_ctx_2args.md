# Preval test case

# string_endsWith_call_ctx_2args.md

> Builtins cases > Ai string > String endsWith call ctx 2args
>
> Test String.prototype.endsWith called with .call and object context, 2 arguments

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.endsWith.call(str, "hello", 5);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:boolean*/ = $dotCall($string_endsWith, str, undefined, `hello`, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_endsWith, $(`hello world`), undefined, `hello`, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_endsWith, a, undefined, "hello", 5 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.endsWith;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, `hello`, 5);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_endsWith


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
