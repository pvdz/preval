# Preval test case

# string_lastIndexOf_direct_2args.md

> Builtins cases > Ai string > String lastIndexOf direct 2args
>
> Test String.prototype.lastIndexOf called directly with 2 arguments; should return last index if substring is found at or before position

## Input

`````js filename=intro
const str = $("hello world");
const result = str.lastIndexOf("o", 6);
$(result); // Expected: 4
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.lastIndexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `lastIndexOf`, `o`, 6);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.lastIndexOf(`o`, 6));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.lastIndexOf;
const c = $dotCall( b, a, "lastIndexOf", "o", 6 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.lastIndexOf;
const result = $dotCall(tmpMCF, str, `lastIndexOf`, `o`, 6);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
