# Preval test case

# string_includes_spread_second.md

> Builtins cases > Ai string > String includes spread second
>
> Test String.prototype.includes called directly with spread as second argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = "world";
const args = [0, "extra", "extra2"];
const result = str.includes(arg1, ...args);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.includes;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `includes`, `world`, 0, `extra`, `extra2`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.includes(`world`, 0, `extra`, `extra2`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.includes;
const c = $dotCall( b, a, "includes", "world", 0, "extra", "extra2" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = `world`;
const args = [0, `extra`, `extra2`];
const tmpMCF = str.includes;
const result = $dotCall(tmpMCF, str, `includes`, arg1, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
