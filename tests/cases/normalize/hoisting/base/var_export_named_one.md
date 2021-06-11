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

## Pre Normal

`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
export { x };
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
$(10);
const x = 10;
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
