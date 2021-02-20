# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Export default > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = "foo";
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 'foo';
let tmpExportDefault = a;
export { tmpExportDefault as default };
$(a);
`````

## Output

`````js filename=intro
const tmpExportDefault = 'foo';
export { tmpExportDefault as default };
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
