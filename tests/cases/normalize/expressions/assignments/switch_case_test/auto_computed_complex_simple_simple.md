# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { b: $(1) }):
}
$(a)["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === (a = { b: $(1) })) {
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
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothRhs = a;
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpObjLitVal = $(1);
const a = { b: tmpObjLitVal };
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
