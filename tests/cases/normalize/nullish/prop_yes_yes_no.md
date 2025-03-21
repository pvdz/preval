# Preval test case

# prop_yes_yes_no.md

> Normalize > Nullish > Prop yes yes no
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a??b??c.d);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
