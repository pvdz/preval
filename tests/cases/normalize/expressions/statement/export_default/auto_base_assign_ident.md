# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Export default > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default b = $(2);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (b = $(2));
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const b = $(2);
const tmpAnonDefaultExport = b;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
