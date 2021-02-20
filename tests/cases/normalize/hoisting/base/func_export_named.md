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

## Normalized

`````js filename=intro
function f() {}
$(f);
$(f);
export { f };
`````

## Output

`````js filename=intro
function f() {}
$(f);
$(f);
export { f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
