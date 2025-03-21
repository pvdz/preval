# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = --b)) {}
$(f());
$(a, b);
`````


## Settled


`````js filename=intro
$(undefined);
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 0, 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
