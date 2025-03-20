# Preval test case

# group_ident.md

> Normalize > Member access > Var init > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
let x = ($(1), $).length;
$(x);
`````


## Settled


`````js filename=intro
$(1);
const x /*:unknown*/ = $.length;
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($.length);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $.length;
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
