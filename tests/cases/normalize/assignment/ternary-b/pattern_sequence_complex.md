# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > ternary-b > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$($(true) ? ([x, y] = ($(x), $(y), $(z))) : false);
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  $(x);
  $(y);
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpTernaryConsequent = arrAssignPatternRhs;
  tmpArg = tmpTernaryConsequent;
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
var tmpTernaryConsequent;
var tmpTernaryTest;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  $(x);
  $(y);
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  tmpTernaryConsequent = arrAssignPatternRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 1
 - 2: 2
 - 3: [10,20,30]
 - 4: [10,20,30]
 - 5: 10,20,[10,20,30]
 - 6: undefined

Normalized calls: Same

Final output calls: Same
