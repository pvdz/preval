# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > export_default > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $($(0)) || 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
} else {
  tmpNestedComplexRhs = 2;
}
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export { tmpExportDefault as default };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
