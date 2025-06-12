# Preval test case

# string_concat_call_ctx_4args.md

> Builtins cases > Ai string > String concat call ctx 4args
>
> Test String.prototype.concat called with .call and object context, four arguments

## Input

`````js filename=intro
$(String.prototype.concat.call("abc", "d", "e", "f", "g"));
// Expected: "abcdefg"
`````


## Settled


`````js filename=intro
$(`abcdefg`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abcdefg`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abcdefg" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.concat;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `d`, `e`, `f`, `g`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abcdefg'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
