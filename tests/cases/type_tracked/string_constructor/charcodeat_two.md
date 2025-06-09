# Preval test case

# charcodeat_two.md

> Type tracked > String constructor > Charcodeat two
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode(80, 70));
`````


## Settled


`````js filename=intro
$(`PF`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`PF`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "PF" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam = `PF`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'PF'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
