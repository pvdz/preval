# Preval test case

# string_slice_one.md

> Type tracked > String method > String slice one
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(10));
`````


## Settled


`````js filename=intro
$(`rld`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`rld`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "rld" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_slice;
let tmpCalleeParam = `rld`;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'rld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
