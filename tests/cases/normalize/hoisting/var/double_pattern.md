# Preval test case

# double_pattern.md

> Normalize > Hoisting > Var > Double pattern
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
var x;
var y;
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y);
const arrAssignPatternRhs$1 = [4, 5, 6];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
y = arrPatternSplat$1[1];
$(x, y);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
const SSA_x = arrPatternSplat[0];
const SSA_y = arrPatternSplat[1];
$(SSA_x, SSA_y);
const arrAssignPatternRhs$1 = [4, 5, 6];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
const SSA_x$1 = arrPatternSplat$1[0];
const SSA_y$1 = arrPatternSplat$1[1];
$(SSA_x$1, SSA_y$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 4, 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
