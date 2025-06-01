# Preval test case

# let_after_aliases.md

> Let aliases > Ai > Let after aliases
>
> Assignment to let after both aliases

## Input

`````js filename=intro
let x = $("val");
const a = x;
const b = x;
x = "other";
$(a, b, x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x, `other`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x, `other`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a, "other" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const b = x;
x = `other`;
$(a, b, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val', 'other'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
