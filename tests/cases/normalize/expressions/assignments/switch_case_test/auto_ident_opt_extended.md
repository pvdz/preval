# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = b?.x.y.z):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 100 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
