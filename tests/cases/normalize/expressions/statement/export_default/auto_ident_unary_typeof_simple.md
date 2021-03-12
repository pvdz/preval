# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default typeof arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = typeof arg;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = 'number';
export { tmpAnonDefaultExport as default };
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
