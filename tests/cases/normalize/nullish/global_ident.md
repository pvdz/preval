# Preval test case

# global_ident.md

> Normalize > Nullish > Global ident
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt??foo);
`````


## Settled


`````js filename=intro
$(parseInt);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(parseInt);
`````


## PST Settled
With rename=true

`````js filename=intro
$( parseInt );
`````


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
