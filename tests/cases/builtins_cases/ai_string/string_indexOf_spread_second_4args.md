# Preval test case

# string_indexOf_spread_second_4args.md

> Builtins cases > Ai string > String indexOf spread second 4args
>
> Test String.prototype.indexOf called with spread arguments as second argument (4 elements, extra ignored)

## Input

`````js filename=intro
const str = $("hello world");
const arg1 = "o";
const extra = [5, 99, 123, 456];
const result = str.indexOf(arg1, ...extra);
$(result); // Expected: 7
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.indexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `indexOf`, `o`, 5, 99, 123, 456);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.indexOf(`o`, 5, 99, 123, 456));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.indexOf;
const c = $dotCall( b, a, "indexOf", "o", 5, 99, 123, 456 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const arg1 = `o`;
const extra = [5, 99, 123, 456];
const tmpMCF = str.indexOf;
const result = $dotCall(tmpMCF, str, `indexOf`, arg1, ...extra);
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
