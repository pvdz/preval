# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
export default a = typeof $(x);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = typeof $(x));
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, x);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(1);
const SSA_a = typeof tmpUnaryArg;
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
