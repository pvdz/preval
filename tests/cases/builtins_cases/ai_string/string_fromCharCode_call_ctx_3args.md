# Preval test case

# string_fromCharCode_call_ctx_3args.md

> Builtins cases > Ai string > String fromCharCode call ctx 3args
>
> Test String.fromCharCode called with .call and object context, three arguments

## Input

`````js filename=intro
$(String.fromCharCode.call({}, 65, 66, 67));
// Expected: "ABC"
`````


## Settled


`````js filename=intro
$(`ABC`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ABC`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ABC" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $String_fromCharCode;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 65, 66, 67);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
