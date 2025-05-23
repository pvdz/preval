# Preval test case

# repeated_prop_writes2.md

> Object literal > Prop write > Repeated prop writes2
>
> When writing to the same obj property multiple times, inline them or remove dupes.

## Input

`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
$(b);
b.x = 3;
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
$(b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
a.x = 3;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
