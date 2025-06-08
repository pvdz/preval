# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = { x: 1, y: 2, z: 3 })) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ x: 1, y: 2, z: 3 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = { x: 1, y: 2, z: 3 };
const tmpSwitchDisc = a;
$(100);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
