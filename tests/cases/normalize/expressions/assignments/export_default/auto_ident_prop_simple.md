# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default a = b.c;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = b.c);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
a = b.c;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const SSA_a = b.c;
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
