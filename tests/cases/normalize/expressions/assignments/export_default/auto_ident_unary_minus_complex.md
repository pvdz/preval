# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = -$(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = -$(100));
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = -tmpUnaryArg;
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
