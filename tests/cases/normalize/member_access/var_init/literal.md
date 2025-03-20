# Preval test case

# literal.md

> Normalize > Member access > Var init > Literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
let x = 'foo'.length;
$(x);
`````


## Settled


`````js filename=intro
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
