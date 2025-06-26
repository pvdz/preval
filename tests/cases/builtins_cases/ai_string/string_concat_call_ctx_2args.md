# Preval test case

# string_concat_call_ctx_2args.md

> Builtins cases > Ai string > String concat call ctx 2args
>
> Test String.prototype.concat called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.concat.call("abc", "d", "e"));
// Expected: "abcde"
`````


## Settled


`````js filename=intro
$(`abcde`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcde`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcde" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.concat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `d`, `e`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcde'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
