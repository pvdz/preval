# Preval test case

# complex_arg.md

> Normalize > Unary > Delete > Complex arg
>
> The complex arg should not lead to a syntax error

## Input

`````js filename=intro
const x = {y: 1};
$(x);
delete $(x);
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ = { y: 1 };
$(x);
$(x);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = { y: 1 };
$(x);
$(x);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
$( a );
$( a );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: { y: '1' }
 - 3: { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
