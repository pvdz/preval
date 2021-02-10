# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > assignments > export_default > auto_ident_upd_pi_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
export default a = ++$($(b)).x;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs;
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpNestedComplexRhs = tmpNestedPropCompoundComplexRhs;
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
