# Preval test case

# string_matchAll_spread_second_4args.md

> Builtins cases > Ai string > String matchAll spread second 4args
>
> Test 'matchAll' called directly with spread as second argument (four values)

## Input

`````js filename=intro
$(Array.from("abcabc".matchAll(/a./g, ...$["extra", 42, null, undefined])));
// Expected: [["ab"], ["ab"]]
`````


## Settled


`````js filename=intro
const tmpMCP$1 /*:regex*/ /*truthy*/ = new $regex_constructor(`a.`, `g`);
const tmpMCSP /*:unknown*/ = $.undefined;
[...tmpMCSP];
const tmpMCP /*:object*/ /*truthy*/ = $dotCall($string_matchAll, `abcabc`, `matchAll`, tmpMCP$1);
const tmpCalleeParam /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP$1 = new $regex_constructor(`a.`, `g`);
const tmpMCSP = $.undefined;
[...tmpMCSP];
$($Array_from($dotCall($string_matchAll, `abcabc`, `matchAll`, tmpMCP$1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "a.", "g" );
const b = $.undefined;
[ ...b ];
const c = $dotCall( $string_matchAll, "abcabc", "matchAll", a );
const d = $Array_from( c );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpMCF$1 = $string_matchAll;
const tmpMCP$1 = new $regex_constructor(`a.`, `g`);
const tmpCompObj = $;
const tmpCalleeParam$1 = undefined;
const tmpMCSP = tmpCompObj[tmpCalleeParam$1];
const tmpMCP = $dotCall(tmpMCF$1, `abcabc`, `matchAll`, tmpMCP$1, ...tmpMCSP);
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
