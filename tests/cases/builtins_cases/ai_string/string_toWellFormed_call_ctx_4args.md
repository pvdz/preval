# Preval test case

# string_toWellFormed_call_ctx_4args.md

> Builtins cases > Ai string > String toWellFormed call ctx 4args
>
> Test String.prototype.toWellFormed called with .call and 4 arguments (should be ignored), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.toWellFormed.call(ctx, 1, 2, 3, 4);
$(result); // Expected: "world"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_toWellFormed, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toWellFormed, $(`world`), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_toWellFormed, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toWellFormed;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 1, 2, 3, 4);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toWellFormed


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
