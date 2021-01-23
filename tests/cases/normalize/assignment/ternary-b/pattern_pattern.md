# Preval test case

# pattern_pattern.md

> normalize > assignment > ternary-b > pattern_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, x = 1, y = 2, z = [10, 20, 30];
$($(true) ? ([a, b] = [, x, y] = z) : false);
$(a, b, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs$1;
var arrPatternSplat$1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  arrAssignPatternRhs$1 = z;
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  arrAssignPatternRhs = arrAssignPatternRhs$1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  tmpTernaryConsequent = arrAssignPatternRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrAssignPatternRhs$1;
var arrPatternSplat$1;
let a = 1;
let b = 2;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  arrAssignPatternRhs$1 = z;
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[1];
  y = arrPatternSplat$1[2];
  arrAssignPatternRhs = arrAssignPatternRhs$1;
  arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  b = arrPatternSplat[1];
  tmpTernaryConsequent = arrAssignPatternRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, x, y, z);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: [10,20,30]
 - 2: 10,20,20,30,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: Same
