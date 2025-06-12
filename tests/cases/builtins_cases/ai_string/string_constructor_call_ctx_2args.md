# Preval test case

# string_constructor_call_ctx_2args.md

> Builtins cases > Ai string > String constructor call ctx 2args
>
> Test String() called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.call({}, 123, 456));
// Expected: "123"
`````


## Settled


`````js filename=intro
$(`123`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`123`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "123" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = String.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, $string_constructor, `call`, tmpMCP, 123, 456);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '123'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
