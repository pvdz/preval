# Preval test case

# string_search_direct_3args.md

> Builtins cases > Ai string > String search direct 3args
>
> Test String.prototype.search called directly with 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = str.search(/world/, "extra1", "extra2");
$(result); // Expected: 6
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.search;
const tmpMCP /*:regex*/ /*truthy*/ = new $regex_constructor(`world`, ``);
const result /*:unknown*/ = $dotCall(tmpMCF, str, `search`, tmpMCP, `extra1`, `extra2`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.search;
$($dotCall(tmpMCF, str, `search`, new $regex_constructor(`world`, ``), `extra1`, `extra2`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.search;
const c = new $regex_constructor( "world", "" );
const d = $dotCall( b, a, "search", c, "extra1", "extra2" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.search;
const tmpMCP = new $regex_constructor(`world`, ``);
const result = $dotCall(tmpMCF, str, `search`, tmpMCP, `extra1`, `extra2`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
