# Preval test case

# string_fromCharCode_call_ctx_2args.md

> Builtins cases > Ai string > String fromCharCode call ctx 2args
>
> Test String.fromCharCode called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.fromCharCode.call({}, 65, 66));
// Expected: "AB"
`````


## Settled


`````js filename=intro
$(`AB`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`AB`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "AB" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = $String_fromCharCode;
const tmpMCF = tmpMCOO.call;
const tmpMCP = {};
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, 65, 66);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'AB'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
