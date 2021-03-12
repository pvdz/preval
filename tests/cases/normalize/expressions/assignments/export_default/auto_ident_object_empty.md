# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Export default > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const SSA_a = {};
const tmpAnonDefaultExport = SSA_a;
export { tmpAnonDefaultExport as default };
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
