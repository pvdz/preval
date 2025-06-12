# Preval test case

# string_search_spread_second.md

> Builtins cases > Ai string > String search spread second
>
> Test String.prototype.search called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = /world/;
const args = ["extra", "extra2", "extra3"];
const result = str.search(arg1, ...args);
$(result); // Expected: 6
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const arg1 /*:regex*/ /*truthy*/ = new $regex_constructor(`world`, ``);
const tmpMCF /*:unknown*/ = str.search;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `search`, arg1, `extra`, `extra2`, `extra3`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
const arg1 = new $regex_constructor(`world`, ``);
$(str.search(arg1, `extra`, `extra2`, `extra3`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = new $regex_constructor( "world", "" );
const c = a.search;
const d = $dotCall( c, a, "search", b, "extra", "extra2", "extra3" );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = new $regex_constructor(`world`, ``);
const args = [`extra`, `extra2`, `extra3`];
const tmpMCF = str.search;
const result = $dotCall(tmpMCF, str, `search`, arg1, ...args);
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
