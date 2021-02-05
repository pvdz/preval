# Preval test case

# auto_computed_complex_simple_complex.md

> normalize > expressions > assignments > while > auto_computed_complex_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ((a = { b: $(1) })) $(100);
$(a)["b"] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedProp = 'b';
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpIfTest = tmpNestedComplexRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
const tmpAssignMemLhsObj = $(a);
const tmpAssignComputedObj = tmpAssignMemLhsObj;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj.b = tmpAssignComputedRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 1
 - 4: 100
 - 5: 1
 - 6: 100
 - 7: 1
 - 8: 100
 - 9: 1
 - 10: 100
 - 11: 1
 - 12: 100
 - 13: 1
 - 14: 100
 - 15: 1
 - 16: 100
 - 17: 1
 - 18: 100
 - 19: 1
 - 20: 100
 - 21: 1
 - 22: 100
 - 23: 1
 - 24: 100
 - 25: 1
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
