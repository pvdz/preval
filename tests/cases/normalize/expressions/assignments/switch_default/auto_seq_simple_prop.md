# Preval test case

# auto_seq_simple_prop.md

> Normalize > Expressions > Assignments > Switch default > Auto seq simple prop
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = { b: $(1) };
}
($(1), a).b = $(2);
$(a);
`````

## Settled


`````js filename=intro
$(1);
$(1);
$(1);
const tmpAssignMemRhs /*:unknown*/ = $(2);
const a /*:object*/ = { b: tmpAssignMemRhs };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
$(1);
const tmpAssignMemRhs = $(2);
$({ b: tmpAssignMemRhs });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    a = { b: $(1) };
  } else {
  }
}
($(1), a).b = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
$( 1 );
const a = $( 2 );
const b = { b: a };
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
