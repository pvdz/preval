# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > export_default > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(0)) || $($(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpExportDefault = tmpCallCallee(tmpCalleeParam);
if (tmpExportDefault) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpExportDefault = tmpCallCallee$1(tmpCalleeParam$1);
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpExportDefault = tmpCallCallee(tmpCalleeParam);
if (tmpExportDefault) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpExportDefault = tmpCallCallee$1(tmpCalleeParam$1);
}
export { tmpExportDefault as default };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
