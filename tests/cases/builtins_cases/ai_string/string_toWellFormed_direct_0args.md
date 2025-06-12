# Preval test case

# string_toWellFormed_direct_0args.md

> Builtins cases > Ai string > String toWellFormed direct 0args
>
> Test String.prototype.toWellFormed called directly with 0 arguments; should return a well-formed string (no change for ASCII)

## Input

`````js filename=intro
const str = $("hello");
const result = str.toWellFormed();
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.toWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toWellFormed`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.toWellFormed());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.toWellFormed;
const c = $dotCall( b, a, "toWellFormed" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.toWellFormed;
const result = $dotCall(tmpMCF, str, `toWellFormed`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
