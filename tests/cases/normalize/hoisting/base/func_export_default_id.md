# Preval test case

# export_default_func_id.md

> normalize > hoisting > export_default_func_id
>
> Exported func decls are still hoisted

#TODO

## Input

`````js filename=intro
$(f);
export default function f(){}
$(f);
`````

## Normalized

`````js filename=intro
function f() {}
$(f);
$(f);
export { f as default };
`````

## Output

`````js filename=intro
function f() {}
$(f);
$(f);
export { f as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
