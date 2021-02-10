# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > export_default > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default 0 || $($(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpExportDefault = 0;
if (tmpExportDefault) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpExportDefault = tmpCallCallee(tmpCalleeParam);
}
export { tmpExportDefault as default };
$(a);
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
