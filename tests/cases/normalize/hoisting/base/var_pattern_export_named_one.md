# Preval test case

# var_pattern_export_named_one.md

> Normalize > Hoisting > Base > Var pattern export named one
>
> Exported var bindings are still hoisted

#TODO

## Input

`````js filename=intro
$(x);
export var [x] = [10];
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$(x);
[x] = [10];
$(x);
export { x };
`````

## Normalized

`````js filename=intro
let x = undefined;
$(x);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
export { x };
`````

## Output

`````js filename=intro
let x = undefined;
$(undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
export { x };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
