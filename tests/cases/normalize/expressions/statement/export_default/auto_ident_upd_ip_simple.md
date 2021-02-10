# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > statement > export_default > auto_ident_upd_ip_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default b++;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpExportDefault = tmpPostUpdArgIdent;
export { tmpExportDefault as default };
$(a, b);
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
