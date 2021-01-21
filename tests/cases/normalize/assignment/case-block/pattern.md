# Preval test case

# pattern.md

> normalize > assignment > case-block > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): [x, y] = z; break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
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
          y = arrPatternSplat[1];
          arrAssignPatternRhs;
          break tmpSwitchBreak;
        }
        tmpFallthrough = true;
      }
    }
  }
}
$(x, y, z);
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
        y = arrPatternSplat[1];
        arrAssignPatternRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(1, 2, z);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "a"
 - 2: 10,20,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['a'], '<crash[ <ref> is not defined ]>'];

