# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > assignments > do_while > auto_base_assign_pattern_arr
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [b] = $([$(2)])));
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = [];
let a = { a: 999, b: 1000 };
do {
  $(100);
  let tmpNestedComplexRhs;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = [];
let a = { a: 999, b: 1000 };
do {
  $(100);
  let tmpNestedComplexRhs;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpNestedComplexRhs = tmpNestedAssignArrPatternRhs;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: [2]
 - 4: 100
 - 5: 2
 - 6: [2]
 - 7: 100
 - 8: 2
 - 9: [2]
 - 10: 100
 - 11: 2
 - 12: [2]
 - 13: 100
 - 14: 2
 - 15: [2]
 - 16: 100
 - 17: 2
 - 18: [2]
 - 19: 100
 - 20: 2
 - 21: [2]
 - 22: 100
 - 23: 2
 - 24: [2]
 - 25: 100
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
