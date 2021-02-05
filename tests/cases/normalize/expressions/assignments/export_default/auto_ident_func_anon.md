# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > assignments > export_default > auto_ident_func_anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpNestedComplexRhs = function () {};
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpNestedComplexRhs = function () {};
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
