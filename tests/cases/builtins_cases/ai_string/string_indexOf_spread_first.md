# Preval test case

# string_indexOf_spread_first.md

> Builtins cases > Ai string > String indexOf spread first
>
> Test String.prototype.indexOf called with spread arguments (array with 2 elements)

## Input

`````js filename=intro
const str = $("hello world");
const args = ["o", 5];
const result = str.indexOf(...args);
$(result); // Expected: 7
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.indexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `indexOf`, `o`, 5);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.indexOf(`o`, 5));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.indexOf;
const c = $dotCall( b, a, "indexOf", "o", 5 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const args = [`o`, 5];
const tmpMCF = str.indexOf;
const result = $dotCall(tmpMCF, str, `indexOf`, ...args);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
