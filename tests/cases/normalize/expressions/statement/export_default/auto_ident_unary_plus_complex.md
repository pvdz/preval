# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default +$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpAnonDefaultExport = +tmpUnaryArg;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpAnonDefaultExport = +tmpUnaryArg;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
