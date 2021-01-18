# Preval test case

# simple_pattern.md

> normalize > assignment > for-c > simple_pattern
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 1, c = [10];
a = [b] = c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let b = 1;
let c = [10];
arrAssignPatternRhs = c;
arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
a = arrAssignPatternRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrPatternSplat;
let a = 1;
let b = 1;
let c = [10];
arrAssignPatternRhs = c;
arrPatternSplat = [...arrAssignPatternRhs];
b = arrPatternSplat[0];
a = arrAssignPatternRhs;
$(a, b, c);
`````

## Result

Should call `$` with:
[[[10], 10, [10]], null];

Normalized calls: Same

Final output calls: Same
