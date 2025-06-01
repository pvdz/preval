# Preval test case

# one_reference.md

> Let aliases > Ai > One reference
>
> Only one alias is ever used

## Input

`````js filename=intro
let x = $("val");
const a = x;
const b = x;
$(a);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
const b = x;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
