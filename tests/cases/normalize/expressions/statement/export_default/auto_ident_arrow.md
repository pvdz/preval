# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > Export default > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default () => {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = () => {};
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = () => {};
export { tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
