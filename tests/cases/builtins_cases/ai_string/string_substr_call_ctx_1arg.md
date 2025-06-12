# Preval test case

# string_substr_call_ctx_1arg.md

> Builtins cases > Ai string > String substr call ctx 1arg
>
> Test String.prototype.substr called with .call and 1 argument (start), using a context value

## Input

`````js filename=intro
const ctx = $("world");
const result = String.prototype.substr.call(ctx, 2);
$(result); // Expected: "rld"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`world`);
const result /*:string*/ = $dotCall($string_substr, ctx, undefined, 2);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_substr, $(`world`), undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "world" );
const b = $dotCall( $string_substr, a, undefined, 2 );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.substr;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, 2);
$(result);
`````


## Todos triggered


- (todo) coerce the context of string.substr to a string first, but consider the nullable edge case


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'world'
 - 2: 'rld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
