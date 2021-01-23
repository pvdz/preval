# Preval test case

# simple_pattern.md

> normalize > assignment > ternary-c > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$($(false) ? true : (a = [x, y] = z));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpNestedComplexRhs;
var tmpTernaryAlternate;
var tmpTernaryTest;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpNestedComplexRhs = arrAssignPatternRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpNestedComplexRhs;
var tmpTernaryAlternate;
var tmpTernaryTest;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpNestedComplexRhs = arrAssignPatternRhs;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: [10,20,30]
 - 2: [10,20,30],10,20,[10,20,30]
 - 3: undefined

Normalized calls: Same

Final output calls: Same
