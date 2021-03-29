# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > While > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
while (({ a } = $({ a: 1, b: 2 }))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let { a } = { a: 999, b: 1000 };
while (({ a } = $({ a: 1, b: 2 }))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  let tmpIfTest = undefined;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpIfTest = tmpNestedAssignObjPatternRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
while (true) {
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  if (tmpNestedAssignObjPatternRhs) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: { a: '1', b: '2' }
 - 4: 100
 - 5: { a: '1', b: '2' }
 - 6: 100
 - 7: { a: '1', b: '2' }
 - 8: 100
 - 9: { a: '1', b: '2' }
 - 10: 100
 - 11: { a: '1', b: '2' }
 - 12: 100
 - 13: { a: '1', b: '2' }
 - 14: 100
 - 15: { a: '1', b: '2' }
 - 16: 100
 - 17: { a: '1', b: '2' }
 - 18: 100
 - 19: { a: '1', b: '2' }
 - 20: 100
 - 21: { a: '1', b: '2' }
 - 22: 100
 - 23: { a: '1', b: '2' }
 - 24: 100
 - 25: { a: '1', b: '2' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
