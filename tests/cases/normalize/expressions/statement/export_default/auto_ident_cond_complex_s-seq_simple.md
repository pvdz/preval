# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> normalize > expressions > statement > export_default > auto_ident_cond_complex_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $(1) ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpExportDefault = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpExportDefault = tmpCallCallee(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpExportDefault = 60;
} else {
  const tmpCalleeParam = $(100);
  tmpExportDefault = $(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
