# Preval test case

# var_pattern_export_named_multi.md

> Normalize > Hoisting > Base > Var pattern export named multi
>
> Exported var bindings are still hoisted

#TODO

## Input

`````js filename=intro
$(x, y);
export var [x] = [10], [y] = [20];
$(x, y);
`````

## Normalized

`````js filename=intro
var x;
var y;
$(x, y);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
const arrAssignPatternRhs$1 = [20];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
y = arrPatternSplat$1[0];
$(x, y);
export { x };
export { y };
`````

## Output

`````js filename=intro
$(undefined, undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
const SSA_x = arrPatternSplat[0];
const arrAssignPatternRhs$1 = [20];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
const SSA_y = arrPatternSplat$1[0];
$(SSA_x, SSA_y);
export { SSA_x as x };
export { SSA_y as y };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
