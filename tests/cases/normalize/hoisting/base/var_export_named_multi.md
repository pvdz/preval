# Preval test case

# var_export_named_multi.md

> Normalize > Hoisting > Base > Var export named multi
>
> Exported var bindings are still hoisted

#TODO

## Input

`````js filename=intro
$(x, y);
export var x = 10, y = 20;
$(x, y);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
let y = undefined;
$(x, y);
(x = 10), (y = 20);
$(x, y);
export { x };
export { y };
`````

## Normalized

`````js filename=intro
let x = undefined;
let y = undefined;
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
const tmpSSA_x = 10;
const tmpSSA_y = 20;
$(10, 20);
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
