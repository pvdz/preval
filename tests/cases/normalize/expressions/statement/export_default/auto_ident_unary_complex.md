# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > export_default > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default typeof $(x);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
const tmpExportDefault = typeof tmpUnaryArg;
export default tmpExportDefault;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const tmpExportDefault = typeof tmpUnaryArg;
export default tmpExportDefault;
$(a, 1);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
