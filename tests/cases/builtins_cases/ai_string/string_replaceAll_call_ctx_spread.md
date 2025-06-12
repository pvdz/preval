# Preval test case

# string_replaceAll_call_ctx_spread.md

> Builtins cases > Ai string > String replaceAll call ctx spread
>
> Test String.prototype.replaceAll called with .call and spread arguments (array with 2 elements), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const args = ["o", "a"];
const result = String.prototype.replaceAll.call(ctx, ...args);
$(result); // Expected: "warld"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_replaceAll, ctx, undefined, `o`, `a`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_replaceAll, $(`world`), undefined, `o`, `a`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_replaceAll, a, undefined, "o", "a" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const args = [`o`, `a`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.replaceAll;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_replaceAll


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'warld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
