# Preval test case

# string_indexOf_direct_2args.md

> Builtins cases > Ai string > String indexOf direct 2args
>
> Test String.prototype.indexOf called directly with 2 arguments

## Input

`````js filename=intro
const str = $("hello world");
const result = str.indexOf("o", 5);
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
const tmpMCF = str.indexOf;
const result = $dotCall(tmpMCF, str, `indexOf`, `o`, 5);
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
