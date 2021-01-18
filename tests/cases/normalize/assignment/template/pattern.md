# Preval test case

# pattern.md

> normalize > assignment > template > pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(`abc ${[x, y] = z} def`)
$(x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = `abc ${
  ((arrAssignPatternRhs = z),
  (arrPatternSplat = [...arrAssignPatternRhs]),
  (x = arrPatternSplat[0]),
  (y = arrPatternSplat[1]),
  arrAssignPatternRhs)
} def`;
$(tmpArg);
$(x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = `abc ${
  ((arrAssignPatternRhs = z),
  (arrPatternSplat = [...arrAssignPatternRhs]),
  (x = arrPatternSplat[0]),
  (y = arrPatternSplat[1]),
  arrAssignPatternRhs)
} def`;
$(tmpArg);
$(x, y, z);
`````

## Result

Should call `$` with:
[['abc 10,20,30 def'], [10, 20, [10, 20, 30]], null];

Normalized calls: Same

Final output calls: Same
