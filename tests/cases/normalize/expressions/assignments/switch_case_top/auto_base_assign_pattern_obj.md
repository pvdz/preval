# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Assignments > Switch case top > Auto base assign pattern obj
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = { b } = $({ b: $(2) });
}
$(a, b);
`````

## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpObjLitVal /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_b /*:unknown*/ = tmpNestedAssignObjPatternRhs.b;
  $(tmpNestedAssignObjPatternRhs, tmpClusterSSA_b);
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  const b /*:object*/ = {};
  $(a, b);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpObjLitVal = $(2);
  const tmpNestedAssignObjPatternRhs = $({ b: tmpObjLitVal });
  $(tmpNestedAssignObjPatternRhs, tmpNestedAssignObjPatternRhs.b);
} else {
  $({ a: 999, b: 1000 }, {});
}
`````

## Pre Normal


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    a = { b: b } = $({ b: $(2) });
  } else {
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
} else {
}
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( 2 );
  const e = { b: d };
  const f = $( e );
  const g = f.b;
  $( f, g );
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  const i = {};
  $( h, i );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { b: '2' }
 - 5: { b: '2' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
