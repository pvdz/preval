# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > While > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
while (({ b } = $({ b: $(2) }))) $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (({ b: b } = $({ b: $(2) }))) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
let tmpClusterSSA_b = tmpNestedAssignObjPatternRhs.b;
if (tmpNestedAssignObjPatternRhs) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpObjLitVal$1 = $(2);
    const tmpCalleeParam$1 = { b: tmpObjLitVal$1 };
    const tmpNestedAssignObjPatternRhs$1 = $(tmpCalleeParam$1);
    tmpClusterSSA_b = tmpNestedAssignObjPatternRhs$1.b;
    if (tmpNestedAssignObjPatternRhs$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 100
 - 4: 2
 - 5: { b: '2' }
 - 6: 100
 - 7: 2
 - 8: { b: '2' }
 - 9: 100
 - 10: 2
 - 11: { b: '2' }
 - 12: 100
 - 13: 2
 - 14: { b: '2' }
 - 15: 100
 - 16: 2
 - 17: { b: '2' }
 - 18: 100
 - 19: 2
 - 20: { b: '2' }
 - 21: 100
 - 22: 2
 - 23: { b: '2' }
 - 24: 100
 - 25: 2
 - 26: { b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
