# Preval test case

# string_toString_direct_0args.md

> Builtins cases > Ai string > String toString direct 0args
>
> Test String.prototype.toString called directly with 0 arguments; should return the primitive string value

## Input

`````js filename=intro
const str = $("hello world");
const result = str.toString();
$(result); // Expected: "hello world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toString`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.toString());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.toString;
const c = $dotCall( b, a, "toString" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.toString;
const result = $dotCall(tmpMCF, str, `toString`);
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
