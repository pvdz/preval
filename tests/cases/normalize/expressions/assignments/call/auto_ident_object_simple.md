# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Call > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { x: 1, y: 2, z: 3 }));
$(a);
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
$(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { x: 1, y: 2, z: 3 };
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
