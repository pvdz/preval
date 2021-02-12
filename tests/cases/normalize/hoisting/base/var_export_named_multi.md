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
var x;
var y;
$(x, y);
x = 10;
y = 20;
$(x, y);
export { x };
export { y };
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
