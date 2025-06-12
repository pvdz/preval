# Preval test case

# string_toWellFormed_spread_first_4args.md

> Builtins cases > Ai string > String toWellFormed spread first 4args
>
> Test String.prototype.toWellFormed called with spread arguments (array with 4 elements, all ignored)

## Input

`````js filename=intro
const str = $("hello");
const args = [1, 2, 3, 4];
const result = str.toWellFormed(...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.toWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toWellFormed`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.toWellFormed(1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.toWellFormed;
const c = $dotCall( b, a, "toWellFormed", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const args = [1, 2, 3, 4];
const tmpMCF = str.toWellFormed;
const result = $dotCall(tmpMCF, str, `toWellFormed`, ...args);
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
