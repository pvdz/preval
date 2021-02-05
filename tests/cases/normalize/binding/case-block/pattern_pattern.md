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
  let a;
  let b;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $('a');
      tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        let arrAssignPatternRhs;
        const tmpNestedAssignArrPatternRhs = z;
        const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
        x = arrPatternSplat$1[1];
        y = arrPatternSplat$1[2];
        arrAssignPatternRhs = tmpNestedAssignArrPatternRhs;
        const arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let z = [10, 20, 30];
$('a');
let a;
let b;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $('a');
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      let arrAssignPatternRhs;
      const tmpNestedAssignArrPatternRhs = z;
      const arrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
      x = arrPatternSplat$1[1];
      y = arrPatternSplat$1[2];
      arrAssignPatternRhs = tmpNestedAssignArrPatternRhs;
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      arrAssignPatternRhs;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, b, 1, 2, z);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 20, 30, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'a' has already been declared ]>")
