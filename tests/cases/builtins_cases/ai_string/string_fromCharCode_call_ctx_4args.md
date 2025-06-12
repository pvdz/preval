# Preval test case

# string_fromCharCode_call_ctx_4args.md

> Builtins cases > Ai string > String fromCharCode call ctx 4args
>
> Test String.fromCharCode called with .call and object context, four arguments

## Input

`````js filename=intro
$(String.fromCharCode.call({}, 65, 66, 67, 68));
// Expected: "ABCD"
`````


## Settled


`````js filename=intro
$(`ABCD`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ABCD`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ABCD" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $String_fromCharCode;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 65, 66, 67, 68);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ABCD'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
