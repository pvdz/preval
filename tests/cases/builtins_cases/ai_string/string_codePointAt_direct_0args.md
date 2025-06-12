# Preval test case

# string_codePointAt_direct_0args.md

> Builtins cases > Ai string > String codePointAt direct 0args
>
> Test String.prototype.codePointAt called directly with 0 arguments; should return code point of first character

## Input

`````js filename=intro
const str = $("hello world");
const result = str.codePointAt();
$(result); // Expected: 104
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.codePointAt;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `codePointAt`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.codePointAt());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.codePointAt;
const c = $dotCall( b, a, "codePointAt" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.codePointAt;
const result = $dotCall(tmpMCF, str, `codePointAt`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 104
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
