# Preval test case

# string_endsWith_direct_0args.md

> Builtins cases > Ai string > String endsWith direct 0args
>
> Test String.prototype.endsWith called directly with 0 arguments; should return false (searching for undefined)

## Input

`````js filename=intro
const str = $("hello world");
const result = str.endsWith();
$(result); // Expected: false
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.endsWith;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `endsWith`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.endsWith());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.endsWith;
const c = $dotCall( b, a, "endsWith" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.endsWith;
const result = $dotCall(tmpMCF, str, `endsWith`);
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
