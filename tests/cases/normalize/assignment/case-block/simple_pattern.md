# Preval test case

# simple_pattern.md

> normalize > assignment > case-block > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): a = [x, y] = z; break; }
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
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
          arrAssignPatternRhs = z;
          arrPatternSplat = [...arrAssignPatternRhs];
          x = arrPatternSplat[0];
          tmpNestedComplexRhs = arrPatternSplat[1];
          y = tmpNestedComplexRhs;
          a = tmpNestedComplexRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(a, x, y, z);
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
        arrAssignPatternRhs = z;
        arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        tmpNestedComplexRhs = arrPatternSplat[1];
        y = tmpNestedComplexRhs;
        a = tmpNestedComplexRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, 1, 2, z);
`````

## Result

Should call `$` with:
[['a'], ['a'], [[10, 20, 30], 10, 20, [10, 20, 30]], null];

Normalized calls: BAD?!
[['a'], ['a'], [20, 10, 20, [10, 20, 30]], null];

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

