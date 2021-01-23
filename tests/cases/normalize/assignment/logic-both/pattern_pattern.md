# Preval test case

# pattern_pattern.md

> normalize > assignment > logic-both > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
$(([a, b] = [, x, y] = z) && ([a, b] = [, x, y] = z));
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs$1;
var arrPatternSplat$1;
var arrAssignPatternRhs$2;
var arrPatternSplat$2;
var arrAssignPatternRhs$3;
var arrPatternSplat$3;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  arrAssignPatternRhs$1 = z;
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  arrAssignPatternRhs = arrAssignPatternRhs$1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  let tmpAssignLogicStmtOr = arrAssignPatternRhs;
  if (tmpAssignLogicStmtOr) {
    arrAssignPatternRhs$3 = z;
    arrPatternSplat$3 = [...arrAssignPatternRhs$3];
    x = arrPatternSplat$3[1];
    y = arrPatternSplat$3[2];
    arrAssignPatternRhs$2 = arrAssignPatternRhs$3;
    arrPatternSplat$2 = [...arrAssignPatternRhs$2];
    a = arrPatternSplat$2[0];
    b = arrPatternSplat$2[1];
    tmpArg = arrAssignPatternRhs$2;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs$1;
var arrPatternSplat$1;
var arrAssignPatternRhs$2;
var arrPatternSplat$2;
var arrAssignPatternRhs$3;
var arrPatternSplat$3;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs$1 = z;
arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[1];
y = arrPatternSplat$1[2];
arrAssignPatternRhs = arrAssignPatternRhs$1;
arrPatternSplat = [...arrAssignPatternRhs];
a = arrPatternSplat[0];
b = arrPatternSplat[1];
let tmpAssignLogicStmtOr = arrAssignPatternRhs;
if (tmpAssignLogicStmtOr) {
  arrAssignPatternRhs$3 = z;
  arrPatternSplat$3 = [...arrAssignPatternRhs$3];
  x = arrPatternSplat$3[1];
  y = arrPatternSplat$3[2];
  arrAssignPatternRhs$2 = arrAssignPatternRhs$3;
  arrPatternSplat$2 = [...arrAssignPatternRhs$2];
  a = arrPatternSplat$2[0];
  b = arrPatternSplat$2[1];
  tmpArg = arrAssignPatternRhs$2;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: 10,20,20,30,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
