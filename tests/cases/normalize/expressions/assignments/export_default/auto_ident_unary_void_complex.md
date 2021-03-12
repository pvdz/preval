# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = void $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
