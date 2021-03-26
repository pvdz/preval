# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = [$(1), 2, $(3)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = [$(1), 2, $(3)]);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const SSA_a = [tmpArrElement, 2, tmpArrElement$3];
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
