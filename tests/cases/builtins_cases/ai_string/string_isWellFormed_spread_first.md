# Preval test case

# string_isWellFormed_spread_first.md

> Builtins cases > Ai string > String isWellFormed spread first
>
> Test String.prototype.isWellFormed called with spread arguments (array with 1 element, should be ignored)

## Input

`````js filename=intro
const str = $("hello");
const args = [42];
const result = str.isWellFormed(...args);
$(result); // Expected: true
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.isWellFormed;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `isWellFormed`, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.isWellFormed(42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.isWellFormed;
const c = $dotCall( b, a, "isWellFormed", 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const args = [42];
const tmpMCF = str.isWellFormed;
const result = $dotCall(tmpMCF, str, `isWellFormed`, ...args);
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
