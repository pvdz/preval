# Preval test case

# string_matchAll_spread_first.md

> Builtins cases > Ai string > String matchAll spread first
>
> Test 'matchAll' called directly with spread as first argument (three values)

## Input

`````js filename=intro
$(Array.from("abcabc".matchAll(...$[/a./g, "extra", 42])));
// Expected: [["ab"], ["ab"]]
`````


## Settled


`````js filename=intro
const tmpMCSP /*:unknown*/ = $[42];
const tmpMCP /*:object*/ /*truthy*/ = $dotCall($string_matchAll, `abcabc`, `matchAll`, ...tmpMCSP);
const tmpCalleeParam /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCSP = $[42];
$($Array_from($dotCall($string_matchAll, `abcabc`, `matchAll`, ...tmpMCSP)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $[ 42 ];
const b = $dotCall( $string_matchAll, "abcabc", "matchAll", ...a );
const c = $Array_from( b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpMCF$1 = $string_matchAll;
const tmpCompObj = $;
const tmpCalleeParam$1 = 42;
const tmpMCSP = tmpCompObj[tmpCalleeParam$1];
const tmpMCP = $dotCall(tmpMCF$1, `abcabc`, `matchAll`, ...tmpMCSP);
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
