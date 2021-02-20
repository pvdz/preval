# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = void arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a, arg);
`````

## Output

`````js filename=intro
const tmpExportDefault = undefined;
export { tmpExportDefault as default };
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
