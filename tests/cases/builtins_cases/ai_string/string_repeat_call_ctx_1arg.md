# Preval test case

# string_repeat_call_ctx_1arg.md

> Builtins cases > Ai string > String repeat call ctx 1arg
>
> Test 'repeat' called with .call and object context, one argument

## Input

`````js filename=intro
$(String.prototype.repeat.call("abc", 2));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
$(`abcabc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcabc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcabc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.repeat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 2);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) type trackeed tricks can possibly support static $string_repeat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcabc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
