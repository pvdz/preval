# Preval test case

# useless_arg.md

> Normalize > Unary > Delete > Useless arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete $(1));
`````


## Settled


`````js filename=intro
$(1);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( true );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
