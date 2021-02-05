# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > statement > export_default > auto_ident_upd_pi_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default ++b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
