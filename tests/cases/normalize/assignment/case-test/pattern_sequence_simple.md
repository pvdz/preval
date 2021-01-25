# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > case-test > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch (1) { case [x, y] = ($(x), $(y), z): $('yes'); break; }
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpBinaryRight;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    $(x);
    $(y);
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    tmpBinaryRight = arrAssignPatternRhs;
    tmpIfTest = 1 === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $('yes');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
let z = [10, 20, 30];
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    $(x);
    $(y);
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    tmpBinaryRight = arrAssignPatternRhs;
    tmpIfTest = 1 === tmpBinaryRight;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $('yes');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(1, 2, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: 10,20,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[10], [20], [1, 2, [10, 20, 30]], null];

