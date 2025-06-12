# Preval test case

# string_normalize_call_ctx_2args.md

> Builtins cases > Ai string > String normalize call ctx 2args
>
> Test 'normalize' called with .call and object context, two arguments

## Input

`````js filename=intro
$(String.prototype.normalize.call("Amélie", "NFD", "extra"));
// Expected: "Amélie"
`````


## Settled


`````js filename=intro
$(`Ame\u0301lie`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Ame\u0301lie`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Ame\u0301lie" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.normalize;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `call`, `Am\u00e9lie`, `NFD`, `extra`);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_normalize


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Amélie'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
