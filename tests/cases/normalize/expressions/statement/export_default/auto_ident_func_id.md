# Preval test case

# auto_ident_func_id.md

> normalize > expressions > statement > export_default > auto_ident_func_id
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default (function f() {});
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpExportDefault = function f() {};
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
(function f() {});
export { tmpExportDefault as default };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
