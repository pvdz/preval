# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
function f(p = (a = b?.x.y.z)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
