# Preval test case

# var_export_named_one.md

> Normalize > Hoisting > Base > Var export named one
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
let x = undefined;
$(x);
x = 10;
$(x);
export { x };
`````

## Output

`````js filename=intro
$(undefined);
const SSA_x = 10;
$(10);
export { SSA_x as x };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
