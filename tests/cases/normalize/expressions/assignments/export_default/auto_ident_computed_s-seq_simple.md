# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > assignments > export_default > auto_ident_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default a = (1, 2, b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
