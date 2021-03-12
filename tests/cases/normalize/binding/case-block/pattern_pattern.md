# Preval test case

# pattern_pattern.md

> Normalize > Binding > Case-block > Pattern pattern
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
let a$1;
let b$1;
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    let arrAssignPatternRhs;
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat$1[1];
    y = arrPatternSplat$1[2];
    arrAssignPatternRhs = tmpNestedAssignArrPatternRhs;
    const arrPatternSplat = [...arrAssignPatternRhs];
    a$1 = arrPatternSplat[0];
    b$1 = arrPatternSplat[1];
    break tmpSwitchBreak;
  }
}
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const z = [10, 20, 30];
const tmpSwitchTest = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const arrPatternSplat$1 = [...z];
    x = arrPatternSplat$1[1];
    y = arrPatternSplat$1[2];
    const arrPatternSplat = [...z];
    arrPatternSplat[0];
    arrPatternSplat[1];
    break tmpSwitchBreak;
  }
}
$(1, 2, x, y, z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 20, 30, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
