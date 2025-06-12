# Preval test case

# string_at_direct_2args.md

> Builtins cases > Ai string > String at direct 2args
>
> Test String.prototype.at called directly with 2 arguments

## Input

`````js filename=intro
const str = $("hello");
const result = str.at(3, 1);
$(result); // Expected: "l"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.at;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `at`, 3, 1);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.at(3, 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.at;
const c = $dotCall( b, a, "at", 3, 1 );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.at;
const result = $dotCall(tmpMCF, str, `at`, 3, 1);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'l'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
