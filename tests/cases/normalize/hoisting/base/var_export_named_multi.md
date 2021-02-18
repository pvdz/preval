# Preval test case

# export_named_multi_var.md

> normalize > hoisting > export_named_multi_var
>
> Exported var bindings are still hoisted

#TODO

## Input

`````js filename=intro
$(x, y);
export var x = 10, y = 20;
$(x, y);
`````

## Normalized

`````js filename=intro
var x;
var y;
$(x, y);
x = 10;
y = 20;
$(x, y);
export { x };
export { y };
`````

## Output

`````js filename=intro
$(undefined, undefined);
const SSA_x = 10;
const SSA_y = 20;
$(10, 20);
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
