# Preval test case

# string_endsWith_spread_first.md

> Builtins cases > Ai string > String endsWith spread first
>
> Test String.prototype.endsWith called directly with spread as first argument (3 values)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["world", 11, "extra"];
const result = str.endsWith(...args);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.endsWith;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `endsWith`, `world`, 11, `extra`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.endsWith(`world`, 11, `extra`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.endsWith;
const c = $dotCall( b, a, "endsWith", "world", 11, "extra" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`world`, 11, `extra`];
const tmpMCF = str.endsWith;
const result = $dotCall(tmpMCF, str, `endsWith`, ...args);
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
