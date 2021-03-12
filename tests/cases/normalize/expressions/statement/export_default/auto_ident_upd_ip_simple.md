# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident upd ip simple
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
const tmpAnonDefaultExport = tmpPostUpdArgIdent;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
