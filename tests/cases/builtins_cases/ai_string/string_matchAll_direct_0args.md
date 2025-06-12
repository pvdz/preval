# Preval test case

# string_matchAll_direct_0args.md

> Builtins cases > Ai string > String matchAll direct 0args
>
> Test 'matchAll' called directly with zero arguments on a string instance

## Input

`````js filename=intro
$(Array.from("abc".matchAll()));
// Expected: []
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = $dotCall($string_matchAll, `abc`, `matchAll`);
const tmpCalleeParam /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Array_from($dotCall($string_matchAll, `abc`, `matchAll`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_matchAll, "abc", "matchAll" );
const b = $Array_from( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Array_from;
const tmpMCF$1 = $string_matchAll;
const tmpMCP = $dotCall($string_matchAll, `abc`, `matchAll`);
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
 - 1: [[''], [''], [''], ['']]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
