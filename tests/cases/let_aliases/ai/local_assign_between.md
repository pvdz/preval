# Preval test case

# local_assign_between.md

> Let aliases > Ai > Local assign between
>
> Assignment to a different local variable between aliases (should alias)

## Input

`````js filename=intro
let x = $("val");
let y = 0;
const a = x;
y = 1;
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
let y = 0;
const a = x;
y = 1;
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
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
