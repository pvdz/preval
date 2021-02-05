# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > export_default > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpPostUpdArgIdent = b;
b = b - 1;
const tmpNestedComplexRhs = tmpPostUpdArgIdent;
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
