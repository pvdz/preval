# Preval test case

# string_search_call_ctx_3args.md

> Builtins cases > Ai string > String search call ctx 3args
>
> Test String.prototype.search called with .call and object context, 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.search.call(str, /world/, "extra1", "extra2");
$(result); // Expected: 6
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCP /*:regex*/ /*truthy*/ = new $regex_constructor(`world`, ``);
const result /*:number*/ = $dotCall($string_search, str, undefined, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$($dotCall($string_search, str, undefined, new $regex_constructor(`world`, ``)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = new $regex_constructor( "world", "" );
const c = $dotCall( $string_search, a, undefined, b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.search;
const tmpMCF = tmpMCOO.call;
const tmpMCP = new $regex_constructor(`world`, ``);
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, tmpMCP, `extra1`, `extra2`);
$(result);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_search


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
