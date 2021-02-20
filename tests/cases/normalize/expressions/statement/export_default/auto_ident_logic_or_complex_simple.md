# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $($(0)) || 2;
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
  tmpExportDefault = 2;
}
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpExportDefault = $(tmpCalleeParam);
if (tmpExportDefault) {
} else {
  tmpExportDefault = 2;
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
