# Preval test case

# simple_pattern.md

> normalize > assignment > template > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, x = 1, y = 2, z = [10, 20, 30];
$(`abc ${a = [x, y] = z} def`)
$(a, x, y, z);
`````

## Normalized

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = `abc ${
  ((arrAssignPatternRhs = z),
  (arrPatternSplat = [...arrAssignPatternRhs]),
  (x = arrPatternSplat[0]),
  (y = arrPatternSplat[1]),
  (a = arrAssignPatternRhs))
} def`;
$(tmpArg);
$(a, x, y, z);
`````

## Output

`````js filename=intro
var tmpArg;
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpArg = `abc ${
  ((arrAssignPatternRhs = z),
  (arrPatternSplat = [...arrAssignPatternRhs]),
  (x = arrPatternSplat[0]),
  (y = arrPatternSplat[1]),
  (a = arrAssignPatternRhs))
} def`;
$(tmpArg);
$(a, x, y, z);
`````

## Result

Should call `$` with:
 - 0: "abc 10,20,30 def"
 - 1: [10,20,30],10,20,[10,20,30]
 - 2: undefined

Normalized calls: Same

Final output calls: Same