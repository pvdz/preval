# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Assignments > Export default > Auto pattern obj simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````


## Settled


`````js filename=intro
$(1, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
