# Preval test case

# pattern_pattern.md

> normalize > assignment > case-block > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [a, b] = [, x, y] = z; break; }
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a_1;
  let b_1;
  const tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      bindingPatternArrRoot = undefined;
      const tmpNestedAssignArrPatternRhs = z;
      const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
      x = arrPatternSplat$1[1];
      y = arrPatternSplat$1[2];
      bindingPatternArrRoot = tmpNestedAssignArrPatternRhs;
      arrPatternSplat = [...bindingPatternArrRoot];
      a_1 = arrPatternSplat[0];
      b_1 = arrPatternSplat[1];
      break tmpSwitchBreak;
    }
  }
}
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
const tmpSwitchTest = $('a');
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a_1;
  let b_1;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      bindingPatternArrRoot = undefined;
      const arrPatternSplat$1 = [...z];
      x = arrPatternSplat$1[1];
      y = arrPatternSplat$1[2];
      bindingPatternArrRoot = z;
      arrPatternSplat = [...bindingPatternArrRoot];
      a_1 = arrPatternSplat[0];
      b_1 = arrPatternSplat[1];
      break tmpSwitchBreak;
    }
  }
}
$(1, 2, x, y, z);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 20, 30, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
