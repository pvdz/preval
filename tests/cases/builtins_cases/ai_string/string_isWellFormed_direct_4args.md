# Preval test case

# string_isWellFormed_direct_4args.md

> Builtins cases > Ai string > String isWellFormed direct 4args
>
> Test String.prototype.isWellFormed called directly with 4 arguments (should be ignored)

## Input

`````js filename=intro
const str = $("hello");
const result = str.isWellFormed(1, 2, 3, 4);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.isWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `isWellFormed`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.isWellFormed(1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.isWellFormed;
const c = $dotCall( b, a, "isWellFormed", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.isWellFormed;
const result = $dotCall(tmpMCF, str, `isWellFormed`, 1, 2, 3, 4);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
