# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Export default > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default [$(1), 2, $(3)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = [$(1), 2, $(3)];
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpAnonDefaultExport = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpAnonDefaultExport = [tmpArrElement, 2, tmpArrElement$3];
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 3 );
const d = [ b, 2, c ];
export { d as default from "undefined"
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
