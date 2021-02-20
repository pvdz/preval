# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
export default $(b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpExportDefault = tmpCallCompObj[tmpCallCompProp](1);
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $('$');
const tmpExportDefault = tmpCallCompObj[tmpCallCompProp](1);
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
