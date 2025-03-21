# Preval test case

# repeated_prop_writes3.md

> Object literal > Prop write > Repeated prop writes3
>
> When writing to the same obj property multiple times, inline them or remove dupes.
> 
> The difference here is that b does not escape, so we can guarantee that it's still a plain object with plain props.

## Input

`````js filename=intro
const b = { x: 1 };
b.x = 3;
b.x = 3;
$(b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 3 };
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
