# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }) + (a = { x: 1, y: 2, z: 3 }));
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
const tmpClusterSSA_a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
const tmpClusterSSA_a = { x: 1, y: 2, z: 3 };
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = {
  x: 1,
  y: 2,
  z: 3,
};
const c = a + b;
$( c );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { x: 1, y: 2, z: 3 };
const tmpBinBothLhs = a;
a = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '[object Object][object Object]'
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
