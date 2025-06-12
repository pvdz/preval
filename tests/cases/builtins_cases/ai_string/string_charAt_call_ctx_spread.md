# Preval test case

# string_charAt_call_ctx_spread.md

> Builtins cases > Ai string > String charAt call ctx spread
>
> Test String.prototype.charAt called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const args = [2];
const result = String.prototype.charAt.call(ctx, ...args);
$(result); // Expected: "r"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_charAt, ctx, undefined, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_charAt, $(`world`), undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_charAt, a, undefined, 2 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const args = [2];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.charAt;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.charAt to a string first


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'r'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
