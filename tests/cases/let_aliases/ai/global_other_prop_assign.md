# Preval test case

# global_other_prop_assign.md

> Let aliases > Ai > Global other prop assign
>
> Assignment to a different property of a global object between aliases (should alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
window.z = 99;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
window.z = 99;
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
window.z = 99;
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
window.z = 99;
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
window.z = 99;
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
