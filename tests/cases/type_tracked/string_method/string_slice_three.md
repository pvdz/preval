# Preval test case

# string_slice_three.md

> Type tracked > String method > String slice three
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(5, 10, $));
`````


## Settled


`````js filename=intro
$(`   wo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`   wo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "   wo" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ' wo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
