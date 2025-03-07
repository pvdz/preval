# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Switch default > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = { x: 1, y: 2, z: 3 };
}
$(a);
`````

## Settled


`````js filename=intro
$(1);
const a /*:object*/ = { x: 1, y: 2, z: 3 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ x: 1, y: 2, z: 3 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = { x: 1, y: 2, z: 3 };
  } else {
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
a = { x: 1, y: 2, z: 3 };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
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
 - 1: 1
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
