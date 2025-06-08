# Preval test case

# prop_write.md

> Object literal > Prop write > Prop write
>
> The write should be eliminated immediately

## Input

`````js filename=intro
const b = { x: 1 };
b.x = 3;
$(b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { x: 3 };
$(b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 3 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const b = { x: 3 };
$(b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
