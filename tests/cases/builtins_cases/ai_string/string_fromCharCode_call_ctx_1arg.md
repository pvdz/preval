# Preval test case

# string_fromCharCode_call_ctx_1arg.md

> Builtins cases > Ai string > String fromCharCode call ctx 1arg
>
> Test String.fromCharCode called with .call and object context, one argument

## Input

`````js filename=intro
$(String.fromCharCode.call({}, 65));
// Expected: "A"
`````


## Settled


`````js filename=intro
$(`A`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`A`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "A" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $String_fromCharCode;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 65);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
