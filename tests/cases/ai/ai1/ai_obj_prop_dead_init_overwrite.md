# Preval test case

# ai_obj_prop_dead_init_overwrite.md

> Ai > Ai1 > Ai obj prop dead init overwrite
>
> Test: Object property assignment where property value is immediately overwritten by opaque value.

## Input

`````js filename=intro
// Expected: let obj = {}; const $$0 = $('new_val'); obj.p = $$0; $('use', $$0);
let obj = { p: 123 };
obj.p = $('new_val');
$('use', obj.p);
`````


## Settled


`````js filename=intro
const tmpAssignMemRhs /*:unknown*/ = $(`new_val`);
$(`use`, tmpAssignMemRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $(`new_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "new_val" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = { p: 123 };
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = $(`new_val`);
tmpAssignMemLhsObj.p = tmpAssignMemRhs;
let tmpCalleeParam = obj.p;
$(`use`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'new_val'
 - 2: 'use', 'new_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
