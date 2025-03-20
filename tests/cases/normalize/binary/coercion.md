# Preval test case

# coercion.md

> Normalize > Binary > Coercion
>
> Comparison ops trigger coercion mechanisms.

## Input

`````js filename=intro
const a = $(1);
const b = 2;
a < b; // This shouldn't be eliminated
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
a ** 0;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1) ** 0;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
a ** 0;
`````


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
