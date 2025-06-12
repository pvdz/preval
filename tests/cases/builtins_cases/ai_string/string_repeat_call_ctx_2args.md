# Preval test case

# string_repeat_call_ctx_2args.md

> Builtins cases > Ai string > String repeat call ctx 2args
>
> Test 'repeat' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.repeat.call("abc", 2, 42));
// Expected: "abcabc"
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $dotCall($string_repeat, `abc`, undefined, 2);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_repeat, `abc`, undefined, 2));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_repeat, "abc", undefined, 2 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.repeat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, 2, 42);
$(tmpCalleeParam);
`````


## Todos triggered


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
