# Preval test case

# base.md

> Bit hacks > Or or > Base
>
> If a value is orred to two primitives, you can at least safely merge those primitive.

## Input

`````js filename=intro
const a = $(0);
const b = a | 16;
const c = b | 32;
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const c /*:number*/ /*truthy*/ /*|48*/ = a | 48;
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0) | 48);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a | 48;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(0);
const b = a | 16;
const c = b | 32;
$(c);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 48
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
