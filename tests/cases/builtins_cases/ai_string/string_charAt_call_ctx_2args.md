# Preval test case

# string_charAt_call_ctx_2args.md

> Builtins cases > Ai string > String charAt call ctx 2args
>
> Test String.prototype.charAt called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.charAt.call("abc", 1, 2));
// Expected: "b"
`````


## Settled


`````js filename=intro
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.charAt;
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
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
