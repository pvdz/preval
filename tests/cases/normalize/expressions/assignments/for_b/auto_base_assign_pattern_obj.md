# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > for_b > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (; (a = { b } = $({ b: $(2) })); $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    let tmpNestedComplexRhs;
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    let tmpNestedComplexRhs;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: 1
 - 4: 2
 - 5: { b: '2' }
 - 6: 1
 - 7: 2
 - 8: { b: '2' }
 - 9: 1
 - 10: 2
 - 11: { b: '2' }
 - 12: 1
 - 13: 2
 - 14: { b: '2' }
 - 15: 1
 - 16: 2
 - 17: { b: '2' }
 - 18: 1
 - 19: 2
 - 20: { b: '2' }
 - 21: 1
 - 22: 2
 - 23: { b: '2' }
 - 24: 1
 - 25: 2
 - 26: { b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
