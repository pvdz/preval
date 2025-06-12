# Preval test case

# string_padStart_direct_4args.md

> Builtins cases > Ai string > String padStart direct 4args
>
> Test 'padStart' called directly with four arguments on a string instance (extra args ignored)

## Input

`````js filename=intro
$("abc".padStart(6, "*", 42, null));
// Expected: "***abc"
`````


## Settled


`````js filename=intro
$(`***abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`***abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "***abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_padStart;
const tmpArgOverflow = 6;
const tmpArgOverflow$1 = `*`;
let tmpCalleeParam = $dotCall($string_padStart, `abc`, `padStart`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '***abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
