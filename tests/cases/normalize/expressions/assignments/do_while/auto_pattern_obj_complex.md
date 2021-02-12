# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > do_while > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
do {
  $(100);
} while (({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
    tmpIfTest = tmpNestedAssignObjPatternRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = { a: 1, b: 2 };
    const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
    a = tmpNestedAssignObjPatternRhs.a;
    tmpIfTest = tmpNestedAssignObjPatternRhs;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 100
 - 4: { a: '1', b: '2' }
 - 5: 100
 - 6: { a: '1', b: '2' }
 - 7: 100
 - 8: { a: '1', b: '2' }
 - 9: 100
 - 10: { a: '1', b: '2' }
 - 11: 100
 - 12: { a: '1', b: '2' }
 - 13: 100
 - 14: { a: '1', b: '2' }
 - 15: 100
 - 16: { a: '1', b: '2' }
 - 17: 100
 - 18: { a: '1', b: '2' }
 - 19: 100
 - 20: { a: '1', b: '2' }
 - 21: 100
 - 22: { a: '1', b: '2' }
 - 23: 100
 - 24: { a: '1', b: '2' }
 - 25: 100
 - 26: { a: '1', b: '2' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
