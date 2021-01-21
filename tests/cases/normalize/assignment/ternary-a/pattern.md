# Preval test case

# pattern.md

> normalize > assignment > ternary-a > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$( ([x, y] = z ) ? true : false);
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpTernaryTest;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpTernaryTest = arrAssignPatternRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpTernaryTest;
let x = 1;
let y = 2;
let z = [10, 20, 30];
arrAssignPatternRhs = z;
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpTernaryTest = arrAssignPatternRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same