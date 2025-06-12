# Preval test case

# string_toLowerCase_direct_0args.md

> Builtins cases > Ai string > String toLowerCase direct 0args
>
> Test String.prototype.toLowerCase called directly with zero arguments

## Input

`````js filename=intro
$("AbC".toLowerCase());
// Expected: "abc"
`````


## Settled


`````js filename=intro
$(`abc`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toLowerCase;
let tmpCalleeParam = `abc`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
