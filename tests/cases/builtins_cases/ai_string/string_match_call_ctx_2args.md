# Preval test case

# string_match_call_ctx_2args.md

> Builtins cases > Ai string > String match call ctx 2args
>
> Test 'match' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.match.call("abc", "b", "extra"));
// Expected: ["b"]
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:string*/ = $dotCall($string_match, `abc`, undefined, `b`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_match, `abc`, undefined, `b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_match, "abc", undefined, "b" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.match;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `b`, `extra`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
