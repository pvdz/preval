# Preval test case

# assign_complex_simple_complex.md

> Logical > Or > Assign complex simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 || $(2));
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
