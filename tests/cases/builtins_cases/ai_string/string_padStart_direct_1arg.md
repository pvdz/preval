# Preval test case

# string_padStart_direct_1arg.md

> Builtins cases > Ai string > String padStart direct 1arg
>
> Test 'padStart' called directly with one argument on a string instance

## Input

`````js filename=intro
$("abc".padStart(5));
// Expected: "  abc"
`````


## Settled


`````js filename=intro
$(`  abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`  abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "  abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padStart;
let tmpCalleeParam = `  abc`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
