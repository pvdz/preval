# Preval test case

# partial_double_pattern.md

> Normalize > Hoisting > Var > Partial double pattern
>
> Silly case of a double var pattern binding

#TODO

## Input

`````js filename=intro
var [x, y] = [1, 2, 3];
$(x,y);
var [x, z] = [4, 5, 6];
$(x, y, z);
`````

## Normalized

`````js filename=intro
let x = undefined;
let y = undefined;
let z = undefined;
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
$(x, y);
const arrAssignPatternRhs$1 = [4, 5, 6];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
x = arrPatternSplat$1[0];
z = arrPatternSplat$1[1];
$(x, y, z);
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
const SSA_z = arrPatternSplat$1[1];
$(SSA_x$1, SSA_y, SSA_z);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - 2: 4, 2, 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
