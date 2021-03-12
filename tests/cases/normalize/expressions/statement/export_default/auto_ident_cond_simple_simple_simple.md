# Preval test case

# auto_ident_cond_simple_simple_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident cond simple simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default 1 ? 2 : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
tmpAnonDefaultExport = 2;
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const SSA_tmpAnonDefaultExport = 2;
export { SSA_tmpAnonDefaultExport as default };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
