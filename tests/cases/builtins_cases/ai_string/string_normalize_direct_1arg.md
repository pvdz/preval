# Preval test case

# string_normalize_direct_1arg.md

> Builtins cases > Ai string > String normalize direct 1arg
>
> Test 'normalize' called directly with one argument on a string instance

## Input

`````js filename=intro
$("Amélie".normalize("NFD"));
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
const tmpMCF = $string_normalize;
let tmpCalleeParam = `Ame\u0301lie`;
$(tmpCalleeParam);
`````


## Todos triggered


None


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
