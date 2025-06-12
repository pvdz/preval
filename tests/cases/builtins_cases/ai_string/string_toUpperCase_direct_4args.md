# Preval test case

# string_toUpperCase_direct_4args.md

> Builtins cases > Ai string > String toUpperCase direct 4args
>
> Test String.prototype.toUpperCase called directly with four arguments

## Input

`````js filename=intro
$("AbC".toUpperCase(1, 2, 3, 4));
// Expected: "ABC"
`````


## Settled


`````js filename=intro
$(`ABC`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ABC`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ABC" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toUpperCase;
let tmpCalleeParam = `ABC`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ABC'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
