# Preval test case

# string_endsWith_call_ctx_spread.md

> Builtins cases > Ai string > String endsWith call ctx spread
>
> Test String.prototype.endsWith called with .call, object context, and spread as arguments

## Input

`````js filename=intro
const str = $("hello world");
const args = ["world", 11, "extra"];
const result = String.prototype.endsWith.call(str, ...args);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:boolean*/ = $dotCall($string_endsWith, str, undefined, `world`, 11);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_endsWith, $(`hello world`), undefined, `world`, 11));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_endsWith, a, undefined, "world", 11 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`world`, 11, `extra`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.endsWith;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, ...args);
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
