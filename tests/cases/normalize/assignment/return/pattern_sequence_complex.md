# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > return > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
(function(){ return [x, y] = ($(x), $(y), $(z)); })();
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpNewObj;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpNewObj = function () {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  {
    $(x);
    $(y);
    arrAssignPatternRhs = $(z);
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    let tmpStmtArg = arrAssignPatternRhs;
    return tmpStmtArg;
  }
};
tmpNewObj();
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpNewObj;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpNewObj = function () {
  var arrAssignPatternRhs;
  var arrPatternSplat;
  $(x);
  $(y);
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  let tmpStmtArg = arrAssignPatternRhs;
  return tmpStmtArg;
};
tmpNewObj();
$(x, y, z);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: [10,20,30]
 - 3: 10,20,[10,20,30]
 - 4: undefined

Normalized calls: Same

Final output calls: Same
