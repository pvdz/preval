# Preval test case

# string_localeCompare_direct_4args.md

> Builtins cases > Ai string > String localeCompare direct 4args
>
> Test 'localeCompare' called directly with four arguments on a string instance (extra arg ignored)

## Input

`````js filename=intro
$("abc".localeCompare("abd", "en", { sensitivity: "base" }, 42));
// Expected: -1
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { sensitivity: `base` };
const tmpCalleeParam /*:number*/ = $dotCall($string_localeCompare, `abc`, `localeCompare`, `abd`, `en`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_localeCompare, `abc`, `localeCompare`, `abd`, `en`, { sensitivity: `base` }));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { sensitivity: "base" };
const b = $dotCall( $string_localeCompare, "abc", "localeCompare", "abd", "en", a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_localeCompare;
const tmpMCP = { sensitivity: `base` };
let tmpCalleeParam = $dotCall(tmpMCF, `abc`, `localeCompare`, `abd`, `en`, tmpMCP, 42);
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
