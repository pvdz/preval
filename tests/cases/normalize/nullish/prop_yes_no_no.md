# Preval test case

# prop_yes_no_no.md

> Normalize > Nullish > Prop yes no no
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a??b.c.d);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
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
