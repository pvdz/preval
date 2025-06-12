# Preval test case

# string_search_call_ctx_spread.md

> Builtins cases > Ai string > String search call ctx spread
>
> Test String.prototype.search called with .call, object context, and spread as arguments

## Input

`````js filename=intro
const str = $("hello world");
const args = [/world/, "extra", "extra2"];
const result = String.prototype.search.call(str, ...args);
$(result); // Expected: 6
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpArrElement /*:regex*/ /*truthy*/ = new $regex_constructor(`world`, ``);
const result /*:number*/ = $dotCall($string_search, str, undefined, tmpArrElement);
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
const tmpArrElement = new $regex_constructor(`world`, ``);
const args = [tmpArrElement, `extra`, `extra2`];
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.search;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, ...args);
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
