# Preval test case

# assignment_from_string_key.md

> Normalize > Object > Assignment from string key
>
> Should convert the key to a regular property

## Input

`````js filename=intro
const o = {x: 1};
let y = 1;
y = o['x'] ;
$(y, o);
`````


## Settled


`````js filename=intro
const o /*:object*/ = { x: 1 };
$(1, o);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { x: 1 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
$( 1, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
