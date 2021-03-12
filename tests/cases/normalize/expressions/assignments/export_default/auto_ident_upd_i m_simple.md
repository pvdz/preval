# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
$(1, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
