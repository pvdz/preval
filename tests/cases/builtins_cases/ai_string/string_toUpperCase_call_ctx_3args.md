# Preval test case

# string_toUpperCase_call_ctx_3args.md

> Builtins cases > Ai string > String toUpperCase call ctx 3args
>
> Test String.prototype.toUpperCase called with .call and object context, three arguments

## Input

`````js filename=intro
$(String.prototype.toUpperCase.call("AbC", 1, 2, 3));
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
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toUpperCase;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `AbC`, 1, 2, 3);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toUpperCase


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
