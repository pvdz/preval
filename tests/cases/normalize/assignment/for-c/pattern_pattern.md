# Preval test case

# pattern_pattern.md

> normalize > assignment > for-c > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
let n = 1;
for (;n-->0;  [a, b] = [, x, y] = z);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var tmpBinaryLeft;
var tmpPostfixArg;
let a = 1;
let b = 2;
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
        arrAssignPatternRhs$1 = z;
        arrPatternSplat$1 = [...arrAssignPatternRhs$1];
        x = arrPatternSplat$1[1];
        y = arrPatternSplat$1[2];
        arrAssignPatternRhs = arrAssignPatternRhs$1;
        arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
      } else {
        break;
      }
    }
  }
}
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var tmpBinaryLeft;
var tmpPostfixArg;
let a = 1;
let b = 2;
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
    arrAssignPatternRhs$1 = z;
    arrPatternSplat$1 = [...arrAssignPatternRhs$1];
    x = arrPatternSplat$1[1];
    y = arrPatternSplat$1[2];
    arrAssignPatternRhs = arrAssignPatternRhs$1;
    arrPatternSplat = [...arrAssignPatternRhs];
    a = arrPatternSplat[0];
    b = arrPatternSplat[1];
  } else {
    break;
  }
}
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
 - 0: 10,20,20,30,[10,20,30]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
