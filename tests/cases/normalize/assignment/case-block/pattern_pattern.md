# Preval test case

# pattern_pattern.md

> normalize > assignment > case-block > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): [a, b] = [, x, y] = z; break; }
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  const tmpSwitchTest = $('a');
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        tmpBinaryLeft = tmpSwitchTest;
        tmpBinaryRight = $('a');
        ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          arrAssignPatternRhs_1 = z;
          arrPatternSplat_1 = [...arrAssignPatternRhs_1];
          x = arrPatternSplat_1[1];
          y = arrPatternSplat_1[2];
          arrAssignPatternRhs = arrAssignPatternRhs_1;
          arrPatternSplat = [...arrAssignPatternRhs];
          a = arrPatternSplat[0];
          b = arrPatternSplat[1];
          arrAssignPatternRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
$('a');
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $('a');
      ifTestTmp = tmpBinaryLeft === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        arrAssignPatternRhs_1 = z;
        arrPatternSplat_1 = [...arrAssignPatternRhs_1];
        x = arrPatternSplat_1[1];
        y = arrPatternSplat_1[2];
        arrAssignPatternRhs = arrAssignPatternRhs_1;
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, 2, 1, 2, z);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 10,20,20,30,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

