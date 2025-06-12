# Preval test case

# string_padEnd_direct_3args.md

> Builtins cases > Ai string > String padEnd direct 3args
>
> Test 'padEnd' called directly with three arguments on a string instance (extra arg ignored)

## Input

`````js filename=intro
$("abc".padEnd(6, "*", 42));
// Expected: "abc***"
`````


## Settled


`````js filename=intro
$(`abc***`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc***`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc***" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padEnd;
const tmpArgOverflow = 6;
const tmpArgOverflow$1 = `*`;
let tmpCalleeParam = $dotCall($string_padEnd, `abc`, `padEnd`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc***'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
