# Preval test case

# string_padEnd_direct_2args.md

> Builtins cases > Ai string > String padEnd direct 2args
>
> Test 'padEnd' called directly with two arguments on a string instance

## Input

`````js filename=intro
$("abc".padEnd(6, "*"));
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
let tmpCalleeParam = `abc***`;
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
