# Preval test case

# assignment_to_string_key.md

> Normalize > Object > Assignment to string key
>
> Should convert the key to a regular property

## Input

`````js filename=intro
const o = {x: 1};
o['x'] = 2;
$(o);
`````


## Settled


`````js filename=intro
const o /*:object*/ = { x: 2 };
$(o);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 2 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 2 };
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const o = { x: 2 };
$(o);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
