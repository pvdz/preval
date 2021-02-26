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
$(undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
const SSA_x = arrPatternSplat[0];
$(SSA_x);
export { SSA_x as x };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
