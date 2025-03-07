# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Switch case block > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = { b: $(1) };
  }
}
$(a)["b"] = 2;
$(a);
`````

## Settled


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
let tmpAssignMemLhsObj /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  a = { b: tmpObjLitVal };
  tmpAssignMemLhsObj = $(a);
} else {
  tmpAssignMemLhsObj = $(a);
}
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
let tmpAssignMemLhsObj = undefined;
if (tmpSwitchDisc === tmpBinBothRhs) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  tmpAssignMemLhsObj = $(a);
} else {
  tmpAssignMemLhsObj = $(a);
}
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      a = { b: $(1) };
    }
  } else {
  }
}
$(a)[`b`] = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
} else {
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
const c = $( 1 );
let d = undefined;
const e = b === c;
if (e) {
  const f = $( 1 );
  a = { b: f };
  d = $( a );
}
else {
  d = $( a );
}
d.b = 2;
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { b: '1' }
 - 5: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
