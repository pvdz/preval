# Preval test case

# string_codePointAt_direct_1arg.md

> Builtins cases > Ai string > String codePointAt direct 1arg
>
> Test String.prototype.codePointAt called directly with 1 argument; should return code point at given index

## Input

`````js filename=intro
const str = $("hello world");
const result = str.codePointAt(6);
$(result); // Expected: 119
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.codePointAt;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `codePointAt`, 6);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.codePointAt(6));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.codePointAt;
const c = $dotCall( b, a, "codePointAt", 6 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.codePointAt;
const result = $dotCall(tmpMCF, str, `codePointAt`, 6);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 119
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
