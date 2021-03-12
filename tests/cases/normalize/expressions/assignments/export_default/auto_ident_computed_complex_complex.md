# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
export default a = $(b)[$("c")];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = (a = $(b)[$('c')]);
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $('c');
const SSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
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
