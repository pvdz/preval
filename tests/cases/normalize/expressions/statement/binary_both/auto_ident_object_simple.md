# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: 1, y: 2, z: 3 } + { x: 1, y: 2, z: 3 });
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({ x: 1, y: 2, z: 3 } + { x: 1, y: 2, z: 3 });
$({ a: 999, b: 1000 });
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
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
