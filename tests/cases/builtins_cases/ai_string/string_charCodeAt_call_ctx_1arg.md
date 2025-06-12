# Preval test case

# string_charCodeAt_call_ctx_1arg.md

> Builtins cases > Ai string > String charCodeAt call ctx 1arg
>
> Test String.prototype.charCodeAt called with .call and object context, one argument

## Input

`````js filename=intro
$(String.prototype.charCodeAt.call("abc", 1));
// Expected: 98
`````


## Settled


`````js filename=intro
$(98);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(98);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 98 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.charCodeAt;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 98
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
