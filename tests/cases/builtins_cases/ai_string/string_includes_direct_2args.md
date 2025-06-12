# Preval test case

# string_includes_direct_2args.md

> Builtins cases > Ai string > String includes direct 2args
>
> Test String.prototype.includes called directly with 2 arguments; should return true if substring is found starting at position

## Input

`````js filename=intro
const str = $("hello world");
const result = str.includes("hello", 1);
$(result); // Expected: false
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.includes;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `includes`, `hello`, 1);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.includes(`hello`, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.includes;
const c = $dotCall( b, a, "includes", "hello", 1 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.includes;
const result = $dotCall(tmpMCF, str, `includes`, `hello`, 1);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
