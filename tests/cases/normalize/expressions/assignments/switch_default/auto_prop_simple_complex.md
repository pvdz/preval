# Preval test case

# auto_prop_simple_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto prop simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = { b: $(1) };
}
a.b = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
}
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````

## Output

`````js filename=intro
$(1);
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
const tmpAssignMemRhs = $(2);
SSA_a.b = tmpAssignMemRhs;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
