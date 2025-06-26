# Preval test case

# string_charCodeAt_call_ctx_2args.md

> Builtins cases > Ai string > String charCodeAt call ctx 2args
>
> Test String.prototype.charCodeAt called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.charCodeAt.call("abc", 1, 2));
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
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 1, 2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


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
