# Preval test case

# string_normalize_direct_2args.md

> Builtins cases > Ai string > String normalize direct 2args
>
> Test 'normalize' called directly with two arguments on a string instance (extra arg ignored)

## Input

`````js filename=intro
$("Amélie".normalize("NFD", "extra"));
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
const tmpArgOverflow = `NFD`;
let tmpCalleeParam = $dotCall($string_normalize, `Am\u00e9lie`, `normalize`, tmpArgOverflow);
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
