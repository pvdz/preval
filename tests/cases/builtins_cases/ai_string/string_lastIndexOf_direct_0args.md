# Preval test case

# string_lastIndexOf_direct_0args.md

> Builtins cases > Ai string > String lastIndexOf direct 0args
>
> Test String.prototype.lastIndexOf called directly with 0 arguments; should return -1 (searching for undefined)

## Input

`````js filename=intro
const str = $("hello world");
const result = str.lastIndexOf();
$(result); // Expected: -1
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.lastIndexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `lastIndexOf`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.lastIndexOf());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.lastIndexOf;
const c = $dotCall( b, a, "lastIndexOf" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.lastIndexOf;
const result = $dotCall(tmpMCF, str, `lastIndexOf`);
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
