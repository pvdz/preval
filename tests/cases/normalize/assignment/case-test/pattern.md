# Preval test case

# pattern.md

> normalize > assignment > case-test > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch (1) { case [x, y] = z: $('yes'); break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryRight;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      arrAssignPatternRhs = z;
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      tmpBinaryRight = arrAssignPatternRhs;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    let ifTestTmp = tmpFallthrough;
    if (ifTestTmp) {
    } else {
      arrAssignPatternRhs = z;
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      tmpBinaryRight = arrAssignPatternRhs;
      ifTestTmp = 1 === tmpBinaryRight;
    }
    if (ifTestTmp) {
      ('case 0:');
      {
        $('yes');
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
 - 0: 10,20,[10,20,30]
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1, 2, [10, 20, 30]], null];

