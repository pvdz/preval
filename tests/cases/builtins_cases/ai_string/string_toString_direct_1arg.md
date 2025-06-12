# Preval test case

# string_toString_direct_1arg.md

> Builtins cases > Ai string > String toString direct 1arg
>
> Test String.prototype.toString called directly with 1 argument; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = str.toString("extra");
$(result); // Expected: "hello world"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const tmpMCF /*:unknown*/ = str.toString;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `toString`, `extra`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello world`);
$(str.toString(`extra`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = a.toString;
const c = $dotCall( b, a, "toString", "extra" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpMCF = str.toString;
const result = $dotCall(tmpMCF, str, `toString`, `extra`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
