# Preval test case

# and_x_neq_y.md

> Bit hacks > And x if > And x neq y
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y !== 32; // Must be true since the y must be either 0 or 32768
$(z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
x ** 0;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(32768) ** 0;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
a ** 0;
$( true );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32768
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
