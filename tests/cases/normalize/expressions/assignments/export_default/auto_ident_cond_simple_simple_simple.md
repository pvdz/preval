# Preval test case

# auto_ident_cond_simple_simple_simple.md

> normalize > expressions > assignments > export_default > auto_ident_cond_simple_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 1 ? 2 : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs = undefined;
if (1) {
  tmpNestedComplexRhs = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
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
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = 2;
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
