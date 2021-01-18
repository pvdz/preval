# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > for-b > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
for (;[x, y] = ($(x), $(y), $(z)););
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  while (true) {
    {
      $(x);
      $(y);
      arrAssignPatternRhs = $(z);
      arrPatternSplat = [...arrAssignPatternRhs];
      x = arrPatternSplat[0];
      y = arrPatternSplat[1];
      let ifTestTmp = y;
      if (ifTestTmp) {
      } else {
        break;
      }
    }
  }
}
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
while (true) {
  $(x);
  $(y);
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  let ifTestTmp = y;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(x, y, z);
`````
