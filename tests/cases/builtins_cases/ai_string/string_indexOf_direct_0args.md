# Preval test case

# string_indexOf_direct_0args.md

> Builtins cases > Ai string > String indexOf direct 0args
>
> Test String.prototype.indexOf called directly with 0 arguments; should return -1 (searching for undefined)

## Input

`````js filename=intro
const str = $("hello world");
const result = str.indexOf();
$(result); // Expected: -1
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.indexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `indexOf`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.indexOf());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.indexOf;
const c = $dotCall( b, a, "indexOf" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.indexOf;
const result = $dotCall(tmpMCF, str, `indexOf`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
