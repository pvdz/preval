# Preval test case

# string_substr_call_ctx_spread.md

> Builtins cases > Ai string > String substr call ctx spread
>
> Test String.prototype.substr called with .call and spread arguments (array with 2 elements), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const args = [1, 3];
const result = String.prototype.substr.call(ctx, ...args);
$(result); // Expected: "orl"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_substr, ctx, undefined, 1, 3);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_substr, $(`world`), undefined, 1, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_substr, a, undefined, 1, 3 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const args = [1, 3];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.substr;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.substr to a string first, but consider the nullable edge case


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'orl'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
