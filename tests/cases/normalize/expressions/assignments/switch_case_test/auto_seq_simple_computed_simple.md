# Preval test case

# auto_seq_simple_computed_simple.md

> normalize > expressions > assignments > switch_case_test > auto_seq_simple_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = { b: $(1) }):
}
($(1), a)["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    const tmpObjLitVal = $(1);
    const tmpNestedComplexRhs = { b: tmpObjLitVal };
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
    }
    tmpFallthrough = true;
  }
}
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpBinBothRhs = tmpNestedComplexRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(1);
const tmpAssignMemLhsObj = a;
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj.b = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
