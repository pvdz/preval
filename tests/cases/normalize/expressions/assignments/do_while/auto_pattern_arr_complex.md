# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Assignments > Do while > Auto pattern arr complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (([a] = $([1, 2])));
$(a);
`````

## Pre Normal

`````js filename=intro
let [a] = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag || ([a] = $([1, 2]))) {
    tmpDoWhileFlag = false;
    {
      $(100);
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = tmpCallCallee(tmpCalleeParam);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpIfTest = tmpNestedAssignArrPatternRhs;
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
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam = [1, 2];
    const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    a = arrPatternSplat$1[0];
    tmpIfTest = tmpNestedAssignArrPatternRhs;
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
