# Preval test case

# string_at_call_ctx_4args.md

> Builtins cases > Ai string > String at call ctx 4args
>
> Test String.prototype.at called with .call and 4 arguments (extra arguments ignored), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.at.call(ctx, 4, 1, 2, 3);
$(result); // Expected: "d"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_at, ctx, undefined, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_at, $(`world`), undefined, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_at, a, undefined, 4 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.at;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 4, 1, 2, 3);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_at


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
