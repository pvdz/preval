# Preval test case

# let_between_aliases.md

> Let aliases > Ai > Let between aliases
>
> Assignment to let between aliases (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
x = "other";
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `other`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `other`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "other" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
x = `other`;
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
 - 2: 'val', 'other'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
