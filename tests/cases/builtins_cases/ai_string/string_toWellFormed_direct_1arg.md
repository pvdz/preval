# Preval test case

# string_toWellFormed_direct_1arg.md

> Builtins cases > Ai string > String toWellFormed direct 1arg
>
> Test String.prototype.toWellFormed called directly with 1 argument (should be ignored)

## Input

`````js filename=intro
const str = $("hello");
const result = str.toWellFormed(42);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.toWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toWellFormed`, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.toWellFormed(42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.toWellFormed;
const c = $dotCall( b, a, "toWellFormed", 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.toWellFormed;
const result = $dotCall(tmpMCF, str, `toWellFormed`, 42);
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
