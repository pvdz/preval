# Preval test case

# and_x_eq_y.md

> Bit hacks > And x if > And x eq y
>
> Meh

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
const z = y === 32; // must be false because y can only be 32768 or 0. Arguably a flag for a bug.
$(z);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
x ** 0;
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(32768) ** 0;
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
a ** 0;
$( false );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32768
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
