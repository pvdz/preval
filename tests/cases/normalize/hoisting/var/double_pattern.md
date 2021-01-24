# Preval test case

# double_pattern.md

> normalize > hoisting > var > double_pattern
>
> Silly case of a double var pattern binding

#TODO

## Input

`````js filename=intro
var [x, y] = [1, 2, 3];
$(x,y);
var [x, y] = [4, 5, 6];
$(x,y);
`````

## Normalized

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var x;
var y;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
arrAssignPatternRhs;
$(x, y);
arrAssignPatternRhs$1 = [4, 5, 6];
arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
arrAssignPatternRhs$1;
$(x, y);
`````

## Output

`````js filename=intro
var arrAssignPatternRhs;
var arrAssignPatternRhs$1;
var arrPatternSplat;
var arrPatternSplat$1;
var x;
var y;
arrAssignPatternRhs = [1, 2, 3];
arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y);
arrAssignPatternRhs$1 = [4, 5, 6];
arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
$(x, y);
`````

## Result

Should call `$` with:
 - 0: 1,2
 - 1: 4,5
 - 2: undefined

Normalized calls: Same

Final output calls: Same
