# Preval test case

# auto_ident_obj_pattern_assign.md

> normalize > expressions > statement > do_while > auto_ident_obj_pattern_assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (({ x, y } = { x: $(3), y: $(4) }));
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpDoWhileTest = tmpNestedAssignObjPatternRhs;
} while (tmpDoWhileTest);
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpDoWhileTest = tmpNestedAssignObjPatternRhs;
} while (tmpDoWhileTest);
$(a, x, y);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: 100
 - 5: 3
 - 6: 4
 - 7: 100
 - 8: 3
 - 9: 4
 - 10: 100
 - 11: 3
 - 12: 4
 - 13: 100
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 100
 - 20: 3
 - 21: 4
 - 22: 100
 - 23: 3
 - 24: 4
 - 25: 100
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
