# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = !arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = !arg;
let tmpAnonDefaultExport = a;
export { tmpAnonDefaultExport as default };
$(a, arg);
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = false;
export { tmpAnonDefaultExport as default };
$(false, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
