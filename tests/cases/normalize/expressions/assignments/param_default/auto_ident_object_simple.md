# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = { x: 1, y: 2, z: 3 })) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({ x: 1, y: 2, z: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
