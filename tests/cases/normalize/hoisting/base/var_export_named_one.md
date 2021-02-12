# Preval test case

# export_named_one_var.md

> normalize > hoisting > export_named_one_var
>
> Exported var bindings are still hoisted

#TODO

## Input

`````js filename=intro
$(x);
export var x = 10;
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
x = 10;
$(x);
export { x };
`````

## Output

`````js filename=intro
var x;
$(x);
x = 10;
$(x);
export { x };
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
