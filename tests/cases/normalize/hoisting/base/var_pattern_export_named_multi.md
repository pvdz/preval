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

## Pre Normal

`````js filename=intro
let x = undefined;
let y = undefined;
$(x, y);
([x] = [10]), ([y] = [20]);
$(x, y);
export { x };
export { y };
`````

## Normalized

`````js filename=intro
let x = undefined;
let y = undefined;
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
const tmpSSA_x = arrPatternSplat[0];
const arrAssignPatternRhs$1 = [20];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
const tmpSSA_y = arrPatternSplat$1[0];
$(tmpSSA_x, tmpSSA_y);
export { tmpSSA_x as x };
export { tmpSSA_y as y };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
