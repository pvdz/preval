# Preval test case

# string_localeCompare_call_ctx_3args.md

> Builtins cases > Ai string > String localeCompare call ctx 3args
>
> Test 'localeCompare' called with .call and object context, three arguments

## Input

`````js filename=intro
$(String.prototype.localeCompare.call("abc", "abd", "en", { sensitivity: "base" }));
// Expected: -1
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { sensitivity: `base` };
const tmpCalleeParam /*:number*/ = $dotCall($string_localeCompare, `abc`, undefined, `abd`, `en`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_localeCompare, `abc`, undefined, `abd`, `en`, { sensitivity: `base` }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { sensitivity: "base" };
const b = $dotCall( $string_localeCompare, "abc", undefined, "abd", "en", a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.localeCompare;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { sensitivity: `base` };
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `abc`, `abd`, `en`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


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
