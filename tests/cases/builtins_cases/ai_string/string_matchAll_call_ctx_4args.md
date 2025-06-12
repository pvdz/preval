# Preval test case

# string_matchAll_call_ctx_4args.md

> Builtins cases > Ai string > String matchAll call ctx 4args
>
> Test 'matchAll' called with .call and object context, four arguments

## Input

`````js filename=intro
$(Array.from(String.prototype.matchAll.call("abcabc", /a./g, "extra", 42, null)));
// Expected: [["ab"], ["ab"]]
`````


## Settled


`````js filename=intro
const tmpMCP$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`a.`, `g`);
const tmpMCP /*:object*/ /*truthy*/ = $dotCall($string_matchAll, `abcabc`, undefined, tmpMCP$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Array_from($dotCall($string_matchAll, `abcabc`, undefined, new $regex_constructor(`a.`, `g`))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "a.", "g" );
const b = $dotCall( $string_matchAll, "abcabc", undefined, a );
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
const tmpMCP$1 = new $regex_constructor(`a.`, `g`);
const tmpMCP = $dotCall(tmpMCF$1, tmpMCOO, `call`, `abcabc`, tmpMCP$1, `extra`, 42, null);
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
 - 1: [['ab'], ['ab']]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
