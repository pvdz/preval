# Preval test case

# auto_ident_obj_pattern_assign_seq.md

> normalize > expressions > assignments > do_while > auto_ident_obj_pattern_assign_seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = { x, y } = ($(x), $(y), { x: $(3), y: $(4) })));
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
  let tmpNestedComplexRhs;
  $(x);
  $(y);
  const tmpObjLitVal = $(3);
  const tmpObjLitVal$1 = $(4);
  const tmpNestedAssignObjPatternRhs = { x: tmpObjLitVal, y: tmpObjLitVal$1 };
  x = tmpNestedAssignObjPatternRhs.x;
  y = tmpNestedAssignObjPatternRhs.y;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, x, y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 3
 - 5: 4
 - 6: 100
 - 7: 3
 - 8: 4
 - 9: 3
 - 10: 4
 - 11: 100
 - 12: 3
 - 13: 4
 - 14: 3
 - 15: 4
 - 16: 100
 - 17: 3
 - 18: 4
 - 19: 3
 - 20: 4
 - 21: 100
 - 22: 3
 - 23: 4
 - 24: 3
 - 25: 4
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
