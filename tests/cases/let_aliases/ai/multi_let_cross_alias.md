# Preval test case

# multi_let_cross_alias.md

> Let aliases > Ai > Multi let cross alias
>
> Multiple lets and cross-aliasing (should only alias where safe)

## Input

`````js filename=intro
let x = $("val");
let y = $("other");
const a = x;
const b = y;
x = "changed";
const c = x;
const d = y;
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const y /*:unknown*/ = $(`other`);
$(x, y, `changed`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
const y = $(`other`);
$(x, y, `changed`, y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = $( "other" );
$( a, b, "changed", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
let y = $(`other`);
const a = x;
const b = y;
x = `changed`;
const c = x;
const d = y;
$(a, b, c, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'other'
 - 3: 'val', 'other', 'changed', 'other'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
