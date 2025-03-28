# Preval test case

# global_literal.md

> Normalize > Nullish > Global literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(parseInt??length);
`````


## Settled


`````js filename=intro
$($Number_parseInt);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_parseInt);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_parseInt );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
