# Preval test case

# var_pattern_for_regular_global_top.md

> Normalize > Hoisting > Base > Var pattern for regular global top
>
> Hosting in a block should end up in the parent

#TODO

## Input

`````js filename=intro
$(x);
for (var [x] = [10];false;);
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
$(undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
const SSA_x = arrPatternSplat[0];
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
