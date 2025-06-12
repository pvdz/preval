# Preval test case

# string_toLowerCase_call_ctx_spread.md

> Builtins cases > Ai string > String toLowerCase call ctx spread
>
> Test String.prototype.toLowerCase called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $("WORLD");
const args = ["en-US"];
const result = String.prototype.toLowerCase.call(ctx, ...args);
$(result); // Expected: "world"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`WORLD`);
const result /*:string*/ = $dotCall($string_toLowerCase, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toLowerCase, $(`WORLD`), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "WORLD" );
const b = $dotCall( $string_toLowerCase, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`WORLD`);
const args = [`en-US`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toLowerCase;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toLowerCase


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'WORLD'
 - 2: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
