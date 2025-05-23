# Preval test case

# charcodeat_noargs.md

> Type tracked > String constructor > Charcodeat noargs
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode());
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $String_fromCharCode;
let tmpCalleeParam = $String_fromCharCode();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
