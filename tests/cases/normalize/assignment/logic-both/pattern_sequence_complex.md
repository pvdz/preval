# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > logic-both > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(([x, y] = ($(x), $(y), $(z))) && ([x, y] = ($(x), $(y), $(z))));
$(x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var tmpArg;
let x = 1;
let y = 2;
let z = [10, 20, 30];
{
  $(x);
  $(y);
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  let tmpAssignLogicStmtOr = arrAssignPatternRhs;
  if (tmpAssignLogicStmtOr) {
    $(x);
    $(y);
    arrAssignPatternRhs$1 = $(z);
    arrPatternSplat$1 = [...arrAssignPatternRhs$1];
    x = arrPatternSplat$1[0];
    y = arrPatternSplat$1[1];
    tmpArg = arrAssignPatternRhs$1;
  } else {
    tmpArg = tmpAssignLogicStmtOr;
  }
}
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var tmpArg;
let x = 1;
let y = 2;
let z = [10, 20, 30];
$(x);
$(y);
arrAssignPatternRhs = $(z);
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
let tmpAssignLogicStmtOr = arrAssignPatternRhs;
if (tmpAssignLogicStmtOr) {
  $(x);
  $(y);
  arrAssignPatternRhs$1 = $(z);
  arrPatternSplat$1 = [...arrAssignPatternRhs$1];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  tmpArg = arrAssignPatternRhs$1;
} else {
  tmpArg = tmpAssignLogicStmtOr;
}
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: [10,20,30]
 - 3: 10
 - 4: 20
 - 5: [10,20,30]
 - 6: [10,20,30]
 - 7: 10,20,[10,20,30]
 - 8: undefined

Normalized calls: Same

Final output calls: Same
