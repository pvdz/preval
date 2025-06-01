# Preval test case

# global_assign_between.md

> Let aliases > Ai > Global assign between
>
> Assignment to a global variable between aliases (should not alias if global mutation is considered a side effect)

## Input

`````js filename=intro
let x = $("val");
const a = x;
window.y = 42;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
window.y = 42;
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
window.y = 42;
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
window.y = 42;
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
window.y = 42;
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
