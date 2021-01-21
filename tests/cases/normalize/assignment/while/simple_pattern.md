# Preval test case

# simple_pattern.md

> normalize > assignment > while > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
while (a = [x, y] = $(z));
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
while (true) {
  {
    arrAssignPatternRhs = $(z);
    arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a = arrAssignPatternRhs;
    let ifTestTmp = a;
    if (ifTestTmp) {
    } else {
      break;
    }
  }
}
$(a, x, y, z);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
while (true) {
  arrAssignPatternRhs = $(z);
  arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  a = arrAssignPatternRhs;
  let ifTestTmp = a;
  if (ifTestTmp) {
  } else {
    break;
  }
}
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: [10,20,30]
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
