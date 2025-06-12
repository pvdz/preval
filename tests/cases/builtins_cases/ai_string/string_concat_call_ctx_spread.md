# Preval test case

# string_concat_call_ctx_spread.md

> Builtins cases > Ai string > String concat call ctx spread
>
> Test String.prototype.concat called with .call and spread arguments (array with 1 element), using a context value

## Input

`````js filename=intro
const ctx = $("foo");
const args = ["bar"];
const result = String.prototype.concat.call(ctx, ...args);
$(result); // Expected: "foobar"
`````


## Settled


`````js filename=intro
const ctx /*:unknown*/ = $(`foo`);
const result /*:string*/ = $dotCall($string_concat, ctx, undefined, `bar`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_concat, $(`foo`), undefined, `bar`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = $dotCall( $string_concat, a, undefined, "bar" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ctx = $(`foo`);
const args = [`bar`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.concat;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, ctx, ...args);
$(result);
`````


## Todos triggered


- (todo) type tracked trick of string concat when context is non-primitive should coerce the context


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'foobar'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
