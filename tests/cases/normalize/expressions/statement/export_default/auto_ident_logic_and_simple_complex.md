# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > statement > export_default > auto_ident_logic_and_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default 1 && $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = 1;
if (tmpExportDefault) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpExportDefault = tmpCallCallee(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = 1;
if (tmpExportDefault) {
  const tmpCalleeParam = $(1);
  tmpExportDefault = $(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
