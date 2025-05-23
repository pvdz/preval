# Preval test case

# switch_default_block.md

> Normalize > Blocks > Switch default block
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

## Input

`````js filename=intro
switch ($(1)) {
  default: {
    $(3);
  }
}
`````


## Settled


`````js filename=intro
$(1);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchDisc = $(1);
$(3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
