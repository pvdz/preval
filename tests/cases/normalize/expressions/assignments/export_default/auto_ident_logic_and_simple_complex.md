# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > export_default > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 1 && $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
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
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
  const tmpCalleeParam = $(1);
  tmpNestedComplexRhs = $(tmpCalleeParam);
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
