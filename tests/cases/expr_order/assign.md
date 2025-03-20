# Preval test case

# assign.md

> Expr order > Assign
>
> The order of occurrence is relevant.

Must take into account that the simple node i will still change value if we move the complex node to appear before it.

## Input

`````js filename=intro
let i = 0;
let j = i + ++i;
$(j);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
