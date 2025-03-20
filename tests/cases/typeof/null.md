# Preval test case

# null.md

> Typeof > Null
>
> Inlining `typeof` when we know something is a literal

The joke of JS.

I believe the idea was to have `null` represent "the empty object" or placeholder or whatever. But at this point in time it's just bs and something that'll never be fixed.

## Input

`````js filename=intro
$(typeof null);
`````


## Settled


`````js filename=intro
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
