# Preval test case

# string_search_direct_0args.md

> Builtins cases > Ai string > String search direct 0args
>
> Test String.prototype.search called directly with 0 arguments; should search for undefined (returns -1)

## Input

`````js filename=intro
const str = $("hello world");
const result = str.search();
$(result); // Expected: -1
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.search;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `search`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.search());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.search;
const c = $dotCall( b, a, "search" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.search;
const result = $dotCall(tmpMCF, str, `search`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
