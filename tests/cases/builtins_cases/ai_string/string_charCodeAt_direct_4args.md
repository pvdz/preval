# Preval test case

# string_charCodeAt_direct_4args.md

> Builtins cases > Ai string > String charCodeAt direct 4args
>
> Test String.prototype.charCodeAt called directly with four arguments

## Input

`````js filename=intro
$("abc".charCodeAt(1, 2, 3, 4));
// Expected: 98
`````


## Settled


`````js filename=intro
$(98);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(98);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 98 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charCodeAt;
const tmpArgOverflow = 1;
let tmpCalleeParam = $dotCall($string_charCodeAt, `abc`, `charCodeAt`, tmpArgOverflow);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 98
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
