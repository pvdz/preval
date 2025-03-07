# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > If > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = { x: 1, y: 2, z: 3 }));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = { x: 1, y: 2, z: 3 };
let tmpIfTest = a;
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
`````

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
