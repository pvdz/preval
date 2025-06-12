# Preval test case

# string_trimEnd_spread_first.md

> Builtins cases > Ai string > String trimEnd spread first
>
> Test String.prototype.trimEnd called with spread arguments (array with 1 element, should be ignored)

## Input

`````js filename=intro
const str = $("hello   ");
const args = [42];
const result = str.trimEnd(...args);
$(result); // Expected: "hello"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello   `);
const tmpMCF /*:unknown*/ = str.trimEnd;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `trimEnd`, 42);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello   `);
$(str.trimEnd(42));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello   " );
const b = a.trimEnd;
const c = $dotCall( b, a, "trimEnd", 42 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello   `);
const args = [42];
const tmpMCF = str.trimEnd;
const result = $dotCall(tmpMCF, str, `trimEnd`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello '
 - 2: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
