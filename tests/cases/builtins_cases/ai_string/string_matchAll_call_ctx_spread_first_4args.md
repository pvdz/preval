# Preval test case

# string_matchAll_call_ctx_spread_first_4args.md

> Builtins cases > Ai string > String matchAll call ctx spread first 4args
>
> Test 'matchAll' called with .call and object context, spread as first argument (four values)

## Input

`````js filename=intro
$(Array.from(String.prototype.matchAll.call("abcabc", ...$[/a./g, "extra", 42, null])));
// Expected: [["ab"], ["ab"]]
`````


## Settled


`````js filename=intro
const tmpMCSP /*:unknown*/ = $.null;
const tmpMCP /*:object*/ /*truthy*/ = $dotCall($string_matchAll, `abcabc`, undefined, ...tmpMCSP);
const tmpCalleeParam /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $.null;
$($Array_from($dotCall($string_matchAll, `abcabc`, undefined, ...tmpMCSP)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $.null;
const b = $dotCall( $string_matchAll, "abcabc", undefined, ...a );
const c = $Array_from( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.matchAll;
const tmpMCF$1 = tmpMCOO.call;
const tmpCompObj$1 = $;
const tmpCalleeParam$1 = null;
const tmpMCSP = tmpCompObj$1[tmpCalleeParam$1];
const tmpMCP = $dotCall(tmpMCF$1, tmpMCOO, `call`, `abcabc`, ...tmpMCSP);
let tmpCalleeParam = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $string_matchAll


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
