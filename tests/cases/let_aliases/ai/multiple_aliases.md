# Preval test case

# multiple_aliases.md

> Let aliases > Ai > Multiple aliases
>
> Multiple direct const aliases from the same let

## Input

`````js filename=intro
let x = $("val");
const a = x;
const b = x;
const c = x;
$(a, b, c);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const b = x;
const c = x;
$(a, b, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
