# Preval test case

# string_lastindexof_one.md

> Type tracked > String method > String lastindexof one
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf('e'));
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_lastIndexOf;
let tmpCalleeParam = 1;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
