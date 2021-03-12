# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Statement > For b > Auto base assign pattern arr
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = [];

let a = { a: 999, b: 1000 };
for (; ([b] = $([$(2)])); $(1));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
{
  while (([b] = $([$(2)]))) {
    $(1);
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = [];
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest;
  const tmpCallCallee = $;
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  tmpIfTest = tmpNestedAssignArrPatternRhs;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = [];
const a = { a: 999, b: 1000 };
while (true) {
  const tmpArrElement = $(2);
  const tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = arrPatternSplat[0];
  if (tmpNestedAssignArrPatternRhs) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: [2]
 - 3: 1
 - 4: 2
 - 5: [2]
 - 6: 1
 - 7: 2
 - 8: [2]
 - 9: 1
 - 10: 2
 - 11: [2]
 - 12: 1
 - 13: 2
 - 14: [2]
 - 15: 1
 - 16: 2
 - 17: [2]
 - 18: 1
 - 19: 2
 - 20: [2]
 - 21: 1
 - 22: 2
 - 23: [2]
 - 24: 1
 - 25: 2
 - 26: [2]
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
