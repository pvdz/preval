# Preval test case

# simple_pattern.md

> normalize > assignment > logic-both > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$((a = [x, y] = z) && (a = [x, y] = z));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  tmpNestedComplexRhs = arrPatternSplat[1];
  y = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpAssignLogicStmtOr = a;
  if (tmpAssignLogicStmtOr) {
    arrAssignPatternRhs_1 = z;
    arrPatternSplat_1 = [...arrAssignPatternRhs_1];
    x = arrPatternSplat_1[0];
    tmpNestedComplexRhs_2 = arrPatternSplat_1[1];
    y = tmpNestedComplexRhs_2;
    tmpNestedComplexRhs_1 = tmpNestedComplexRhs_2;
    a = tmpNestedComplexRhs_1;
    tmpArg = tmpNestedComplexRhs_1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedComplexRhs_2;
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs_1;
var arrPatternSplat_1;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
tmpNestedComplexRhs = arrPatternSplat[1];
y = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpAssignLogicStmtOr = a;
if (tmpAssignLogicStmtOr) {
  arrAssignPatternRhs_1 = z;
  arrPatternSplat_1 = [...arrAssignPatternRhs_1];
  x = arrPatternSplat_1[0];
  tmpNestedComplexRhs_2 = arrPatternSplat_1[1];
  y = tmpNestedComplexRhs_2;
  tmpNestedComplexRhs_1 = tmpNestedComplexRhs_2;
  a = tmpNestedComplexRhs_1;
  tmpArg = tmpNestedComplexRhs_1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(a, x, y, z);
`````
