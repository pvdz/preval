# Preval test case

# string_padEnd_call_ctx_2args.md

> Builtins cases > Ai string > String padEnd call ctx 2args
>
> Test 'padEnd' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.padEnd.call("abc", 6, "*"));
// Expected: "abc***"
`````


## Settled


`````js filename=intro
$(`abc***`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc***`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc***" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.padEnd;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 6, `*`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_padEnd


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc***'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
