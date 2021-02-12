# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > statement > export_default > auto_ident_logic_and_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(1)) && 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpExportDefault = tmpCallCallee(tmpCalleeParam);
if (tmpExportDefault) {
  tmpExportDefault = 2;
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpExportDefault = tmpCallCallee(tmpCalleeParam);
if (tmpExportDefault) {
  tmpExportDefault = 2;
}
export { tmpExportDefault as default };
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
