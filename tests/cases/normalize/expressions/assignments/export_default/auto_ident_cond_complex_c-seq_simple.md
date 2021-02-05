# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > export_default > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = $(1) ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  40;
  50;
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
}
a = tmpNestedComplexRhs;
tmpExportDefault = tmpNestedComplexRhs;
export default tmpExportDefault;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
}
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
