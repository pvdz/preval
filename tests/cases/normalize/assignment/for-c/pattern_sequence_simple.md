# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > for-c > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
let n = 1;
for (;n-->0;  [x, y] = ($(x), $(y), z));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 1;
{
  while (true) {
    {
      tmpPostfixArg = n;
      n = n - 1;
      tmpBinaryLeft = tmpPostfixArg;
      let ifTestTmp = tmpBinaryLeft > 0;
      if (ifTestTmp) {
        $(x);
        $(y);
        arrAssignPatternRhs = z;
        arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        y = arrPatternSplat[1];
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
var tmpBinaryLeft;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let n = 1;
while (true) {
  tmpPostfixArg = n;
  n = n - 1;
  tmpBinaryLeft = tmpPostfixArg;
  let ifTestTmp = tmpBinaryLeft > 0;
  if (ifTestTmp) {
    $(x);
    $(y);
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
  } else {
    break;
  }
}
$(x, y, z);
`````

## Result

Should call `$` with:
[[1], [2], [10, 20, [10, 20, 30]], null];

Normalized calls: Same

Final output calls: Same
