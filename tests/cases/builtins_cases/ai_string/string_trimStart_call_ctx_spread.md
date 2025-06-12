# Preval test case

# string_trimStart_call_ctx_spread.md

> Builtins cases > Ai string > String trimStart call ctx spread
>
> Test String.prototype.trimStart called with .call and spread arguments (array with 1 element, should be ignored), using a context value

## Input

`````js filename=intro
const ctx = $("   world");
const args = [42];
const result = String.prototype.trimStart.call(ctx, ...args);
$(result); // Expected: "world"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`   world`);
const result /*:string*/ = $dotCall($string_trimStart, ctx, undefined);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_trimStart, $(`   world`), undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "   world" );
const b = $dotCall( $string_trimStart, a, undefined );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`   world`);
const args = [42];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.trimStart;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_trimStart


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' world'
 - 2: 'world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
