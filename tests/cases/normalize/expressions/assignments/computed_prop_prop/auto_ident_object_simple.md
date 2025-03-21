# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = { x: 1, y: 2, z: 3 })];
$(a);
`````


## Settled


`````js filename=intro
const obj /*:object*/ = {};
const a /*:object*/ = { x: 1, y: 2, z: 3 };
obj[a];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = {};
const a = { x: 1, y: 2, z: 3 };
obj[a];
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {
  x: 1,
  y: 2,
  z: 3,
};
a[ b ];
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
