# Preval test case

# string_at_call_ctx_3args.md

> Builtins cases > Ai string > String at call ctx 3args
>
> Test String.prototype.at called with .call and 3 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.at.call(ctx, 3, 1, 2);
$(result); // Expected: "l"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_at, ctx, undefined, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_at, $(`world`), undefined, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_at, a, undefined, 3 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.at;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 3, 1, 2);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_at


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'l'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
