# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > template > pattern_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
$(`abc ${[x, y] = ($(x), $(y), $(z))} def`)
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
  ($(x),
  $(y),
  (arrAssignPatternRhs = $(z)),
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
  ($(x),
  $(y),
  (arrAssignPatternRhs = $(z)),
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
 - 0: 1
 - 1: 2
 - 2: [10,20,30]
 - 3: "abc 10,20,30 def"
 - 4: 10,20,[10,20,30]
 - 5: undefined

Normalized calls: Same

Final output calls: Same
