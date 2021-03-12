# Preval test case

# func_export_named.md

> Normalize > Hoisting > Base > Func export named
>
> Exported func decls are still hoisted

#TODO

## Input

`````js filename=intro
$(f);
export function f(){}
$(f);
`````

## Pre Normal

`````js filename=intro
let f = function () {};
$(f);
$(f);
export { f };
`````

## Normalized

`````js filename=intro
let f = function () {};
$(f);
$(f);
export { f };
`````

## Output

`````js filename=intro
const f = function () {};
$(f);
$(f);
export { f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
