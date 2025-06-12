# Preval test case

# string_startsWith_direct_4args.md

> Builtins cases > Ai string > String startsWith direct 4args
>
> Test String.prototype.startsWith called directly with four arguments

## Input

`````js filename=intro
$("abc".startsWith("b", 1, 2, 3));
// Expected: true
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_startsWith;
const tmpArgOverflow = `b`;
const tmpArgOverflow$1 = 1;
let tmpCalleeParam = $dotCall($string_startsWith, `abc`, `startsWith`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
