# Preval test case

# simple_pattern.md

> normalize > assignment > return > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
(function(){ return a = [x, y] = z; })();
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpNewObj = function () {
  var tmpNestedComplexRhs;
  var arrAssignPatternRhs;
  var arrPatternSplat;
  {
    arrAssignPatternRhs = z;
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    tmpNestedComplexRhs = arrPatternSplat[1];
    y = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
    let tmpStmtArg = a;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpNewObj;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpNewObj = function () {
  var tmpNestedComplexRhs;
  var arrAssignPatternRhs;
  var arrPatternSplat;
  arrAssignPatternRhs = z;
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  tmpNestedComplexRhs = arrPatternSplat[1];
  y = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpStmtArg = a;
  return tmpStmtArg;
};
tmpNewObj();
$(a, x, y, z);
`````
