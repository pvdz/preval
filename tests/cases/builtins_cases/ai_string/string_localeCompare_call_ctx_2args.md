# Preval test case

# string_localeCompare_call_ctx_2args.md

> Builtins cases > Ai string > String localeCompare call ctx 2args
>
> Test 'localeCompare' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.localeCompare.call("abc", "abd", "en"));
// Expected: -1
`````


## Settled


`````js filename=intro
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.localeCompare;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `abd`, `en`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) type trackeed tricks can possibly support static $string_localeCompare


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
