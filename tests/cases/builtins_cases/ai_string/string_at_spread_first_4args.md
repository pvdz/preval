# Preval test case

# string_at_spread_first_4args.md

> Builtins cases > Ai string > String at spread first 4args
>
> Test String.prototype.at called with spread arguments (array with 4 elements, only first used)

## Input

`````js filename=intro
const str = $("hello");
const args = [1, 2, 3, 4];
const result = str.at(...args);
$(result); // Expected: "e"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.at;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `at`, 1, 2, 3, 4);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.at(1, 2, 3, 4));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.at;
const c = $dotCall( b, a, "at", 1, 2, 3, 4 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const args = [1, 2, 3, 4];
const tmpMCF = str.at;
const result = $dotCall(tmpMCF, str, `at`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'e'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
