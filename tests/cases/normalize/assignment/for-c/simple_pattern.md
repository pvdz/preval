# Preval test case

# simple_pattern.md

> normalize > assignment > for-c > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
let n = 1;
for (;n-->0;  a = [x, y] = z);
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
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
        arrAssignPatternRhs = z;
        arrPatternSplat = [...arrAssignPatternRhs];
        x = arrPatternSplat[0];
        y = arrPatternSplat[1];
        a = arrAssignPatternRhs;
      } else {
        break;
      }
    }
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpPostfixArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
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
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = arrAssignPatternRhs;
  } else {
    break;
  }
}
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30],10,20,[10,20,30]
 - 1: undefined

Normalized calls: Same

Final output calls: Same
