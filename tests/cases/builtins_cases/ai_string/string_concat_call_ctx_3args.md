# Preval test case

# string_concat_call_ctx_3args.md

> Builtins cases > Ai string > String concat call ctx 3args
>
> Test String.prototype.concat called with .call and object context, three arguments

## Input

`````js filename=intro
$(String.prototype.concat.call("abc", "d", "e", "f"));
// Expected: "abcdef"
`````


## Settled


`````js filename=intro
$(`abcdef`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcdef`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcdef" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.concat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `d`, `e`, `f`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcdef'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
