# Preval test case

# string_padStart_call_ctx_2args.md

> Builtins cases > Ai string > String padStart call ctx 2args
>
> Test 'padStart' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.padStart.call("abc", 6, "*"));
// Expected: "***abc"
`````


## Settled


`````js filename=intro
$(`***abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`***abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "***abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.padStart;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 6, `*`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_padStart


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '***abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
