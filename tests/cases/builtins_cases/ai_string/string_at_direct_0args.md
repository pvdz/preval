# Preval test case

# string_at_direct_0args.md

> Builtins cases > Ai string > String at direct 0args
>
> Test String.prototype.at called directly with 0 arguments; should return the first character

## Input

`````js filename=intro
const str = $("hello");
const result = str.at();
$(result); // Expected: "h"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello`);
const tmpMCF /*:unknown*/ = str.at;
const result /*:unknown*/ = $dotCall(tmpMCF, str, `at`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = $(`hello`);
$(str.at());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello" );
const b = a.at;
const c = $dotCall( b, a, "at" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello`);
const tmpMCF = str.at;
const result = $dotCall(tmpMCF, str, `at`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello'
 - 2: 'h'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
