# Preval test case

# string_lastIndexOf_direct_1arg.md

> Builtins cases > Ai string > String lastIndexOf direct 1arg
>
> Test String.prototype.lastIndexOf called directly with 1 argument; should return last index if substring is found

## Input

`````js filename=intro
const str = $("hello world");
const result = str.lastIndexOf("o");
$(result); // Expected: 7
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.lastIndexOf;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `lastIndexOf`, `o`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.lastIndexOf(`o`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.lastIndexOf;
const c = $dotCall( b, a, "lastIndexOf", "o" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.lastIndexOf;
const result = $dotCall(tmpMCF, str, `lastIndexOf`, `o`);
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
