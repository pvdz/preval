# Preval test case

# string_slice_direct_0args.md

> Builtins cases > Ai string > String slice direct 0args
>
> Test String.prototype.slice called directly with 0 arguments; should return the whole string

## Input

`````js filename=intro
const str = $("hello world");
const result = str.slice();
$(result); // Expected: "hello world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.slice;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `slice`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.slice());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.slice;
const c = $dotCall( b, a, "slice" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.slice;
const result = $dotCall(tmpMCF, str, `slice`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
