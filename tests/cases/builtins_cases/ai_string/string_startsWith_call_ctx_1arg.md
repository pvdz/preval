# Preval test case

# string_startsWith_call_ctx_1arg.md

> Builtins cases > Ai string > String startsWith call ctx 1arg
>
> Test String.prototype.startsWith called with .call and object context, one argument

## Input

`````js filename=intro
$(String.prototype.startsWith.call("abc", "a"));
// Expected: true
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.startsWith;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `a`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) type trackeed tricks can possibly support static $string_startsWith


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
